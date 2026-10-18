import React from "react";
import { Star, Quote } from "lucide-react";

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  business: string;
  comment: string;
  rating: number;
  avatar: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Aravind Swaminathan",
    role: "Orthopedic Surgeon & Health Creator",
    business: "Chennai Joint Care Channel (120k subs)",
    comment: "The 16-inch teleprompter and Sony A7M4 setup changed everything for me. I recorded 24 medical explainer reels in a single 3-hour session. Walked in with my scrubs, shot continuously, and transferred 4K footage right away. ₹999/hour is unbeatable in Chennai.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=75&w=120&auto=format&fit=crop",
  },
  {
    id: "t2",
    name: "Nithya Ramachandran",
    role: "Host & Producer",
    business: "Namma Tech & Startups Podcast",
    comment: "Content Munch Studio is hands-down the most acoustic, distraction-free space near Velachery. The dual Hollyland wireless mics and multi-cam setup gave our podcast an immediate broadcast finish. Our listeners noticed the audio upgrade immediately.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=75&w=120&auto=format&fit=crop",
  },
  {
    id: "t3",
    name: "Karthik & Sneha",
    role: "Founders",
    business: "Aura Handcrafted Chennai (D2C Brand)",
    comment: "We used both the paper backdrops and velvet sofa setup for our seasonal catalog and product launch reels. The lighting grids are perfectly calibrated so post-production color grading was almost zero. Extremely creator-friendly team!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=120&auto=format&fit=crop",
  },
];

export const Testimonials: React.FC = () => {
  return (
    <section className="py-28 relative bg-[#08090C] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2">
            Creator Stories
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Loved By Chennai's Creators
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Trusted by doctors, podcasters, D2C brands and influencers across Tamil Nadu.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="rounded-3xl p-8 bg-[#12151B] border border-white/10 hover:border-[#E59500]/40 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#E59500] mb-6">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E59500]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-xl object-cover border border-white/15"
                  loading="lazy"
                  decoding="async"
                  width="48"
                  height="48"
                />
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-[#E59500] font-medium">
                    {t.role}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {t.business}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
