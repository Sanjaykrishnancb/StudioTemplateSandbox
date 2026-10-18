import React from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { ArrowUpRight, Camera, Film, Sparkles, MapPin, CheckCircle2 } from "lucide-react";

interface HeroProps {
  onBookNow: () => void;
  onExploreStudio: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookNow, onExploreStudio }) => {
  return (
    <section id="home" className="relative min-h-[92vh] flex flex-col justify-between pt-32 pb-16 overflow-hidden">
      {/* Cinematic Ambient Lighting Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-gradient-to-tr from-[#E59500]/15 via-[#FF6B35]/10 to-transparent blur-[140px] pointer-events-none -z-10" />
      <div className="absolute -top-32 right-10 w-96 h-96 bg-blue-500/10 blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Location & Pricing Micro-line (Unboxed metadata, zero-pill discipline) */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-400 mb-6 uppercase">
              <span className="flex items-center gap-1 text-[#E59500]">
                <MapPin className="w-3.5 h-3.5" />
                {STUDIO_CONFIG.location}
              </span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-white">Chennai's Creator Hub</span>
              <span className="text-slate-600" aria-hidden="true">·</span>
              <span className="text-emerald-400 font-bold">From ₹999/Hour</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl xl:text-[5.2rem] font-black text-white tracking-tight leading-[0.98] uppercase">
              Your Content.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#E59500] via-[#FFA928] to-[#FF8042]">
                Your Studio.
              </span>
              <span className="block">Your Way.</span>
            </h1>

            {/* Supporting Headline & Text */}
            <div className="mt-7 max-w-xl">
              <p className="text-lg sm:text-xl font-medium text-slate-200 leading-relaxed">
                {STUDIO_CONFIG.supportingTagline}
              </p>
              <p className="mt-2 text-sm sm:text-base font-semibold tracking-wide text-slate-400">
                Walk in. Set up. Shoot. Create.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <button
                onClick={onBookNow}
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-[#E59500] to-[#E59500] hover:from-[#f3a411] hover:to-[#ffa424] text-black font-black text-sm tracking-wider uppercase shadow-xl shadow-[#E59500]/30 hover:shadow-[#E59500]/50 hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>BOOK YOUR SESSION</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              <button
                onClick={onExploreStudio}
                className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 text-white font-bold text-sm tracking-wider uppercase transition-all cursor-pointer"
              >
                <span>EXPLORE THE STUDIO</span>
              </button>
            </div>

            {/* Verified Studio Guarantees */}
            <div className="mt-8 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E59500]" />
                Zero Setup Hassle
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E59500]" />
                Instant Continuous Booking
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E59500]" />
                Sony A7M4 4K Included
              </span>
            </div>
          </div>

          {/* Right Column: Cinematic Visual Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#12151B] shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=640&auto=format&fit=crop"
                srcSet="
                  https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=480&auto=format&fit=crop 480w,
                  https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=640&auto=format&fit=crop 640w,
                  https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=960&auto=format&fit=crop 960w
                "
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 550px"
                alt="Content Munch Studio interior with Sony A7M4 camera, softboxes, and modern set in Chennai"
                className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                loading="eager"
                fetchPriority="high"
                decoding="async"
                width="600"
                height="480"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/30 to-transparent" />

              {/* Live Overlay Badge */}
              <div className="absolute top-4 left-4 bg-black/75 backdrop-blur-md border border-white/15 px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>STUDIO READY TO SHOOT</span>
              </div>

              {/* Bottom Card Micro Info */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#E59500] font-semibold uppercase tracking-wider">
                    Full Studio Rental
                  </div>
                  <div className="text-white font-heading font-bold text-base mt-0.5">
                    Velachery Junction Studio
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">All-Inclusive Rate</div>
                  <div className="text-white font-bold text-lg font-heading">
                    ₹999<span className="text-xs font-normal text-slate-400">/hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle decorative glow element */}
            <div className="absolute -bottom-6 -right-6 w-36 h-36 bg-[#E59500]/20 rounded-full blur-2xl pointer-events-none" />
          </div>

        </div>
      </div>

      {/* 3 Quick USP Indicators below hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-16 pt-10 border-t border-white/10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          
          {/* USP 1 */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#12151B]/60 border border-white/10 hover:border-[#E59500]/40 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#E59500]/10 border border-[#E59500]/20 flex items-center justify-center font-heading font-black text-2xl text-[#E59500]">
              ₹999
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-white">Starting / Hour</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Affordable hourly rates for creators, doctors & brands. Zero hidden fees.
              </p>
            </div>
          </div>

          {/* USP 2 */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#12151B]/60 border border-white/10 hover:border-[#E59500]/40 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#E59500]/10 border border-[#E59500]/20 flex items-center justify-center font-heading font-black text-2xl text-[#E59500]">
              4+
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-white">Studio Themes</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Texture wall, sofa set, paper backdrops & green screen in one space.
              </p>
            </div>
          </div>

          {/* USP 3 */}
          <div className="flex items-center gap-5 p-5 rounded-2xl bg-[#12151B]/60 border border-white/10 hover:border-[#E59500]/40 transition-colors">
            <div className="w-14 h-14 rounded-xl bg-[#E59500]/10 border border-[#E59500]/20 flex items-center justify-center font-heading font-black text-2xl text-[#E59500]">
              4K
            </div>
            <div>
              <div className="font-heading font-bold text-lg text-white">Professional Camera</div>
              <p className="text-xs text-slate-400 mt-0.5">
                Sony A7M4 full-frame 10-bit cinema quality camera included on-site.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
