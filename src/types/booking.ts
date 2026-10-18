/**
 * Booking Data Models and Types
 */

export type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED" | "ADMIN HOLD";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED";

export type SlotState = "AVAILABLE" | "SELECTED" | "BOOKED" | "BLOCKED";

export interface Booking {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD
  startHour: number; // 8 to 23
  endHour: number; // 9 to 24
  startTime: string; // "05:00 PM"
  endTime: string; // "08:00 PM"
  duration: number; // in hours
  guests: number;
  purpose: string;
  addOns: string[]; // addon IDs
  addOnsTotal: number;
  hourlyRate: number;
  subtotal: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  notes?: string;
  createdAt: string;
  adminNote?: string;
}

export interface TimeSlot {
  hour: number; // 8 to 23
  startTimeLabel: string; // "08:00 AM"
  endTimeLabel: string; // "09:00 AM"
  state: SlotState;
  bookingId?: string;
  bookingPurpose?: string;
  reason?: string;
}

export interface DayAvailability {
  date: string; // YYYY-MM-DD
  slots: TimeSlot[];
  isFullyBooked: boolean;
  availableCount: number;
  totalCount: number;
}

export interface BookingRequest {
  customerName: string;
  phone: string;
  email: string;
  date: string; // YYYY-MM-DD
  startHour: number;
  endHour: number;
  guests: number;
  purpose: string;
  addOns: string[];
  notes?: string;
}
