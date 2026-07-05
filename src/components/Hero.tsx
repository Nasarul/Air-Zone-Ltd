import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, MapPin } from 'lucide-react';

const slides = [
  {
    image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Explore the World',
    subtitle: 'with Air Zone Ltd.',
    desc: 'Premium tour packages, Hajj & Umrah services, and seamless visa assistance — all in one place.',
  },
  {
    image: 'https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Sacred Journeys',
    subtitle: 'Hajj & Umrah',
    desc: 'Spiritually enriching pilgrimages with comprehensive packages including flights, visa, and accommodation.',
  },
  {
    image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=1600',
    title: 'Hassle-Free',
    subtitle: 'Visa Processing',
    desc: 'Fast, reliable visa processing for tourist, business, and student visas with expert documentation support.',
  },
];

const stats = [
  { value: '15,000+', label: 'Happy Travelers' },
  { value: '120+', label: 'Tour Packages' },
  { value: '98%', label: 'Visa Success Rate' },
  { value: '24/7', label: 'Customer Support' },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent((idx + slides.length) % slides.length);
      setAnimating(false);
    }, 300);
  };

  useEffect(() => {
    const t = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(t);
  }, [current]);

  const slide = slides[current];

  return (
    <section id="home" className="relative">
      {/* Slider */}
      <div className="relative h-[92vh] min-h-[580px] overflow-hidden">
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${animating ? 'opacity-0' : 'opacity-100'}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div
              className={`max-w-2xl transition-all duration-700 ${
                animating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-0.5 bg-sky-400" />
                <span className="text-sky-300 text-sm font-semibold uppercase tracking-widest">
                  Air Zone Ltd.
                </span>
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-3">
                {slide.title}
                <br />
                <span className="text-sky-400">{slide.subtitle}</span>
              </h1>
              <p className="text-slate-300 text-lg mb-10 leading-relaxed max-w-xl">
                {slide.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#tours"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#tours')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200 shadow-lg"
                >
                  Explore Packages
                </a>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 border-2 border-white/60 hover:border-white text-white font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Arrows */}
        <button
          onClick={() => go(current - 1)}
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-sm"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={() => go(current + 1)}
          className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center bg-white/20 hover:bg-white/40 text-white rounded-full transition-colors backdrop-blur-sm"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current ? 'w-7 bg-sky-400' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Search bar */}
      <div className="bg-white shadow-xl border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="flex-1 flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
              <MapPin size={18} className="text-sky-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Where do you want to go?"
                className="flex-1 outline-none text-slate-700 placeholder-slate-400 text-sm"
              />
            </div>
            <button className="flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm">
              <Search size={17} />
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-sky-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-extrabold text-sky-200">{s.value}</div>
              <div className="text-sm text-sky-100 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
