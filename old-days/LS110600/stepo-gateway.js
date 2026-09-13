/* LS110600 — always begin with swich(2)
   stepo[1] gateway is Previous from 2
*/
(function (root) {
  const NAV = 'style="color:#ffb347;margin:0 .4rem"';

  function nav(prev, next) {
    const bits = [];
    if (prev != null) bits.push('<a href="javascript:swich(' + prev + ');mvx();" ' + NAV + '>← Previous</a>');
    if (next != null) bits.push('<a href="javascript:swich(' + next + ');mvx();" ' + NAV + '>Continue →</a>');
    return '<p class="stepo-nav">' + bits.join(' · ') + '</p>';
  }

  const STEPO_1 = `<section class="funebra-project" id="neuron-hunters">
  <header>
    <p class="project-index">FUNEBRA™ PROJECT · STEP 01</p>
    <h1>NEURON HUNTERS</h1>
    <p class="subtitle">Biology · Technology · Life · Death · The Quest for Existence</p>
  </header>
  <article>
    <h2>The Living Signal</h2>
    <p>Neuron Hunters explores the boundary between the biological organism and the technologies created to observe, preserve and extend it.</p>
    <blockquote>If existence produces a signal, can the signal survive its source?</blockquote>
  </article>
  <article>
    <h2>UFO · The Unidentified Observation</h2>
    <p>UFO represents what has been observed but not yet identified.</p>
    <p>Funebra does not convert uncertainty into proof. It preserves the difference between observation, interpretation and verified evidence.</p>
    <p class="formula">Observation ≠ Interpretation ≠ Proof</p>
  </article>
  <article>
    <h2>Funebra Biology and Technology</h2>
    <p>A biological event may be registered as a BN-point without claiming the record is the living being.</p>
    <p class="formula">Biological event → BN-point → Relation → Technological form</p>
  </article>
  <article>
    <h2>Life / Death</h2>
    <p class="formula">Life → Experience → Trace → Memory → Transformation</p>
  </article>
  <article>
    <h2>Quest for Existence</h2>
    <blockquote>We hunt neither neurons nor unknown objects.<br>We hunt the relations through which existence becomes visible.</blockquote>
  </article>
  <footer>
    <p>FUNEBRA™ — From Formula to Form.</p>
    ${nav(null, 2)}
  </footer>
</section>`;

  const CSS = `#neuron-hunters-host{position:relative;z-index:15;padding:12px 12px 80px}#neuron-hunters-host.is-idle{display:none}.funebra-project{max-width:42rem;margin:2rem auto;padding:1.5rem 1.4rem;color:#e8e6dc;background:rgba(8,10,16,.88);border:1px solid rgba(255,179,71,.35);border-radius:14px;font:16px/1.55 Georgia,serif}.funebra-project .project-index{letter-spacing:.14em;font:11px ui-monospace,monospace;color:#ffb347}.funebra-project h1{font:700 1.85rem/1.15 Trebuchet MS,sans-serif;color:#fff}.funebra-project h2{color:#ffb347}.funebra-project .formula{font:13px ui-monospace,monospace;color:#9fd6ff}.funebra-project blockquote{border-left:3px solid #ffb347;padding-left:.8rem}.stepo-nav a{color:#ffb347}`;

  function ensureHost() {
    if (!document.getElementById('neuron-hunters-css')) {
      const st = document.createElement('style');
      st.id = 'neuron-hunters-css';
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    let host = document.getElementById('neuron-hunters-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'neuron-hunters-host';
      host.className = 'is-idle';
      const canvas = document.getElementById('funebraCanvas');
      if (canvas && canvas.parentNode) canvas.parentNode.insertBefore(host, canvas.nextSibling);
      else document.body.insertBefore(host, document.body.firstChild);
    }
    return host;
  }

  function withNav(html, prev, next) {
    const s = String(html == null ? '' : html);
    if (s.indexOf('stepo-nav') !== -1) return s;
    return s + nav(prev, next);
  }

  function wireTape() {
    if (!Array.isArray(root.stepo)) root.stepo = [0, '', '', '', '', '', 'end'];
    root.stepo[1] = STEPO_1;
    if (root.stepo[2]) root.stepo[2] = withNav(root.stepo[2], 1, 3);
    if (root.stepo[3]) root.stepo[3] = withNav(root.stepo[3], 2, 4);
    if (root.stepo[4]) root.stepo[4] = withNav(root.stepo[4], 3, null);
  }

  function applyFrame(cnt) {
    const host = ensureHost();
    if (cnt === 1) {
      host.classList.remove('is-idle');
      host.innerHTML = STEPO_1;
    } else {
      host.classList.add('is-idle');
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
      applyFrame(n);
      root.__stepoIndex = n;
      return n;
    }
    swich.__funebraNav = true;
    root.swich = swich;
    return swich;
  }

  root.STEPO_1 = STEPO_1;

  root.installStepoGateway = function installStepoGateway() {
    wireTape();
    wrapSwich()(2);
    return root.stepo[1];
  };

  function boot() {
    wireTape();
    wrapSwich()(2);
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
