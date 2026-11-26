# Ilaria RVC 2.5.1 AMD Preview

AMD Preview est un paquet 2.5.1 distinct pour Radeon compatibles, sous Windows 11 via WSL2 ou Ubuntu 22.04 natif. Il utilise Python 3.10, PyTorch 2.6.0 et ROCm 6.4.2.

!!!warning Preview
Le paquet et le lanceur ont été vérifiés. L’entraînement, la reprise et la conversion complète sur Radeon restent à valider.
!!!

## Téléchargement

[AMD Preview ZIP · 5.9 GB](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip?download=true) · [SHA-256](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip.sha256)

Extrayez le ZIP dans un dossier dédié. Il fournit quatre wheels AMD pour Linux, les poids de base et les échantillons de silence. Le premier démarrage nécessite internet. Installez le pilote et ROCm séparément.

## Radeon compatibles sous WSL2

La liste reprend la matrice ROCm 6.4.2 d’AMD. Pour Ubuntu natif, consultez la matrice Linux.

| Radeon | ROCm 6.4.2 · WSL2 |
| --- | --- |
| RX 9000 | RX 9060, RX 9060 XT, RX 9070, RX 9070 XT, RX 9070 GRE |
| RX 7000 | RX 7800 XT, RX 7900 GRE, RX 7900 XT, RX 7900 XTX |
| PRO | W7700, W7800, W7800 48GB, W7900, W7900 Dual Slot |
| AI PRO | R9700 |

[AMD · WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/wsl/wsl_compatibility.html) · [AMD · Ubuntu](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/native_linux/native_linux_compatibility.html)

## Installation sous Windows 11

~~~powershell
wsl --install -d Ubuntu-22.04
~~~

Installez Ubuntu 22.04 dans WSL2 depuis PowerShell. Créez le compte Ubuntu, installez le pilote Radeon sous Windows et ROCm 6.4.2 sous Ubuntu. Vérifiez `rocminfo`, installez les paquets et lancez `RUN_ILARIA_RVC_AMD.bat` depuis Windows. [AMD WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/wsl/install-radeon.html)

ROCm natif sous Windows ne prend pas officiellement en charge l’entraînement ML. Le lanceur utilise WSL2. [AMD](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/limitations/limitationsrad.html)

## Installation sous Ubuntu natif

Installez le pilote et ROCm 6.4.2. Vérifiez `rocminfo`, installez les paquets et lancez `bash RUN_ILARIA_RVC_AMD.sh` dans le dossier extrait. [AMD Linux](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/native_linux/install-radeon.html)

## Paquets Ubuntu

~~~bash
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev gcc-12 g++-12 make ffmpeg libsndfile1
~~~

Une fois le serveur prêt, ouvrez l’interface locale. [Ilaria RVC](http://127.0.0.1:6969)

## Vérifier le GPU

~~~powershell
.\RUN_ILARIA_RVC_AMD.bat --check
~~~

~~~bash
bash RUN_ILARIA_RVC_AMD.sh --check
~~~

Le contrôle teste la rétropropagation FP32 et ContentVec sans ouvrir l’interface. L’entraînement démarre avec un GPU en FP32. La mise à jour intégrée est désactivée.
