# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests/services.spec.ts >> Services Page >> Services page shares the same top navigation as the rest of the site
- Location: tests/services.spec.ts:38:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('nav').locator('text=Book Now')
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('nav').locator('text=Book Now')
    14 × locator resolved to <a class="nav-cta" href="contact.html">Book Now</a>
       - unexpected value "hidden"

```

```yaml
- navigation "Main navigation":
  - link "YourNearBest Plumbing Home":
    - /url: index.html
    - text: YourNearBestPlumbing
  - button "Toggle navigation menu"
- region "Services page hero":
  - paragraph: What We Offer
  - heading "Complete Plumbing Services" [level=1]:
    - text: Complete Plumbing
    - emphasis: Services
  - paragraph: From commercial fit-outs and contractor partnerships to everyday repairs and round-the-clock emergencies — every plumbing need across Sarjapur & Bangalore, handled with expertise.
- region:
  - img "Commercial plumbing services for offices and businesses in Sarjapur Bangalore"
  - text: "01"
  - heading "Commercial Plumbing" [level=2]
  - paragraph: Professional plumbing services for offices, restaurants, retail stores, hotels, schools, hospitals and other commercial properties across Sarjapur, Bellandur, HSR Layout and Electronic City. We handle installations, repairs, maintenance and emergency plumbing with minimal disruption to business operations.
  - list:
    - listitem: ✓ Office & corporate building plumbing
    - listitem: ✓ Restaurant & commercial kitchen plumbing
    - listitem: ✓ Hotel & hospitality plumbing systems
    - listitem: ✓ Commercial leak detection & repair
    - listitem: ✓ High-capacity drainage maintenance
    - listitem: ✓ Water supply line installation
    - listitem: ✓ Annual maintenance contracts (AMC)
  - link "Request a Quote":
    - /url: contact.html
  - img "Contractor and new construction plumbing services in Bangalore"
  - text: "02"
  - heading "Contractor Plumbing" [level=2]
  - paragraph: Trusted plumbing partner for builders, developers and contractors across Bangalore. We handle complete plumbing for new constructions, housing projects, apartment complexes and commercial builds — from foundation rough-in to final fit-out, delivered on schedule and to specification.
  - list:
    - listitem: ✓ New construction rough-in & fit-out
    - listitem: ✓ Multi-floor residential & apartment plumbing
    - listitem: ✓ Builder-grade supply & drainage systems
    - listitem: ✓ Underground & slab plumbing
    - listitem: ✓ Site coordination with civil contractors
    - listitem: ✓ Pressure testing & sign-off inspections
    - listitem: ✓ Project-based billing & scheduling
  - link "Partner With Us":
    - /url: contact.html
  - img "Drain cleaning service in Sarjapur and Bangalore"
  - text: "03"
  - heading "Drain Cleaning" [level=2]
  - paragraph: Clogged drains are more than an inconvenience — they can lead to water damage and health hazards. Our professional drain cleaning services clear blockages fast and keep your system flowing freely across Sarjapur, Bellandur and HSR Layout.
  - list:
    - listitem: ✓ Hydro-jetting for deep clogs
    - listitem: ✓ Sink & bathtub drain clearing
    - listitem: ✓ Floor drain & floor trap maintenance
    - listitem: ✓ Kitchen grease trap cleaning
    - listitem: ✓ Camera inspection available
    - listitem: ✓ Preventive maintenance plans
  - link "Book Service":
    - /url: contact.html
  - img "Leak detection and repair service in Bangalore"
  - text: "04"
  - heading "Leak Repair & Detection" [level=2]
  - paragraph: Even a small leak can waste thousands of litres of water and cause significant structural damage. We use advanced leak detection technology to find and fix leaks quickly — including concealed pipe leaks and overhead tank leaks common in Bangalore apartments.
  - list:
    - listitem: ✓ Faucet & tap leak repair
    - listitem: ✓ Concealed pipe leak detection
    - listitem: ✓ Under-slab leak detection
    - listitem: ✓ Toilet & cistern leak repair
    - listitem: ✓ Overhead tank leak fixing
    - listitem: ✓ Thermal imaging detection
  - link "Book Service":
    - /url: contact.html
  - img "Pipe installation and repiping in Sarjapur Bangalore"
  - text: "05"
  - heading "Pipe Installation & Repiping" [level=2]
  - paragraph: Whether you're building new or replacing old corroded pipes, our certified plumbers install durable piping systems that last. We work with CPVC, UPVC, PPR and copper to suit every home and commercial requirement in Bangalore.
  - list:
    - listitem: ✓ New construction plumbing rough-in
    - listitem: ✓ Full home & apartment repiping
    - listitem: ✓ CPVC, UPVC & PPR installation
    - listitem: ✓ Gas line installation & testing
    - listitem: ✓ Commercial pipe systems
    - listitem: ✓ Pressure testing & inspection
  - link "Book Service":
    - /url: contact.html
  - img "Water heater geyser repair and installation in Bangalore"
  - text: "06"
  - heading "Water Heater Services" [level=2]
  - paragraph: No hot water? We service, repair and install all types of geysers and water heaters including instant geysers, storage geysers and solar heaters — covering all major brands used in Bangalore homes and apartments.
  - list:
    - listitem: ✓ Instant & storage geyser installation
    - listitem: ✓ Geyser repair — all brands
    - listitem: ✓ Solar water heater servicing
    - listitem: ✓ Thermostat & element replacement
    - listitem: ✓ Anode rod replacement
    - listitem: ✓ Annual flushing & maintenance
  - link "Book Service":
    - /url: contact.html
  - img "Bathroom plumbing installation and repair in Bangalore"
  - text: "07"
  - heading "Bathroom Plumbing" [level=2]
  - paragraph: Complete bathroom plumbing for renovations, repairs and new installs. We handle everything from toilet replacements to full bathroom remodels — with precision and care — across apartments and villas in Sarjapur and Bangalore.
  - list:
    - listitem: ✓ Toilet installation & repair
    - listitem: ✓ Shower & bathtub installation
    - listitem: ✓ Vanity & wash basin plumbing
    - listitem: ✓ Bathroom remodel rough-in
    - listitem: ✓ Bidet & health faucet installation
    - listitem: ✓ Shower pressure balancing
  - link "Book Service":
    - /url: contact.html
  - img "Kitchen plumbing services in Sarjapur Bangalore"
  - text: "08"
  - heading "Kitchen Plumbing" [level=2]
  - paragraph: Whether you're upgrading your kitchen or dealing with a blocked sink, our team handles all kitchen plumbing efficiently without disrupting your day — from modular kitchen fit-outs to quick tap replacements.
  - list:
    - listitem: ✓ Sink installation & repair
    - listitem: ✓ Modular kitchen plumbing
    - listitem: ✓ Garbage disposal service
    - listitem: ✓ Dishwasher hook-up
    - listitem: ✓ Refrigerator water line
    - listitem: ✓ Tap & faucet replacement
  - link "Book Service":
    - /url: contact.html
  - img "24/7 emergency plumbing services in Sarjapur and Bangalore"
  - text: "09"
  - heading "24/7 Emergency Plumbing" [level=2]
  - paragraph: Plumbing emergencies don't wait for business hours. Burst pipes, flooding, sewer backups, gas leaks — we dispatch immediately across Sarjapur, Bellandur, HSR Layout, Electronic City and Whitefield to minimise damage and restore safety fast.
  - list:
    - listitem: ✓ Burst pipe repair
    - listitem: ✓ Flooding & water damage response
    - listitem: ✓ Gas line emergencies
    - listitem: ✓ Sewage backup & overflow
    - listitem: ✓ No hot water — geyser emergency
    - listitem: ✓ 60-minute response guarantee
  - link "Call Now — We're Available":
    - /url: tel:+919902139101
