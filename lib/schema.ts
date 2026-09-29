import { Type, type Schema } from "@google/genai";
import { SEVERITIES } from "@/config/app.config";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "Humorous critique paragraph in Hinglish",
    },
    headline: {
      type: Type.STRING,
      description: "Punchy 1-line savage quote",
    },
    score: {
      type: Type.INTEGER,
      description: "Roast score from 10 to 98",
    },
    issues: {
      type: Type.ARRAY,
      description: "Structured array of specific issues and bugs found",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue occurs",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
          },
          title: {
            type: Type.STRING,
            description: "Short title of the problem",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "Problematic code copied exactly",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of why this fails or hurts performance",
          },
          expected: {
            type: Type.STRING,
            description: "How to fix it properly",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "Clean, fully corrected code without any markdown formatting",
    },
    takeaway: {
      type: Type.STRING,
      description: "Closing advice or encouragement in Hinglish",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
