# NoRegretsRVC · Utilização

O NoRegretsRVC Beta 0.1.0 prepara fluxos Applio numa interface web e gera notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Beta 0.1.0](https://github.com/HunterThatsMe/NoRegretsRVC/releases/tag/v0.1.0) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Utilização

Cria um projeto e escolhe frequência, vocoder, extrator de tom, encoder, lote e épocas. Confirma a compatibilidade dos pesos base. A estimativa de VRAM é indicativa.

Usa a interface para preparar definições. Executa o treino ou a conversão num ambiente Applio compatível.

## Fluxo de treino e ferramentas

Training tem quatro passos: configuração, preparação dos dados, extração de características e treino. O Kaggle acrescenta exportação de `.pth` e `.index`. Samples permite filas, definições por excerto, transposição, limpeza no browser e seis exemplos de 32 kHz. Models gere pretrains, Voice Blender combina modelos e o TTS usa Edge. Confirma de ouvido as sugestões de checkpoints de Diagnostics.

## Treino e diagnóstico na 0.1.0

A normalização aponta para −20 LUFS por predefinição e a frequência continua em 32 kHz. Foram adicionados EMA, perda Mel com janelas 512/1024/2048, clipping de gradientes e ajustes ao FAISS `nprobe`. Confirma checkpoints por audição.

O botão chama-se **Restart NoRegretsRVC**. Os campos numéricos sincronizam os controlos e os nomes antigos deixam de ser sugeridos.

[Instalação](installation.md) · [Cloud](cloud.md)
