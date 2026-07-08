import { useState, useEffect } from 'react';
import { Clock, ArrowRight, Search, X, Check, FileText, FileCheck2, Send } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';
import { VisaServiceItem } from '../types/dashboard';

const defaultDocuments = [
  'Current passport with at least 6 months validity & previous passports',
  'Two recent photographs (35mm x 45mm, white background)',
  'Bank statement (last 6 months) with bank solvency certificate (Min. ৳3-4 Lakhs)',
  'No Objection Certificate (NOC) for service / Trade License copy for businessmen',
  'TIN certificate and last 3 years Tax return slip',
  'Property asset valuation, marriage certificate (if family travel)'
];

export default function VisaServices() {
  const { visaSettings } = useDashboard();
  if (!visaSettings.isEnabled) return null;
  const visas = visaSettings.items;
  const title = visaSettings.title;
  const subtitle = visaSettings.subtitle;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVisa, setSelectedVisa] = useState<any | null>(null);
  const [sentInquiry, setSentInquiry] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');

  // Listen to search events from Hero
  useEffect(() => {
    const handleFilter = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { country } = customEvent.detail;
      if (country) {
        setSearchQuery(country);
        const match = visas.find(
          (v) => v.country.toLowerCase().includes(country.toLowerCase())
        );
        if (match) setSelectedVisa(match);
      }
    };
    window.addEventListener('filter-visa', handleFilter);
    return () => window.removeEventListener('filter-visa', handleFilter);
  }, []);

  const filteredVisas = visas.filter((v) =>
    v.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSentInquiry(true);
    setTimeout(() => {
      setSentInquiry(false);
      setSelectedVisa(null);
      setInquiryName('');
      setInquiryPhone('');
    }, 3000);

    // Pass details to main contact form as pre-populated
    window.dispatchEvent(new CustomEvent('prepopulate-inquiry', {
      detail: {
        service: 'Visa Assistance',
        message: `Hello! I would like to get visa assistance for "${selectedVisa?.country}". Please call me back on ${inquiryPhone}.`
      }
    }));
  };

  return (
    <section id="visa" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-sky-600 font-extrabold text-xs uppercase tracking-widest block mb-2">Hassle-Free Processing</span>
            <h2 className="text-3.5xl md:text-5xl font-black text-slate-800 tracking-tight">{title}</h2>
            <p className="text-slate-500 text-sm md:text-base mt-2 max-w-xl">
              {subtitle}
            </p>
          </div>

          {/* Visa search */}
          <div className="relative w-full md:w-80">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search visa by country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Visa list grid */}
        {filteredVisas.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredVisas.map((v) => (
              <div
                key={v.country}
                onClick={() => setSelectedVisa(v)}
                className="bg-white rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-lg hover:shadow-sky-500/5 transition-all duration-200 p-5 flex items-center justify-between group cursor-pointer transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={v.flag}
                    alt={v.country}
                    className="w-11 h-7.5 object-cover rounded shadow-sm flex-shrink-0"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <div className="min-w-0">
                    <div className="font-extrabold text-slate-800 text-sm leading-tight truncate group-hover:text-sky-700 transition-colors">{v.country}</div>
                    <div className="text-slate-400 text-[10px] font-semibold mt-0.5 uppercase tracking-wide">{v.category}</div>
                    <div className="flex items-center gap-1 text-sky-600 text-[10px] mt-1.5 font-bold uppercase tracking-wider">
                      <Clock size={10} />
                      {v.days}
                    </div>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-300 group-hover:text-sky-600 flex-shrink-0 group-hover:translate-x-0.5 transition-all" />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <Search className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-700 mb-1">Country not found</h3>
            <p className="text-slate-400 text-sm max-w-sm mx-auto">We process visa applications for 50+ countries. Get in touch with us to check requirements for your country.</p>
          </div>
        )}

        {/* Bottom Banner */}
        <div className="mt-12 bg-sky-950 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="text-2xl md:text-3.5xl font-black mb-3">Looking for a different country?</h3>
            <p className="text-sky-200/90 text-sm md:text-base mb-6 leading-relaxed">
              If your desired destination isn't listed, don't worry. Our visa department assists with applications to 50+ countries worldwide.
            </p>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs tracking-wider uppercase px-8 py-3.5 rounded-full transition-colors shadow-lg hover:shadow-sky-500/20"
            >
              Inquire Other Country <ArrowRight size={14} />
            </button>
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(3,105,161,0.25),transparent)] pointer-events-none" />
        </div>
      </div>

      {/* Visa Requirement Modal Overlay */}
      {selectedVisa && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col animate-fade-up relative">
            
            {/* Close button */}
            <button
              onClick={() => setSelectedVisa(null)}
              className="absolute right-5 top-5 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center shadow-md hover:scale-105 transition-all"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
              <img
                src={selectedVisa.flag}
                alt={selectedVisa.country}
                className="w-12 h-8 object-cover rounded shadow-sm"
              />
              <div>
                <h3 className="text-xl md:text-2xl font-black text-slate-800 leading-tight">
                  {selectedVisa.country} Visa Requirements
                </h3>
                <p className="text-slate-400 text-xs font-semibold uppercase mt-0.5 tracking-wider">
                  {selectedVisa.category} Category
                </p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto flex-1 p-6 md:p-8">
              {sentInquiry ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <Check size={28} className="text-emerald-600" />
                  </div>
                  <h4 className="text-slate-800 font-extrabold text-2xl mb-2">Request Received!</h4>
                  <p className="text-slate-500 text-sm max-w-sm">We will contact you shortly to review your documents and verify visa eligibility.</p>
                </div>
              ) : (
                <div>
                  {/* Processing specs */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Processing Time</div>
                      <div className="font-extrabold text-slate-800 text-sm mt-1">{selectedVisa.days}</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-center">
                      <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Service Cost</div>
                      <div className="font-extrabold text-sky-700 text-sm mt-1">{selectedVisa.price}</div>
                    </div>
                  </div>

                  {/* Checklist */}
                  <div className="mb-8">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <FileText size={13} className="text-sky-600" />
                      Required Documents Checklist
                    </h4>
                    <ul className="space-y-3.5">
                      {(selectedVisa.documents || defaultDocuments).map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-slate-600 text-xs md:text-sm leading-relaxed">
                          <div className="w-5 h-5 bg-sky-50 text-sky-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-[10px] font-bold">
                            {idx + 1}
                          </div>
                          {doc}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Visa Inquiry Form */}
                  <div className="border-t border-slate-100 pt-6">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1.5">
                      <FileCheck2 size={13} className="text-sky-600" />
                      Request Documentation Check
                    </h4>
                    <form onSubmit={handleInquirySubmit} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          required
                          placeholder="Your Name"
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                        <input
                          type="tel"
                          required
                          placeholder="Phone Number"
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-slate-700 text-xs focus:outline-none focus:ring-2 focus:ring-sky-500/20"
                        />
                      </div>
                      <div className="flex items-center justify-between gap-4 pt-2">
                        <span className="text-slate-400 text-[10px] leading-tight max-w-xs block">
                          Our visa team will guide you on notarization and bank solvency preparation.
                        </span>
                        <button
                          type="submit"
                          className="bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs tracking-wider uppercase px-6 py-3 rounded-xl transition-colors shadow-md shadow-sky-500/10 flex items-center gap-1.5"
                        >
                          <Send size={12} />
                          Submit Request
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

