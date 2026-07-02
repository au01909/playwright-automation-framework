import * as fs from 'fs';
import * as path from 'path';
import { askAI } from '../utils/aiClient';
import { buildTestGenerationPrompt } from './promptBuilder';
import { logger } from '../utils/logger';

const OUTPUT_DIR = path.join(__dirname, '..', 'generated-tests');

/**
 * Module 1: Converts a natural-language prompt into a runnable
 * Playwright .spec.ts file under /generated-tests.
 */
export async function generateTestFromPrompt(featureName: string, naturalLanguageSteps: string): Promise<string> {
  const { system, user } = buildTestGenerationPrompt(featureName, naturalLanguageSteps);

  logger.info(`Generating Playwright test for feature: "${featureName}"`);
  const generatedCode = await askAI(system, user, false);

  // Defensive cleanup in case the model wraps output in markdown fences anyway
  const cleanedCode = generatedCode.replace(/^```ts\n?|^```typescript\n?|```$/gm, '').trim();

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const fileName = `${slugify(featureName)}.spec.ts`;
  const filePath = path.join(OUTPUT_DIR, fileName);
  fs.writeFileSync(filePath, cleanedCode, 'utf-8');

  logger.info(`Generated test written to: ${filePath}`);
  return filePath;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}
