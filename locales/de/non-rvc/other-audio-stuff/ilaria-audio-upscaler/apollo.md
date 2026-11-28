---
label: "Apollo"
icon: ":musical_note:"
order: 95
permalink: /non-rvc/ilaria-audio-upscaler/apollo/
---

# Musik mit Apollo restaurieren

[GitHub · Apollo](https://github.com/JusperLee/Apollo) · [Ilaria Audio Upscaler V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Wann Apollo sinnvoll ist

Apollo ist in Ilaria Audio Upscaler V2 verfügbar. Es verarbeitet Musik lokal mit **44,1 kHz** auf der CPU oder mit NVIDIA CUDA. Probiere eine MP3 mit niedriger Bitrate aus und vergleiche die geschätzten Details mit dem Original.

## Erster Test

Wähle **Apollo** und lade bei Bedarf das Modell herunter. Die rund **63,5 MiB** liegen in `App/checkpoints/Apollo`. Lass das Gerät auf **Auto**, füge einen kurzen Ausschnitt hinzu und klicke auf **Enhance audio**.

## Vergleichen und speichern

Höre denselben Ausschnitt bei **1×** und ähnlicher Lautstärke. Achte auf Becken und Schlagzeugattacken. Speichere mit **Save result**. WAV nutzt standardmäßig **24-Bit-PCM**. **WAV (PCM 16-bit)** steht ebenfalls zur Wahl.

## Fehlersuche

Fehlt das Modell, wähle vor dem Download Apollo aus. Scheitert CUDA, wähle **CPU** und teste eine kurze WAV-Datei. Bei neuen Artefakten behalte das Original.
