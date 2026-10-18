import React from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { Booking } from "../types/booking.ts";
import {
  generateWhatsAppBookingUrl,
  generateGoogleCalendarUrl,
  formatDatePretty,
} from "../services/bookingService.ts";
import {
  CheckCircle2,
  Calendar,
  Clock,
  Sparkles,
  ArrowLeft,
  Share2,
  Copy,
  MapPin,
  Download,
  ExternalLink,
} from "lucide-react";

interface BookingConfirmationProps {
  booking: Booking;
  onBackToHome: () => void;
  onBookAnother: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({
  booking,
  onBackToHome,
  onBookAnother,
}) => {
  const whatsappUrl = generateWhatsAppBookingUrl(booking);
  const googleCalendarUrl = generateGoogleCalendarUrl(booking);

  // Download iCal (.ics) file
  const handleDownloadIcs = () => {
    const [year, month, day] = booking.date.split("-").map(Number);
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const startIso = `${year}${pad(month)}${pad(day)}T${pad(booking.startHour)}0000`;
    const endIso = `${year}${pad(month)}${pad(day)}T${pad(booking.endHour)}0000`;

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Content Munch Studio//Shoot Reservation//EN",
      "BEGIN:VEVENT",
      `UID:${booking.id}@contentmunchstudio.com`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
      `DTSTART:${startIso}`,
      `DTEND:${endIso}`,
      `SUMMARY:Shoot at Content Munch Studio (${booking.id})`,
      `DESCRIPTION:Session: ${booking.duration}h | Purpose: ${booking.purpose} | Contact: ${STUDIO_CONFIG.phone}`,
      `LOCATION:${STUDIO_CONFIG.address}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${booking.id}-ContentMunchStudio.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyBookingId = () => {
    navigator.clipboard.writeText(booking.id);
  };

  return (
    <section className="py-24 min-h-[90vh] flex items-center justify-center relative bg-[#08090C] px-4">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E59500]/15 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-2xl w-full mx-auto">
        <div className="rounded-3xl p-8 sm:p-12 bg-[#12151B] border-2 border-[#E59500]/50 shadow-2xl relative">
          
          {/* Animated checkmark icon */}
          <div className="w-16 h-16 rounded-2xl bg-[#E59500]/20 border border-[#E59500]/40 flex items-center justify-center mx-auto text-[#E59500] mb-6 shadow-xl shadow-[#E59500]/20">
            <CheckCircle2 className="w-8 h-8 animate-pulse" />
          </div>

          {/* Heading */}
          <div className="text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#E59500] block mb-1">
              Reservation Locked
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl font-black text-white tracking-tight uppercase">
              Your Session Request Is Confirmed
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              We have reserved your slot at Content Munch Studio, Velachery Junction, Chennai.
            </p>
          </div>

          {/* Booking Card Details */}
          <div className="mt-8 p-6 rounded-2xl bg-[#181C24] border border-white/10 space-y-4">
            
            {/* Booking ID Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Booking Reference ID
              </span>
              <button
                onClick={copyBookingId}
                className="flex items-center gap-1.5 font-mono text-sm font-bold text-[#E59500] hover:text-[#FFA928] transition-colors cursor-pointer"
                title="Click to copy ID"
              >
                <span>{booking.id}</span>
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Grid specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Customer Name</span>
                <span className="text-white font-semibold text-sm">{booking.customerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Mobile Number</span>
                <span className="text-white font-semibold font-mono text-sm">+91 {booking.phone}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Date</span>
                <span className="text-white font-semibold text-sm">{formatDatePretty(booking.date)}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Reserved Hours</span>
                <span className="text-amber-400 font-bold font-mono text-sm">{booking.startTime} – {booking.endTime}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Duration</span>
                <span className="text-white font-semibold text-sm">{booking.duration} {booking.duration === 1 ? "Hour" : "Hours"}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Attendees / Guests</span>
                <span className="text-white font-semibold text-sm">{booking.guests} People</span>
              </div>
            </div>

            {/* Add-ons if any */}
            {booking.addOns.length > 0 && (
              <div className="pt-3 border-t border-white/5 text-xs">
                <span className="text-slate-400 block text-[11px] mb-1">Selected Add-Ons:</span>
                <div className="flex flex-wrap gap-1.5">
                  {booking.addOns.map((id) => {
                    const item = STUDIO_CONFIG.addOns.find((a) => a.id === id);
                    return (
                      <span
                        key={id}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white text-[11px]"
                      >
                        {item?.name || id} (+₹{item?.price})
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Total Amount */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-white uppercase block">
                  Total Payable Amount
                </span>
                <span className="text-[10px] text-emerald-400 font-semibold">
                  Status: {booking.bookingStatus} · Pay at studio / Advance
                </span>
              </div>
              <span className="font-heading font-black text-2xl sm:text-3xl text-[#E59500]">
                ₹{booking.totalAmount.toLocaleString("en-IN")}
              </span>
            </div>

            {/* Location Reminder */}
            <div className="pt-3 border-t border-white/5 flex items-start gap-2 text-[11px] text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-[#E59500] shrink-0 mt-0.5" />
              <span>{STUDIO_CONFIG.address}</span>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            
            {/* 1. CONFIRM VIA WHATSAPP (Spec requirement) */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-black font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#25D366]/20 transition-all cursor-pointer"
            >
              <span>CONFIRM VIA WHATSAPP</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* 2. ADD TO CALENDAR (Spec requirement) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-[#E59500]" />
                <span>Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadIcs}
                className="py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#E59500]" />
                <span>Download iCal</span>
              </button>
            </div>

            {/* 3. Navigation Links */}
            <div className="pt-4 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={onBackToHome}
                className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Home</span>
              </button>

              <button
                type="button"
                onClick={onBookAnother}
                className="text-[#E59500] hover:underline font-bold transition-colors cursor-pointer"
              >
                Book Another Slot →
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
