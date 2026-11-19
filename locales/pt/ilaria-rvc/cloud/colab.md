---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
---
# Google Colab

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

## Antes de começar

Prepara um WAV curto e limpo, um modelo compatível para inferência e uma cópia do conjunto de dados se fores treinar.

1. Abre o notebook no Colab num ambiente com GPU.
2. Executa as células 1 a 4 para verificar a GPU, instalar dependências, descarregar pesos e iniciar a interface.
3. Abre a vista incorporada e mantém a sessão ligada.

## Verificar as células

Confirma que a primeira célula deteta uma GPU NVIDIA. Espera que as dependências acabem de instalar. Para inferência, podes usar `TRAINING_SAMPLE_RATES = []`. Mantém `DOWNLOAD_FCPE` se usares FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exportar e parar

Ativa `EXPORT = True` e usa `INCLUDE_CHECKPOINTS` para retomar o treino. Guarda o ZIP antes de executar `STOP = True`.

### Verificar o ZIP

Confirma o WAV e o modelo exportados. Ativa `INCLUDE_CHECKPOINTS` para retomar o treino e guarda os dados originais em separado.

## Resolver problemas

Lê o primeiro erro e repete a célula depois de o corrigir. Se o modelo não aparecer, verifica o registo de importação. Se faltar memória na GPU, reduz o lote.

[Ilaria RVC na cloud](cloud.md)
