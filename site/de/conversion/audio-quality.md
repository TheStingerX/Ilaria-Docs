# RVC-Inferenz-Audioqualität verbessern

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Bei der RVC-Stimmkonvertierung hängt die **Audioqualität** von zwei Hälften ab: der eingespeisten **Quellaufnahme** und dem **Modell + den Inferenz-Einstellungen**. In F0-gesteuerten RVC-Modellen synthetisiert die Konvertierung das Timbre der Zielstimme anhand der aus der Quellaufnahme extrahierten F0-Kontur; die Zielstimme erzwingt nicht automatisch ihren eigenen Stimmumfang (das Ergebnis hängt weiterhin vom Trainingsmaterial und den Modellgrenzen ab). RVC **kann** weder Übersteuerung (Clipping), laute Hintergrundmusik, Raumhall noch undeutliche Artikulation in der Eingabedatei reparieren.

## Mit einer konkreten Diagnose-Basis starten

Bevor du erweiterte Regler veränderst, führe einen sauberen Durchlauf in **Ilaria RVC** aus, um zu hören, was der `.pth`-Generator allein auf deinem Quell-Audio leistet:

1. Öffne den Tab **Inference**.
2. Wähle deine Zielstimme unter **Voice Model** (klicke **Refresh**, falls du sie gerade hinzugefügt hast).
3. Bleibe im Unter-Tab **Single Inference**.
4. Lade deine Aufnahme in **Audio to convert**. *(Ein kurzer Ausschnitt hilft, eine Stelle schneller zu prüfen, ist aber nie zwingend nötig.)*
5. Setze **Pitch** auf `0`.
6. Wähle unter **Inference Settings** bei **Pitch Extraction** die Option **RMVPE**.
7. Setze **Index Ratio** auf `0` (deaktiviert das FAISS-Feature-Retrieval, damit du den `.pth`-Generator ohne Index-Mischung hörst).
8. Lasse alle optionalen Kontrollkästchen unter **Audio Processing** (**Split Audio**, **Autotune**, **Proposed Pitch**, **Clean Audio**, **Formant Shifting**, **Post-Process**) sowie **RMVPE High Register** auf **OFF**.
9. Klicke auf **Convert**.
10. Höre **Output Audio** an und lies **Output Log** für Konvertierungsstatus, Laufzeiten sowie verfügbare Index- oder Embedder-Angaben. Diese Meldungen bestätigen nicht zwingend, dass das FAISS-Retrieval erfolgreich lief (ein Index kann ausgewählt und in den Einstellungen als aktiviert gemeldet sein, während das Laden per FAISS fehlschlägt oder übersprungen wird, und `Embedder` wird bei `Auto (model default)` möglicherweise nicht explizit ausgegeben). Prüfe die Konsolen-Diagnose, falls das Laden des Index fehlschlägt oder das Ergebnis unerwartet ist.

> **Nur Diagnose-Basis:** Diese Startkonfiguration isoliert das Verhalten des `.pth`-Generators ohne FAISS-Retrieval oder Nachbearbeitung; sie garantiert keine optimale Endqualität. Ändere von dieser Basis aus jeweils nur einen Parameter und vergleiche bei gleicher Abhörlautstärke.

---

## A. Saubere Konvertierung erreichen

- **Quell-Audio & isolierte Vocals:** RVC erwartet eine einzelne, trockene, saubere Stimme. Werkzeuge wie [UVR5](../non-rvc/uvr5/overview.md) oder [MVSep](../non-rvc/mvsep/overview.md) helfen beim Trennen von Vocals und Begleitmusik, und spezialisierte Modelle übernehmen je nach Modell Entrauschen, Enthallen, De-Essing oder Audiorestauration (kein einzelnes Tool entfernt jede Art von Rauschen oder Hall).
- **Sprache vs. Gesang:** Sprache verträgt oft kleine **Pitch**-Anpassungen, während Gesang über ein Instrumental meist **Pitch = 0** beibehält, um in der Tonart des Playbacks zu bleiben (eine Transposition abweichend von der Oktave kann sinnvoll sein, wenn sich auch die Tonart der Begleitung ändert).
- **Modell- & Embedder-Kompatibilität:** Belasse **Embedder Model** auf `Auto (model default)`, außer du hast gezielt ein Modell trainiert oder geladen, das einen bestimmten Encoder verlangt (`contentvec`, `spin-v2`, `klm-vocal-contentvec` usw.). Ein inkompatibler Embedder kann einen Fehler auslösen oder die Konvertierung verschlechtern und den Index-Abgleich stören.
- **Optionaler Index & verlustfreier Export:** Belasse **Index Ratio** für die Basis auf `0` und teste bei Bedarf anschließend deine passende `added_*.index`. Nutze `wav` oder `flac` für verlustfreie Exporte; `flac` verkleinert die Dateigröße ohne verlustbehaftete Kompression. `mp3`, `ogg` und `m4a` nutzen im aktuellen Ilaria-RVC-Exporter verlustbehaftete Kodierung, und das Exportformat fügt niemals Details hinzu, die das Modell nicht erzeugt hat.

