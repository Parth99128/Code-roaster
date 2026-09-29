"use client";

import React, { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Compiler ki chai thandi ho rahi hai… ☕",
  "Sharma ji ke bete ke code se compare kar rahe hai… 👨‍🎓",
  "Bhau, roast tayyar ho raha hai… 🔥",
  "Panchavati Express se bhi late hai tumhara code… 🚂",
  "Evaluating computational complexity and architectural sins… 💀",
];

export function LoadingState() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[380px]">
      {/* Tilted Neo-Brutalist Loader Square */}
      <div className="w-16 h-16 border-3 border-ink bg-mustard rounded-2xl flex items-center justify-center shadow-neo animate-spin duration-1000 mb-5">
        <span className="font-mono text-2xl font-black text-ink select-none">
          /
        </span>
      </div>

      <h3 className="font-display text-xl font-extrabold text-ink uppercase tracking-wide mb-2 animate-pulse">
        Analyzing Code
      </h3>

      <div className="bg-white border-2 border-ink rounded-xl px-4 py-2 shadow-neo-sm max-w-md">
        <p className="font-mono text-xs text-ink font-bold transition-all duration-300">
          {LOADING_MESSAGES[msgIndex]}
        </p>
      </div>

      <span className="font-mono text-[10px] text-muted-ink uppercase tracking-widest mt-4">
        Powered by Gemini 3.5 Flash-Lite · Stateless
      </span>
    </div>
  );
}
