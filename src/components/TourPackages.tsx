import { useState, useEffect } from 'react';
import { Clock, MapPin, Star, ArrowRight, Search, X, Check, Calendar, Users, Phone } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';
import { TourPackageItem } from '../types/dashboard';

export default function TourPackages() {
  const { packagesSettings, setPage, setActiveTour } = useDashboard();
  if (!packagesSettings.isEnabled) return null;
  const tours = packagesSettings.items;
  const title = packagesSettings.title;
  const subtitle = packagesSettings.subtitle;

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [durationFilter, setDurationFilter] = useState('');

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

  // Booking logic moved to TourDetails.tsx

  return (
    <section id="tours" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-primary font-extrabold text-xs uppercase tracking-widest block mb-2">{subtitle}</span>
            <h2 className="text-3.5xl md:text-5xl font-black text-slate-800 tracking-tight">{title}</h2>
          </div>
          
          {/* Real-time search inside section */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search packages or destinations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary shadow-sm transition-all"
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
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
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
          <div className="flex flex-wrap justify-center gap-8">
            {filteredTours.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  setActiveTour(t);
                  setPage('tour-details');
                }}
                className="bg-white rounded-3xl overflow-hidden border border-slate-100 hover:border-slate-200/50 shadow-sm hover:shadow-2xl transition-all duration-300 group cursor-pointer flex flex-col h-full transform hover:-translate-y-1 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.333%-22px)] min-w-[280px] max-w-[380px]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 bg-primary/90 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full flex items-center gap-1.5 backdrop-blur-sm shadow-sm">
                    <Clock size={11} />
                    {t.duration}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold mb-2">
                    <MapPin size={12} className="text-primary-light" />
                    {t.location}
                  </div>
                  <h3 className="font-extrabold text-slate-800 text-lg mb-3 leading-snug group-hover:text-primary transition-colors flex-1">{t.title}</h3>
                  
                  <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-auto">
                    <div>
                      <span className="text-2.5xl font-black text-primary">{t.price}</span>
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
                      setActiveTour(t);
                      setPage('tour-details');
                    }}
                    className="mt-5 w-full bg-slate-50 group-hover:bg-primary text-slate-700 group-hover:text-white font-extrabold text-xs tracking-wider uppercase py-3.5 rounded-2xl transition-all duration-200 flex items-center justify-center gap-1"
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
              className="mt-5 bg-primary/5 hover:bg-primary/10 text-primary text-xs font-bold px-5 py-2.5 rounded-full"
            >
              Reset Search
            </button>
          </div>
        )}
      </div>

    </section>
  );
}

