---
label: "Pré-escuta, exportação e resolução de problemas"
icon: ":headphones:"
order: 95
permalink: /non-rvc/ilaria-audio-upscaler/export/
---

# Pré-escuta, exportação e resolução de problemas

## Ouvir e guardar

Adiciona um ou mais ficheiros, escolhe o formato e carrega em **Enhance audio**. Compara o original e o resultado a **1×**. **Speed** só altera a reprodução. Seleciona o resultado e carrega em **Save result**. Pré-escutas não guardadas são temporárias. Usa WAV ou FLAC para editar depois. Ambos os motores criam um WAV PCM intermédio de 16 bits, pelo que outro formato não acrescenta precisão.

## Problemas comuns

**Faltam pesos:** descarrega os do motor e perfil selecionados. **Falha de CUDA:** experimenta **CPU** com um WAV curto. **Não abre ou não exporta:** testa um WAV válido e verifica FFmpeg, espaço livre e permissões. **Processamento lento:** testa um excerto mais curto em Auto ou com uma GPU CUDA compatível. **Resultado pior:** compara com o original e ajusta o motor ou perfil ao problema.

**WAV (PCM)** · **FLAC** · **MP3** · **M4A (AAC)** · **M4A (ALAC)** · **AAC (ADTS)** · **OGG (Vorbis)** · **Opus** · **AIFF (PCM)** · **WavPack** · **WMA**

[Visão geral](overview.md) · [Instalação e modelos](installation.md) · [Restaurar fala com Sidon](sidon.md) · [Expandir a banda da fala com AP-BWE](ap-bwe.md)

## Fontes

[studio.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio.py) · [studio_formats.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_formats.py)
