---
label: "📦 RVC models and files"
order: 93
permalink: /models/
description: "An RVC model changes the timbre of an existing performance. The source recording still provides the words, phrasing and timing."
---
# RVC models and files

An RVC model changes the timbre of an existing performance. The source recording still provides the words, phrasing and timing. You need a compatible inference model and a recording or microphone signal. Start with one isolated voice so you can hear what the model is doing.

## What the files do

| File | What it contains | What to do |
| --- | --- | --- |
| Inference `.pth` | The model weights used for conversion. | Load it in the model selector. |
| Matching `.index` | Features the app can retrieve during conversion. | Add it if available. You can convert without it. |
| `.zip` | An archive that may contain the model, index and a README. | Use ZIP import if your app supports the archive, or extract it and select the files individually. |
| Training checkpoints, such as `G_*.pth` and `D_*.pth` | Intermediate files used to resume training, depending on the app. | Use the exported inference model in your converter. A `.pth` extension alone does not identify the file's role. |

## Which index should I use?

In RVC WebUI (Mainline - Original RVC) training, `trained_*.index` is the FAISS index after it has learned how to organise features, before the feature vectors are added. `added_*.index` is the populated version. For conversion, pick the matching `added_*.index` if both exist. If you only have `trained_*.index`, keep retrieval off or generate the populated index from the experiment. Other apps may use different filenames.

An `.index` shipped with an exported model is very likely already populated, even if its filename lacks the `added_` prefix. The name alone cannot confirm its contents.

## What are the training folders?

These folders commonly appear inside `logs/<experiment>/`. They are working files for training and evaluation. A finished voice only needs its exported inference `.pth` and, optionally, the matching populated index.

| Folder | What it contains |
| --- | --- |
| `0_gt_wavs` | Preprocessed voice clips at the experiment’s sample rate. They are used as audio targets during training. |
| `1_16k_wavs` | 16 kHz copies of the clips used for feature extraction. |
| `2a_f0` | Extracted pitch saved as discrete values for pitch-conditioned models. |
| `2b-f0nsf` | Continuous pitch in hertz for pitch-conditioned models. |
| `3_feature768` | Per-clip feature vectors with 768 dimensions in the RVC v2 layout. These features are used for training and can also populate the retrieval index. |
| `eval` | Evaluation output, such as TensorBoard event files if the build writes them there. Its contents depend on the trainer. |

## Choose a model for the job

Listen to demos that resemble your intended input. For speech, listen for consonants, quieter words and natural pauses. For singing, check sustained notes and the high and low ends of your range. If you plan to use it live, test speaking freely and changing volume. Check the documented engine and model version, known language limitations and terms of use. A model that sounds good in one language may sound uneven in another, even when the training dataset includes both.

## Import and organise your models

1. Download from a source you trust and read the included notes. Model files can be unsafe when loaded by software that deserializes arbitrary objects.
2. Keep each voice and version in its own folder, with the exported `.pth`, its optional `.index` and any notes. Filenames alone are insufficient to match an index to a model.
3. In Ilaria RVC, open **Other → Import Local Models**. Choose the inference `.pth` or a supported ZIP, then add the matching `.index` if you have it. Other apps may ask you to refresh the model list after import.

## Run a first conversion

1. Record about ten seconds of one voice in a quiet room, without music, heavy reverb or clipping.
2. Select the intended model, leave index retrieval off and start at zero pitch shift. Save the converted WAV as a reference.
3. If the register sounds strained, compare small pitch changes in semitones using the same input. Pitch shift changes the register, so judge it separately from voice identity.
4. Once pitch is set, try a small increase in retrieval with the matching index. Listen for clearer voice character, then check whether breaths or consonants become rough. Keep the setting that sounds best, including zero.

## Diagnose common problems

| Symptom | What to check |
| --- | --- |
| The app cannot load the model | Confirm the engine, version and file type. Extract the ZIP if the importer rejects it, then select the exported inference weights. |
| The result still sounds like the source | Compare with another known-good model using the same clip. Persistent source timbre can come from the model or its training embedder, including HuBERT variants. More retrieval may not resolve it. |
| Breaths or consonants sound metallic | Compare with retrieval off. If the problem persists across clean inputs and settings, it may be in the model and require retraining. |
| Only the live output stutters | Try the same model with a file. If file conversion works, check the microphone, audio routing and buffer in the live app. |

## Keep a model ready to reuse

Save the working app version, model version, selected pitch and retrieval settings with a short reference clip. Test again after changing apps or updating the model. If you train your own voices, keep the export for inference and the files needed to resume training in separate folders.

## Continue with the guides

- [App guides](../other-rvcs/app-guides.md)
- [Ilaria RVC model library](../ilaria-rvc/manage/model-library.md)
- [Inference](../ilaria-rvc/convert/inference.md)
- [Dataset preparation](../model-training/dataset-preparation.md)
- [Troubleshooting](../reference/troubleshooting.md)

[Interactive RVC Compatibility Matrix](../reference/compatibility-matrix.md)
