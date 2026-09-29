import React from "react";

/**
 * Rangoli / Warli-inspired decorative strip.
 * Pure CSS/SVG geometry — supports DevFest identity without
 * interfering with usability. Placed above the footer.
 */
export function RangoliStrip() {
  const triangles = Array.from({ length: 32 });

  return (
    <div
      aria-hidden="true"
      className="w-full overflow-hidden py-6 select-none"
    >
      <div className="flex items-center justify-center gap-1.5 flex-wrap">
        {triangles.map((_, i) => (
          <span key={i} className="flex flex-col items-center gap-1">
            <span
              className={`inline-block w-0 h-0 border-l-[7px] border-r-[7px] ${
                i % 2 === 0
                  ? "border-b-[12px] border-b-ink"
                  : "border-t-[12px] border-t-mustard"
              } border-l-transparent border-r-transparent`}
            />
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                i % 4 === 0
                  ? "bg-google-blue"
                  : i % 4 === 1
                    ? "bg-google-red"
                    : i % 4 === 2
                      ? "bg-google-green"
                      : "bg-mustard"
              }`}
            />
          </span>
        ))}
      </div>
      <p className="text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-ink mt-3">
        ▲ ▼ rangoli strip · warli dots · nashik misal energy ▲ ▼
      </p>
    </div>
  );
}
