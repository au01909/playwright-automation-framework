import { Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { logger } from '../utils/logger';

export interface AccessibilityReport {
  url: string;
  score: number; // 0-100, derived from violation count/severity
  violationCount: number;
  criticalCount: number;
  violations: {
    id: string;
    impact: string | null | undefined;
    description: string;
    nodesAffected: number;
  }[];
}

/**
 * Module 9: Accessibility Validation.
 * Runs axe-core against the live page — checks contrast, ARIA, labels,
 * heading order, keyboard nav, alt text, etc.
 */
export async function validateAccessibility(page: Page): Promise<AccessibilityReport> {
  const results = await new AxeBuilder({ page }).analyze();

  const violations = results.violations.map((v) => ({
    id: v.id,
    impact: v.impact,
    description: v.description,
    nodesAffected: v.nodes.length,
  }));

  const criticalCount = violations.filter((v) => v.impact === 'critical').length;
  const seriousCount = violations.filter((v) => v.impact === 'serious').length;

  // Simple weighted scoring: critical/serious issues cost more
  const penalty = criticalCount * 15 + seriousCount * 8 + (violations.length - criticalCount - seriousCount) * 3;
  const score = Math.max(0, 100 - penalty);

  const report: AccessibilityReport = {
    url: page.url(),
    score,
    violationCount: violations.length,
    criticalCount,
    violations,
  };

  logger.info(`Accessibility score for ${page.url()}: ${score}/100 (${violations.length} violations)`);
  return report;
}
