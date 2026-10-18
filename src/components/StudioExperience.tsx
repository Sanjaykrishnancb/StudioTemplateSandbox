import React, { useState } from "react";
import { Maximize2, Sparkles } from "lucide-react";

export interface GalleryItem {
  id: string;
  title: string;
  category: "all" | "themes" | "podcast" | "creator" | "amenities";
  categoryLabel: string;
  description: string;
  imageUrl: string;
  aspect: "tall" | "wide" | "square";
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Minimalist Acoustic Wall Theme",
    category: "themes",
    categoryLabel: "Studio Wall Themes",
    description: "Architectural slat wall with warm amber backlighting and acoustic dampening for crisp voiceovers.",
    imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=600&auto=format&fit=crop",
    aspect: "wide",
  },
  {
    id: "g2",
    title: "Multi-Mic Podcast Lounge Setup",
    category: "podcast",
    categoryLabel: "Podcast Setup",
    description: "Broadcast-grade podcast lounge with dual wireless mics, boom arms, and acoustically tuned ambiance.",
    imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=75&w=600&auto=format&fit=crop",
    aspect: "square",
  },
  {
    id: "g3",
    title: "5-Seater Velvet Interview Sofa",
    category: "themes",
    categoryLabel: "Sofa Setup",
    description: "Deep emerald velvet sofa with designer coffee table, mood lamps, and plants for corporate & conversational shoots.",
    imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=75&w=600&auto=format&fit=crop",
    aspect: "tall",
  },
  {
    id: "g4",
    title: "Creator Standing & YouTube Desk",
    category: "creator",
    categoryLabel: "Creator Setup",
    description: "Equipped with 250W key softbox, 16\" Digitek teleprompter, and Sony A7M4 eye-level 4K capture.",
    imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=75&w=600&auto=format&fit=crop",
    aspect: "square",
  },
  {
    id: "g5",
    title: "Full-Height Seamless Green Screen",
    category: "creator",
    categoryLabel: "Green Screen",
    description: "Non-reflective chroma key green back wall with dedicated rim lighting for effortless keying in post.",
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=75&w=600&auto=format&fit=crop",
    aspect: "wide",
  },
  {
    id: "g6",
    title: "Dynamic Softbox & RGB Lighting Rig",
    category: "creator",
    categoryLabel: "Lighting Setup",
    description: "200W + 250W Softboxes with honeycomb grids, snoot for rim highlights, and 150W RGB ambient fill.",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=75&w=600&auto=format&fit=crop",
    aspect: "square",
  },
  {
    id: "g7",
    title: "Vanity Mirror & Wardrobe Room",
    category: "amenities",
    categoryLabel: "Mirror Room",
    description: "Daylight-calibrated vanity mirror, full-length mirror, garment steamer, and private changing space.",
    imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=75&w=600&auto=format&fit=crop",
    aspect: "tall",
  },
  {
    id: "g8",
    title: "18-Foot Depth Shooting Bay",
    category: "themes",
    categoryLabel: "Shooting Areas",
    description: "Spacious throw distance for full-body fashion, multi-person panel discussions, and cinematic panning.",
    imageUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=75&w=600&auto=format&fit=crop",
    aspect: "wide",
  },
];

interface StudioExperienceProps {
  onSelectImage: (item: GalleryItem) => void;
}

export const StudioExperience: React.FC<StudioExperienceProps> = ({ onSelectImage }) => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterTabs = [
    { id: "all", label: "All Setups" },
    { id: "themes", label: "Wall Themes & Sofa" },
    { id: "podcast", label: "Podcast Setup" },
    { id: "creator", label: "Creator & Lighting" },
    { id: "amenities", label: "Mirror Room & Amenities" },
  ];

  const filteredItems =
    activeTab === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="studio" className="py-28 relative bg-[#0B0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Studio Experience
            </div>
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              Inside Content Munch
            </h2>
            <p className="mt-2 text-base sm:text-lg text-slate-400">
              One studio. Multiple possibilities.
            </p>
          </div>

          {/* Interactive filter tabs (functional buttons with segmented style) */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-xl bg-[#12151B] border border-white/10">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-[#E59500] text-black shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Modern Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectImage(item)}
              className="group relative rounded-2xl overflow-hidden bg-[#12151B] border border-white/10 hover:border-[#E59500]/50 transition-all duration-500 cursor-pointer flex flex-col justify-end min-h-[340px]"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                loading="lazy"
                decoding="async"
                width="400"
                height="340"
              />

              {/* Dark vignette gradients */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#08090C] via-[#08090C]/40 to-transparent group-hover:via-[#08090C]/20 transition-all" />

              {/* Expand icon button */}
              <div className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Card metadata (unboxed text discipline) */}
              <div className="relative p-6 z-10">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#E59500]">
                  {item.categoryLabel}
                </div>
                <h3 className="font-heading font-bold text-lg text-white mt-1 group-hover:text-[#FFA928] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note on Real Studio Images */}
        <div className="mt-12 p-4 rounded-xl border border-white/10 bg-[#12151B]/40 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <span>
            📸 All sets, lighting, backdrops and vanity mirror are ready on-site at Velachery Junction, Chennai.
          </span>
          <span className="text-[#E59500] font-semibold">
            Included in ₹999/hour rate
          </span>
        </div>

      </div>
    </section>
  );
};
