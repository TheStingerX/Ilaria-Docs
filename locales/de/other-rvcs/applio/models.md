---
label: "Installieren und überprüfen Sie eine Stimme"
icon: ":package:"
order: 96
permalink: /ilaria-rvc/applio/models/
---
# Installieren Sie eine Stimme in Applio

Legen Sie Modell-Downloads in einem bekannten Ordner ab und extrahieren Sie alle ZIP-Dateien dort. Bewahren Sie die Notizen des Herausgebers neben den Dateien auf. Verwenden Sie Modelle aus Quellen, denen Sie vertrauen.

| Sie haben | Was damit zu tun ist |
| --- | --- |
| Einen Sprachexport wie `ExampleVoice.pth` | Importieren Sie ihn als Inferenzmodell. |
| Ein `.index` wird für diese Stimme bereitgestellt. | Bewahren Sie es neben seinem Modell auf. Verwenden Sie es, wenn Sie den Abruf testen möchten. |
| Dateien wie `G_100.pth` und `D_100.pth` | Bewahren Sie sie für das Training oder die Wiederaufnahme auf. Fragen Sie nach dem Inferenzexport, wenn Sie nur Audio konvertieren möchten. |
| Informationen zum Embedder, Vocoder oder Sprecher-ID | Notieren Sie es. Möglicherweise benötigen Sie es, wenn Sie die Konvertierungssteuerelemente auswählen. |

Ein Embedder beschreibt den Audioinhalt für das Sprachmodell. Passen Sie den Einbetter aus dem Training an, bevor Sie Tonhöhen- oder Abrufeinstellungen ändern. Wenn ein Export einen benutzerdefinierten Embedder verwendet, beziehen Sie die passenden Dateien vom Herausgeber.

## Desktop-Import

1. Öffnen Sie **Modelle → Modelle herunterladen**. Geben Sie einen unterstützten öffentlichen Link unter **Von Link herunterladen** ein und verwenden Sie **Herunterladen**. Warten Sie auf einen erfolgreichen Auftragsstatus, bevor Sie die Bibliothek aktualisieren.
2. Wählen Sie für Dateien, die Sie bereits extrahiert haben, im selben Arbeitsbereich **Modelldateien hochladen**. Wählen Sie `.pth` und verwenden Sie **Datei speichern**. Wiederholen Sie diesen Vorgang für den Index, wenn einer mit der Stimme kam.
3. **Modellbibliothek** aktualisieren. Verwenden Sie **Inspect**, um Metadaten wie Rate, Embedder, Vocoder oder verfügbare Lautsprecherplätze zu überprüfen, sofern diese Felder vorhanden sind. Wählen Sie dann **Verwenden**, um das Modell in den Konvertierungsarbeitsbereich zu übernehmen.
4. Überprüfen Sie, ob das ausgewählte Modell Ihre neue Stimme ist, bevor Sie die Konvertierung durchführen.

## Gradio-Import

1. Öffnen Sie **Modelle**, in einigen Versionen **Download** genannt. Geben Sie den Modelllink in das Download-Panel ein oder laden Sie die extrahierte Stimme und den Index über **Dateien ablegen** hoch.
2. Öffnen Sie nach der Installation **Convert Audio** oder **Inference** und aktualisieren Sie die Modellliste. Wählen Sie die neue Stimme nach Namen aus.
3. Wenn Sie Dateien manuell kopieren, suchen Sie nach dem aktiven Protokoll-/Modellverzeichnis der Installation, die Sie tatsächlich gestartet haben. Eine Gradio-Installation verwendet üblicherweise ein Layout wie `logs/ExampleVoice/ExampleVoice.pth`, mit dem passenden Index im selben Verzeichnis. Der bei einer Desktop-Installation angezeigte Pfad kann unterschiedlich sein.

## Bestätigen Sie, dass die Engine es verwenden kann.

1. Verwenden Sie einen isolierten Sprachclip, der etwa zehn Sekunden dauert. Beginnen Sie mit einer Tonhöhe von 0, ausgeschalteten Effekten und einem Abrufverhältnis von 0. Wenn das Modell über mehrere Lautsprecher verfügt, wählen Sie die gewünschte Lautsprecher-ID aus.
2. Wählen Sie den dokumentierten Embedder und führen Sie eine einzelne Konvertierung durch. Stellen Sie sicher, dass das Ergebnis spielbar ist und Sie die von Ihnen eingegebenen Wörter erkennen können.
3. Wenn Sie einen passenden Index haben, speichern Sie zuerst die Basislinie. Wählen Sie den Index aus, erhöhen Sie das Abrufverhältnis ein wenig und führen Sie denselben Clip erneut aus. Behalten Sie das Ergebnis bei, das für diese Stimme besser funktioniert.

Wenn ein Modell nach der Aktualisierung verschwindet, überprüfen Sie seine Dateierweiterung und prüfen Sie, wo die ausgewählte Installation Modelle speichert. Wenn die Stimme aufgelistet ist, beim Laden jedoch ein Fehler auftritt, lesen Sie den ersten Fehler beim Laden des Modells. Stellen Sie sicher, dass Sie einen Inferenzexport bereitgestellt haben und dass Ihr Build die Architektur unterstützt. Wenn eine Datei von einem Browser-Download stammt, überprüfen Sie, ob der Browser das eigentliche Modellarchiv und keine HTML-Anmeldeseite gespeichert hat.
