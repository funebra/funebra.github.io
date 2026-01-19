/* ============================================================
   Balanced Quad Carry (BQC) — digit-bounded 0..9 (corrected)
   ============================================================ */

function sameQuad(a, b) {
  return a.length === 4 && b.length === 4 && a.every((v, i) => v === b[i]);
}

const Q9000 = [9, 0, 0, 0];
const Q9990 = [9, 9, 9, 0];
const Q9900 = [9, 9, 0, 0];
const Q9999 = [9, 9, 9, 9];

function seriesLabel(s) {
  if (!Number.isInteger(s) || s < 0) throw new Error("seriesLabel: s must be integer >= 0");
  const a = "a".charCodeAt(0);
  if (s <= 25) return String.fromCharCode(a + s);

  const k = s - 26; // 0->za, 1->zb, ...
  if (k < 0 || k > 25) throw new Error("seriesLabel: supported s range is 0..51 (a..z, za..zz)");
  return "z" + String.fromCharCode(a + k);
}

function parseSeriesLabel(token) {
  const t = token.toLowerCase();
  const a = "a".charCodeAt(0);

  if (t.length >= 2 && t[0] === "z" && t[1] >= "a" && t[1] <= "z") {
    return { s: 26 + (t.charCodeAt(1) - a), rest: token.slice(2) };
  }
  if (t[0] >= "a" && t[0] <= "z") {
    return { s: t.charCodeAt(0) - a, rest: token.slice(1) };
  }
  throw new Error("parseSeriesLabel: invalid series label");
}

function parseQuad(rest) {
  const parts = rest.split("_").map(x => Number(x));
  if (parts.length !== 4 || parts.some(x => !Number.isInteger(x))) {
    throw new Error("parseQuad: expected four integers like 0_0_1_1");
  }
  if (parts.some(x => x < 0 || x > 9)) {
    throw new Error("parseQuad: digits must be in 0..9");
  }
  return parts;
}

/**
 * Unique balanced representation for n in 0..36.
 * Matches your canon: 2->0_0_1_1, 3->0_1_1_1, ...
 */
function balancedQuad0to36(n) {
  if (!Number.isInteger(n) || n < 0 || n > 36) {
    throw new Error("balancedQuad0to36: n must be integer in 0..36");
  }
  const q = Math.floor(n / 4);
  const r = n % 4;

  let i = q, j = q, k = q, l = q;
  if (r >= 1) l++;
  if (r >= 2) k++;
  if (r >= 3) j++;

  return [i, j, k, l];
}

/** ------------------ dec -> bqc (corrected) ------------------ **/

function dec2bqc(N) {
  if (!Number.isInteger(N) || N < 0) throw new Error("dec2bqc: N must be an integer >= 0");

  // a-series (special: no a9_0_0_0)
  if (N <= 38) {
    let quad;
    if (N <= 36) quad = balancedQuad0to36(N);
    else if (N === 37) quad = Q9990;
    else quad = Q9900; // 38
    return `a${quad.join("_")}`;
  }

  // Choose series by "carry-in" boundaries: 39->b, 79->c, 119->d, ...
  const s = Math.floor((N + 1) / 40);
  const label = seriesLabel(s);

  const start = 40 * s - 1; // carry-in number for this series
  const t = N - start;      // t in 0..39

  let quad;

  // Canon mapping inside block:
  // t=0   -> 9_0_0_0   (base-1)
  // t=1..37 -> balanced(0..36)  (base..base+36)
  // t=38  -> 9_9_9_0   (base+37)
  // t=39  -> 9_9_0_0   (base+38)
  if (t === 0) quad = Q9000;
  else if (t >= 1 && t <= 37) quad = balancedQuad0to36(t - 1);
  else if (t === 38) quad = Q9990;
  else if (t === 39) quad = Q9900;
  else throw new Error("dec2bqc: internal range error");

  return `${label}${quad.join("_")}`;
}

/** ------------------ bqc -> dec (corrected) ------------------ **/

function bqc2dec(token) {
  if (typeof token !== "string" || token.length < 2) {
    throw new Error("bqc2dec: token must be a non-empty string");
  }

  const { s, rest } = parseSeriesLabel(token);
  const quad = parseQuad(rest);

  // a-series rules
  if (s === 0) {
    if (sameQuad(quad, Q9990)) return 37;
    if (sameQuad(quad, Q9900)) return 38;

    // only canonical balanced quads for 0..36 are allowed in a-series
    const sum = quad[0] + quad[1] + quad[2] + quad[3];
    if (sum < 0 || sum > 36) throw new Error("bqc2dec: invalid a-series sum");
    const expected = balancedQuad0to36(sum);
    if (!sameQuad(quad, expected)) throw new Error("bqc2dec: non-canonical a-series quad");
    return sum;
  }

  // s>=1 series
  const base = 40 * s;

  // Special states
  if (sameQuad(quad, Q9000)) return base - 1; // carry-in boundary
  if (sameQuad(quad, Q9990)) return base + 37;
  if (sameQuad(quad, Q9900)) return base + 38;

  // Balanced state must be exactly the canonical balanced quad for its sum (0..36)
  const sum = quad[0] + quad[1] + quad[2] + quad[3];
  if (sum < 0 || sum > 36) throw new Error("bqc2dec: invalid balanced sum");
  const expected = balancedQuad0to36(sum);
  if (!sameQuad(quad, expected)) throw new Error("bqc2dec: non-canonical balanced quad");

  return base + sum;
}

//export { dec2bqc, bqc2dec };

/* Optional quick test (should all be OK):
const tests = [0,1,2,36,37,38,39,40,76,77,78,79,80,116,117,118,119,120,1040,1080];
for (const n of tests) {
  const t = dec2bqc(n);
  const back = bqc2dec(t);
  console.log(n, "->", t, "->", back, back === n ? "OK" : "FAIL");
}
*/


