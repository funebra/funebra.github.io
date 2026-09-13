/* LS110600: stepo[1] = manifesto HTML (slot only).
   Launch remains swich(2). Manifesto is not itext for mvx().
*/
(function (root) {
  const NAV = 'style="color:#ffb347;margin:0 .4rem"';
  function nav(prev, next) {
    const bits = [];
    if (prev != null) bits.push('<a href="javascript:swich(' + prev + ');mvx();" ' + NAV + '>← Previous</a>');
    if (next != null) bits.push('<a href="javascript:swich(' + next + ');mvx();" ' + NAV + '>Continue →</a>');
    return '<p class="stepo-nav">' + bits.join(' · ') + '</p>';
  }

  const STEPO_1 = '<section class="funebra-project" id="neuron-hunters">  <header>    <p class="project-index">FUNEBRA™ PROJECT · STEP 01</p>    <h1>NEURON HUNTERS</h1>    <p class="subtitle">Biology · Technology · Life · Death · The Quest for Existence</p>  </header>  <article>    <h2>The Living Signal</h2>    <p>Neuron Hunters explores the boundary between the biological organism and the technologies created to observe, preserve and extend it.</p>    <blockquote>If existence produces a signal, can the signal survive its source?</blockquote>  </article>  <article>    <h2>UFO · The Unidentified Observation</h2>    <p>UFO represents what has been observed but not yet identified.</p>    <p>Funebra does not convert uncertainty into proof. It preserves the difference between observation, interpretation and verified evidence.</p>    <p class="formula">Observation ≠ Interpretation ≠ Proof</p>  </article>  <article>    <h2>Funebra Biology and Technology</h2>    <p>A biological event may be registered as a BN-point without claiming the record is the living being.</p>    <p class="formula">Biological event → BN-point → Relation → Technological form</p>  </article>  <article>    <h2>Life / Death</h2>    <p class="formula">Life → Experience → Trace → Memory → Transformation</p>  </article>  <article>    <h2>Quest for Existence</h2>    <blockquote>We hunt neither neurons nor unknown objects.<br>We hunt the relations through which existence becomes visible.</blockquote>  </article>  <footer>    <p>FUNEBRA™ — From Formula to Form.</p>    <p class="stepo-nav"><a href="javascript:swich(2);mvx();" style="color:#ffb347;margin:0 .4rem">Continue →</a></p>  </footer></section>';

  const CSS = [
    '#neuron-hunters-host.is-idle{display:none}',
    '#neuron-hunters-host{position:relative;z-index:20;max-width:42rem;margin:1rem auto;padding:0 12px 80px}',
    '.funebra-project{max-width:42rem;margin:0 auto;padding:1.5rem 1.4rem;color:#e8e6dc;background:rgba(8,10,16,.92);border:1px solid rgba(255,179,71,.35);border-radius:14px;font:16px/1.55 Georgia,serif}',
    '.funebra-project .project-index{letter-spacing:.14em;font:11px ui-monospace,monospace;color:#ffb347}',
    '.funebra-project h1{font:700 1.85rem/1.15 Trebuchet MS,sans-serif;color:#fff}',
    '.funebra-project h2{color:#ffb347}',
    '.funebra-project .formula{font:13px ui-monospace,monospace;color:#9fd6ff}',
    '.funebra-project blockquote{border-left:3px solid #ffb347;padding-left:.8rem}',
    'span[id^="astory"] .funebra-project{display:none!important}'
  ].join('');

  function looksLikeManifesto(s) {
    return String(s || '').indexOf('funebra-project') !== -1;
  }

  function ensureHost() {
    let st = document.getElementById('neuron-hunters-css');
    if (!st) { st = document.createElement('style'); st.id = 'neuron-hunters-css'; document.head.appendChild(st); }
    st.textContent = CSS;
    let host = document.getElementById('neuron-hunters-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'neuron-hunters-host';
      const canvas = document.getElementById('funebraCanvas');
      if (canvas && canvas.parentNode) canvas.parentNode.insertBefore(host, canvas.nextSibling);
      else document.body.insertBefore(host, document.body.firstChild);
    }
    return host;
  }

  function applyFrame(n) {
    const host = ensureHost();
    if (n === 1) {
      host.classList.remove('is-idle');
      host.innerHTML = STEPO_1;
    } else {
      host.classList.add('is-idle');
      host.innerHTML = '';
    }
    document.querySelectorAll('[id^="astory"]').forEach(function (el) {
      if (looksLikeManifesto(el.innerHTML)) el.innerHTML = '';
    });
    if (root.itext && looksLikeManifesto(root.itext.value)) root.itext.value = '"\u263B"';
  }

  function withNav(html, prev, next) {
    const s = String(html == null ? '' : html);
    if (looksLikeManifesto(s)) return nav(prev, next);
    if (s.indexOf('stepo-nav') !== -1) return s;
    return s + nav(prev, next);
  }

  function wireTape() {
    if (!Array.isArray(root.stepo)) root.stepo = [0, '', '', '', '', '', 'end'];
    root.stepo[1] = STEPO_1;
    if (root.stepo[2]) root.stepo[2] = withNav(root.stepo[2], 1, 3);
    if (root.stepo[3]) root.stepo[3] = withNav(root.stepo[3], 2, 4);
    if (root.stepo[4]) root.stepo[4] = withNav(root.stepo[4], 3, null);
    root.STEPO_1 = STEPO_1;
  }

  function wrapSwich() {
    if (root.swich && root.swich.__funebraNav) return root.swich;
    const inner = typeof root.swich === 'function' ? root.swich : function () {};
    function swich(cnt) {
      const n = Number(cnt);
      if (n === 1) {
        if (root.itext) root.itext.value = '"\u263B"';
      } else {
        try { inner(n); } catch (_) {}
        if (root.itext && looksLikeManifesto(root.itext.value)) root.itext.value = '"\u263B"';
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
