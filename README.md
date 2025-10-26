# Funebra — Math‑Art Engine (User Site)

Welcome to **`funebra.github.io`**, the official user site for the **Funebra Math‑Art Engine** — a browser‑based, hackable toolkit for **parametric geometry**, **generative visuals**, and **maker‑friendly exports** by **pLabs Entertainment**.

> **Live site:** https://funebra.github.io  
> **Sound:** https://soundcloud.com/peter-lugha-553056840

---

## ✨ What’s inside

- **WebGL hero + Playground** powered by **Three.js (ESM)** via an import map
- Preset shapes: **Torus Knot**, **Icosahedron**, **Möbius (parametric)**
- Controls: **Wireframe**, **Spin**, **Snapshot PNG** (downloads a live render)
- Clean **dark theme**, SEO/OG tags, `sitemap.xml`, `robots.txt`, `manifest`, and `404.html`

```
.
├── index.html
├── 404.html
├── privacy.html
├── manifest.webmanifest
├── robots.txt
├── sitemap.xml
├── assets/
│   └── funebra-star.svg
├── styles/
│   └── style.css
└── src/
    ├── main.js
    └── scene.js
```

---

## 🚀 Getting started (local)

1. Clone the repo
   ```bash
   git clone https://github.com/funebra/funebra.github.io.git
   cd funebra.github.io
   ```
2. Serve locally (any static server works). Examples:
   ```bash
   # Python 3
   python -m http.server 8080
   # or Node
   npx serve .
   ```
3. Open http://localhost:8080 and play.

> **Note:** We use **import maps** (no bundler required). Three.js modules are loaded from UNPKG CDN in `index.html`.

---

## 🧩 Development notes

- Main ESM entry: **`/src/main.js`**  
- Scene utilities & geometry factory: **`/src/scene.js`**
- Update the **import map** in `index.html` to pin Three.js versions.
- Styles live in **`/styles/style.css`** (minimal, component‑oriented).

### Add a new shape
Add a case to `makeGeometry(kind)` in `src/scene.js` and register it in the `<select>` of `index.html`.

### Exporters (planned)
- **OBJ/GLTF** export buttons for maker/3D‑print workflows  
- **GIF/WebM** recording hooks for quick shareables  
If you'd like these now, open an issue or PR.

---

## 🧭 Deployment (GitHub Pages)

This repository is the **user site** (`funebra.github.io`). Pushing to `main` deploys to:  
**https://funebra.github.io**

If Pages is not live:
1. Go to **Settings → Pages**
2. Source: **Deploy from a branch** → Branch: **`main`** → **/ (root)**
3. Save; wait for the green checkmark.

---

## 🧑‍🤝‍🧑 Contributing

Ideas, fixes, presets, and exporters are welcome!  
- Open an **Issue** for bugs/ideas.
- Submit a **PR** from a feature branch.

Please keep PRs small and focused.

---

## ❤️ Support Funebra

If this project inspires you, consider a one‑time boost:
- **€50:** (Stripe link to be added)
- **€100:** (Stripe link to be added)

Or simply star ⭐ the repo and share the site.

---

## 🔒 Privacy

The site runs without cookies or trackers. If analytics are added, we’ll update `privacy.html` accordingly.

---

## 📜 License

This site is released under the **MIT License**. See `LICENSE` for details.  
**Funebra™** — pLabs Entertainment © 1982–2025.
