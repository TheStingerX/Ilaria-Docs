---
label: "AMD Preview"
icon: ":desktop_computer:"
order: 98
permalink: /ilaria-rvc/amd-preview/
---

# Ilaria RVC 2.5.1 AMD Preview

AMD Preview es una versión separada de la 2.5.1 para Radeon compatibles en Windows 11 con WSL2 o Ubuntu 22.04 nativo. Usa Python 3.10, PyTorch 2.6.0 y ROCm 6.4.2.

!!!warning Preview
Se han comprobado el paquete y el iniciador. El entrenamiento, la reanudación y la conversión completa en Radeon siguen pendientes.
!!!

## Descarga

[AMD Preview ZIP · 5.9 GB](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip?download=true) · [SHA-256](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip.sha256)

Extrae el ZIP en una carpeta propia. Incluye cuatro wheels AMD para Linux, modelos base y muestras de silencio. El primer inicio necesita internet. Instala el controlador y ROCm por separado.

## Radeon compatibles con WSL2

La tabla recoge la compatibilidad de AMD para ROCm 6.4.2. Para Ubuntu nativo consulta la matriz de Linux.

| Radeon | ROCm 6.4.2 · WSL2 |
| --- | --- |
| RX 9000 | RX 9060, RX 9060 XT, RX 9070, RX 9070 XT, RX 9070 GRE |
| RX 7000 | RX 7800 XT, RX 7900 GRE, RX 7900 XT, RX 7900 XTX |
| PRO | W7700, W7800, W7800 48GB, W7900, W7900 Dual Slot |
| AI PRO | R9700 |

[AMD · WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/wsl/wsl_compatibility.html) · [AMD · Ubuntu](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/native_linux/native_linux_compatibility.html)

## Instalar en Windows 11

~~~powershell
wsl --install -d Ubuntu-22.04
~~~

Instala Ubuntu 22.04 en WSL2 desde PowerShell, completa la creación del usuario e instala el controlador Radeon en Windows y ROCm 6.4.2 en Ubuntu. Comprueba `rocminfo`, instala los paquetes y ejecuta `RUN_ILARIA_RVC_AMD.bat` desde Windows. [AMD WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/wsl/install-radeon.html)

ROCm nativo en Windows no ofrece soporte oficial para entrenamiento ML. El iniciador usa WSL2. [AMD](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/limitations/limitationsrad.html)

## Instalar en Ubuntu nativo

Instala el controlador y ROCm 6.4.2. Comprueba `rocminfo`, instala los paquetes y ejecuta `bash RUN_ILARIA_RVC_AMD.sh` desde la carpeta extraída. [AMD Linux](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/native_linux/install-radeon.html)

## Paquetes de Ubuntu

~~~bash
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev gcc-12 g++-12 make ffmpeg libsndfile1
~~~

Cuando el servidor esté listo, abre la interfaz local. [Ilaria RVC](http://127.0.0.1:6969)

## Comprobar la GPU

~~~powershell
.\RUN_ILARIA_RVC_AMD.bat --check
~~~

~~~bash
bash RUN_ILARIA_RVC_AMD.sh --check
~~~

Comprueba retropropagación FP32 y ContentVec sin abrir la interfaz. El entrenamiento comienza con una GPU en FP32. El actualizador interno está desactivado.
