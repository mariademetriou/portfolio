# Maria Demetriou — Portfolio Website

A responsive static portfolio website built with HTML, CSS and vanilla JavaScript.

## Main pages
- `index.html` — Home
- `work.html` — Work overview
- `about.html` — About
- `contact.html` — Contact
- `content.html` — Additional creative/video work
- `social-blueprint.html` — Social Blueprint

## Featured case studies
- `case-studies/complytek.html`
- `case-studies/brideloop.html`
- `case-studies/rng.html`

## Selected client projects
- `projects/hills.html`
- `projects/bank-of-cyprus.html`
- `projects/collaroid.html`

## Interactive local preview
Open `preview.html` to view the whole site inside one interface and switch between every page.

## Latest revision
- Additional Creative Work on the Work page now opens the Google Drive video portfolio in a new tab.
- Complytek and RnG official logos are now used on the homepage Selected Work cards.
- Project-card logos use consistent flex centring with small optical adjustments where needed.
- All project and case-study pages use a more centred editorial composition.
- Scroll reveals, hero staggering, card/logo motion, video hover cues and metric animations were refined while respecting `prefers-reduced-motion`.
- Hill’s Pet Nutrition now includes the verified performance metrics plus four additional TikTok videos in a responsive video grid.
- Section colour changes were softened into continuous lavender / baby-blue gradient transitions.
- Vertical spacing was reduced across the site for faster browsing on desktop and mobile.

## Notes
- Instagram and TikTok embeds require an internet connection and public access to the source posts.
- The BrideLoop buyer campaign is hosted locally in `assets/videos/brideloop-buyer-campaign.mp4`.
- Project logos use the provided brand assets without recolouring or distortion.
- The site is static and can be deployed on Netlify, Vercel, GitHub Pages or any standard web host.


## Revision 5
- Added selected Complytek LinkedIn impact metrics to the homepage.
- Added Q3 vs Q2 2026 LinkedIn performance KPIs to the Complytek case study.
- Replaced Complytek website gallery with four current screenshots in responsive browser mockups.
- Preserved the compact desktop and mobile spacing from Revision 4.


## Revision 6 (polish and art direction)
Not a redesign: every page, project, link, video, logo, screenshot and verified metric is preserved.

**Visual cleanup**
- Removed all decorative elements: the blob and ring behind the portrait, the floating capability chips, the circle in the Social Blueprint card, hairlines on the typographic card and the dots on eyebrows. Nothing similar was added in their place.
- The five capabilities now sit as a tag row under the hero buttons, and the portrait sits on a clean gradient panel. The portrait can never overlap the text.
- Decorative em dashes in visible copy became colons or commas (meaning unchanged).

**Design system**
- The five layered stylesheets (R1 to R5, with many `!important` overrides) are consolidated into one system in `css/styles.css`, with breakpoints in `css/responsive.css`. All existing class names are kept.
- One 1240px container across the site; project and case pages are centred at 1050px; body text runs at 800px.
- One continuous background canvas; section tints fade out on every edge, so there are no hard boundaries.
- Logo panels use each logo's own brand colour, so logo tiles read as one surface. Logos are not recoloured.
- Case and project pages use a centred header with a wide brand cover panel.
- Complytek: realistic browser mockups, with one primary window, two supporting windows slightly layered and the wide page in full beneath. They stack without overlap on mobile.

**Motion** (IntersectionObserver plus CSS, no libraries)
- Staggered hero entrance, scroll reveals, logo scale-in and browser mockup entrance.
- KPI counters, always formatted in English, so a Greek-locale browser won't show "175,4K".
- Card, button, tag and navigation micro-interactions.
- `prefers-reduced-motion` is respected. Content stays visible if JavaScript is disabled.

**Mobile** (designed and tested at 320, 375, 390 and 430, plus 768 and 1024)
- 2×2 KPI grids, with Home's Complytek KPIs as a compact row of three.
- Selected Content is a swipeable row, and the Work filters scroll sideways.
- Mobile menu with a Get in touch button; it closes on Escape or an outside tap.
- 44px tap targets on text links.

**Performance and accessibility**
- Manrope is self-hosted (`assets/fonts`, OFL), with no Google Fonts request.
- WebP versions of the portrait, RnG and Social Blueprint logos and the Complytek screenshots, with PNG fallbacks. The originals are untouched.
- Width and height on every image to prevent layout shift; lazy loading below the fold.
- Skip link, `aria-pressed` on filters, `aria-expanded` and `aria-controls` on the menu, and `noopener noreferrer` on all external links.

**Note:** `complytek-screen-home.jpg`, `complytek-screen-solutions.png` and `complytek-screen-clients.png` are no longer referenced (replaced in Revision 5). They are kept but can be deleted to make the upload 3.4 MB smaller.
