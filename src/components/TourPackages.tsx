import { useState, useEffect } from 'react';
import { Clock, MapPin, Star, ArrowRight, Search, X, Check, Calendar, Users, Phone } from 'lucide-react';

const tours = [
  {
    id: 'bali-honeymoon',
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '4D/3N Bali Honeymoon Bliss',
    duration: '4 Days 3 Nights',
    durationDays: 4,
    location: 'Bali, Indonesia',
    price: '৳98,000',
    rating: 4.9,
    categories: ['international', 'honeymoon'],
    desc: 'Unwind in a luxurious private pool villa. Enjoy romantic candlelit dinners on the beach, scenic temple tours, and private driver services in tropical paradise.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Beach Dinner', desc: 'Arrive at Ngurah Rai Airport, private transfer to villa, sunset beach dinner in Jimbaran.' },
      { day: 'Day 2', title: 'Ubud Cultural Tour', desc: 'Visit Monkey Forest, Tegallalang Rice Terraces, and local art markets.' },
      { day: 'Day 3', title: 'Water Temple & Spa', desc: 'Visit Tanah Lot Temple, followed by a premium 2-hour couples spa treatment.' },
      { day: 'Day 4', title: 'Departure', desc: 'Leisure time in the morning, private transfer to airport for departure.' }
    ],
    inclusions: ['4-Star Private Pool Villa', 'Daily Breakfast & 1 Romantic Dinner', 'Private Airport Transfers', 'Dedicated Driver Guide', 'All Entrance Tickets'],
  },
  {
    id: 'dubai-highlights',
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '6D/5N Dubai City Highlights',
    duration: '6 Days 5 Nights',
    durationDays: 6,
    location: 'Dubai, UAE',
    price: '৳1,25,000',
    rating: 4.8,
    categories: ['international'],
    desc: 'Experience the glitz and glamour of Dubai. Visit the iconic Burj Khalifa, go on a thrilling desert safari, and explore traditional gold souks.',
    itinerary: [
      { day: 'Day 1', title: 'Arrival & Dhow Cruise', desc: 'Meet & greet at airport, transfer to hotel. Evening Marina Dhow Cruise with buffet dinner.' },
      { day: 'Day 2', title: 'Half-Day Dubai City Tour', desc: 'Visit Dubai Frame, Jumeirah Beach, and photo-stop at Burj Al Arab.' },
      { day: 'Day 3', title: 'Desert Safari Adventure', desc: 'Afternoon dune bashing, camel riding, henna painting, belly dance show, and BBQ dinner.' },
      { day: 'Day 4', title: 'Burj Khalifa & Mall', desc: 'Visit Burj Khalifa 124th floor, watch fountain show, shop at Dubai Mall.' },
      { day: 'Day 5', title: 'Leisure / Shopping Day', desc: 'Free day for shopping or visiting Miracle Garden (optional).' },
      { day: 'Day 6', title: 'Departure', desc: 'Free time until transfer to Dubai Airport for return flight.' }
    ],
    inclusions: ['4-Star Hotel Accommodation', 'Daily Breakfast & 2 Dinners', 'Desert Safari with BBQ', 'Burj Khalifa Entrance Ticket', 'All Transfers'],
  },
  {
    id: 'coxs-bazar',
    image: 'https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '5D/4N Cox\'s Bazar Escape',
    duration: '5 Days 4 Nights',
    durationDays: 5,
    location: "Cox's Bazar, BD",
    price: '৳28,500',
    rating: 4.7,
    categories: ['domestic'],
    desc: 'Relax on the world\'s longest natural sandy beach. Enjoy fresh seafood, tour Himchori waterfalls, and drive down the breathtaking Marine Drive road.',
    itinerary: [
      { day: 'Day 1', title: 'Dhaka to Cox\'s Bazar', desc: 'Arrive via flight/scenic coach. Check-in at beachside hotel. Evening beach stroll.' },
      { day: 'Day 2', title: 'Marine Drive & Himchori', desc: 'Drive down Marine Drive. Visit Himchori Waterfall and climb Dariya Nagar hills.' },
      { day: 'Day 3', title: 'Inani Beach Sunset', desc: 'Explore the coral stones at Inani Beach. Watch a beautiful sunset with beach snacks.' },
      { day: 'Day 4', title: 'Moheshkhali Island Trip', desc: 'Speedboat ride to Moheshkhali. Visit Adinath Temple and Rakhine Buddhist temples.' },
      { day: 'Day 5', title: 'Shopping & Return', desc: 'Local Burmese market shopping. Transfer to airport/station for departure.' }
    ],
    inclusions: ['Premium Beach Resort Stay', 'Daily Buffet Breakfast', 'Private sightseeing vehicle', 'Moheshkhali Boat Tickets', 'Tour Coordinator Support'],
  },
  {
    id: 'maldives-villa',
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '4D/3N Maldives Water Villa',
    duration: '4 Days 3 Nights',
    durationDays: 4,
    location: 'Maldives',
    price: '৳1,25,000',
    rating: 5.0,
    categories: ['international', 'honeymoon'],
    desc: 'Stay in a premium overwater villa with direct ocean access. Swim with sea turtles, indulge in gourmet meals, and experience ultimate luxury.',
    itinerary: [
      { day: 'Day 1', title: 'Speedboat Transfer', desc: 'Arrive at Male Airport, take scenic 30-min speedboat to resort. Welcome drinks and villa check-in.' },
      { day: 'Day 2', title: 'Snorkeling Safari', desc: 'Guided snorkeling tour to explore the coral reef. Free afternoon for water sports.' },
      { day: 'Day 3', title: 'Sunset Cruise', desc: 'Take a luxury catamaran cruise to spot dolphins at sunset.' },
      { day: 'Day 4', title: 'Departure', desc: 'Leisurely breakfast, check-out, and speedboat transfer back to Male Airport.' }
    ],
    inclusions: ['Luxury Overwater Villa', 'Full Board (All Meals Included)', 'Round-trip Speedboat Transfers', 'Complimentary Snorkeling Gear', 'Sunset Dolphin Cruise'],
  },
  {
    id: 'sylhet-retreat',
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '3D/2N Sylhet Tea Garden Retreat',
    duration: '3 Days 2 Nights',
    durationDays: 3,
    location: 'Sylhet, Bangladesh',
    price: '৳18,500',
    rating: 4.6,
    categories: ['domestic'],
    desc: 'Immerse yourself in green tea estates. Visit Ratargul Swamp Forest, Jaflong river beds, and stay in a beautiful eco-resort.',
    itinerary: [
      { day: 'Day 1', title: 'Tea Estates & Check-in', desc: 'Arrive in Sylhet. Visit Sreemangal tea gardens and taste the famous 7-layer tea.' },
      { day: 'Day 2', title: 'Jaflong & Ratargul', desc: 'Take a boat ride in Jaflong crystal-clear river. Visit Ratargul freshwater swamp forest.' },
      { day: 'Day 3', title: 'Return to Dhaka', desc: 'Visit Hazrat Shah Jalal Shrine, buy local spices, and head back to Dhaka.' }
    ],
    inclusions: ['Eco-Resort Stay', 'Daily Breakfast & Lunch', 'Boat Ride Fees', 'Private Sightseeing Car', 'Local English Speaking Guide'],
  },
  {
    id: 'europe-tour',
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '12D/11N Iconic Europe Tour',
    duration: '12 Days 11 Nights',
    durationDays: 12,
    location: 'Central & Western Europe',
    price: '৳3,60,000',
    rating: 4.9,
    categories: ['international'],
    desc: 'Cover the highlights of France, Switzerland, and Italy. Visit Eiffel Tower in Paris, Mt. Titlis in Swiss Alps, and the Colosseum in Rome.',
    itinerary: [
      { day: 'Day 1-3', title: 'Romantic Paris', desc: 'Eiffel Tower 2nd Floor, Seine River Cruise, Louvre Museum tour.' },
      { day: 'Day 4-6', title: 'Scenic Switzerland', desc: 'Stay in Engelberg/Lucerne. Ride Mount Titlis cable car, enjoy alpine views.' },
      { day: 'Day 7-9', title: 'Historic Florence & Venice', desc: 'Grand Canal gondola ride in Venice, walking tour of Florence Cathedral.' },
      { day: 'Day 10-12', title: 'Imperial Rome', desc: 'Guided Colosseum & Vatican Museum tours. Departure from Rome Airport.' }
    ],
    inclusions: ['3 & 4-Star Hotels with Breakfast', 'Schengen Visa Assistance', 'Paris to Switzerland High-Speed Train', 'Swiss Alps Cable Car Tickets', 'Rome Guided Entry Passes'],
  },
];

