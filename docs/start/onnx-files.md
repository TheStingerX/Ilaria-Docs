---
label: "⚙️ ONNX files (.onnx)"
order: 86
permalink: /onnx/
description: "Complete guide to RVC .onnx model files: why they are usually used for real-time voice changing on AMD and Intel GPUs via DirectML, and how they compare to .pth."
---
# RVC ONNX Files (`.onnx`)

Alongside [`.pth`](pth-files.md) and [`.index`](indexes.md) files, you will occasionally run into **`.onnx` files** when using RVC voice changers.

In the RVC ecosystem, **`.onnx` models are usually used for real-time voice changing on AMD and Intel GPUs** (through **DirectML** / ONNX Runtime on Windows), as well as certain cross-platform live clients.

---

## 1. What is an `.onnx` file?

**ONNX** (*Open Neural Network Exchange*) is an open, framework-independent format for running trained neural networks. Instead of relying on PyTorch and NVIDIA's CUDA runtime, an `.onnx` file runs through **ONNX Runtime**, which works across different graphics cards and operating systems.

For RVC users, this matters most in **live / real-time voice changers** (such as **Deiteris w-okada Fork**, **w-okada VCClient**, or **RVC Mainline DirectML**):
- **AMD Radeon** and **Intel Arc / integrated GPUs** cannot run NVIDIA CUDA.
- Running an exported `.onnx` model through **ONNX Runtime + DirectML** lets AMD and Intel GPUs accelerate real-time voice conversion on Windows smoothly.

---

## 2. `.onnx` vs `.pth`: key differences

| Feature | `.pth` (PyTorch) | `.onnx` (ONNX Runtime) |
| --- | --- | --- |
| **Primary use** | Standard RVC training, offline conversion, and NVIDIA CUDA live apps | **Real-time voice changing**, especially on **AMD and Intel GPUs (DirectML)** |
| **Training / Resume** | Raw `G`/`D` checkpoints can resume training | **Inference only** (cannot train or resume) |
| **Voice Blender / Merge Models** | Supported (compatible `.pth` files) | **Not supported** (cannot merge `.onnx` files) |
| **Safetensors conversion** | Supported in Ilaria RVC 2.4.5+ | **Not supported** |
| **RVC metadata inside file** | Full voice config (`sr`, `f0`, `v1`/`v2`, vocoder, embedder) | Minimal tensor graph; the live client must match sample rate and RVC version |

---

## 3. How to get an `.onnx` model from a `.pth`

Most RVC voices on the internet are shared as `.pth` files rather than `.onnx`. If you need an `.onnx` version:

1. **Automatic conversion in live clients:** Some real-time apps (such as **w-okada** and **Deiteris**) can accept a `.pth` directly or convert it to `.onnx` for DirectML.
2. **Manual ONNX export:** Apps like **Ilaria RVC**, **Applio**, and **RVC Mainline** include an **Export ONNX** option that converts an exported inference `.pth` into an `.onnx` file for external real-time clients.
3. **Keep your original `.pth`:** Never delete the original `.pth` and `added_*.index` after exporting to `.onnx`, since `.onnx` cannot be merged, converted to `.safetensors`, or used in standard PyTorch training/tools.

---

## 4. Tips for using `.onnx` in real-time

- **Use `FP32` on DirectML if you hit glitches:** DirectML on AMD/Intel GPUs often fails or glitches with `FP16`; switch precision to `FP32` if audio breaks up.
- **Test Windows HAGS only if needed:** **Hardware-Accelerated GPU Scheduling (HAGS)** is not harmful by default, but on some setups with heavy background GPU load you can test toggling it off in Windows Graphics Settings (restart, compare before/after, and restore if unchanged).
- **Match `48000 Hz` everywhere:** Set your microphone, headphones, and `VB-CABLE` endpoints to `48000 Hz` in Windows Sound Control Panel (`mmsys.cpl`) to prevent `PortAudioError` or pitch drift.

[Interactive RVC Compatibility Matrix](../reference/compatibility-matrix.md)
