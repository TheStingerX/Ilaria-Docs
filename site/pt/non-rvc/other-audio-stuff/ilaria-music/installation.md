# Ilaria Music · Instalação e primeiro arranque

[GitHub](https://github.com/TheStingerX/Ilaria-Music) · [v1](https://github.com/TheStingerX/Ilaria-Music/releases/tag/v1) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-Music/resolve/main/Ilaria-Music%20v1.zip?download=true)

[Instalação e primeiro arranque](installation.md) · [Pesquisa e correspondência de faixas](search.md) · [Exportar e organizar música](export.md)

## Instalar o ZIP para Windows x64

Extrai o ZIP completo para uma pasta onde possas gravar. Mantém `App` junto ao executável. Para instalar a partir do código, corre `App\Setup.cmd`. Se o EXE falhar, usa o ficheiro `Start` em `App` para ver o erro.

## Verificar as ferramentas

O Ilaria Music inclui Python 3.11, Qt e yt-dlp. Instala FFmpeg para conversão e Deno para YouTube Music. Reinicia a aplicação ou coloca os executáveis em `App/bin/`.

```powershell
winget install yt-dlp.FFmpeg
winget install DenoLand.Deno
```

`Ilaria Music.exe` · `App\Start Ilaria Music.cmd`
