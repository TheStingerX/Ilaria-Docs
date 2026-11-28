---
label: "Installation et premier lancement"
icon: ":cd:"
order: 99
permalink: /non-rvc/ilaria-music/
---

# Ilaria Music · Installation et premier lancement

[GitHub](https://github.com/TheStingerX/Ilaria-Music) · [v1](https://github.com/TheStingerX/Ilaria-Music/releases/tag/v1) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-Music/resolve/main/Ilaria-Music%20v1.zip?download=true)

[Installation et premier lancement](installation.md) · [Recherche et correspondance des titres](search.md) · [Exporter et organiser la musique](export.md)

## Installer le ZIP Windows x64

Extrayez toute l’archive dans un dossier accessible en écriture. Gardez `App` à côté du lanceur. Depuis les sources, lancez `App\Setup.cmd`. Si l’EXE ne s’ouvre pas, utilisez le script `Start` dans `App` pour lire l’erreur.

## Vérifier les outils

Ilaria Music inclut Python 3.11, Qt et yt-dlp. Installez FFmpeg pour la conversion. Deno est conseillé pour YouTube Music. Relancez l’application ou placez les exécutables dans `App/bin/`.

```powershell
winget install yt-dlp.FFmpeg
winget install DenoLand.Deno
```

`Ilaria Music.exe` · `App\Start Ilaria Music.cmd`
