import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "כתובת מייל לא תקינה" },
        { status: 400 }
      );
    }

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
      }),
    });

    const data = await response.json();

    if (response.ok || response.status === 200) {
      return NextResponse.json({ success: true });
    }

    // Already subscribed
    if (data.title === "Member Exists") {
      return NextResponse.json(
        { error: "המייל הזה כבר רשום אצלנו" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "לא הצלחנו לרשום אותך, נסו שוב" },
      { status: 500 }
    );
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "שגיאת שרת" },
      { status: 500 }
    );
  }
}
