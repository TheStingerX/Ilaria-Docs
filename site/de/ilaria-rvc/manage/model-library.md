# Modellbibliothek und Fusion

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Weitere Bereiche](other-buttons.md)

## Format-Kompatibilitätsmatrix

| Datei / Asset | Zweck | Kompatible Vorgänge in Ilaria RVC | Anleitung |
| --- | --- | --- | --- |
| **Inferenz-`.pth`** | Stimmkonvertierung | Einzel-/Stapelinferenz, Voice Blender, Safetensors | [`.pth`-Dateien](../../start/pth-files.md) |
| **Trainings-Checkpoints (`G_*.pth` / `D_*.pth`)** | Training fortsetzen | Nur RVC-v2-Fortsetzung (nicht für Inferenz) | [Trainingsablauf](../train/training-workflow.md) |
| **Index (`added_*.index`)** | Optionaler Klangabgleich | Inferenz (mit passendem `.pth`) | [Index-Dateien](../../start/indexes.md) |
| **`.onnx`-Modelle** | ONNX-Echtzeit-Engines | Für externe DirectML-Clients (AMD/Intel) | [`.onnx`-Dateien](../../start/onnx-files.md) |
| **`.safetensors`** | Sichere Gewichtsspeicherung | Umwandlung über **Safetensors Converter** | [Safetensors-Konverter](safetensors-converter.md) |
| **Embedder** | Merkmalsextraktion | Inferenz & Training | [Embedder](../../start/embedders.md) |
| **Pretrained G/D** | Basisgewichte | Nur RVC-Training | [Pretrained-Modelle](../../start/pretrained.md) |
| **Voice Blender** | Stimmen mischen | Mischt zwei kompatible Inferenz-`.pth` | [Voice Blender](voice-blender.md) |

> **Warum ein Trainings-Checkpoint kein Inferenzmodell ist:** `G_*.pth` und `D_*.pth` in `app/logs/` enthalten den Optimizer-Zustand; nutze für Inferenz immer das exportierte `.pth` (~40–110 MB) in `models/`.

## Import, Prüfung und Sicherheit

1. Öffne **Other → Import local models** (oder lade per URL).
2. Bewahre `.pth` und `added_*.index` zusammen auf, aktualisiere die Liste und prüfe **Model information**.
3. **Sicherheit:** `.pth`-Dateien nutzen `pickle`; lade nur aus vertrauenswürdigen Quellen oder nutze `.safetensors`.

## Kompatible Stimmen mischen

Wähle zwei kompatible **Inferenz**-`.pth` in [Voice Blender](voice-blender.md) und teste mit `Index Ratio = 0`.
