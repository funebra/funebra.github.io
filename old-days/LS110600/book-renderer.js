/* LS110600 — project one addressed object at a time
   Never stamp the same host id across astory cells.
*/
(function (root) {
  const book = root.FunebraBook;
  const src = root.FunebraBookSource;
  if (!book || !src) {
    console.error("book-renderer.js requires registry + construction");
    return;
  }

  const CSS = [
    "#funebra-book{position:relative;z-index:30;max-width:52rem;margin:1.2rem auto 4rem;padding:0 1rem 3rem;color:#e8e6dc;font:16px/1.5 Georgia,serif}",
    "#funebra-book .map{height:280px;position:relative;border:1px solid rgba(255,179,71,.35);border-radius:14px;background:rgba(8,10,16,.75);margin:0 0 1rem}",
    "#funebra-book .bn{position:absolute;transform:translate(-50%,-50%);min-width:7rem;padding:.35rem .5rem;border-radius:8px;border:1px solid rgba(255,179,71,.45);background:#141821;color:#ffb347;font:11px/1.3 ui-monospace,monospace;cursor:pointer;text-align:center}",
    "#funebra-book .bn.is-now{background:#ffb347;color:#111}",
    "#funebra-book .panel{padding:1.1rem 1.2rem 1.3rem;border:1px solid rgba(255,179,71,.35);border-radius:14px;background:rgba(8,10,16,.88)}",
    "#funebra-book .addr{letter-spacing:.12em;font:11px ui-monospace,monospace;color:#ffb347}",
    "#funebra-book h1{font:700 1.5rem/1.15 Trebuchet MS,sans-serif;color:#fff;margin:.2rem 0 .4rem}",
    "#funebra-book .meta{font:12px ui-monospace,monospace;color:#9fd6ff}",
    "#funebra-book .rels a{color:#ffb347;margin-right:.8rem}",
    "#funebra-book .tape{margin:.8rem 0;font:12px ui-monospace,monospace}",
    "#funebra-book .tape button{margin:0 .25rem .25rem 0;background:#1a2030;color:#ffb347;border:1px solid rgba(255,179,71,.4);border-radius:6px;padding:.25rem .5rem;cursor:pointer}"
  ].join("");

  function ensureShell() {
    if (!document.getElementById("funebra-book-css")) {
      const st = document.createElement("style");
      st.id = "funebra-book-css";
      st.textContent = CSS;
      document.head.appendChild(st);
    }
    let rootEl = document.getElementById("funebra-book");
    if (!rootEl) {
      rootEl = document.createElement("div");
      rootEl.id = "funebra-book";
      const canvas = document.getElementById("funebraCanvas");
      if (canvas && canvas.parentNode) canvas.parentNode.insertBefore(rootEl, canvas.nextSibling);
      else document.body.insertBefore(rootEl, document.body.firstChild);
    }
    return rootEl;
  }

  function renderMap(shell, now) {
    let map = shell.querySelector(".map");
    if (!map) {
      map = document.createElement("div");
      map.className = "map";
      shell.appendChild(map);
    }
    map.innerHTML = "";
    Object.keys(book.NODES).forEach(function (id) {
      const node = book.NODES[id];
      const el = document.createElement("button");
      el.type = "button";
      el.className = "bn" + (id === now ? " is-now" : "");
      el.id = "bn-node-" + id;
      el.textContent = id.replace("BN-", "");
      el.style.left = node.pose.x + "px";
      el.style.top = Math.max(24, node.pose.y - 80) + "px";
      el.addEventListener("click", function () { show(id); });
      map.appendChild(el);
    });
  }

  function renderPanel(shell, now) {
    const view = book.project(now);
    let panel = shell.querySelector(".panel");
    if (!panel) {
      panel = document.createElement("article");
      panel.className = "panel";
      panel.id = "bn-host-ACTIVE";
      shell.appendChild(panel);
    }
    const rels = view.relations.map(function (rid) {
      return '<a href="javascript:void(0)" data-enter="' + rid + '">' + rid + "</a>";
    }).join("");
    const tape = book.PROTOCOL.filter(function (p) { return p.action === "enter"; }).map(function (p) {
      return '<button type="button" data-slot="' + p.slot + '">stepo[' + p.slot + "] " + p.label + "</button>";
    }).join("");
    panel.innerHTML =
      '<p class="addr">' + view.id + " · " + view.kind + "</p>" +
      "<h1>" + view.title + "</h1>" +
      '<p class="meta">evidence: ' + view.evidence + " · status: " + view.evidenceStatus +
      " · pose (" + view.pose.x + "," + view.pose.y + "," + view.pose.z + ",τ=" + view.pose.tau + ")</p>" +
      "<p>" + view.text + "</p>" +
      '<p class="rels">R → ' + rels + "</p>" +
      '<div class="tape">protocol ' + tape + "</div>";
    panel.querySelectorAll("[data-enter]").forEach(function (a) {
      a.addEventListener("click", function () { show(a.getAttribute("data-enter")); });
    });
    panel.querySelectorAll("[data-slot]").forEach(function (b) {
      b.addEventListener("click", function () { traverse(Number(b.getAttribute("data-slot"))); });
    });
  }

  function show(id) {
    book.enter(id);
    const shell = ensureShell();
    renderMap(shell, id);
    renderPanel(shell, id);
    if (typeof root.dispatchEvent === "function") {
      root.dispatchEvent(new CustomEvent("funebra:viewpoint", { detail: { id: id } }));
    }
  }

  function traverse(slot) {
    const p = book.protocolOf(slot);
    if (p.action === "enter" && p.target) show(p.target);
    if (typeof root.swich === "function" && !root.swich.__funebraBook) {
      try { /* do not feed essay into itext */ } catch (_) {}
    }
    root.__stepoIndex = slot;
    return p;
  }

  function launch() {
    installProtocolSafe();
    show(book.rootId);
    traverse(book.launchSlot);
  }

  function installProtocolSafe() {
    if (typeof root.installBookProtocol === "function") root.installBookProtocol();
    const inner = root.swich;
    if (inner && inner.__funebraBook) return;
    function swich(slot) {
      return traverse(Number(slot));
    }
    swich.__funebraBook = true;
    root.swich = swich;
  }

  root.launchFunebraBook = launch;
  root.showFunebraBook = show;
  root.traverseFunebraBook = traverse;

  function boot() { launch(); }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, { once: true });
  } else {
    boot();
  }
  root.addEventListener("load", function () {
    setTimeout(function () {
      installProtocolSafe();
      if (!document.getElementById("funebra-book")) launch();
      else traverse(2);
    }, 0);
  });
})(typeof window !== "undefined" ? window : globalThis);
