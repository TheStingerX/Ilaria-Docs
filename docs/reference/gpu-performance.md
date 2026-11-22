---
label: "GPU Performance & Troubleshooting"
icon: ":zap:"
order: 91
permalink: /gpu-performance/
description: "Cross-cutting guide to GPU utilization, VRAM, thermal/power throttling, CUDA vs CPU bottlenecks, and gaming conflicts in RVC apps."
---
# GPU Performance & Troubleshooting

Voice conversion and RVC training rely heavily on GPU compute, memory bandwidth, and steady scheduling. Use this guide to diagnose why an app runs slowly, runs out of memory, or stutters during live conversion.

## 1. Key GPU metrics that actually matter

- **GPU Utilization & Compute:** During **training**, high GPU utilization (often 80–99%) is normal and desirable. During **live voice conversion**, GPU load comes in short bursts per audio chunk; if the GPU is already at 95–100% from a 3D game, live audio chunks wait in line and crackle.
- **VRAM (Video Memory):** Training **Batch Size**, model sample rate, and **GPU dataset caching** determine VRAM usage. If VRAM fills up, Windows spills into slower system RAM or throws `CUDA out of memory`.
- **Temperature & Thermal Throttling:** When a GPU exceeds its thermal threshold, it automatically lowers clock speeds to protect the hardware, causing sudden **epoch slowdowns** or **live GPU Delay spikes**.
- **Power Limits & Clock Fluctuations:** Laptops on battery or tight power budgets cap GPU wattage and clocks. Plug in AC power and check OEM performance profiles before troubleshooting.

## 2. Settings with the biggest impact

| Setting | Training impact | Live conversion impact |
| --- | --- | --- |
| **Batch Size** | Larger batches use more VRAM and can speed up epochs; lower if OOM occurs | Not used in live inference |
| **Block / Chunk Size** | Not used in training | Larger chunks give the GPU more time per block (fewer crackles, higher delay) |
| **Precision (`FP32` / `FP16` / `BF16`)** | `BF16` (RTX 30/40/50) and `FP16` (supported GPUs) cut VRAM and speed up steps; `FP32` is safest fallback | `FP16` is faster on supported NVIDIA GPUs; DirectML/older cards often need `FP32` |
| **Pitch Extractor (`rmvpe` / `fcpe`)** | `rmvpe` is standard for accurate F0 extraction | `fcpe` or `rmvpe` are fast; avoid `crepe` full in live mode |

## 3. Resolving common GPU bottlenecks

1. **Gaming + Live Voice Changer:** Cap in-game FPS (so GPU load stays below ~80–85%), lower heavy ray-tracing/resolution settings, or raise **Block Size** one step.
2. **Windows HAGS:** Hardware-Accelerated GPU Scheduling is not harmful by default, but if you see unexplained VRAM contention or live stuttering, test toggling it off in Windows Graphics Settings, restart, and compare before/after.
3. **CPU bottlenecks:** Slow dataset preprocessing, too few **Workers**, or heavy CPU-side audio resampling can stall the GPU. Keep sample rates aligned at `48000 Hz` in Windows Sound settings.
4. **Drivers & cooling:** Use a clean NVIDIA Studio or Game Ready driver and keep laptop/desktop vents dust-free.

## 4. Optional advanced optimization (NVIDIA)

On supported NVIDIA GPUs, locking graphics clocks with `nvidia-smi` is an **optional** advanced test that may reduce clock-ramping jitter in live voice changers like Vonovox. See [Vonovox Advanced Performance Optimization](../other-rvcs/vonovox/advanced-performance-optimization.md) for the full, reversible procedure and BAT helpers.
