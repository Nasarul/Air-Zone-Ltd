import { Globe, Plane, Compass, Award, Shield, Heart } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

const iconMap: Record<string, any> = {
  Compass: Compass,
  Plane: Plane,
  Globe: Globe,
  Award: Award,
  Shield: Shield,
  Heart: Heart
};

export default function Services() {
  const { servicesSettings } = useDashboard();

  if (!servicesSettings.isEnabled) return null;

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">{servicesSettings.badge}</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2">{servicesSettings.title}</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            {servicesSettings.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {servicesSettings.items.map((s, idx) => {
            const IconComponent = iconMap[s.iconName] || Compass;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-8 border border-transparent hover:border-sky-200 transition-all duration-300 hover:shadow-lg group cursor-default"
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-sky-50 text-sky-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent size={26} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">{s.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