---

## B. Tonhöhen- und Gesangsprobleme beheben

- **Pitch (Halbtöne):** Pitch verschiebt die extrahierte F0-Kontur in Halbtönen (`-24` bis `+24`; `12` Halbtöne = 1 Oktave). Bei `0` folgt die tonhöhengeführte Konvertierung der Quelltonhöhe ohne zusätzliche Transposition. Wähle nur dann einen anderen Wert, wenn die Zieldarbietung oder das musikalische Arrangement es erfordert (beim Gesang kann eine Nicht-Oktav-Transposition passend sein, wenn auch die Begleittonart geändert wird). Es gibt keine universelle Pitch-Verschiebung zwischen verschiedenen Stimmtypen. Erfordert ein F0-geführtes Modell (`if_f0 == 1`).
- **Pitch Extraction (F0) in Ilaria RVC:** Schätzt vor der Synthese die Grundfrequenz (F0) aus dem `16 kHz`-Eingangssignal (getrennt vom Pitch Shifting).
  - **Single & Batch Inference (CUDA):** `rmvpe` (Standard), `swift`, `beatrice`, `fcpe`, `parselmouth`, `harvest`, `crepe`. *(Bei DirectML-Builds: `pm`, `harvest`, `rmvpe`, `fcpe`.)*
  - **Nur Feature-Extraktion beim Training:** Enthält `rmvpe_gpu` (und `dio`); `rmvpe_gpu` ist **kein** separater Schalter in der Inferenz.
  - *Hinweis:* Wenn `rmvpe` auf einem bestimmten Ton einen Oktavsprung erzeugt, teste `fcpe`, `swift`, `beatrice` oder `crepe` an genau derselben Passage, statt eine Methode pauschal als „beste“ oder schnellste für jede Stimme anzunehmen.
- **RMVPE High Register** *(nur sichtbar, wenn `rmvpe` gewählt ist)*:
  - **Enable high register:** Aktiviert eine sekundäre Oktavfehler-Korrektur für sehr hohe Gesangstöne. Für normale Sprache oder mittleren Gesang **nicht** standardmäßig aktiviert lassen.
  - **Mode (`true_pitch` / `fold`):** `true_pitch` behält die korrigierte F0 bis **Maximum F0 (Hz)** (`1000–2000`, Standard `1250`); `fold` hält korrigierte Töne eine Oktave tiefer.
  - **Advanced (`Activation threshold` `800–1500` Hz Standard `1040`, `Sensitivity`, `Minimum note duration` `0–300` ms Standard `60`):** Regelt, wann die Hochlagen-Korrektur greift.
  - **Preview original and corrected F0:** Zeichnet die ersten 30 Sekunden der geschätzten vs. korrigierten F0 ohne vollständige Stimmkonvertierung. Ein saubererer Graph hilft bei der Diagnose von Oktavsprüngen, garantiert aber nicht automatisch besser klingendes Audio.
- **Autotune & Autotune Strength (`0–1`, Standard `1.0`):** Zieht stimmhafte F0-Frames zum nächsten gleichstufig chromatischen Ton (`G1`–`C6`), skaliert über **Autotune Strength**. Da zu *jedem* chromatischen Halbton gezogen wird (es gibt **keine** Tonart-/Skalenauswahl in Ilaria RVC), kann eine hohe Stärke natürliches Vibrato oder ausdrucksstarke Slides abflachen.
- **Proposed Pitch & Target Pitch (Hz) (`50–1200`, Standard `155`):** Berechnet den Median der interpolierten stimmhaften F0-Frames über das Quell-Audio und addiert einen automatischen Halbton-Offset (`-12` bis `+12`) Richtung **Target Pitch (Hz)** auf deinen **Pitch**-Regler. Nützlich als schneller Transpositionstest, auch wenn die mathematisch zentrierte Tonhöhe nicht immer musikalisch oder stimmlich am besten passt. Sowohl **Autotune** als auch **Proposed Pitch** erfordern ein F0-geführtes Modell (`if_f0 == 1`).

