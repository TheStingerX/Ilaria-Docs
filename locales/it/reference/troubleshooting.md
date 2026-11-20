---
label: "🩺 Risoluzione dei problemi"
order: 95
permalink: /troubleshooting/
---
# Risoluzione dei problemi RVC

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
Nuovo su RVC? **Inizia sempre con un WAV da 10 secondi e un solo modello.** Se l'app si chiude, apri il log e copia il **primo** errore. Se funziona ma suona male, riprova sempre sulla stessa clip cambiando un solo parametro alla volta.
!!!

Una diagnosi efficace parte dal primo passaggio che fallisce. Conserva versione dell'app, primo errore esatto e un test riproducibile, applicando una modifica per volta.

## Trova il tuo sintomo

| Sintomo | Primo controllo |
| --- | --- |
| Il launcher si chiude o il browser non si connette | Lascia aperta la console e verifica l'indirizzo locale stampato. |
| Modello assente, non si carica o dà errore di chiavi mancanti | Verifica che sia un file di inferenza esportato e controlla versione RVC ed embedder. |
| Il convertitore non legge il file | Prova un breve WAV PCM in un percorso locale semplice. |
| La conversione funziona solo senza index | Verifica che l'index appartenga esattamente a quel modello ed embedder. |
| Voce metallica, confusa o troppo simile alla tua | Testa più clip pulite e un modello sicuramente funzionante con effetti e retrieval a 0. |
| Il training si blocca o non produce un export valido | Individua la fase fallita e controlla log e cartella dell'esperimento. |
| Errore CUDA o memoria esaurita | Distingui tra GPU non supportata, VRAM piena e RAM / File di paging esauriti. |
| Microfono con ritardo, scatti, silenzio o eco | Testa separatamente microfono fisico, monitoraggio in cuffia, cavo virtuale e app finale. |

## Imposta un test di riferimento

1. Registra 10-20 secondi di un solo parlante con vocali chiare, consonanti come `s` o `f` e una pausa naturale in WAV locale pulito.
2. Scegli un modello di inferenza affidabile compatibile con l'app. Parti con pitch a `0`, estrattore di pitch predefinito, effetti disattivati e retrieval (`index`) a `0`.
3. Converti e salva in una cartella locale scrivibile. Riproduci il file anche fuori dal browser.
4. Ripeti con un secondo modello sicuramente funzionante per capire se il problema è nell'ambiente o nel singolo modello.
5. Riattiva un'opzione per volta salvando il risultato con i parametri usati.

---

## Errori noti e soluzioni esatte

### 1. Errori di Windows, percorsi, Python e Launcher

| Errore / Messaggio | Causa | Come risolvere |
| --- | --- | --- |
| `[WinError 3] The system cannot find the path specified` / `[WinError 206] The filename or extension is too long` | Limite di 260 caratteri di Windows, oppure spazi e simboli speciali nei nomi di cartelle o file. | Sposta l'app e i dataset in un percorso corto alla radice (es. `C:\RVC` o `D:\IlariaRVC`). Rimuovi spazi, `()`, `[]` e caratteri non-ASCII/Unicode dai nomi di cartelle e audio. |
| `[WinError 2] The system cannot find the file specified` (durante lettura/esportazione audio) | `ffmpeg.exe` / `ffprobe.exe` mancanti o non presenti nel `PATH`. | Verifica che `ffmpeg` sia nella cartella dell'app. Se usi un'installazione da sorgente, installa FFmpeg, aggiungilo al `PATH` di sistema e riavvia il terminale. |
| `PermissionError: [Errno 13] Permission denied` / `[WinError 5]` | Scrittura in `Program Files`, `OneDrive`, cartella protetta o file aperto in un altro programma/antivirus. | Estrai l'app in una cartella scrivibile di tua proprietà (non `Program Files` né `OneDrive`), chiudi altri player audio e aggiungi la cartella alle eccezioni dell'antivirus. |
| `ModuleNotFoundError: No module named 'fairseq'` | `fairseq` non compila facilmente su Python 3.11+ o senza strumenti di compilazione C++. | Usa il pacchetto portatile con runtime incluso, oppure ricrea l'ambiente da sorgente con **Python 3.9 o 3.10** installando **Microsoft Visual Studio Build Tools** (*Sviluppo di applicazioni desktop con C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / DLL mancante | Microsoft Visual C++ Redistributable mancante o incompatibile, oppure DLL danneggiata. | Installa o ripara **Microsoft Visual C++ 2015-2022 Redistributable (x64)**. Se la DLL manca fisicamente, riestrai il pacchetto originale. |
| `Expecting value: line 1 column 1` / pagina Gradio bianca | Il server è andato in crash prima di rispondere, oppure un proxy/VPN intercetta `127.0.0.1`. | Lascia aperta la console e leggi il primo traceback Python. Controlla la porta esatta (`127.0.0.1:6969` in Ilaria RVC, `7865` in Gradio/Deiteris) e disattiva eventuali proxy su `localhost` / `127.0.0.1`. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Blocco di rete, VPN o timeout da Hugging Face/GitHub durante il download di `hubert_base.pt` o `rmvpe.pt`. | Disattiva temporaneamente VPN o firewall restrittivi, oppure scarica manualmente `hubert_base.pt` e `rmvpe.pt` mettendoli in `assets/hubert/` e `assets/rmvpe/`. |

