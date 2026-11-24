---
label: "Restaurar fala com Sidon"
icon: ":microphone:"
order: 97
permalink: /non-rvc/ilaria-audio-upscaler/sidon/
---

# Restaurar fala com Sidon

## Restaurar uma gravação

Escolhe **Sidon**, descarrega **Sidon INT8**, adiciona um excerto com ruído ou reverberação, seleciona **WAV (PCM)** e carrega em **Enhance audio**. Escuta se as pausas ficam mais limpas e as palavras mais claras. Verifica respirações, consoantes suaves e timbre. Conserva o original se perderes detalhes úteis.

## Como o Sidon funciona na aplicação

A aplicação reamostra para 16 kHz para extrair características. O preditor Sidon ONNX estima as características da fala limpa e o descodificador DAC sintetiza a 48 kHz. A aplicação processa cada canal separadamente em segmentos de cerca de seis segundos com contexto e aplica um filtro fixo de ruído através do FFmpeg. INT8 refere-se aos pesos quantizados. A profundidade de bits depende do formato de saída.

[Visão geral](overview.md) · [Instalação e modelos](installation.md) · [Expandir a banda da fala com AP-BWE](ap-bwe.md) · [Pré-escuta, exportação e resolução de problemas](export.md)

## Fontes

[Sidon](https://github.com/sarulab-speech/Sidon) · [Sidon-ONNX](https://huggingface.co/soniqo/Sidon-ONNX) · [Speech Core](https://github.com/soniqo/speech-core) · [studio_sidon.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_sidon.py)
