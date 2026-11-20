---
label: "Premium, Lizenz & Hilfe"
icon: ":wrench:"
order: 96
permalink: /non-rvc/yunevoix/premium-and-troubleshooting/
---
# Premium, Lizenz und Fehlerbehebung

## YuneVoix PREMIUM: Song Cover & Karaoke

Unterstützer auf [Ko-fi](https://ko-fi.com/yunevoix) erhalten Zugang zu **YuneVoix PREMIUM**, das zusätzlich zu allen BASIC-Funktionen Offline-Musikfunktionen freischaltet:

- **Song Cover**: wähle einen Song und eine Zielstimme. YuneVoix trennt Gesang und Instrumental, konvertiert die Hauptstimme (und optional Begleitgesang) und mischt alles wieder zusammen.
  - **Unterstützte Formate**: WAV, MP3, FLAC, M4A, AAC, OGG, WMA, AIFF (bis zu **15 Minuten**).
  - **Verarbeitungszeit**: etwa **1,3×** der Songlänge (ein 5-Minuten-Song dauert ca. 6–7 Minuten).
  - **Ausgabeformate**: **WAV 24-Bit** oder **MP3 320 kbps**.
- **Karaoke**: singe mit Texten auf dem Bildschirm; deine Aufnahme wird in die gewählte Stimme konvertiert und mit der Musik gemischt, angepasst an Tonart und Pegel des Originals.

### Tipps für Song Cover

- **Falsche Tonhöhe**: stelle **Settings → Song Cover → Octave** manuell auf **`−12`**, **`0`** oder **`+12`** statt `Auto`.
- **Duette & Backing Vocals**: **„Lead vocal only“** liefert das sauberste Ergebnis. Bei zwei Leadsängern erhalten beide die gewählte Stimme (ein einzelner Sänger lässt sich nicht isolieren).
- **Urheberrecht**: der Song gehört weiterhin den Urhebern — prüfe Plattformregeln und Copyright vor dem Veröffentlichen von Covern.

## PREMIUM-Lizenz & Aktivierung

1. Öffne den Tab **Song Cover** und klicke auf **„Copy request code“**.
2. Sende den Code zusammen mit deinem Ko-fi-Kauf.
3. Du erhältst eine `license.yvl`-Datei. Klicke auf **„Load license…“** und wähle sie aus.

### So funktioniert die Lizenz

- **Läuft nie ab** und funktioniert **100 % offline**.
- **Updates**: kopiere `license.yvl` neben die neue `YuneVoix.exe` (oder lade sie erneut).
- **Ein PC pro Lizenz**: ein kopierter PREMIUM-Ordner oder eine Lizenz schaltet Song Cover auf einem anderen Computer nicht frei.
- **Hardware-Änderungen**: die Lizenz ist an **Mainboard**, **Systemlaufwerk** und **Windows-Installation** gebunden.
  - Das Ändern von **einem** davon ist problemlos (und eine neue Grafikkarte, RAM oder ein Monitor zählen überhaupt nicht).
  - Das Ändern von **zweien gleichzeitig** (z. B. neues Systemlaufwerk mit frischer Windows-Installation) erfordert eine neue Lizenz: kopiere den neuen Request-Code und kontaktiere den Support mit deiner Bestellung.

## Fehlerbehebung

| Symptom | Zuerst prüfen |
| --- | --- |
| **Stimme klingt robotisch, leise oder „unter Wasser“** | Erhöhe die Mikrofonverstärkung in Windows, sodass lautes Sprechen bei **−6 dBFS** liegt (`Settings → General → Microphone level`), und lasse Input cleaning auf **`DF3`**. |
| **Falsche Oktave / Chipmunk-Stimme** | Stelle unter `Settings → Pitch & Autotune` **Pitch shift** ein (`+12` Mann→Frau, `0` gleiche Lage, `−12` Frau→Mann) oder aktiviere automatischen Pitch. |
| **Lachen, Atmen oder Flüstern gehen verloren** | Deaktiviere **Speech gate**, stelle Input cleaning auf **`Gentle`** (im ruhigen Raum) und teste die **WavLM+** Content-Engine (unterstützt auf NVIDIA und AMD DirectML). |
| **AMD: schließt bei START / WavLM+ oder FlowEdit fehlt** | Auf **v0.7.1** aktualisieren (behebt Abstürze bei CPUs mit integrierter AMD-Grafik durch Standard-DirectML auf der dedizierten GPU). Falls experimentelles MIGraphX unter `Settings → General → "AMD graphics engine"` aktiv ist, auf **DirectML** zurückstellen und neu starten. |
| **Knackser oder kurze Aussetzer** | Erhöhe **Output buffer** (`Settings → General`), schließe andere GPU-Apps, reduziere **Model steps** oder Prompt-Länge und deaktiviere **Harmony**. |
| **Ruckler beim Spielen** | Senke die Spielgrafik oder das FPS-Limit, oder reduziere **Model steps** und Prompt-Länge unter `Settings → Voice & Timbre`. |
| **Windows-Explorer meldet ungültige ZIP** | Nutze **7-Zip** oder **WinRAR** (AES-256-Verschlüsselung) mit dem Passwort `yunevoix`. |

## Diagnose & Support

Wenn etwas weiterhin nicht funktioniert:

1. Öffne eine Eingabeaufforderung im YuneVoix-Ordner (`cmd` in die Adresszeile des Explorers eingeben und Enter drücken).
2. Führe aus:
   ```bat
   YuneVoix.exe --check
   ```
3. Sende die erzeugte **`check.txt`** zusammen mit **`live-diag.log`** bei Supportanfragen in **`yune-support`**, per DM oder über [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix).
