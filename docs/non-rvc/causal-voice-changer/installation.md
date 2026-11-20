---
label: "Installation & Setup"
icon: ":cd:"
order: 98
permalink: /non-rvc/causal-voice-changer/installation/
description: "This guide walks you through installing Causal Voice Changer on Windows or Linux, even if you have never used Python or Git before."
---
# Installing Causal Voice Changer

This guide walks you through installing Causal Voice Changer on **Windows** or **Linux**, even if you have never used Python or Git before.

> **Important rule for first-time setup**: Always run the **training launcher** (`run-training.bat` on Windows or `run-training.sh` on Linux) **first**, even if you only plan to use the real-time voice changer. The training launcher installs Python, PyTorch for your GPU, and the ~900 MB pretrained weights needed by both apps.

## 1. Download CVC

Choose one of the two options:

### Option A: Pre-built Release (Recommended for beginners)

1. Go to the [Causal Voice Changer Releases page](https://github.com/mojowozo/Causal-Voice-Changer/releases).
2. Download the archive for your operating system:
   - **Windows**: `Causal-Voice-Changer-<version>-windows-x64.zip`
   - **Linux**: `Causal-Voice-Changer-<version>-linux-x86_64.tar.gz` *(requires glibc 2.35+, such as Ubuntu 22.04, Debian 12, or newer)*
3. Extract the archive into a writable folder (for example `D:\CausalVC` on Windows).
   - *Note*: The release already includes the compiled UI windows, so you do **not** need to install the .NET SDK or Rust manually.

### Option B: From Source (`git clone`)

If you clone the repository with `git clone https://github.com/mojowozo/Causal-Voice-Changer.git`, the UI windows are compiled automatically on first launch (and recompiled whenever source files change):
- **Windows**: automatically installs the **.NET 10 SDK** into `.dotnet` if missing to build the WinUI 3 app.
- **Linux**: builds the COSMIC Rust UI using `cargo`.
- If a native UI cannot be built, a simpler **Tk** fallback window opens automatically with the core features.

## 2. Run first-time setup (`run-training`)

1. Open the extracted CVC folder.
2. Run:
   - **Windows**: double-click **`run-training.bat`**
     - Because the app is not code-signed, Windows SmartScreen may warn *"Windows protected your PC"*. Click **More info → Run anyway**.
   - **Linux**: open a terminal in the folder and run **`./run-training.sh`**
3. **Wait for the automatic installer**:
   - It sets up a local Python environment (`.venv-win` on Windows, `.venv` on Linux) using **`uv`**.
   - It installs the matching **PyTorch** build for your graphics card.
   - It downloads the **base model and RMVPE weights** (about **900 MB**) into the `weights/` folder.
4. Once finished, the **Training window** will open. You can now close it or start building a voice!

## 3. Selecting your GPU on Windows (if needed)

On Windows, `scripts/gpu-extra.ps1` automatically detects your GPU:
- **NVIDIA**: installs **CUDA** PyTorch.
- **AMD RX 7000 / 9000, PRO W7000, Ryzen AI**: installs **ROCm** PyTorch (`rocm`, requires AMD Software `26.2.2` or newer).
- **AMD RX 6000 / PRO W6000**: installs AMD's newer nightly build (`rocm-rdna2`).
- **Older AMD Radeons**: run on the **CPU** (when using real-time, set **Chunk** to `60 ms` or higher).

If auto-detection picks the wrong backend, set the `CAUSALVC_GPU` environment variable before running the launcher:
- `CAUSALVC_GPU=cuda`
- `CAUSALVC_GPU=rocm`
- `CAUSALVC_GPU=rocm-rdna2`

*(If running `uv` commands manually on Windows, pass `--extra cuda`, `--extra rocm`, or `--extra rocm-rdna2`.)*

## 4. Updating CVC

When updating to a newer version:
- On Windows, if you run from source and the UI changed, run `run-realtime.bat` / `run-training.bat` with `CAUSALVC_REBUILD=1` to rebuild the WinUI 3 interface.
- On Linux, the Rust UI rebuilds automatically on the next launch after an update.
