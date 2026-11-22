---
label: "Installa e utilizza RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue è un cambia voce desktop Windows basato sulla GUI in tempo reale di RVC WebUI (Mainline - Original RVC)."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

**RVC Blue (RVC-Realtime-GUI)** è un client desktop Windows per la conversione vocale RVC in tempo reale a bassa latenza. Basato sulla GUI realtime di RVC WebUI, integra le ottimizzazioni recenti dell'inferenza dal vivo, il **CUDA Graph warm-up** (per ridurre l'overhead della GPU a regime) e i fix alla riduzione rumore su ingresso e uscita.

- **Solo inferenza**: RVC Blue non addestra modelli. Addestra la voce su **Ilaria RVC** (o un altro trainer) e importa qui i file `.pth` e `.index` esportati per l'inferenza.
- **Tre sorgenti di ingresso**: **Microfono** dal vivo, **File audio** (tramite FFmpeg incluso) e **Audio di un'applicazione Windows** (cattura per processo).
- **Voce inclusa**: include il modello **Sakura**, una voce naturale di uso quotidiano (uso commerciale consentito) per provare subito l'app.

## 1. Scegli la build e installa

Ogni pacchetto su Hugging Face è autonomo e include runtime Python, PyTorch/CUDA, FFmpeg, asset HuBERT/RMVPE/FCPE e il set di modelli di base. Non serve installare separatamente Python, CUDA Toolkit o FFmpeg.

| Build | Launcher | Hardware NVIDIA consigliato |
| --- | --- | --- |
| **CUDA 12.8** *(Standard)* | `RVC-Realtime-GUI-CUDA128.bat` | GPU NVIDIA attuali, inclusa serie RTX 50 (Blackwell) |
| **CUDA 11.8** *(Compatibilità)* | Launcher CUDA 11.8 incluso | GPU NVIDIA più datate o sistemi con ambiente/driver CUDA 11.8 |

1. Controlla il modello della tua GPU NVIDIA in **Gestione attività → Prestazioni → GPU**.
2. Apri [RVC Blue su Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) e scarica il pacchetto adatto.
3. Estrai l'intero archivio in una **cartella locale breve e scrivibile**, ad esempio `C:\RVC-Realtime-GUI`. Non avviare l'app da dentro lo ZIP ed evita `Programmi` o cartelle sincronizzate con OneDrive.
4. Avvia `RVC-Realtime-GUI-CUDA128.bat` (oppure il launcher CUDA 11.8).
5. **Attendi il completamento del primo avvio**: la prima apertura richiede più tempo per inizializzare asset di inferenza, runtime CUDA e warm-up CUDA Graph. Aspetta che compaia la finestra prima di pensare che si sia bloccato.

## 2. Aggiungi i tuoi modelli vocali

Crea una sottocartella per ogni voce dentro `models/` nella cartella estratta di RVC Blue:

```text
models/
  MyVoice/
    MyVoice.pth
    added_MyVoice.index
    preview.png
```

- **Nome della cartella**: è il nome mostrato nella galleria dei modelli.
- **File modello richiesto**: usa un **`.pth` di inferenza**, non un checkpoint di training (`G_*.pth` / `D_*.pth`).
- **Index e anteprima opzionali**: inserisci nella stessa cartella il relativo file `added_*.index` e un'immagine `.png`, `.jpg` o `.jpeg` per mostrare automaticamente l'anteprima.
- **Ricarica**: clicca su **Reload** nell'app (o riavvia RVC Blue) dopo aver aggiunto o sostituito un modello. Le impostazioni generali per modello vengono salvate automaticamente.

## 3. Configura i dispositivi audio e fai un test locale

RVC Blue permette di scegliere **Input** (ingresso), **Output** (uscita) e **Monitor** in modo indipendente:

