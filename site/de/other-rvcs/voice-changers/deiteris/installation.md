# Deiteris w-okada Fork installieren

[GitHub](https://github.com/Deiteris/voice-changer) · [Releases](https://github.com/Deiteris/voice-changer/releases)

**Deiteris w-okada Fork** ist ein beliebter Community-Fork von `w-okada/voice-changer` (VCClient) mit Fokus auf geringere Latenz, klareren Klang, Stabilitätsfixes und aktualisierte Backends für NVIDIA (CUDA), AMD/Intel (DirectML) sowie Apple Silicon.

## 1. Den richtigen Build herunterladen

Öffne die [Deiteris Releases-Seite](https://github.com/Deiteris/voice-changer/releases) und klappe **Assets** auf:

| Hardware / OS | Paket zum Herunterladen | Hinweise |
| --- | --- | --- |
| **Windows + NVIDIA-GPU** | **CUDA**-Archiv (oft aufgeteilt in `.zip.001`, `.zip.002`, usw.) | Empfohlen für geringste Latenz auf GeForce GTX/RTX-Karten. |
| **Windows + AMD- / Intel-GPU** | **DML (DirectML)**-Archiv | Nutzt DirectML-Beschleunigung (oder CPU ohne kompatible GPU). |
| **macOS (Apple Silicon / Intel)** | **macOS**-Build (CoreML / CPU) | Release-Notes für Apple Silicon M1/M2/M3 vs. Intel prüfen. |

## 2. Entpacken und starten (Windows)

1. Lade bei geteilten CUDA-Archiven (`.zip.001`, `.zip.002`, ...) **alle Teile** in denselben Ordner und entpacke beginnend mit **`.zip.001`** über **7-Zip** oder **WinRAR**.
2. Entpacke in einen einfachen, beschreibbaren Pfad auf deinem Hauptlaufwerk (z. B. `C:\VoiceTools\Deiteris-VC`). Vermeide `Program Files`, `OneDrive` und Sonderzeichen.
3. Öffne den entpackten Ordner und starte das Startskript (`start_http.bat` oder `MMVCServerSIO.exe`, je nach Release).
4. **Auf Basisgewichte warten**: Lass das Konsolenfenster offen, während beim ersten Start benötigte Basismodelle heruntergeladen werden.
5. Öffne die in der Konsole angezeigte lokale Web-Adresse (meist `http://localhost:7865` oder `http://127.0.0.1:18888`).

## 3. Voraussetzung: Virtuelles Audiokabel

Um deine konvertierte Stimme an **Discord, OBS, VRChat oder Spiele** zu senden, installiere vorab ein virtuelles Audiokabel (z. B. **VB-CABLE**):
1. Führe das Setup als Administrator aus (`VBCABLE_Setup_x64.exe`).
2. **Starte Windows neu**, damit die neuen virtuellen Audiogeräte sauber erkannt werden.

Weiter mit [Deiteris Fork routen & abstimmen](live-audio.md) für Geräte, Chunk-Größe und Pitch.
