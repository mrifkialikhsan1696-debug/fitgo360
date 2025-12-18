// Mock Gemini meal analysis. Replace with a real Gemini API call when available.
export async function analyzeMeal(imageUri) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    imageUri,
    name: "Grilled salmon with veggies",
    calories: 520,
    sodium: "Medium",
    fiber: "High",
    verdict: "Traffic light: AMBER (watch sodium, good protein/fiber).",
    recommendation: "Reduce added salt, add lemon, keep veggies, hydrate.",
  };
}

export async function askCoach(question) {
  await new Promise((resolve) => setTimeout(resolve, 400));
  const answers = {
    default:
      "Focus on 3-30-300 today: 3 actions (walk, meds, low-sodium meal), keep streaks, and avoid delay-to-care by knowing your symptom triggers.",
    exercise:
      "Aim for brisk walking 20-30 minutes. If chest discomfort appears, stop and escalate. Pair with breathing drills.",
    diet:
      "Go for lean protein + veggies, avoid packaged sodium. Hydrate, add lemon/pepper instead of salt, and log your meal scan.",
    meds: "Take meds on time, set a reminder, and verify dose. If you miss a dose, do not double unless clinician advised.",
  };
  const lower = question.toLowerCase();
  const pick =
    lower.includes("walk") || lower.includes("exercise")
      ? answers.exercise
      : lower.includes("salt") || lower.includes("meal") || lower.includes("diet")
      ? answers.diet
      : lower.includes("med")
      ? answers.meds
      : answers.default;
  return {
    answer: pick,
    nextActions: [
      "Complete one pending task in 3-30-300.",
      "Run a meal scan to verify sodium.",
      "Use symptom check if you feel chest discomfort.",
    ],
  };
}
