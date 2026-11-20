---
label: "Installieren und öffnen Sie"
icon: ":toolbox:"
order: 40
permalink: /ilaria-rvc/mainline/installation/
description: "RVC WebUI (Mainline - Original RVC) ist die Upstream-Retrieval-basierte Sprachkonvertierungs-WebUI. Nutzen Sie die Browseroberfläche für die..."
---

# RVC WebUI (Mainline - Original RVC) installieren

[GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI)

RVC WebUI (Mainline - Original RVC) ist die Upstream-Retrieval-basierte Sprachkonvertierungs-WebUI. Nutzen Sie die Browseroberfläche für die Dateikonvertierung und Schulung. Verwenden Sie für die Mikrofonkonvertierung die separate Desktop-Oberfläche, die im [Echtzeit-Guide](realtime.md)] beschrieben ist.

## Wählen Sie eine Installationsroute

| Ihr Setup | Was Sie verwenden sollten |
| --- | --- |
| Windows und eine unterstützte GPU | Beginnen Sie mit einem passenden vorgefertigten Windows-Archiv. Dies ist der kürzeste Weg. |
| Windows und eine NVIDIA RTX 50-Serie GPU | Verwenden Sie ein Paket, das explizit für die 50-Serie gekennzeichnet ist, oder das Quell-Setup mit dem CUDA 12.8 Torch-Build. Ältere NVIDIA-Archive können gestartet werden, schlagen jedoch fehl, wenn sie versuchen, GPU-Vorgänge auszuführen. |
| Windows und eine AMD- oder Intel-GPU | Wählen Sie das passende AMD/Intel-Archiv. Die DirectML-Unterstützung hängt von der Version und dem Betrieb ab. Testen Sie zunächst die Dateikonvertierung. |
| Ubuntu oder ein benutzerdefiniertes Windows-Setup | Installieren Sie den aktuellen Quellzweig in einer separaten Python-Umgebung. |

### Windows-Archiv

1. Öffnen Sie die [RVC WebUI (Mainline - Original RVC) Windows-Paket- und Asset-Downloads](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) und wählen Sie das Archiv aus, das zu Ihrer GPU passt. Suchen Sie für die aktuelle Paketfamilie nach der Variante `20260718` NVIDIA, NVIDIA 50-Serie oder AMD/Intel. Wenn Sie bereits über eine ältere Version verfügen, die funktioniert, belassen Sie diese in einem eigenen Verzeichnis.
2. Extrahieren Sie das gesamte Archiv in einen beschreibbaren lokalen Ordner wie `C:\RVC\Mainline`. Lassen Sie Platz für den Download und die extrahierten Dateien. Öffnen Sie im Datei-Explorer den resultierenden Ordner und suchen Sie nach dem Launcher `assets` und der Python-Laufzeitumgebung. Wenn Sie ein weiteres umschließendes Verzeichnis sehen, öffnen Sie es.
3. Führen Sie `go-webui.bat` aus, falls vorhanden. Ältere Archive nennen es möglicherweise `go-web.bat`. Lassen Sie das Befehlsfenster geöffnet und warten Sie auf die lokale Adresse. Wenn der Browser nicht startet, öffnen Sie die im Terminal angezeigte Adresse. Ein üblicher Standardwert ist `http://127.0.0.1:7865`.
4. Bestätigen Sie, dass die Seite geöffnet wird und das Terminal weiterhin ausgeführt wird. Behalten Sie das Archiv bei, bis die [erste Konvertierung](inference.md) erfolgreich ist.

### Aktueller Quellzweig

> **Empfohlen unter Windows:** Lade das [einsatzbereite Windows-Archiv](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) für deine GPU herunter. Die Installation aus dem Quellcode wird den meisten Benutzern nicht empfohlen, da Python und seine Abhängigkeiten manuell eingerichtet werden müssen.

Laden Sie die [RVC WebUI (Mainline - Original RVC)-Quell-ZIP](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/archive/refs/heads/main.zip)] herunter und extrahieren Sie sie. Öffnen Sie ein Terminal im Verzeichnis, das `webui.py` und die Anforderungsdateien enthält. Die folgende Quellkonfiguration gilt für den Python 3.12-Zweig. Führen Sie jedes Snippet aus diesem Verzeichnis mit einem 64-Bit-Python 3.12-Interpreter aus.

