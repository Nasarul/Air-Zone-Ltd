import { useState, useEffect } from 'react';
import { Check, X, Shield, Phone, Calendar, Hotel, Plane, Clock, Award } from 'lucide-react';

interface PilgrimagePackage {
  id: string;
  title: string;
  duration: string;
  price: string;
  hotelMakkah: string;
  hotelMadinah: string;
  features: string[];
  badge?: string;
  category: string;
  details: string;
}

const hajjPackages: PilgrimagePackage[] = [
  {
    id: 'hajj-vip',
    title: 'Hajj VIP Gold Package',
    duration: '18 Days',
    price: '৳6,10,000',
    hotelMakkah: '5-Star PullMan ZamZam (0m from Haram)',
    hotelMadinah: '5-Star Oberoi Madinah (0m from Haram)',
    features: ['5-Star Hotels Near Haram', 'Business Class Flights', 'Private VIP AC Tents in Mina', 'Private SUV Transportation', 'Dedicated Guide & Scholar', 'Full Premium Catering'],
    badge: 'Most Popular',
    category: 'VIP',
    details: 'Our flagship VIP package is designed for maximum comfort. Stay in front-row hotels, fly business class, and enjoy exclusive services throughout your pilgrimage.'
  },
  {
    id: 'hajj-premium',
    title: 'Hajj Premium Package',
    duration: '22 Days',
    price: '৳5,25,000',
    hotelMakkah: '4-Star Swissôtel Makkah (150m from Haram)',
    hotelMadinah: '4-Star Al Aqeeq Madinah (100m from Haram)',
    features: ['4-Star Hotels Near Haram', 'Economy Class Flights', 'Upgraded AC Tents in Mina', 'Group AC Buses', 'Group Guide & Scholar', 'Full Buffet Catering'],
    badge: 'Best Value',
    category: 'Premium',
    details: 'A perfectly balanced package offering high-quality hotel stays, close proximity to the Holy Sites, and excellent group coordination services at a reasonable price.'
  },
  {
    id: 'hajj-group',
    title: 'Hajj Group Package',
    duration: '25 Days',
    price: '৳4,80,000',
    hotelMakkah: '3-Star Mawaddah Hotel (450m from Haram)',
    hotelMadinah: '3-Star Rawda Suite (200m from Haram)',
    features: ['3-Star Standard Hotels', 'Economy Class Flights', 'Standard Tents in Mina & Arafat', 'Standard AC Group Buses', 'Group Coordinator Support', 'Three Meals Daily'],
    badge: 'Budget Friendly',
    category: 'Economy',
    details: 'An affordable package focusing on essential services, group fellowship, and dedicated guidance. Ideal for budget-conscious pilgrims seeking a reliable partner.'
  },
];

const umrahPackages: PilgrimagePackage[] = [
  {
    id: 'umrah-vip',
    title: 'Umrah VIP Suite Package',
    duration: '14 Days',
    price: '৳1,80,000',
    hotelMakkah: '5-Star Swissôtel Makkah (0m from Haram)',
    hotelMadinah: '5-Star Pullman Madinah (0m from Haram)',
    features: ['5-Star Luxury Stays', 'Direct Flights (SV/BG)', 'Private SUV Airport Transfer', 'Ziyarah tours in private car', '1-on-1 Umrah Guide Service'],
    category: 'VIP',
    details: 'Perform your Umrah with absolute peace of mind. Includes executive hotel suites right in front of the courtyards of the two holy mosques.'
  },
  {
    id: 'umrah-premium',
    title: 'Umrah Standard Family Package',
    duration: '10 Days',
    price: '৳1,20,000',
    hotelMakkah: '4-Star Hotel (250m from Haram)',
    hotelMadinah: '4-Star Hotel (150m from Haram)',
    features: ['4-Star Midscale Stays', 'Transit / Direct Flights', 'Coordinated Group Transport', 'Group Ziyarah in Makkah & Madinah', 'Experienced Group Leader'],
    category: 'Premium',
    details: 'Our standard package is optimized for families. Comfortable hotel locations and friendly group leaders guide you through every step of your Umrah.'
  },
  {
    id: 'umrah-economy',
    title: 'Umrah Economy Package',
    duration: '7 Days',
    price: '৳85,000',
    hotelMakkah: '3-Star Hotel (500m from Haram)',
    hotelMadinah: '3-Star Hotel (350m from Haram)',
    features: ['3-Star Standard Stays', 'Budget Airline Flights', 'Coordinated Shared Buses', 'Group Ziyarah tours', 'Guided Group Rituals'],
    category: 'Economy',
    details: 'A brief, budget-friendly option providing essential hotel accommodation, visa support, and group transportation for a quick pilgrimage.'
  },
];

