import { Clock, ArrowRight } from 'lucide-react';

const visas = [
  { country: 'United Kingdom', flag: 'https://flagcdn.com/w80/gb.png', days: '12–18 working days', category: 'Tourist / Business' },
  { country: 'Saudi Arabia', flag: 'https://flagcdn.com/w80/sa.png', days: '5–8 working days', category: 'Visit / Umrah' },
  { country: 'Japan', flag: 'https://flagcdn.com/w80/jp.png', days: '8–12 working days', category: 'Tourist / Business' },
  { country: 'Singapore', flag: 'https://flagcdn.com/w80/sg.png', days: '5–7 working days', category: 'Tourist / Business' },
  { country: 'United Arab Emirates', flag: 'https://flagcdn.com/w80/ae.png', days: '4–6 working days', category: 'Visit / Transit' },
  { country: 'Malaysia', flag: 'https://flagcdn.com/w80/my.png', days: '6–7 working days', category: 'Tourist / Business' },
  { country: 'Canada', flag: 'https://flagcdn.com/w80/ca.png', days: '15–25 working days', category: 'Tourist / Student' },
  { country: 'Australia', flag: 'https://flagcdn.com/w80/au.png', days: '10–20 working days', category: 'Tourist / Business' },
  { country: 'USA', flag: 'https://flagcdn.com/w80/us.png', days: '20–30 working days', category: 'Tourist / Business' },
  { country: 'Schengen (Europe)', flag: 'https://flagcdn.com/w80/eu.png', days: '10–15 working days', category: 'Tourist / Business' },
  { country: 'Thailand', flag: 'https://flagcdn.com/w80/th.png', days: '3–5 working days', category: 'Tourist' },
  { country: 'Turkey', flag: 'https://flagcdn.com/w80/tr.png', days: '5–8 working days', category: 'Tourist / Business' },
];

export default function VisaServices() {
  return (
    <section id="visa" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">Visa Services</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-4">Visa Processing for 50+ Countries</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            High success rate visa processing for tourist, business, and student visas — with complete documentation support from our expert team.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visas.map((v) => (
            <div
              key={v.country}
              className="bg-white rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-md transition-all duration-200 p-5 flex items-center gap-4 group cursor-pointer"
            >
              <img
                src={v.flag}
                alt={v.country}
                className="w-12 h-8 object-cover rounded-md shadow-sm flex-shrink-0"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-800 text-sm leading-tight truncate">{v.country}</div>
                <div className="text-slate-400 text-xs mt-0.5">{v.category}</div>
                <div className="flex items-center gap-1 text-sky-600 text-xs mt-1 font-medium">
                  <Clock size={11} />
                  {v.days}
                </div>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-sky-500 flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
            </div>
          ))}
        </div>

        <div className="mt-12 bg-sky-600 rounded-2xl p-8 md:p-10 text-center text-white">
          <h3 className="text-2xl font-bold mb-2">Need a Visa for a Different Country?</h3>
          <p className="text-sky-100 mb-6">We process visas for 50+ countries. Contact us for eligibility and documentation requirements.</p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 bg-white text-sky-700 font-bold px-8 py-3 rounded-full hover:bg-sky-50 transition-colors shadow-sm"
          >
            Inquire Now <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
