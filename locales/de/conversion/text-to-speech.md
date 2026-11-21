---
label: "💬 Text to Speech"
order: 93
permalink: /text-to-speech/
description: "Text to Speech (TTS) generiert eine Quellaufzeichnung aus den von Ihnen eingegebenen Wörtern. RVC wendet dann ein separates Sprachmodell auf diese Aufnahme an."
---
# Text to Speech und RVC

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Text to Speech (TTS) generiert eine Quellaufzeichnung aus den von Ihnen eingegebenen Wörtern. RVC wendet dann ein separates Sprachmodell auf diese Aufnahme an. Die TTS-Stimme liefert Aussprache, Akzent, Timing und den größten Teil des Ausdrucks. Das Zielmodell verändert den Klang dieser Leistung.

## Machen Sie einen kurzen Test

1. Öffnen Sie den TTS-Arbeitsbereich. Geben Sie ein paar Sätze ein oder stellen Sie eine UTF-8-Textdatei bereit.
2. Wählen Sie eine Sprache und Quellstimme. Ilaria RVC bietet Microsoft Edge-Stimmen online und installierte Windows-Stimmen für die Offline-Nutzung. Jede Sprach-Engine verfügt möglicherweise über einen anderen Satz von Steuerelementen für Geschwindigkeit, Lautstärke und Tonhöhe der Quelle.
3. Generieren und hören Sie sich die Quelle an, bevor Sie sie konvertieren. Wenn ein Name oder ein Akronym falsch ausgesprochen wird, passen Sie den Wortlaut an oder wählen Sie eine passendere Quellstimme.
4. Wählen Sie ein Modell aus und konvertieren Sie es. Beginnen Sie mit einer neutralen Transposition und beurteilen Sie die Original- und die konvertierte Aufnahme nebeneinander.
5. Erstellen Sie, sofern möglich, lange Skripte in Absätzen. Benennen Sie Bearbeitungen und Exporte einheitlich, damit ein einzelner Satz später neu generiert werden kann.

## Diagnostizieren Sie das richtige Stadium.

 | Was Sie hören. | Was Sie versuchen sollten. |
| --- | --- |
 | Die Quelle betont das falsche Wort. | Fügen Sie Satzzeichen hinzu, schreiben Sie den Satz neu oder versuchen Sie es mit einer anderen TTS-Stimme. |
 | Die Quelle klingt gehetzt. | Verlangsamen Sie die Wiedergabe oder teilen Sie den Text in kürzere Sätze auf. |
 | Die Sprache ist vor der Konvertierung klar und danach stumpf. | Versuchen Sie es mit einem anderen Tonhöhenextraktor oder einem geringeren Abrufeinfluss. |
 | Die Online-Stimmenliste ist nicht verfügbar. | Überprüfen Sie die Konnektivität oder wählen Sie eine installierte Windows-Stimme aus. |
 | Die Stimme ändert den Ton zwischen den Absätzen | Verwenden Sie für jeden Absatz dieselbe Quellstimme, dieselben Einstellungen und dasselbe Zielmodell. |

Bei der Sprachkonvertierung bleibt ein Großteil der Quellübertragung erhalten. Wählen Sie die Quelle basierend auf der Leistung aus, die Sie beibehalten möchten. Für weitere Vergleiche verwenden Sie den [Leitfaden zur Audioqualität](audio-quality.md).

[Ilaria RVC-Projekt und unterstützte TTS-Engines](https://github.com/TheStingerX/Ilaria-RVC)
