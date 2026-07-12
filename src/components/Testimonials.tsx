import { Star, Quote } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

export default function Testimonials() {
  const { testimonialsSettings } = useDashboard();

  if (!testimonialsSettings.isEnabled) return null;

  return (
    <section className="py-24 bg-gradient-to-br from-primary/5 to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">{testimonialsSettings.badge}</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2">{testimonialsSettings.title}</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {testimonialsSettings.items.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] min-w-[280px] max-w-[350px]"
            >
              <Quote size={28} className="text-primary/20 mb-4 flex-shrink-0" fill="currentColor" />
              <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-5">{t.text}</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={13} className="text-amber-400" fill="currentColor" />
                ))}
              </div>
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
