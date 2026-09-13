/* LS110600 intended engine surface:
   - start swich(2)
   - never stamp manifesto into astory
   - book lives at book.html
*/
(function (root) {
  const NAV = 'style="color:#ffb347;margin:0 .4rem"';

  function nav(prev, next) {
    const bits = [];
    if (prev != null) bits.push('<a href="javascript:swich(' + prev + ');mvx();" ' + NAV + '>← Previous</a>');
    if (next != null) bits.push('<a href="javascript:swich(' + next + ');mvx();" ' + NAV + '>Continue →</a>');
    return '<p class="stepo-nav">' + bits.join(' · ') + '</p>';
  }

  const CSS = '#neuron-hunters-host,#neuron-hunters,section.funebra-project,.funebra-project,span[id^="astory"] .funebra-project{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important}';

  function looksLikeManifesto(s) {
    s = String(s || '');
    return s.indexOf('funebra-project') !== -1 || s.indexOf('NEURON HUNTERS') !== -1;
  }

  function hideManifesto() {
    let st = document.getElementById('neuron-hunters-css');
    if (!st) {
      st = document.createElement('style');
      st.id = 'neuron-hunters-css';
      document.head.appendChild(st);
    }
    st.textContent = CSS;
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
    root.stepo[1] = nav(null, 2);
    if (root.stepo[2]) root.stepo[2] = withNav(root.stepo[2], 1, 3);
    if (root.stepo[3]) root.stepo[3] = withNav(root.stepo[3], 2, 4);
    if (root.stepo[4]) root.stepo[4] = withNav(root.stepo[4], 3, null);
  }

  function wrapSwich() {
    if (root.swich && root.swich.__funebraNav) return root.swich;
    const inner = typeof root.swich === 'function' ? root.swich : function (cnt) {
      if (root.itext && root.stepo) root.itext.value = root.stepo[cnt] || '';
    };
    function swich(cnt) {
      const n = Number(cnt);
      inner(n);
      if (root.itext && looksLikeManifesto(root.itext.value)) root.itext.value = '"\u263B"';
      hideManifesto();
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
      hideManifesto();
      return r;
    };
    root.mvx.__funebraNav = true;
  }

  function boot() {
    hideManifesto();
    wireTape();
    wrapSwich()(2);
    wrapMvx();
    hideManifesto();
  }

  root.installStepoGateway = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
  root.addEventListener('load', function () { setTimeout(boot, 0); });
  setTimeout(hideManifesto, 50);
  setTimeout(boot, 400);
  setTimeout(hideManifesto, 1200);
})(typeof window !== 'undefined' ? window : globalThis);
