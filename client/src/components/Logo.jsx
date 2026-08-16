import React from "react";

export function InventraIcon({ size = 32, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for top-left cyan to blue */}
        <linearGradient id="invCyanBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="50%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        {/* Gradient for bottom-right purple to magenta */}
        <linearGradient id="invPurpleMagenta" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818cf8" />
          <stop offset="50%" stopColor="#a855f7" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>

        {/* Center core gradient */}
        <radialGradient id="invCore" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#6366f1" />
        </radialGradient>
      </defs>

      {/* Outer Diamond Rotation Group */}
      <g transform="rotate(45 60 60)">
        {/* Top Arc Blade with Nodes */}
        <path
          d="M 60 16 C 78 16 94 30 98 48 C 96 46 88 40 76 44 C 64 48 54 60 50 72 C 48 64 48 48 54 36 C 56 30 58 22 60 16 Z"
          fill="url(#invCyanBlue)"
        />
        <circle cx="86" cy="34" r="3.5" fill="#ffffff" />
        <circle cx="70" cy="24" r="3.5" fill="#ffffff" />

        {/* Bottom Arc Blade with Nodes */}
        <path
          d="M 60 104 C 42 104 26 90 22 72 C 24 74 32 80 44 76 C 56 72 66 60 70 48 C 72 56 72 72 66 84 C 64 90 62 98 60 104 Z"
          fill="url(#invPurpleMagenta)"
        />
        <circle cx="34" cy="86" r="3.5" fill="#ffffff" />
        <circle cx="50" cy="96" r="3.5" fill="#ffffff" />

        {/* Left Swept Blade */}
        <path
          d="M 16 60 C 16 42 30 26 48 22 C 46 24 40 32 44 44 C 48 56 60 66 72 70 C 64 72 48 72 36 66 C 30 64 22 62 16 60 Z"
          fill="url(#invCyanBlue)"
        />
        <circle cx="34" cy="34" r="3.5" fill="#ffffff" />

        {/* Right Swept Blade */}
        <path
          d="M 104 60 C 104 78 90 94 72 98 C 74 96 80 88 76 76 C 72 64 60 54 48 50 C 56 48 72 48 84 54 C 90 56 98 58 104 60 Z"
          fill="url(#invPurpleMagenta)"
        />
        <circle cx="86" cy="86" r="3.5" fill="#ffffff" />
      </g>

      {/* Central Iris Core */}
      <circle cx="60" cy="60" r="7" fill="url(#invCore)" />
      <circle cx="60" cy="60" r="3" fill="#ffffff" />
    </svg>
  );
}

export function InventraLogo({ size = 32, showText = true, className = "", textColor = "text-slate-900" }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center p-1 rounded-xl bg-slate-950 shadow-md">
        <InventraIcon size={size} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`text-base font-black tracking-tight font-display ${textColor}`}>
            INVENTRA
          </span>
          <span className="text-[9px] font-bold tracking-widest text-slate-400 uppercase -mt-1">
            ERP Platform
          </span>
        </div>
      )}
    </div>
  );
}

export default InventraLogo;
