import React from "react";

export function Hero() {
  return (
    <div className="text-center flex flex-col items-center gap-2.5 pt-10 pb-6 px-4">
      {/* Eyebrow — mono uppercase + Marathi accent */}
      <p className="inline-flex items-center gap-2 bg-white border-2 border-ink rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.14em] shadow-neo-sm">
        <span className="flex gap-1" aria-hidden="true">
          <span className="w-2 h-2 rounded-full bg-google-blue inline-block" />
          <span className="w-2 h-2 rounded-full bg-google-red inline-block" />
          <span className="w-2 h-2 rounded-full bg-google-green inline-block" />
        </span>
        <span>Code bol raha hai · मला वाचवा!</span>
      </p>

      <h1 className="font-display text-5xl md:text-6xl font-black tracking-tight text-ink leading-none">
        Code Roaster
      </h1>

      <p className="font-sans text-base md:text-lg font-medium text-ink">
        Paste your code. Pick your roast. Get humbled. Get the fix.
      </p>
      <p className="font-mono text-xs text-muted-ink">
        Desi debugging, powered by Gemini · DevFest Nashik 2026 side-quest
      </p>
    </div>
  );
}
