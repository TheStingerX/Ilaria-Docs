---
label: "Panoramica"
icon: ":cd:"
order: 99
permalink: /non-rvc/ilaria-yt-dlp/
---

# Ilaria YT-DLP · Panoramica

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Panoramica](overview.md) · [Formati e audio](formats.md) · [Playlist e risoluzione dei problemi](playlists.md)

## Scarica e avvia su Windows

Ilaria YT-DLP è un’interfaccia grafica in inglese per yt-dlp su **Windows 10 e 11 x64**. Puoi usarla per salvare video o estrarre audio da contenuti che hai il permesso di scaricare. Il pacchetto portatile include Python, Qt, yt-dlp, FFmpeg, FFprobe e Deno.

1. Scarica lo ZIP portatile dalla pagina del progetto su Hugging Face.
2. Estrai l’intero archivio in una cartella scrivibile. Lascia `App` accanto al launcher.
3. Avvia `Ilaria YT-DLP.exe`. Se necessario usa `App\Start Ilaria YT-DLP.cmd` per vedere gli errori di avvio.
4. Controlla i badge in alto. Il rilevamento di **yt-dlp** serve per analizzare i link. **FFmpeg** serve per unire flussi separati, estrarre audio e fare post-elaborazione. **Deno** è uno dei runtime JavaScript usati dagli estrattori.

Per installare dal sorgente, usa Python 3.10 o successivo, installa FFmpeg e, se serve, Deno, poi esegui `App\Setup.cmd`. Lo script prepara `App\.venv` e compila il launcher. Dopo aver installato programmi tramite Winget, riapri il terminale per aggiornare il PATH.

## Scarica il primo video

1. Incolla un solo link. L’app lo accoda e tenta una prima anteprima con titolo e miniatura.
2. Aspetta l’analisi completa prima di scegliere risoluzione, tracce o sottotitoli. La miniatura da sola indica che l’anteprima è disponibile.
3. Apri **General & Formats**. Scegli **Output Folder** e lascia **Video + Audio (Best)** per la prima prova. Il profilo iniziale punta a MP4.
4. Se ti serve un file più facile da riprodurre su dispositivi diversi, applica il preset **Compatible MP4 1080p**, che preferisce H.264 e AAC in base ai flussi disponibili.
5. Usa **Simulate** per controllare l’operazione senza scaricare il media. Poi disattiva la simulazione se accesa e premi **Start Download**.
6. In **Log & History**, aspetta il termine dell’elaborazione. Apri il risultato da **Open file** oppure usa **Show in Explorer** per controllare cartella, dimensione e file aggiuntivi.

## Estrai solo l’audio

1. In **General & Formats** scegli **Audio Only**. Il programma nasconde i controlli video e sincronizza l’estrazione con **Audio & PP**.
2. Scegli **MP3** per la riproduzione comune o **WAV/FLAC** quando ti serve un file da elaborare senza introdurre un’altra compressione con perdita.
3. Se scegli MP3, usa la qualità VBR oppure un bitrate CBR fra quelli offerti. Una conversione in WAV o FLAC conserva il segnale decodificato. La qualità resta limitata dalla sorgente.
4. Scarica un solo elemento per provare. Se ti servono copertina e tag, attivali e verifica che il lettore scelto li mostri.

## Seleziona tracce, sottotitoli e capitoli

Apri **Formats / subs / chapters…** dopo l’analisi. Una traccia video può essere priva di audio. Puoi selezionare video e audio separatamente per farli unire da FFmpeg, oppure scegliere un flusso combinato disponibile. Verifica risoluzione, FPS, codec e lingua prima di confermare.

Per i sottotitoli, distingui quelli manuali da quelli automatici e scegli se salvare un file separato o incorporare la traccia in un contenitore compatibile. Per ritagliare l’audio o il video usa **Playlist, Filters & Cuts** o i capitoli disponibili. Controlla l’inizio e la fine perché il taglio può dipendere dai fotogrammi chiave.

**SponsorBlock** può segnare i segmenti come capitoli o rimuoverli. Parti dalla marcatura se vuoi mantenere la durata originale. Se rimuovi segmenti, controlla il risultato e i relativi tempi dei sottotitoli.

## Organizza coda e preset

Per più file incolla un URL per riga o importa un `.txt`. Prova prima su un solo elemento, soprattutto con le playlist. Usa i filtri della quarta scheda per limitare quali elementi elaborare. Salva il preset solo dopo la prova e controlla cartella, sottotitoli e formato dopo averlo richiamato. I preset JSON sono utili per riusare la configurazione. Evita di condividere preset o log con credenziali, percorsi privati o link non pubblici.

## Risolvi i problemi

| Sintomo | Primo controllo |
| --- | --- |
| Il link compare, ma la lista delle tracce è vuota | Aspetta l’analisi completa e controlla il primo errore in **Log & History**. |
| Il download finisce, ma il file manca | Controlla l’unione o l’estrazione con FFmpeg e cerca il percorso finale nella cronologia. |
| Il file non parte su un altro dispositivo | Verifica codec e contenitore. Prova il preset H.264/AAC su un solo file. |
| Audio o sottotitoli nella lingua sbagliata | Riapri il selettore dopo l’analisi e scegli esplicitamente le tracce disponibili. |
| Un sito ha smesso di funzionare | Controlla la versione rilevata di yt-dlp. In **Advanced & CLI → Update yt-dlp** prova il canale stabile e poi analizza di nuovo il link. |
| È partita una playlist per errore | Premi **Cancel**, controlla la coda e limita la selezione prima di riprovare. |

In **Advanced & CLI** puoi vedere quale comando produrrà la configurazione. È utile per confrontare due prove, tenendo fissi URL e preset e cambiando un’impostazione alla volta.
