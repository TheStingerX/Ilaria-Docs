---
label: "Weitere Steuerelemente erklärt"
icon: ":toolbox:"
order: 80
permalink: /ilaria-rvc/other-buttons/
---

# Jedes andere Bedienfeld erklärt

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Verwenden Sie **Andere**, um Dateien zu verwalten, Modelle zu prüfen oder zu kombinieren, Audio zu überprüfen und die App zu warten. Entscheiden Sie zunächst, ob Sie ein Inferenzmodell, einen Content-Encoder oder ein G/D-Trainingspaar benötigen. Sie gehören zu verschiedenen Teilen von RVC.

## Holen Sie sich Modelle und Trainingsressourcen

| Bedienfeld und Steuerelemente | Was Sie eingeben müssen und was Sie erwarten können |
| --- | --- |
| `Import local models` | Löschen Sie eine Inferenz-.pth, den optionalen passenden .index oder eine unterstützte ZIP-Datei. Einige Builds bieten eine Schaltfläche zum Importieren von Modelldateien. Überprüfen Sie das Importprotokoll, bevor Sie zu Inferenz wechseln und die Modellliste aktualisieren. |
| `Download models from Hugging Face, Google Drive or MEGA` | Fügen Sie einen öffentlichen Modelllink ein, klicken Sie auf „Modell herunterladen und installieren“ und warten Sie auf „Protokoll herunterladen“. Separate Modell- und Indexlinks können in separaten Vorgängen importiert werden. |
| `Download embedders` | Wählen Sie den genauen Encoder aus, der für ein Modell erforderlich ist, und klicken Sie dann auf Ausgewählten Embedder herunterladen. Lesen Sie den Embedder-Downloadstatus, bevor Sie versuchen, ihn in Inference auszuwählen. |
| `Download pretrained models` | Stellen Sie ein Repository, eine kompatible ZIP-Datei oder einen Generator-Link bereit. Geben Sie den passenden Diskriminator-Link ein, wenn die automatische Erkennung ihn nicht finden kann. Klicken Sie auf Vorab trainiertes Paar herunterladen und überprüfen Sie das Protokoll. |
| `Recommended pretraineds` | Wählen Sie eine benannte Variante und eine Abtastrate und klicken Sie dann auf Ausgewählte vorab trainierte Dateien herunterladen (G + D). Überprüfen Sie die Anforderungen an Architektur, Vocoder, Tonhöhe und Encoder, bevor Sie sie in der Schulung auswählen. |

## Stimmen prüfen, zusammenführen und teilen

Mit **Modellinformationen** können Sie eine Stimme auswählen, **Modellliste aktualisieren** und **Modellinformationen lesen**. Lesen Sie das Inspektionsprotokoll, um zu bestätigen, welche Datei überprüft wurde. Erweitern Sie **Gespeicherte Metadaten und Architektur** für aufgezeichnete Eigenschaften und **Gespeicherte Tensoren** für Gewichtsdetails. Fehlende Metadaten sollten als unbekannt behandelt werden.

**Modelle zusammenführen** mischt kompatible Inferenzgewichte. Wählen Sie **Modell A** und **Modell B** aus und klicken Sie dann vor dem Speichern auf **Modellkompatibilität prüfen**. **Beitrag von Modell A (%)** steuert die Gewichtsbalance, sodass 70 A einen Anteil von 70 % in der Mischung verleiht, während der Rest von B stammt. **Abtastrate** sollte mit den Modellen übereinstimmen; Verwenden Sie „Auto“, falls verfügbar. **Ausgabegenauigkeit** legt fest, wie die generierten Gewichte gespeichert werden. Geben Sie einen neuen Namen und optionale Notizen ein, klicken Sie auf **Modell zusammenführen und speichern** und lesen Sie Zusammenführungsprotokoll. Testen Sie die zusammengeführte Stimme, bevor Sie entscheiden, ob Sie sie behalten möchten. Beginnen Sie mit deaktiviertem Abruf.

**Exportmodell-ZIP** bündelt die ausgewählte Inferenzstimme und einen optionalen passenden Index. Verwenden Sie **Modellliste aktualisieren**, wenn die Stimme fehlt, wählen Sie **Sprachmodell** und optional **Index** aus und klicken Sie auf **Modell-ZIP erstellen**. Lesen Sie das Exportprotokoll und laden Sie die unter **Modell-ZIP herunterladen** angezeigte Datei herunter. Öffnen Sie die ZIP-Datei lokal und überprüfen Sie beide Dateinamen. Bewahren Sie das gesamte Trainingsexperiment separat auf, wenn Sie wiederaufnehmbare Kontrollpunkte benötigen.

## Audio- und Hardware-Tools

- **Audio Analyzer** vergleicht Aufnahmen anhand von Wellenform-, Spektrogramm-, Tonhöhen- und Pegelanzeigen. Wählen Sie in der Ein- und Ausgabe dieselbe Region aus und hören Sie sie sich an. Passen Sie das FFT-Fenster, den Kanal und den Ruheschwellenwert bei allen Vergleichen an. Verwenden Sie die verfügbaren Exportsteuerelemente, um Analysedaten oder Diagramme zu speichern. Siehe [Audioanalysator](audio-analyzer.md).
- **PC-Schulungsberater** verwendet **Abtastrate zur Planung**, **Präzision zur Auswertung** und **GPU zur Auswertung**. Klicken Sie auf **PC scannen und Einstellungen vorschlagen** und überprüfen Sie das PC Advisor-Protokoll. Betrachten Sie die Vorschläge als Ausgangspunkt und überprüfen Sie die Speichernutzung während einer kurzen Ausführung.

## Updates und Neustart

Vergleichen Sie in **Update Ilaria RVC** die **Installierte Version** mit der nach **Nach Updates suchen** angezeigten Version. Lesen Sie **Versionsänderungsprotokoll** und erweitern Sie **Alle bisherigen Änderungen** für ältere Notizen. Wenn **Herunterladen und neu starten** angeboten wird, beenden oder speichern Sie die aktive Arbeit, bevor Sie sie verwenden. Follow **Update Log** until the app reopens. **Ilaria RVC neu starten** startet die aktuelle Installation neu und **Status neu laden** meldet diesen Vorgang. Verwenden Sie auf Kaggle den Workflow [Speichern, Stoppen und Neustarten des Notebooks](../cloud/kaggle.md).
