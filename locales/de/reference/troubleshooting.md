---
label: "🩺 Fehlerbehebung"
order: 95
permalink: /troubleshooting/
---
# Fehlerbehebung bei RVC

[Ilaria RVC 2.4.0 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
Neu bei RVC? **Beginne mit einer 10 Sekunden langen WAV-Datei und einem Modell.** Wenn die App scheitert, suche im Protokoll den ersten Fehler. Klingt die Stimme falsch, höre denselben Ausschnitt und ändere pro Versuch eine Einstellung. Ein Checkpoint speichert das Modell oder den Trainingsstand.
!!!

Eine nützliche Diagnose beginnt in der ersten Phase, die fehlschlägt. Behalten Sie die App-Version, den ersten Fehler und einen reproduzierbaren Test bei. Nehmen Sie jeweils eine Änderung vor und vergleichen Sie sie mit derselben Datei oder gesprochenen Phrase.

## Finden Sie Ihr Symptom

| Symptom | Erster Test |
| --- | --- |
| Launcher wird beendet oder Browser zeigt einen Verbindungsfehler an | Lassen Sie die Konsole geöffnet und überprüfen Sie die von dieser Instanz gedruckte lokale Adresse. |
| Das Modell fehlt, lässt sich nicht laden oder meldet einen fehlenden Schlüssel. | Bestätigen Sie, dass es sich bei der Datei um einen Inferenzexport handelt, und überprüfen Sie deren Architektur und Einbettung. |
| Der Konverter kann die Datei nicht lesen. | Versuchen Sie es mit einem kurzen PCM WAV von einem einfachen lokalen Pfad. |
| Die Konvertierung funktioniert ohne Index. | Überprüfen Sie, ob der Index zum ausgewählten Modell und seiner Funktionsdarstellung gehört. |
| Die Stimme klingt metallisch, undeutlich oder ähnelt zu sehr der Eingabe. | Vergleichen Sie mehrere saubere Clips und einen nachweislich funktionierenden Prüfpunkt mit deaktivierten Effekten und Abruf. |
| Das Training stoppt, bleibt stehen oder erzeugt keinen brauchbaren Export. | Identifizieren Sie die fehlerhafte Phase und überprüfen Sie das Protokoll und die Artefakte für dieses Experiment. |
| CUDA schlägt fehl oder der Computer hat nicht mehr genügend Arbeitsspeicher. | Unterscheiden Sie nicht unterstützte Hardware oder Laufzeit, GPU-Speichererschöpfung und System-RAM-Druck. |
| Das Mikrofon weist Verzögerungen, Lücken, Stille oder Echo auf. | Testen Sie den physischen Eingang, den konvertierten Monitor, das virtuelle Kabel und das Ziel separat. |

## Legen Sie eine Grundlinie fest.

1. Nehmen Sie 10–20 Sekunden eines Sprechers mit klaren Vokalen, einer `s` oder `f` und einer natürlichen Pause auf. Verwenden Sie eine lokale WAV-Datei mit mittlerer Lautstärke, ohne Musik oder Effekte.
2. Wählen Sie ein vertrauenswürdiges Inferenzmodell aus, das mit der App kompatibel ist. Notieren Sie den Namen, den Embedder und den Lautsprechersteckplatz. Beginnen Sie bei der Transposition Null mit dem Standard-Tonhöhenextraktor, der optionalen Verarbeitung aus und dem Abruf bei Null.
3. Konvertieren und in einem beschreibbaren lokalen Ordner speichern. Spielen Sie die Datei in einem zweiten Player ab, wenn die Browservorschau stumm ist. Vergleichen Sie denselben Satz mit ähnlicher Lautstärke.
4. Wiederholen Sie den Vorgang mit einem nachweislich funktionierenden Modell unter Verwendung eines eigenen kompatiblen Encoders. Wenn beide Modelle bei derselben Eingabe ausfallen, sehen Sie sich die gemeinsame Dekodierung, Laufzeit oder Einstellungen an. Wenn nur eines dauerhaft ausfällt, überprüfen Sie dieses Modell, seine Konfiguration und die Trainingsdaten, falls verfügbar.
5. Aktivieren Sie eine Option pro Test erneut. Speichern Sie jedes Ergebnis mit den Einstellungen im Dateinamen oder in den Notizen, damit Sie zu einer bekannten Arbeitskombination zurückkehren können.

## Die App startet nicht

### Das Fenster wird geschlossen oder das Setup wird nie abgeschlossen

- **Ilaria RVC:** Extrahieren Sie das vollständige Paket, öffnen Sie seinen Ordner und führen Sie `RUN_ILARIA_RVC_LOGS.bat` aus. Suchen Sie über der letzten Meldung zum Herunterfahren nach der ersten nützlichen Ausnahme. Überprüfen Sie, ob Windows die unterstützte NVIDIA-GPU erkennt und ob die gebündelte Umgebung und die Assets noch vorhanden sind.
- **Applio Desktop:** Öffnen Sie Setup und überprüfen Sie den Engine-Status. Reparieren Sie die Installation über die Desktop-Setup-Steuerelemente, wenn eine Laufzeit- oder Paketprüfung fehlschlägt. Führen Sie für Gradio den Launcher über den vorgesehenen Checkout aus und überprüfen Sie, welcher Interpreter aktiv ist.
- **RVC WebUI (Mainline - Original RVC):** Passen Sie den Launcher und die Laufzeit an das spezifische Archiv oder den Quell-Checkout an. Ein älteres Archiv kann einen CUDA-Build enthalten, der keine Kernel für eine neuere GPU ausführen kann. Durch die globale Installation eines nicht verwandten Python-Pakets wird ein gebündelter Interpreter nicht repariert.
- **Windows-DLL-Fehler:** Überprüfen Sie bei `llvmlite.dll` oder einer fehlenden Visual C++-Abhängigkeit, ob die Laufzeitarchitektur mit der App übereinstimmt, und installieren oder reparieren Sie das offizielle Microsoft Visual C++ Redistributable für diese Architektur. Wenn die DLL selbst nicht vorhanden ist, stellen Sie sie über das Originalpaket oder das Originalinstallationsprogramm wieder her.
- **Ressourcenfehler nach einem Update:** Überprüfen Sie, ob die Installation beschreibbar ist, die erforderlichen Asset-Dateien vorhanden sind und die Desktop-Verknüpfung auf den aktualisierten Ordner verweist. Sichern Sie Ihre Modelle, Datensätze und Protokolle, bevor Sie eine Installation ersetzen.

### Die lokale Seite ist leer, nicht verbunden oder zeigt einen JSON-Fehler an.

Lassen Sie den Prozess laufen und öffnen Sie die genaue Loopback-Adresse, die in der Konsole gedruckt ist. Ilaria RVC verwendet normalerweise `127.0.0.1:6969`. Wenn der Port bereits verwendet wird, prüfen Sie, ob die App bereits ausgeführt wird, und verwenden Sie deren Adresse. Speichern Sie aktive Arbeit, bevor Sie eine Instanz stoppen.

Ein Browserfehler wie `Expecting value: line 1 column 1` kann auftreten, wenn eine API-Anfrage eine leere Antwort oder eine HTML-Fehlerseite erhält. Überprüfen Sie die Serverkonsole zum gleichen Zeitstempel. Wenn ein konfigurierter Proxy lokalen Datenverkehr abfängt, überprüfen Sie die Loopback-Umgehung oder testen Sie ein Browserprofil ohne die störende Erweiterung. Halten Sie den Dienst während der Diagnose lokal.

Beginnen Sie bei der Verwendung über die Befehlszeile mit dem Einstiegspunkt und der Argumenthilfe für Ihre genaue Version. Bei einem erfolgreichen kurzen WebUI-Lauf erhalten Sie passende Einstellungen und in Builds, die diese protokollieren, die Vorverarbeitungs- und Trainingsbefehle. Ältere Skripte können eine andere Argumentreihenfolge oder ein anderes Verzeichnislayout erwarten.

## Eingabe- und Ausgabedateien

### FFmpeg-, Unicode- und Dateilistenfehler

1. Bestätigen Sie, dass die Datei in einem normalen Player geöffnet wird. Exportieren Sie eine neue kurze PCM-WAV-Datei, wenn der Container oder Codec unsicher ist.
2. Kopieren Sie es in einen einfachen lokalen Pfad wie `C:\RVC\input\test.wav`. Dies isoliert Zitat-, Unicode-, Remote-Synchronisierungs- und Berechtigungsprobleme, die in älteren Builds häufig vorkommen. Bewahren Sie die Originalaufnahmen auf.
3. Stellen Sie sicher, dass die App ihr gebündeltes FFmpeg sehen kann. Für Quellinstallationen ist möglicherweise eine separate ausführbare Datei erforderlich, die für denselben Prozess verfügbar ist, der die App startet. Wenn die nachweislich funktionierende WAV-Datei funktioniert, vergleichen Sie den ursprünglichen Pfad und Codec, bevor Sie die Umgebung neu installieren.
4. Bestätigen Sie für das Training, dass der ausgewählte Ordner tatsächliche Audiodaten enthält. Wenn Sie die Pfade nach der Vorverarbeitung ändern, erstellen Sie die Dateiliste und die abhängigen Funktionen in einem neuen Experiment oder über den Vorbereitungsworkflow der App neu.

### Ein Ergebnis erscheint, kann aber nicht abgespielt oder gespeichert werden

Überprüfen Sie den Ausgabeordner und den freien Speicherplatz. Exportieren Sie WAV und überprüfen Sie die Dateidauer und -größe. Spielen Sie das Ergebnis außerhalb des Browsers ab, um Wiedergabe- und Konvertierungsprobleme zu trennen. Überprüfen Sie im Batch-Modus das erste fehlerhafte Element und den Ausgabepfad und führen Sie dann dieses Element einzeln aus. Bewahren Sie Originale und generierte Ergebnisse in verschiedenen Ordnern auf.

## Modelle, Prüfpunkte und Indizes

### Ein Modell wird nicht angezeigt.

Stellen Sie sicher, dass im Archiv eine tatsächliche Inferenz `.pth` vorhanden ist. Legen Sie es in der Bibliothek ab, die von der aktuellen App verwendet wird, oder verwenden Sie deren Importsteuerung und warten Sie, bis die Installation abgeschlossen ist. Aktualisieren Sie die Stimmenliste und überprüfen Sie die Auswahl erneut. In Ilaria RVC befindet sich die Modellbibliothek unter `models/`. Hauptarchive und aktuelle Quellen können unterschiedliche Verzeichnislayouts verwenden. Siehe [RVC-Modelle und -Dateien](../start/models.md) für Dateirollen.

### Das Laden schlägt aufgrund fehlender Schlüssel oder inkompatibler Formen fehl

Eine `G_*.pth` oder `D_*.pth` aus einem Experiment dient normalerweise als Trainings-Lebenslauf. Verwenden Sie die Export- oder Checkpoint-Extraktionsfunktion der App, um ein Inferenzmodell zu erstellen. Fehlende F0- oder Sampleraten-Metadaten können auch auf ein falsches Format oder eine unvollständige Datei hinweisen. Überprüfen Sie die RVC-Version, den Vocoder, die Samplerate, die Tonhöhenführung und den Embedder. Bewahren Sie die Originale auf und exportieren Sie sie unter einem anderen Namen. Eine passende Dateinamenerweiterung allein kann keine Kompatibilität herstellen.

### Der Index fehlt oder verursacht einen Fehler.

1. Konvertieren mit Abruf bei Null, Auswahl ohne Index, wenn die App dies zulässt. Bestätigen Sie, dass das Modell selbstständig eine verständliche Ausgabe erzeugen kann.
2. Wählen Sie den Index aus demselben Experiment und derselben Funktionskonfiguration wie das Modell aus. Versuchen Sie es mit einem bescheidenen Abrufwert erneut und vergleichen Sie dieselbe Phrase. Eine inkompatible Dimension oder ein nicht lesbarer Index ist ein Grund, das Paar vor der Optimierung erneut zu überprüfen.
3. Wenn das Training abgeschlossen ist, aber kein Index vorhanden ist, prüfen Sie die Indexstufe separat. Bestätigen Sie, dass die Feature-Extraktion erfolgreich war. Führen Sie die Indexgenerierung nur dann erneut aus, wenn die ursprünglichen kompatiblen Funktionen intakt sind. Ein sehr großer Funktionsumfang kann während der Indexassemblierung System-RAM verbrauchen.
4. Behalten Sie den Inferenzexport bei, auch wenn die Indexerstellung fehlschlägt. Halten Sie zum Teilen oder Sichern den funktionierenden Prüfpunkt und seinen optionalen passenden Index zusammen.

## Klangqualität und Modellbeschränkungen

| Was Sie hören | Diagnosetest und Interpretation |
| --- | --- |
| Metallisches Atmen oder verzerrte Zischlaute | Vergleichen Sie einige saubere Quellen mit ausgeschalteten Effekten und Abruffunktionen. Vergleichen Sie den Schutz separat. Wenn dasselbe Modell diese Töne über saubere Clips hinweg ständig verzerrt, überprüfen Sie die Trainingsbeispiele auf Clipping, Rauschunterdrückung oder schlechte Abdeckung, korrigieren Sie den Datensatz und trainieren Sie erneut. |
| Die konvertierte Stimme behält die ursprüngliche Klangfarbe | Überprüfen Sie, ob das Modell und der Schulungseinbetter übereinstimmen. Generische HuBERT-Funktionen können Sprecherhinweise beibehalten. Vergleichen Sie ohne Abruf, dann mit dem richtigen Index. Eine anhaltende Einschränkung des trainierten Modells kann eine erneute Schulung erforderlich machen. |
| Wörter werden nur in einer Sprache unterbrochen. | Testen Sie vorgehaltene Phrasen, die die betroffenen Laute enthalten, mit mehreren sauberen Aufnahmen. Mehrsprachige Aufnahmen allein können nicht garantieren, dass ContentVec die Unterscheidungen beibehält. Notieren Sie die beobachtete Sprachbeschränkung, anstatt zu versprechen, dass eine andere Trainingseinstellung sie beheben wird. |
| Tonhöhensprünge oder Änderung der Oktave | Hören Sie sich die Originalphrase an, testen Sie die Nulltransposition und vergleichen Sie die unterstützten F0-Extraktoren separat. Überprüfen Sie beim Singen die freigelegten hohen und tiefen Töne. |
| Metallische Geräusche um Musik oder Hintergrundstimmen | Vergleichen Sie eine isolierte trockene Stimme. Achten Sie auf Trennungsartefakte, bevor Sie einen isolierten Stamm als Trainingsdaten verwenden. |
| Der Ton ist flach, zu leise oder überschneidet sich. | Vergleichen Sie Quelle und Ausgabe bei ähnlichen Wiedergabepegeln. Deaktivieren Sie die Gain- und Limiter-Effekte für den Test und stellen Sie sicher, dass die Quelle und der endgültige Export Spielraum haben. |

Verwenden Sie den [Audioqualitätsleitfaden](../conversion/audio-quality.md) für kontrollierte Hörtests und [Datensatzvorbereitung](../model-training/dataset-preparation.md), wenn der Fehler dem Modell über alle Eingaben hinweg folgt.

## GPU und Systemspeicher

- **CUDA nicht verfügbarer oder nicht unterstützter Kernel:** Bestätigen Sie die genaue GPU, den Treiber und die Laufzeit, die die App ausgewählt hat. Desktop-, gebündelte und Quellinstallationen können unterschiedliche Geräte sehen. Stellen Sie sicher, dass das vorgesehene Backend den Vorgang unterstützt, einschließlich Schulung, falls erforderlich.
- **CUDA nicht genügend Speicher während der Inferenz:** Beginnen Sie mit einem kurzen Clip. Schließen Sie konkurrierende GPU-Jobs, entladen Sie nicht verwendete Modelle und deaktivieren Sie die optionale Verarbeitung. Versuchen Sie bei langen Eingaben die Audio-Aufteilungssteuerung der App oder teilen Sie das Audio in Segmente auf und überprüfen Sie anschließend die Verbindungen.
- **CUDA-Speichermangel während des Trainings:** Reduzieren Sie die Stapelgröße, deaktivieren Sie das Caching von Datensätzen im VRAM und versuchen Sie kompatible gemischte Präzision nur, wenn dies von Ihrem Build unterstützt wird. Halten Sie einen wiederaufnehmbaren Kontrollpunkt bereit. Eine kleinere Charge ändert die Anzahl der Aktualisierungen pro Epoche.
- **System-RAM geht zur Neige oder Vorverarbeitungs-Worker sterben:** Verwenden Sie weniger CPU-Worker, prüfen Sie, ob auf der Festplatte Platz für Zwischendateien vorhanden ist, und überprüfen Sie ungewöhnlich lange oder unterbrochene Aufzeichnungen. Teilen Sie nur an natürlichen Grenzen auf und generieren Sie die betroffenen vorbereiteten Daten neu. Beobachten Sie während der Indexgenerierung den System-RAM unabhängig vom VRAM.
- **Mehrere GPUs:** Bestätigen Sie den Geräteindex mit der Geräteliste der App. Ein Index kann auf eine andere GPU verweisen, wenn sich die Gerätesichtbarkeit ändert. Überprüfen Sie das ausgewählte Gerät im Protokoll, bevor Sie die Leistung vergleichen.

## Training, Wiederaufnahme und Exporte

### Diagnostizieren Sie die Phase, bevor Sie sie erneut ausführen.

| Phase | Überprüfen Sie, bevor Sie fortfahren. |
| --- | --- |
| Datensatzimport. | Bestätigen Sie den Zielordner und warten Sie auf die Extraktion. Überprüfen Sie den freien Speicherplatz und probieren Sie einige importierte Dateien aus. |
| Vorverarbeitung | Bestätigen Sie verwendbare, nicht leere Clips und einen beschreibbaren Experimentordner. Ein Tensor der Größe Null kann aus einem leeren, extrem kurzen oder ausgefallenen Slice stammen. Hören Sie zu und ersetzen oder kürzen Sie die fehlerhafte Quelle und generieren Sie dann die vorbereiteten Daten neu. |
| Merkmalsextraktion | Bestätigen Sie, dass das erzeugte Audio vorverarbeitet wurde und die ausgewählten Embedder- und Pitch-Assets vorhanden sind. Der Wechsel von Encodern erfordert eine kompatible Konfiguration und neue Funktionen. |
| Ausbildung | Überprüfen Sie übereinstimmende G/D-Pretrains und die Übereinstimmung zwischen Abtastrate, Tonhöhenführung, Vocoder, Architektur und gespeicherten Funktionen. Eine Nichtübereinstimmung der Tensorgröße nach einer Änderung der Raten ist ein Grund, ein separates Experiment mit kompatiblen Einstellungen zu starten. |
| Exportieren und indizieren | Exportieren Sie einen Inferenzkontrollpunkt, aktualisieren Sie die Stimmenliste, testen Sie ohne Abruf und erstellen Sie den Index aus den Funktionen dieses Experiments. |

### Fahren Sie sicher fort oder fahren Sie mit weiteren Aufnahmen fort

Warten Sie, bis die App den Speichervorgang abgeschlossen hat, bevor Sie sie schließen. Behalten Sie die G- und D-Kontrollpunkte, die Experimentkonfiguration und ihren Trainingszustand bei. Um das unveränderte Training fortzusetzen, wählen Sie dasselbe Experiment aus und überprüfen Sie den wiederhergestellten Schritt oder die wiederhergestellte Epoche im Protokoll. Behandeln Sie einen geänderten Datensatz als separates Experiment: Verarbeiten Sie den kombinierten Datensatz vor, generieren Sie Features neu und verwenden Sie die von Ihrer App unterstützte Fortsetzungsmethode mit kompatiblen Gewichtungen. Behalten Sie das ursprüngliche Experiment bei, um einen Vergleich oder ein Rollback zu ermöglichen.

Die Dauer des Datensatzes und die Anzahl der Epochen hängen von der Sprachabdeckung und Sauberkeit ab. Speichern Sie mehrere Kontrollpunkte und hören Sie sich dieselben angehaltenen Clips an. Eine bessere Verlustkurve führt nicht zu einer besseren Aussprache. Wenn ein Modell aufgrund sauberer, nicht sichtbarer Beispiele schlechter wird, vergleichen Sie einen früheren Export, bevor Sie den Lauf verlängern.

## Live-Mikrofon, virtuelles Kabel und Anrufe

1. Überprüfen Sie das rohe physische Mikrofon im Betriebssystem. Bestätigen Sie Berechtigung und Eingabeebene. Trennen Sie während des Tests zusätzliche Mikrofonquellen.
2. Testen Sie den Konverter lokal über Kopfhörer. Behalten Sie das unterstützte Standard-Audio-Backend und den Puffer der App bei. Wenn der Konverter über eine Eingangsanzeige, aber keinen Ausgang verfügt, überprüfen Sie die geladene Stimme und den Konvertierungsstatus, bevor Sie die Ziel-App ändern.
3. Leiten Sie den Konverterausgang zum Wiedergabeende des virtuellen Kabels. Wählen Sie in Discord, OBS oder der Aufnahme-App den entsprechenden Aufnahmeendpunkt aus. Behalten Sie die Anrufwiedergabe über Kopfhörer bei. Machen Sie eine private Testaufnahme, um zu überprüfen, ob das Signal tatsächlich andere erreicht.
4. Wenn Lücken vorhanden sind, testen Sie den Test erneut mit einer größeren Blockgröße und anderen gestoppten GPU-Arbeitslasten. Treten Lücken erst während eines Spiels auf, wiederholen Sie den Test unter dieser Belastung. Überprüfen Sie, ob die Audioformateinstellungen zwischen den Geräten widersprüchlich sind.
5. Wenn die Sprache am Anfang oder am Ende abgeschnitten ist, testen Sie sie ohne automatische Erkennung, Rauschunterdrückung oder Gates nacheinander. Wenn Sie ein Echo hören, prüfen Sie, ob eine doppelte Überwachung oder eine Schleife zum physischen Mikrofon vorhanden ist. Behalten Sie die letzte stabile Voreinstellung bei, bevor Sie die Verzögerung verringern.

Für Gerätenamen und App-spezifische Steuerelemente verwenden Sie die [Schritt-für-Schritt-App-Anleitungen](../other-rvcs/app-guides.md) und die [Live-Routing-Anleitung](../conversion/real-time.md)].

