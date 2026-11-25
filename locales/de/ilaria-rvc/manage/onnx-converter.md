---
label: "ONNX-↔-PTH-Konverter"
icon: ":repeat:"
order: 87
permalink: /ilaria-rvc/onnx-converter/
---

# ONNX-↔-PTH-Konverter

Wähle unter **Other → Convert model weights** ein installiertes Modell oder eine Datei. Exportiere ein RVC-HiFi-GAN-Modell mit Pitch-Führung als ONNX für einen kompatiblen externen Client. Die exakte Wiederherstellung als `.pth` ist bei ONNX-Dateien verfügbar, die Ilaria RVC exportiert hat. Bewahre bei anderen Exportern die ursprüngliche `.pth`-Datei auf. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

[Windows-Update als ZIP](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

## Was in den Dateien steckt

Die `.pth` ist der Inferenz-Checkpoint für Ilaria RVC. Die `.onnx` enthält einen Graphen und Gewichte für einen kompatiblen Client. Bewahre die `.index` separat auf und verwende sie bei Bedarf in einem Client, der Retrieval unterstützt.

## Vor dem Export

Verwende **Ilaria RVC ab 2.5.1** und **PyTorch ab 2.6**. Benötigt wird ein **HiFi-GAN**-Inferenzmodell mit Pitch-Führung und eine `.pth` von höchstens **512 MiB**. Exportiere aus Trainings-Checkpoints zuerst die Stimme. Der Export läuft auf der CPU.

## Ein Modell als ONNX exportieren

Wähle ein installiertes Inferenzmodell oder gib die exportierte `.pth`-Datei an. Wähle die Konvertierung zu ONNX und speichere das Ergebnis. Lade es in den externen Client und teste es mit einer kurzen Aufnahme.

Wähle **ONNX** als Ausgabeformat. Bei einer `.pth` wählt **Auto** Safetensors. Starte die Konvertierung, warte auf den Abschluss und lade die Datei herunter.

## Wie die exakte Wiederherstellung funktioniert

Der Exporter bettet die ursprünglichen `.pth`-Bytes in die ONNX-Datei ein. Bei der Wiederherstellung prüft er RVC-Konfiguration und Gewichte. Optimierung oder erneuter Export kann die eingebetteten Daten entfernen.

## Ursprüngliches PTH wiederherstellen

Gib die von Ilaria RVC exportierte `.onnx`-Datei an. Wähle die Konvertierung zu `.pth`, speichere das Modell und teste es unter **Inference**.

Wähle bei einer ONNX-Datei **Auto** oder **PTH**. Starte die Konvertierung und lade die Datei herunter. Wenn das Original vorliegt, vergleiche die SHA-256-Prüfsummen.

## Ergebnis testen

Teste ONNX im Zielclient mit einem kurzen Ausschnitt. Prüfe die wiederhergestellte PTH in Ilaria RVC mit demselben Audio und den ursprünglichen Einstellungen.

## Fehlerbehebung

Prüfe Vocoder, Pitch-Führung, Dateigröße und PyTorch-Version bei Exportfehlern. Fehlt der eingebettete Checkpoint, verwende den unveränderten Export oder die gesicherte PTH. Wenn der Client ONNX ablehnt, prüfe die unterstützten RVC-Formate.

[Safetensors ↔ PTH](safetensors-converter.md)
