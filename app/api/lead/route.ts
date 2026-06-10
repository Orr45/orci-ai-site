import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, phone, email, business } = await request.json();

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { error: "שם וטלפון הם שדות חובה" },
        { status: 400 }
      );
    }

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "כתובת מייל לא תקינה" },
        { status: 400 }
      );
    }

    // Backup trail in Vercel logs even if Mailchimp fails
    console.log("[business-lead]", JSON.stringify({ name, phone, email, business, at: new Date().toISOString() }));

    const API_KEY = process.env.MAILCHIMP_API_KEY;
    const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
    const SERVER_PREFIX = process.env.MAILCHIMP_SERVER_PREFIX;

    if (!API_KEY || !AUDIENCE_ID || !SERVER_PREFIX) {
      console.error("Missing Mailchimp env vars:", {
        hasApiKey: !!API_KEY,
        hasAudienceId: !!AUDIENCE_ID,
        hasServerPrefix: !!SERVER_PREFIX,
      });
      return NextResponse.json(
        { error: "שירות הרשמה לא מוגדר כרגע" },
        { status: 500 }
      );
    }

    const url = `https://${SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `apikey ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: name,
          PHONE: phone,
        },
        tags: ["business-lead", ...(business ? [`business:${business}`] : [])],
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return NextResponse.json({ success: true });
    }

    // Already subscribed — the lead is still logged above, treat as success
    if (data.title === "Member Exists") {
      return NextResponse.json({ success: true });
    }

    console.error("Mailchimp lead error:", data);
    return NextResponse.json(
      { error: "לא הצלחנו לשלוח את הפרטים, נסו שוב" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Lead error:", error);
    return NextResponse.json(
      { error: "שגיאת שרת" },
      { status: 500 }
    );
  }
}
