---
label: "Export and organise music"
icon: ":headphones:"
order: 97
permalink: /non-rvc/ilaria-music/export/
---

# Ilaria Music · Export and organise music

[GitHub](https://github.com/TheStingerX/Ilaria-Music) · [v1](https://github.com/TheStingerX/Ilaria-Music/releases/tag/v1) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-Music/resolve/main/Ilaria-Music%20v1.zip?download=true)

[Installation and first run](installation.md) · [Search and match tracks](search.md) · [Export and organise music](export.md)

## Choose a format and check the result

Start with MP3 for playback compatibility or FLAC/WAV for editing without another lossy encode. Compare the duration and listen to the opening and ending. Converting a lossy source to FLAC preserves the decoded signal. It cannot restore missing detail.

## Tags, artwork and lyrics

Check title, artist, album and track number in your player after export. Enable cover art if you want it embedded. Synced lyrics use LRCLIB when available and can be saved as an `.lrc` file. Test any loudness normalisation or silence trimming on one track first because it changes the signal or timing.

## Folders and duplicate handling

Use a template such as `{artist}/{album}/{track_number:02d} - {title}`. Check the path on one track before a batch. Choose skip, overwrite or rename deliberately. The duplicate archive remembers completed items, while collision behaviour applies when a file already exists at the target path. Export `.m3u8` if you need a playlist file.