### 2. Errori GPU, CUDA, DirectML e Memoria

| Errore / Messaggio | Causa | Come risolvere |
| --- | --- | --- |
| **VRAM che trabocca in RAM / training lentissimo / audio live robotico (Windows 10/11)** | La **Pianificazione GPU con accelerazione hardware (HAGS)** interferisce con l'allocazione VRAM di PyTorch e toglie risorse ai cambia-voce in background. | Vai in **Impostazioni Windows → Sistema → Schermo → Grafica → Impostazioni grafiche avanzate**, disattiva **Pianificazione GPU con accelerazione hardware** e **riavvia il PC**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Inferenza) | File audio troppo lungo o altre app (giochi, browser con accelerazione hardware) occupano VRAM. | Attiva **Split Audio** per brani lunghi, chiudi giochi/browser pesanti, scarica modelli non usati e disattiva il post-processing opzionale. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Training) | Batch size troppo alto per la tua VRAM o caching del dataset in VRAM attivo. | Abbassa **Batch Size** (es. da `8` a `4`, `2` o `1`), disattiva la cache del dataset in VRAM e chiudi eventuali cambia-voce live prima di addestrare. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | Driver/PyTorch incompatibili, overclock/undervolt instabile della GPU o memoria condivisa esaurita. | Aggiorna i driver NVIDIA, rimuovi qualsiasi overclock/undervolt della GPU e verifica la compatibilità CUDA della build PyTorch. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available for execution on the device` | Build non adatta alla generazione della GPU (es. vecchia build CUDA su RTX 50, oppure PyTorch solo CPU). | Usa il runtime giusto: Ilaria RVC include **CUDA 12.8** per GTX 16 / RTX 20-50 e scarica in automatico **CUDA 12.6** (`runtime-cu126`) per Maxwell/Pascal/Volta. GPU AMD/Intel richiedono build DirectML/ROCm o cloud. |
| `RuntimeError: expected scalar type Half but found Float` (o errore `HalfTensor`) | Precisione `FP16` forzata su una GPU/backend che non la supporta (serie GTX 10, DirectML, CPU). | Disattiva **FP16** nelle impostazioni e passa a **FP32** (precisione completa). |
| `OSError: [WinError 1455] The paging file is too small for this operation to complete` | Memoria virtuale di Windows (File di paging) esaurita durante caricamento modelli, creazione index o training. | Apri **Proprietà di sistema → Avanzate → Prestazioni (Impostazioni) → Avanzate → Memoria virtuale**, imposta un File di paging più grande (es. `16384–32768 MB`) e riavvia. |

### 3. Caricamento modelli, Checkpoint, Embedder e Index

| Errore / Messaggio | Causa | Come risolvere |
| --- | --- | --- |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | PyTorch 2.6+ usa `weights_only=True` di default in `torch.load`, bloccando vecchi oggetti fairseq nelle build datate. | Aggiorna all'ultima versione dell'app (es. Ilaria RVC 2.4.0+ o ultimo Applio), che gestisce automaticamente `safe_globals` per `Dictionary`. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | Download del `.pth` interrotto o corrotto, oppure il browser ha salvato una pagina HTML invece del file binario. | Controlla la dimensione del file (un `.pth` RVC valido pesa in genere 40-100+ MB, non pochi KB). Elimina il file corrotto e riscaricalo. |
| `Missing key(s) in state_dict` / `RuntimeError: Sizes of tensors must match` | Hai caricato un checkpoint di training (`G_*.pth` o `D_*.pth` da `logs/`) invece dell'export di inferenza, oppure hai mischiato `v1` (256-d) e `v2` (768-d). | Usa lo strumento **Export** per generare un `.pth` da inferenza (non copiare i `G_*.pth` grezzi in `models/`) e verifica che versione RVC e sample rate coincidano. |
| Pronuncia rovinata o la tua voce originale resta molto presente | **Embedder errato** tra training e inferenza, oppure uso di un HuBERT generico al posto di `contentvec`. | Usa lo stesso identico embedder usato in training (quasi sempre **`contentvec`**). Testa prima con index/retrieval a `0`. |
| Errore sull'index / dimensioni incompatibili / crash RAM creando l'index | Uso di `trained_*.index` invece di `added_*.index`, index di un altro modello/embedder, o troppe feature per la RAM di sistema. | Seleziona sempre `added_*.index` (oppure metti retrieval a `0` per testare senza index). Non mischiare mai index tra modelli o versioni diverse. |

