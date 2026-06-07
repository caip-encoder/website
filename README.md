# CAIP — Project Page

Static project page for **Contrastive Action-Image Pre-training for Visuomotor Control**.

Plain HTML/CSS/JS — no build step. Edit `index.html`, `assets/css/style.css`, `assets/js/main.js`.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Media

All figure/video slots are placeholders for now. See [`MEDIA.md`](MEDIA.md) for the slot→source
manifest and swap recipes. Drop files into `static/figures/` and `static/videos/`.

## Deploy (GitHub Pages)

A GitHub Actions workflow (`.github/workflows/deploy.yml`) deploys on every push to `main`.

One-time setup: in the GitHub repo, go to **Settings → Pages → Build and deployment → Source**
and select **GitHub Actions**. The site then publishes at
`https://caip-encoder.github.io/website/`.

## Structure

```
index.html              # all page content
assets/css/style.css    # styles
assets/js/main.js        # tabs, copy-bibtex, narration toggle, nav highlight
static/figures/         # images
static/videos/          # videos + narration audio
```
