# Ilaria Music · Installazione e primo avvio

[GitHub](https://github.com/TheStingerX/Ilaria-Music) · [v1](https://github.com/TheStingerX/Ilaria-Music/releases/tag/v1) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-Music/resolve/main/Ilaria-Music%20v1.zip?download=true)

[Installazione e primo avvio](installation.md) · [Ricerca e abbinamento dei brani](search.md) · [Esportazione e organizzazione della musica](export.md)

## Installa lo ZIP per Windows x64

Estrai tutto in una cartella in cui puoi salvare file. Lascia `App` accanto al launcher. Per la versione dal sorgente, esegui `App\Setup.cmd` per preparare l’ambiente Python locale. Se l’EXE non si apre, usa il file `App\Start … .cmd` del programma per leggere l’errore.

## Controlla gli strumenti prima di cominciare

Ilaria Music include Python 3.11, Qt e yt-dlp. Installa FFmpeg per conversione e post-elaborazione. Deno è consigliato per YouTube Music. Riavvia l’app dopo l’installazione oppure inserisci `ffmpeg.exe`, `ffprobe.exe` e `deno.exe` in `App/bin/`. Il sorgente supporta Python 3.11, 3.12 e 3.13 a 64 bit.

```powershell
winget install yt-dlp.FFmpeg
winget install DenoLand.Deno
```

`Ilaria Music.exe` · `App\Start Ilaria Music.cmd`
