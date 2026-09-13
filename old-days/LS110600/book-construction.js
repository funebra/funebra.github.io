/* LS110600 — construction layer
   Source stays frozen. Nodes receive derived (x,y,z,τ) and relations.
   stepo is a traversal protocol, not a content store.
*/
(function (root) {
  const src = root.FunebraBookSource;
  if (!src) {
    console.error("book-construction.js requires book-registry.js first");
    return;
  }

  const CX = 360, CY = 220, R = 140;

  function derivePose(id, index, total) {
    if (id === "BN-BOOK-ROOT" || id === "BN-NEURON-HUNTERS") {
      return Object.freeze({
        x: CX, y: CY, z: 0, tau: 0,
        assigned: true,
        derived: true
      });
    }
    const kids = src.get("BN-BOOK-ROOT").relations;
    const i = kids.indexOf(id);
    const t = i < 0 ? index : i;
    const n = kids.length || total || 4;
    const a = (-Math.PI / 2) + (t * 2 * Math.PI) / n;
    return Object.freeze({
      x: Math.round(CX + R * Math.cos(a)),
      y: Math.round(CY + R * Math.sin(a)),
      z: 0,
      tau: t + 1,
      assigned: true,
      derived: true
    });
  }

  function buildNodes() {
    const nodes = Object.create(null);
    src.ids.forEach(function (id, index) {
      const rec = src.get(id);
      nodes[id] = Object.freeze({
        id: rec.id,
        title: rec.title,
        kind: rec.kind,
        evidence: rec.evidence,
        evidenceStatus: rec.evidenceStatus,
        pose: derivePose(id, index, src.ids.length),
        relations: rec.relations,
        sourceRef: rec.id
      });
    });
    return Object.freeze(nodes);
  }

  const NODES = buildNodes();

  // Traversal protocol only. Values are actions, never essay HTML.
  const PROTOCOL = Object.freeze([
    Object.freeze({ slot: 0, action: "noop", target: null }),
    Object.freeze({ slot: 1, action: "enter", target: "BN-NEURON-HUNTERS", label: "gateway" }),
    Object.freeze({ slot: 2, action: "enter", target: "BN-BOOK-ROOT", label: "launch" }),
    Object.freeze({ slot: 3, action: "enter", target: "BN-UFO", label: "inquiry" }),
    Object.freeze({ slot: 4, action: "enter", target: "BN-BIO-TECH", label: "boundary" }),
    Object.freeze({ slot: 5, action: "enter", target: "BN-LIFE-DEATH", label: "axis" }),
    Object.freeze({ slot: 6, action: "enter", target: "BN-QUEST-EXISTENCE", label: "purpose" }),
    Object.freeze({ slot: 7, action: "end", target: null, label: "end" })
  ]);

  function protocolOf(slot) {
    return PROTOCOL[slot] || PROTOCOL[7];
  }

  function project(id) {
    const rec = src.get(id);
    const node = NODES[id];
    if (!rec || !node) return null;
    return Object.freeze({
      id: rec.id,
      title: rec.title,
      kind: rec.kind,
      evidence: rec.evidence,
      evidenceStatus: rec.evidenceStatus,
      text: rec.projection,
      pose: node.pose,
      relations: rec.relations.slice()
    });
  }

  let viewpoint = "BN-BOOK-ROOT";

  function enter(id) {
    if (!NODES[id]) return viewpoint;
    viewpoint = id;
    return viewpoint;
  }

  root.FunebraBook = {
    NODES: NODES,
    PROTOCOL: PROTOCOL,
    protocolOf: protocolOf,
    project: project,
    enter: enter,
    get viewpoint() { return viewpoint; },
    rootId: "BN-BOOK-ROOT",
    launchSlot: 2
  };

  // Install stepo as protocol if the engine array exists or can be created.
  function installProtocol() {
    const tape = PROTOCOL.map(function (p) {
      return p;
    });
    root.stepo = tape;
    return tape;
  }

  root.installBookProtocol = installProtocol;
  installProtocol();
})(typeof window !== "undefined" ? window : globalThis);
