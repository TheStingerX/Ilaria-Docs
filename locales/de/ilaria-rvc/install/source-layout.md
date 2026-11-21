---
label: "Dateien, Quelleneinrichtung und -wartung"
icon: ":card_file_box:"
order: 84
permalink: /ilaria-rvc/source-layout/
description: "Zur Konvertierung kann ein Inferenzexport verwendet werden."
---
# Dateien, Quelleneinrichtung und -wartung

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **2.4.0** · Unter Windows liegen App und Laufzeit in app/ und Stimmmodelle in models/ im Hauptordner. Neu sind Colab, Lightning AI Studio, Hinweise zu optionalen Embeddern und Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip wurde repariert und pywin32 ist enthalten.

## Wissen, was gesichert werden soll

 | Speicherort | Rolle |
| --- | --- |
 | Modelle/ | Inferenzbereite Stimmen und ihre passenden Indizes, üblicherweise in Ordnern pro Stimme gruppiert. |
 | Datensätze/ | Importierte Trainingsaufzeichnungen. Bewahren Sie eine separate Kopie Ihrer Originale auf. |
 | Protokolle/ | Experimentkonfiguration, vorbereitetes Audio, Funktionen, Indizes, fortsetzbare Prüfpunkte und Vorschauen. Sichern Sie das gesamte Experiment, um es später fortzusetzen. |
 | Laufzeit/ | Gebündelte Windows-Python-Umgebung. |
 | Assets/ | Kern-Encoder und Pitch-Gewichte, optionale Encoder, Trainings-Pretrains, Grafiken und andere App-Assets. |

Zur Konvertierung kann ein Inferenzexport verwendet werden. Behalten Sie für ein fortsetzbares Experiment das gespeicherte G/D-Paar und den Optimierer- und Trainingsstatus zusammen mit der Konfiguration, der Dateiliste und den extrahierten Funktionen bei.

## Arbeiten Sie unter Windows von der Quelle aus

Beginnen Sie mit einer sauberen, passenden Installation. Kopieren Sie die gebündelte Laufzeit, ffmpeg und ffprobe im gleichen Layout in den Quell-Checkout. Bringen Sie die installierten ContentVec- und RMVPE-Gewichte sowie bei Bedarf FCPE-Assets mit. Für das Training mit den standardmäßigen V2-Pretrains kopieren Sie die installierten pretrained_v2-Assets. Kopieren Sie .env.example nach .env und verwenden Sie den Logs Launcher. Überprüfen Sie bei der Startdiagnose die gebündelten Pfade, bevor Sie Python-Abhängigkeiten global ändern.

Das Projekt behält vorgelagerte Einstiegspunkte als Referenz bei. Die Hauptanwendung ist app/ILARIA_RVC.py mit funktionsspezifischen Modulen in app/ilaria/ und dem Upstream-Inferenz- und Trainingscode unter app/infer/. Ilaria RVC baut auf RVC WebUI (Mainline - Original RVC) auf, enthält von Applio und Redpanda-vc adaptierte Arbeiten, verwendet TorchFCPE für FCPE und erweitert Ilaria Audio Analyzer. Konsultieren Sie die Lizenz und Hinweise des Repositorys, wenn Sie Quellen oder Assets weiterverbreiten.

## Aktualisieren ohne Arbeitsverlust

Beenden Sie Aufträge, kopieren Sie wichtige Daten und verwenden Sie das Update-Panel, um die Versionshinweise zu überprüfen. Der Updater überprüft Downloads und unterstützt Backup und Wiederherstellung. Wenn in derselben Installation bereits ein Prozess ausgeführt wird, verwenden Sie dessen Browseradresse oder Protokolle und warten Sie, bis die aktive Arbeit abgeschlossen ist. Verwenden Sie **Ilaria RVC neu starten** für einen normalen Neustart der Benutzeroberfläche.
