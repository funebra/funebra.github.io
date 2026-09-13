/* LS110600 — stepo tape
   Start: always swich(2)
   stepo[1] = gateway (previous from 2)
   UFO = open question, not evidence
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
    <p>Every sensation begins as a change. Every memory leaves a trace. Neurons receive signals, form relations and construct temporary maps of a living world.</p>
    <blockquote>If existence produces a signal, can the signal survive its source?</blockquote>
  </article>
  <article>
    <h2>UFO · The Unidentified Observation</h2>
    <p>UFO represents what has been observed but not yet identified. It may appear in the sky, inside a recording, within a memory, or as an unfamiliar pattern in biological or technological data.</p>
    <p>Funebra does not convert uncertainty into proof. It preserves the difference between observation, interpretation and verified evidence.</p>
    <p class="formula">Observation ≠ Interpretation ≠ Proof</p>
  </article>
  <article>
    <h2>Funebra Biology and Technology</h2>
    <p>Funebra connects biological events with technological representations. A heartbeat, neural impulse, movement, voice or memory may be registered as an addressed event—a BN-point—without claiming that the digital record is the living being itself.</p>
    <p class="formula">Biological event → BN-point → Relation → Technological form</p>
    <p>Technology becomes an instrument of observation and construction: it can record traces, reveal relations and create projections, but it must not invent evidence that the source does not contain.</p>
  </article>
  <article>
    <h2>Life / Death</h2>
    <p>Life is not represented as a single number, and death is not treated as a simple deletion. Between them exists a field of events, relationships, transformations, memories and surviving evidence.</p>
    <p>A body may stop producing new biological events while its recorded traces continue to form relations in other lives, machines and stories.</p>
    <p class="formula">Life → Experience → Trace → Memory → Transformation</p>
  </article>
  <article>
    <h2>Quest for Existence</h2>
    <p>The quest is not merely to ask whether something exists. It is to investigate how existence becomes observable, how observation becomes knowledge, and how knowledge becomes form.</p>
    <p>Neuron Hunters searches across the space between organism and machine, certainty and mystery, presence and absence, life and afterlife.</p>
    <blockquote>We hunt neither neurons nor unknown objects.<br>We hunt the relations through which existence becomes visible.</blockquote>
  </article>
  <footer>
    <p>FUNEBRA™ — From Formula to Form.</p>
    <p>Math · Art · Story · BN-points</p>
    ${nav(null, 2)}
  </footer>
</section>`;

  const CSS = `.funebra-project{max-width:42rem;margin:2rem auto 4rem;padding:1.5rem 1.4rem 2rem;color:#e8e6dc;background:rgba(8,10,16,.88);border:1px solid rgba(255,179,71,.35);border-radius:14px;font:16px/1.55 Georgia,"Times New Roman",serif;position:relative;z-index:20}.funebra-project .project-index{letter-spacing:.14em;font:11px/1.3 ui-monospace,monospace;color:#ffb347;margin:0 0 .4rem}.funebra-project h1{font:700 1.85rem/1.15 "Trebuchet MS",sans-serif;margin:.1rem 0 .35rem;color:#fff}.funebra-project .subtitle{margin:0 0 1.2rem;color:#c9c4b3;font-style:italic}.funebra-project h2{font:700 1.05rem/1.2 "Trebuchet MS",sans-serif;color:#ffb347;margin:1.3rem 0 .45rem}.funebra-project p,.funebra-project blockquote{margin:0 0 .75rem}.funebra-project blockquote{border-left:3px solid #ffb347;padding:.2rem 0 .2rem .8rem;color:#f3efe3}.funebra-project .formula{font:13px/1.4 ui-monospace,monospace;color:#9fd6ff}.funebra-project footer{margin-top:1.4rem;padding-top:.8rem;border-top:1px solid rgba(255,179,71,.25);font-size:.85rem;color:#b7b2a3}.stepo-nav{margin:.6rem 0}.stepo-nav a{color:#ffb347}#neuron-hunters-host{position:relative;z-index:15;padding:12px 12px 80px}#neuron-hunters-host.is-idle{display:none}`;

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
    if (root.stepo[2] != null && root.stepo[2] !== '') root.stepo[2] = withNav(root.stepo[2], 1, 3);
    if (root.stepo[3] != null && root.stepo[3] !== '') root.stepo[3] = withNav(root.stepo[3], 2, 4);
    if (root.stepo[4] != null && root.stepo[4] !== '') root.stepo[4] = withNav(root.stepo[4], 3, null);
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

  root.STEPO_1 = STEPO_1;

  const prevSwich = root.swich;
  root.swich = function swich(cnt) {
    const n = Number(cnt);
    if (typeof prevSwich === 'function' && prevSwich !== root.swich) {
      try { prevSwich(n); } catch (_) {}
    } else if (root.itext) {
      root.itext.value = root.stepo && root.stepo[n] != null ? root.stepo[n] : '';
    }
    applyFrame(n);
    root.__stepoIndex = n;
    return n;
  };

  root.installStepoGateway = function installStepoGateway() {
    wireTape();
    if (typeof root.swich === 'function') root.swich(2);
    else if (root.itext && root.stepo) root.itext.value = root.stepo[2];
    applyFrame(2);
    return root.stepo[1];
  };

  function boot() {
    wireTape();
    root.swich(2);
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
