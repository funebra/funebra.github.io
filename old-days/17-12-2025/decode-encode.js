/**
 * dec2bqc(N) -> Balanced Quad Carry (digit-bounded 0..9) token
 *
 * Returns strings like:
 *   "a0_0_0_0", "b9_0_0_0", "c7_8_8_8", "za0_0_0_0", ...
 *
 * Canon (as established):
 * - Digits are 0..9 only.
 * - Each series block has 40 values.
 * - For series index s:
 *     base = 40*s
 *     carry-in boundary (base-1) is encoded as: <series>9_0_0_0   (for s>=1)
 *     base..base+36 use the unique balanced quads for 0..36
 *     base+37 -> 9_9_9_0
 *     base+38 -> 9_9_0_0
 * - For s=0 ("a"), there is no base-1 state; 0..36 balanced, 37->9_9_9_0, 38->9_9_0_0.
 *
 * Series labels:
 *  s=0..25 -> "a".."z"
 *  s>=26   -> "z" + ("a".."z" for (s-26)), i.e. 26->"za", 27->"zb", ...
 *  (This matches your: za0_0_0_0 = 1040)
 */

function seriesLabel(s) {
  if (!Number.isInteger(s) || s < 0) throw new Error("seriesLabel: s must be integer >= 0");
  const a = "a".charCodeAt(0);
  if (s <= 25) return String.fromCharCode(a + s);
  const k = s - 26; // 0->za, 1->zb, ...
  if (k > 25) throw new Error("seriesLabel: this simple scheme supports s up to 51 (z + a..z)");
  return "z" + String.fromCharCode(a + k);
}

function balancedQuad0to36(n) {
  // Unique balanced representation for n in 0..36
  const q = Math.floor(n / 4);
  const r = n % 4;
  let i = q, j = q, k = q, l = q;
  if (r >= 1) l++;
  if (r >= 2) k++;
  if (r >= 3) j++;
  // digits must stay 0..9 (true for n<=36)
  return [i, j, k, l];
}

function dec2bqc(N) {
  if (!Number.isInteger(N) || N < 0) throw new Error("dec2bqc: N must be an integer >= 0");

  // a-series special cases (no a base-1 carry-in)
  if (N <= 38) {
    const label = "a";
    let quad;
    if (N <= 36) quad = balancedQuad0to36(N);
    else if (N === 37) quad = [9, 9, 9, 0];
    else quad = [9, 9, 0, 0]; // N === 38
    return `${label}${quad.join("_")}`;
  }

  // s such that base-1 <= N < next base-1
  // start(s) = 40*s - 1
  const s = Math.floor((N + 1) / 40);
  const label = seriesLabel(s);
  const start = 40 * s - 1;     // carry-in number for this series
  const t = N - start;          // 0..39 position within the 40-number block

  let quad;
  if (t === 0) quad = [9, 0, 0, 0];                 // carry-in
  else if (t >= 1 && t <= 37) quad = balancedQuad0to36(t - 1); // base..base+36
  else if (t === 38) quad = [9, 9, 9, 0];           // base+37
  else if (t === 39) quad = [9, 9, 0, 0];           // base+38
  else throw new Error("dec2bqc: internal range error");

  return `${label}${quad.join("_")}`;
}

/* Example checks:
console.log(dec2bqc(0));     // a0_0_0_0
console.log(dec2bqc(39));    // b9_0_0_0
console.log(dec2bqc(40));    // b0_0_0_0
console.log(dec2bqc(79));    // c9_0_0_0
console.log(dec2bqc(80));    // c0_0_0_0
console.log(dec2bqc(117));   // c9_9_9_0
console.log(dec2bqc(118));   // c9_9_0_0
console.log(dec2bqc(1040));  // za0_0_0_0
console.log(dec2bqc(1080));  // zb0_0_0_0
*/



