---
label: "Installazione e aggiornamenti"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
description: "YuneVoix è un'applicazione portatile per Windows: non installa nulla nel sistema e tutte le impostazioni, le voci, i log e le licenze restano accanto a..."
---
# Installare e aggiornare YuneVoix

[Scarica su Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix è un'applicazione portatile per Windows: non installa nulla nel sistema e tutte le impostazioni, le voci, i log e le licenze restano accanto a `YuneVoix.exe`.

## 1. Scarica il pacchetto giusto (v0.7.1)

1. Scarica la build **v0.7.1** adatta alla tua scheda grafica ed edizione da [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (per **PREMIUM**, l'attivazione richiede un file `license.yvl` ottenuto privatamente via [Ko-fi](https://ko-fi.com/yunevoix) o DM):
   - **BASIC (Gratuita)**:
     - [Scarica YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) (~8,42 GB) - per GPU GeForce RTX / CUDA.
     - [Scarica YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) (~6,74 GB) - per GPU Radeon RX 7000+.
   - **PREMIUM** *(richiede `license.yvl`)*:
     - [Scarica YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) (~9,88 GB)
     - [Scarica YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) (~8,20 GB)
   > **Importante**: le build NVIDIA e AMD sono separate e non intercambiabili.
2. Annota la password dell'archivio: **`yunevoix`** (oppure quella ricevuta con il download).

## 2. Estrai l'archivio

L'archivio ZIP è cifrato con **AES-256**, quindi Esplora File di Windows non riesce ad aprirlo (lo segnalerà come non valido).

1. Installa o apri **7-Zip** (`7-zip.org`) o **WinRAR**.
2. Estrai l'archivio usando la password `yunevoix` in una cartella locale scrivibile, ad esempio `D:\YuneVoix`.
   - **Non** estrarre in `Program Files` né in `OneDrive`.

## 3. Primo avvio e SmartScreen

1. Apri la cartella estratta ed esegui `YuneVoix.exe`.
2. Poiché il programma non è ancora firmato digitalmente, Windows SmartScreen potrebbe mostrare *"Windows ha protetto il PC"*. Clicca **Ulteriori informazioni → Esegui comunque**.
   - Se l'antivirus mette in quarantena un file, aggiungi la cartella `YuneVoix` alle eccezioni.
3. **Attendi la preparazione iniziale del motore**:
   - **NVIDIA**: qualche minuto al primo avvio.
   - **AMD**: dalla v0.7.1 usa **DirectML** sulla scheda dedicata per impostazione predefinita. Solo se cambi `Settings → General → "AMD graphics engine"` su **MIGraphX (sperimentale)** la prima preparazione può richiedere **10–30 minuti** (Windows può anche scaricare AMD MIGraphX via Windows Update).
   - Dopo il primo avvio, la modalità **LIVE** parte in circa **10 secondi**.
4. Puoi cambiare la lingua dell'interfaccia in alto nella finestra (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Aggiornamento o passaggio BASIC → PREMIUM

Licenze, voci e impostazioni della **v0.6.0 / v0.7.0** continuano a funzionare nella **v0.7.1**. Per aggiornare a una nuova versione o passare da BASIC a PREMIUM mantenendo voci e impostazioni:

1. Estrai la nuova versione in una **nuova** cartella (senza sovrascrivere subito quella vecchia).
2. Copia questi file/cartelle dalla vecchia cartella YuneVoix a quella nuova:
   - `models\yune\voices` (le tue voci salvate)
   - `settings.json` e `yune.json` (le tue impostazioni)
   - `license.yvl` (per PREMIUM)
3. Avvia il nuovo `YuneVoix.exe` e verifica che tutto funzioni prima di eliminare la vecchia cartella.

Per disinstallare completamente YuneVoix, basta eliminare la sua cartella.
