# Sprache mit Sidon restaurieren

## Eine Aufnahme restaurieren

Wähle **Sidon**, lade **Sidon INT8** herunter, füge einen kurzen verrauschten oder halligen Ausschnitt hinzu, wähle **WAV (PCM)** und starte **Enhance audio**. Prüfe, ob Pausen sauberer und Wörter klarer sind. Achte auch auf Atemgeräusche, leise Konsonanten und Klangfarbe. Behalte das Original, falls wichtige Details verloren gehen.

## So arbeitet Sidon in der App

Die App resampelt zur Merkmalsextraktion auf 16 kHz. Der Sidon-ONNX-Prädiktor schätzt Merkmale sauberer Sprache, der DAC-Decoder synthetisiert Audio mit 48 kHz. Die App verarbeitet Kanäle getrennt in etwa sechs Sekunden langen Abschnitten mit Kontext und nutzt danach einen festen FFmpeg-Rauschfilter. INT8 bezeichnet die quantisierten Modellgewichte. Die Bittiefe hängt vom Ausgabeformat ab.

[Übersicht](overview.md) · [Installation und Modelle](installation.md) · [Sprachbandbreite mit AP-BWE erweitern](ap-bwe.md) · [Vorschau, Export und Fehlerbehebung](export.md)

## Quellen

[Sidon](https://github.com/sarulab-speech/Sidon) · [Sidon-ONNX](https://huggingface.co/soniqo/Sidon-ONNX) · [Speech Core](https://github.com/soniqo/speech-core) · [studio_sidon.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_sidon.py)
