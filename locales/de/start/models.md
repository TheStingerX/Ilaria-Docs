---
label: "📦 RVC-Modelle und -Dateien"
order: 93
permalink: /models/
description: "Ein RVC-Modell verändert die Klangfarbe einer vorhandenen Stimme. Wörter, Rhythmus und Pausen stammen aus der Eingabe."
---
# RVC-Modelle und -Dateien

Ein RVC-Modell verändert die Klangfarbe einer vorhandenen Stimme. Wörter, Rhythmus und Pausen stammen aus der Eingabe. Beginne mit einer einzelnen Stimme ohne Musik oder Effekte.

## Die Dateien im Überblick

| Datei | Verwendung |
| --- | --- |
| Inferenz-`.pth` | Modellgewichte für die Konvertierung. |
| Passender `.index` | Optionaler Suchindex. Die Konvertierung funktioniert auch ohne ihn. |
| `.zip` | Archiv zum Importieren, falls die App es unterstützt, oder zum Entpacken. |
| `G_*.pth` und `D_*.pth` | Checkpoints, die zum Fortsetzen des Trainings dienen können. Verwende zum Konvertieren den Inferenzexport. |

## Welche Indexdatei soll ich verwenden?

Bei RVC WebUI (Mainline - Original RVC) ist `trained_*.index` der trainierte FAISS-Index vor dem Hinzufügen der Vektoren. `added_*.index` enthält die durchsuchbaren Vektoren. Wenn beide vorhanden sind, wähle den passenden `added_*.index`. Hast du nur `trained_*.index`, deaktiviere die Indexsuche oder erstelle den befüllten Index. Andere Apps können die Dateien anders benennen.

Eine `.index`-Datei, die mit dem exportierten Modell geliefert wird, enthält sehr wahrscheinlich bereits die Vektoren, auch ohne das Präfix `added_`. Der Dateiname allein bestätigt das nicht.

## Was enthalten die Trainingsordner?

Diese Ordner befinden sich meist in `logs/<Experiment>/`. Für die Konvertierung brauchst du die exportierte Inferenzdatei `.pth` und optional den passenden befüllten Index.

| Ordner | Inhalt |
| --- | --- |
| `0_gt_wavs` | Vorverarbeitete Clips mit der Abtastrate des Experiments. |
| `1_16k_wavs` | 16-kHz-Kopien zur Merkmalsextraktion. |
| `2a_f0` | Grundtonhöhe als diskrete Werte. |
| `2b-f0nsf` | Kontinuierliche Grundfrequenz in Hertz. |
| `3_feature768` | 768-dimensionale Merkmalsvektoren für Training und Index bei RVC v2. |
| `eval` | Ausgaben der Auswertung, je nach Anwendung etwa TensorBoard-Ereignisse. |

## Ein Modell auswählen

Höre Demos, die deiner Eingabe ähneln. Achte bei Sprache auf Konsonanten und leise Passagen. Prüfe beim Gesang gehaltene Töne und die Grenzen des benötigten Tonumfangs. Prüfe Engine, Version und Nutzungsbedingungen. Teste benötigte Sprachen einzeln.

## Modelle importieren und organisieren

Lade nur aus vertrauenswürdigen Quellen. Lege für jede Version einen eigenen Ordner mit dem passenden Index und den Hinweisen an. Öffne in Ilaria RVC **Other → Import Local Models** und importiere die Inferenz-`.pth` oder eine unterstützte ZIP-Datei. Füge den zugehörigen Index hinzu, falls vorhanden.

## Eine erste Konvertierung testen

1. Nimm zehn Sekunden klare Sprache ohne Hintergrundmusik auf.
2. Konvertiere bei null Halbtönen und mit deaktivierter Indexsuche. Speichere die WAV-Datei als Referenz.
3. Passe die Tonhöhe schrittweise an, wenn die Stimmlage unnatürlich klingt. Teste dann einen niedrigen Suchwert mit dem passenden Index.
4. Vergleiche denselben Ausschnitt bei gleicher Lautstärke und achte auf Konsonanten und Atemgeräusche.

## Fehler eingrenzen

Wenn ein Modell nicht lädt, prüfe Engine und Dateityp. Ist die ursprüngliche Klangfarbe noch deutlich hörbar, vergleiche mit einem anderen Modell. Ursache können das Training oder der Embedder sein, etwa bestimmte HuBERT-Varianten. Bleiben Konsonanten bei mehreren sauberen Aufnahmen metallisch, kann erneutes Training nötig sein. Prüfe bei Aussetzern ausschließlich im Livebetrieb die Audiowege und den Puffer.

## Funktionierende Einstellungen sichern

Notiere App- und Modellversion, Transposition und Suchwert. Bewahre einen kurzen Testclip auf, damit du nach einem Update vergleichen kannst.

## Weiterführende Anleitungen

- [Anleitungen nach App](../other-rvcs/app-guides.md)
- [Modellbibliothek von Ilaria RVC](../ilaria-rvc/manage/model-library.md)
- [Inferenz](../ilaria-rvc/convert/inference.md)
- [Datensatzvorbereitung](../model-training/dataset-preparation.md)
- [Fehlerbehebung](../reference/troubleshooting.md)
