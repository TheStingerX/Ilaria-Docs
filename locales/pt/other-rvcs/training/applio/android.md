---
label: "Applio em Android com Termux"
icon: ":iphone:"
order: 87
permalink: /ilaria-rvc/applio/android/
---

# Applio em Android com Termux

O Applio 3.6.2 corre em Ubuntu ARM64 através de proot. A conversão de ficheiros usa CPU. Para tempo real ou treino, usa outro ambiente.

## Termux

Instala o Termux de uma fonte oficial. Confirma que `uname -m` mostra `aarch64`.

~~~bash
pkg update
pkg install proot-distro
uname -m
proot-distro install ubuntu
proot-distro login ubuntu
~~~

## Ubuntu

No Ubuntu, instala dependências e adapta o instalador a ARM64 e CPU.

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

## Primeira síntese

Abre o endereço local no telefone. Testa um WAV curto com `.pth` e o índice opcional. Se o Android parar o processo, experimenta um excerto mais curto.

[Termux](https://github.com/termux/termux-app#installation) · [Applio 3.6.2](https://github.com/IAHispano/Applio/tree/3.6.2) · [Applio](installation.md)