---

## C. Stimmidentität und Timbre korrigieren

- **Content Embedder vs. Voice Generator (`.pth`):** Der trainierte `.pth`-Generator erzeugt die Zielstimme, während der Content Embedder (Standard `Auto (model default)`, typischerweise `contentvec`) Sprachmerkmale aus der Quellaufnahme extrahiert. Der Embedder soll Informationen zur Sprecheridentität der Quelle reduzieren, ist aber nicht zwingend völlig sprecherunabhängig und definiert nicht die Zielstimm-Identität. Verwende den vom Modell erwarteten Embedder, um Kompatibilität zu wahren und Konvertierungsartefakte zu vermeiden. Chinesische, japanische, koreanische und portugiesische HuBERT-Base-Embedder erfordern ein **RVC v2**-Modell.
- **So funktioniert `Index Ratio` (`0–1`, Standard `0`) wirklich:** Ein `.pth`-Generator wird **immer** verwendet, unabhängig vom Index Ratio. Wenn eine `added_*.index`-FAISS-Datenbank geladen und `Index Ratio > 0` ist, sucht RVC die 8 nächstgelegenen Merkmalsvektoren im Index und mischt sie *vor* dem `.pth`-Generator mit den Merkmalen deiner Eingabe:
  `features = retrieved_features * index_rate + original_features * (1 - index_rate)`
  - **`Index Ratio = 0`** deaktiviert das FAISS-Retrieval (`original_features` allein), während der `.pth`-Generator aktiv bleibt, und liefert eine nützliche Diagnose-Basis ohne FAISS-Merkmalsabruf.
  - **Index ausgewählt vs. Retrieval angewendet:** Das Auswählen einer `.index`-Datei und `Index Ratio > 0` lässt **Output Log** `Voice index setting: enabled` melden; fehlt die Datei jedoch oder schlägt `faiss.read_index()` fehl, läuft das Backend ohne Retrieval weiter.
  - **Erhöhen von Index Ratio** zieht Merkmale näher an die gespeicherten Index-Vektoren. Ein passender Index kann manche Konvertierungen verbessern, andere aber auch verschlechtern (z. B. dumpfe Artikulation oder Dataset-Artefakte), je nach Audio und Modell. Kein Wert garantiert bessere Aussprache.
- **Formant Shifting (`apply_formant_shift`, `0.7–1.4`, Standard `1.0`):** Nutzt Praat/Parselmouth (`Change gender`) **vor** der RVC-Synthese auf dem `16 kHz`-Eingangssignal, um Vokaltrakt-Resonanzen zu verschieben. `1.0` ist neutral; Werte unter `1.0` zielen auf eine dunklere/tiefere Resonanz, Werte über `1.0` auf eine hellere. Der Algorithmus zielt darauf ab, Tonhöhe und Dauer zu bewahren, doch können Artefakte auftreten, besonders bei Extremwerten. **Formant Shifting** entspricht weder einer Änderung von **Pitch** noch **Post-Process → Pitch Shift** (das die Ausgangstonhöhe nach RVC verschiebt).

---

## D. Konsonanten und Atemgeräusche korrigieren

- **So funktioniert `Protect clear consonants and breathing sounds` (`0–0.5`, Standard `0.33`):**
  - In der Inferenz-Pipeline (`vc()`) speichert RVC bei `protect < 0.5` **und** aktiviertem Pitch-Guidance (`if_f0 == 1`) eine Kopie der ursprünglichen ungemischten Merkmale (`feats0`) *vor* dem FAISS-Retrieval.
  - Nach dem Retrieval werden stimmlose / Tiefton-Frames (`pitchf < 1`) zurück Richtung `feats0` gemischt: niedrigere Werte bewegen stimmlose Frames näher an `feats0`, während **`0.5` den Schutz deaktiviert**.
  - **Wichtige Einschränkung:** Da `Protect` zu `feats0` (den Merkmalen vor dem Retrieval) zurückmischt, **sind bei `Index Ratio = 0` `feats` und `feats0` identisch**, sodass eine Änderung von `Protect` kaum oder keinen Unterschied macht. Zudem ist `Protect` kein Denoiser oder Restaurationsfilter und kann keine bereits in Quelle oder Modell übersteuerten Konsonanten reparieren.

---

