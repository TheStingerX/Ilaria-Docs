# Choose an RVC app

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

You can also run Ilaria RVC on Kaggle using its remote GPU. This option works even if your computer has no NVIDIA GPU. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

For complete installation, configuration, and troubleshooting procedures, see the [step-by-step app guides](../other-rvcs/app-guides.md).

Start with what you want to do. A **live voice changer** processes a microphone stream while you talk. A **file converter** processes a recording and saves the output for editing or export. A **trainer** turns a dataset of a speaker's recordings into a model. Some apps offer all three workflows. The build you install determines which graphics hardware and model formats you can use.

///region app-comparison
| App | Training | Inference (files) | Realtime | Project links |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Yes | Yes | No | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Yes | Yes | Yes · Separate launcher | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/applio/installation.md) | Yes | Yes | Yes | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Yes | Yes | Yes | [GitHub](https://github.com/redpanda343/Redpanda-vc) · [Windows x64 precompiled release](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | No | Yes | No | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/vonovox/installation.md) | No | No | Yes | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | No | No | Yes | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | No | No | Yes | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | No | Real-time file input | Yes | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../reference/tools.md#replay) | Yes | Yes · legacy | No | [Official website](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

| App | When to use it | Hardware and build notes |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | File conversion, TTS, training, and audio analysis | The current Windows distribution is NVIDIA only. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Upstream training and inference, with a separate realtime launcher | NVIDIA CUDA on Windows and Ubuntu. The upstream CPU setup covers AMD and Intel systems, with possible DirectML use on Windows. |
| [Applio](../other-rvcs/applio/installation.md) | File conversion, training, and realtime in one app | Desktop documentation lists NVIDIA CUDA, supported AMD setups, and Apple MPS. Availability depends on the edition and engine. |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | RVC + Casual Voice Changer · Tauri / WebUI | NVIDIA CUDA / CPU · [Windows x64 precompiled release](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Simple local file conversion in the legacy desktop interface | Archived. The project documents Windows NVIDIA CUDA and a historical Apple Silicon workaround. |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Recommended for live RVC v2 on Windows with NVIDIA | NVIDIA CUDA only. Match the Hugging Face package to your GPU generation. |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Live conversion across several operating systems | Windows CUDA and standard packages, including DirectML or CPU where supported. Separate Apple Silicon and Linux setup paths. |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Live RVC with documented options for AMD, Intel, and CPU users | Windows CUDA or DirectML. Linux and experimental macOS builds have separate instructions. |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Windows desktop voice conversion | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../reference/tools.md#replay) | Model training and file conversion · not recommended | [Archived installers](https://archive.org/details/replay-8.7.0-installers) |
///endregion

## Vonovox (recommended for live NVIDIA use)

> **Latest release (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

Vonovox is a Windows realtime voice changer that loads RVC v2 models and uses NVIDIA CUDA. Choose it if your main goal is microphone conversion and you have a supported NVIDIA card. The package list includes builds and patches for specific GPU generations, so check the filenames and release instructions before choosing an archive. Use the publisher's Hugging Face repository for downloads. [Official Vonovox downloads](https://huggingface.co/dr87/vonovox/tree/main) · [Vonovox hardware and setup notes](https://github.com/dr87/Vonovox/blob/main/README.md)

For a first run, load your RVC v2 voice and listen to a short microphone test before routing audio into another app. Then lower the block size gradually while speaking normally. Restore the previous setting if you hear dropouts or chopped syllables. Test again alongside the game or streaming app you plan to use, because both share the same GPU. [Vonovox audio configuration](https://github.com/dr87/Vonovox/blob/main/README.md)

## w-okada VCClient

VCClient handles live voice conversion with a client and server. You can run them together on one machine or put the server on a second machine to move the conversion workload away from your main computer. Select a release that supports the RVC model you want to load. The maintained downloads live on Hugging Face, and the project's English README explains Windows standard, Windows CUDA, Apple Silicon, and Linux options. [VCClient English README](https://github.com/w-okada/voice-changer/blob/master/README_en.md) · [Official VCClient downloads](https://huggingface.co/wok000/vcclient000/tree/main)

Check the model format as well as the accelerator. For example, the project's older Windows v1 instructions limit AMD and Intel GPU acceleration to ONNX models. A PyTorch `.pth` file and an exported `.onnx` file can have different hardware paths in the same app. Windows standard v2 documents DirectML and CPU options. [VCClient build and model-format notes](https://github.com/w-okada/voice-changer/blob/master/README_en.md)

## Okada TG Developed Fork (TGR)

The `tg-develop/voice-changer` project is a community fork in the w-okada family via the deiteris fork. It focuses on live RVC and documents separate Windows builds for NVIDIA CUDA and for DirectML on compatible AMD or Intel hardware. Its documentation also covers CPU use, Linux, and experimental macOS builds for Apple Silicon and Intel. [TGR setup and system requirements](https://github.com/tg-develop/voice-changer) · [TGR releases](https://github.com/tg-develop/voice-changer/releases)

On Windows, use the instructions for the build you downloaded. The DirectML build exposes a different list of pitch extractors from the NVIDIA build, so presets from the CUDA edition may need adjustment. Compare audio stability with your usual apps running before relying on the setup for a recording or stream.

## Ilaria RVC

The current Windows package is NVIDIA only. Use it when you want to switch between converting recordings, generating speech, training, checking a model's metadata, and inspecting waveforms or spectrograms in the Audio Analyzer. Existing installations can check for updates under **Other → Update Ilaria RVC**. [Ilaria RVC downloads](https://huggingface.co/TheStinger/Ilaria_RVC) · [Project README and release notes](https://github.com/TheStingerX/Ilaria-RVC)

## RVC GUI

Tiger14n's RVC GUI is a standalone desktop interface for converting audio files. It can import a ZIP containing the inference `.pth` and its matching `.index` when available. Its repository is archived, so use its instructions for a workflow that specifically requires this app. The upstream RVC project's similarly named **Real-time GUI** is a separate launcher. [RVC GUI repository and setup](https://github.com/Tiger14n/RVC-GUI)

## Applio

Applio supports RVC voice-model management, file conversion, training, and realtime. Its Desktop and Python/Gradio editions have different setup flows. The desktop docs identify NVIDIA CUDA, supported AMD configurations, and Apple MPS and explain how to check the engine status after installation. Use the [Applio conversion steps](../conversion/voice-conversion.md#convert-a-recording-in-applio) for your edition.

## RVC WebUI (Mainline - Original RVC)

Retrieval-based-Voice-Conversion-WebUI is the upstream RVC project. Its WebUI handles training and file inference. The project's realtime GUI has its own launcher. The main branch documents separate CUDA dependencies for newer and older NVIDIA cards, plus a CPU dependency set for AMD and Intel systems. On Windows, DirectML may be available for supported operations. Follow the [RVC WebUI (Mainline - Original RVC) conversion steps](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) for the Windows package.

## Redpanda-vc

Redpanda VC provides RVC and Casual Voice Changer training, file conversion and realtime in a desktop app and browser WebUI. Use `.pth` with the RVC engine and `.cvc` with CVC. [Windows x64 precompiled release](https://github.com/redpanda343/Redpanda-vc/releases/tag/release)

## Compare apps with the same voice

1. Choose the package for your operating system, GPU, and model format. Check whether the app supports your model's RVC generation and feature encoder.
2. Start with the same short recording or repeat the same few sentences into your microphone. Load the same inference model and its matching index in both apps if supported.
3. Use the same pitch shift and turn off optional voice effects for the first comparison. Judge clear words, stable pitch, and natural pauses before adjusting the sound.
4. For live use, run the game, call, or streaming app you normally use and record the routed output for at least a minute. Listen for gaps, hard cuts, and delayed audio before reducing the buffer.

## Extended Platform, Format, License & Maintenance Matrix

> **Claimed vs. Tested:** Only **Ilaria RVC** (verified on RTX 4070) and the documented workflows in this wiki have direct verification notes; capabilities for other apps below reflect their **project-documented** support as of November 2026.

| App | OS | GPU / CPU Support | Formats | TTS | Status & License | Ease of Install |
| --- | --- | --- | --- | --- | --- | --- |
| **Ilaria RVC** | Windows (local), Linux (Cloud) | NVIDIA CUDA (`12.8` / `12.6` legacy) | `.pth`, `.index`, `.safetensors` (converter) | Yes (Kokoro / Edge) | **Active** (MIT / RVC-based) | Easy (Portable ZIP) |
| **Vonovox** | Windows | NVIDIA CUDA | RVC v2 `.pth`, `.index` | No | **Beta** (`2.0.0 Beta 3`) | Easy (GPU-specific ZIP) |
| **Applio** | Windows, Linux, macOS (MPS) | NVIDIA, AMD (documented), Apple MPS, CPU | `.pth`, `.index`, `.onnx` (export) | Yes | **Active** (MIT) | Easy–Moderate (Installer / Python) |
| **w-okada VCClient** | Windows, macOS, Linux | NVIDIA, DirectML (AMD/Intel), MPS, CPU | `.pth`, `.onnx` | No | **Active / Maintained** (MIT) | Moderate (Edition-dependent) |
| **Okada TG Developed Fork** | Windows, Linux, macOS (exp.) | NVIDIA CUDA, DirectML (AMD/Intel), CPU | `.pth`, `.onnx` | No | **Active Fork** | Moderate (ZIP / Build) |
| **Deiteris w-okada Fork** | Windows, Linux, macOS | NVIDIA CUDA, DirectML (AMD/Intel), CPU | `.pth`, `.onnx` | No | **Active Fork** | Moderate (ZIP / Build) |
| **RVC WebUI (Mainline)** | Windows, Linux | NVIDIA CUDA, CPU / DirectML | `.pth`, `.index` | No | **Upstream / Slow** (MIT) | Moderate (ZIP / Git) |
| **RVC Blue** | Windows | NVIDIA CUDA (`12.8` / `11.8`) | `.pth`, `.index` | No | **Active** | Easy (Portable ZIP) |
| **Redpanda-vc** | Windows x64 · Linux (source) | NVIDIA CUDA / CPU | RVC, Casual Voice Changer | No | **Active Fork** | Moderate |
| **RVC GUI** | Windows | NVIDIA CUDA (legacy) | `.pth`, `.index` | No | **Archived** | Easy (Legacy ZIP) |
| **Replay** | Windows, macOS | NVIDIA / MPS / CPU (legacy) | `.pth` / Weights | No | **Discontinued** (Weights.gg shut down) | Broken / Legacy only |

## Replay

[Official website](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers)

Replay is no longer supported following the closure of Weights.gg. The [official Replay page](https://www.weights.com/replay) may go offline at any time. The Internet Archive hosts historical Replay 8.7.0 installers. Replay is not recommended for new setups. With Weights shut down, the archived installer will likely fail to download required files, so setup may not complete.

[Archived installers · Replay 8.7.0](https://archive.org/details/replay-8.7.0-installers)
