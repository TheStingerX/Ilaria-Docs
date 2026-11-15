---
label: "🧪 Training und Kontrollpunkte"
order: 94
permalink: /ilaria-rvc/training-workflow/
---
# Training und Kontrollpunkte

## Bereiten Sie ein Experiment vor

Wählen Sie einen Datensatz und wählen Sie eine kompatible RVC-Architektur, Abtastrate, Tonhöhenführung, Einbetter und Generator/Diskriminator-Vorzüge. Verwenden Sie einen eindeutigen Experimentnamen und eine Batchgröße, die zum VRAM passt. Führen Sie **Process Data** aus und extrahieren Sie dann Tonhöhen- und Inhaltsfunktionen vor dem Training.

## Vergleichen Sie Vorschauen und Exporte

Halten Sie vor dem Training einen kurzen Testclip hin. Aktivieren Sie **Trainingsvorschauen**, wenn Ihre Version dies bietet, und verwenden Sie denselben Clip an allen Prüfpunkten. Vergleichen Sie Diktion, Tonhöhe und unerwünschte Artefakte. Verwenden Sie das Dashboard für Timing und Zählungen und verwenden Sie Hörtests, um einen Export auszuwählen.

## Fortsetzen und exportieren

Verwenden Sie **Stopp und Speichern**, warten Sie auf die Bestätigung und behalten Sie dann den Experimentordner und die passenden G/D-Kontrollpunkte bei. Exportieren Sie zur Schlussfolgerung den kompakten Sprachkontrollpunkt und behalten Sie seinen passenden Index bei. Informationen zur Abstimmung und Wiederherstellung finden Sie unter [Trainieren eines RVC-Sprachmodells](../model-training/training.md)].
