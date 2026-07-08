import { useState } from 'react';
import { Send, Phone, Mail, MapPin, Facebook, Youtube, Instagram } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

export default function Footer() {
  const { footerSettings } = useDashboard();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  if (!footerSettings.isEnabled) return null;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollTo = (label: string) => {
    // Map link labels to anchor IDs
    const map: Record<string, string> = {
      'Home': '#home',
      'About Us': '#about',
      'Tour Packages': '#tours',
      'Air Tickets': '#flights',
      'Visa Services': '#visa',
      'Contact': '#contact',
    };
    const anchor = map[label] || `#${label.toLowerCase().replace(/\s+/g, '')}`;
    document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10">
                <img src="/logo.png" alt="Air Zone Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-extrabold text-white text-lg leading-none">AIR ZONE</div>
                <div className="text-slate-400 text-xs tracking-widest uppercase">Ltd.</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {footerSettings.brandTagline}
            </p>
            <div className="flex gap-3">
              <a
                href={footerSettings.facebookUrl}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-sky-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Facebook size={16} />
              </a>
              <a
                href={footerSettings.youtubeUrl}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Youtube size={16} />
              </a>
              <a
                href={footerSettings.instagramUrl}
                target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-slate-800 hover:bg-pink-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-5">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerSettings.quickLinks.map((l) => (
                <li key={l}>
                  <button
                    onClick={() => scrollTo(l)}
                    className="text-slate-400 hover:text-sky-400 text-sm transition-colors"
                  >
                    {l}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-bold text-white mb-5">Our Services</h4>
            <ul className="space-y-2.5">
              {footerSettings.services.map((s) => (
                <li key={s} className="text-slate-400 text-sm hover:text-sky-400 transition-colors cursor-default">{s}</li>
              ))}
            </ul>
          </div>

          {/* Newsletter + Contact */}
          <div>
            <h4 className="font-bold text-white mb-5">{footerSettings.newsletterTitle}</h4>
            <p className="text-slate-400 text-sm mb-4">{footerSettings.newsletterDesc}</p>
            <form onSubmit={handleSubscribe} className="flex mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-slate-800 border border-slate-700 text-white text-sm px-4 py-2.5 rounded-l-xl outline-none focus:border-sky-500 placeholder-slate-500"
              />
              <button
                type="submit"
                className="bg-sky-600 hover:bg-sky-500 text-white px-4 rounded-r-xl transition-colors"
              >
                <Send size={15} />
              </button>
            </form>
            {subscribed && <p className="text-emerald-400 text-xs mb-4">Subscribed successfully!</p>}

            <div className="space-y-2.5 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-sky-500 flex-shrink-0" />
                {footerSettings.address}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-sky-500 flex-shrink-0" />
                {footerSettings.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-sky-500 flex-shrink-0" />
                {footerSettings.email}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <span>&copy; {new Date().getFullYear()} {footerSettings.copyrightText}</span>
          <span>{footerSettings.licenseText}</span>
        </div>
      </div>
    </footer>
  );
}
