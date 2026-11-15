---
label: "🗃️ Files, source setup and maintenance"
order: 84
permalink: /ilaria-rvc/source-layout/
---
# Files, source setup and maintenance

## Know what to back up

| Location | Role |
| --- | --- |
| models/ | Inference-ready voices and their matching indexes, commonly grouped in per-voice folders. |
| datasets/ | Imported training recordings. Keep a separate copy of your originals. |
| logs/ | Experiment configuration, prepared audio, features, indexes, resumable checkpoints and previews. Back up the whole experiment to resume later. |
| runtime/ | Bundled Windows Python environment. |
| assets/ | Core encoder and pitch weights, optional encoders, training pretrains, artwork and other app assets. |

An inference export can be used for conversion. For a resumable experiment, keep the saved G/D pair and optimizer and training state together with the configuration, file list and extracted features.

## Work from source on Windows

Start from a clean matching installation. Copy the bundled runtime, ffmpeg and ffprobe into the source checkout in the same layout. Bring over the installed ContentVec and RMVPE weights, and FCPE assets if needed. For training with the default V2 pretrains, copy the installed pretrained_v2 assets. Copy .env.example to .env and use the logs launcher. When diagnosing startup, check the bundled paths before changing Python dependencies globally.

The project retains upstream entry points as reference. Its main app is ILARIA_RVC.py, with feature-specific modules in ilaria/ and the upstream inference and training code under infer/. Ilaria RVC builds on Mainline RVC, includes work adapted from Applio and Redpanda-vc, uses TorchFCPE for FCPE, and extends Ilaria Audio Analyzer. Consult the repository's license and notices when redistributing source or assets.

## Update without losing work

Finish jobs, copy essential data, and use the update panel to check the release notes. The updater verifies downloads and supports backup and recovery. If the same installation already has a process running, use its browser address or logs and wait for active work to finish. Use **Restart Ilaria RVC** for a normal UI restart.
