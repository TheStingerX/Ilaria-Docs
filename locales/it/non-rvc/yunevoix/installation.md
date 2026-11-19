---
label: "Installazione e aggiornamenti"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
---
# Installare e aggiornare YuneVoix

[Scarica su Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix è un'applicazione portatile per Windows: non installa nulla nel sistema e tutte le impostazioni, le voci, i log e le licenze restano accanto a `YuneVoix.exe`.

## 1. Scarica il pacchetto giusto

1. Apri il [repository Hugging Face di YUNE](https://huggingface.co/JohnBlvck/YUNE/tree/main) (per **PREMIUM**, l'accesso viene fornito privatamente via Ko-fi o DM).
2. Scarica la build corrispondente alla tua scheda grafica:
   - Pacchetto **NVIDIA** per GPU GeForce RTX / CUDA.
   - Pacchetto **AMD** per GPU Radeon RX 7000+.
   > **Importante**: le build NVIDIA e AMD sono separate e non intercambiabili.
3. Annota la password dell'archivio: **`yunevoix`** (oppure quella ricevuta con il download).

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
   - **AMD (MIGraphX)**: fino a **10–30 minuti** al primo avvio (Windows può anche scaricare AMD MIGraphX tramite Windows Update).
   - Dopo il primo avvio, la modalità **LIVE** parte in circa **10 secondi**.
4. Puoi cambiare la lingua dell'interfaccia in alto nella finestra (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Aggiornamento o passaggio BASIC → PREMIUM

Per aggiornare a una nuova versione o passare da BASIC a PREMIUM mantenendo voci e impostazioni:

1. Estrai la nuova versione in una **nuova** cartella (senza sovrascrivere subito quella vecchia).
2. Copia questi file/cartelle dalla vecchia cartella YuneVoix a quella nuova:
   - `models\yune\voices` (le tue voci salvate)
   - `settings.json` e `yune.json` (le tue impostazioni)
   - `license.yvl` (per PREMIUM)
3. Avvia il nuovo `YuneVoix.exe` e verifica che tutto funzioni prima di eliminare la vecchia cartella.

Per disinstallare completamente YuneVoix, basta eliminare la sua cartella.
