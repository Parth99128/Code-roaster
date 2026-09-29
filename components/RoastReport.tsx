import React from "react";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import { EmptyState } from "./EmptyState";
import { LoadingState } from "./LoadingState";
import { ErrorState } from "./ErrorState";
import { SectionHeader } from "./SectionHeader";
import { IssueCard } from "./IssueCard";
import { FixedCode } from "./FixedCode";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg?: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
  onNewCode?: () => void;
  onRoastAgain?: () => void;
  onLoadSample?: () => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
  onNewCode,
  onRoastAgain,
  onLoadSample,
}: RoastReportProps) {
  return (
    <div className="flex-1 flex flex-col bg-cream min-h-[560px] overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b-2 border-ink bg-cream flex items-center justify-between shrink-0">
        <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-ink">
          AUDIT // REPORT
        </span>
        <span className="font-display text-xs font-extrabold uppercase tracking-wider text-ink">
          Roast Report
        </span>
        <span className="w-16" />
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col">
        {state === "empty" && <EmptyState onLoadSample={onLoadSample} />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="flex flex-col gap-6 animate-fadeIn">
            {/* Headline and Rubber Stamp Score */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-ink pb-4">
              <div className="flex-1">
                <span className="font-mono text-[10px] font-bold text-google-red uppercase tracking-wider">
                  VERDICT // NASHIK AUDIT
                </span>
                <h3 className="font-display text-base md:text-lg font-bold text-ink mt-1 leading-snug">
                  {result.headline || "“Yeh code nahi, Panchavati Express ki general boghi hai.”"}
                </h3>
              </div>

              {/* Rubber Stamp Score Badge */}
              <div className="stamp-rotate border-2 border-ink bg-pale-yellow px-3.5 py-2 rounded-xl shadow-neo shrink-0 self-start sm:self-center text-center">
                <div className="font-display text-lg font-black text-ink leading-tight">
                  {result.score ?? 72} / 100
                </div>
                <div className="font-mono text-[8px] font-extrabold uppercase tracking-wider text-google-red mt-0.5">
                  ATTENDANCE SHORT, CODE BHI SHORT
                </div>
              </div>
            </div>

            {/* Section 1: Roast */}
            <div>
              <SectionHeader number={1} title="Roast">
                <span className="text-muted-ink uppercase">
                  STYLE: <strong className="text-ink">{roastLevel}</strong>
                </span>
              </SectionHeader>
              <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-neo">
                <p className="font-sans text-sm md:text-base text-ink font-medium leading-relaxed italic">
                  “{result.roast}”
                </p>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div>
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-muted-ink">
                  {result.issues.length === 1
                    ? "1 ISSUE FOUND"
                    : `${result.issues.length} ISSUES FOUND`}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="bg-green-50 border-2 border-google-green text-google-green font-mono text-xs font-bold p-4 rounded-xl shadow-neo text-center">
                  ✓ No issues found. Suspiciously clean. Sharma ji is proud!
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={idx} index={idx} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (Redemption Arc) */}
            {result.correctedCode && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Section 4: Takeaway */}
            {result.takeaway && (
              <div>
                <SectionHeader
                  number={result.correctedCode ? 4 : 3}
                  title="Takeaway"
                />
                <div className="bg-cream border-2 border-ink rounded-xl p-3.5 shadow-neo text-xs font-mono text-ink leading-relaxed">
                  <span className="font-bold mr-1">💡 Key Lesson:</span>
                  {result.takeaway}
                </div>
              </div>
            )}

            {/* Bottom Actions Cluster */}
            <div className="flex flex-col gap-3 pt-2 border-t-2 border-ink">
                <div className="bg-white border border-ink rounded-lg p-2.5 text-center font-mono text-xs text-muted-ink">
                  “Chinta mat kar. Code bhi gym jaisa hai — repeat karoge toh better hoga.”
                </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: "Code Roaster Verdict",
                        text: `My code got roasted! Score: ${result.score}/100. Verdict: "${result.headline}"`,
                      }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(
                        `My code got roasted on Code Roaster! Score: ${result.score}/100. Verdict: "${result.headline}"`
                      );
                    }
                  }}
                  className="flex-1 bg-white hover:bg-pale-yellow border-2 border-ink rounded-full py-2 px-3 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-neo shadow-neo-active transition-all flex items-center justify-center gap-1.5"
                >
                  <span>SHARE ROAST 🚀</span>
                </button>
                {onRoastAgain && (
                  <button
                    onClick={onRoastAgain}
                    className="flex-1 bg-mustard hover:bg-yellow-400 border-2 border-ink rounded-full py-2 px-3 font-mono text-xs font-bold uppercase tracking-wider text-ink shadow-neo shadow-neo-active transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>ROAST AGAIN, SPICIER 🔥</span>
                  </button>
                )}
                {onNewCode && (
                  <button
                    onClick={onNewCode}
                    className="bg-white hover:bg-cream border-2 border-ink rounded-full py-2 px-4 font-mono text-xs font-bold uppercase tracking-wider text-muted-ink hover:text-ink shadow-neo shadow-neo-active transition-all"
                  >
                    NEW CODE
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
