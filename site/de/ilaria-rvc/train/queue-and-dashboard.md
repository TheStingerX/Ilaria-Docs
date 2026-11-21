# Warteschlange, Dashboard und Warnungen

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Mehrere Experimente in die Warteschlange stellen

Konfigurieren Sie das Experiment im Training, bestätigen Sie seinen Datensatz und Modellnamen und fügen Sie es zur **Trainingswarteschlange** hinzu. Verwenden Sie unterschiedliche Namen für unterschiedliche Konfigurationen. Überprüfen Sie die gespeicherten Einträge, bevor Sie beginnen, und überprüfen Sie dann den aktuellen Job und seine Phase. Die Warteschlange bleibt sitzungsübergreifend bestehen. Halten Sie die Steuerung an oder setzen Sie sie fort und überprüfen Sie fehlgeschlagene Jobs, bevor Sie es erneut versuchen. Korrigieren Sie fehlende Datensatzpfade und inkompatible Einstellungen, bevor Sie sie erneut übermitteln.

## Verfolgen Sie einen laufenden Job

Das **Trainings-Dashboard** zeigt die Epochendauer, kumulative Aktualisierungen, Schritte pro Sekunde, Diagramme und eine Statusmeldung. Während ein Modell trainiert, verfolgt das Dashboard Live-Metriken. Wählen Sie im Ruhezustand einen vorhandenen Modellnamen aus, um dessen gespeicherte Metriken zu überprüfen. Verwenden Sie das Jobprotokoll, um den ersten Fehler zu identifizieren. Die Zähler sind hilfreich für Timing und Fortschritt. Beurteilen Sie den Ton anhand von [Trainingsvorschauen](training-workflow.md) desselben vorgehaltenen Clips.

## TensorBoard und Diagnose

Verwenden Sie die Start- und Stopp-Steuerelemente des TensorBoard-Bedienfelds. Das 2.1.0-Dashboard wartet auf verwendbare Skalarereignisse, bevor es diese anzeigt. Überprüfen Sie das ausgewählte Experiment und den Dashboard-Status, wenn die Diagramme leer sind. Verlustkurven können dabei helfen, einen ins Stocken geratenen Lauf zu erkennen. Sie können nicht beurteilen, wie natürlich die Stimmen klingen.

Öffnen Sie **PC Training Advisor** unter „Andere“, wählen Sie die Rate, Präzision und die vorgesehene GPU aus und führen Sie den Scan aus. Probieren Sie die vorgeschlagenen Einstellungen zunächst einmal aus, bevor Sie ein längeres Experiment durchführen. Der **Diagnosebericht** umfasst Betriebssystem-, GPU-, CUDA-, Festplatten- und aktuelle Trainingsfehler. Überprüfen Sie Berichte auf persönliche Dateipfade, bevor Sie sie freigeben.

## Benachrichtigungen und sichere Stopps

Verwenden Sie optionale Desktop- und Tonbenachrichtigungen, um Abschluss oder Fehler zu bemerken, und bestätigen Sie dann den Endstatus in den Protokollen. Speichern Sie, bevor Sie neu starten oder die letzte Registerkarte schließen. Warten Sie mit **Stoppen und Speichern** auf die Bestätigung und behalten Sie das G/D-Paar und den Experimentstatus bei, bevor Sie den Lauf verschieben oder neu starten.
