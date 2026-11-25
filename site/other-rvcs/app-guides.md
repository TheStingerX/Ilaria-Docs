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

[Install Vonovox](voice-changers/vonovox/installation.md) · [Route and tune Vonovox](voice-changers/vonovox/live-audio.md) · [Install Okada TG Developed Fork](voice-changers/tgr/installation.md) · [Route and tune TGR](voice-changers/tgr/live-audio.md)

## Use Applio or Redpanda-vc for other workflows

Choose Applio for text-to-speech and model management. Redpanda VC provides RVC and Causal Voice Changer training, file conversion and realtime in a desktop app and browser WebUI. Use `.pth` with the RVC engine and `.cvc` with CVC.

[Install Applio](training/applio/installation.md) · [Applio TTS](training/applio/tts.md) · [Applio model library](training/applio/models.md) · [Set up Redpanda-vc](training/redpanda/first-run.md) · [Redpanda-vc live modes](training/redpanda/live-audio.md)

## Keep a baseline and fix one issue at a time

For file conversion, compare the same input clip at the same output volume. For live conversion, record a short test in the receiving app and check for doubled audio, dropouts and delay. If the voice sounds wrong in both tests, verify the model, engine and pitch. If only the receiving app sounds wrong, check the virtual cable, selected microphone and monitoring first.

## Other apps and compatibility

| App | Training | Inference (files) | Realtime | Project links |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Yes | Yes | No | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/training/mainline/installation.md) | Yes | Yes | Yes · Separate launcher | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/training/applio/installation.md) | Yes | Yes | Yes | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/training/redpanda/first-run.md) | Yes | Yes | Yes | [GitHub](https://github.com/redpanda343/Redpanda-vc) · [Windows x64 precompiled release](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/voice-changers/rvc-gui/file-conversion.md) | No | Yes | No | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/voice-changers/vonovox/installation.md) | No | No | Yes | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/voice-changers/okada/installation.md) | No | No | Yes | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/voice-changers/tgr/installation.md) | No | No | Yes | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/voice-changers/rvc-blue/installation.md) | No | Real-time file input | Yes | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../other-rvcs/training/replay/installation.md) | Yes | Yes · legacy | No | [Official website](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

| App | When to use it | Hardware and build notes |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | File conversion, TTS, training, and audio analysis | The current Windows distribution is NVIDIA only. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/training/mainline/installation.md) | Upstream training and inference, with a separate realtime launcher | NVIDIA CUDA on Windows and Ubuntu. The upstream CPU setup covers AMD and Intel systems, with possible DirectML use on Windows. |
| [Applio](../other-rvcs/training/applio/installation.md) | File conversion, training, and realtime in one app | Desktop documentation lists NVIDIA CUDA, supported AMD setups, and Apple MPS. Availability depends on the edition and engine. |
| [Redpanda-vc](../other-rvcs/training/redpanda/first-run.md) | RVC + Causal Voice Changer · Tauri / WebUI | NVIDIA CUDA / CPU · [Windows x64 precompiled release](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/voice-changers/rvc-gui/file-conversion.md) | Simple local file conversion in the legacy desktop interface | Archived. The project documents Windows NVIDIA CUDA and a historical Apple Silicon workaround. |
| [Vonovox](../other-rvcs/voice-changers/vonovox/installation.md) | Recommended for live RVC v2 on Windows with NVIDIA | NVIDIA CUDA only. Match the Hugging Face package to your GPU generation. |
| [w-okada VCClient](../other-rvcs/voice-changers/okada/installation.md) | Live conversion across several operating systems | Windows CUDA and standard packages, including DirectML or CPU where supported. Separate Apple Silicon and Linux setup paths. |
| [Okada TG Developed Fork](../other-rvcs/voice-changers/tgr/installation.md) | Live RVC with documented options for AMD, Intel, and CPU users | Windows CUDA or DirectML. Linux and experimental macOS builds have separate instructions. |
| [RVC Blue](../other-rvcs/voice-changers/rvc-blue/installation.md) | Windows desktop voice conversion | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../other-rvcs/training/replay/installation.md) | Model training and file conversion · not recommended | [Archived installers](https://archive.org/details/replay-8.7.0-installers) |

- [RVC WebUI (Mainline - Original RVC)](training/mainline/installation.md) · [w-okada VCClient](voice-changers/okada/installation.md) · [RVC GUI](voice-changers/rvc-gui/file-conversion.md) · [RVC Blue](voice-changers/rvc-blue/installation.md)
- [Compare all apps](../reference/tools.md)

## Additional RVC tools

!!!warning Legacy software · Not recommended
These projects are outdated and show no active maintenance. rvc-cli is archived, and the main branches of RVC Studio and Mangio RVC Fork have been inactive for years. The guides are kept for existing projects. For a new setup, choose a maintained app.
!!!

- [rvc-cli](training/rvc-cli/installation.md)
- [RVC Studio](training/rvc-studio/installation.md)
- [Mangio RVC Fork](training/mangio/installation.md)
- [Replay](training/replay/installation.md)
- [AICoverGen](training/aicovergen/installation.md)
