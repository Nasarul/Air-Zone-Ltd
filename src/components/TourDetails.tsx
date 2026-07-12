import { useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Star, Check, Calendar, Users, Phone, X, Shield, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

export default function TourDetails() {
  const { activeTour, setPage } = useDashboard();
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', guests: 1 });
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!activeTour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Tour Not Found</h2>
          <button 
            onClick={() => setPage('landing')}
            className="bg-primary text-white px-6 py-2 rounded-full font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Mock extra data that isn't in activeTour model natively
  const gallery = [activeTour.image, 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80', 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80'];
  const exclusions = ['International flights', 'Visa fees', 'Travel insurance', 'Personal expenses (shopping, laundry, etc.)', 'Optional activities not listed in itinerary'];
  const highlights = ['Exclusive premium accommodations', 'Expert local guides', 'Skip-the-line attraction tickets', 'Authentic culinary experiences'];
  const faqs = [
    { q: 'What is the best time to visit?', a: 'The ideal time is during the dry season, which offers pleasant weather and clear skies, perfect for sightseeing and outdoor activities.' },
    { q: 'Is this tour family-friendly?', a: 'Yes! This tour is designed to accommodate families with children, offering flexible activities and family-friendly accommodations.' },
    { q: 'How physically demanding is this tour?', a: 'This is a moderate-paced tour. There will be some walking during city tours and light hiking, but nothing excessively strenuous.' }
  ];
  const reviews = [
    { name: 'David Smith', rating: 5, date: 'October 2025', text: 'An absolute dream vacation. Everything was handled perfectly by Air Zone Ltd.' },
    { name: 'Emma Wilson', rating: 5, date: 'September 2025', text: 'The guides were so knowledgeable and the hotels were fantastic. Highly recommend!' }
  ];

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingForm({ name: '', phone: '', date: '', guests: 1 });
    }, 4000);

    // Pass details to main contact form as pre-populated event (optional if you still want to tie it into global inquiry)
    window.dispatchEvent(new CustomEvent('prepopulate-inquiry', {
      detail: {
        service: 'Tour Package',
        message: `Hello! I would like to book the "${activeTour?.title}" for ${bookingForm.guests} guest(s) starting on ${bookingForm.date}. Please call me back on ${bookingForm.phone}.`
      }
    }));
  };

  return (
    <div className="pb-24 pt-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] w-full bg-slate-900">
        <img 
          src={activeTour.image} 
          alt={activeTour.title} 
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
        
        {/* Top Nav */}
        <div className="absolute top-6 left-6 z-10">
          <button 
            onClick={() => setPage('landing')}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-bold transition-all"
          >
            <ArrowLeft size={16} /> Back to Packages
          </button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="text-white max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {activeTour.duration}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5">
                <MapPin size={12} /> {activeTour.location}
              </span>
              <span className="bg-amber-500/90 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 text-white">
                <Star size={12} fill="currentColor" /> {activeTour.rating}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-tight">{activeTour.title}</h1>
            <p className="text-lg text-slate-300 max-w-2xl">{activeTour.desc}</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl w-full md:w-auto text-white flex flex-col items-center justify-center md:min-w-[250px]">
            <span className="text-sm font-semibold text-slate-300 mb-1">Starting from</span>
            <div className="text-4xl font-black text-white mb-4">{activeTour.price}<span className="text-lg font-normal text-slate-300">/pp</span></div>
            <button 
              onClick={() => {
                document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full bg-primary hover:bg-primary-hover text-white font-black py-3 rounded-xl transition-all shadow-lg shadow-primary/30 uppercase tracking-widest text-sm"
            >
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column (Details) */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Tabs */}
          <div className="flex overflow-x-auto border-b border-slate-200 pb-px hide-scrollbar sticky top-[72px] bg-slate-50 z-20 pt-4">
            {['Overview', 'Itinerary', 'Inclusions', 'Gallery', 'Reviews', 'FAQs'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab.toLowerCase());
                  document.getElementById(tab.toLowerCase())?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`px-6 py-4 font-bold text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.toLowerCase() ? 'border-primary text-primary' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Overview */}
          <section id="overview" className="scroll-mt-32">
            <h2 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-2"><Info className="text-primary" /> Tour Overview</h2>
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">{activeTour.desc}</p>
            
            <h3 className="text-lg font-bold text-slate-800 mb-4">Destination Highlights</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Star size={14} className="text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{h}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Itinerary */}
          <section id="itinerary" className="scroll-mt-32">
            <h2 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-2"><MapPin className="text-primary" /> Daily Itinerary</h2>
            <div className="space-y-6">
              {(activeTour.itinerary || [
                { day: 'Day 1', title: 'Arrival & Welcome', desc: 'Arrive at the destination. Transfer to the hotel and enjoy a welcome dinner.' },
                { day: 'Day 2', title: 'City Tour', desc: 'Explore the highlights of the city with an expert guide.' },
                { day: 'Day 3', title: 'Departure', desc: 'Breakfast at the hotel before transferring to the airport.' }
              ]).map((day: any, i: number, arr: any[]) => (
                <div key={i} className="flex gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative">
                  <div className="hidden md:flex absolute -left-[11px] top-8 w-6 h-6 rounded-full border-4 border-slate-50 bg-primary z-10"></div>
                  {i !== arr.length - 1 && (
                    <div className="hidden md:block absolute left-[0px] top-14 bottom-[-30px] w-0.5 bg-slate-200 z-0"></div>
                  )}
                  
                  <div className="flex-shrink-0 w-16 text-center">
                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-1">Day</span>
                    <span className="text-3xl font-black text-primary">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">{day.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{day.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Inclusions & Exclusions */}
          <section id="inclusions" className="scroll-mt-32 grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><Check className="text-emerald-500" /> What's Included</h2>
              <ul className="space-y-3">
                {((activeTour.inclusions as string[]) || ['Hotel accommodation', 'Daily breakfast', 'Airport transfers']).map((inc: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100">
                    <Check size={18} className="text-emerald-500 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><X className="text-rose-500" /> What's Excluded</h2>
              <ul className="space-y-3">
                {exclusions.map((exc, i) => (
                  <li key={i} className="flex items-start gap-3 bg-white p-3 rounded-lg border border-slate-100">
                    <X size={18} className="text-rose-500 mt-0.5" />
                    <span className="text-sm font-medium text-slate-700">{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Gallery */}
          <section id="gallery" className="scroll-mt-32">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Tour Gallery</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((img, i) => (
                <div key={i} className={`rounded-xl overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
                  <img src={img} alt="Gallery" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 min-h-[150px]" />
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section id="faqs" className="scroll-mt-32">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center font-bold text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    {faq.q}
                    {openFaq === i ? <ChevronUp size={18} className="text-slate-400" /> : <ChevronDown size={18} className="text-slate-400" />}
                  </button>
                  {openFaq === i && (
                    <div className="px-6 pb-4 text-slate-600 text-sm leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Reviews */}
          <section id="reviews" className="scroll-mt-32">
            <h2 className="text-2xl font-black text-slate-800 mb-6">Customer Reviews</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {reviews.map((rev, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(rev.rating)].map((_, j) => (
                      <Star key={j} size={14} className="text-amber-500" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm italic mb-4">"{rev.text}"</p>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-800 text-sm">{rev.name}</span>
                    <span className="text-xs text-slate-400 font-semibold">{rev.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* Right Column (Booking Widget) */}
        <div className="lg:col-span-1">
          <div id="booking-section" className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 md:p-8 sticky top-24">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-6 mb-6">
              <div>
                <span className="text-slate-500 text-sm font-semibold">Price per person</span>
                <div className="text-3xl font-black text-primary mt-1">{activeTour.price}</div>
              </div>
              <div className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg flex items-center gap-1.5 text-xs font-bold">
                <Shield size={14} /> Secure Booking
              </div>
            </div>

            {bookingSuccess ? (
              <div className="py-10 text-center animate-fade-in">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check size={32} className="text-emerald-600" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">Request Received!</h3>
                <p className="text-sm text-slate-500">Our tour specialist will contact you shortly to confirm your booking and details.</p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Select Date</label>
                  <div className="relative">
                    <Calendar size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingForm({...bookingForm, date: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Number of Guests</label>
                  <div className="relative">
                    <Users size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="number"
                      min="1"
                      required
                      value={bookingForm.guests}
                      onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value) || 1})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-11 pr-4 py-3.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Your Contact Details</label>
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                    <input
                      type="tel"
                      required
                      placeholder="Phone Number"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                </div>

                <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100 flex gap-3 my-4">
                  <Info size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-600 leading-relaxed">No payment is required right now. You are simply requesting to hold your spot. We will call you to arrange payment.</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white font-black text-sm tracking-widest uppercase py-4 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group"
                >
                  <Phone size={16} className="group-hover:-rotate-12 transition-transform" />
                  Request Booking
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