**Windows PowerShell**

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
```

Wenn PowerShell das Aktivierungsskript blockiert, öffnen Sie die Eingabeaufforderung im selben Verzeichnis und führen Sie `.venv\Scripts\activate.bat` aus. Unter Windows fügen Sie [ffmpeg.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffmpeg.exe?download=true) und [ffprobe.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffprobe.exe?download=true) neben `webui.py` ein.

**Ubuntu 24.04**

```bash
sudo apt update
sudo apt install python3.12-venv python3.12-dev ffmpeg unzip libsndfile1 libportaudio2
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
```

Wählen Sie **einen** Abhängigkeitssatz. Die Dateinamen enthalten `requirments`, wie im Repository geschrieben. Führen Sie den passenden Block von oben nach unten aus.

**CPU, AMD oder Intel**

```text
python -m pip install -r requirments_cpu_py312.txt
```

**NVIDIA RTX 50-Serie**

```text
python -m pip install torch==2.7.1+cu128 torchaudio==2.7.1+cu128 --index-url https://download.pytorch.org/whl/cu128 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu128_py312.txt
```

**Unterstützte ältere NVIDIA-Karten**

```text
python -m pip install torch==2.7.1+cu118 torchaudio==2.7.1+cu118 --index-url https://download.pytorch.org/whl/cu118 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu118_py312.txt
```

Überprüfen Sie, welchen Interpreter und Torch-Build das Terminal verwendet:

```text
python -c "import sys, torch; print(sys.executable); print(torch.__version__); print(torch.cuda.is_available())"
```

Erwarten Sie, dass der Interpreterpfad `.venv` enthält. Die CUDA-Verfügbarkeit sollte `True` betragen, damit die NVIDIA CUDA-Inferenz funktioniert. CPU- und DirectML-Installationen können in dieser CUDA-Prüfung `False` anzeigen.

Installieren Sie die Shared-Feature- und Pitch-Modelle vor Ihrer ersten Konvertierung:

```text
python -m pip install huggingface_hub
hf download lj1995/VoiceConversionWebUI --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --local-dir assets/rmvpe
```

> Generische HuBERT-Checkpoints sind als Standardencoder für Stimmkonvertierung nicht empfohlen. Sie wurden für Sprachrepräsentationen trainiert und können Merkmale der Klangfarbe der Ausgangsstimme in die Ausgabe übertragen. Verwende den Encoder, den das RVC-Modell erwartet, etwa ContentVec, wenn das Modell damit trainiert wurde.

Windows DirectML-Setups, die das ONNX-Pitch-Modell verwenden, benötigen auch `hf download lj1995/VoiceConversionWebUI rmvpe.onnx --local-dir assets/rmvpe`. Der [Schulungsleitfaden](training.md) listet die zusätzlichen Schulungsressourcen auf.

Führen Sie `python webui.py` aus demselben Verzeichnis aus. Der Feature-Encoder sollte ein Ordner mit dem Namen `assets/hubert_base` sein, der die Konfiguration, die Vorverarbeitungskonfiguration und die Gewichtsdatei enthält. Wenn Sie ein älteres Archiv installiert haben, behalten Sie dessen gebündelte Dateien und Namenskonventionen bei.

## Wenn sich die WebUI nicht öffnet

| Was Sie sehen | Was Sie zuerst überprüfen sollten |
| --- | --- |
| Kein Browser-Tab | Lesen Sie die letzten Zeilen im Terminal und kopieren Sie die tatsächliche lokale URL. Wenn der Standardport ausgelastet ist, kann ein Build einen anderen auswählen. |
| Der Launcher öffnet sich und schließt sich sofort | Führen Sie es über eine vorhandene Eingabeaufforderung im extrahierten Ordner aus, damit Sie den ersten Fehler lesen können. Überprüfen Sie, ob die Extraktion abgeschlossen ist, bevor Sie Abhängigkeiten ändern. |
| `ModuleNotFoundError` bei einer Quellinstallation | Bestätigen Sie, dass Sie aus der für die Installation verwendeten virtuellen Umgebung gestartet haben. Schließen Sie die Installation der entsprechenden Anforderungen ab. |
| CUDA ist bei einem NVIDIA-Setup nicht verfügbar. | Überprüfen Sie das GPU-Modell, den Treiber und das Torch-Rad gemeinsam. Ein System der RTX 50-Serie benötigt den passenden Aufbau. |
| Fehlendes HuBERT, RMVPE oder FFmpeg | Überprüfen Sie die Asset-Ordner und ausführbaren Pfade oben. Versuchen Sie es erneut mit einer einfachen lokalen WAV-Datei, nachdem Sie die fehlende Datei korrigiert haben. |

Wenn sich die Benutzeroberfläche öffnet, fahren Sie mit [Ihrer ersten Dateikonvertierung](inference.md) fort.
