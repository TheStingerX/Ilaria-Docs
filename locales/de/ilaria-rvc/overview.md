---
label: "💖 Ilaria RVC-Übersicht"
order: 100
permalink: /ilaria-rvc/overview/
---
# Ilaria RVC-Übersicht

Du kannst Ilaria RVC auch auf Kaggle mit einer entfernten GPU nutzen, selbst wenn dein Computer keine NVIDIA-GPU hat. [Ilaria RVC on Kaggle](kaggle.md)

Ilaria RVC 2.1.2 ist eine Windows-Anwendung, die auf Mainline RVC basiert. Die Benutzeroberfläche wird in einem Browser geöffnet, während die mitgelieferte Engine auf dem PC ausgeführt wird. Das aktuelle Windows-Paket zielt auf NVIDIA ab. Die Veröffentlichung umfasst Inferenz, TTS, Modelltraining, eine Modellbibliothek und Audioanalyse.

 | Wo | Was Sie tun können |
| --- | --- |
 | Schulung | Datensätze importieren und prüfen, vorverarbeiten, Features extrahieren, Experimente ausführen oder in die Warteschlange stellen, Prüfpunkte in der Vorschau anzeigen und Abrufindizes erstellen. |
 | Inferenz | Konvertieren Sie einen Clip oder einen Ordner, generieren Sie Sprache, wählen Sie Encoder und Tonhöhenextraktoren aus und wenden Sie optionale Verarbeitung an. |
 | Andere | Modelle importieren, herunterladen, prüfen, zusammenführen und exportieren. Installieren Sie optionale Embedder und Pretrains, analysieren Sie Audio, scannen Sie Hardware und aktualisieren Sie die Anwendung. |
 | Trainings-Dashboard | Verfolgen Sie aktive Läufe, überprüfen Sie vorhandene Protokolle, öffnen Sie TensorBoard und erstellen Sie einen Diagnosebericht. |
 | Glossar | Überprüfen Sie die Einstellungen und Arbeitsabläufe in der App. |

Beginnen Sie mit [Installation](installation.md), dann folgen Sie [Einzel- und Batch-Inferenz](inference.md), [einem Trainingsexperiment](training-workflow.md) oder [Modellverwaltung](model-library.md)]. Für allgemeine Terminologie öffnen Sie das [Glossar](../reference/glossary.md).

## Was lokal läuft

Der Launcher startet standardmäßig einen lokalen Dienst am Port 6969. Bei der Dateikonvertierung und dem Training werden lokale Modelldateien verwendet. Das Herunterladen von Modellen, das Aktualisieren der App und die Verwendung von Edge TTS erfordern eine Konnektivität. Wählen Sie für die Offline-Sprachgenerierung eine installierte Windows-Stimme. Der Browser ist in dieser Version auch an den Service-Lebenszyklus gebunden. Beenden Sie die aktive Arbeit oder speichern Sie sie sicher, bevor Sie die letzte Registerkarte schließen.
