import { useState, useEffect } from 'react';
import { Plane, Calendar, Users, Search, X, Check, Phone, Info, Award } from 'lucide-react';

interface FlightDeal {
  id: string;
  airline: string;
  logo: string;
  from: string;
  to: string;
  price: string;
  duration: string;
  stops: string;
  cabin: string;
  baggage: string;
  type: 'domestic' | 'international';
  details: string;
  schedule: string;
}

const flightDeals: FlightDeal[] = [
  {
    id: 'dac-cxb',
    airline: 'US-Bangla Airlines',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150', // placeholder plane image
    from: 'Dhaka (DAC)',
    to: "Cox's Bazar (CXB)",
    price: '৳6,200',
    duration: '1h 00m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '20 kg',
    type: 'domestic',
    details: 'Regular daily flights on comfortable turboprop aircraft. Quick check-in and friendly service.',
    schedule: '08:30 AM - 09:30 AM'
  },
  {
    id: 'dac-cgp',
    airline: 'Novoair',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'Chittagong (CGP)',
    price: '৳5,800',
    duration: '0h 45m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '20 kg',
    type: 'domestic',
    details: 'Excellent business commuter flight with highly reliable on-time performance records.',
    schedule: '11:15 AM - 12:00 PM'
  },
  {
    id: 'dac-zyl',
    airline: 'Biman Bangladesh',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'Sylhet (ZYL)',
    price: '৳5,500',
    duration: '0h 45m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '20 kg',
    type: 'domestic',
    details: 'Daily service using modern fleets. In-flight mineral water provided.',
    schedule: '03:30 PM - 04:15 PM'
  },
  {
    id: 'dac-dxb',
    airline: 'Emirates',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'Dubai (DXB)',
    price: '৳68,000',
    duration: '4h 30m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '30 kg',
    type: 'international',
    details: 'Fly on the world-class Boeing 777. Enjoy premium multi-course meals, seatback entertainment, and famous crew hospitality.',
    schedule: '07:30 PM - 11:00 PM'
  },
  {
    id: 'dac-sin',
    airline: 'Singapore Airlines',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'Singapore (SIN)',
    price: '৳52,000',
    duration: '4h 15m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '25 kg',
    type: 'international',
    details: 'Award-winning passenger service. Features extensive media collections and premium hot dining options.',
    schedule: '11:55 PM - 06:10 AM (+1)'
  },
  {
    id: 'dac-lhr',
    airline: 'Qatar Airways',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'London (LHR)',
    price: '৳1,10,000',
    duration: '11h 45m',
    stops: '1 Stop (Doha)',
    cabin: 'Economy',
    baggage: '30 kg',
    type: 'international',
    details: 'Transit through Hamad International Airport (Doha), recognized as one of the best airports globally. Free transit meals included.',
    schedule: '10:40 AM - 05:25 PM'
  },
  {
    id: 'dac-kul',
    airline: 'US-Bangla Airlines',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'Kuala Lumpur (KUL)',
    price: '৳38,000',
    duration: '3h 50m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '25 kg',
    type: 'international',
    details: 'Direct flight linking Dhaka and KL. Friendly cabin crew and hot meals served onboard.',
    schedule: '08:50 AM - 12:40 PM'
  },
  {
    id: 'dac-bkk',
    airline: 'Thai Airways',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'Bangkok (BKK)',
    price: '৳32,000',
    duration: '2h 30m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '20 kg',
    type: 'international',
    details: 'Traditional Thai service, quick transit entry, and extensive vegetarian meal choices.',
    schedule: '02:00 PM - 04:30 PM'
  },
  {
    id: 'dac-ist',
    airline: 'Turkish Airlines',
    logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
    from: 'Dhaka (DAC)',
    to: 'Istanbul (IST)',
    price: '৳85,000',
    duration: '8h 15m',
    stops: 'Non-stop',
    cabin: 'Economy',
    baggage: '35 kg',
    type: 'international',
    details: 'Experience premium Turkish hospitality. Includes hot meals, free Wi-Fi messaging, and generous baggage allowance.',
    schedule: '06:30 AM - 12:45 PM'
  }
];

