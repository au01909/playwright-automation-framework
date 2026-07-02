# AI-Powered Self-Healing Playwright Test Automation Framework

Target site under test: **https://yournearbestplumbingservices.com**

## Setup

```bash
npm install
npx playwright install --with-deps
cp .env.example .env   # then fill in OPENAI_API_KEY or GEMINI_API_KEY
```

## Usage

```bash
# Run the core suite: 25 plain-English tests x 4 browsers = 100 test cases.
# None of these need an AI API key — they're pure Playwright checks against
# the real site (Home, Services, About, FAQ, Book Now + the embedded Google Form).
npm test

# Run just one browser while you're debugging (much faster)
npx playwright test --project=chromium --headed

# Run the optional AI-powered suite (needs GEMINI_API_KEY or OPENAI_API_KEY)
npx playwright test extended-tests/ai-validation.spec.ts --project=chromium

# Generate a new test from a plain-English prompt (Module 1)
npm run generate -- prompts/sample-prompt.txt "Browse services flow"

# Standalone validators (no AI key needed)
npm run seo       # Module 8 — SEO score
npm run a11y      # Module 9 — accessibility score
npm run links     # Module 10 — broken link crawl

# View the HTML report after a run
npx playwright show-report reports/html-report
```

## What each test file covers (plain English)

| File | Checks |
|---|---|
| `tests/home.spec.ts` | Homepage loads, nav links, hero CTA, call button, service preview cards |
| `tests/services.spec.ts` | All 9 services listed, each has a booking link |
| `tests/about.spec.ts` | Founder name, core values, CTA to booking |
| `tests/faq.spec.ts` | FAQ categories present, 15+ questions answered, CTA to booking |
| `tests/book-now.spec.ts` | Phone/email visible, Google Map loads, **embedded Google Form loads and has a Submit button** |
| `extended-tests/ai-validation.spec.ts` | Optional: AI review of page quality, visual regression, accessibility, SEO score |

## How self-healing works

`ai/locatorHealer.ts` wraps every interaction. On a locator failure it:
1. Grabs the current page's HTML.
2. Sends the broken locator + HTML to the configured LLM (OpenAI or Gemini).
3. Gets back a new locator + confidence score + reason.
4. Auto-retries if confidence ≥ `HEALING_CONFIDENCE_THRESHOLD` (default 0.75).
5. Persists the healed locator to `healing/locatorStore.db` (SQLite) so future
   runs reuse it without another AI call.

## Folder structure

See `PRD.md` (Section 10) for the full intended layout — this repo implements
Modules 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11 (via Allure/HTML reporter), and 12 (GitHub Actions).
