---
label: "Installazione e aggiornamento"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
description: "YuneVoix è un'applicazione portatile per Windows: non installa nulla nel sistema e tutte le impostazioni, voci, log e licenze restano accanto a YuneVoix.exe."
---
# Installare e aggiornare YuneVoix

[Download su Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix è un'applicazione portatile per Windows: non installa nulla nel sistema e tutte le impostazioni, voci, log e licenze vivono accanto a `YuneVoix.exe`.

## 1. Identifica la tua GPU e scarica il pacchetto corretto (v0.7.1)

1. Controlla la tua scheda grafica dedicata in **Gestione attività → Prestazioni → GPU** (NVIDIA GeForce RTX vs. AMD Radeon RX 7000+).
2. Scarica la build **v0.7.1** corrispondente da [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (per **PREMIUM**, l'attivazione richiede un file `license.yvl` ottenuto privatamente via [Ko-fi](https://ko-fi.com/yunevoix) o DM):
   - **BASIC (Gratuita)**:
     - [Scarica YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) - per GPU NVIDIA (8 GB+ VRAM, 12 GB consigliati).
     - [Scarica YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) - per GPU AMD Radeon RX 7000+ (12 GB+ VRAM, 16 GB consigliati).
   - **PREMIUM** *(richiede `license.yvl`)*:
     - [Scarica YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) - per GPU NVIDIA.
     - [Scarica YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) - per GPU AMD Radeon RX 7000+.
   > **Importante:** I pacchetti NVIDIA e AMD sono separati e non intercambiabili. **Non** spostare o eliminare le cartelle incluse accanto a `YuneVoix.exe`:
   > - **Pacchetto NVIDIA:** mantieni **`models`** e **`cuda`** accanto a `YuneVoix.exe`.
   > - **Pacchetto AMD:** mantieni **`models`** e **`cache`** accanto a `YuneVoix.exe`.
3. Prendi nota della password dell'archivio pubblicata con la release: **`yunevoix`** (mantenuta qui come documentato dal responsabile del progetto).

## 2. Estrai l'archivio

L'archivio ZIP è cifrato con **AES-256**, che Esplora File di Windows non riesce ad aprire (segnala l'archivio come non valido).

1. Installa o apri **7-Zip** (`7-zip.org`) oppure **WinRAR**.
2. Estrai l'intero archivio usando la password `yunevoix` in una cartella locale scrivibile come `D:\YuneVoix`.
   - **Non** estrarre dentro `Program Files` o `OneDrive`.

## 3. Primo avvio, SmartScreen e controllo motore

1. Apri la cartella estratta ed esegui `YuneVoix.exe`.
2. Verifica che l'archivio provenga dal repository ufficiale [Hugging Face YUNE](https://huggingface.co/JohnBlvck/YUNE/tree/main). Poiché l'eseguibile non è ancora firmato digitalmente, Windows SmartScreen può mostrare *"Windows ha protetto il PC"*. Clicca **Ulteriori informazioni → Esegui comunque** dopo aver verificato la provenienza.
   - Se il tuo antivirus segnala un file, controlla **Sicurezza di Windows → Cronologia protezione** e verifica l'origine del file prima di consentirlo; **non** disattivare Windows Defender o l'antivirus globalmente.
3. **Attendi la preparazione iniziale**:
   - Il primo avvio estrae le librerie una volta sola e richiede più tempo.
   - **AMD:** usa **DirectML** sulla GPU dedicata di default nella v0.7.1 (nessun download Windows Update né compilazione iniziale). Solo se passi a **MIGraphX** sperimentale in `Settings → General → "AMD graphics engine"` (dopo riavvio) la prima compilazione può richiedere **10–30 minuti**.
   - Controlla la riga di stato LIVE o esegui `YuneVoix.exe --check` (`check.txt`) per verificare motore grafico e GPU attivi.
4. Puoi cambiare la lingua dell'interfaccia in alto nella finestra (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Aggiornamento o passaggio da BASIC a PREMIUM

Licenze, voci e impostazioni della **v0.6.0 / v0.7.0** continuano a funzionare nella **v0.7.1**. Per aggiornare senza perdere voci e impostazioni:

1. Estrai la nuova release in una **nuova** cartella (non sovrascrivere subito la vecchia).
2. Copia questi file/cartelle dalla vecchia cartella YuneVoix nella nuova:
   - `models\yune\voices` (le tue voci salvate)
   - `settings.json` e `yune.json` (la tua configurazione)
   - `my_voice.yvoice`, se presente (il campione della tua voce usato da **FlowEdit 3+1** in LIVE)
   - `license.yvl` (per PREMIUM)
3. Avvia il nuovo `YuneVoix.exe` e verifica che tutto funzioni prima di eliminare la vecchia cartella.

> **Aggiornamento dalla v0.6.0:** Se avevi impostato un campione della tua voce prima della v0.7.0, selezionalo di nuovo una volta in `Settings → Voice & Timbre → "Sample of your voice…"`; altrimenti **FlowEdit 3+1** ripiega su **Learned 4 steps** in LIVE. Questo è necessario perché dalla v0.7.0 il riferimento va ricollegato a `my_voice.yvoice` per FlowEdit e Timbre strength.

Per disinstallare completamente YuneVoix, elimina semplicemente la sua cartella.

Prossimo passo: [Voice Bank e uso LIVE](usage.md).
