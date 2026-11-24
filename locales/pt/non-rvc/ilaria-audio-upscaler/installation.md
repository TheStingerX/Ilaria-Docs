---
label: "Instalação e modelos"
icon: ":cd:"
order: 98
permalink: /non-rvc/ilaria-audio-upscaler/installation/
---

# Instalação e modelos

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1)

## Configuração no Windows

**1.** Descarrega o projeto do GitHub e extrai-o para uma pasta local com permissões de escrita. Instala **Python 3.10 de 64 bits**. **2.** Executa `Setup.cmd` e aguarda a instalação das dependências e do FFmpeg, a criação de `Ilaria Audio Upscaler.exe` e a abertura da aplicação. **3.** Depois, abre o EXE diretamente e mantém-no na pasta da aplicação. O pacote de código não inclui o executável compilado, o ambiente Python nem os pesos.

## Dispositivo e pesos

A instalação tenta ativar CUDA numa GPU NVIDIA compatível e pode usar a CPU. Começa com **Auto**. Seleciona **CPU** para despistar erros de CUDA ou **CUDA** e a GPU quando o ambiente a suportar. Usa **Download Sidon INT8** (cerca de 286 MiB) ou **Download checkpoint** para o perfil AP-BWE escolhido. Os pesos ficam em `App/checkpoints`. A instalação e os descarregamentos requerem Internet.

[Visão geral](overview.md) · [Restaurar fala com Sidon](sidon.md) · [Expandir a banda da fala com AP-BWE](ap-bwe.md) · [Pré-escuta, exportação e resolução de problemas](export.md)

## Fontes

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1) · [Python 3.10](https://www.python.org/downloads/release/python-31011/) · [Setup.cmd](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/Setup.cmd)
