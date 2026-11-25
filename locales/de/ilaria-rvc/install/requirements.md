---
label: "Systemanforderungen"
icon: ":clipboard:"
order: 83
permalink: /ilaria-rvc/requirements/
description: "Ilaria RVC läuft lokal auf deinem PC mit PyTorch 2.10.0 und NVIDIA CUDA."
---
# Systemanforderungen für Ilaria RVC

> **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · Das vollständige Windows-Paket ist Version 2.4.7. Aktualisiere von 2.4.2–2.5.0 über **Other → Update Ilaria RVC → Check for updates → Download and restart**. Das Update-ZIP enthält weder die Laufzeit noch die Modellgewichte. [Windows-Update als ZIP](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [Kompatible GPUs](gpu-compatibility.md) · [Cloud-Optionen](../cloud/cloud.md)

Ilaria RVC läuft lokal auf deinem PC mit **PyTorch 2.10.0** und **NVIDIA CUDA**. Da Stimmkonvertierung (Inferenz) und Modelltraining sehr unterschiedliche Hardware-Ansprüche haben, prüfe vor der Installation beide Tabellen unten.

> **Keine geeignete NVIDIA-GPU?** Du kannst Ilaria RVC über [Kaggle](../cloud/kaggle.md), [Google Colab](../cloud/colab.md) oder [Lightning AI Studio](../cloud/lightning-ai.md) auf Cloud-GPUs ausführen.

## 1. Kurzübersicht: Minimum vs. Empfohlen

| Komponente | Minimum (Inferenz / Basisnutzung) | Empfohlen (Flüssige Inferenz & Training) |
| --- | --- | --- |
| **Betriebssystem** | Windows 10 64-Bit | Windows 10 oder Windows 11 (64-Bit, aktuell) |
| **GPU** | Dedizierte **NVIDIA**-GPU mit **4 GB VRAM** (Maxwell, Pascal, Volta, GTX 16 oder RTX) | Dedizierte **NVIDIA RTX**-GPU mit **8–12 GB+ VRAM** (z. B. RTX 3060 12 GB, RTX 4060 Ti / 4070 oder neuer) |
| **CUDA-Runtime** | CUDA **12.8** (enthalten) oder CUDA **12.6** (Auto-Download für Maxwell/Pascal/Volta) | CUDA **12.8** (im ZIP für GTX 16 / RTX 20–50 enthalten) |
| **Arbeitsspeicher (RAM)** | **8 GB** | **16 GB** oder **32 GB** (besonders für Training & Index-Erstellung) |
| **Speicherplatz** | **25 GB** frei (ZIP + entpackte App + Modelle) | **50 GB+ frei auf SSD** (Datasets, Checkpoints, Pretraineds) |
| **CPU** | Moderner 4-Kern-x64-Prozessor | 6–8+ Kerne x64 (beschleunigt Preprocessing & Index-Suche) |
| **Browser** | Jeder moderne Browser (für `http://127.0.0.1:6969`) | Chrome, Edge oder Firefox (aktuell) |

## 2. Detaillierte GPU- & VRAM-Anforderungen

Das Windows-Paket von Ilaria RVC ist für **NVIDIA-GPUs** gebaut. Integrierte Intel-Grafik, Intel Arc und AMD-GPUs werden vom Windows-Paket nicht unterstützt.

### Nach GPU-Generation (CUDA-Runtime)

- **GeForce GTX 16 und RTX 20, 30, 40, 50**: nutzt direkt die enthaltene **PyTorch 2.10.0 + CUDA 12.8**-Runtime. Achte auf aktuelle NVIDIA-Treiber (besonders bei der RTX-50-Serie).
- **Maxwell, Pascal und Volta** (z. B. GTX 750/900/1000-Serie, TITAN X/V, Tesla P4/P40/P100/V100): beim ersten Start lädt und prüft `RUN_ILARIA_RVC.bat` automatisch **PyTorch 2.10.0 + CUDA 12.6** nach `runtime-cu126` herunter und nutzt es danach weiter.
- **Validierungshinweis**: Compute, Backpropagation und ContentVec-Laden wurden direkt auf einer **RTX 4070** getestet. Weitere Karten in der [GPU-Kompatibilitätsliste](gpu-compatibility.md) sind aufgrund von Architektur und CUDA-Unterstützung zu erwarten.

### Nach VRAM-Kapazität (was du ausführen kannst)

| VRAM | Inferenz (Audiokonvertierung) | Training (Stimmmodelle erstellen) |
| --- | --- | --- |
| **4 GB** | Funktioniert für einzelne, kurze Clips; schließe GPU-lastige Apps (Spiele, Browser mit Hardwarebeschleunigung). | Sehr knapp; nur kleine Batch-Größen (`1–2`) mit FP16/niedriger Sample-Rate oder Risiko von Speichermangel. |
| **6 GB** | Flüssig für Einzel- und Batch-Inferenz. | Möglich mit kleiner Batch-Größe (`2–4`) und FP16-Präzision. |
| **8 GB** | Mühelos für Inferenz und Batch-Konvertierung. | Gut für `32k` / `40k` / `48k`-Training mit mittleren Batch-Größen (`4–8`). |
| **12 GB+** | Flüssig auch neben anderen Programmen. | **Ideal**: komfortable Batch-Größen (`8–16+`), schnellere Epochen und `48k`-Training ohne Speicherfehler. |

## 3. Speicherplatz, RAM und Netzwerk

### Speicherplatz-Aufschlüsselung

- **Download-Archiv**: ca. **5,00 GB** (`ILARIA_RVC-2.4.7.zip`). Plane während der Installation Platz für ZIP und entpackten Ordner ein.
- **Entpackte App**: ca. **10–15 GB** (enthält PyTorch/CUDA-Runtime, **ContentVec** und **RMVPE**).
- **Zusätzlicher Bedarf je nach Nutzung**:
  - `runtime-cu126` (nur Maxwell/Pascal/Volta): mehrere GB zusätzlich beim ersten Start.
  - Optionale Embedder (**Other → Download embedders**) und G/D-Pretrained-Paare.
  - **Training-Checkpoints** (`app/logs/`) und **Datasets** (`app/datasets/`): ein Training kann je nach Speicherintervall **2–10+ GB** belegen.
- **SSD empfohlen**: Entpacken, Laden von Modellen und Lesen von Datasets laufen auf NVMe-/SATA-SSDs spürbar schneller als auf einer HDD.

### Arbeitsspeicher (RAM)

- **8 GB RAM** reichen für kurze Inferenz-Clips, wenn schwere Hintergrundprogramme geschlossen sind.
- **16 GB+ RAM** werden für **Training**, **Audio-Preprocessing**, **FAISS-Index-Erstellung** und **Audio Analyzer** mit mehreren Dateien dringend empfohlen.

### Internetverbindung

- **Erforderlich** für: Download der Release-ZIP, Download von CUDA 12.6 beim ersten Start auf Maxwell/Pascal/Volta, optionale Embedder/Pretraineds, Import von Hugging Face/Google Drive/MEGA oder Updates (**2.4.0 → 2.4.1**).
- **Nicht erforderlich** für: Inferenz oder Training, sobald Runtimes und Modelle lokal vorliegen.

## 4. PC automatisch prüfen

Ilaria RVC bietet unter **Other → PC training advisor** eine integrierte Prüfung:

1. Wähle **Sample rate to plan for**, **Precision to evaluate** und **GPU to evaluate**.
2. Klicke auf **Scan PC and suggest settings**.
3. Prüfe **PC Advisor Log** für empfohlene Startwerte (Präzision, Batch-Größe) und kontrolliere den echten VRAM-Verbrauch in einem kurzen Testlauf.
