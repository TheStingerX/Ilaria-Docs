# Installare Causal Voice Changer

Questa guida ti accompagna passo dopo passo nell'installazione di Causal Voice Changer su **Windows** o **Linux**, anche se non hai mai usato Python o Git.

> **Regola fondamentale per il primo avvio**: esegui sempre **prima** il launcher del training (`run-training.bat` su Windows o `run-training.sh` su Linux), anche se vuoi usare solo il cambia-voce dal vivo. È il launcher del training a installare Python, PyTorch per la tua GPU e i circa 900 MB di pesi pre-addestrati necessari a entrambi i programmi.

## 1. Scarica CVC

Scegli una delle due opzioni:

### Opzione A: Release precompilata (Consigliata ai principianti)

1. Vai alla [pagina Releases di Causal Voice Changer](https://github.com/mojowozo/Causal-Voice-Changer/releases).
2. Scarica l'archivio per il tuo sistema operativo:
   - **Windows**: `Causal-Voice-Changer-<version>-windows-x64.zip`
   - **Linux**: `Causal-Voice-Changer-<version>-linux-x86_64.tar.gz` *(richiede glibc 2.35+, es. Ubuntu 22.04, Debian 12 o successivi)*
3. Estrai l'archivio in una cartella scrivibile (ad esempio `D:\CausalVC` su Windows).
   - *Nota*: la release include già le finestre grafiche compilate, quindi **non** devi installare manualmente .NET SDK o Rust.

### Opzione B: Da sorgente (`git clone`)

Se cloni la repository con `git clone https://github.com/mojowozo/Causal-Voice-Changer.git`, le finestre grafiche vengono compilate automaticamente al primo avvio (e ricompilate quando cambiano i sorgenti):
- **Windows**: installa automaticamente **.NET 10 SDK** in `.dotnet` se manca, per compilare l'app WinUI 3.
- **Linux**: compila l'interfaccia COSMIC in Rust tramite `cargo`.
- Se un'interfaccia nativa non può essere compilata, si apre automaticamente una finestra **Tk** più semplice con le funzioni principali.

## 2. Esegui la configurazione iniziale (`run-training`)

1. Apri la cartella estratta di CVC.
2. Avvia:
   - **Windows**: doppio clic su **`run-training.bat`**
     - Poiché l'app non è firmata digitalmente, Windows SmartScreen può mostrare *"Windows ha protetto il PC"*. Clicca **Ulteriori informazioni → Esegui comunque**.
   - **Linux**: apri un terminale nella cartella ed esegui **`./run-training.sh`**
3. **Attendi l'installazione automatica**:
   - Crea un ambiente Python locale (`.venv-win` su Windows, `.venv` su Linux) tramite **`uv`**.
   - Installa la build di **PyTorch** adatta alla tua scheda grafica.
   - Scarica il **modello base e i pesi RMVPE** (circa **900 MB**) nella cartella `weights/`.
4. Al termine si aprirà la **finestra di Training**. Ora puoi chiuderla oppure iniziare subito a creare una voce!

## 3. Scelta manuale della GPU su Windows (se necessario)

Su Windows, `scripts/gpu-extra.ps1` rileva automaticamente la GPU:
- **NVIDIA**: installa PyTorch **CUDA**.
- **AMD RX 7000 / 9000, PRO W7000, Ryzen AI**: installa PyTorch **ROCm** (`rocm`, richiede AMD Software `26.2.2` o successivo).
- **AMD RX 6000 / PRO W6000**: installa la build nightly di AMD (`rocm-rdna2`).
- **AMD Radeon più vecchie**: girano su **CPU** (in modalità real-time imposta **Chunk** su `60 ms` o più).

Se il rilevamento automatico sceglie il backend sbagliato, imposta la variabile d'ambiente `CAUSALVC_GPU` prima di avviare il launcher:
- `CAUSALVC_GPU=cuda`
- `CAUSALVC_GPU=rocm`
- `CAUSALVC_GPU=rocm-rdna2`

*(Se esegui comandi `uv` a mano su Windows, aggiungi `--extra cuda`, `--extra rocm` oppure `--extra rocm-rdna2`.)*

## 4. Aggiornare CVC

Dalla versione **v0.3.1**, CVC include un **updater integrato** direttamente nell'app. Il controllo automatico degli aggiornamenti è attivo di default e può essere disattivato nella pagina **About**. Le installazioni esistenti aggiornano anche `weights/causalvc-base/` automaticamente al primo avvio o training successivo.

Quando aggiorni manualmente o dai sorgenti:
- Su Windows, se usi i sorgenti e l'interfaccia è cambiata, avvia `run-realtime.bat` / `run-training.bat` con `CAUSALVC_REBUILD=1` per ricompilare WinUI 3.
- Su Linux, l'interfaccia Rust si ricompila automaticamente al primo avvio dopo l'aggiornamento.
