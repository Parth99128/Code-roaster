import React from "react";
import { GDGNashikBrand, DevFestBadge } from "./Logos";
import { APP } from "@/config/app.config";

export function TopBar() {
  return (
    <header className="w-full pt-4 px-4 sticky top-0 z-50 select-none">
      <nav className="rounded-full border-2 border-ink bg-white/95 backdrop-blur-md mx-auto w-full max-w-6xl shadow-neo transition-all">
        <div className="flex justify-between items-center px-4 md:px-6 py-2.5">
          {/* Left: Official GDG Nashik Branding */}
          <GDGNashikBrand />

          {/* Center: Title / Wordmark */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="font-display text-sm font-extrabold tracking-tight px-3 py-1 bg-mustard border-2 border-ink rounded-full shadow-neo-sm">
              {APP.name.toUpperCase()} {APP.version}
            </span>
            <span className="font-mono text-[10px] text-muted-ink uppercase tracking-wider font-semibold">
              · Desi Debugger
            </span>
          </div>

          {/* Right: DevFest Badge */}
          <div className="flex items-center gap-3">
            <DevFestBadge />
          </div>
        </div>
      </nav>
    </header>
  );
}
