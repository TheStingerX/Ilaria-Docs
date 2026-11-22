---
label: "Audio-Analyzer"
icon: ":chart_with_upwards_trend:"
order: 85
permalink: /ilaria-rvc/audio-analyzer/
description: "Öffne Other → Audio Analyzer in Ilaria RVC, um bis zu acht Audiodateien anhand von Wellenformen, Spektrogrammen, Durchschnittsspektrum, Pitch-Schätzung und Pegeltabellen zu vergleichen."
---
# Audio-Analyzer

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Öffne **Other → Audio Analyzer**. Füge bis zu acht Audiodateien zum Vergleichen hinzu. Ein sinnvolles Set enthält das Original-Eingangssignal, eine Basis-Konvertierung und ein bis zwei Varianten mit jeweils nur einer geänderten Einstellung.

## Was jede Ansicht misst

| Ansicht | Was sie direkt zeigt | Zu beantwortende Frage |
| --- | --- | --- |
| **Waveform** | Amplitude über die Zeit | Wo liegen laute Spitzen, oben abgeflachtes Clipping, leise Passagen oder harte Schnitte? |
| **Spectrogram** | Frequenzenergie über die Zeit | Welche Frequenzen sind genau in dem Moment vorhanden, in dem Zischen, Summen oder ein Artefakt beginnt? |
| **Average spectrum** | Gesamte Frequenzbalance | Klingt eine Version merklich heller, dumpfer oder hat sie eine anhaltende Resonanz? |
| **Pitch estimation** | Geschätzter F0-Verlauf über stimmhafte Segmente | Folgt die konvertierte Tonhöhe der beabsichtigten Melodie/Intonation ohne Oktavsprünge? |
| **Level & silence tables** | Gemessene Lautheits-/Spitzenpegel und Stille-Segmente | Vergleichst du Dateien bei ähnlicher Lautstärke und mit demselben Stille-Schwellenwert? |

> **Was Audio Analyzer misst vs. was er nahelegt:** Audio Analyzer zeichnet und misst direkt Signalpegel, Stille-Intervalle, Spektralenergie und geschätzte F0-Verläufe. Er erkennt **nicht** automatisch von selbst, ob ein Stimm-Timbre "gut" oder "schlecht" ist. **Höre immer den ausgewählten Bereich** im integrierten Player an, bevor du einen visuellen Unterschied als Problem behandelst.

## Praktische Beispiele: worauf achten

- **Clipping:** Oben abgeflachte Spitzen, die in der **Waveform** die maximale Amplitude erreichen (oft als hartes Knacken hörbar). Senke den Eingangspegel oder normalisiere die Quelle vor Training oder Konvertierung.
- **Hintergrundrauschen / Zischen:** Ein durchgehendes horizontales Band oder ein heller Boden in den mittleren/hohen Frequenzen im **Spectrogram** während Pausen. Reinige die Quelle vor dem Training mit UVR5 oder MVSep.
- **Übermäßige Stille oder tote Lücken:** Lange flache Abschnitte in der **Waveform** und hohe Stille-Anteile in den **Level and silence tables**. Schneide lange Pausen aus Datasets, damit das Training keine Schritte mit Stille verschwendet.
- **Zu leise / zu laut:** Sehr dünne Wellenform-Amplitude (Risiko rauschiger Verstärkung) oder Spitzen nahe Maximum. Prüfe die **Level and silence tables**, damit A/B-Vergleiche bei angeglichener Lautstärke beurteilt werden.
- **Verzerrung & Hall:** Verschwommene horizontale Fahnen nach Wortenden im **Spectrogram** deuten auf Raumhall hin; harte vertikale Spitzen oder verschmierte Obertöne weisen auf Verzerrung oder Überbearbeitung hin.
- **Dataset-Qualitätsprüfung:** Prüfe rohe Quellclips *vor* dem Training und vergleiche dann denselben Satz über Checkpoints hinweg. Wirkt die Pitch-Schätzung bei Atemzügen oder stimmlosen Konsonanten (`s`, `f`, `t`) sprunghaft, höre zuerst hin: stimmlose Laute haben naturgemäß keine stabile Tonhöhe.

## Vergleichstipps & Exporte

Wähle einen übereinstimmenden Zeitbereich sowie dieselbe Kanalansicht und behalte dasselbe **FFT-Fenster**, dieselbe Frequenzskala und denselben Stille-Schwellenwert über alle Vergleiche hinweg bei. Ein größeres FFT-Fenster verbessert Frequenzdetails, glättet aber schnelle zeitliche Ereignisse. Exportiere **CSV** oder **JSON** für Messwerte oder ein **ZIP mit Diagrammen** zur späteren Auswertung.
