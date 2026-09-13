/* LS110600 — stepo[1] existential gateway
   UFO stays an open question, not evidence.
   Chain: Neuron → Signal → Observation → BN → Relation → Existential Form
*/
(function (root) {
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
    <p><a href="javascript:swich(2);mvx();" style="color:#ffb347">Continue →</a></p>
  </footer>
</section>`;

  root.STEPO_1 = STEPO_1;

  root.installStepoGateway = function installStepoGateway() {
    root.stepo = root.stepo || [0, '', '', '', '', '', 'end'];
    root.stepo[1] = STEPO_1;
    if (typeof root.swich === 'function') root.swich(1);
    else if (root.itext) root.itext.value = STEPO_1;
    const host = document.getElementById('neuron-hunters-host');
    if (host) host.innerHTML = STEPO_1;
    return STEPO_1;
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', root.installStepoGateway, { once: true });
  } else {
    root.installStepoGateway();
  }
})(typeof window !== 'undefined' ? window : globalThis);
