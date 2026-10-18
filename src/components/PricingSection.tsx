import React from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { Check, Sparkles, Plus, ArrowRight, ShieldCheck } from "lucide-react";

interface PricingSectionProps {
  onBookNow: () => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onBookNow }) => {
  const includes = [
    "Full studio private access",
    "Sony A7M4 4K Cinema Camera included",
    "Professional lighting (200W/250W Softboxes + RGB)",
    "Multiple wall themes & seamless paper backdrops",
    "Hollyland wireless dual-channel audio mics",
    "Fluid-head video tripods & C-stands",
    "High-speed optical fiber Wi-Fi & whisper AC",
    "Vanity mirror room & garment steamer",
    "Basic setup guidance from studio staff",
  ];

  const addOns = STUDIO_CONFIG.addOns;

  return (
    <section id="pricing" className="py-28 relative bg-[#08090C] border-t border-b border-white/5 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E59500]/10 blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            Professional Studio.
            <span className="block text-[#E59500]">Simple Pricing.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Everything you need to shoot professional content without the heavy cost of building your own studio.
          </p>
        </div>

        {/* Pricing Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-16">
          
          {/* Main Hero Pricing Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-[#181C24] to-[#12151B] border-2 border-[#E59500]/50 shadow-2xl relative flex flex-col justify-between">
            {/* Top banner tag */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <span className="text-xs uppercase tracking-widest font-black text-[#E59500]">
                All-Inclusive Hourly Pass
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                Zero Hidden Charges
              </span>
            </div>

            <div className="my-8">
              <div className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                Starting at
              </div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-heading font-black text-6xl sm:text-7xl text-white tracking-tight">
                  ₹{STUDIO_CONFIG.hourlyRate}
                </span>
                <span className="text-xl sm:text-2xl font-bold text-slate-400">
                  /hour
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Continuous slot reservations available 8:00 AM to 12:00 AM daily.
              </p>

              {/* Checklist */}
              <div className="mt-8">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-4">
                  What's included in every session:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <div className="w-4 h-4 rounded-full bg-[#E59500]/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-[#E59500]" />
                      </div>
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom CTA & Note */}
            <div className="pt-6 border-t border-white/10">
              <button
                onClick={onBookNow}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#E59500] to-[#E59500] hover:from-[#f3a411] hover:to-[#ffa424] text-black font-black text-sm tracking-wider uppercase shadow-xl shadow-[#E59500]/30 hover:shadow-[#E59500]/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>BOOK YOUR SESSION NOW</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <p className="text-center text-[11px] text-slate-400 mt-3">
                * Final price may vary depending on duration and optional add-ons. Minimum booking: 1 hour.
              </p>
            </div>
          </div>

          {/* Optional Add-Ons Panel (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-8 bg-[#12151B] border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-heading font-bold text-xl text-white uppercase">
                  Optional Add-Ons
                </h3>
                <span className="text-[11px] font-semibold text-[#E59500]">
                  Custom Upgrades
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                Upgrade your production setup with specialized optics, teleprompter or a dedicated studio technician.
              </p>

              {/* Add-ons List */}
              <div className="space-y-3">
                {addOns.map((addon) => (
                  <div
                    key={addon.id}
                    className="p-3.5 rounded-xl bg-black/40 border border-white/5 hover:border-white/15 transition-all flex items-center justify-between"
                  >
                    <div className="pr-3">
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>{addon.name}</span>
                        {addon.popular && (
                          <span className="text-[9px] font-extrabold uppercase text-[#E59500]">
                            · Popular
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                        {addon.description}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-bold text-[#E59500]">
                        +₹{addon.price}
                      </div>
                      <div className="text-[9px] text-slate-500">per session</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 text-center">
              <p className="text-xs text-slate-400 mb-2">
                Need customized multi-day production or specific camera gear?
              </p>
              <a
                href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Hi%20Content%20Munch%20Studio%2C%20I%20have%20an%20enquiry%20regarding%20custom%20add-ons`}
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#E59500] hover:underline inline-flex items-center gap-1"
              >
                Contact us for custom add-on pricing →
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
