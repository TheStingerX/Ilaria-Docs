---
label: "RVC Blue installieren und nutzen"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue ist ein Windows-Desktop-Voice-Changer, der auf der Echtzeit-GUI von RVC WebUI (Mainline - Original RVC) basiert."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

**RVC Blue (RVC-Realtime-GUI)** ist ein Windows-Desktop-Client für RVC-Stimmkonvertierung in Echtzeit mit niedriger Latenz. Basierend auf der Echtzeit-GUI von RVC WebUI integriert er aktuelle Echtzeit-Optimierungen, **CUDA Graph Warm-up** (geringere GPU-Dauerlast) sowie Korrekturen zur Rauschunterdrückung bei Ein- und Ausgang.

- **Nur Inferenz**: RVC Blue trainiert keine Modelle. Trainiere deine Stimme in **Ilaria RVC** (oder einem anderen Trainer) und importiere hier die exportierten Inferenz-Dateien `.pth` und `.index`.
- **Drei Eingabequellen**: Live-**Mikrofon**, **Audiodatei** (über integriertes FFmpeg) und **Windows-Anwendungsaudio** (Prozess-Erfassung).
- **Enthaltenes Modell**: **Sakura**, eine natürliche Alltagsstimme (kommerzielle Nutzung erlaubt), ist direkt zum Testen enthalten.

## 1. Build auswählen und installieren

Jedes Paket auf Hugging Face ist eigenständig und enthält Python-Runtime, PyTorch/CUDA, FFmpeg, HuBERT/RMVPE/FCPE-Dateien sowie das Basismodell-Set. Python, CUDA Toolkit oder FFmpeg müssen nicht separat installiert werden.

| Build | Starter | Gedachte NVIDIA-Hardware |
| --- | --- | --- |
| **CUDA 12.8** *(Standard)* | `RVC-Realtime-GUI-CUDA128.bat` | Aktuelle NVIDIA-GPUs inklusive RTX-50-Serie (Blackwell) |
| **CUDA 11.8** *(Kompatibilität)* | Integrierter CUDA-11.8-Starter | Ältere NVIDIA-GPUs oder Systeme mit CUDA-11.8-Treiber/-Umgebung |

1. Prüfe dein NVIDIA-GPU-Modell unter **Task-Manager → Leistung → GPU**.
2. Öffne [RVC Blue auf Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) und lade das passende Paket herunter.
3. Entpacke das gesamte Archiv in einen **kurzen, beschreibbaren lokalen Ordner** wie `C:\RVC-Realtime-GUI`. Starte es nicht aus dem ZIP heraus und vermeide `Programme` oder OneDrive-Ordner.
4. Starte `RVC-Realtime-GUI-CUDA128.bat` (oder den CUDA-11.8-Starter).
5. **Ersten Start abwarten**: Beim ersten Öffnen dauert der Start länger, da Inferenz-Assets, CUDA-Runtime und CUDA Graph Warm-up geladen werden. Warte, bis sich das Fenster öffnet.

## 2. Eigene Stimmmodelle hinzufügen

Erstelle pro Stimme einen Unterordner in `models/` im entpackten Ordner:

```text
models/
  MyVoice/
    MyVoice.pth
    added_MyVoice.index
    preview.png
```

- **Ordnername**: wird als Modellname in der Galerie angezeigt.
- **Erforderliche Modelldatei**: verwende ein **Inferenz-`.pth`**, keinen Trainings-Checkpoint (`G_*.pth` / `D_*.pth`).
- **Optionaler Index & Vorschau**: lege die passende `added_*.index`-Datei sowie optional ein `.png`, `.jpg` oder `.jpeg` in denselben Ordner für ein automatisches Vorschaubild.
- **Neu laden**: klicke nach dem Hinzufügen oder Ersetzen auf **Reload** (oder starte die App neu). Allgemeine Einstellungen pro Modell werden automatisch gespeichert.

## 3. Audiogeräte einrichten und lokal testen

RVC Blue erlaubt die getrennte Wahl von **Input** (Eingang), **Output** (Ausgang) und **Monitor**:

- **Input**: dein physisches Mikrofon (oder eine Audiodatei / Windows-App).
- **Output**: Ziel der konvertierten Stimme (Kopfhörer zum Testen oder virtuelles Kabel für Anrufe und Spiele).
- **Monitor**: optionaler zweiter Ausgang zum Mithören, während **Output** an Discord oder OBS geht.

### WASAPI vs. ASIO

