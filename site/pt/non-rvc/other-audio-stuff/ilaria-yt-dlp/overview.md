# Ilaria YT-DLP · Visão geral

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Visão geral](overview.md) · [Formatos e áudio](formats.md) · [Listas e resolução de problemas](playlists.md)

## Instalar no Windows

Descarrega o ZIP e extrai todo o conteúdo para uma pasta onde possas gravar ficheiros. Mantém `App` junto a `Ilaria YT-DLP.exe`. Abre o executável no Windows 10 ou 11 de 64 bits. Se falhar, usa `App\Start Ilaria YT-DLP.cmd` para ver o erro. O pacote inclui Python, yt-dlp, FFmpeg, FFprobe e Deno.

## Descarregar um vídeo

Cola a ligação de um vídeo que tenhas autorização para descarregar em **General & Formats**. Escolhe a pasta de destino e seleciona **Video + Audio (Best)**. Experimenta o perfil H.264/AAC de 1080p para facilitar a reprodução. Usa **Simulate** para verificar a seleção antes de descarregar.

## Extrair o áudio

Seleciona **Audio Only** e escolhe o formato em **Audio & PP**. MP3 tem ampla compatibilidade, Opus pode poupar espaço e WAV dá jeito para editar. Converter para WAV não recupera os pormenores perdidos na compressão original.

## Legendas, capítulos e cortes

Em **Subtitles, Thumbnails & Files**, escolhe os idiomas e decide se queres guardar as legendas à parte ou incorporá-las. Em **Playlist, Filters & Cuts**, escolhe capítulos ou um intervalo e testa primeiro com um excerto curto. **SponsorBlock** permite marcar segmentos como capítulos ou removê-los do ficheiro final.

## Fila, perfis e resolução de problemas

Cola um URL por linha ou importa uma lista `.txt`. Testa um URL antes de iniciar toda a fila. Exporta um perfil JSON para reutilizar as definições. Se ocorrer um erro, consulta **Log & History**. Se o FFmpeg não for encontrado, verifica `App\bin` ou indica o caminho em **Advanced & CLI**. Se falhar ao gravar, confirma as permissões e o espaço livre.
