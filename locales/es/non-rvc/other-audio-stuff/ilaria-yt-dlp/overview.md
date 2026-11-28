---
label: "Introducción"
icon: ":cd:"
order: 99
permalink: /non-rvc/ilaria-yt-dlp/
---

# Ilaria YT-DLP · Introducción

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Introducción](overview.md) · [Formatos y audio](formats.md) · [Listas y solución de problemas](playlists.md)

## Instalación en Windows

Descarga el ZIP y extrae todo en una carpeta donde puedas escribir. Deja `App` al lado de `Ilaria YT-DLP.exe`. Abre el ejecutable en Windows 10 u 11 de 64 bits. Si no se abre, ejecuta `App\Start Ilaria YT-DLP.cmd` para ver el error. El paquete incluye Python, yt-dlp, FFmpeg, FFprobe y Deno.

## Descargar un vídeo

Copia un enlace a un vídeo que tengas permiso para descargar. Pégalo en **General & Formats**, elige una carpeta de destino y empieza con **Video + Audio (Best)**. Elige el perfil H.264/AAC de 1080p si necesitas un formato fácil de reproducir. Usa **Simulate** para comprobar qué se seleccionará antes de descargar.

## Extraer audio

Selecciona **Audio Only** y elige el formato en **Audio & PP**. Usa MP3 para compatibilidad, Opus si buscas archivos más pequeños o WAV para edición. Convertir a WAV no recupera detalle perdido durante la compresión original.

## Subtítulos, capítulos y cortes

En **Subtitles, Thumbnails & Files**, elige los idiomas y decide si quieres guardar los subtítulos aparte o incrustarlos. En **Playlist, Filters & Cuts**, selecciona capítulos o limita el intervalo. Prueba los recortes con un clip corto. En **SponsorBlock**, puedes marcar segmentos como capítulos o eliminarlos del archivo final.

## Cola, perfiles y diagnóstico

Pega una URL por línea o importa una lista `.txt`. Comprueba la selección con una sola URL antes de iniciar toda la cola. Exporta un perfil JSON para reutilizar los ajustes. Si falla una descarga, revisa **Log & History**. Si falta FFmpeg, verifica que `App\bin` esté intacta o indica la ruta en **Advanced & CLI**. Si el archivo no se guarda, prueba otra carpeta y comprueba el espacio libre.
