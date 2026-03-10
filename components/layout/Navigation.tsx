'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Dock } from '@/components/ui/dock-two';
import {
  Home,
  BookOpen,
  Briefcase,
  FolderOpen,
  Phone,
  MessageCircle,
} from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const dockItems = [
    { icon: Home, label: 'בית', href: '/', isActive: pathname === '/' },
    { icon: BookOpen, label: 'מדריכים', href: '/guides', isActive: pathname.startsWith('/guides') },
    { icon: Briefcase, label: 'שירותים', href: '/products', isActive: pathname === '/products' },
    { icon: FolderOpen, label: 'עבודות', href: '/portfolio', isActive: pathname === '/portfolio' },
    { icon: Phone, label: 'צור קשר', href: '/contact', isActive: pathname === '/contact' },
    { icon: MessageCircle, label: 'וואטסאפ', href: 'https://wa.me/972542599107', isActive: false },
  ];

  return (
    <>
      {/* Desktop Top Navigation - Dark */}
      <nav className="sticky top-0 z-50 hidden lg:block" style={{background: 'rgba(5,13,26,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,209,255,0.12)'}}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-black tracking-tight">
                <span style={{color:'#ffffff'}}>Orci</span><span style={{background:'linear-gradient(135deg,#00d1ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>AI</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="flex items-center gap-8">
              <Link href="/" className={`text-base font-medium transition-colors ${pathname === '/' ? 'text-orci-cyan' : 'text-slate-300 hover:text-orci-cyan'}`}>בית</Link>

              <div className="relative group">
                <button className={`text-base font-medium transition-colors flex items-center gap-1 ${pathname.startsWith('/guides') ? 'text-orci-cyan' : 'text-slate-300 hover:text-orci-cyan'}`}>
                  מדריכים
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full right-0 mt-2 w-64 rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50" style={{background:'rgba(10,22,40,0.98)',border:'1px solid rgba(0,209,255,0.2)'}}>
                  <Link href="/guides" className="block px-4 py-2 text-slate-300 hover:text-orci-cyan hover:bg-white/5 transition-colors">כל המדריכים</Link>
                  <Link href="/guides/ai-beginners" className="block px-4 py-2 text-slate-300 hover:text-orci-cyan hover:bg-white/5 transition-colors">חפצים מדברים</Link>
                  <Link href="/guides/ai-influencer" className="block px-4 py-2 text-slate-300 hover:text-orci-cyan hover:bg-white/5 transition-colors">משפיענית AI</Link>
                  <Link href="/guides/penguin-viral" className="block px-4 py-2 text-slate-300 hover:text-orci-cyan hover:bg-white/5 transition-colors">טרנד הפינגווין</Link>
                  <Link href="/guides/new-guide" className="block px-4 py-2 text-slate-300 hover:text-orci-cyan hover:bg-white/5 transition-colors">טרנד הריחוף</Link>
                  <Link href="/guides/new-guide-2" className="block px-4 py-2 text-slate-300 hover:text-orci-cyan hover:bg-white/5 transition-colors">דמיות נטושות</Link>
                </div>
              </div>

              <Link href="/products" className={`text-base font-medium transition-colors ${pathname === '/products' ? 'text-orci-cyan' : 'text-slate-300 hover:text-orci-cyan'}`}>שירותים</Link>
              <Link href="/portfolio" className={`text-base font-medium transition-colors ${pathname === '/portfolio' ? 'text-orci-cyan' : 'text-slate-300 hover:text-orci-cyan'}`}>עבודות</Link>
              <Link href="/contact" className={`text-base font-medium transition-colors ${pathname === '/contact' ? 'text-orci-cyan' : 'text-slate-300 hover:text-orci-cyan'}`}>צור קשר</Link>

              <a href="https://wa.me/972542599107" target="_blank" rel="noopener noreferrer" className="px-5 py-2 bg-orci-cyan text-slate-900 rounded-full font-bold hover:opacity-90 transition-all flex items-center gap-2" style={{boxShadow:'0 0 16px rgba(0,209,255,0.35)'}}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                וואטסאפ
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Bar - Dark */}
      <nav className="sticky top-0 z-50 lg:hidden" style={{background: 'rgba(5,13,26,0.85)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(0,209,255,0.12)'}}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <div className="text-2xl font-black tracking-tight">
                <span style={{color:'#ffffff'}}>Orci</span><span style={{background:'linear-gradient(135deg,#00d1ff,#a855f7)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>AI</span>
              </div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Floating Dock - Bottom Navigation (all screen sizes) */}
      <div className="fixed bottom-4 left-0 right-0 z-50">
        <Dock items={dockItems} />
      </div>
    </>
  );
}
