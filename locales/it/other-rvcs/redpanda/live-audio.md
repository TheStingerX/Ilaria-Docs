---
label: "Conversione vocale in tempo reale"
icon: ":microphone:"
order: 97
permalink: /ilaria-rvc/redpanda/live-audio/
description: "Apri Realtime nell’app desktop o nella WebUI. Prova prima una voce in cuffia, poi invia l’audio a Discord, OBS, un gioco o un’altra app."
---

# Conversione vocale in tempo reale

[Release precompilata per Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Apri Realtime nell’app desktop o nella WebUI. Prova prima una voce in cuffia, poi invia l’audio a Discord, OBS, un gioco o un’altra app.

## Configurare il routing audio

Per la prima prova, imposta il microfono fisico in **Microphone** e le cuffie in **Output**. Per inviare il segnale convertito a un’altra app, usa il lato di riproduzione del cavo virtuale come uscita di Redpanda e il lato di registrazione come microfono nell’app di destinazione. Usa **Monitor** per ascoltarti in cuffia, evitando di rimandare quel segnale al microfono.

## Voci RVC e CVC

RVC usa un `.pth` per inferenza con `.index` abbinato e facoltativo. CVC usa una voce `.cvc` e un percorso audio a 48 kHz. Carica pitch, guadagno, gate e indice salvati con la voce. I manifest legacy `.causalvc.json` e `.nextvc.json` richiedono i pesi associati. Puoi usare RNNoise sull’ingresso microfono. Se l’audio si interrompe, prova un blocco più lungo e disattiva gli effetti uno alla volta.

[Installare Redpanda VC](first-run.md) · [Inferenza da file](inference.md) · [Training con Casual Voice Changer](causal-training.md) · [RVC Training](training.md) · [VAC Lite / VB-CABLE](../../conversion/real-time.md)

## Sorgente e release

[Realtime UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Realtime engine](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/realtime.py)
