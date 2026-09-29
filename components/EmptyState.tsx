import React from "react";

export function EmptyState({ onLoadSample }: { onLoadSample?: () => void }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[380px]">
      <div className="w-16 h-16 border-2 border-dashed border-ink rounded-2xl flex items-center justify-center bg-white shadow-neo mb-4">
        <span className="font-mono text-2xl font-extrabold text-muted-ink">
          {"{ ?_? }"}
        </span>
      </div>
      <h3 className="font-display text-lg font-extrabold text-ink uppercase tracking-wide mb-1.5">
        Your code is suspiciously quiet
      </h3>
      <p className="font-sans text-sm text-muted-ink max-w-sm leading-relaxed mb-1">
        Paste some code and let&apos;s find out why.
      </p>
      <p className="font-mono text-xs text-muted-ink max-w-sm leading-relaxed mb-4">
        Then click{" "}
        <strong className="text-ink bg-mustard px-1 py-0.5 rounded">
          Roast Me / भाजून काढ 🔥
        </strong>{" "}
        or press{" "}
        <kbd className="bg-white border border-ink px-1.5 py-0.5 rounded text-[11px] font-bold">
          Ctrl + Enter
        </kbd>
        .
      </p>
      {onLoadSample ? (
        <button
          type="button"
          onClick={onLoadSample}
          className="bg-white hover:bg-mustard border-2 border-ink rounded-full px-5 py-2 font-mono text-xs font-bold uppercase tracking-wider shadow-neo shadow-neo-active transition-all"
        >
          Try sample bug →
        </button>
      ) : (
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-ink rounded-full text-[11px] font-mono font-semibold text-muted-ink shadow-neo-sm">
          <span>Suspect a bug? Try the built-in sample button on the left!</span>
        </div>
      )}
    </div>
  );
}
