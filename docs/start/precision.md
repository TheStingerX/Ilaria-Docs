---
label: "⚡ Precision"
order: 89
permalink: /precision/
description: "Beginner-friendly guide to RVC precision modes (FP16, FP32, and BF16): what they mean, GPU compatibility, training vs inference, and how to avoid NaN or HalfTensor errors."
---
# Precision Training & Inference (`FP16`, `FP32`, `BF16`)

When training or converting voices in RVC, you will often see a setting called **Precision** (with options like `FP32`, `FP16`, and `BF16`).

If you are new to AI audio, those names sound technical, but the idea behind them is actually very simple. This guide explains what each mode means, which one matches your graphics card, and how to avoid the most common precision errors.

---

## 1. What is "Precision" in plain words?

An AI voice model is made of millions of decimal numbers (called **weights**). Every time RVC trains or converts your voice, your GPU has to multiply millions of those decimal numbers per second.

**Precision** simply controls **how detailed each number is** (how many bits of memory each number uses):

- **`FP32` (Full Precision, 32-bit):** Keeps full decimal detail and a huge number range. It is the safest and most compatible mode, **but** it uses more VRAM and runs slower.
- **`FP16` (Half Precision, 16-bit):** Uses half the memory of `FP32` and runs much faster on modern NVIDIA GPUs. Because the numbers have a smaller range, very large or tiny spikes during training can occasionally overflow (`NaN loss`).
- **`BF16` (Brain Float 16, 16-bit):** Uses the **same small memory as `FP16`**, **but** keeps the huge safe number range of `FP32` (by trading away a tiny bit of decimal fine-tuning). In short: `BF16` gives you `FP16` speed and low VRAM with almost `FP32` stability.

!!!tip
**Simple rule of thumb:**
Think of **`FP32`** as a heavy-duty calculator that never overflows, **`FP16`** as a fast sports car that needs smooth roads (clean audio), and **`BF16`** as a modern sports car with off-road suspension (fast, light on VRAM, and very hard to crash).
!!!

---

## 2. `FP32` vs `FP16` vs `BF16` compared

| Feature | `FP32` (Single / Full) | `FP16` (Half Precision) | `BF16` (Brain Float 16) |
| --- | --- | --- | --- |
| **Memory per number** | 32 bits (largest) | 16 bits (half) | 16 bits (half) |
| **Training speed** | Slowest | **Fast** (on Tensor Cores) | **Fast** (on RTX 30+ Tensor Cores) |
| **VRAM usage** | Highest | **Low (~40-50% less)** | **Low (~40-50% less)** |
| **`NaN loss` crash risk** | Lowest (almost zero) | Moderate (if dataset clips or spikes) | **Very low** (same safe range as `FP32`) |
| **Hardware support** | **Everything** (all GPUs, DirectML, CPU) | NVIDIA GTX 16 / RTX 20+ / T4 (poor/broken on GTX 10, DirectML, CPU) | **NVIDIA RTX 30 / 40 / 50**, A100, L4, H100 (not on RTX 20, GTX 16, T4, GTX 10) |
| **Final voice quality** | Reference standard | Virtually identical | Virtually identical |

---

## 3. Which Precision should YOU choose? (By GPU)

Choosing the right precision depends almost entirely on **what graphics card you have**:

### NVIDIA RTX 30 / 40 / 50 series (and A100 / L4 / H100)
- **Best choice:** **`BF16`** (if your RVC app supports it, such as **Ilaria RVC** or **Applio**). You get fast training, low VRAM usage, and far fewer `NaN` crashes than `FP16`.
- **Fallback:** **`FP16`** works great too if `BF16` is not listed in your app.

### NVIDIA RTX 20 series, GTX 16 series, or Cloud T4 (Colab / Kaggle)
- **Best choice:** **`FP16`**. These cards do not support hardware `BF16`, so `FP16` gives you the biggest speed and VRAM boost.
- **When to switch:** If you hit `NaN loss` during training, clean any clipped audio in your dataset or switch to **`FP32`**.

### NVIDIA GTX 10 series (1060, 1070, 1080 Ti) or older
- **Best choice:** **`FP32` only**. GTX 10-series (Pascal) does not have Tensor Cores for fast `FP16`, and forcing `FP16` often triggers `HalfTensor` errors or actually runs *slower* than `FP32`.

### AMD / Intel GPUs (DirectML) or CPU-only
- **Best choice:** **`FP32` only**. DirectML and CPU backends usually crash on `FP16` or `BF16` with `expected scalar type Half but found Float`.

---

## 4. Training Precision vs Export / Inference Precision

Beginners often confuse **training precision** with **model export precision**:

### During Training (Mixed Precision / AMP)
- Modern RVC trainers use **Automatic Mixed Precision (AMP)** when you pick `FP16` or `BF16`. This runs the heavy GPU math in 16-bit for speed while keeping key master values safe in 32-bit.
- Changing precision during training **does not** make the finished voice sound robotic or low-quality; a cleanly trained `BF16`, `FP16`, and `FP32` model sound practically identical.

### During Inference, Model Export & Voice Blender
- **Inference `FP16` (or saving an `.pth` in `fp16`):** Cuts the `.pth` file size roughly in half (around 45-55 MB instead of 95-110 MB) and runs faster on NVIDIA CUDA GPUs with zero audible quality loss.
- **Inference `FP32` (or saving an `.pth` in `fp32`):** Produces a larger `.pth` file, **but** works on every setup (including older GTX 10 cards, DirectML, and CPU).
- You can freely use an `FP16`-exported `.pth` in an app running `FP32` inference (the app automatically casts it when loading), or convert between `FP16` and `FP32` when using [Voice Blender](../ilaria-rvc/manage/voice-blender.md).

---

## 5. Common Precision Errors & Fixes

| Error or Symptom | Why it happened | How to fix it |
| --- | --- | --- |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | `FP16` was turned on for a GPU/backend that does not support it (GTX 10, DirectML, or CPU). | Turn **OFF** `FP16` in settings and switch to **`FP32`**. |
| `BF16 is not supported on this device` | You selected `BF16` on an older GPU (RTX 20, GTX 16, T4, GTX 10) or CPU. | Switch to **`FP16`** (on RTX 20 / GTX 16 / T4) or **`FP32`** (on GTX 10 / DirectML / CPU). |
| `NaN loss` or silent exported model during `FP16` training | Extreme loud/clipped audio or high gradients overflowed the smaller `FP16` number range. | Check your dataset for clipping/silence with [Dataset Checker](../ilaria-rvc/train/datasets.md), then switch to **`BF16`** (RTX 30+) or **`FP32`** in a fresh run. |
| `CUDA out of memory` while training in `FP32` | `FP32` uses roughly double the VRAM per batch compared to 16-bit modes. | Lower **Batch Size** (e.g. `4` -> `2` -> `1`), or switch to **`BF16`** / **`FP16`** if your GPU supports it. |
