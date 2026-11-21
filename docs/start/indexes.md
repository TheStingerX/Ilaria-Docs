---
label: "🗂️ Index files (.index)"
order: 87
permalink: /indexes/
description: "Complete guide to RVC .index files (Feature Retrieval): added vs trained index files, how to tune Index Rate, and how to rebuild a missing index."
---
# RVC Index Files & Feature Retrieval (`.index`)

When you download or train an RVC voice model, you will usually see two files: a `.pth` file and an `.index` file. While the `.pth` file is mandatory, the `.index` file is often misunderstood.

This guide explains what an `.index` file actually does, the critical difference between `added_*.index` and `trained_*.index`, how to tune **Index Rate**, when to turn it down or off, and what to do if an `.index` file is missing.

---

## 1. What is an `.index` file (Feature Retrieval)?

An RVC voice conversion happens in two main parts:
1. **The `.pth` file (the Generator):** A neural network that learned how to turn speech features into the target speaker's voice.
2. **The `.index` file (the Feature Database):** A **FAISS vector index** storing the actual acoustic feature vectors extracted by the [embedder](embedders.md) (such as `contentvec`) from every clip of the speaker's training dataset.

During conversion, **Feature Retrieval** compares each tiny slice of your input audio against the `.index` database, finds the closest matching frames from the original speaker's recordings, and blends them with your input features before passing them to the `.pth` generator.

**In simple words:**
- The `.pth` is the **engine** (required).
- The `.index` is a **reference library of the speaker's real vocal habits** (optional): subtle breathiness, vowel color, rasp, nasal tone, and inflection nuances that a `.pth` alone might smooth over.

!!!tip
**Compatibility:**
An `.pth` model works completely fine **without** an `.index` file (`Index Rate = 0`). If a model you downloaded did not come with an `.index`, you can still use it normally.
!!!

---

## 2. `added_*.index` vs `trained_*.index`

When RVC builds a feature index inside `logs/<experiment_name>/`, it typically saves two `.index` files:

| File name | What it contains | Should you use it? |
| --- | --- | --- |
| **`added_*.index`** | The full FAISS index **with all dataset feature vectors added inside** (for example `added_IVF256_Flat_nprobe_1_MyVoice_v2.index`). | **YES. Always use this one** for inference and sharing. |
| **`trained_*.index`** | Only the intermediate cluster structure trained before the dataset vectors were populated. | **NO.** Do not select or distribute this file; it gives poor or empty retrieval. |

If you share or export a model (for example using **Export model ZIP** in Ilaria RVC), always pair the `.pth` with **`added_*.index`**, never `trained_*.index`.

---

## 3. How to tune `Index Rate` (`0` to `1.0`)

The **Index Rate** (or **Index Ratio**) slider controls how strongly retrieved FAISS feature vectors (`retrieved_features`) are blended with your input's extracted features (`original_features`) *before* the `.pth` generator runs (`features = retrieved_features * index_rate + original_features * (1 - index_rate)`). The `.pth` generator is **always** used regardless of Index Rate:

| Index Rate | Effect on features | Suggested starting point for testing |
| --- | --- | --- |
| **`0.0` (Off)** | `100%` original input features (`0%` FAISS retrieval); `.pth` still runs normally. | Useful diagnostic baseline without FAISS feature retrieval, lowest CPU load, and merged models. |
| **`0.25 - 0.50`** | Light-to-moderate blend toward the index's acoustic feature vectors. | Starting range to test for speech or cross-language conversion. |
| **`0.60 - 0.75`** | Stronger pull toward the index's feature vectors. | Starting range to test for clean, same-language singing when the index matches. |
| **`0.85 - 1.00`** | Maximum retrieval weight; heavily replaces original features with index matches. | Test cautiously only on very clean matched datasets; higher risk of slurred consonants. |

---

## 4. When you should lower or disable `Index Rate`

Raising **Index Rate** toward `1.0` does **not** automatically make a voice better. Lower it to `0.2 - 0.4` (or `0`) whenever you notice:

1. **Noisy or reverberant training datasets:** An `.index` stores extracted **feature vectors**, not raw audio recordings (it does not inject raw audio waves directly), but a noisy or reverberant dataset distorts those feature vectors, which can degrade conversion quality at high Index Rates.
2. **Garbled words or a strange accent:** If you speak one language into a model trained on a different language, a high Index Rate tries to force foreign vowel/consonant habits onto your speech.
3. **Blended / Merged voices:** Merging two `.pth` models in [Voice Blender](../ilaria-rvc/manage/voice-blender.md) does **not** create a new `.index`. Always test blended models at `Index Rate = 0` first.
4. **Live Voice Changer stutters:** Searching a large FAISS index on every live audio chunk adds CPU work. Turning `Index Rate` down or to `0` reduces latency and CPU spikes.

---

## 5. Compatibility rules (Why you cannot mix `.index` files)

An `.index` file is strictly tied to the **exact model** and **embedder architecture** it was built from:

- **Same dimension / RVC version:** A `v1` model uses **256-dimensional** features (`3_feature256`), while a `v2` model uses **768-dimensional** features (`3_feature768`). Mixing `v1` and `v2` causes a dimension mismatch error.
- **Same embedder:** An index built with `contentvec` will not match a model expecting a different encoder representation.
- **Same speaker:** Putting Voice A's `.index` on Voice B's `.pth` does **not** create a clean Voice Blend; it feeds the wrong acoustic features into Voice B's decoder and usually sounds muffled or broken.

---

## 6. How to regenerate a missing `.index` file

### Case A: You only have a downloaded `.pth` file
You **cannot** recreate a real `.index` from a `.pth` file alone. The `.index` is built from the extracted feature vectors (`.npy` files) of the original training audio, which are not stored inside an exported `.pth`. Simply set **Index Rate = 0** and use the `.pth` by itself.

### Case B: You trained the model and still have `logs/<experiment_name>/`
If your experiment folder still contains the extracted feature folder (`3_feature256` or `3_feature768`), you can rebuild the index in seconds without re-training:
1. Open the **Train** tab in Ilaria RVC (or Applio / RVC Mainline).
2. Enter the **exact same Experiment Name**, **RVC Version (`v1`/`v2`)**, **Sample Rate**, and **Embedder** used during training.
3. Click **Train Feature Index** only (do **not** run Dataset Preprocessing or Train Model again).
4. Once finished, check `logs/<experiment_name>/` for the new **`added_*.index`** file.

### Case C: Building the index crashes with RAM / Pagefile errors
Large datasets (thousands of audio slices) require significant system RAM during FAISS clustering. If indexing crashes with `WinError 1455` or freezes Windows, close other apps, increase your Windows **Virtual Memory (Pagefile)** (see [Troubleshooting](../reference/troubleshooting.md)), or trim redundant clips from the dataset.
