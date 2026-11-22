# RVC-Modelle und Dateien

Ein RVC-Modell verändert die Klangfarbe einer bestehenden Darbietung. Die Quellaufnahme liefert weiterhin Wörter, Phrasierung und Timing. Du benötigst ein kompatibles Inferenzmodell und eine Aufnahme oder ein Mikrofonsignal. Beginne mit einer einzelnen isolierten Stimme, damit du hören kannst, was das Modell tut.

## Was die Dateien tun

| Datei | Inhalt | Was tun |
| --- | --- | --- |
| Inferenz-`.pth` | Die für die Konvertierung verwendeten Modellgewichte. | Lade sie in der Modellauswahl. |
| Passende `.index` | Merkmale, die die App während der Konvertierung abrufen kann. | Füge sie hinzu, falls vorhanden. Du kannst auch ohne sie konvertieren. |
| `.zip` | Ein Archiv, das Modell, Index und eine README enthalten kann. | Nutze den ZIP-Import, falls deine App das Archiv unterstützt, oder entpacke es und wähle die Dateien einzeln aus. |
| Trainingscheckpoints wie `G_*.pth` und `D_*.pth` | Zwischendateien zum Fortsetzen des Trainings, je nach App. | Nutze das exportierte Inferenzmodell in deinem Konverter. Die `.pth`-Endung allein verrät nicht die Rolle der Datei. |

## Welchen Index sollte ich verwenden?

Beim Training in RVC WebUI (Mainline - Original RVC) ist `trained_*.index` der FAISS-Index, nachdem er gelernt hat, Merkmale zu organisieren, bevor die Merkmalsvektoren hinzugefügt werden. `added_*.index` ist die befüllte Version. Wähle für die Konvertierung die passende `added_*.index`, wenn beide existieren. Hast du nur `trained_*.index`, lasse Retrieval ausgeschaltet oder erzeuge den befüllten Index aus dem Experiment. Andere Apps verwenden möglicherweise andere Dateinamen.

Eine `.index`, die zusammen mit einem exportierten Modell geliefert wird, ist sehr wahrscheinlich bereits befüllt, auch wenn dem Dateinamen das Präfix `added_` fehlt. Der Name allein bestätigt den Inhalt nicht.

## Was sind die Trainingsordner?

Diese Ordner erscheinen üblicherweise in `logs/<experiment>/`. Es sind Arbeitsdateien für Training und Auswertung. Eine fertige Stimme benötigt nur ihre exportierte Inferenz-`.pth` und optional den passenden befüllten Index.

| Ordner | Inhalt |
| --- | --- |
| `0_gt_wavs` | Vorverarbeitete Sprachclips in der Abtastrate des Experiments. Sie dienen während des Trainings als Audioziele. |
| `1_16k_wavs` | 16-kHz-Kopien der Clips zur Merkmalsextraktion. |
| `2a_f0` | Extrahierte Tonhöhe, gespeichert als diskrete Werte für pitch-konditionierte Modelle. |
| `2b-f0nsf` | Kontinuierliche Tonhöhe in Hertz für pitch-konditionierte Modelle. |
| `3_feature768` | Merkmalsvektoren pro Clip mit 768 Dimensionen im RVC-v2-Layout. Diese Merkmale werden fürs Training genutzt und können auch den Retrieval-Index befüllen. |
| `eval` | Auswertungsausgaben, wie TensorBoard-Eventdateien, falls der Build sie dorthin schreibt. Der Inhalt hängt vom Trainer ab. |

## Ein passendes Modell wählen

Höre dir Demos an, die deiner geplanten Eingabe ähneln. Achte bei Sprache auf Konsonanten, leise Wörter und natürliche Pausen. Prüfe beim Gesang gehaltene Töne sowie die hohen und tiefen Enden deines Stimmumfangs. Bei geplanter Live-Nutzung teste freies Sprechen und Lautstärkewechsel. Prüfe dokumentierte Engine, Modellversion, bekannte Spracheinschränkungen und Nutzungsbedingungen. Ein Modell, das in einer Sprache gut klingt, kann in einer anderen ungleichmäßig klingen, selbst wenn beide im Trainings-Dataset enthalten waren.

