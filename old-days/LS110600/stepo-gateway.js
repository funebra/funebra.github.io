/* LS110600 engine: hide manifesto. Book lives at book.html.
   Always start stepo[2]. Do not stamp essay HTML into astory cells.
*/
(function (root) {
  const NAV = 'style="color:#ffb347;margin:0 .4rem"';

  function nav(prev, next) {
    const bits = [];
    if (prev != null) bits.push('<a href="javascript:swich(' + prev + ');mvx();" ' + NAV + '>← Previous</a>');
    if (next != null) bits.push('<a href="javascript:swich(' + next + ');mvx();" ' + NAV + '>Continue →</a>');
    return '<p class="stepo-nav">' + bits.join(' · ') + '</p>';
  }

  const CSS = [
    '#neuron-hunters-host, #neuron-hunters, section.funebra-project { display:none !important; }',
    '.funebra-project { display:none !important; }'
  ].join('');

  function hideManifesto() {
    if (!document.getElementById('neuron-hunters-css')) {
      const st = document.createElement('style');
      st.id = 'neuron-hunters-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    ['neuron-hunters-host', 'neuron-hunters'].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) {
        el.innerHTML = '';
        el.classList.add('is-idle');
        el.style.display = 'none';
      }
    });
    document.querySelectorAll('section.funebra-project, .funebra-project').forEach(function (el) {
      el.style.display = 'none';
    });
  }

  function withNav(html, prev, next) {
    const s = String(html == null ? '' : html);
    if (s.indexOf('funebra-project') !== -1 || s.indexOf('NEURON HUNTERS') !== -1 && s.indexOf('<h1>') !== -1) {
      return nav(prev, next);
    }
    if (s.indexOf('stepo-nav') !== -1) return s;
    return s + nav(prev, next);
  }

  function wireTape() {
    if (!Array.isArray(root.stepo)) root.stepo = [0, '', '', '', '', '', 'end'];
    root.stepo[1] = nav(null, 2);
    if (root.stepo[2]) root.stepo[2] = withNav(root.stepo[2], 1, 3);
    if (root.stepo[3]) root.stepo[3] = withNav(root.stepo[3], 2, 4);
    if (root.stepo[4]) root.stepo[4] = withNav(root.stepo[4], 3, null);
    if (root.itext && String(root.itext.value).indexOf('funebra-project') !== -1) {
      root.itext.value = root.stepo[2] || '';
    }
  }

  function wrapSwich() {
    if (root.swich && root.swich.__funebraNav) return root.swich;
    const inner = typeof root.swich === 'function' ? root.swich : function (cnt) {
      if (root.itext && root.stepo) root.itext.value = root.stepo[cnt] || '';
    };
    function swich(cnt) {
      const n = Number(cnt);
      inner(n);
      hideManifesto();
      root.__stepoIndex = n;
      return n;
    }
    swich.__funebraNav = true;
    root.swich = swich;
    return swich;
  }

  root.installStepoGateway = function installStepoGateway() {
    hideManifesto();
    wireTape();
    wrapSwich()(2);
    hideManifesto();
  };

  function boot() {
    hideManifesto();
    wireTape();
    wrapSwich()(2);
    hideManifesto();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
  root.addEventListener('load', function () {
    setTimeout(boot, 0);
  });
})(typeof window !== 'undefined' ? window : globalThis);