## Weitere Probleme, die Sie lösen können

### Lesen Sie die Nachricht, bevor Sie etwas ändern.

Suchen Sie nach dem ersten Fehler in der Konsole oder im Jobprotokoll. Die letzte Meldung besagt möglicherweise nur, dass der Job gestoppt wurde. Kopieren Sie die Zeile, die eine Datei, ein Gerät oder eine Einstellung benennt. Führen Sie nach Ihrer ersten Änderung einen kurzen Test durch. Wenn es funktioniert, notieren Sie, was Sie geändert haben.

| Meldung oder Symptom | Erstes zu tun | Wenn es immer noch fehlschlägt |
| --- | --- | --- |
| Berechtigung verweigert | Speichern Sie einen kurzen Test in einem Ordner, der Ihnen gehört. | Überprüfen Sie, ob die ausgewählte Datei an anderer Stelle geöffnet ist oder der Ausgabeordner von einer anderen App verwaltet wird. |
| Datei nicht gefunden | Öffnen Sie den im Fehler angezeigten Pfad und bestätigen Sie, dass die Datei vorhanden ist. | Wählen Sie die Datei in RVC erneut aus. Wenn Sie den Datensatz verschoben haben, erstellen Sie seine vorbereiteten Dateien und Funktionen neu. |
| Festplatte voll | Überprüfen Sie das von der App verwendete Laufwerk, einschließlich temporärer Dateien. | Verschieben Sie abgeschlossene Backups auf ein anderes Laufwerk und wählen Sie ein beschreibbares Ziel mit Platz für Zwischendateien. |
| Modul nicht gefunden | Überprüfen Sie, welchen Launcher und welche Umgebung Sie geöffnet haben. | Reparieren Sie die Umgebung dieser App. Behalten Sie für jede Quellinstallation eine separate Umgebung bei. |
| NaN-Verlust oder Ausgänge sind stumm | Stoppen Sie den Lauf und behalten Sie den letzten funktionierenden Prüfpunkt bei. | Suchen Sie nach fehlerhaftem Audio, inkompatiblen Gewichten und Präzisionsproblemen. Wenn dies unterstützt wird, vergleichen Sie einen kurzen FP32-Lauf in einem separaten Experiment. |

