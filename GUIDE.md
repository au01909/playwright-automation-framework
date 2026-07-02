# Complete Guide — What You Can Test, and How

This is the plain-English reference for everything the framework can check on
`yournearbestplumbingservices.com`, how to run each type of check, how to
write new tests (including AI-generated ones), and how to read the results.

---

## 1. Everything you can validate

| What | Command | Needs AI key? | Where results show up |
|---|---|---|---|
| Core site functionality (25 tests: nav, buttons, links, headings) | `npm test` | No | Terminal + `reports/html-report` |
| Embedded Google Form loads & works | included in `npm test` (`tests/book-now.spec.ts`) | No | Same as above |
| SEO health (title, meta description, canonical, OG tags, schema, robots.txt, sitemap, alt text, heading structure) | `npm run seo` | No | Terminal (JSON) |
| Accessibility (contrast, ARIA, labels, heading order, keyboard nav, alt text) | `npm run a11y` | No | Terminal (JSON) |
| Broken links / images / CSS / JS on a page | `npm run links` | No | Terminal (JSON) |
| AI review — does the page look professional, is branding clear, is the CTA visible, are there trust indicators, grammar issues, local SEO quality | `npx playwright test extended-tests/ai-validation.spec.ts --project=chromium` | **Yes** (`GEMINI_API_KEY` or `OPENAI_API_KEY` in `.env`) | Terminal + report |
| AI visual regression (catches layout breaks a screenshot diff would miss) | same command as above | **Yes** | Terminal + report |
| Self-healing locators (auto-repairs a broken selector mid-test) | Runs automatically inside every test — nothing to trigger manually | **Yes**, only when a locator actually breaks | Logged in `reports/framework.log` + `healing/locatorStore.db` |

Run everything at once:
```bash
npm test                                                              # the 100 core tests
npx playwright test extended-tests/ai-validation.spec.ts --project=chromium   # AI checks
npm run seo && npm run a11y && npm run links                          # standalone reports
```

---

## 2. Generating new tests from a plain-English prompt

### Where to write your prompt
Create a `.txt` file inside the `prompts/` folder. You can copy the existing
`prompts/sample-prompt.txt` as a starting point.

### The format to use
```
Feature: <short name for what you're testing>

Verify user can
<step 1>
<step 2>
<step 3>
```

One action per line, written like you're giving directions to a person who's
never seen the site. Be specific about page names and button text — the AI
generates better locators when you are.

**Good example** (`prompts/emergency-call-flow.txt`):
```
Feature: Emergency call button works from every page

Verify user can
visit the homepage
see the phone number in the header
click the Call Now button
confirm the link starts a phone call (tel: link)
navigate to the Services page
confirm the phone number is still visible there
```

**Weak example** (too vague — avoid this):
```
Feature: test the site

Verify user can
use the site properly
```

### How to run it
```bash
npm run generate -- prompts/emergency-call-flow.txt "Emergency call flow"
```

### Where the output goes
A new file appears at:
```
generated-tests/emergency-call-flow.spec.ts
```
It's picked up automatically the next time you run `npm test` — no extra
wiring needed. **Always open the generated file and read it before trusting
it** — the AI can guess a locator wrong, same as I did on the first draft of
this project. Treat it as a first draft, not a final answer.

---

## 3. How to modify existing tests

### The two folders that matter
- **`pages/`** — describes *where things are* on each page (a locator = "the address of a button/field/heading"). No checks happen here.
- **`tests/`** — describes *what to check* using those locators.

If a test fails because the site changed, usually you only need to update
`pages/`, not `tests/`.

### Anatomy of one test
```ts
test('Book a Service button links to the Book Now page', async ({ page }) => {
  const home = new HomePage(page);          // 1. open the page object
  await home.open();                        // 2. navigate to the page
  const button = page.locator(home.bookAServiceButton).first(); // 3. find the element
  await expect(button).toHaveAttribute('href', /contact\.html/); // 4. state what "correct" means
});
```
- **Step 3 is "what to test"** — which element you're looking at.
- **Step 4 is "the expected result"** — what must be true for the test to pass.