- **Ohne ASIO-Interface**: beginne mit **WASAPI**.
- **Mit nativem ASIO**: RVC Blue startet mit der vom Treiber empfohlenen Puffergröße. Du kannst auch ASIO-Eingang/-Monitor mit WASAPI-Ausgang kombinieren oder getrennte Kanalpaare desselben ASIO-Treibers nutzen.

### Erster lokaler Test

1. Wähle dein physisches Mikrofon als **Input**.
2. Wähle deine Kopfhörer als **Output** (lasse **Monitor** vorerst aus, um doppelte Stimmen zu vermeiden).
3. Wähle **Sakura** (oder dein Modell) und belasse Puffer und Pitch zunächst auf Standard.
4. Klicke auf **Start**, sprich einen kurzen Satz und mache eine Pause, um Latenz, Klarheit und Nebengeräusche zu prüfen.

## 4. Audio an Discord, OBS oder ein Spiel senden

Um die konvertierte Stimme in anderen Apps zu nutzen, verbinde RVC Blue über ein virtuelles Audiokabel (**VAC Lite** oder **VB-CABLE**):

1. Setze **Output** in RVC Blue auf das Wiedergabegerät des virtuellen Kabels (z. B. `CABLE Input` oder `Line 1`).
2. Setze optional **Monitor** auf deine Kopfhörer, falls du dich selbst hören möchtest.
3. Wähle in Discord, OBS oder im Spiel das Aufnahmegerät des virtuellen Kabels (z. B. `CABLE Output` oder `Line 1`) als **Mikrofon**.
4. Belasse Spiel- oder Anrufton auf deinen Kopfhörern.
5. Nimm in der Ziel-App vor einem Live-Anruf einen kurzen Test auf.

Details zur Einrichtung findest du in der [Anleitung für virtuelle Audiokabel](../vonovox/live-audio.md).

## 5. Dateieingabe, App-Aufnahme und WAV-Aufzeichnung

- **Audiodatei als Eingang**: stelle die Quelle auf **File**, wähle einen kurzen WAV-/Audioclip (dekodiert über integriertes FFmpeg) und prüfe **Output** und **Monitor**, bevor du **Start** drückst. Ausgangs- und Monitor-Einstellungen bleiben erhalten.
- **Windows-Anwendungsaufnahme**: stelle die Quelle auf **Application**, klicke auf **Refresh** und wähle eine laufende App. Nutzt Windows-Per-Process-Audio-Capture. Erkannte Apps werden gemerkt und verbinden sich beim Neustart erneut. Direktes ASIO-Audio außerhalb des normalen Windows-Audios wird möglicherweise nicht erfasst, und der Originalton der App wird **nicht automatisch stummgeschaltet** (bei Bedarf separat leiser stellen oder muten).
- **WAV-Aufnahme**: speichere über die Aufnahmesteuerung WAV-Dateien als **getrennte Ein-/Ausgabe**, **Mix** oder **getrennte L/R-Spuren**.

## 6. Häufige Probleme lösen

| Symptom | Was zu prüfen ist |
| --- | --- |
| App wirkt beim ersten Start eingefroren | Warte 1-2 Minuten auf die erste CUDA-Initialisierung und CUDA Graph Warm-up. |
| Programm schließt sich sofort beim Start | Starte die `.bat`-Datei aus dem entpackten Ordner (z. B. `C:\RVC-Realtime-GUI`) und lies die Konsolenmeldung. Prüfe, ob der NVIDIA-Treiber zu CUDA 12.8 oder 11.8 passt. |
| Neue Stimme erscheint nicht | Prüfe, ob das Modell in `models/<Stimmname>/` liegt und ein Inferenz-`.pth` ist (kein Trainings-Checkpoint), dann klicke auf **Reload**. |
| Kopfhörer funktionieren, aber Discord/Spiel bleibt stumm | Prüfe, ob **Output** das Wiedergabegerät des virtuellen Kabels ist und Discord/Spiel das passende Aufnahmegerät als Mikrofon nutzt. |
| Zwei Stimmen sind zu hören | Deaktiviere **Monitor**, wenn **Output** bereits auf den Kopfhörern liegt, oder schalte die Quell-App bei App-Aufnahme stumm. |
| Audio knackt oder setzt unter Last aus | Stelle den Standardpuffer wieder her oder erhöhe ihn leicht und teste erneut, während Spiel oder Anruf läuft. |

[Projektquelle und Release Notes](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