### Die Stimme klingt falsch, obwohl der Job erfolgreich war.

#### Nur ein Stimmmodell verhält sich schlecht.

Testen Sie eine bekanntermaßen gute Stimme mit ihren eigenen passenden Encoder- und Indexeinstellungen. Testen Sie dann das fehlerhafte Modell mit deaktiviertem Abruf und deaktivierten Effekten. Wenn die erste Stimme funktioniert und die andere wiederholt denselben Fehler macht, überprüfen Sie den Encoder, den Lautsprechersteckplatz und die Trainingsdaten des fehlerhaften Modells. Behalten Sie die saubere Eingabe als Beweis für einen Vergleich nach dem erneuten Training.

#### Ein Teil einer langen Datei fehlt

Spielen Sie die Ein- und Ausgabe nebeneinander in der Nähe des fehlenden Abschnitts ab. Testen Sie diesen Abschnitt alleine. Wenn der kurze Clip erfolgreich ist, überprüfen Sie die Speicherauslastung, die Stilleaufteilung, die automatischen Gates und den Ausgabeordner. Verknüpfen Sie fertige Segmente in einem Editor und hören Sie sich vor dem Exportieren alle Grenzen an.

#### Nur eine Datei in einem Stapel schlägt fehl.

Konvertieren Sie diese Datei einzeln. Wenn es nicht geöffnet werden kann, erstellen Sie eine neue WAV-Datei aus dem Original. Überprüfen Sie bei der Konvertierung, ob der Stapel unterbrochen wurde oder ob zwei Dateien einen gemeinsamen Ausgabenamen haben. Führen Sie die fehlgeschlagenen Dateien in einem neuen Zielordner erneut aus, um frühere Ergebnisse zu schützen.

