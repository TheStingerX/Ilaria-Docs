# Vorschau, Export und Fehlerbehebung

## Anhören und speichern

Füge Dateien hinzu, wähle ein Format und starte **Enhance audio**. Vergleiche Original und Ergebnis bei **1×**. **Speed** ändert nur die Wiedergabe. Wähle das Ergebnis und speichere es mit **Save result**. Ungespeicherte Vorschauen sind temporär. Nutze WAV oder FLAC für weitere Bearbeitung. Beide Engines rendern intern 16-Bit-PCM-WAV. Ein anderes Format erhöht die Präzision nicht.

## Häufige Probleme

**Modell fehlt:** Lade den Checkpoint für die gewählte Engine und das Profil. **CUDA-Fehler:** Teste **CPU** mit einer kurzen WAV. **Öffnen oder Export schlägt fehl:** Teste eine intakte WAV und prüfe FFmpeg, freien Speicherplatz und Schreibrechte. **Langsame Verarbeitung:** Nutze einen kürzeren Ausschnitt mit Auto oder einer kompatiblen CUDA-GPU. **Schlechteres Ergebnis:** Vergleiche mit dem Original und passe Engine oder Profil an das Problem an.

**WAV (PCM)** · **FLAC** · **MP3** · **M4A (AAC)** · **M4A (ALAC)** · **AAC (ADTS)** · **OGG (Vorbis)** · **Opus** · **AIFF (PCM)** · **WavPack** · **WMA**

[Übersicht](overview.md) · [Installation und Modelle](installation.md) · [Sprache mit Sidon restaurieren](sidon.md) · [Sprachbandbreite mit AP-BWE erweitern](ap-bwe.md)

## Quellen

[studio.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio.py) · [studio_formats.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_formats.py)
