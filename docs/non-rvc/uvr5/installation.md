---
label: "Download & Installation"
icon: ":cd:"
order: 98
permalink: /non-rvc/uvr5/installation/
description: "The official Windows and macOS packages include an isolated Python and PyTorch environment, so you do not need to install Python separately."
---
# Download and Install UVR5

The official Windows and macOS packages include an isolated Python and PyTorch environment, so you do **not** need to install Python separately.

## 1. Download the right build

1. **Standard release (v5.6.0)**: download the installer from [GitHub Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases).
2. **Beta Roformer patches (Recommended)**: to run **BS-Roformer**, **Mel-Roformer**, **SCNet**, **Bandit**, and **Demudder**, download a standalone or patch installer from [uvr_update_patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches):
   - **Most modern GPUs (NVIDIA / DirectML / macOS)**: use standalone beta **Patch #13** (`UVR_Patch_1_15_25_22_30_BETA`) and optionally apply **Patch #14** (`UVR_Patch_1_21_25_2_28_BETA`) on top for **Demudder**.
   - **NVIDIA RTX 5000 series**: use the dedicated standalone **CUDA 12.8** build (`UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8`), which already includes Demudder. *(Not compatible with AMD/Intel or older NVIDIA cards.)*
   - *Tip*: if GitHub download speeds are slow, use a multi-connection downloader like Free Download Manager.

## 2. Install on Windows

1. Run the installer and install UVR5 on your **`C:\` drive** (avoid secondary drives).
2. If you downloaded a small patch (like Patch #14), install it over your existing Roformer beta folder.
3. Launch UVR5 and check the **GPU Conversion** box in the main window.

> **Linux tip (Bottles)**: the native Linux Roformer branch (`v5.6.0_roformer_add+directml`) is older and lacks recent patches. Many Linux users run the Windows `.exe` installer inside **Bottles** using a **Gaming** profile (putting the installer inside `drive_c`) to get full GPU acceleration.

## 3. Downloading models

### Built-in Download Center

1. Click the **Settings** (wrench) icon in the bottom-left corner → **Download Center** (or select **Download More Models** at the bottom of any model dropdown).
2. Choose the category (**VR Arch**, **MDX-Net**, **Demucs**, **BS/Mel-Roformer**, etc.) and click the download icon next to each model.

### Installing custom Roformer / external models (`.ckpt` + `.yaml`)

Some newer community models (such as `dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`) are not in the Download Center and require both a checkpoint file (`.ckpt`) and its matching config (`.yaml`):

- **Method A - Install Model button (Patch #10+)**:
  1. Right-click inside the **Choose MDX-Net Model** dropdown list and click **Install Model**.
  2. Select the `.ckpt` model file and its matching `.yaml` config when prompted.
- **Method B - Manual installation**:
  1. Copy the `.ckpt` (or `.onnx`) file into `Ultimate Vocal Remover\models\MDX_Net_Models\`.
  2. Copy the `.yaml` file into `Ultimate Vocal Remover\models\MDX_Net_Models\model_data\mdx_c_configs\`.
  3. Select the model in UVR5, confirm **Yes** to recognize it, pick **Roformer** (almost always **non-v2**; `BS` or `Mel` matching the model name), and select the `.yaml`.

> **Important `.yaml` tips**:
> - When saving a `.yaml` from a browser or Hugging Face, make sure it saves with a **`.yaml`** extension and not **`.yaml.txt`** (use **Raw** → Save As → All files).
> - On the **RTX 5000 CUDA 12.8** patch, if a newer model gives a `torch._dynamo.polyfills.fx` error, open its `.yaml` and change `use_torch_checkpoint: True` to `False` (or remove that line).
