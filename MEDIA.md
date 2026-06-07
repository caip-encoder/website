# Media manifest

Every figure/video slot on the page is a `data-slot` placeholder in `index.html`.
When you have a file, drop it into `static/` and tell me the slot → source mapping, or
follow the swap recipe below. Candidate sources live in `~/Desktop/caip_media`.

| Slot (`data-slot`)        | Section            | Target path in repo                  | Likely source in `~/Desktop/caip_media`                                  |
|---------------------------|--------------------|--------------------------------------|--------------------------------------------------------------------------|
| `teaser-video`            | Hero               | `static/videos/teaser.mp4`           | TBD (project overview cut)                                               |
| `overview-heatmap`        | Overview           | `static/figures/saliency_heatmap.png`| `mecka_raw_vs_caip_3x2.mp4` (frame) / Fig. 1 left                        |
| `method-architecture`     | Method             | `static/figures/architecture.png`    | Fig. 2 (from PDF)                                                        |
| `results-barchart`        | Results · Main     | `static/figures/policy_barchart.png` | Fig. 1 right (from PDF)                                                  |
| `sim-results`             | Results · Sim      | `static/figures/sim_results.png`     | TBD — confirm a sim benchmark exists                                    |
| `robustness-lighting`     | Results · Robust.  | `static/figures/lighting_shorts_figure.png` | `robustness/lighting_shorts/lighting_shorts_figure.png`          |
| `robustness-distractor`   | Results · Robust.  | `static/figures/distractor_lamp_figure.png` | `robustness/distractor_lamp/distractor_lamp_figure.png`          |
| `demo-fold-shorts`        | Demos              | `static/videos/fold_shorts.mp4`      | `caip_demos/Fold_Shorts.mov` or `caip_demos/head_cam/fold_shorts__*.mp4`|
| `demo-pour`               | Demos              | `static/videos/pour_almonds.mp4`     | `caip_demos/Pour_Almonds.mov`                                           |
| `demo-pick-fruits`        | Demos              | `static/videos/pick_fruits.mp4`      | `caip_demos/Pick_Fruits.mov`                                            |
| `demo-dispense-soap`      | Demos              | `static/videos/dispense_soap.mp4`    | `caip_demos/Dispense_Soap.mov`                                          |
| `demo-turn-on-lamp`       | Demos              | `static/videos/turn_on_lamp.mp4`     | `caip_demos/Turn_On_Lamp.mov`                                           |
| `demo-pull-tissue`        | Demos              | `static/videos/pull_tissue.mp4`      | `caip_demos/Pull_Tissue.mov`                                            |
| `progression-strip`       | Demos              | `static/figures/*_progression.png`   | `paper_figures/*_progression.png`                                       |
| `heatmap-ours`            | Analysis           | `static/videos/ours_heatmap.mp4`     | `comparison_demos/tissue_OLD/caip/head_heatmap.mp4`                     |
| `heatmap-dinov2`          | Analysis           | `static/videos/dinov2_heatmap.mp4`   | `comparison_demos/tissue_OLD/dinov2/head_heatmap_dino.mp4`             |
| `heatmap-siglip2`         | Analysis           | `static/videos/siglip2_heatmap.mp4`  | `comparison_demos/tissue_OLD/siglip2/head_heatmap_siglip2.mp4`         |
| `failures`                | Analysis           | `static/videos/failures.mp4`         | `website_send_jun6/*_lamp.mp4`, `*_pour.mp4`                            |
| `ablation-capacity`       | Ablations          | `static/figures/ablation_capacity.png`| TBD — ViT-B/L/SO400M scaling                                          |
| `ablation-data`           | Ablations          | `static/figures/ablation_data.png`   | TBD — data scaling                                                      |

## Swap recipe (image)
Replace the placeholder `<div class="media-placeholder ..." data-slot="X">...</div>` with:
```html
<img src="static/figures/NAME.png" alt="..." loading="lazy" />
```

## Swap recipe (video)
```html
<video controls playsinline muted loop poster="static/figures/NAME_poster.jpg">
  <source src="static/videos/NAME.mp4" type="video/mp4" />
</video>
```
For autoplaying demo loops (no controls), use: `<video autoplay muted loop playsinline>`.

## Notes
- Keep individual files reasonably small for GitHub Pages (ideally < 25 MB/video; compress `.MOV`→`.mp4`).
  Example: `ffmpeg -i in.MOV -vcodec libx264 -crf 26 -vf scale=720:-2 -an out.mp4`
- `.MOV` does not play in most browsers — convert to `.mp4` (H.264).
- The narration (AI readover) audio goes in `static/videos/narration.mp3`; uncomment its `<source>`
  in `index.html` and the "Play with narration" button auto-appears.
