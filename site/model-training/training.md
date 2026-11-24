# Train an RVC voice model

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Training learns a target voice from a prepared collection of audio. Use this guide when you want to build a model from your own or authorized recordings. If you already have an inference model, see [RVC models and files](../start/models.md) to start using it.

## Plan your first run

Prepare the audio with the [dataset guide](dataset-preparation.md), then select it in **Training**. Give the experiment a unique name and choose one short recording outside the training set for listening tests. Start with a modest run that can complete all stages and produce a usable export. This gives you a baseline for changes to data or settings.

Record the application version, dataset revision, model format and sample rate, embedder, pitch method, pretrained pair, batch size, and planned save interval. Add the name of the held-out test clip. If a later run sounds different, these notes help you identify what changed.

## Choose compatible settings

| Setting | What to check |
| --- | --- |
| Model format, vocoder, and sample rate | Select a combination supported by the app and intended playback client. A fork-specific architecture can limit where your model loads. |
| Pitch guidance and extraction | Pitch guidance is useful for modelling pitch-dependent material, especially singing. Pick an extractor available for training in your build. |
| Embedder | This defines the representation extracted from audio. Record the choice so you can use the matching representation in supported inference clients. |
| Pretrained generator and discriminator | Use a matched pair compatible with the selected architecture, rate, and pitch configuration. Generator and discriminator files serve different roles in training. |
| Batch size | Controls how much data is processed per update. Begin with a setting your GPU can fit and lower it if training runs out of memory. |
| Target and checkpoint interval | An epoch is approximately one pass through the prepared dataset. Steps are individual training updates. Save periodically so you can compare exports and recover after an interruption. |

RefineGAN training and inference support 32, 40 and 44.1 kHz with RVC v2 and Pitch Guidance.

### Practical training tips

- **Epochs:** Try a first comparison run with a target around 200 epochs and listen to several earlier saves. This is a starting point for auditioning, since the strongest checkpoint can come earlier or later. A 1,000-epoch run offers no quality guarantee.
- **Batch and precision:** Start with a moderate batch, for example 8, and treat 16 as a conservative upper starting point. Reduce it if memory runs out. FP16 mixed precision can reduce VRAM use and speed up training on supported hardware. Check whether your build already enables it, and try FP32 if mixed precision produces non-finite losses.
- **TensorBoard:** Use metrics to track progress and spot stalled or unstable runs. Loss curves alone cannot tell which checkpoint sounds best. Compare conversions of the same held-out clips.
- **Normalization:** In Applio builds with these controls, Pre adjusts levels before slicing and Post adjusts them after slicing. Use None if the original levels are already suitable. In Ilaria RVC, Process Data applies level adjustment automatically to each slice. The public implementation has no separate Post toggle.
- **Noise filtering:** Start with optional noise reduction off for clean recordings. If the frontend also exposes a high-pass filter, use it for audible low-frequency rumble and compare the result by ear. High-pass filtering and noise reduction are separate operations.
- **GPU dataset cache:** Leave it off for a baseline. It consumes extra VRAM. Measure time per epoch before enabling it for a longer run.
- **Pretrained weights:** Match the G/D pair to the architecture, vocoder, sample rate and pitch configuration, and use the embedder specified by the pretraining author. For standard RVC pretrainings built with ContentVec, select ContentVec for feature extraction and inference.

### Choose a rate using the source bandwidth

