# Ilaria Music · Installation and first run

[GitHub](https://github.com/TheStingerX/Ilaria-Music) · [v1](https://github.com/TheStingerX/Ilaria-Music/releases/tag/v1) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-Music/resolve/main/Ilaria-Music%20v1.zip?download=true)

[Installation and first run](installation.md) · [Search and match tracks](search.md) · [Export and organise music](export.md)

## Install the Windows x64 ZIP

Extract everything into a writable folder and keep `App` beside the launcher. For the source version, run `App\Setup.cmd` to prepare the local Python environment. If the EXE does not open, use the corresponding `App\Start … .cmd` to read the error.

## Check tools before starting

Ilaria Music includes Python 3.11, Qt and yt-dlp. Install FFmpeg for conversion and post-processing. Deno is recommended for YouTube Music. Restart the app after installation, or place `ffmpeg.exe`, `ffprobe.exe` and `deno.exe` under `App/bin/`. The source version supports 64-bit Python 3.11, 3.12 and 3.13.

```powershell
winget install yt-dlp.FFmpeg
winget install DenoLand.Deno
```

`Ilaria Music.exe` · `App\Start Ilaria Music.cmd`
