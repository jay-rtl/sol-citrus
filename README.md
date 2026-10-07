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

## Booking and legal handoff

The original inquiry is a Wix-managed form (`d2ffcc6c-fbca-417d-af18-c8a45f6f23e6`). The upgraded contact page links directly to that original form and retains phone/email contact. Submission, validation, delivery, and success handling remain with the original form. No fake submission or success message was introduced. Replacing the inline Wix form requires its supported integration or account/source access.

Privacy Policy, Terms of Service, and Accessibility Statement retain their original live destinations. Before replacing the original domain's hosting, migrate those pages and integrate a supported booking endpoint: the contact form handoff currently depends on the original Wix page remaining reachable. The separate GitHub Pages deployment leaves the original Wix site available.

## Validation

```powershell
npm run build
npm run lint
npm test
npm run test:browser
node scripts/accessibility-qa.mjs
```

Browser scripts use installed Google Chrome. Start the local server first. `QA_URL` can point the responsive suite at a production preview. Browser verification covers all three pages at 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px; images, overflow, heading structure, reduced motion, session intro, navigation, keyboard Escape, scroll lock, focus restoration and browser back. Screenshots and accessibility audit output are saved to `qa/`. No TypeScript configuration or pre-existing tests were present.

The full intro runs once per tab session; the logo overlay exits after approximately 1.55 seconds while the overlapping entrance finishes in approximately 2.3 seconds. It does not capture input. Reduced-motion visitors skip it and all GSAP motion. Mobile hero image scale and parallax are disabled. Below-fold imagery is lazy-loaded; frame aspect ratios reserve image space. Fonts are self-hosted; the hero preload matches responsive AVIF sources. Production markup is enhanced without replacing the prerendered DOM. Legal pages and delivery of a genuine inquiry remain external verification limits; no test inquiry was sent.

See `DELIVERY.md` for the complete handoff, audit results, assumptions, and integration requirements.

## GitHub Pages

The `main` branch deploys through `.github/workflows/deploy.yml` to `https://jay-rtl.github.io/sol-citrus/`. The workflow builds with `SITE_BASE_PATH=/sol-citrus/`, runs lint and content tests, and publishes `dist/`. Local development continues to use the root URL. To preview the Pages build locally, set `SITE_BASE_PATH=/sol-citrus/` before `npm run build` and `npm run preview`. Original-domain canonicals, business structured data, booking and legal destinations remain intact.
