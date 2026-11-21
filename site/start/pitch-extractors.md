# RVC Pitch Extractors (F0 Methods)

A **pitch extractor** (also called an **F0 extraction method**) is the algorithm or neural network that tracks the fundamental frequency (pitch, melody, and intonation) of the input voice over time.

While an [embedder](embedders.md) reads *what words and phonemes* are being spoken or sung, the **pitch extractor** measures *how high or low* the voice goes at every fraction of a second.

!!!tip
**Compatibility:**
Unlike embedders, **pitch extractors do not lock you into one choice**. Even if a model was trained using `rmvpe` for dataset preprocessing, you can use any available pitch extractor during inference and live voice changing without breaking compatibility.
!!!

## Availability in Ilaria RVC

- **Single & Batch Inference (CUDA):** `rmvpe` (default), `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest`, `crepe`. *(On DirectML builds: `pm`, `harvest`, `rmvpe`, `fcpe`.)*
- **Training feature extraction only:** `rmvpe_gpu` (with `gpus_rmvpe` multi-process GPU selection) and `dio` are available during **Training** feature extraction, not as separate buttons in Inference.
- **Other RVC forks:** Tools like Applio or Deiteris may also expose `hybrid[...]` or ONNX pitch variants.

> **No universal "best" or "fastest":** Results vary by voice, hardware, and backend. Start with `rmvpe` and compare `fcpe`, `swift`, `beatrice`, or `crepe` on the same audio if you hear octave jumps or timing issues.

---

## All known Pitch Extractors compared

| Pitch Extractor | Type | Speed | Quality & Best Use Case | Notes |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Neural network | Fast | **Best all-around default** for speech, singing, and dataset F0 extraction. | Handles consonants, breathiness, and slight background reverb far better than older methods. |
| **`rmvpe_gpu`** | Neural network (CUDA GPU) | **Very fast** | Same high accuracy as `rmvpe`, forced onto your NVIDIA GPU instead of CPU. | Ideal in Ilaria RVC / RVC WebUI for long tracks, batch conversions, and fast dataset preprocessing. Requires enough free VRAM. |
| **`fcpe`** | Neural network | **Ultra fast** | **Best for real-time / live voice changing** and low-latency inference. | Slightly lighter than `rmvpe`; great when `rmvpe` causes audio stutter in live mics. |
| **`crepe` / `crepe-full`** | Neural network | Slow | High accuracy on clean solo singing and vibrato. | Much heavier on GPU/CPU than `rmvpe`. Usually too slow for live voice changers. |
| **`crepe-tiny`** | Neural network (small) | Fast | Lighter version of `crepe` for older setups. | Lower accuracy than `rmvpe` and `fcpe`; mostly superseded by `fcpe`. |
| **`harvest`** | Classic DSP (WORLD) | Very slow (CPU) | Legacy method for clean speech. | Prone to octave jumps and metallic artifacts on singing or noisy audio. Often needs median filtering (`filter_radius`). |
| **Parselmouth (`pm`)** | Classic DSP | Ultra fast (CPU) | Quick previews on very weak PCs without a GPU. | Easily drops pitch tracking on singing, whispers, or rough vocals. |
| **`dio`** | Classic DSP (WORLD) | Very fast (CPU) | Legacy fast CPU fallback. | Less accurate than `rmvpe` and `fcpe`; not recommended for final renders. |
| **`hybrid[...]`** | Combined methods | Slow | Mixes two extractors (for example `hybrid[rmvpe+fcpe]` or `hybrid[crepe+rmvpe]`). | Available in Applio and some RVC forks to smooth octave errors on tricky vocals, at the cost of running two methods. |
| **`swift` / `onnx` variants** | Lightweight / ONNX | Very fast | Optimized pitch trackers found in newer forks (such as Applio or Deiteris). | Useful on CPU or DirectML setups where standard PyTorch extractors are slower. |

## `rmvpe` vs `rmvpe_gpu`: what is the difference?

In **Ilaria RVC** and **RVC Mainline**, `rmvpe_gpu` is a **Training feature extraction** option (allowing multi-GPU worker assignment via `gpus_rmvpe`), whereas **Single & Batch Inference** expose `rmvpe` directly (running on your configured inference device). If `rmvpe_gpu` triggers `CUDA out of memory` during dataset feature extraction on a low-VRAM card, switch to `rmvpe` or `fcpe`.

## Choosing the right method for your task

1. **Preparing / Training a new model:** Use **`rmvpe_gpu`** (if you have an NVIDIA GPU with 6+ GB VRAM) or **`rmvpe`**. Clean dataset F0 tracking prevents pitch glitches in the trained voice.
2. **Converting songs or voiceovers offline:** Start with **`rmvpe`** or **`rmvpe_gpu`**. Only test `crepe-full` or `hybrid` if a specific high singing note has an octave jump.
3. **Live microphone / Discord:** Start with **`fcpe`** for lowest delay, or **`rmvpe`** if your GPU handles your chunk size smoothly without crackling.
