# Founding Demonstration — Math-Art Engine

**Funebra™ AI-Oriented Academia**  
Subordinate to the *Founding Charter (2026)*.  
Dated 23 September 2026. Prepared for publication after the dated export and repair tests.

> Observe. Construct. Test. Document. Remain human.

This page is not an academy-wide launch. It is one inspectable piece of work.

---

## 1. Observation and question

**Observation.** Mathematics already draws. What is usually missing is a short, public path from a typed formula in a browser to a file a maker can hold or print — without installing a studio first.

**Question.** Can a human write a parametric relation in the browser, see it move, and export a point-cloud or mesh that a common slicer will open?

**Human decision.** Build a lightweight, hackable engine rather than another closed visualiser. Keep the author in the formula. Treat AI as an instrument for variants and checks, not as the author of the form.

---

## 2. Construction

**Programme.** Math-Art Engine — an independent laboratory under the academy.

| What | Where |
| --- | --- |
| Live construction | https://funebra.github.io/math-art-engine/ |
| Source | https://github.com/funebra/math-art-engine |
| Named helper used in the test | https://funebra.github.io/math-art-engine/math-helpers/starX/ |
| User site / playground | https://funebra.github.io/ |
| Press kit v1.0 (August 2026) | https://github.com/funebra/math-art-engine/releases/tag/press-kit-v1.0 |
| License | MIT |
| Dated export folder (relative to this page / pack root) | `founding_export_2026-09-23/` |
| Reproducible conversion script | [`export_star_formula.py`](founding_export_2026-09-23/export_star_formula.py) |

---

## 3. One test (23 September 2026, 01:02 UTC)

**Named formula** (published helper usage):

```
Steps: 10*36
X(o): starX(o, 5, 150, 70, 360, 36)
Y(o): starY(o, 5, 150, 70, 260, 36)
Z(o): 0
```

**What was run.** Outline from that signature → centre on origin → scale 0.2 (30 mm outer arm) → extrude 2 mm → write dated OBJ and 3MF. Scale and extrusion are disclosed test decisions. The helper itself is `Z = 0`.

| Check | Outcome |
| --- | --- |
| [`funebra_starX_starY_2026-09-23.obj`](founding_export_2026-09-23/funebra_starX_starY_2026-09-23.obj) | 42 022 bytes, 720 vertices, 1436 faces, structural PASS |
| [`funebra_starX_starY_2026-09-23.3mf`](founding_export_2026-09-23/funebra_starX_starY_2026-09-23.3mf) | 14 886 bytes, valid 3MF package, structural PASS |
| Bounding box | ≈ 57 × 54 × 2 mm |
| Bambu Studio v 2.3.0.70 opens `.3mf` | **PASS** — 23 Sep 2026, 03:13–03:15 local. Star on P1S plate. Studio size 57.0634 × 54.2705 × 2 mm, 1436 triangles |
| Slice | **PASS** — 0.93 m / 2.83 g PLA, model print 4m35s (estimate) |
| Physical print | **NOT RUN** |

Original screenshots: [object](founding_export_2026-09-23/slicer_screenshots/03_star_on_bed_object_info.png), [slice](founding_export_2026-09-23/slicer_screenshots/05_slice_result.png). Log: [`TEST_LOG_2026-09-23.md`](founding_export_2026-09-23/TEST_LOG_2026-09-23.md).

On load, Studio warned: “The 3mf is not from Bambu Lab, load geometry data only.” Geometry still loaded. That warning is part of the record, not a fail.

**Follow-on repair (same day).** The first preview showed crossing lines on the face (fan over a concave 360-point outline). A second mesh uses only the 10 outline vertices, ear-clipped: [`funebra_star_repaired.3mf`](founding_export_2026-09-23/funebra_star_repaired.3mf) (36 triangles). Studio opened it 03:32–03:33; size unchanged; triangles 36. Original 1436-face files were not overwritten. [Repaired Studio screenshot](founding_export_2026-09-23/slicer_screenshots_repaired/03_repaired_star_on_bed.png). **Repaired open: PASS; repaired slice and send: PASS; P1S machine status: Finished 10/10.**

### Repaired plate: print session

The repaired 36-triangle file was sliced and sent to the P1S (`3DP-01P-616`) at 04:10 local on 23 September 2026. Studio reported **11m29s and 2.74 g PLA Translucent**. The [send screen](founding_export_2026-09-23/print_repaired_2026-09-23/01_send_job.png) records the job. The [finished screen](founding_export_2026-09-23/print_repaired_2026-09-23/02_finished.png) shows **Finished 10/10** at 04:22. [Phone photo 04:36](founding_export_2026-09-23/print_repaired_2026-09-23/03_star_on_plate_043655.jpg) and [phone photo 04:37](founding_export_2026-09-23/print_repaired_2026-09-23/04_star_on_plate_043710.jpg) show the star on the printer plate after the job.

| Construction | Open | Slice | Physical result |
| --- | --- | --- | --- |
| Original, 1436 triangles | PASS | PASS | NOT RUN |
| Repaired, 36 triangles | PASS | PASS; job sent | Machine Finished 10/10; star photographed **on the plate** |

No photograph of the part removed from the plate or dimensional measurement is in this record. The connection failure and multi-device liveview messages concerned remote viewing; the machine status and plate photos are separate evidence.

---

## 4. Limits

1. The repaired print job finished and the star was photographed on the plate. No off-plate inspection or measured dimensions are documented.
2. Scale 0.2 and a 2 mm extrusion are test decisions, not part of the published helper signature.
3. Studio loaded geometry only (generic 3MF, not a Bambu project).
4. AI wrote the exporter script as instrument: [`export_star_formula.py`](founding_export_2026-09-23/export_star_formula.py).
5. The academy is not accredited. This page claims one dated construction.

---

## 5. Reflection

The chain now has a named formula, dated files, a Studio open, a repaired mesh, a finished P1S job, and on-plate photos. Off-plate inspection and measurement remain open.

---

## 6. Invitation

**Bring one problem or construction to a 7-Day AI Prototype.**

Municipal teams and small businesses: the week is the offer. The Founding Charter is the method, not the product.

---

*Canonical method: [Funebra™ AI-Oriented Academia — Founding Charter (2026)](Funebra_AI_Oriented_Academia_Founding_Charter.pdf).*

[Founding Demonstration PDF](Funebra_Founding_Demonstration_Math_Art_Engine.pdf) records the first file; this page also records the later repair.
