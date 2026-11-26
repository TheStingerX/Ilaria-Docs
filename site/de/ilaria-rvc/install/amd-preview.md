# Ilaria RVC 2.5.1 AMD Preview

Die AMD Preview ist ein separates Paket der Version 2.5.1 für kompatible Radeon-GPUs unter Windows 11 mit WSL2 oder nativem Ubuntu 22.04. Sie verwendet Python 3.10, PyTorch 2.6.0 und ROCm 6.4.2.

!!!warning Preview
Paket und Launcher wurden geprüft. Vollständiges Training, Wiederaufnahme und Sprachkonvertierung auf Radeon müssen noch validiert werden.
!!!

## Herunterladen

[AMD Preview ZIP · 5.9 GB](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip?download=true) · [SHA-256](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip.sha256)

Entpacke die ZIP in einen eigenen Ordner. Enthalten sind vier AMD-Wheels für Linux, Basismodelle und Stille-Samples. Der erste Start benötigt Internet. Installiere Treiber und ROCm separat.

## Radeon-GPUs unter WSL2

Die Tabelle folgt AMDs ROCm-6.4.2-Matrix. Für natives Ubuntu gilt die separate Linux-Matrix.

| Radeon | ROCm 6.4.2 · WSL2 |
| --- | --- |
| RX 9000 | RX 9060, RX 9060 XT, RX 9070, RX 9070 XT, RX 9070 GRE |
| RX 7000 | RX 7800 XT, RX 7900 GRE, RX 7900 XT, RX 7900 XTX |
| PRO | W7700, W7800, W7800 48GB, W7900, W7900 Dual Slot |
| AI PRO | R9700 |

[AMD · WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/wsl/wsl_compatibility.html) · [AMD · Ubuntu](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/native_linux/native_linux_compatibility.html)

## Installation unter Windows 11

~~~powershell
wsl --install -d Ubuntu-22.04
~~~

Installiere Ubuntu 22.04 in WSL2 über PowerShell. Lege einen Ubuntu-Benutzer an, installiere den Radeon-Treiber unter Windows und ROCm 6.4.2 unter Ubuntu. Prüfe `rocminfo`, installiere die Pakete und starte `RUN_ILARIA_RVC_AMD.bat` in Windows. [AMD WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/wsl/install-radeon.html)

Natives Windows-ROCm unterstützt ML-Training offiziell nicht. Der Launcher verwendet WSL2. [AMD](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/limitations/limitationsrad.html)

## Installation unter nativem Ubuntu

Installiere Treiber und ROCm 6.4.2. Prüfe `rocminfo`, installiere die Pakete und starte `bash RUN_ILARIA_RVC_AMD.sh` im entpackten Ordner. [AMD Linux](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/native_linux/install-radeon.html)

## Ubuntu-Pakete

~~~bash
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev gcc-12 g++-12 make ffmpeg libsndfile1
~~~

Sobald der Server bereit ist, öffne die lokale WebUI. [Ilaria RVC](http://127.0.0.1:6969)

## GPU prüfen

~~~powershell
.\RUN_ILARIA_RVC_AMD.bat --check
~~~

~~~bash
bash RUN_ILARIA_RVC_AMD.sh --check
~~~

Der Check prüft FP32-Rückpropagation und ContentVec ohne WebUI. Das Training startet mit einer GPU in FP32. Die integrierte Updatefunktion ist deaktiviert.
