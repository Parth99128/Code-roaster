import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="bg-lavender border-b-2 border-ink p-3 md:px-6 flex flex-col gap-1.5 animate-fadeIn">
      <div className="flex items-center justify-between text-xs font-mono font-bold">
        <span className="text-google-red uppercase tracking-wider flex items-center gap-1.5">
          <span>⚠️</span>
          <span>Attach Terminal Traceback / Compiler Error (Optional)</span>
        </span>
        <button
          onClick={onClose}
          className="text-muted-ink hover:text-ink hover:bg-white/60 px-2 py-0.5 rounded transition-colors text-xs"
        >
          Dismiss ✕
        </button>
      </div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. TypeError: unsupported operand type(s) for +=: 'int' and 'list'&#10;  File 'main.py', line 4, in calculate_average"
        rows={2}
        className="w-full bg-white border-2 border-ink rounded-lg p-2 font-mono text-xs text-ink outline-none focus:ring-2 focus:ring-mustard resize-none shadow-neo-sm placeholder:text-muted-ink/60"
      />
    </div>
  );
}
