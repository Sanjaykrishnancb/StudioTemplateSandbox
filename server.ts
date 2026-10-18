import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dbManager, DatabaseBooking } from "./src/server/db.ts";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function formatHour(hour: number): string {
  const normalized = hour % 24;
  const period = normalized >= 12 && normalized < 24 ? "PM" : "AM";
  let displayHour = normalized % 12;
  if (displayHour === 0) displayHour = 12;
  const pad = displayHour < 10 ? `0${displayHour}` : `${displayHour}`;
  return `${pad}:00 ${period}`;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({
      status: "ok",
      studio: "Content Munch Studio",
      location: "Velachery Junction, Madipakkam, Chennai",
      database: "Persistent JSON Database Active",
      stats: dbManager.getStats(),
    });
  });

  // Slot availability check endpoint
  app.get("/api/availability", (req: Request, res: Response) => {
    const { date } = req.query;
    if (!date || typeof date !== "string") {
      res.status(400).json({ error: "Date query parameter is required (YYYY-MM-DD)" });
      return;
    }
    const dayBookings = dbManager.getBookingsByDate(date);
    res.json({ date, bookings: dayBookings });
  });

  // Get all bookings (admin / sync)
  app.get("/api/bookings", (_req: Request, res: Response) => {
    const bookings = dbManager.getBookings();
    res.json({ bookings });
  });

  // Get single booking by ID
  app.get("/api/bookings/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const booking = dbManager.getBookingById(id);
    if (!booking) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.json({ booking });
  });

  // Create booking endpoint
  app.post("/api/bookings", (req: Request, res: Response) => {
    const {
      customerName,
      phone,
      email,
      date,
      startHour,
      endHour,
      guests,
      purpose,
      addOns,
      addOnsTotal,
      notes,
    } = req.body;

    if (!customerName || !phone || !email || !date || startHour === undefined || endHour === undefined) {
      res.status(400).json({ error: "Missing required booking fields (name, phone, email, date, start/end hour)" });
      return;
    }

    if (startHour >= endHour) {
      res.status(400).json({ error: "End time must be after start time" });
      return;
    }

    const duration = endHour - startHour;
    const hourlyRate = 999;
    const subtotal = duration * hourlyRate;
    const calculatedAddOnsTotal = Number(addOnsTotal) || 0;
    const totalAmount = subtotal + calculatedAddOnsTotal;

    const newBooking: DatabaseBooking = {
      id: `CMS-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: String(customerName).trim(),
      phone: String(phone).replace(/[^0-9]/g, "").slice(-10),
      email: String(email).trim(),
      date,
      startHour,
      endHour,
      startTime: formatHour(startHour),
      endTime: formatHour(endHour),
      duration,
      guests: Number(guests) || 2,
      purpose: purpose || "Content Shoot",
      addOns: Array.isArray(addOns) ? addOns : [],
      addOnsTotal: calculatedAddOnsTotal,
      hourlyRate,
      subtotal,
      totalAmount,
      paymentStatus: "PENDING",
      bookingStatus: "CONFIRMED",
      notes: notes || "",
      createdAt: new Date().toISOString(),
    };

    const result = dbManager.addBooking(newBooking);
    if (!result.success) {
      res.status(409).json({ error: result.error });
      return;
    }

    res.status(201).json({ success: true, booking: newBooking });
  });

  // Admin: Create hold / block
  app.post("/api/admin/holds", (req: Request, res: Response) => {
    const { date, startHour, endHour, reason } = req.body;
    if (!date || startHour === undefined || endHour === undefined) {
      res.status(400).json({ error: "Date and start/end hour are required" });
      return;
    }

    const holdBooking: DatabaseBooking = {
      id: `CMS-HOLD-${Date.now().toString().slice(-4)}`,
      customerName: "Admin Reserved",
      phone: "919840899988",
      email: "shoot@contentmunchstudio.com",
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

    const result = dbManager.addBooking(holdBooking);
    if (!result.success) {
      res.status(409).json({ error: result.error });
      return;
    }

    res.status(201).json({ success: true, hold: holdBooking });
  });

  // Admin: Remove hold
  app.delete("/api/admin/holds/:id", (req: Request, res: Response) => {
    const { id } = req.params;
    const success = dbManager.removeHold(id);
    if (!success) {
      res.status(404).json({ error: "Hold not found" });
      return;
    }
    res.json({ success: true, message: "Hold removed" });
  });

  // Admin: Update booking status
  app.patch("/api/bookings/:id/status", (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      res.status(400).json({ error: "Status field is required" });
      return;
    }
    const success = dbManager.updateStatus(id, status);
    if (!success) {
      res.status(404).json({ error: "Booking not found" });
      return;
    }
    res.json({ success: true, message: `Status updated to ${status}` });
  });

  // Contact form submission
  app.post("/api/contact", (req: Request, res: Response) => {
    const { name, phone, email, message } = req.body;
    if (!name || !phone) {
      res.status(400).json({ error: "Name and phone are required" });
      return;
    }

    const contact = {
      id: `CNT-${Date.now().toString().slice(-6)}`,
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: email ? String(email).trim() : undefined,
      message: String(message || "").trim(),
      createdAt: new Date().toISOString(),
    };

    dbManager.addContact(contact);
    res.status(201).json({ success: true, message: "Enquiry saved", contact });
  });

  // Admin: Stats
  app.get("/api/admin/stats", (_req: Request, res: Response) => {
    res.json(dbManager.getStats());
  });

  const PORT = Number(process.env.PORT) || 3000;

  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  } else {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Content Munch Studio running with database on port ${PORT}`);
  });
}

startServer();