### Adding a locator to a Page Object
Open e.g. `pages/homePage.ts` and add a line like:
```ts
readonly emergencyBanner = 'text=24/7 Emergency Plumbing';
```
Use whichever of these is most stable, in this order of preference:
1. `text=Exact Visible Text` — best, matches what a user actually sees
2. `a:has-text("Book Service")` — good for buttons/links with partial text
3. `input[name="email"]` — good for form fields with a real `name` attribute
4. `nav >> text=Services` — good when the same text appears in multiple places and you need to scope it

### Adding a new test to an existing file
Copy this template into any `tests/*.spec.ts` file inside the matching `test.describe()` block:
```ts
test('<plain English description of what you are checking>', async ({ page }) => {
  const home = new HomePage(page);
  await home.open();
  await expect(page.locator(home.someLocator)).toBeVisible();
});
```

### The assertions you'll use most often
| Assertion | Means |
|---|---|
| `.toBeVisible()` | Element is on the page and visible to a user |
| `.toHaveText('exact text')` | Element's text matches exactly |
| `.toHaveAttribute('href', /pattern/)` | A link/button points where it should |
| `.toBeGreaterThanOrEqual(n)` (on a count) | At least `n` matching elements exist |
| `.toBe('PASS')` | Used for the AI checks that return PASS/FAIL |

---

## 4. What is a "Trace"?

A trace is a **full recording of everything that happened during one test** —
every click, every page navigation, every network request, a screenshot
before and after each action, and the console log — all scrubbable like a
video timeline.

- It's controlled by this line in `playwright.config.ts`:
  ```ts
  trace: 'retain-on-failure',
  ```
  meaning a trace file is only saved when a test **fails** (keeps things fast
  and disk-light when everything passes).
- Trace files land in the `traces/` folder as `trace.zip`.

### How to open one
```bash
npx playwright show-trace traces/<test-name>/trace.zip
```
Or, easier — open the HTML report and click any red (failed) test; there's a
"View trace" button right there:
```bash
npx playwright show-report reports/html-report
```

### What you'll see inside
- A timeline of every action (click, fill, navigate) — click any step to jump to that moment.
- The exact DOM at that moment (you can inspect it like dev tools).
- A screenshot and, if video is enabled, the recorded video.
- Network requests fired during that step.
- Console errors, if any.

This is the single best tool for answering "why did this fail" without
re-running the test.

---

## 5. How to decide what to test and what "expected result" means

Think in three columns — this is literally how each test in this repo was designed:

| What to check (the thing a real visitor cares about) | How to check it (locator) | Expected result (assertion) |
|---|---|---|
| Can I see the phone number? | `a[href^="tel:"]` | `.toBeVisible()` |
| Does clicking Call Now actually dial? | same locator | `.toHaveAttribute('href', /^tel:/)` |
| Are all 9 services listed? | loop over 9 known headings | each `.toBeVisible()` |
| Does the booking form load? | `iframe[src*="docs.google.com/forms"]` | `.toBeVisible()` + Submit button visible |

**Rule of thumb:** if you can't describe in one plain sentence what a real
customer would notice if this broke, it's probably not worth a test yet.
Start from "what would embarrass the business if it silently broke" and work
backward to the locator.

---

## 6. Quick command reference

```bash
npm install && npx playwright install --with-deps   # one-time setup
cp .env.example .env                                 # then add your AI key

npm test                                              # 100 core tests, no AI needed
npx playwright test --project=chromium --headed       # watch it run in a real browser
npx playwright test tests/book-now.spec.ts            # run just one file
npx playwright test -g "Google Form"                  # run tests matching a name

npm run generate -- prompts/<file>.txt "<Feature Name>"   # AI-generate a new test
npx playwright test extended-tests/ai-validation.spec.ts --project=chromium  # AI review suite

npm run seo    # SEO report
npm run a11y   # accessibility report
npm run links  # broken link report

npx playwright show-report reports/html-report        # visual results
npx playwright show-trace traces/<name>/trace.zip      # step-by-step replay of a failure
```
