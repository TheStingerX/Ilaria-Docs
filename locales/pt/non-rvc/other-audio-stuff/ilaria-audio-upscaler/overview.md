---
label: "Visão geral"
icon: ":speaker:"
order: 99
permalink: /non-rvc/ilaria-audio-upscaler/overview/
---

# Ilaria Audio Upscaler

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1)

## Escolhe o motor

O Ilaria Audio Upscaler processa gravações localmente no Windows. Escolhe **Sidon** para fala com ruído, reverberação ou compressão. Escolhe **AP-BWE** para fala relativamente limpa mas com largura de banda limitada, como uma gravação telefónica. Ambos se destinam à fala. Compara o resultado com o original antes de o usares num conjunto de dados.

## Primeiro teste

Conserva o ficheiro original. Processa um excerto curto com um motor e exporta em WAV. Compara a volumes semelhantes e ouve consoantes, pausas e timbre. As frequências altas são sintetizadas a partir do sinal disponível. Uma saída a 48 kHz não recupera a forma de onda original exata.

[Instalação e modelos](installation.md) · [Restaurar fala com Sidon](sidon.md) · [Expandir a banda da fala com AP-BWE](ap-bwe.md) · [Pré-escuta, exportação e resolução de problemas](export.md)

## Fontes

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [Sidon](https://github.com/sarulab-speech/Sidon) · [AP-BWE](https://github.com/yxlu-0102/AP-BWE)
