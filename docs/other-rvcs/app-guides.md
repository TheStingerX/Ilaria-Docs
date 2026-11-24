---
label: "Guides by app"
icon: ":books:"
order: 80
permalink: /ilaria-rvc/app-guides/
description: "Use Ilaria RVC to train a model or convert a recording."
---
# Step-by-step guides by app

<div role="group" aria-label="What do you want to do?" style="margin:1.4rem 0 2rem;padding:1rem;border:1px solid #db78a888;border-radius:1rem;background:#db78a810">
  <p style="margin:0 0 .85rem;text-align:center;font-weight:700">What do you want to do?</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.65rem">
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Training or file conversion</strong><br><span aria-hidden="true">↓</span> <a href="../installation/">Ilaria RVC</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Live microphone</strong><br>NVIDIA <span aria-hidden="true">→</span> <a href="../vonovox/installation/">Vonovox</a><br>AMD / Intel <span aria-hidden="true">→</span> <a href="../tgr/installation/">Okada TG Developed Fork</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Other workflows</strong><br><span aria-hidden="true">↓</span> <a href="../applio/installation/">Applio</a> · <a href="../redpanda/first-run/">Redpanda-vc</a></div>
  </div>
</div>

## Choose by task and graphics card

Use **Ilaria RVC** to train a model or convert a recording. For a live microphone on Windows, use **Vonovox** with a supported NVIDIA GPU, or **Okada TG Developed Fork** with a compatible AMD or Intel GPU. For other workflows, start with **Applio** or **Redpanda-vc**.

[Install Ilaria RVC](../ilaria-rvc/install/installation.md) · [GPU compatibility](../ilaria-rvc/install/gpu-compatibility.md) · [Run on Kaggle](../ilaria-rvc/cloud/kaggle.md)

## Train with Ilaria RVC

Prepare a dataset of clean recordings from one speaker. Start with the dataset guide and work through preprocessing, feature extraction and training in order. Save checkpoints at regular intervals and compare them using the same short test clips. Keep the checkpoint that sounds best on unfamiliar material. Keep its optional index with the model it belongs to.

[Prepare a dataset](../ilaria-rvc/train/datasets.md) · [Training workflow](../ilaria-rvc/train/training-workflow.md) · [Training controls](../ilaria-rvc/train/training-controls.md)

## Convert recordings with Ilaria RVC

Import a compatible inference `.pth` and add its matching `.index` if you have it. Convert one short, dry WAV first. Save that output as a reference, then adjust pitch or retrieval one setting at a time. Use batch conversion once the settings work on several representative clips. On a machine without a suitable local GPU, use the Kaggle guide for offline training or conversion.

[Single and batch inference](../ilaria-rvc/convert/inference.md) · [Inference controls](../ilaria-rvc/convert/inference-buttons.md)

## Convert a microphone live

With NVIDIA on Windows, install Vonovox and select the package for your GPU. With AMD or Intel on Windows, start with the DirectML build of Okada TG Developed Fork if your GPU supports it. Confirm that the app can pick up your microphone and convert it to headphones before routing the output. Send the converted audio to the playback side of a virtual cable, then select its recording side as the microphone in Discord, OBS, a game or another app. If audio breaks up, increase the buffer and retest with the destination app running.

[Install Vonovox](vonovox/installation.md) · [Route and tune Vonovox](vonovox/live-audio.md) · [Install Okada TG Developed Fork](tgr/installation.md) · [Route and tune TGR](tgr/live-audio.md)

## Use Applio or Redpanda-vc for other workflows

Choose Applio for text-to-speech and model management. Redpanda VC provides RVC and Causal Voice Changer training, file conversion and realtime in a desktop app and browser WebUI. Use `.pth` with the RVC engine and `.cvc` with CVC.

[Install Applio](applio/installation.md) · [Applio TTS](applio/tts.md) · [Applio model library](applio/models.md) · [Set up Redpanda-vc](redpanda/first-run.md) · [Redpanda-vc live modes](redpanda/live-audio.md)

## Keep a baseline and fix one issue at a time

For file conversion, compare the same input clip at the same output volume. For live conversion, record a short test in the receiving app and check for doubled audio, dropouts and delay. If the voice sounds wrong in both tests, verify the model, engine and pitch. If only the receiving app sounds wrong, check the virtual cable, selected microphone and monitoring first.

## Other apps and compatibility

{{ include "../reference/tools.md#app-comparison" }}

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Compare all apps](../reference/tools.md)

## Additional RVC tools

- [rvc-cli](rvc-cli/installation.md)
- [RVC Studio](rvc-studio/installation.md)
- [Mangio RVC Fork](mangio/installation.md)
