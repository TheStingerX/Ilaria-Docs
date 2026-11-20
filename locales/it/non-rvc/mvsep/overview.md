---
label: "Panoramica e piani"
icon: ":book:"
order: 99
permalink: /non-rvc/mvsep/overview/
description: "MVSep (Music & Voice Separation) è una piattaforma web gratuita basata sul cloud per la separazione e il restauro audio tramite IA. Poiché tutti i modelli..."
---
# MVSep

[Sito ufficiale (mvsep.com)](https://mvsep.com/) · [Classifica qualità](https://mvsep.com/quality_checker/multisong_leaderboard)

**MVSep** (Music & Voice Separation) è una piattaforma web gratuita basata sul cloud per la separazione e il restauro audio tramite IA. Poiché tutti i modelli girano sui server remoti di MVSep, **non ti serve una GPU potente né alcuna installazione locale**: è l'ideale se il tuo PC non regge i modelli Roformer in locale o se vuoi usare algoritmi esclusivi di MVSep come **BS Polarformer**, **MVSep DnR v3** ed ensemble multi-modello.

## Cosa può fare MVSep

- **Separazione Voce e Strumentale**: architetture allo stato dell'arte come **BS Polarformer**, BS-Roformer e Mel-Roformer.
- **Separazione Parlato, Musica ed Effetti (SFX)**: modelli multi-traccia cinematografici come **MVSep DnR v3** (per separare dialoghi da musica ed effetti sonori).
- **Voce Principale vs. Cori**: **MVSep Karaoke** e varianti Roformer Karaoke.
- **Restauro Audio**: **DeReverb Stereo**, **DeReverb Room**, **DeNoise** (di aufr33 & gabox) e **DeEffect**.
- **Modelli multi-stem e specialistici**: DrumSep a 4/6/10 stem, basso, chitarre, pianoforte, archi, synth percussion e upscaling audio.

## Gratuito vs. Registrato vs. Premium

MVSep **non ha abbonamenti mensili**: gli algoritmi principali restano gratuiti e gli eventuali crediti prepagati non scadono mai.

| Funzionalità | Non registrato | Account gratuito registrato | Premium (Con crediti attivi) |
| --- | --- | --- | --- |
| **Durata max file** | 10 min | 10 min | **100 min** |
| **Dimensione max file** | 100 MB | 100 MB | **1.000 MB (1 GB)** |
| **Separazioni giornaliere** | Fino a 50 | Fino a 50 *(BS 124-band: 5/giorno per modello)* | **Illimitate** |
| **Job simultanei** | 1 | 1 | **Illimitati** |
| **Priorità coda** | Bassa | Media | **Alta** |
| **CAPTCHA** | Richiesto | **Nessuno** | **Nessuno** |
| **Formato di uscita** | MP3 | **WAV 16-bit / FLAC 16-bit** | **WAV 32-bit float / FLAC 24-bit** |
| **Batch e API complete** | No | Limitato | **Accesso completo** |

> **Consiglio**: creare anche solo un **account gratuito** su [mvsep.com](https://mvsep.com/) elimina i CAPTCHA, velocizza la coda e sblocca il download lossless in **WAV / FLAC** - fondamentale per preparare dataset RVC.
