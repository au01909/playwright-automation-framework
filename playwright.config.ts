import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  // Core suite (100 stable tests) + any AI-generated tests.
  // NOTE: extended-tests/ (AI-powered checks) is intentionally excluded
  // here — run it manually, see extended-tests/ai-validation.spec.ts.
  testDir: '.',
  testMatch: ['tests/**/*.spec.ts', 'generated-tests/**/*.spec.ts'],

  timeout: 30_000,
  fullyParallel: true,
  retries: 1, // gives the self-healing engine a second attempt after a repair
  workers: process.env.CI ? 4 : undefined,

  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['allure-playwright', { outputFolder: process.env.ALLURE_RESULTS_DIR || 'reports/allure-results' }],
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://yournearbestplumbingservices.com',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
  },

  outputDir: 'traces',

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
});
