import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ServicesSectionProps {
  onBookService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const services = [
    {
      title: "Content Shoot",
      desc: "Comprehensive studio time for YouTube videos, online course creation, and masterclasses.",
      imageUrl: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=75&w=480&auto=format&fit=crop",
      badge: "Core Studio",
    },
    {
      title: "Podcast Production",
      desc: "Turnkey multi-mic audio & video recording for interview shows and conversational podcasts.",
      imageUrl: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=75&w=480&auto=format&fit=crop",
      badge: "Podcasters",
    },
    {
      title: "Reels & Shorts Production",
      desc: "Fast-paced batch recording of 10-30 high-impact vertical videos with teleprompter in one session.",
      imageUrl: "https://images.unsplash.com/photo-1616469829941-c7200edec809?q=75&w=480&auto=format&fit=crop",
      badge: "Creators",
    },
    {
      title: "Product Photography",
      desc: "Studio lighting setups, tabletop staging, and macro optics for e-commerce, D2C and Amazon brands.",
      imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=75&w=480&auto=format&fit=crop",
      badge: "E-Commerce",
    },
    {
      title: "Personal Branding Shoots",
      desc: "Elevated executive portraits, LinkedIn banners, and keynote speaker video assets.",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=75&w=480&auto=format&fit=crop",
      badge: "Founders",
    },
    {
      title: "Baby / Family Shoots",
      desc: "Comfortable air-conditioned indoor setup with warm backdrops, sofa lounge, and family privacy.",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=75&w=480&auto=format&fit=crop",
      badge: "Lifestyle",
    },
    {
      title: "On-Location Content Production",
      desc: "Our mobile production crew travels to your clinic, office, factory, or event in Chennai.",
      imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=75&w=480&auto=format&fit=crop",
      badge: "Outdoor",
    },
    {
      title: "Post-Production Video Editing",
      desc: "Turn raw footage into viral reels with color grading, dynamic sound design, subtitles, and B-roll.",
      imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=75&w=480&auto=format&fit=crop",
      badge: "Post-Prod",
    },
    {
      title: "Social Media Content Production",
      desc: "End-to-end monthly content retainer: concept, script support, shoot day, and final deliverables.",
      imageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=75&w=480&auto=format&fit=crop",
      badge: "Full Service",
    },
  ];

  return (
    <section className="py-28 relative bg-[#0B0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2">
            End-To-End Creative Solutions
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            More Than A Studio
          </h2>
          <p className="mt-3 text-base text-slate-400">
            From single-hour studio rentals to full-scale content production & post-production across Chennai.
          </p>
        </div>

        {/* 9 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-[#12151B] border border-white/10 hover:border-[#E59500]/50 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-xl"
            >
              <div>
                <div className="relative h-44 rounded-xl overflow-hidden mb-5">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                    width="350"
                    height="176"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#12151B] via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider text-slate-300 border border-white/10">
                    {service.badge}
                  </div>
                </div>

                <h3 className="font-heading font-bold text-xl text-white group-hover:text-[#FFA928] transition-colors uppercase">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {service.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <button
                  onClick={() => onBookService(service.title)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E59500] hover:text-[#FFA928] transition-colors uppercase tracking-wider group-hover:underline cursor-pointer"
                >
                  <span>Book This Service</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
                <span className="text-[11px] text-slate-500">From ₹999/hr</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
