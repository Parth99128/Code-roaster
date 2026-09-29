import React from "react";
import { LANGUAGES, PERSONAS, ROAST_LEVELS } from "@/config/app.config";
import type { LanguageId, PersonaId, RoastLevel } from "@/types/roast";

interface RoastControlsProps {
  roastLevel: RoastLevel;
  onRoastLevelChange: (level: RoastLevel) => void;
  language: LanguageId;
  onLanguageChange: (lang: LanguageId) => void;
  persona: PersonaId;
  onPersonaChange: (p: PersonaId) => void;
  onRoast: () => void;
  isRoasting: boolean;
  errorDrawerOpen: boolean;
  onToggleErrorDrawer: () => void;
}

export function RoastControls({
  roastLevel,
  onRoastLevelChange,
  language,
  onLanguageChange,
  persona,
  onPersonaChange,
  onRoast,
  isRoasting,
  errorDrawerOpen,
  onToggleErrorDrawer,
}: RoastControlsProps) {
  return (
    <div className="w-full flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-3 bg-cream border-b-2 border-ink">
      {/* Left controls */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Roast Level Segmented Control */}
        <div className="flex items-center p-1 bg-white border-2 border-ink rounded-full shadow-neo-sm">
          {ROAST_LEVELS.map((lvl) => {
            const isActive = roastLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                type="button"
                onClick={() => onRoastLevelChange(lvl.id)}
                title={lvl.description}
                className={`px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider font-bold transition-all ${
                  isActive
                    ? "bg-mustard text-ink border-2 border-ink shadow-[1px_1px_0_#141414]"
                    : "text-muted-ink hover:text-ink"
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>

        {/* Persona Selector Dropdown */}
        <div className="relative">
          <select
            value={persona}
            onChange={(e) => onPersonaChange(e.target.value as PersonaId)}
            className="appearance-none bg-white border-2 border-ink rounded-full px-3.5 py-1.5 pr-8 font-mono text-xs uppercase font-bold text-ink shadow-neo-sm outline-none cursor-pointer hover:bg-cream transition-colors"
          >
            {PERSONAS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-xs">
            ▼
          </span>
        </div>

        {/* Language Selector Dropdown */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="appearance-none bg-white border-2 border-ink rounded-full px-3.5 py-1.5 pr-8 font-mono text-xs uppercase font-bold text-ink shadow-neo-sm outline-none cursor-pointer hover:bg-cream transition-colors"
          >
            {LANGUAGES.map((l) => (
              <option key={l.id} value={l.id}>
                {l.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 font-bold text-xs">
            ▼
          </span>
        </div>

        {/* Error Message Toggle */}
        <button
          type="button"
          onClick={onToggleErrorDrawer}
          className={`border-2 border-dashed border-ink rounded-full px-3 py-1.5 font-mono text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-1 ${
            errorDrawerOpen
              ? "bg-ink text-white"
              : "bg-white hover:bg-cream text-ink shadow-neo-sm"
          }`}
        >
          <span>{errorDrawerOpen ? "−" : "+"}</span>
          <span>ERROR MESSAGE</span>
        </button>
      </div>

      {/* Primary Roast Button */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={onRoast}
          disabled={isRoasting}
          className="bg-mustard hover:bg-yellow-400 disabled:opacity-60 border-2 border-ink rounded-full px-5 py-2 font-display text-sm uppercase tracking-wide font-extrabold text-ink shadow-neo shadow-neo-active transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed"
        >
          {isRoasting ? (
            <span className="flex items-center gap-2 animate-pulse">
              <span className="w-2 h-2 rounded-full bg-ink animate-ping" />
              <span>ANALYZING CODE...</span>
            </span>
          ) : (
            <>
              <span>Roast Me / भाजून काढ 🔥</span>
              <span className="text-xs bg-ink text-white px-1.5 py-0.5 rounded font-mono font-bold ml-1">
                Ctrl ⏎
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
