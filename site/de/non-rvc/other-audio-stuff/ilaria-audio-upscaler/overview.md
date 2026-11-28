# Ilaria Audio Upscaler

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Engine auswählen

Ilaria Audio Upscaler verarbeitet Aufnahmen lokal unter Windows. Wähle **Sidon** bei Rauschen, Raumhall oder Kompressionsartefakten und **AP-BWE** bei relativ sauberer, aber bandbegrenzter Sprache, etwa einem Telefonmitschnitt. Beide Engines sind auf Sprache ausgelegt. Vergleiche das Ergebnis vor der Nutzung in einem Stimm-Datensatz mit dem Original.

## Apollo

**Apollo** restauriert Musik, die durch verlustbehaftete Kompression beeinträchtigt wurde. Es arbeitet mit **44,1 kHz** auf der CPU oder mit NVIDIA CUDA. Wähle einen kurzen Ausschnitt und **Apollo**, lade bei Bedarf das Modell und klicke auf **Enhance audio**. Vergleiche Original und Ergebnis bei **1×** vor dem Speichern mit **Save result**.

[Apollo](https://github.com/JusperLee/Apollo)

## Erster Test

Behalte die Quelldatei. Verarbeite einen kurzen Ausschnitt mit einer Engine und exportiere als WAV. Vergleiche bei ähnlicher Lautstärke, besonders Konsonanten, Pausen und Klangfarbe. Hohe Frequenzen werden aus dem vorhandenen Signal rekonstruiert. Eine 48-kHz-Ausgabe stellt die ursprüngliche Wellenform nicht exakt wieder her.

[Installation und Modelle](installation.md) · [Sprache mit Sidon restaurieren](sidon.md) · [Sprachbandbreite mit AP-BWE erweitern](ap-bwe.md) · [Vorschau, Export und Fehlerbehebung](export.md)

## Quellen

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [Sidon](https://github.com/sarulab-speech/Sidon) · [AP-BWE](https://github.com/yxlu-0102/AP-BWE)
