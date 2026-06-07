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
- **Encoder comparison** is built as a live HTML grid (not a baked video). Each task shows the 3 encoder
  rollouts; the black cell below each is reserved for that encoder's attention heatmap. When heatmaps exist,
  drop them in and replace the `.heatmap-ph` divs with `<video>` elements.
- Progression filmstrips were intentionally left out.
- Re-transcode recipe: `ffmpeg -i in.mov -vf "scale='min(960,iw)':-2" -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart -an out.mp4`
- Swap an image placeholder → `<img src="static/figures/NAME.png" alt="..." loading="lazy" />`
