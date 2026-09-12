/**
 * Balanced Quad Carry System (digit-bounded 0..9) — JS converter
 */

function seriesLetter(s) {
  return String.fromCharCode("a".charCodeAt(0) + s);
}

function seriesIndex(letter) {
  const s = letter.toLowerCase().charCodeAt(0) - "a".charCodeAt(0);
  if (s < 0 || s > 25) throw new Error("Series letter must be a..z");
  return s;
}

function balancedQuad(n) {
  if (!Number.isInteger(n) || n < 0 || n > 36) {
    throw new Error("balancedQuad expects integer n in [0..36]");
  }
  const q = Math.floor(n / 4);
  const r = n % 4;
  let i = q, j = q, k = q, l = q;
  if (r >= 1) l++;
  if (r >= 2) k++;
  if (r >= 3) j++;
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

function encode(N) {
  if (!Number.isInteger(N) || N < 0) throw new Error("encode expects N >= 0 integer");
  if (N <= 38) {
    const letter = "a";
    let quad;
    if (N <= 36) quad = balancedQuad(N);
    else if (N === 37) quad = Q_9990;
    else quad = Q_9900;
    return `${letter}${quadToString(quad)}`;
  }
  const s = Math.floor((N + 1) / 40);
  const letter = seriesLetter(s);
  const start = 40 * s - 1;
  const t = N - start;
  let quad;
  if (t === 0) quad = Q_9000;
  else if (t >= 1 && t <= 37) quad = balancedQuad(t - 1);
  else if (t === 38) quad = Q_9990;
  else if (t === 39) quad = Q_9900;
  else throw new Error("Internal error: out-of-range block offset");
  return `${letter}${quadToString(quad)}`;
}

function decode(token) {
  if (typeof token !== "string" || token.length < 2) throw new Error("decode expects string");
  const letter = token[0].toLowerCase();
  const quadStr = token.slice(1);
  const quad = stringToQuad(quadStr);
  const s = seriesIndex(letter);
  const sum = quad[0] + quad[1] + quad[2] + quad[3];
  if (s === 0) {
    if (sameQuad(quad, Q_9990)) return 37;
    if (sameQuad(quad, Q_9900)) return 38;
    if (sum > 36) throw new Error("Invalid a-series: sum must be <= 36");
    const expected = balancedQuad(sum);
    if (!sameQuad(quad, expected)) throw new Error("Invalid a-series quad (not canonical balanced form)");
    return sum;
  }
  if (sameQuad(quad, Q_9000)) return 40 * s - 1;
  if (sameQuad(quad, Q_9990)) return 40 * s + 37;
  if (sameQuad(quad, Q_9900)) return 40 * s + 38;
  if (sum > 36) throw new Error("Invalid quad: sum must be <= 36 for balanced states");
  const expected = balancedQuad(sum);
  if (!sameQuad(quad, expected)) throw new Error("Invalid quad (not canonical balanced form)");
  return 40 * s + sum;
}
