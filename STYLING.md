# Styling

Living log for this portfolio. Read before any UI work. Update in the same turn as every token, primitive, or component visual change.

## Principles

- Intentional, minimal, elegant. Type and space do most of the work.
- Quiet chrome. Home *is* the work list. Contact is hover-reveal actions, not a page.
- Motion only to focus attention (chip cycle, reroll spin, action-icon reveal, work-card hover, Back / Back to top arrow nudge, tab underline slide).
- Light theme. Desktop look from Figma `Desktop - 1` (`1:2`). Work cards and case figures keep their ratio as the column shrinks; no breakpoint system.
- HeroUI primitives (`Link`, `Chip`) stay semantic; look comes from tokens and layout classes.

## Tokens

Defined in `app/globals.css`.

| Token | Value | Notes |
| --- | --- | --- |
| `--background` | `#ffffff` | Page canvas |
| `--foreground` | `#000000` | Active/hover tabs, action labels, emphasis chips, case-study emphasis |
| `--foreground-muted` | `#666666` | Case-study body, date, captions; 5.74:1 on white (WCAG AA for 14px) |
| `--tab-idle` | `#707070` | Unselected Work / About; 4.79:1 on white (WCAG AA at 14px). Distinct from muted so tabs aren’t body text. |
| `--label` | `var(--foreground-muted)` | Intro labels, footer date |
| `--chip-muted` | `#484848` | Work-card title and year chips |
| `--chip` | `#f0f0f0` | Chip fill. Solid. |
| `--tile` | `#dbdbdb` | Work card placeholder |
| `--reroll-ring` | `#e6e6e6` | Legacy ring gray. Still used as `--media-stroke`. |
| `--reroll-fill` | `#000000` | Reroll rest fill |
| `--reroll-fill-hover` | `#222222` | Reroll hover / spin fill. A step lighter than rest. |
| `--case-link-underline` | `#cccccc` | Default underline on `.case-link`. Same gray as `--media-stroke-hover`. |
| `--reroll-icon` | `#ffffff` | Drawn in `/icons/reroll.svg` |
| `--reroll-radius` | `100px` | Rest (circle) |
| `--reroll-radius-hover` | `8px` | Hover and while spinning |
| `--media-stroke` | `var(--reroll-ring)` | 1px outline on case-study figures and work cards. Same gray as the reroll ring. |
| `--media-stroke-hover` | `#cccccc` | Work-card stroke on hover / focus. A step darker than `--media-stroke`. |
| `--case-video-ratio` | `1520 / 1080` | Default Activities video crop. Overridden per figure via `--media-ratio`. |
| `--page-max` | `700px` | Content measure |
| `--page-gutter` | `24px` | Horizontal inset |
| `--header-top` | `24px` | Top padding |
| `--space-lg` | `120px` | Home only: nav → intro, intro → work, work → footer |
| `--space-md` | `60px` | Case study: nav → back, date → section, section → section, last content → Back to top → footer |
| `--space-back` | `24px` | Back → title only |
| `--space-block` | `24px` | Text ↔ figure |
| `--space-copy` | `24px` | Heading block → body; paragraph → paragraph; paragraph → list |
| `--work-gap` | `44px` | Between work cards. 16px tighter than `--space-md` (8px step). |
| `--line-gap` | `12px` | Intro rows |
| `--chip-gap` | `8px` | Chip clusters |
| `--nav-gap` | `32px` | Header tabs and header actions |
| `--footer-gap` | `24px` | Footer actions |
| `--action-pad-y` | `8px` | Vertical hit padding on tabs and text actions. Not reroll or work cards. |
| `--action-pad-x` | `16px` | Extra horizontal hit padding on standalone text actions (Back, Back to top). Not tabs. |
| `--chip-pad-y` / `--chip-pad-x` | `4px` / `8px` | Chip inset |
| `--radius-chip` | `4px` | Chips |
| `--radius-tile` | `8px` | Work cards |
| `--type-body` | `16px` | Intro labels, intro chips, case-study body, date, section labels, footer thanks |
| `--type-ui` | `14px` | Nav, footer date, actions, work chips, captions |
| `--type-title` | `20px` | Page titles (case study, About) |
| `--list-indent` | `40px` | Numbered list inset; HTML/CSS user-agent default |
| `--font-chip` | Space Grotesk 400 | Chips and case-study section headers; set by `next/font` in `app/layout.tsx` |
| `--motion-duration` | `180ms` | Hover/focus and reroll hover |
| `--motion-ease` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Soft, short |
| `--chip-shrink-duration` | `200ms` | Intro chip collapse |
| `--chip-pop-duration` | `360ms` | Chip fill expanding to hug new text |
| `--chip-stagger` | `70ms` | Delay between chip 1 → 2 → 3 on pop |
| `--reroll-turn-duration` | `480ms` | Click clockwise return |
| `--tab-slide-duration` | `280ms` | Underline travel between Work and About |
| `--work-press-scale` | `0.98` | Work-card hover / focus shrink |
| `--work-ratio` | `700 / 400` | Work-card tile. Height follows column width, same as case figures. |

Type family: **Satoshi** Regular (Fontshare), weight 400, for body and chrome; Medium 500 for case-study emphasis. **Space Grotesk** Regular (Google), weight 400, for chips and case-study section headers.

## Primitives

### Type

