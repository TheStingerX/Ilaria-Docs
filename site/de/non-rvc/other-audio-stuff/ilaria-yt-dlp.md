# Ilaria YT-DLP

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [Windows ZIP · Hugging Face](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v1.zip?download=true)

## Unter Windows installieren

Lade das ZIP-Archiv herunter und entpacke es vollständig in einen Ordner mit Schreibrechten. Lass `App` neben `Ilaria YT-DLP.exe` liegen. Starte die EXE unter Windows 10 oder 11 (64 Bit). Falls sie sich nicht öffnet, zeigt `App\Start Ilaria YT-DLP.cmd` die Fehlermeldung an. Das Paket enthält Python, yt-dlp, FFmpeg, FFprobe und Deno.

## Ein Video herunterladen

Füge in **General & Formats** den Link zu einem Video ein, das du herunterladen darfst. Wähle den Zielordner und **Video + Audio (Best)**. Für breite Kompatibilität kannst du das H.264/AAC-Profil mit 1080p wählen. Mit **Simulate** überprüfst du die Auswahl vor dem Download.

## Nur Audio speichern

Wähle **Audio Only** und stelle das Format unter **Audio & PP** ein. MP3 ist weit verbreitet, Opus spart Speicherplatz und WAV eignet sich zur Bearbeitung. Eine Umwandlung in WAV stellt keine Details wieder her, die bei der ursprünglichen Kompression verloren gingen.

## Untertitel, Kapitel und Schnitte

Wähle unter **Subtitles, Thumbnails & Files** die Sprachen und speichere Untertitel separat oder bette sie ein. Unter **Playlist, Filters & Cuts** kannst du Kapitel oder einen Zeitbereich wählen. Teste Schnitte zuerst mit einem kurzen Ausschnitt. **SponsorBlock** kann Abschnitte als Kapitel markieren oder aus der Datei entfernen.

## Warteschlange, Profile und Fehlersuche

Füge eine URL pro Zeile ein oder importiere eine `.txt`-Liste. Teste zuerst einen Link und starte dann die Warteschlange. Einstellungen lassen sich als JSON-Profil exportieren. Prüfe bei Fehlern **Log & History**. Ist FFmpeg nicht verfügbar, überprüfe `App\bin` oder lege den Pfad unter **Advanced & CLI** fest. Überprüfe bei Speicherfehlern die Schreibrechte und den freien Platz.