### Das Training scheint festzustecken

1. Suchen Sie nach dem neuesten Zeitstempel und der aktuellen Phase. Das Vorbereiten eines Datensatzes, das Extrahieren von Features und das Erstellen eines Index können sehr unterschiedlich schnell sein.
2. Prüfen Sie, ob die CPU, GPU oder Festplatte noch aktiv ist und ob Dateien geschrieben werden. Aktualisieren Sie das Protokoll oder Dashboard, wenn die Fortschrittsanzeige veraltet ist.
3. Wenn die Aktivität stoppt und das Protokoll einen Fehler enthält, diagnostizieren Sie diesen Fehler. Wenn Sie einen laufenden Trainingsjob stoppen müssen, verwenden Sie dessen Steuerung zum Speichern und Stoppen und warten Sie auf die Bestätigung, sofern verfügbar.
4. Bevor Sie es erneut versuchen, notieren Sie sich den Namen des Experiments und die letzte bestätigte Phase. Vervollständigte Dateien nur dann wiederverwenden, wenn der Datensatz und die Einstellungen noch übereinstimmen.

### Live-Audio funktioniert auf dem Monitor, schlägt jedoch bei einem Anruf fehl.

- **Andere Personen hören Ihre normale Stimme:** Wählen Sie in der Anruf-App die Aufnahmeseite des virtuellen Kabels aus und schalten Sie alle zweiten Mikrofonquellen aus.
- **Sie hören die umgewandelte Stimme zweimal:** Verwenden Sie einen einzelnen Monitor. Deaktivieren Sie während des Vergleichs entweder die Windows-Überwachung oder den Monitor der App.
- **Der Anruf wird nur unterbrochen, wenn Sie leise sprechen:** Vergleichen Sie die Eingabeempfindlichkeit und die Geräuschunterdrückung der App nacheinander. Zeichnen Sie die Anrufeingabe auf, um zu hören, was tatsächlich ankommt.
- **Das Gerät ist nach dem Anschließen der Kopfhörer verschwunden:** Konvertierung stoppen, das physische Mikrofon und die Kopfhörer erneut auswählen und dann den Audiostream neu starten.

