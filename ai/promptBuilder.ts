/**
 * Module 1: Natural Language Test Generation - prompt builder.
 * Wraps the user's plain-English steps into a strict system prompt so the
 * LLM reliably returns runnable Playwright TypeScript.
 */
export function buildTestGenerationPrompt(featureName: string, naturalLanguageSteps: string): {
  system: string;
  user: string;
} {
  const system = `
You are an expert SDET generating Playwright tests in TypeScript.
Rules:
- Use "@playwright/test" imports (test, expect).
- Use the self-healing helpers "healingClick" and "healingFill" from "../ai/locatorHealer"
  instead of raw page.click()/page.fill() for any interaction with a locator.
- Prefer role/text-based selectors (getByRole, getByText) as the FIRST attempt locator string.
- Always add meaningful expect() assertions for each verification step.
- Use Page Object classes from "../pages" where one exists for the page being tested.
- Output ONLY valid TypeScript code. No markdown fences, no explanations.
- The base URL is already configured in playwright.config.ts; use relative paths with page.goto('/').
`;

  const user = `
Feature: ${featureName}

Natural language steps:
${naturalLanguageSteps}

Generate a complete Playwright test file implementing these steps against the target site.
`;

  return { system, user };
}
