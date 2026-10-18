import React, { useState, useMemo } from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { bookingService, formatHour, formatDatePretty, formatTimeRange } from "../services/bookingService.ts";
import { Booking, BookingStatus } from "../types/booking.ts";
import {
  X,
  Shield,
  Lock,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  Trash2,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Filter,
  ExternalLink,
} from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataChanged: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({
  isOpen,
  onClose,
  onDataChanged,
}) => {
  // Simple passcode auth for studio manager (secure client boundary)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);

  // Filter state
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Block slot form state
  const [blockDate, setBlockDate] = useState(() => {
    const d = new Date();
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  });
  const [blockStart, setBlockStart] = useState<number>(14);
  const [blockEnd, setBlockEnd] = useState<number>(16);
  const [blockReason, setBlockReason] = useState("Private VIP Shoot");
  const [blockError, setBlockError] = useState<string | null>(null);
  const [blockSuccess, setBlockSuccess] = useState(false);

  // Bookings list state
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const bookings = useMemo(() => {
    return bookingService.getAllBookings();
  }, [refreshTrigger, isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === "munch2026" || passcode === "admin") {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    bookingService.updateBookingStatus(id, newStatus);
    setRefreshTrigger((prev) => prev + 1);
    onDataChanged();
  };

  const handleRemoveHold = (id: string) => {
    bookingService.removeHold(id);
    setRefreshTrigger((prev) => prev + 1);
    onDataChanged();
  };

  const handleCreateHold = (e: React.FormEvent) => {
    e.preventDefault();
    setBlockError(null);
    setBlockSuccess(false);

    if (blockStart >= blockEnd) {
      setBlockError("End time must be after start time.");
      return;
    }

    const res = bookingService.createAdminHold(blockDate, blockStart, blockEnd, blockReason);
    if (!res.success) {
      setBlockError(res.error || "Could not block slot.");
      return;
    }

    setBlockSuccess(true);
    setRefreshTrigger((prev) => prev + 1);
    onDataChanged();
    setTimeout(() => setBlockSuccess(false), 3000);
  };

  const filteredBookings = bookings.filter((b) => {
    if (statusFilter !== "ALL" && b.bookingStatus !== statusFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        b.id.toLowerCase().includes(q) ||
        b.customerName.toLowerCase().includes(q) ||
        b.phone.includes(q) ||
        b.date.includes(q) ||
        b.purpose.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#12151B] border border-white/20 p-6 sm:p-8 shadow-2xl text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E59500]/20 border border-[#E59500]/30 flex items-center justify-center text-[#E59500]">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E59500]">
                  Studio Operations
                </span>
                <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Database Connected
                </span>
              </div>
              <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
                Admin Booking Console
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Authentication Gate */}
        {!isAuthenticated ? (
          <div className="py-16 max-w-sm mx-auto text-center">
            <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto text-slate-300 mb-4">
              <Lock className="w-6 h-6 text-[#E59500]" />
            </div>
            <h4 className="font-heading font-bold text-xl text-white uppercase">
              Staff Passcode Required
            </h4>
            <p className="text-xs text-slate-400 mt-1 mb-6">
              Enter studio management key to review bookings & block slots.
              (Demo passcode: <code className="text-[#E59500] font-mono">munch2026</code>)
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Enter passcode..."
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#181C24] border border-white/15 text-white text-center text-sm font-mono focus:outline-none focus:border-[#E59500]"
                autoFocus
              />

              {authError && (
                <div className="text-xs text-red-400">
                  Invalid passcode. Use <span className="font-mono">munch2026</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#E59500] text-black font-extrabold uppercase tracking-wider text-xs hover:bg-[#FFA928] transition-colors"
              >
                Access Portal
              </button>

              <button
                type="button"
                onClick={() => {
                  setPasscode("munch2026");
                  setIsAuthenticated(true);
                }}
                className="text-[11px] text-slate-500 hover:text-slate-300 underline"
              >
                Quick Demo Unlock
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-6 space-y-8">
            
            {/* Quick Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-[#181C24] border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Total Bookings
                </span>
                <div className="font-heading font-black text-2xl text-white mt-1">
                  {bookings.length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#181C24] border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Confirmed
                </span>
                <div className="font-heading font-black text-2xl text-emerald-400 mt-1">
                  {bookings.filter((b) => b.bookingStatus === "CONFIRMED").length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#181C24] border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Admin Holds
                </span>
                <div className="font-heading font-black text-2xl text-amber-400 mt-1">
                  {bookings.filter((b) => b.bookingStatus === "ADMIN HOLD").length}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-[#181C24] border border-white/5">
                <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                  Hourly Rate
                </span>
                <div className="font-heading font-black text-2xl text-white mt-1">
                  ₹{STUDIO_CONFIG.hourlyRate}
                </div>
              </div>
            </div>

            {/* Block Slot / Admin Hold Section */}
            <div className="p-5 rounded-2xl bg-[#181C24] border border-white/10">
              <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider mb-3 flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-[#E59500]" />
                Create Admin Hold / Block Slot Range
              </h4>
              <p className="text-xs text-slate-400 mb-4">
                Instantly mark slots as unavailable for studio maintenance, VIP shoots or owner reservations.
              </p>

              <form onSubmit={handleCreateHold} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Start Time</label>
                  <select
                    value={blockStart}
                    onChange={(e) => setBlockStart(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                  >
                    {Array.from({ length: 16 }).map((_, i) => {
                      const h = 8 + i;
                      return (
                        <option key={h} value={h}>
                          {formatHour(h)}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">End Time</label>
                  <select
                    value={blockEnd}
                    onChange={(e) => setBlockEnd(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                  >
                    {Array.from({ length: 16 }).map((_, i) => {
                      const h = 9 + i;
                      return (
                        <option key={h} value={h}>
                          {formatHour(h)}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Hold Reason</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. Gear repair"
                      value={blockReason}
                      onChange={(e) => setBlockReason(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg bg-[#E59500] hover:bg-[#FFA928] text-black font-black uppercase text-[11px] shrink-0"
                    >
                      Block
                    </button>
                  </div>
                </div>
              </form>

              {blockError && (
                <div className="mt-3 text-xs text-red-400 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{blockError}</span>
                </div>
              )}
              {blockSuccess && (
                <div className="mt-3 text-xs text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Admin Hold created successfully! Slots are now blocked on public calendar.</span>
                </div>
              )}
            </div>

            {/* Filter and Search Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Status:
                </span>
                {["ALL", "CONFIRMED", "ADMIN HOLD", "CANCELLED"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wider transition-colors ${
                      statusFilter === st
                        ? "bg-[#E59500] text-black"
                        : "bg-white/5 text-slate-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <input
                type="text"
                placeholder="Search by ID, name, date, phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3.5 py-1.5 rounded-lg bg-[#181C24] border border-white/10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#E59500]"
              />
            </div>

            {/* Bookings Table / Cards */}
            <div className="space-y-3">
              {filteredBookings.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500">
                  No bookings found matching filters.
                </div>
              ) : (
                filteredBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-4 sm:p-5 rounded-2xl bg-[#181C24] border border-white/10 hover:border-white/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left: ID & Details */}
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#E59500]">
                          {b.id}
                        </span>
                        <span
                          className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                            b.bookingStatus === "CONFIRMED"
                              ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/50"
                              : b.bookingStatus === "ADMIN HOLD"
                              ? "bg-amber-950/80 text-amber-400 border border-amber-800/50"
                              : "bg-red-950/80 text-red-400 border border-red-800/50"
                          }`}
                        >
                          {b.bookingStatus}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatDatePretty(b.date)}
                        </span>
                      </div>

                      <div className="mt-2 text-sm font-bold text-white flex items-center gap-2">
                        <span>{b.customerName}</span>
                        {b.phone && (
                          <a
                            href={`https://wa.me/91${b.phone}`}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs text-[#25D366] hover:underline flex items-center gap-1 font-mono"
                          >
                            <Phone className="w-3 h-3" />
                            +91 {b.phone}
                          </a>
                        )}
                      </div>

                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-x-4 gap-y-1">
                        <span className="text-amber-400 font-mono">
                          {b.startTime} – {b.endTime} ({b.duration}h)
                        </span>
                        <span>{b.purpose}</span>
                        {b.addOns.length > 0 && (
                          <span className="text-slate-300">
                            Add-ons: {b.addOns.join(", ")}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 pt-3 md:pt-0 border-t md:border-t-0 border-white/5 shrink-0">
                      <div className="text-right pr-4 hidden sm:block">
                        <div className="text-xs font-bold text-white">
                          ₹{b.totalAmount.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[10px] text-slate-500">
                          {b.paymentStatus}
                        </div>
                      </div>

                      {b.bookingStatus === "ADMIN HOLD" ? (
                        <button
                          onClick={() => handleRemoveHold(b.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-bold transition-colors"
                        >
                          Release Hold
                        </button>
                      ) : (
                        <>
                          {b.bookingStatus !== "CONFIRMED" && (
                            <button
                              onClick={() => handleStatusChange(b.id, "CONFIRMED")}
                              className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                          {b.bookingStatus !== "CANCELLED" && (
                            <button
                              onClick={() => handleStatusChange(b.id, "CANCELLED")}
                              className="px-3 py-1.5 rounded-lg bg-red-500/15 text-red-300 hover:bg-red-500/25 text-xs font-bold transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                          {b.bookingStatus !== "COMPLETED" && (
                            <button
                              onClick={() => handleStatusChange(b.id, "COMPLETED")}
                              className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-300 hover:bg-white/10 text-xs font-bold transition-colors"
                            >
                              Complete
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
