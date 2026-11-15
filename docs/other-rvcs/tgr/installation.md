---
label: "📦 Install TG Developed Fork"
order: 100
permalink: /ilaria-rvc/tgr/installation/
---
# Install Okada TG Developed Fork

TG Developed Fork (TGR) comes from the Deiteris branch of the w-okada family. The publisher documents this fork as RVC-only. It has its own release files, launchers and device constraints. Keep it in its own folder so a working VCClient or Deiteris installation stays available for comparison.

## Download the build that matches your computer

Check **Task Manager → Performance** on Windows or **About This Mac** on macOS. Read the actual GPU or chip name. In the release filename, `amd64` refers to the processor architecture used by standard 64-bit Intel and AMD PCs.

| Setup | File to look for on [TGR releases](https://github.com/tg-develop/voice-changer/releases) |
| --- | --- |
| Windows with supported NVIDIA CUDA | The `voice-changer-windows-amd64-cuda.zip` split parts from the same release. |
| Windows with AMD, supported Intel graphics or CPU-only operation | `voice-changer-windows-amd64-dml.zip`. Select CPU in the app when testing without a usable GPU. |
| Apple Silicon Mac | `voice-changer-macos-arm64-cpu.tar.gz` if included. The publisher marks macOS support experimental. |
| Intel Mac | `voice-changer-macos-amd64-cpu.tar.gz` if included. Acceleration depends on the installed graphics and build. |
| Linux | Use the release assets explicitly labelled for Linux when available, or the fork's source setup. |

## Windows step by step

1. On the releases page, expand **Assets** for one release. Download the DirectML ZIP or every CUDA part. A split example includes `.001` and `.002`. The parts must stay beside each other with their downloaded names.
2. For CUDA, use an archive tool that supports split files and extract from `.001`. It reads the later parts during extraction. For DirectML, extract the single ZIP. Choose a folder you can write to and keep the extracted folders intact.
3. Open the extracted package, then `MMVCServerSIO`, then launch `MMVCServerSIO.exe`.
4. Leave the startup window open while any required weights download. When the browser opens, keep that console available for diagnostics. If the page does not open automatically, use the local address printed by the server.
5. The first CUDA conversion may take a few seconds to start. Wait for warmup before repeatedly pressing Start or changing devices.

## macOS or Linux

On macOS, unpack the archive for your exact chip architecture and open the bundled `MMVCServerSIO` executable. If macOS blocks launch, confirm the file came from the official release and examine the block before making system changes. Grant microphone access to the browser for browser capture, or the local app when it opens the microphone directly.

For a Linux source install, use the fork's own source archive and the documented Python 3.10 environment. Open a terminal in the repo's `server` folder. The installer is `vc_install.sh`; choose the backend that matches your system when it prompts. Use the startup script included by that version and open the local address printed to the terminal. Script names differ across snapshots. To identify the supplied entry points, list the files in the `server` folder before running one. For a release binary, unpack the package for your architecture and start its included executable. The Windows DirectML archive is a separate runtime.

## Isolate startup errors

| Symptom | First check |
| --- | --- |
| Extraction stops on a missing file | Confirm all CUDA parts are present and from the same release. Start extraction again from `.001`. |
| A weight fails verification | Read the filename in the startup log. Close the process, rename only the cited downloaded dependency as a backup, then restart to retry its download. Keep your voice model library and index files intact. |
| The browser shows a connection failure | Check if the server console reports a ready address. Launch one instance and keep it open while using the page. |
| DirectML launches but the GPU is slow or missing | Confirm the selected GPU name, and test CPU or another supported device with the same model. The project reports poor performance on some integrated Intel configurations. |
| Opening the microphone fails | Verify input permissions in the OS and browser, then repeat in a Chromium-based browser if Firefox ESR does not show the device list. |

When the page loads, continue to [First model, microphone and virtual cable](live-audio.md).
