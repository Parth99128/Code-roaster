"use client";

import React, { useCallback, useEffect, useState } from "react";
import { DEFAULTS, LIMITS, SAMPLE } from "@/config/app.config";
import type {
  LanguageId,
  PersonaId,
  ReportState,
  RoastLevel,
  RoastResult,
} from "@/types/roast";
import { requestRoast } from "@/lib/api";
import { RoastControls } from "./RoastControls";
import { ErrorMessageInput } from "./ErrorMessageInput";
import { CodeEditor } from "./CodeEditor";
import { RoastReport } from "./RoastReport";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel as RoastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language as LanguageId);
  const [persona, setPersona] = useState<PersonaId>(DEFAULTS.persona as PersonaId);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState(false);

  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (reportState === "loading") return;

    if (!code.trim()) {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    if (code.length > LIMITS.maxCodeLength) {
      setApiError(
        `Code is too long (${code.length.toLocaleString()} chars). Maximum allowed is ${LIMITS.maxCodeLength.toLocaleString()} characters.`
      );
      setReportState("error");
      return;
    }

    if (errorMessage.length > LIMITS.maxErrorMessageLength) {
      setApiError(
        `Error message is too long (${errorMessage.length.toLocaleString()} chars). Maximum allowed is ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`
      );
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");
    setRoastResult(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
        persona,
      });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to analyze code.");
      setReportState("error");
    }
  }, [code, language, roastLevel, persona, errorMessage, reportState]);

  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language as LanguageId);
    setCode(SAMPLE.code);
  }, []);

  const handleClear = useCallback(() => {
    setCode("");
  }, []);

  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
    // Do NOT auto re-roast — user reviews first.
  }, []);

  const handleNewCode = useCallback(() => {
    setCode("");
    setErrorMessage("");
    setRoastResult(null);
    setRoastedCode("");
    setApiError("");
    setReportState("empty");
  }, []);

  const handleRoastAgain = useCallback(async () => {
    // "Roast Again, Spicier" — escalate one level then roast.
    const order: RoastLevel[] = ["dry", "sharp", "savage"];
    const idx = order.indexOf(roastLevel);
    const next = order[Math.min(idx + 1, order.length - 1)];
    if (next !== roastLevel) {
      setRoastLevel(next);
    }
    // Roast with current snapshot; effect below will not double-fire
    // because we call directly with the (possibly stale) level — so
    // inline the request instead of relying on state update timing.
    if (reportState === "loading" || !code.trim()) return;
    setReportState("loading");
    setApiError("");
    setRoastResult(null);
    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel: next,
        errorMessage: errorMessage.trim() || undefined,
        persona,
      });
      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Failed to analyze code.");
      setReportState("error");
    }
  }, [roastLevel, code, language, persona, errorMessage, reportState]);

  // Ctrl+Enter / Cmd+Enter roasts from anywhere on the page.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        void handleRoast();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleRoast]);

  // Highlight the first issue line only while the editor still holds
  // exactly what was roasted — disappears the instant code is edited.
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues[0]?.line
      : undefined;

  return (
    <section
      aria-label="Code Roaster tool"
      className="w-full bg-white border-2 border-ink rounded-[22px] shadow-neo-lg overflow-hidden"
    >
      <RoastControls
        roastLevel={roastLevel}
        onRoastLevelChange={setRoastLevel}
        language={language}
        onLanguageChange={setLanguage}
        persona={persona}
        onPersonaChange={setPersona}
        onRoast={handleRoast}
        isRoasting={isRoasting}
        errorDrawerOpen={errorDrawerOpen}
        onToggleErrorDrawer={() => setErrorDrawerOpen((v) => !v)}
      />

      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Split pane — 50/50 desktop, stacked mobile */}
      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 lg:w-[48%] flex flex-col border-b-2 lg:border-b-0 lg:border-r-2 border-ink min-w-0">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
            onClear={handleClear}
          />
        </div>
        <div className="flex-1 lg:w-[52%] flex flex-col min-w-0">
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={handleApplyFix}
            onNewCode={handleNewCode}
            onRoastAgain={handleRoastAgain}
            onLoadSample={handleLoadSample}
          />
        </div>
      </div>

      {/* Status strip — always mounted */}
      <div className="border-t-2 border-ink bg-cream px-4 md:px-6 py-2 flex flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-muted-ink">
        <span className="uppercase tracking-wider font-bold">
          Status:{" "}
          {isRoasting ? (
            <span className="text-google-yellow bg-ink px-1.5 py-0.5 rounded">
              Processing…
            </span>
          ) : reportState === "error" ? (
            <span className="text-google-red">Interrupted — retry ready</span>
          ) : reportState === "results" ? (
            <span className="text-google-green">Roast served 🔥</span>
          ) : (
            <span className="text-google-green">Online · Gemini 3.5 Flash-Lite</span>
          )}
        </span>
        <span className="hidden sm:inline uppercase tracking-wider">
          Engine: Google Gemini · {code.length.toLocaleString()} /{" "}
          {LIMITS.maxCodeLength.toLocaleString()} chars
        </span>
      </div>
    </section>
  );
}
