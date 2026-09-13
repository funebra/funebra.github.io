/* LS110600: stepo[1] reveals Neuron Hunters as an astory series. */
(function (root) {
  const NAV = 'style="color:#ffb347;margin:0 .35rem"';
  function nav(prev, next) {
    const bits = [];
    if (prev != null) bits.push('<a href="javascript:swich(' + prev + ');mvx();" ' + NAV + '>← Previous</a>');
    if (next != null) bits.push('<a href="javascript:swich(' + next + ');mvx();" ' + NAV + '>Continue →</a>');
    return '<p class="stepo-nav">' + bits.join(' · ') + '</p>';
  }

  const SERIES = [
    '<p class="project-index">FUNEBRA™ · STEP 01</p><h1>NEURON HUNTERS</h1><p class="subtitle">Biology · Technology · Life · Death · The Quest for Existence</p>',
    '<h2>The Living Signal</h2><p>Neuron Hunters explores the boundary between the biological organism and the technologies created to observe, preserve and extend it.</p>',
    '<blockquote>If existence produces a signal, can the signal survive its source?</blockquote>',
    '<h2>UFO · The Unidentified Observation</h2><p>UFO represents what has been observed but not yet identified.</p>',
    '<p>Funebra does not convert uncertainty into proof.</p><p class="formula">Observation ≠ Interpretation ≠ Proof</p>',
    '<h2>Biology / Technology</h2><p class="formula">Biological event → BN-point → Relation → Technological form</p>',
    '<h2>Life / Death</h2><p class="formula">Life → Experience → Trace → Memory → Transformation</p>',
    '<h2>Quest for Existence</h2><blockquote>We hunt neither neurons nor unknown objects.<br>We hunt the relations through which existence becomes visible.</blockquote>',
    '<p>FUNEBRA™ — From Formula to Form.</p>' + nav(null, 2)
  ];

  const STEPO_1 = '<section class="funebra-project" id="neuron-hunters">' + SERIES.join('') + '</section>';

  const CSS = [
    '#stepo-nav-bar{position:fixed;left:12px;bottom:12px;z-index:100000;background:rgba(8,10,16,.9);border:1px solid rgba(255,179,71,.4);border-radius:8px;padding:6px 10px;font:13px ui-monospace,monospace}',
    '#stepo-nav-bar a{color:#ffb347;margin:0 .35rem;text-decoration:none}',
    'span[id^="astory"]{max-width:220px;color:#e8e6dc;font:13px/1.35 Georgia,serif}',
    'span[id^="astory"] h1{font:700 16px Trebuchet MS,sans-serif;color:#fff;margin:0 0 .3rem}',
    'span[id^="astory"] h2{font:700 13px Trebuchet MS,sans-serif;color:#ffb347;margin:0 0 .25rem}',
    'span[id^="astory"] .formula{font:11px ui-monospace,monospace;color:#9fd6ff}',
    'span[id^="astory"] .project-index{font:10px ui-monospace,monospace;color:#ffb347;letter-spacing:.08em}',
    'span[id^="astory"] blockquote{border-left:2px solid #ffb347;margin:0;padding-left:.5rem}',
    '#neuron-hunters-host{display:none!important}'
  ].join('');

  function looksLikeManifesto(s) {
    return String(s || '').indexOf('funebra-project') !== -1;
  }

  function ensureBar() {
    let st = document.getElementById('neuron-hunters-css');
    if (!st) { st = document.createElement('style'); st.id = 'neuron-hunters-css'; document.head.appendChild(st); }
    st.textContent = CSS;
    let bar = document.getElementById('stepo-nav-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'stepo-nav-bar';
      document.body.appendChild(bar);
    }
    return bar;
  }

  function cellId(i) { return 'astory' + i; }

  function ensureSeriesCells() {
    const n = SERIES.length;
    if (root.shape) root.shape.value = 'astory';
    if (root.steps) root.steps.value = '1';
    if (root.stpStart) root.stpStart.value = '0';
    if (root.stpEnd) root.stpEnd.value = String(Math.max(Number(root.stpEnd && root.stpEnd.value) || 0, n));
    for (let i = 1; i <= n; i++) {
      if (!document.getElementById(cellId(i))) {
        const el = document.createElement('span');
        el.id = cellId(i);
        el.style.position = 'absolute';
        el.style.cursor = 'pointer';
        document.body.appendChild(el);
      }
    }
  }

  function layoutSeries() {
    const n = SERIES.length;
    const colW = 230, rowH = 150, cols = 3;
    const x0 = 24, y0 = 72;
    for (let i = 1; i <= n; i++) {
      const el = document.getElementById(cellId(i));
      if (!el) continue;
      const c = (i - 1) % cols;
      const r = Math.floor((i - 1) / cols);
      el.style.left = (x0 + c * colW) + 'px';
      el.style.top = (y0 + r * rowH) + 'px';
      el.style.zIndex = String(10 + i);
      el.innerHTML = SERIES[i - 1];
    }
  }

  function clearSeries() {
    for (let i = 1; i <= SERIES.length; i++) {
      const el = document.getElementById(cellId(i));
      if (el && looksLikeManifesto(el.innerHTML) === false) {
        /* still clear our fragments */
      }
      if (el) {
        const html = el.innerHTML || '';
        if (html.indexOf('NEURON HUNTERS') !== -1 || html.indexOf('Living Signal') !== -1 || html.indexOf('Quest for Existence') !== -1 || html.indexOf('FUNEBRA') !== -1) {
          el.innerHTML = '';
        }
      }
    }
  }

  function applyFrame(n) {
    const bar = ensureBar();
    if (n === 1) {
      ensureSeriesCells();
      layoutSeries();
      bar.innerHTML = '<a href="javascript:swich(2);mvx();">Continue → stepo[2]</a>';
      if (root.itext) root.itext.value = '"\u263B"';
    } else {
      clearSeries();
      bar.innerHTML = '<a href="javascript:swich(1);mvx();">← Previous stepo[1] Neuron Hunters</a>' +
        (n < 4 ? ' · <a href="javascript:swich(' + (n + 1) + ');mvx();">Continue →</a>' : '');
      if (root.itext && looksLikeManifesto(root.itext.value)) root.itext.value = '"\u263B"';
    }
  }

  function forcePrevOnTwo(html) {
    const s = String(html == null ? '' : html);
    if (looksLikeManifesto(s)) return nav(1, 3);
    if (s.indexOf('swich(1)') !== -1) return s;
    return '<a href="javascript:swich(1);mvx();" ' + NAV + '>← Previous</a> · ' + s;
  }

  function withNav(html, prev, next) {
    const s = String(html == null ? '' : html);
    if (s.indexOf('swich(' + prev + ')') !== -1) return s;
    return s + nav(prev, next);
  }

  function wireTape() {
    if (!Array.isArray(root.stepo)) root.stepo = [0, '', '', '', '', '', 'end'];
    root.stepo[1] = STEPO_1;
    root.stepo[2] = forcePrevOnTwo(root.stepo[2] || '');
    if (root.stepo[3]) root.stepo[3] = withNav(root.stepo[3], 2, 4);
    if (root.stepo[4]) root.stepo[4] = withNav(root.stepo[4], 3, null);
    root.STEPO_1 = STEPO_1;
    root.STEPO_1_SERIES = SERIES;
  }

  function wrapSwich() {
    if (root.swich && root.swich.__funebraNav) return root.swich;
    const inner = typeof root.swich === 'function' ? root.swich : function () {};
    function swich(cnt) {
      const n = Number(cnt);
      if (n !== 1) {
        try { inner(n); } catch (_) {}
      }
      applyFrame(n);
      root.__stepoIndex = n;
      return n;
    }
    swich.__funebraNav = true;
    root.swich = swich;
    return swich;
  }

  function wrapMvx() {
    if (!root.mvx || root.mvx.__funebraNav) return;
    const inner = root.mvx;
    root.mvx = function () {
      if (root.itext && looksLikeManifesto(root.itext.value)) root.itext.value = '"\u263B"';
      const r = inner.apply(this, arguments);
      applyFrame(root.__stepoIndex == null ? 2 : root.__stepoIndex);
      return r;
    };
    root.mvx.__funebraNav = true;
  }

  function boot() {
    wireTape();
    wrapSwich()(2);
    wrapMvx();
    applyFrame(2);
  }

  root.installStepoGateway = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
  root.addEventListener('load', function () { setTimeout(boot, 0); });
})(typeof window !== 'undefined' ? window : globalThis);
