# Training mit Casual Voice Changer

[Vorkompilierte Version für Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpandas Option Casual Voice Changer integriert Causal Voice Changer v0.4.0. Beim Feintraining entsteht eine .cvc-Stimme für die CVC-Engine.

## Eine Stimme trainieren und fortsetzen

Bereite saubere Aufnahmen einer Person vor und lege eine kurze Testprobe beiseite. Öffne **Training → Casual Voice Changer**, benenne die Stimme, wähle Ordner und Gerät und stelle **Training steps** ein. Das Basismodell lädt beim ersten Bedarf. Die Release speichert standardmäßig alle 1.000 Schritte. Setze mit demselben Namen und Laufordner sowie einem höheren Schrittziel fort. Behalte die Trainingsdateien und teste die exportierte `.cvc` in Inference und Realtime.

## Exporte und Lizenz

Das Upstream-Projekt kennzeichnet das standardmäßige CVC-Basismodell und seine Fine-Tunes für nichtkommerzielle Nutzung. Verwende Aufnahmen, die du zum Training nutzen darfst. Suche Exporte in `logs/causalvc/` bei der portablen Version oder in `runs/models/voice-<name>/voices/` im Quellcode-Checkout.

[Redpanda VC einrichten](first-run.md) · [Datei-Inferenz](inference.md) · [Stimmkonvertierung in Echtzeit](live-audio.md) · [RVC Training](training.md) · [Causal Voice Changer](../../non-rvc/causal-voice-changer/overview.md)

## Quellcode und Release

[CVC trainer](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/causalvc/trainer.py) · [CVC upstream](https://github.com/mojowozo/Causal-Voice-Changer/tree/50dce9236854fef17f550571413367217e235155)
