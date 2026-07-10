import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, Clock, Loader2, AlertCircle } from 'lucide-react';
import { useDashboard } from './dashboard/DashboardContext';
import { submitContactMessage } from '../lib/appwriteService';

export default function Contact() {
  const { contactSettings } = useDashboard();
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handlePrepopulate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { service, message } = customEvent.detail;
      setForm((prev) => ({
        ...prev,
        service: service || prev.service,
        message: message || prev.message,
      }));
      // Wait for modal exit animations before scrolling
      setTimeout(() => {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    };
    window.addEventListener('prepopulate-inquiry', handlePrepopulate);
    return () => window.removeEventListener('prepopulate-inquiry', handlePrepopulate);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    
    try {
      // 1. Fetch user IP address (if available)
      let ipAddress = 'unknown';
      try {
        const ipRes = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipRes.json();
        ipAddress = ipData.ip;
      } catch (e) {
        // silently ignore IP fetch failures
      }

      // 2. Prepare data payload (The keys here determine how the email body looks)
      const payload = {
        "Customer Name": form.name,
        "Email Address": form.email,
        "Phone Number": form.phone || 'Not provided',
        "Service Requested": form.service || 'General Inquiry',
        "Message Details": form.message,
        "Submission Time": new Date().toLocaleString(),
        "User IP": ipAddress,
        // FormSubmit specific config
        _subject: `New Inquiry from ${form.name}: ${form.service || 'General Inquiry'}`,
        _captcha: 'false',
        _template: 'box' // 'box' is a premium-looking HTML template provided by FormSubmit
      };

      // 3. Send to FormSubmit using your secure randomized hash to protect your email from spam bots
      const emailRes = await fetch('https://formsubmit.co/ajax/d92c89ad3b138fedd658754d09ca0d15', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!emailRes.ok) {
        throw new Error('Failed to send email. FormSubmit returned an error.');
      }

      // 4. Save to Appwrite Database for Dashboard Access
      await submitContactMessage({
        ...form,
        ipAddress
      });

      // 5. Show Success UI
      setSent(true);
      setForm({ name: '', email: '', phone: '', service: '', message: '' });
      setTimeout(() => setSent(false), 6000);

    } catch (err) {
      console.error('Contact Form Error:', err);
      setError('Something went wrong while sending your message. Please try again or call us directly.');
    } finally {
      setSending(false);
    }
  };

  if (!contactSettings.isEnabled) return null;

  return (
    <section id="contact" className="py-24 bg-secondary text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-primary-light font-semibold text-sm uppercase tracking-widest">{contactSettings.badge}</span>
          <h2 className="text-3xl md:text-4xl font-extrabold mt-2">{contactSettings.title}</h2>
          <p className="text-slate-400 mt-3 max-w-3xl mx-auto">
            {contactSettings.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8 flex flex-col justify-center">
            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 text-white/80 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(144,26,29,0.5)]">
                <MapPin size={20} className="transition-transform duration-300" />
              </div>
              <div>
                <div className="font-bold text-white mb-1 group-hover:text-primary-light transition-colors">Office Address</div>
                <div className="text-slate-400 text-sm leading-relaxed whitespace-pre-line group-hover:text-slate-300 transition-colors">
                  {contactSettings.address}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 text-white/80 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(144,26,29,0.5)]">
                <Phone size={20} className="transition-transform duration-300" />
              </div>
              <div>
                <div className="font-bold text-white mb-1 group-hover:text-primary-light transition-colors">Phone & Hotline</div>
                <div className="text-slate-400 text-sm space-y-1 group-hover:text-slate-300 transition-colors">
                  <div>{contactSettings.phone1}</div>
                  {contactSettings.phone2 && <div>{contactSettings.phone2}</div>}
                  {contactSettings.hotline && <div className="text-primary-light font-medium group-hover:text-white transition-colors">Hotline: {contactSettings.hotline}</div>}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 text-white/80 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(144,26,29,0.5)]">
                <Mail size={20} className="transition-transform duration-300" />
              </div>
              <div>
                <div className="font-bold text-white mb-1 group-hover:text-primary-light transition-colors">Email</div>
                <div className="text-slate-400 text-sm space-y-1 group-hover:text-slate-300 transition-colors">
                  <div>{contactSettings.email1}</div>
                  {contactSettings.email2 && <div>{contactSettings.email2}</div>}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-12 h-12 rounded-full border-2 border-white/20 text-white/80 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-primary group-hover:border-primary group-hover:text-white group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-[0_0_20px_rgba(144,26,29,0.5)]">
                <Clock size={20} className="transition-transform duration-300" />
              </div>
              <div>
                <div className="font-bold text-white mb-1 group-hover:text-primary-light transition-colors">Office Hours</div>
                <div className="text-slate-400 text-sm space-y-1 group-hover:text-slate-300 transition-colors">
                  {contactSettings.hoursSaturdayThursday && <div>{contactSettings.hoursSaturdayThursday}</div>}
                  {contactSettings.hoursFriday && <div>{contactSettings.hoursFriday}</div>}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <Send size={28} className="text-emerald-600" />
                </div>
                <h3 className="text-slate-800 font-bold text-xl mb-2">Message Sent!</h3>
                <p className="text-slate-500 text-sm">Our team will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <h3 className="text-slate-800 font-bold text-xl mb-6">Send Us a Message</h3>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="+880 XXXX-XXXXXX"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Service</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition bg-white"
                    >
                      <option value="">Select a service</option>
                      <option>Tour Package</option>
                      <option>Air Ticket</option>
                      <option>Visa Assistance</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Message</label>
                  <textarea
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={4}
                    placeholder="Tell us about your travel plans or inquiry..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition resize-none"
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 text-red-600 border border-red-200 p-4 rounded-xl flex items-start gap-3 text-sm">
                    <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {sending ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={17} />
                      Send Inquiry
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