export default function HajjUmrah() {
  const [activeTab, setActiveTab] = useState<'hajj' | 'umrah'>('hajj');
  const [classFilter, setClassFilter] = useState('');
  const [selectedPkg, setSelectedPkg] = useState<PilgrimagePackage | null>(null);

  // Booking states
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', pilgrims: 1 });

  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Listen to search events from Hero
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { type, pkg } = customEvent.detail;
      if (type) setActiveTab(type as 'hajj' | 'umrah');
      if (pkg) {
        if (pkg === 'VIP') setClassFilter('VIP');
        else if (pkg === 'Premium') setClassFilter('Premium');
        else if (pkg === 'Economy') setClassFilter('Economy');
      } else {
        setClassFilter('');
      }
    };
    window.addEventListener('filter-hajj', handleFilter);
    return () => window.removeEventListener('filter-hajj', handleFilter);
  }, []);

  const activePackages = (activeTab === 'hajj' ? hajjPackages : umrahPackages).filter((pkg) => {
    if (!classFilter) return true;
    return pkg.category === classFilter;
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedPkg(null);
      setBookingForm({ name: '', phone: '', date: '', pilgrims: 1 });
    }, 3000);

    // Pass details to main contact form as pre-populated
    window.dispatchEvent(new CustomEvent('prepopulate-inquiry', {
      detail: {
        service: activeTab === 'hajj' ? 'Hajj Package' : 'Umrah Package',
        message: `Hello! I would like to book the "${selectedPkg?.title}" for ${bookingForm.pilgrims} pilgrim(s) planning to travel in ${bookingForm.date}. Please call me back on ${bookingForm.phone}.`
      }
    }));
  };

  return (
    <section id="hajj" className="py-24 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-50 rounded-full opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-80 h-80 bg-sky-50 rounded-full opacity-60 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider mb-3">
            <Award size={13} className="text-emerald-600 animate-spin-slow" />
            Ministry Authorized Agency
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Hajj & Umrah Packages</h2>
          <p className="text-slate-500 max-w-xl mx-auto mt-3 text-sm md:text-base leading-relaxed">
            Fulfill your sacred duty with comfort, devotion, and complete peace of mind. We provide IATA-certified accommodations and scholar-led guidance.
          </p>
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-100 pb-6 mb-10">
          <div className="flex bg-slate-100 p-1.5 rounded-2xl w-full sm:w-auto">
            <button
              onClick={() => { setActiveTab('hajj'); setClassFilter(''); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
                activeTab === 'hajj'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Hajj Pilgrimage
            </button>
            <button
              onClick={() => { setActiveTab('umrah'); setClassFilter(''); }}
              className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-extrabold transition-all ${
                activeTab === 'umrah'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/20'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Umrah Pilgrimage
            </button>
          </div>

          {/* Package filter drop */}
          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
            {['', 'VIP', 'Premium', 'Economy'].map((filter) => (
              <button
                key={filter}
                onClick={() => setClassFilter(filter)}
                className={`px-4 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all border whitespace-nowrap ${
                  classFilter === filter
                    ? 'bg-slate-800 text-white border-slate-800'
                    : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                {filter === '' ? 'All Standards' : `${filter} Class`}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {activePackages.map((p) => (
            <div
              key={p.id}
              onClick={() => setSelectedPkg(p)}
              className={`rounded-3xl border-2 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between cursor-pointer bg-white group transform hover:-translate-y-1 ${
                p.badge === 'Most Popular' ? 'border-emerald-500 shadow-md shadow-emerald-500/5' : 'border-slate-100'
              }`}
            >
              <div>
                {/* Header banner */}
                <div className={`text-center py-2 text-[10px] font-black uppercase tracking-widest text-white ${
                  p.badge === 'Most Popular' ? 'bg-emerald-600' : 'bg-slate-800'
                }`}>
                  {p.badge || 'Official Package'}
                </div>
                
                <div className="p-7">
                  <div className="relative mb-5 overflow-hidden rounded-2xl h-44">
                    <img
                      src={activeTab === 'hajj' 
                        ? 'https://images.pexels.com/photos/1591604/pexels-photo-1591604.jpeg?auto=compress&cs=tinysrgb&w=600' 
                        : 'https://images.pexels.com/photos/15858063/pexels-photo-15858063.jpeg?auto=compress&cs=tinysrgb&w=600'
                      }
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-black px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Clock size={11} className="text-emerald-600" />
                      {p.duration}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-800 text-lg mb-2 leading-snug group-hover:text-emerald-700 transition-colors">{p.title}</h3>
                  <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-5 flex items-center gap-1">
                    <Shield size={12} className="text-emerald-500" />
                    {p.category} Category
                  </div>

                  {/* Highlights list */}
                  <ul className="space-y-2.5 mb-6">
                    {p.features.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-xs text-slate-600 leading-normal">
                        <Check size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-7 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between mt-auto">
                <div>
                  <div className="text-slate-400 text-[10px] font-extrabold uppercase tracking-widest leading-none">Starting from</div>
                  <span className="text-2.5xl font-black text-emerald-800">{p.price}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPkg(p);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold tracking-wide uppercase px-5 py-3 rounded-xl transition-all shadow-sm"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Package Detail Modal */}
      {selectedPkg && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-up relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPkg(null)}
              className="absolute right-5 top-5 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md hover:scale-105 transition-all"
            >
              <X size={16} />
            </button>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {bookingSuccess ? (
                <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={28} className="text-emerald-600" />
                  </div>
                  <h4 className="text-slate-800 font-extrabold text-2xl mb-2">Request Submitted!</h4>
                  <p className="text-slate-500 text-sm max-w-sm">JazakAllah Khair. A representative from our dedicated Hajj & Umrah department will contact you within 12 hours.</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs bg-emerald-50 text-emerald-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedPkg.duration} Package
                    </span>
                    <span className="text-xs bg-slate-100 text-slate-800 font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                      {selectedPkg.category} Class
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-slate-800 leading-tight mb-4">{selectedPkg.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{selectedPkg.details}</p>

                  {/* Accommodation section */}
                  <div className="bg-slate-50 rounded-2xl p-5 mb-6 border border-slate-100">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3.5 flex items-center gap-1.5">
                      <Hotel size={13} className="text-emerald-600" />
                      Premium Hotel Stays
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="bg-white rounded-xl p-3 border border-slate-200/60">
                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Makkah Accommodation</div>
                        <div className="font-extrabold text-slate-800 text-xs mt-1 leading-snug">{selectedPkg.hotelMakkah}</div>
                      </div>
                      <div className="bg-white rounded-xl p-3 border border-slate-200/60">
                        <div className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Madinah Accommodation</div>
                        <div className="font-extrabold text-slate-800 text-xs mt-1 leading-snug">{selectedPkg.hotelMadinah}</div>
                      </div>
                    </div>
                  </div>

                  {/* Core Services Section */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
                      <Plane size={13} className="text-emerald-600" />
                      Services Included in Package
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {selectedPkg.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600 leading-normal">
                          <Check size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Callback form */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Request Consultation or Booking</h4>
                    <form onSubmit={handleBookSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <input
                            type="text"
                            required
                            placeholder="Your Full Name"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                        <div>
                          <input
                            type="tel"
                            required
                            placeholder="Phone Number"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Calendar size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Expected Travel Month/Year"
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="number"
                            min="1"
                            required
                            placeholder="Number of Pilgrims"
                            value={bookingForm.pilgrims}
                            onChange={(e) => setBookingForm({...bookingForm, pilgrims: parseInt(e.target.value) || 1})}
                            className="w-full bg-slate-50 border border-slate-200 px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <div className="text-slate-800 text-xl font-black">{selectedPkg.price}</div>
                        <button
                          type="submit"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-colors shadow-md shadow-emerald-500/10 flex items-center gap-1.5"
                        >
                          <Phone size={13} />
                          Request Callback
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

