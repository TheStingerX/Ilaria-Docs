---
label: "GPT-SoVITS"
icon: ":studio_microphone:"
order: 97
permalink: /non-rvc/tts/gpt-sovits/
---

# GPT-SoVITS

## Choose a workflow

GPT-SoVITS generates speech from written text using a sample as a voice reference. Zero-shot inference uses a reference with an existing base model. Fine-tuning uses a prepared collection of clips and transcripts to adapt the model. Use a voice you have permission to reproduce.

## Install and launch

1. Open the upstream repository and choose a release or its documented integrated Windows build. Extract the complete package into a writable folder and launch `go-webui.bat`.
2. For a source installation, use a separate environment and follow the project's installer for your OS and device. The upstream Windows source installer offers CUDA or CPU options. Linux additionally documents ROCm and macOS has separate paths. Check the selected version and runtime together.
3. Launch the WebUI, open the local address shown in the console and keep the backend running. If launch fails, inspect the first error for missing runtime, FFmpeg or base model files.

## Run a first reference-based inference

1. Choose one short, clean speech clip with one speaker and no music. Begin with a few seconds of steady speech, using the duration accepted by your selected model version.
2. In inference, select the matching GPT and SoVITS weights for that version. Supply the reference audio, the exact reference transcript and its language.
3. Type one short sentence and set the target text language. Use a language supported by the selected build. Examples in the project documentation include Chinese, Cantonese, English, Japanese and Korean.
4. Generate and listen for missing words and unnatural pauses. Keep the same reference and weights while modifying punctuation or segmentation. Export the audio once a short test works.

## Fine-tune on a dataset

Prepare clean clips with accurate transcripts and label each sample's language. The upstream annotation format is `vocal_path|speaker_name|language|text`. Review transcripts produced by automatic recognition before training. In the training interface, prepare the dataset, train the SoVITS and GPT components using the chosen version, then select the resulting pair in inference. Compare it with the base configuration using held-out lines. Save the matching weights and record the app version and settings.

## Troubleshooting

If the voice sounds unstable, first try a cleaner reference and verify its transcript and language. If a checkpoint cannot load, check the GPT and SoVITS pair and release compatibility. If long text drops words, test a shorter sentence and adjust where you split it. If GPU memory runs out during training, begin with a smaller batch using the controls available in your version.

[Official repository and installers](https://github.com/RVC-Boss/GPT-SoVITS)
