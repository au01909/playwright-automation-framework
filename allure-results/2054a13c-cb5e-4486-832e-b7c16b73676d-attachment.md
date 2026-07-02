# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/home.spec.ts >> Home Page >> Top navigation shows all 5 expected links
- Location: tests/home.spec.ts:16:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('nav').locator('text=Home')
Expected: visible
Error: strict mode violation: locator('nav').locator('text=Home') resolved to 2 elements:
    1) <a class="active" href="index.html" aria-current="page">Home</a> aka getByLabel('Main navigation').getByRole('link', { name: 'Home', exact: true })
    2) <a href="index.html">Home</a> aka getByLabel('Footer site pages').getByRole('link', { name: 'Home' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('nav').locator('text=Home')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation "Main navigation" [ref=e2]:
    - link "YourNearBest Plumbing Home" [ref=e3] [cursor=pointer]:
      - /url: index.html
      - text: YourNearBestPlumbing
    - list [ref=e4]:
      - listitem [ref=e5]:
        - link "Home" [ref=e6] [cursor=pointer]:
          - /url: index.html
      - listitem [ref=e7]:
        - link "Services" [ref=e8] [cursor=pointer]:
          - /url: services.html
      - listitem [ref=e9]:
        - link "About" [ref=e10] [cursor=pointer]:
          - /url: about.html
      - listitem [ref=e11]:
        - link "FAQ" [ref=e12] [cursor=pointer]:
          - /url: faq.html
      - listitem [ref=e13]:
        - link "Book Now" [ref=e14] [cursor=pointer]:
          - /url: contact.html
  - region "Hero section" [ref=e15]:
    - generic [ref=e16]:
      - paragraph [ref=e17]: ⚡ 24/7 Emergency Service — We Arrive in 60 Minutes
      - heading "Your Trusted Plumber in Sarjapur, Bangalore" [level=1] [ref=e18]:
        - text: Your Trusted Plumber
        - emphasis [ref=e19]: in Sarjapur, Bangalore
      - paragraph [ref=e20]: Fast, reliable plumbing for homes and businesses across Sarjapur, Sarjapur Road, Bellandur, HSR Layout, Electronic City & Whitefield — with upfront pricing and no hidden fees.
      - generic [ref=e21]:
        - link "Book a Service" [ref=e22] [cursor=pointer]:
          - /url: contact.html
        - link "Call 9902139101" [ref=e23] [cursor=pointer]:
          - /url: tel:+919902139101
          - img [ref=e24]
          - text: Call 9902139101
      - generic [ref=e26]:
        - generic [ref=e27]:
          - generic [ref=e28]: 15+
          - generic [ref=e29]: Years Experience
        - generic [ref=e31]:
          - generic [ref=e32]: 2,400+
          - generic [ref=e33]: Jobs Completed
        - generic [ref=e35]:
          - generic [ref=e36]: 98%
          - generic [ref=e37]: Satisfaction Rate
    - img "Professional plumber fixing pipes in Sarjapur Bangalore" [ref=e40]
  - complementary "Service guarantees" [ref=e41]:
    - generic [ref=e42]:
      - generic [ref=e43]: ✓ Same-Day Service
      - generic [ref=e44]: ✓ Upfront Pricing
      - generic [ref=e45]: ✓ No Hidden Fees
      - generic [ref=e46]: ✓ Workmanship Guarantee
      - generic [ref=e47]: ✓ Certified Plumbers
  - region "About YourNearBest Plumbing" [ref=e48]:
    - generic [ref=e49]:
      - generic [ref=e50]:
        - paragraph [ref=e51]: Local Plumbing Experts
        - heading "Plumbing Services You Can Count On in Sarjapur & Bangalore" [level=2] [ref=e52]
        - paragraph [ref=e53]: YourNearBest Plumbing Services has been solving plumbing problems for homes and businesses across Sarjapur, Bellandur, HSR Layout, Electronic City, Whitefield and surrounding areas for over 15 years.
        - paragraph [ref=e54]: Whether it's a burst pipe at midnight or a routine drain clean, our certified plumbers arrive fast, diagnose accurately, and fix it right — with clear, honest pricing before any work begins.
        - generic [ref=e55]:
          - generic [ref=e56]: ✓ 15+ Years Experience
          - generic [ref=e57]: ✓ 24/7 Emergency
          - generic [ref=e58]: Certified Plumbers
          - generic [ref=e59]: Transparent Pricing
      - generic [ref=e60]:
        - generic [ref=e61]:
          - generic [ref=e62]: 15+
          - text: Years Serving Bangalore
        - generic [ref=e63]:
          - generic [ref=e64]: 2,400+
          - text: Jobs Completed
        - generic [ref=e65]:
          - generic [ref=e66]: 98%
          - text: Customer Satisfaction
        - generic [ref=e67]:
          - generic [ref=e68]: 60 min
          - text: Emergency Response
  - region "Complete Plumbing Solutions for Sarjapur & Bangalore" [ref=e69]:
    - generic [ref=e70]:
      - generic [ref=e71]:
        - paragraph [ref=e72]: What We Do
        - heading "Complete Plumbing Solutions for Sarjapur & Bangalore" [level=2] [ref=e73]:
          - text: Complete Plumbing Solutions
          - text: for Sarjapur & Bangalore
        - paragraph [ref=e74]: From routine maintenance to after-hours emergencies — we handle every plumbing need with precision and care.
      - generic [ref=e75]:
        - link "Drain cleaning services" [ref=e76] [cursor=pointer]:
          - /url: services.html#drain
          - img [ref=e78]
          - heading "Drain Cleaning" [level=3] [ref=e80]
          - paragraph [ref=e81]: Hydro-jetting and drain snaking for blocked kitchen drains, bathroom drains, floor traps and underground lines.
          - generic [ref=e82]: Learn more →
        - link "Leak repair services" [ref=e83] [cursor=pointer]:
          - /url: services.html#leak
          - img [ref=e85]
          - heading "Leak Repairs" [level=3] [ref=e88]
          - paragraph [ref=e89]: Fast detection and repair of pipe leaks, tap drips, concealed leaks and overhead tank leaks before damage spreads.
          - generic [ref=e90]: Learn more →
        - link "Pipe installation services" [ref=e91] [cursor=pointer]:
          - /url: services.html#pipe
          - img [ref=e93]
          - heading "Pipe Installation" [level=3] [ref=e96]
          - paragraph [ref=e97]: New pipe laying, repiping and replacement using quality CPVC, UPVC and PPR materials for lasting results.
          - generic [ref=e98]: Learn more →
        - link "Water heater services" [ref=e99] [cursor=pointer]:
          - /url: services.html#water-heater
          - img [ref=e101]
          - heading "Water Heaters" [level=3] [ref=e104]
          - paragraph [ref=e105]: Installation, repair and servicing of instant geysers, storage geysers and solar heaters of all brands.
          - generic [ref=e106]: Learn more →
        - link "24/7 emergency plumbing" [ref=e107] [cursor=pointer]:
          - /url: services.html#emergency
          - img [ref=e109]
          - heading "24/7 Emergency" [level=3] [ref=e111]
          - paragraph [ref=e112]: Burst pipes, flooding, sewer backups — we're available round the clock when you need urgent help fast.
          - generic [ref=e113]: Call now →
        - link "View all plumbing services" [ref=e114] [cursor=pointer]:
          - /url: services.html
          - generic [ref=e115]: View All Services →
  - region "Work Done Right. Every Time." [ref=e116]:
    - generic [ref=e117]:
      - generic [ref=e118]:
        - img "Certified plumber repairing pipes in a Bangalore home" [ref=e119]
        - generic [ref=e120]:
          - strong [ref=e121]: 15+
          - generic [ref=e122]:
            - text: Years Serving
            - text: Your Community
      - generic [ref=e123]:
        - paragraph [ref=e124]: Why Choose Us
        - heading "Work Done Right. Every Time." [level=2] [ref=e125]:
          - text: Work Done Right.
          - emphasis [ref=e126]: Every Time.
        - paragraph [ref=e127]: We've built our reputation on honest pricing, fast response, and quality craftsmanship that stands the test of time across Bangalore.
        - list [ref=e128]:
          - listitem [ref=e129]:
            - img [ref=e131]
            - generic [ref=e133]:
              - strong [ref=e134]: 60-Minute Emergency Response
              - paragraph [ref=e135]: We arrive within 60 minutes for emergency calls in Sarjapur and nearby Bangalore areas — day or night, every day of the year.
          - listitem [ref=e136]:
            - img [ref=e138]
            - generic [ref=e140]:
              - strong [ref=e141]: Upfront, Transparent Pricing
              - paragraph [ref=e142]: We give you a full quote before starting any work. What you're quoted is what you pay — no hidden charges, no surprises.
          - listitem [ref=e143]:
            - img [ref=e145]
            - generic [ref=e147]:
              - strong [ref=e148]: Certified & Background-Checked Technicians
              - paragraph [ref=e149]: Every plumber on our team is trained, certified, and vetted — so you always know who's in your home.
          - listitem [ref=e150]:
            - img [ref=e152]
            - generic [ref=e154]:
              - strong [ref=e155]: Workmanship Guarantee
              - paragraph [ref=e156]: All repairs and installations come backed by our workmanship guarantee — if something isn't right, we fix it.
        - link "Our Story" [ref=e157] [cursor=pointer]:
          - /url: about.html
  - region "What Our Customers Say" [ref=e158]:
    - generic [ref=e159]:
      - generic [ref=e160]:
        - paragraph [ref=e161]: Customer Reviews
        - heading "What Our Customers Say" [level=2] [ref=e162]
        - paragraph [ref=e163]: Hundreds of happy customers across Sarjapur and Bangalore trust us for all their plumbing needs.
      - generic [ref=e164]:
        - article [ref=e165]:
          - generic "5 out of 5 stars" [ref=e166]: ★★★★★
          - paragraph [ref=e167]: "\"Had a major water leakage issue at home late in the evening. The team responded quickly, identified the problem, and fixed it efficiently. Excellent service and very professional staff.\""
          - generic [ref=e168]:
            - generic [ref=e169]: RK
            - generic [ref=e170]:
              - strong [ref=e171]: Rajesh K.
              - text: Homeowner, Sarjapur
        - article [ref=e172]:
          - generic "5 out of 5 stars" [ref=e173]: ★★★★★
          - paragraph [ref=e174]: "\"We hired YourNearBest Plumbing Services for maintenance work in our apartment complex. The plumbers were punctual, skilled, and completed the work without any disruption. Highly recommended.\""
          - generic [ref=e175]:
            - generic [ref=e176]: AS
            - generic [ref=e177]:
              - strong [ref=e178]: Anita S.
              - text: Apartment Association, Bellandur
        - article [ref=e179]:
          - generic "5 out of 5 stars" [ref=e180]: ★★★★★
          - paragraph [ref=e181]: "\"Transparent pricing, quality workmanship, and courteous service. The team explained the issue clearly and completed the repair on time. Very satisfied with the overall experience.\""
          - generic [ref=e182]:
            - generic [ref=e183]: VP
            - generic [ref=e184]:
              - strong [ref=e185]: Vikram P.
              - text: Business Owner, HSR Layout
  - region "Call to action" [ref=e186]:
    - generic [ref=e187]:
      - heading "Plumbing Emergency in Bangalore? We're Here 24/7." [level=2] [ref=e188]:
        - text: Plumbing Emergency in Bangalore?
        - emphasis [ref=e189]: We're Here 24/7.
      - paragraph [ref=e190]: Don't let a small leak become a costly problem. Call now or book online — we respond fast.
      - generic [ref=e191]:
        - link "Book a Service Online" [ref=e192] [cursor=pointer]:
          - /url: contact.html
        - link "📞 9902139101" [ref=e193] [cursor=pointer]:
          - /url: tel:+919902139101
  - region "Plumbing Services Across Bangalore" [ref=e194]:
    - generic [ref=e195]:
      - generic [ref=e196]:
        - paragraph [ref=e197]: Areas We Serve
        - heading "Plumbing Services Across Bangalore" [level=2] [ref=e198]
        - paragraph [ref=e199]: Local plumbers ready to serve residential, apartment, villa, office and commercial properties near you.
      - list "Service locations" [ref=e200]:
        - strong [ref=e201]: "Popular Locations:"
        - listitem [ref=e202]: Sarjapur
        - listitem [ref=e203]: Sarjapur Road
        - listitem [ref=e204]: Bellandur
        - listitem [ref=e205]: HSR Layout
        - listitem [ref=e206]: Electronic City
        - listitem [ref=e207]: Whitefield
        - listitem [ref=e208]: Marathahalli
        - listitem [ref=e209]: Koramangala
        - listitem [ref=e210]: Brookefield
        - listitem [ref=e211]: Varthur
        - listitem [ref=e212]: Dommasandra
        - listitem [ref=e213]: Haralur Road
      - paragraph [ref=e214]:
        - text: We provide
        - strong [ref=e215]: emergency plumbing repairs
        - text: ","
        - strong [ref=e216]: drain cleaning
        - text: ","
        - strong [ref=e217]: leak detection
        - text: ","
        - strong [ref=e218]: pipe replacement
        - text: ","
        - strong [ref=e219]: bathroom plumbing
        - text: ","
        - strong [ref=e220]: kitchen plumbing
        - text: and
        - strong [ref=e221]: water heater services
        - text: throughout Bangalore — with fast response times and fully transparent pricing.
  - region "Serving Your Area in Sarjapur, Bangalore" [ref=e222]:
    - generic [ref=e223]:
      - generic [ref=e224]:
        - paragraph [ref=e225]: Find Us
        - heading "Serving Your Area in Sarjapur, Bangalore" [level=2] [ref=e226]
      - iframe [ref=e228]
  - contentinfo [ref=e229]:
    - generic [ref=e230]:
      - generic [ref=e231]:
        - link "YourNearBest Plumbing Home" [ref=e232] [cursor=pointer]:
          - /url: index.html
          - text: YourNearBestPlumbing
        - paragraph [ref=e233]: Professional plumbing services you can trust — available 24/7 across Sarjapur and Bangalore.
        - link "Call us at 9902139101" [ref=e234] [cursor=pointer]:
          - /url: tel:+919902139101
          - text: 📞 9902139101
      - navigation "Footer site pages" [ref=e235]:
        - heading "Pages" [level=4] [ref=e236]
        - list [ref=e237]:
          - listitem [ref=e238]:
            - link "Home" [ref=e239] [cursor=pointer]:
              - /url: index.html
          - listitem [ref=e240]:
            - link "Services" [ref=e241] [cursor=pointer]:
              - /url: services.html
          - listitem [ref=e242]:
            - link "About Us" [ref=e243] [cursor=pointer]:
              - /url: about.html
          - listitem [ref=e244]:
            - link "FAQ" [ref=e245] [cursor=pointer]:
              - /url: faq.html
          - listitem [ref=e246]:
            - link "Contact" [ref=e247] [cursor=pointer]:
              - /url: contact.html
      - navigation "Footer services" [ref=e248]:
        - heading "Services" [level=4] [ref=e249]
        - list [ref=e250]:
          - listitem [ref=e251]:
            - link "Drain Cleaning" [ref=e252] [cursor=pointer]:
              - /url: services.html#drain
          - listitem [ref=e253]:
            - link "Leak Repair" [ref=e254] [cursor=pointer]:
              - /url: services.html#leak
          - listitem [ref=e255]:
            - link "Pipe Installation" [ref=e256] [cursor=pointer]:
              - /url: services.html#pipe
          - listitem [ref=e257]:
            - link "Water Heaters" [ref=e258] [cursor=pointer]:
              - /url: services.html#water-heater
          - listitem [ref=e259]:
            - link "Emergency Service" [ref=e260] [cursor=pointer]:
              - /url: services.html#emergency
      - generic [ref=e261]:
        - heading "Contact Us" [level=4] [ref=e262]
        - paragraph [ref=e263]:
          - text: Sarjapur Road,
          - text: near Sarjapur Police Station,
          - text: Bangalore – 560035
        - paragraph [ref=e264]:
          - link "9902139101" [ref=e265] [cursor=pointer]:
            - /url: tel:+919902139101
        - paragraph [ref=e266]:
          - link "yournearbestplumbingservices@gmail.com" [ref=e267] [cursor=pointer]:
            - /url: mailto:yournearbestplumbingservices@gmail.com
        - paragraph [ref=e268]:
          - text: "Mon–Sun: 24/7 Emergency"
          - text: "Office Hours: 8am – 6pm"
    - paragraph [ref=e270]:
      - text: © 2026 YourNearBest Plumbing Services. Professional plumbing services in
      - link "Sarjapur, Sarjapur Road, Bellandur, HSR Layout, Electronic City and Bangalore" [ref=e271] [cursor=pointer]:
        - /url: services.html
      - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { HomePage } from '../pages/homePage';
  3  | 
  4  | /**
  5  |  * HOME PAGE TESTS
  6  |  * Checks the things a real visitor would notice first: does the page
  7  |  * load, is the phone number clickable, do the main buttons work.
  8  |  */
  9  | test.describe('Home Page', () => {
  10 |   test('Home page loads and shows the main heading', async ({ page }) => {
  11 |     const home = new HomePage(page);
  12 |     await home.open();
  13 |     await expect(page.locator(home.heroHeading)).toBeVisible();
  14 |   });
  15 | 
  16 |   test('Top navigation shows all 5 expected links', async ({ page }) => {
  17 |     const home = new HomePage(page);
  18 |     await home.open();
> 19 |     await expect(page.locator(home.navHome)).toBeVisible();
     |                                              ^ Error: expect(locator).toBeVisible() failed
  20 |     await expect(page.locator(home.navServices)).toBeVisible();
  21 |     await expect(page.locator(home.navAbout)).toBeVisible();
  22 |     await expect(page.locator(home.navFaq)).toBeVisible();
  23 |     await expect(page.locator(home.navBookNow)).toBeVisible();
  24 |   });
  25 | 
  26 |   test('"Book a Service" button is visible and links to the Book Now page', async ({ page }) => {
  27 |     const home = new HomePage(page);
  28 |     await home.open();
  29 |     const button = page.locator(home.bookAServiceButton).first();
  30 |     await expect(button).toBeVisible();
  31 |     await expect(button).toHaveAttribute('href', /contact\.html/);
  32 |   });
  33 | 
  34 |   test('"Call Now" button has a working phone number link', async ({ page }) => {
  35 |     const home = new HomePage(page);
  36 |     await home.open();
  37 |     const callButton = page.locator(home.callNowButton).first();
  38 |     await expect(callButton).toHaveAttribute('href', /^tel:\+?\d+/);
  39 |   });
  40 | 
  41 |   test('Homepage shows at least 6 service preview cards', async ({ page }) => {
  42 |     const home = new HomePage(page);
  43 |     await home.open();
  44 |     const count = await page.locator(home.servicePreviewCards).count();
  45 |     expect(count).toBeGreaterThanOrEqual(6);
  46 |   });
  47 | });
  48 | 
```