---
label: "Formati e audio"
icon: ":mag:"
order: 98
permalink: /non-rvc/ilaria-yt-dlp/formats/
---

# Ilaria YT-DLP · Formati e audio

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Panoramica](overview.md) · [Formati e audio](formats.md) · [Playlist e risoluzione dei problemi](playlists.md)

## Leggi i dettagli dei flussi

Aspetta che finisca l’analisi completa. Nella V2 il badge `Max:` mostra la risoluzione più alta rilevata nella sorgente. Il flusso effettivamente scelto può avere una risoluzione più bassa in base a formato, limiti e codec. Apri **Formats / subs / chapters…** e controlla risoluzione, FPS, codec e lingua. Puoi scegliere un flusso combinato o far unire a FFmpeg video e audio separati.

## Scegli contenitore e qualità audio

Prova **Compatible MP4 1080p** se ti serve H.264/AAC. Il remux cambia contenitore conservando i flussi. La ricodifica cambia il codec e richiede più tempo. In **Audio Only**, VBR lascia variare il bitrate in base al contenuto, mentre CBR imposta un valore fisso. Prova un solo file e controlla che funzioni sul dispositivo su cui lo userai.
