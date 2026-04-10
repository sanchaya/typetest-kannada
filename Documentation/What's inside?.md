# The app is organized exactly per your spec, all inlined into one file:

* uploader.js logic — drag-and-drop or file picker, accepts TTF/OTF/WOFF/WOFF2
* fontLoader.js logic — generates TestFont_<timestamp> names on every upload so cache is never an issue; injects a dynamic @font-face block
* cache.js logic — tracks all objectURLs and calls URL.revokeObjectURL() on reset
* controls.js logic — four live sliders: size (12–120px), line-height, tracking, word-spacing
* testContent.js — 9 test sections: vowels, consonants, matra/gunita forms, conjuncts (ottakshara), numerals, words, paragraph, waterfall (14→96px), and a custom text input
* OpenType toggles — ligatures and kerning on/off via font-feature-settings
* Session history — up to 8 previously loaded fonts, switchable with a click
* Dark background toggle — flip the render area to dark for contrast testing
* Reset — clears all fonts, revokes all URLs, resets all controls