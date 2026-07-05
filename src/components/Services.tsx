import { Globe, Plane, Compass } from 'lucide-react';

const services = [
  {
    icon: Compass,
    title: 'Tour Packages',
    desc: 'Curated domestic and international tour packages with flights, hotels, and guided experiences tailored to every budget.',
    color: 'bg-sky-50 text-sky-600',
    border: 'hover:border-sky-200',
  },
  {
    icon: Plane,
    title: 'Air Ticketing',
    desc: 'Domestic & international flight reservations on 100+ airlines. Corporate travel management and instant group bookings.',
    color: 'bg-sky-50 text-sky-600',
    border: 'hover:border-sky-200',
  },
  {
    icon: Globe,
    title: 'Visa Assistance',
    desc: 'Professional visa processing for 50+ countries — tourist, business, and student visas with a 98% approval success rate.',
    color: 'bg-amber-50 text-amber-600',
    border: 'hover:border-amber-200',
  },
];

export default function Services() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">What We Offer</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2">Service Highlights</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Everything you need for a seamless journey — from planning to landing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s) => (
            <div
              key={s.title}
              className={`bg-white rounded-2xl p-8 border border-transparent ${s.border} transition-all duration-300 hover:shadow-lg group cursor-default`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${s.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon size={26} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
