# Huarui Fly Ash Motion Plan

## Direction

Use restrained particulate flow and mineral-layer settling to express fly-ash processing and reuse. Motion supports technical credibility, product clarity and RFQ conversion.

## Scenes

1. **MOT-HR-01 — Banner mineral veil reveal**: Preserve all three supplied 1920×800 banners. Use a 650–800 ms directional veil reveal with subtle fine-particle drift confined to the background. DOM headline, description and RFQ controls remain independent and readable. Desktop uses the wide focal area; 390px uses a tuned crop and safe text zone.
2. **MOT-HR-02 — Particle-to-structure application path**: A single SVG path connects fly ash to concrete, cement, building products and infrastructure backfill. Nodes reveal only on viewport entry. Desktop is horizontal; 390px is vertical and fully visible.
3. **MOT-HR-03 — Bounded content settling**: Major sections use a one-time 18 px upward settle with opacity over 480–620 ms and at most six-item stagger. Every offscreen section remains pending until viewport entry; no global timer consumes its animation.
4. **MOT-HR-04 — Industrial control feedback**: Navigation, product cards, FAQ, gallery, carousel, form and CTA controls use short border, arrow, focus and press feedback. Hover never carries required information.

## External candidates

- Motion inView / bounded viewport reveal — adopted for one-time lifecycle and observer cleanup.
- MDN CSS scroll-driven view timelines — partially adopted only as progressive enhancement for the particulate path.
- GSAP deep parallax and pinned scrub — rejected because it harms 390px browsing, product recognition and RFQ speed.

## Safety and responsive contract

- Desktop and 390px preserve Banner subjects, complete product images and CTA reachability.
- prefers-reduced-motion stops carousel autoplay, particle travel and nonessential transforms; content is immediately visible.
- No-JS and observer failure states keep complete content visible.
- Continuous animation is limited to a subtle low-density particulate accent and stops when the tab is hidden.
- Combination fingerprint: MOT-HR-01 + MOT-HR-02 + MOT-HR-03 + MOT-HR-04.
