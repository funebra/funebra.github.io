/* ============================================================
   BQC — digit-bounded 0..9 (your canon: base+39 = 9_0_0_0)
   Mapping inside each 40-block:
     0..36 -> balanced(0..36)
     37    -> 9_9_9_0
     38    -> 9_9_0_0
     39    -> 9_0_0_0
   ============================================================ */

const Q9000 = [9, 0, 0, 0];
const Q9990 = [9, 9, 9, 0];
const Q9900 = [9, 9, 0, 0];

function sameQuad(a, b) {
  return a.length === 4 && b.length === 4 && a.every((v, i) => v === b[i]);
}

// --- series labels: a..z, za..zz (same as before) ---
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

// Unique balanced representation for n in 0..36
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

/** dec -> bqc **/
function dec2bqc(N) {
  if (!Number.isInteger(N) || N < 0) throw new Error("dec2bqc: N must be integer >= 0");

  const s = Math.floor(N / 40);
  const off = N % 40;
  const label = seriesLabel(s);

  let quad;
  if (off <= 36) quad = balancedQuad0to36(off);
  else if (off === 37) quad = Q9990;
  else if (off === 38) quad = Q9900;
  else quad = Q9000; // off === 39

  return `${label}${quad.join("_")}`;
}

/** bqc -> dec **/
function bqc2dec(token) {
  if (typeof token !== "string" || token.length < 2) {
    throw new Error("bqc2dec: token must be a non-empty string");
  }

  const { s, rest } = parseSeriesLabel(token);
  const quad = parseQuad(rest);
  const base = 40 * s;

  // specials (fixed offsets)
  if (sameQuad(quad, Q9990)) return base + 37;
  if (sameQuad(quad, Q9900)) return base + 38;
  if (sameQuad(quad, Q9000)) return base + 39;

  // balanced (must be canonical)
  const sum = quad[0] + quad[1] + quad[2] + quad[3];
  if (sum < 0 || sum > 36) throw new Error("bqc2dec: invalid balanced sum (must be 0..36)");
  const expected = balancedQuad0to36(sum);
  if (!sameQuad(quad, expected)) throw new Error("bqc2dec: non-canonical balanced quad");

  return base + sum;
}

// export { dec2bqc, bqc2dec };



