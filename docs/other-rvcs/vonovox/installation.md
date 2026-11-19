---
label: "Install Vonovox"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Install Vonovox

[GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox)

Vonovox is a Windows live voice converter for supported NVIDIA GPUs. Use this guide to reach a clean local microphone test before opening Discord, OBS, or a game.

> **Latest beta available in the download repository** · [Download Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Gather the files and devices

- Open Windows **Task Manager → Performance** and identify the graphics card by name. Use the [official package list](https://huggingface.co/dr87/vonovox/tree/main) to resolve a build or hardware-specific patch if needed. Keep older working builds in their own folders.
- Prepare an inference-ready RVC V2 checkpoint and check which embedder the model expects. A training checkpoint such as `G_*.pth` is for resuming training. For the first run, choose one model with known provenance and run without an index if the build offers it.
- Plug in a physical microphone and wired headphones. Close other programs that could take exclusive control of the audio devices, and confirm Windows can record your raw mic.

## 2. Start the app

1. Download the ZIP, then use **Extract All** and place the entire package in a writable local folder such as `C:\VoiceTools\Vonovox`. Run launchers from the extracted folder, with their supporting files beside them.
2. The precompiled package is ready to run. Open the extracted folder and run `start.bat`. You can skip `setup.bat`.
3. Wait for the interface. If the window exits immediately, run the same launcher from an open Command Prompt so the last error stays visible. Verify you extracted the entire archive and that you selected a compatible GPU build.
4. Select the RVC V2 model in the model area. Choose the expected embedder when the UI exposes it. Start with neutral pitch and formant controls, default block sizing, and optional effects off.

## 3. Check the first signal

Choose your physical microphone as **Input Device** and a suitable headphone monitor or the playback end of your virtual cable as **Output Device**. If the UI exposes the audio backend, start with WASAPI and shared mode. Press **Start**, wait a moment, and say a sentence followed by a pause. You should hear the converted voice, followed by silence. Press **Stop** before switching the audio devices or beginning the next test.

If the model fails to load, verify RVC V2 and the embedder before changing audio settings. If no voice is heard at all, confirm the mic and output devices separately. Continue with [microphone routing and tuning](live-audio.md) once the model starts.

## First-run checklist

### Check the GPU before downloading

1. In Windows, press **Ctrl + Shift + Esc** and open **Performance**. Select each GPU entry and read its name. On a laptop, you may see both integrated graphics and a dedicated NVIDIA GPU.
2. Match the dedicated GPU to the package available from the developer. Use the Beta 3 link above for that release. If the package list includes a hardware-specific build or patch, check that it applies to your archive before installing it.
3. Keep room for both the ZIP and the extracted folder. Use a local folder that you can write to. Avoid launching directly from the ZIP or copying a launcher out of its folder.
4. Connect your microphone and headphones. Open **Settings → System → Sound → Input** and speak. If Windows does not detect a signal here, fix the input or microphone permission before opening Vonovox.

### Check that setup actually finished

1. The precompiled package is ready to run. Open the extracted folder and run `start.bat`. You can skip `setup.bat`.
2. If the window closes immediately, open Command Prompt in that folder, run `start.bat`, and read the first error.
3. If setup reports a missing Microsoft runtime, install or repair the linked Visual C++ runtime and retry. If it reports that CUDA cannot initialize, verify the NVIDIA driver and build compatibility. Keep the complete package together.
4. If you are updating a working installation, extract to a new folder and keep the previous version available. Test the new version before replacing a known working setup.

### Load one voice and check it before opening a call

1. Unpack the voice archive if needed. Find the inference `.pth`. Files named like `G_*.pth` or `D_*.pth` are typically training checkpoints.
2. Pick the RVC V2 voice and use the embedder specified by its publisher. Keep pitch neutral, effects off and the buffer at the default for the first test.
3. Select the physical mic. Send output to headphones for a direct test if supported, or use the virtual cable and Windows monitoring described in [Route and tune Vonovox](live-audio.md).
4. Start the converter and speak a short sentence, then pause. The output should have your timing and words with the selected voice's timbre. If you hear your ordinary mic or silence, follow the routing checks before changing pitch or effects.

| Symptom | Check first |
| --- | --- |
| No GPU or CUDA error | Check that the package supports your dedicated NVIDIA GPU and that Windows sees it. |
| A voice fails to load | Check the RVC version and encoder. Test a compatible inference export before changing audio settings. |
| No microphone signal | Test the physical mic in Windows, then reselect the same device in Vonovox. |
| Good local sound but silence in a call | Work through the cable endpoints and destination mic selection in the routing guide. |
| Audio breaks only during a game | Test with the game open and raise the block size one step if needed. |
