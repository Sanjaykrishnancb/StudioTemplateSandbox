import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_DIR = path.resolve(__dirname, "../../data");
const DB_PATH = path.join(DB_DIR, "content_munch_db.json");

export interface DatabaseBooking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD
  startHour: number; // 8 to 23
  endHour: number; // 9 to 24
  startTime: string; // "05:00 PM"
  endTime: string; // "08:00 PM"
  duration: number; // hours
  guests: number;
  purpose: string;
  addOns: string[];
  addOnsTotal: number;
  hourlyRate: number;
  subtotal: number;
  totalAmount: number;
  paymentStatus: "PENDING" | "PAID" | "REFUNDED";
  bookingStatus: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED" | "ADMIN HOLD";
  notes?: string;
  createdAt: string;
  adminNote?: string;
}

export interface DatabaseContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  createdAt: string;
}

export interface StudioDatabase {
  bookings: DatabaseBooking[];
  contacts: DatabaseContact[];
  lastUpdated: string;
}

// Generate realistic initial bookings seed
function generateSeedBookings(): DatabaseBooking[] {
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
      startHour: 15,
      endHour: 17,
      startTime: "03:00 PM",
      endTime: "05:00 PM",
      duration: 2,
      guests: 3,
      purpose: "Medical reels & patient education series",
      addOns: ["teleprompter"],
      addOnsTotal: 299,
      hourlyRate: 999,
      subtotal: 1998,
      totalAmount: 2297,
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
      startHour: 10,
      endHour: 13,
      startTime: "10:00 AM",
      endTime: "01:00 PM",
      duration: 3,
      guests: 4,
      purpose: "Podcast Episode #42 Recording",
      addOns: ["extra_cam", "operator"],
      addOnsTotal: 1198,
      hourlyRate: 999,
      subtotal: 2997,
      totalAmount: 4195,
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
      startHour: 18,
      endHour: 20,
      startTime: "06:00 PM",
      endTime: "08:00 PM",
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
      startHour: 14,
      endHour: 17,
      startTime: "02:00 PM",
      endTime: "05:00 PM",
      duration: 3,
      guests: 2,
      purpose: "Ethnic wear brand lookbook & Instagram reels",
      addOns: ["additional_lighting", "custom_backdrop"],
      addOnsTotal: 498,
      hourlyRate: 999,
      subtotal: 2997,
      totalAmount: 3495,
      paymentStatus: "PAID",
      bookingStatus: "CONFIRMED",
      notes: "Bring two garment changes, steamer required.",
      createdAt: new Date().toISOString(),
    },
  ];
}

class DatabaseManager {
  private data: StudioDatabase;

  constructor() {
    this.ensureDirectory();
    this.data = this.readFromDisk();
  }

  private ensureDirectory() {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
  }

  private readFromDisk(): StudioDatabase {
    try {
      if (fs.existsSync(DB_PATH)) {
        const raw = fs.readFileSync(DB_PATH, "utf-8");
        return JSON.parse(raw);
      }
    } catch (e) {
      console.error("Failed to read database from disk, re-initializing:", e);
    }

    const initial: StudioDatabase = {
      bookings: generateSeedBookings(),
      contacts: [],
      lastUpdated: new Date().toISOString(),
    };
    this.writeToDisk(initial);
    return initial;
  }

  private writeToDisk(data: StudioDatabase) {
    try {
      this.ensureDirectory();
      data.lastUpdated = new Date().toISOString();
      const tmpPath = `${DB_PATH}.tmp`;
      fs.writeFileSync(tmpPath, JSON.stringify(data, null, 2), "utf-8");
      fs.renameSync(tmpPath, DB_PATH);
    } catch (e) {
      console.error("Failed to write database to disk:", e);
    }
  }

  public getBookings(): DatabaseBooking[] {
    return [...this.data.bookings];
  }

  public getBookingById(id: string): DatabaseBooking | undefined {
    return this.data.bookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
  }

  public getBookingsByDate(dateStr: string): DatabaseBooking[] {
    return this.data.bookings.filter(
      (b) => b.date === dateStr && b.bookingStatus !== "CANCELLED"
    );
  }

  public addBooking(booking: DatabaseBooking): { success: boolean; error?: string } {
    // Conflict verification
    const hasConflict = this.data.bookings.some(
      (b) =>
        b.date === booking.date &&
        b.bookingStatus !== "CANCELLED" &&
        !(booking.endHour <= b.startHour || booking.startHour >= b.endHour)
    );

    if (hasConflict) {
      return { success: false, error: "Requested time slot conflicts with an existing booking." };
    }

    this.data.bookings.push(booking);
    this.writeToDisk(this.data);
    return { success: true };
  }

  public updateStatus(id: string, status: DatabaseBooking["bookingStatus"]): boolean {
    const booking = this.data.bookings.find((b) => b.id.toLowerCase() === id.toLowerCase());
    if (!booking) return false;
    booking.bookingStatus = status;
    this.writeToDisk(this.data);
    return true;
  }

  public removeHold(id: string): boolean {
    const initialLen = this.data.bookings.length;
    this.data.bookings = this.data.bookings.filter((b) => b.id !== id);
    if (this.data.bookings.length !== initialLen) {
      this.writeToDisk(this.data);
      return true;
    }
    return false;
  }

  public addContact(contact: DatabaseContact) {
    this.data.contacts.push(contact);
    this.writeToDisk(this.data);
  }

  public getContacts(): DatabaseContact[] {
    return [...this.data.contacts];
  }

  public getStats() {
    const confirmed = this.data.bookings.filter((b) => b.bookingStatus === "CONFIRMED");
    const totalRevenue = confirmed.reduce((acc, b) => acc + b.totalAmount, 0);
    const totalHours = confirmed.reduce((acc, b) => acc + b.duration, 0);
    const totalHolds = this.data.bookings.filter((b) => b.bookingStatus === "ADMIN HOLD").length;

    return {
      totalBookings: this.data.bookings.length,
      confirmedBookings: confirmed.length,
      adminHolds: totalHolds,
      totalHoursBooked: totalHours,
      totalRevenue,
      lastUpdated: this.data.lastUpdated,
    };
  }
}

export const dbManager = new DatabaseManager();
