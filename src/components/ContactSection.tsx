import React, { useState } from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { Send, Phone, Mail, CheckCircle2 } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    }, 4000);
  };

  const whatsappUrl = `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    `Hi Content Munch Studio,\n\nI have an enquiry regarding studio booking:\nName: ${name || "Creator"}\nPhone: ${phone || "N/A"}\nMessage: ${message || "Interested in booking studio time."}`
  )}`;

  return (
    <section id="contact" className="py-28 relative bg-[#08090C] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2">
            Get In Touch
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Start Your Next Production
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Have questions about equipment, multi-day shoots, or custom sets? Send an enquiry or message our studio team directly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-10 bg-[#12151B] border border-white/10 shadow-2xl">
          {sent ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-xl text-white">
                Enquiry Received!
              </h3>
              <p className="text-xs text-slate-400">
                Our studio manager at Velachery Junction will reach out to you within 30 minutes.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E59500]"
                  />
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                    Phone Number (+91) *
                  </label>
                  <input
                    id="contact-phone"
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E59500]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  Email Address (Optional)
                </label>
                <input
                  id="contact-email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E59500]"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                  Shoot Concept / Message
                </label>
                <textarea
                  id="contact-message"
                  rows={3}
                  placeholder="Tell us what you plan to shoot (e.g. 5 podcast episodes, 15 reels, product catalog)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-[#E59500] resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="submit"
                  className="py-3.5 px-6 rounded-xl bg-[#E59500] hover:bg-[#FFA928] text-black font-extrabold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>SEND ENQUIRY</span>
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3.5 px-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-4 h-4 text-[#25D366]" />
                  <span>WHATSAPP US</span>
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