export default function AirTicketing() {
  const [activeTab, setActiveTab] = useState<'all' | 'domestic' | 'international'>('all');
  const [tripType, setTripType] = useState<'oneway' | 'roundtrip'>('oneway');
  const [fromAirport, setFromAirport] = useState('DAC');
  const [toAirport, setToAirport] = useState('');
  const [cabinClass, setCabinClass] = useState('Economy');
  
  // Search query states
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [selectedFlight, setSelectedFlight] = useState<FlightDeal | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '', date: '', passengers: 1 });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Listen to search events from Hero
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { from, to, date, cabin } = customEvent.detail;
      if (from) setFromAirport(from);
      if (to) {
        setToAirport(to);
        // Find matching deals and set filters accordingly
        const destDeal = flightDeals.find(deal => deal.to.toLowerCase().includes(to.toLowerCase()));
        if (destDeal) {
          setActiveTab(destDeal.type);
        }
      }
      if (date) setBookingForm(prev => ({ ...prev, date }));
      if (cabin) setCabinClass(cabin);
    };
    window.addEventListener('filter-flights', handleFilter);
    return () => window.removeEventListener('filter-flights', handleFilter);
  }, []);

  const filteredDeals = flightDeals.filter((deal) => {
    const matchesTab = activeTab === 'all' || deal.type === activeTab;
    
    // Check search query or "to" selection
    const term = searchQuery || toAirport;
    const matchesSearch = !term || 
      deal.to.toLowerCase().includes(term.toLowerCase()) || 
      deal.from.toLowerCase().includes(term.toLowerCase()) ||
      deal.airline.toLowerCase().includes(term.toLowerCase());

    const matchesCabin = !cabinClass || deal.cabin.toLowerCase() === cabinClass.toLowerCase() || cabinClass === 'Economy';

    return matchesTab && matchesSearch && matchesCabin;
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedFlight(null);
      setBookingForm({ name: '', phone: '', email: '', date: '', passengers: 1 });
    }, 3000);

    // Pass details to main contact form as pre-populated
    window.dispatchEvent(new CustomEvent('prepopulate-inquiry', {
      detail: {
        service: 'Air Ticket',
        message: `Hello! I would like to book a flight: "${selectedFlight?.airline} ${selectedFlight?.from} ➔ ${selectedFlight?.to}" on ${bookingForm.date} for ${bookingForm.passengers} passenger(s). Class: ${cabinClass}. Phone: ${bookingForm.phone}.`
      }
    }));
  };

  return (
    <section id="flights" className="py-24 bg-white relative overflow-hidden">
      {/* Visual decorations */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-sky-50 rounded-full opacity-65 blur-3xl pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-slate-50 rounded-full opacity-65 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-800 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-wider mb-3">
            <Award size={13} className="text-sky-600" />
            IATA Accredited Agency Partner
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight">Domestic & International Ticketing</h2>
          <p className="text-slate-500 max-w-xl mx-auto mt-3 text-sm md:text-base leading-relaxed">
            Find the cheapest flight routes on Biman Bangladesh, US-Bangla, Emirates, Qatar Airways, Singapore Airlines, and 100+ other airlines.
          </p>
        </div>

        {/* Flight Booking Search Widget inside the section */}
        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 mb-14 shadow-sm">
          <div className="flex gap-4 mb-5">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase text-slate-700">
              <input
                type="radio"
                name="trip-type"
                checked={tripType === 'oneway'}
                onChange={() => setTripType('oneway')}
                className="text-sky-600 focus:ring-sky-500/20"
              />
              One-Way
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase text-slate-700">
              <input
                type="radio"
                name="trip-type"
                checked={tripType === 'roundtrip'}
                onChange={() => setTripType('roundtrip')}
                className="text-sky-600 focus:ring-sky-500/20"
              />
              Round-Trip
            </label>
          </div>

          <div className="grid md:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">From</label>
              <select
                value={fromAirport}
                onChange={(e) => setFromAirport(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
              >
                <option value="DAC">Dhaka (DAC)</option>
                <option value="CGP">Chittagong (CGP)</option>
                <option value="ZYL">Sylhet (ZYL)</option>
                <option value="CXB">Cox's Bazar (CXB)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">To (Destination)</label>
              <select
                value={toAirport}
                onChange={(e) => setToAirport(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer"
              >
                <option value="">Select Destination</option>
                <optgroup label="Domestic">
                  <option value="Cox's Bazar">Cox's Bazar (CXB)</option>
                  <option value="Chittagong">Chittagong (CGP)</option>
                  <option value="Sylhet">Sylhet (ZYL)</option>
                </optgroup>
                <optgroup label="International">
                  <option value="Dubai">Dubai (DXB)</option>
                  <option value="Singapore">Singapore (SIN)</option>
                  <option value="London">London (LHR)</option>
                  <option value="Kuala Lumpur">Kuala Lumpur (KUL)</option>
                  <option value="Bangkok">Bangkok (BKK)</option>
                </optgroup>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Departure Date</label>
              <input
                type="date"
                value={bookingForm.date}
                onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Return Date</label>
              <input
                type="date"
                disabled={tripType === 'oneway'}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div className="flex gap-4 items-stretch">
              <div className="flex-1 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">Passengers</label>
                <input
                  type="number"
                  min="1"
                  value={bookingForm.passengers}
                  onChange={(e) => setBookingForm({...bookingForm, passengers: parseInt(e.target.value) || 1})}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                />
              </div>
              <button
                onClick={() => setSearchQuery(toAirport)}
                className="bg-sky-600 hover:bg-sky-700 text-white font-bold px-6 rounded-xl transition-colors flex items-center justify-center shadow-sm"
              >
                <Search size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-5 mb-8">
          <div className="flex gap-2">
            {['all', 'domestic', 'international'].map((tab) => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab as any); }}
                className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wide transition-all ${
                  activeTab === tab
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/10'
                    : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                {tab === 'all' ? 'All Routes' : `${tab} Flights`}
              </button>
            ))}
          </div>
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Showing {filteredDeals.length} available flight deals
          </div>
        </div>

        {/* Flight Deals List */}
        {filteredDeals.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDeals.map((deal) => (
              <div
                key={deal.id}
                onClick={() => setSelectedFlight(deal)}
                className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-slate-200/60 transition-all duration-300 group cursor-pointer flex flex-col justify-between transform hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-sky-50 text-sky-600 rounded-lg group-hover:scale-105 transition-transform">
                        <Plane size={18} />
                      </div>
                      <span className="text-xs font-black text-slate-800 uppercase tracking-wide">{deal.airline}</span>
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      deal.type === 'domestic' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {deal.type}
                    </span>
                  </div>

                  <div className="flex items-center justify-between py-4 border-y border-slate-100 mb-4">
                    <div className="text-left">
                      <div className="text-lg font-black text-slate-800">{deal.from.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{deal.from.match(/\(([^)]+)\)/)?.[1] || 'DAC'}</div>
                    </div>
                    <div className="flex flex-col items-center flex-1 px-4">
                      <div className="text-[10px] text-slate-400 font-semibold">{deal.duration}</div>
                      <div className="relative w-full h-0.5 bg-slate-200 my-1">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-sky-600 bg-white" />
                      </div>
                      <div className="text-[9px] text-sky-600 font-black uppercase tracking-widest">{deal.stops}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-black text-slate-800">{deal.to.split(' ')[0]}</div>
                      <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{deal.to.match(/\(([^)]+)\)/)?.[1] || 'CGP'}</div>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Standard Cabin:</span>
                      <span className="font-bold text-slate-800">{deal.cabin}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Baggage Allowance:</span>
                      <span className="font-bold text-slate-800">{deal.baggage}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Daily Schedule:</span>
                      <span className="font-bold text-slate-800">{deal.schedule}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <div>
                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest leading-none">Starting from</div>
                    <div className="text-2xl font-black text-sky-700">{deal.price}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFlight(deal);
                    }}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-xl transition-colors shadow-sm"
                  >
                    Inquire Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <Plane className="mx-auto text-slate-300 mb-4 rotate-45" size={48} />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No flights found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">We couldn't find flight deals matching "{searchQuery || toAirport}". Try adjusting your destination select fields.</p>
          </div>
        )}
      </div>

      {/* Flight Detail & Booking Modal */}
      {selectedFlight && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-up relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedFlight(null)}
              className="absolute right-5 top-5 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md hover:scale-105 transition-all"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
              <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
                <Plane size={24} />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                  {selectedFlight.from} to {selectedFlight.to}
                </h3>
                <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider mt-0.5">
                  {selectedFlight.airline} • {selectedFlight.cabin}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {bookingSuccess ? (
                <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={28} className="text-emerald-600" />
                  </div>
                  <h4 className="text-slate-800 font-extrabold text-2xl mb-2">Flight Request Submitted!</h4>
                  <p className="text-slate-500 text-sm max-w-sm">We have received your flight inquiry. Our ticketing department will check real-time seat availability and contact you shortly.</p>
                </div>
              ) : (
                <div>
                  {/* Summary grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Duration</div>
                      <div className="font-extrabold text-slate-800 text-xs mt-1">{selectedFlight.duration}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Baggage</div>
                      <div className="font-extrabold text-slate-800 text-xs mt-1">{selectedFlight.baggage}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-center">
                      <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Departure</div>
                      <div className="font-extrabold text-sky-700 text-xs mt-1">{selectedFlight.schedule.split(' - ')[0]}</div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Flight Description</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{selectedFlight.details}</p>
                  </div>

                  <div className="bg-slate-50 border border-slate-150 rounded-2xl p-5 mb-8 flex items-start gap-3">
                    <Info size={16} className="text-sky-600 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-slate-500 leading-relaxed">
                      <span className="font-bold text-slate-700 block mb-0.5">Important Booking Information:</span>
                      Ticket prices fluctuate based on real-time seat inventory. The pricing indicated above is a base guideline. Custom dates, holiday seasons, and booking classes may affect the final seat pricing.
                    </div>
                  </div>

                  {/* Flight inquiry form */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Request Flight Callback & Booking</h4>
                    <form onSubmit={handleBookSubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Your Full Name"
                          value={bookingForm.name}
                          onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={bookingForm.phone}
                          onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <Calendar size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="date"
                            required
                            value={bookingForm.date}
                            onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                          />
                        </div>
                        <div className="relative">
                          <Users size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="number"
                            min="1"
                            required
                            placeholder="Passengers count"
                            value={bookingForm.passengers}
                            onChange={(e) => setBookingForm({...bookingForm, passengers: parseInt(e.target.value) || 1})}
                            className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <div className="text-slate-800 text-xl font-black">{selectedFlight.price} <span className="text-slate-400 text-xs font-semibold">est. / seat</span></div>
                        <button
                          type="submit"
                          className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-colors shadow-md shadow-sky-500/10 flex items-center gap-1.5"
                        >
                          <Phone size={12} />
                          Check Availability
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
