# Media manifest

Status of every figure/video slot. Raw sources live in the git-ignored `caip_media/`
staging folder; processed web assets live in `static/`.

## ✅ Ingested

| What | On page | Source → repo path |
|------|---------|--------------------|
| **Task rollouts** (6) | Results · Main Results | `caip_media/caip_demos/*.mov` → `static/videos/{fold_shorts,pour_almonds,pick_fruits,dispense_soap,turn_on_lamp,pull_tissue}.mp4` |
| **MECKA raw-vs-CAIP saliency** | Overview | `caip_media/mecka_raw_vs_caip_3x2.mp4` → `static/videos/mecka_raw_vs_caip.mp4` |
| **Encoder comparison — 3-view matrix** (lamp, pour × caip/dinov2/siglip2 × side/head) | Analysis | `caip_media/comparison_demos/{lamp,pour}/{caip,dinov2,siglip2}/{side.MOV,head.mp4}` → `static/videos/comparison/{task}/{enc}_{side,head}.mp4` |

All transcoded to H.264 / yuv420p / faststart, muted, web-friendly (`ffmpeg -crf 27`, width capped at 960). Demo grid plays autoplay+loop+muted.

## ⏳ Still placeholders

| Slot (`data-slot`) | Section | Target path | Likely source |
|--------------------|---------|-------------|---------------|
| `teaser-video` | Hero | `static/videos/teaser.mp4` | TBD — project overview cut (+ optional `narration.mp3`) |
| `method-architecture` | Method | `static/figures/architecture.png` | Fig. 2 (PDF) |
| `results-barchart` | Results · Main | `static/figures/policy_barchart.png` | Fig. 1 right (PDF) |
| Analysis heatmap row | Analysis | (black `.heatmap-ph` cells) | **Not generated yet** — attention heatmaps for lamp/pour, per encoder |
| `robustness-lighting` | Results · Robustness | `static/figures/lighting_shorts_figure.png` | `caip_media/robustness/lighting_shorts/lighting_shorts_figure.png` |
| `robustness-distractor` | Results · Robustness | `static/figures/distractor_lamp_figure.png` | `caip_media/robustness/distractor_lamp/distractor_lamp_figure.png` |

## Notes
- **Encoder comparison** is a live HTML matrix (rows = side / head cam / heatmap; cols = encoders).
  The head cam + (future) heatmap share a recording so are already synced; the **side view** is a separate
  phone recording aligned to the head cam by cross-correlating motion energy, then trimmed to the head's
  window so the two loop in sync. Heatmap row = black placeholders until heatmaps exist (drop in and replace
  the `.heatmap-ph` divs with `<video>`).
- **Side-view sync offsets** (start second in the original `side.MOV`, length = head-cam duration). To
  fine-tune, re-run the trim with adjusted `-ss`/`-t`:
  | cell | side start | length |
  |------|-----------|--------|
  | lamp/caip | 1.30 | 14.30 |
  | lamp/dinov2 | 12.70 | 11.90 |
  | lamp/siglip2 | 0.80 | 13.40 |
  | pour/caip | 0.80 | 25.90 |
  | pour/dinov2 | 1.70 | 13.50 |
  | pour/siglip2 | 0.20 | 16.70 |
  (lamp aligned with high confidence; pour offsets are small — verify by eye and nudge if a cell looks off.)
- Progression filmstrips were intentionally left out.
- Re-transcode recipe: `ffmpeg -i in.mov -vf "scale='min(960,iw)':-2" -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart -an out.mp4`
- Swap an image placeholder → `<img src="static/figures/NAME.png" alt="..." loading="lazy" />`
