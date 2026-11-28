---
label: "Installation und erster Start"
icon: ":cd:"
order: 99
permalink: /non-rvc/ilaria-music/
---

# Ilaria Music · Installation und erster Start

[GitHub](https://github.com/TheStingerX/Ilaria-Music) · [v1](https://github.com/TheStingerX/Ilaria-Music/releases/tag/v1) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-Music/resolve/main/Ilaria-Music%20v1.zip?download=true)

[Installation und erster Start](installation.md) · [Titel suchen und zuordnen](search.md) · [Musik exportieren und organisieren](export.md)

## Windows-x64-ZIP installieren

Entpacke das gesamte Archiv in einen Ordner mit Schreibrechten. Lass `App` neben dem Launcher. Für den Quellcode starte `App\Setup.cmd`. Öffnet sich die EXE nicht, zeigt das Startskript in `App` den Fehler.

## Werkzeuge prüfen

Ilaria Music enthält Python 3.11, Qt und yt-dlp. Installiere FFmpeg für die Konvertierung. Deno wird für YouTube Music empfohlen. Starte die App neu oder lege die Programme unter `App/bin/` ab.

```powershell
winget install yt-dlp.FFmpeg
winget install DenoLand.Deno
```

`Ilaria Music.exe` · `App\Start Ilaria Music.cmd`
