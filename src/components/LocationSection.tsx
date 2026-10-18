import React, { useState } from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { MapPin, Navigation, Car, Phone, Clock, ExternalLink, Map } from "lucide-react";

export const LocationSection: React.FC = () => {
  const [showLiveMap, setShowLiveMap] = useState(false);
  return (
    <section className="py-28 relative bg-[#0B0D10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2">
            Studio Location
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
            Find Content Munch Studio
          </h2>
          <p className="mt-3 text-base text-slate-400">
            Conveniently situated at Velachery Junction & Madipakkam Main Road, easily accessible from OMR, Guindy, Airport and South Chennai.
          </p>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mt-16">
          
          {/* Left Details Card (5 cols) */}
          <div className="lg:col-span-5 rounded-3xl p-8 bg-[#12151B] border border-white/10 flex flex-col justify-between shadow-xl">
            <div className="space-y-6">
              
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#E59500]/10 border border-[#E59500]/20 flex items-center justify-center text-[#E59500] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Studio Address
                  </span>
                  <p className="text-sm font-semibold text-white leading-relaxed">
                    {STUDIO_CONFIG.address}
                  </p>
                  <p className="text-xs text-[#E59500] mt-1 font-medium">
                    {STUDIO_CONFIG.landmark}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Operating Hours
                  </span>
                  <p className="text-sm font-semibold text-white">
                    08:00 AM – 12:00 AM (Midnight)
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Open all 7 days a week, including public holidays.
                  </p>
                </div>
              </div>

              {/* Parking */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <Car className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Parking Facilities
                  </span>
                  <p className="text-sm font-semibold text-white">
                    Dedicated 2-Wheeler & 4-Wheeler Parking
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Spacious designated parking slots in front of the building + lift access to 2nd floor studio.
                  </p>
                </div>
              </div>

            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <a
                href={STUDIO_CONFIG.googleMapsUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#E59500] hover:bg-[#FFA928] text-black font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
              </a>

              <a
                href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Hi%20Content%20Munch%20Studio%2C%20I%20am%20heading%20to%20your%20Velachery%20location`}
                target="_blank"
                rel="noreferrer"
                className="py-3 px-4 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#25D366]" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* Right Map Embed Visual Card (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 bg-[#12151B] relative min-h-[380px] shadow-xl flex items-center justify-center">
            {showLiveMap ? (
              <iframe
                title="Content Munch Studio Location Map"
                src={STUDIO_CONFIG.embedMapsUrl}
                className="w-full h-full min-h-[380px] border-0 filter grayscale contrast-125 opacity-90 transition-all duration-700"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="w-full h-full min-h-[380px] flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#12151B] to-[#181C24] relative">
                {/* Decorative background grid lines */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                
                <div className="relative z-10 max-w-sm space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E59500]/15 border border-[#E59500]/30 flex items-center justify-center mx-auto text-[#E59500] shadow-lg shadow-[#E59500]/10">
                    <MapPin className="w-7 h-7" />
                  </div>

                  <div>
                    <h3 className="font-heading font-black text-xl text-white uppercase">
                      Velachery Junction Studio
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Plot No. 14, 2nd Floor, Velachery Main Road, Chennai 600091
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowLiveMap(true)}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      <Map className="w-4 h-4 text-[#E59500]" />
                      <span>Load Interactive Map</span>
                    </button>
                    <a
                      href={STUDIO_CONFIG.googleMapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E59500] hover:bg-[#FFA928] text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                    >
                      <Navigation className="w-4 h-4" />
                      <span>Open Google Maps</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {/* Map Overlay Badge */}
            <div className="absolute top-4 left-4 bg-black/85 backdrop-blur-md border border-white/15 px-4 py-2 rounded-xl text-xs text-white flex items-center gap-2.5 shadow-lg pointer-events-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E59500] animate-ping" />
              <div>
                <div className="font-heading font-bold text-xs uppercase">Content Munch Studio</div>
                <div className="text-[10px] text-slate-400">Velachery Junction, Madipakkam, Chennai</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
