---
label: "Troubleshooting"
icon: ":wrench:"
order: 92
permalink: /non-rvc/tts/voicestudio/troubleshooting/
---

# VoiceStudio · Troubleshooting

[VoiceStudio v0.5.8 · Troubleshooting](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/install/troubleshooting.md)

## Identify the failing stage

If the app does not start, check the package, architecture and first backend message. If a model is missing, check its name, free space, connectivity and download status. If input fails, try a short playable WAV. If only acceleration fails, try CPU and note the engine and backend.

## Prepare a reproducible report

Record app version, OS, GPU, model and first error. Reproduce with a short sentence or clip. Describe the exact step and expected result. Remove tokens, personal paths and private clips from anything you share. Back up projects before reinstalling or switching versions.

## Check in order

1. **The window does not open.** Check architecture and release package. Relaunch and capture the first error.
2. **The window opens, the backend fails.** Check backend status and try a supported CPU path.
3. **The model is not ready.** Check disk, connectivity and download status in the model manager.
4. **Generation starts but fails.** Use a short phrase or WAV with a known supported engine and language.
5. **The exported file fails.** Open it in a separate player, check that it is nonempty and try exporting a single segment.

## Record useful information

Record the exact version and package. List the steps to reproduce the issue, including whether CPU worked, whether the problem affects one model, and whether a shorter clip changes the outcome. Use shareable test audio or text.

[Installation](installation.md) · [Models and acceleration](engines.md)
