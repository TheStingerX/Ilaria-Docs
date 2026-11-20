---
label: "Versionsverlauf und Release-Unterschiede"
icon: ":clock3:"
order: 81
permalink: /ilaria-rvc/version-history/
description: "Die neueste Windows-Version ist 2.4.6. Überprüfen Sie Ihre installierte Version unter Andere → Ilaria RVC aktualisieren."
---
# Versionsverlauf und Release-Unterschiede

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Welche Version wird in dieser Dokumentation beschrieben?

Die neueste Windows-Version ist **2.4.6**. Überprüfen Sie Ihre installierte Version unter **Andere → Ilaria RVC aktualisieren**. Verwenden Sie dort **Alle bisherigen Änderungen**, um die Release-für-Release-Hinweise auch offline zu durchsuchen.

## Alle Veröffentlichungen

 | Veröffentlichung | Highlights |
| --- | --- |
| 2.4.6 | Fügt **KLM Vocal ContentVec** (`klm-vocal-contentvec`) als optionalen Download für Inferenz und RVC-v2-Training hinzu und ergänzt **43 geprüfte KLM-G/D-Paare** bei **Recommended pretrained models** mit Sample-Rates (Trainings-Kompatibilität variiert je Paar). Ab **2.4.5** öffne **Other → Update Ilaria RVC → Check for updates** und wähle **Download and restart**. |
| 2.4.5 | Fügt `.pth` ↔ `.safetensors`-Konvertierung unter **Other → Convert model weights** hinzu, inklusive Erhalt der RVC-Metadaten und **Move .pth to models**-Button. Verbessert die Inferenz-Meldung bei fehlender Stimmkonfiguration und installiert `safetensors` bei Erstnutzung automatisch. Ab **2.4.4** öffne **Other → Update Ilaria RVC → Check for updates** und wähle **Download and restart**. |
| 2.4.4 | Entfernt die sechs Legacy-Core-Pretrained-Downloads von Lyery, nachdem die Quelldateien entfernt wurden (bereits geladene Gewichte bleiben fürs Training nutzbar). Erfordert **2.4.2** oder neuer. |
| 2.4.3 | Fügt natives **BF16**-Mixed-Precision-Training hinzu, automatisch gewählt auf NVIDIA RTX 30, 40 und 50, wenn alle gewählten GPUs es unterstützen (Kaggle T4 nutzt standardmäßig FP16). Merkt sich manuelle `FP16`- und `FP32`-Wahl, behält die Präzision bestehender Trainings bei, aktualisiert Training Queue und PC training advisor und belässt Feature-Extraktion in `FP32` sowie das Standard-RVC-Exportformat. Erfordert zuerst **2.4.2** über **Other → Update Ilaria RVC**. |
| 2.4.2 | Fügt **RMVPE cuDNN recovery** hinzu, um bei cuDNN-Fehlern während der Pitch-Extraktion in Inferenz und Preprocessing sauber fortzufahren. Update von **2.4.1** über **Other → Update Ilaria RVC**. |
| 2.4.1 | Ergänzt optionales lokales TTS mit Kokoro v1.0 und 54 Stimmen, darunter Sara und Nicola auf Italienisch. Erklärt die TTS-Voraussetzungen, korrigiert den Standardpfad der RMVPE-Gewichte und blendet ausführliche HuBERT-INFO-Meldungen aus. Warnungen und Fehler bleiben sichtbar. Installiere und starte zuerst 2.4.0. Öffne **Other → Update Ilaria RVC** und installiere **2.4.1**, sobald es angezeigt wird. |
| 2.4.0 | Unter Windows liegen App und Laufzeit in app/ und Stimmmodelle in models/ im Hauptordner. Neu sind Colab, Lightning AI Studio, Hinweise zu optionalen Embeddern und Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip wurde repariert und pywin32 ist enthalten. |
| 2.3.0 | RMVPE High Register bietet Modi, Erkennungsgrenzen und ein F0-Vergleichsdiagramm für hohe Gesangsnoten. ElevenLabs ist als TTS-Engine verfügbar. Gib deinen ElevenLabs-API-Schlüssel ein, wähle eine Stimme und teste einen kurzen Satz. MRF HiFi-GAN unterstützt Training und Inferenz. Der Katalog ergänzt 15 Generator-Diskriminator-Paare, darunter KLM 4.4 X1 und X2 mit 40 kHz. Portuguese HuBERT Base ist optional für die Inferenz. Beim RVC-v2-Training kannst du einen eigenen HuBERT-Embedder hochladen und speichern. Seine Konfiguration bleibt im exportierten Modell erhalten. |
| 2.2.2.1 | Zwischenupdate, das die aktualisierte 2.2.2 für die Installation von 2.3.0 vorbereitet. |
| 2.2.2 | Aktiviert die eingeschränkte PyTorch-Ladefunktion für Stimmmodelle, Modellwerkzeuge, ONNX-Export und Trainingsgewichte. Das Windows-ZIP enthält Python 3.10 und PyTorch 2.10.0 mit CUDA 12.8. Ältere NVIDIA-GPUs verwenden die herunterladbare CUDA-12.6-Laufzeit. PyAV-Dekodierung und WAV-Export wurden korrigiert. Beim Schreiben von Segmenten wird der Fortschritt angezeigt. Das Kaggle-Notebook für 2.2.2 installiert PyTorch und TorchAudio 2.10.0 mit CUDA 12.8. |
| 2.2.1 | Der Wellenform-Player bietet einen Lautstärkeregler für Eingaben, Ergebnisse und Vorschauen. Damit kannst du leiser hören oder Ausschnitte bei ähnlicher Lautstärke vergleichen. Der Regler wirkt nur auf die Wiedergabe. Für einen anderen Pegel in der konvertierten Datei passe Gain unter Post-Process an und konvertiere erneut. |
| 2.2.0 | Unterstützt Inferenz und Training unter Windows auf GeForce RTX der 50er-Serie (Blackwell) mit PyTorch 2.7.1 und CUDA 12.8. Der Launcher richtet die Laufzeit beim ersten Start ein und prüft CUDA-Operationen. Internetzugang und freier Speicherplatz sind nötig. Andere GPUs behalten ihre Laufzeit. ContentVec, Checkpoint-Fortsetzung und STFT wurden angepasst. |
| 2.1.2 | Die Kopfzeile verwendet einheitliche Bezeichnungen: **Ilaria’s Ko-Fi Shop**, **Ilaria’s RVC Website** und **Ilaria’s Docs**. |
| 2.1.1 | Neben dem Website-Link wurde eine Schaltfläche mit Herzsymbol für Ilaria Docs hinzugefügt. |
| 2.1.0 | Website-Schaltfläche, Live-Dashboard-Metriken für den aktiven Lauf und besseres Start- und Aktualisierungsverhalten im eingebetteten TensorBoard hinzugefügt. |
 | 2.0.0 | Einführung des Trainings-Dashboards, des eingebetteten TensorBoards, der Diagnoseberichte und der 12-Sekunden-Vorschau des Dataset Checker. Aus optionalen Embeddern wurden individuelle Downloads. |
 | 1.9.3 | Einführung erweiterter Audioverarbeitung, fünf Inferenz-Exportformate, konfigurierbarer Einbetter und benutzerdefinierter HuBERT-Installation. |
 | 1.9.2 | Öffentliche Google Drive- und MEGA-Links zum Sprachmodell-Downloader hinzugefügt. |
 | 1.9.1 | Abtastratenprüfungen bei der Wiederverwendung eines Experimentnamens hinzugefügt, um einen Trainingsabsturz bei inkompatiblen Konfigurationen zu vermeiden. |
 | 1.9.0 | FCPE, gestreamte Modellimporte mit Abbruch, eine neu organisierte Registerkarte „Andere“ und erweiterbare Offline-Versionshinweise hinzugefügt. |
 | 1.8.1 | Aktualisierte Abschluss- und Testtöne unter Beibehaltung des Windows-Fehlertons. |
 | 1.8.0 | Einführung des Launchers für versteckte Konsolen, der UI-Neustartsteuerung, des Audioanalysators und eines freigegebenen Ordnerlayouts für Modelle und ihre Indizes. |
 | 1.7.2 | Konvertierung ohne Index korrigiert und Einzel- und Batch-Ausgabedateien nach der ausgewählten Stimme benannt. |
 | 1.7.1 | Ein bestimmtes Traceback zum Schließen einer Windows-Verbindung wurde unterdrückt, während andere Fehlermeldungen erhalten blieben. |
 | 1.7.0 | Edge- und Offline-Windows-TTS, Waveform-Player und Hintergrundvorbereitung für die Tonhöhenextraktion sowie unterstützte Standardmodelle hinzugefügt. |
 | 1.6.0 | Die dauerhafte Trainingswarteschlange, genaue Schrittziele, RefineGAN- und Spin-v2-Optionen, gepaarte vorab trainierte Downloads, mehr Pitch-Extraktoren und ZIP-Export hinzugefügt. |
 | 1.5.2 | Verbesserte Diagnose beim Duplikatstart und Überprüfung der Datensatzverfügbarkeit vor jeder Trainingsphase. |
 | 1.5.1 | Blockierte Vorverarbeitung, während ein Datensatzimport aktiv war oder der Datensatzpfad unbrauchbar war. Das Offline-Änderungsverlaufsfenster wurde hinzugefügt. |
 | 1.5.0 | Einführung des Imports und der Verwaltung von Datensätzen per Drag-and-Drop, des PC-Schulungsberaters und optionaler Abschluss- und Fehlerwarnungen. |
 | 1.4.0 | Trainingsvorschauen, fortsetzbares Stoppen und Speichern und der Dataset Checker hinzugefügt. |
 | 1.3.0 | Den Update-Pfad von 1.2 validiert, die installierte Version in der Konsole angezeigt und ein kleineres Windows-Paket vorbereitet. |
 | 1.2.0 | Der integrierte Updater mit Überprüfung und Wiederherstellung, FP32/FP16-Trainingsauswahl und Modellinformationen wurde hinzugefügt. |
 | 1.1 Beta | Einführung der thematischen Benutzeroberfläche, des nummerierten Trainingsworkflows, der Drag-and-Drop-Konvertierung, des automatischen Indexabgleichs, des Imports und Zusammenführens von Modellen sowie des App-Glossar. |


Wenn sich eine Schaltfläche oder ein Backend in Ihrem Build unterscheidet, vergleichen Sie die Versionshinweise, bevor Sie von einer fehlgeschlagenen Installation ausgehen.