- region "Pricing information":
  - heading "Honest, Upfront Pricing" [level=2]
  - paragraph: We provide free estimates and clear quotes before any work begins — for both residential and commercial jobs. No hidden charges, no surprises.
  - link "Get a Free Quote":
    - /url: contact.html
- region "Plumbing Services Across Bangalore":
  - paragraph: Areas We Cover
  - heading "Plumbing Services Across Bangalore" [level=2]
  - paragraph: Residential, apartment, villa, office and commercial plumbing — available near you across Bangalore's key localities.
  - list "Service locations":
    - strong: "Popular Locations:"
    - listitem: Sarjapur
    - listitem: Sarjapur Road
    - listitem: Bellandur
    - listitem: HSR Layout
    - listitem: Electronic City
    - listitem: Whitefield
    - listitem: Marathahalli
    - listitem: Koramangala
    - listitem: Brookefield
    - listitem: Varthur
    - listitem: Dommasandra
    - listitem: Haralur Road
- contentinfo:
  - link "YourNearBest Plumbing Home":
    - /url: index.html
    - text: YourNearBestPlumbing
  - paragraph: Professional plumbing services you can trust — licensed, insured and available 24/7 across Sarjapur and Bangalore.
  - link "Call us at 9902139101":
    - /url: tel:+919902139101
    - text: 📞 9902139101
  - navigation "Footer site pages":
    - heading "Pages" [level=4]
    - list:
      - listitem:
        - link "Home":
          - /url: index.html
      - listitem:
        - link "Services":
          - /url: services.html
      - listitem:
        - link "About Us":
          - /url: about.html
      - listitem:
        - link "FAQ":
          - /url: faq.html
      - listitem:
        - link "Contact":
          - /url: contact.html
  - navigation "Footer services":
    - heading "Services" [level=4]
    - list:
      - listitem:
        - link "Commercial Plumbing":
          - /url: "#commercial"
      - listitem:
        - link "Contractor Plumbing":
          - /url: "#contractor"
      - listitem:
        - link "Drain Cleaning":
          - /url: "#drain"
      - listitem:
        - link "Leak Repair":
          - /url: "#leak"
      - listitem:
        - link "Pipe Installation":
          - /url: "#pipe"
      - listitem:
        - link "Water Heaters":
          - /url: "#water-heater"
      - listitem:
        - link "Emergency Service":
          - /url: "#emergency"
  - heading "Contact Us" [level=4]
  - paragraph: Sarjapur Road, near Sarjapur Police Station, Bangalore – 560035
  - paragraph:
    - link "9902139101":
      - /url: tel:+919902139101
  - paragraph:
    - link "yournearbestplumbingservices@gmail.com":
      - /url: mailto:yournearbestplumbingservices@gmail.com
  - paragraph: "Mon–Sun: 24/7 Emergency Office Hours: 8am – 6pm"
  - paragraph:
    - text: © 2026 YourNearBest Plumbing Services. Professional plumbing services in
    - link "Sarjapur, Sarjapur Road, Bellandur, HSR Layout, Electronic City and Bangalore":
      - /url: services.html
    - text: .
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import { ServicesPage } from '../pages/servicesPage';
  3  | 
  4  | /**
  5  |  * SERVICES PAGE TESTS
  6  |  * Confirms every one of the 9 services is actually listed on the page,
  7  |  * and that each one has a working "Book Service" call to action.
  8  |  */
  9  | test.describe('Services Page', () => {
  10 |   test('Services page loads and shows the main heading', async ({ page }) => {
  11 |     const services = new ServicesPage(page);
  12 |     await services.open();
  13 |     await expect(page.locator(services.pageHeading)).toBeVisible();
  14 |   });
  15 | 
  16 |   test('All 9 individual services are listed on the page', async ({ page }) => {
  17 |     const services = new ServicesPage(page);
  18 |     await services.open();
  19 |     for (const heading of services.serviceHeadings) {
  20 |       await expect(page.locator(`text=${heading}`).first()).toBeVisible();
  21 |     }
  22 |   });
  23 | 
  24 |   test('Every service section has a "Book Service" or quote link', async ({ page }) => {
  25 |     const services = new ServicesPage(page);
  26 |     await services.open();
  27 |     const count = await page.locator(services.bookServiceLinks).count();
  28 |     expect(count).toBeGreaterThan(0);
  29 |   });
  30 | 
  31 |   test('"Get a Free Quote" button links to the Book Now page', async ({ page }) => {
  32 |     const services = new ServicesPage(page);
  33 |     await services.open();
  34 |     const button = page.locator(services.getFreeQuoteButton).first();
  35 |     await expect(button).toHaveAttribute('href', /contact\.html/);
  36 |   });
  37 | 
  38 |   test('Services page shares the same top navigation as the rest of the site', async ({ page }) => {
  39 |     const services = new ServicesPage(page);
  40 |     await services.open();
> 41 |     await expect(page.locator('nav >> text=Book Now')).toBeVisible();
     |                                                        ^ Error: expect(locator).toBeVisible() failed
  42 |   });
  43 | });
  44 | 
```