---
label: "Anteprima, esportazione e risoluzione dei problemi"
icon: ":headphones:"
order: 95
permalink: /non-rvc/ilaria-audio-upscaler/export/
---

# Anteprima, esportazione e risoluzione dei problemi

## Ascoltare e salvare

Aggiungi uno o più file, scegli il formato e premi **Enhance audio**. Confronta originale e risultato nel player a velocità **1×**. **Speed** cambia solo l’ascolto. Seleziona il risultato ed esportalo con **Save result**: le anteprime non salvate sono temporanee. Parti da WAV o FLAC per modifiche successive. Entrambi i motori producono un WAV intermedio PCM a 16 bit, quindi un altro formato non aggiunge precisione.

## Problemi comuni

**Modello mancante:** scarica il checkpoint del motore e del profilo selezionati. **Errore CUDA:** prova **CPU** con un WAV breve per capire se dipende dal dispositivo o dal file. **Il file non si apre o non si salva:** prova con un WAV valido e controlla FFmpeg, spazio libero e permessi. **Elaborazione lenta:** confronta un estratto breve in Auto o con una GPU CUDA compatibile. **Risultato peggiore:** confronta con la sorgente e cambia motore o profilo in base al difetto.

**WAV (PCM)** · **FLAC** · **MP3** · **M4A (AAC)** · **M4A (ALAC)** · **AAC (ADTS)** · **OGG (Vorbis)** · **Opus** · **AIFF (PCM)** · **WavPack** · **WMA**

[Panoramica](overview.md) · [Installazione e modelli](installation.md) · [Restaurare il parlato con Sidon](sidon.md) · [Estendere la banda vocale con AP-BWE](ap-bwe.md)

## Fonti

[studio.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio.py) · [studio_formats.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_formats.py)
