import { useDashboard } from './dashboard/DashboardContext';

export default function Team() {
  const { teamSettings } = useDashboard();
  if (!teamSettings.isEnabled) return null;

  const team = teamSettings.items;
  const title = teamSettings.title;
  const subtitle = teamSettings.subtitle;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">Our People</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2">{title}</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.id} className="group text-center">
              <div className="relative mb-5 inline-block">
                <img
                  src={m.avatar}
                  alt={m.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto shadow-md border-4 border-white ring-2 ring-sky-100 group-hover:ring-sky-300 transition-all duration-300"
                />
              </div>
              <h4 className="font-bold text-slate-800 text-base">{m.name}</h4>
              <div className="text-sky-600 text-sm font-medium mb-2">{m.role}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