- Body/UI: Satoshi 400. Page titles 20px.
- Intro labels: 16px, `--label`, `line-height: normal`.
- Intro chips: 16px Space Grotesk, `--foreground`, `line-height: normal`.
- Work chips: 14px Space Grotesk.
- Nav/actions: 14px, line-height **1.2** (16.8px). Resume / Email stay `--foreground`. Work / About idle is `--tab-idle`; hover, focus, and the active tab use `--foreground`.
- Footer date: 14px, `--label`, `line-height: normal`.
- Footer thanks (case studies): 16px, `--label`, `line-height: normal`. Copy is `site.caseClose`: “Thanks for reading! Let's keep in touch.”
- Case study: 16px throughout; captions 14px. Title is 20px Satoshi Medium + `--foreground`. About uses the same title style; the heading is “Hello! I'm Bryce.” (the About tab already names the page). Date under the title is Regular + `--foreground-muted`. Section headers (Context and problem, Solution, Principle n; USDC: Overview, Focus 1–3) are Space Grotesk 400 + `--foreground-muted`. Doc-bolded lines (ledes, list leads) are Satoshi Medium 500 + `--foreground`. Body and captions are Satoshi Regular + `--foreground-muted`. Problem list uses decimal numbers with the standard 40px list indent. Captions sit under the tile, centered. Titles keep their written case; dates, labels, ledes, and body use sentence case.

Line-height (not tokens; set on the class). Kept 1.5 for body after review: at 16px / 700px it is the comfortable default, and 24px equals the paragraph gap.

| Surface | Size | Line-height | Computed |
| --- | --- | --- | --- |
| Case body, lede, list, date, section label | 16px | `1.5` | 24px |
| Case / About title | 20px | `1.3` | 26px |
| Captions | 14px | `1.4` | 19.6px |
| Nav, Resume / LinkedIn / Email | 14px | `1.2` | 16.8px |
| Back / Back to top | 14px | `16px` | matches the 16px arrow |
| Intro labels, chips, footer date / thanks | 16 / 14px | `normal` | browser default |

### Space

Case-study proximity is **8 / 24 / 60**. Home large gaps stay **120**. Do not invent a fourth step unless it is documented here.

| Gap | Value | Token / class |
| --- | --- | --- |
| Title ↔ date; label ↔ lede; image ↔ caption; list item ↔ item; chip clusters | 8px | `--chip-gap` |
| Heading block → body; para → para; para → list; text ↔ figure; Back → title; About title → body | 24px | `--space-copy`, `--space-block`, `--space-back` |
| Nav → Back; date → section; section → section; last content → Back to top → thanks | 60px | `--space-md` |
| Home: nav → intro; intro → work; work → footer | 120px | `--space-lg` |
| Work cards | 44px | `--work-gap` |
| Intro rows | 12px | `--line-gap` |
| Intro → reroll | 24px | hardcoded on `.intro` |
| Header tabs / header actions | 32px | `--nav-gap` |
| Footer actions | 24px | `--footer-gap` |
| Tab label → active tick | 6px | `.tab` gap |
| Action label → hover icon | 4px | `.action` gap |
| Chrome vertical hit padding | 8px | `--action-pad-y` on `.tab` and `.action` (offset so labels don’t drop). Reroll and work cards excluded. |
| Back / Back to top horizontal hit padding | 16px | `--action-pad-x` on `.action--back` only (offset so the label doesn’t shift). |
| Work-card chips from bottom-left | 16px | `.work-card__meta` |
| Shell bottom padding | 4rem | `.site-shell` |

### Chip (HeroUI `Chip` + `.chip`)

- Read-only. Fill `--chip` (`#f0f0f0`, solid). Radius 4px, padding 4×8. Labels use Space Grotesk 400 (`--font-chip`); size and weight stay 16/14 and 400.
- `.chip--emphasis`: 14px black (work company). Specificity `.chip.chip--emphasis` so it wins over intro 16px.
- `.chip--meta`: 14px `--chip-muted` (`#484848`) for work title and year.
- Cycle: the chip fill retracts left to padding-only width (hug, overflow clips text). New copy swaps, then each fill grows left-to-right to hug the new text, staggered 70ms (first → third). No vertical scale.

### Link / tab (`.tab`)

- Work / About use Next.js `Link` (client routing). Idle tabs are `--tab-idle`; hover / focus / active are `--foreground`. A single 24×1px mark sits under the active label and slides 280ms when moving between Work and About. Work is active only on `/`; About only on `/about`. Case studies hide the mark (both tabs idle). Reduced motion jumps. Same 8px vertical hit padding as the other chrome controls (`--action-pad-y`).
- Case study Back uses Next.js `Link` with `.action.action--back`. The Material arrow (weight 300, left) sits before the label and stays visible. Hover / focus-visible nudges the arrow 4px left over 180ms. Reduced motion keeps it still.
- Case study **Back to top** sits on its own line after the last section (up arrow, weight 300). Hover / focus-visible nudges the arrow 4px up over 180ms. Click smooth-scrolls to the top; reduced motion jumps and skips the nudge.
- Case study footer left is “Thanks for reading! Let's keep in touch.” (16px muted). Home keeps “Updated …”. About has no footer.
- Inline case-study links (`.case-link`): text `--tab-idle` (`#707070`), underline `--case-link-underline` (`#cccccc`). Hover / focus-visible go to `--foreground` (text and underline). External links open in a new tab with `noopener noreferrer`. First use: “institutional USDC website” → `https://www.coinbase.com/institutional/usdc`.

