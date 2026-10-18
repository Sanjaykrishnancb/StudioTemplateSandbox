import React from "react";
import { STUDIO_CONFIG } from "../config/studio.config.ts";
import { X, ShieldCheck, Clock, RefreshCw, AlertTriangle, HardDrive, Sparkles } from "lucide-react";

interface BookingPoliciesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingPoliciesModal: React.FC<BookingPoliciesModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const { policies } = STUDIO_CONFIG;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#12151B] border border-white/15 p-6 sm:p-8 shadow-2xl text-left">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E59500]">
              Transparency & Guidelines
            </span>
            <h3 className="font-heading font-black text-2xl text-white uppercase tracking-tight">
              Studio Booking Policies
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Policies Content */}
        <div className="mt-6 space-y-6 text-xs text-slate-300">
          
          {/* Advance Payment */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#E59500]/10 border border-[#E59500]/20 flex items-center justify-center text-[#E59500] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-1">
                Advance Payment & Confirmation
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {policies.advancePayment}
              </p>
            </div>
          </div>

          {/* Cancellation */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 shrink-0 mt-0.5">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-1">
                Cancellation Policy
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {policies.cancellation}
              </p>
            </div>
          </div>

          {/* Rescheduling */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
              <RefreshCw className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-1">
                Free Rescheduling
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {policies.rescheduling}
              </p>
            </div>
          </div>

          {/* Late Arrival & Additional Hours */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0 mt-0.5">
              <Clock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-1">
                Punctuality & Extra Hours
              </h4>
              <p className="text-slate-400 leading-relaxed mb-1">
                <strong>Late Arrival:</strong> {policies.lateArrival}
              </p>
              <p className="text-slate-400 leading-relaxed">
                <strong>Overtime:</strong> {policies.additionalHours}
              </p>
            </div>
          </div>

          {/* Data & File Delivery */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-bold text-white uppercase tracking-wide text-sm mb-1">
                Data Transfer & Storage
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {policies.dataDelivery}
              </p>
            </div>
          </div>

          {/* Studio Rules */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5">
            <h4 className="font-bold text-[#E59500] uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              General Studio Etiquette:
            </h4>
            <ul className="space-y-1.5 list-disc list-inside text-slate-300">
              {policies.studioRules.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Close Button */}
        <div className="mt-8 pt-4 border-t border-white/10 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#E59500] text-black font-bold uppercase tracking-wider text-xs hover:bg-[#FFA928] transition-colors"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
