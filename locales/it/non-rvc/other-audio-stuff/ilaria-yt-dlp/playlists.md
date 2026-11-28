---
label: "Playlist e risoluzione dei problemi"
icon: ":headphones:"
order: 97
permalink: /non-rvc/ilaria-yt-dlp/playlists/
---

# Ilaria YT-DLP · Playlist e risoluzione dei problemi

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Panoramica](overview.md) · [Formati e audio](formats.md) · [Playlist e risoluzione dei problemi](playlists.md)

## Come funziona Smart Auto nella V2

Smart Auto tratta un link a un singolo video con parametri di playlist o Mix come un video singolo. Un link specifico a playlist, album, raccolta o canale può ancora accodare più elementi. Quando vuoi scaricare più file, controlla l’intervallo degli elementi e valuta l’archivio dei download. Prova con pochi elementi prima di far partire tutta la lista.

## Capisci dove si è fermato il download

Usa **Simulate** per controllare la selezione, poi cerca il primo errore in **Log & History**. Se c’è la miniatura ma mancano i flussi, aspetta l’analisi completa o controlla yt-dlp e il runtime JavaScript. Se il download termina ma non trovi il file, verifica FFmpeg, lo spazio libero e la cartella di destinazione. Se un estrattore smette di funzionare, aggiorna yt-dlp da **Advanced & CLI**.
