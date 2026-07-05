import { useState } from 'react';
import { MapPin, Phone, Mail, Send, Clock } from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: '', email: '', phone: '', service: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 bg-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-sky-400 font-semibold text-sm uppercase tracking-widest">Reach Us</span>
          <h2 className="text-4xl font-extrabold mt-2">Get In Touch</h2>
          <p className="text-slate-400 mt-3 max-w-lg mx-auto">
            Ready to plan your next journey? Our team is here to help with any inquiry.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="font-bold text-white mb-1">Office Address</div>
                <div className="text-slate-400 text-sm leading-relaxed">
                  4/A, Tejturi Bazar (Indira Road),<br />
                  Mahabub Plaza, 4th Floor, Room 502,<br />
                  Farmgate, Dhaka-1215, Bangladesh
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <div className="font-bold text-white mb-1">Phone & Hotline</div>
                <div className="text-slate-400 text-sm space-y-1">
                  <div>+880 1700-000001</div>
                  <div>+880 1700-000002</div>
                  <div className="text-sky-400 font-medium">Hotline: 16XXX</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail size={20} />
              </div>
              <div>
                <div className="font-bold text-white mb-1">Email</div>
                <div className="text-slate-400 text-sm space-y-1">
                  <div>info@airzoneltd.com</div>
                  <div>hajj@airzoneltd.com</div>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-sky-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock size={20} />
              </div>
              <div>
                <div className="font-bold text-white mb-1">Office Hours</div>
                <div className="text-slate-400 text-sm space-y-1">
                  <div>Saturday – Thursday: 9:00 AM – 6:00 PM</div>
                  <div>Friday: Closed</div>
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
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition"
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
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition"
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
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-600 text-xs font-semibold mb-1.5 uppercase tracking-wide">Service</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition bg-white"
                    >
                      <option value="">Select a service</option>
                      <option>Tour Package</option>
                      <option>Hajj Package</option>
                      <option>Umrah Package</option>
                      <option>Visa Assistance</option>
                      <option>Air Ticket</option>
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
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3.5 rounded-xl transition-colors duration-200 shadow-sm"
                >
                  <Send size={17} />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
