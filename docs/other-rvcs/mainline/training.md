---
label: "Train and export a model"
icon: ":test_tube:"
order: 20
permalink: /ilaria-rvc/mainline/training/
---

# Train and export a RVC WebUI (Mainline - Original RVC) model

Start with a single speaker and a fresh experiment name. Training produces a model you can test on new performances in the [inference interface](inference.md). Keep raw audio and the experiment log so you can reproduce your result.

## Prepare the files

1. Put clean voice recordings in a local folder such as `C:\RVC\datasets\voice_a`. Keep backups elsewhere. Use recordings you have permission to train with. Check that you can play several files and that they contain the intended voice without backing music or unrelated speakers.
2. Keep one or two short recordings of different phrases outside the dataset. Use these as test inputs for every checkpoint. For a dataset intended for singing, make sure you have material with the relevant vocal range and test with an isolated vocal.
3. If you installed from source, open the same environment used to run the WebUI and get the matching pretrained weights and silence assets. Packaged releases may already contain them.

```text
hf download lj1995/VoiceConversionWebUI --include "pretrained/*" "pretrained_v2/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI mute.zip --local-dir .model-downloads
python -m zipfile -e .model-downloads/mute.zip logs
```

See [dataset preparation](../../model-training/dataset-preparation.md) for recording and cleanup details.

## Configure the experiment and process audio

1. Open **Train**. Use a fresh name such as `voice_a_v2_40k` so RVC WebUI (Mainline - Original RVC) creates a separate folder under `logs/`.
2. Choose a target sample rate and architecture version supported by your release. V2 is a reasonable starting point when you plan to use a compatible V2 inference client. Rate, architecture, and pitch guidance must agree with the generator and discriminator pretrains. Use pitch guidance for a normal pitch-guided voice model.
3. Select a single-speaker dataset, where the build offers a choice. Use speaker ID `0` for the first run. Paste the complete dataset folder path, then click **Process Data** or the equivalent preprocessing button.
4. Wait for preprocessing to finish. Review warnings in the output and check that the experiment has produced processed audio. If the run produces nothing, verify the path and test whether the included audio files decode. Fix this before starting extraction.

For a multi-speaker experiment on a build with **Multi-speaker Dataset Helper**, keep each speaker's files separate and assign stable speaker IDs. Check the generated manifest and use those same IDs later during conversion. Complete a single-speaker pass first so you have a working baseline.

## Extract pitch and features

1. Choose the GPU index shown by the interface. For one GPU the ID is commonly `0`. Device fields for different operations may be separate. Copy the available IDs instead of assuming a specific slot.
2. Select a pitch extractor that the build can run. If a GPU RMVPE option is available and works on your system, start there. A CPU option can help isolate a backend problem. Feature extraction also requires the shared HuBERT assets installed in [setup](installation.md).
3. Run **Feature extraction** and wait for both the required pitch and the content-feature stages to finish. If a stage logs no usable files, stop and correct the cause. Changing the dataset, model version, or target rate changes the experiment. Use a new experiment name when comparing incompatible settings.

> Generic HuBERT checkpoints are not recommended as the default encoder for voice conversion. Their speech prediction training does not explicitly remove speaker identity, so the features can carry source timbre into the output. For RVC, use the encoder expected by the model, such as ContentVec when the voice was trained with it.

## Train and save checkpoints

1. Check the generator and discriminator fields in the training panel. They should refer to a matched pair for the version, sample rate and pitch mode you selected. If a log says the files were skipped, make sure you are training with the intended setup before continuing.
2. Start with a batch that fits memory and leave dataset caching off for the first test. If the GPU runs out of memory, stop the failed job and lower the batch size. Avoid running a live conversion alongside the first training run.
3. Set a finite trial target and an interval that saves multiple checkpoints you can compare later. If you want intermediate models ready for inference, enable small model exports at save time where available. Keeping only the latest training checkpoints saves space but limits resuming from earlier versions.
4. Click **Train model**. Watch the experiment status and confirm the training log advances across epochs. Use the application's stop control when available and wait for it to finish writing files before closing the process.

Training curves reveal whether the job is running or producing errors. Choose the final model by converting the same test recordings with several saved inference exports. Compare words, consonants, pauses and difficult notes at similar volume. More epochs can help, plateau or make results worse depending on the dataset.

## Build, test and back up

1. Click **Train feature index** after successful extraction if you want a retrieval index. Look for the populated `added_*.index` in the experiment output, with a discoverable copy or link if provided by your build. Skip retrieval if you only want to evaluate the checkpoint itself.
2. Find the small exported model under `assets/weights/`. If you have only a generator checkpoint, use **ckpt Processing** and the small model extraction tool, supplying the matching rate, pitch flag and version. Refresh the model list in inference and select the small export.
3. Convert a held-out clip at zero index rate. Once that works, try the matching populated index. Save both outputs for comparison.
4. Back up the small inference model and its matching index to use or share. Keep the experiment folder, including matching `G_*.pth` and `D_*.pth`, configuration and logs, if you plan to resume training.

| Symptom | Where to look |
| --- | --- |
| Preprocessing finishes with no audio | Check the dataset path, permissions, supported formats and whether the WAV files open outside RVC. |
| Feature extraction stops | Identify whether content or pitch extraction failed. Check model assets and try a supported backend. |
| Training starts and then runs out of VRAM | Reduce batch size, switch off caching and free VRAM before retrying. |
| Inference fails with a checkpoint | Confirm you selected an exported inference model. Test a known working checkpoint with the same input and no index. |
| Index generation finds no features | Revisit successful feature extraction for the same experiment. Check version and folder names before trying to reuse files. |