## E. Lautstärke, Rauschen und Verzerrung beheben

- **Volume Envelope (`0=Input source volume, 1=Normalized Output`, Standard `0.25`):** Nutzt `change_rms()`, um die RMS-Amplitudenhüllkurve des Quell-Audios (`1 - rate`) mit der RMS-Hüllkurve des RVC-Outputs (`rate`) zu mischen.
  - `0` lässt das konvertierte Audio eng der **RMS-Hüllkurve des Quell-Audios** folgen.
  - `1` behält die **eigene RMS-Hüllkurve des RVC-Generators**.
  - Hinweis: Trotz der UI-Bezeichnung normalisiert `1` **nicht** auf ein festes LUFS-Ziel und ist **weder** Kompressor noch Limiter. Das Anpassen von `Volume Envelope` ändert die dynamische Pegelanpassung, was bei Pumpen durch Pausen oder Pegelsprünge helfen kann.
- **Clean Audio & Clean Strength (`0–1`, Standard `0.5`):** Führt `noisereduce` **nach** der RVC-Konvertierung auf dem konvertierten Audio aus, wobei **Clean Strength** die Stärke steuert. Je nach Aufnahme und vorhandenem Rauschen kann eine zu aggressive Reduktion Konsonanten, Atemgeräusche und Stimmdetails verändern; es gibt keinen universell richtigen Schwellenwert. `Clean Audio` ist Nachbearbeitungs-Rauschreduktion, keine Audiorestauration: Es repariert kein Clipping und kein schlecht trainiertes Modell.
- **Post-Process Effects** *(nach der Konvertierung über FFmpeg/librosa angewendet; für Basis-Tests auf OFF lassen)*:
  - `Pitch Shift (-12..+12)`: Post-RVC-librosa-Pitch-Shift (verändert das fertige Audio statt der RVC-F0-Kontur).
  - `Limiter (-24..0 dBFS, Standard -6)` & `Gain (-24..+24 dB)`: In der aktuellen FFmpeg-Filterkette (`ilaria_inference_effects.py`) läuft **Limiter** **vor** **Gain**, wenn beide aktiviert sind. Da `Gain` nach `Limiter` greift, kann positives `Gain` Spitzen erneut ins Clipping treiben; `Limiter` garantiert bei nachfolgendem positivem `Gain` keinen clippingfreien Ausgang.
  - Kreative/Utility-Effekte: `Reverb`, `Distortion`, `Chorus`, `Bitcrush`, `Clipping`, `Compressor`, `Delay`.
- **Resampling (`0–48000`, `0=none`) & Export Format:** Lasse `0`, um die native Abtastrate des Modells (`32k`/`40k`/`48k`) zu behalten. Stelle `44100` oder `48000` nur ein, wenn deine DAW/dein Projekt eine bestimmte Rate verlangt (Resampling ändert die Abtastrate, nicht die zugrunde liegende Synthesequalität). Nutze `wav` oder `flac` für verlustfreie Exporte bei Qualitätsprüfungen.

---

## F. Lange Aufnahmen und Batch-Inferenz

- **Split Audio:** Ruft `silence_split_points()` auf, um frame-ausgerichtete Schnittpunkte in stillen Pausen einzufügen und gleichzeitig die normalen Lang-Audio-Schnitte (`opt_ts`) beizubehalten. Dies verändert die Segmentgrößen für die Synthese und kann das Verhalten an Übergängen beeinflussen. Es verhindert **nicht** zwingend das vollständige Laden des Audios in den Arbeitsspeicher, beseitigt **nicht** alle Ursachen für hohen Speicherverbrauch und behebt **weder** Lautstärke, Verzerrung noch Stimmqualität.
- **Single vs. Batch Inference:** Beide Tabs bieten dieselben Kernregler (`Pitch`, `Pitch Extraction`, `Index Ratio`, `Resampling`, `Volume Envelope`, `Protect`, `Export Format`, `Audio Processing`, `Embedder Settings` und `RMVPE High Register`). Nutze **Single Inference**, um Einstellungen an einer Datei mit direkter Wiedergabe abzustimmen; nutze **Batch Inference** (`InferOutput/` oder gewählten Ordner), sobald die Einstellungen stehen, um mehrere Dateien in einem Durchgang zu konvertieren.

---

## Diagnose-Matrix zur Fehlerbehebung

