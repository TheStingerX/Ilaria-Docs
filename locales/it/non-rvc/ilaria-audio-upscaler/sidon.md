---
label: "Restaurare il parlato con Sidon"
icon: ":microphone:"
order: 97
permalink: /non-rvc/ilaria-audio-upscaler/sidon/
---

# Restaurare il parlato con Sidon

## Restaurare una registrazione

Seleziona **Sidon**, scarica **Sidon INT8**, aggiungi un estratto breve con rumore o riverbero, scegli **WAV (PCM)** e premi **Enhance audio**. Ascolta se le pause sono più pulite e le parole più chiare. Controlla respiri, consonanti deboli e timbro. Conserva l’originale se il restauro attenua dettagli che ti servono.

## Come funziona Sidon nell’app

L’app ricampiona l’ingresso a 16 kHz per estrarre le caratteristiche. Il predittore Sidon ONNX stima le caratteristiche del parlato pulito e il decoder DAC sintetizza l’audio a 48 kHz. L’app elabora ogni canale separatamente in segmenti di circa sei secondi con un margine di contesto, poi applica un filtro antirumore fisso via FFmpeg. INT8 indica i pesi quantizzati del modello. La profondità in bit dell’export dipende dal formato scelto.

[Panoramica](overview.md) · [Installazione e modelli](installation.md) · [Estendere la banda vocale con AP-BWE](ap-bwe.md) · [Anteprima, esportazione e risoluzione dei problemi](export.md)

## Fonti

[Sidon](https://github.com/sarulab-speech/Sidon) · [Sidon-ONNX](https://huggingface.co/soniqo/Sidon-ONNX) · [Speech Core](https://github.com/soniqo/speech-core) · [studio_sidon.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_sidon.py)
