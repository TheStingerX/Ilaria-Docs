# VoiceStudio · Models and acceleration

[VoiceStudio v0.5.8 · Models and acceleration](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/engines/README.md)

## Understand what to download

An engine handles a task such as synthesis, transcription or another workflow stage. Weights are the files it needs. Install the engine for your task and check its languages, storage, backend and license before downloading others.

## Verify the device

1. Start with the compatible setting offered by the app.
2. Generate a reference sentence and record the engine name.
3. Before trying CUDA, ROCm, Metal or Vulkan, confirm support for the selected engine.
4. Repeat the same sentence. If acceleration fails, return to the working backend and inspect the first error.

## Choose by desired output

1. Use a TTS engine to read text and an ASR engine to turn audio into text.
2. For reference voices or voice design, check the engine supports that mode.
3. Check languages for the selected mode before downloading. A language available for ASR may be absent from TTS.
4. Review requirements, disk use and the model’s license. Wait until the installed model is ready.

## Compare CPU and GPU

Run identical text, voice and settings. Change only the backend if available. Run a warm-up before comparing times. If the GPU path fails, check CPU first. Verify engine and driver compatibility before downloading additional packs.

[First synthesis](first-run.md) · [Troubleshooting](troubleshooting.md)
