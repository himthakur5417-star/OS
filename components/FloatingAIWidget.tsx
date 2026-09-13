"use client";

import React from "react";
import { useModals } from "./ModalContext";
import { Bot, Phone, Sparkles } from "lucide-react";

export function FloatingAIWidget() {
  const { openAi } = useModals();

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp Quick Trigger */}
      <a
        href="https://wa.me/918969634656"
        target="_blank"
        rel="noreferrer"
        aria-label="Direct Admissions WhatsApp"
        className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all group"
        title="Direct WhatsApp Helpline (+91 8969634656)"
      >
        <Phone className="w-5 h-5 fill-current" />
      </a>

      {/* AI Assistant Floating Trigger */}
      <button
        onClick={() => openAi()}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#1A1D24] text-white border border-[#C8A84E]/50 shadow-2xl hover:bg-[#252A35] hover:border-[#C8A84E] active:scale-95 transition-all group"
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#C8A84E] animate-ping" />
        <Bot className="w-5 h-5 text-[#C8A84E] group-hover:scale-110 transition-transform" />
        <span className="font-label text-xs uppercase tracking-wider font-semibold text-zinc-200">
          Officium AI Copilot
        </span>
      </button>
    </div>
  );
}
