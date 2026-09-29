import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b-2 border-ink pb-2 mb-3">
      <div className="font-mono text-xs font-bold uppercase tracking-widest text-ink">
        <span className="text-google-blue font-extrabold">{paddedNumber}</span> //{" "}
        {title}
      </div>
      {children && <div className="text-xs font-mono">{children}</div>}
    </div>
  );
}
