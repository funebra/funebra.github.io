/* LS110600 — immutable source registry
   Navigation must not mutate these records.
   living source ≠ BN record ≠ technological projection
*/
(function (root) {
  function rec(obj) { return Object.freeze(obj); }

  const SOURCE = rec({
    "BN-BOOK-ROOT": rec({
      id: "BN-BOOK-ROOT",
      title: "NEURON HUNTERS",
      kind: "root",
      evidence: "construction-root",
      evidenceStatus: "OPEN",
      projection: "Constructed-book root. Not a chapter. Not an essay container.",
      relations: rec([
        "BN-UFO",
        "BN-BIO-TECH",
        "BN-LIFE-DEATH",
        "BN-QUEST-EXISTENCE"
      ])
    }),
    "BN-NEURON-HUNTERS": rec({
      id: "BN-NEURON-HUNTERS",
      title: "Neuron Hunters — gateway",
      kind: "gateway",
      evidence: "construction-root",
      evidenceStatus: "OPEN",
      projection: "Named gateway view of the book root. Prose here is a projection, not the construction.",
      relations: rec(["BN-BOOK-ROOT", "BN-UFO", "BN-BIO-TECH", "BN-LIFE-DEATH", "BN-QUEST-EXISTENCE"])
    }),
    "BN-UFO": rec({
      id: "BN-UFO",
      title: "UFO · Unidentified Observation",
      kind: "inquiry",
      evidence: "open-inquiry",
      evidenceStatus: "OPEN",
      projection: "Observed, not identified. Observation ≠ Interpretation ≠ Proof.",
      relations: rec(["BN-BOOK-ROOT", "BN-QUEST-EXISTENCE"])
    }),
    "BN-BIO-TECH": rec({
      id: "BN-BIO-TECH",
      title: "Biology – Technology boundary",
      kind: "relation",
      evidence: "conceptual-relation",
      evidenceStatus: "OPEN",
      projection: "Biological event → BN-point → Relation → Technological form. The record is not the living source.",
      relations: rec(["BN-BOOK-ROOT", "BN-LIFE-DEATH"])
    }),
    "BN-LIFE-DEATH": rec({
      id: "BN-LIFE-DEATH",
      title: "Life / Death interval",
      kind: "axis",
      evidence: "existential-axis",
      evidenceStatus: "OPEN",
      projection: "Life → Experience → Trace → Memory → Transformation. Death is not deletion of traces.",
      relations: rec(["BN-BOOK-ROOT", "BN-BIO-TECH", "BN-QUEST-EXISTENCE"])
    }),
    "BN-QUEST-EXISTENCE": rec({
      id: "BN-QUEST-EXISTENCE",
      title: "Quest for Existence",
      kind: "purpose",
      evidence: "traversal-purpose",
      evidenceStatus: "OPEN",
      projection: "Hunt relations through which existence becomes visible — not neurons, not unknown objects as proof.",
      relations: rec(["BN-BOOK-ROOT", "BN-UFO", "BN-LIFE-DEATH"])
    })
  });

  function getSource(id) {
    return SOURCE[id] || null;
  }

  root.FunebraBookSource = {
    SOURCE: SOURCE,
    get: getSource,
    ids: Object.freeze(Object.keys(SOURCE)),
    rootId: "BN-BOOK-ROOT"
  };
})(typeof window !== "undefined" ? window : globalThis);