### Text action (`.action`)

- Resume, LinkedIn: `<a>` with Figma 16px icons (`/icons/resume.svg`, `/icons/linkedin.svg`) — external-arrow. `http(s)` hrefs (LinkedIn) open in a new tab with `rel="noopener noreferrer"`. Resume stays `#` until a file exists.
- Email: label is always “Email”. Hover shows the 16px copy icon. Press copies `site.email` and shows the 18px check for 800ms even if the pointer leaves. Then the icon hides; if the pointer is still on Email, it stays hidden until leave (so the copy icon doesn’t pop back immediately).
- Resume/LinkedIn icons sit in a 0-width wrapper and open to 16px / opacity 1 on hover and focus. Why: Figma hid those layers until hover.
- 8px padding above and below the label (`--action-pad-y`), pulled back with −8px margin so the header/footer line doesn’t drop. Shared with Work / About. Reroll stays the 40×40 circle.
- Back and Back to top also get 16px horizontal hit padding (`--action-pad-x`), pulled back with −16px margin. Tabs do not.
- Focus: 2px solid `--foreground`; offset 3px on actions and reroll, 4px on work cards. Work-card hover / focus scales to `0.98` (press-in). Reduced motion: no scale.

### Button / reroll (`.reroll`)

- Native 40×40 button. Rest: `--reroll-fill` `#000000`, no stroke, `--reroll-radius` 100px (circle), white icon (`/icons/reroll.svg`, do not override SVG width/height). Hit target is the control; no extra slop.
- Hover / focus: fill `--reroll-fill-hover` `#222222`, radius 8px (`--reroll-radius-hover`).
- Click: locks the 8px / `#222222` shape (`.reroll--spinning`) and the button spins clockwise 360° (480ms). Rotation snaps to 0°; radius and fill ease back to the circle over 180ms, same as hover. If the pointer is still over it, hover keeps the 8px square.
- Chips pick a random *other* variant. First load is always intro variant 0.

## Components

### Site shell (`.site-shell`) — 2026-09-30

Centered 700px column, 24px top, 24px side gutter, 4rem bottom. Why: Figma desktop frame.

### Site header (`.site-header`) — 2026-09-30

Work + About left (32px gap); Resume + LinkedIn + Email right. Idle tabs `#707070`; hover and the active tab are black. One 24×1px mark slides between them (280ms). Case studies show no mark. 120px below to intro on home; 60px below to Back on case studies. Why: left side is tabs; right side is destinations/copy.

### Intro (`.intro`, `.intro__line`, `.intro__chip-track`) — 2026-09-30

Fixed labels + cycling HeroUI chips. The gray fill lives on `.intro__chip-track` so width can hug content while radius stays. 12px row gap, 24px to reroll. Why: Figma “Sentence Style” / re-roll set `13:226`.

### Work card (`.work-card`) — 2026-09-30

700×400 media tile at the desktop measure (`--work-ratio`), 8px radius, 1px `--media-stroke` drawn on a `::after` above the media (same gray as case figures), chips 16px from bottom-left. Whole card links to `/work/[slug]`. Empty `thumb` shows the gray placeholder; set `works[].thumb` to a file under `/public` (jpg, png, webp, gif, mp4, webm). The list row uses `aspect-ratio: 700 / 400` so height follows the column, like case-study figures — no fixed 400px. Activities uses the final-iteration MP4 with `activitiesCardCrop`, fitted to the card width so side bars clip and top/bottom overflow the tile. USDC uses `earn-hero-alt-4.png` with `object-fit: cover`. Both cards stay the same proportion at every width. Hover / focus scales to 0.98 and the `::after` stroke goes to `--media-stroke-hover` (`#cccccc`). Transform does not change the row size, so the list doesn’t jump. Why: entire card is the case-study hit target.

### Site footer (`.site-footer`) — 2026-09-30

Hidden on About. On home: “Updated …” from `site.updatedAt` (14px, `--label`; GitHub link if `site.githubHref` is set). Current date is October 11, 2026. On case studies: “Thanks for reading! Let's keep in touch.” (16px, `--label`). Resume, LinkedIn, Email with the same hover icons as the header. LinkedIn opens in a new tab. 120px above the work list on home; 60px above the thanks line (same as last content → Back to top). Why: Figma footer. About is short enough that a second contact row is redundant.

### About / case study (`.page-title`, `.about`, `.blank-copy`, `.case-back`, `.case`) — 2026-10-06

