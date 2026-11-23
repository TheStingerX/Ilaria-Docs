# Stimmkonvertierung in Echtzeit

[Vorkompilierte Version für Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Öffne Realtime in der Desktop-App oder WebUI. Teste zunächst eine Stimme über Kopfhörer, bevor du das Signal an Discord, OBS, ein Spiel oder eine andere App sendest.

## Audio-Routing einrichten

Wähle für den ersten Test das echte Mikrofon unter **Microphone** und Kopfhörer unter **Output**. Für die Weiterleitung wählst du die Wiedergabeseite des virtuellen Kabels als Redpanda-Ausgabe und die Aufnahmeseite als Mikrofon in der Ziel-App. Nutze **Monitor** für Kopfhörer und vermeide Rückkopplungen.

## RVC- und CVC-Stimmen

RVC nutzt ein `.pth`-Inferenzmodell und optional den passenden `.index`. CVC nutzt eine `.cvc`-Stimme und einen 48-kHz-Audiopfad. Es übernimmt gespeicherte Einstellungen für Tonhöhe, Gain, Gate und Index. Alte `.causalvc.json`- und `.nextvc.json`-Stimmen benötigen ihre Gewichte. RNNoise kann den Eingang filtern. Teste bei Aussetzern längere Blöcke und schalte Effekte einzeln ab.

[Redpanda VC einrichten](first-run.md) · [Datei-Inferenz](inference.md) · [Training mit Casual Voice Changer](causal-training.md) · [RVC Training](training.md) · [VAC Lite / VB-CABLE](../../conversion/real-time.md)

## Quellcode und Release

[Realtime UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Realtime engine](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/realtime.py)
