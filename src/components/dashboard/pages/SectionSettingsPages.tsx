import React, { useState } from 'react';
import { useDashboard } from '../DashboardContext';
import { 
  Save, Eye, EyeOff, ArrowUp, ArrowDown, Trash2, Plus, 
  Upload, CheckCircle, Image as ImageIcon, MapPin, DollarSign, Calendar
} from 'lucide-react';
import { TourPackageItem, VisaServiceItem, TeamMemberItem, HeroSlide, ContactSettings, AdSettings, ServicesSettings, FlightTicketingSettings, WhyChooseUsSettings, TestimonialsSettings } from '../../../types/dashboard';

/* ==========================================================================
   SHARED UI SUB-COMPONENTS
   ========================================================================== */

interface SectionHeaderProps {
  title: string;
  description: string;
  isEnabled: boolean;
  onToggle: (val: boolean) => void;
}

const CMSSectionHeader: React.FC<SectionHeaderProps> = ({ title, description, isEnabled, onToggle }) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 p-4 bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
      <div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-white">{title}</h3>
        <p className="text-xs text-slate-450 mt-1">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-full flex items-center gap-1.5 ${
          isEnabled 
            ? 'bg-success/10 text-success' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        }`}>
          {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
          <span>{isEnabled ? 'Live on Site' : 'Hidden'}</span>
        </span>
        <button
          type="button"
          onClick={() => onToggle(!isEnabled)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            isEnabled ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isEnabled ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
};


/* ==========================================================================
   1. HERO SECTION SETTINGS
   ========================================================================== */

export const HeroSectionSettings: React.FC = () => {
  const { heroSettings, updateHeroSettings, showToast } = useDashboard();
  const [slides, setSlides] = useState<HeroSlide[]>(heroSettings.slides);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number | null>(0);

  const handleSave = () => {
    updateHeroSettings({ slides });
    showToast('success', 'Hero Content Saved', 'Homepage slideshow modifications have been published.');
  };

  const handleUpdateSlideField = (index: number, field: keyof HeroSlide, value: string) => {
    const next = [...slides];
    next[index] = { ...next[index], [field]: value };
    setSlides(next);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const next = [...slides];
        next[index] = { ...next[index], image: event.target?.result as string };
        setSlides(next);
        showToast('success', 'Slide Image Loaded', 'Press Save to publish the new image.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === slides.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const next = [...slides];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setSlides(next);
    if (activeSlideIdx === index) setActiveSlideIdx(targetIdx);
    else if (activeSlideIdx === targetIdx) setActiveSlideIdx(index);
  };

  const handleDelete = (index: number) => {
    if (slides.length <= 1) {
      showToast('warning', 'Minimum Slides reached', 'You must keep at least one hero slide active.');
      return;
    }
    const next = slides.filter((_, i) => i !== index);
    setSlides(next);
    setActiveSlideIdx(0);
    showToast('info', 'Slide Removed', 'Hero slide item deleted from draft.');
  };

  const handleAddSlide = () => {
    const newSlide: HeroSlide = {
      image: 'https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: 'New Destination Gateway',
      subtitle: 'Premium Travel Agency',
      desc: 'Explore custom itineraries and flight services built around your needs.',
      tagline: 'BRAND NEW PROMO DEAL'
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIdx(slides.length);
    showToast('success', 'New Slide Added', 'Configured default mock data. Customize details below.');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs max-w-4xl">
      <CMSSectionHeader 
        title="Hero Carousel Settings" 
        description="Edit titles, background graphics, and key taglines in the homepage slideshow."
        isEnabled={heroSettings.isEnabled}
        onToggle={(val) => updateHeroSettings({ isEnabled: val })}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slides list */}
        <div className="md:col-span-1 space-y-2 border-r border-slate-105 dark:border-slate-850 pr-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] uppercase font-black text-slate-450 tracking-wider">Slide Indexes</span>
            <button 
              type="button" 
              onClick={handleAddSlide}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          {slides.map((slide, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-xl border transition-all text-left flex justify-between items-center ${
                activeSlideIdx === idx 
                  ? 'border-primary/40 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light font-bold' 
                  : 'border-slate-205 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <button 
                type="button"
                onClick={() => setActiveSlideIdx(idx)}
                className="flex-1 text-xs truncate text-left font-bold"
              >
                Slide {idx + 1}: {slide.title || 'Untitled'}
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                <button 
                  type="button" 
                  disabled={idx === 0} 
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button 
                  type="button" 
                  disabled={idx === slides.length - 1} 
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDelete(idx)}
                  className="p-1 text-red-400 hover:text-red-650"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Edit Form */}
        <div className="md:col-span-2 space-y-4">
          {activeSlideIdx !== null && slides[activeSlideIdx] ? (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-850/50 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350">Editing Slide {activeSlideIdx + 1}</span>
                <span className="text-[10px] text-slate-400">Homepage slide instance</span>
              </div>

              {/* Graphic preview */}
              <div className="relative group w-full h-36 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                <img 
                  src={slides[activeSlideIdx].image} 
                  alt="Slide background" 
                  className="w-full h-full object-cover" 
                />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white text-[10px] font-bold cursor-pointer transition-opacity">
                  <Upload className="w-4 h-4 animate-bounce" />
                  <span>Replace Backdrop Image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(activeSlideIdx, e)} 
                  />
                </label>
              </div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 text-center">
                Recommended Resolution: 1600x900px | Max Size: 2MB
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Tagline Badge</label>
                  <input 
                    type="text" 
                    value={slides[activeSlideIdx].tagline}
                    onChange={(e) => handleUpdateSlideField(activeSlideIdx, 'tagline', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700 dark:text-slate-300"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Sub-heading</label>
                  <input 
                    type="text" 
                    value={slides[activeSlideIdx].subtitle}
                    onChange={(e) => handleUpdateSlideField(activeSlideIdx, 'subtitle', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700 dark:text-slate-300"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Slide Headline Title</label>
                <input 
                  type="text" 
                  value={slides[activeSlideIdx].title}
                  onChange={(e) => handleUpdateSlideField(activeSlideIdx, 'title', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-700 dark:text-slate-300"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Short description paragraph</label>
                <textarea 
                  rows={2}
                  value={slides[activeSlideIdx].desc}
                  onChange={(e) => handleUpdateSlideField(activeSlideIdx, 'desc', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700 dark:text-slate-300"
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Select or add a slide index from the left menu to customize contents.
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/15 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Slides Settings</span>
        </button>
      </div>
    </div>
  );
};


/* ==========================================================================
   2. ABOUT US SECTION SETTINGS
   ========================================================================== */

export const AboutSectionSettings: React.FC = () => {
  const { aboutSettings, updateAboutSettings, showToast } = useDashboard();
  const [badge, setBadge] = useState(aboutSettings.badge);
  const [title, setTitle] = useState(aboutSettings.title);
  const [desc1, setDesc1] = useState(aboutSettings.desc1);
  const [desc2, setDesc2] = useState(aboutSettings.desc2);
  const [points, setPoints] = useState<string[]>(aboutSettings.points);
  const [image, setImage] = useState(aboutSettings.image);
  const [yearsExperience, setYearsExperience] = useState(aboutSettings.yearsExperience);
  const [yearsLabel, setYearsLabel] = useState(aboutSettings.yearsLabel);

  const [newPoint, setNewPoint] = useState('');

  const handleSave = () => {
    updateAboutSettings({
      badge, title, desc1, desc2, points, image, yearsExperience, yearsLabel
    });
    showToast('success', 'About Us Section Saved', 'Dynamic corporate values have been updated.');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select a logo under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        showToast('success', 'About Cover Image Loaded', 'Save changes to sync the landing page.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPoint = () => {
    if (!newPoint.trim()) return;
    setPoints([...points, newPoint.trim()]);
    setNewPoint('');
    showToast('success', 'Added bullet point', 'Added to draft list.');
  };

  const handleDeletePoint = (index: number) => {
    setPoints(points.filter((_, i) => i !== index));
    showToast('info', 'Deleted bullet point', 'Removed from draft.');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs max-w-4xl">
      <CMSSectionHeader 
        title="About Us Section Settings" 
        description="Modify corporate text block descriptions, years of accreditation badges, and key bullet points."
        isEnabled={aboutSettings.isEnabled}
        onToggle={(val) => updateAboutSettings({ isEnabled: val })}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Top Section Badge</label>
            <input 
              type="text" 
              value={badge}
              onChange={(e) => setBadge(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-slate-700 dark:text-slate-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Primary Title Header</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-700 dark:text-slate-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Paragraph Description 1</label>
            <textarea 
              rows={3}
              value={desc1}
              onChange={(e) => setDesc1(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700 dark:text-slate-300"
            />
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Paragraph Description 2</label>
            <textarea 
              rows={3}
              value={desc2}
              onChange={(e) => setDesc2(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700 dark:text-slate-300"
            />
          </div>
        </div>

        <div className="space-y-4">
          {/* Photo & Badge Preview */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 space-y-1">
              <div className="relative group h-28 border border-slate-250 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-100">
                <img src={image} className="w-full h-full object-cover" alt="About" />
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white text-[9px] font-bold cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace Photo</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
              </div>
              <p className="text-[8px] text-slate-400 dark:text-slate-500 text-center">
                Recommended Resolution: 800x600px | Max Size: 2MB
              </p>
            </div>
            
            <div className="col-span-1 border border-slate-205 dark:border-slate-800 rounded-xl p-3 bg-slate-50/50 dark:bg-slate-900/50 text-center flex flex-col justify-center">
              <input 
                type="text" 
                value={yearsExperience}
                onChange={(e) => setYearsExperience(e.target.value)}
                className="w-full text-center bg-transparent border-b border-dashed border-slate-350 dark:border-slate-705 font-extrabold text-lg text-primary focus:outline-none mb-1 dark:text-white" 
              />
              <input 
                type="text" 
                value={yearsLabel}
                onChange={(e) => setYearsLabel(e.target.value)}
                className="w-full text-center bg-transparent border-none text-[8px] uppercase tracking-wider text-slate-400 font-bold focus:outline-none" 
              />
            </div>
          </div>

          {/* Points list */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Section Accreditations & Key Bullet Points</label>
            <div className="border border-slate-200 dark:border-slate-800 rounded-xl max-h-48 overflow-y-auto p-3 space-y-2 bg-slate-50/30">
              {points.map((pt, idx) => (
                <div key={idx} className="flex justify-between items-center gap-2 text-xs bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-100 dark:border-slate-850">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate flex-1">{pt}</span>
                  <button 
                    type="button" 
                    onClick={() => handleDeletePoint(idx)}
                    className="p-0.5 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Add new list accreditation..."
                value={newPoint}
                onChange={(e) => setNewPoint(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddPoint()}
                className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700 dark:text-slate-350"
              />
              <button 
                type="button" 
                onClick={handleAddPoint}
                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 rounded-xl"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/15"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save About Settings</span>
        </button>
      </div>
    </div>
  );
};


/* ==========================================================================
   3. TOUR PACKAGES SETTINGS
   ========================================================================== */

export const PackagesSectionSettings: React.FC = () => {
  const { packagesSettings, updatePackagesSettings, showToast } = useDashboard();
  const [title, setTitle] = useState(packagesSettings.title);
  const [subtitle, setSubtitle] = useState(packagesSettings.subtitle);
  const [items, setItems] = useState<TourPackageItem[]>(packagesSettings.items);

  const [activeItem, setActiveItem] = useState<TourPackageItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => {
    updatePackagesSettings({ title, subtitle, items });
    showToast('success', 'Tour Packages Updated', 'Custom destinations list has been synced.');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const next = [...items];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setItems(next);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    showToast('info', 'Package Removed', 'Package deleted from drafts.');
  };

  const handleAddOrEdit = (item: TourPackageItem) => {
    if (isAdding) {
      setItems([...items, item]);
      showToast('success', 'Package Added', 'Appended new tour package item.');
    } else {
      setItems(items.map(it => it.id === item.id ? item : it));
      showToast('success', 'Package Updated', 'Modified tour details.');
    }
    setActiveItem(null);
    setIsAdding(false);
  };

  const triggerEdit = (item: TourPackageItem) => {
    setActiveItem(item);
    setIsAdding(false);
  };

  const triggerAdd = () => {
    const defaultNew: TourPackageItem = {
      id: 'tour_' + Date.now(),
      image: 'https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800',
      title: '5D/4N Thailand Beach Holiday',
      duration: '5 Days 4 Nights',
      durationDays: 5,
      location: 'Bangkok & Pattaya, Thailand',
      price: '৳48,500',
      rating: 4.8,
      categories: ['international'],
      desc: 'Discover tropical beaches, golden temples, and exciting nightlife.',
      inclusions: ['3-Star Accommodations', 'Daily Breakfast', 'All Transfers', 'Half-day City Tour']
    };
    setActiveItem(defaultNew);
    setIsAdding(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs max-w-4xl">
      <CMSSectionHeader 
        title="Tour Packages Settings" 
        description="Configure domestic/international pricing, flight days, inclusions, and re-order package layouts."
        isEnabled={packagesSettings.isEnabled}
        onToggle={(val) => updatePackagesSettings({ isEnabled: val })}
      />

      {activeItem ? (
        <PackageItemForm 
          item={activeItem} 
          isNew={isAdding} 
          onSave={handleAddOrEdit} 
          onCancel={() => { setActiveItem(null); setIsAdding(false); }} 
          showToast={showToast}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Title Text</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-700 dark:text-slate-350"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Subtitle Description</label>
              <input 
                type="text" 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-slate-700 dark:text-slate-350"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-[10px] uppercase font-black text-slate-455 tracking-wider">Current Tour Packages Directory ({items.length})</span>
              <button 
                type="button" 
                onClick={triggerAdd}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Custom Package</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1">
              {items.map((pkg, idx) => (
                <div key={pkg.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/20 flex gap-3 relative hover:shadow-xs transition-shadow">
                  <img src={pkg.image} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" alt="Tour" />
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-xs text-slate-805 dark:text-white truncate">{pkg.title}</h5>
                    <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-slate-400" /> {pkg.location}</span>
                      <span>•</span>
                      <span>{pkg.duration}</span>
                    </div>
                    <div className="font-extrabold text-xs text-primary dark:text-primary-light mt-2">{pkg.price}</div>
                  </div>

                  <div className="flex flex-col gap-1.5 justify-center">
                    <button 
                      type="button" 
                      disabled={idx === 0} 
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-450 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button" 
                      disabled={idx === items.length - 1} 
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-450 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => triggerEdit(pkg)}
                      className="p-1 hover:bg-primary/10 rounded text-primary text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDelete(pkg.id)}
                      className="p-1 hover:bg-red-550/10 rounded text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!activeItem && (
        <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/15"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Packages List</span>
          </button>
        </div>
      )}
    </div>
  );
};

interface PackageFormProps {
  item: TourPackageItem;
  isNew: boolean;
  onSave: (item: TourPackageItem) => void;
  onCancel: () => void;
  showToast: any;
}

const PackageItemForm: React.FC<PackageFormProps> = ({ item, isNew, onSave, onCancel, showToast }) => {
  const [draft, setDraft] = useState<TourPackageItem>({ ...item });
  const [inclusionInput, setInclusionInput] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft({ ...draft, image: event.target?.result as string });
        showToast('success', 'Image Uploaded', 'New package banner registered.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInclusion = () => {
    if (!inclusionInput.trim()) return;
    setDraft({
      ...draft,
      inclusions: [...draft.inclusions, inclusionInput.trim()]
    });
    setInclusionInput('');
  };

  const handleRemoveInclusion = (idx: number) => {
    setDraft({
      ...draft,
      inclusions: draft.inclusions.filter((_, i) => i !== idx)
    });
  };

  return (
    <div className="space-y-4 border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/20">
      <div className="font-bold text-xs text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2 flex justify-between">
        <span>{isNew ? 'Create New Tour Deal' : 'Modify Tour Deal'}</span>
        <span className="text-[10px] text-slate-400">{draft.id}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Banner upload preview */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Package Banner Image</label>
          <div className="relative group w-full h-32 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-100">
            <img src={draft.image} className="w-full h-full object-cover" alt="Banner preview" />
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-white text-[9px] font-bold cursor-pointer transition-opacity">
              <Upload className="w-3.5 h-3.5" />
              <span>Replace Photo</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 text-center">
            Recommended Resolution: 800x600px | Max Size: 2MB
          </p>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Tour Title Name</label>
            <input 
              type="text" 
              value={draft.title} 
              onChange={(e) => setDraft({ ...draft, title: e.target.value })} 
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-350"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Destination Location</label>
              <input 
                type="text" 
                value={draft.location} 
                onChange={(e) => setDraft({ ...draft, location: e.target.value })} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-355"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Package Price Tag</label>
              <input 
                type="text" 
                value={draft.price} 
                onChange={(e) => setDraft({ ...draft, price: e.target.value })} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-355"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Duration Label (e.g. 4 Days 3 Nights)</label>
          <input 
            type="text" 
            value={draft.duration} 
            onChange={(e) => setDraft({ ...draft, duration: e.target.value })} 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-355"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Duration Days (Numeric)</label>
          <input 
            type="number" 
            value={draft.durationDays} 
            onChange={(e) => setDraft({ ...draft, durationDays: parseInt(e.target.value) || 1 })} 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-355"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Short Package Description</label>
        <textarea 
          rows={2} 
          value={draft.desc} 
          onChange={(e) => setDraft({ ...draft, desc: e.target.value })} 
          className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-355"
        />
      </div>

      {/* Inclusions checklist management */}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Key Package Inclusions & Amenities</label>
        <div className="flex flex-wrap gap-1.5 p-2 border border-slate-200 dark:border-slate-800 rounded-xl min-h-12 bg-white dark:bg-slate-900">
          {draft.inclusions.map((inc, i) => (
            <span key={i} className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-350 px-2 py-0.5 rounded-md text-[9px] font-bold border border-slate-200 dark:border-slate-700">
              <span>{inc}</span>
              <button type="button" onClick={() => handleRemoveInclusion(i)} className="text-red-400 hover:text-red-650 ml-1">×</button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Add new inclusion (e.g. 5-Star Hotel Stay)..." 
            value={inclusionInput} 
            onChange={(e) => setInclusionInput(e.target.value)} 
            onKeyDown={(e) => e.key === 'Enter' && handleAddInclusion()}
            className="flex-1 bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-1.5 text-xs focus:outline-none text-slate-705 dark:text-slate-300"
          />
          <button type="button" onClick={handleAddInclusion} className="px-3 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-850 text-xs font-bold text-slate-750 dark:text-slate-350 rounded-xl">Add</button>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs font-bold text-slate-450 hover:underline">Cancel</button>
        <button type="button" onClick={() => onSave(draft)} className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl">Keep Changes</button>
      </div>
    </div>
  );
};


/* ==========================================================================
   4. VISA SERVICES SETTINGS
   ========================================================================== */

export const VisaSectionSettings: React.FC = () => {
  const { visaSettings, updateVisaSettings, showToast } = useDashboard();
  const [title, setTitle] = useState(visaSettings.title);
  const [subtitle, setSubtitle] = useState(visaSettings.subtitle);
  const [items, setItems] = useState<VisaServiceItem[]>(visaSettings.items);

  const [activeItem, setActiveItem] = useState<VisaServiceItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => {
    updateVisaSettings({ title, subtitle, items });
    showToast('success', 'Visa Settings Published', 'Visa options configuration has been updated.');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const next = [...items];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setItems(next);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    showToast('info', 'Visa Deleted', 'Removed visa service from draft.');
  };

  const handleAddOrEdit = (item: VisaServiceItem) => {
    if (isAdding) {
      setItems([...items, item]);
      showToast('success', 'Visa Country Added', 'Appended to directory.');
    } else {
      setItems(items.map(it => it.id === item.id ? item : it));
      showToast('success', 'Visa Updated', 'Saved details.');
    }
    setActiveItem(null);
    setIsAdding(false);
  };

  const triggerEdit = (item: VisaServiceItem) => {
    setActiveItem(item);
    setIsAdding(false);
  };

  const triggerAdd = () => {
    const defaultNew: VisaServiceItem = {
      id: 'visa_' + Date.now(),
      country: 'Canada',
      flag: 'https://flagcdn.com/w80/ca.png',
      days: '15-20 working days',
      category: 'Tourist / Study',
      price: '৳12,500',
      iconName: 'FileCheck2'
    };
    setActiveItem(defaultNew);
    setIsAdding(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs max-w-4xl">
      <CMSSectionHeader 
        title="Visa Services Settings" 
        description="Update country flag image nodes, standard service fee rates, and process time durations."
        isEnabled={visaSettings.isEnabled}
        onToggle={(val) => updateVisaSettings({ isEnabled: val })}
      />

      {activeItem ? (
        <VisaItemForm 
          item={activeItem} 
          isNew={isAdding} 
          onSave={handleAddOrEdit} 
          onCancel={() => { setActiveItem(null); setIsAdding(false); }} 
          showToast={showToast}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Title Text</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-700 dark:text-slate-350"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Subtitle Description</label>
              <input 
                type="text" 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-slate-700 dark:text-slate-350"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-[10px] uppercase font-black text-slate-455 tracking-wider">Visa Directory Records ({items.length})</span>
              <button 
                type="button" 
                onClick={triggerAdd}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Visa Country</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1">
              {items.map((visa, idx) => (
                <div key={visa.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/20 flex gap-3 relative items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={visa.flag} className="w-8 h-6 rounded border object-cover flex-shrink-0" alt="Flag" />
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-slate-805 dark:text-white truncate">{visa.country}</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5">{visa.category} | {visa.days}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold text-primary dark:text-primary-light mr-1">{visa.price}</span>
                    <button 
                      type="button" 
                      disabled={idx === 0} 
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-450 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button" 
                      disabled={idx === items.length - 1} 
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-450 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => triggerEdit(visa)}
                      className="p-1 hover:bg-primary/10 rounded text-primary text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDelete(visa.id)}
                      className="p-1 hover:bg-red-500/10 rounded text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!activeItem && (
        <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/15"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Visa Settings</span>
          </button>
        </div>
      )}
    </div>
  );
};

interface VisaFormProps {
  item: VisaServiceItem;
  isNew: boolean;
  onSave: (item: VisaServiceItem) => void;
  onCancel: () => void;
  showToast: any;
}

const VisaItemForm: React.FC<VisaFormProps> = ({ item, isNew, onSave, onCancel, showToast }) => {
  const [draft, setDraft] = useState<VisaServiceItem>({ ...item });

  const handleFlagUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024) {
        showToast('error', 'File Too Large', 'Please select a flag graphic under 500KB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft({ ...draft, flag: event.target?.result as string });
        showToast('success', 'Flag Image Updated', 'Flag preview refreshed.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/20 max-w-xl mx-auto">
      <div className="font-bold text-xs text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
        <span>{isNew ? 'Add Visa Record' : 'Edit Visa Record'}</span>
      </div>

      <div className="flex gap-4 items-center">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Flag Icon Node</label>
          <div className="relative group w-16 h-12 border border-slate-200 dark:border-slate-700 bg-white rounded-lg overflow-hidden flex items-center justify-center">
            <img src={draft.flag} className="w-full h-full object-cover" alt="Flag preview" />
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[8px] font-bold cursor-pointer">
              <span>Change</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFlagUpload} />
            </label>
          </div>
          <p className="text-[8px] text-slate-400 dark:text-slate-500 mt-1 text-center leading-none">
            Rec: 120x80px<br />Max: 500KB
          </p>
        </div>
        <div className="flex-1 space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Country Name</label>
          <input 
            type="text" 
            value={draft.country} 
            onChange={(e) => setDraft({ ...draft, country: e.target.value })} 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-300"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Processing Timeframe</label>
          <input 
            type="text" 
            value={draft.days} 
            onChange={(e) => setDraft({ ...draft, days: e.target.value })} 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-355"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Service Fee Rate</label>
          <input 
            type="text" 
            value={draft.price} 
            onChange={(e) => setDraft({ ...draft, price: e.target.value })} 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-355"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Visa Type Categories</label>
          <input 
            type="text" 
            value={draft.category} 
            onChange={(e) => setDraft({ ...draft, category: e.target.value })} 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-750 dark:text-slate-300"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Lucide Icon Class</label>
          <select 
            value={draft.iconName} 
            onChange={(e) => setDraft({ ...draft, iconName: e.target.value })} 
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-750 dark:text-slate-300"
          >
            <option value="FileText">FileText (Standard)</option>
            <option value="FileCheck2">FileCheck2 (Checkmark)</option>
            <option value="Send">Send (Paper Plane)</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs font-bold text-slate-450 hover:underline">Cancel</button>
        <button type="button" onClick={() => onSave(draft)} className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl">Keep Changes</button>
      </div>
    </div>
  );
};


/* ==========================================================================
   5. TEAM MEMBERS SETTINGS
   ========================================================================== */

export const TeamSectionSettings: React.FC = () => {
  const { teamSettings, updateTeamSettings, showToast } = useDashboard();
  const [title, setTitle] = useState(teamSettings.title);
  const [subtitle, setSubtitle] = useState(teamSettings.subtitle);
  const [items, setItems] = useState<TeamMemberItem[]>(teamSettings.items);

  const [activeItem, setActiveItem] = useState<TeamMemberItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = () => {
    updateTeamSettings({ title, subtitle, items });
    showToast('success', 'Team Layout Published', 'Corporate members directory updated.');
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const next = [...items];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setItems(next);
  };

  const handleDelete = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    showToast('info', 'Member Removed', 'Deleted representative card.');
  };

  const handleAddOrEdit = (item: TeamMemberItem) => {
    if (isAdding) {
      setItems([...items, item]);
      showToast('success', 'Member Registered', 'Appended to corporate team.');
    } else {
      setItems(items.map(it => it.id === item.id ? item : it));
      showToast('success', 'Representative Details Saved', 'Changes registered.');
    }
    setActiveItem(null);
    setIsAdding(false);
  };

  const triggerEdit = (item: TeamMemberItem) => {
    setActiveItem(item);
    setIsAdding(false);
  };

  const triggerAdd = () => {
    const defaultNew: TeamMemberItem = {
      id: 'team_' + Date.now(),
      name: 'Johnathan Wick',
      role: 'Support Executive',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
    };
    setActiveItem(defaultNew);
    setIsAdding(true);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs max-w-4xl">
      <CMSSectionHeader 
        title="Team Members Settings" 
        description="Rearrange hierarchy order list, upload staff headshots, and modify roles."
        isEnabled={teamSettings.isEnabled}
        onToggle={(val) => updateTeamSettings({ isEnabled: val })}
      />

      {activeItem ? (
        <TeamMemberForm 
          item={activeItem} 
          isNew={isAdding} 
          onSave={handleAddOrEdit} 
          onCancel={() => { setActiveItem(null); setIsAdding(false); }} 
          showToast={showToast}
        />
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Title Text</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-bold focus:outline-none text-slate-700 dark:text-slate-350"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Subtitle Description</label>
              <input 
                type="text" 
                value={subtitle} 
                onChange={(e) => setSubtitle(e.target.value)} 
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs focus:outline-none text-slate-700 dark:text-slate-350"
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-[10px] uppercase font-black text-slate-455 tracking-wider">Team Representatives ({items.length})</span>
              <button 
                type="button" 
                onClick={triggerAdd}
                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-750 dark:text-slate-300 text-[10px] font-bold rounded-lg flex items-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Register Executive</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[360px] overflow-y-auto pr-1">
              {items.map((member, idx) => (
                <div key={member.id} className="border border-slate-200 dark:border-slate-800 rounded-xl p-3 bg-slate-50/20 flex gap-3 relative items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <img src={member.avatar} className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-800 flex-shrink-0" alt="Avatar" />
                    <div className="min-w-0">
                      <h5 className="font-bold text-xs text-slate-808 dark:text-white truncate">{member.name}</h5>
                      <p className="text-[9px] text-slate-400 mt-0.5">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      type="button" 
                      disabled={idx === 0} 
                      onClick={() => handleMove(idx, 'up')}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-455 disabled:opacity-30"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button" 
                      disabled={idx === items.length - 1} 
                      onClick={() => handleMove(idx, 'down')}
                      className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded text-slate-455 disabled:opacity-30"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      type="button" 
                      onClick={() => triggerEdit(member)}
                      className="p-1 hover:bg-primary/10 rounded text-primary text-xs font-bold"
                    >
                      Edit
                    </button>
                    <button 
                      type="button" 
                      onClick={() => handleDelete(member.id)}
                      className="p-1 hover:bg-red-500/10 rounded text-red-500"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {!activeItem && (
        <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/15"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Publish Team Settings</span>
          </button>
        </div>
      )}
    </div>
  );
};

interface TeamFormProps {
  item: TeamMemberItem;
  isNew: boolean;
  onSave: (item: TeamMemberItem) => void;
  onCancel: () => void;
  showToast: any;
}

const TeamMemberForm: React.FC<TeamFormProps> = ({ item, isNew, onSave, onCancel, showToast }) => {
  const [draft, setDraft] = useState<TeamMemberItem>({ ...item });

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select an avatar under 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft({ ...draft, avatar: event.target?.result as string });
        showToast('success', 'Representative Headshot Loaded', 'Avatar preview refreshed.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-4 border border-slate-100 dark:border-slate-800 rounded-xl p-4 bg-slate-50/20 max-w-md mx-auto">
      <div className="font-bold text-xs text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
        <span>{isNew ? 'Register Staff Representative' : 'Edit Staff Details'}</span>
      </div>

      <div className="flex gap-4 items-center">
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Representative Headshot</label>
          <div className="relative group w-14 h-14 rounded-full border border-slate-200 dark:border-slate-705 overflow-hidden flex items-center justify-center bg-slate-100">
            <img src={draft.avatar} className="w-full h-full object-cover" alt="Preview" />
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[8px] font-bold cursor-pointer">
              <span>Change</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
          </div>
          <p className="text-[8px] text-slate-400 dark:text-slate-500 mt-1 text-center leading-none">
            Rec: 400x400px<br />Max: 1MB
          </p>
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Representative Name</label>
            <input 
              type="text" 
              value={draft.name} 
              onChange={(e) => setDraft({ ...draft, name: e.target.value })} 
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-350"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Company Executive Role</label>
            <input 
              type="text" 
              value={draft.role} 
              onChange={(e) => setDraft({ ...draft, role: e.target.value })} 
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-205 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-705 dark:text-slate-350"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <button type="button" onClick={onCancel} className="px-3 py-1.5 text-xs font-bold text-slate-450 hover:underline">Cancel</button>
        <button type="button" onClick={() => onSave(draft)} className="px-4 py-1.5 bg-primary text-white text-xs font-bold rounded-xl">Keep Changes</button>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. FOOTER SECTION SETTINGS
   ========================================================================== */

export const FooterSectionSettings: React.FC = () => {
  const { footerSettings, updateFooterSettings, showToast } = useDashboard();

  const [draft, setDraft] = React.useState({ ...footerSettings });
  const [quickLinksText, setQuickLinksText] = React.useState(footerSettings.quickLinks.join('\n'));
  const [servicesText, setServicesText] = React.useState(footerSettings.services.join('\n'));

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select a logo under 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft(prev => ({ ...prev, logo: event.target?.result as string }));
        showToast('success', 'Logo Graphic Loaded', 'Press Save Footer Settings to publish.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    const parsed = {
      ...draft,
      quickLinks: quickLinksText.split('\n').map(l => l.trim()).filter(Boolean),
      services: servicesText.split('\n').map(l => l.trim()).filter(Boolean),
    };
    updateFooterSettings(parsed);
    showToast('success', 'Footer Saved', 'Footer section content has been updated and published.');
  };

  const field = (label: string, key: keyof typeof draft, type: string = 'text', placeholder = '') => (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">{label}</label>
      <input
        type={type}
        value={draft[key] as string}
        onChange={e => setDraft({ ...draft, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300"
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <CMSSectionHeader
        title="Footer Section"
        description="Manage the website footer — brand info, contact details, social links, navigation links, services, newsletter text, and copyright."
        isEnabled={draft.isEnabled}
        onToggle={val => setDraft({ ...draft, isEnabled: val })}
      />

      {/* Brand Info */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Brand Information
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Company Name</label>
              <input
                type="text"
                value={draft.companyName}
                onChange={e => setDraft({ ...draft, companyName: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Brand Tagline</label>
              <textarea
                rows={3}
                value={draft.brandTagline}
                onChange={e => setDraft({ ...draft, brandTagline: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300 resize-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-slate-450 tracking-wider">Footer Logo</label>
            <div className="relative group w-32 h-32 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
              <img src={draft.logo} className="max-w-full max-h-full object-contain p-2" alt="Footer Logo preview" />
              <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1 text-white text-[9px] font-bold cursor-pointer transition-opacity">
                <Upload className="w-3.5 h-3.5" />
                <span>Replace Photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
              </label>
            </div>
            <p className="text-[8px] text-slate-400 dark:text-slate-500">
              Recommended Resolution: 120x120px (Square/Contain) | Max Size: 1MB
            </p>
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Contact Details
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          {field('Address', 'address', 'text', 'e.g. Farmgate, Dhaka-1215')}
          {field('Phone Number', 'phone', 'tel', 'e.g. +880 1700-000001')}
          {field('Email Address', 'email', 'email', 'e.g. info@airzoneltd.com')}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Social Media URLs
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          {field('Facebook URL', 'facebookUrl', 'url', 'https://facebook.com/...')}
          {field('YouTube URL', 'youtubeUrl', 'url', 'https://youtube.com/...')}
          {field('Instagram URL', 'instagramUrl', 'url', 'https://instagram.com/...')}
        </div>
      </div>

      {/* Navigation Lists */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Quick Links */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
          <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
            Quick Links
          </h4>
          <p className="text-[10px] text-slate-400">One link label per line. These appear in the footer navigation.</p>
          <textarea
            rows={8}
            value={quickLinksText}
            onChange={e => setQuickLinksText(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300 font-mono resize-none"
            placeholder={'Home\nAbout Us\nTour Packages\n...'}
          />
          <p className="text-[10px] text-slate-400">{quickLinksText.split('\n').filter(Boolean).length} links configured</p>
        </div>

        {/* Services */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
          <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
            Our Services List
          </h4>
          <p className="text-[10px] text-slate-400">One service name per line. These appear in the footer services column.</p>
          <textarea
            rows={8}
            value={servicesText}
            onChange={e => setServicesText(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300 font-mono resize-none"
            placeholder={'International Tours\nDomestic Tours\n...'}
          />
          <p className="text-[10px] text-slate-400">{servicesText.split('\n').filter(Boolean).length} services configured</p>
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Newsletter Block
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {field('Newsletter Section Title', 'newsletterTitle', 'text', 'e.g. Newsletter')}
          {field('Newsletter Description', 'newsletterDesc', 'text', 'e.g. Get exclusive travel deals...')}
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Copyright &amp; Legal
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {field('Copyright Text', 'copyrightText', 'text', 'e.g. Air Zone Ltd. All rights reserved.')}
          {field('License / Legal Text', 'licenseText', 'text', 'e.g. Licensed Travel Agency — Bangladesh')}
        </div>
        <p className="text-[10px] text-slate-400">The current year (&copy;) is added automatically.</p>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Save Footer Settings
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   7. CONTACT SECTION SETTINGS
   ========================================================================== */

export const ContactSectionSettings: React.FC = () => {
  const { contactSettings, updateContactSettings, showToast } = useDashboard();

  const [draft, setDraft] = React.useState({ ...contactSettings });

  const handleSave = () => {
    updateContactSettings(draft);
    showToast('success', 'Contact Settings Saved', 'Contact section parameters have been updated.');
  };

  const field = (label: string, key: keyof typeof draft, type: string = 'text', placeholder = '') => (
    <div className="space-y-1">
      <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">{label}</label>
      <input
        type={type}
        value={draft[key] as string}
        onChange={e => setDraft({ ...draft, [key]: e.target.value })}
        placeholder={placeholder}
        className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300"
      />
    </div>
  );

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSSectionHeader
        title="Contact Settings (Get In Touch)"
        description="Manage address, hotline, telephone numbers, emails, and operating hours."
        isEnabled={draft.isEnabled}
        onToggle={val => setDraft({ ...draft, isEnabled: val })}
      />

      {/* Text Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Header Content
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {field('Top Badge Text', 'badge', 'text', 'e.g. Reach Us')}
          {field('Section Title', 'title', 'text', 'e.g. Get In Touch')}
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Subtitle Description</label>
          <input
            type="text"
            value={draft.subtitle}
            onChange={e => setDraft({ ...draft, subtitle: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300"
          />
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Address &amp; Hotline
        </h4>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Office Address</label>
          <textarea
            rows={3}
            value={draft.address}
            onChange={e => setDraft({ ...draft, address: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary text-slate-700 dark:text-slate-300"
          />
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {field('Phone 1', 'phone1')}
          {field('Phone 2 (Optional)', 'phone2')}
          {field('Hotline (Optional)', 'hotline')}
        </div>
      </div>

      {/* Online details */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Emails &amp; Office Hours
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          {field('Email 1', 'email1')}
          {field('Email 2 (Optional)', 'email2')}
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {field('Hours (Saturday – Thursday)', 'hoursSaturdayThursday')}
          {field('Hours (Friday / Weekend)', 'hoursFriday')}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Save Contact Settings
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   8. ADVERTISING SECTION SETTINGS
   ========================================================================== */

export const AdSectionSettings: React.FC = () => {
  const { adSettings, updateAdSettings, showToast } = useDashboard();
  const [slides, setSlides] = useState<AdSlide[]>(adSettings.slides || []);
  const [activeSlideIdx, setActiveSlideIdx] = useState<number | null>(0);

  const handleSave = () => {
    updateAdSettings({ slides });
    showToast('success', 'Ad Content Saved', 'Advertising slideshow modifications have been published.');
  };

  const handleUpdateSlideField = (index: number, field: keyof AdSlide, value: string) => {
    const next = [...slides];
    next[index] = { ...next[index], [field]: value };
    setSlides(next);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const next = [...slides];
        next[index] = { ...next[index], image: event.target?.result as string };
        setSlides(next);
        showToast('success', 'Ad Image Loaded', 'Press Save to publish the new image.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === slides.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const next = [...slides];
    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;
    setSlides(next);
    if (activeSlideIdx === index) setActiveSlideIdx(targetIdx);
    else if (activeSlideIdx === targetIdx) setActiveSlideIdx(index);
  };

  const handleDelete = (index: number) => {
    if (slides.length <= 1) {
      showToast('warning', 'Minimum Slides reached', 'You must keep at least one ad slide active.');
      return;
    }
    const next = slides.filter((_, i) => i !== index);
    setSlides(next);
    setActiveSlideIdx(0);
    showToast('info', 'Slide Removed', 'Ad slide item deleted from draft.');
  };

  const handleAddSlide = () => {
    const newSlide: AdSlide = {
      image: 'https://images.pexels.com/photos/1008155/pexels-photo-1008155.jpeg?auto=compress&cs=tinysrgb&w=1200',
      linkUrl: 'https://www.airzoneltd.com'
    };
    setSlides([...slides, newSlide]);
    setActiveSlideIdx(slides.length);
    showToast('success', 'New Ad Banner Added', 'Configured default mock data. Customize details below.');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs max-w-4xl">
      <CMSSectionHeader 
        title="Advertising Settings" 
        description="Edit background graphics and redirect URLs in the homepage advertising banner."
        isEnabled={adSettings.isEnabled}
        onToggle={(val) => updateAdSettings({ isEnabled: val })}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Slides list */}
        <div className="md:col-span-1 space-y-2 border-r border-slate-105 dark:border-slate-850 pr-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] uppercase font-black text-slate-455 tracking-wider">Ad Slides</span>
            <button 
              type="button" 
              onClick={handleAddSlide}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>

          {slides.map((slide, idx) => (
            <div 
              key={idx}
              className={`p-3 rounded-xl border transition-all text-left flex justify-between items-center ${
                activeSlideIdx === idx 
                  ? 'border-primary/40 bg-primary/5 dark:bg-primary/10 text-primary dark:text-primary-light font-bold' 
                  : 'border-slate-205 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <button 
                type="button"
                onClick={() => setActiveSlideIdx(idx)}
                className="flex-1 text-xs truncate text-left font-bold"
              >
                Slide {idx + 1}
              </button>
              <div className="flex items-center gap-1.5 ml-2">
                <button 
                  type="button" 
                  disabled={idx === 0} 
                  onClick={() => handleMove(idx, 'up')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                >
                  <ArrowUp className="w-3 h-3" />
                </button>
                <button 
                  type="button" 
                  disabled={idx === slides.length - 1} 
                  onClick={() => handleMove(idx, 'down')}
                  className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-30"
                >
                  <ArrowDown className="w-3 h-3" />
                </button>
                <button 
                  type="button" 
                  onClick={() => handleDelete(idx)}
                  className="p-1 text-red-400 hover:text-red-650"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Edit Form */}
        <div className="md:col-span-2 space-y-4">
          {activeSlideIdx !== null && slides[activeSlideIdx] ? (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-850/50 rounded-xl flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-350">Editing Slide {activeSlideIdx + 1}</span>
                <span className="text-[10px] text-slate-400 font-medium">Ad Banner instance</span>
              </div>

              {/* Graphic preview */}
              <div className="relative group w-full h-36 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-100 flex items-center justify-center">
                {slides[activeSlideIdx].image ? (
                  <img 
                    src={slides[activeSlideIdx].image} 
                    alt="Ad banner background" 
                    className="w-full h-full object-cover" 
                  />
                ) : (
                  <span className="text-xs text-slate-450">No image uploaded</span>
                )}
                <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white text-[10px] font-bold cursor-pointer transition-opacity">
                  <Upload className="w-4 h-4 animate-bounce" />
                  <span>Replace Backdrop Image</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => handleImageUpload(activeSlideIdx, e)} 
                  />
                </label>
              </div>
              <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 text-center">
                Recommended Resolution: 1200x400px (Wide) | Max Size: 2MB
              </p>

              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Redirect Target Link (Optional)</label>
                <input 
                  type="url" 
                  value={slides[activeSlideIdx].linkUrl || ''}
                  onChange={(e) => handleUpdateSlideField(activeSlideIdx, 'linkUrl', e.target.value)}
                  placeholder="https://example.com/promo"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-250 dark:border-slate-800 rounded-xl px-4 py-2 text-xs focus:outline-none text-slate-700 dark:text-slate-300"
                />
                <p className="text-[9px] text-slate-400 dark:text-slate-500">
                  Pasting a URL here will make the banner clickable, redirecting clients when clicked.
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Select or add a slide index from the left menu to customize contents.
            </div>
          )}
        </div>
      </div>

      <div className="pt-5 mt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
        <button 
          onClick={handleSave}
          className="px-4 py-2 bg-primary hover:bg-primary-hover text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-md shadow-primary/15 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Ad Settings</span>
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   9. SERVICES SECTION SETTINGS
   ========================================================================== */

