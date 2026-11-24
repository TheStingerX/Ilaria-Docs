---
label: "Uso e risoluzione dei problemi"
icon: ":headphones:"
order: 98
permalink: /ilaria-rvc/rvc-studio/usage/
---

# RVC Studio · Uso e risoluzione dei problemi

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

## Prima cover

Avvia il backend da **RVC Server**. Dopo aver aggiunto i file, apri **Inference** e premi **Refresh Data**. Scegli un breve WAV, FLAC, OGG o MP3 da `songs/`. Metti il checkpoint RVC v2 per l’inferenza in `models/RVC/` e l’eventuale indice abbinato in `models/RVC/.index/`. Seleziona la voce e un modello per estrarre il cantato. Il modello di pre-elaborazione aggiuntivo è facoltativo. Premi **Save Options** e poi **1-Click VC**. Se la voce non compare, controlla la cartella e aggiorna l’elenco prima di riavviare.

## Addestrare una voce

In **Train**, scegli la cartella del dataset e un nome per l’esperimento. Pre-elabora le registrazioni, estrai le feature e avvia il training. Prima di partire verifica che i pretrain del generatore e del discriminatore corrispondano alle impostazioni dell’esperimento. Genera l’indice a parte, se ti serve. Se un passaggio è disattivato, verifica che il precedente abbia generato i file nello stesso esperimento. Ascolta i checkpoint esportati sullo stesso audio di prova prima di sceglierne uno.

## TTS e conversione in tempo reale

In **Text to Speech**, scegli un motore di sintesi e una voce RVC. Genera e ascolta una frase breve, poi premi **Convert Speech** e salva il risultato. Il sorgente esaminato include anche **Realtime Conversion**. Seleziona ingresso e uscita sul computer che esegue l’app e prova con le cuffie per evitare il ritorno audio. Verifica che funzioni sulla tua configurazione prima di usarla dal vivo.

[← Configurazione](installation.md)