About opens with “Hello! I'm Bryce.” in the case-study title style (20px Satoshi Medium, black, line-height 1.3). The tab already says About, so the page does not repeat it. Three body paragraphs follow (`.case-copy`: 16px / 1.5, Satoshi Regular, `--foreground-muted`). Title → first paragraph and paragraph → paragraph are 24px (`--space-copy`). No photo yet; no Back / Back to top; no footer. Header still uses the home 120px gap. Case studies keep Back, then title (20px Medium, black, line-height 1.3), a muted date (16px / 1.5), and sections. Body, ledes, lists, and section labels are 16px / 1.5. Captions are 14px / 1.4, centered under the tile. After the last section: 60px, Back to top, 60px, then the footer thanks line. Spacing: 8 / 24 / 60 (see Space). Home stays at 120px large gaps. Work cards sit 44px apart. **Titles keep their written case; everything else is sentence case** (dates, ledes, labels, body). Activities date is “Summer 2025”. USDC home chip and page share “Scaling the Institutional USDC Experience” and “2025 - present”. USDC section labels are Overview and Focus 1–3 (numbered like Principle n, so they don’t repeat the lede). Focus 1 uses `banners.png` (`usdcBanners`: 6400×5040, 471px off top and bottom — about 48px at the rendered width). Focus 2 uses `enrollment-modal.png` at native 6400×3600 (`usdcEnrollmentModal`). Focus 3 uses `earn-hero-alt-4.png` at native 4800×2688 (`usdcEarnHero`). All three fill the column with the same 1px `--media-stroke` as other figures. Case-study figures fill the 700px measure. Cropped media is sized so the visible window is 100% of the frame; overflow clips the insets (not `object-fit: cover`). Case-study videos hang 2px below the clip to hide the green H.264 chroma row on the last source line. Activities crops are per visual (pixel insets on `crop`) and do not try to share one zoom — full-page shots and tight component shots are different patterns. Solution / splitting / copy / final / video-authorization trim leftover export lines (1–3px). Solution is −3px left, −2px right, −2px bottom. Iteration 2 and error states use a centered crop at their zoom. Iteration 1 is unchanged. Every figure and work card has a 1px `--media-stroke`. Work-card tiles use `--work-ratio` (`700 / 400`) so height follows the column. Home lists Activities and USDC only; the Exploring card is held for a later launch. Why: related lines sit together; new sections get more air.

## Assets

Figma vectors, native size preserved:

- `/public/icons/reroll.svg` — 40×40 white refresh icon; the button now draws the fill and radius (`13:319` path kept)
- `/public/icons/resume.svg` — 16×16 hover (`17:479`)
- `/public/icons/linkedin.svg` — 16×16 hover (`17:491`, same arrow as resume)
- `/public/icons/email.svg` — 16×16 copy (`17:511`)
- `/public/icons/check.svg` — 18×18 Material check after email copy
- `/public/icons/back.svg` — original 18px Material export; Back uses the inline 16px SVG instead
- `/public/media/` — work thumbs and case-study figures. Drop jpg / png / webp / gif / mp4 / webm and point `works[].thumb` or a figure’s `src` at `/media/...`. Empty `src` keeps the gray tile.
- `/public/media/activities/` — Activities figures (kebab-case). Looping MP4 for motion; `iteration-1.png` for the still. Source recordings (including unused GIFs and “highlighting actions”) stay in `activity_case_study_visuals/`.
- `/public/media/usdc/` — USDC figures (kebab-case). `banners.png` is Focus 1; `enrollment-modal.png` is Focus 2. Home thumb and Focus 3 share `earn-hero-alt-4.png`. Earlier Earn Center stills stay on disk. Source stills stay in `usdc_case_study_visuals/`.

## Changelog

### 2026-10-11 — Fainter case-link underline, darker reroll hover

- `.case-link` underline at rest is `--case-link-underline` (`#cccccc`); the words stay `--tab-idle`. Hover still takes both to `--foreground`.
- Reroll hover / spin fill is `#222222` (was `#2c2c2c`).
- Why: the default underline was competing with the words; hover needed a slightly deeper gray.

### 2026-10-11 — Reroll fill swap and USDC site link

- Reroll rest is `#000000`; hover / spin is `#2c2c2c`. Radius behavior is unchanged.
- Focus 1 copy links “institutional USDC website” (underline, `--tab-idle` → `--foreground` on hover) to `https://www.coinbase.com/institutional/usdc` in a new tab.
- Why: reverse the two reroll fills; the website mention should be an obvious outbound link.

### 2026-10-11 — LinkedIn new tab, tighter work-card gap, footer date

- LinkedIn (`http(s)` text actions) opens in a new tab with `noopener noreferrer`. Resume stays same-tab until it has a real URL.
- `--work-gap` is 44px (was 60). Case-study `--space-md` stays 60.
- Footer date is October 11, 2026.
- Why: keep the portfolio tab; cards were a step too far apart; the shipped date should match this cut.

### 2026-10-11 — Work cards keep 700/400 as the column shrinks

- List rows use `--work-ratio` (`700 / 400`) instead of a fixed 400px height, so the tile scales like a case-study figure.
- Activities still width-fits the crop (no gray bars when the column is narrow). USDC cover no longer zooms in as the card gets taller relative to its width.
- Why: a locked height changed the card ratio on smaller screens and broke the two thumbs in opposite ways.

### 2026-10-11 — Darker work-card stroke on hover

- Work-card hover / focus keeps the 0.98 scale and shifts the 1px stroke from `--media-stroke` (`#e6e6e6`) to `--media-stroke-hover` (`#cccccc`).
- Why: the shrink alone was a quiet hover; a slightly heavier edge makes the hit clearer.

### 2026-10-11 — Revert forced reroll settle

- Removed `.reroll--settled`. After the spin, hover can keep the 8px square again; the circle comes back when the pointer leaves.
- Why: forcing the circle while hovered felt worse than the earlier return.

### 2026-10-11 — Ease reroll back to a circle; lighter rest fill

