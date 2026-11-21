---
label: "🎵 Pitch extractors"
order: 92
permalink: /pitch-extractors/
description: "Ein Pitch Extractor (auch F0-Extraktionsmethode genannt) ist der Algorithmus oder das neuronale Netz, das die Grundfrequenz (Tonhöhe, Melodie und Intonation) der Eingabestimme über die Zeit verfolgt."
---
# RVC Pitch Extractors (F0-Methoden)

Ein **Pitch Extractor** (auch **F0-Extraktionsmethode** genannt) ist der Algorithmus oder das neuronale Netz, das die Grundfrequenz (Tonhöhe, Melodie und Intonation) der Eingabestimme über die Zeit verfolgt.

Während ein [Embedder](embedders.md) liest, *welche Wörter und Laute* gesprochen oder gesungen werden, misst der **Pitch Extractor**, *wie hoch oder tief* die Stimme in jedem Sekundenbruchteil klingt.

!!!tip
**Kompatibilität:**
Anders als bei Embeddern **binden dich Pitch Extractors nicht an eine feste Wahl**. Selbst wenn ein Modell beim Dataset-Preprocessing mit `rmvpe` trainiert wurde, kannst du bei der Inferenz und im Live Voice Changer frei zwischen `rmvpe`, `rmvpe_gpu`, `fcpe` oder `crepe` wechseln.
!!!

## Kurze Empfehlung (Spezifisch für Ilaria RVC)

- **Einzel- und Batch-Inferenz (CUDA):** Ilaria RVC bietet `rmvpe`, `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest` und `crepe`. **`rmvpe`** ist der Standard-Startpunkt in der Oberfläche.
- **DirectML-Inferenz (AMD / Intel):** Es werden nur `pm`, `harvest`, `rmvpe` und `fcpe` angeboten.
- **Feature-Extraktion im Training:** `rmvpe_gpu` (zusammen mit `dio`) erscheint im **Training**-Tab für das Dataset-Preprocessing, nicht in den Inferenz-Menüs.
- **Live / Echtzeit Voice Changer:** `fcpe` oder `swift` bieten ein leichteres Tracking gegen Knackser bei geringer Latenz; keine einzelne Option ist pauschal für jede Stimme oder Aufnahme am besten.

---

## Alle bekannten Pitch Extractors im Vergleich

| Pitch Extractor | Typ | Tempo | Qualität & bester Einsatz | Hinweise |
| --- | --- | --- | --- | --- |
| **`rmvpe`** | Neuronales Netz | Schnell | **Standard in Ilaria RVC** für Sprache, Gesang und F0-Extraktion. | Kommt mit Konsonanten, Atemgeräuschen und leichtem Hall viel besser zurecht als klassische Methoden. |
| **`rmvpe_gpu`** | Neuronales Netz (CUDA-GPU) | **Sehr schnell** | Gleiche RMVPE-Architektur, gezielt auf der NVIDIA-GPU beim **Training**-Preprocessing ausgeführt. | Braucht genug freien VRAM; im Einzel-/Batch-Inferenz-Menü von Ilaria RVC nicht vorhanden. |
| **`fcpe`** | Neuronales Netz | **Ultraschnell** | **Schnelle Option für Echtzeit** und Inferenz mit niedriger Latenz. | Etwas leichter als `rmvpe`; hilfreich, wenn `rmvpe` im Live-Betrieb Aussetzer verursacht. |
| **`crepe` / `crepe-full`** | Neuronales Netz | Langsam | Sehr genau bei sauberem Solo-Gesang und Vibrato. | Auf GPU/CPU viel schwerer als `rmvpe`. Meist zu langsam für Live Voice Changer. |
| **`crepe-tiny`** | Neuronales Netz (klein) | Schnell | Leichtere `crepe`-Variante für ältere Systeme. | Ungenauer als `rmvpe` und `fcpe`. |
| **`harvest`** | Klassisches DSP (WORLD) | Sehr langsam (CPU) | Alte Methode für saubere Sprache. | Anfällig für Oktavsprünge und metallische Artefakte bei Gesang oder Rauschen. Braucht oft `filter_radius`. |
| **Parselmouth (`pm`)** | Klassisches DSP | Ultraschnell (CPU) | Schnelle Vorschau auf sehr schwachen PCs ohne GPU. | Verliert bei Gesang, Flüstern oder unsauberem Audio schnell die Tonhöhe. |
| **`dio`** | Klassisches DSP (WORLD) | Sehr schnell (CPU) | Alte schnelle CPU-Notlösung (vor allem bei der Training-Extraktion genutzt). | Weniger genau als `rmvpe` und `fcpe`; nicht für finale Exporte empfohlen. |
| **`hybrid[...]`** | Kombinierte Methoden | Langsam | Mischt zwei Extraktoren (z. B. `hybrid[rmvpe+fcpe]` oder `hybrid[crepe+rmvpe]`). | In Applio und manchen Forks verfügbar, um Oktavsprünge bei schwerem Gesang zu glätten, läuft aber langsamer. |
| **`swift` / `beatrice` / ONNX** | Leicht / ONNX | Sehr schnell | Optimierte Tracker in Ilaria RVC (CUDA) und neueren Forks. | Nützlich als leichte Alternative zu `rmvpe` für geringere Last oder anderes Tracking bei Sprache/Gesang. |

## `rmvpe` vs `rmvpe_gpu` in Ilaria RVC

In **Ilaria RVC** gehören beide Namen zu unterschiedlichen Phasen:
- **`rmvpe`** steht in **Single Inference**, **Batch Inference** und **Training** zur Auswahl.
- **`rmvpe_gpu`** ist eine Option im **Training**-Tab, die das F0-Auslesen des Datasets auf einer CUDA-GPU beschleunigt.
- Wenn `rmvpe_gpu` beim Training `CUDA out of memory` bei wenig VRAM (4 GB oder weniger) meldet, wechsle auf `rmvpe` oder `dio`.

## Welchen solltest du wählen?

1. **Neues Modell vorbereiten / trainieren:** Nutze **`rmvpe_gpu`** (bei NVIDIA-GPU mit 6+ GB VRAM) oder **`rmvpe`**. Sauberes F0-Tracking verhindert Tonfehler im trainierten Modell.
2. **Songs oder Sprache offline konvertieren:** Starte mit **`rmvpe`** (Standard in Ilaria RVC). Teste `fcpe`, `swift`, `beatrice` oder `crepe`, wenn Oktavsprünge oder Tonhöhen-Instabilitäten auftreten.
3. **Live-Mikrofon / Discord:** Starte mit **`fcpe`** oder **`rmvpe`**, je nachdem, was deine GPU bei deiner Chunk Size knackfrei schafft.
