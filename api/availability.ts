import type { IncomingMessage, ServerResponse } from "http";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Content-Type", "application/json");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const url = new URL(req.url || "", "http://localhost");
  const date = url.searchParams.get("date") || new Date().toISOString().split("T")[0];

  res.statusCode = 200;
  res.end(JSON.stringify({ date, bookings: [] }));
}
