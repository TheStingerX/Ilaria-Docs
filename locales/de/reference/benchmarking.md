---
label: "Benchmarks & Leistungsvergleich"
icon: ":stopwatch:"
order: 90
permalink: /benchmarking/
description: "So misst du RVC-Trainingsgeschwindigkeit, Echtzeitfaktor, GPU Delay, End-to-End-Latenz, VRAM und Throttling mit wiederholbaren A/B-Tests."
---
# Benchmarks & Leistungsvergleich

Verlasse dich nicht auf Schätzungen: miss deine eigene Hardware mit **wiederholbaren A/B-Tests** und ändere jeweils **nur eine Variable**.

## 1. Relevante Messwerte

### Training

- **Steps pro Sekunde & Epochendauer** (im Trainings-Log / TensorBoard).
- **VRAM-Nutzung** (`nvidia-smi` oder Task-Manager) bei gewählter **Batch Size**, **Präzision** und **GPU Caching**.
- **Leistungsaufnahme & Temperatur** (`nvidia-smi -i 0 -q -d PERFORMANCE`) zur Erkennung von **Throttling**.

### Inferenz & Echtzeit

- **Inferenzzeit & Real-Time Factor (RTF):** Konvertierungsdauer geteilt durch Cliplänge (`RTF < 1.0` = schneller als Echtzeit).
- **GPU Delay vs. End-to-End-Latenz:** **GPU Delay** misst nur die GPU-Zeit pro Block; die **Gesamtlatenz** umfasst Mikrofon, **Block Size**, Crossfade, virtuelles Kabel und Discord/OBS/Spiel-Puffer.

## 2. Wiederholbares A/B-Protokoll

1. **Basis (Test A):** Optionale Eingriffe zurücksetzen, festes Modell und identisches Audio nutzen.
2. **Stabilisieren & messen:** Lange genug testen für reale Erwärmung (z. B. **10–15 Minuten** live oder mehrere volle Epochen).
3. **Nur eine Einstellung ändern (Test B)** bei gleicher GPU-Hintergrundlast.
4. **Objektiv vergleichen:**

| Messwert | Basis (Test A) | Variante (Test B) |
| --- | --- | --- |
| Epochendauer / Steps pro Sek. (Training) | `____` | `____` |
| Durchschnittlicher **GPU Delay** & Spitze (Live) | `____ ms / ____ ms` | `____ ms / ____ ms` |
| Aussetzer / Knacken | `Ja / Nein (Anzahl)` | `Ja / Nein (Anzahl)` |
| Peak-VRAM & GPU-Temperatur | `____ GB / ____ °C` | `____ GB / ____ °C` |
| Throttling beobachtet | `Ja / Nein` | `Ja / Nein` |

5. **Nur belegte Vorteile behalten:** Ohne klaren Gewinn zu Test A zurückkehren.

[VRAM- und Trainingsrechner](vram-estimator.md)
