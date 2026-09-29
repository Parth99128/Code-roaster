import { NextResponse } from "next/server";
import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import type { LanguageId, RoastLevel, RoastRequest } from "@/types/roast";

export async function POST(req: Request) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const payload = (body && typeof body === "object" ? body : {}) as Record<
    string,
    unknown
  >;

  const rawCode = typeof payload.code === "string" ? payload.code : "";
  const rawErrorMessage =
    typeof payload.errorMessage === "string" ? payload.errorMessage.trim() : "";

  // 1. Validation
  if (!rawCode.trim()) {
    return NextResponse.json(
      { error: "No code provided. I can't roast the void." },
      { status: 400 }
    );
  }

  if (rawCode.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code is too long (${rawCode.length.toLocaleString()} chars). Maximum allowed is ${LIMITS.maxCodeLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  if (rawErrorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message is too long (${rawErrorMessage.length.toLocaleString()} chars). Maximum allowed is ${LIMITS.maxErrorMessageLength.toLocaleString()} characters.`,
      },
      { status: 400 }
    );
  }

  // 2. Language & Roast Level Fallbacks
  const knownLanguages = LANGUAGES.map((l) => l.id as string);
  const knownLevels = ROAST_LEVELS.map((r) => r.id as string);

  const language = knownLanguages.includes(payload.language as string)
    ? (payload.language as LanguageId)
    : DEFAULTS.language;

  const roastLevel = knownLevels.includes(payload.roastLevel as string)
    ? (payload.roastLevel as RoastLevel)
    : DEFAULTS.roastLevel;

  const request: RoastRequest = {
    code: rawCode,
    language,
    roastLevel,
    errorMessage: rawErrorMessage || undefined,
    persona: (payload.persona as RoastRequest["persona"]) || DEFAULTS.persona,
  };

  try {
    const result = await analyzeCode(request);
    return NextResponse.json(result, { status: 200 });
  } catch (err: unknown) {
    console.error("[/api/roast Error]:", err);
    const message =
      err instanceof Error ? err.message : "Failed to analyze code.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
