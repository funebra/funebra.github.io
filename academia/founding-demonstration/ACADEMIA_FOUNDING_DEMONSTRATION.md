# Founding Demonstration — Math-Art Engine

**Funebra™ AI-Oriented Academia**  
Subordinate to the *Founding Charter (2026)*.  
Dated 23 September 2026.

> Observe. Construct. Test. Document. Remain human.

This page is not an academy-wide launch. It is one inspectable piece of work.

---

## 1. Observation and question

**Observation.** Mathematics already draws. What is usually missing is a short, public path from a typed formula in a browser to a file a maker can hold or print.

**Question.** Can a human write a parametric relation in the browser, see it move, and export a mesh that a common slicer will open?

**Human decision.** Keep the author in the formula. Treat AI as an instrument, not the author of the form.

---

## 2. Construction

**Programme.** Math-Art Engine.

| What | Where |
| --- | --- |
| Live construction | https://funebra.github.io/math-art-engine/ |
| Source | https://github.com/funebra/math-art-engine |
| Named helper | https://funebra.github.io/math-art-engine/math-helpers/starX/ |
| Export folder | `founding_export_2026-09-23/` |
| Scripts | [`export_star_formula.py`](founding_export_2026-09-23/export_star_formula.py), [`export_star_repaired.py`](founding_export_2026-09-23/export_star_repaired.py) |

---

## 3. One test (23 September 2026)

```
X(o): starX(o, 5, 150, 70, 360, 36)
Y(o): starY(o, 5, 150, 70, 260, 36)
Z(o): 0
```

| Construction | Open | Slice | Physical result |
| --- | --- | --- | --- |
| Original, 1436 triangles | PASS | PASS | NOT RUN |
| Repaired, 36 triangles | PASS | PASS; job sent 04:10 (11m29s, 2.74 g, PLA Translucent, P1S 3DP-01P-616) | Machine **Finished 10/10** at 04:22; star photographed **on the plate** |

Meshes: [`original OBJ`](founding_export_2026-09-23/funebra_starX_starY_2026-09-23.obj), [`original 3MF`](founding_export_2026-09-23/funebra_starX_starY_2026-09-23.3mf), [`repaired OBJ`](founding_export_2026-09-23/funebra_star_repaired.obj), [`repaired 3MF`](founding_export_2026-09-23/funebra_star_repaired.3mf).

Print evidence: [send](founding_export_2026-09-23/print_repaired_2026-09-23/01_send_job.png), [Finished 10/10](founding_export_2026-09-23/print_repaired_2026-09-23/02_finished.png), [plate 04:36](founding_export_2026-09-23/print_repaired_2026-09-23/03_star_on_plate_043655.jpg), [plate 04:37](founding_export_2026-09-23/print_repaired_2026-09-23/04_star_on_plate_043710.jpg). Log: [`TEST_LOG_2026-09-23.md`](founding_export_2026-09-23/TEST_LOG_2026-09-23.md).

No off-plate inspection or measured dimensions are in this record.

---

## 4. Limits

1. On-plate photograph is not an off-plate measurement.
2. Scale 0.2 and 2 mm extrusion are test decisions.
3. Generic 3MF loads geometry only.
4. The academy is not accredited.

---

## 5. Invitation

**Bring one problem or construction to a 7-Day AI Prototype.**

*Canonical method: [Founding Charter (2026)](CHARTER.md).*
