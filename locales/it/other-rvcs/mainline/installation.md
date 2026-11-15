---
label: "🧰 Installa e apri"
order: 40
permalink: /ilaria-rvc/mainline/installation/
---

# Installa Mainline RVC

Mainline è la WebUI originale del progetto Retrieval-based Voice Conversion. Aprila nel browser per convertire registrazioni o addestrare modelli. Per convertire la voce dal microfono, apri l'app desktop descritta nella [guida in tempo reale](realtime.md).

## Scegli un percorso di installazione

| La tua configurazione | Cosa usare |
| --- | --- |
| Windows e una GPU supportata | Inizia con un archivio Windows precompilato per la tua GPU. Questo è il percorso più breve. |
| Windows e una GPU NVIDIA RTX serie 50 | Utilizza un pacchetto esplicitamente contrassegnato per la serie 50 o l'installazione da sorgente con PyTorch per CUDA 12.8. Gli archivi NVIDIA meno recenti possono avviarsi ma falliscono quando tentano di eseguire operazioni GPU. |
| Windows e una GPU AMD o Intel | Scegli l'archivio AMD/Intel corrispondente. Il supporto DirectML dipende dalla versione e dall'operazione. Prova prima a convertire un file audio. |
| Ubuntu o una configurazione Windows personalizzata | Installa il ramo sorgente corrente in un ambiente Python separato. |

### Archivio Windows

1. Apri [Pacchetti e file di Mainline per Windows](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) e scegli l'archivio corrispondente alla tua GPU. Per l'attuale famiglia di pacchetti, cerca la variante `20260718` NVIDIA, NVIDIA serie 50 o AMD/Intel. Se hai già una versione precedente che funziona, lasciala nella sua directory.
2. Estrai l'intero archivio in una cartella locale scrivibile come `C:\RVC\Mainline`. Lascia spazio sia per il download che per i file estratti. In Esplora file, apri la cartella risultante e cerca il launcher, la cartella `assets` e il runtime Python. Se vedi una sola sottocartella, aprila.
3. Esegui `go-webui.bat` se presente. Gli archivi più vecchi potrebbero chiamarlo `go-web.bat`. Tieni aperta la finestra di comando e attendi l'indirizzo locale. Se il browser non si avvia, apri l'indirizzo visualizzato nel terminale. L'indirizzo predefinito è spesso `http://127.0.0.1:7865`.
4. Verifica che la pagina si apra e che il terminale rimanga in esecuzione. Mantieni l'archivio intatto finché la [prima conversione](inference.md) non riesce.

### Installazione da sorgente

Scarica ed estrai il file [ZIP del codice sorgente Mainline](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/archive/refs/heads/main.zip). Apri un terminale nella directory contenente `webui.py` e i file dei requisiti. La configurazione del codice sorgente riportata di seguito si applica al ramo Python 3.12. Esegui ogni frammento da quella directory utilizzando un interprete Python 3.12 a 64 bit.

**Windows PowerShell**

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
```

Se PowerShell blocca lo script di attivazione, apri il prompt dei comandi nella stessa directory ed esegui `.venv\Scripts\activate.bat`. Su Windows, inserisci [ffmpeg.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffmpeg.exe?download=true) e [ffprobe.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffprobe.exe?download=true) accanto a `webui.py`.

**Ubuntu 24.04**

```bash
sudo apt update
sudo apt install python3.12-venv python3.12-dev ffmpeg unzip libsndfile1 libportaudio2
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
```

Scegli **un** set di dipendenze. I nomi dei file contengono `requirments` come scritto nel repository. Esegui il blocco corrispondente dall'alto verso il basso.

**CPU, AMD o Intel**

```text
python -m pip install -r requirments_cpu_py312.txt
```

**NVIDIA RTX serie 50**

```text
python -m pip install torch==2.7.1+cu128 torchaudio==2.7.1+cu128 --index-url https://download.pytorch.org/whl/cu128 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu128_py312.txt
```

**Schede NVIDIA precedenti supportate**

```text
python -m pip install torch==2.7.1+cu118 torchaudio==2.7.1+cu118 --index-url https://download.pytorch.org/whl/cu118 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu118_py312.txt
```

Controlla quale interprete e build Torch sta utilizzando il terminale:

```text
python -c "import sys, torch; print(sys.executable); print(torch.__version__); print(torch.cuda.is_available())"
```

Il percorso dell'interprete dovrebbe contenere `.venv`. La disponibilità CUDA dovrebbe essere `True` se usi l'inferenza CUDA su NVIDIA. Le installazioni CPU e DirectML possono mostrare `False` in questo controllo CUDA.

Installa i modelli condivisi per l'estrazione delle caratteristiche vocali e del pitch prima della prima conversione:

```text
python -m pip install huggingface_hub
hf download lj1995/VoiceConversionWebUI --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --local-dir assets/rmvpe
```

> I checkpoint HuBERT generici sono sconsigliati come encoder predefinito per la conversione vocale. Sono addestrati per rappresentare il parlato e possono conservare informazioni sul timbro di chi parla, che possono riaffiorare nell’audio convertito. In RVC usa l’encoder previsto dal modello, per esempio ContentVec se la voce è stata addestrata con quello.

Anche le configurazioni Windows DirectML che utilizzano il modello di estrazione del pitch in formato ONNX necessitano di `hf download lj1995/VoiceConversionWebUI rmvpe.onnx --local-dir assets/rmvpe`. La [guida all'addestramento](training.md) elenca le file aggiuntivi per addestrare un modello.

Esegui `python webui.py` dalla stessa directory. La cartella `assets/hubert_base` deve contenere i file di configurazione del codificatore e del preprocessing, oltre ai pesi del modello. Se hai installato un archivio legacy, mantieni insieme i file in bundle e le convenzioni di denominazione.

## Se la WebUI non si apre

| Cosa vedi | Cosa controllare prima |
| --- | --- |
| Nessuna scheda del browser | Leggi le ultime righe nel terminale e copia l'URL locale effettivo. Se la porta predefinita è occupata, una build può sceglierne un'altra. |
| Il launcher si apre e si chiude immediatamente | Eseguilo da un prompt dei comandi esistente all'interno della cartella estratta in modo da poter leggere il primo errore. Controlla che l'estrazione sia terminata prima di modificare le dipendenze. |
| `ModuleNotFoundError` su un'installazione sorgente | Conferma di aver eseguito l'avvio dall'ambiente virtuale utilizzato per l'installazione. Completa l'installazione delle dipendenze per la tua configurazione. |
| CUDA non è disponibile su una configurazione NVIDIA | Controlla insieme il modello della GPU, i driver e la versione di PyTorch. Un sistema RTX serie 50 necessita della build corrispondente. |
| HuBERT, RMVPE o FFmpeg mancanti | Controlla le cartelle delle risorse e i percorsi eseguibili sopra. Riprova con un semplice WAV locale dopo aver corretto il file mancante. |

Quando si apre l'interfaccia, continua con [la tua prima conversione di file](inference.md).
