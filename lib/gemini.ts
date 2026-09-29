import { GoogleGenAI } from "@google/genai";
import { AI } from "@/config/app.config";
import type { RoastRequest, RoastResult } from "@/types/roast";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";

function friendlyErrorMessage(status: number | undefined, message: string): string {
  switch (status) {
    case 400:
      return "Invalid request sent to Gemini. Check prompt inputs.";
    case 401:
    case 403:
      return "Invalid or unauthorized GEMINI_API_KEY. Verify your key in .env.local and check permissions at https://aistudio.google.com/apikey.";
    case 404:
      return `Model "${AI.model}" not found. Verify the model name in config/app.config.ts.`;
    case 429:
      return "Rate limit reached on Gemini API. Please wait a moment and try again.";
    case 503:
      return "Gemini service is temporarily overloaded. Please retry in a few seconds.";
    default:
      return message || "An unexpected error occurred while communicating with Gemini.";
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const rawText = response.text;
      if (!rawText) {
        throw new Error("Received empty response from Gemini model.");
      }

      let parsed: Partial<RoastResult>;
      try {
        parsed = JSON.parse(rawText);
      } catch (parseErr) {
        throw new Error(`Failed to parse Gemini JSON response: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`);
      }

      return {
        roast: parsed.roast ?? "Bhai, code dekh ke speechless ho gaya. 💀",
        headline: parsed.headline ?? "Yeh code nahi, Panchavati Express ki general boghi hai 🚂",
        score: typeof parsed.score === "number" ? parsed.score : 72,
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? request.code,
        takeaway: parsed.takeaway ?? "Chinta mat kar, thoda aur practice karo toh mast banega! ✅",
      };
    } catch (err: unknown) {
      lastError = err;
      const status = (err as { status?: number })?.status;

      // Retry on 503 if attempts remaining
      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      const message = err instanceof Error ? err.message : String(err);
      throw new Error(friendlyErrorMessage(status, message));
    }
  }

  throw new Error(
    friendlyErrorMessage(503, lastError instanceof Error ? lastError.message : "Maximum retry attempts exceeded.")
  );
}
