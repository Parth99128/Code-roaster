import {
  LANGUAGES,
  ROAST_LEVELS,
  SEVERITIES,
  PERSONAS,
} from "@/config/app.config";

export type LanguageId = (typeof LANGUAGES)[number]["id"];
export type RoastLevel = (typeof ROAST_LEVELS)[number]["id"];
export type Severity = (typeof SEVERITIES)[number];
export type PersonaId = (typeof PERSONAS)[number]["id"];

export interface RoastRequest {
  language: LanguageId;
  code: string;
  roastLevel: RoastLevel;
  errorMessage?: string;
  persona?: PersonaId;
}

export interface RoastIssue {
  line: number;
  severity: Severity;
  title: string;
  codeSnippet: string;
  diagnosis: string;
  expected: string;
}

export interface RoastResult {
  roast: string;
  headline?: string;
  score?: number;
  issues: RoastIssue[];
  correctedCode: string;
  takeaway: string;
}

export type ReportState = "empty" | "loading" | "results" | "error";
