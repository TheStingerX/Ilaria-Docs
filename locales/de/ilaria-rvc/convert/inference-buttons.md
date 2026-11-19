---
label: "Erklärung der Inferenzsteuerung"
icon: ":control_knobs:"
order: 81
permalink: /ilaria-rvc/inference-buttons/
---

# Erklärung aller Inferenzsteuerung

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Inferenz verwendet eine geschulte Stimme, um eine Aufnahme zu konvertieren. Laden Sie für einen ersten Test eine kurze, saubere WAV-Datei hoch, wählen Sie eine Stimme aus, lassen Sie die Tonhöhe auf Null und deaktivieren Sie optionale Funktionen. Vergleichen Sie Eingabe und Ausgabe, bevor Sie einen Wert ändern.

> **Neuerungen in 2.3.0** · [RMVPE High Register](advanced-inference.md#rmvpe-high-register)

## Sprache, Audio und Ausgabe

| Steuerung | Was es tut |
| --- | --- |
| `Voice Model` | Lädt den ausgewählten Inferenzexport. Wählen Sie nach dem Import die gewünschte Stimme aus. Ein G- oder D-Trainingskontrollpunkt dient der Weiterbildung. |
| `Refresh` | Scannt die Modellbibliothek erneut. Überprüfen Sie anschließend die ausgewählte Stimme. |
| `Unload Voice from VRAM` | Gibt die geladene Stimme aus dem GPU-Speicher frei. Verwenden Sie es, um Speicher für eine andere Aufgabe freizugeben. |
| `Audio to convert` | Wählt die Quellaufnahme aus. Für einen sauberen Test verwenden Sie einen trockenen Gesang anstelle einer Mischung mit Instrumenten. |
| `Pitch` | Ändert die Tonhöhe in Halbtönen von −24 bis +24. Null behält das Quellregister bei. Zwölf Halbtöne sind eine Oktave. |
| `Convert` | Startet den Job. Lesen Sie das Ausgabeprotokoll und hören Sie sich das Ausgabeaudio an. Speichern Sie die Ausgabe des Players, sofern verfügbar. |
| `Audio folder` und `Output` in Batch Inference | Wählen Sie den Eingabeordner und das Ziel für mehrere Dateien. Testen Sie zunächst eine repräsentative Datei und verwenden Sie einen separaten Ausgabeordner. |

## Inferenzeinstellungen

| Steuerung | Was es tut und wie man es testet |
| --- | --- |
| `Speaker ID` | Wählt einen vom Modell unterstützten Sprachslot. Verwenden Sie die Standardeinstellung für ein normales einstimmiges Modell. |
| `Pitch Extraction` | Schätzt die Tonhöhe der Quelle. Beginnen Sie mit RMVPE und vergleichen Sie eine andere verfügbare Methode nur, wenn Noten springen oder die Kontur instabil klingt. |
| `Path of index` und `Auto-detect index path` | Wählen Sie einen passenden optionalen Index nach Pfad oder aus der erkannten Liste aus. Überprüfen Sie, ob es zu diesem Modell und Encoder gehört. |
| `Index Ratio` | Mischt abgerufene Features in die Konvertierung. Null schaltet den Abruf aus. Steigern Sie schrittweise mit einem passenden Index und vergleichen Sie dieselbe Phrase. |
| `Resampling, 0=none` | Ändert die Ausgabe-Audiorate. Null behält die Ausgaberate des Modells bei. Durch Resampling können fehlende Details nicht wiederhergestellt werden. |
| `Input source volume / Normalized Output` | Mischt die Quell- und konvertierten Lautheitshüllkurven. Nahe Null folgt der Quelldynamik genauer. Bei der Einstellung „1“ bleibt der umgewandelte Umschlag an Ort und Stelle. |
| `Protect clear consonants and breathing sounds` | Reduziert den Einfluss des Abrufs auf stimmlose Klänge bei der tonhöhengesteuerten Konvertierung. Niedrigere Werte verstärken den Schutz; 0,5 schaltet es aus. Seine Wirkung kann eingeschränkt sein, wenn der Abruf deaktiviert ist. |
| `Median filter` | Glättet die Erntehöhenschätzung, wenn der angezeigte Schwellenwert aktiviert ist. Beginnen Sie mit der Standardeinstellung und testen Sie sie nur bei der Fehlerbehebung bei Harvest. |
| `Export Format` | WAV und FLAC sind verlustfrei. MP3, OGG und M4A können Platz für die Lieferung sparen. Verwenden Sie WAV für Ihren ersten Vergleich. |
| `F0 curve file` | Erweiterte Eingabe für eine benutzerdefinierte Tonhöhenkurve in Builds, die diese verfügbar machen. Für die alltägliche Konvertierung leer lassen. |

## Audioverarbeitung und Embedder-Einstellungen

- **Split Audio** verarbeitet Abschnitte, die durch ruhige Passagen getrennt sind. Probieren Sie es für lange Eingaben aus und hören Sie sich die Verknüpfungen an.
- **Autotune** verschiebt stimmhafte Noten in Richtung benachbarter chromatischer Noten. **Autotune Strength** steuert, wie stark dies geschieht. Beginnen Sie damit.
- **Vorgeschlagene Tonhöhe** verwendet die mittlere Stimmtonhöhe und **Zieltonhöhe (Hz)**, um eine Verschiebung abzuschätzen. Versuchen Sie es mit einem repräsentativen kurzen Clip.
- **Clean Audio** wendet die Rauschunterdrückung nach der Konvertierung an. **Clean Strength** steuert seine Intensität. Vergleichen Sie mit der unverarbeiteten Ausgabe für beschädigte Atemzüge oder Zischlaute.
- **Formantenverschiebung** verändert die Resonanz vor der Umwandlung. Bei einem **Formantenverhältnis** von 1 bleibt die Grundlinie erhalten. Hören Sie beim Testen dieselben Vokale.
- **Post-Process** führt die ausgewählten **Effekte** auf das konvertierte Audio aus. **Post Pitch Shift** passt die Ausgangstonhöhe an, **Gain** ändert den Pegel und **Limiter Threshold** steuert, wo der Limiter zu wirken beginnt. Verwenden Sie jeweils einen Effekt, wenn Sie ein Problem diagnostizieren.
- **Embedder-Modell** wählt den Inhaltsencoder aus. Auto verwendet die Modellinformationen, sofern verfügbar. **Custom Embedder** akzeptiert die entsprechenden .bin-Gewichte und die .json-Konfiguration. Geben Sie ihm einen Ordnernamen, klicken Sie auf **Benutzerdefinierten Embedder installieren**, überprüfen Sie den Embedder-Importstatus und verwenden Sie bei Bedarf **Embedder aktualisieren**. Wählen Sie den Encoder aus, mit dem die Stimme trainiert wurde, bevor Sie ihren Index testen.

Wenn Ihre Veröffentlichung **TTS** offenlegt, versuchen Sie es zunächst mit einem kurzen Satz. Wählen Sie Edge für eine Online-Stimme oder eine verfügbare Windows-Stimme für die Offline-Synthese, wählen Sie die Sprache und Stimme aus und zeigen Sie eine Vorschau des Ergebnisses an. Passen Sie Rate, Lautstärke oder Tonhöhe der Quelle nur an, wenn dies unterstützt wird. Wenn die Aussprache vor der Konvertierung falsch ist, korrigieren Sie zunächst die Ausgangssprache. Siehe [Text to Speech](speech.md).


> **2.2.1** · Der Wellenform-Player bietet einen Lautstärkeregler für Eingaben, Ergebnisse und Vorschauen. Damit kannst du leiser hören oder Ausschnitte bei ähnlicher Lautstärke vergleichen. Der Regler wirkt nur auf die Wiedergabe. Für einen anderen Pegel in der konvertierten Datei passe Gain unter Post-Process an und konvertiere erneut.
