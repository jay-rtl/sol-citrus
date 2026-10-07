# Sol & Citrus delivery

## Design upgrade

Warm ivory, espresso and muted citrus; large editorial serif headings; original photography in an immersive split hero; generous spacing; asymmetrical experience cards; partnerships; booking conversion section; and a refined footer. Home, Menu, and Contact & Pricing preserve the original route names and approved business positioning.

## Files and reusable components

All files are new because the supplied workspace was empty. Application files: `index.html`, `src/main.js`, `src/styles.css`, `src/fonts.css`, `src/data.js`, `src/asset-metadata.js`, `src/pages.js`, `src/components.js`, `src/motion.js`, and `src/navigation.js`. Tooling: `package.json`, `package-lock.json`, `vite.config.js`, `eslint.config.js`, `.gitignore`, `scripts/`, and `tests/`. SEO: `public/robots.txt`, `public/sitemap.xml`. Assets: `public/assets/` and archival `source-assets/`.

Reusable components include header, native-dialog mobile navigation, button, masked heading, responsive picture, closing booking section, and footer. Page renderers and source content are separate from animation and navigation logic.

## Motion

GSAP and ScrollTrigger power the original-logo intro, staggered heading masks, navigation and copy entrances, alternating image masks, gentle image scale and scroll reveals. The logo overlay exits after approximately 1.55 seconds, overlapping the hero entrance; the complete entrance lasts approximately 2.3 seconds after animation initialization. Full intro appears once per tab session. Hero image scale and subtle parallax are limited to desktop. Native cross-document transitions progressively enhance supported browsers. Animations clean up through GSAP contexts and matchMedia.

## Responsive, performance, and accessibility

All requested widths were checked: 320, 375, 390, 430, 768, 1024, 1280, 1440, and 1920px. Mobile uses stacked layouts, accessible full-screen navigation, scroll locking, and simpler motion. There are no pinned mobile sections.

Original photos use AVIF with WebP fallbacks, responsive variants, lazy loading below the fold, a matching critical hero preload, fixed image frames, and intrinsic dimensions. Fonts are self-hosted with local license files, bundled definitions, and system fallbacks. Prerendered production content is enhanced without replacing the DOM. Production JavaScript is approximately 57 KB gzipped and CSS approximately 5.4 KB gzipped.

Semantic headings, alt text, focus states, native dialog focus containment, Escape dismissal, focus restoration, larger footer touch targets and reduced-motion support were verified. Axe audits found no WCAG A/AA violations on the three pages at desktop/mobile widths or in the open mobile menu. Automated audits do not replace comprehensive human accessibility testing.

## Validation

- Production build and ESLint passed.
- Five content, booking, route-prefix and production SEO tests passed.
- Browser checks passed: actual page content and served prerendered route metadata, all routes and nine widths, image loading, horizontal overflow, mobile menu, keyboard Escape, scroll locking, focus restoration, navigation, browser back, session intro, reduced motion and no JavaScript runtime errors.
- Desktop and mobile screenshots are in `qa/`.
- Design audit mobile Lighthouse: **87 performance, 100 accessibility, 100 best practices, 100 SEO**. This is a local production-preview result with Lighthouse mobile throttling and the first-session intro active; hosted results can vary. Detailed output: `qa/lighthouse-mobile.json`.
- Page-specific titles, descriptions, canonicals, OpenGraph content, original LocalBusiness structured data, robots and sitemap are retained or provided.
- No pre-existing tests or TypeScript setup were present; type checking is not applicable to this JavaScript project.

## Assumptions and remaining integration

The supplied folder contained no repository or client assets. The live Wix site served as the source of truth. Original fonts were replaced with open-source editorial fonts because licensed font files were not supplied. No stock or AI-generated photography was added. No awards, testimonials, statistics, partnerships, menu items or prices were invented.

Booking now opens the new on-site form at `/contact#inquiry`, using the event fields recovered from the original client site. As requested, submission prepares an email draft for the visitor?s own email app; visitors must send it themselves. Native required-field, email, date and minimum-duration validation is present. The draft can also be copied, and edits invalidate a prepared draft to avoid sending stale details. No backend, third-party service, fake success state or actual test email was introduced.

Legal pages are hosted inside the new deployment using the original approved content. User-facing booking and legal navigation no longer links to the previous site. Source content and metadata retain the client?s original domain for brand and SEO continuity.

To preview: `npm run dev`. GitHub Pages deployment is configured in `.github/workflows/deploy.yml` at `https://jay-rtl.github.io/sol-citrus/`, with the repository prefix applied to assets and internal links. This separate deployment leaves the original Wix site unchanged.
