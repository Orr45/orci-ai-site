"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !agreed) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("נרשמת בהצלחה! תודה שהצטרפת");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "משהו השתבש, נסה שוב");
      }
    } catch {
      setStatus("error");
      setMessage("שגיאת חיבור, נסה שוב מאוחר יותר");
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-8 md:p-12"
      style={{ background: 'var(--surface-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-card)' }}
    >
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
          style={{ background: 'var(--accent-soft)', border: '1px solid var(--accent-line)' }}
        >
          <Mail className="w-7 h-7" style={{ color: 'var(--accent)' }} />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          הישאר מעודכן
        </h3>
        <p className="leading-relaxed mb-6" style={{ color: 'var(--text-secondary)' }}>
          הירשם לקבלת מדריכים, טיפים וטרנדים חדשים בעולם ה-AI — ישירות למייל
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 py-4" style={{ color: 'var(--whatsapp)' }}>
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div
              className="flex items-center rounded-full p-1.5 max-w-md mx-auto"
              style={{ background: 'var(--surface-hover)', border: '1px solid var(--border-strong)' }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="האימייל שלך"
                className="w-full px-4 py-2.5 bg-transparent outline-none text-sm"
                style={{ color: 'var(--text-primary)' }}
                dir="rtl"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-shrink-0 px-5 py-2.5 rounded-full font-bold text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                style={{ background: 'var(--accent)', color: 'var(--on-accent)' }}
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "הרשמה"
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-3 text-red-500 text-sm">{message}</p>
            )}
            <label className="mt-4 flex items-start gap-2 cursor-pointer text-right justify-center">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded cursor-pointer flex-shrink-0"
                style={{ accentColor: 'var(--accent)' }}
              />
              <span className="text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                על ידי הרשמה, אני מאשר/ת את{' '}
                <Link href="/privacy" className="underline hover:opacity-80" style={{ color: 'var(--accent)' }}>מדיניות הפרטיות</Link>
                {' '}ומסכים/ה לקבל עדכונים שיווקיים
              </span>
            </label>
          </form>
        )}
      </div>
    </div>
  );
}
