import React from "react";

interface ErrorStateProps {
  error?: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const msg = (error || "").toLowerCase();
  const isRateLimit =
    msg.includes("rate limit") || msg.includes("429") || msg.includes("too fast") || msg.includes("marinate");

  const heading = isRateLimit ? "ROAST // TOO FAST" : "ROAST // INTERRUPTED";
  const sub = isRateLimit
    ? "Bhai, itni bhi jaldi kya hai?"
    : "Bhau, Gemini ne chai break le li.";
  const body = isRateLimit
    ? "Thoda ruk, roast ko bhi marinate hone do. Thode second ruk ke phir try kar."
    : error || "An unknown error occurred during code evaluation.";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[380px] animate-fadeIn">
      <div className="w-16 h-16 border-2 border-ink bg-google-red rounded-2xl flex items-center justify-center shadow-neo mb-4">
        <span className="font-mono text-3xl font-black text-white">!</span>
      </div>

      <h3 className="font-display text-xl font-extrabold text-ink uppercase tracking-wide">
        {heading}
      </h3>
      <p className="font-sans text-sm font-semibold text-ink mt-1 mb-3">{sub}</p>

      <div className="bg-white border-2 border-ink rounded-xl p-4 max-w-md mb-5 shadow-neo-sm text-left">
        <p className="font-mono text-xs text-ink leading-relaxed font-semibold">
          {body}
        </p>
      </div>

      <button
        onClick={onRetry}
        className="bg-mustard hover:bg-yellow-400 border-2 border-ink rounded-full px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-neo shadow-neo-active transition-all flex items-center gap-2"
      >
        <span>{isRateLimit ? "TRY AGAIN →" : "RETRY ANALYSIS ↵"}</span>
      </button>
    </div>
  );
}
