# NoRegretsRVC · Nutzung

NoRegretsRVC Beta 0.1.0 bereitet Applio-Workflows in einer Weboberfläche vor und erzeugt Notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Nutzung

Lege ein Projekt an. Wähle Abtastrate, Vocoder, Pitch-Extraktor, Encoder, Batchgröße und Epochen. Gleiche die Einstellungen mit den Basisgewichten ab. Der VRAM-Wert ist eine Schätzung.

Bereite die Einstellungen in der Oberfläche vor. Führe Training und Konvertierung in einer kompatiblen Applio-Umgebung aus.

## Trainingsablauf und Werkzeuge

Training umfasst Konfiguration, Datenvorbereitung, Merkmalsextraktion und Training. Kaggle bietet den Export von `.pth` und `.index`. Samples unterstützt Warteschlangen, Einstellungen pro Clip, Transposition, Audiobereinigung im Browser und sechs 32-kHz-Beispiele. Models verwaltet Pretrains, Voice Blender mischt Modelle und TTS nutzt Edge. Empfehlungen aus Diagnostics solltest du anhand von Hörproben prüfen.

## Training und Diagnose in 0.1.0

Die Normalisierung zielt standardmäßig auf −20 LUFS. Die Standardabtastrate bleibt 32 kHz. Neu sind EMA, Mel-Verlust mit 512/1024/2048, Gradient Clipping und FAISS-`nprobe`-Anpassung. Prüfe Checkpoints per Hörtest.

Der Neustart heißt **Restart NoRegretsRVC**. Zahlenfelder aktualisieren die Regler und frühere Namen werden nicht mehr vorgeschlagen.

[Installation](installation.md) · [Cloud](cloud.md)
