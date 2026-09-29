"use client";

import React, { useState } from "react";
import { SectionHeader } from "./SectionHeader";
import { LANGUAGES } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (fixedCode: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const ext = langConfig?.extension || "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => setCopyStatus("idle"), 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="flex flex-col gap-2 mt-2">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-google-green font-mono font-bold tracking-wider uppercase text-xs">
          REDEMPTION ARC // READY TO APPLY
        </span>
      </SectionHeader>

      <div className="bg-editor-bg border-2 border-ink rounded-xl shadow-neo overflow-hidden">
        {/* Code Bar Header */}
        <div className="bg-[#242424] px-4 py-2 border-b-2 border-ink flex items-center justify-between text-xs font-mono">
          <span className="text-pale-yellow font-bold">solution.{ext}</span>
          <span className="text-google-green font-bold text-[11px] uppercase tracking-wider">
            ✓ TESTED · ZERO BUGS
          </span>
        </div>

        {/* Code View */}
        <div className="p-4 overflow-x-auto custom-scrollbar">
          <pre className="font-mono text-xs text-editor-ink leading-relaxed">
            <code>{code}</code>
          </pre>
        </div>
      </div>

      {/* Button Row */}
      <div className="flex flex-wrap items-center gap-3 mt-1">
        <button
          onClick={handleCopy}
          className="flex-1 bg-white hover:bg-pale-yellow border-2 border-ink rounded-full py-2 px-4 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-neo shadow-neo-active transition-all"
        >
          {copyLabel}
        </button>
        <button
          onClick={() => onApply(code)}
          className="flex-1 bg-mustard hover:bg-yellow-400 border-2 border-ink rounded-full py-2 px-4 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-neo shadow-neo-active transition-all"
        >
          APPLY TO EDITOR ↵
        </button>
      </div>
    </div>
  );
}
