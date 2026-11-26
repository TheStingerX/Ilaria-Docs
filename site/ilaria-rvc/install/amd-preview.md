# Ilaria RVC 2.5.1 AMD Preview

The AMD Preview is a separate 2.5.1 build for compatible Radeon GPUs. It runs on Windows 11 through WSL2 with Ubuntu 22.04 or on native Ubuntu 22.04. It uses Python 3.10, PyTorch 2.6.0 and ROCm 6.4.2.

!!!warning Preview
The package and launcher have been checked. Full training, checkpoint resume and end-to-end voice conversion still need validation on Radeon hardware.
!!!

## Download and extract

[AMD Preview ZIP · 5.9 GB](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip?download=true) · [SHA-256](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip.sha256)

Extract the ZIP into its own folder. It includes four official AMD Linux wheels, base model weights and training mute samples. The first launch needs internet access for audio and WebUI dependencies. Install the GPU driver and ROCm separately.

## Radeon support on WSL2

The table reflects AMD’s ROCm 6.4.2 WSL2 matrix. Check AMD’s separate native Linux matrix for Ubuntu. A listed card is not an Ilaria RVC validation result.

| Radeon | ROCm 6.4.2 · WSL2 |
| --- | --- |
| RX 9000 | RX 9060, RX 9060 XT, RX 9070, RX 9070 XT, RX 9070 GRE |
| RX 7000 | RX 7800 XT, RX 7900 GRE, RX 7900 XT, RX 7900 XTX |
| PRO | W7700, W7800, W7800 48GB, W7900, W7900 Dual Slot |
| AI PRO | R9700 |

[AMD · WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/wsl/wsl_compatibility.html) · [AMD · Ubuntu](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/native_linux/native_linux_compatibility.html)

## Install on Windows 11

~~~powershell
wsl --install -d Ubuntu-22.04
~~~

In PowerShell, install Ubuntu 22.04 in WSL2 with the command below. Restart if prompted and create your Ubuntu user. Install the compatible Windows Radeon driver and ROCm 6.4.2 inside Ubuntu. Run `rocminfo` in Ubuntu, then install the system packages below. Open the extracted folder in Windows and run `RUN_ILARIA_RVC_AMD.bat`. The workload runs in WSL2. [AMD WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/wsl/install-radeon.html)

Native Windows ROCm does not officially support ML training. The Windows launcher uses WSL2. [AMD](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/limitations/limitationsrad.html)

## Install on native Ubuntu 22.04

Install the Radeon driver and ROCm 6.4.2, then verify the GPU with `rocminfo`. Install the system packages below. Open a terminal in the extracted folder and run `bash RUN_ILARIA_RVC_AMD.sh`. [AMD Linux](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/native_linux/install-radeon.html)

## Ubuntu system packages

~~~bash
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev gcc-12 g++-12 make ffmpeg libsndfile1
~~~

When the launcher reports that the server is ready, open the local WebUI. [Ilaria RVC](http://127.0.0.1:6969)

## Run the GPU check

~~~powershell
.\RUN_ILARIA_RVC_AMD.bat --check
~~~

~~~bash
bash RUN_ILARIA_RVC_AMD.sh --check
~~~

The check prepares the environment on first use, runs an FP32 GPU backward pass and extracts ContentVec features without launching the WebUI. Training starts with one GPU in FP32. The in-app updater is disabled in this preview to protect its AMD-specific changes.
