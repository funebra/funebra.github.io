// Funebra™ Motion — MPTA family (pure ESM)
// pLabs Entertainment © 1982–2025

export function mptaScalar(x, vx = 0, vy = 0, k = 1/9) {
  return x + ((vx + x) * (vy + x)) * k;
}

export function mpta2D([x, y], vx = 0, vy = 0, k = 1/9) {
  return [
    mptaScalar(x, vx, vy, k),
    mptaScalar(y, vy, vx, k),
  ];
}

export function makeMPTAIntegrator({ vx = 0, vy = 0, k = 1/9, damping = 0.0 } = {}) {
  let _vx = vx, _vy = vy;

  return {
    step(x, y, dt = 1) {
      const nx = mptaScalar(x, _vx, _vy, k);
      const ny = mptaScalar(y, _vy, _vx, k);
      const ax = (nx - x);
      const ay = (ny - y);
      _vx = (_vx + ax * dt) * (1 - damping);
      _vy = (_vy + ay * dt) * (1 - damping);
      return { x: nx, y: ny, vx: _vx, vy: _vy };
    },
    get state() { return { vx: _vx, vy: _vy }; },
    set state(s) {
      if (!s) return;
      if (Number.isFinite(s.vx)) _vx = s.vx;
      if (Number.isFinite(s.vy)) _vy = s.vy;
    }
  };
}

export function mptaParam2D(t, opts = {}) {
  const {
    ax = 1, ay = 1,
    w1 = 1.7, w2 = 2.3,
    phx = 0, phy = 0,
    vx = 0, vy = 0, k = 1/9,
  } = opts;

  const x0 = ax * Math.sin(w1 * t + phx);
  const y0 = ay * Math.cos(w2 * t + phy);
  const x = mptaScalar(x0, vx, vy, k);
  const y = mptaScalar(y0, vy, vx, k);
  return { x, y };
}

export function mptaParam3D(t, opts = {}) {
  const { x, y } = mptaParam2D(t, opts);
  const z = (opts.zFunc ? opts.zFunc(t) : 0.25 * Math.sin(3 * t));
  return { x, y, z };
}
