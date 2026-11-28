---
label: "Instalación y primer inicio"
icon: ":cd:"
order: 99
permalink: /non-rvc/ilaria-music/
---

# Ilaria Music · Instalación y primer inicio

[GitHub](https://github.com/TheStingerX/Ilaria-Music) · [v1](https://github.com/TheStingerX/Ilaria-Music/releases/tag/v1) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-Music/resolve/main/Ilaria-Music%20v1.zip?download=true)

[Instalación y primer inicio](installation.md) · [Búsqueda y coincidencias](search.md) · [Exportar y organizar música](export.md)

## Instalar el ZIP para Windows x64

Extrae el ZIP completo en una carpeta con permiso de escritura. Mantén `App` junto al ejecutable. Para instalar desde el código, ejecuta `App\Setup.cmd`. Si falla el inicio, abre el archivo `Start` de la carpeta `App` para ver el error.

## Comprobar las herramientas

Ilaria Music incluye Python 3.11, Qt y yt-dlp. Instala FFmpeg para convertir audio y Deno para mejorar la compatibilidad con YouTube Music. Reinicia la aplicación. También puedes colocar los ejecutables en `App/bin/`.

```powershell
winget install yt-dlp.FFmpeg
winget install DenoLand.Deno
```

`Ilaria Music.exe` · `App\Start Ilaria Music.cmd`
