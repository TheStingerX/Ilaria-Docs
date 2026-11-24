---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/rvc-studio/installation/
---

# RVC Studio · Installation

[GitHub](https://github.com/xenophidiadae/RVCStudio) · [Reviewed version](https://github.com/xenophidiadae/RVCStudio/tree/6cccb75833ef7937bfb6da9ce8f21211f0ab526e)

## Windows

RVC Studio is a local Avalonia desktop app for realtime RVC. Install the .NET 10 SDK, Python 3.10–3.12 and Git. Check that Python and curl.exe are available in PowerShell. The app uses PortAudio. NVIDIA acceleration needs compatible NVIDIA drivers and CUDA/cuDNN libraries. From the checkout root, run setup and launch the project.

~~~powershell
.\setup.ps1
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

## Linux and shared assets

On Linux install .NET 10 SDK, Python with venv, PortAudio, curl and sha256sum. Setup builds the platform-specific converter, downloads about 707 MiB of shared ContentVec/RMVPE models and verifies hashes. Run setup on the target OS and architecture. The ONNX backend falls back to CPU when CUDA cannot initialize.

~~~bash
chmod +x setup.sh
./setup.sh
dotnet run --project RVCStudio/RVCStudio.csproj
~~~

[Usage and troubleshooting](usage.md)
