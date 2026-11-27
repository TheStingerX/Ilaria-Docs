---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /non-rvc/tts/voicestudio/installation/
---

# VoiceStudio · Installation

[VoiceStudio v0.5.8](https://github.com/debpalash/VoiceStudio/releases/tag/v0.5.8) · [GitHub](https://github.com/debpalash/VoiceStudio)

## Choose the package

This guide covers VoiceStudio 0.5.8. Choose one release installer for your OS and architecture. On Windows 10/11 x64 use the x64 EXE. Windows ARM is experimental and can run the x64 backend under CPU emulation. On Apple Silicon, open the arm64 DMG and move the app to Applications. On Intel Mac consider the remote backend route. On Linux x64 use the DEB on a compatible distribution or the AppImage.

## First launch

1. Install and open the app.
2. Wait for backend preparation to finish.
3. Open the model manager and download only the engine you need for a first test. Check free space and connectivity.
4. Generate one short sentence before installing more models. If the UI opens but synthesis fails, check backend and model status.

## Acceleration and limits

CPU is a useful baseline. CUDA targets NVIDIA. For AMD ROCm, check the exact GPU, OS and engine combination. Some GGUF engines offer Vulkan and Apple Silicon has Metal paths. An accelerator available for synthesis may differ from the one available for transcription.

## Windows: install step by step

1. Open **Settings → System → About** and check **System type**. x64 and ARM64 use different packages.
2. Choose the Windows installer for your architecture from the release assets. Download `SHA256SUMS.txt` if you want to verify the file checksum.
3. Run the installer. If you choose another drive, check separately where the app stores models and the engine environment. The program folder and model cache can be separate.
4. Open VoiceStudio and wait for its backend. Install one model for the first test, then repeat it after restarting the app.

## macOS and Linux: verify setup

On Mac, check **About This Mac**. On Apple Silicon, choose `arm64`, open the DMG and move VoiceStudio into **Applications**. If macOS blocks startup, verify the release source and signing. On Linux get the x64 DEB or AppImage. Install the DEB from its directory with `sudo apt install ./package-name.deb`. For AppImage, mark the file executable and launch it. Substitute the names of the files you downloaded.

## If first launch stalls

Check in order that the window opens, the backend responds and the model is installed. If weights are missing, check disk and connectivity before retrying. If a backend fails only with acceleration, choose a CPU-compatible engine and test a short sentence. Keep the first error if that also fails.

[First synthesis](first-run.md) · [Models and acceleration](engines.md)
