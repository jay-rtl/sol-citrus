# Sol & Citrus — website upgrade

An editorial, responsive local implementation of the existing [Sol & Citrus website](https://www.sol-and-citrus.com/). The supplied workspace was empty: original Wix source and account access were not provided. Original assets and approved business information were recovered from the public site before implementation. This work does not modify the live Wix site.

## Run

```powershell
npm install
npm run dev
```

Build with `npm run build`. The deployment directory is `dist/`, including prerendered home, menu, and contact HTML. A static host should serve `/menu` and `/contact` from their respective `index.html` files while retaining the original URLs. `vite.config.js` supplies these route mappings for the local production preview. `npm run preview` serves the production build locally.

## Implementation

- `src/components.js`: original-logo header, accessible native dialog navigation, shared buttons, headings, image frames, booking CTA, footer.
- `src/pages.js`: home, menu, contact/pricing layouts.
- `src/data.js`: source-grounded menu, experience categories, contact and social links.
- `src/styles.css`: responsive ivory/espresso/citrus design, serif/sans typography, focus states, subtle hover and native cross-document transitions.
- `src/motion.js`: GSAP/ScrollTrigger logo intro, headline masks, alternating image masks, scale, scroll reveals, desktop hero parallax. Uses matchMedia and GSAP context cleanup. No pinning or continuous loops.
- `src/navigation.js`: mobile navigation, scroll locking, native focus containment and Escape, return focus, responsive cleanup.
- `scripts/prerender.mjs`: crawlable static content and distinct title, description, canonical, OpenGraph metadata for each page.
- `public/assets/`: optimized original AVIF imagery with WebP fallbacks and smaller responsive variants; self-hosted fonts and licenses.
- `source-assets/`: untouched original downloads for reference; excluded from deployment.

## Content and source audit

Public source: Wix, with Home `/`, Menu `/menu`, Contact & Pricing `/contact`, plus existing legal pages. Original palette uses cream/off-white, organic green, and warm logo tones. The published site includes Ogg, Neue Haas Grotesk, IBM Plex Sans and Wix font declarations; licensed local font files were not provided. The upgrade uses Cormorant Garamond and DM Sans with system fallbacks.

Preserved: original raster logo, original photography, four experience categories plus collaborations, ten published lemonade/coffee/matcha menu items, ingredients, milk/sweetener choices, contact details, social destinations, starting rate of $150/hour, three-hour minimum, Hallandale Beach base and approximately 40-mile service area. No testimonials, awards, clients, event counts or prices were invented.

## Booking and legal pages

Booking CTAs open the new on-site event inquiry form at `/contact#inquiry`. It preserves the original event fields and uses native validation. The user selected email-app submission: preparing the inquiry produces a reviewable email draft addressed to `sc.hospitality.usa@gmail.com`. Visitors choose Open email app and send it themselves. Copy inquiry provides a fallback. Nothing is submitted to Wix or a third-party service, and the UI never claims an email was delivered.

Privacy Policy, Terms of Service, and Accessibility Statement are native pages containing the original published client legal text from `src/legal-content.js`. Their footer links remain inside this deployment.

## Validation

```powershell
npm run build
npm run lint
npm test
npm run test:browser
node scripts/accessibility-qa.mjs
```

Browser scripts use installed Google Chrome. Start the local server first. `QA_URL` can point the responsive suite at a production preview. Browser verification covers all three pages at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px; images, overflow, heading structure, reduced motion, session intro, navigation, keyboard Escape, scroll lock, focus restoration and browser back. Screenshots and accessibility audit output are saved to `qa/`. No TypeScript configuration or pre-existing tests were present.

The full intro runs once per tab session; the logo overlay exits after approximately 1.55 seconds while the overlapping entrance finishes in approximately 2.3 seconds. It does not capture input. Reduced-motion visitors skip it and all GSAP motion. Mobile hero image scale and parallax are disabled. Below-fold imagery is lazy-loaded; frame aspect ratios reserve image space. Fonts are self-hosted; the hero preload matches responsive AVIF sources. Production markup is enhanced without replacing the prerendered DOM. Email delivery happens in the visitor?s email app; no test inquiry was sent.

See `DELIVERY.md` for the complete handoff, audit results, assumptions, and integration requirements.

## GitHub Pages

The `main` branch deploys through `.github/workflows/deploy.yml` to `https://jay-rtl.github.io/sol-citrus/`. The workflow builds with `SITE_BASE_PATH=/sol-citrus/`, runs lint and content tests, and publishes `dist/`. Local development continues to use the root URL. To preview the Pages build locally, set `SITE_BASE_PATH=/sol-citrus/` before `npm run build` and `npm run preview`. Original-domain canonicals and business structured data remain intact. Booking and legal navigation stay inside the new site.
