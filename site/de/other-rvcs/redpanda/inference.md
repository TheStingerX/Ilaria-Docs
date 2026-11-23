# Datei-Inferenz

[Vorkompilierte Version für Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Unter Inference kannst du eine Aufnahme oder einen ganzen Ordner konvertieren. Eine RVC-Stimme verwendet ein .pth-Inferenzmodell, eine Casual-Voice-Changer-Stimme eine .cvc-Datei.

## Eine Aufnahme konvertieren

Öffne **Inference**. Wähle unter **Voice model** ein RVC-Inferenzmodell `.pth` oder eine `.cvc`-Stimme aus. Bei RVC kannst du den passenden `.index` hinzufügen. Lass **Index rate** für den ersten Test ohne Index auf null. Checkpoints wie `G_*.pth` und `D_*.pth` gehören in Training.

## Testen und einen Ordner konvertieren

Beginne mit einer kurzen, sauberen WAV-Datei, null Halbtönen und WAV-Export. Wähle ein separates Ziel in **Save as** und höre das Ergebnis an, bevor du Tonhöhe oder Modell änderst. Aktiviere dann **Folder mode**, wähle einen kleinen Eingabeordner und ein separates Ausgabeziel und prüfe einige Dateien vor der Stapelverarbeitung.

[Redpanda VC einrichten](first-run.md) · [Stimmkonvertierung in Echtzeit](live-audio.md) · [Training mit Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Quellcode und Release

[Inference UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Conversion](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/convert.py)
