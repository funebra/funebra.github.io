#!/usr/bin/env python3
"""
Follow-on mesh: same starX/starY radii, but only the 10 outline vertices
(5 tips + 5 inner), ear-clipped. Avoids the 360-point fan that crossed
the concave bays.

Original dated files are not overwritten.
"""
from __future__ import annotations
import math
import zipfile
from pathlib import Path

OUT = Path("/home/workdir/artifacts/founding_export_2026-09-23")
POINTS, R1, R2, SCALE, THICKNESS = 5, 150.0, 70.0, 0.2, 2.0


def star_vertices():
    n_tips = POINTS * 2
    thetas = [i * math.pi / POINTS - math.pi / 2 for i in range(n_tips)]
    radii = [R1 if i % 2 == 0 else R2 for i in range(n_tips)]
    return [(radii[i] * math.cos(thetas[i]) * SCALE,
             radii[i] * math.sin(thetas[i]) * SCALE) for i in range(n_tips)]


def is_ear(poly, i):
    n = len(poly)
    a, b, c = poly[(i - 1) % n], poly[i], poly[(i + 1) % n]
    # area sign: ear if diagonal ac stays inside (assuming CCW)
    cross = (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])
    if cross <= 1e-9:
        return False
    # no other point in triangle abc
    def in_tri(p, a, b, c):
        def sign(p1, p2, p3):
            return (p1[0] - p3[0]) * (p2[1] - p3[1]) - (p2[0] - p3[0]) * (p1[1] - p3[1])
        d1, d2, d3 = sign(p, a, b), sign(p, b, c), sign(p, c, a)
        return (d1 >= -1e-9 and d2 >= -1e-9 and d3 >= -1e-9) or (
            d1 <= 1e-9 and d2 <= 1e-9 and d3 <= 1e-9
        )
    for j, p in enumerate(poly):
        if j in ((i - 1) % n, i, (i + 1) % n):
            continue
        if in_tri(p, a, b, c):
            return False
    return True


def earclip(poly):
    idx = list(range(len(poly)))
    faces = []
    guard = 0
    while len(idx) > 3 and guard < 1000:
        guard += 1
        found = False
        for k in range(len(idx)):
            ring = [poly[i] for i in idx]
            if is_ear(ring, k):
                i0 = idx[(k - 1) % len(idx)]
                i1 = idx[k]
                i2 = idx[(k + 1) % len(idx)]
                faces.append((i0, i1, i2))
                del idx[k]
                found = True
                break
        if not found:
            break
    if len(idx) == 3:
        faces.append(tuple(idx))
    return faces


def prism(ring):
    n = len(ring)
    verts = [(x, y, 0.0) for x, y in ring] + [(x, y, THICKNESS) for x, y in ring]
    faces2d = earclip(ring)
    faces = []
    for a, b, c in faces2d:
        faces.append((a + 1, c + 1, b + 1))          # bottom, -Z
        faces.append((a + 1 + n, b + 1 + n, c + 1 + n))  # top +Z
    for i in range(n):
        a, b = i + 1, (i + 1) % n + 1
        faces.append((a, b, b + n))
        faces.append((a, b + n, a + n))
    return verts, faces


def write_obj(path, verts, faces):
    lines = [
        "# Funebra repaired star — 10 outline vertices, ear-clipped, 2 mm extrusion",
        "# Same radii as starX/starY helper; not a replacement of the 2026-09-23 fan file.",
    ]
    for x, y, z in verts:
        lines.append(f"v {x:.6f} {y:.6f} {z:.6f}")
    for a, b, c in faces:
        lines.append(f"f {a} {b} {c}")
    path.write_text("\n".join(lines) + "\n")


def write_3mf(path, verts, faces):
    vxml = "\n".join(f'            <vertex x="{x:.6f}" y="{y:.6f}" z="{z:.6f}" />' for x, y, z in verts)
    txml = "\n".join(f'            <triangle v1="{a-1}" v2="{b-1}" v3="{c-1}" />' for a, b, c in faces)
    model = f"""<?xml version="1.0" encoding="UTF-8"?>
<model unit="millimeter" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">
  <resources><object id="1" type="model"><mesh>
    <vertices>
{vxml}
    </vertices>
    <triangles>
{txml}
    </triangles>
  </mesh></object></resources>
  <build><item objectid="1" /></build>
</model>
"""
    rels = """<?xml version="1.0" encoding="UTF-8"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/>
</Relationships>
"""
    ct = """<?xml version="1.0" encoding="UTF-8"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/>
</Types>
"""
    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", ct)
        z.writestr("_rels/.rels", rels)
        z.writestr("3D/3dmodel.model", model)


if __name__ == "__main__":
    ring = star_vertices()
    verts, faces = prism(ring)
    write_obj(OUT / "funebra_star_repaired.obj", verts, faces)
    write_3mf(OUT / "funebra_star_repaired.3mf", verts, faces)
    print("verts", len(verts), "faces", len(faces))
    xs, ys, zs = zip(*verts)
    print("bbox", min(xs), min(ys), min(zs), max(xs), max(ys), max(zs))