Check the sample rate in the file metadata and inspect several representative clips in a spectrogram viewer such as [Spek](https://www.spek.cc/p/download). Look for useful vocal detail rather than isolated noise or a sharp cutoff left by compression. Half the training sample rate is the highest frequency that rate can represent. A 32 kHz model can represent frequencies up to 16 kHz, a 40 kHz model up to 20 kHz, and a 48 kHz model up to 24 kHz. For usable detail above 20 kHz, choose 48 kHz if the architecture and pretraining support it. Use the lower compatible rate when it already covers the source bandwidth. Preprocessing can resample recordings, but cannot restore missing detail.

## Run the stages in order

| Stage | What it produces | What to check |
| --- | --- | --- |
| Dataset preprocessing | Audio prepared for the experiment's model configuration. | The log names the intended folder and reports successful processing for usable files. Check skipped files before continuing. |
| Feature extraction | Content features, plus pitch data when required by the chosen configuration. | Extraction finishes for the current experiment using the selected embedder and pitch method. |
| Model training | Checkpoints and inference exports according to the configured save options. | Training steps advance and expected files are saved. Read the first error if progress stops. |
| Retrieval index | A searchable collection of dataset features for optional use during conversion. | The index belongs to this experiment and matches the exported voice. If you skipped it, test the model independently. |

Use the automatic workflow where available, or finish and verify each stage before starting the next. A changed dataset or sample rate can invalidate prepared audio and extracted features. A changed embedder requires new feature extraction. When testing an incompatible configuration, start a separate experiment so existing caches and checkpoints stay available.

## Follow progress in Ilaria RVC

- Use **Training Dashboard** to check step count, time per epoch, and loss curves. A curve can help explain a stalled run, while listening tests tell you how the output sounds.
- Configure **training previews** with a constant test clip so the app can generate comparable conversions as checkpoints are saved.
- If you use the **Training Queue**, set a distinct experiment name and dataset for each job. Before resuming or retrying, confirm which stages the job completed and where it will save output.
- When your release exposes **Stop and save**, use it when you need to interrupt and continue later. Wait for the checkpoint to finish writing before closing the app.

Ilaria RVC 2.1.0 supports epoch and total-step targets, including resuming partway through an epoch for step targets. Other frontends can expose different controls and resume behavior.

### Compare training budgets in steps

An epoch is one pass through the prepared dataset. A training step is one batch update. Divide the number of clips after preprocessing by the effective batch size to estimate steps per epoch. For example, 10,000 clips at a batch size of 8 gives 1,250 batches per epoch in a single-worker run. Dropped partial batches, multiple GPUs, or gradient accumulation can change how the trainer counts updates. Use the count reported by your run when comparing experiments.

Choose a save interval that gives you several checkpoints to audition. Saving about every 40 epochs is one possible starting point for a run measured in hundreds of epochs. Use the same held-out clips and inference settings for each comparison. Listen for intelligibility, stable pitch, natural pauses, and consonants that stay clear. If later exports sound harsher or work well on only a few phrases, compare with an earlier checkpoint and inspect the dataset for repeated takes or artifacts. Pick the checkpoint that works best across your intended inputs.

## Compare exports by listening

Open inference with an exported `.pth`. Use the same short held-out recordings and the same conversion settings to compare models from different checkpoints. If you make an index comparison, hold the checkpoint steady and compare the same clip with retrieval disabled and enabled.

Compare these four qualities across exports.

1. **Timbre.** Does the converted recording resemble the intended vocal character across the whole phrase?
2. **Intelligibility.** Are consonants and word endings still easy to understand?
3. **Pitch stability.** Do notes or syllables jump, warble, or lose their intended inflection?
4. **Artifacts.** Does the output add buzzing, embedded room noise, harsh tails, or odd transitions?

Keep the best sounding export and its test outputs. More epochs can be worth trying when results improve across several examples. If later exports only improve one clip or begin reproducing flaws from the dataset, return to the best baseline and review the recordings.

## Export, resume, or share

- **Use in inference.** Select the exported model `.pth`. Keep its corresponding `.index` alongside it when you want retrieval. Record any required embedder, supported client, and sample-rate information.
- **Resume training.** Back up the experiment and keep the matching generator and discriminator training checkpoints, commonly named `G_*.pth` and `D_*.pth`. Resume with the same experiment and compatible configuration, then inspect the log for the checkpoint and step or epoch you expected. An inference export alone lacks the full training state.
- **Share a model.** Share only files you have permission to distribute. Include listening examples, compatibility notes, the matching index if useful, and any usage terms the recipient needs.

In Ilaria RVC, recent releases use the model library for inference exports and associated indexes. Export paths and naming can differ across frontends. Save the experiment logs separately if you want to recreate the model later.

## Diagnose a failed run

| Symptom | Check first |
| --- | --- |
| Preprocessing found no audio | Verify the selected dataset folder and play an input clip. Check whether your build reads nested folders. |
| Extraction fails or reports a missing model | Check the selected embedder and pitch model assets, and read the first message in the extraction log. |
| GPU memory runs out | Reduce batch size, stop competing GPU jobs, and disable GPU dataset caching if your build offers that control. Retry the failing stage. |
| Training restarts at the beginning | Check that the experiment points to compatible training checkpoints and that any fresh-start option is off. |
| A `.pth` will not load for conversion | Check whether you selected a training checkpoint instead of an inference export, and verify architecture and embedder compatibility with the client. |
| A usable model has no index | Check whether index generation was skipped or failed. Export and test the checkpoint independently, then build its index from the matching experiment if needed. |

Keep the first failing message and the configuration associated with the run. For more checks, see [Troubleshooting](../reference/troubleshooting.md).

## Indicative Training Profiles (Adapt to Your Data & Hardware)

These three presets are **indicative starting points**, not universal rules. Always adjust **Batch Size** to fit your VRAM and judge checkpoints by listening to the same held-out test clips.

### Beginner Training (Safe Baseline)

- **Best for:** First voice model, 5–15 minutes of clean single-speaker audio, 6–8 GB VRAM GPUs.
- **Settings:** RVC **v2** · **40 kHz** · Pitch Guidance **ON** (`rmvpe`) · Embedder `contentvec` · Stock/verified HiFi-GAN pretrain · **Batch Size `4–8`** · **Epochs `200`** (save every `25–50` epochs) · Precision **FP32** (or **BF16** on RTX 30/40/50) · GPU Caching **OFF** · Workers `2` · Fused AdamW **OFF**.
- **Why:** Prioritizes stability and avoids out-of-memory errors or early overfitting while producing multiple checkpoints to compare.

### Intermediate Training (Balanced Quality & Speed)

- **Best for:** 15–30 minutes of cleaned speech/singing, 8–12 GB VRAM GPUs.
- **Settings:** RVC **v2** · **40 kHz** or **48 kHz** (if source bandwidth reaches >20 kHz) · `rmvpe` · `contentvec` or `klm-vocal-contentvec` / `spin-v2` (matched to pretrain) · **Batch Size `8–12`** · **Epochs `250–350`** (or equivalent **Total Steps**) · Save every `25–50` epochs · Precision **BF16** (RTX 30/40/50) or **FP16** (T4/RTX 20) · Workers `4`, Prefetch `4–8` · Build **FAISS `Auto` index** after choosing the best checkpoint.
- **Why:** Uses faster mixed precision and larger batches while keeping regular checkpoints and held-out listening previews.

### Advanced Training & Optimization

- **Best for:** Large or curated multi-emotion/singing datasets, 12–24 GB+ VRAM, custom pretrains.
- **Settings:** RVC **v2** · Matched rate (`32/40/44.1/48 kHz`) & vocoder (`HiFi-GAN`, `MRF HiFi-GAN`, or `RefineGAN` at `32/40/44.1 kHz` in Ilaria RVC) · Custom/matched G/D pretrain & embedder · **Batch Size `12–16+`** · **Total Steps** target (for consistent gradient updates regardless of dataset size) · **GPU Caching ON** (only if VRAM comfortably fits the dataset; benchmark epoch time first) · **Fused AdamW ON** (test in a fresh run) · **Training Queue** for overnight A/B runs · **TensorBoard** monitoring + **Audio Analyzer** comparison.
- **Learning rate:** Most RVC WebUIs (including Ilaria RVC) use the standard RVC v2 optimizer schedule (`1e-4` base); only change learning rate in frontends that expose it if you understand how it scales with batch size.

## How to Spot Underfitting vs. Overfitting by Ear

1. **Underfitting (too early):** The output still sounds mostly like the input speaker, misses target timbre on sustained vowels, or loses character on high/low notes. *Fix:* Continue training from the latest `G_*.pth`/`D_*.pth` checkpoint.
2. **Overfitting (too late):** The voice sounds robotic/metallic on unfamiliar words, reproduces dataset room noise or breath artifacts, or sounds great *only* on phrases similar to the training set. *Fix:* Roll back to an earlier checkpoint (`50–100` epochs earlier) and inspect the dataset in [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md).

> If you are training with **Redpanda-vc** (which adds Generator EMA and step-based checkpoint saving), see [Train RVC Models in Redpanda-vc](../other-rvcs/training/redpanda/training.md).
