/* LS110600 — two registries
   Construction: BN-BOOK-ROOT + four children
   Projection:   BN-NEURON-HUNTERS (gateway view of the root)
*/
(function (root) {
  function rec(obj) { return Object.freeze(obj); }

  const CONSTRUCTION = rec({
    "BN-BOOK-ROOT": rec({
      id: "BN-BOOK-ROOT",
      title: "NEURON HUNTERS",
      kind: "root",
      evidence: "construction-root",
      evidenceStatus: "OPEN",
      verifiedUfoClaim: false,
      projection: "Constructed-book root. Not a chapter. Not an essay container.",
      relations: rec([
        "BN-UFO",
        "BN-BIO-TECH",
        "BN-LIFE-DEATH",
        "BN-QUEST-EXISTENCE"
      ])
    }),
    "BN-UFO": rec({
      id: "BN-UFO",
      title: "UFO · Unidentified Observation",
      kind: "inquiry",
      evidence: "open-inquiry",
      evidenceStatus: "OPEN",
      verifiedUfoClaim: false,
      projection: "Observed, not identified. Observation ≠ Interpretation ≠ Proof.",
      relations: rec(["BN-BOOK-ROOT", "BN-QUEST-EXISTENCE"])
    }),
    "BN-BIO-TECH": rec({
      id: "BN-BIO-TECH",
      title: "Biology – Technology boundary",
      kind: "relation",
      evidence: "conceptual-relation",
      evidenceStatus: "OPEN",
      verifiedUfoClaim: false,
      projection: "Biological event → BN-point → Relation → Technological form.",
      relations: rec(["BN-BOOK-ROOT", "BN-LIFE-DEATH"])
    }),
    "BN-LIFE-DEATH": rec({
      id: "BN-LIFE-DEATH",
      title: "Life / Death interval",
      kind: "axis",
      evidence: "existential-axis",
      evidenceStatus: "OPEN",
      verifiedUfoClaim: false,
      projection: "Life → Experience → Trace → Memory → Transformation.",
      relations: rec(["BN-BOOK-ROOT", "BN-BIO-TECH", "BN-QUEST-EXISTENCE"])
    }),
    "BN-QUEST-EXISTENCE": rec({
      id: "BN-QUEST-EXISTENCE",
      title: "Quest for Existence",
      kind: "purpose",
      evidence: "traversal-purpose",
      evidenceStatus: "OPEN",
      verifiedUfoClaim: false,
      projection: "Hunt relations through which existence becomes visible.",
      relations: rec(["BN-BOOK-ROOT", "BN-UFO", "BN-LIFE-DEATH"])
    })
  });

  const PROJECTION = rec({
    "BN-NEURON-HUNTERS": rec({
      id: "BN-NEURON-HUNTERS",
      title: "Neuron Hunters — gateway",
      kind: "projection",
      projects: "BN-BOOK-ROOT",
      evidence: "gateway-view",
      evidenceStatus: "OPEN",
      verifiedUfoClaim: false,
      projection: "Named gateway view of BN-BOOK-ROOT. Not a fifth construction child.",
      relations: rec(["BN-BOOK-ROOT"])
    })
  });

  const SOURCE = rec(Object.assign({}, CONSTRUCTION, PROJECTION));

  root.FunebraBookSource = {
    CONSTRUCTION: CONSTRUCTION,
    PROJECTION: PROJECTION,
    SOURCE: SOURCE,
    get: function (id) { return SOURCE[id] || null; },
    ids: Object.freeze(Object.keys(SOURCE)),
    constructionIds: Object.freeze(Object.keys(CONSTRUCTION)),
    projectionIds: Object.freeze(Object.keys(PROJECTION)),
    rootId: "BN-BOOK-ROOT",
    gatewayId: "BN-NEURON-HUNTERS"
  };
})(typeof window !== "undefined" ? window : globalThis);
