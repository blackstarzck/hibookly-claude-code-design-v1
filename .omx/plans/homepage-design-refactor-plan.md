# Bookly Homepage Design Refactor Plan

## Requirements Summary

- Keep the current React/Vite stack and single-page section flow.
- Refactor homepage design with code structure and rendered screen quality considered together.
- Preserve the cinematic publishing-agency direction, but improve readability, responsive behavior, content fidelity, and maintainability.

## Evidence

- Page composition is hardcoded in `src/App.tsx`; `AboutStats` is rendered outside any semantic section between `Hero` and `About`.
- Global page snap is enabled in `src/styles/styles.css`, and every `.section` has fixed `height: 100vh`.
- Mobile Playwright metrics show content overflow inside fixed-height sections: `about` scrollHeight 1077 vs height 844, `story` 1416 vs 844, `network` 966 vs 844, `showcase` 926 vs 844, `contact` 1459 vs 844.
- Desktop screenshots show weak contrast in `story` and muted dark sections after fixed nav overlay.
- `docs/contents.md` contains source content that differs from implemented fake/placeholder data in books, contact, network, and business area copy.

## Acceptance Criteria

- At 390x844, 768x1024, 1440x900, and 1920x1080, no section clips essential content and `documentElement.scrollWidth === clientWidth`.
- Hero headline, nav, CTA, and key copy are fully visible after initial animations complete.
- `story`, `network`, and `contact` text contrast meets WCAG AA for normal text where practical.
- Content shown in UI matches `docs/contents.md` or is explicitly marked as placeholder data.
- Reusable content arrays/types are moved out of presentational components where this reduces duplication.
- `npm run build` passes, and Playwright screenshot checks cover desktop and mobile.

## Implementation Steps

1. Rebuild section rhythm.
   - Replace global `height: 100vh` with `min-height` and content-aware padding.
   - Disable or narrow `scroll-snap` for content-heavy/mobile sections.
   - Add section-specific mobile spacing so long content can flow naturally.

2. Repair semantic page structure.
   - Move stats into the About section or wrap them in their own semantic section with heading/context.
   - Add missing section title/intro copy from `docs/contents.md` for agency introduction.

3. Align content with source document.
   - Replace placeholder business copy with the four business areas from `docs/contents.md`.
   - Replace fake book data with export-success/new-title content where assets exist.
   - Update contact regions, names, emails, and offices to match confirmed source content or mark unknowns clearly.

4. Refactor data and component boundaries.
   - Create a small `src/content/` layer for nav links, stats, services, network cards, books, news, and contact data.
   - Keep UI components focused on layout/rendering.
   - Remove inline style exceptions such as the `Story` quote span color by moving them to CSS classes.

5. Refine visual system.
   - Keep brand teal and paper tones, but reduce the beige-on-beige low-contrast sections.
   - Make dark sections clearer with stronger foreground values and less opaque decorative backdrop text.
   - Normalize button styles and CTA hierarchy across hero/showcase/contact.

6. Improve responsive navigation.
   - Add a mobile menu or a compact section-jump control; current mobile nav hides links and leaves only contact CTA.
   - Ensure fixed nav background state has enough contrast on both hero and light sections.

7. Verify with build and visual checks.
   - Run `npm run build`.
   - Use Playwright screenshots for top/about/story/network/showcase/books/contact on desktop and key mobile sections.
   - Check console logs for runtime warnings.

## Risks And Mitigations

- Content uncertainty: `docs/contents.md` flags unconfirmed emails and placeholder company names. Keep these as explicit placeholders rather than inventing final data.
- Motion and snap regressions: preserve existing animation components, but gate motion with `prefers-reduced-motion` and verify scroll behavior manually.
- Asset mismatch: some current showcase images are real covers, while `Books.tsx` uses gradient placeholders. Use only existing assets first; do not add dependencies.

## Verification Plan

- `npm run build`
- Playwright desktop screenshots at 1440x900 for all sections.
- Playwright mobile screenshots at 390x844 for hero, about, story, contact.
- DOM metrics: no horizontal overflow and no fixed-height section clipping of important content.
