# System Requirements for Ilaria RVC

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true) · [Compatible GPUs](../install/gpu-compatibility.md) · [Cloud options](../cloud/cloud.md)

Ilaria RVC runs locally on your PC using **PyTorch 2.10.0** and **NVIDIA CUDA**. Because voice conversion (inference) and model training have very different hardware demands, check both tables below before installing.

> **No suitable NVIDIA GPU?** You can run Ilaria RVC remotely on free or cloud GPUs using the [Kaggle](../cloud/kaggle.md), [Google Colab](../cloud/colab.md), or [Lightning AI Studio](../cloud/lightning-ai.md) guides.

## 1. Quick summary: Minimum vs. Recommended

| Component | Minimum (Inference / Basic use) | Recommended (Smooth Inference & Training) |
| --- | --- | --- |
| **Operating System** | Windows 10 64-bit | Windows 10 or Windows 11 (64-bit, updated) |
| **GPU** | Dedicated **NVIDIA** GPU with **4 GB VRAM** (Maxwell, Pascal, Volta, GTX 16, or RTX) | Dedicated **NVIDIA RTX** GPU with **8–12 GB+ VRAM** (e.g., RTX 3060 12 GB, RTX 4060 Ti / 4070 or newer) |
| **CUDA Runtime** | CUDA **12.8** (bundled) or CUDA **12.6** (auto-downloaded for Maxwell/Pascal/Volta) | CUDA **12.8** (bundled in the ZIP for GTX 16 / RTX 20–50) |
| **System RAM** | **8 GB** | **16 GB** or **32 GB** (especially for training & index building) |
| **Storage** | **25 GB** free space (ZIP + extracted app + models) | **50 GB+ free on an SSD** (datasets, checkpoints, pretraineds) |
| **CPU** | Modern 4-core x64 processor | 6–8+ core x64 processor (helps dataset preprocessing & index search) |
| **Browser** | Any modern browser (for `http://127.0.0.1:6969`) | Chrome, Edge, or Firefox (updated) |

## 2. Detailed GPU & VRAM requirements

Ilaria RVC is built for **NVIDIA GPUs**. Integrated Intel graphics, Intel Arc, and AMD GPUs are not supported by the Windows package.

### By GPU generation (CUDA runtime)

- **GeForce GTX 16 and RTX 20, 30, 40, 50**: uses the bundled **PyTorch 2.10.0 + CUDA 12.8** runtime directly after extraction. Make sure your NVIDIA driver is up to date (especially for RTX 50 series).
- **Maxwell, Pascal, and Volta** (e.g., GTX 750/900/1000 series, TITAN X/V, Tesla P4/P40/P100/V100): on first launch, `RUN_ILARIA_RVC.bat` automatically downloads and verifies **PyTorch 2.10.0 + CUDA 12.6** into `runtime-cu126` and reuses it on future runs.
- **Validation note**: compute, backpropagation, and ContentVec loading were directly verified on an **RTX 4070**. Other GPUs in the [Compatible GPUs list](../install/gpu-compatibility.md) are expected to work based on architecture and CUDA support.

### By VRAM capacity (what you can run)

| VRAM | Inference (Converting audio) | Training (Building a voice model) |
| --- | --- | --- |
| **4 GB** | Works for single clips and short audio; close GPU-heavy apps (games, browsers with hardware acceleration). | Very tight; only small batch sizes (`1–2`) with FP16/low sample rate, or may run out of memory. |
| **6 GB** | Smooth for single and batch inference. | Possible with lower batch size (`2–4`) and FP16 precision. |
| **8 GB** | Effortless for inference and batch conversion. | Good for `32k` / `40k` / `48k` training at moderate batch sizes (`4–8`). |
| **12 GB+** | Effortless, even alongside other apps. | **Ideal**: comfortable batch sizes (`8–16+`), faster epochs, and `48k` training without memory errors. |

## 3. Storage, RAM, and Network

### Disk space breakdown

- **Download archive**: ~**5.00 GB** (`ILARIA_RVC-2.4.0.zip`). Keep room for both the ZIP and the extracted folder during installation.
- **Extracted app**: ~**10–15 GB** (includes bundled PyTorch/CUDA runtime, **ContentVec**, and **RMVPE**).
- **Extra space if needed**:
  - `runtime-cu126` (Maxwell/Pascal/Volta only): additional several GB downloaded on first launch.
  - Optional embedders (**Other → Download embedders**) and pretrained G/D pairs.
  - **Training checkpoints** (`app/logs/`) and **datasets** (`app/datasets/`): each training run can easily take **2–10+ GB** depending on how often you save checkpoints.
- **SSD recommended**: extracting, loading models, and reading training datasets is noticeably faster on an NVMe/SATA SSD than on a mechanical HDD.

### System RAM

- **8 GB RAM** is enough for converting short audio clips, provided you close heavy background apps.
- **16 GB+ RAM** is strongly recommended for **training**, **audio preprocessing**, **FAISS index building**, and using **Audio Analyzer** on multiple files.

### Internet connection

- **Required** for: downloading the release ZIP, downloading CUDA 12.6 on Maxwell/Pascal/Volta first launch, fetching optional embedders/pretraineds, importing models from Hugging Face/Google Drive/MEGA, or checking for updates (**2.4.0 → 2.4.1**).
- **Not required** for: running inference or training once all required models and runtimes are on your PC.

## 4. Check your own PC automatically

Ilaria RVC includes a built-in **PC training advisor** under **Other → PC training advisor**:

1. Choose **Sample rate to plan for**, **Precision to evaluate**, and **GPU to evaluate**.
2. Click **Scan PC and suggest settings**.
3. Review **PC Advisor Log** for tailored starting settings (precision, batch size) and verify actual VRAM usage during a short test run.
