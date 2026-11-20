---
label: "Logs and recovery"
icon: ":hammer_and_wrench:"
order: 92
permalink: /ilaria-rvc/troubleshooting/
description: "Start with Pitch 0, a short dry WAV and one known-good model. Change one setting per test. See Inference controls for the effects and export options."
---
# Logs and recovery

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## The app closes or the browser stays blank

1. Run `RUN_ILARIA_RVC_LOGS.bat` from the fully extracted folder. Leave the console open and read the first error, including the file or device it names.
2. If the console shows that the local server is running, open the address printed there. The default is `http://127.0.0.1:6969`. If the port is occupied, check for an existing instance before launching a second one. Save any active work before closing it.
3. Check the exact GPU model in **Task Manager → Performance** and compare it with [Compatible GPUs](gpu-compatibility.md). The Windows package includes CUDA 12.8. On a PC with only Maxwell, Pascal or Volta NVIDIA GPUs, check `cu126-runtime-install.log` for progress while the launcher prepares the CUDA 12.6 runtime. A failed download calls for checking internet access and free disk space.
4. If a file is missing after extraction, check that the entire archive was extracted and that the shortcut points to that installation. Back up your models, datasets and experiment folders before replacing installation files.

## The model is missing or the audio sounds wrong

| Symptom | First check |
| --- | --- |
| A voice is missing from **Voice Model** | Check the import log, then click **Refresh**. Select an inference `.pth` export. A G or D training checkpoint belongs to the experiment. |
| A file fails to decode | Play it outside the app. Export a short PCM WAV to a writable local folder and test that copy. |
| Conversion fails only with the index | Set **Index Ratio** to zero and try without an index. If that works, check that the optional `.index` matches the model and its embedder. |
| The voice still sounds like the source | Confirm the selected model and its expected embedder. Generic HuBERT encoders can retain source timbre. Test the same phrase with retrieval off before comparing settings. |
| Breaths or consonants are metallic | Test several clean clips with effects off. If the same model keeps distorting those sounds, inspect breath and consonant examples in the training data, correct them and retrain. |
| A long file fails but a short one works | Check VRAM and try **Split Audio** or shorter segments. Listen across each join before exporting. |

Start with **Pitch 0**, a short dry WAV and one known-good model. Change one setting per test. See [Inference controls](../convert/inference-buttons.md) for the effects and export options.

## Training stops or cannot resume

1. Check which stage failed. In **Process Data**, confirm the dataset path points to readable recordings and the output drive has space. In **Feature Extraction**, check that preprocessing completed and the chosen pitch and embedder assets are available.
2. If **Train Pth** runs out of VRAM, unload the inference model, close competing GPU jobs, reduce **Batch Size** and disable GPU dataset caching if enabled. Check **Training Log** for the effective settings before retrying.
3. If **Train Index** fails, check that the extracted features belong to the selected experiment. An index is optional for conversion. You can test a working inference export at **Index Ratio 0** while diagnosing the index.
4. To interrupt training, click **Stop and save** and wait for confirmation. To resume, use the same experiment name and compatible settings. Keep the G/D checkpoints and experiment state together. An inference export alone cannot resume training.
5. If you changed the sample rate, vocoder or embedder, create a separate experiment and prepare features for that configuration. Keep the original run available for comparison.

## Recover a Kaggle session

If the browser link stops working, check whether the Kaggle session is still running. After reopening the services, use the new links and the current credentials shown for each service. WebUI and FileBrowser have separate logins. Export and download your results before resetting the session. Follow the [Kaggle guide](../cloud/kaggle.md) for the backup steps.

## Collect details for a report

Copy the app version, exact GPU and first error. Include the button you pressed and a short sequence that reproduces the problem. For training, include the failed stage, sample rate, embedder and whether you resumed a run. For conversion, mention whether the same clip worked with another model or with retrieval off. If available, use **Training Dashboard → Diagnostic report**. Review the report before sharing and remove private paths, passwords and session links.
