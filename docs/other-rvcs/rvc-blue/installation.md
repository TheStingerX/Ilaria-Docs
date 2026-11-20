---
label: "Install and use RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue is a Windows desktop voice changer based on RVC WebUI (Mainline - Original RVC)'s real-time GUI."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

RVC Blue is a Windows desktop voice changer based on RVC WebUI (Mainline - Original RVC)'s real-time GUI. It converts microphone, audio-file, and supported Windows application audio in real time. Models are trained in a separate application. File input goes through the live engine and can be recorded to WAV.

## Install the Windows package

1. Check the model of your NVIDIA GPU in **Task Manager → Performance**. Open [RVC Blue downloads](https://huggingface.co/niel-blue/RVC-Realtime-GUI) and choose the package for your hardware. The project provides a standard **CUDA 12.8** package, including Blackwell support, and a **CUDA 11.8** compatibility package. Use a driver compatible with the selected build.
2. Extract the whole archive into a writable local folder. Python, PyTorch, FFmpeg and the required inference assets come with the package.
3. For CUDA 12.8, run `RVC-Realtime-GUI-CUDA128.bat` from that folder. For CUDA 11.8, use its bundled launcher. Wait for the first startup to finish loading the GPU runtime.
4. Start with the included voice or put your own inference `.pth` and its matching index in a per-model folder under `models/`. For example, place `MyVoice.pth` and `added_MyVoice.index` inside `models/MyVoice/`. The folder name appears in the model list. Refresh or reopen the app after adding a model.

## Test the voice locally

Choose your physical microphone as the input. Select headphones for monitoring, choose a voice and click **Start**. Speak a short sentence and pause. Keep default buffer and pitch settings for the first test. The app allows independent input, output and monitoring devices. Begin with WASAPI if you do not use ASIO hardware. If you use native ASIO, start with the driver's recommended buffer.

## Route audio to a game or call

Choose the virtual cable playback endpoint as the converter output. In the destination app, select the recording endpoint as its microphone. Keep game or call playback on your headphones. **VAC Lite** and **VB-CABLE** are options. Check the device names in the [virtual cable walkthrough](../vonovox/live-audio.md). Make a short local recording in the destination before joining a call.

## Use a file or another application as input

For an audio file, select the file input mode and test a short WAV. Choose an output and monitor device before starting. Use the recording controls to save WAV output. The app also exposes options to record the input and output independently or in a combined layout.

In builds that include application capture, switch the input source to an application, refresh the list and select the app that is playing audio. This uses Windows per-process audio capture. Direct ASIO output can bypass the capture path. The original application audio stays audible unless you adjust its playback separately.

## Troubleshoot the first test

| Symptom | What to check |
| --- | --- |
| The program closes during startup | Run the bundled launcher from its extracted folder and read the first error. Check the selected CUDA build and NVIDIA driver. |
| A new voice does not appear | Verify the per-model folder and refresh the model list. Use an inference export rather than a training checkpoint. |
| Headphones work but Discord or the game is silent | Select the virtual cable recording endpoint in the destination. Check the converter output separately. |
| You hear two voices | Check whether the original app is still audible or whether two monitoring routes are active. |
| Audio cuts out under load | Restore the default buffer or increase it slightly. Repeat the test while the other app is running. |

[Project source and release notes](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
