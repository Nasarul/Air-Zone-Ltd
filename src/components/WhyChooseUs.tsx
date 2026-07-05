import { Award, BadgeDollarSign, HeadphonesIcon, Globe2 } from 'lucide-react';

const reasons = [
  {
    icon: Award,
    title: 'Licensed & Certified',
    desc: 'Fully licensed by the Civil Aviation Authority, Bangladesh, with valid certification and IATA accreditation.',
    color: 'bg-sky-100 text-sky-600',
  },
  {
    icon: BadgeDollarSign,
    title: 'Best Price Guarantee',
    desc: 'Competitive pricing with complete transparency. No hidden fees, no surprise charges — ever.',
    color: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: HeadphonesIcon,
    title: '24/7 Support',
    desc: 'Our dedicated team is available round-the-clock to assist you before, during, and after your trip.',
    color: 'bg-amber-100 text-amber-600',
  },
  {
    icon: Globe2,
    title: 'Global Network',
    desc: 'Strong partnerships with 200+ airlines, hotels, and tour operators worldwide for seamless experiences.',
    color: 'bg-rose-100 text-rose-600',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <span className="text-sky-400 font-semibold text-sm uppercase tracking-widest">Why Air Zone Ltd.</span>
            <h2 className="text-4xl font-extrabold mt-2 mb-6 leading-tight">
              We Make Travel <br />
              <span className="text-sky-400">Simple & Memorable</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-10">
              With over 15 years of experience, we have helped thousands of travelers explore the world with confidence. Our commitment to quality, transparency, and customer satisfaction sets us apart.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {reasons.map((r) => (
                <div key={r.title} className="flex gap-4 items-start group">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${r.color} group-hover:scale-110 transition-transform duration-300`}>
                    <r.icon size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 text-sm">{r.title}</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{r.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right image */}
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/1488085061387-422e29b40080/pexels-photo-1488085061387.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Why Choose Us"
              className="rounded-2xl w-full h-[480px] object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=800';
              }}
            />
            {/* Floating card */}
            <div className="absolute bottom-6 left-6 bg-white text-slate-800 rounded-2xl p-5 shadow-2xl max-w-xs">
              <div className="text-3xl font-extrabold text-sky-600 mb-1">98%</div>
              <div className="font-semibold text-sm text-slate-700">Visa Success Rate</div>
              <div className="text-slate-400 text-xs mt-1">Based on 5,000+ applications processed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
