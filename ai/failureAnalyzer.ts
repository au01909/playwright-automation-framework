import { askAIJson } from '../utils/aiClient';
import { logger } from '../utils/logger';

export interface FailureAnalysis {
  rootCause: string;
  suggestedFix: string;
  confidence: number;
  possibleSolution: string;
}

const SYSTEM_PROMPT = `
You are a senior SDET performing root cause analysis on a failed Playwright test.
Given the raw error message and surrounding HTML context, explain WHY it failed
in plain English and suggest a concrete fix.

Return STRICT JSON only:
{
  "rootCause": "short explanation of what actually changed/broke",
  "suggestedFix": "the code-level fix, e.g. replace locator X with Y",
  "confidence": 0.0-1.0,
  "possibleSolution": "one-paragraph human-readable summary for the report"
}
`;

/**
 * Module 5: Turns a raw Playwright error (e.g. TimeoutError) into a
 * structured, human-readable root cause + fix instead of a bare stack trace.
 */
export async function analyzeFailure(
  testName: string,
  errorMessage: string,
  htmlContext: string
): Promise<FailureAnalysis> {
  logger.info(`Running AI failure analysis for test: "${testName}"`);

  const userPrompt = `
Test name: ${testName}
Raw error:
${errorMessage}

HTML context (truncated):
${htmlContext.slice(0, 8000)}
`;

  const analysis = await askAIJson<FailureAnalysis>(SYSTEM_PROMPT, userPrompt);
  logger.info(`Root cause: ${analysis.rootCause}`);
  return analysis;
}
