import React from "react";
import type { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const severityBadgeStyles: Record<Severity, string> = {
  "FATAL BUG": "bg-google-red text-white border-ink shadow-[1px_1px_0_#141414]",
  "CODE SMELL": "bg-mustard text-ink border-ink shadow-[1px_1px_0_#141414]",
  "OPTIMIZATION": "bg-google-green text-white border-ink shadow-[1px_1px_0_#141414]",
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index + 1).padStart(2, "0");
  const badgeStyle = severityBadgeStyles[issue.severity] || "bg-ink text-white";

  return (
    <div className="bg-white border-2 border-ink rounded-xl p-4 shadow-neo flex flex-col gap-2.5 transition-transform hover:-translate-y-0.5">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="bg-ink text-white font-mono text-[10px] font-bold px-1.5 py-0.5 rounded">
            #{paddedIndex}
          </span>
          <span className="bg-cream border border-ink px-2 py-0.5 rounded font-mono text-[11px] font-bold text-ink">
            LINE {issue.line}
          </span>
          <span
            className={`border px-2.5 py-0.5 rounded-full font-mono text-[10px] font-extrabold uppercase tracking-wider ${badgeStyle}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="font-mono text-xs font-semibold text-muted-ink text-right">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet */}
      {issue.codeSnippet && (
        <div className="bg-editor-bg border-l-4 border-mustard border-y border-r border-ink rounded p-2.5 overflow-x-auto custom-scrollbar">
          <pre className="font-mono text-xs text-editor-ink leading-relaxed">
            <code>{issue.codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Diagnosis & Expected */}
      <div className="flex flex-col gap-1.5 text-xs font-mono">
        <div className="bg-red-50 border border-google-red/40 rounded p-2 text-ink">
          <span className="text-google-red font-extrabold mr-1.5">✕ Diagnosis:</span>
          <span>{issue.diagnosis}</span>
        </div>
        <div className="bg-green-50 border border-google-green/40 rounded p-2 text-ink">
          <span className="text-google-green font-extrabold mr-1.5">✓ Expected:</span>
          <span>{issue.expected}</span>
        </div>
      </div>
    </div>
  );
}
