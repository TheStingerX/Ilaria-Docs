---
label: "Train and test a model"
icon: ":test_tube:"
order: 94
permalink: /ilaria-rvc/applio/training/
description: "A first run proves that your recordings, configuration and hardware can produce an export you can convert with. Work on copied recordings you have..."
---
# Train, evaluate and export a voice in Applio

A first run proves that your recordings, configuration and hardware can produce an export you can convert with. Work on copied recordings you have permission to use. Keep two or three phrases outside the training folder so you can check behavior on recordings the model has never seen.

## Prepare inputs

1. Create a short, recognizable experiment name such as `speaking_trial_01`. Keep scratch tests under their own names so you can find later checkpoints.
2. Check the recordings by ear at the beginning, middle and end. Remove clips with another speaker, music, clipping or long silent sections. If Desktop has dataset review tools, inspect flagged clips and prepare a training copy there. Trimming silence and adjusting level cannot repair audible distortion.
3. Select the copied dataset in **Training**. If Gradio asks for a folder path, use one on the machine running the engine. For a supported multispeaker workflow, preserve numeric folders such as `0` and `1` and record which person each ID represents.
4. Choose a vocoder and sampling rate supported together. Select a compatible generator/discriminator pair if using pretraining. Match rate, pitch guidance, architecture and the publisher’s embedder requirements. Record the exact embedder and any custom files for inference later.
5. Choose a batch size that fits GPU memory and save some intermediate exports. Pick an initial epoch target for a pipeline test. Extend it later if held-out tests improve.

## Run the stages

In Desktop, you can choose **Automatic Training** after reviewing the dataset, model configuration, epochs and save settings. Start the job once and follow its console. For separate control of each stage, use **Manual Training Setup**. Gradio exposes the corresponding steps in its **Training** workspace.

| Stage | What happens | What to confirm before continuing |
| --- | --- | --- |
| Preprocess | Applio reads the dataset, prepares clips and resamples for the chosen rate. | The log shows usable audio from the intended folder. If your build offers **Post** normalization, it adjusts each slice after splitting. Use it only when you want that treatment. |
| Extract | Applio builds the model’s content features and any pitch information needed by the configuration. | The intended embedder loaded and extraction finished. If you change encoders, run extraction again for that choice. |
| Train | The experiment learns voice characteristics from those features. | Epochs progress and the configured checkpoint or export files appear. On out-of-memory errors, stop other GPU work, lower batch size and consider disabling dataset caching. |
| Generate Index | Applio builds optional retrieval data from the experiment. | Keep the generated index with the matching export. If you chose to skip this stage, leave retrieval disabled during your test. |

When a stage fails, copy its first error and confirm its inputs before rerunning it. If recordings, rate or architecture change materially, a fresh experiment helps keep incompatible files apart. Stop realtime before starting Desktop GPU training.

## Compare checkpoints before choosing a winner

Open **Models → Export** in Desktop, or find the training export control in Gradio. Save an inference `.pth` from an intermediate checkpoint and a later one, plus the index if generated. For each export, convert the same held-out phrases with the same speaker ID, embedder, pitch settings and volume. Listen for intelligibility, voice consistency on soft and loud syllables, and artifacts on breaths. Training metrics can reveal failed progress. Listening helps decide which export to keep.

## Resume without rebuilding the experiment

Keep the experiment directory together with its preprocessing files, features and `G_*.pth` and `D_*.pth` training checkpoints. Keep the same name, architecture, rate and embedder on continuation. Choose a new **total** epoch target higher than the completed epoch count. In Desktop, leave **Fresh Training** off. Check the first log lines to see which checkpoint loaded and stop if the run unexpectedly starts over. The small inference export is the file you use in the converter. Continuing training requires the experiment’s training state.
