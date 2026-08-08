// Core module tests for TypeTest Kannada - Pure function tests
// Run with: node tests/core.test.js

// Node.js browser globals
global.location = { href: 'http://localhost' };

// esc() - HTML escaping
function esc(s) {
  return String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#' + '39;');
}

// safeUrl() - URL sanitization
function safeUrl(u) {
  try { const p = new URL(u, location.href); return (p.protocol === 'http:' || p.protocol === 'https:') ? p.href : ''; } catch (e) { return ''; }
}

// CDN fallback derivation
const RAW_FONT_BASE = 'https://raw.githubusercontent.com/sanchaya/fonts/main/static/Fonts/';
const CDN_FONT_BASE = 'https://fonts.sanchaya.net/Fonts/';
function cdnFallbackUrl(url) {
  return url && url.startsWith && url.startsWith(RAW_FONT_BASE) ? CDN_FONT_BASE + url.slice(RAW_FONT_BASE.length) : null;
}

// slugFamily
function slugFamily(name, prefix) {
  return prefix + name.replace(/[^A-Za-z0-9]+/g, '');
}

// Waterfall state and functions
const waterfallState = { min: 8, max: 96, text: "ಕನ್ನಡ ಭಾಷೆ ಕರ್ನಾಟಕ", edited: new Map() };

function wfSizes() {
  const { min, max } = waterfallState;
  const steps = [1,2,2,3,4,6,8,12,16,24,32,48];
  const sizes = [];
  let curr = min;
  let stepIdx = 0;
  while (curr <= max) {
    sizes.push(curr);
    curr += steps[stepIdx % steps.length];
    stepIdx++;
  }
  return sizes;
}

// LADDER_SIZES
const LADDER_SIZES = [48, 36, 28, 22, 18, 14, 12];

// HINTING_SIZES
const HINTING_SIZES = [9,10,11,12,13,14,15,16,17,18];

// LETTERING_ITEMS
const LETTERING_ITEMS = [
  { text: 'ಕನ್ನಡ', size: 96, caption: 'ಕನ್ನಡ · the script itself' },
  { text: 'ಅಕ್ಷರಶಿಲ್ಪ', size: 72, caption: 'ಅಕ್ಷರ + ಶಿಲ್ಪ · letter-sculpture' },
  { text: 'ಸಂಚಯ', size: 88, caption: 'ಸಂಚಯ · a collection' },
  { text: 'ಗುಣಿತಾಕ್ಷರ', size: 56, caption: 'ಗುಣಿತಾಕ್ಷರ · the syllable matrix' },
  { text: 'ಒತ್ತಕ್ಷರ', size: 56, caption: 'ಒತ್ತಕ್ಷರ · conjunct forms' },
  { text: 'ನಮ್ಮ ಭಾಷೆ ನಮ್ಮ ಹೆಮ್ಮೆ', size: 44, caption: 'ನಮ್ಮ ಭಾಷೆ · a sentence of pride' },
  { text: 'ಸುಂದರ ಕರ್ನಾಟಕ', size: 48, caption: 'ಸುಂದರ · beautiful Karnataka' },
  { text: 'ಮಾತೃಭಾಷೆ', size: 64, caption: 'ಮಾತೃಭಾಷೆ · mother tongue' },
  { text: 'ಪ್ರೀತಿ', size: 80, caption: 'ಪ್ರೀತಿ · love' },
  { text: 'ಅಕ್ಷರಗಳು', size: 68, caption: 'ಅಕ್ಷರಗಳು · letters' }
];

// Test utilities
let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log('  ✓ ' + message);
    passed++;
  } else {
    console.log('  ✗ ' + message);
    failed++;
  }
}

function assertEqual(actual, expected, message) {
  const pass = actual === expected;
  if (pass) {
    console.log('  ✓ ' + message);
    passed++;
  } else {
    console.log('  ✗ ' + message + ' (expected: ' + expected + ', got: ' + actual + ')');
    failed++;
  }
}

console.log('\n=== Core Module Tests ===\n');

// Test esc()
console.log('Testing esc():');
assertEqual(esc('<script>'), '&lt;script&gt;', 'escapes < and >');
assertEqual(esc('hello & goodbye'), 'hello &amp; goodbye', 'escapes &');
assertEqual(esc('"quotes"'), '&quot;quotes&quot;', 'escapes double quotes');
assertEqual(esc("'single'"), '&#' + '39;single&#' + '39;', 'escapes single quotes');
assertEqual(esc(null), '', 'handles null');
assertEqual(esc(undefined), '', 'handles undefined');
assertEqual(esc(123), '123', 'handles numbers');
assertEqual(esc(''), '', 'handles empty string');
assertEqual(esc('no-special-chars'), 'no-special-chars', 'preserves normal text');

// Test safeUrl()
console.log('\nTesting safeUrl():');
assertEqual(safeUrl('https://example.com'), 'https://example.com/', 'allows https');
assertEqual(safeUrl('http://example.com'), 'http://example.com/', 'allows http');
assertEqual(safeUrl('https://example.com/path?query=1'), 'https://example.com/path?query=1', 'preserves path and query');
assertEqual(safeUrl('javascript:alert(1)'), '', 'blocks javascript:');
assertEqual(safeUrl('data:text/html,<script>'), '', 'blocks data:');
assertEqual(safeUrl('//example.com'), 'http://example.com/', 'protocol-relative resolves to http');
assertEqual(safeUrl('ftp://example.com'), '', 'blocks ftp:');
assertEqual(safeUrl(''), 'http://localhost/', 'empty resolves to base');
assertEqual(safeUrl('not-a-url'), 'http://localhost/not-a-url', 'relative resolves to base');
assertEqual(safeUrl('https://example.com#hash'), 'https://example.com/#hash', 'preserves hash');

