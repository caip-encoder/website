# Media manifest

Status of every figure/video slot. Raw sources live in the git-ignored `caip_media/`
staging folder; processed web assets live in `static/`.

## ✅ Ingested

| What | On page | Source → repo path |
|------|---------|--------------------|
| **Task rollouts** (6) | Results · Main Results | `caip_media/caip_demos/*.mov` → `static/videos/{fold_shorts,pour_almonds,pick_fruits,dispense_soap,turn_on_lamp,pull_tissue}.mp4` |
| **MECKA raw-vs-CAIP saliency** | Overview | `caip_media/mecka_raw_vs_caip_3x2.mp4` → `static/videos/mecka_raw_vs_caip.mp4` |
| **Encoder comparison — 3-view matrix** (lamp, pour, tissue × caip/dinov2/siglip2) | Analysis | `caip_media/comparison_demos/{task}/{enc}/{side.MOV,head.mp4[,heatmap.mp4]}` → `static/videos/comparison/{task}/{enc}_{side,head[,heatmap]}.mp4`. **tissue has real heatmaps**; lamp/pour heatmap row = black placeholders. |

All transcoded to H.264 / yuv420p / faststart, muted, web-friendly (`ffmpeg -crf 27`, width capped at 960). Demo grid plays autoplay+loop+muted.

| **Architecture diagram** | Method | `arch_figure.pdf` → `static/figures/architecture.png` (rendered 3×, trimmed) |
| **Robustness figures** | Results · Robustness | `caip_media/robustness/{lighting_shorts,distractor_lamp}/*_figure.png` → `static/figures/{lighting_shorts,distractor_lamp}.png` |

## ⏳ Still placeholders

None — all media slots are filled. (Policy bar chart was removed: no figure; the results table covers it.)

Heatmaps for lamp/pour are now in (rendered alongside their head cams, so already synced;
title bar cropped, cut to each cell's length). All three tasks (lamp/pour/tissue) have full
side / head / heatmap rows.

## Notes
- **Encoder comparison** is a live HTML matrix (rows = side / head cam / heatmap; cols = encoders).
  The head cam + heatmap share a recording (already synced). The **side view** `.MOV` was manually
  start-trimmed (lead-in removed) to align with its head cam; then each cell's clips are cut to the
  shortest view's length (`min(side, head[, heatmap])`) from t=0 so all three loop in sync. tissue has
  real heatmaps; lamp/pour heatmap row = black `.heatmap-ph` placeholders (swap for `<video>` when ready).
- The heatmap source videos carry a title bar at top (e.g. "CAIP (ours) — text-conditioned"); the
  transcode crops it (`crop=iw:ih-42:0:42`) for a uniform 16:9 grid.
- Re-transcode (after editing a raw source): re-run the per-cell `min`-length cut script — see git history
  for the command, or just ask Claude.
- The one-at-a-time alignment helper lives at `caip_media/align/align.html` (+ `align/v/`), git-ignored.
- Progression filmstrips were intentionally left out.
- Re-transcode recipe: `ffmpeg -i in.mov -vf "scale='min(960,iw)':-2" -c:v libx264 -preset veryfast -crf 27 -pix_fmt yuv420p -movflags +faststart -an out.mp4`
- Swap an image placeholder → `<img src="static/figures/NAME.png" alt="..." loading="lazy" />`
