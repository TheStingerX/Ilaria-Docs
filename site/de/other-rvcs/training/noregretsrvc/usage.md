# NoRegretsRVC · Nutzung

NoRegretsRVC Beta 0.0 bereitet Applio-Workflows in einer Weboberfläche vor und erzeugt Notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Nutzung

Lege ein Projekt an. Wähle Abtastrate, Vocoder, Pitch-Extraktor, Encoder, Batchgröße und Epochen. Gleiche die Einstellungen mit den Basisgewichten ab. Der VRAM-Wert ist eine Schätzung.

Bereite die Einstellungen in der Oberfläche vor. Führe Training und Konvertierung in einer kompatiblen Applio-Umgebung aus.

## Trainingsablauf und Werkzeuge

Training umfasst Konfiguration, Datenvorbereitung, Merkmalsextraktion und Training. Kaggle bietet den Export von `.pth` und `.index`. Samples unterstützt Warteschlangen, Einstellungen pro Clip, Transposition, Audiobereinigung im Browser und sechs 32-kHz-Beispiele. Models verwaltet Pretrains, Voice Blender mischt Modelle und TTS nutzt Edge. Empfehlungen aus Diagnostics solltest du anhand von Hörproben prüfen.

[Installation](installation.md) · [Cloud](cloud.md)
