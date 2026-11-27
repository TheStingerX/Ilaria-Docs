---
label: "Models and acceleration"
icon: ":package:"
order: 97
permalink: /non-rvc/tts/voicestudio/engines/
---

# VoiceStudio · Models and acceleration

[VoiceStudio v0.5.8 · Models and acceleration](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Understand what to download

An engine handles a task such as synthesis, transcription or another workflow stage. Weights are the files it needs. Install the engine for your task and check its languages, storage, backend and license before downloading others.

## Verify the device

1. Start with the compatible setting offered by the app.
2. Generate a reference sentence and record the engine name.
3. Before trying CUDA, ROCm, Metal or Vulkan, confirm support for the selected engine.
4. Repeat the same sentence. If acceleration fails, return to the working backend and inspect the first error.

[First synthesis](first-run.md) · [Troubleshooting](troubleshooting.md)
