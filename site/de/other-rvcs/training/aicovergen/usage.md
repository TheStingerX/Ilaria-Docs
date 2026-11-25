# AICoverGen · Nutzung und Fehlerbehebung

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Veraltete Software · Nicht empfohlen
**AICoverGen** ist eine ältere RVC-v2-Pipeline für Song-Cover, die nicht mehr aktiv gepflegt wird und auf Abhängigkeiten aus der Zeit von Python 3.9+ basiert. Wähle für eine Neuinstallation eine aktiv gepflegte Anwendung. [Anleitungen nach Anwendung](../../app-guides.md)
!!!

## RVC-v2-Stimmmodelle hinzufügen

AICoverGen lädt nur exportierte **RVC-v2**-Inferenzmodelle (`rvc_models/`):

- **Download model:** Füge eine direkte Archiv-URL mit der `.pth`-Datei (und optionaler `.index`-Datei) ein, um das Modell automatisch herunterzuladen und zu entpacken.
- **Upload model:** Lade lokale `.pth`- und optionale `.index`-Dateien direkt über die WebUI hoch oder lege jeden Stimmordner in `rvc_models/` ab.

## Cover in der WebUI erzeugen

Öffne den Tab **Generate**, füge eine YouTube-URL ein oder lade eine lokale Audiodatei hoch, wähle das Stimmmodell und passe die wichtigsten Einstellungen an:

- **Pitch Change:** Verschiebe die Tonhöhe passend zum Stimmumfang der Zielstimme (z. B. `+1` Oktave / `+12` Halbtöne von männlich zu weiblich oder `-1` / `-12` von weiblich zu männlich).
- **Pitch-Extraktion:** Nutze **`rmvpe`** als empfohlenen Standard für sauberes Tracking oder **`mangio-crepe`** mit einstellbarer Hop Length für weichere Übergänge.
- **Index Rate:** Steuert, wie stark die `.index`-Datei Klangfarbe und Aussprache beeinflusst. Verringere den Wert, wenn Körnung oder Artefakte entstehen.
- **Audiomischung & Effekte:** Passe die Lautstärke für **Main Vocals**, **Backup Vocals** und **Instrumentals** an, stelle den integrierten **Reverb** (Room Size, Wetness, Dryness, Damping) ein und wähle das Ausgabeformat (**`mp3`** oder **`wav`**).

## CLI-Modus (`src/main.py`)

Die gesamte Pipeline lässt sich auch ohne WebUI über `src/main.py` ausführen:

~~~bash
python src/main.py -i "https://www.youtube.com/watch?v=VIDEO_ID" -dir "VoiceFolderName" -p 0 -palgo rmvpe -ir 0.5 -mv 0 -bv 0 -iv 0 -rsize 0.15 -rwet 0.2 -rdry 0.8 -rdamp 0.7 -oformat mp3
~~~

Wichtige Flags:

- `-i`: Lokaler Dateipfad oder YouTube-URL als Eingabe
- `-dir`: Ordnername des Stimmmodells in `rvc_models/`
- `-p`: Tonhöhenverschiebung
- `-palgo`: Pitch-Extraktionsalgorithmus (`rmvpe` oder `mangio-crepe`)
- `-ir`: Index Rate (`0`–`1`)
- `-mv` / `-bv` / `-iv`: Lautstärkekorrektur für Hauptstimme, Begleitgesang und Instrumental
- `-rsize` / `-rwet` / `-rdry` / `-rdamp`: Room Size, Wetness, Dryness und Damping für Reverb
- `-oformat`: Ausgabeformat (`mp3` oder `wav`)

## Fehlerbehebung

- **Audio- oder Konvertierungsfehler zur Laufzeit:** Stelle sicher, dass sowohl `ffmpeg` als auch `sox` installiert und über deinen `PATH` erreichbar sind, bevor du `src/webui.py` oder `src/main.py` startest.
- **Fehler beim YouTube-Download:** Ältere YouTube-Downloader funktionieren mit der Zeit oft nicht mehr. Lade den Track separat als WAV/MP3 herunter und übergib stattdessen den lokalen Dateipfad.
- **Modell lässt sich nicht laden:** Prüfe, ob es sich um eine exportierte RVC-v2-Inferenz-`.pth`-Datei handelt (kein RVC-v1-Modell und kein fortsetzbarer G/D-Trainings-Checkpoint).

[Installation](installation.md)
