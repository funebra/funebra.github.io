#!/usr/bin/env python3
"""
Dated Founding Demonstration export.
Named formula: published Funebra starX / starY helper usage.

  Steps: 10*36
  X(o): starX(o, 5, 150, 70, 360, 36)
  Y(o): starY(o, 5, 150, 70, 260, 36)
  Z(o): 0

Then a 2 mm extrusion so the file is a closed thin solid (mm units),
not only a flat point ring.

Date of run: 2026-09-23
Environment: Linux sandbox. Bambu Lab Studio is not installed.
"""

from __future__ import annotations

import math
import zipfile
from datetime import datetime, timezone
from pathlib import Path
from xml.sax.saxutils import escape

OUT = Path("/home/workdir/artifacts/founding_export_2026-09-23")
OUT.mkdir(parents=True, exist_ok=True)

# Published helper arguments
POINTS = 5
R1 = 150.0
R2 = 70.0
CX = 360.0
CY = 260.0
STEPS_PER_EDGE = 36
N_VERTS = POINTS * 2 * STEPS_PER_EDGE  # 360
THICKNESS = 2.0  # mm extrusion in +Z
SCALE = 0.2  # 150 helper units -> 30 mm arm, plate fits a small printer


def star_outline(n=POINTS, r1=R1, r2=R2, cx=CX, cy=CY, spe=STEPS_PER_EDGE):
    """Reproduce starX/starY: alternate radii, lerp along each edge."""
    n_tips = n * 2
    thetas = [i * math.pi / n - math.pi / 2 for i in range(n_tips + 1)]
    radii = [(r1 if i % 2 == 0 else r2) for i in range(n_tips + 1)]
    pts = []
    for e in range(n_tips):
        x0 = radii[e] * math.cos(thetas[e]) + cx
        y0 = radii[e] * math.sin(thetas[e]) + cy
        x1 = radii[e + 1] * math.cos(thetas[e + 1]) + cx
        y1 = radii[e + 1] * math.sin(thetas[e + 1]) + cy
        for s in range(spe):
            t = s / spe
            pts.append(((1 - t) * x0 + t * x1, (1 - t) * y0 + t * y1))
    return pts


def to_mm(pts):
    # Center on origin, scale helper pixels to millimetres
    return [((x - CX) * SCALE, (y - CY) * SCALE) for x, y in pts]


def build_prism(ring_mm, z=THICKNESS):
    n = len(ring_mm)
    bottom = [(x, y, 0.0) for x, y in ring_mm]
    top = [(x, y, z) for x, y in ring_mm]
    verts = bottom + top
    faces = []
    # bottom fan (reverse winding so normal -Z)
    for i in range(1, n - 1):
        faces.append((1, i + 2, i + 1))
    # top fan (normal +Z); indices are 1-based OBJ
    for i in range(1, n - 1):
        faces.append((n + 1, n + i + 1, n + i + 2))
    # walls
    for i in range(n):
        a = i + 1
        b = (i + 1) % n + 1
        c = b + n
        d = a + n
        faces.append((a, b, c))
        faces.append((a, c, d))
    return verts, faces


