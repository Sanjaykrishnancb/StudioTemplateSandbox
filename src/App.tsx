/**
 * Content Munch Studio - Main Application
 * Modern, premium creator studio website inspired by The Podly design & UX principles.
 */

import React, { useState, Suspense, lazy } from "react";
import { Navbar } from "./components/Navbar.tsx";
import { Hero } from "./components/Hero.tsx";
import { WhyUs } from "./components/WhyUs.tsx";
import { StudioFeatures } from "./components/StudioFeatures.tsx";
import { PricingSection } from "./components/PricingSection.tsx";
import { Footer } from "./components/Footer.tsx";
import { Booking } from "./types/booking.ts";
import { STUDIO_CONFIG } from "./config/studio.config.ts";
import { Sparkles } from "lucide-react";
import type { GalleryItem } from "./components/StudioExperience.tsx";

// Below-the-fold components lazy loaded to minimize initial JS download & CPU parse
const StudioExperience = lazy(() =>
  import("./components/StudioExperience.tsx").then((m) => ({ default: m.StudioExperience }))
);
const EquipmentSection = lazy(() =>
  import("./components/EquipmentSection.tsx").then((m) => ({ default: m.EquipmentSection }))
);
const ServicesSection = lazy(() =>
  import("./components/ServicesSection.tsx").then((m) => ({ default: m.ServicesSection }))
);
const BookingSystem = lazy(() =>
  import("./components/BookingSystem.tsx").then((m) => ({ default: m.BookingSystem }))
);
const Testimonials = lazy(() =>
  import("./components/Testimonials.tsx").then((m) => ({ default: m.Testimonials }))
);
const LocationSection = lazy(() =>
  import("./components/LocationSection.tsx").then((m) => ({ default: m.LocationSection }))
);
const ContactSection = lazy(() =>
  import("./components/ContactSection.tsx").then((m) => ({ default: m.ContactSection }))
);

// Modals lazy loaded on interaction
const BookingConfirmation = lazy(() =>
  import("./components/BookingConfirmation.tsx").then((m) => ({ default: m.BookingConfirmation }))
);
const BookingPoliciesModal = lazy(() =>
  import("./components/BookingPoliciesModal.tsx").then((m) => ({ default: m.BookingPoliciesModal }))
);
const AdminModal = lazy(() =>
  import("./components/AdminModal.tsx").then((m) => ({ default: m.AdminModal }))
);
const LightboxModal = lazy(() =>
  import("./components/LightboxModal.tsx").then((m) => ({ default: m.LightboxModal }))
);

// Minimal section loader skeleton that matches dark palette
const SectionLoader: React.FC<{ minHeight?: string }> = ({ minHeight = "min-h-[300px]" }) => (
  <div className={`w-full ${minHeight} flex items-center justify-center p-8 bg-[#0B0D10]`}>
    <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-[#E59500] animate-spin" />
  </div>
);

export default function App() {
  // Modal states
  const [policiesOpen, setPoliciesOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  // Active confirmed booking (when a user reserves a slot)
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);

  // Preselected service when clicking "Book This Service" in services section
  const [preselectedService, setPreselectedService] = useState<string | undefined>(undefined);

  // Key to force refresh booking slots if changed in admin
  const [dataVersion, setDataVersion] = useState(0);

  const scrollToBooking = () => {
    setActiveBooking(null);
    const elem = document.getElementById("book-now");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToStudio = () => {
    const elem = document.getElementById("studio");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleBookService = (serviceName: string) => {
    setPreselectedService(serviceName);
    scrollToBooking();
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-[#ECEFF1] flex flex-col font-sans selection:bg-[#E59500] selection:text-black">
      
      {/* Sticky Top Navbar */}
      <Navbar
        onOpenBooking={scrollToBooking}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onBookNow={scrollToBooking}
          onExploreStudio={scrollToStudio}
        />

        {/* 4 Core Pillars: Why Content Munch */}
        <WhyUs />

        {/* Inside Content Munch (Gallery & Setups) */}
        <Suspense fallback={<SectionLoader minHeight="min-h-[400px]" />}>
          <StudioExperience
            onSelectImage={(item) => setLightboxItem(item)}
          />
        </Suspense>

        {/* Interactive Equipment & Production Gear */}
        <Suspense fallback={<SectionLoader minHeight="min-h-[400px]" />}>
          <EquipmentSection />
        </Suspense>

        {/* 16 Studio Features / Amenities */}
        <StudioFeatures />

        {/* Pricing Section & Add-Ons */}
        <PricingSection
          onBookNow={scrollToBooking}
        />

        {/* More Than A Studio: 9 Creative Services */}
        <Suspense fallback={<SectionLoader minHeight="min-h-[400px]" />}>
          <ServicesSection
            onBookService={handleBookService}
          />
        </Suspense>

        {/* THE BOOKING ENGINE OR CONFIRMATION */}
        {activeBooking ? (
          <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center text-slate-500 text-xs">Loading booking details...</div>}>
            <BookingConfirmation
              booking={activeBooking}
              onBackToHome={() => {
                setActiveBooking(null);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onBookAnother={() => {
                setActiveBooking(null);
                scrollToBooking();
              }}
            />
          </Suspense>
        ) : (
          <Suspense fallback={<SectionLoader minHeight="min-h-[500px]" />}>
            <BookingSystem
              key={dataVersion}
              preselectedService={preselectedService}
              onBookingSuccess={(booking) => {
                setActiveBooking(booking);
                window.scrollTo({ top: document.getElementById("book-now")?.offsetTop || 0, behavior: "smooth" });
              }}
              onOpenPolicies={() => setPoliciesOpen(true)}
            />
          </Suspense>
        )}

        {/* Verified Creator Testimonials */}
        <Suspense fallback={<SectionLoader minHeight="min-h-[300px]" />}>
          <Testimonials />
        </Suspense>

        {/* Velachery Studio Location & Map */}
        <Suspense fallback={<SectionLoader minHeight="min-h-[350px]" />}>
          <LocationSection />
        </Suspense>

        {/* Contact & Custom Enquiries */}
        <Suspense fallback={<SectionLoader minHeight="min-h-[350px]" />}>
          <ContactSection />
        </Suspense>
      </main>

      {/* Global Footer */}
      <Footer
        onOpenPolicies={() => setPoliciesOpen(true)}
        onOpenAdmin={() => setAdminOpen(true)}
        onBookNow={scrollToBooking}
      />

      {/* Mobile Sticky Quick Booking Pill */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden z-30">
        <button
          onClick={scrollToBooking}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#E59500] to-[#FF6B35] text-black font-black text-xs uppercase tracking-wider shadow-2xl shadow-[#E59500]/40 flex items-center justify-center gap-2 border border-black/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>BOOK STUDIO SESSION · ₹{STUDIO_CONFIG.hourlyRate}/HR</span>
        </button>
      </div>

      {/* Lazy-Loaded Modals (Mounted only on user interaction) */}
      <Suspense fallback={null}>
        {policiesOpen && (
          <BookingPoliciesModal
            isOpen={policiesOpen}
            onClose={() => setPoliciesOpen(false)}
          />
        )}

        {adminOpen && (
          <AdminModal
            isOpen={adminOpen}
            onClose={() => setAdminOpen(false)}
            onDataChanged={() => setDataVersion((v) => v + 1)}
          />
        )}

        {lightboxItem && (
          <LightboxModal
            item={lightboxItem}
            onClose={() => setLightboxItem(null)}
          />
        )}
      </Suspense>

    </div>
  );
}