Wenn ein Schritt das Problem behebt, wiederholen Sie den ursprünglichen Test einmal, während Ihre üblichen Apps geöffnet sind. Behalten Sie dieses funktionierende Setup als Referenz.

## Text in Sprache umwandeln und ein Problem melden

Vorschau der generierten Sprache vor der Konvertierung. Wenn das ursprüngliche TTS falsch klingt, überprüfen Sie seine Sprache, Stimme und Schrift. Überprüfen Sie bei Edge TTS, ob diese Online-Stimme erreichbar ist. Überprüfen Sie bei installierter Windows-Stimme, ob sie in der unterstützten Liste der App angezeigt wird. Wenn nur die konvertierte Version falsch klingt, verwenden Sie die obige Basislinie für die Dateikonvertierung.

Wenn Sie um Hilfe bitten, geben Sie die App und Edition, Version, Betriebssystem, GPU und Backend, die genaue Aktion, den ersten Fehler mit nahegelegenen Protokollzeilen und die kürzeste sichere Reproduktion an. Geben Sie für die Schulung die fehlgeschlagene Phase, die Abtastrate, die Architektur und den Einbetter an und geben Sie an, ob es sich um einen neuen Lauf oder einen Lebenslauf handelte. Listen Sie bei Live-Problemen die Geräte in der Signalreihenfolge auf. Entfernen Sie Kontokennungen, private Pfade und vertrauliche Aufzeichnungen, bevor Sie Protokolle freigeben. Nutzen Sie die [Kontaktseite](https://ilariarvc.shop/en/contact/) für Ilaria RVC-Unterstützung.