export const ServicesSectionSettings: React.FC = () => {
  const { servicesSettings, updateServicesSettings, showToast } = useDashboard();
  const [draft, setDraft] = React.useState({ ...servicesSettings });

  const handleSave = () => {
    updateServicesSettings(draft);
    showToast('success', 'Services Settings Saved', 'Services section parameters have been updated.');
  };

  const handleItemChange = (index: number, key: 'title' | 'desc' | 'iconName', val: string) => {
    const nextItems = [...draft.items];
    nextItems[index] = { ...nextItems[index], [key]: val };
    setDraft({ ...draft, items: nextItems });
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSSectionHeader
        title="Services Section Settings (Service Highlights)"
        description="Configure titles, badge text, and the details for your main service cards."
        isEnabled={draft.isEnabled}
        onToggle={val => setDraft({ ...draft, isEnabled: val })}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Header Content
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Badge text</label>
            <input
              type="text"
              value={draft.badge}
              onChange={e => setDraft({ ...draft, badge: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Title</label>
            <input
              type="text"
              value={draft.title}
              onChange={e => setDraft({ ...draft, title: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Subtitle Description</label>
          <input
            type="text"
            value={draft.subtitle}
            onChange={e => setDraft({ ...draft, subtitle: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-xs uppercase font-black text-slate-455 tracking-wider">Service Cards</h4>
        <div className="grid md:grid-cols-3 gap-6">
          {draft.items.map((item, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-5 rounded-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-300">Service {idx + 1}</span>
                <span className="text-[10px] text-slate-400 font-mono">{item.iconName}</span>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Card Title</label>
                <input
                  type="text"
                  value={item.title}
                  onChange={e => handleItemChange(idx, 'title', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Lucide Icon name</label>
                <select
                  value={item.iconName}
                  onChange={e => handleItemChange(idx, 'iconName', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary"
                >
                  <option value="Compass">Compass</option>
                  <option value="Plane">Plane</option>
                  <option value="Globe">Globe</option>
                  <option value="Award">Award</option>
                  <option value="Shield">Shield</option>
                  <option value="Heart">Heart</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Description</label>
                <textarea
                  rows={4}
                  value={item.desc}
                  onChange={e => handleItemChange(idx, 'desc', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Save Services Settings
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   10. FLIGHT TICKETING SECTION SETTINGS
   ========================================================================== */

export const FlightTicketingSectionSettings: React.FC = () => {
  const { flightTicketingSettings, updateFlightTicketingSettings, showToast } = useDashboard();
  const [title, setTitle] = useState(flightTicketingSettings.title);
  const [subtitle, setSubtitle] = useState(flightTicketingSettings.subtitle);
  const [deals, setDeals] = useState<FlightDealItem[]>(flightTicketingSettings.deals || []);
  const [activeDealIdx, setActiveDealIdx] = useState<number | null>(0);

  const handleSave = () => {
    updateFlightTicketingSettings({ title, subtitle, deals });
    showToast('success', 'Ticketing Settings Saved', 'Flight deals showcard has been updated on the front-end.');
  };

  const handleDealFieldChange = (index: number, key: keyof FlightDealItem, val: any) => {
    const next = [...deals];
    next[index] = { ...next[index], [key]: val };
    setDeals(next);
  };

  const handleAddDeal = () => {
    const newDeal: FlightDealItem = {
      id: Math.random().toString(36).substring(2, 9),
      airline: 'Sample Airways',
      logo: 'https://images.pexels.com/photos/1089306/pexels-photo-1089306.jpeg?auto=compress&cs=tinysrgb&w=150',
      from: 'Dhaka (DAC)',
      to: 'New Destination',
      price: '৳25,000',
      duration: '3h 30m',
      stops: 'Non-stop',
      cabin: 'Economy',
      baggage: '30 kg',
      type: 'international',
      details: 'Enjoy world class service, delicious hot meals, and priority luggage privileges.',
      schedule: '09:00 AM - 12:30 PM'
    };
    setDeals([...deals, newDeal]);
    setActiveDealIdx(deals.length);
    showToast('success', 'New Deal Added', 'Click on the new card to customize flight options.');
  };

  const handleDeleteDeal = (index: number) => {
    const next = deals.filter((_, i) => i !== index);
    setDeals(next);
    setActiveDealIdx(next.length > 0 ? 0 : null);
    showToast('info', 'Deal Removed', 'Flight deal draft removed.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSSectionHeader
        title="Domestic & International Flight Ticketing Settings"
        description="Toggle ticketing lists, update section headings, and manage active flight promotion items."
        isEnabled={flightTicketingSettings.isEnabled}
        onToggle={val => updateFlightTicketingSettings({ isEnabled: val })}
      />

      {/* Heading Info */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Header Strings
        </h4>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Subtitle Description</label>
          <input
            type="text"
            value={subtitle}
            onChange={e => setSubtitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
        {/* Deal Sidebar list */}
        <div className="md:col-span-1 space-y-2 border-r border-slate-100 dark:border-slate-800 pr-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] uppercase font-black text-slate-455 tracking-wider">Flight Deals ({deals.length})</span>
            <button
              type="button"
              onClick={handleAddDeal}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>
          <div className="space-y-1 max-h-[380px] overflow-y-auto pr-1 flex flex-col">
            {deals.map((deal, idx) => (
              <div
                key={deal.id}
                className={`p-2.5 rounded-xl border transition-all text-left flex justify-between items-center cursor-pointer ${
                  activeDealIdx === idx
                    ? 'border-primary bg-primary/5 text-primary dark:text-primary-light font-bold'
                    : 'border-slate-100 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600'
                }`}
                onClick={() => setActiveDealIdx(idx)}
              >
                <div className="flex-1 truncate">
                  <div className="text-[11px] font-bold">{deal.airline}</div>
                  <div className="text-[10px] text-slate-400 truncate">{deal.from} ➔ {deal.to}</div>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDeleteDeal(idx); }}
                  className="p-1 text-slate-400 hover:text-red-650 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Deal Edit Form */}
        <div className="md:col-span-2 space-y-4">
          {activeDealIdx !== null && deals[activeDealIdx] ? (
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Airline Carrier Name</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].airline}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'airline', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Flight Category</label>
                <select
                  value={deals[activeDealIdx].type}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'type', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                >
                  <option value="domestic">Domestic Flight</option>
                  <option value="international">International Flight</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Departure Airport Code</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].from}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'from', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Destination Airport Code</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].to}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'to', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Ticket Price Text</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].price}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'price', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-450 tracking-wider">Duration Days/Hours</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].duration}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'duration', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Stops Count</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].stops}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'stops', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Cabin baggage Limit</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].baggage}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'baggage', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Flight Timing Schedule</label>
                <input
                  type="text"
                  value={deals[activeDealIdx].schedule}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'schedule', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                />
              </div>
              <div className="space-y-1 md:col-span-2">
                <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Deal Details Description</label>
                <textarea
                  rows={2}
                  value={deals[activeDealIdx].details}
                  onChange={e => handleDealFieldChange(activeDealIdx, 'details', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Select or add a flight deal from the left listing to begin customizing.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Save Ticketing Settings
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   11. WHY CHOOSE US (WE MAKE TRAVEL) SECTION SETTINGS
   ========================================================================== */

export const WhyChooseUsSectionSettings: React.FC = () => {
  const { whyChooseUsSettings, updateWhyChooseUsSettings, showToast } = useDashboard();
  const [draft, setDraft] = React.useState({ ...whyChooseUsSettings });

  const handleSave = () => {
    updateWhyChooseUsSettings(draft);
    showToast('success', 'Why Choose Us Saved', 'Content parameters have been saved successfully.');
  };

  const handleReasonChange = (index: number, key: 'title' | 'desc', val: string) => {
    const nextReasons = [...draft.reasons];
    nextReasons[index] = { ...nextReasons[index], [key]: val };
    setDraft({ ...draft, reasons: nextReasons });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select an image under 2MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        setDraft({ ...draft, image: event.target?.result as string });
        showToast('success', 'Backdrop image loaded', 'Click save to apply changes.');
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSSectionHeader
        title="Why Choose Us (We Make Travel) Settings"
        description="Edit badge strings, titles, floating counter values, side images, and quality parameters."
        isEnabled={draft.isEnabled}
        onToggle={val => setDraft({ ...draft, isEnabled: val })}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Text and Headings
        </h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Badge Text</label>
            <input
              type="text"
              value={draft.badge}
              onChange={e => setDraft({ ...draft, badge: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-350 focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Title Line 1</label>
            <input
              type="text"
              value={draft.titleLine1}
              onChange={e => setDraft({ ...draft, titleLine1: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-350 focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Title Line 2 (Highlighted)</label>
            <input
              type="text"
              value={draft.titleLine2}
              onChange={e => setDraft({ ...draft, titleLine2: e.target.value })}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-350 focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Description</label>
          <textarea
            rows={3}
            value={draft.description}
            onChange={e => setDraft({ ...draft, description: e.target.value })}
            className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 dark:text-slate-300 focus:ring-1 focus:ring-primary resize-none"
          />
        </div>
      </div>

      {/* Reason items & Side panel image */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-4">
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-250 flex items-center gap-2 mb-2">
            <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
            Core Reasons List
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            {draft.reasons.map((r, idx) => (
              <div key={idx} className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl space-y-2">
                <span className="text-[9px] font-bold text-primary">Reason {idx + 1} ({r.iconName})</span>
                <input
                  type="text"
                  value={r.title}
                  onChange={e => handleReasonChange(idx, 'title', e.target.value)}
                  placeholder="Reason Title"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-350"
                />
                <textarea
                  rows={2}
                  value={r.desc}
                  onChange={e => handleReasonChange(idx, 'desc', e.target.value)}
                  placeholder="Details"
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-lg px-2 py-1 text-[10px] text-slate-700 dark:text-slate-300 resize-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Side Image and card details */}
        <div className="md:col-span-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl space-y-4">
          <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-250 flex items-center gap-2">
            <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
            Panel Image &amp; Stat Card
          </h4>
          <div className="relative group w-full h-32 border border-slate-205 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-50 flex items-center justify-center">
            {draft.image ? (
              <img src={draft.image} className="w-full h-full object-cover" alt="Side showcase image preview" />
            ) : (
              <span className="text-xs text-slate-400">No image loaded</span>
            )}
            <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-1.5 text-white text-[9px] font-bold cursor-pointer transition-opacity">
              <Upload className="w-4 h-4" />
              <span>Replace Image</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          </div>
          <p className="text-[9px] text-slate-400 text-center">800x480px | Max 2MB</p>
          <div className="space-y-2.5 pt-2">
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Stat Number</label>
              <input
                type="text"
                value={draft.floatingCardNumber}
                onChange={e => setDraft({ ...draft, floatingCardNumber: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-350"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Stat Title</label>
              <input
                type="text"
                value={draft.floatingCardTitle}
                onChange={e => setDraft({ ...draft, floatingCardTitle: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-350"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Stat Subtitle</label>
              <input
                type="text"
                value={draft.floatingCardDesc}
                onChange={e => setDraft({ ...draft, floatingCardDesc: e.target.value })}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-lg px-2 py-1 text-xs text-slate-700 dark:text-slate-350"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Save Choice Settings
        </button>
      </div>
    </div>
  );
};

/* ==========================================================================
   12. TESTIMONIALS (WHAT CLIENTS SAY) SECTION SETTINGS
   ========================================================================== */

export const TestimonialsSectionSettings: React.FC = () => {
  const { testimonialsSettings, updateTestimonialsSettings, showToast } = useDashboard();
  const [badge, setBadge] = useState(testimonialsSettings.badge);
  const [title, setTitle] = useState(testimonialsSettings.title);
  const [items, setItems] = useState<TestimonialItem[]>(testimonialsSettings.items || []);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState<number | null>(0);

  const handleSave = () => {
    updateTestimonialsSettings({ badge, title, items });
    showToast('success', 'Testimonials Saved', 'Client review slides updated successfully.');
  };

  const handleItemFieldChange = (index: number, key: keyof TestimonialItem, val: any) => {
    const next = [...items];
    next[index] = { ...next[index], [key]: val };
    setItems(next);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        showToast('error', 'File Too Large', 'Please select an image under 1MB.');
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const next = [...items];
        next[index] = { ...next[index], image: event.target?.result as string };
        setItems(next);
        showToast('success', 'Reviewer Avatar loaded', 'Avatar image updated in draft.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddTestimonial = () => {
    const newItem: TestimonialItem = {
      name: 'New Client',
      role: 'Travel Enthusiast',
      image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
      text: 'Wonderful experience dealing with Air Zone. Highly recommended service.',
      rating: 5
    };
    setItems([...items, newItem]);
    setActiveTestimonialIdx(items.length);
    showToast('success', 'New Testimonial added', 'Select the card on the left list to customize details.');
  };

  const handleDeleteTestimonial = (index: number) => {
    if (items.length <= 1) {
      showToast('warning', 'Minimum Testimonials reached', 'You must maintain at least one client testimonial.');
      return;
    }
    const next = items.filter((_, i) => i !== index);
    setItems(next);
    setActiveTestimonialIdx(0);
    showToast('info', 'Testimonial Removed', 'Client testimonial deleted from draft.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <CMSSectionHeader
        title="Testimonials Section Settings (What Our Clients Say)"
        description="Toggle testimonials visibility, modify headings, and update reviewer names, descriptions and ratings."
        isEnabled={testimonialsSettings.isEnabled}
        onToggle={val => updateTestimonialsSettings({ isEnabled: val })}
      />

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 space-y-4">
        <h4 className="text-sm font-extrabold text-slate-700 dark:text-slate-200 flex items-center gap-2">
          <span className="w-1.5 h-4 rounded-full bg-primary inline-block" />
          Headers
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Badge Text</label>
            <input
              type="text"
              value={badge}
              onChange={e => setBadge(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 focus:ring-1 focus:ring-primary"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-slate-455 tracking-wider">Section Title</label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-700 focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
        {/* Testimonials list */}
        <div className="md:col-span-1 space-y-2 border-r border-slate-100 dark:border-slate-800 pr-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] uppercase font-black text-slate-455 tracking-wider">Testimonials ({items.length})</span>
            <button
              type="button"
              onClick={handleAddTestimonial}
              className="text-[10px] font-bold text-primary hover:underline flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add New</span>
            </button>
          </div>
          <div className="space-y-1 max-h-[350px] overflow-y-auto pr-1 flex flex-col">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border transition-all text-left flex justify-between items-center cursor-pointer ${
                  activeTestimonialIdx === idx
                    ? 'border-primary bg-primary/5 text-primary dark:text-primary-light font-bold'
                    : 'border-slate-105 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800/50 text-slate-600'
                }`}
                onClick={() => setActiveTestimonialIdx(idx)}
              >
                <div className="flex items-center gap-2 truncate">
                  <img src={item.image} className="w-6 h-6 rounded-full object-cover" alt="" />
                  <span className="text-[11px] truncate font-bold">{item.name}</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); handleDeleteTestimonial(idx); }}
                  className="p-1 text-slate-400 hover:text-red-650 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial Form */}
        <div className="md:col-span-2 space-y-4">
          {activeTestimonialIdx !== null && items[activeTestimonialIdx] ? (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Reviewer Name</label>
                  <input
                    type="text"
                    value={items[activeTestimonialIdx].name}
                    onChange={e => handleItemFieldChange(activeTestimonialIdx, 'name', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Reviewer Designation / Role</label>
                  <input
                    type="text"
                    value={items[activeTestimonialIdx].role}
                    onChange={e => handleItemFieldChange(activeTestimonialIdx, 'role', e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 items-center">
                {/* Avatar uploader */}
                <div className="md:col-span-1 space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider block">Avatar Graphic</label>
                  <div className="relative group w-16 h-16 border border-slate-205 rounded-full overflow-hidden bg-slate-50 flex items-center justify-center">
                    {items[activeTestimonialIdx].image ? (
                      <img src={items[activeTestimonialIdx].image} className="w-full h-full object-cover" alt="" />
                    ) : (
                      <span className="text-[10px] text-slate-400">None</span>
                    )}
                    <label className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-[8px] font-bold cursor-pointer transition-opacity">
                      <Upload className="w-3.5 h-3.5" />
                      <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(activeTestimonialIdx, e)} />
                    </label>
                  </div>
                  <p className="text-[8px] text-slate-400">200x200px | Max 1MB</p>
                </div>

                <div className="md:col-span-2 space-y-1">
                  <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Rating Stars (1 to 5)</label>
                  <select
                    value={items[activeTestimonialIdx].rating}
                    onChange={e => handleItemFieldChange(activeTestimonialIdx, 'rating', Number(e.target.value))}
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-350"
                  >
                    <option value={5}>5 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={2}>2 Stars</option>
                    <option value={1}>1 Star</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] font-black uppercase text-slate-455 tracking-wider">Testimonial Review text</label>
                <textarea
                  rows={3}
                  value={items[activeTestimonialIdx].text}
                  onChange={e => handleItemFieldChange(activeTestimonialIdx, 'text', e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 dark:text-slate-300 resize-none"
                />
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-400 text-xs">
              Select or add a client testimonial reviewer from the left menu to customize text.
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md shadow-primary/20 transition-all"
        >
          <Save className="w-3.5 h-3.5" />
          Save Testimonials Settings
        </button>
      </div>
    </div>
  );
};
