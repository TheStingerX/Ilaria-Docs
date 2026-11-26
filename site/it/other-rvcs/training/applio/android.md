# Applio su Android con Termux

Questo percorso della community esegue l’interfaccia Gradio di Applio 3.6.2 su Android ARM64, dentro Ubuntu tramite proot. La conversione usa la CPU. Parti da una clip breve. La scheda Realtime richiede dispositivi audio che questa configurazione non espone. Per il training usa un PC o un ambiente cloud.

## Termux

Installa Termux da una fonte ufficiale. Esegui il primo blocco in Termux. Prima di applicare le modifiche per ARM64, verifica che `uname -m` restituisca `aarch64`.

~~~bash
pkg update
pkg install proot-distro
uname -m
proot-distro install ubuntu
proot-distro login ubuntu
~~~

## Ubuntu

Dopo `proot-distro login ubuntu`, esegui il secondo blocco dentro Ubuntu. `libportaudio2` serve all’avvio anche per la conversione di file. Le modifiche valgono per la versione indicata e fanno usare all’installer i pacchetti PyTorch per CPU e la copia dei file anziché i collegamenti.

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

## Prima sintesi

Se l’installer si ferma dopo aver installato `uv`, aggiungi `$HOME/.local/bin` al PATH e rilancialo. Quando appare l’indirizzo locale, di solito `http://127.0.0.1:6969`, aprilo sullo stesso telefono. Carica un WAV pulito e breve in inferenza. Scegli il `.pth` e l’eventuale `.index` abbinato. Parti con pitch a zero, converti e scarica il risultato. Se Android chiude il processo, riapri Termux e riprova con una clip più corta. Ferma il server con Ctrl+C e salva i modelli prima di cambiare versione.

[Termux](https://github.com/termux/termux-app#installation) · [Applio 3.6.2](https://github.com/IAHispano/Applio/tree/3.6.2) · [Applio](installation.md)
