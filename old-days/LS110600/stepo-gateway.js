/* LS110600: author tape. mvx must not multiply — stpEnd.value = 0. */
(function (root) {
  const STEPO_1 = '<section class="funebra-project" id="neuron-hunters">  <header>    <p class="project-index">FUNEBRA\u2122 PROJECT \u00b7 STEP 01</p>    <h1>NEURON HUNTERS</h1>    <p class="subtitle">Biology \u00b7 Technology \u00b7 Life \u00b7 Death \u00b7 The Quest for Existence</p>  </header>  <article>    <h2>The Living Signal</h2>    <p>Neuron Hunters explores the boundary between the biological organism and the technologies created to observe, preserve and extend it.</p>    <blockquote>If existence produces a signal, can the signal survive its source?</blockquote>  </article>  <article>    <h2>UFO \u00b7 The Unidentified Observation</h2>    <p>UFO represents what has been observed but not yet identified.</p>    <p>Funebra does not convert uncertainty into proof. It preserves the difference between observation, interpretation and verified evidence.</p>    <p class="formula">Observation \u2260 Interpretation \u2260 Proof</p>  </article>  <article>    <h2>Funebra Biology and Technology</h2>    <p>A biological event may be registered as a BN-point without claiming the record is the living being.</p>    <p class="formula">Biological event \u2192 BN-point \u2192 Relation \u2192 Technological form</p>  </article>  <article>    <h2>Life / Death</h2>    <p class="formula">Life \u2192 Experience \u2192 Trace \u2192 Memory \u2192 Transformation</p>  </article>  <article>    <h2>Quest for Existence</h2>    <blockquote>We hunt neither neurons nor unknown objects.<br>We hunt the relations through which existence becomes visible.</blockquote>  </article>  <footer>    <p>FUNEBRA\u2122 \u2014 From Formula to Form.</p>    <p class="stepo-nav"><a href="javascript:swich(2);mvx();" style="color:#ffb347;margin:0 .4rem">Continue \u2192</a></p>  </footer></section>';

  const STEPO_2 = '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F1104517789201702%2F&show_text=true&width=267&t=0" width="267" height="591" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe><br><a href="javascript:swich(1);mvx();">\u2190 Previous</a> \u00b7 <a href="javascript:swich(3);mvx();">Continue &ndash;&gt;</a>';

  const STEPO_3 = '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/Zah8o4epr7k?si=REat67O1MItmii8W" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><br><a href="javascript:swich(2);mvx();">\u2190 Previous</a> \u00b7 <a href="javascript:swich(4);mvx();">Continue &ndash;&gt;</a>';

  const STEPO_4 = '<img id="myIlluva00" onclick="document.body.style.background=\'url(https://plabs.at.ua/bluetooth/bg/quake_0_0_1.jpg)\'" style="width:360px;height:440px;background:url(https://plabsfill.com/bpot/wow/female/f_0_0_0.gif) 100% 100% / 100% 100%;"><br><audio id="myAudio"><source src="https://plabsfill.com/bluetooth/theme/LS110600/enterUniverse.mp3" type="audio/mpeg"></audio><p>Click the buttons to play or pause the audio.</p><button onclick="playAudio()" type="button">Play Audio</button><button onclick="pauseAudio()" type="button">Pause Audio</button><br><a href="javascript:swich(3);mvx();">\u2190 Previous</a>';

  const CSS = [
    '#stepo-nav-bar{position:fixed;left:12px;bottom:12px;z-index:100000;background:rgba(8,10,16,.92);border:1px solid rgba(255,179,71,.4);border-radius:8px;padding:6px 10px;font:13px ui-monospace,monospace}',
    '#stepo-nav-bar a{color:#ffb347;margin:0 .4rem;text-decoration:none}'
  ].join('');

  function zeroEnd() {
    if (root.stpEnd) root.stpEnd.value = '0';
    if (root.steps) root.steps.value = '1';
    if (root.stpStart) root.stpStart.value = '0';
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

  function installTape() {
    root.stepo = [0, STEPO_1, STEPO_2, STEPO_3, STEPO_4, '', 'end'];
    if (root.shape) root.shape.value = 'astory';
    zeroEnd();
  }

  function paintOnce(html) {
    zeroEnd();
    let el = document.getElementById('astory1');
    if (!el) {
      el = document.createElement('span');
      el.id = 'astory1';
      el.style.position = 'absolute';
      el.style.cursor = 'pointer';
      document.body.appendChild(el);
    }
    el.innerHTML = html || '';
    if (root.itext) root.itext.value = html || '';
  }

  function applyFrame(n) {
    const bar = ensureBar();
    zeroEnd();
    const html = (root.stepo && root.stepo[n]) || '';
    paintOnce(html);
    if (n === 1) {
      bar.innerHTML = '<a href="javascript:swich(2);mvx();">Continue \u2192 stepo[2]</a>';
    } else {
      bar.innerHTML = '<a href="javascript:swich(1);mvx();">\u2190 Previous stepo[1] Neuron Hunters</a>' +
        (n === 2 ? ' \u00b7 <a href="javascript:swich(3);mvx();">Continue \u2192</a>' :
         n === 3 ? ' \u00b7 <a href="javascript:swich(4);mvx();">Continue \u2192</a>' : '');
    }
  }

  function wrapSwich() {
    if (root.swich && root.swich.__funebraNav) return root.swich;
    const inner = typeof root.swich === 'function' ? root.swich : function (cnt) {
      if (root.itext && root.stepo) root.itext.value = root.stepo[cnt] || '';
    };
    function swich(cnt) {
      zeroEnd();
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

  function wrapMvx() {
    if (!root.mvx || root.mvx.__zeroEnd) return;
    const inner = root.mvx;
    root.mvx = function () {
      zeroEnd();
      return inner.apply(this, arguments);
    };
    root.mvx.__zeroEnd = true;
  }

  function boot() {
    installTape();
    wrapMvx();
    wrapSwich()(2);
  }

  root.installStepoGateway = boot;
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
  root.addEventListener('load', function () { setTimeout(boot, 0); });
})(typeof window !== 'undefined' ? window : globalThis);
