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

## 1. Identify your GPU & download the right package (v0.7.1)

1. Check your dedicated graphics card in **Windows Task Manager → Performance → GPU** (NVIDIA GeForce RTX vs. AMD Radeon RX 7000+).
2. Download the matching **v0.7.1** build from [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (for **PREMIUM**, activation requires a `license.yvl` obtained privately via [Ko-fi](https://ko-fi.com/yunevoix) or DMs):
   - **BASIC (Free)**:
     - [Download YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) - for NVIDIA GPUs (8 GB+ VRAM, 12 GB recommended).
     - [Download YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) - for AMD Radeon RX 7000+ GPUs (12 GB+ VRAM, 16 GB recommended).
   - **PREMIUM** *(requires `license.yvl`)*:
     - [Download YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) - for NVIDIA GPUs.
     - [Download YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) - for AMD Radeon RX 7000+ GPUs.
   > **Important:** The NVIDIA and AMD packages are separate and not interchangeable. Do **not** move or delete the bundled folders next to `YuneVoix.exe`:
   > - **NVIDIA package:** keep **`models`** and **`cuda`** next to `YuneVoix.exe`.
   > - **AMD package:** keep **`models`** and **`cache`** next to `YuneVoix.exe`.
3. Note the archive password published with the release: **`yunevoix`** (kept here as documented by the project maintainer).

## 2. Extract the archive

The ZIP archive is encrypted with **AES-256**, which Windows Explorer cannot open (it will report the ZIP as invalid).

1. Install or open **7-Zip** (`7-zip.org`) or **WinRAR**.
2. Extract the whole archive using the password `yunevoix` into a writable local folder such as `D:\YuneVoix`.
   - **Do not** extract into `Program Files` or `OneDrive`.

## 3. First launch, SmartScreen & engine check

1. Open the extracted folder and run `YuneVoix.exe`.
2. Verify that the archive came from the official [Hugging Face YUNE repository](https://huggingface.co/JohnBlvck/YUNE/tree/main). Because the executable is not code-signed yet, Windows SmartScreen may show *"Windows protected your PC"*. Click **More info → Run anyway** after confirming the source.
   - If your antivirus flags a file, inspect **Windows Security → Protection history** and verify the file origin before allowing it; do **not** disable Windows Defender or antivirus protection globally.
3. **Wait for first-time preparation**:
   - The very first launch unpacks libraries once and takes longer.
   - **AMD:** uses **DirectML** on the dedicated GPU by default in v0.7.1 (no Windows Update download or model compiling). Only if you switch `Settings → General → "AMD graphics engine"` to experimental **MIGraphX** (after a restart) can first-time model compiling take **10–30 minutes**.
   - Check the LIVE status line or run `YuneVoix.exe --check` (`check.txt`) to confirm which graphics engine and GPU are active.
4. You can switch the UI language at the top of the window (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Update or upgrade (BASIC → PREMIUM)

Licences, voices, and settings from **v0.6.0 / v0.7.0** keep working in **v0.7.1**. To update to a new version or upgrade from BASIC to PREMIUM without losing your voices and settings:

1. Extract the new release into a **new** folder (do not overwrite the old one yet).
2. Copy these files/folders from the old YuneVoix folder into the new one:
   - `models\yune\voices` (your saved voices)
   - `settings.json` and `yune.json` (your configuration)
   - `my_voice.yvoice`, if it exists (the sample of your own voice used by **FlowEdit 3+1** in LIVE)
   - `license.yvl` (for PREMIUM)
3. Launch the new `YuneVoix.exe` and verify everything works before deleting the old folder.

> **Updating from v0.6.0:** If you had set a sample of your own voice before v0.7.0, choose it again once in `Settings → Voice & Timbre → "Sample of your voice…"`; otherwise **FlowEdit 3+1** falls back to **Learned 4 steps** in LIVE. This is required because v0.7.0+ needs the re-selected reference to bind `my_voice.yvoice` for FlowEdit and Timbre strength.

To uninstall YuneVoix completely, simply delete its folder.

Next step: [Voice Bank & Live Usage](usage.md).
