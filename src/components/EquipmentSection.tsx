import React, { useState } from "react";
import { Camera, Sun, Mic, Sliders, Check } from "lucide-react";

interface EquipmentItem {
  id: string;
  name: string;
  subtitle: string;
  category: "camera" | "lighting" | "audio" | "accessories";
  specs: string[];
  imageUrl: string;
  included: boolean;
}

const EQUIPMENT_DATA: EquipmentItem[] = [
  // CAMERA
  {
    id: "sony-a7m4",
    name: "Sony A7M4",
    subtitle: "4K Professional Full-Frame Camera",
    category: "camera",
    specs: ["33MP Full-Frame Exmor R Sensor", "4K 60p 10-Bit 4:2:2 All-Intra Recording", "Real-time Eye AF (Human/Animal)", "S-Cinetone & S-Log3 Profiles"],
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
  {
    id: "sony-50mm",
    name: "Sony 50mm f/1.8 Prime",
    subtitle: "Portrait / Talking-Head Lens",
    category: "camera",
    specs: ["Fast f/1.8 aperture for buttery bokeh", "Sharp eye autofocus tracking", "Ideal focal length for talking-head & podcasts", "Minimal optical distortion"],
    imageUrl: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=75&w=500&auto=format&fit=crop",
    included: true,
  },

  // LIGHTING
  {
    id: "softbox-200w",
    name: "200W Softbox",
    subtitle: "Diffused Soft Key Light",
    category: "lighting",
    specs: ["High CRI 96+ color accuracy", "Quick-release octagonal softbox with grid", "Stepless 0-100% dimming", "Flicker-free high frame rate shooting"],
    imageUrl: "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
  {
    id: "softbox-250w",
    name: "250W Softbox",
    subtitle: "High-Power Key / Fill Light",
    category: "lighting",
    specs: ["250W powerful continuous COB LED", "Bowens mount system with double baffle", "Daylight balanced 5600K clean tone", "Silent cooling fan technology"],
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
  {
    id: "rgb-150w",
    name: "RGB 150W Light",
    subtitle: "Full-Spectrum 360° Color Mood Light",
    category: "lighting",
    specs: ["Full RGB 36,000 hues selection", "Built-in cinema FX (fire, party, candle, lightning)", "Dual color temperature 2800K - 10,000K", "Wireless smartphone app remote sync"],
    imageUrl: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
  {
    id: "snoot",
    name: "Snoot / Special Light",
    subtitle: "Directional Spotlight Modifier",
    category: "lighting",
    specs: ["Honeycomb grid for tight beam control", "Accentuate hair, rim & dramatic edge light", "Includes colored gel filter set", "Zero light spill onto background"],
    imageUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=75&w=500&auto=format&fit=crop",
    included: false,
  },

  // AUDIO
  {
    id: "hollyland-lark",
    name: "Hollyland Lark Mic System",
    subtitle: "Professional Wireless Microphone Setup",
    category: "audio",
    specs: ["Dual transmitter wireless mic setup", "One-click environmental noise cancellation (ENC)", "48kHz / 24-bit broadcast audio quality", "Direct digital connection into Sony A7M4"],
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=75&w=500&auto=format&fit=crop",
    included: true,
  },

  // ACCESSORIES
  {
    id: "teleprompter-16",
    name: "Digitek 16-inch Teleprompter",
    subtitle: "Large Beam-Splitter Glass Setup",
    category: "accessories",
    specs: ["Dedicated iPad pro prompter display", "Zero eye-line shift straight into lens", "Bluetooth scroll remote control", "Speeds up long scripts & video courses"],
    imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=75&w=500&auto=format&fit=crop",
    included: false,
  },
  {
    id: "heavy-tripods",
    name: "Fluid Head Video Tripods",
    subtitle: "Ultra-Stable Pro Support",
    category: "accessories",
    specs: ["Smooth 360° fluid damping pan & tilt", "Quick-release Arca-Swiss plate", "Built-in bubble level for level horizons", "Includes C-Stands & heavy sandbags"],
    imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
  {
    id: "kf-filters",
    name: "K&F CPL & Variable ND Filters",
    subtitle: "Cinematic Exposure Control",
    category: "accessories",
    specs: ["ND2 - ND400 stepless light regulation", "Shoot wide open at f/1.8 under bright studio lights", "Circular polarizer removes glass/skin reflections", "Multi-layer nano coated optical glass"],
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
  {
    id: "black-mist",
    name: "Black Mist 1/4 Filter",
    subtitle: "Cinematic Highlight Bloom",
    category: "accessories",
    specs: ["Softens harsh digital sensor sharpness", "Produces gentle glowing highlights around lights", "Flattering organic skin tone softening", "Standard for high-end beauty & music video shoots"],
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
  {
    id: "green-screen",
    name: "Chroma Green Screen Roll",
    subtitle: "Seamless VFX Background",
    category: "accessories",
    specs: ["Full-length non-wrinkle chroma green", "Even reflectance for zero key halo", "Perfect for YouTube virtual studio setups", "Wide enough for standing or seated presentations"],
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=75&w=500&auto=format&fit=crop",
    included: true,
  },
];

export const EquipmentSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<"camera" | "lighting" | "audio" | "accessories">("camera");

  const categories = [
    { id: "camera", label: "CAMERA", icon: Camera },
    { id: "lighting", label: "LIGHTING", icon: Sun },
    { id: "audio", label: "AUDIO", icon: Mic },
    { id: "accessories", label: "ACCESSORIES", icon: Sliders },
  ];

  const currentItems = EQUIPMENT_DATA.filter((item) => item.category === activeCategory);

  return (
    <section id="equipment" className="py-28 relative bg-[#08090C] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2">
              Production Gear
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Pro Gear On-Site
            </h2>
            <p className="mt-2 text-base text-slate-400">
              State-of-the-art camera, audio, lighting and glass ready for your shoot.
            </p>
          </div>

          {/* Interactive Category Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-[#12151B] border border-white/10 overflow-x-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all whitespace-nowrap cursor-pointer ${
                    activeCategory === cat.id
                      ? "bg-[#E59500] text-black shadow-lg"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Equipment Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-[#12151B] border border-white/10 hover:border-[#E59500]/50 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div>
                {/* Image Placeholder / Visual */}
                <div className="relative h-48 rounded-xl overflow-hidden bg-black/40 border border-white/5 mb-6">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="350"
                    height="192"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent" />
                  
                  {/* Status Indicator (Unboxed metadata style) */}
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-white border border-white/10 flex items-center gap-1.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${item.included ? "bg-emerald-400" : "bg-[#E59500]"}`} />
                    {item.included ? "Included in Hourly Rate" : "Optional Add-On"}
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#E59500]">
                  {item.subtitle}
                </div>
                <h3 className="font-heading font-bold text-2xl text-white mt-1 group-hover:text-[#FFA928] transition-colors">
                  {item.name}
                </h3>

                {/* Specs List */}
                <ul className="mt-4 space-y-2 border-t border-white/5 pt-4">
                  {item.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-[#E59500] shrink-0 mt-0.5" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs">
                <span className="text-slate-500">Ready on Arrival</span>
                <span className="text-white font-semibold flex items-center gap-1">
                  {item.included ? "₹0 Additional" : "Available in Add-ons"}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
