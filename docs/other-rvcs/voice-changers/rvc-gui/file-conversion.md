---
label: "Install and convert with RVC GUI"
icon: ":control_knobs:"
order: 99
permalink: /ilaria-rvc/rvc-gui/file-conversion/
description: "This guide covers Tiger14n's archived desktop app for converting audio files. Prepare a voice checkpoint and a short, dry WAV recording before you start."
---
# Install and convert with RVC GUI

[GitHub](https://github.com/Tiger14n/RVC-GUI)

This guide covers Tiger14n's archived desktop app for converting audio files. Prepare a voice checkpoint and a short, dry WAV recording before you start.

## 1. Open the Windows app

1. Open the project's [Windows package](https://github.com/Tiger14n/RVC-GUI/releases/tag/Windows-pkg). Download the packaged asset from the release, and extract the contents to a writable folder. Keep the runtime and model assets in the extracted layout.
2. Open the included launcher. A source checkout can be started with `RVC-GUI.bat` on Windows or `python rvcgui.py` once the runtime is set up. The archived source expects a compatible Python and PyTorch environment plus `hubert_base.pt` in its project root. Use a separate environment if you are testing the source so other RVC installations retain their dependencies.
3. If the packaged app closes immediately, run its launcher from an open terminal and read the first error. An archive that contains source files only will not have the packaged runtime. If the error names HuBERT in a source install, place the project's [HuBERT weights](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt) in the project root.

> Generic HuBERT checkpoints are not recommended as the default encoder for voice conversion. Their speech prediction training does not explicitly remove speaker identity, so the features can carry source timbre into the output. For RVC, use the encoder expected by the model, such as ContentVec when the voice was trained with it.

## 2. Add a voice

Click **Import model from .zip** and select a ZIP containing an inference `.pth` and its matching `.index` if supplied. For manual placement, put the files in a per-voice subfolder under the app's `models` directory. For example:

```text
models/
  MyVoice/
    MyVoice.pth
    MyVoice.index
```

Select the imported voice in the GUI. If it is absent, reopen the model list or restart the app after checking the folder. Use an inference model compatible with the archived build. A model created with an encoder or architecture the build cannot load should be tested in a compatible app.

## 3. Convert a baseline clip

1. In **Input audio file**, click **Browse** and select a short, dry vocal recording with a clearly voiced vowel and a consonant. Use a full WAV file as your baseline; separate a vocal stem first if the source is a full song.
2. Select the voice from the model controls. If your model has several supported speaker slots, choose the documented slot; otherwise use the default.
3. Leave **Pitch** at zero and set **Feature retrieval rate** to zero for the baseline. Leave **F0 method** at the default for this test.
4. Click **Convert** once and wait for **Output path** to show the generated file. Click **Open** to play it and compare it with the original at a similar volume. Copy the generated file to a distinct name if you want to keep it for comparison. Compare the same sentence before making another adjustment.
5. If you want stronger target character and have the matching index, try a small retrieval blend. If words become less clear, return to the baseline.

## Common problems

| What happens | What to check |
| --- | --- |
| Import reports missing weights | Open the archive and confirm it contains an inference `.pth` rather than just audio, documentation, or a training checkpoint. |
| No model appears | Check the extracted folder layout and ensure you opened the app from the same installation. |
| Wrong voice or metallic output | Check the selected checkpoint, compatible encoder, optional index and the source recording. Use an unprocessed clip with retrieval off. |
| File conversion appears to stop | Test a short local WAV and inspect the console. Check the first error before retrying a long render. |
| Performance is poor | Check which device the installed PyTorch build uses. For older platforms or newer model features, see the [RVC tools comparison](../../../reference/tools.md). |
