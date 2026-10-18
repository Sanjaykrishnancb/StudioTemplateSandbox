import React, { useState, useEffect, useMemo } from "react";
import { STUDIO_CONFIG, StudioAddOn } from "../config/studio.config.ts";
import { bookingService, formatHour, formatTimeRange, formatDatePretty } from "../services/bookingService.ts";
import { Booking, SlotState, TimeSlot } from "../types/booking.ts";
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldAlert,
  ArrowRight,
  Users,
  FileText,
  Phone,
  Mail,
  User,
  Info,
} from "lucide-react";

interface BookingSystemProps {
  onBookingSuccess: (booking: Booking) => void;
  onOpenPolicies: () => void;
  preselectedService?: string;
}

export const BookingSystem: React.FC<BookingSystemProps> = ({
  onBookingSuccess,
  onOpenPolicies,
  preselectedService,
}) => {
  // Calendar month state
  const [currentMonthDate, setCurrentMonthDate] = useState(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  // Selected date (YYYY-MM-DD)
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const now = new Date();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
  });

  // Target duration in hours (1 to 8)
  const [targetDuration, setTargetDuration] = useState<number>(2);

  // Selected starting hour (8 to 23)
  const [startHour, setStartHour] = useState<number | null>(null);

  // Selected add-ons
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Customer form details
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState<number>(2);
  const [purpose, setPurpose] = useState(preselectedService || "Content Shoot / Reels");
  const [notes, setNotes] = useState("");

  // UI status
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Update purpose if preselected service changes
  useEffect(() => {
    if (preselectedService) {
      setPurpose(preselectedService);
    }
  }, [preselectedService]);

  // Current day availability from service
  const dayAvailability = useMemo(() => {
    return bookingService.getDayAvailability(selectedDate);
  }, [selectedDate, isSubmitting]);

  // Determine end hour based on startHour + targetDuration
  const computedEndHour = useMemo(() => {
    if (startHour === null) return null;
    return startHour + targetDuration;
  }, [startHour, targetDuration]);

  // Selected hour slots array
  const selectedHours = useMemo(() => {
    if (startHour === null || computedEndHour === null) return [];
    const hours: number[] = [];
    for (let h = startHour; h < computedEndHour; h++) {
      hours.push(h);
    }
    return hours;
  }, [startHour, computedEndHour]);

  // Validate current slot range whenever date, startHour, or targetDuration changes
  useEffect(() => {
    if (startHour !== null && computedEndHour !== null) {
      const check = bookingService.validateSlotSelection(selectedDate, startHour, computedEndHour);
      if (!check.valid) {
        setErrorMsg(check.error || "Selected slots are unavailable.");
      } else {
        setErrorMsg(null);
      }
    } else {
      setErrorMsg(null);
    }
  }, [selectedDate, startHour, computedEndHour]);

  // Auto-pick the first open continuous slot if current selection is invalid
  useEffect(() => {
    const availableSlot = dayAvailability.slots.find((s) => {
      if (s.state !== "AVAILABLE") return false;
      const testCheck = bookingService.validateSlotSelection(selectedDate, s.hour, s.hour + targetDuration);
      return testCheck.valid;
    });

    if (availableSlot) {
      setStartHour(availableSlot.hour);
    } else {
      setStartHour(null);
    }
  }, [selectedDate, targetDuration]);

  // Calendar generation helpers
  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 is Sunday

  const handlePrevMonth = () => {
    const now = new Date();
    if (year === now.getFullYear() && month <= now.getMonth()) return;
    const d = new Date(currentMonthDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentMonthDate(d);
  };

  const handleNextMonth = () => {
    const d = new Date(currentMonthDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentMonthDate(d);
  };

  // Slot click handler enforcing continuous booking logic
  const handleSlotClick = (slot: TimeSlot) => {
    if (slot.state === "BOOKED" || slot.state === "BLOCKED") {
      setErrorMsg(`Slot ${slot.startTimeLabel} is ${slot.state === "BOOKED" ? "already booked" : "unavailable"}. Please choose an open slot.`);
      return;
    }

    // Try setting as new starting hour with current target duration
    const testEnd = slot.hour + targetDuration;
    if (testEnd > STUDIO_CONFIG.closingHour) {
      setErrorMsg(`Booking cannot extend past studio closing at ${formatHour(STUDIO_CONFIG.closingHour)}.`);
      return;
    }

    const check = bookingService.validateSlotSelection(selectedDate, slot.hour, testEnd);
    if (!check.valid) {
      setErrorMsg(check.error || "Selected range contains booked or blocked hours. Bookings must be continuous.");
      return;
    }

    setStartHour(slot.hour);
    setErrorMsg(null);
  };

  // Add-on toggle
  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Pricing calculations
  const hourlyRate = STUDIO_CONFIG.hourlyRate;
  const subtotal = targetDuration * hourlyRate;
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const found = STUDIO_CONFIG.addOns.find((a) => a.id === id);
    return sum + (found ? found.price : 0);
  }, 0);
  const grandTotal = subtotal + addOnsTotal;

  // Handle final submission
  const handleSubmitBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (startHour === null || computedEndHour === null) {
      setErrorMsg("Please select an available starting time slot.");
      return;
    }

    if (!customerName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      setErrorMsg("Please enter a valid 10-digit Indian phone number.");
      return;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Execute booking service reservation with backend conflict verification
      const res = bookingService.createBooking({
        customerName: customerName.trim(),
        phone: cleanPhone,
        email: email.trim(),
        date: selectedDate,
        startHour,
        endHour: computedEndHour,
        guests,
        purpose,
        addOns: selectedAddOns,
        notes,
      });

      if (!res.success || !res.booking) {
        setErrorMsg(res.error || "Booking failed. Slot may have just been reserved.");
        setIsSubmitting(false);
        return;
      }

      setIsSubmitting(false);
      onBookingSuccess(res.booking);
    } catch (err: any) {
      setErrorMsg(err?.message || "An unexpected error occurred.");
      setIsSubmitting(false);
    }
  };

  const today = new Date();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const todayStr = `${today.getFullYear()}-${pad(today.getMonth() + 1)}-${pad(today.getDate())}`;

  return (
    <section id="book-now" className="py-24 relative bg-[#08090C] border-t border-b border-white/5">
      {/* Background ambient accents */}
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[#E59500]/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.25em] text-[#E59500] mb-2 flex items-center justify-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Live Reservation Engine
          </div>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase">
            Book Your Session
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-400">
            Choose your date, select your time and reserve the studio.
          </p>
        </div>

        {/* Main Booking Interface Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Center Area: Steps 1, 2, 3, 4 (8 cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-8">
            
            {/* STEP 1: SELECT DATE */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#12151B] border border-white/10 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#E59500]/20 flex items-center justify-center text-[#E59500] font-heading font-black text-sm">
                    01
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wide">
                      Select Date
                    </h3>
                    <p className="text-xs text-slate-400">
                      Reserve up to 60 days in advance
                    </p>
                  </div>
                </div>

                {/* Selected Date Indicator */}
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                    Selected
                  </span>
                  <div className="text-sm font-bold text-[#E59500]">
                    {formatDatePretty(selectedDate)}
                  </div>
                </div>
              </div>

              {/* Calendar Component */}
              <div className="mt-6">
                {/* Month Navigator */}
                <div className="flex items-center justify-between mb-4 px-2">
                  <div className="font-heading font-bold text-base text-white uppercase">
                    {currentMonthDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrevMonth}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Previous Month"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleNextMonth}
                      className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                      title="Next Month"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Day of Week Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500 py-2 border-b border-white/5">
                  <span>Sun</span>
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                </div>

                {/* Month Grid */}
                <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mt-3">
                  {/* Empty leading padding days */}
                  {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                    <div key={`empty-${idx}`} className="h-10 sm:h-12" />
                  ))}

                  {/* Days */}
                  {Array.from({ length: daysInMonth }).map((_, idx) => {
                    const dayNum = idx + 1;
                    const dateStr = `${year}-${pad(month + 1)}-${pad(dayNum)}`;
                    const isToday = dateStr === todayStr;
                    const isSelected = dateStr === selectedDate;
                    
                    // Past check
                    const dayDate = new Date(year, month, dayNum, 23, 59, 59);
                    const isPast = dayDate < today;

                    return (
                      <button
                        key={dateStr}
                        disabled={isPast}
                        onClick={() => {
                          setSelectedDate(dateStr);
                          setErrorMsg(null);
                        }}
                        className={`h-11 sm:h-13 rounded-xl flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                          isPast
                            ? "opacity-25 cursor-not-allowed text-slate-600 bg-transparent"
                            : isSelected
                            ? "bg-[#E59500] text-black font-extrabold shadow-lg shadow-[#E59500]/30 scale-[1.03]"
                            : isToday
                            ? "bg-white/10 text-white font-bold border border-[#E59500]/60 hover:bg-white/20"
                            : "bg-[#181C24] text-slate-300 hover:bg-white/10 hover:text-white border border-white/5"
                        }`}
                      >
                        <span className="text-xs sm:text-sm">{dayNum}</span>
                        {isToday && !isSelected && (
                          <span className="text-[8px] font-bold text-[#E59500] leading-none uppercase">
                            Today
                          </span>
                        )}
                        {!isPast && (
                          <span
                            className={`w-1 h-1 rounded-full mt-0.5 ${
                              isSelected ? "bg-black" : "bg-emerald-400"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* STEP 2: SELECT DURATION & TIME SLOTS */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#12151B] border border-white/10 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#E59500]/20 flex items-center justify-center text-[#E59500] font-heading font-black text-sm">
                    02
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wide">
                      Select Duration & Time
                    </h3>
                    <p className="text-xs text-slate-400">
                      Studio Customer Hours: 8:00 AM to 12:00 AM (Midnight)
                    </p>
                  </div>
                </div>

                {/* Duration Buttons */}
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10 overflow-x-auto">
                  {[1, 2, 3, 4, 5].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setTargetDuration(d)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        targetDuration === d
                          ? "bg-[#E59500] text-black shadow-md"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {d} {d === 1 ? "Hour" : "Hours"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Continuous Slot Notice */}
              <div className="mt-4 p-3 rounded-xl bg-black/30 border border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-[#E59500]" />
                  Continuous multi-hour booking automatically assigned based on selection.
                </span>
                <span className="text-white font-semibold hidden sm:inline">
                  {targetDuration} {targetDuration === 1 ? "Hour" : "Hours"} (₹{targetDuration * hourlyRate})
                </span>
              </div>

              {/* Slot Legend */}
              <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold text-slate-400 my-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#181C24] border border-white/20" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-[#E59500]" />
                  <span className="text-[#E59500]">Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-red-950/60 border border-red-800/40" />
                  <span>Booked</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-zinc-800/80 border border-zinc-700/60" />
                  <span>Admin Hold</span>
                </div>
              </div>

              {/* Time Slots Grid (08:00 AM to 11:00 PM starting slots) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4">
                {dayAvailability.slots.map((slot) => {
                  const isSlotSelected = selectedHours.includes(slot.hour);
                  const isBooked = slot.state === "BOOKED";
                  const isBlocked = slot.state === "BLOCKED";

                  return (
                    <button
                      key={slot.hour}
                      type="button"
                      disabled={isBooked || isBlocked}
                      onClick={() => handleSlotClick(slot)}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                        isSlotSelected
                          ? "bg-[#E59500] border-[#E59500] text-black font-extrabold shadow-lg shadow-[#E59500]/25 scale-[1.02]"
                          : isBooked
                          ? "bg-red-950/20 border-red-900/40 text-red-400/60 cursor-not-allowed line-through"
                          : isBlocked
                          ? "bg-zinc-900/50 border-white/5 text-zinc-500 cursor-not-allowed"
                          : "bg-[#181C24] border-white/10 text-slate-200 hover:border-[#E59500]/60 hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-bold font-mono">
                          {slot.startTimeLabel}
                        </span>
                        {isSlotSelected && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                        )}
                        {isBooked && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-red-400">
                            Booked
                          </span>
                        )}
                        {isBlocked && (
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-500">
                            {slot.reason === "Admin Hold" ? "Hold" : "Blocked"}
                          </span>
                        )}
                      </div>
                      <div className={`text-[10px] mt-1 ${isSlotSelected ? "text-black/80 font-medium" : "text-slate-500"}`}>
                        to {slot.endTimeLabel}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Error Notice */}
              {errorMsg && (
                <div className="mt-4 p-3.5 rounded-xl bg-red-950/40 border border-red-800/50 text-red-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* STEP 3: OPTIONAL ADD-ONS */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#12151B] border border-white/10 shadow-xl">
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#E59500]/20 flex items-center justify-center text-[#E59500] font-heading font-black text-sm">
                  03
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wide">
                    Select Add-Ons (Optional)
                  </h3>
                  <p className="text-xs text-slate-400">
                    Add specialized equipment or a dedicated studio technician
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mt-6">
                {STUDIO_CONFIG.addOns.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon.id);
                  const addonId = `addon-${addon.id}`;
                  return (
                    <label
                      key={addon.id}
                      htmlFor={addonId}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start justify-between ${
                        isChecked
                          ? "bg-[#E59500]/10 border-[#E59500] shadow-md shadow-[#E59500]/10"
                          : "bg-[#181C24] border-white/10 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          id={addonId}
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleAddOn(addon.id)}
                          aria-label={`Select ${addon.name} for ₹${addon.price}`}
                          className="mt-1 accent-[#E59500] w-4 h-4 rounded cursor-pointer"
                        />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            {addon.name}
                            {addon.popular && (
                              <span className="text-[9px] uppercase font-bold text-[#E59500]">
                                · Popular
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="text-xs font-bold text-[#E59500]">
                          +₹{addon.price}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* STEP 4: CUSTOMER DETAILS FORM */}
            <div className="rounded-3xl p-6 sm:p-8 bg-[#12151B] border border-white/10 shadow-xl">
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="w-8 h-8 rounded-xl bg-[#E59500]/20 flex items-center justify-center text-[#E59500] font-heading font-black text-sm">
                  04
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white uppercase tracking-wide">
                    Customer Details
                  </h3>
                  <p className="text-xs text-slate-400">
                    We'll send immediate booking confirmation and WhatsApp updates
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                {/* Name */}
                <div>
                  <label htmlFor="booking-name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="booking-name"
                      type="text"
                      required
                      placeholder="e.g. Vikramaditya"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#E59500] transition-colors"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="booking-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Mobile Number (India +91) *
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl bg-white/5 border border-r-0 border-white/10 text-xs text-slate-400 font-mono">
                      +91
                    </span>
                    <input
                      id="booking-phone"
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9840000000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                      className="w-full px-3 py-3 rounded-r-xl bg-[#181C24] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#E59500] font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="booking-email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#E59500] transition-colors"
                    />
                  </div>
                </div>

                {/* Number of Guests */}
                <div>
                  <label htmlFor="booking-guests" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Number of Attendees / Guests
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
                    <select
                      id="booking-guests"
                      aria-label="Number of Attendees or Guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white text-xs focus:outline-none focus:border-[#E59500] transition-colors cursor-pointer"
                    >
                      <option value={1}>1 Person (Solo Creator)</option>
                      <option value={2}>2 People (Interviewer + Guest)</option>
                      <option value={3}>3 People (Panel / Small Crew)</option>
                      <option value={4}>4 People (Multi-Host Podcast)</option>
                      <option value={5}>5-6 People (Brand / Family Shoot)</option>
                      <option value={8}>7-8 People (Max Studio Limit)</option>
                    </select>
                  </div>
                </div>

                {/* Purpose */}
                <div className="sm:col-span-2">
                  <label htmlFor="booking-purpose" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Purpose of Shoot
                  </label>
                  <input
                    id="booking-purpose"
                    type="text"
                    placeholder="e.g. YouTube Video, Instagram Reels, Medical Explainers, Podcast Episode"
                    value={purpose}
                    onChange={(e) => setPurpose(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#E59500] transition-colors"
                  />
                </div>

                {/* Notes */}
                <div className="sm:col-span-2">
                  <label htmlFor="booking-notes" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                    Notes / Special Requirements (Optional)
                  </label>
                  <textarea
                    id="booking-notes"
                    rows={2}
                    placeholder="e.g. Bringing two wardrobe changes, need teleprompter app loaded, acoustic backdrop preference..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-[#181C24] border border-white/10 text-white text-xs placeholder:text-slate-600 focus:outline-none focus:border-[#E59500] transition-colors resize-none"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Right Area: Sticky Live Booking Summary (4 cols) */}
          <div className="lg:col-span-5 xl:col-span-4 sticky top-28">
            <div className="rounded-3xl p-6 sm:p-7 bg-[#12151B] border-2 border-[#E59500]/60 shadow-2xl relative">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <span className="font-heading font-black text-sm uppercase tracking-wider text-white">
                  Booking Summary
                </span>
                <span className="text-[10px] uppercase font-bold text-[#E59500] tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Calculation
                </span>
              </div>

              {/* Breakdown List */}
              <div className="py-5 space-y-3.5 text-xs">
                
                {/* Studio */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Studio</span>
                  <span className="text-white font-semibold">Content Munch Studio</span>
                </div>

                {/* Date */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Date</span>
                  <span className="text-white font-semibold font-mono">
                    {formatDatePretty(selectedDate)}
                  </span>
                </div>

                {/* Time Range */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time</span>
                  <span className="text-amber-400 font-bold font-mono">
                    {startHour !== null && computedEndHour !== null
                      ? formatTimeRange(startHour, computedEndHour)
                      : "Select slot"}
                  </span>
                </div>

                {/* Duration */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-white font-semibold">
                    {targetDuration} {targetDuration === 1 ? "Hour" : "Hours"}
                  </span>
                </div>

                {/* Rate */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Studio Rate</span>
                  <span className="text-white font-semibold">
                    ₹{hourlyRate}/hour
                  </span>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-slate-400">Studio Rental</span>
                  <span className="text-white font-semibold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                {/* Add-ons */}
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Add-Ons ({selectedAddOns.length})</span>
                  <span className="text-white font-semibold">
                    {addOnsTotal > 0 ? `+₹${addOnsTotal.toLocaleString("en-IN")}` : "₹0"}
                  </span>
                </div>

                {/* Selected Addon names preview */}
                {selectedAddOns.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 space-y-1">
                    {selectedAddOns.map((id) => {
                      const item = STUDIO_CONFIG.addOns.find((a) => a.id === id);
                      return (
                        <div key={id} className="flex justify-between text-[11px] text-slate-400">
                          <span className="truncate pr-2">{item?.name}</span>
                          <span className="text-slate-300 font-mono">₹{item?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Total */}
                <div className="pt-4 border-t border-white/10 flex items-baseline justify-between">
                  <div>
                    <span className="font-heading font-black text-sm uppercase text-white tracking-wide block">
                      Total Amount
                    </span>
                    <span className="text-[10px] text-slate-400">
                      All taxes & gear included
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-heading font-black text-3xl text-[#E59500]">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isSubmitting || startHour === null}
                  onClick={handleSubmitBooking}
                  className={`w-full py-4 rounded-xl font-black text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer ${
                    startHour === null
                      ? "bg-slate-800 text-slate-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-[#E59500] to-[#E59500] hover:from-[#f3a411] hover:to-[#ffa424] text-black shadow-[#E59500]/30 hover:shadow-[#E59500]/50"
                  }`}
                >
                  {isSubmitting ? (
                    <span>RESERVING SESSION...</span>
                  ) : (
                    <>
                      <span>PROCEED TO BOOKING</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {/* Policy note & link */}
              <div className="mt-4 pt-3 border-t border-white/10 text-center">
                <button
                  type="button"
                  onClick={onOpenPolicies}
                  className="text-[11px] text-slate-400 hover:text-[#E59500] underline transition-colors cursor-pointer"
                >
                  View Studio Cancellation & Rescheduling Policies
                </button>
              </div>

              {/* Direct WhatsApp Concierge Help */}
              <div className="mt-4 p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                <span>Prefer booking via phone?</span>
                <a
                  href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=Hi%20Content%20Munch%20Studio%2C%20I%20want%20to%20enquire%20about%20booking%20slots`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#25D366] font-bold hover:underline flex items-center gap-1"
                >
                  <Phone className="w-3 h-3" />
                  Chat Now
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