- After the spin, rotation still snaps to 0°, but radius and fill ease to the rest circle over 180ms like hover.
- `--reroll-fill` is `#2c2c2c` so rest reads a little lighter than `#222222`.
- Why: the return to a circle was a hard cut; rest needed a bit more air against black hover.

### 2026-10-11 — Filled reroll; hover square; spin the button

- Rest is a `#222222` circle (100px radius), no stroke, white icon. Hover / focus is `#000000` at 8px radius. Click spins that 8px button clockwise 360°, then it snaps back to the circle.
- Why: try a filled control whose shape is the interaction, instead of a ring and a tilted icon.

### 2026-10-11 — Hold Exploring card

- Removed the “Just for fun / Exploring …” work card from the home list. `/work/exploring` is not generated.
- Why: this launch is the two Coinbase case studies only.

### 2026-10-11 — Swap USDC Focus 1 and 2 images

- Focus 1 is now the banners; Focus 2 is the enrollment modal. Copy and crops stay the same.
- Why: the stills sit with the matching workstream.

### 2026-10-11 — USDC Focus 1 enrollment modal

- Focus 1 shows `/media/usdc/enrollment-modal.png` with `usdcEnrollmentModal` (6400×3600). Same 1px stroke and column-width crop. No caption.
- Why: the enrollment modal is the first case image.

### 2026-10-11 — USDC banners top/bottom crop

- `usdcBanners` now trims 471px top and bottom (about 48px on the 652px figure). Stroke and column width unchanged.
- Why: the white field above the first banner and below the last was too open.

### 2026-10-11 — USDC Focus 2 banners

- Focus 2 shows `/media/usdc/banners.png` with `usdcBanners` (6400×5040). Same 1px stroke and column-width crop. No caption. Focus 1 stays a placeholder.
- Why: the stacked promotion banners are the second case image.

### 2026-10-11 — USDC Focus 3 figure

- Focus 3 shows `/media/usdc/earn-hero-alt-4.png` with `usdcEarnHero` (4800×2688). Same 1px stroke and column-width crop as Activities figures. No caption. Focus 1–2 stay placeholders.
- Why: the tighter Earn Center still is the third case image as well as the home thumb.

### 2026-10-11 — USDC thumb alternative 4

- Home USDC card now uses `/media/usdc/earn-hero-alt-4.png` (from `16_9 Earn Hero_alternative_4.png`). Same cover-fit. Earlier stills stay on disk.
- Why: try the tighter Earn Center still on the list.

### 2026-10-11 — USDC thumb alternative 3

- Home USDC card now uses `/media/usdc/earn-hero-alt-3.png` (from `16_9 Earn Hero_alternative_3.png`). Same cover-fit. Earlier stills stay on disk.
- Why: try the next Earn Center still on the list.

### 2026-10-11 — USDC thumb alternative 2

- Home USDC card now uses `/media/usdc/earn-hero-alt-2.png` (from `16_9 Earn Hero_alternative_2.png`). Same cover-fit. Earlier stills stay on disk.
- Why: try the third Earn Center still on the list.

### 2026-10-11 — USDC thumb alternative

- Home USDC card now uses `/media/usdc/earn-hero-alt.png` (from `16_9 Earn Hero_alternative.png`). Same cover-fit. The light hero is still on disk.
- Why: try the blue-field still on the list before committing to one.

### 2026-10-11 — USDC work-card thumb

- Home USDC card shows `/media/usdc/earn-hero.png` (copied from `usdc_case_study_visuals/16_9 Earn Hero.png`). Cover-fit, no crop yet. Case-study figures stay placeholders.
- Why: start the second case with the Earn Center hero on the list.

### 2026-10-11 — Solid chip fill

- `--chip` is `#f0f0f0` again, with no alpha and no blur.
- Why: translucency and frost added scroll and stacking bugs; the original solid fill is enough.

### 2026-10-11 — Drop chip frost; restore card stroke

- Removed the extra blurred videos and `--chip-blur`. Chips are only the translucent fill again, so they no longer darken when they reach the top of the viewport.
- Work-card stroke is a `::after` 1px `--media-stroke` on top of the media, all four sides.
- Why: the frost copies were mis-compositing on scroll; the inset shadow sat under the video and disappeared.

### 2026-10-11 — Real chip frost; inset card stroke

- Work-card chips clip a second copy of the tile video and `filter: blur(24px)` it, aligned to the card with container units. `backdrop-filter` does not sample `<video>`, so the UI stayed sharp.
- Card stroke is an inset 1px box-shadow instead of a border, so the bottom line isn’t clipped by the 400px row.
- Why: the frost never actually blurred the recording; the bottom stroke looked cut off.

### 2026-10-11 — Frosted chips

- Chips (and intro tracks) use `backdrop-filter: blur(20px)` (`--chip-blur`) on top of the translucent fill.
- Work-card `overflow: hidden` moved onto `.work-card__media` so the frost can sample the video. Rounding still clips on the media layer.
- Why: overflow + radius on the card made `backdrop-filter` a no-op, so only the 6% veil showed and the UI stayed sharp.

### 2026-10-11 — Work-card stroke; translucent chips

- Work cards get the same 1px `--media-stroke` as case-study figures.
- `--chip` is `rgb(0 0 0 / 5.88%)` so it still reads as `#f0f0f0` on white and shows a little of the media underneath.
- Why: tiles needed the same outline as figures; chips on video looked like solid stickers.

