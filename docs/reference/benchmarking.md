---
label: "Benchmarking & Performance"
icon: ":stopwatch:"
order: 90
permalink: /benchmarking/
description: "How to measure RVC training speed, inference real-time factor, GPU Delay, end-to-end latency, VRAM, and thermal throttling with repeatable A/B tests."
---
# Benchmarking & Performance Comparison

Never rely on guesswork or single-number claims when tuning RVC training or live conversion. Measure your own hardware with repeatable **A/B tests** where you change **one variable at a time**.

## 1. Metrics to measure

### Training metrics

- **Steps per second & Epoch duration:** How fast each training update and full dataset pass completes (visible in the training log / TensorBoard).
- **VRAM usage:** Peak GPU memory used (`nvidia-smi` or Task Manager) at your chosen **Batch Size**, **Precision** (`FP32`/`FP16`/`BF16`), and **GPU Caching** setting.
- **GPU power draw & temperature:** Watch for **thermal** or **power throttling** (`nvidia-smi -i 0 -q -d PERFORMANCE`) during multi-minute runs.

### Inference & real-time metrics

- **Inference time & Real-Time Factor (RTF):** For file conversion, how long it takes to convert a clip divided by the clip's duration (RTF `< 1.0` means faster than real time).
- **GPU Delay vs. End-to-End Latency:** **GPU Delay** measures only GPU inference time per chunk. **Total end-to-end latency** includes mic capture, **Block Size**, crossfade/context, virtual cable buffering, and Discord/OBS/game audio buffers.

## 2. Repeatable A/B test protocol

1. **Establish a baseline (Test A):** Reset optional tweaks (such as clock locks) to defaults, load one fixed voice model, one fixed test clip or spoken script, and identical audio/training settings.
2. **Stabilize and measure:** Run the test long enough to catch thermal warm-up (e.g. **10–15 minutes** for live voice changers, or several full epochs for training).
3. **Change one setting (Test B):** Adjust only one parameter (e.g. `Batch Size`, `BF16` vs `FP32`, `Block Size`, or `rmvpe` vs `fcpe`) while keeping everything else (including background GPU load) identical.
4. **Compare objectively:**

| Metric | Baseline (Test A) | Variant (Test B) |
| --- | --- | --- |
| Epoch duration / Steps per sec (Training) | `____` | `____` |
| Average **GPU Delay** & peak spike (Live) | `____ ms / ____ ms` | `____ ms / ____ ms` |
| Audio dropouts / crackles | `Yes / No (count)` | `Yes / No (count)` |
| Peak VRAM & GPU temperature | `____ GB / ____ °C` | `____ GB / ____ °C` |
| Throttling observed | `Yes / No` | `Yes / No` |

5. **Keep only proven gains:** If Test B shows no measurable improvement, or introduces heat, instability, or worse audio, revert to Test A.

[VRAM & Training Estimator](vram-estimator.md)
