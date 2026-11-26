---
label: "AMD Preview"
icon: ":desktop_computer:"
order: 98
permalink: /ilaria-rvc/amd-preview/
---

# Ilaria RVC 2.5.1 AMD Preview

AMD Preview è un pacchetto separato della 2.5.1 per le Radeon compatibili. Funziona su Windows 11 tramite WSL2 con Ubuntu 22.04 oppure su Ubuntu 22.04 nativo. Usa Python 3.10, PyTorch 2.6.0 e ROCm 6.4.2.

!!!warning Preview
Il pacchetto e il launcher sono stati controllati. Training completo, ripresa dai checkpoint e conversione vocale dall’inizio alla fine sono ancora da verificare su hardware Radeon.
!!!

## Scarica ed estrai

[AMD Preview ZIP · 5.9 GB](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip?download=true) · [SHA-256](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/ILARIA_RVC-2.5.1-AMD.zip.sha256)

Estrai lo ZIP in una cartella dedicata. Include quattro wheel ufficiali AMD per Linux, i pesi di base e i campioni di silenzio del training. Il primo avvio richiede internet per le dipendenze audio e della WebUI. Installa separatamente driver GPU e ROCm.

## Radeon compatibili con WSL2

La tabella riporta la compatibilità dichiarata da AMD per ROCm 6.4.2 su WSL2. Per Ubuntu nativo consulta la matrice Linux separata. Le schede elencate attendono la validazione con Ilaria RVC.

| Radeon | ROCm 6.4.2 · WSL2 |
| --- | --- |
| RX 9000 | RX 9060, RX 9060 XT, RX 9070, RX 9070 XT, RX 9070 GRE |
| RX 7000 | RX 7800 XT, RX 7900 GRE, RX 7900 XT, RX 7900 XTX |
| PRO | W7700, W7800, W7800 48GB, W7900, W7900 Dual Slot |
| AI PRO | R9700 |

[AMD · WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/wsl/wsl_compatibility.html) · [AMD · Ubuntu](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/compatibility/native_linux/native_linux_compatibility.html)

## Installa su Windows 11

~~~powershell
wsl --install -d Ubuntu-22.04
~~~

In PowerShell, installa Ubuntu 22.04 in WSL2 con il comando qui sotto. Riavvia se richiesto e crea l’utente Ubuntu. Installa il driver Radeon compatibile in Windows e ROCm 6.4.2 in Ubuntu. Esegui `rocminfo` in Ubuntu e installa i pacchetti di sistema indicati sotto. Apri la cartella estratta in Windows e avvia `RUN_ILARIA_RVC_AMD.bat`. Il lavoro sulla GPU avviene dentro WSL2. [AMD WSL2](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/wsl/install-radeon.html)

La configurazione ROCm nativa per Windows non supporta ufficialmente il training ML. Il launcher Windows usa WSL2. [AMD](https://rocm.docs.amd.com/projects/radeon-ryzen/en/latest/docs/limitations/limitationsrad.html)

## Installa su Ubuntu 22.04 nativo

Installa il driver Radeon e ROCm 6.4.2, poi controlla che `rocminfo` rilevi la scheda. Installa i pacchetti qui sotto. Apri il terminale nella cartella estratta e avvia `bash RUN_ILARIA_RVC_AMD.sh`. [AMD Linux](https://rocm.docs.amd.com/projects/radeon-ryzen/en/docs-6.4.2/docs/install/native_linux/install-radeon.html)

## Pacchetti di sistema Ubuntu

~~~bash
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev gcc-12 g++-12 make ffmpeg libsndfile1
~~~

Quando il launcher indica che il server è pronto, apri la WebUI locale. [Ilaria RVC](http://127.0.0.1:6969)

## Esegui il controllo GPU

~~~powershell
.\RUN_ILARIA_RVC_AMD.bat --check
~~~

~~~bash
bash RUN_ILARIA_RVC_AMD.sh --check
~~~

Al primo utilizzo il controllo prepara l’ambiente. Esegue un passaggio di retropropagazione FP32 sulla GPU ed estrae feature ContentVec senza aprire la WebUI. Il training parte con una GPU e precisione FP32. L’aggiornamento interno è disattivato nella preview per proteggere le modifiche specifiche per AMD.
