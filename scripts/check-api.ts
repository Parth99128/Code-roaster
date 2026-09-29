import { analyzeCode } from "../lib/gemini";
import { AI, SAMPLE } from "../config/app.config";

async function main() {
  console.log(`[check-api] Testing Gemini connection with model "${AI.model}"...`);

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: "TypeError: unsupported operand type(s) for +=: 'int' and 'list'",
    });

    console.log("\n[check-api] SUCCESS! Gemini API is configured and responding correctly.");
    console.log("--------------------------------------------------");
    console.log(`Headline: ${result.headline}`);
    console.log(`Score: ${result.score}/100`);
    console.log(`Roast: ${result.roast}`);
    console.log(`Issues detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  #${idx + 1} [Line ${issue.line}] [${issue.severity}]: ${issue.title}`);
    });
    console.log("--------------------------------------------------");
    console.log("Takeaway:", result.takeaway);
    console.log("\nYour Gemini API key is valid and working!");
  } catch (error) {
    console.error("\n[check-api] FAILED to verify Gemini API:");
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
