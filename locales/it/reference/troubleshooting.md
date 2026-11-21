---
label: "🩺 Risoluzione dei problemi"
order: 95
permalink: /troubleshooting/
description: "Risoluzione problemi RVC passo passo per principianti ed esperti: errori Windows/avvio, GPU/CUDA/DirectML, modelli, training, microfono live e Colab/Kaggle."
---
# Risoluzione dei problemi RVC

[Scarica Ilaria RVC 2.4.7 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

!!!tip
**Nuovo su RVC? Segui queste 4 regole prima di tutto:**
1. **Usa una cartella corta e semplice** come `C:\RVC` o `D:\IlariaRVC`. Non mettere mai il programma dentro `OneDrive`, `Programmi` (`Program Files`) o cartelle con spazi, accenti o emoji.
2. **Estrai sempre tutto lo ZIP** prima di aprire qualsiasi file. Non avviare mai i file `.bat` direttamente da WinRAR, 7-Zip o dall'anteprima ZIP di Windows.
3. **Non chiudere mai la finestra nera del terminale.** Quella finestra fa funzionare il programma e stampa il vero errore se qualcosa si blocca.
4. **Fai prima un test con un file `.wav` pulito da 10 secondi.** Se il programma va in crash, copia il **primo** errore che appare nella console. Se funziona ma suona male, cambia **un'impostazione alla volta** sullo stesso file di test.
!!!

## Trova subito il tuo problema

| Cosa sta succedendo? | Causa più probabile | Dove guardare |
| --- | --- | --- |
| La finestra nera si apre e si chiude in 1 secondo | Avviato dentro lo ZIP, bloccato dall'antivirus o runtime mancante | [1. Avvio, Windows, Antivirus e Download](#1-avvio-windows-antivirus-e-download) |
| Il browser dice "Impossibile raggiungere il sito" o pagina bianca | App crashata all'avvio, porta sbagliata o VPN/proxy su `127.0.0.1` | [1. Avvio, Windows, Antivirus e Download](#1-avvio-windows-antivirus-e-download) |
| L'app è lentissima oppure dice `CUDA out of memory` | Sta usando la CPU invece della GPU, HAGS di Windows è attivo o il batch/audio è troppo grande | [2. GPU, CUDA, AMD/Intel e Memoria](#2-gpu-cuda-amdintel-e-memoria) |
| Il modello non appare o non si carica (`.pth` / `.index`) | Non hai cliccato Aggiorna, ZIP non estratto, download corrotto o file sbagliato | [3. Modelli, Checkpoint e Index](#3-modelli-checkpoint-e-index) |
| La voce sembra uno scoiattolo, un mostro, un robot o la tua voce originale | Pitch (Transpose) sbagliato, audio sporco o Pitch Extractor errato | [4. Qualità della voce, Pitch e File Audio](#4-qualità-della-voce-pitch-e-file-audio) |
| Il training si ferma, crasha o esporta una voce muta | Clip vuota o silenziosa nel dataset, troppi worker CPU o `Fresh Training` lasciato attivo | [5. Preprocessing Dataset e Training](#5-preprocessing-dataset-e-training) |
| Il microfono ha ritardo, scatti, eco o Discord non ti sente | Sample rate diversi (`44100` vs `48000 Hz`), cavo virtuale sbagliato o Krisp | [6. Voice Changer Live, Microfono e Discord](#6-voice-changer-live-microfono-e-discord) |
| Google Colab o Kaggle fallisce o si disconnette | Acceleratore GPU spento, quota finita o sessione scaduta | [7. Notebook Cloud (Colab e Kaggle)](#7-notebook-cloud-colab-e-kaggle) |

## Test base semplice in 5 passi

Se tutto suona male o non sai quale opzione abbia rovinato l'audio, riparti da un test pulito:

1. **Prepara una clip pulita:** Registra 10-20 secondi di una sola voce che parla chiaramente in una stanza silenziosa (niente musica, niente eco). Salvala come `.wav` standard in una cartella semplice come `C:\RVC\test.wav`.
2. **Scegli un modello affidabile:** Seleziona un modello `.pth` che sai già funzionare. Per il primo test lascia spento il file `.index` (`Index Rate = 0`).
3. **Usa impostazioni sicure:**
   - **Pitch / Transpose:** `0` (stesso genere), `+12` (da uomo a donna), `-12` (da donna a uomo).
   - **Pitch Extractor:** `rmvpe` (miglior equilibrio tra velocità e qualità).
   - **Effetti / pulizia extra:** Tutti **SPENTI**.
4. **Converti e ascolta:** Salva il risultato in una cartella locale normale (non `OneDrive`). Se il player nel browser resta muto, scarica il file e aprilo con VLC o Windows Media Player.
5. **Cambia una cosa alla volta:** Quando il test pulito funziona, attiva il file `.index` (parti da `0.5` - `0.75`) oppure regola il Pitch di `1` o `2` semitoni.

---

## Errori noti e soluzioni passo passo

### 1. Avvio, Windows, Antivirus e Download

| Problema o Errore | Cosa significa (in parole semplici) | Come risolverlo |
| --- | --- | --- |
| **La finestra nera si apre e si chiude subito** | Hai avviato il file dentro l'anteprima ZIP oppure Python ha dato errore subito all'avvio. | 1. Fai tasto destro sullo `.zip` ed estrai tutta la cartella prima.<br>2. In Ilaria RVC, avvia `RUN_ILARIA_RVC_LOGS.bat` invece del launcher normale così la finestra resta aperta e mostra l'errore. |
| **Antivirus / Windows Defender segnala `.bat`, `.exe` o `.dll`** | I pacchetti AI portatili contengono launcher non firmati o binari Python/PyTorch che possono generare falsi positivi. | 1. **Non disattivare mai l'antivirus globalmente** e non aggiungere esclusioni su intere cartelle.<br>2. Verifica la fonte ufficiale (GitHub Releases / Hugging Face) e controlla hash SHA-256 o firma digitale.<br>3. Apri **Sicurezza di Windows → Protezione da virus e minacce → Cronologia protezione** (mantiene gli eventi per 14 giorni) per ispezionare il file esatto.<br>4. Se è un falso positivo su un download ufficiale, preferisci riscaricare/riestrarre dalla fonte verificata; se il file è sospetto o sconosciuto, **fermati subito** e chiedi supporto. |
| `WinError 10048` / `Address already in use` / porta occupata | Un'altra copia di RVC o un'altra app sta già usando quella porta (`6969` o `7865`). | Chiudi tutte le finestre nere aperte (o termina `python.exe` da **Gestione attività**), poi avvia l'app una sola volta. |
| `[WinError 3] Impossibile trovare il percorso specificato` / `[WinError 206]` | Windows si blocca se il percorso supera 260 caratteri o contiene spazi, accenti o simboli (`()`, `[]`). | Sposta app e file audio in una cartella corta come `C:\RVC\`. Rinomina cartelle e file `.wav` usando solo lettere, numeri e `_`. |
| `[WinError 2] Impossibile trovare il file specificato` (caricando/salvando audio) | Manca `ffmpeg.exe` o `ffprobe.exe` (il programma che legge i file audio). | Controlla che `ffmpeg.exe` sia dentro la cartella dell'app (se Defender l'ha tolto, riestrai lo ZIP). Su installazioni Python manuali, installa FFmpeg e aggiungilo al `PATH` di Windows, poi riavvia il terminale. |
| `PermissionError: [Errno 13]` / `[WinError 5] Accesso negato` | Windows blocca la scrittura in `Program Files`, `OneDrive` o su un file aperto in un altro programma. | Sposta l'app fuori da `Program Files` e `OneDrive` in `C:\RVC\`. Chiudi eventuali player o editor che stanno tenendo aperto il file audio. |
| `Expecting value: line 1 column 1` o pagina bianca nel browser | L'app è crashata prima di avviarsi, hai aperto la porta sbagliata o una VPN/proxy blocca le connessioni locali. | Leggi il **primo** errore nella finestra nera. Controlla l'indirizzo esatto stampato lì (`127.0.0.1:6969` per Ilaria RVC, `127.0.0.1:7865` per Gradio/Deiteris). Disattiva VPN/proxy per `localhost` e `127.0.0.1`. |
| L'archivio diviso non si estrae (`.zip.001`, `.zip.002`) | L'estrattore di Windows non apre gli archivi in più parti, oppure manca una parte. | Metti tutte le parti (`.001`, `.002`, ecc.) nella stessa cartella, installa **7-Zip**, fai tasto destro **solo** sul file `.001` e scegli **7-Zip → Estrai qui**. |
| `ModuleNotFoundError: No module named 'fairseq'` | Hai installato manualmente su Python 3.11+ o senza gli strumenti di compilazione C++. | Chi è alle prime armi dovrebbe usare lo ZIP portatile pronto. Per installazioni manuali, usa **Python 3.9 o 3.10** e installa **Microsoft Visual Studio Build Tools** (*Sviluppo di applicazioni desktop con C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / `.dll` mancante | A Windows mancano le librerie Visual C++ richieste dai pacchetti IA Python. | Scarica e installa il pacchetto ufficiale **Microsoft Visual C++ 2015-2022 Redistributable (x64)** dal sito Microsoft, poi riavvia il PC. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | La rete, il firewall o una VPN ha bloccato il download automatico di `hubert_base.pt` o `rmvpe.pt`. | Disattiva temporaneamente VPN o firewall troppo restrittivi, oppure scarica manualmente `hubert_base.pt` e `rmvpe.pt` e mettili in `assets/hubert/` e `assets/rmvpe/`. |

### 2. GPU, CUDA, AMD/Intel e Memoria

| Problema o Errore | Cosa significa (in parole semplici) | Come risolverlo |
| --- | --- | --- |
| **Tutto va lentissimo (usa la CPU invece della GPU)** | L'app non vede la scheda video, oppure hai scaricato una versione solo NVIDIA su una GPU AMD/Intel. | 1. Utenti NVIDIA: verifica che i driver siano installati e che non stia usando la grafica integrata.<br>2. Utenti AMD/Intel: le build CUDA standard non usano la tua GPU. Usa una versione **DirectML** (come YuneVoix, Deiteris DirectML o Mainline DirectML) oppure un notebook cloud. |
| **PC rallentato, VRAM piena o voce live a scatti (Windows 10/11)** | **HAGS** (Hardware-Accelerated GPU Scheduling) gestisce la coda memoria GPU: è sicuro nella maggior parte dei casi, ma su alcune configurazioni AI+giochi può creare contesa. | HAGS **non** è dannoso e non va spento su tutti i PC. Se hai scatti inspiegabili, prova a disattivarlo in **Impostazioni Windows → Sistema → Schermo → Grafica → Impostazioni grafiche avanzate**, riavvia e confronta prima/dopo; se non migliora, riattivalo. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (in conversione) | La memoria della scheda video è finita perché la canzone è troppo lunga o un gioco/browser sta usando VRAM. | Attiva **Split Audio** per brani lunghi, chiudi giochi e schede pesanti del browser (o disattiva l'accelerazione hardware del browser) e disattiva gli effetti audio extra. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (in training) | Il **Batch Size** del training è troppo alto per la tua memoria video. | Abbassa il **Batch Size** un passo alla volta (da `8` a `4`, `2` o `1`). Disattiva "Cache dataset in GPU/VRAM" e chiudi eventuali voice changer live prima di allenare. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available` | La versione di CUDA dell'app non corrisponde alla generazione della tua scheda NVIDIA (es. RTX 50 nuova vs GTX 10 vecchia). | Usa la build corretta: **Ilaria RVC** include **CUDA 12.8** per GTX 16 / RTX 20-50 e scarica in automatico **CUDA 12.6** (`runtime-cu126`) per schede Maxwell/Pascal/Volta. |
| `CUDA driver version is insufficient for CUDA runtime version` | I driver della tua scheda NVIDIA sono troppo vecchi per il motore IA dell'app. | Aggiorna i driver NVIDIA tramite **NVIDIA App / GeForce Experience** o il sito ufficiale NVIDIA, poi riavvia il PC. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | La GPU è andata in crash per overclock/undervolt instabile, surriscaldamento o driver non allineati. | Riporta a zero eventuali overclock o undervolt in MSI Afterburner, aggiorna i driver NVIDIA e riprova. |
| `RuntimeError: expected scalar type Half but found Float` / errore `HalfTensor` | La modalità veloce `FP16` è attiva, ma la tua GPU (serie GTX 10, DirectML o CPU) non la supporta. | Vai nelle Impostazioni e disattiva **FP16** (passa a **FP32**). |
| `OSError: [WinError 1455] Il file di paging è troppo piccolo` | Windows ha finito la Memoria Virtuale (spazio su disco usato come RAM extra) mentre caricava modelli o creava l'index. | Premi il tasto Windows, cerca **Visualizza impostazioni di sistema avanzate → Impostazioni prestazioni → Avanzate → Memoria virtuale → Cambia**, togli la gestione automatica, imposta una dimensione personalizzata (es. Iniziale `16384` MB, Massima `32768` MB), clicca **Imposta** e **riavvia il PC**. |

### 3. Modelli, Checkpoint e Index

| Problema o Errore | Cosa significa (in parole semplici) | Come risolverlo |
| --- | --- | --- |
| **Ho messo il modello nella cartella, perché non appare?** | Non hai cliccato Aggiorna, hai lasciato i file dentro uno `.zip` o li hai messi nella cartella sbagliata. | 1. Estrai lo `.zip` finché non vedi direttamente i file `.pth` e `.index`.<br>2. Metti il `.pth` in `assets/weights/` (o `weights/`) e il `.index` in `logs/` (controlla la cartella esatta della tua app).<br>3. Clicca il pulsante **Refresh / Aggiorna** accanto al menu del modello. |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | Le versioni recenti di PyTorch (2.6+) bloccano per sicurezza i vecchi formati di modelli RVC. | Aggiorna l'app all'ultima versione (es. **Ilaria RVC 2.4.0+** o ultimo **Applio**), che gestisce già il caricamento sicuro. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | Il download del modello si è interrotto, è corrotto o ha salvato una pagina web invece del file vero. | Controlla la dimensione del file: un vero `.pth` RVC pesa di solito **da 40 a oltre 100 MB**. Se pesa pochi KB o 0 KB, eliminalo e riscaricalo. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Hai caricato un checkpoint grezzo di training (`G_*.pth` o `D_*.pth`) invece del modello finale, oppure hai mescolato `v1` e `v2`. | Non copiare mai i file grezzi `G_*.pth` da `logs/` dentro `weights/`. Usa il pulsante **Export** dell'app per creare il `.pth` finale e controlla che `v1` / `v2` e sample rate combacino. |
| **Errore Index / dimensioni sbagliate / crash RAM durante creazione index** | Hai scelto `trained_*.index` invece di `added_*.index`, hai abbinato un index di un'altra voce o il dataset è enorme. | Scegli sempre **`added_*.index`** (mai `trained_*.index`). Se dà ancora errore, imposta **Index Rate** su `0` per testare senza index. Non mescolare mai file `.index` di modelli diversi. |

### 4. Qualità della voce, Pitch e File Audio

| Problema o Errore | Cosa significa (in parole semplici) | Come risolverlo |
| --- | --- | --- |
| **La voce sembra uno scoiattolo o un mostro profondo** | L'impostazione **Pitch (Transpose)** non corrisponde alla distanza tra chi parla e la voce obiettivo. | Usa `0` per stesso genere, `+12` per voce maschile che canta/parla su voce femminile, `-12` per voce femminile su voce maschile. Poi rifinisci di `+1` o `-1`. |
| **La voce è metallica, acquosa, robotica o incomprensibile** | L'audio di partenza ha musica/riverbero, hai scelto il Pitch Extractor sbagliato o l'Embedder non combacia. | 1. Pulisci prima l'audio di partenza con **UVR5** o **MVSep** per togliere musica ed eco.<br>2. Imposta il Pitch Extractor su **`rmvpe`**.<br>3. Assicurati che l'Embedder coincida con quello del training (quasi sempre **`contentvec`**).<br>4. Abbassa **Index Rate** da `1.0` a `0.5` o `0.3`. |
| **Il risultato assomiglia ancora troppo alla mia voce vera** | **Index Rate** è troppo basso, oppure il **Pitch** è rimasto nella tua estensione naturale invece di quella del modello. | Avvicina il Pitch alla voce del modello (`+12` / `-12`), alza leggermente **Index Rate** (`0.6` - `0.75`) o prova un modello più pulito. |
| **Il convertitore non apre il mio file audio** | Il file è in un formato non supportato (es. `.m4a`, `.opus` o `.mp3` corrotto) oppure ha caratteri speciali nel nome. | Converti il file in **`.wav` PCM standard** (44100 Hz o 48000 Hz) e rinominalo in modo semplice, come `input.wav`. |

### 5. Preprocessing Dataset e Training

| Problema o Errore | Cosa significa (in parole semplici) | Come risolverlo |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / zero-size tensor | La cartella del dataset è vuota, contiene clip completamente mute, clip sotto 1 secondo o nomi cartella errati. | Assicurati che la cartella contenga file `.wav` non vuoti (lunghi almeno 2-10 secondi), elimina clip mute o corrotte, usa un percorso senza spazi e crea un nuovo esperimento. |
| `BrokenProcessPool` / il PC si blocca durante il Preprocessing | Troppi thread CPU stanno lavorando insieme e saturano la RAM di sistema. | Abbassa il numero di **thread / worker CPU** nel Preprocessing (es. da `8` a `2` o `4`) e controlla di avere spazio libero su disco. |
| `NaN loss` o il modello esportato è completamente muto | Un file audio corrotto o in clipping nel dataset ha rotto i calcoli, `FP16` è andato in overflow o il pretrain `G/D` non combacia. | Controlla che le clip del dataset non abbiano distorsioni estreme o silenzio assoluto. Usa il **pretrain stock RVC** adatto al tuo sample rate, disattiva `FP16` (usa `FP32`) e riparti con un nuovo training. |
| **Il training non riprende / riparte da Epoch 0** | Hai lasciato attiva l'opzione `Fresh Training`, oppure hai rinominato/spostato file dentro `logs/`. | Lascia intatta tutta la cartella `logs/<nome_esperimento>/`, inserisci esattamente lo stesso **Nome Esperimento**, **Sample Rate** ed **Embedder**, imposta un totale di epoche più alto e disattiva `Fresh Training`. |
| **Il modello suona ovattato, rumoroso o in "overfitting"** | Il modello si è allenato per troppe epoche su un dataset piccolo/sporco e ha memorizzato il fruscio al posto della voce. | Fermati prima (prova i checkpoint ogni 50-100 epoche, es. 200-400 epoche per dataset piccoli) e pulisci sempre gli audio del dataset con **UVR5** o **MVSep** prima del training. |

### 6. Voice Changer Live, Microfono e Discord

| Problema o Errore | Cosa significa (in parole semplici) | Come risolverlo |
| --- | --- | --- |
| **Su Discord o in gioco nessuno sente la voce cambiata** | L'altra app sta ancora ascoltando il microfono vero invece del cavo virtuale, oppure il voice changer non è avviato. | 1. Installa **VB-CABLE** (e riavvia il PC dopo l'installazione).<br>2. Nel voice changer, imposta **Input** = il tuo microfono fisico e **Output** = `CABLE Input (VB-Audio Virtual Cable)`.<br>3. Su **Discord / Gioco**, imposta **Dispositivo di input** = `CABLE Output (VB-Audio Virtual Cable)`. |
| `PortAudioError` / `Invalid sample rate` / il dispositivo audio non si avvia | Microfono, cuffie e VB-CABLE su Windows hanno velocità diverse (`44100 Hz` vs `48000 Hz`), oppure un'altra app ha bloccato il dispositivo. | Apri il **Pannello Audio di Windows (`mmsys.cpl`)**, apri **Proprietà → Avanzate** per Microfono, Cuffie, `CABLE Input` e `CABLE Output`, imposta **tutti su 48000 Hz**, togli la spunta da **Consenti alle applicazioni di assumere il controllo esclusivo** e riavvia l'app. |
| **Scatti, scoppiettii o forte ritardo voce** | La GPU impiega più tempo della durata del blocco audio per elaborarlo. | 1. Alza leggermente **Chunk Size**.<br>2. Usa **RMVPE** o **FCPE** (mai `crepe` full dal vivo).<br>3. Limita gli FPS dei giochi o chiudi app GPU pesanti.<br>4. Facoltativamente prova a disattivare **HAGS** (confronto prima/dopo). |
| **Eco o ti senti doppio in cuffia** | Stai usando le casse (il microfono le riprende) oppure due programmi stanno riproducendo la tua voce insieme. | Usa sempre le **cuffie**. Controlla che **"Ascolta il dispositivo"** su Windows sia **SPENTO** nelle impostazioni di Registrazione, e attiva il Monitor solo dentro il voice changer se ti serve davvero sentirti. |
| **Discord taglia i respiri o la fine delle parole** | Il filtro rumore di Discord scambia le parti finali della voce convertita per rumore di fondo. | Nelle impostazioni **Voce e video** di Discord, disattiva **Soppressione rumore Krisp**, disattiva **Cancellazione eco** e disattiva **Determina automaticamente la sensibilità di input** (regolando la barra a mano). Abbassa anche la soglia VAD / Noise Gate nel voice changer. |

### 7. Notebook Cloud (Colab e Kaggle)

| Problema o Errore | Cosa significa (in parole semplici) | Come risolverlo |
| --- | --- | --- |
| `CUDA not available` / `No GPU found` su Colab o Kaggle | Hai dimenticato di attivare la GPU nelle impostazioni del notebook, oppure hai finito la quota gratuita. | **Colab:** vai su **Runtime → Cambia tipo di runtime → GPU T4**.<br>**Kaggle:** apri la barra destra **Settings → Accelerator → GPU T4 x2** (richiede verifica telefonica). |
| **Download fallito nel notebook (`403` / quota Google Drive o Mega)** | Un link pubblico ha raggiunto il limite giornaliero di download oppure è stato messo privato. | Carica prima dataset o modello su **Hugging Face** o sul tuo Google Drive personale, poi scaricalo da lì dentro il notebook. |
| **Il notebook si disconnette a metà training** | I notebook cloud si chiudono dopo inattività o sessioni lunghe, cancellando i file temporanei. | Salva o sincronizza sempre le cartelle `logs/` e `weights/` su **Google Drive** (o Output di Kaggle), e riprendi dall'ultimo checkpoint `G_*.pth` / `D_*.pth` salvato invece di ricominciare da zero. |

---

## Controlli rapidi per singola app

- **Ilaria RVC:** Estrai tutto lo ZIP in un percorso corto come `C:\IlariaRVC`. Usa `RUN_ILARIA_RVC_LOGS.bat` se si chiude all'avvio, verifica che `127.0.0.1:6969` sia libero e guarda il **primo** errore sopra il messaggio di chiusura.
- **Applio Desktop:** Apri la scheda **Setup** e controlla lo stato del motore. Clicca **Install / Repair** se un controllo è rosso. Per **Gradio**, tieni aperta la finestra della console e copia l'indirizzo `localhost` esatto stampato lì.
- **RVC Mainline / w-okada / Deiteris / TGR:** Scegli il pacchetto giusto tra **CUDA** (NVIDIA) e **DirectML** (AMD/Intel) prima di scaricare. Estrai gli archivi divisi `.zip.001` con 7-Zip solo dopo aver messo tutte le parti nella stessa cartella.

## Come chiedere aiuto

Quando chiedi supporto (ad esempio dalla [pagina contatti di Ilaria RVC](https://ilariarvc.shop/it/contact/)), includi sempre questi 4 dettagli così chi ti aiuta può risolvere al primo colpo:
1. **Nome e versione dell'app** (es. `Ilaria RVC 2.4.0`, `Applio Desktop`, `Deiteris`).
2. **Specifiche del PC:** versione di Windows, modello esatto della GPU (es. `RTX 3060` o `RX 6700 XT`) e backend (`CUDA` / `DirectML` / `CPU`).
3. **La PRIMA riga di errore** dal log della console (nascondi pure il tuo nome utente Windows se serve).
4. **Cosa stavi facendo:** Training (indica sample rate, vocoder, embedder e se era nuovo o resume) oppure Voice Changer Live (indica la catena esatta: `Mic -> App -> VB-CABLE -> Discord`).
