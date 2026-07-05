import { CheckCircle } from 'lucide-react';

const points = [
  'Licensed by Civil Aviation Authority, Bangladesh',
  'IATA Accredited Travel Agency',
  'Over 15 years of trusted travel experience',
  'Partnerships with 200+ global hotels & airlines',
  'Dedicated Hajj & Umrah division',
  'Transparent pricing with zero hidden charges',
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="About Air Zone Ltd"
              className="rounded-2xl object-cover w-full h-[480px] shadow-xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-sky-600 text-white rounded-2xl px-8 py-6 shadow-xl hidden md:block">
              <div className="text-4xl font-extrabold">15+</div>
              <div className="text-sky-200 text-sm font-medium mt-1">Years of Excellence</div>
            </div>
          </div>

          {/* Content */}
          <div>
            <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">Who We Are</span>
            <h2 className="text-4xl font-extrabold text-slate-800 mt-2 mb-5 leading-tight">
              Your Trusted Travel Partner Since 2009
            </h2>
            <p className="text-slate-500 leading-relaxed mb-4">
              Air Zone Ltd. is a leading travel agency based in Dhaka, Bangladesh, specializing in international and domestic tour packages, Hajj & Umrah pilgrimages, and comprehensive visa assistance services.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              We are committed to delivering exceptional travel experiences with personalized service, competitive pricing, and round-the-clock support — ensuring every journey is smooth, memorable, and stress-free.
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