| Symptom | Mögliche Ursachen | Zuerst prüfen | Testweise anpassen | Erwartetes Ergebnis | Wenn es nicht hilft |
| --- | --- | --- | --- | --- | --- |
| **Stimme zu hoch / zu hell** | **Pitch** zu hoch, **Proposed Pitch**-Offset, hoher **Formant Ratio** oder Modell auf höherer Lage trainiert | Prüfe **Pitch**, **Proposed Pitch** und **Formant Shifting** | Setze **Pitch** auf `0` (oder senke bei Bedarf) und schalte **Proposed Pitch** & **Formant Shifting** OFF | F0 folgt der Quelle ohne Zusatzverschiebung nach oben | Trenne F0-Höhe von Resonanz: teste eine kleine Senkung von **Formant Ratio** unter `1.0` (optionales Beispiel: `0.9`) oder prüfe Modellgrenzen |
| **Stimme zu tief / dumpf** | **Pitch** zu tief, **Formant Ratio < 1.0** oder Modell-/Index-Fehlanpassung | Prüfe **Pitch**, **Formant Shifting** und **Index Ratio** | Setze **Pitch** auf `0` (oder hebe bei Bedarf) und schalte **Formant Shifting** OFF | Klarere Mitten-/Höhenpräsenz ohne Absenkung | Teste **Index Ratio = 0**, um die `.pth`-Klarheit zu isolieren, oder eine kleine Erhöhung von **Formant Ratio** über `1.0` (optionales Beispiel: `1.1`) |
| **Metallisches / sprödes Timbre** | Übermäßiger oder unpassender **Index Ratio**, **Clean Audio** oder **Autotune** | Prüfe aktive **Audio Processing**-Optionen und **Output Log** | Setze **Index Ratio = 0**, schalte **Clean Audio** & **Autotune** ab | Isoliert das reine `.pth`-Timbre | Teste einen anderen F0-Extraktor (`fcpe`, `swift`, `beatrice` oder `crepe`) |
| **Schwache Zielstimm-Identität** | Falsches `.pth`-Modell, Embedder-Inkompatibilität, fehlender/unpassender Index, Quell- oder Trainingsgrenzen | Prüfe **Voice Model**, **Embedder Model**, Quellqualität und Index-Status in Konsole/Log | Bestätige das richtige `.pth` und passende `added_*.index` (teste `Index Ratio > 0`, falls kompatibel) | Klareres Ziel-Timbre bei passendem Modell und Index | Prüfe `Model information` auf Embedder-Kompatibilität und teste mit einer saubereren trockenen Aufnahme |
| **Zu nah am Quellsprecher** | Modell-/Embedder-Fehlanpassung, Sprecher-Leakage in Quelle/Embedder oder großer Stimmumfangs-Abstand | Vergleiche Quelle mit erwartetem Embedder und Modell-Umfang | Setze **Embedder Model** auf `Auto (model default)` und teste eine kompatible `added_*.index`, falls vorhanden | Stärkere Trennung vom Quellsprecher | Passe **Pitch** nur an, wenn die Zieldarbietung es erfordert, oder teste ein anderes Modell |
| **Vernuschelte / zerstörte Konsonanten** | Übermäßiger/unpassender **Index Ratio**, **Protect** aus (`0.5`) oder unklare Quellaussprache | Prüfe **Index Ratio** und **Protect** (`0.5` = aus; Standard `0.33`) | Senke **Index Ratio** (oder teste `0`) und setze **Protect** unter `0.5` bei Index-Nutzung mit F0-Modell | Bewahrt stimmlose Quellmerkmale (`feats0`) beim Index-Blending besser | Prüfe die Artikulation der trockenen Quelle; `Protect` repariert keine bereits vernuschelten oder übersteuerten Konsonanten |
| **Scharfe Zischlaute (`s`/`sch`)** | Helles Quellmikrofon, hoher **Formant Ratio** oder **Post-Process**-Verzerrung | Höre das trockene Quell-Audio im Audio Analyzer an | Schalte **Formant Shifting** und **Post-Process** OFF; teste **Index Ratio = 0** | Weichere `s`/`sch`-Transienten | De-Esse die trockene Quellaufnahme vor RVC |
| **Verzerrte oder fehlende Atemgeräusche** | Gate/Rauschen in der Quelle, Modellgrenzen, **Volume Envelope** oder **Clean Audio** nach Konvertierung | Vergleiche Quell-Atemgeräusche mit der Ausgabe | Schalte **Clean Audio** OFF und teste **Volume Envelope** (z. B. `0` vs. `0.25` Standard) | Atemgeräusche folgen der Quelldynamik genauer | Senke **Index Ratio** (oder `0`), falls das Retrieval verrauschte Frames zieht |
| **Oktavsprünge auf gehaltenen Tönen** | F0-Tracker verwechselt Obertöne oder sehr hohe Töne | Prüfe Wellenform/F0 im **Audio Analyzer** | Wechsle zwischen **RMVPE** / **FCPE** / **Swift** / **CREPE** oder teste **RMVPE High Register** | Stabileres F0-Tracking auf gehaltenen Tönen | Prüfe den Quell-Stem auf Übersprechen von Instrumenten oder Harmonien |
| **Unnatürliches Vibrato / flache Slides** | **Autotune** bei ausdrucksstarkem Gesang aktiviert | Prüfe **Audio Processing → Autotune** | Schalte **Autotune** OFF oder senke **Autotune Strength** (optionales Beispiel: `0.3`) | Natürliches Vibrato und Slides kehren zurück | Vergleiche die F0-Glätte von **RMVPE** vs. **CREPE** |
| **Instabile / eiernde Tonhöhe** | Verrauschte/hallige Quelle oder `parselmouth`/`harvest`-F0-Tracking | Höre den isolierten Quell-Stem an | Trenne/entrausche/enthalle die Quelle vor RVC und nutze **RMVPE** | Ruhigere F0-Kontur | Erhöhe `filter_radius` (`>= 3`), falls gezielt `harvest` genutzt wird |
| **Robotische / Vocoder-artige Stimme** | Falscher **Embedder**, `v1`/`v2`-Konflikt (kann auch zu einem Konvertierungsfehler führen) oder starke F0-Fehler | Prüfe **Output Log** und Konsole auf Embedder-/F0-Hinweise | Setze **Embedder Model** auf `Auto (model default)` und prüfe **RMVPE** | Natürliche Stimmsynthese | Teste mit einer saubereren, trockenen Quellaufnahme |
| **Hintergrundrauschen / Denoising-Artefakte** | **Clean Audio** zu stark oder verrauschte Quellaufnahme | Vergleiche mit **Clean Audio** OFF | Schalte **Clean Audio** OFF oder reduziere **Clean Strength** | Weniger wässrige Denoising-Artefakte | Wende gezieltes Denoising/Dereverberation *vor* RVC an |
| **Clipping / harte Verzerrung** | Clipping bereits in Quelle, Inferenz-Clipping, positives **Gain** (auch nach **Limiter**), **Distortion/Clipping**-FX oder Export-Clipping | Prüfe, wo die Verzerrung zuerst auftritt (Quelle vs. Ausgabe im **Audio Analyzer**) | Schalte **Post-Process** OFF (besonders positives **Gain** nach **Limiter**) | Stoppt Post-RVC-Clipping | Lautstärke-Absenkung bei bereits geclipptem Audio stellt fehlende Samples **nicht** wieder her; neu aufnehmen oder saubere Quelle nutzen |
| **Ungleichmäßige / pumpende Lautstärke** | **Volume Envelope** passt nicht zur Quelldynamik | Vergleiche **Volume Envelope** `0` vs. `0.25` (Standard) vs. `1.0` | Passe **Volume Envelope** Richtung `0` (Quell-RMS) oder `1.0` (Modell-RMS) an | Gleichmäßigere Phrasenlautheit | Nutze sanften **Compressor** / **Limiter** (ohne positives **Gain** danach) nur bei Bedarf |
| **Resampling- / Export- / Batch-Fehler** | Ungültige `Resampling`-Rate, fehlendes FFmpeg (für `mp3`/`ogg`/`m4a`) oder ungültiger Ordnerpfad | Lies die genaue Meldung in **Output Log** und Konsole | Setze `Resampling = 0`, exportiere `wav` oder `flac`, nutze einfache ASCII-Pfade | Sauberer verlustfreier Export | Starte `RUN_ILARIA_RVC_LOGS.bat` für den vollständigen Traceback |

## Weiterführende Anleitungen

- [Einzel- und Batch-Inferenz](../ilaria-rvc/convert/inference.md) · [Inferenz-Steuerung](../ilaria-rvc/convert/inference-buttons.md) · [Erweiterte Inferenz](../ilaria-rvc/convert/advanced-inference.md)
- [Index-Dateien (.index)](../start/indexes.md) · [Pitch Extractors](../start/pitch-extractors.md) · [Embedders](../start/embedders.md) · [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md)