### 4. Preprocessing dataset, Estrazione feature e Training

| Errore / Messaggio | Causa | Come risolvere |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / tensore di dimensione zero | Cartella dataset vuota, clip completamente silenziosa, clip sotto 1 secondo, o spazi/Unicode nel percorso. | Usa un percorso semplice senza spazi, rimuovi clip mute o danneggiate, assicurati che siano WAV validi e rifai il preprocessing in un nuovo esperimento. |
| `BrokenProcessPool` / i worker di preprocessing muoiono | Troppi worker CPU paralleli esauriscono la RAM di sistema. | Riduci il numero di thread/worker CPU nelle impostazioni di preprocessing e libera spazio su disco. |
| `NaN loss` o modello esportato completamente muto | Audio corrotto o in clipping nel dataset, coppia pretrain `G`/`D` incompatibile, o overflow numerico in `FP16`. | Controlla che le clip non siano distorte/mute, verifica che il pretrain `G/D` corrisponda a sample rate e vocoder (oppure usa lo stock RVC) e prova un run in `FP32`. |
| Impossibile riprendere il training o riparte dall'epoca 0 | `Fresh Training` lasciato attivo, oppure `G_*.pth` / `D_*.pth` / `config.json` spostati o rinominati. | Mantieni intatta la cartella `logs/<esperimento>/`, usa lo stesso nome esperimento, sample rate ed embedder, imposta un numero di epoche totali maggiore e lascia `Fresh Training` **disattivato**. |

### 5. Cambia-voce live, PortAudio e Routing audio

| Errore / Messaggio | Causa | Come risolvere |
| --- | --- | --- |
| `PortAudioError` / `Invalid sample rate` / dispositivo non disponibile | I dispositivi audio Windows hanno frequenze di campionamento diverse o un'altra app usa la modalità esclusiva. | Nel **Pannello di controllo Audio di Windows**, imposta microfono fisico, cuffie ed endpoint `VB-CABLE` tutti su **48000 Hz**, disattiva la **modalità esclusiva** e riavvia dopo aver installato cavi virtuali. |
| Scatti robotici, crepitii o ritardo elevato | Il tempo di inferenza GPU supera la durata del Chunk, HAGS è attivo, o giochi/app pesanti saturano la GPU. | Aumenta il **Chunk Size**, usa **RMVPE** o **FCPE** al posto di Crepe pesante, disattiva **HAGS** su Windows e chiudi app GPU concorrenti. |
| Eco o doppia voce in cuffia | Casse accese invece delle cuffie, oppure doppio monitoraggio ("Ascolta il dispositivo" di Windows + monitor dell'app). | Indossa sempre le **cuffie** e attiva il monitoraggio in **un solo punto**. |
| Respiri o finali di parola tagliati su Discord | **Soppressione rumore (Krisp)** o **sensibilità automatica** di Discord li filtrano, oppure Noise Gate/VAD troppo alti. | Disattiva Krisp e sensibilità automatica nelle Impostazioni Vocali di Discord per il microfono virtuale e abbassa le soglie VAD / Noise Gate nell'app. |

---

## Controlli rapidi per singola app

- **Ilaria RVC:** Estrai il pacchetto completo, apri la cartella ed esegui `RUN_ILARIA_RVC_LOGS.bat`. Controlla la prima eccezione sopra l'ultimo messaggio di chiusura. Verifica che Windows veda la GPU NVIDIA e che `127.0.0.1:6969` non sia bloccata o già occupata.
- **Applio Desktop:** Apri **Setup** e controlla lo stato del motore; usa **Install / Repair** se un controllo fallisce. Con **Gradio**, lascia aperta la console di avvio e usa l'indirizzo `localhost` stampato lì.
- **RVC WebUI (Mainline) / w-okada / Deiteris / TGR:** Abbina correttamente la build CUDA o DirectML alla tua GPU. Per archivi divisi `.zip.001`, assicurati di avere tutte le parti nella stessa cartella prima di estrarre.

## Segnalare un problema

Quando chiedi supporto (ad esempio tramite la [pagina contatti](https://ilariarvc.shop/en/contact/) per Ilaria RVC), includi:
1. Nome dell'app, edizione e versione (es. `Ilaria RVC 2.4.0`).
2. Sistema operativo, modello esatto di GPU e backend (`CUDA` / `DirectML` / `CPU`).
3. La **prima riga di errore** con le righe di log vicine (rimuovendo percorsi personali o dati sensibili).
4. Per il training: fase fallita, sample rate, vocoder, embedder e se era un nuovo run o un resume. Per il live: catena completa dei dispositivi (`Mic → App → Cavo Virtuale → App destinazione`).
