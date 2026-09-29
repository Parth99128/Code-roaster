"use client";

import React, { useRef, useState } from "react";
import { LANGUAGES } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";

interface CodeEditorProps {
  code: string;
  onChange: (val: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
  onClear: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
  onClear,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 });

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 12);

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleSelect = () => {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const textUpToCursor = textareaRef.current.value.slice(0, start);
    const cursorLines = textUpToCursor.split("\n");
    const currentLine = cursorLines.length;
    const currentCol = cursorLines[cursorLines.length - 1].length + 1;
    setCursorPos({ line: currentLine, col: currentCol });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = textarea.value;

      // Insert 4 spaces
      textarea.value = value.substring(0, start) + "    " + value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      onChange(textarea.value);
    }
  };

  const langConfig = LANGUAGES.find((l) => l.id === language);
  const langLabel = langConfig?.label || language;

  return (
    <div className="flex-1 flex flex-col bg-editor-bg text-editor-ink min-h-[560px] overflow-hidden">
      {/* 40px Header Strip */}
      <div className="h-10 px-4 border-b-2 border-ink bg-[#1e1e1e] flex items-center justify-between shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[11px] font-bold text-pale-yellow uppercase tracking-widest">
            INPUT // SRC
          </span>
          <span className="text-xs text-muted-ink font-mono font-medium hidden sm:inline">
            · YOUR CODE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onLoadSample}
            className="bg-[#2a2a2a] hover:bg-mustard hover:text-ink text-editor-ink border border-[#444] rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider transition-colors shadow-neo-sm"
          >
            SAMPLE BUG
          </button>
          <button
            type="button"
            onClick={onClear}
            className="text-muted-ink hover:text-google-red font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-1 transition-colors"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex-1 relative flex overflow-hidden font-mono text-xs md:text-sm">
        {/* Line Gutter */}
        <div
          ref={gutterRef}
          className="w-12 bg-[#121212] border-r border-[#2c2c2c] py-4 select-none overflow-hidden text-right pr-3 font-mono text-xs text-[#555]"
        >
          {Array.from({ length: lineCount }).map((_, i) => {
            const lineNum = i + 1;
            const isError = errorLine === lineNum;
            return (
              <div
                key={lineNum}
                className={`leading-6 h-6 ${
                  isError
                    ? "text-google-red font-extrabold bg-google-red/20 -mr-3 pr-3 border-r-2 border-google-red"
                    : ""
                }`}
              >
                {String(lineNum).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onSelect={handleSelect}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder="// Paste your code here or click 'SAMPLE BUG' above..."
          className="flex-1 bg-transparent text-editor-ink p-4 leading-6 font-mono text-xs md:text-sm resize-none outline-none whitespace-pre overflow-auto custom-scrollbar selection:bg-mustard selection:text-ink"
        />
      </div>

      {/* Bottom Status Strip */}
      <div className="h-8 px-4 border-t border-[#2e2e2e] bg-[#121212] flex items-center justify-between text-[#888] font-mono text-[11px] shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-google-green" />
          <span>
            Ln {cursorPos.line}, Col {cursorPos.col} · {langLabel}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-4 text-muted-ink">
          <span>UTF-8</span>
          <span>Tab Size: 4</span>
          <span>{code.length.toLocaleString()} / 20,000 CHARS</span>
        </div>
      </div>
    </div>
  );
}
