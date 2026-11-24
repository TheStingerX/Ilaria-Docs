---
label: "Training con Causal Voice Changer"
icon: ":studio_microphone:"
order: 95
permalink: /ilaria-rvc/redpanda/causal-training/
description: "L’opzione Causal Voice Changer di Redpanda integra Causal Voice Changer v0.4.0. Il fine-tuning produce una voce .cvc per il motore CVC."
---

# Training con Causal Voice Changer

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

L’opzione Causal Voice Changer di Redpanda integra Causal Voice Changer v0.4.0. Il fine-tuning produce una voce .cvc per il motore CVC.

## Addestrare e riprendere una voce

Prepara registrazioni pulite di una sola persona e tieni da parte un campione per la prova. Apri **Training → Causal Voice Changer**, inserisci il nome della voce, scegli cartella e dispositivo, poi imposta **Training steps**. La base si scarica al primo utilizzo. La release salva ogni 1.000 step per impostazione predefinita. Per riprendere, usa lo stesso nome e la stessa cartella del run con un obiettivo di step più alto. Conserva i file di training e prova il `.cvc` esportato in Inference e Realtime.

## Esportazioni e licenza

L’upstream indica un uso non commerciale per la base CVC predefinita e i fine-tune derivati. Usa registrazioni per cui hai il permesso di addestrare un modello. Cerca l’export in `logs/causalvc/` nella versione portabile o in `runs/models/voice-<name>/voices/` nel checkout.

[Installare Redpanda VC](first-run.md) · [Inferenza da file](inference.md) · [Conversione vocale in tempo reale](live-audio.md) · [RVC Training](training.md) · [Causal Voice Changer](../../../non-rvc/voice-changers/causal-voice-changer/overview.md)

## Sorgente e release

[CVC trainer](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/causalvc/trainer.py) · [CVC upstream](https://github.com/mojowozo/Causal-Voice-Changer/tree/50dce9236854fef17f550571413367217e235155)
