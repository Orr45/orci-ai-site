'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'בית' },
    { href: '/guides', label: 'מדריכים' },
    { href: '/products', label: 'מוצרים' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/80 border-b border-orci-cyan/20">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-l from-orci-cyan to-orci-blue">
            Orci AI
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative text-lg font-medium transition-colors ${
                pathname === link.href
                  ? 'text-orci-cyan'
                  : 'text-gray-300 hover:text-orci-cyan'
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <motion.div
                  layoutId="activeLink"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orci-cyan"
                />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <a
          href="https://wa.me/972542599107"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex px-6 py-2 bg-gradient-to-l from-orci-cyan to-orci-blue text-black font-bold rounded-full hover:shadow-lg hover:shadow-orci-cyan/50 transition-all duration-300 transform hover:scale-105"
        >
          צור קשר
        </a>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-orci-cyan"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-xl border-t border-orci-cyan/20"
          >
            <div className="px-4 py-4 space-y-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block text-lg font-medium ${
                    pathname === link.href
                      ? 'text-orci-cyan'
                      : 'text-gray-300 hover:text-orci-cyan'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://wa.me/972542599107"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center px-6 py-3 bg-gradient-to-l from-orci-cyan to-orci-blue text-black font-bold rounded-full"
              >
                צור קשר
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
