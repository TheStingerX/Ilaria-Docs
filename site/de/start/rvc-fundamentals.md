# RVC-Grundlagen

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Die Retrieval-basierte Sprachkonvertierung (RVC) nimmt eine Gesangsaufnahme und synthetisiert eine Version mit dem Charakter einer trainierten Stimme. Die Aufnahme liefert die Darbietung, einschließlich der Worte, des Rhythmus und eines Großteils der Tonhöhenkontur. Das Modell bestimmt, wie diese Leistung erbracht wird. Notieren Sie für eine gesprochene Zeile die Aussprache und den Vortrag, die Sie im Ergebnis hören möchten. Eine Tonhöhenanpassung ändert das Register, ohne die Zeile zu übersetzen oder neu zu schreiben.

## Folgen Sie dem Signal

 | Bühne | Was es tut | Worauf Sie achten sollten |
| --- | --- | --- |
 | Dekodieren Sie die Quelle | Liest das Audio und bereitet es für die Analyse vor. | Abgeschnittene Spitzen, Raumecho und andere Stimmen können spätere Stadien verunreinigen. |
 | Inhaltsfunktionen extrahieren | Ein Embedder repräsentiert den Klang jedes kurzen Abschnitts der Eingabe. Gängige RVC-Workflows verwenden ContentVec oder einen HuBERT-basierten Feature-Extraktor. | Selbst bei einem guten Modell können unklare Wörter der Eingabe in die Ausgabe folgen. |
 | Tonhöhe schätzen | Ein Tonhöhenprädiktor schätzt die Grundfrequenz oder F0 in stimmhaften Abschnitten. Pitch-gesteuerte Modelle können diese Kontur während der Synthese verwenden. | Unerwartete Notensprünge oder instabile gehaltene Noten können auf eine Tonhöhenverfolgung hinweisen. |
 | Ähnliche Trainingsfunktionen abrufen | Wenn ein kompatibler Index verfügbar ist, kann der Konverter nahegelegene Funktionen aus den Trainingsdaten des Modells mit den Quellfunktionen mischen. | Vergleichen Sie das Ein- und Ausschalten des Abrufs, wenn das Ergebnis gedämpft klingt oder die Klangfarbe der Quelle zu stark hervorsticht. |
 | Synthetisieren Sie die Ausgabe | Das Modell wandelt die konditionierten Merkmale mit der unterstützten Syntheserate in eine Wellenform um. | Achten Sie auf metallische Texturen, fehlende Konsonanten und Pegeländerungen. |

> Generische HuBERT-Checkpoints sind als Standardencoder für Stimmkonvertierung nicht empfohlen. Sie wurden für Sprachrepräsentationen trainiert und können Merkmale der Klangfarbe der Ausgangsstimme in die Ausgabe übertragen. Verwende den Encoder, den das RVC-Modell erwartet, etwa ContentVec, wenn das Modell damit trainiert wurde.

### Halten Sie die Bedienelemente getrennt.

- **Tonhöhenverschiebung** versetzt die erkannte Kontur um Halbtöne. Beginnen Sie bei Null und ändern Sie den Wert, wenn die Darbietung außerhalb des angenehmen Registers der Zielstimme liegt.
- **Pitch-Prädiktor** ändert die Art und Weise, wie die Kontur gemessen wird. Vergleichen Sie Prädiktoren für eine Passage, die das Problem enthält, z. B. eine anhaltende Note oder den Übergang vom Sprechen zum Atemzug.
- **Indexrate** ändert das Gleichgewicht zwischen Quell- und abgerufenen Funktionen. Null deaktiviert den Abrufbeitrag in Standard-RVC-Workflows. Eine hohe Einstellung kann Merkmale der Trainingsdaten hervorheben, einschließlich unerwünschter Artefakte.
- **Sample rate** describes how many audio samples represent a second. The source file rate, the model's synthesis rate and the exported file rate can differ. Resampling a file changes its representation without making an incompatible checkpoint loadable.

For app-specific conversion controls, see [Voice conversion](../conversion/voice-conversion.md).

## Überprüfen Sie die Modellkompatibilität vor dem Import.

