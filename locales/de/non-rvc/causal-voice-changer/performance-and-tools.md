---
label: "Leistung, Bereinigung & Tools"
icon: ":wrench:"
order: 95
permalink: /non-rvc/causal-voice-changer/performance-and-tools/
description: "Nimm Sitzungen direkt in CausalVC Realtime auf (zuerst Konvertierung starten):"
---
# Leistung, Klangbereinigung & weitere Tools

## 1. Leistung & Latenz (Seite `Performance`)

### Buffering

- **Chunk** (in `20-ms`-Schritten): wie viel Audio jeweils auf einmal konvertiert wird. Gesamtlatenz = feste **60 ms** Lookahead + **1 Chunk** + Soundkarten-/Virtual-Cable-Puffer.
  - Kleinere Chunks = geringere Latenz, erfordern aber eine schnellere GPU.
  - Bei Knacksern oder Aussetzern (oder auf CPU bei älteren AMD-Karten) **Chunk** auf `40 ms` oder `60 ms+` erhöhen.
- **Extra inference buffer**: wie weit das Modell pro Chunk zurückblickt. Mehr Kontext stabilisiert Klang und Tonhöhe bei geringem GPU-Aufwand **ohne zusätzliche Latenz**.

### Inferenz & GPU

- **Pitch detector**:
  - **RMVPE (empfohlen)**: am genauesten.
  - **FCPE**: GPU-schonender.
  - **PM (fastest)**: am schnellsten, aber grober.
- **Pitch smoothing** *(nur RMVPE)*: verfolgt die Tonhöhe als durchgehende Linie ohne Oktavsprünge bei gehaltenen Tönen (keine Zusatzlatenz).
- **Volume envelope**: `0` folgt exakt deiner Mikrofonlautstärke; `1` behält die Lautstärke des Modells.
- **Fast GPU replay** *(standardmäßig an)*: zeichnet die GPU-Arbeit einmal auf und spielt sie pro Chunk ab - rund **2× schneller** und viel stabiler (z. B. konvertiert eine RTX 5050 einen `20-ms`-Chunk in `4,4 ms` statt `9,7 ms`). Nur deaktivieren, wenn deine GPU damit Fehler macht.
- **Qualitäts- & Nahthilfen**:
  - **Soften sudden treble**: glättet kurze Klicks bei plötzlichen Höhen mitten im Wort (fügt `5 ms` Latenz hinzu).
  - **Match level across seams**: hält den Höhenpegel zwischen Blöcken gleichmäßig (keine Zusatzlatenz).
  - **Hold context during silence**: merkt sich die letzten Wörter in Pausen, damit das erste Wort nach Stille nicht verschmiert.
  - **Silence detection**: **Loudness** (`-50 dBFS`) für ruhige Räume; **Voice detection (experimentell)** nutzt RNNoise, damit Lüfter/Brummen nicht als Sprache zählen.

## 2. Klangbereinigung (`Noise Reduction`)

- **Input noise reduction**: entfernt Tastatur, Lüfter oder Raumgeräusche vor der Konvertierung:
  - **Hushwire (Amazon Voice Focus)** *(Standard)*: stärkste Bereinigung und natürlichste Stimme; fügt ca. **55 ms** Latenz hinzu. Das Modell wird erst nach deiner Zustimmung einmalig von Amazon heruntergeladen.
  - **RNNoise**: leichtere Bereinigung mit weniger Latenz (**20 ms**).
- **Output noise reduction**: entfernt Rauschen aus der konvertierten Stimme per Spectral Gating. Aus lassen, solange kein Rauschen hörbar ist.

## 3. Aufnahme (Seite `Recording`)

Nimm Sitzungen direkt in CausalVC Realtime auf (zuerst Konvertierung starten):
- **Separate files**: speichert rohes Eingangssignal und konvertierte Ausgabe getrennt.
- **Mix**: speichert Eingang + Ausgabe gemischt.
- **Split L/R**: roher Eingang links, konvertierte Ausgabe rechts.

## 4. Bibliothek, Offline-Konvertierung & Logs

- **Seite Library**: Stimmen suchen/sortieren, **Rename**, **Move to Trash**, **Open folder**, **Add/Replace `.index`** oder per **Export** als `.cvc` samt Einstellungen sichern.
- **Offline-Konvertierung ganzer Dateien**: über die Kommandozeile mit `causalvc.infer`:
  ```bash
  uv run python -m causalvc.infer --help
  ```
- **Seite Log**: bei Problemen über **Save log** Diagnose-Logs exportieren.
