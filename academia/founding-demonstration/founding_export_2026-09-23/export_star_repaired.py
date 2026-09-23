#!/usr/bin/env python3
"""10-vertex ear-clipped star; writes OBJ/3MF beside this file."""
from __future__ import annotations
import math, zipfile
from pathlib import Path
OUT = Path(__file__).resolve().parent
POINTS, R1, R2, SCALE, THICKNESS = 5, 150.0, 70.0, 0.2, 2.0

def star_vertices():
    n = POINTS * 2
    thetas = [i * math.pi / POINTS - math.pi / 2 for i in range(n)]
    radii = [R1 if i % 2 == 0 else R2 for i in range(n)]
    return [(radii[i]*math.cos(thetas[i])*SCALE, radii[i]*math.sin(thetas[i])*SCALE) for i in range(n)]

def is_ear(poly, i):
    n=len(poly); a,b,c=poly[(i-1)%n],poly[i],poly[(i+1)%n]
    if (b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]) <= 1e-9: return False
    def sign(p1,p2,p3): return (p1[0]-p3[0])*(p2[1]-p3[1])-(p2[0]-p3[0])*(p1[1]-p3[1])
    def in_tri(p,a,b,c):
        d1,d2,d3=sign(p,a,b),sign(p,b,c),sign(p,c,a)
        return (d1>=-1e-9 and d2>=-1e-9 and d3>=-1e-9) or (d1<=1e-9 and d2<=1e-9 and d3<=1e-9)
    for j,p in enumerate(poly):
        if j in ((i-1)%n,i,(i+1)%n): continue
        if in_tri(p,a,b,c): return False
    return True

def earclip(poly):
    idx=list(range(len(poly))); faces=[]; guard=0
    while len(idx)>3 and guard<1000:
        guard+=1; found=False
        for k in range(len(idx)):
            ring=[poly[i] for i in idx]
            if is_ear(ring,k):
                faces.append((idx[(k-1)%len(idx)], idx[k], idx[(k+1)%len(idx)]))
                del idx[k]; found=True; break
        if not found: break
    if len(idx)==3: faces.append(tuple(idx))
    return faces

def prism(ring):
    n=len(ring)
    verts=[(x,y,0.0) for x,y in ring]+[(x,y,THICKNESS) for x,y in ring]
    faces=[]
    for a,b,c in earclip(ring):
        faces.append((a+1,c+1,b+1)); faces.append((a+1+n,b+1+n,c+1+n))
    for i in range(n):
        a,b=i+1,(i+1)%n+1
        faces.append((a,b,b+n)); faces.append((a,b+n,a+n))
    return verts, faces

def write_obj(path, verts, faces):
    lines=['# Funebra repaired star']+[f'v {x:.6f} {y:.6f} {z:.6f}' for x,y,z in verts]+[f'f {a} {b} {c}' for a,b,c in faces]
    path.write_text('\n'.join(lines)+'\n')

def write_3mf(path, verts, faces):
    vxml='\n'.join(f'            <vertex x="{x:.6f}" y="{y:.6f}" z="{z:.6f}" />' for x,y,z in verts)
    txml='\n'.join(f'            <triangle v1="{a-1}" v2="{b-1}" v3="{c-1}" />' for a,b,c in faces)
    model=f'''<?xml version="1.0" encoding="UTF-8"?>\n<model unit="millimeter" xmlns="http://schemas.microsoft.com/3dmanufacturing/core/2015/02">\n  <resources><object id="1" type="model"><mesh>\n    <vertices>\n{vxml}\n    </vertices>\n    <triangles>\n{txml}\n    </triangles>\n  </mesh></object></resources>\n  <build><item objectid="1" /></build>\n</model>\n'''
    with zipfile.ZipFile(path,'w',zipfile.ZIP_DEFLATED) as z:
        z.writestr('[Content_Types].xml','<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="model" ContentType="application/vnd.ms-package.3dmanufacturing-3dmodel+xml"/></Types>')
        z.writestr('_rels/.rels','<?xml version="1.0"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Target="/3D/3dmodel.model" Id="rel0" Type="http://schemas.microsoft.com/3dmanufacturing/2013/01/3dmodel"/></Relationships>')
        z.writestr('3D/3dmodel.model', model)

if __name__ == '__main__':
    v,f=prism(star_vertices()); write_obj(OUT/'funebra_star_repaired.obj',v,f); write_3mf(OUT/'funebra_star_repaired.3mf',v,f); print(len(v),len(f))
