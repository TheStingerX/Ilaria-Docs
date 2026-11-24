---
label: "Realtime voice conversion"
icon: ":microphone:"
order: 97
permalink: /ilaria-rvc/redpanda/live-audio/
description: "Open Realtime in the desktop app or browser WebUI. Test a single voice directly through headphones before sending the sound to Discord, OBS, a game or another app."
---

# Realtime voice conversion

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Open Realtime in the desktop app or browser WebUI. Test a single voice directly through headphones before sending the sound to Discord, OBS, a game or another app.

## Set up audio routing

Set **Microphone** to the physical mic and **Output** to headphones for the first test. To route the converted signal onward, choose the playback end of a virtual cable as Redpanda’s output and its recording end as the microphone in the receiving app. Use **Monitor** for headphones if you want to hear the converted signal. Avoid routing the monitor back into the selected microphone.

## RVC and CVC voices

RVC uses a compatible inference `.pth` and optional matching `.index`. CVC uses a `.cvc` voice and a 48 kHz audio route. It loads the pitch, gain, gate and index settings saved with the voice. Legacy `.causalvc.json` and `.nextvc.json` voices require their accompanying weights. Optional RNNoise filters the microphone input. If audio breaks up, test a longer block and disable extra processing one setting at a time.

[Set up Redpanda VC](first-run.md) · [File inference](inference.md) · [Causal Voice Changer training](causal-training.md) · [RVC Training](training.md) · [VAC Lite / VB-CABLE](../../../conversion/real-time.md)

## Source and release

[Realtime UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Realtime engine](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/realtime.py)
