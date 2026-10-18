import React, { useEffect } from "react";
import { GalleryItem } from "./StudioExperience.tsx";
import { X, Sparkles } from "lucide-react";

interface LightboxModalProps {
  item: GalleryItem | null;
  onClose: () => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({ item, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (item) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full rounded-3xl overflow-hidden bg-[#12151B] border border-white/20 shadow-2xl flex flex-col"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/70 hover:bg-black text-white border border-white/20 transition-all cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Large Image Frame */}
        <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
          <img
            src={item.imageUrl}
            alt={item.title}
            className="w-full h-full max-h-[70vh] object-contain"
          />
        </div>

        {/* Caption & Metadata */}
        <div className="p-6 bg-[#12151B] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E59500] flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              {item.categoryLabel}
            </span>
            <h3 className="font-heading font-black text-xl text-white mt-1">
              {item.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-[11px] text-slate-400 block">Content Munch Studio</span>
            <span className="text-xs font-bold text-white">Velachery Junction, Chennai</span>
          </div>
        </div>
      </div>
    </div>
  );
};
