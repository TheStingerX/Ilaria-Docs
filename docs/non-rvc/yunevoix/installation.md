---
label: "Install & Update"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
description: "YuneVoix is a portable Windows application: nothing is installed into Windows, and all settings, voices, logs, and licences live next to YuneVoix.exe."
---
# Install and update YuneVoix

[Download on Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix is a portable Windows application: nothing is installed into Windows, and all settings, voices, logs, and licences live next to `YuneVoix.exe`.

## 1. Download the right package (v0.7.1)

1. Download the **v0.7.1** build matching your graphics card and edition from [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (for **PREMIUM**, activation requires a `license.yvl` obtained privately via [Ko-fi](https://ko-fi.com/yunevoix) or DMs):
   - **BASIC (Free)**:
     - [Download YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) (~8.42 GB) - for GeForce RTX / CUDA GPUs.
     - [Download YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) (~6.74 GB) - for Radeon RX 7000+ GPUs.
   - **PREMIUM** *(requires `license.yvl`)*:
     - [Download YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) (~9.88 GB)
     - [Download YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) (~8.20 GB)
   > **Important**: The NVIDIA and AMD builds are separate and not interchangeable.
2. Note the archive password: **`yunevoix`** (or the password provided with your download).

## 2. Extract the archive

The ZIP archive is encrypted with **AES-256**, which Windows Explorer cannot open (it will report the ZIP as invalid).

1. Install or open **7-Zip** (`7-zip.org`) or **WinRAR**.
2. Extract the archive using the password `yunevoix` into a writable local folder such as `D:\YuneVoix`.
   - **Do not** extract into `Program Files` or `OneDrive`.

## 3. First launch & SmartScreen

1. Open the extracted folder and run `YuneVoix.exe`.
2. Because the executable is not code-signed yet, Windows SmartScreen may show *"Windows protected your PC"*. Click **More info → Run anyway**.
   - If your antivirus flags any file, verify the archive came from the official YuneVoix release, inspect **Windows Security → Protection history**, and avoid disabling antivirus globally or adding broad folder exclusions unless you have verified the exact file.
3. **Wait for first-time engine preparation**:
   - **NVIDIA**: a few minutes on the very first start.
   - **AMD**: uses **DirectML** on the dedicated card by default as of v0.7.1. Only if you switch `Settings → General → "AMD graphics engine"` to experimental **MIGraphX** can first-time preparation take **10–30 minutes** (Windows may also fetch AMD MIGraphX via Windows Update).
   - After the first run, **LIVE** mode starts in about **10 seconds**.
4. You can switch the UI language at the top of the window (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Update or upgrade (BASIC → PREMIUM)

Licences, voices, and settings from **v0.6.0 / v0.7.0** keep working in **v0.7.1**. To update to a new version or upgrade from BASIC to PREMIUM without losing your voices and settings:

1. Extract the new release into a **new** folder (do not overwrite the old one yet).
2. Copy these files/folders from the old YuneVoix folder into the new one:
   - `models\yune\voices` (your saved voices)
   - `settings.json` and `yune.json` (your configuration)
   - `license.yvl` (for PREMIUM)
3. Launch the new `YuneVoix.exe` and verify everything works before deleting the old folder.

To uninstall YuneVoix completely, simply delete its folder.
