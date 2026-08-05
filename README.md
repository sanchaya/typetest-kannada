# TypeTest — Kannada Font Inspector

[**Live Demo →**](https://typetest.sanchaya.net) · [Kannada Fonts →](https://fonts.sanchaya.net) · [ಸಂಚಯ →](https://sanchaya.org)

A single-page application for inspecting, testing, and comparing Kannada fonts. Upload any TTF/OTF/WOFF/WOFF2 font and preview it across 25 curated test tabs covering the full range of Kannada script — vowels, consonants, conjuncts, matras, literature, and more.

## Features

### Font Loading
- **Drag & drop** or click to upload font files (TTF, OTF, WOFF, WOFF2)
- **26 built-in Kannada fonts** from [fonts.sanchaya.net](https://fonts.sanchaya.net) loaded automatically on startup
- **Google Fonts source** — load any Kannada font by name from Google Fonts
- **ಸಂಚಯ catalog** — browse and load fonts from the [fonts.sanchaya.net](https://fonts.sanchaya.net) collection
- **System fonts** — browse fonts installed on your device via the Local Font Access API (Chrome/Edge)
- **Variable font support** with interactive weight slider and presets (Thin → Black)
- **Session history** — tracks up to 8 recently loaded fonts, switchable with one click
- **Dynamic font naming** — avoids browser cache conflicts on re-upload

### Typography Controls
- **Font size** — 12px to 120px with live slider
- **Line height** — 0.8 to 3.0
- **Letter spacing (tracking)** — -0.1em to 0.3em
- **Word spacing** — 0.5 to 3.0
- **Ligatures toggle** — enable/disable `liga` OpenType feature
- **Kerning toggle** — enable/disable `kern` OpenType feature
- **Dark background toggle** — switch to dark render area for contrast testing

### 25 Test Tabs

| Tab | Content |
|-----|---------|
| **Overview** | Type profile dashboard — scores, suitability, coverage, and diagnostics — plus vowels, numbers, and sample paragraph |
| **Font Info** | Metadata (name, version, designer), OpenType features, and GSUB/GPOS rules |
| **Alphabet** | Swaras (vowels), Vyanjanas (consonants in rows), and labelled Varga groups |
| **Numbers** | Kannada numerals (೧-೦) and English numerals side by side |
| **Mixed Letters** | Confusable letter groups (ರ ಠ ಈ ಕ, etc.) |
| **Gunitakshara** | All 36 consonants × 16 vowel matras + halant |
| **Conjuncts** | Full ottakshara matrix — every consonant combined with every other consonant |
| **Words** | Two vocabulary sets with common words and complex conjuncts |
| **Lettering** | Curated Kannada letter combinations at display sizes — the font's personality at a glance |
| **Vachana** | Basavanna's Vachana literature (Kannada + English translation) |
| **Kuvempu** | Vishwa Manava Sandesha prose passage |
| **Folk Song** | Mannina Haadu — traditional folk poetry |
| **English** | Pangrams and comprehensive word list |
| **Symbols** | Special characters and punctuation |
| **Kerning** | English kerning pair test strings |
| **Glyph Coverage** | Visual map of full Kannada Unicode block (U+0C80–U+0CFF) with supported/fallback indicators |
| **Glyph Map** | Searchable grid of every glyph in the loaded font |
| **Compare** | Side-by-side comparison of any two fonts from the collection |
| **Web Display** | The loaded font in 6 realistic web layouts — assign fonts per role, edit copy, and export each card |
| **Print** | The loaded font in 6 print layouts — newspaper, magazine, book, cover, spec, stationery |
| **Decompose** | Conjunct decomposition showing half-forms and component breakdown |
| **Font Rules** | Full GSUB/GPOS lookup tables with feature tags, types, and interactive toggles |
| **Waterfall** | Interactive size progression from 8px to 96px with min/max sliders and click-to-edit lines |
| **Hinting** | Same text at 9px to 18px sizes with your browser's rendering engine shown |
| **Custom** | Free-form text input with live preview |

### Type Profile
- **Overview dashboard** — headline readability, suitability scores per use (headline, body, subheading, caption), character coverage, shaping quality, and diagnostics
- **Loaded fonts comparison** — quick list of fonts currently in the session
- **Export** — download a profile report and JSON data for any loaded font

### Walkthrough Tour
- **First-run guided tour** — steps through every tab with a narrative, automatically offered on first visit
- **Replayable** — restart the tour anytime from the help button

### Feedback Workflow
- **Designer mode** — build a question set (free text, rating, multiple choice) and export/import it as JSON
- **Tester mode** — answer the questions and add annotations (pen/box, 5 colours) directly on each layout
- **Annotations persist** across reloads via localStorage; answers export as JSON
- **PDF export** — one click produces a print-ready report with annotated layouts and a Q&A appendix

### OpenType Inspection
- **Font metadata** — family name, version, designer, foundry, license
- **OpenType feature list** — all supported features with tags and names
- **GSUB rules** — glyph substitution lookups with type classification (single, multiple, ligature, alternate, contextual)
- **GPOS rules** — glyph positioning lookups (pair kerning, mark attachment, cursive)
- **Indic-specific features** — `nukt`, `akhn`, `rphf`, `pref`, `blwf`, `pstf`, `vatu`, `cjct`, `haln`
- **Interactive feature toggles** — enable/disable any OpenType feature and see live changes in the text

### Kannada Unicode Coverage
- Full inspection of the **Kannada Unicode block** (U+0C80–U+0CFF)
- **128 code points** mapped, **91 assigned** characters
- Visual grid with supported (green), fallback (red), and reserved (gray) indicators
- Percentage breakdown of coverage

### Share & Persist
- **URL-based state** — all settings encoded in the URL hash for easy sharing
- Preserves: font, size, line height, tracking, word spacing, ligatures, kerning, dark mode, active tab

### Mobile Friendly
- **Hamburger menu** with slide-out sidebar (≤ 900px)
- **Swipe-to-close** gesture on the sidebar
- **Backdrop overlay** — tap outside to dismiss
- **Touch-friendly** controls — larger slider thumbs (22px), toggles (48×26px), minimum 44px tap targets
- **Responsive grids** that adapt to screen size
- Uses `100dvh` for correct mobile viewport height

### Dark Mode
- Full dark theme toggle with CSS custom properties
- Preserved across URL sharing sessions

### Status Bar
- Live display of current font size, line height, tracking, ligature state, and loaded font name

## Tech Stack

- **Single HTML file** — zero build step, no frameworks
- **opentype.js** — OpenType table parsing for font metadata, glyph maps, and GSUB/GPOS inspection
- **FontFace API + @font-face injection** — native font loading with `font-display: swap`
- **CSS Grid + Flexbox** — responsive layout with mobile-first breakpoints
- **GitHub Pages** — deployed via `gh-pages` branch with automated sync workflow

## Local Development

```bash
# Clone the repo
git clone https://github.com/sanchaya/typetest-kannada.git
cd typetest-kannada

# Open in any browser — no server needed
open index.html
```

## Deploy

Push to `main` — the GitHub Actions workflow (`.github/workflows/sync-pages.yml`) automatically syncs to the `gh-pages` branch.

```bash
git push origin main
```

Or deploy manually:

```bash
git push origin main:gh-pages
```

## Related

- [**ಫಾಂಟ್ಸ್ ಸಂಚಯ**](https://fonts.sanchaya.net) — Kannada font collection
- [**ಸಂಚಯ**](https://sanchaya.org) — Sanchaya project homepage
- [**ಸಂಚಿ Foundation**](https://sanchifoundation.org) — Supporting organization

## License

See the font collection at [fonts.sanchaya.net](https://fonts.sanchaya.net) for individual font licenses (mix of OFL and proprietary).
