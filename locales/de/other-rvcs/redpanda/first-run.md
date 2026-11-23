---
label: "Redpanda VC einrichten"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/redpanda/first-run/
description: "Beginne mit der vorkompilierten Version für Windows x64. Die Desktop-App nutzt Tauri und führt die Python-Sprachengines lokal aus. Der Quellcode enthält außerdem eine WebUI mit derselben Oberfläche."
---

# Redpanda VC einrichten

[Vorkompilierte Version für Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Beginne mit der vorkompilierten Version für Windows x64. Die Desktop-App nutzt Tauri und führt die Python-Sprachengines lokal aus. Der Quellcode enthält außerdem eine WebUI mit derselben Oberfläche.

## Windows x64

1. Lade die Windows-x64-ZIP herunter, entpacke sie vollständig in einen beschreibbaren lokalen Ordner und öffne dort `Redpanda.exe`.
2. Warte, bis die Einrichtung beendet ist. Falls keine Laufzeit wiederverwendet werden kann, richtet die App Python 3.12 und PyTorch über `uv` ein und erkennt NVIDIA CUDA oder CPU. Lass `runtime/`, `assets/`, `datasets/`, `models/` und `logs/` zusammen.
3. Öffne **Inference**, wähle eine passende Stimme und teste eine kurze WAV-Datei. Prüfe bei Startproblemen den ersten Fehler, Schreibrechte, Internetzugang für Downloads und gegebenenfalls den NVIDIA-Treiber.

## WebUI und Builds aus dem Quellcode

Führe im Quellcode-Checkout unter Windows `run-install.bat` oder unter Linux/macOS `run-install.sh` aus. Starte die WebUI mit `run-web.bat`, `run-web.sh` oder `python core.py web --host 127.0.0.1 --port 7860` in der vorbereiteten Python-Umgebung. Für den Desktop-Build brauchst du Rust und die WebView-Werkzeuge der Plattform. Die Verbesserungen der portablen Laufzeit und das Design Dark Frutiger Aero kamen nach dem Release-Tag hinzu.

[Datei-Inferenz](inference.md) · [Stimmkonvertierung in Echtzeit](live-audio.md) · [Training mit Casual Voice Changer](causal-training.md) · [RVC Training](training.md)

## Quellcode und Release

[README](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/README.md) · [Runtime](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/src/runtime.rs)
