/**
 * Content Munch Studio - Central Configuration
 * All business information, pricing, WhatsApp numbers, policies, and studio equipment
 * are configured here in one place.
 */

export interface StudioAddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
}

export interface StudioConfig {
  studioName: string;
  tagline: string;
  supportingTagline: string;
  address: string;
  location: string;
  landmark: string;
  googleMapsUrl: string;
  embedMapsUrl: string;
  whatsappNumber: string; // international format without +
  whatsappDisplay: string;
  phone: string;
  email: string;
  instagram: string;
  youtube: string;
  hourlyRate: number;
  currency: string;
  currencyCode: string;
  timezone: string;
  openingHour: number; // 8 (8:00 AM)
  closingHour: number; // 24 (12:00 AM midnight)
  bookingAdvanceLimitDays: number;
  addOns: StudioAddOn[];
  policies: {
    advancePayment: string;
    cancellation: string;
    rescheduling: string;
    lateArrival: string;
    additionalHours: string;
    dataDelivery: string;
    studioRules: string[];
  };
}

export const STUDIO_CONFIG: StudioConfig = {
  studioName: "Content Munch Studio",
  tagline: "Your Content. Your Studio. Your Way.",
  supportingTagline: "Professional content production space in Chennai from ₹999/hour.",
  location: "Velachery Junction, Madipakkam, Chennai",
  address: "Plot No. 14, 2nd Floor, Velachery Main Road, Near Velachery Junction, Madipakkam, Chennai, Tamil Nadu 600091",
  landmark: "Next to Velachery Flyover & Madipakkam Junction",
  googleMapsUrl: "https://maps.google.com/?q=Velachery+Junction+Madipakkam+Chennai",
  embedMapsUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15550.569584615392!2d80.2088!3d12.9754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d80918c0c97%3A0x6a2c2b04f7c2dc1b!2sVelachery%20Junction%2C%20Chennai!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  
  // Single WhatsApp constant used across entire application
  whatsappNumber: "919840899988",
  whatsappDisplay: "+91 98408 99988",
  phone: "+91 98408 99988",
  email: "shoot@contentmunchstudio.com",
  instagram: "https://instagram.com/contentmunchstudio",
  youtube: "https://youtube.com/@contentmunchstudio",

  hourlyRate: 999,
  currency: "₹",
  currencyCode: "INR",
  timezone: "Asia/Kolkata",
  
  openingHour: 8,  // 08:00 AM
  closingHour: 24, // 12:00 AM (midnight)
  bookingAdvanceLimitDays: 60,

  addOns: [
    {
      id: "teleprompter",
      name: "Digitek 16-inch Teleprompter",
      description: "Includes iPad controller, prompt app & mirror glass setup for fast script delivery",
      price: 299,
      popular: true,
    },
    {
      id: "extra_cam",
      name: "Extra Sony A7M4 4K Camera",
      description: "Multi-angle podcast / interview B-roll angle with dedicated tripod & 50mm f/1.8",
      price: 699,
      popular: true,
    },
    {
      id: "additional_lighting",
      name: "RGB 150W Light & Extra Softbox",
      description: "Additional 250W Softbox with grid + RGB background fill for dynamic scene grading",
      price: 299,
    },
    {
      id: "snoot",
      name: "Snoot / Special Effect Light",
      description: "Directional hair light / dramatic spotlight modifier with color gels",
      price: 199,
    },
    {
      id: "operator",
      name: "Dedicated Studio Assistant / Operator",
      description: "Technical sound & camera monitoring, frame framing checks, lighting tweaks during shoot",
      price: 499,
      popular: true,
    },
    {
      id: "custom_backdrop",
      name: "Dual Backdrop Color Swapping",
      description: "Seamless switch between Paper Backdrops (Warm Tan, Slate Grey, Crimson Red)",
      price: 199,
    },
  ],

  policies: {
    advancePayment: "A minimum 50% advance or full payment is required to lock in and confirm your slot. Slots are held for 15 minutes during checkout.",
    cancellation: "Cancellations made 24 hours prior to the session start receive a 100% studio credit or 90% refund. Cancellations within 24 hours are non-refundable but can be rescheduled once with a ₹300 fee.",
    rescheduling: "Free rescheduling is available up to 12 hours before your scheduled session time, subject to calendar slot availability.",
    lateArrival: "Studio booking begins strictly at the scheduled start time. Late arrivals cannot be compensated with extended time if subsequent slots are reserved.",
    additionalHours: "Overtime is billed at ₹999/hour in 30-minute increments, subject to next slot availability.",
    dataDelivery: "Please bring a high-speed SSD / USB 3.0 flash drive (recommended minimum 64GB) to transfer 4K Sony camera footage immediately after your shoot.",
    studioRules: [
      "Footwear must be removed or cleaned before stepping onto paper backdrops.",
      "Food and sugary beverages are restricted to the lounge/reception area.",
      "Studio gear is handled with technical care; our assistant is on-hand for adjustments.",
      "Maximum occupancy: 6-8 persons simultaneously inside shooting bay.",
    ],
  },
};
