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

[First synthesis](first-run.md) · [Models and acceleration](engines.md)
