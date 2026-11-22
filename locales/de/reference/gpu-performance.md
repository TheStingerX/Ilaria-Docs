---
label: "GPU-Leistung & Fehlerbehebung"
icon: ":zap:"
order: 91
permalink: /gpu-performance/
description: "Übergreifender Leitfaden zu GPU-Auslastung, VRAM, Power-Limits, Thermal Throttling, CUDA/CPU-Engpässen und Gaming-Konflikten in RVC-Apps."
---
# GPU-Leistung & Fehlerbehebung

Stimmkonvertierung und RVC-Training hängen stark von GPU-Rechenleistung, Speicherbandbreite und stabiler Taktung ab.

## 1. Wichtige GPU-Kennzahlen

- **GPU-Auslastung:** Beim **Training** sind 80–99 % normal. Im **Live-Betrieb** entsteht kurze Burst-Last; lastet ein Spiel die GPU zu 95–100 % aus, stottert das Audio.
- **VRAM:** **Batch Size**, Sample-Rate und **Dataset GPU Caching** bestimmen den VRAM-Bedarf (`CUDA out of memory` bei Überlauf).
- **Temperatur & Thermal Throttling:** Bei Überhitzung drosselt die GPU automatisch, was Epochen verlangsamt oder **GPU Delay**-Spitzen erzeugt.
- **Power-Limits & Laptops:** Im Akkubetrieb werden Watt und Takte stark begrenzt; immer Netzteil anschließen.

## 2. Einstellungen mit dem größten Einfluss

| Einstellung | Einfluss beim Training | Einfluss im Live-Betrieb |
| --- | --- | --- |
| **Batch Size** | Größere Batches brauchen mehr VRAM; bei OOM reduzieren | Live nicht genutzt |
| **Block / Chunk Size** | Im Training nicht genutzt | Größere Blöcke = stabiler, aber mehr Latenz |
| **Präzision (`FP32` / `FP16` / `BF16`)** | `BF16` (RTX 30/40/50) und `FP16` sparen VRAM & Zeit; `FP32` ist sicherer Fallback | `FP16` schneller auf unterstützten NVIDIA-Karten; DirectML braucht oft `FP32` |
| **Pitch-Extraktor (`rmvpe` / `fcpe`)** | `rmvpe` ist Standard für F0-Genauigkeit | `fcpe` oder `rmvpe` sind schnell; `crepe` full live vermeiden |

## 3. Häufige Engpässe lösen

1. **Gaming + Live Voice Changer:** Spiel-FPS begrenzen oder **Block Size** um eine Stufe erhöhen.
2. **Windows HAGS:** Standardmäßig nicht schädlich; bei unerklärlichem Stottern testweise deaktivieren, neu starten und vorher/nachher vergleichen.
3. **CPU-Engpässe:** Alle Audiogeräte in Windows auf `48000 Hz` abgleichen und **Workers** anpassen.
4. **Treiber & Kühlung:** Saubere NVIDIA Studio/Game-Ready-Treiber und freie Lüftung nutzen.

## 4. Optionale erweiterte Optimierung (NVIDIA)

Auf unterstützten NVIDIA-GPUs ist `nvidia-smi` GPU Clock Locking ein **optionaler** Test; siehe [Vonovox Erweiterte Leistungsoptimierung](../other-rvcs/vonovox/advanced-performance-optimization.md).

[VRAM- und Trainingsrechner](vram-estimator.md)