## Modelle importieren und organisieren

1. Lade nur aus vertrauenswürdigen Quellen herunter und lies die beiliegenden Hinweise. Modelldateien können unsicher sein, wenn sie von Software geladen werden, die beliebige Objekte deserialisiert.
2. Bewahre jede Stimme und Version in einem eigenen Ordner auf, mit der exportierten `.pth`, der optionalen `.index` und eventuellen Hinweisen. Dateinamen allein reichen nicht aus, um einen Index einem Modell zuzuordnen.
3. Öffne in Ilaria RVC **Other → Import Local Models**. Wähle die Inferenz-`.pth` oder eine unterstützte ZIP-Datei und füge die passende `.index` hinzu, falls vorhanden. Andere Apps verlangen nach dem Import eventuell ein Aktualisieren der Modellliste.

## Erste Konvertierung durchführen

1. Nimm etwa zehn Sekunden einer einzelnen Stimme in einem ruhigen Raum auf, ohne Musik, starken Hall oder Clipping.
2. Wähle das gewünschte Modell, lasse Index-Retrieval aus und starte mit null Pitch-Shift. Speichere die konvertierte WAV als Referenz.
3. Klingt die Lage angestrengt, vergleiche kleine Tonhöhenänderungen in Halbtönen mit derselben Eingabe. Pitch-Shift ändert die Stimmlage, bewerte ihn daher getrennt von der Stimmidentität.
4. Sobald die Tonhöhe stimmt, teste eine leichte Erhöhung von Retrieval mit dem passenden Index. Achte auf klareren Stimmcharakter und prüfe dann, ob Atemzüge oder Konsonanten rau werden. Behalte die am besten klingende Einstellung bei, einschließlich Null.

## Häufige Probleme diagnostizieren

| Symptom | Was prüfen |
| --- | --- |
| Die App kann das Modell nicht laden | Prüfe Engine, Version und Dateityp. Entpacke die ZIP, falls der Importer sie ablehnt, und wähle dann die exportierten Inferenzgewichte. |
| Das Ergebnis klingt immer noch wie die Quelle | Vergleiche mit einem anderen bekanntermaßen guten Modell anhand desselben Clips. Anhaltendes Quell-Timbre kann vom Modell oder seinem Trainings-Embedder stammen, einschließlich HuBERT-Varianten. Mehr Retrieval löst es eventuell nicht. |
| Atemzüge oder Konsonanten klingen metallisch | Vergleiche mit deaktiviertem Retrieval. Besteht das Problem über saubere Eingaben und Einstellungen hinweg weiter, liegt es möglicherweise im Modell und erfordert Neutraining. |
| Nur die Live-Ausgabe stottert | Teste dasselbe Modell mit einer Datei. Funktioniert die Dateikonvertierung, prüfe Mikrofon, Audio-Routing und Puffer in der Live-App. |

## Ein Modell einsatzbereit halten

Speichere die funktionierende App-Version, Modellversion, gewählten Pitch und Retrieval-Einstellungen zusammen mit einem kurzen Referenzclip. Teste erneut nach einem App-Wechsel oder Modell-Update. Wenn du eigene Stimmen trainierst, bewahre den Export für Inferenz und die Dateien zum Fortsetzen des Trainings in getrennten Ordnern auf.

## Mit den Anleitungen fortfahren

- [App-Anleitungen](../other-rvcs/app-guides.md)
- [Ilaria RVC Modellbibliothek](../ilaria-rvc/manage/model-library.md)
- [Inferenz](../ilaria-rvc/convert/inference.md)
- [Dataset-Vorbereitung](../model-training/dataset-preparation.md)
- [Fehlerbehebung](../reference/troubleshooting.md)
