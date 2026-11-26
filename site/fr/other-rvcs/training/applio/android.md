# Applio sur Android avec Termux

Ce parcours lance Applio 3.6.2 dans Ubuntu ARM64 via proot. Il convertit des fichiers sur CPU. Pour le direct ou l’entraînement, utilisez un autre environnement.

## Termux

Installez Termux depuis une source officielle puis vérifiez que `uname -m` affiche `aarch64`.

~~~bash
pkg update
pkg install proot-distro
uname -m
proot-distro install ubuntu
proot-distro login ubuntu
~~~

## Ubuntu

Dans Ubuntu, installez les dépendances et adaptez l’installateur pour ARM64 et CPU.

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

## Première synthèse

Ouvrez l’adresse locale sur le téléphone. Testez un WAV court avec le `.pth` et son index éventuel. Si Android arrête le processus, essayez un extrait plus court.

[Termux](https://github.com/termux/termux-app#installation) · [Applio 3.6.2](https://github.com/IAHispano/Applio/tree/3.6.2) · [Applio](installation.md)
