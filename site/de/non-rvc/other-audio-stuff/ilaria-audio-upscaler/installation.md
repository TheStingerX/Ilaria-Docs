# Installation und Modelle

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1)

## Windows-Einrichtung

**1.** Lade das Projekt von GitHub herunter und entpacke es in einen beschreibbaren lokalen Ordner. Installiere **Python 3.10 in 64 Bit**. **2.** Starte `Setup.cmd`. Es installiert Abhängigkeiten und FFmpeg, erstellt `Ilaria Audio Upscaler.exe` und öffnet die App. **3.** Starte danach direkt die EXE und belasse sie im App-Ordner. Das Quellpaket enthält keine fertige EXE, Python-Umgebung oder Modellgewichte.

## Gerät und Checkpoints

Das Setup versucht CUDA auf kompatibler NVIDIA-Hardware und kann auf CPU zurückfallen. Beginne mit **Auto**. Wähle **CPU** zur Fehlersuche oder **CUDA** und die GPU bei passender Laufzeit. Nutze **Download Sidon INT8** (rund 286 MiB) oder **Download checkpoint** für das gewählte AP-BWE-Profil. Die Gewichte liegen unter `App/checkpoints`. Einrichtung und Downloads brauchen Internet.

[Übersicht](overview.md) · [Sprache mit Sidon restaurieren](sidon.md) · [Sprachbandbreite mit AP-BWE erweitern](ap-bwe.md) · [Vorschau, Export und Fehlerbehebung](export.md)

## Quellen

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1) · [Python 3.10](https://www.python.org/downloads/release/python-31011/) · [Setup.cmd](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/Setup.cmd)
