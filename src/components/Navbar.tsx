import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Tour Packages', href: '#tours' },
  { label: 'Air Tickets', href: '#flights' },
  { label: 'Visa Services', href: '#visa' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { setPage } = useDashboard();
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
      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => handleLink('#home')} className="flex items-center gap-2 group">
            <div className="relative w-20 h-20 flex-shrink-0">
              <img src="/logo.png" alt="Air Zone Logo" className="w-full h-full object-contain" />
            </div>
            <div className="font-black text-2xl tracking-tight whitespace-nowrap select-none">
              <span className="text-secondary dark:text-accent-light">Air Zone</span>{' '}
              <span className="text-primary">Ltd.</span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleLink(l.href)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary rounded-lg hover:bg-primary/5 transition-colors duration-200"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setPage('login')}
              className="hidden md:inline-flex items-center gap-1 border border-slate-200 hover:border-primary hover:text-primary text-slate-600 text-xs font-semibold px-4 py-2.5 rounded-full transition-all duration-200"
            >
              Admin Portal
            </button>
            <button
              className="lg:hidden p-2 text-slate-600 hover:text-primary"
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
                className="text-left px-3 py-2.5 text-sm font-medium text-slate-600 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setPage('login');
              }}
              className="mt-2 text-center text-xs font-bold text-primary hover:bg-primary/5 border border-primary py-2.5 rounded-full"
            >
              Admin Portal
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
