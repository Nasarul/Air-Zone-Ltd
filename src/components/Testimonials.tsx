import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Mohammad Hasan',
    role: 'Business Executive',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Air Zone arranged our Europe group tour perfectly. The itinerary was detailed, the hotels were excellent, and the visa processing was smooth. Highly recommend!',
    rating: 5,
  },
  {
    name: 'Fatima Begum',
    role: 'Homemaker',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'We performed Hajj through Air Zone and the entire experience was spiritually fulfilling and well-organized. Their team was with us every step of the way.',
    rating: 5,
  },
  {
    name: 'Rahim Chowdhury',
    role: 'Software Engineer',
    image: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Got my UK visa processed in record time. The documentation guidance was professional and clear. Will definitely use Air Zone again for my next trip.',
    rating: 5,
  },
  {
    name: 'Sumaiya Khan',
    role: 'Teacher',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Booked a Bali honeymoon package — the hotel selections were incredible and every detail was taken care of. It was truly the perfect trip.',
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-gradient-to-br from-sky-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sky-600 font-semibold text-sm uppercase tracking-widest">Happy Travelers</span>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-2">What Our Clients Say</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <Quote size={28} className="text-sky-200 mb-4 flex-shrink-0" fill="currentColor" />
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
