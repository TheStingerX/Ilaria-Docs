# ONNX-↔-PTH-Konverter

Wähle unter **Other → Convert model weights** ein installiertes Modell oder eine Datei. Exportiere ein RVC-HiFi-GAN-Modell mit Pitch-Führung als ONNX für einen kompatiblen externen Client. Die exakte Wiederherstellung als `.pth` ist bei ONNX-Dateien verfügbar, die Ilaria RVC exportiert hat. Bewahre bei anderen Exportern die ursprüngliche `.pth`-Datei auf. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## Ein Modell als ONNX exportieren

Wähle ein installiertes Inferenzmodell oder gib die exportierte `.pth`-Datei an. Wähle die Konvertierung zu ONNX und speichere das Ergebnis. Lade es in den externen Client und teste es mit einer kurzen Aufnahme.

## Ursprüngliches PTH wiederherstellen

Gib die von Ilaria RVC exportierte `.onnx`-Datei an. Wähle die Konvertierung zu `.pth`, speichere das Modell und teste es unter **Inference**.

[Safetensors ↔ PTH](safetensors-converter.md)
