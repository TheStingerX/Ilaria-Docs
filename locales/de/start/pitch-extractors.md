---
label: "🎵 Pitch extractors"
order: 92
permalink: /pitch-extractors/
description: "Ein Pitch Extractor (auch F0-Extraktionsmethode genannt) ist der Algorithmus oder das neuronale Netz, das die Grundfrequenz (Tonhöhe, Melodie und..."
---
# RVC Pitch Extractors (F0-Methoden)

Ein **Pitch Extractor** (auch **F0-Extraktionsmethode** genannt) ist der Algorithmus oder das neuronale Netz, das die Grundfrequenz (Tonhöhe, Melodie und Intonation) der Eingabestimme über die Zeit verfolgt.

Während ein [Embedder](embedders.md) liest, *welche Wörter und Laute* gesprochen oder gesungen werden, misst der **Pitch Extractor**, *wie hoch oder tief* die Stimme in jedem Sekundenbruchteil klingt.

!!!tip
**Kompatibilität:**
Anders als bei Embeddern **binden dich Pitch Extractors nicht an eine feste Wahl**. Selbst wenn ein Modell beim Dataset-Preprocessing mit `rmvpe` trainiert wurde, kannst du bei der Inferenz und im Live Voice Changer frei zwischen `rmvpe`, `rmvpe_gpu`, `fcpe` oder `crepe` wechseln.
!!!

## Kurze Empfehlung

- **Insgesamt am besten (Training & Konvertierung):** `rmvpe` oder `rmvpe_gpu` (bei NVIDIA-GPU).
- **Am besten für Live / Echtzeit Voice Changer:** `fcpe` (geringste Latenz) oder `rmvpe` (beste Qualität, sofern die GPU mitkommt).
- **Im Alltag vermeiden:** `pm`, `dio` und `harvest` sind ältere CPU-Methoden, die deutlich schlechter klingen oder viel langsamer als `rmvpe` und `fcpe` sind.

---

## Alle bekannten Pitch Extractors im Vergleich

| Pitch Extractor | Typ | Tempo | Qualität & bester Einsatz | Hinweise |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Neuronales Netz | Schnell | **Bester Allround-Standard** für Sprache, Gesang und Dataset-F0-Extraktion. | Kommt mit Konsonanten, Atemgeräuschen und leichtem Hall viel besser zurecht als ältere Methoden. |
| **`rmvpe_gpu`** | Neuronales Netz (CUDA-GPU) | **Sehr schnell** | Gleiche hohe Präzision wie `rmvpe`, gezielt auf der NVIDIA-GPU statt CPU ausgeführt. | Ideal in Ilaria RVC / RVC WebUI für lange Tracks, Batch-Läufe und schnelles Preprocessing. Braucht genug freien VRAM. |
| **`fcpe`** | Neuronales Netz | **Ultraschnell** | **Am besten für Echtzeit / Live** und Inferenz mit niedriger Latenz. | Etwas leichter als `rmvpe`; ideal, wenn `rmvpe` im Live-Betrieb Aussetzer verursacht. |
| **`crepe` / `crepe-full`** | Neuronales Netz | Langsam | Sehr genau bei sauberem Solo-Gesang und Vibrato. | Auf GPU/CPU viel schwerer als `rmvpe`. Meist zu langsam für Live Voice Changer. |
| **`crepe-tiny`** | Neuronales Netz (klein) | Schnell | Leichtere `crepe`-Variante für ältere Systeme. | Ungenauer als `rmvpe` und `fcpe`; meist durch `fcpe` überholt. |
| **`harvest`** | Klassisches DSP (WORLD) | Sehr langsam (CPU) | Alte Methode für saubere Sprache. | Anfällig für Oktavsprünge und metallische Artefakte bei Gesang oder Rauschen. Braucht oft `filter_radius`. |
| **Parselmouth (`pm`)** | Klassisches DSP | Ultraschnell (CPU) | Schnelle Vorschau auf sehr schwachen PCs ohne GPU. | Verliert bei Gesang, Flüstern oder unsauberem Audio schnell die Tonhöhe. |
| **`dio`** | Klassisches DSP (WORLD) | Sehr schnell (CPU) | Alte schnelle CPU-Notlösung. | Weniger genau als `rmvpe` und `fcpe`; nicht für finale Exporte empfohlen. |
| **`hybrid[...]`** | Kombinierte Methoden | Langsam | Mischt zwei Extraktoren (z. B. `hybrid[rmvpe+fcpe]` oder `hybrid[crepe+rmvpe]`). | In Applio und manchen Forks verfügbar, um Oktavsprünge bei schwerem Gesang zu glätten, läuft aber langsamer. |
| **`swift` / `onnx`-Varianten** | Leicht / ONNX | Sehr schnell | Optimierte Tracker in neueren Forks (wie Applio oder Deiteris). | Nützlich auf CPU oder DirectML, wo Standard-PyTorch-Methoden langsamer sind. |

## `rmvpe` vs `rmvpe_gpu`: Was ist der Unterschied?

In Apps wie **Ilaria RVC** und **RVC Mainline** siehst du oft sowohl `rmvpe` als auch `rmvpe_gpu`:
- **`rmvpe`** kann auf der CPU laufen oder der Standard-Zuweisung der App folgen, spart etwas VRAM, kann aber bei langen Dateien oder großen Datasets bremsen.
- **`rmvpe_gpu`** führt RMVPE ausdrücklich auf deiner **CUDA-GPU** aus und liefert exakt dieselbe Tonhöhen-Qualität bei deutlich höherem Tempo beim F0-Auslesen und Offline-Konvertieren.
- Wenn `rmvpe_gpu` bei wenig VRAM (4 GB oder weniger) `CUDA out of memory` meldet, wechsle zurück auf `rmvpe` oder `fcpe`.

## Welchen solltest du wählen?

1. **Neues Modell vorbereiten / trainieren:** Nutze **`rmvpe_gpu`** (bei NVIDIA-GPU mit 6+ GB VRAM) oder **`rmvpe`**. Sauberes F0-Tracking verhindert Tonfehler im trainierten Modell.
2. **Songs oder Sprache offline konvertieren:** Starte mit **`rmvpe`** oder **`rmvpe_gpu`**. Teste `crepe-full` oder `hybrid` nur, wenn ein einzelner hoher Ton einen Oktavsprung macht.
3. **Live-Mikrofon / Discord:** Starte mit **`fcpe`** für geringste Verzögerung, oder **`rmvpe`**, wenn deine GPU die Chunk Size knackfrei schafft.
