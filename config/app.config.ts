export const APP = {
  name: "Code Roaster",
  version: "v3",
  tagline: "Your code. Our problem now.",
  subTagline: "Desi debugging, powered by Gemini.",
  chapter: "GDG Nashik",
  event: "DevFest Nashik 2026",
};

export const AI = {
  model: "gemini-3.5-flash-lite",
  modelLabel: "Gemini 3.5 Flash-Lite",
  maxAttempts: 3,
};

export const ROAST_LEVELS = [
  {
    id: "dry",
    label: "Halka",
    fullLabel: "Halka (Dry)",
    description: "Mild and deadpan. Gentle jabs, mostly helpful.",
  },
  {
    id: "sharp",
    label: "Tikha",
    fullLabel: "Tikha (Sharp)",
    description: "Pointed and witty. Calls out every mistake directly.",
  },
  {
    id: "savage",
    label: "Zanzanit 🌶️",
    fullLabel: "Zanzanit (Savage)",
    description: "Maximum burn. Brutally honest, but still technically accurate.",
  },
] as const;

export const PERSONAS = [
  { id: "standup", label: "Stand-up Roaster", emoji: "🎭" },
  { id: "sharmaji", label: "Sharma ji ka Beta", emoji: "👨‍🎓" },
  { id: "professor", label: "Strict Professor", emoji: "🧐" },
  { id: "bhau", label: "Hostel Bhau", emoji: "🕶️" },
  { id: "recruiter", label: "Campus Recruiter", emoji: "💼" },
] as const;

export const LANGUAGES = [
  { id: "python", label: "Python", extension: "py" },
  { id: "javascript", label: "JavaScript", extension: "js" },
  { id: "typescript", label: "TypeScript", extension: "ts" },
  { id: "java", label: "Java", extension: "java" },
  { id: "c", label: "C", extension: "c" },
  { id: "cpp", label: "C++", extension: "cpp" },
  { id: "go", label: "Go", extension: "go" },
  { id: "rust", label: "Rust", extension: "rs" },
] as const;

export const DEFAULTS = {
  language: "python",
  roastLevel: "savage",
  persona: "standup",
} as const;

export const SEVERITIES = ["FATAL BUG", "CODE SMELL", "OPTIMIZATION"] as const;

export const LIMITS = {
  maxCodeLength: 20_000,
  maxErrorMessageLength: 4_000,
};

export const SAMPLE = {
  language: "python",
  code: `def calculate_average(numbers):
    total = 0
    for number in numbers:
        total += numbers  # Typo: adding list instead of number!
    return total / len(numbers)`,
} as const;
