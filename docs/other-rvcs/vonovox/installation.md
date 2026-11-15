---
label: "💿 Install Vonovox"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Install Vonovox

Vonovox is a Windows live voice converter for supported NVIDIA GPUs. Use this guide to reach a clean local microphone test before opening Discord, OBS, or a game.

> **Latest beta available in the download repository** · [Download Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Gather the files and devices

- Open Windows **Task Manager → Performance** and identify the graphics card by name. Use the [official package list](https://huggingface.co/dr87/vonovox/tree/main) to resolve a build or hardware-specific patch if needed. Keep older working builds in their own folders.
- Prepare an inference-ready RVC V2 checkpoint and check which embedder the model expects. A training checkpoint such as `G_*.pth` is for resuming training. For the first run, choose one model with known provenance and run without an index if the build offers it.
- Plug in a physical microphone and wired headphones. Close other programs that could take exclusive control of the audio devices, and confirm Windows can record your raw mic.

## 2. Start the app

1. Download the ZIP, then use **Extract All** and place the entire package in a writable local folder such as `C:\VoiceTools\Vonovox`. Run launchers from the extracted folder, with their supporting files beside them.
2. In the distribution documented by the developer, install the [Microsoft Visual C++ x64 runtime](https://aka.ms/vs/16/release/vc_redist.x64.exe), run `setup.bat`, then run `start.bat`. Use the supplied launcher for the exact archive you extracted. The first launch can take longer while dependencies initialize.
3. Wait for the interface. If the window exits immediately, run the same launcher from an open Command Prompt so the last error stays visible. Verify you extracted the entire archive and that you selected a compatible GPU build.
4. Select the RVC V2 model in the model area. Choose the expected embedder when the UI exposes it. Start with neutral pitch and formant controls, default block sizing, and optional effects off.

## 3. Check the first signal

Choose your physical microphone as **Input Device** and a suitable headphone monitor or the playback end of your virtual cable as **Output Device**. If the UI exposes the audio backend, start with WASAPI and shared mode. Press **Start**, wait a moment, and say a sentence followed by a pause. You should hear the converted voice, followed by silence. Press **Stop** before switching the audio devices or beginning the next test.

If the model fails to load, verify RVC V2 and the embedder before changing audio settings. If no voice is heard at all, confirm the mic and output devices separately. Continue with [microphone routing and tuning](live-audio.md) once the model starts.
