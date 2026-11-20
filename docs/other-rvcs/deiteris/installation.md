---
label: "Install Deiteris Fork"
icon: ":package:"
order: 100
permalink: /ilaria-rvc/deiteris/installation/
description: "Deiteris w-okada Fork is a popular community-maintained fork of w-okada/voice-changer (VCClient) focused on lower latency, cleaner audio, stability fixes, and updated backends for modern NVIDIA (CUDA), AMD/Intel (DirectML), and Apple Silicon hardware."
---
# Install Deiteris w-okada Fork

[GitHub](https://github.com/Deiteris/voice-changer) · [Releases](https://github.com/Deiteris/voice-changer/releases)

**Deiteris w-okada Fork** is a popular community-maintained fork of `w-okada/voice-changer` (VCClient) focused on lower latency, cleaner audio, stability fixes, and updated backends for modern NVIDIA (CUDA), AMD/Intel (DirectML), and Apple Silicon hardware.

## 1. Download the right build

Open the [Deiteris releases page](https://github.com/Deiteris/voice-changer/releases) and expand **Assets**:

| Hardware / OS | Package to download | Notes |
| --- | --- | --- |
| **Windows + NVIDIA GPU** | **CUDA** archive (often split into `.zip.001`, `.zip.002`, etc.) | Recommended for lowest latency on GeForce GTX/RTX cards. |
| **Windows + AMD / Intel GPU** | **DML (DirectML)** archive | Uses DirectML acceleration (or CPU if no compatible GPU is available). |
| **macOS (Apple Silicon / Intel)** | **macOS** build (CoreML / CPU) | Check release notes for Apple Silicon M1/M2/M3 vs. Intel support. |

## 2. Extract and launch (Windows)

1. For split CUDA archives (`.zip.001`, `.zip.002`, ...), download **all parts** into the same folder and extract starting from **`.zip.001`** using **7-Zip** or **WinRAR**.
2. Extract to a simple, writable path on your main drive (for example `C:\VoiceTools\Deiteris-VC`). Avoid `Program Files`, `OneDrive`, or paths with special characters.
3. Open the extracted folder and run the startup script (such as `start_http.bat` or `MMVCServerSIO.exe`, depending on the release).
4. **Wait for initial weights**: leave the console window open while the client downloads required base weights on first launch.
5. Open the local web UI address printed in the console (commonly `http://localhost:7865` or `http://127.0.0.1:18888`, depending on the build).

## 3. Virtual audio cable prerequisite

To send your converted voice into **Discord, OBS, VRChat, or games**, install a virtual audio cable (such as **VB-CABLE**) before configuring live audio:
1. Run the virtual cable installer as Administrator (`VBCABLE_Setup_x64.exe`).
2. **Restart Windows** so the new virtual audio endpoints are recognized cleanly.

Continue to [Route and tune Deiteris Fork](live-audio.md) to configure devices, chunk size, and pitch.
