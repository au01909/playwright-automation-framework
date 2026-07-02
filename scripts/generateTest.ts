import * as fs from 'fs';
import * as path from 'path';
import { generateTestFromPrompt } from '../ai/testGenerator';

/**
 * Usage: npm run generate -- prompts/sample-prompt.txt "Contact enquiry flow"
 * Reads a natural-language prompt file and generates a Playwright spec
 * into /generated-tests via the AI test generator (Module 1).
 */
async function main() {
  const [, , promptFilePath, featureNameArg] = process.argv;

  if (!promptFilePath) {
    console.error('Usage: npm run generate -- <path-to-prompt.txt> "<Feature Name>"');
    process.exit(1);
  }

  const fullPath = path.resolve(promptFilePath);
  const steps = fs.readFileSync(fullPath, 'utf-8');
  const featureName = featureNameArg || path.basename(promptFilePath, '.txt');

  const outputPath = await generateTestFromPrompt(featureName, steps);
  console.log(`✅ Test generated: ${outputPath}`);
}

main().catch((err) => {
  console.error('Test generation failed:', err);
  process.exit(1);
});
