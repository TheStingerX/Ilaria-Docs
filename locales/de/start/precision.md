---
label: "⚡ Präzision (FP16 / FP32 / BF16)"
order: 89
permalink: /precision/
description: "Einsteigerfreundlicher Guide zu RVC-Präzisionsmodi (FP16, FP32, BF16): Bedeutung, GPU-Kompatibilität, Training vs. Inferenz und Lösungen für NaN- oder HalfTensor-Fehler."
---
# Präzision bei Training & Inferenz (`FP16`, `FP32`, `BF16`)

Beim Trainieren oder Konvertieren von Stimmen in RVC siehst du oft eine Einstellung namens **Precision** (mit Optionen wie `FP32`, `FP16` und `BF16`).

Für Einsteiger klingen diese Kürzel technisch, das Prinzip dahinter ist aber ganz einfach. Dieser Guide erklärt, was jeder Modus bedeutet, welcher zu deiner Grafikkarte passt und wie du typische Fehler vermeidest.

---

## 1. Was bedeutet „Präzision“ einfach erklärt?

Ein KI-Stimmenmodell besteht aus Millionen von Dezimalzahlen (den sogenannten **Gewichten**). Bei jedem Training oder jeder Stimmkonvertierung multipliziert deine GPU Millionen dieser Zahlen pro Sekunde.

**Präzision** legt einfach fest, **wie genau jede Zahl gespeichert wird** (wie viele Bit Speicher sie belegt):

- **`FP32` (Volle Präzision, 32-Bit):** Bewahrt volle Nachkomma-Genauigkeit und einen riesigen Zahlenbereich. Der sicherste und kompatibelste Modus, braucht **aber** mehr VRAM und rechnet langsamer.
- **`FP16` (Halbe Präzision, 16-Bit):** Braucht halb so viel Speicher wie `FP32` und läuft auf modernen NVIDIA-GPUs deutlich schneller. Wegen des kleineren Zahlenbereichs können extreme Spitzen beim Training gelegentlich überlaufen (`NaN loss`). Auf älteren GTX 10, DirectML (AMD/Intel) und CPU funktioniert es meist schlecht oder gar nicht.
- **`BF16` (Brain Float 16, 16-Bit):** Braucht **genauso wenig Speicher wie `FP16`**, behält **aber** den großen sicheren Zahlenbereich von `FP32` (und opfert nur winzige Nachkomma-Details). Kurz: `BF16` liefert Tempo und niedrigen VRAM wie `FP16` bei fast der Stabilität von `FP32`.

!!!tip
**Einfache Faustregel:**
Stell dir **`FP32`** als robusten LKW vor, der nie stecken bleibt, **`FP16`** als schnellen Sportwagen für glatte Straßen (sauberes Audio) und **`BF16`** als modernen Sportwagen mit Geländefahrwerk (schnell, sparsam beim VRAM und kaum zum Absturz zu bringen).
!!!

---

## 2. `FP32` vs `FP16` vs `BF16` im Vergleich

| Eigenschaft | `FP32` (Single / Full) | `FP16` (Half Precision) | `BF16` (Brain Float 16) |
| --- | --- | --- | --- |
| **Speicher pro Zahl** | 32 Bit (am größten) | 16 Bit (halb) | 16 Bit (halb) |
| **Trainingstempo** | Am langsamsten | **Schnell** (auf Tensor Cores) | **Schnell** (auf RTX 30+ Tensor Cores) |
| **VRAM-Verbrauch** | Am höchsten | **Niedrig (~40-50 % weniger)** | **Niedrig (~40-50 % weniger)** |
| **`NaN loss`-Risiko** | Minimal (nahe null) | Mittel (bei Clipping im Dataset) | **Sehr niedrig** (gleicher sicherer Bereich wie `FP32`) |
| **Hardware-Support** | **Alles** (alle GPUs, DirectML, CPU) | NVIDIA GTX 16 / RTX 20+ / T4 (fehlerhaft auf GTX 10, DirectML, CPU) | **NVIDIA RTX 30 / 40 / 50**, A100, L4, H100 (nicht auf RTX 20, GTX 16, T4, GTX 10) |
| **Finale Stimmqualität** | Referenz-Standard | Praktisch identisch | Praktisch identisch |

---

## 3. Welche Präzision solltest DU wählen? (Nach GPU)

Die richtige Wahl hängt fast ausschließlich von **deiner Grafikkarte** ab:

