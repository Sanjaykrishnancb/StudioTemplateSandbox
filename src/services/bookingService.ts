import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { Booking, BookingRequest, DayAvailability, SlotState, TimeSlot } from "../types/booking.ts";

const STORAGE_KEY = "content_munch_bookings_v1";

// Helper to format hour integer to 12-hour AM/PM label
export function formatHour(hour: number): string {
  const normalized = hour % 24;
  const period = normalized >= 12 && normalized < 24 ? "PM" : "AM";
  let displayHour = normalized % 12;
  if (displayHour === 0) displayHour = 12;
  const pad = displayHour < 10 ? `0${displayHour}` : `${displayHour}`;
  return `${pad}:00 ${period}`;
}

export function formatTimeRange(startHour: number, endHour: number): string {
  return `${formatHour(startHour)} – ${formatHour(endHour)}`;
}

export function formatDatePretty(dateStr: string): string {
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

// Generate default initial bookings for realism
function getInitialSeedBookings(): Booking[] {
  const today = new Date();
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const formatDate = (d: Date) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

  const todayStr = formatDate(today);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = formatDate(tomorrow);

  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);
  const dayAfterStr = formatDate(dayAfter);

  return [
    {
      id: "CMS-2026-1042",
      customerName: "Dr. Karthik Sundaram",
      phone: "9841234567",
      email: "karthik.health@gmail.com",
      date: todayStr,
      startHour: 15, // 3:00 PM
      endHour: 17, // 5:00 PM
      startTime: formatHour(15),
      endTime: formatHour(17),
      duration: 2,
      guests: 3,
      purpose: "Medical reels & patient education series",
      addOns: ["teleprompter"],
      addOnsTotal: 299,
      hourlyRate: STUDIO_CONFIG.hourlyRate,
      subtotal: STUDIO_CONFIG.hourlyRate * 2,
      totalAmount: STUDIO_CONFIG.hourlyRate * 2 + 299,
      paymentStatus: "PAID",
      bookingStatus: "CONFIRMED",
      notes: "Needs clean warm backdrop for clinical explainer videos.",
      createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    },
    {
      id: "CMS-2026-1043",
      customerName: "Chennai Tech Talks",
      phone: "9884567890",
      email: "host@techtalkspodcast.in",
      date: tomorrowStr,
      startHour: 10, // 10:00 AM
      endHour: 13, // 1:00 PM
      startTime: formatHour(10),
      endTime: formatHour(13),
      duration: 3,
      guests: 4,
      purpose: "Podcast Episode #42 Recording",
      addOns: ["extra_cam", "operator"],
      addOnsTotal: 699 + 499,
      hourlyRate: STUDIO_CONFIG.hourlyRate,
      subtotal: STUDIO_CONFIG.hourlyRate * 3,
      totalAmount: STUDIO_CONFIG.hourlyRate * 3 + 699 + 499,
      paymentStatus: "PAID",
      bookingStatus: "CONFIRMED",
      notes: "Two guest microphones setup, 4K multi-cam format.",
      createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    {
      id: "CMS-2026-HOLD-1",
      customerName: "Studio Maintenance & Gear Calibration",
      phone: "919840899988",
      email: "admin@contentmunchstudio.com",
      date: tomorrowStr,
      startHour: 18, // 6:00 PM
      endHour: 20, // 8:00 PM
      startTime: formatHour(18),
      endTime: formatHour(20),
      duration: 2,
      guests: 0,
      purpose: "Internal Studio Lighting Rig Calibration",
      addOns: [],
      addOnsTotal: 0,
      hourlyRate: 0,
      subtotal: 0,
      totalAmount: 0,
      paymentStatus: "PAID",
      bookingStatus: "ADMIN HOLD",
      notes: "Internal reserved slot by admin.",
      createdAt: new Date().toISOString(),
      adminNote: "Lighting rig deep maintenance",
    },
    {
      id: "CMS-2026-1044",
      customerName: "Swetha Ramanathan",
      phone: "9790123456",
      email: "swetha.fashion@gmail.com",
      date: dayAfterStr,
      startHour: 14, // 2:00 PM
      endHour: 17, // 5:00 PM
      startTime: formatHour(14),
      endTime: formatHour(17),
      duration: 3,
      guests: 2,
      purpose: "Ethnic wear brand lookbook & Instagram reels",
      addOns: ["additional_lighting", "custom_backdrop"],
      addOnsTotal: 299 + 199,
      hourlyRate: STUDIO_CONFIG.hourlyRate,
      subtotal: STUDIO_CONFIG.hourlyRate * 3,
      totalAmount: STUDIO_CONFIG.hourlyRate * 3 + 299 + 199,
      paymentStatus: "PAID",
      bookingStatus: "CONFIRMED",
      notes: "Bring two garment changes, steamer required.",
      createdAt: new Date().toISOString(),
    },
  ];
}

class BookingService {
  private bookings: Booking[] = [];
  private isSyncing = false;

  constructor() {
    this.loadFromStorage();
    this.syncWithBackendDatabase();
  }

  private loadFromStorage() {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          this.bookings = JSON.parse(stored);
          return;
        }
      }
    } catch (e) {
      console.warn("Could not read bookings from localStorage, using memory seed:", e);
    }
    this.bookings = getInitialSeedBookings();
    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.bookings));
      }
    } catch (e) {
      console.warn("Could not write bookings to localStorage:", e);
    }
  }

  /**
   * Syncs state with the server-side persistent database
   */
  public async syncWithBackendDatabase(): Promise<void> {
    if (typeof window === "undefined" || this.isSyncing) return;
    this.isSyncing = true;
    try {
      const res = await fetch("/api/bookings");
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.bookings) && data.bookings.length > 0) {
          this.bookings = data.bookings;
          this.saveToStorage();
        }
      }
    } catch (err) {
      // Backend may not be reachable in pure static preview, fallback to localStorage
    } finally {
      this.isSyncing = false;
    }
  }

  public getAllBookings(): Booking[] {
    return [...this.bookings].sort((a, b) => {
      const dateCmp = a.date.localeCompare(b.date);
      if (dateCmp !== 0) return dateCmp;
      return a.startHour - b.startHour;
    });
  }

  public getBookingById(id: string): Booking | undefined {
    return this.bookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
  }

  /**
   * Computes slot availability for a given date string (YYYY-MM-DD)
   */
  public getDayAvailability(dateStr: string): DayAvailability {
    const slots: TimeSlot[] = [];
    const open = STUDIO_CONFIG.openingHour; // 8
    const close = STUDIO_CONFIG.closingHour; // 24

    // Get active bookings for this date (excluding CANCELLED)
    const dayBookings = this.bookings.filter(
      (b) => b.date === dateStr && b.bookingStatus !== "CANCELLED"
    );

    // Check if date is today to optionally block elapsed hours
    const now = new Date();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    const todayStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
    const currentHour = now.getHours();
    const isToday = dateStr === todayStr;

    for (let h = open; h < close; h++) {
      let state: SlotState = "AVAILABLE";
      let bookingId: string | undefined;
      let bookingPurpose: string | undefined;
      let reason: string | undefined;

      // Check for past hours if today
      if (isToday && h <= currentHour) {
        state = "BLOCKED";
        reason = "Time elapsed";
      }

      // Check overlapping bookings
      const match = dayBookings.find((b) => h >= b.startHour && h < b.endHour);
      if (match) {
        if (match.bookingStatus === "ADMIN HOLD") {
          state = "BLOCKED";
          bookingId = match.id;
          bookingPurpose = match.purpose;
          reason = "Admin Hold";
        } else {
          state = "BOOKED";
          bookingId = match.id;
          bookingPurpose = match.purpose;
          reason = "Reserved";
        }
      }

      slots.push({
        hour: h,
        startTimeLabel: formatHour(h),
        endTimeLabel: formatHour(h + 1),
        state,
        bookingId,
        bookingPurpose,
        reason,
      });
    }

    const availableCount = slots.filter((s) => s.state === "AVAILABLE").length;

    return {
      date: dateStr,
      slots,
      isFullyBooked: availableCount === 0,
      availableCount,
      totalCount: slots.length,
    };
  }

  /**
   * Validate continuous multi-hour slot selection and check for conflicts
   */
  public validateSlotSelection(
    dateStr: string,
    startHour: number,
    endHour: number
  ): { valid: boolean; error?: string } {
    if (startHour >= endHour) {
      return { valid: false, error: "End time must be after start time." };
    }

    const dayAvailability = this.getDayAvailability(dateStr);
    for (let h = startHour; h < endHour; h++) {
      const slot = dayAvailability.slots.find((s) => s.hour === h);
      if (!slot) {
        return { valid: false, error: `Invalid studio operating hour: ${formatHour(h)}.` };
      }
      if (slot.state === "BOOKED") {
        return {
          valid: false,
          error: `Slot ${slot.startTimeLabel} is already booked. Please choose continuous open hours.`,
        };
      }
      if (slot.state === "BLOCKED") {
        return {
          valid: false,
          error: `Slot ${slot.startTimeLabel} is unavailable (${slot.reason || "Blocked"}). Bookings must be continuous.`,
        };
      }
    }

    return { valid: true };
  }

  /**
   * Create a new confirmed or pending booking, saving to server database
   */
  public createBooking(req: BookingRequest): { success: boolean; booking?: Booking; error?: string } {
    // 1. Validation of contact details
    if (!req.customerName?.trim()) {
      return { success: false, error: "Please provide your full name." };
    }
    const cleanPhone = req.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length < 10) {
      return { success: false, error: "Please enter a valid 10-digit Indian mobile number." };
    }
    if (!req.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.email)) {
      return { success: false, error: "Please enter a valid email address." };
    }

    // 2. Validate slot availability & continuity (Backend double-booking prevention)
    const slotCheck = this.validateSlotSelection(req.date, req.startHour, req.endHour);
    if (!slotCheck.valid) {
      return { success: false, error: slotCheck.error };
    }

    const duration = req.endHour - req.startHour;
    if (duration <= 0) {
      return { success: false, error: "Duration must be at least 1 hour." };
    }

    // Calculate financials
    const hourlyRate = STUDIO_CONFIG.hourlyRate;
    const subtotal = hourlyRate * duration;
    let addOnsTotal = 0;
    if (req.addOns && req.addOns.length > 0) {
      req.addOns.forEach((addOnId) => {
        const item = STUDIO_CONFIG.addOns.find((a) => a.id === addOnId);
        if (item) addOnsTotal += item.price;
      });
    }
    const totalAmount = subtotal + addOnsTotal;

    const randomCode = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `CMS-2026-${randomCode}`;

    const newBooking: Booking = {
      id: bookingId,
      customerName: req.customerName.trim(),
      phone: cleanPhone.slice(-10),
      email: req.email.trim(),
      date: req.date,
      startHour: req.startHour,
      endHour: req.endHour,
      startTime: formatHour(req.startHour),
      endTime: formatHour(req.endHour),
      duration,
      guests: req.guests || 2,
      purpose: req.purpose || "Content Creation",
      addOns: req.addOns || [],
      addOnsTotal,
      hourlyRate,
      subtotal,
      totalAmount,
      paymentStatus: "PENDING",
      bookingStatus: "CONFIRMED",
      notes: req.notes || "",
      createdAt: new Date().toISOString(),
    };

    // Optimistically update memory and storage
    this.bookings.push(newBooking);
    this.saveToStorage();

    // Persist to server API database asynchronously
    if (typeof window !== "undefined") {
      fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: newBooking.customerName,
          phone: newBooking.phone,
          email: newBooking.email,
          date: newBooking.date,
          startHour: newBooking.startHour,
          endHour: newBooking.endHour,
          guests: newBooking.guests,
          purpose: newBooking.purpose,
          addOns: newBooking.addOns,
          addOnsTotal: newBooking.addOnsTotal,
          notes: newBooking.notes,
        }),
      })
        .then(async (res) => {
          if (res.ok) {
            const data = await res.json();
            if (data?.booking?.id) {
              // Update with server confirmed ID
              newBooking.id = data.booking.id;
              this.saveToStorage();
            }
          }
        })
        .catch((err) => console.warn("Background API sync note:", err));
    }

    return { success: true, booking: newBooking };
  }

  /**
   * Admin: Create Hold / Block slot range
   */
  public createAdminHold(
    date: string,
    startHour: number,
    endHour: number,
    reason: string
  ): { success: boolean; error?: string } {
    const slotCheck = this.validateSlotSelection(date, startHour, endHour);
    if (!slotCheck.valid) {
      return { success: false, error: slotCheck.error };
    }

    const holdBooking: Booking = {
      id: `CMS-HOLD-${Date.now().toString().slice(-4)}`,
      customerName: "Admin Reserved",
      phone: STUDIO_CONFIG.whatsappNumber,
      email: STUDIO_CONFIG.email,
      date,
      startHour,
      endHour,
      startTime: formatHour(startHour),
      endTime: formatHour(endHour),
      duration: endHour - startHour,
      guests: 0,
      purpose: reason || "Admin Hold / Maintenance",
      addOns: [],
      addOnsTotal: 0,
      hourlyRate: 0,
      subtotal: 0,
      totalAmount: 0,
      paymentStatus: "PAID",
      bookingStatus: "ADMIN HOLD",
      notes: reason,
      adminNote: reason,
      createdAt: new Date().toISOString(),
    };

    this.bookings.push(holdBooking);
    this.saveToStorage();

    // Async server persistence
    if (typeof window !== "undefined") {
      fetch("/api/admin/holds", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, startHour, endHour, reason }),
      }).catch((e) => console.warn("Admin hold server sync note:", e));
    }

    return { success: true };
  }

  /**
   * Admin: Cancel or update status
   */
  public updateBookingStatus(
    id: string,
    status: Booking["bookingStatus"]
  ): { success: boolean; error?: string } {
    const booking = this.bookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
    if (!booking) {
      return { success: false, error: "Booking not found." };
    }
    booking.bookingStatus = status;
    this.saveToStorage();

    // Async server persistence
    if (typeof window !== "undefined") {
      fetch(`/api/bookings/${encodeURIComponent(id)}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      }).catch((e) => console.warn("Status update server sync note:", e));
    }

    return { success: true };
  }

  /**
   * Admin: Remove an admin hold
   */
  public removeHold(id: string): { success: boolean } {
    this.bookings = this.bookings.filter((b) => b.id !== id);
    this.saveToStorage();

    if (typeof window !== "undefined") {
      fetch(`/api/admin/holds/${encodeURIComponent(id)}`, {
        method: "DELETE",
      }).catch((e) => console.warn("Remove hold server sync note:", e));
    }

    return { success: true };
  }
}

export const bookingService = new BookingService();

/**
 * Generate formatted WhatsApp message URL
 */
export function generateWhatsAppBookingUrl(booking: Booking): string {
  const addOnsList =
    booking.addOns.length > 0
      ? booking.addOns
          .map((id) => STUDIO_CONFIG.addOns.find((a) => a.id === id)?.name || id)
          .join(", ")
      : "None";

  const message = [
    `Hello ${STUDIO_CONFIG.studioName},`,
    ``,
    `I would like to book a studio session.`,
    ``,
    `Booking ID: ${booking.id}`,
    `Name: ${booking.customerName}`,
    `Phone: +91 ${booking.phone}`,
    `Date: ${formatDatePretty(booking.date)}`,
    `Start Time: ${booking.startTime}`,
    `End Time: ${booking.endTime}`,
    `Duration: ${booking.duration} ${booking.duration === 1 ? "Hour" : "Hours"}`,
    `Guests: ${booking.guests}`,
    `Purpose: ${booking.purpose}`,
    `Add-ons: ${addOnsList}`,
    `Total Amount: ${STUDIO_CONFIG.currency}${booking.totalAmount.toLocaleString("en-IN")}`,
    `Notes: ${booking.notes || "None"}`,
    ``,
    `Please confirm my booking.`,
  ].join("\n");

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${STUDIO_CONFIG.whatsappNumber}?text=${encoded}`;
}

/**
 * Generate Google Calendar add event link
 */
export function generateGoogleCalendarUrl(booking: Booking): string {
  const [year, month, day] = booking.date.split("-").map(Number);
  
  const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
  const startIso = `${year}${pad(month)}${pad(day)}T${pad(booking.startHour)}0000`;
  const endIso = `${year}${pad(month)}${pad(day)}T${pad(booking.endHour)}0000`;

  const title = encodeURIComponent(`Shoot at ${STUDIO_CONFIG.studioName} (${booking.id})`);
  const details = encodeURIComponent(
    `Content Munch Studio Session\nID: ${booking.id}\nDuration: ${booking.duration} Hours\nAddress: ${STUDIO_CONFIG.address}\nContact: ${STUDIO_CONFIG.phone}`
  );
  const location = encodeURIComponent(STUDIO_CONFIG.address);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}&ctz=${STUDIO_CONFIG.timezone}`;
}
