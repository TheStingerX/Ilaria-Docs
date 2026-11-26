---
label: "Applio en Android con Termux"
icon: ":iphone:"
order: 87
permalink: /ilaria-rvc/applio/android/
---

# Applio en Android con Termux

Applio 3.6.2 mediante Ubuntu ARM64 en proot. Convierte archivos por CPU. Para tiempo real o entrenamiento usa otro entorno.

## Termux

Instala Termux desde una fuente oficial y ejecuta este bloque. Comprueba que `uname -m` muestra `aarch64`.

~~~bash
pkg update
pkg install proot-distro
uname -m
proot-distro install ubuntu
proot-distro login ubuntu
~~~

## Ubuntu

Ya dentro de Ubuntu, instala las dependencias y ajusta el instalador para ARM64 y CPU.

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

## Primera síntesis

Abre la URL local en el mismo teléfono. Prueba un WAV corto con el `.pth` y el índice opcional. Si Android cierra el proceso, reduce la duración. Para reanudar vuelve a Ubuntu y ejecuta el lanzador.

[Termux](https://github.com/termux/termux-app#installation) · [Applio 3.6.2](https://github.com/IAHispano/Applio/tree/3.6.2) · [Applio](installation.md)
