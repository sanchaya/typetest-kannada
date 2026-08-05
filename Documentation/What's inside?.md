# The app is organized exactly per your spec, all inlined into one file:

* uploader.js logic — drag-and-drop or file picker, accepts TTF/OTF/WOFF/WOFF2
* fontLoader.js logic — generates TestFont_<timestamp> names on every upload so cache is never an issue; injects a dynamic @font-face block
* cache.js logic — tracks all objectURLs and calls URL.revokeObjectURL() on reset
* controls.js logic — four live sliders: size (12–120px), line-height, tracking, word-spacing
* fontSources.js logic — Google Fonts loader, ಸಂಚಯ catalog, and system fonts via the Local Font Access API (Chrome/Edge)
* testContent.js — 25 test tabs: Overview type profile, vowels, consonants, matra/gunita forms, conjuncts (ottakshara), words, lettering showcase, vachana, prose, print, waterfall (8→96px), hinting (9→18px), and a custom text input
* profile.js logic — Overview dashboard: headline readability, per-role suitability scores, coverage & shaping metrics, diagnostics, loaded-fonts comparison, and report/JSON export
* feedback.js logic — Designer mode question builder (free text / rating / choice) with JSON export+import; Tester mode answers plus pen/box SVG annotations on each layout; answers persist locally and export as JSON or a print-ready PDF
* walkthrough.js logic — first-run guided tour across all tabs, replayable from the help button
* OpenType toggles — ligatures and kerning on/off via font-feature-settings
* Session history — up to 8 previously loaded fonts, switchable with a click
* Dark background toggle — flip the render area to dark for contrast testing
* Reset — clears all fonts, revokes all URLs, resets all controls
