import React from "react";
import {
  Palette,
  Scroll,
  Maximize,
  Wind,
  Wifi,
  Armchair,
  Sofa,
  Coffee,
  RotateCw,
  Sparkles,
  Sun,
  MonitorPlay,
  Camera,
  Mic2,
  DoorClosed,
  Laptop,
} from "lucide-react";

export const StudioFeatures: React.FC = () => {
  const features = [
    { num: "01", title: "4 Studio Wall Themes", desc: "Acoustic wood slats, textured dark plaster, warm earth tone & clean industrial white.", icon: Palette },
    { num: "02", title: "3 Paper Backdrops", desc: "Seamless 9ft professional paper rolls in warm tan, slate grey, and crimson red.", icon: Scroll },
    { num: "03", title: "Green Screen", desc: "Chroma green setup for VFX, virtual backgrounds, and webinar keying.", icon: Maximize },
    { num: "04", title: "Air Conditioning", desc: "Whisper-quiet dual inverter AC to keep temperature cool without fan hum on mics.", icon: Wind },
    { num: "05", title: "High-Speed Wi-Fi", desc: "Dedicated gigabit optical fiber connection for instant 4K uploads and live streams.", icon: Wifi },
    { num: "06", title: "5-Seater Sofa", desc: "Premium plush velvet emerald sofa designed for panel interviews and casual podcasts.", icon: Sofa },
    { num: "07", title: "Single Sofas", desc: "Architectural armchairs for 1-on-1 interviews and executive personal branding.", icon: Armchair },
    { num: "08", title: "Bar Stools", desc: "Adjustable height contemporary bar stools for conversational talking-head reels.", icon: Coffee },
    { num: "09", title: "Rotating Chairs", desc: "Ergonomic executive mesh and leather chairs for tech tutorials and desk setups.", icon: RotateCw },
    { num: "10", title: "Mirror Room", desc: "Dedicated vanity dressing room with daylight bulbs, full mirror & garment steamer.", icon: Sparkles },
    { num: "11", title: "Professional Lighting", desc: "200W/250W Softboxes, honeycomb grids, RGB ambient tubes, and snoot.", icon: Sun },
    { num: "12", title: "Teleprompter", desc: "16-inch high-clarity beam-splitter teleprompter with remote speed pacing.", icon: MonitorPlay },
    { num: "13", title: "Professional Camera", desc: "Sony A7M4 4K 10-bit cinema camera with 50mm f/1.8 prime lens on-site.", icon: Camera },
    { num: "14", title: "Wireless Microphones", desc: "Dual channel Hollyland Lark noise-canceling mic system with lapel mounts.", icon: Mic2 },
    { num: "15", title: "Private Restroom", desc: "Clean, well-maintained on-site washroom for creators and crew.", icon: DoorClosed },
    { num: "16", title: "Creator Workspace", desc: "Client lounge with power strips, USB-C fast charging, and coffee station.", icon: Laptop },
  ];

  return (
    <section id="features" className="py-28 relative bg-[#0B0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2">
            Studio Amenities
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Designed For Effortless Shoots
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Every convenience curated so you can focus 100% on recording your best content.
          </p>
        </div>

        {/* 16 Numbered Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-16">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.num}
                className="group relative rounded-2xl p-6 bg-[#12151B] border border-white/10 hover:border-[#E59500]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-heading font-black text-lg text-[#E59500]/80 group-hover:text-[#E59500] transition-colors">
                      {item.num}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-[#E59500] transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-base text-white group-hover:text-[#FFA928] transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-500">
                  <span>Available on-site</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
