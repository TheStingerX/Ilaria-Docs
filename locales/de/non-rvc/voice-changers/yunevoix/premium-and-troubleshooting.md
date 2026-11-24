---
label: "Premium, Lizenz & Hilfe"
icon: ":wrench:"
order: 94
permalink: /non-rvc/yunevoix/premium-and-troubleshooting/
description: "YuneVoix PREMIUM-Lizenzierung (Song Cover & Karaoke), Offline-Aktivierung, Hardware-Regeln, erweiterte NVIDIA- & AMD-Fehlerbehebung und Diagnose."
---
# Premium, Lizenz und Fehlerbehebung

## YuneVoix PREMIUM: Song Cover & Karaoke

Unterstützer auf [Ko-fi](https://ko-fi.com/yunevoix) erhalten Zugang zu **YuneVoix PREMIUM**, das zusätzlich zu allem aus BASIC Offline-Musikfunktionen freischaltet:

- **Song Cover:** Wähle einen beliebigen Song und eine Zielstimme. YuneVoix trennt den Gesang vom Instrumental, konvertiert die Hauptstimme (und optional Begleitgesang) und mischt alles wieder zusammen.
- **Karaoke:** Singe zu Liedtexten auf dem Bildschirm; deine Aufnahme wird in die gewählte Stimme konvertiert und mit der Musik gemischt, abgestimmt auf Tonart und Pegel des Originals.

Für vollständige Schritt-für-Schritt-Anleitungen und jede Song-Cover-/Karaoke-Einstellung siehe **[Song Cover & Karaoke - Vollständige Einsteiger-Anleitung](song-cover-karaoke.md)**.

---

## PREMIUM-Lizenz & Aktivierung

1. Öffne den Tab **Song Cover** und klicke auf **"Copy request code"**.
2. Sende den Anforderungscode zusammen mit deinem Ko-fi-Kauf.
3. Du erhältst eine `license.yvl`-Datei. Klicke auf **"Load license…"** und wähle sie aus (sie wird neben `YuneVoix.exe` kopiert).

### Wie die Lizenz funktioniert

- **Läuft nie ab** und funktioniert **100% offline**.
- **Updates:** Kopiere `license.yvl` neben die neue `YuneVoix.exe` (oder lade sie erneut).
- **Ein PC pro Lizenz:** Ein kopierter PREMIUM-Ordner oder eine kopierte Lizenz schaltet Song Cover auf keinem anderen Computer frei.
- **Hardware-Änderungen:** Die Lizenz ist an dein **Mainboard**, deine **Systemfestplatte** und deine **Windows-Installation** gebunden.
  - Das Ändern von **einem** davon ist unproblematisch (und ein Upgrade von GPU, RAM oder Monitor zählt überhaupt nicht).
  - Das Ändern von **zwei gleichzeitig** (z. B. neue Systemfestplatte mit frischer Windows-Installation) erfordert eine neue Lizenz - kopiere den neuen Anforderungscode und kontaktiere den Support mit deiner Bestellung.

---

## Fehlerbehebung

| Symptom | Was zuerst ausprobieren |
| --- | --- |
| **Robotische, leise oder "Unterwasser"-Stimme** | Erhöhe die Mikrofonverstärkung in Windows, sodass lautes Sprechen Spitzen nahe **−6 dBFS** erreicht (`Settings → General → Microphone level`), und lasse Input cleaning auf **`DF3`**. |
| **Tippen oder Klicks werden zu Tönen** | Stelle Input cleaning (`Settings → General`) auf **`DF3`**. |
| **Zischen oder "Körnung" in den Höhen** | Lasse **Smooth top** auf `100%` und **Brightness** auf `0 dB` (`Settings → EQ & Filters`). |
| **Falsche Oktave / klingt wie ein Streifenhörnchen** | Passe in `Settings → Pitch & Autotune` **Pitch shift** an oder teste **Automatic pitch** (`Octave from the target voice` für Gesang; `Match the target voice's pitch` fürs Sprechen). |
| **Lachen, Atemzüge oder Flüstern gehen verloren** | Deaktiviere **Speech gate**, stelle Input cleaning auf **`Gentle`** (in einem ruhigen Raum), teste **WavLM+** (NVIDIA und AMD DirectML) oder stelle **Model method** auf **`FlowEdit 3+1`** (benötigt eine 5-20 s Probe deiner eigenen Stimme). |
| **FlowEdit behält Hintergrundgeräusche oder Raumhall** | Aktiviere Eingangsreinigung **`DF3`**, nimm in einem ruhigeren Raum auf oder stelle **Model method** wieder auf **`Classic`**. |
| **Knackser oder kurze Aussetzer** | Stelle **Model method** auf **`Learned 4 steps`**, verkürze **Prompt length**, erhöhe **Output buffer** (`Settings → General`) und schließe andere GPU-intensive Apps. |
| **Ruckeln beim Spielen** | Begrenze die **FPS** des Spiels und reduziere die Spielgrafik, stelle **Model method** auf **`Learned 4 steps`**, verkürze **Prompt length** und deaktiviere **Harmony**. |
| **LIVE gestoppt: "the audio device stopped working"** | Dein Mikrofon oder Ausgabegerät wurde getrennt oder geändert. Schließe es wieder an, klicke auf **Refresh devices** und drücke **START**. |
| **AMD: schließt bei START / `ShapeInferenceNotRegistered`** | Aktualisiere auf **v0.7.1** (nutzt standardmäßig **DirectML** auf der dedizierten GPU und behebt sowohl Abstürze bei vorhandener integrierter AMD-Grafik als auch `ShapeInferenceNotRegistered` bei deaktivierter integrierter Grafik). Prüfe `check.txt` auf aktive Karte/Engine und halte Adrenalin-Treiber aktuell. |
| **AMD: FlowEdit fällt zurück oder WavLM+ nicht verfügbar** | Prüfe `Settings → General → "AMD graphics engine"`. Falls du experimentelles **MIGraphX** aktiviert hast, wechsle zurück auf **DirectML** und starte neu (unter MIGraphX sind `WavLM+`, `FlowEdit 3+1` und `Learned 4 steps` nicht verfügbar - alles läuft als Classic, 10 × Euler). Stelle außerdem sicher, dass `Sample of your voice…` für LIVE FlowEdit gesetzt ist. |
| **Windows-Explorer meldet ungültige ZIP-Datei** | Nutze **7-Zip** oder **WinRAR** (AES-256-verschlüsseltes ZIP) mit Passwort `yunevoix`. |

---

## Diagnose & Support

Falls etwas weiterhin nicht funktioniert:

1. Öffne die Eingabeaufforderung im YuneVoix-Ordner (tippe `cmd` in die Adressleiste des Windows-Explorers und drücke Enter).
2. Führe aus:
   ```bat
   YuneVoix.exe --check
   ```
3. **Neben `YuneVoix.exe` erstellte Dateien:**
   - **`check.txt`**: Hardware-, Editions-, Lizenz- und GPU/Engine-Erkennungsbericht.
   - **`live-diag.log`**: Diagnoseprotokoll der aktuellen Sitzung.
   - **`live-diag.prev.log`** und **`crash.log`**: gesichertes vorheriges Protokoll und Absturzdetails nach einem Crash.
4. Sende **`check.txt`** und **`live-diag.log`**; nach einem Absturz sende auch **`live-diag.prev.log`** und **`crash.log`** (alle liegen neben `YuneVoix.exe`).
5. **AMD-Geschwindigkeitstest (optional):** Du kannst `YuneVoix.exe --bench` ausführen, um `bench.txt`, `bench_ort.log` und `bench_output.wav` mit der Diagnosegeschwindigkeit auf deiner konkreten AMD-Karte zu erzeugen (Ergebnisse variieren je nach Karte und System).
6. *(Datenschutzhinweis)* Bevor du Protokolle oder optionale WAV-Dateien von **Save diagnostic recordings** in **`yune-support`**, per DM an **Kuroyuki** (`sxxyneko` auf Discord) oder auf [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix) teilst, prüfe sie auf persönliche Benutzernamen, Dateipfade oder private Sprache.
