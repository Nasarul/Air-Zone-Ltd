import { Award, BadgeDollarSign, HeadphonesIcon, Globe2, Shield, Heart } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

const iconMap: Record<string, any> = {
  Award: Award,
  BadgeDollarSign: BadgeDollarSign,
  HeadphonesIcon: HeadphonesIcon,
  Globe2: Globe2,
  Shield: Shield,
  Heart: Heart
};

export default function WhyChooseUs() {
  const { whyChooseUsSettings } = useDashboard();

  if (!whyChooseUsSettings.isEnabled) return null;

  return (
    <section className="py-24 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-primary-light font-semibold text-sm uppercase tracking-widest">{whyChooseUsSettings.badge}</span>
            <h2 className="text-4xl font-extrabold mt-2 mb-6 leading-tight">
              {whyChooseUsSettings.titleLine1} <br />
              <span className="text-primary-light">{whyChooseUsSettings.titleLine2}</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-10">
              {whyChooseUsSettings.description}
            </p>
 
            <div className="grid sm:grid-cols-2 gap-6">
              {whyChooseUsSettings.reasons.map((r, idx) => {
                const IconComponent = iconMap[r.iconName] || Award;
                return (
                  <div key={idx} className="flex gap-4 items-start group cursor-default p-3 -m-3 rounded-2xl hover:bg-white/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/20 text-primary-light group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_15px_rgba(144,26,29,0.5)] transition-all duration-300">
                      <IconComponent size={22} className="transition-transform duration-300 group-hover:scale-110 group-hover:animate-pulse" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1 text-sm group-hover:text-primary-light transition-colors">{r.title}</h4>
                      <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors">{r.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
 
          {/* Right image */}
          <div className="relative">
            <img
              src={whyChooseUsSettings.image}
              alt="Why Choose Us"
              className="rounded-2xl w-full h-[480px] object-cover"
            />
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 bg-white text-slate-800 rounded-2xl p-5 shadow-2xl max-w-xs">
              <div className="text-3xl font-extrabold text-primary mb-1">{whyChooseUsSettings.floatingCardNumber}</div>
              <div className="font-semibold text-sm text-slate-700">{whyChooseUsSettings.floatingCardTitle}</div>
              <div className="text-slate-400 text-xs mt-1">{whyChooseUsSettings.floatingCardDesc}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
