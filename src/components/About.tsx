import { CheckCircle } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

export default function About() {
  const { aboutSettings } = useDashboard();
  
  if (!aboutSettings.isEnabled) return null;
  const { badge, title, desc1, desc2, points, image, yearsExperience, yearsLabel } = aboutSettings;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src={image}
              alt="About Air Zone Ltd"
              className="rounded-2xl object-cover w-full h-[480px] shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-sky-600 text-white rounded-2xl px-8 py-6 shadow-xl hidden md:block">
              <div className="text-4xl font-extrabold">{yearsExperience}</div>
              <div className="text-sky-200 text-sm font-medium mt-1">{yearsLabel}</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">{badge}</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-5 leading-tight">
              {title}
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              {desc1}
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              {desc2}
            </p>
            <ul className="space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-600 text-sm">
                  <CheckCircle size={18} className="text-sky-500 flex-shrink-0 mt-0.5" />
                  {p}
                </li>
              ))}
            </ul>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-10 inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3.5 rounded-full transition-colors shadow-sm"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
