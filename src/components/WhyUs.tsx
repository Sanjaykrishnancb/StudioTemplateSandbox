import React from "react";
import { Video, Layers, Users, IndianRupee } from "lucide-react";

export const WhyUs: React.FC = () => {
  const cards = [
    {
      number: "01",
      title: "READY TO SHOOT",
      description: "Professional camera, lighting and audio equipment available. Just walk in with your script and start recording immediately.",
      icon: Video,
      accent: "from-[#E59500]/20 to-transparent",
    },
    {
      number: "02",
      title: "MULTIPLE SETUPS",
      description: "Choose from multiple wall themes, backdrops and studio arrangements. Switch from talking-head to podcast desk in minutes.",
      icon: Layers,
      accent: "from-blue-500/20 to-transparent",
    },
    {
      number: "03",
      title: "CREATOR FRIENDLY",
      description: "Teleprompter, microphones, lighting and accessories available. Designed specifically for solo creators, podcasts & brands.",
      icon: Users,
      accent: "from-purple-500/20 to-transparent",
    },
    {
      number: "04",
      title: "AFFORDABLE",
      description: "Professional production environment starting at just ₹999/hour. No heavy studio buildout costs or high monthly overheads.",
      icon: IndianRupee,
      accent: "from-emerald-500/20 to-transparent",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-[#08090C] border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-3">
            Why Content Munch Studio
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight uppercase leading-tight">
            Everything You Need To Create.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            A ready-to-shoot professional studio designed for creators, brands, businesses and professionals.
          </p>
        </div>

        {/* 4 Premium Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.number}
                className="group relative rounded-2xl p-7 bg-[#12151B] border border-white/10 hover:border-[#E59500]/50 transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between overflow-hidden shadow-xl"
              >
                {/* Subtle top gradient glow on hover */}
                <div
                  className={`absolute top-0 left-0 right-0 h-32 bg-gradient-to-b ${card.accent} opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`}
                />

                <div>
                  {/* Top row: Number and Icon */}
                  <div className="flex items-center justify-between">
                    <span className="font-heading font-black text-2xl text-slate-500 group-hover:text-[#E59500] transition-colors">
                      {card.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-[#E59500] group-hover:border-[#E59500]/30 transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg text-white mt-8 tracking-wide uppercase group-hover:text-[#E59500] transition-colors">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Bottom subtle progress line */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-500">
                  <span>Content Munch Chennai</span>
                  <span className="text-[#E59500] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    Learn More →
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