1. **Bestätigen Sie die Modellfamilie und -architektur.** Verwenden Sie eine Laufzeit, die das Modell explizit unterstützt. Classic RVC v1 and v2 use different feature dimensions, commonly 256 and 768 respectively in RVC WebUI (Mainline - Original RVC). Some forks also support architectures that require their own runtime.
2. **Überprüfen Sie den Embedder.** Die Laufzeit sollte die Feature-Darstellung bereitstellen, die das Modell erwartet hat. Ein mit einem benutzerdefinierten Einbetter trainiertes Modell kann diesen Einbetter zum Zeitpunkt der Inferenz benötigen. Eine ähnliche Dateierweiterung oder eine passende Abtastrate allein liefern kaum Hinweise auf eine Unterstützung.
3. **Verwenden Sie den Inferenzexport.** Ein gebrauchsfertiges `.pth` und ein Trainingskontrollpunkt können dieselbe Erweiterung haben. Wählen Sie die vom Herausgeber identifizierte Datei als Inferenzmodell aus. Ein ZIP ist ein Container für die Dateien und kann nur dann direkt importiert werden, wenn die App den ZIP-Import unterstützt.
4. **Koppeln Sie Abrufdaten mit ihrem Prüfpunkt.** Ein für eine andere Stimme oder einen anderen Embedder erstelltes `.index` kann fehlschlagen oder das Ergebnis verschlechtern. Behalten Sie das Modell und seinen Index bei und prüfen Sie, ob die App das erwartete Paar ausgewählt hat. Wenn Sie nur über ein kompatibles Modell verfügen, verwenden Sie den von Ihrem Kunden unterstützten No-Retrieval-Workflow.
5. **Testen Sie eine kurze Datei.** Probieren Sie einen sauberen Clip mit Standardeinstellungen aus. Ein geladenes Modell kann immer noch falsch klingen, wenn die Laufzeit den falschen Feature-Extraktor verwendet oder die Eingabe weit außerhalb des Sprachbereichs liegt.

!!!warning Vertrauenswürdige Modelldateien
Beziehen Sie die Modelldateien vom ursprünglichen Herausgeber oder einer anderen Quelle Ihres Vertrauens. Das Laden eines PyTorch-Prüfpunkts kann die Deserialisierung von Python-Objekten beinhalten. Lassen Sie die Schutzmaßnahmen in Ihrem Loader aktiviert und fordern Sie einen unterstützten Export an, wenn dieser eine Datei ablehnt. [PyTorch-Ladereferenz](https://docs.pytorch.org/docs/stable/generated/torch.load.html)
!!!

## Beurteilen Sie das Ergebnis mit einem wiederholbaren Test.

Bewahren Sie einen trockenen Referenzclip auf und verwenden Sie denselben Clip für jeden Vergleich. Fügen Sie eine ruhige Phrase, einen Satz mit scharfen Konsonanten und einem gehaltenen Vokal ein. Halten Sie die Wiedergabepegel ähnlich, damit die Lautstärke allein nicht dazu führt, dass eine Ausgabe besser erscheint.

1. Rendern Sie eine Grundlinie mit den Standardeinstellungen der App.
2. Überprüfen Sie zuerst die Klarheit der Wörter. Wenn sowohl die trockenen als auch die konvertierten Clips schwer zu verstehen sind, nehmen Sie die Quelle neu auf.
3. Vergleichen Sie bei Tonhöhenschwankungen zwei unterstützte Tonhöhenprädiktoren, bevor Sie den Abruf ändern.
4. Vergleichen Sie bei einem Timbre- oder Texturproblem mit deaktiviertem Abruf und passen Sie dann die Indexrate an, wenn der passende Index hilfreich ist.
5. Speichern Sie die Arbeitseinstellungen mit Modellname, Release und Eingabe. Wenn ein späteres Update den Sound ändert, dienen Ihnen diese Notizen als Ausgangspunkt.

[Erste Schritte mit Ilaria RVC](getting-started.md) · [RVC-Modelle und -Dateien](models.md) · [Sprachkonvertierung in Echtzeit](../conversion/real-time.md)
