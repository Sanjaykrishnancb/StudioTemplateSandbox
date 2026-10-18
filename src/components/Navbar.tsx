import React, { useState, useEffect } from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { Menu, X, Shield, Phone, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenAdmin }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Studio", href: "#studio" },
    { label: "Equipment", href: "#equipment" },
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-3 bg-[#0B0D10]/95 backdrop-blur-md border-b border-white/10 shadow-2xl"
            : "py-5 bg-gradient-to-b from-[#0B0D10]/90 via-[#0B0D10]/40 to-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none"
            onClick={(e) => handleLinkClick(e, "#home")}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#E59500] to-[#FF6B35] flex items-center justify-center font-black text-black text-lg tracking-wider shadow-lg shadow-[#E59500]/20 group-hover:scale-105 transition-transform">
              CM
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading font-extrabold tracking-tight text-white text-base sm:text-lg uppercase leading-tight group-hover:text-[#E59500] transition-colors">
                CONTENT MUNCH
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#E59500] font-semibold uppercase leading-none">
                STUDIO · CHENNAI
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase font-semibold tracking-wider text-slate-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-[2px] after:bg-[#E59500] after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenAdmin}
              title="Studio Admin Portal"
              aria-label="Studio Admin Portal"
              className="p-2 text-slate-400 hover:text-amber-400 rounded-lg hover:bg-white/5 transition-all text-xs flex items-center gap-1.5"
            >
              <Shield className="w-4 h-4" />
              <span className="hidden xl:inline text-[11px] font-medium tracking-wider">ADMIN</span>
            </button>

            <a
              href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="p-2.5 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              title="WhatsApp Concierge"
            >
              <Phone className="w-4 h-4 text-[#25D366]" />
            </a>

            <button
              onClick={onOpenBooking}
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#E59500] to-[#E59500] hover:from-[#f3a411] hover:to-[#ffa424] text-black font-extrabold text-xs tracking-wider uppercase shadow-lg shadow-[#E59500]/25 hover:shadow-[#E59500]/40 hover:-translate-y-0.5 transition-all active:translate-y-0"
            >
              <Sparkles className="w-3.5 h-3.5 animate-pulse" />
              <span>BOOK YOUR SESSION</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="px-3 py-1.5 rounded-lg bg-[#E59500] text-black font-black text-[11px] tracking-wider uppercase"
            >
              BOOK
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-[#0B0D10]/98 backdrop-blur-xl pt-24 px-6 flex flex-col justify-between pb-10 animate-in fade-in duration-200">
          <div className="flex flex-col gap-4">
            <div className="text-[11px] tracking-[0.2em] font-semibold text-slate-500 uppercase pb-2 border-b border-white/10">
              Navigation
            </div>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xl font-heading font-bold text-slate-200 hover:text-[#E59500] transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E59500] to-[#FF6B35] text-black font-black text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-xl shadow-[#E59500]/25"
            >
              <Sparkles className="w-4 h-4" />
              BOOK YOUR SESSION · ₹999/HR
            </button>

            <div className="flex items-center justify-between gap-3">
              <a
                href={`https://wa.me/${STUDIO_CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 py-3 rounded-xl border border-white/10 bg-white/5 text-center text-xs font-semibold text-slate-200 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                WhatsApp Studio
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <Shield className="w-3.5 h-3.5" />
                Admin
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
