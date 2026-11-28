# Installation und Modelle

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2) · [ZIP](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/archive/refs/tags/v2.zip)

## Windows-Einrichtung

**1.** Lade das Projekt von GitHub herunter und entpacke es in einen beschreibbaren lokalen Ordner. Installiere **Python 3.10 in 64 Bit**. **2.** Starte `Setup.cmd`. Es installiert Abhängigkeiten und FFmpeg, erstellt `Ilaria Audio Upscaler.exe` und öffnet die App. **3.** Starte danach direkt die EXE und belasse sie im App-Ordner. Das Quellpaket enthält keine fertige EXE, Python-Umgebung oder Modellgewichte.

## Gerät und Checkpoints

Das Setup versucht CUDA auf kompatibler NVIDIA-Hardware und kann auf CPU zurückfallen. Beginne mit **Auto**. Wähle **CPU** zur Fehlersuche oder **CUDA** und die GPU bei passender Laufzeit. Nutze **Download Sidon INT8** (rund 286 MiB) oder **Download checkpoint** für das gewählte AP-BWE-Profil. Die Gewichte liegen unter `App/checkpoints`. Einrichtung und Downloads brauchen Internet.

Wähle **Apollo** und lade das Modell über die Schaltfläche herunter. Die Gewichte belegen etwa **63,5 MiB** und liegen unter `App/checkpoints/Apollo`.

[Übersicht](overview.md) · [Sprache mit Sidon restaurieren](sidon.md) · [Sprachbandbreite mit AP-BWE erweitern](ap-bwe.md) · [Vorschau, Export und Fehlerbehebung](export.md)

## Quellen

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2) · [Python 3.10](https://www.python.org/downloads/release/python-31011/) · [Setup.cmd](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/Setup.cmd)