- **Input**: il microfono fisico (oppure un file audio o un'applicazione Windows).
- **Output**: dove viene inviata la voce convertita (le cuffie per il test locale, oppure un cavo virtuale per chiamate e giochi).
- **Monitor**: seconda uscita opzionale per riascoltarti mentre **Output** invia l'audio a Discord o OBS.

### WASAPI vs ASIO

- **Senza scheda audio ASIO**: inizia con **WASAPI**.
- **Con driver ASIO nativo**: RVC Blue parte con la dimensione del buffer consigliata dal driver. Puoi anche combinare ingresso/monitor ASIO con uscita WASAPI, oppure usare coppie di canali diverse sullo stesso driver ASIO.

### Primo test in locale

1. Imposta **Input** sul tuo microfono fisico.
2. Imposta **Output** sulle tue cuffie (lascia **Monitor** spento per ora, così eviti di sentire la voce doppia).
3. Seleziona **Sakura** (o il tuo modello) e lascia buffer e pitch ai valori predefiniti.
4. Premi **Start**, pronuncia una breve frase e fai una pausa per verificare latenza, chiarezza ed eventuali rumori di fondo.

## 4. Invia l'audio a Discord, OBS o a un gioco

> **Correct Audio Routing**
>
> **1. Nel Voice Changer**
> - **Input Device:** Il tuo microfono fisico.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. In Discord, Giochi, OBS o altre applicazioni**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Le tue cuffie o altoparlanti.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> L'audio in arrivo da Discord, dal gioco o da altre app deve andare direttamente alle **cuffie** (mai di nuovo nel cavo virtuale).
>
> - **VAC vs. VB-CABLE:** `Line 1` è il nome usato da **VAC (Virtual Audio Cable)**, non un nome universale per tutti i cavi virtuali. Con **VB-CABLE**, imposta Output del Voice Changer su **`CABLE Input`** e Input di Discord / gioco su **`CABLE Output`**.
> - **Monitoraggio:** Ascoltare la propria voce convertita in cuffia è una funzione separata opzionale da attivare solo quando serve. Evita percorsi audio duplicati, eco e loopback.

Per usare la voce convertita in un'altra app, collega RVC Blue tramite un cavo audio virtuale (**VAC Lite** o **VB-CABLE**):

1. Imposta **Output** di RVC Blue sul dispositivo di riproduzione del cavo virtuale (es. `CABLE Input` o `Line 1`).
2. Se vuoi riascoltarti, imposta **Monitor** di RVC Blue sulle tue cuffie.
3. In Discord, OBS o nel gioco, seleziona il dispositivo di registrazione del cavo virtuale (es. `CABLE Output` o `Line 1`) come **Microfono**.
4. Mantieni l'audio di gioco o chiamata sulle tue cuffie.
5. Fai una breve registrazione di prova nell'app di destinazione prima di entrare in chiamata.

Per installazione e nomi dei dispositivi del cavo virtuale, consulta la [guida al cavo virtuale](../vonovox/live-audio.md).

## 5. Input da file, cattura applicazioni e registrazione WAV

- **Input da file audio**: imposta la sorgente su **File**, scegli un breve file WAV o audio (decodificato con FFmpeg incluso) e verifica i dispositivi **Output** e **Monitor** prima di premere **Start**. Le impostazioni di uscita e monitor vengono mantenute tra una prova e l'altra.
- **Cattura audio da applicazione Windows**: imposta la sorgente su **Application**, clicca su **Refresh** e seleziona un'app in esecuzione. Usa la cattura per processo di Windows. Le app già rilevate restano memorizzate e si riconnettono al riavvio. L'audio inviato direttamente via ASIO fuori dal normale percorso Windows potrebbe non essere catturato e l'audio originale dell'app **non viene silenziato automaticamente** (abbassalo o silenzialo a parte se non vuoi sentirlo).
- **Registrazione WAV**: i controlli integrati consentono di salvare file WAV con **input/output separati**, **mixati** oppure su **canali L/R separati**.

## 6. Risoluzione dei problemi comuni

| Sintomo | Cosa controllare |
| --- | --- |
| L'app sembra bloccata al primo avvio | Attendi 1-2 minuti per l'inizializzazione iniziale del runtime CUDA e del warm-up CUDA Graph. |
| Il programma si chiude subito all'avvio | Avvia il file `.bat` dalla cartella estratta (es. `C:\RVC-Realtime-GUI`) e leggi l'errore in console. Verifica che i driver NVIDIA siano compatibili con CUDA 12.8 o 11.8. |
| Una nuova voce non compare | Controlla che il modello sia in `models/<NomeVoce>/` e sia un `.pth` di inferenza (non un checkpoint di training), poi clicca su **Reload**. |
| In cuffia funziona, ma Discord o il gioco non ricevono audio | Verifica che **Output** in RVC Blue sia il dispositivo di riproduzione del cavo virtuale e che Discord/gioco usi il corrispondente dispositivo di registrazione come microfono. |
| Si sentono due voci | Disattiva **Monitor** se **Output** è già sulle cuffie, oppure silenzia l'app sorgente quando usi la cattura applicazioni. |
| L'audio scoppietta o si interrompe sotto carico | Ripristina il buffer predefinito o aumentalo leggermente, poi riprova con gioco o chiamata aperti. |

[Sorgente del progetto e note di rilascio](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