export default function TourPackages() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('');
  const [selectedTour, setSelectedTour] = useState<typeof tours[0] | null>(null);

  // Booking form in modal
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', date: '', guests: 1 });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Listen to search events from Hero
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { dest, duration } = customEvent.detail;
      setSearchQuery(dest || '');
      setDurationFilter(duration || '');
      setActiveCategory('all');
    };
    window.addEventListener('filter-tours', handleFilter);
    return () => window.removeEventListener('filter-tours', handleFilter);
  }, []);

  // Filter packages based on activeCategory, searchQuery, and durationFilter
  const filteredTours = tours.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.categories.includes(activeCategory);
    
    const matchesSearch = 
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    let matchesDuration = true;
    if (durationFilter === '3-5') {
      matchesDuration = t.durationDays >= 3 && t.durationDays <= 5;
    } else if (durationFilter === '6-9') {
      matchesDuration = t.durationDays >= 6 && t.durationDays <= 9;
    } else if (durationFilter === '10') {
      matchesDuration = t.durationDays >= 10;
    }

    return matchesCategory && matchesSearch && matchesDuration;
  });

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedTour(null);
      setBookingForm({ name: '', phone: '', date: '', guests: 1 });
    }, 3000);

    // Pass details to main contact form as pre-populated
    window.dispatchEvent(new CustomEvent('prepopulate-inquiry', {
      detail: {
        service: 'Tour Package',
        message: `Hello! I would like to book the "${selectedTour?.title}" for ${bookingForm.guests} guest(s) starting on ${bookingForm.date}. Please call me back on ${bookingForm.phone}.`
      }
    }));
  };

  return (
    <section id="tours" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-sky-600 font-extrabold text-xs uppercase tracking-widest block mb-2">Handpicked Journeys</span>
            <h2 className="text-3.5xl md:text-5xl font-black text-slate-800 tracking-tight">Featured Tours & Packages</h2>
          </div>
          
          {/* Real-time search inside section */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search packages or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Filter Tabs & Stats */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-6 mb-10">
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'international', 'domestic', 'honeymoon'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide uppercase transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-500/20'
                    : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300 hover:text-slate-800'
                }`}
              >
                {cat === 'all' ? 'All Packages' : cat}
              </button>
            ))}
          </div>
          <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
            Showing {filteredTours.length} packages
          </div>
        </div>

        {/* Packages Grid */}
        {filteredTours.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTours.map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTour(t)}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200/50 shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-sky-600/90 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
                    <Clock size={11} />
                    {t.duration}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-2">
                    <MapPin size={12} className="text-sky-500" />
                    {t.location}
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg mb-3 leading-snug group-hover:text-sky-700 transition-colors flex-1">{t.title}</h3>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    <div>
                      <span className="text-2.5xl font-black text-sky-700">{t.price}</span>
                      <span className="text-slate-400 text-xs ml-1">/ person</span>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-extrabold bg-amber-50 px-2.5 py-1 rounded-lg">
                      <Star size={12} fill="currentColor" />
                      {t.rating}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTour(t);
                    }}
                    className="mt-5 w-full bg-slate-50 group-hover:bg-sky-600 text-slate-700 group-hover:text-white font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-1"
                  >
                    View Details & Book
                    <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <MapPin className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-700 mb-1">No packages found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">We couldn't find any packages matching "{searchQuery}". Try adjusting your filters or search query.</p>
            <button
              onClick={() => { setSearchQuery(''); setDurationFilter(''); }}
              className="mt-5 bg-sky-50 hover:bg-sky-100 text-sky-700 text-xs font-bold px-5 py-2.5 rounded-full"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

      {/* Booking Details Modal Overlay */}
      {selectedTour && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-up relative">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedTour(null)}
              className="absolute right-5 top-5 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md hover:scale-105 transition-all"
            >
              <X size={16} />
            </button>

            {/* Modal Content - Scrollable container */}
            <div className="overflow-y-auto flex-1">
              <div className="grid md:grid-cols-5 gap-0">
                {/* Left image column */}
                <div className="md:col-span-2 relative h-56 md:h-auto min-h-[250px] bg-slate-100">
                  <img
                    src={selectedTour.image}
                    alt={selectedTour.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-xs bg-sky-600/90 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-wider block w-max mb-3">
                      {selectedTour.duration}
                    </span>
                    <h3 className="text-xl md:text-2xl font-black leading-tight mb-1">{selectedTour.title}</h3>
                    <div className="flex items-center gap-1.5 text-slate-300 text-xs mt-2">
                      <MapPin size={12} className="text-sky-400" />
                      {selectedTour.location}
                    </div>
                  </div>
                </div>

                {/* Right Info column */}
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col h-full justify-between">
                  {bookingSuccess ? (
                    <div className="flex flex-col items-center justify-center py-20 text-center h-full">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <Check size={28} className="text-emerald-600" />
                      </div>
                      <h4 className="text-slate-800 font-extrabold text-2xl mb-2">Booking Inquiry Sent!</h4>
                      <p className="text-slate-500 text-sm max-w-sm">We have received your interest. Our tour coordinator will contact you shortly.</p>
                    </div>
                  ) : (
                    <div>
                      {/* Description & Overview */}
                      <div className="mb-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2">Overview</h4>
                        <p className="text-slate-600 text-sm leading-relaxed">{selectedTour.desc}</p>
                      </div>

                      {/* Inclusions */}
                      <div className="mb-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">Package Inclusions</h4>
                        <ul className="grid sm:grid-cols-2 gap-2">
                          {selectedTour.inclusions.map((inc, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                              <Check size={13} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Daily Itinerary */}
                      <div className="mb-8 border-t border-slate-100 pt-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Brief Itinerary</h4>
                        <div className="space-y-4">
                          {selectedTour.itinerary.map((day, i) => (
                            <div key={i} className="flex gap-4">
                              <div className="text-sky-600 text-xs font-black uppercase tracking-wider w-14 flex-shrink-0 mt-0.5">{day.day}</div>
                              <div>
                                <h5 className="text-sm font-bold text-slate-800 mb-0.5">{day.title}</h5>
                                <p className="text-slate-500 text-xs leading-relaxed">{day.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Booking Request Form */}
                      <div className="border-t border-slate-100 pt-6">
                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Request a Booking Callback</h4>
                        <form onSubmit={handleBookSubmit} className="space-y-4">
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <input
                                type="text"
                                required
                                placeholder="Your Name"
                                value={bookingForm.name}
                                onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                              />
                            </div>
                            <div>
                              <input
                                type="tel"
                                required
                                placeholder="Phone Number"
                                value={bookingForm.phone}
                                onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                              />
                            </div>
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
                                placeholder="Number of Guests"
                                value={bookingForm.guests}
                                onChange={(e) => setBookingForm({...bookingForm, guests: parseInt(e.target.value) || 1})}
                                className="w-full bg-slate-50 border border-slate-200 pl-10 pr-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between gap-4 pt-2">
                            <div className="text-slate-800 text-lg font-black">{selectedTour.price} <span className="text-slate-400 text-xs font-semibold">/ person</span></div>
                            <button
                              type="submit"
                              className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-colors shadow-md shadow-sky-500/10 flex items-center gap-1.5"
                            >
                              <Phone size={13} />
                              Call Me Back
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

