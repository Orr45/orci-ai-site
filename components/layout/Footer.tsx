import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 px-6" style={{background:'rgba(5,13,26,0.98)', borderTop:'1px solid rgba(0,209,255,0.12)'}}>
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <Link href="/" className="text-2xl font-bold inline-block mb-3">
              <span className="text-orci-cyan">
                Orci AI
              </span>
            </Link>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              הופכים בינה מלאכותית לכלי העבודה החזק ביותר שלכם
            </p>
            <p className="text-slate-400 text-xs">
              By Or Shmer (Orci)
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-3 text-slate-200">קישורים מהירים</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  בית
                </Link>
              </li>
              <li>
                <Link href="/guides" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  מדריכים
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  שירותים
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  עבודות
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  צור קשר
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Resources */}
          <div>
            <h3 className="font-bold mb-3 text-slate-200">שירותים ומשאבים</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/guides" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  מדריכי AI
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  חבילת השיווק החכם
                </Link>
              </li>
              <li>
                <Link href="/guides/ai-beginners" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  חפצים מדברים
                </Link>
              </li>
              <li>
                <Link href="/guides/ai-influencer" className="text-slate-300 hover:text-orci-cyan transition-colors">
                  משפיענית AI
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold mb-3 text-slate-200">יצירת קשר</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/972542599107"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-300 hover:text-orci-cyan transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  וואטסאפ
                </a>
              </li>
              <li className="text-slate-300">
                📱 054-259-9107
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-orci-cyan/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
            <p>
              © 2025 Orci AI. כל הזכויות שמורות.
            </p>
            <p className="text-xs">
              נבנה עם ❤️ ו-AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
