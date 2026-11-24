# Training und Kontrollpunkte

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN unterstützt Training und Inferenz mit 32, 40 und 44,1 kHz in RVC v2 mit Pitch Guidance. Die App erzeugt die stille Audiodatei für 44,1 kHz automatisch. Wähle **None** für Training von Grund auf, falls die vortrainierten Gewichte eine andere Architektur nutzen. Getestete Beispiele sind KLM 5 (40 kHz) und VCTK (44,1 kHz).

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Bereiten Sie ein Experiment vor

Wählen Sie einen Datensatz und wählen Sie eine kompatible RVC-Architektur, Abtastrate, Tonhöhenführung, Einbetter und Generator/Diskriminator-Vorzüge. Verwenden Sie einen eindeutigen Experimentnamen und eine Batchgröße, die zum VRAM passt. Führen Sie **Process Data** aus und extrahieren Sie dann Tonhöhen- und Inhaltsfunktionen vor dem Training.

## Vergleichen Sie Vorschauen und Exporte

Halten Sie vor dem Training einen kurzen Testclip hin. Aktivieren Sie **Trainingsvorschauen**, wenn Ihre Version dies bietet, und verwenden Sie denselben Clip an allen Prüfpunkten. Vergleichen Sie Diktion, Tonhöhe und unerwünschte Artefakte. Verwenden Sie das Dashboard für Timing und Zählungen und verwenden Sie Hörtests, um einen Export auszuwählen.

## Fortsetzen und exportieren

Verwenden Sie **Stopp und Speichern**, warten Sie auf die Bestätigung und behalten Sie dann den Experimentordner und die passenden G/D-Kontrollpunkte bei. Exportieren Sie zur Schlussfolgerung den kompakten Sprachkontrollpunkt und behalten Sie seinen passenden Index bei. Informationen zur Abstimmung und Wiederherstellung finden Sie unter [Trainieren eines RVC-Sprachmodells](../../model-training/training.md)].
