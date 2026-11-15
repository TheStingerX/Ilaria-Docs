---
label: "🛠️ Protokolle und Wiederherstellung"
order: 92
permalink: /ilaria-rvc/troubleshooting/
---
# Protokolle und Wiederherstellung

## Finden Sie die erste fehlerhafte Phase

Verwenden Sie bei Startproblemen `ILARIA_RVC_LOGS.bat` und notieren Sie den ersten Fehler. Testen Sie bei einem Inferenzfehler ein kurzes lokales WAV mit deaktiviertem Abruf und bestätigen Sie das Modell und den Einbetter. Stellen Sie bei Trainingsfehlern fest, ob die Vorverarbeitung, die Merkmalsextraktion oder die Trainingsphase fehlgeschlagen ist, bevor Sie es erneut versuchen.

## Umgang mit Speicherdruck

Schließen Sie konkurrierende GPU-Aufgaben, entladen Sie die Inferenzstimme und versuchen Sie es erneut mit einem kleineren Trainingsstapel oder deaktiviertem Datensatz-Caching, falls zutreffend. Vor dem Neustart speichern. Notieren Sie die App-Version, die GPU, die genaue fehlgeschlagene Aktion und den ersten Fehler, bevor Sie Hilfe anfordern.
