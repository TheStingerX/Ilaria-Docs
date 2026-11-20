# Dataset, Dataset Checker e Audio Analyzer

[Scarica Ilaria RVC 2.4.0 per Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Il dataset è il fattore più importante per determinare quanto sarà naturale, pulita ed espressiva la voce del tuo modello RVC. Anche le migliori impostazioni di training non possono correggere registrazioni di partenza rumorose, con eco o distorte.

!!!tip
**Regola d'oro: la qualità batte sempre la quantità.**
10 minuti di audio pulito, asciutto e vario di una sola voce allenano un modello molto migliore rispetto a 60 minuti di clip con eco, rumore di fondo o frasi ripetitive.
!!!

## 1. Cosa rende ottimo un dataset RVC

### Durata e varietà vocale
- **Durata minima utile:** Circa **5-10 minuti** di parlato o canto puro (escludendo i silenzi) possono già produrre una voce funzionante se l'audio è molto pulito.
- **Obiettivo consigliato:** **15-30+ minuti** di audio pulito e vario danno al modello abbastanza copertura fonetica per gestire parole, toni ed emozioni diverse in modo naturale.
- **La varietà conta:** Includi parlato calmo, parlato energico, toni diversi, passaggi bassi e alti, e consonanti chiare (`s`, `f`, `t`, `k`). Se alleni solo su voce piatta e monotona, il modello farà fatica quando canti o parli con enfasi.

### Pulizia audio e formato
- **Una sola voce:** Non lasciare mai voci sovrapposte, rumori di folla o cori di sottofondo nel dataset.
- **Ambiente asciutto (pochissimo riverbero):** RVC impara l'eco della stanza come se facesse parte del timbro vocale. Le registrazioni da studio a microfono ravvicinato sono le migliori.
- **Formato lossless:** Preferisci sempre **`.wav` PCM** (o `.flac`) rispetto a `.mp3` molto compressi, per evitare che gli artefatti di compressione finiscano nel modello.
- **Niente musica o effetti sonori:** Rimuovi tutta la musica di sottofondo, l'audio di gioco e gli SFX prima del preprocessing.

## 2. Preparare e pulire l'audio

1. **Separa la voce da musica/SFX:** Se la sorgente viene da canzoni, video o giochi, estrai prima la voce pulita usando [UVR5](../../non-rvc/uvr5/overview.md) o [MVSep](../../non-rvc/mvsep/overview.md).
2. **Attenzione a denoise e dereverb pesanti:** Applica la rimozione rumore o riverbero solo quando serve davvero. Filtri troppo aggressivi possono tagliare le alte frequenze e creare artefatti acquosi o metallici. Fai sempre un confronto A/B tra originale e audio pulito.
3. **Taglia i silenzi morti e i rumori brutti:** Rimuovi lunghe pause vuote, urti sul microfono, colpi di tosse, click e clipping estremo. Lascia solo brevi pause naturali tra le parole per mantenere un ritmo umano.
4. **Mantieni clip di durata equilibrata:** Dividi registrazioni molto lunghe in segmenti puliti (circa **3-15 secondi** ciascuno), oppure lascia che lo slicer di Ilaria RVC li tagli automaticamente in preprocessing.
5. **Usa percorsi semplici:** Salva il dataset in una cartella corta senza spazi, accenti o simboli speciali (ad esempio `C:\RVC\datasets\mia_voce\`).

## 3. Usare il Dataset Checker di Ilaria RVC

Prima di spendere tempo GPU nel training, esegui il **Dataset Checker** integrato in Ilaria RVC per individuare subito i problemi nascosti:

- **Rilevamento clipping:** Trova i punti in cui i picchi toccano `0 dBFS` e si appiattiscono, causando distorsioni o crash `NaN loss` durante il training.
- **Silenzi lunghi:** Segnala clip composte quasi solo da vuoto così puoi tagliarle o eliminarle.
- **File illeggibili o danneggiati:** Scova file corrotti, file da 0 byte o clip più corte di 1 secondo che farebbero fallire il preprocessing (`zero-size array`).
- **Livelli incoerenti:** Evidenzia clip molto più basse o molto più alte rispetto al resto del dataset.

**Flusso consigliato:**
1. Seleziona la cartella del dataset nel **Dataset Checker** e avvia la scansione.
2. Ascolta ogni file segnalato prima di cancellarlo o modificarlo.
3. Conserva le parti parlate a volume più basso e le pause intenzionali quando fanno parte dello stile della voce, ed elimina o ripulisci solo i file davvero rotti, in clipping o rumorosi.

## 4. Usare l'Audio Analyzer di Ilaria RVC

Usa l'**Audio Analyzer** per capire *perché* una registrazione o una conversione suona male:

- **Picchi della forma d'onda:** Onde tagliate piatte in cima indicano clipping digitale. Abbassa il guadagno o sostituisci la clip distorta.
- **Spettrogramma:** Osserva gli spazi di silenzio tra le parole. Una riga orizzontale fissa a 50/60 Hz indica ronzio elettrico; macchie o bande diffuse attraverso le frequenze indicano residui di musica o riverbero.
- **Pitch e livelli attivi:** Controlla se l'intonazione salta in modo innaturale (errore di rilevamento) o se il volume scende troppo.
- **Confronto Prima vs Dopo:** Carica esattamente lo stesso tratto dell'audio originale e dell'output convertito per capire se un difetto nasce dal dataset, dalla separazione o dalle impostazioni di inferenza.

## 5. Errori comuni nel dataset da evitare

| Errore | Effetto sul modello allenato | Come risolvere |
| --- | --- | --- |
| **Lasciare riverbero/eco nel dataset** | La voce suona sempre come dentro un bagno o una grotta. | Usa sorgenti più asciutte oppure pulisci con attenzione usando UVR5/MVSep DeReverb. |
| **Residui di musica di sottofondo** | Tremolii musicali casuali o artefatti metallici nella voce convertita. | Risepara la voce con `BS-Roformer` / `BS Polarformer` ed elimina le clip sporche. |
| **Più voci nello stesso dataset** | Il timbro cambia in modo imprevedibile a metà frase. | Mantieni rigorosamente un solo parlatore per cartella dataset. |
| **Dataset minuscolo e ripetitivo (< 2 min)** | Il modello memorizza il rumore ("overfitting") e si rompe su parole nuove. | Aggiungi più frasi varie e ferma il training prima (meno epoche). |
| **Registrazioni in clipping / distorte** | Crepitii forti, voce robotica o crash `NaN loss`. | Rimuovi le clip distorte e normalizza l'audio pulito sotto `0 dBFS`. |

Leggi anche [Preparare un dataset vocale](../../model-training/dataset-preparation.md) per altre indicazioni generali su registrazione e valutazione.
