import { Star } from 'lucide-react';

const packages = [
  {
    title: 'Hajj VIP Package',
    duration: '18 Days',
    price: '৳6,10,000',
    features: ['5-Star Hotel Near Haram', 'Business Class Flights', 'Private Transportation', 'Personal Guide', 'Full Visa Processing'],
    badge: 'Most Popular',
  },
  {
    title: 'Hajj Premium Package',
    duration: '22 Days',
    price: '৳5,25,000',
    features: ['4-Star Hotel Near Haram', 'Economy Class Flights', 'Group Transportation', 'Group Guide', 'Full Visa Processing'],
    badge: '',
  },
  {
    title: 'Hajj Group Package',
    duration: '25 Days',
    price: '৳4,80,000',
    features: ['3-Star Hotel', 'Economy Class Flights', 'Group Transportation', 'Group Guide', 'Visa Processing'],
    badge: 'Budget Friendly',
  },
];

const umrahPackages = [
  { title: 'Umrah VIP Package', duration: '14 Days', price: '৳1,80,000' },
  { title: 'Umrah Standard Package', duration: '10 Days', price: '৳1,20,000' },
  { title: 'Umrah Economy Package', duration: '7 Days', price: '৳85,000' },
];

export default function HajjUmrah() {
  return (
    <section id="hajj" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-emerald-600 font-semibold text-sm uppercase tracking-widest">Sacred Journeys</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-4">Hajj & Umrah Packages</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Experience a peaceful and spiritually enriching pilgrimage with our complete packages — including visa, flights, and premium accommodations near Masjid Al-Haram.
          </p>
        </div>

        {/* Hajj */}
        <h3 className="text-2xl font-bold text-slate-700 mb-8 flex items-center gap-3">
          <div className="w-1 h-6 bg-emerald-500 rounded-full" />
          Hajj Packages
        </h3>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {packages.map((p) => (
            <div
              key={p.title}
              className={`rounded-2xl border-2 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${
                p.badge === 'Most Popular' ? 'border-emerald-400' : 'border-slate-100'
              }`}
            >
              {p.badge ? (
                <div className={`text-center py-2 text-xs font-bold uppercase tracking-widest text-white ${
                  p.badge === 'Most Popular' ? 'bg-emerald-500' : 'bg-sky-500'
                }`}>
                  {p.badge}
                </div>
              ) : (
                <div className="py-2" />
              )}
              <div className="p-7">
                <img
                  src="https://images.pexels.com/photos/1591604/pexels-photo-1591604.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt={p.title}
                  className="w-full h-40 object-cover rounded-xl mb-5"
                />
                <h4 className="font-bold text-slate-800 text-lg">{p.title}</h4>
                <div className="text-slate-400 text-sm mb-4">{p.duration}</div>
                <ul className="space-y-2 mb-6">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                      <Star size={12} className="text-emerald-500 flex-shrink-0" fill="currentColor" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-extrabold text-emerald-700">{p.price}</span>
                  <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Umrah */}
        <h3 className="text-2xl font-bold text-slate-700 mb-8 flex items-center gap-3">
          <div className="w-1 h-6 bg-sky-500 rounded-full" />
          Umrah Packages
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {umrahPackages.map((u) => (
            <div
              key={u.title}
              className="flex items-center justify-between bg-slate-50 border border-slate-100 hover:border-sky-200 hover:bg-sky-50 rounded-2xl px-6 py-5 transition-all duration-200 group"
            >
              <div>
                <div className="font-bold text-slate-800">{u.title}</div>
                <div className="text-slate-400 text-sm mt-0.5">{u.duration}</div>
              </div>
              <div className="text-right">
                <div className="text-sky-700 font-extrabold text-lg">{u.price}</div>
                <button className="text-xs text-sky-600 font-semibold mt-1 group-hover:underline">Inquire</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