### NVIDIA RTX 30 / 40 / 50 Serie (sowie A100 / L4 / H100)
- **Beste Wahl:** **`BF16`** (sofern deine RVC-App es anbietet, z. B. **Ilaria RVC** oder **Applio**). Schnelles Training, wenig VRAM und deutlich weniger `NaN`-Abstürze als mit `FP16`.
- **Alternative:** **`FP16`** klappt ebenfalls sehr gut, falls `BF16` in der App fehlt.

### NVIDIA RTX 20 Serie, GTX 16 Serie oder Cloud T4 (Colab / Kaggle)
- **Beste Wahl:** **`FP16`**. Diese Karten unterstützen kein Hardware-`BF16`, daher bringt `FP16` den größten Tempo- und VRAM-Vorteil.
- **Wann wechseln:** Tritt beim Training `NaN loss` auf, prüfe dein Dataset auf Übersteuerung oder wechsle auf **`FP32`**.

### NVIDIA GTX 10 Serie (1060, 1070, 1080 Ti) oder älter
- **Beste Wahl:** **Nur `FP32`**. Die GTX-10-Serie (Pascal) hat keine schnellen Tensor Cores für `FP16`; `FP16` führt oft zu `HalfTensor`-Fehlern oder ist sogar *langsamer* als `FP32`.

### AMD / Intel GPUs (DirectML) oder nur CPU
- **Beste Wahl:** **Nur `FP32`**. DirectML und CPU stürzen bei `FP16` oder `BF16` meist mit `expected scalar type Half but found Float` ab.

---

## 4. Trainings-Präzision vs. Export- / Inferenz-Präzision

Einsteiger verwechseln oft die **Trainings-Präzision** mit der **Export-/Inferenz-Präzision**:

### Während des Trainings (Mixed Precision / AMP)
- Moderne RVC-Trainer nutzen **Automatic Mixed Precision (AMP)**, wenn du `FP16` oder `BF16` wählst: Schwere GPU-Berechnungen laufen schnell in 16-Bit, während wichtige Basiswerte sicher in 32-Bit bleiben.
- Training mit `BF16` oder `FP16` macht die fertige Stimme **nicht** schlechter oder blecherner: Sauber trainierte `BF16`-, `FP16`- und `FP32`-Modelle klingen praktisch identisch.

### Bei Inferenz, Export & Voice Blender
- **Inferenz / Speichern als `.pth` in `FP16`:** Halbiert die `.pth`-Dateigröße ungefähr (ca. 45-55 MB statt 95-110 MB) und läuft schneller auf NVIDIA-CUDA-GPUs ohne hörbaren Qualitätsverlust.
- **Inferenz / Speichern als `.pth` in `FP32`:** Erzeugt eine größere `.pth`-Datei, läuft **aber** überall (inklusive GTX 10, DirectML und CPU).
- Du kannst eine in `FP16` exportierte `.pth` problemlos in einer App mit `FP32`-Inferenz laden (sie wird automatisch umgewandelt) oder im [Voice Blender](../ilaria-rvc/manage/voice-blender.md) zwischen `FP16` und `FP32` wählen.

---

## 5. Häufige Präzisions-Fehler & Lösungen

| Fehler oder Symptom | Ursache | So behebst du es |
| --- | --- | --- |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | `FP16` war auf einer nicht unterstützten GPU/Backend aktiv (GTX 10, DirectML oder CPU). | Schalte **`FP16`** in den Einstellungen **AUS** und wechsle auf **`FP32`**. |
| `BF16 is not supported on this device` | Du hast `BF16` auf einer älteren GPU (RTX 20, GTX 16, T4, GTX 10) oder CPU gewählt. | Wechsle auf **`FP16`** (RTX 20 / GTX 16 / T4) oder **`FP32`** (GTX 10 / DirectML / CPU). |
| `NaN loss` oder stummes Modell beim `FP16`-Training | Übersteuertes Audio oder hohe Gradienten haben den engeren `FP16`-Bereich gesprengt. | Prüfe das Dataset mit dem [Dataset Checker](../ilaria-rvc/train/datasets.md) und starte neu mit **`BF16`** (RTX 30+) oder **`FP32`**. |
| `CUDA out of memory` beim Training in `FP32` | `FP32` braucht pro Batch rund doppelt so viel VRAM wie 16-Bit-Modi. | Senke **Batch Size** (z. B. `4` -> `2` -> `1`) oder wechsle auf **`BF16`** / **`FP16`**, falls deine GPU es unterstützt. |
