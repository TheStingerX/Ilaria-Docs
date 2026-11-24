---
label: "Mit RVC GUI installieren und konvertieren"
icon: ":control_knobs:"
order: 99
permalink: /ilaria-rvc/rvc-gui/file-conversion/
description: "Diese Anleitung behandelt die archivierte Desktop-App von Tiger14n zum Konvertieren von Audiodateien."
---
# Mit RVC GUI installieren und konvertieren

[GitHub](https://github.com/Tiger14n/RVC-GUI)

Diese Anleitung behandelt die archivierte Desktop-App von Tiger14n zum Konvertieren von Audiodateien. Bereiten Sie einen Sprachkontrollpunkt und eine kurze, trockene WAV-Aufnahme vor, bevor Sie beginnen.

## 1. Öffnen Sie die Windows-App

1. Öffnen Sie das [Windows-Paket](https://github.com/Tiger14n/RVC-GUI/releases/tag/Windows-pkg) des Projekts. Laden Sie das gepackte Asset aus der Version herunter und extrahieren Sie den Inhalt in einen beschreibbaren Ordner. Behalten Sie die Laufzeit- und Modellressourcen im extrahierten Layout bei.
2. Öffnen Sie den mitgelieferten Launcher. Ein Quell-Checkout kann mit `RVC-GUI.bat` unter Windows oder `python rvcgui.py` gestartet werden, sobald die Laufzeit eingerichtet ist. Die archivierte Quelle erwartet eine kompatible Python- und PyTorch-Umgebung sowie `hubert_base.pt` in ihrem Projektstamm. Verwenden Sie eine separate Umgebung, wenn Sie die Quelle testen, damit andere RVC-Installationen ihre Abhängigkeiten beibehalten.
3. Wenn die gepackte App sofort geschlossen wird, führen Sie ihren Launcher von einem offenen Terminal aus und lesen Sie den ersten Fehler. Ein Archiv, das nur Quelldateien enthält, verfügt nicht über die gepackte Laufzeit. Wenn der Fehler HuBERT in einer Quellinstallation benennt, platzieren Sie die [HuBERT-Gewichtungen](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt) des Projekts im Projektstammverzeichnis.

> Generische HuBERT-Checkpoints sind als Standardencoder für Stimmkonvertierung nicht empfohlen. Sie wurden für Sprachrepräsentationen trainiert und können Merkmale der Klangfarbe der Ausgangsstimme in die Ausgabe übertragen. Verwende den Encoder, den das RVC-Modell erwartet, etwa ContentVec, wenn das Modell damit trainiert wurde.

## 2. Fügen Sie eine Stimme hinzu

Klicken Sie auf **Modell aus .zip importieren** und wählen Sie eine ZIP-Datei aus, die eine Inferenz `.pth` und die entsprechende `.index` enthält, falls angegeben. Für die manuelle Platzierung legen Sie die Dateien in einem Unterordner pro Stimme im Verzeichnis `models` der App ab. Zum Beispiel:

```text
models/
  MyVoice/
    MyVoice.pth
    MyVoice.index
```

Wählen Sie die importierte Stimme in der GUI aus. Wenn es nicht vorhanden ist, öffnen Sie die Modellliste erneut oder starten Sie die App neu, nachdem Sie den Ordner überprüft haben. Verwenden Sie ein Inferenzmodell, das mit dem archivierten Build kompatibel ist. Ein Modell, das mit einem Encoder oder einer Architektur erstellt wurde, die der Build nicht laden kann, sollte in einer kompatiblen App getestet werden.

## 3. Konvertieren Sie einen Basisclip

1. Klicken Sie unter **Audiodatei eingeben** auf **Durchsuchen** und wählen Sie eine kurze, trockene Gesangsaufnahme mit einem deutlich stimmhaften Vokal und einem Konsonanten aus. Verwenden Sie eine vollständige WAV-Datei als Basis; Trennen Sie zuerst einen Gesangsstamm, wenn es sich bei der Quelle um ein vollständiges Lied handelt.
2. Wählen Sie die Stimme aus den Modellsteuerungen aus. Wenn Ihr Modell über mehrere unterstützte Lautsprechersteckplätze verfügt, wählen Sie den dokumentierten Steckplatz aus; Andernfalls verwenden Sie die Standardeinstellung.
3. Lassen Sie **Pitch** auf Null und setzen Sie **Feature-Retrieval-Rate** für die Grundlinie auf Null. Behalten Sie für diesen Test die Standardeinstellung **F0-Methode** bei.
4. Klicken Sie einmal auf **Konvertieren** und warten Sie, bis **Ausgabepfad** die generierte Datei anzeigt. Klicken Sie auf **Öffnen**, um es abzuspielen und mit dem Original in ähnlicher Lautstärke zu vergleichen. Kopieren Sie die generierte Datei unter einem eindeutigen Namen, wenn Sie sie zum Vergleich behalten möchten. Vergleichen Sie denselben Satz, bevor Sie eine weitere Anpassung vornehmen.
5. Wenn Sie einen stärkeren Zielcharakter wünschen und über den passenden Index verfügen, versuchen Sie es mit einer kleinen Retrieval-Mischung. Wenn Wörter weniger klar werden, kehren Sie zur Grundlinie zurück.

## Häufige Probleme

| Was passiert | Was zu überprüfen ist |
| --- | --- |
| Import meldet fehlende Gewichte | Öffnen Sie das Archiv und bestätigen Sie, dass es eine Schlussfolgerung `.pth` und nicht nur Audio, Dokumentation oder einen Trainingskontrollpunkt enthält. |
| Es wird kein Modell angezeigt. | Überprüfen Sie das Layout des extrahierten Ordners und stellen Sie sicher, dass Sie die App in derselben Installation geöffnet haben. |
| Falsche Stimme oder metallische Ausgabe | Überprüfen Sie den ausgewählten Prüfpunkt, den kompatiblen Encoder, den optionalen Index und die Quellaufzeichnung. Verwenden Sie einen unverarbeiteten Clip mit deaktiviertem Abruf. |
| Die Dateikonvertierung scheint zu stoppen. | Testen Sie eine kurze lokale WAV-Datei und überprüfen Sie die Konsole. Überprüfen Sie den ersten Fehler, bevor Sie ein langes Rendern erneut versuchen. |
| Die Leistung ist schlecht | Überprüfen Sie, welches Gerät der installierte PyTorch-Build verwendet. Informationen zu älteren Plattformen oder neueren Modellfunktionen finden Sie im [RVC-Tools-Vergleich](../../../reference/tools.md). |
