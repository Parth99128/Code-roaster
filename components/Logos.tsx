import React from "react";

export function GDGNashikBrand() {
  return (
    <a
      href="https://gdgnashik.com"
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-2.5 shrink-0"
      aria-label="GDG Nashik"
    >
      {/* Official GDG Nashik lockup — original colours preserved, never redrawn */}
      <span className="flex items-center bg-white border-2 border-ink rounded-full pl-1.5 pr-2.5 py-1 shadow-neo-sm">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/GDG_Logo.svg"
          alt="Google G logo"
          className="h-6 w-auto"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/GDG-Nashik_Logo.svg"
          alt="GDG Nashik"
          className="h-6 w-auto ml-1.5 hidden sm:block"
        />
        <span className="sm:hidden font-display text-sm font-extrabold text-ink leading-none ml-1.5">
          GDG Nashik
        </span>
      </span>
    </a>
  );
}

export function DevFestBadge() {
  return (
    <a
      href="https://devfest26.gdgnashik.com/"
      target="_blank"
      rel="noreferrer"
      className="flex items-center shrink-0 bg-white border-2 border-ink rounded-full px-2.5 py-1 shadow-neo-sm hover:bg-pale-yellow transition-colors"
      aria-label="DevFest Nashik 2026"
    >
      {/* Official DevFest Nashik 2026 artwork — original colours preserved */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/DevFest-26_Logo.svg"
        alt="DevFest Nashik 2026"
        className="h-7 w-auto"
      />
    </a>
  );
}

export function PreDevFestMark({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/assets/Pre-DevFest_Logo.svg"
      alt="Pre-DevFest workshop"
      className={className}
    />
  );
}