/**
 * bqc2dec(token) -> decimal integer
 *
 * Accepts strings like:
 *   "a0_0_0_0", "b9_0_0_0", "c7_8_8_8", "za0_0_0_0", "zb9_0_0_0", ...
 *
 * Must match the SAME canon as dec2bqc():
 * - digits are 0..9 only
 * - each series block is 40 values
 * - special states inside a series:
 *     9_0_0_0  -> series carry-in number (base-1), only valid for series index >= 1
 *     9_9_9_0  -> base+37
 *     9_9_0_0  -> base+38
 * - otherwise the quad must equal the unique balancedQuad(sum) for sum in 0..36
 *
 * Series labels:
 *   s=0..25 => "a".."z"
 *   s=26..51 => "za".."zz"  (matches: za0_0_0_0 = 1040)
 */

function parseSeriesLabel(token) {
  const t = token.toLowerCase();
  const a = "a".charCodeAt(0);

  // Supported labels: [a-z] or z[a-z]
  if (t.length >= 2 && t[0] === "z" && t[1] >= "a" && t[1] <= "z") {
    return { label: t.slice(0, 2), s: 26 + (t.charCodeAt(1) - a), rest: token.slice(2) };
  }
  if (t[0] >= "a" && t[0] <= "z") {
    return { label: t[0], s: t.charCodeAt(0) - a, rest: token.slice(1) };
  }
  throw new Error("bqc2dec: invalid series label");
}

function parseQuad(rest) {
  const parts = rest.split("_").map(x => Number(x));
  if (parts.length !== 4 || parts.some(x => !Number.isInteger(x))) {
    throw new Error("bqc2dec: quad must be four integers like 0_0_1_1");
  }
  if (parts.some(x => x < 0 || x > 9)) {
    throw new Error("bqc2dec: digits must be in 0..9");
  }
  return parts;
}

function balancedQuad0to36(n) {
  // Unique balanced representation for n in 0..36
  const q = Math.floor(n / 4);
  const r = n % 4;
  let i = q, j = q, k = q, l = q;
  if (r >= 1) l++;
  if (r >= 2) k++;
  if (r >= 3) j++;
  return [i, j, k, l];
}

function sameQuad(a, b) {
  return a.length === b.length && a.every((v, idx) => v === b[idx]);
}

function bqc2dec(token) {
  if (typeof token !== "string" || token.length < 2) {
    throw new Error("bqc2dec: token must be a non-empty string");
  }

  const { s, rest } = parseSeriesLabel(token);
  const quad = parseQuad(rest);

  const Q9000 = [9, 0, 0, 0];
  const Q9990 = [9, 9, 9, 0];
  const Q9900 = [9, 9, 0, 0];

  // a-series special
  if (s === 0) {
    if (sameQuad(quad, Q9990)) return 37;
    if (sameQuad(quad, Q9900)) return 38;

    const sum = quad.reduce((acc, v) => acc + v, 0);
    if (sum < 0 || sum > 36) throw new Error("bqc2dec: invalid a-series quad sum");
    const expected = balancedQuad0to36(sum);
    if (!sameQuad(quad, expected)) throw new Error("bqc2dec: non-canonical a-series quad");
    return sum;
  }

  // s >= 1
  const base = 40 * s;

  if (sameQuad(quad, Q9000)) return base - 1;     // carry-in
  if (sameQuad(quad, Q9990)) return base + 37;
  if (sameQuad(quad, Q9900)) return base + 38;

  // normal balanced inside series: base + sum, but must be canonical
  const sum = quad.reduce((acc, v) => acc + v, 0);
  if (sum < 0 || sum > 36) throw new Error("bqc2dec: invalid quad sum for balanced state");
  const expected = balancedQuad0to36(sum);
  if (!sameQuad(quad, expected)) throw new Error("bqc2dec: non-canonical balanced quad");

  return base + sum;
}

/* Example checks:
console.log(bqc2dec("a0_0_0_0")); // 0
console.log(bqc2dec("a0_0_1_1")); // 2
console.log(bqc2dec("b9_0_0_0")); // 39
console.log(bqc2dec("b0_0_0_0")); // 40
console.log(bqc2dec("c9_9_9_0")); // 117
console.log(bqc2dec("c9_9_0_0")); // 118
console.log(bqc2dec("za0_0_0_0"));// 1040
console.log(bqc2dec("zb0_0_0_0"));// 1080
*/
