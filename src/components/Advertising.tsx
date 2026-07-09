import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';

export default function Advertising() {
  const { adSettings } = useDashboard();
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  if (!adSettings || !adSettings.isEnabled || !adSettings.slides || adSettings.slides.length === 0) return null;

  const slides = adSettings.slides;

  const go = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setCurrent((idx + slides.length) % slides.length);
    setTimeout(() => {
      setAnimating(false);
    }, 50);
  };

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => go(current + 1), 6000);
    return () => clearInterval(t);
  }, [current, slides.length]);

  const slide = slides[current];

  const content = (
    <img
      key={current}
      src={slide.image}
      alt={`Advertisement ${current + 1}`}
      className="w-full h-auto max-h-[550px] object-cover hover:brightness-95 transition duration-305"
    />
  );

  return (
    <section className="w-full overflow-hidden bg-slate-50 dark:bg-slate-950 relative group">
      {/* Slider image */}
      {slide.linkUrl ? (
        <a href={slide.linkUrl} target="_blank" rel="noopener noreferrer" className="block w-full cursor-pointer">
          {content}
        </a>
      ) : (
        content
      )}

      {/* Navigation Arrows (Only show if multiple slides exist) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={() => go(current - 1)}
            className="absolute left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => go(current + 1)}
            className="absolute right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 flex items-center justify-center bg-black/20 hover:bg-black/40 text-white rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-6 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
