---
label: "Ilaria RVC-Übersicht"
icon: ":sparkling_heart:"
order: 100
permalink: /ilaria-rvc/overview/
description: "Du kannst Ilaria RVC auch auf Kaggle mit einer entfernten GPU nutzen, selbst wenn dein Computer keine NVIDIA-GPU hat. Ilaria RVC on Kaggle"
---
# Ilaria RVC-Übersicht

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · Das vollständige Windows-Paket ist Version 2.4.7. Die Update-ZIP für 2.5.0 enthält weder Laufzeit noch Modellgewichte. Von 2.4.2 bis 2.4.8 nutze **Other → Update Ilaria RVC → Check for updates → Download and restart**.

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Du kannst Ilaria RVC auch auf Kaggle mit einer entfernten GPU nutzen, selbst wenn dein Computer keine NVIDIA-GPU hat. [Ilaria RVC on Kaggle](cloud/kaggle.md)

Ilaria RVC 2.4.2 ist eine Windows-Anwendung, die auf RVC WebUI (Mainline - Original RVC) basiert. Die Benutzeroberfläche wird in einem Browser geöffnet, während die mitgelieferte Engine auf dem PC ausgeführt wird. Das aktuelle Windows-Paket zielt auf NVIDIA ab. Die Veröffentlichung umfasst Inferenz, TTS, Modelltraining, eine Modellbibliothek und Audioanalyse.

 | Wo | Was Sie tun können |
| --- | --- |
 | Schulung | Datensätze importieren und prüfen, vorverarbeiten, Features extrahieren, Experimente ausführen oder in die Warteschlange stellen, Prüfpunkte in der Vorschau anzeigen und Abrufindizes erstellen. |
 | Inferenz | Konvertieren Sie einen Clip oder einen Ordner, generieren Sie Sprache, wählen Sie Encoder und Tonhöhenextraktoren aus und wenden Sie optionale Verarbeitung an. |
 | Andere | Modelle importieren, herunterladen, prüfen, zusammenführen und exportieren. Installieren Sie optionale Embedder und Pretrains, analysieren Sie Audio, scannen Sie Hardware und aktualisieren Sie die Anwendung. |
 | Trainings-Dashboard | Verfolgen Sie aktive Läufe, überprüfen Sie vorhandene Protokolle, öffnen Sie TensorBoard und erstellen Sie einen Diagnosebericht. |
 | Glossar | Überprüfen Sie die Einstellungen und Arbeitsabläufe in der App. |

Beginnen Sie mit [Installation](install/installation.md), dann folgen Sie [Einzel- und Batch-Inferenz](convert/inference.md), [einem Trainingsexperiment](train/training-workflow.md) oder [Modellverwaltung](manage/model-library.md)]. Für allgemeine Terminologie öffnen Sie das [Glossar](../reference/glossary.md).

## Was lokal läuft

Der Launcher startet standardmäßig einen lokalen Dienst am Port 6969. Bei der Dateikonvertierung und dem Training werden lokale Modelldateien verwendet. Das Herunterladen von Modellen, das Aktualisieren der App und die Verwendung von Edge TTS erfordern eine Konnektivität. Wählen Sie für die Offline-Sprachgenerierung eine installierte Windows-Stimme. Der Browser ist in dieser Version auch an den Service-Lebenszyklus gebunden. Beenden Sie die aktive Arbeit oder speichern Sie sie sicher, bevor Sie die letzte Registerkarte schließen.

[Trainingseinstellungen](train/training-buttons.md) · [Inferenzsteuerung](convert/inference-buttons.md) · [Bedienelemente in Other](manage/other-buttons.md)
