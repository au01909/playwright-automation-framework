/**
 * Decides whether a healed locator returned by the AI is trustworthy
 * enough to auto-apply, versus needing a human to review it.
 */
export const CONFIDENCE_THRESHOLD = Number(process.env.HEALING_CONFIDENCE_THRESHOLD ?? 0.75);

export interface HealingSuggestion {
  locator: string;
  confidence: number; // 0.0 - 1.0
  reason: string;
}

export function isAutoApplicable(suggestion: HealingSuggestion): boolean {
  return suggestion.confidence >= CONFIDENCE_THRESHOLD;
}

/** Formats a suggestion for logs / reports, e.g. "98% - Text matches previous locator". */
export function formatConfidence(suggestion: HealingSuggestion): string {
  const pct = Math.round(suggestion.confidence * 100);
  return `${pct}% - ${suggestion.reason}`;
}
