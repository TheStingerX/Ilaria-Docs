---
label: "Uso e risoluzione dei problemi"
icon: ":musical_note:"
order: 98
permalink: /ilaria-rvc/aicovergen/usage/
---

# AICoverGen · Uso e risoluzione dei problemi

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Software datato · Sconsigliato
**AICoverGen** è una pipeline datata per cover con RVC v2, non più mantenuta attivamente e basata su dipendenze dell’era Python 3.9+. Per una nuova installazione, scegli un’app ancora mantenuta. [Guide per app](../../app-guides.md)
!!!

## Aggiungere modelli vocali RVC v2

AICoverGen carica solo modelli di inferenza **RVC v2** esportati (`rvc_models/`):

- **Download model:** incolla un URL diretto a un archivio contenente il `.pth` del modello vocale (e l’eventuale `.index`) per scaricarlo ed estrarlo automaticamente.
- **Upload model:** carica i tuoi file `.pth` e l’eventuale `.index` direttamente dalla WebUI, oppure inserisci ogni cartella vocale dentro `rvc_models/`.

## Generare cover nella WebUI

Apri la scheda **Generate**, incolla un link YouTube o carica una traccia audio locale, seleziona il modello vocale e regola i parametri principali:

- **Pitch Change:** sposta l’intonazione vocale per adattarla all’estensione della voce di destinazione (ad esempio `+1` ottava / `+12` semitoni da uomo a donna, oppure `-1` / `-12` da donna a uomo).
- **Estrazione pitch:** usa **`rmvpe`** come impostazione predefinita consigliata per una traccia più pulita, oppure **`mangio-crepe`** con hop length regolabile per transizioni più morbide.
- **Index Rate:** controlla quanto il file `.index` influenza timbro e pronuncia. Riducilo se introduce grana o artefatti.
- **Missaggio ed effetti:** regola i volumi separati di **Main Vocals**, **Backup Vocals** e **Instrumentals**, i parametri del riverbero integrato (dimensione stanza, wet, dry, damping) e il formato finale (**`mp3`** o **`wav`**).

## Modalità CLI (`src/main.py`)

Puoi eseguire l’intera pipeline da riga di comando senza aprire la WebUI tramite `src/main.py`:

~~~bash
python src/main.py -i "https://www.youtube.com/watch?v=VIDEO_ID" -dir "VoiceFolderName" -p 0 -palgo rmvpe -ir 0.5 -mv 0 -bv 0 -iv 0 -rsize 0.15 -rwet 0.2 -rdry 0.8 -rdamp 0.7 -oformat mp3
~~~

Parametri principali:

- `-i`: percorso del file audio o URL YouTube di input
- `-dir`: nome della cartella del modello vocale in `rvc_models/`
- `-p`: trasposizione del pitch
- `-palgo`: algoritmo di estrazione del pitch (`rmvpe` o `mangio-crepe`)
- `-ir`: index rate (`0`–`1`)
- `-mv` / `-bv` / `-iv`: regolazione volume per voce principale, cori/voci secondarie e base strumentale
- `-rsize` / `-rwet` / `-rdry` / `-rdamp`: parametri riverbero (room size, wetness, dryness e damping)
- `-oformat`: formato audio di uscita (`mp3` o `wav`)

## Risoluzione dei problemi

- **Errori audio o di conversione in esecuzione:** verifica che sia `ffmpeg` sia `sox` siano installati e raggiungibili nel `PATH` prima di avviare `src/webui.py` o `src/main.py`.
- **Download da YouTube non riuscito:** gli estrattori YouTube più vecchi tendono a rompersi nel tempo. Scarica separatamente l’audio in WAV/MP3 e passa il file locale invece dell’URL.
- **Errore al caricamento del modello:** assicurati che il file sia un `.pth` di inferenza RVC v2 esportato (non un modello RVC v1 né un checkpoint G/D di training).

[Installazione](installation.md)
