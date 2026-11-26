---
label: "Applio auf Android mit Termux"
icon: ":iphone:"
order: 87
permalink: /ilaria-rvc/applio/android/
---

# Applio auf Android mit Termux

Applio 3.6.2 läuft über Ubuntu ARM64 unter proot. Dateien werden auf der CPU konvertiert. Nutze für Echtzeit und Training eine andere Umgebung.

## Termux

Installiere Termux aus offizieller Quelle und prüfe, ob `uname -m` den Wert `aarch64` zeigt.

~~~bash
pkg update
pkg install proot-distro
uname -m
proot-distro install ubuntu
proot-distro login ubuntu
~~~

## Ubuntu

Installiere in Ubuntu die Abhängigkeiten und passe den Installer für ARM64 und CPU an.

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

## Erste Synthese

Öffne die lokale URL auf dem Telefon. Teste eine kurze WAV mit `.pth` und passendem optionalen Index. Bei einem Abbruch teste einen kürzeren Ausschnitt.

[Termux](https://github.com/termux/termux-app#installation) · [Applio 3.6.2](https://github.com/IAHispano/Applio/tree/3.6.2) · [Applio](installation.md)
