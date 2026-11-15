---
label: "🚀 Getting started"
order: 95
permalink: /getting-started/
---
# Getting started

You can also run Ilaria RVC on Kaggle using its remote GPU. This option works even if your computer has no NVIDIA GPU. [Ilaria RVC on Kaggle](../ilaria-rvc/kaggle.md)

For complete installation, configuration, and troubleshooting procedures, see the [step-by-step app guides](../other-rvcs/app-guides.md).

## Ilaria RVC

1. Get the Windows package from [Ilaria's Hugging Face repository](https://huggingface.co/TheStinger/Ilaria_RVC). Check the instructions for your release before updating your NVIDIA driver or changing dependencies.
2. Extract the complete package to a writable folder. Run the launcher from that folder, so it can find the bundled runtime and audio tools.
3. Open `ILARIA_RVC.bat`. If startup fails, close that attempt and use `ILARIA_RVC_LOGS.bat` to see the console.
4. If the interface does not open automatically, use [http://127.0.0.1:6969](http://127.0.0.1:6969) on the same PC. Keep the launcher running while you work.

### Convert a first clip

1. Import a compatible model from **Other**. Keep its optional matching index with the checkpoint.
2. Open **Single Inference**, select your model and add a short, dry voice recording.
3. Start with the default pitch extractor. Set pitch shift and **Index Ratio** to zero for a baseline.
4. Convert the clip and listen to the start, the loudest phrase and any consonants that sound softer than in the original.
5. Export a WAV reference. Follow [Voice conversion](../conversion/voice-conversion.md) to compare alternate settings on the same source.

### Update and back up

For an existing installation, use **Other → Update Ilaria RVC** and read the release notes before applying the update. Save a copy of your datasets, exported models, training checkpoints and converted audio before switching versions. Keep training checkpoints separate from the inference models you use or share.

Use recordings and voice models you have permission to use. For model demos and availability, see the [catalog](https://ilariarvc.shop/en/demos/).

[Ilaria RVC source and installation notes](https://github.com/TheStingerX/Ilaria-RVC) · [Release notes](https://github.com/TheStingerX/Ilaria-RVC/blob/main/CHANGELOG.md)


## Vonovox

> **Latest release (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

1. On Windows with NVIDIA, download the archive for your GPU generation from [Vonovox on Hugging Face](https://huggingface.co/dr87/vonovox/tree/main). Extract the full package and start the included app.
2. Load an RVC V2 model and select your microphone and headphones in the audio device settings.
3. Start conversion with the default buffer and speak a short sentence. Confirm the monitor sounds clear before [routing it to another app](../conversion/real-time.md).

## w-okada VCClient

1. Get a package for your platform and backend from [VCClient on Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Check that it supports RVC and your model format. The supported hardware can differ between PyTorch and ONNX models.
2. Extract the release and start its bundled server or launcher. Open the client from the local address shown at startup if it does not open automatically.
3. Import the voice into a model slot, select that slot and set the input and monitor devices. Start conversion and listen through headphones before connecting the output to a call.

## Okada TG Developed Fork

1. Choose a package from [TGR releases](https://github.com/tg-develop/voice-changer/releases). On Windows, use CUDA for a supported NVIDIA card or the DirectML build for a supported AMD or Intel GPU.
2. Launch the extracted build, select the matching compute device and import the voice into an RVC slot.
3. Set your microphone and headphone monitor, then test at the default buffer. Choose a pitch extractor available in your build when recreating a preset from another backend.

## RVC GUI

1. Download the desktop package from [RVC GUI releases](https://github.com/Tiger14n/RVC-GUI/releases). This archived app is intended for compatible legacy setups.
2. Extract and launch the app. Import a ZIP containing the inference checkpoint and its matching index if supplied, then select the imported voice.
3. Choose a short vocal recording, start at zero semitones and convert. Listen to the result and save a reference copy.

## Applio

1. Get the installer or package for your platform from [Applio downloads](https://applio.org/). In Desktop, finish engine setup and confirm your compute device. For a packaged Gradio build, extract the full archive, start the launcher and open its local address.
2. Add a voice to the model library and open **Convert Audio**. In older Gradio builds the tab may be called **Inference**.
3. Select the model, the matching embedder and optional index, then convert a short clean WAV with pitch at zero. Continue with the [Applio conversion workflow](../conversion/voice-conversion.md#convert-a-recording-in-applio) for batch and setting examples.

## RVC WebUI (Mainline)

1. Choose a compatible package from [RVC WebUI releases](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases). For a Windows package that includes it, extract the archive and run `go-web.bat`. Keep the console open while using the WebUI.
2. Put the inference checkpoint in `assets/weights` and its matching retrieval index under `logs`. Refresh the lists and select your voice.
3. Enter the full path to a short audio file, keep pitch at zero and click **Convert**. Use the output player's download control to save it. See the [Mainline conversion workflow](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) for additional checks.

## Redpanda-vc

1. Get [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc) and start the WebUI with a build suited to your system. The project provides a CUDA container option for NVIDIA.
2. Select the RVC engine and load a compatible RVC voice with its optional index. Redpanda-vc also offers other model families, each with its own model format.
3. For a browser microphone test, allow microphone access, choose the intended GPU if the stream settings expose device selection, and start the stream. Verify the headphone monitor at the default buffer before lowering latency.

For a side-by-side comparison, see [RVC tools](../reference/tools.md). For microphone routing, latency, and dropouts, see [Real-time voice conversion](../conversion/real-time.md).
