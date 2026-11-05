"use client";

import React from "react";

interface GuidingThreadConnectorProps {
  className?: string;
}

export function GuidingThreadConnector({ className = "" }: GuidingThreadConnectorProps) {
  return (
    <div
      className={`relative w-full flex flex-col items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-8 h-24 overflow-visible"
        viewBox="0 0 32 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="connectorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#722F37" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#722F37" stopOpacity="0.4" />
            <stop offset="85%" stopColor="#B7A89A" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#722F37" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Vertical subtle continuous guiding spine */}
        <line
          x1="16"
          y1="0"
          x2="16"
          y2="84"
          stroke="url(#connectorGrad)"
          strokeWidth="1.25"
          strokeDasharray="2 3"
        />

        {/* Small anchor node signaling arrival at disciplined study method */}
        <circle cx="16" cy="88" r="3.5" fill="#722F37" opacity="0.85" />
        <circle cx="16" cy="88" r="7" stroke="#722F37" strokeWidth="0.75" opacity="0.3" />
      </svg>
    </div>
  );
}
