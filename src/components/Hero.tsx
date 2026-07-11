import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin, Plane, Globe, Calendar, ArrowRight } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

const stats = [
  { value: '15,000+', label: 'Happy Travelers' },
  { value: '120+', label: 'Tour Packages' },
  { value: '98%', label: 'Visa Success Rate' },
  { value: '24/7', label: 'Customer Support' },
];

export default function Hero() {
  const { heroSettings } = useDashboard();
  const [activeTab, setActiveTab] = useState<'tours' | 'flights' | 'visa'>('tours');
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((e) => console.log('Autoplay prevented:', e));
    }
  }, [heroSettings.videoUrl]);

  // Search form states
  const [tourDest, setTourDest] = useState('');
  const [tourDuration, setTourDuration] = useState('');
  const [flightFrom, setFlightFrom] = useState('DAC');
  const [flightTo, setFlightTo] = useState('');
  const [flightDate, setFlightDate] = useState('');
  const flightCabin = 'Economy';
  const [visaCountry, setVisaCountry] = useState('');
  const [visaType, setVisaType] = useState('');

  if (!heroSettings.isEnabled) return null;

  const handleSearch = () => {
    if (activeTab === 'tours') {
      window.dispatchEvent(new CustomEvent('filter-tours', { detail: { dest: tourDest, duration: tourDuration } }));
      document.querySelector('#tours')?.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'flights') {
      window.dispatchEvent(new CustomEvent('filter-flights', { detail: { from: flightFrom, to: flightTo, date: flightDate, cabin: flightCabin } }));
      document.querySelector('#flights')?.scrollIntoView({ behavior: 'smooth' });
    } else if (activeTab === 'visa') {
      window.dispatchEvent(new CustomEvent('filter-visa', { detail: { country: visaCountry, type: visaType } }));
      document.querySelector('#visa')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-slate-950">
      {/* Video Background Container */}
      <div className="relative h-[100vh] min-h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <video
            ref={videoRef}
            key={heroSettings.videoUrl}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onCanPlay={(e) => {
              e.currentTarget.muted = true;
              e.currentTarget.play().catch(console.log);
            }}
            poster="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
            className="w-full h-full object-cover object-center scale-105"
          >
            <source src={heroSettings.videoUrl} />
          </video>
          {/* Premium Dark Overlay for Perfect Text Contrast */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-900/20" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center pb-32 pt-20">
          <div className="max-w-7xl mx-auto px-6 w-full text-center">
            <div className="max-w-5xl mx-auto animate-fade-up">
              {/* Main Headline Centered */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                {heroSettings.title}
                <span className="block text-primary mt-2 md:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold opacity-95">
                  {heroSettings.subtitle}
                </span>
              </h1>
            </div>
          </div>
        </div>

      </div>

      {/* Premium Tabbed Search Widget (Overlapping Hero) */}
      <div className="relative z-30 max-w-6xl mx-auto px-4 sm:px-6 -mt-28 mb-24">
        <div className="bg-white rounded-[2rem] shadow-2xl border border-slate-100 p-6 md:p-10 backdrop-blur-3xl">
          {/* Tabs */}
          <div className="flex gap-3 border-b border-slate-100 pb-6 mb-8 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('tours')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm md:text-base font-bold transition-all whitespace-nowrap ${
                activeTab === 'tours'
                  ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-105 transform origin-left'
                  : 'text-slate-500 hover:text-primary hover:bg-primary/5 bg-slate-50'
              }`}
            >
              <Calendar size={18} />
              Tour Packages
            </button>
            <button
              onClick={() => setActiveTab('flights')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm md:text-base font-bold transition-all whitespace-nowrap ${
                activeTab === 'flights'
                  ? 'bg-secondary text-white shadow-lg shadow-secondary/20 scale-105 transform origin-left'
                  : 'text-slate-500 hover:text-secondary hover:bg-secondary/5 bg-slate-50'
              }`}
            >
              <Plane size={18} />
              Air Tickets
            </button>
            <button
              onClick={() => setActiveTab('visa')}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-sm md:text-base font-bold transition-all whitespace-nowrap ${
                activeTab === 'visa'
                  ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20 scale-105 transform origin-left'
                  : 'text-slate-500 hover:text-amber-600 hover:bg-amber-50 bg-slate-50'
              }`}
            >
              <Globe size={18} />
              Visa Processing
            </button>
          </div>

          {/* Search Inputs Grid */}
          <div className="grid md:grid-cols-4 gap-5 items-end animate-fade-in">
            {activeTab === 'tours' && (
              <>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Destination</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                    <select
                      value={tourDest}
                      onChange={(e) => setTourDest(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer"
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
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Duration</label>
                  <div className="relative">
                    <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
                    <select
                      value={tourDuration}
                      onChange={(e) => setTourDuration(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Any Duration</option>
                      <option value="3-5">3 to 5 Days</option>
                      <option value="6-9">6 to 9 Days</option>
                      <option value="10">10+ Days</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2.5 md:col-span-2 flex flex-col md:flex-row gap-5 items-stretch md:items-end">
                  <div className="flex-1 space-y-2.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Promo Code (Optional)</label>
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-primary hover:bg-primary-hover text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary/25 hover:-translate-y-0.5 whitespace-nowrap text-base"
                  >
                    <Search size={20} />
                    Search Tours
                  </button>
                </div>
              </>
            )}

            {activeTab === 'flights' && (
              <>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">From (Origin)</label>
                  <div className="relative">
                    <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                    <select
                      value={flightFrom}
                      onChange={(e) => setFlightFrom(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all appearance-none cursor-pointer"
                    >
                      <option value="DAC">Dhaka (DAC)</option>
                      <option value="CGP">Chittagong (CGP)</option>
                      <option value="ZYL">Sylhet (ZYL)</option>
                      <option value="CXB">Cox's Bazar (CXB)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">To (Destination)</label>
                  <div className="relative">
                    <Plane size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" />
                    <select
                      value={flightTo}
                      onChange={(e) => setFlightTo(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select Destination</option>
                      <option value="Cox's Bazar">Cox's Bazar (CXB)</option>
                      <option value="Dubai">Dubai (DXB)</option>
                      <option value="Singapore">Singapore (SIN)</option>
                      <option value="London">London (LHR)</option>
                      <option value="Kuala Lumpur">Kuala Lumpur (KUL)</option>
                      <option value="Bangkok">Bangkok (BKK)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2.5 md:col-span-2 flex flex-col md:flex-row gap-5 items-stretch md:items-end">
                  <div className="flex-1 space-y-2.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Departure Date</label>
                    <input
                      type="date"
                      value={flightDate}
                      onChange={(e) => setFlightDate(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-secondary/10 focus:border-secondary transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-secondary hover:bg-secondary/90 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-secondary/25 hover:-translate-y-0.5 whitespace-nowrap text-base"
                  >
                    <Search size={20} />
                    Search Flights
                  </button>
                </div>
              </>
            )}

            {activeTab === 'visa' && (
              <>
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Select Country</label>
                  <div className="relative">
                    <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-500" />
                    <select
                      value={visaCountry}
                      onChange={(e) => setVisaCountry(e.target.value)}
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all appearance-none cursor-pointer"
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
                <div className="space-y-2.5">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Visa Category</label>
                  <select
                    value={visaType}
                    onChange={(e) => setVisaType(e.target.value)}
                    className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all cursor-pointer"
                  >
                    <option value="">All Categories</option>
                    <option value="Tourist">Tourist Visa</option>
                    <option value="Business">Business Visa</option>
                    <option value="Student">Student Visa</option>
                  </select>
                </div>
                <div className="space-y-2.5 md:col-span-2 flex flex-col md:flex-row gap-5 items-stretch md:items-end">
                  <div className="flex-1 space-y-2.5">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block ml-1">Travel Date</label>
                    <input
                      type="date"
                      className="w-full bg-slate-50/50 hover:bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-700 text-sm md:text-base font-medium focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:-translate-y-0.5 whitespace-nowrap text-base"
                  >
                    <Search size={20} />
                    Check Requirements
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-secondary text-white py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center group flex flex-col items-center justify-center">
              <div className="text-4xl md:text-5xl lg:text-6xl font-black text-white group-hover:text-primary-light transition-colors duration-300 mb-3 drop-shadow-md">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-slate-300 font-bold uppercase tracking-widest bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-sm border border-white/5">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(144,26,29,0.15),transparent)] pointer-events-none" />
      </div>
    </section>
  );
}


