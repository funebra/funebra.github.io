/**
 * Balanced Quad Carry System (digit-bounded 0..9) — JS converter
 *
 * Canon rules (as locked in our thread):
 *  - Digits are 0..9 only.
 *  - a-series covers:
 *      0..36  -> balancedQuad(n)
 *      37     -> 9_9_9_0
 *      38     -> 9_9_0_0
 *      39     -> b9_0_0_0 (series carry-in)
 *  - For any series s >= 1 (b=1, c=2, d=3, ...), the block is 40 values:
 *      N = 40*s - 1         -> 9_0_0_0   (carry-in)
 *      N = 40*s + 0..36     -> balancedQuad(0..36)
 *      N = 40*s + 37        -> 9_9_9_0
 *      N = 40*s + 38        -> 9_9_0_0
 *      N = 40*s + 39        -> (next series carry-in) = (s+1)9_0_0_0
 *
 * So inside series s>=1:  N = 40*s + sum(quad)   for balanced states.
 */

function seriesLetter(s) {
  return String.fromCharCode("a".charCodeAt(0) + s);
}

function seriesIndex(letter) {
  const s = letter.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  if (s < 0 || s > 25) throw new Error("Series letter must be a..z");
  return s;
}

// Unique balanced 4-slot encoding for n in [0..36] (digits stay <=9)
function balancedQuad(n) {
  if (!Number.isInteger(n) || n < 0 || n > 36) {
    throw new Error("balancedQuad expects integer n in [0..36]");
  }
  const q = Math.floor(n / 4);
  const r = n % 4;

  // start [q,q,q,q]
  let i = q, j = q, k = q, l = q;

  // add remainder to rightmost r slots
  if (r >= 1) l++;
  if (r >= 2) k++;
  if (r >= 3) j++;

  // digits must be 0..9 in this canon
  if ([i, j, k, l].some(x => x < 0 || x > 9)) {
    throw new Error("Digit overflow: canon restricts digits to 0..9");
  }

  return [i, j, k, l];
}

function quadToString(q) {
  return q.join("_");
}

function stringToQuad(str) {
  const parts = str.split("_").map(x => Number(x));
  if (parts.length !== 4 || parts.some(x => !Number.isInteger(x))) {
    throw new Error("Quad must be four integers like 0_0_1_1");
  }
  if (parts.some(x => x < 0 || x > 9)) {
    throw new Error("Digits must be in 0..9");
  }
  return parts;
}

function sameQuad(a, b) {
  return a.length === b.length && a.every((v, idx) => v === b[idx]);
}

const Q_9000 = [9, 0, 0, 0];
const Q_9990 = [9, 9, 9, 0];
const Q_9900 = [9, 9, 0, 0];

/**
 * Encode decimal N -> string like "c7_8_8_8"
 */
function encode(N) {
  if (!Number.isInteger(N) || N < 0) throw new Error("encode expects N >= 0 integer");

  // a-series special start (no -1 carry-in state)
  if (N <= 38) {
    const letter = "a";
    let quad;
    if (N <= 36) quad = balancedQuad(N);
    else if (N === 37) quad = Q_9990;
    else quad = Q_9900; // N === 38
    return `${letter}${quadToString(quad)}`;
  }

  // series for N >= 39
  // N=39 -> s=1 ('b'), N=79 -> s=2 ('c'), etc.
  const s = Math.floor((N + 1) / 40);
  const letter = seriesLetter(s);

  // block start is 40*s - 1
  const start = 40 * s - 1;
  const t = N - start; // t in [0..39] within block

  let quad;
  if (t === 0) quad = Q_9000;
  else if (t >= 1 && t <= 37) quad = balancedQuad(t - 1);
  else if (t === 38) quad = Q_9990;
  else if (t === 39) quad = Q_9900;
  else throw new Error("Internal error: out-of-range block offset");

  return `${letter}${quadToString(quad)}`;
}

/**
 * Decode string like "c7_8_8_8" -> decimal N
 * Validates canon (balanced quads must match balancedQuad(sum)).
 */
function decode(token) {
  if (typeof token !== "string" || token.length < 2) throw new Error("decode expects string");

  const letter = token[0].toLowerCase();
  const quadStr = token.slice(1);
  const quad = stringToQuad(quadStr);
  const s = seriesIndex(letter);
  const sum = quad[0] + quad[1] + quad[2] + quad[3];

  // a-series special
  if (s === 0) {
    if (sameQuad(quad, Q_9990)) return 37;
    if (sameQuad(quad, Q_9900)) return 38;

    // normal a: must be balanced representation of its sum, and sum <= 36
    if (sum > 36) throw new Error("Invalid a-series: sum must be <= 36");
    const expected = balancedQuad(sum);
    if (!sameQuad(quad, expected)) throw new Error("Invalid a-series quad (not canonical balanced form)");
    return sum;
  }

  // s >= 1 series
  if (sameQuad(quad, Q_9000)) return 40 * s - 1;
  if (sameQuad(quad, Q_9990)) return 40 * s + 37;
  if (sameQuad(quad, Q_9900)) return 40 * s + 38;

  // normal in-series: N = 40*s + sum(quad), but must be canonical balanced form and sum<=36
  if (sum > 36) throw new Error("Invalid quad: sum must be <= 36 for balanced states");
  const expected = balancedQuad(sum);
  if (!sameQuad(quad, expected)) throw new Error("Invalid quad (not canonical balanced form)");
  return 40 * s + sum;
}

/* --------- quick demo ----------
for (let n of [0,2,36,37,38,39,40,76,77,78,79,80,117,118,119,120]) {
  const t = encode(n);
  console.log(n, "->", t, "->", decode(t));
}
-------------------------------- */

//export { encode, decode };