### 2026-10-11 — Work-card thumb fits width

- Activities thumb scales so the cropped window is 100% of the card width. Top/bottom overflow the 400px tile. Cards stay 700×400.
- Why: fitting to height showed the export’s black side bars; width-fit clips those and keeps the list tiles aligned.

### 2026-10-11 — Activities work-card thumb

- Home Activities card plays `final-iteration.mp4` with `activitiesCardCrop` (same insets as the fourth case figure). Tile stays 400px cover; USDC and Exploring stay placeholders.
- Why: the final timeline is the work to show on the list.

### 2026-10-11 — Hide MP4 bottom chroma fringe

- Case-study videos are 2px taller than the frame so overflow clips the last encoded rows. The iteration 1 PNG is unchanged.
- Why: every Activities MP4’s last 1–2 rows decode as green (H.264 4:2:0). It is not a fill color and not a crop miss.

### 2026-10-11 — Crop by sizing, not cover

- Case-study cropped video/image is absolutely positioned: the source is scaled so the visible crop fills the frame width and height, and overflow clips the rest. Dropped `object-fit: cover` + `object-position` for that path. Work cards stay 400px cover.
- Why: cover scales the full 1920×1080 file; a 1–2px bottom crop has no overflow to hide, and the left bar was a rounding sliver.

### 2026-10-11 — Solution crop +1px left and bottom

- Solution is now 177 / 178 / 2 (left / right / bottom). One more pixel off the leftover left bar and the odd bottom row.
- Why: the previous −2 / −1 still showed both.

### 2026-10-11 — Pixel crops; no shared zoom

- `crop` insets are source pixels. Solution −2px L/R and −1px bottom; splitting −2px L/R; final −3px right and −1px bottom; copy −1px left and bottom; video authorization −1px bottom. Iteration 2 and error states recentered at the same zoom (equal side insets). Iteration 1 unchanged.
- Why: visuals don’t share one crop pattern; leftover export lines and off-center zooms need per-frame nits.

### 2026-10-11 — Per-figure Activities crops

- Figures still fill the 700px column. Crop is per visual (`crop` on the figure): solution and splitting show the full page; iteration 1–2 and error states zoom in; final and video authorization trim an extra sliver on the left; copy logic unchanged.
- Why: one global 1520 crop clipped full-page shots and left a black pixel on two recordings; zoom has to stay independent without breaking horizontal alignment.

### 2026-10-11 — Figure stroke; crop video side bars

- Case-study figures get a 1px `--media-stroke` (`#e6e6e6`, same as the reroll ring). There was no media outline token before.
- Activities MP4s crop to 1520×1080, centered, which drops the ~172–200px black bars on each side. Iteration 1 PNG is unchanged.
- Why: white UI sat on a white page; the recordings included unused black from the export.

### 2026-10-11 — Activities figures

- Wired the eight Activities visuals in story order: solution, iteration 1 (PNG), iteration 2, final iteration, splitting actions, copy logic, video authorization, error states. MP4s loop, muted, preload. Skipped highlighting actions.
- Case-study frames fill the 700px column and keep the recording’s height. Work cards stay 400px cropped tiles.
- Why: MP4 is sharper and lighter than GIF for UI recordings; a fixed 400px crop was cutting the prototypes.

### 2026-10-06 — About greeting; header LinkedIn; no About footer

- About title is “Hello! I'm Bryce.” LinkedIn sits in the header with Resume and Email. About has no footer; home and case studies keep theirs.
- Why: the tab already says About; contact lives in the header, so a footer row on a short bio is extra.

### 2026-10-06 — About title is Hello!

- Removed the “About” heading. The page title is “Hello!” in the same 20px Satoshi Medium as case studies. The first paragraph now starts “I'm a product designer…”.
- Why: the tab already says About; the greeting should carry the title weight.

### 2026-10-06 — About copy

- About is three muted 16px / 1.5 paragraphs (same as case-study body). Title stays 20px Regular. Title → body and para → para are 24px (`--space-copy`). `.page-title` bottom margin is 24px instead of 2rem.
- Why: drop in the bio and read it in the same type and stack as the case studies, without extra chrome.

### 2026-10-06 — Back to top arrow nudges up

- Hover / focus-visible on Back to top translates the arrow −4px on Y (180ms), same distance and easing as Back’s left nudge. Reduced motion keeps it still.
- Why: the up arrow should hint the same way the back arrow does.

### 2026-10-06 — Back hit width; reroll stays tight

- Removed the extra reroll hit extension. The 40×40 circle is the target.
- Back and Back to top get 16px horizontal hit padding (`--action-pad-x`) in addition to the 8px vertical. Work / About stay vertical-only.
- Why: reroll is already a button; standalone text actions need more width than tab labels.

### 2026-10-06 — Hit padding on all chrome controls

- Work / About get the same 8px vertical hit padding as Resume / Email / Back / Back to top. Reroll gets an 8px vertical hit extension. Work cards are unchanged.
- Why: hover was still too tight on the tabs; every chrome control should share the same slop.

### 2026-10-06 — Action hit padding

- Resume, LinkedIn, Email, and Back get 8px vertical padding (`--action-pad-y`). Negative margin keeps the labels where they were.
- Why: hover only fired on the 14px text; a little air above and below makes the actions easier to hit.

