---
label: "Install & Update"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
---
# Install and update YuneVoix

[Download on Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix is a portable Windows application: nothing is installed into Windows, and all settings, voices, logs, and licences live next to `YuneVoix.exe`.

## 1. Download the right package

1. Open the [YUNE Hugging Face repository](https://huggingface.co/JohnBlvck/YUNE/tree/main) (for **PREMIUM**, access is delivered privately via Ko-fi or DMs).
2. Download the build that matches your graphics card:
   - **NVIDIA** package for GeForce RTX / CUDA GPUs.
   - **AMD** package for Radeon RX 7000+ GPUs.
   > **Important**: The NVIDIA and AMD builds are separate and not interchangeable.
3. Note the archive password: **`yunevoix`** (or the password provided with your download).

## 2. Extract the archive

The ZIP archive is encrypted with **AES-256**, which Windows Explorer cannot open (it will report the ZIP as invalid).

1. Install or open **7-Zip** (`7-zip.org`) or **WinRAR**.
2. Extract the archive using the password `yunevoix` into a writable local folder such as `D:\YuneVoix`.
   - **Do not** extract into `Program Files` or `OneDrive`.

## 3. First launch & SmartScreen

1. Open the extracted folder and run `YuneVoix.exe`.
2. Because the executable is not code-signed yet, Windows SmartScreen may show *"Windows protected your PC"*. Click **More info → Run anyway**.
   - If your antivirus quarantines any file, add the `YuneVoix` folder as an exclusion.
3. **Wait for first-time engine preparation**:
   - **NVIDIA**: a few minutes on the very first start.
   - **AMD (MIGraphX)**: up to **10–30 minutes** on the first start (Windows may also fetch AMD MIGraphX via Windows Update).
   - After the first run, **LIVE** mode starts in about **10 seconds**.
4. You can switch the UI language at the top of the window (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Update or upgrade (BASIC → PREMIUM)

To update to a new version or upgrade from BASIC to PREMIUM without losing your voices and settings:

1. Extract the new release into a **new** folder (do not overwrite the old one yet).
2. Copy these files/folders from the old YuneVoix folder into the new one:
   - `models\yune\voices` (your saved voices)
   - `settings.json` and `yune.json` (your configuration)
   - `license.yvl` (for PREMIUM)
3. Launch the new `YuneVoix.exe` and verify everything works before deleting the old folder.

To uninstall YuneVoix completely, simply delete its folder.
