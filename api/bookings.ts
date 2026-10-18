import type { IncomingMessage, ServerResponse } from "http";

interface BookingItem {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  startHour: number;
  endHour: number;
  startTime: string;
  endTime: string;
  guests: number;
  purpose: string;
  addOns: string[];
  totalAmount: number;
  bookingStatus: string;
  createdAt: string;
}

const memoryBookings: BookingItem[] = [
  {
    id: "CMS-2026-1042",
    customerName: "Dr. Karthik Sundaram",
    phone: "9841234567",
    email: "karthik.health@gmail.com",
    date: new Date().toISOString().split("T")[0],
    startHour: 15,
    endHour: 17,
    startTime: "03:00 PM",
    endTime: "05:00 PM",
    guests: 2,
    purpose: "Medical Explainer Series",
    addOns: ["teleprompter-16"],
    totalAmount: 2498,
    bookingStatus: "CONFIRMED",
    createdAt: new Date().toISOString(),
  },
];

export default async function handler(req: IncomingMessage & { body?: any; query?: any }, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify({ bookings: memoryBookings }));
    return;
  }

  if (req.method === "POST") {
    let bodyStr = "";
    req.on("data", (chunk) => {
      bodyStr += chunk;
    });

    req.on("end", () => {
      try {
        const body = bodyStr ? JSON.parse(bodyStr) : req.body || {};
        const { customerName, phone, email, date, startHour, endHour, guests, purpose, addOns } = body;

        const newBooking: BookingItem = {
          id: `CMS-${Date.now().toString().slice(-4)}`,
          customerName: customerName || "Creator",
          phone: phone || "9840000000",
          email: email || "creator@example.com",
          date: date || new Date().toISOString().split("T")[0],
          startHour: Number(startHour) || 10,
          endHour: Number(endHour) || 12,
          startTime: `${startHour || 10}:00`,
          endTime: `${endHour || 12}:00`,
          guests: Number(guests) || 1,
          purpose: purpose || "Studio Shoot",
          addOns: Array.isArray(addOns) ? addOns : [],
          totalAmount: 999 * (Number(endHour || 12) - Number(startHour || 10)),
          bookingStatus: "CONFIRMED",
          createdAt: new Date().toISOString(),
        };

        memoryBookings.push(newBooking);
        res.statusCode = 201;
        res.end(JSON.stringify({ success: true, booking: newBooking }));
      } catch (e: any) {
        res.statusCode = 400;
        res.end(JSON.stringify({ error: "Invalid JSON body", details: e?.message }));
      }
    });
    return;
  }

  res.statusCode = 405;
  res.end(JSON.stringify({ error: "Method not allowed" }));
}
