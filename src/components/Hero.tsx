import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Plane, ShieldCheck, Globe, Calendar, ArrowRight } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Explore the World',
    subtitle: 'with Air Zone Ltd.',
    desc: 'Premium tour packages, Hajj & Umrah services, and seamless visa assistance — all in one place.',
    tagline: 'YOUR GATEWAY TO ADVENTURE',
  },
  {
    image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Sacred Journeys',
    subtitle: 'Hajj & Umrah',
    desc: 'Spiritually enriching pilgrimages with comprehensive packages including flights, visa, and accommodation.',
    tagline: 'SACRED & PEACEFUL PILGRIMAGES',
  },
  {
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Hassle-Free',
    subtitle: 'Visa Processing',
    desc: 'Fast, reliable visa processing for tourist, business, and student visas with expert documentation support.',
    tagline: 'FAST & SECURE APPLICATION',
  },
];

const stats = [
  { value: '15,000+', label: 'Happy Travelers' },
  { value: '120+', label: 'Tour Packages' },
  { value: '98%', label: 'Visa Success Rate' },
  { value: '24/7', label: 'Customer Support' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeTab, setActiveTab] = useState<'tours' | 'hajj' | 'visa'>('tours');

  // Search form states
  const [tourDest, setTourDest] = useState('');
  const [tourDuration, setTourDuration] = useState('');
  const [hajjType, setHajjType] = useState('hajj');
  const [hajjPkg, setHajjPkg] = useState('');
  const [visaCountry, setVisaCountry] = useState('');
  const [visaType, setVisaType] = useState('');

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((idx + slides.length) % slides.length);
    setTimeout(() => {
      setAnimating(false);
    }, 50);
  };

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 7000);
    return () => clearInterval(t);
  }, [current]);

  const handleSearch = () => {
    if (activeTab === 'tours') {
      window.dispatchEvent(new CustomEvent('filter-tours', { detail: { dest: tourDest, duration: tourDuration } }));
      document.querySelector('#tours')?.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'hajj') {
      window.dispatchEvent(new CustomEvent('filter-hajj', { detail: { type: hajjType, pkg: hajjPkg } }));
      document.querySelector('#hajj')?.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'visa') {
      window.dispatchEvent(new CustomEvent('filter-visa', { detail: { country: visaCountry, type: visaType } }));
      document.querySelector('#visa')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const slide = slides[current];

  return (
    <section id="home" className="relative bg-slate-900">
      {/* Slider */}
      <div className="relative h-[90vh] min-h-[600px] overflow-hidden">
        {/* Images with Ken Burns effect */}
        <div className="absolute inset-0">
          <img
            key={current}
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-2xl text-left">
              <div className="flex items-center gap-2 mb-4 animate-fade-up">
                <div className="w-8 h-0.5 bg-sky-400" />
                <span className="text-sky-300 text-xs md:text-sm font-extrabold uppercase tracking-widest">
                  {slide.tagline}
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7.5xl font-black text-white leading-tight mb-4 tracking-tight drop-shadow-sm">
                {slide.title}
                <br />
                <span className="bg-gradient-to-r from-sky-400 to-sky-300 bg-clip-text text-transparent">{slide.subtitle}</span>
              </h1>
              <p className="text-slate-300 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
                {slide.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => document.querySelector('#tours')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-sky-500/20 transform hover:-translate-y-0.5"
                >
                  Explore Packages <ArrowRight size={16} />
                </button>
                <button
                  onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white hover:bg-white/10 font-bold px-7 py-3.5 rounded-full transition-all duration-200"
                >
                  Get Free Consultation
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(current - 1)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-md"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => go(current + 1)}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-md"
        >
          <ChevronRight size={20} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-8 bg-sky-400' : 'w-2.5 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Premium Tabbed Search Widget */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 -mt-12">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-6 md:p-8">
          {/* Tabs */}
          <div className="flex gap-2 border-b border-slate-100 pb-5 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('tours')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'tours'
                  ? 'bg-sky-50 text-sky-700 shadow-sm'
                  : 'text-slate-500 hover:text-sky-700 hover:bg-slate-50'
              }`}
            >
              <Plane size={16} />
              Tour Packages
            </button>
            <button
              onClick={() => setActiveTab('hajj')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'hajj'
                  ? 'bg-emerald-50 text-emerald-700 shadow-sm'
                  : 'text-slate-500 hover:text-emerald-700 hover:bg-slate-50'
              }`}
            >
              <ShieldCheck size={16} />
              Hajj & Umrah
            </button>
            <button
              onClick={() => setActiveTab('visa')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === 'visa'
                  ? 'bg-amber-50 text-amber-700 shadow-sm'
                  : 'text-slate-500 hover:text-amber-700 hover:bg-slate-50'
              }`}
            >
              <Globe size={16} />
              Visa Processing
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid md:grid-cols-4 gap-4 items-end">
            {activeTab === 'tours' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Destination</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={tourDest}
                      onChange={(e) => setTourDest(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 appearance-none cursor-pointer"
                    >
                      <option value="">Any Destination</option>
                      <option value="Bali">Bali, Indonesia</option>
                      <option value="Dubai">Dubai, UAE</option>
                      <option value="Cox's Bazar">Cox's Bazar, BD</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Sylhet">Sylhet, BD</option>
                      <option value="Europe">Europe</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Duration</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={tourDuration}
                      onChange={(e) => setTourDuration(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 appearance-none cursor-pointer"
                    >
                      <option value="">Any Duration</option>
                      <option value="3-5">3 to 5 Days</option>
                      <option value="6-9">6 to 9 Days</option>
                      <option value="10">10+ Days</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2 flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Promo Code (Optional)</label>
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                  >
                    <Search size={16} />
                    Search Tours
                  </button>
                </div>
              </>
            )}

            {activeTab === 'hajj' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Service Category</label>
                  <select
                    value={hajjType}
                    onChange={(e) => setHajjType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="hajj">Hajj Packages</option>
                    <option value="umrah">Umrah Packages</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Package Standard</label>
                  <select
                    value={hajjPkg}
                    onChange={(e) => setHajjPkg(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 cursor-pointer"
                  >
                    <option value="">Any Class</option>
                    <option value="VIP">VIP Packages</option>
                    <option value="Premium">Premium Standard</option>
                    <option value="Economy">Economy / Group</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2 flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Pilgrim Count</label>
                    <input
                      type="number"
                      min="1"
                      placeholder="Number of pilgrims"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap animate-pulse-subtle"
                  >
                    <Search size={16} />
                    Search Packages
                  </button>
                </div>
              </>
            )}

            {activeTab === 'visa' && (
              <>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Select Country</label>
                  <div className="relative">
                    <MapPin size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <select
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 appearance-none cursor-pointer"
                    >
                      <option value="">Any Country</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Japan">Japan</option>
                      <option value="Singapore">Singapore</option>
                      <option value="United Arab Emirates">United Arab Emirates</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="USA">USA</option>
                      <option value="Schengen">Schengen (Europe)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Visa Category</label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    <option value="Tourist">Tourist Visa</option>
                    <option value="Business">Business Visa</option>
                    <option value="Student">Student Visa</option>
                  </select>
                </div>
                <div className="space-y-2 md:col-span-2 flex flex-col md:flex-row gap-4 items-stretch md:items-end">
                  <div className="flex-1 space-y-2">
                    <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Travel Date</label>
                    <input
                      type="date"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm whitespace-nowrap"
                  >
                    <Search size={16} />
                    Check Requirements
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-sky-950 text-white py-12 relative overflow-hidden border-t border-sky-900/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center group">

              <div className="text-3xl md:text-4.5xl font-black text-sky-400 group-hover:scale-105 transition-transform duration-300 inline-block">{s.value}</div>
              <div className="text-xs md:text-sm text-slate-400 mt-2 font-bold uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(3,105,161,0.12),transparent)] pointer-events-none" />
      </div>
    </section>
  );
}

