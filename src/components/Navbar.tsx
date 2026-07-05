import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tour Packages', href: '#tours' },
  { label: 'Hajj & Umrah', href: '#hajj' },
  { label: 'Visa Services', href: '#visa' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLink = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Top bar */}
      <div className="bg-sky-700 text-white text-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          <span className="opacity-80">Licensed by Civil Aviation Authority — Air Zone Ltd.</span>
          <div className="flex items-center gap-2 font-medium">
            <Phone size={14} />
            <span>+880 1700-000000</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleLink('#home')} className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 flex-shrink-0">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                <circle cx="20" cy="20" r="20" fill="#0369a1" />
                <path d="M8 22L20 10L32 22" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 30L20 10L26 30" stroke="#7dd3fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10 22H30" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="leading-tight">
              <div className="text-sky-700 font-extrabold text-lg tracking-tight leading-none">AIR ZONE</div>
              <div className="text-slate-500 text-xs font-semibold tracking-widest uppercase">Ltd.</div>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-sky-700 rounded-lg hover:bg-sky-50 transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLink('#contact')}
              className="hidden md:inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200 shadow-sm"
            >
              Get a Quote
            </button>
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-sky-700"
              onClick={() => setOpen(!open)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            open ? 'max-h-96 border-t border-slate-100' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col px-6 pb-4 pt-2 gap-1 bg-white">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-sky-700 hover:bg-sky-50 rounded-lg transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => handleLink('#contact')}
              className="mt-2 bg-sky-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full"
            >
              Get a Quote
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
