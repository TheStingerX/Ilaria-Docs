---
label: "🚀 Erste Schritte"
order: 95
permalink: /getting-started/
description: "Du kannst Ilaria RVC auch auf Kaggle mit einer entfernten GPU nutzen, selbst wenn dein Computer keine NVIDIA-GPU hat. Ilaria RVC on Kaggle"
---
# Erste Schritte

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Du kannst Ilaria RVC auch auf Kaggle mit einer entfernten GPU nutzen, selbst wenn dein Computer keine NVIDIA-GPU hat. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Ausführliche Anleitungen zur Installation, Einrichtung und Fehlerbehebung findest du in den [Schritt-für-Schritt-Anleitungen für die einzelnen Apps](../other-rvcs/app-guides.md).

## Ilaria RVC

1. Holen Sie sich das Windows-Paket aus [Ilaria's Hugging Face-Repository](https://huggingface.co/TheStinger/Ilaria_RVC). Überprüfen Sie die Anweisungen für Ihre Version, bevor Sie Ihren NVIDIA-Treiber aktualisieren oder Abhängigkeiten ändern.
2. Extrahieren Sie das komplette Paket in einen beschreibbaren Ordner. Führen Sie den Launcher in diesem Ordner aus, damit er die gebündelten Laufzeit- und Audio-Tools finden kann.
3. Öffnen Sie `RUN_ILARIA_RVC.bat`. Wenn der Start fehlschlägt, schließen Sie diesen Versuch und verwenden Sie `RUN_ILARIA_RVC_LOGS.bat`, um die Konsole anzuzeigen.
4. Wenn sich die Schnittstelle nicht automatisch öffnet, verwenden Sie [http://127.0.0.1:6969](http://127.0.0.1:6969) auf demselben PC. Lassen Sie den Launcher während der Arbeit laufen.

### Konvertieren Sie einen ersten Clip.

1. Importieren Sie ein kompatibles Modell aus **Andere**. Behalten Sie den optionalen passenden Index mit dem Prüfpunkt bei.
2. Öffnen Sie **Single Inference**, wählen Sie Ihr Modell aus und fügen Sie eine kurze, trockene Sprachaufnahme hinzu.
3. Beginnen Sie mit dem Standard-Pitch-Extraktor. Stellen Sie die Tonhöhenverschiebung und das **Indexverhältnis** für eine Grundlinie auf Null ein.
4. Konvertieren Sie den Clip und hören Sie sich den Anfang, die lauteste Phrase und alle Konsonanten an, die leiser als im Original klingen.
5. Exportieren Sie eine WAV-Referenz. Folgen Sie [Sprachkonvertierung](../conversion/voice-conversion.md), um alternative Einstellungen für dieselbe Quelle zu vergleichen.

### Aktualisieren und sichern

Verwenden Sie für eine bestehende Installation **Andere → Ilaria RVC aktualisieren** und lesen Sie die Versionshinweise, bevor Sie das Update anwenden. Speichern Sie eine Kopie Ihrer Datensätze, exportierten Modelle, Trainingskontrollpunkte und konvertierten Audiodaten, bevor Sie die Version wechseln. Halten Sie Trainingskontrollpunkte getrennt von den Inferenzmodellen, die Sie verwenden oder teilen.

Verwenden Sie Aufnahmen und Sprachmodelle, zu deren Nutzung Sie berechtigt sind. Modelldemos und Verfügbarkeit finden Sie im [Katalog](https://ilariarvc.shop/en/demos/).

[Ilaria RVC Quell- und Installationshinweise](https://github.com/TheStingerX/Ilaria-RVC) · [Versionshinweise](https://github.com/TheStingerX/Ilaria-RVC/blob/main/docs/CHANGELOG.md)


## Vonovox

> **Neueste Version (Beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

1. Laden Sie unter Windows mit NVIDIA das Archiv für Ihre GPU-Generation von [Vonovox auf Hugging Face](https://huggingface.co/dr87/vonovox/tree/main) herunter. Extrahieren Sie das vollständige Paket und starten Sie die mitgelieferte App.
2. Laden Sie ein RVC V2-Modell und wählen Sie Ihr Mikrofon und Ihre Kopfhörer in den Audiogeräteeinstellungen aus.
3. Starten Sie die Konvertierung mit dem Standardpuffer und sprechen Sie einen kurzen Satz. Stellen Sie sicher, dass der Monitor klar klingt, bevor Sie ihn an eine andere App weiterleiten](../conversion/real-time.md).

## w-okada VCClient

1. Holen Sie sich ein Paket für Ihre Plattform und Ihr Backend von [VCClient auf Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Überprüfen Sie, ob RVC und Ihr Modellformat unterstützt werden. Die unterstützte Hardware kann zwischen PyTorch- und ONNX-Modellen unterschiedlich sein.
2. Extrahieren Sie die Version und starten Sie den mitgelieferten Server oder Launcher. Öffnen Sie den Client über die beim Start angezeigte lokale Adresse, wenn er nicht automatisch geöffnet wird.
3. Importieren Sie die Stimme in einen Modellsteckplatz, wählen Sie diesen Steckplatz aus und stellen Sie die Eingabe- und Überwachungsgeräte ein. Starten Sie die Konvertierung und hören Sie über Kopfhörer zu, bevor Sie den Ausgang mit einem Anruf verbinden.

## Okada TG Developed Fork

1. Wählen Sie ein Paket aus [TGR-Releases](https://github.com/tg-develop/voice-changer/releases). Verwenden Sie unter Windows CUDA für eine unterstützte NVIDIA-Karte oder den DirectML-Build für eine unterstützte AMD- oder Intel-GPU.
2. Starten Sie den extrahierten Build, wählen Sie das passende Rechengerät aus und importieren Sie die Stimme in einen RVC-Slot.
3. Stellen Sie Ihr Mikrofon und Ihren Kopfhörermonitor ein und testen Sie dann mit dem Standardpuffer. Wählen Sie einen in Ihrem Build verfügbaren Pitch-Extraktor aus, wenn Sie eine Voreinstellung von einem anderen Backend neu erstellen.

## RVC GUI

1. Laden Sie das Desktop-Paket von [RVC GUI-Versionen](https://github.com/Tiger14n/RVC-GUI/releases) herunter. Diese archivierte App ist für kompatible Legacy-Setups gedacht.
2. Extrahieren und starten Sie die App. Importieren Sie eine ZIP-Datei, die den Inferenzprüfpunkt und den zugehörigen Index enthält, sofern vorhanden, und wählen Sie dann die importierte Stimme aus.
3. Wählen Sie eine kurze Gesangsaufnahme, beginnen Sie bei null Halbtönen und konvertieren Sie sie. Hören Sie sich das Ergebnis an und speichern Sie ein Referenzexemplar.

## Applio

1. Holen Sie sich das Installationsprogramm oder Paket für Ihre Plattform von [Applio-Downloads](https://applio.org/). Schließen Sie in Desktop die Engine-Einrichtung ab und bestätigen Sie Ihr Computergerät. Extrahieren Sie für einen gepackten Gradio-Build das vollständige Archiv, starten Sie den Launcher und öffnen Sie seine lokale Adresse.
2. Fügen Sie der Modellbibliothek eine Stimme hinzu und öffnen Sie **Audio konvertieren**. In älteren Gradio-Builds heißt die Registerkarte möglicherweise **Inferenz**.
3. Wählen Sie das Modell, den passenden Embedder und den optionalen Index aus und konvertieren Sie dann eine kurze, saubere WAV-Datei mit einer Tonhöhe von Null. Fahren Sie mit dem [Applio-Konvertierungsworkflow](../conversion/voice-conversion.md#convert-a-recording-in-applio) für Batch- und Einstellungsbeispiele fort.

## RVC WebUI (Mainline - Original RVC)

1. Wählen Sie ein kompatibles Paket aus [RVC WebUI (Mainline - Original RVC)-Versionen](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases). Für ein Windows-Paket, das es enthält, extrahieren Sie das Archiv und führen Sie `go-web.bat` aus. Lassen Sie die Konsole geöffnet, während Sie die WebUI verwenden.
2. Platzieren Sie den Inferenzkontrollpunkt in `assets/weights` und seinen passenden Abrufindex unter `logs`. Aktualisieren Sie die Listen und wählen Sie Ihre Stimme aus.
3. Geben Sie den vollständigen Pfad zu einer kurzen Audiodatei ein, halten Sie die Tonhöhe auf Null und klicken Sie auf **Konvertieren**. Verwenden Sie zum Speichern die Download-Steuerung des Ausgabeplayers. Weitere Prüfungen finden Sie im [Arbeitsablauf für die Hauptkonvertierung](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc)“.

## Redpanda-vc


Redpanda VC unterstützt Training, Datei-Inferenz und Echtzeit für RVC und Causal Voice Changer in der Desktop-App und WebUI. Verwende `.pth` für RVC und `.cvc` für CVC.

[Vorkompilierte Version für Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) · [Redpanda VC einrichten](../other-rvcs/training/redpanda/first-run.md) · [Datei-Inferenz](../other-rvcs/training/redpanda/inference.md)

## RVC Blue

Echtzeit-Stimmkonvertierung unter Windows. [Installation und Einrichtung](../other-rvcs/voice-changers/rvc-blue/installation.md).
