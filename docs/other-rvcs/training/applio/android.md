---
label: "Applio on Android with Termux"
icon: ":iphone:"
order: 87
permalink: /ilaria-rvc/applio/android/
---

# Applio on Android with Termux

This community workflow runs the Applio 3.6.2 Gradio interface on an ARM64 Android phone inside Ubuntu via proot. It uses CPU inference. Start with a short clip. The realtime tab needs audio devices that this setup does not expose. Use a PC or cloud runtime for training.

## Termux

Install Termux from an official source. The following commands run in Termux. Check that `uname -m` reports `aarch64` before applying the ARM64 installer changes.

~~~bash
pkg update
pkg install proot-distro
uname -m
proot-distro install ubuntu
proot-distro login ubuntu
~~~

## Ubuntu

After `proot-distro login ubuntu`, run the next block inside Ubuntu. `libportaudio2` is needed for startup even when you only convert files. The changes apply to the pinned checkout and make the installer use CPU wheels and copy files instead of linking them.

~~~bash
apt update
apt install git libportaudio2
git clone --branch 3.6.2 --single-branch https://github.com/IAHispano/Applio.git
cd Applio
sed -i 's/sudo //g' run-install.sh
sed -i 's|uv pip install|uv pip install --python-platform aarch64-unknown-linux-gnu|g' run-install.sh
sed -i 's|https://download.pytorch.org/whl/cu[0-9]*|https://download.pytorch.org/whl/cpu|g' run-install.sh
sed -Ei 's/(torch(audio|vision)?==[^+;]+)\+cu[0-9]+/\1/g' requirements.txt
export UV_LINK_MODE=copy UV_NO_CACHE=1
export PATH="$HOME/.local/bin:$PATH"
bash run-install.sh
bash run-applio.sh
~~~

## First synthesis

If the installer stops after installing `uv`, add `$HOME/.local/bin` to PATH and rerun it. Wait for the local address, usually `http://127.0.0.1:6969`, and open it on the same phone. Upload a short clean WAV in the inference tab. Select the model `.pth` and its matching `.index` if available. Keep pitch at zero for the first test, convert and download the output. If Android stops the process, reopen Termux and try a shorter clip. Stop with Ctrl+C and keep your models backed up before changing versions.

[Termux](https://github.com/termux/termux-app#installation) · [Applio 3.6.2](https://github.com/IAHispano/Applio/tree/3.6.2) · [Applio](installation.md)
