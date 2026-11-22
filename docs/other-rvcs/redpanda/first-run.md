---
label: "Set up Redpanda-vc"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/redpanda/first-run/
description: "Redpanda-vc extends Applio and offers multiple voice model families. This walkthrough uses the RVC family throughout."
---
# Set up Redpanda-vc

[GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda-vc extends Applio and offers multiple voice model families. This walkthrough uses the **RVC** family throughout. Pick one installation and keep its dependencies separate from other RVC programs.

## 1. Choose a launch path

1. Download the source or a compatible package from the [Redpanda-vc project](https://github.com/redpanda343/Redpanda-vc). For a source setup, extract it to a local writable folder and check that the project's dependency file and launcher are present. Install the dependencies required by your checkout in a dedicated Python environment. CUDA installations need a PyTorch build that supports the NVIDIA GPU and driver in use.
2. On Windows, start with `run-install.bat` and let it finish preparing the bundled project environment. Then use `run-applio.bat` for the browser WebUI, or `run-realtime-gui.bat` for the standalone realtime window. Both launchers expect the environment created in the project folder. Open a terminal in the project folder when you need to read startup logs. Keep it running during use.
3. Wait for the UI or open the loopback address printed by the process. If the launcher finishes without opening a page, check the terminal output for an import error, CUDA initialization failure, or port conflict. Repair the named problem in this installation before reopening it.
4. Confirm the correct execution device. Test one job at a time with the local interface before adding browser streams or other GPU-heavy jobs.

## 2. Choose the engine and model

In the relevant conversion view, select the **RVC** workflow, pick a compatible inference checkpoint and pair it with the matching index only when you have it. The app also exposes Beatrice and Rectified Flow in supported views. Each uses its own model format. A model that belongs to another family needs its own engine.

If your build exposes offline conversion, start with one dry, short spoken WAV and zero transposition. Save a fresh output and check the same words in both files. If you mainly need microphone conversion, move directly to the [realtime test](live-audio.md) with a known compatible model (remember: inside Redpanda-vc set **Input** = physical microphone and **Output** = `Line 1` / `CABLE Input`; inside Discord/OBS set **Input** = `Line 1` / `CABLE Output` and **Output** = headphones).

## 3. Diagnose startup before changing audio settings

- **Import error**: confirm the interpreter running the launcher is the one in your project environment and has the build's dependencies.
- **Model missing**: recheck the folder expected by your build, the current engine, and whether the file is an inference export.
- **CUDA error**: confirm the chosen RVC device and test with other GPU jobs closed. Record the first error instead of interpreting the final shutdown message.
- **Unclear compatibility**: note the checkout or package version, GPU, and intended model family. Test a baseline before trying custom vocoders or features.

If you want to train your own RVC voice in Redpanda-vc using Generator EMA and step-based checkpoints, see [Train RVC models (EMA & Steps)](training.md). For a full feature comparison against RVC Mainline, Applio, and Ilaria RVC, see [Redpanda-vc vs other RVC versions](differences.md).

[Interactive RVC Compatibility Matrix](../../reference/compatibility-matrix.md)
