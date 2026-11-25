---
label: "Use and training"
icon: ":microphone:"
order: 98
permalink: /non-rvc/so-vits-svc/usage/
---

# So-VITS-SVC · Use and training

[Installation](installation.md) · [GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Convert a first recording

Put a short, clean vocal WAV in `raw/`. In the example, replace the path to the checkpoint, configuration and speaker name with your own. Read the speaker name from the `spk` mapping in the configuration. The file name after `-n` refers to a file inside `raw/`. The script writes the result in `results/`.

~~~bash
python inference_main.py -m "logs/44k/G_30400.pth" -c "configs/config.json" -n "voice.wav" -t 0 -s "singer"
~~~

## Tune the conversion

Start with `-t 0`, the source melody, and retrieval disabled. A pitch change of `12` raises the result by an octave. Leave automatic pitch prediction off for singing. If pitch jumps, compare one F0 predictor at a time, for example `-f0p rmvpe` if its dependencies are available. Keep optional clustering, retrieval and diffusion off until the basic conversion works.

## Train a model

To train, put clips from each speaker in their own `dataset_raw/<speaker>/` folder. Keep a separate recording to test later. Resample, build file lists and configuration, extract encoder features and F0, then train. Save a copy of your generated configuration with the checkpoint. The command below is a single-encoder example. Prepare any training base weights specified by upstream before running it.

~~~bash
python resample.py --skip_loudnorm
python preprocess_flist_config.py --speech_encoder vec768l12
python preprocess_hubert_f0.py --f0_predictor dio
python train.py -c configs/config.json -m 44k
~~~

## Troubleshooting

If the model fails to load, compare the checkpoint, configuration, speaker and encoder before editing settings. For dependency errors, read the first failing package and recreate the environment separately. For GPU memory errors during training, test shorter clips or a smaller batch. Training `D_*.pth` files are discriminator checkpoints. Use the generator checkpoint for this inference workflow.
