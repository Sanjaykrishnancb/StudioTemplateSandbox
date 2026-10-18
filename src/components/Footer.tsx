import React from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { Instagram, Youtube, Phone, Mail, MapPin, Sparkles, Shield } from "lucide-react";

interface FooterProps {
  onOpenPolicies: () => void;
  onOpenAdmin: () => void;
  onBookNow: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPolicies,
  onOpenAdmin,
  onBookNow,
}) => {
  return (
    <footer className="bg-[#050608] border-t border-white/10 pt-20 pb-12 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#E59500] to-[#FF6B35] flex items-center justify-center font-black text-black text-base">
                CM
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-extrabold text-white text-lg tracking-tight uppercase leading-tight">
                  CONTENT MUNCH STUDIO
                </span>
                <span className="text-[10px] tracking-[0.2em] text-[#E59500] font-semibold uppercase leading-none">
                  CHENNAI'S CREATOR SPACE
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Professional content creation, video & podcast studio in Chennai from ₹999/hour at Velachery Junction, Madipakkam. Ready to shoot with Sony A7M4, lighting, sound and acoustic backdrops.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={STUDIO_CONFIG.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#E59500]/50 hover:text-[#E59500] flex items-center justify-center text-slate-400 transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={STUDIO_CONFIG.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#E59500]/50 hover:text-[#E59500] flex items-center justify-center text-slate-400 transition-colors"
                title="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-[#E59500]/50 hover:text-[#25D366] flex items-center justify-center text-slate-400 transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white mb-4">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#studio" className="hover:text-white transition-colors">Inside The Studio</a>
              </li>
              <li>
                <a href="#equipment" className="hover:text-white transition-colors">Equipment & Gear</a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">Amenities & Features</a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-white transition-colors">Pricing & Add-Ons</a>
              </li>
              <li>
                <button
                  onClick={onBookNow}
                  className="text-[#E59500] hover:underline font-bold transition-colors cursor-pointer"
                >
                  Book Your Session →
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Contact Info (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-widest text-white mb-4">
              Chennai Location
            </h4>
            <div className="text-xs text-slate-400 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#E59500] shrink-0 mt-0.5" />
              <span>{STUDIO_CONFIG.address}</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#E59500] shrink-0" />
              <span className="font-mono">{STUDIO_CONFIG.phone}</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#E59500] shrink-0" />
              <span>{STUDIO_CONFIG.email}</span>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Studio Operations & Admin</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal / Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} {STUDIO_CONFIG.studioName}. All Rights Reserved. Velachery, Chennai.
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={onOpenPolicies}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cancellation Policy
            </button>
            <button
              onClick={onOpenPolicies}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <button
              onClick={onOpenPolicies}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
