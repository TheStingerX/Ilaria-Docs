# Ultimate Vocal Remover (UVR5)

[GitHub](https://github.com/Anjok07/ultimatevocalremovergui) · [Official Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases) · [Beta Roformer Patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches)

!!!warning
**Upcoming release: UVR6 is arriving soon!**
**Ultimate Vocal Remover 6 (UVR6)** comes to **Windows on December 11, 2026**, with **Mac** following shortly after and **Linux** coming next. Because **UVR5** is about to be succeeded by this new major generation, keep an eye on the official release page around launch day if you plan to upgrade.
!!!

**UVR5** (Ultimate Vocal Remover v5 GUI) is a free, open-source desktop application for **AI audio source separation**. It runs locally on your PC and lets you split songs or dialogue into clean vocals, instrumentals, backing vocals, individual stems (drums, bass, other), and remove reverb, echo, and background noise - making it one of the most popular tools for preparing RVC datasets and covers.

## Supported AI architectures

- **VR Architecture** (`v4`, `v5`, `v5.1`): fast, reliable models great for vocals, karaoke (lead vs. backing), de-echo, de-reverb, and denoising.
- **MDX-Net** (`v2`, `MDX23C`, plus **BS-Roformer**, **Mel-Roformer**, **SCNet**, and **Bandit** in beta Roformer patches): state-of-the-art architectures grouped under the MDX-Net menu in UVR5.
- **Demucs** (`v1`–`v4`, such as `htdemucs` and `htdemucs_ft`): Meta's multi-stem models (4 stems: vocals, drums, bass, other; or 6 stems) ideal for isolating instruments or building ensembles.
- **Built-in Audio Tools**: **Manual Ensemble** (combine outputs from multiple models via Min/Max Spec or Average), **Ensemble Mode**, **Vocal Splitter**, **Demudder** (Windows patch #14+), and **Apollo** audio upscaler.

## System requirements & GPU support

| Platform | Requirements & Acceleration Notes |
| --- | --- |
| **Windows 10/11 (64-bit)** | **Must be installed on the `C:\` drive** (secondary drives can cause instability). Intel Pentium and Celeron CPUs are not guaranteed to work. |
| **NVIDIA GPUs (CUDA)** | Maxwell (GTX 900 series, compute 5.0) or newer. GTX 600 / GT 700 and older are unsupported for CUDA. **6 GB+ VRAM** (e.g. RTX 3050 6–8 GB or better) is recommended for Roformers; 2–4 GB works with smaller `chunk_size` / `dim_t` values. **RTX 5000 series** requires the dedicated CUDA 12.8 patch. |
| **AMD & Intel GPUs (DirectML)** | Uses **DirectML** (labeled *OpenCL* in older v5.6.0 builds). Tested on AMD RX 4 GB+ (RX 6600 XT / 7600+ recommended for Roformers) and Intel Arc / Xe iGPUs. **16 GB VRAM** is recommended if using default Roformer `chunk_size` (otherwise lower `chunk_size`). *Note: Apollo, Bandit, and SCNet fall back to CPU on DirectML.* |
| **macOS** | macOS Big Sur or newer (Catalina or lower not guaranteed). Apple Silicon (**MPS**) acceleration works for Demucs, MDX-Net, and Roformers. Place UVR directly inside root `/Applications`. |
| **Linux** | Native `v5.6.0_roformer_add+directml` branch, or run the Windows installer inside **Bottles** (WINE gaming profile in `drive_c`) for newer Roformer patches with GPU acceleration. |
