import React from "react";
import { APP } from "@/config/app.config";
import { PreDevFestMark } from "./Logos";

export function Footer() {
  return (
    <footer className="w-full pb-10 px-4">
      <div className="mx-auto w-full max-w-6xl bg-white border-2 border-ink rounded-[22px] shadow-neo p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PreDevFestMark className="h-9 w-auto" />
          <div className="flex flex-col">
            <span className="font-display text-sm font-extrabold text-ink">
              Built by Google Developer Groups Nashik
            </span>
            <span className="font-mono text-[11px] text-muted-ink">
              {APP.name} {APP.version} · {APP.event} · Made at GDG Nashik
              Pre-DevFest Workshop
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-wider">
          <span className="bg-cream border-2 border-ink rounded-full px-3 py-1">
            Panchavati Express approved 🚂
          </span>
          <span className="bg-mustard border-2 border-ink rounded-full px-3 py-1 shadow-neo-sm hidden sm:inline">
            Misal-powered debugging 🌶️
          </span>
        </div>
      </div>

      <p className="text-center font-mono text-[11px] text-muted-ink mt-4">
        Roast the code, never the person · Made at GDG Nashik Pre-DevFest
        Workshop · DevFest Nashik 2026
      </p>
    </footer>
  );
}
