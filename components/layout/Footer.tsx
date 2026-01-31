export function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-800 mt-20">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Brand */}
          <div className="text-center md:text-right">
            <p className="text-lg font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
                Orci AI
              </span>
            </p>
            <p className="text-gray-400 text-sm mt-1">
              הופכים בינה מלאכותית לכלי העבודה החזק ביותר
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-6 text-sm">
            <a
              href="/"
              className="text-gray-400 hover:text-orci-cyan transition-colors"
            >
              בית
            </a>
            <a
              href="/guides"
              className="text-gray-400 hover:text-orci-cyan transition-colors"
            >
              מדריכים
            </a>
            <a
              href="/products"
              className="text-gray-400 hover:text-orci-cyan transition-colors"
            >
              מוצרים
            </a>
            <a
              href="https://wa.me/972542599107"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-orci-cyan transition-colors"
            >
              צור קשר
            </a>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              © 2025 Orci AI | By Or Shmer (Orci)
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
