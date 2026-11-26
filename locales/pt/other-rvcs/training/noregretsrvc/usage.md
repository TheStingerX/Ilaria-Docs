---
label: "Utilização"
icon: ":control_knobs:"
order: 98
permalink: /ilaria-rvc/noregretsrvc/usage/
---

# NoRegretsRVC · Utilização

O NoRegretsRVC Beta 0.0 prepara fluxos Applio numa interface web e gera notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Utilização

Cria um projeto e escolhe frequência, vocoder, extrator de tom, encoder, lote e épocas. Confirma a compatibilidade dos pesos base. A estimativa de VRAM é indicativa.

Usa a interface para preparar definições. Executa o treino ou a conversão num ambiente Applio compatível.

## Fluxo de treino e ferramentas

Training tem quatro passos: configuração, preparação dos dados, extração de características e treino. O Kaggle acrescenta exportação de `.pth` e `.index`. Samples permite filas, definições por excerto, transposição, limpeza no browser e seis exemplos de 32 kHz. Models gere pretrains, Voice Blender combina modelos e o TTS usa Edge. Confirma de ouvido as sugestões de checkpoints de Diagnostics.

[Instalação](installation.md) · [Cloud](cloud.md)