### 2026-10-06 — Email check persists after leave

- The checkmark stays for the full 800ms after copy, even if the pointer leaves Email. After that it hides. Leave no longer cancels the confirmation.
- Why: users need time to see that the address copied.

### 2026-10-06 — Card press-in; media slots

- Work-card hover / focus scales to 0.98. The list row stays 400px. Reduced motion: no scale.
- Home thumbs and case-study figures share `.media-frame`. Optional `thumb` / `src` accepts images, GIFs, and video (`mp4`, `webm`, `mov`). No file yet = placeholder.
- Why: the card should press in, not dim; tiles should take media without a new layout.

### 2026-10-06 — Idle tabs + sliding underline

- Work / About idle color is `--tab-idle` `#707070` (AA at 14px). Hover, focus, and the active tab go to `--foreground`. Resume / Email stay black.
- The 24×1px mark is one element that slides 280ms between Work and About. Hidden on case studies. Reduced motion jumps.
- Why: unselected tabs should recede without using body-muted gray; the mark should travel with the selection.

### 2026-10-06 — USDC Focus 1–3

- Replaced Growth / Enrollment / Earn Center with Focus 1–3. Overview stays.
- Why: the named labels restated the ledes; numbered focuses work like Principle 1–3.

### 2026-10-06 — USDC section labels

- USDC sections now have muted Space Grotesk labels like Activities: Overview, Growth, Enrollment, Earn Center.
- Why: same section rhythm as the first case study, without calling workstreams “principles.”

### 2026-10-06 — USDC chip matches title; sentence case

- Home USDC chip is “Scaling the Institutional USDC Experience” and “2025 - present”. The case-study date matches. Copy besides titles uses sentence case (e.g. “Context and problem”).
- Why: the card should name the same piece as the page; “Present” was over-capitalized.

### 2026-10-06 — USDC case study copy

- Dropped the USDC half of the Google Doc onto `/work/usdc-earn`. Title is “Scaling the Institutional USDC Experience”; date is “2025 - Present”. Three sections use ledes only (no Space Grotesk labels). Three tiles, no captions. Omitted empty “Learnings and reflections”.
- Why: same tokens and type rhythm as Activities; the doc’s bold lines are the headings.

### 2026-10-06 — Back arrow nudges left on hover

- Case-study Back arrow translates −4px on hover and focus-visible (180ms). Label stays put. Reduced motion: no move.
- Why: a small directional hint without shifting the word “Back”.

### 2026-10-06 — Document line-height and settled space

- Recorded line-heights: case body 1.5 (24px), title 1.3, captions 1.4, nav/actions 1.2, Back 16px, intro/footer `normal`. Body 1.5 stays; it matches the 24px paragraph gap.
- Added the settled 8 / 24 / 60 space map and chrome details that lived only in CSS (shell bottom 4rem, tab tick 6px, action icon gap 4px, focus rings, work-card hover).
- Why: if it is not in this file it did not happen.

### 2026-10-06 — Back→title 24

- Back → title is 24px (`--space-back`). Other 60px breaks stay.
- Why: 48 still felt like too much air between the control and the title.

### 2026-10-06 — Back→title 48

- Back → title is 48px (`--space-back`). Other 60px breaks stay.
- Why: 60 between Back and the title felt like too much air for a page-start pair.

### 2026-10-06 — Back→title 60; copy stack 24

- Back → title uses `--space-md` (60). `--space-copy` is 24 (heading → body, para → para, para → list). Text ↔ figure stays 24. Bonded pairs stay 8.
- Why: 16 felt tight in the body; Back should sit at the same break as the other chrome gaps. Left 8px pairs so title/date, label/lede, captions, and list items still read as one unit.

### 2026-10-06 — Case study 60px breaks; Thanks

- `--space-md` is 60px (was 48). Used for nav → back, date → section, section → section, last content → Back to top → thanks line, and work-card gaps.
- Footer line is “Thanks for reading! Let's keep in touch.”
- Why: 48 felt cramped at the large breaks; Back to top should share that same gap above the footer.

### 2026-10-06 — Back to top above footer; thanks line

- Back to top is its own line, 48px under the last section. Footer on case studies says “thanks for reading! Let's keep in touch.” (16px muted), 24px below that control.
- Why: keep the documented 48px after the piece; don’t bury Back to top in the contact row.

### 2026-10-06 — Back to top; Work tick only on home

- Case study footer left is Back to top (up arrow, weight 300, smooth scroll). Home/About keep “Updated …”.
- Work tab underline is home-only; case studies show neither tab as active.
- Why: keep the header for contact, but don’t imply you’re still on Work; give a footer exit from the bottom of a long page.

### 2026-10-06 — Case study proximity spacing

- Case study uses 8 / 16 / 24 / 48. Nav → back and content → footer are 48 (home stays 120). Back → title 24. Title ↔ date, label ↔ lede, image ↔ caption, and list items 8. Heading → body and para → para / list 16. Text ↔ figure 24. Section breaks 48.
- Why: related lines should sit together; 120px under the nav made Back feel like a new page.

### 2026-10-06 — Page title 20px

- Case study and About titles use `--type-title: 20px`. Case study title stays Satoshi Medium.
- Why: at 16px the title sat at the same size as section ledes.