def write_obj(path: Path, verts, faces, header: str):
    lines = [header.rstrip(), ""]
    for x, y, z in verts:
        lines.append(f"v {x:.6f} {y:.6f} {z:.6f}")
    lines.append("g founding_star_2026_09_23")
    for a, b, c in faces:
        lines.append(f"f {a} {b} {c}")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def write_3mf(path: Path, verts, faces):
    # Minimal 3MF: units millimetre. 3MF uses 0-based vertex indices in triangles.
    vxml = "\n".join(
        f'            <vertex x="{x:.6f}" y="{y:.6f}" z="{z:.6f}" />'
        for x, y, z in verts
    )
    txml = "\n".join(
        f'            <triangle v1="{a-1}" v2="{b-1}" v3="{c-1}" />'
        for a, b, c in faces
    )
    model = f"""<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xml:lang="en-US"
  xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <metadata name="Title">Funebra founding star 2026-09-23</metadata>
  <metadata name="Designer">Funebra AI-Oriented Academia — Founding Demonstration</metadata>
  <metadata name="Description">Extruded star from published starX/starY helper. Dated export test.</metadata>
  <resources>
    <object id="1" type="model">
      <mesh>
        <vertices>
{vxml}
        </vertices>
        <triangles>
{txml}
        </triangles>
      </mesh>
    </object>
  </resources>
  <build>
    <item objectid="1" />
  </build>
</model>
"""
    rels = """<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model"
    Id="rel0"
    Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel" />
</Relationships>
"""
    ct = """<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml" />
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml" />
</Types>
"""
    with zipfile.ZipFile(path, "w", compression=zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", ct)
        z.writestr("_rels/.rels", rels)
        z.writestr("3D/3dmodel.model", model)


def validate_obj(path: Path):
    verts = 0
    faces = 0
    bad = []
    vmax = 0
    for i, line in enumerate(path.read_text().splitlines(), 1):
        if line.startswith("v "):
            parts = line.split()
            if len(parts) != 4:
                bad.append(f"line {i}: vertex arity {len(parts)-1}")
            else:
                try:
                    tuple(float(p) for p in parts[1:])
                except ValueError:
                    bad.append(f"line {i}: non-numeric vertex")
            verts += 1
        elif line.startswith("f "):
            idx = [int(p.split("/")[0]) for p in line.split()[1:]]
            if len(idx) < 3:
                bad.append(f"line {i}: face < 3")
            vmax = max(vmax, *idx)
            if any(k <= 0 for k in idx):
                bad.append(f"line {i}: non-positive index")
            faces += 1
    if vmax > verts:
        bad.append(f"face index {vmax} exceeds vertex count {verts}")
    return {"vertices": verts, "faces": faces, "errors": bad, "bytes": path.stat().st_size}


def validate_3mf(path: Path):
    errors = []
    names = []
    try:
        with zipfile.ZipFile(path) as z:
            names = z.namelist()
            if "3D/3dmodel.model" not in names:
                errors.append("missing 3D/3dmodel.model")
            if "[Content_Types].xml" not in names:
                errors.append("missing [Content_Types].xml")
            xml = z.read("3D/3dmodel.model").decode("utf-8")
            if "<vertex " not in xml or "<triangle " not in xml:
                errors.append("model lacks vertex or triangle elements")
    except zipfile.BadZipFile as e:
        errors.append(f"not a zip/3mf: {e}")
    return {"files_in_package": names, "errors": errors, "bytes": path.stat().st_size}


def which_bambu():
    import shutil

    names = [
        "bambu-studio",
        "BambuStudio",
        "bambu-studio-bin",
        "orca-slicer",
        "prusa-slicer",
    ]
    found = {n: shutil.which(n) for n in names}
    return {k: v for k, v in found.items() if v}


def main():
    ring = to_mm(star_outline())
    verts, faces = build_prism(ring)
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    header = f"""# Funebra™ Founding Demonstration export
# Date (UTC): {stamp}
# Named formula (published helper usage):
#   Steps: 10*36
#   X(o): starX(o, 5, 150, 70, 360, 36)
#   Y(o): starY(o, 5, 150, 70, 260, 36)
#   Z(o): 0
# Post-process (this test, disclosed):
#   center on origin; scale {SCALE} (helper units -> mm);
#   extrude {THICKNESS} mm in +Z to form a closed thin solid.
# Units: millimetre
# Author of question and of this dated file: human-directed Funebra record
# AI used as instrument to write the exporter script, not as author of the star.
"""
    obj_path = OUT / "funebra_starX_starY_2026-09-23.obj"
    mf_path = OUT / "funebra_starX_starY_2026-09-23.3mf"
    log_path = OUT / "TEST_LOG_2026-09-23.md"

    write_obj(obj_path, verts, faces, header)
    write_3mf(mf_path, verts, faces)
    obj_rep = validate_obj(obj_path)
    mf_rep = validate_3mf(mf_path)
    slicers = which_bambu()

    xs = [v[0] for v in verts]
    ys = [v[1] for v in verts]
    zs = [v[2] for v in verts]
    bbox = (min(xs), min(ys), min(zs), max(xs), max(ys), max(zs))

    log = f"""# Founding Demonstration — dated export log

- **UTC time:** {stamp}
- **Named formula:** `starX(o, 5, 150, 70, 360, 36)` / `starY(o, 5, 150, 70, 260, 36)` / `Z=0`
- **Source of formula:** published helper page  
  https://funebra.github.io/math-art-engine/math-helpers/starX/
- **Files:**
  - `{obj_path.name}` ({obj_rep['bytes']} bytes) — {obj_rep['vertices']} vertices, {obj_rep['faces']} faces
  - `{mf_path.name}` ({mf_rep['bytes']} bytes) — 3MF package
- **Bounding box (mm):**  
  X {bbox[0]:.3f} .. {bbox[3]:.3f}  
  Y {bbox[1]:.3f} .. {bbox[4]:.3f}  
  Z {bbox[2]:.3f} .. {bbox[5]:.3f}
- **OBJ structural check:** {"PASS" if not obj_rep["errors"] else "FAIL"}  
  {obj_rep["errors"] or "no structural errors"}
- **3MF structural check:** {"PASS" if not mf_rep["errors"] else "FAIL"}  
  package entries: {", ".join(mf_rep["files_in_package"]) or "(none)"}  
  {mf_rep["errors"] or "no structural errors"}

## Bambu Lab Studio open test

- **Executed in this environment:** NO
- **Reason:** Bambu Lab Studio (and Orca/Prusa slicers) are not installed on the machine that produced this file. PATH hits: {slicers or "none"}
- **Result of slicer-open test:** NOT RUN
- **This is a failure of the advertised full chain in this record, not a pass.**
- **What did pass here:** generation of a named-formula mesh and structural validity of OBJ and 3MF containers.
- **What a human must do next:** open `{mf_path.name}` or `{obj_path.name}` in Bambu Lab Studio, record whether the plate appears, and append that screenshot and yes/no to this log.

## Disclosed construction choices

- The published helper yields a 2D outline (`Z=0`). A slicer needs thickness. This test therefore extrudes 2 mm. That extrusion is part of the test construction, not part of the original helper signature.
- Scale 0.2 maps the 150-unit outer radius to 30 mm so the plate is small enough for a desktop printer. Scale is a human decision in this test.
"""
    log_path.write_text(log, encoding="utf-8")
    print(log)
    print("Wrote", obj_path)
    print("Wrote", mf_path)
    print("Wrote", log_path)


if __name__ == "__main__":
    main()
