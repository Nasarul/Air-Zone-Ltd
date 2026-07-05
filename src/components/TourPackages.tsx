import { Clock, MapPin, Star, ArrowRight } from 'lucide-react';

const tours = [
  {
    image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '4D/3N Bali Honeymoon Bliss',
    duration: '4 Days 3 Nights',
    location: 'Bali, Indonesia',
    price: '৳98,000',
    rating: 4.9,
  },
  {
    image: 'https://images.pexels.com/photos/2044434/pexels-photo-2044434.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '6D/5N Dubai City Highlights',
    duration: '6 Days 5 Nights',
    location: 'Dubai, UAE',
    price: '৳1,25,000',
    rating: 4.8,
  },
  {
    image: 'https://images.pexels.com/photos/6985003/pexels-photo-6985003.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '5D/4N Cox\'s Bazar Escape',
    duration: '5 Days 4 Nights',
    location: "Cox's Bazar, BD",
    price: '৳28,500',
    rating: 4.7,
  },
  {
    image: 'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '4D/3N Maldives Water Villa',
    duration: '4 Days 3 Nights',
    location: 'Maldives',
    price: '৳1,25,000',
    rating: 5.0,
  },
  {
    image: 'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '3D/2N Sylhet Tea Garden Retreat',
    duration: '3 Days 2 Nights',
    location: 'Sylhet, Bangladesh',
    price: '৳18,500',
    rating: 4.6,
  },
  {
    image: 'https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=800',
    title: '12D/11N Iconic Europe Tour',
    duration: '12 Days 11 Nights',
    location: 'Central & Western Europe',
    price: '৳3,60,000',
    rating: 4.9,
  },
];

export default function TourPackages() {
  return (
    <section id="tours" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
          <div>
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">Handpicked for You</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2">Featured Tours & Packages</h2>
          </div>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 text-sky-600 font-semibold hover:text-sky-800 transition-colors group"
          >
            View All Packages <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((t) => (
            <div
              key={t.title}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5">
                  <Clock size={11} />
                  {t.duration}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-2">
                  <MapPin size={12} />
                  {t.location}
                </div>
                <h3 className="font-bold text-slate-800 text-base mb-3 leading-snug">{t.title}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-extrabold text-sky-700">{t.price}</span>
                    <span className="text-slate-400 text-xs ml-1">/ person</span>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500 text-sm font-semibold">
                    <Star size={14} fill="currentColor" />
                    {t.rating}
                  </div>
                </div>
                <button className="mt-4 w-full bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white font-semibold text-sm py-2.5 rounded-xl transition-colors duration-200">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
