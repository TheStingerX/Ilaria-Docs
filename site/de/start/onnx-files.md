# RVC ONNX-Dateien (`.onnx`)

Neben [`.pth`](pth-files.md)- und [`.index`](indexes.md)-Dateien begegnen dir bei RVC-Voice-Changern manchmal auch **`.onnx`-Dateien**.

Im RVC-Ökosystem werden **`.onnx`-Modelle meist für Echtzeit-Anwendungen (Realtime) auf AMD- und Intel-Grafikkarten** genutzt (über **DirectML** / ONNX Runtime unter Windows) sowie in einigen plattformübergreifenden Live-Clients.

---

## 1. Was ist eine `.onnx`-Datei?

**ONNX** (*Open Neural Network Exchange*) ist ein offenes, framework-unabhängiges Format zum Ausführen trainierter neuronaler Netze. Statt auf PyTorch und NVIDIA CUDA angewiesen zu sein, läuft eine `.onnx`-Datei über **ONNX Runtime**, das verschiedene Grafikkarten und Betriebssysteme unterstützt.

Für RVC-Nutzer ist das vor allem bei **Live-Voice-Changern** wichtig (z. B. **Deiteris w-okada Fork**, **w-okada VCClient** oder **RVC Mainline DirectML**):
- **AMD Radeon**- und **Intel Arc / integrierte GPUs** können kein NVIDIA CUDA ausführen.
- Mit **ONNX Runtime + DirectML** beschleunigen AMD- und Intel-Karten die Live-Konvertierung unter Windows flüssig.

---

## 2. `.onnx` vs. `.pth`: Die wichtigsten Unterschiede

| Merkmal | `.pth` (PyTorch) | `.onnx` (ONNX Runtime) |
| --- | --- | --- |
| **Haupteinsatz** | Standard-Training, Offline-Konvertierung & Live auf NVIDIA CUDA | **Echtzeit-Voice-Changer**, besonders auf **AMD- und Intel-GPUs (DirectML)** |
| **Training / Fortsetzen** | Rohe `G`/`D`-Checkpoints können Training fortsetzen | **Nur Inferenz** (kein Training oder Fortsetzen möglich) |
| **Merge Models / Voice Blender** | Unterstützt (kompatible `.pth`-Dateien) | **Nicht unterstützt** (`.onnx` nicht mischbar) |
| **Safetensors-Konvertierung** | Unterstützt ab Ilaria RVC 2.4.5 | **Nicht unterstützt** |
| **RVC-Metadaten in der Datei** | Vollständige Stimmkonfiguration (`sr`, `f0`, `v1`/`v2`, Vocoder, Embedder) | Minimaler Tensor-Graph; der Live-Client muss Sample-Rate und Version kennen |

---

## 3. So erhältst du eine `.onnx`-Datei aus einer `.pth`

Die meisten RVC-Stimmen werden als `.pth` geteilt, nicht als `.onnx`. Wenn du eine `.onnx` brauchst:

1. **Automatische Umwandlung im Live-Client:** Manche Echtzeit-Apps (**w-okada**, **Deiteris**) akzeptieren `.pth` direkt oder wandeln sie für DirectML in `.onnx` um.
2. **Manueller ONNX-Export:** Programme wie **Ilaria RVC**, **Applio** und **RVC Mainline** bieten eine Funktion **Export ONNX**, um eine Inferenz-`.pth` in `.onnx` zu exportieren.
3. **Original-`.pth` immer behalten:** Lösche niemals deine originale `.pth` und `added_*.index`, da `.onnx` weder gemischt noch in `.safetensors` umgewandelt oder für PyTorch-Tools genutzt werden kann.

---

## 4. Tipps für `.onnx` im Live-Betrieb

- **Bei Störungen unter DirectML auf `FP32` stellen:** DirectML auf AMD/Intel hat bei `FP16` oft Fehler; wechsle auf `FP32`, wenn der Ton abbricht.
- **Windows HAGS nur bei Bedarf testen:** **Hardware-Accelerated GPU Scheduling** ist standardmäßig nicht schädlich; bei starker GPU-Last kannst du es testweise in den Windows-Grafikeinstellungen deaktivieren (neu starten, vorher/nachher vergleichen und bei fehlendem Nutzen wieder aktivieren).
- **Überall `48000 Hz` nutzen:** Stelle Mikrofon, Kopfhörer und `VB-CABLE` in der Windows-Sound-Systemsteuerung (`mmsys.cpl`) auf `48000 Hz`, um `PortAudioError` zu verhindern.
