---
label: "Causal Voice Changer training"
icon: ":studio_microphone:"
order: 95
permalink: /ilaria-rvc/redpanda/causal-training/
description: "Redpanda’s Causal Voice Changer option integrates Causal Voice Changer v0.4.0. Fine-tuning creates a .cvc voice for the CVC engine."
---

# Causal Voice Changer training

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda’s Causal Voice Changer option integrates Causal Voice Changer v0.4.0. Fine-tuning creates a .cvc voice for the CVC engine.

## Train and resume a voice

Prepare clean recordings of one speaker and reserve a short sample for testing. Open **Training → Causal Voice Changer**, enter a voice name, choose the dataset folder and device, then set **Training steps**. The base downloads when first needed. The release defaults to saving every 1,000 steps. To resume, use the same name and run folder and set a higher total step target. Keep the training files and test the exported `.cvc` in Inference and Realtime.

## Exports and licence

The upstream project marks the default CVC base and its fine-tunes for noncommercial use. Use recordings you have permission to train on. In portable installs, start looking in `logs/causalvc/`; in a source checkout, check `runs/models/voice-<name>/voices/`.

[Set up Redpanda VC](first-run.md) · [File inference](inference.md) · [Realtime voice conversion](live-audio.md) · [RVC Training](training.md) · [Causal Voice Changer](../../non-rvc/causal-voice-changer/overview.md)

## Source and release

[CVC trainer](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/causalvc/trainer.py) · [CVC upstream](https://github.com/mojowozo/Causal-Voice-Changer/tree/50dce9236854fef17f550571413367217e235155)
