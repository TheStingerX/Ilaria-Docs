---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
description: "Prepara um WAV curto e limpo, um modelo compatível para inferência e uma cópia do conjunto de dados se fores treinar."
---
# Google Colab

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

## Antes de começar

Prepara um WAV curto e limpo, um modelo compatível para inferência e uma cópia do conjunto de dados se fores treinar.

1. Abre o notebook no Colab num ambiente com GPU.
2. Executa as células 1 a 4 para verificar a GPU, instalar dependências, descarregar pesos e iniciar a interface.
### Limites, compute units e regras do Google Colab

Antes de sessões longas, vê como o [Google Colab](https://research.google.com/colaboratory/faq.html) gere os recursos:

- **Plano gratuito vs. planos pagos (Compute Units):** O plano gratuito disponibiliza GPUs de forma dinâmica, sem garantia de duração. Os planos **Pro / Pro+ / Pay As You Go** consomem **compute units** consoante a GPU.
- **Atividades proibidas e WebUI:** A [política do Colab](https://research.google.com/colaboratory/faq.html#disallowed-activities) proíbe alojamento web público, proxies remotos, contorno de limites e deepfakes. O Gradio interativo não é proibido em absoluto, mas túneis WebUI persistentes no plano gratuito causam frequentemente desconexões.
- **Desconexões, gravação e privacidade:** Exporta (EXPORT = True) ou guarda no Google Drive regularmente e mantém os notebooks privados.
- **Alternativas:** [Kaggle](kaggle.md) ou [Lightning AI Studio](lightning-ai.md).

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
