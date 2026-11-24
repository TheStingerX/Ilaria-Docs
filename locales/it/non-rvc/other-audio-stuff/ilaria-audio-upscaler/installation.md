---
label: "Installazione e modelli"
icon: ":cd:"
order: 98
permalink: /non-rvc/ilaria-audio-upscaler/installation/
---

# Installazione e modelli

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1)

## Configurazione su Windows

**1.** Scarica il progetto da GitHub ed estrailo in una cartella locale scrivibile. Installa **Python 3.10 a 64 bit**. **2.** Avvia `Setup.cmd` e attendi che installi dipendenze e FFmpeg, crei `Ilaria Audio Upscaler.exe` e apra l’app. **3.** Dagli avvii successivi usa l’EXE direttamente e lascialo nella cartella dell’app. Il pacchetto sorgente non include l’eseguibile compilato, l’ambiente Python o i pesi.

## Dispositivo e checkpoint

Il setup prova CUDA con una GPU NVIDIA compatibile e può passare alla CPU. Parti da **Auto**. Scegli **CPU** per isolare un problema CUDA. Se il runtime la supporta, puoi scegliere **CUDA** e la GPU. Usa **Download Sidon INT8** per Sidon (circa 286 MiB) o **Download checkpoint** per il profilo AP-BWE selezionato. I pesi sono in `App/checkpoints`. Setup e download richiedono Internet.

[Panoramica](overview.md) · [Restaurare il parlato con Sidon](sidon.md) · [Estendere la banda vocale con AP-BWE](ap-bwe.md) · [Anteprima, esportazione e risoluzione dei problemi](export.md)

## Fonti

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1) · [Python 3.10](https://www.python.org/downloads/release/python-31011/) · [Setup.cmd](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/Setup.cmd)
