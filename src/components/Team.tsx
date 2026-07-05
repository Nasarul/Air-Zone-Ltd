const team = [
  {
    name: 'Arif Hossain',
    role: 'Managing Director',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    desc: 'Leads the vision of Air Zone Ltd. with 20+ years in the travel and aviation industry.',
  },
  {
    name: 'Nusrat Jahan',
    role: 'Visa Processing Head',
    image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=400',
    desc: 'Ensures fast and accurate visa processing with transparent client communication.',
  },
  {
    name: 'Imran Chowdhury',
    role: 'Air Ticketing Specialist',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400',
    desc: 'Specializes in complex international flight itineraries and corporate group flight bookings.',
  },
  {
    name: 'Sadia Islam',
    role: 'Operations Manager',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    desc: 'Oversees end-to-end tour delivery with meticulous attention to traveler comfort.',
  },
];

export default function Team() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">Our People</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2">Meet the Leadership Team</h2>
          <p className="text-slate-500 mt-3 max-w-xl mx-auto">
            Experienced professionals dedicated to making every journey exceptional.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((m) => (
            <div key={m.name} className="group text-center">
              <div className="relative mb-5 inline-block">
                <img
                  src={m.image}
                  alt={m.name}
                  className="w-28 h-28 rounded-full object-cover mx-auto shadow-md border-4 border-white ring-2 ring-sky-100 group-hover:ring-sky-300 transition-all duration-300"
                />
              </div>
              <h4 className="font-bold text-slate-800 text-base">{m.name}</h4>
              <div className="text-sky-600 text-sm font-medium mb-2">{m.role}</div>
              <p className="text-slate-400 text-xs leading-relaxed px-2">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
