---
label: "Train RVC models (EMA & Steps)"
icon: ":mortar_board:"
order: 97
permalink: /ilaria-rvc/redpanda/training/
description: "Beginner-friendly, code-verified guide to training RVC models in Redpanda-vc: Generator EMA, step-based checkpoint saving, resuming, exporting, and troubleshooting."
---
# Train RVC Models in Redpanda-vc - EMA & Step-Based Saving

[Redpanda-vc on GitHub](https://github.com/redpanda343/Redpanda-vc) · [Set up Redpanda-vc](first-run.md) · [Redpanda-vc vs other RVC versions](differences.md) · [General RVC Training Guide](../../model-training/training.md)

Training a voice model teaches a program to reproduce a target voice from a collection of clean audio clips. If you are new to RVC, you do not need to memorize technical jargon before starting. Here are the key terms in plain English:

- **Weights:** The internal numbers inside the model that adjust bit by bit as it learns a voice.
- **Generator (`G`):** The part of the model that actually creates the converted voice audio.
- **Discriminator (`D`):** A helper network used only during training to judge how realistic the generator's audio sounds compared to the real recordings.
- **Optimizer:** The math engine that updates the model's weights after each training step.
- **Step:** One single weight update after processing one small group (**batch**) of audio clips.
- **Epoch:** One full pass through your prepared dataset.
- **Checkpoint (`G_*.pth` / `D_*.pth`):** A saved training snapshot used to pause and resume training later.
- **EMA (Exponential Moving Average):** A smoothed, running average of the generator's weights maintained during training.

> EMA helps smooth out changes in the generator's weights during training. Instead of exporting only the latest generator weights, Redpanda-vc can export a running average of them.

Training does not produce a finished voice instantly, and final quality depends heavily on your source recordings, dataset preparation, and training settings. Before diving in, keep in mind what EMA **does not** do:

- EMA is **not** an audio filter or denoiser.
- EMA does **not** edit or clean your dataset files.
- EMA does **not** repair clipped or noisy recordings.
- EMA does **not** guarantee better audio quality on every voice.
- EMA does **not** remove all randomness from training.

---

## What Is EMA?

Imagine a student practicing how to pronounce a difficult word. One individual attempt might sound slightly clearer or slightly rougher than the one right before it. Looking at the trend across many recent attempts gives a steadier picture of the student's progress than judging solely by the very last attempt.

*(Keep in mind this is only an analogy: EMA does not listen to audio, judge pronunciation, or pick "better" recordings on its own.)*

### How Redpanda-vc Actually Runs EMA

In `rvc/train/train.py`, Redpanda-vc maintains EMA in memory while training runs:

1. The generator trains normally on each batch.
2. The optimizer updates the generator's live weights.
3. Immediately after each generator optimizer step (on rank `0`), `GeneratorEMA.update()` updates a separate averaged copy of the generator's weights (excluding `enc_q`, which is only used during training).
4. That running average stays in memory and is saved inside the `G` training checkpoint.
5. When EMA is enabled (`Generator EMA Decay > 0`), Redpanda-vc exports inference `.pth` models from those EMA weights instead of the raw live generator weights.

**EMA updates every training step, not once per epoch.** Redpanda-vc does **not** average multiple `.pth` files already saved on disk; it maintains one continuous running average in memory during training.

<details>
<summary>Optional math details: standard EMA vs. Redpanda-vc's bias-corrected formula</summary>

The intuitive standard EMA update is:

```text
EMA_new = decay * EMA_previous + (1 - decay) * current_weights
```

In `rvc/train/train.py` (`GeneratorEMA.update()`, lines 199-205), Redpanda-vc does not apply a constant decay from the very first update. Instead, it computes a bias-corrected effective decay based on the number of updates (`updates`):

```text
effective_decay = beta * (1 - beta ** (updates - 1)) / (1 - beta ** updates)
```

where `beta` is your `ema_decay` setting. This warm-up correction reduces the influence of the initial weights during the earliest updates, then approaches `beta` as `updates` grows. Floating-point parameters are blended via `torch._foreach_lerp_`, while non-floating-point buffers are copied from the live generator.

</details>

---

## Understanding Generator EMA Decay

In **Training → Advanced Settings**, Redpanda-vc exposes **Generator EMA Decay** (`tabs/train/rvc.py`, lines 809-819):

- **Minimum:** `0`
- **Maximum:** `0.9999`
- **Default:** `0.999`
- **Slider step:** `0.0001`

### What the Values Mean

- **`Generator EMA Decay = 0`:** Disables `GeneratorEMA` completely. Inference `.pth` models are exported directly from the live generator weights.
- **`Generator EMA Decay = 0.999` (Default):** Maintains an exponential running average that gives meaningful weight to recent generator updates while smoothing step-to-step fluctuations.
- **`Generator EMA Decay = 0.9999`:** Changes the running average more slowly and averages over a longer window of updates. This can increase smoothness of the average, but it also makes the EMA weights react more slowly to recent improvements in the live generator.

Lower values adapt faster to recent weights, while higher values average over more steps. `0.9999` is **not** automatically better than `0.999`, and there is no universal "best" decay for speech, singing, small datasets, or large datasets. If you are a beginner, starting at the default **`0.999`** and comparing real audio outputs before tuning is a practical baseline.

---

## Why Does Redpanda-vc Use EMA?

In deep learning literature (such as PyTorch's weight-averaging documentation and Morales-Brotons, Vogels, and Hendrikx, 2024), averaging weights along a training trajectory is studied because individual SGD/Adam updates can oscillate around good solutions.

### Potential Benefits (Not Guarantees)

- Reduced step-to-step oscillation in exported weights.
- Greater continuity between consecutive exports.
- Attenuation of some update-level variability during training.
- Potentially steadier exported model behavior, though actual audio improvement on your specific RVC dataset requires listening tests.

### Important Limitations

- EMA does **not** replace a clean, well-prepared dataset.
- EMA does **not** eliminate overfitting.
- EMA does **not** prevent a broken or unstable training run from failing.
- EMA does **not** guarantee higher voice similarity or better pronunciation.
- EMA does **not** promise fewer training steps or epochs.
- EMA is **not** an automatic "best checkpoint" selector.
- EMA keeps an extra copy of the generator's weights in memory and adds a small per-step update cost.

---

## EMA Weights vs. Training Checkpoints

In Redpanda-vc, four different things exist during a run. Do not mix them up:

| File / State | Where It Lives | What It Contains | What It Is Used For |
| --- | --- | --- | --- |
| **Generator checkpoint (`G_*.pth`)** | `logs/<model_name>/` | Live generator weights, optimizer state, scaler, `iteration` (epoch), `step`, `epoch_step`, RNG, and `ema` state (when enabled) | Resuming training (and manual export) |
| **Discriminator checkpoint (`D_*.pth`)** | `logs/<model_name>/` | Discriminator weights, optimizer state, scaler, `step` | Resuming training alongside `G_*.pth` |
| **EMA weights** | In memory during training and inside `G_*.pth` (`checkpoint["ema"]["weights"]`) | Running average of the generator's weights (excluding `enc_q`) | Generating smoothed inference `.pth` exports |
| **Inference model (`<name>_<epoch>e_<step>s.pth`)** | `logs/<model_name>/` | Compact inference-only generator weights + metadata | Voice conversion only (**cannot** resume training) |

**Note:** In the verified Redpanda-vc source (`train.py`), EMA is applied **only to the generator (`net_g`)**, never to the discriminator (`net_d`).

---

## Training Steps vs. Epochs

- **Epoch:** One full pass over the prepared training dataset.
- **Batch:** A small group of audio slices processed together in one forward/backward pass.
- **Step:** One optimizer update after processing one batch. One step is **not** one audio file and **not** one second of audio.

### Hypothetical Example

Suppose your prepared dataset and `Batch Size` produce **100 steps per epoch**:

- `100` steps ≈ `1` epoch
- `500` steps ≈ `5` epochs
- `1,000` steps ≈ `10` epochs

The actual steps-per-epoch ratio depends on your dataset length, slicing, `Batch Size`, and `Max Audio per Batch (sec)`. Never assume 100 steps equals 1 epoch for every model.

---

## Step-Based Checkpoint Saving

Instead of waiting for an entire epoch to finish before saving, Redpanda-vc schedules saves by **step count** (`tabs/train/rvc.py`, lines 663-703; `rvc/train/train.py`, lines 917-921 and 1146-1195):

### Total Steps

- **Default:** `10000` (slider range `1` to `1000000`, step `1`).
- Sets the **overall target step count** for the experiment, **not** "add 10,000 more steps." If your resumed model is already at step `10000`, you must raise `Total Steps` (for example to `15000`) to continue training.

### Save Every X Steps

- **Default:** `1000` (slider range `1` to `100000`, step `1`).
- Saves `G` and `D` checkpoints every `X` training steps (`self.global_step % save_every_steps == 0`).
- **Example:** With `Total Steps = 10000` and `Save Every X Steps = 1000`, Redpanda-vc saves at steps `1000`, `2000`, `3000`, ..., `10000`, regardless of whether those steps land mid-epoch.

### Final Save

Even if `Total Steps` is not a multiple of `Save Every X Steps` (for example, `Total Steps = 2500` and `Save Every X Steps = 1000`), Redpanda-vc **always** saves both the `G`/`D` checkpoints and an inference `.pth` model when reaching the final step (`final = self.global_step >= self.args.total_steps`).

### Save Every Weights

- **Default:** **Enabled** (`True`).
- When **enabled**, Redpanda-vc exports an inference `.pth` model at every save interval *and* at the final step.
- When **disabled**, `G`/`D` checkpoints still save every `Save Every X Steps`, but an automatic inference `.pth` is exported only at the final step.

### Save Only Latest

- **Default:** **Enabled** (`True`).
- When **enabled**, `G` and `D` checkpoints overwrite fixed filenames (`G_2333333.pth` and `D_2333333.pth`, where `2333333` is `LATEST_CHECKPOINT_SUFFIX`) to save disk space.
- When **disabled**, checkpoints include the step number (`G_1000.pth`, `D_1000.pth`, `G_2000.pth`, `D_2000.pth`).
- **Important:** `Save Only Latest` only affects `G`/`D` training checkpoints, **not** exported inference `.pth` models (unless you disable `Save Every Weights`). Keep in mind that with `Save Only Latest` enabled, you cannot roll back training to an older intermediate `G`/`D` checkpoint if a run later degrades.

---

## Your First RVC Training in Redpanda-vc

### 1. Preparation

1. Install and launch Redpanda-vc (see [Set up Redpanda-vc](first-run.md)).
2. Open the **Train** tab and select **RVC** (if your build shows multiple model families).
3. Under **Model Settings**, enter a unique **Model Name** (your experiment name).
4. Choose a compatible **Sample Rate** (`32k`, `40k`, or `48k`), **Version** (`v1` or `v2`), and **Vocoder** (`HiFi-GAN`, `MRF HiFi-GAN`, or `RefineGAN` depending on your pretraineds and target inference app).
5. Prepare a clean, dry dataset of **authorized recordings** in a dedicated folder.

### 2. Preprocess

1. Open the **Preprocess** accordion.
2. Enter or select your dataset folder path in **Dataset Path** (click **Refresh** if needed).
3. Click **Preprocess Dataset** and wait for it to finish slicing and normalizing the audio into `logs/<model_name>/`.

### 3. Extract

1. Open the **Extract** accordion.
2. Select your **Pitch extraction algorithm** (such as `rmvpe`) and **Embedder Model** (typically `contentvec`).
3. Click **Extract Features**. *(This prepares pitch and content features for training; it does **not** train the `.pth` weights yet.)*

### 4. Training

1. Open the **Training** accordion.
2. Set **Batch Size** to a value your GPU VRAM can hold comfortably.
3. For a first illustrative test, you can leave the current defaults:
   - **Total Steps:** `10000`
   - **Save Every X Steps:** `1000`
4. Expand **Advanced Settings** to verify:
   - **Save Only Latest:** Enabled (`True`)
   - **Save Every Weights:** Enabled (`True`)
   - **Generator EMA Decay:** `0.999`
   *(These defaults are illustrative starting values, not guaranteed optimal settings for every dataset.)*
5. Click **Start Training**.
6. Monitor progress using the terminal/UI status, **Pause Training** / **Resume Training** / **Stop Training**, and TensorBoard logs (`logs/<model_name>/eval/`).
7. Once finished, click **Generate Index** if you want a matching `.index` file.

### 5. Output Files

Inside `logs/<model_name>/`, you will find:

- **Resumable checkpoints:** `G_2333333.pth` and `D_2333333.pth` (when **Save Only Latest** is enabled) or `G_<step>.pth` / `D_<step>.pth` (when disabled).
- **Inference models:** `<model_name>_<epoch>e_<step>s.pth` (for example, `MyVoice_45e_1000s.pth`). These are the files you load for voice conversion.

---

## Resuming Training Safely

When you restart training on an existing experiment (`rvc/train/train.py`, lines 420-436, 528-538, 763-803, 844-853):

1. `latest_checkpoint_pair()` scans `logs/<model_name>/` for the newest `G_*.pth` by modification time and pairs it with the matching `D_*.pth` suffix. **Both `G` and `D` files must exist** to resume.
2. `restore()` reloads `epoch`, `start_batch` (`epoch_step`), `global_step` (`step`), AMP `scaler`, RNG state, and both optimizers.
3. `build_ema()` restores `GeneratorEMA` from `checkpoint["ema"]` when `ema_decay > 0`. If `ema` state is missing or incompatible (for example, resuming from a non-EMA checkpoint), Redpanda-vc logs a notice and initializes EMA from the resumed generator weights instead of crashing.
4. Any steps completed *after* the last saved checkpoint before a crash or manual stop are lost and will be re-run from that saved step.

### Controls Not to Confuse

- **Reset Optimizer State:** Keeps your model weights, `global_step`, and learning rate schedule, but clears the optimizer's momentum/moment buffers (`state={}`). Use only when intentionally resetting optimizer dynamics; normal resuming leaves this **OFF**.
- **Fresh Training (`--cleanup`):** **Deletes** all previously generated `G_*` and `D_*` checkpoints, `spec.pt` files, and TensorBoard logs for that experiment. Leave this **OFF** whenever resuming.
- **Save Every X Steps vs. Checkpointing:** **Save Every X Steps** controls how often checkpoints are written to disk. **Checkpointing** (in **Advanced Settings**) is **activation checkpointing**, which trades slower training speed for lower VRAM usage on GPUs with limited memory (it does not control disk saving).

---

## How Redpanda-vc Exports EMA Models

1. **Automatic exports during training (`train.py`, lines 1090-1091 & 1157-1163):** Whenever `save()` triggers an inference export (`Save Every Weights` or the final step), `export_state_dict()` returns `self.ema.weights` if EMA is enabled (`ema_decay > 0`), or the live generator's `state_dict()` if EMA is disabled (`ema_decay = 0`).
2. **Manual exports (`Export Model` accordion -> `rvc/train/process/checkpoint_exporter.py`, lines 44-117):** You can manually export any resumable `G_*.pth` checkpoint in `fp16` or `fp32`. `export_generator_checkpoint()` checks if `checkpoint["ema"]["weights"]` exists and automatically uses those EMA weights when present (reporting `... and the generator EMA` in the status message).
3. There is **no** separate "Raw vs. EMA" toggle in the WebUI exporter; the exported `.pth` is for inference only, while `G_*.pth` + `D_*.pth` remain required to resume training.

---

## Does EMA Actually Sound Better?

There is no universal yes-or-no answer across all voices and datasets. Because the current WebUI does not export both Raw and EMA versions side-by-side from a single run, the cleanest way to test EMA is a controlled comparison:

1. Use the exact same prepared dataset and feature extraction.
2. Keep `Batch Size`, `Total Steps`, learning rate schedule, and pretrained weights identical.
3. Run one experiment with `Generator EMA Decay = 0.999` and one with `0`.
4. Compare inference `.pth` exports at the **same step count** (e.g., `5000s` vs. `5000s`) using held-out test clips not in the training set.
5. Listen for voice similarity, crispness of consonants, pitch stability, and artifacts rather than judging solely by TensorBoard loss curves.

---

## Troubleshooting for Beginners

| Problem | Possible Cause | What to Check | Solution |
| --- | --- | --- | --- |
| **Training does not start** | Missing preprocessed/extracted files, wrong path, or active run lock (`training_state.json`) | Check terminal output for the first error | Complete **Preprocess Dataset** and **Extract Features** first, and confirm no run is already active |
| **GPU out of memory (OOM)** | `Batch Size` too high or `Cache Dataset in GPU` enabled on limited VRAM | Check VRAM usage and terminal error | Lower **Batch Size**, disable **Cache Dataset in GPU**, or enable **Checkpointing** |
| **EMA does not seem to change results** | Small step count, decay close to `0`, or comparing different steps | Check `Generator EMA Decay` and console startup summary | Confirm `generator EMA <value>` appears at startup and compare same-step exports on held-out clips |
| **EMA Decay set to `0`** | Slider set to `0` | Check **Training → Advanced Settings → Generator EMA Decay** | Set to `0.999` (default) if you want EMA enabled on the next run |
| **No intermediate inference `.pth` models** | **Save Every Weights** is disabled | Check **Training → Advanced Settings → Save Every Weights** | Enable **Save Every Weights** to export inference models at every `Save Every X Steps` |
| **Only the latest `G`/`D` checkpoints exist** | **Save Only Latest** is enabled (default) | Check `logs/<model_name>/` for `G_2333333.pth` / `D_2333333.pth` | Disable **Save Only Latest** before training if you want numbered `G_<step>.pth` history |
| **Missing `G` or `D` checkpoint** | One file was deleted or moved manually | Check `logs/<model_name>/` for matching `G_*` and `D_*` pair | Both `G` and `D` with the same suffix are required to resume (`latest_checkpoint_pair()`) |
| **Training restarts from an earlier step** | Stopped or crashed before the next `Save Every X Steps` | Compare last console step vs. resumed step | Normal behavior: progress after the last disk save is not stored until the next save interval |
| **Notice/error restoring EMA state** | Resuming from a non-EMA checkpoint or mismatched model config | Read `"Could not restore the generator EMA..."` in terminal | Redpanda-vc automatically falls back to starting EMA from the resumed generator weights |
| **Fresh Training deleted previous checkpoints** | **Fresh Training** (`--cleanup`) was left checked | Check `logs/<model_name>/` | Uncheck **Fresh Training** when resuming; deleted checkpoints cannot be recovered unless backed up |
| **Total Steps already reached** | `global_step >= Total Steps` | Read `"already reached step X. Raise the total steps..."` in terminal | Increase **Total Steps** above the current step count and click **Start Training** |
| **Exported `.pth` cannot resume training** | Loaded an inference `.pth` instead of `G_*.pth` + `D_*.pth` | Check filename (`<name>_Xe_Ys.pth` vs. `G_*.pth`) | Inference `.pth` files strip training state; resume from `logs/<model_name>/` with `G_*.pth` and `D_*.pth` |
| **Unexpectedly high VRAM usage** | **Checkpointing** disabled, high **Batch Size**, or **Cache Dataset in GPU** on | Check **Advanced Settings** | Enable **Checkpointing** (activation checkpointing), turn **Cache Dataset in GPU** off, and reduce **Batch Size** |

---

## FAQ

**What does EMA mean?**
Exponential Moving Average: a running average of the generator's weights maintained during training.

**Does EMA improve voice quality?**
It can smooth weight oscillations, but it is not a guarantee. Whether a specific voice sounds better depends on your dataset and requires listening tests.

**Should beginners leave EMA at `0.999`?**
Yes, `0.999` is the default in Redpanda-vc and is a reasonable starting point before experimenting with other values.

**What happens if EMA Decay is `0`?**
EMA is disabled (`self.ema` is not built) and inference models are exported from the live generator weights.

**Is `0.9999` better than `0.999`?**
Not automatically. `0.9999` averages over a longer history and reacts more slowly to recent updates.

**Does EMA make training faster?**
No. EMA maintains an extra weight copy and performs an update step after each generator step.

**Does EMA prevent overfitting?**
No. Overfitting still depends on dataset size, variety, and total training steps.

**Is EMA applied to the discriminator?**
No. In Redpanda-vc (`train.py`), EMA is applied only to the generator (`net_g`).

**What is the difference between an epoch and a step?**
An epoch is one full pass over the dataset; a step is one weight update after processing one batch.

**Can Redpanda-vc save halfway through an epoch?**
Yes. Saves are triggered by `Save Every X Steps`, independent of epoch boundaries.

**Will I lose progress if I stop training?**
You keep progress up to the last saved `G`/`D` checkpoint; steps run after that save are lost.

**What is the difference between Save Only Latest and Save Every Weights?**
`Save Only Latest` overwrites `G_2333333.pth` / `D_2333333.pth` training checkpoints; `Save Every Weights` exports an inference `.pth` model at every save interval instead of only at the final step.

**Is Checkpointing the same as saving checkpoints?**
No. `Checkpointing` in Advanced Settings is activation checkpointing to save VRAM, whereas `Save Every X Steps` controls disk checkpoint saving.

**Can I resume training from an inference `.pth`?**
No. Resuming requires a matching `G_*.pth` and `D_*.pth` checkpoint pair in `logs/<model_name>/`.

---

## Official Sources & Further Reading

- **Redpanda-vc Repository:** [github.com/redpanda343/Redpanda-vc](https://github.com/redpanda343/Redpanda-vc)
- **`GeneratorEMA` implementation:** [`rvc/train/train.py` (lines 179-217)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L179-L217)
- **Step-based saving, resuming & export state:** [`rvc/train/train.py` (lines 420-436, 526-579, 763-853, 902-921, 1044-1097, 1146-1195)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/train.py#L1146-L1195)
- **Training WebUI controls:** [`tabs/train/rvc.py` (lines 663-880)](https://github.com/redpanda343/Redpanda-vc/blob/main/tabs/train/rvc.py#L663-L880)
- **Manual Checkpoint Exporter:** [`rvc/train/process/checkpoint_exporter.py` (lines 44-117)](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/checkpoint_exporter.py#L44-L117)
- **Checkpoint I/O & Process Control:** [`rvc/train/utils.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/utils.py) · [`rvc/train/process/training_control.py`](https://github.com/redpanda343/Redpanda-vc/blob/main/rvc/train/process/training_control.py)
- **PyTorch Official Docs:** [Weight Averaging (SWA and EMA)](https://docs.pytorch.org/docs/stable/optim.html#weight-averaging-swa-and-ema) · [`torch.optim.swa_utils.AveragedModel`](https://docs.pytorch.org/docs/stable/generated/torch.optim.swa_utils.AveragedModel.html)
- **Scientific Paper:** Morales-Brotons, Vogels, and Hendrikx, *Exponential Moving Average of Weights in Deep Learning: Dynamics and Benefits* ([OpenReview](https://openreview.net/forum?id=2M9CUnYnBA))
