---
label: "Einzel- und Batch-Inferenz"
icon: ":studio_microphone:"
order: 97
permalink: /ilaria-rvc/inference/
description: "Öffnen Sie Single Inference, wählen Sie eine Stimme und laden Sie einen kurzen, trockenen Clip. Setzen Sie Pitch und Index Ratio auf Null."
---
# Einzel- und Batch-Inferenz

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · RefineGAN unterstützt Training und Inferenz mit 32, 40 und 44,1 kHz in RVC v2 mit Pitch Guidance. Die App erzeugt die stille Audiodatei für 44,1 kHz automatisch. Wähle **None** für Training von Grund auf, falls die vortrainierten Gewichte eine andere Architektur nutzen. Getestete Beispiele sind KLM 5 (40 kHz) und VCTK (44,1 kHz).

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

[Inferenzsteuerung](inference-buttons.md)

## Erstellen Sie eine Referenz

Öffnen Sie **Single Inference**, wählen Sie eine Stimme und laden Sie einen kurzen, trockenen Clip. Setzen Sie **Pitch** und **Index Ratio** auf Null. Verwenden Sie den vom Modell erwarteten Einbetter, beginnen Sie mit RMVPE und lassen Sie optionale Effekte ausgeschaltet. Speichern Sie eine WAV-Datei und vergleichen Sie sie mit Ihrer Eingabe bei passender Lautstärke.

## Stellen Sie separate Durchgänge ein.

Wenn ein passender Index verfügbar ist, erhöhen Sie den Abruf in kleinen Schritten. Achten Sie auf einen klareren Stimmcharakter und mögliche Dämpfung. Senken Sie **Protect**, um Konsonanten und Atemzügen bei der tonhöhengesteuerten Konvertierung mehr Schutz zu bieten. Der Effekt hängt vom Abruf ab, der nur über Null beiträgt. Vergleichen Sie die Tonhöheneinstellungen separat.

## Mehrere Dateien verarbeiten

In **Batch Inference** gruppieren Sie Aufnahmen nach Modell und Tonhöheneinstellung. Verwenden Sie einen separaten Zielordner. Führen Sie zunächst einen repräsentativen Clip aus, überprüfen Sie dann das Stapelprotokoll und hören Sie sich die Ergebnisse jeder Gruppe an.
