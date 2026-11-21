---
label: "Install and use RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue is a Windows desktop voice changer based on RVC WebUI (Mainline - Original RVC)'s real-time GUI."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

**RVC Blue (RVC-Realtime-GUI)** is a Windows desktop client for low-latency, real-time RVC voice conversion. Based on RVC WebUI's real-time GUI, it adds upstream real-time inference optimizations, **CUDA Graph warm-up** (reducing steady-state GPU overhead), and input/output noise-reduction fixes.

- **Inference only**: RVC Blue does not train models. Train your voice in **Ilaria RVC** (or another trainer) and import the exported inference `.pth` and `.index` files here.
- **Three input sources**: live **Microphone**, **Audio File** (via bundled FFmpeg), and **Windows Application Audio** (per-process capture).
- **Included voice**: comes with **Sakura**, a natural everyday voice model (commercial use permitted) so you can test right away.

## 1. Choose a build and install

Each Hugging Face package is self-contained and bundles its own Python runtime, PyTorch/CUDA stack, FFmpeg, HuBERT/RMVPE/FCPE assets, and the release model set. You do not need to install Python, CUDA Toolkit, or FFmpeg separately.

| Build | Launcher | Intended NVIDIA hardware |
| --- | --- | --- |
| **CUDA 12.8** *(Standard)* | `RVC-Realtime-GUI-CUDA128.bat` | Current NVIDIA GPUs, including RTX 50 series (Blackwell) |
| **CUDA 11.8** *(Compatibility)* | Bundled CUDA 11.8 launcher | Older NVIDIA GPUs or systems using a CUDA 11.8 driver/environment |

1. Check your NVIDIA GPU model in **Task Manager → Performance → GPU**.
2. Open [RVC Blue downloads on Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) and download the matching package.
3. Extract the entire archive into a **short, writable local folder** such as `C:\RVC-Realtime-GUI`. Do not launch it from inside the ZIP, and avoid `Program Files` or OneDrive-synced folders.
4. Run `RVC-Realtime-GUI-CUDA128.bat` (or the CUDA 11.8 launcher).
5. **Wait for the first launch to finish**: initialization takes longer the first time while bundled inference assets, CUDA runtime, and CUDA Graph warm-up load. Wait for the window to open before assuming it froze.

## 2. Add your voice models

Create one subfolder per voice inside `models/` in your extracted RVC Blue folder:

```text
models/
  MyVoice/
    MyVoice.pth
    added_MyVoice.index
    preview.png
```

- **Folder name**: appears as the model name in the gallery.
- **Required model file**: use an **inference `.pth`** export, not a raw training checkpoint (`G_*.pth` / `D_*.pth`).
- **Optional index & preview**: place the matching `added_*.index` file and an optional `.png`, `.jpg`, or `.jpeg` image in the same folder to show a preview thumbnail automatically.
- **Reload**: click **Reload** in the app (or restart RVC Blue) after adding or replacing a model. Per-model general settings are saved automatically.

## 3. Configure audio devices and test locally

RVC Blue lets you pick **Input**, **Output**, and **Monitor** independently:

- **Input**: your physical microphone (or audio file / Windows app).
- **Output**: where the converted voice is sent (your headphones for local testing, or a virtual cable for calls/games).
- **Monitor**: optional second output so you can hear your own converted voice while **Output** goes to Discord or OBS.

### WASAPI vs ASIO

- **No ASIO interface**: start with **WASAPI**.
- **Native ASIO hardware**: RVC Blue starts with your driver's preferred buffer size. You can also combine ASIO input/monitoring with WASAPI output, or use separate channel pairs on the same ASIO driver.

### First local test

1. Set **Input** to your physical microphone.
2. Set **Output** to your headphones (leave **Monitor** off for now so you don't hear double audio).
3. Select **Sakura** (or your own model) and keep default buffer and pitch settings.
4. Click **Start**, speak a short sentence, and pause to check latency, clarity, and noise levels.

## 4. Route audio to Discord, OBS, or a game

To send your converted voice into another app, route RVC Blue through a virtual audio cable (**VAC Lite** or **VB-CABLE**):

1. Set RVC Blue **Output** to the virtual cable playback endpoint (for example `CABLE Input` or `Line 1`).
2. Optionally set RVC Blue **Monitor** to your headphones if you want to hear yourself.
3. In Discord, OBS, or your game, select the virtual cable recording endpoint (for example `CABLE Output` or `Line 1`) as your **Microphone**.
4. Keep the game or call's own playback on your headphones.
5. Record a short local test in the destination app before joining a live call.

For virtual cable installation and device naming details, see the [virtual cable walkthrough](../vonovox/live-audio.md).

## 5. File input, application capture, and WAV recording

- **Audio file input**: switch the input source to **File**, pick a short WAV or audio clip (decoded with bundled FFmpeg), and verify your **Output** and **Monitor** devices before pressing **Start**. Output/monitor routing is preserved across runs.
- **Windows application capture**: switch the input source to **Application**, click **Refresh**, and pick a running app. This uses Windows per-process audio capture. Previously detected apps are remembered and reconnect automatically if restarted. Note that audio sent directly via ASIO outside standard Windows playback may not be captured, and the original app's audio is **not muted automatically** (mute or lower its volume separately if needed).
- **WAV recording**: use the built-in recording controls to save WAV files as **separate input/output**, **mixed**, or **split L/R** tracks.

## 6. Troubleshoot common issues

| Symptom | What to check |
| --- | --- |
| App seems frozen on first launch | Wait 1-2 minutes for initial CUDA runtime and CUDA Graph warm-up. |
| Program closes immediately at startup | Run the `.bat` launcher from the extracted folder (e.g. `C:\RVC-Realtime-GUI`) and read the console error. Verify your NVIDIA driver matches CUDA 12.8 or 11.8. |
| New voice does not show up | Check that the model is inside `models/<VoiceName>/` and is an inference `.pth` (not a training checkpoint), then click **Reload**. |
| Headphones work, but Discord/game is silent | Verify RVC Blue **Output** is the virtual cable playback device and Discord/game **Microphone** is the matching virtual cable recording device. |
| You hear two voices | Turn off **Monitor** when **Output** is already on headphones, or mute the original source app when using application capture. |
| Audio crackles or cuts out under load | Restore the default buffer or increase it slightly, then retest while the game or call is running. |

[Project source and release notes](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
