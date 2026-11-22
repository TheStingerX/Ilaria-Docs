# RVC PTH Files (`.pth`)

When you download, train, or share an RVC voice, the **`.pth` file** is the single most important file. While an [`.index` file](indexes.md) is optional, the `.pth` file is **mandatory**: without it, RVC cannot convert a voice at all.

This guide explains what is inside a `.pth` file, the critical difference between an exported voice `.pth` and raw training checkpoints (`G_*.pth` / `D_*.pth`), why file sizes vary, and how to fix common `.pth` errors.

---

## 1. What is a `.pth` file?

A **`.pth` file** is a **PyTorch checkpoint** storing the trained neural network (the **Generator**) that knows how to synthesize your target speaker's voice timbre.

Inside a properly exported RVC inference `.pth`, two things are saved:
1. **Model weights (`weight`):** Millions of numbers learned during training that shape the target voice's tone, resonance, and vocal character.
2. **Voice configuration (`config` and metadata):** Settings recorded when the voice was exported, including:
   - **Sample rate:** `32 kHz`, `40 kHz`, or `48 kHz` (`44.1 kHz` on select RefineGAN variants).
   - **RVC architecture:** `v1` (256-d) or `v2` (768-d).
   - **Pitch guidance (`f0`):** Enabled (`1`) or disabled (`0`).
   - **Vocoder:** `HiFi-GAN`, `MRF HiFi-GAN`, or `RefineGAN`.
   - **Embedder:** For example `contentvec`, `spin-v2`, or `klm-vocal-contentvec`.

---

## 2. Exported voice `.pth` vs Raw checkpoints (`G_*.pth` / `D_*.pth`)

One of the most common beginner mistakes is grabbing the wrong `.pth` file from `logs/`:

| File type | Typical location | Typical size | What it is for |
| --- | --- | --- | --- |
| **Exported voice `.pth`** (e.g. `MyVoice.pth`) | `models/` (Ilaria RVC 2.4.0+) or `weights/` | **45 - 110 MB** (`fp16` vs `fp32`) | **Inference & sharing.** Contains only the lightweight Generator weights + voice config. |
| **Raw Generator (`G_*.pth`) & Discriminator (`D_*.pth`)** | `logs/<experiment_name>/` | **200+ MB each** | **Training resume & pretrains only.** Contains full optimizer/training state. **Never** copy these into `models/` for inference! |

If you put a raw `G_*.pth` file into `models/` and try to convert audio with it, RVC will crash with `Missing key(s) in state_dict` or report missing voice configuration. Always use your app's **Export** tool (or test checkpoints saved directly to `models/`/`weights/` during training).

---

## 3. File size (`FP16` vs `FP32`) & formats (`.pth` vs `.safetensors` / `.onnx`)

- **Why is one `.pth` ~50 MB and another ~105 MB?**
  The difference is usually the model's export precision (see [Precision](precision.md)). `FP16` stores weights using 16 bits instead of 32, reducing file size by approximately 50% compared to `FP32` for the same architecture. Both formats generally deliver virtually identical audio quality, and on supported NVIDIA GPUs `FP16` inference can also improve performance. Importantly, export precision is independent of inference precision: most RVC applications can load an `FP16` model and automatically convert its weights to `FP32` when running on older NVIDIA GPUs, DirectML, or CPU, so an `FP32`-exported model is not required for compatibility with those devices as long as the inference app supports automatic precision conversion.
- **`.pth` vs `.safetensors`:**
  `.pth` uses Python's `pickle` format (which is why PyTorch `2.6+` enforces `weights_only=True` security checks), whereas `.safetensors` stores weights without executable code. In **Ilaria RVC 2.4.5+**, you can convert safely between `.pth` and `.safetensors` in [Safetensors ↔ PTH Converter](../ilaria-rvc/manage/safetensors-converter.md).
- **`.pth` vs `.onnx`:**
  Standard RVC training and inference use `.pth`. Some real-time voice changers (such as w-okada or Deiteris DirectML) can also convert/run `.onnx` exports for AMD/Intel GPUs.

---

## 4. Compatibility rules (Why a `.pth` might fail or sound wrong)

1. **Matching Embedder:** If a `.pth` was trained with `contentvec` (the standard default), convert with `contentvec` (or leave Embedder on `Auto`). Mixing embedders causes garbled pronunciation or source-voice bleed.
2. **Supported Vocoder:** Make sure your RVC app supports the vocoder baked into the `.pth`. Models trained with `MRF HiFi-GAN` or `RefineGAN` require an up-to-date app (such as **Ilaria RVC 2.3.0+** or **Applio**).
3. **PyTorch 2.6+ `UnpicklingError`:** Older `.pth` files can trigger `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) on older builds. Updating to **Ilaria RVC 2.4.0+** or latest **Applio** handles this safely.

---

## 5. Where to put `.pth` files & how to inspect them

- **Where to place them:** In **Ilaria RVC 2.4.0+**, extract any `.zip` first and place your `.pth` file (plus its matching `added_*.index`) into the root **`models/`** folder (other apps may use `assets/weights/` or `weights/`). Click **Refresh** in **Inference**.
- **Inspecting unknown `.pth` files:** In Ilaria RVC, open **Other → Model information**, select the `.pth`, and click **Read model information** to view its sample rate, RVC version, vocoder, embedder, and precision.
- **Sharing a voice cleanly:** Use **Other → Export model ZIP** to bundle your `.pth` and matching `added_*.index` with zero training logs or private recordings.

---

## 6. Common `.pth` errors & quick fixes

| Error or Symptom | What happened | How to fix it |
| --- | --- | --- |
| **Model does not appear in dropdown** | Forgot to click **Refresh**, left `.pth` inside a `.zip`, or put it in the wrong folder. | Extract `.zip`, place `.pth` directly in `models/` (or `weights/`), and click **Refresh**. |
| `EOFError` / `invalid load key` / `File is not a zip archive` | Download broke or saved an HTML webpage instead of the binary model. | Check file size: a valid `.pth` is **40 - 110+ MB**, not a few KB. Delete and re-download cleanly. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Loaded a raw `G_*.pth` training checkpoint instead of an exported inference `.pth`. | Export the finished model properly instead of copying `G_*.pth` from `logs/`. |
| `UnpicklingError` / `Weights only load failed` | PyTorch 2.6+ blocked legacy pickle objects in an older RVC app. | Update to **Ilaria RVC 2.4.0+** or the latest **Applio**. |

[Interactive RVC Compatibility Matrix](../reference/compatibility-matrix.md)