// Test cdnFallbackUrl()
console.log('\nTesting cdnFallbackUrl():');
const rawUrl = 'https://raw.githubusercontent.com/sanchaya/fonts/main/static/Fonts/Benne/Benne-Regular.ttf';
const expectedCdn = 'https://fonts.sanchaya.net/Fonts/Benne/Benne-Regular.ttf';
assertEqual(cdnFallbackUrl(rawUrl), expectedCdn, 'derives CDN URL from raw');
assertEqual(cdnFallbackUrl('https://example.com/font.ttf'), null, 'returns null for non-raw URLs');
assertEqual(cdnFallbackUrl(''), null, 'returns null for empty');
assertEqual(cdnFallbackUrl(null), null, 'returns null for null');

// Test slugFamily()
console.log('\nTesting slugFamily():');
assertEqual(slugFamily('Benne Regular', 'San_'), 'San_BenneRegular', 'removes spaces');
assertEqual(slugFamily('Font@Name!', 'Test_'), 'Test_FontName', 'removes special chars');
assertEqual(slugFamily('AlreadyClean', 'Pre_'), 'Pre_AlreadyClean', 'preserves clean names');
assertEqual(slugFamily('name-with-dashes', 'Pref_'), 'Pref_namewithdashes', 'removes dashes');
assertEqual(slugFamily('', 'P_'), 'P_', 'handles empty name');
assertEqual(slugFamily('UPPERCASE', 'Pre_'), 'Pre_UPPERCASE', 'preserves uppercase');

// Test waterfallState and wfSizes()
console.log('\nTesting waterfall functions:');
assert(typeof waterfallState === 'object', 'waterfallState exists');
assertEqual(waterfallState.min, 8, 'waterfall min is 8');
assertEqual(waterfallState.max, 96, 'waterfall max is 96');
assertEqual(waterfallState.text, 'ಕನ್ನಡ ಭಾಷೆ ಕರ್ನಾಟಕ', 'waterfall text is correct');
assert(waterfallState.edited instanceof Map, 'waterfallState.edited is Map');

const sizes = wfSizes();
assert(Array.isArray(sizes), 'wfSizes returns array');
assert(sizes.length > 0, 'wfSizes returns non-empty array');
assertEqual(sizes[0], 8, 'first size is min (8)');
assert(sizes[sizes.length - 1] <= 96, 'last size within max');
assert(sizes.every((v, i, a) => i === 0 || v > a[i-1]), 'sizes are strictly increasing');
assert(sizes.every(v => v >= 8 && v <= 96), 'all sizes within range');

// Test LADDER_SIZES
console.log('\nTesting LADDER_SIZES:');
assert(Array.isArray(LADDER_SIZES), 'LADDER_SIZES is array');
assertEqual(LADDER_SIZES.length, 7, 'LADDER_SIZES has 7 entries');
assertEqual(LADDER_SIZES[0], 48, 'first ladder size is 48');
assertEqual(LADDER_SIZES[1], 36, 'second ladder size is 36');
assertEqual(LADDER_SIZES[6], 12, 'last ladder size is 12');
assert(LADDER_SIZES.every((v, i, a) => i === 0 || v < a[i-1]), 'ladder sizes strictly decreasing');

// Test HINTING_SIZES
console.log('\nTesting HINTING_SIZES:');
assert(Array.isArray(HINTING_SIZES), 'HINTING_SIZES is array');
assertEqual(HINTING_SIZES.length, 10, 'HINTING_SIZES has 10 entries (9-18)');
assertEqual(HINTING_SIZES[0], 9, 'first hinting size is 9');
assertEqual(HINTING_SIZES[9], 18, 'last hinting size is 18');
assert(HINTING_SIZES.every((v, i, a) => i === 0 || v === a[i-1] + 1), 'hinting sizes increment by 1');

// Test LETTERING_ITEMS
console.log('\nTesting LETTERING_ITEMS:');
assert(Array.isArray(LETTERING_ITEMS), 'LETTERING_ITEMS is array');
assertEqual(LETTERING_ITEMS.length, 10, 'LETTERING_ITEMS has 10 entries');
assertEqual(LETTERING_ITEMS[0].text, 'ಕನ್ನಡ', 'first lettering item is ಕನ್ನಡ');
assertEqual(LETTERING_ITEMS[0].size, 96, 'first lettering size is 96');
assertEqual(LETTERING_ITEMS[1].text, 'ಅಕ್ಷರಶಿಲ್ಪ', 'second lettering item is ಅಕ್ಷರಶಿಲ್ಪ');
assertEqual(LETTERING_ITEMS[9].text, 'ಅಕ್ಷರಗಳು', 'last lettering item is ಅಕ್ಷರಗಳು');
assert(LETTERING_ITEMS.every(item => item.text && item.size && item.caption), 'all items have required fields');

// Test CDN fallback constants
console.log('\nTesting CDN fallback constants:');
assertEqual(RAW_FONT_BASE, 'https://raw.githubusercontent.com/sanchaya/fonts/main/static/Fonts/', 'RAW_FONT_BASE constant');
assertEqual(CDN_FONT_BASE, 'https://fonts.sanchaya.net/Fonts/', 'CDN_FONT_BASE constant');

// Summary
console.log('\n=== Test Summary ===');
console.log('Passed: ' + passed);
console.log('Failed: ' + failed);
console.log('Total:  ' + (passed + failed));

if (failed > 0) {
  process.exit(1);
} else {
  console.log('\n✓ All tests passed!');
}