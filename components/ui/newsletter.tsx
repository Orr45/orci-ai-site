"use client";

import { useState } from "react";
import { Mail, CheckCircle, Loader2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

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
        setMessage(data.error || "משהו השתבש, נסו שוב");
      }
    } catch {
      setStatus("error");
      setMessage("שגיאת חיבור, נסו שוב מאוחר יותר");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 p-8 md:p-12 shadow-2xl">
      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div className="w-14 h-14 bg-orci-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-7 h-7 text-orci-cyan" />
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
          הישארו מעודכנים
        </h3>
        <p className="text-gray-300 leading-relaxed mb-6">
          הירשמו לקבלת מדריכים, טיפים וטרנדים חדשים בעולם ה-AI - ישירות למייל
        </p>

        {status === "success" ? (
          <div className="flex items-center justify-center gap-2 py-4 text-green-400">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{message}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-xl p-1.5 border border-white/10 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="הכניסו את המייל שלכם"
                className="w-full px-4 py-2.5 bg-transparent text-white placeholder-gray-400 outline-none text-sm"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex-shrink-0 px-5 py-2.5 bg-orci-cyan text-white rounded-lg font-medium text-sm hover:bg-orci-blue transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {status === "loading" ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "הרשמה"
                )}
              </button>
            </div>
            {status === "error" && (
              <p className="mt-3 text-red-400 text-sm">{message}</p>
            )}
            <p className="mt-4 text-xs text-gray-500">
              ללא ספאם, אנחנו מגנים על הפרטיות שלכם
            </p>
          </form>
        )}
      </div>

      {/* Background gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 30% 50%, rgba(0, 209, 255, 0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