### 2026-10-05 — Standard numbered-list indent

- Problem list inset is `40px` (`--list-indent`), the HTML user-agent default. It had been `1.5em` (24px) after Tailwind’s list reset.
- Why: the numbers sat too tight to the body; 40px is the usual `ol` indent.

### 2026-10-05 — Back arrow weight 300

- Swapped the inline arrow to Material Symbols Outlined weight 300 (was the default 400 path).
- Why: 400 read heavier than the Figma 16px action icons.

### 2026-10-05 — Sharper Back arrow

- Back arrow is an inline 16px SVG (integer Material 24-grid path) instead of an 18px `<img>`. Box is 16×16 with `overflow: visible`.
- Why: the 18px optical SVG through `<img>` was softening, especially on fractional device pixels.

### 2026-10-05 — Material arrow before Back

- Case-study Back shows the 18px Material arrow before the label. The icon stays visible (not the hover-reveal used by Resume/Email).
- Why: make the return path read as a back control.

### 2026-10-05 — Case title medium; date; numbered problems

- Case title is Satoshi Medium and `--foreground`. A muted 16px “Summer 2025” sits under it.
- The three problems use a decimal list again (Tailwind + flex had dropped the numbers).
- Why: title should read as the heading; the problems need markers, not just indent.

### 2026-10-05 — Captions under tiles; Space Grotesk headers; lighter muted

- Captions sit under the image tile again, centered. Section headers use Space Grotesk.
- `--foreground-muted` lightened from `#535353` to `#666666` (5.74:1 on white, WCAG AA at 14px). Intro labels and footer date follow via `--label`.
- Why: caption belongs to the figure, not the fill; headers should share the chip family; muted text was a bit heavy.

### 2026-10-05 — Case study type: medium emphasis, muted body

- Case study stays 16px / captions 14px. Doc-bolded ledes and list leads are Satoshi Medium 500 and `--foreground`; other case-study text is Regular and `--foreground-muted` (`#535353`).
- Captions are centered inside the image tiles. Loaded Satoshi 500. `--label` now aliases `--foreground-muted`.
- Why: pull emphasis from the Google Doc without jumping to Bold, and keep body quieter than chrome.

### 2026-10-05 — Activities case study copy

- Dropped the Activities Google Doc onto `/work/activities-timeline`. Image slots are tile placeholders; captions from the doc sit under them.
- Left the USDC write-up in the same doc off this page. Omitted the empty “Learnings and reflections” heading.
- Why: start case studies with existing tokens and the work-page type rhythm.

### 2026-10-02 — Chip type is Space Grotesk

- Intro and work-card chip labels use Space Grotesk 400; sentence labels, nav, and footer stay Satoshi.
- Why: chips are the variable words; a second family gives them figure against the sentence without changing size or weight.

### 2026-09-30 — Email stays “Email”; large gaps 120px

- Email label no longer swaps to the address on hover, so Resume/Email don’t shift.
- Replaced 151px / 107px section gaps with `--space-lg: 120px` (nav → intro, intro → cards, cards → footer).
- Why: showing the address moved neighboring nav items; Figma’s two large gaps felt arbitrary.

### 2026-09-30 — Email icon dismisses after copy

- Checkmark is confirmation only (800ms), then the icon collapses even if the pointer stays on Email. Blur after press so `:focus` does not pin it.
- Why: the copy/check icon stayed until a second click elsewhere.

### 2026-09-30 — Work chips + email copy

- Work-card chips are 14px; company stays black, title/year use `--chip-muted` `#484848` (Figma `17:435`, muted per spec).
- Email hover shows the address; press swaps copy icon for the 18px Material check.
- Why: card chips were inheriting intro 16px; copy feedback needed a clearer label and confirm state.

### 2026-09-30 — Chip hug + stronger reroll hover

- Intro chips collapse horizontally to padding-only, then expand to hug new text (staggered). Removed vertical scale.
- Reroll hover wind-up is −32° (was −16°).
- Why: fill should read like Figma auto-layout hugging, not squashed type.

### 2026-09-30 — Intro reroll motion

- Chip labels shrink down together, then pop out to the right with 70ms stagger (row 1 → 3).
- Reroll hover winds −16° counterclockwise; click unwinds clockwise through a full turn back to rest.
- Why: make the cycle feel like a rewind/replay, not a fade.

### 2026-09-30 — Work page from Figma `1:2`

- Replaced blank-canvas list with 700px desktop layout, Satoshi, chips, work tiles, hover actions, and intro reroll.
- Tokens taken from Figma (grays, radii, 16/14 type, 700 measure).
- Why: match the work-page look; interactions as specified (tabs, copy/hover icons, random chip cycle, card → case study).
- GitHub footer link deferred until a repo exists; date is `site.updatedAt`.

### 2026-09-07 — Header uses HeroUI Link and Button

- Replaced BEM class-only nav with `@heroui/react` `Link` for name, About, and case-study Back.
- Contact used `buttonVariants` ghost on `<a>` because `Button` has no `href` in HeroUI 3.2.
- Why: keep chrome on HeroUI primitives so later token changes apply consistently.

### 2026-09-07 — Blank canvas

- Scaffolded layout tokens, header, work row, About, and case-study stubs.
- HeroUI primitives used without token recoloring.
- Motion limited to work-row hover/focus opacity.
