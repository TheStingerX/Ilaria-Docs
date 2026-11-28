---
label: "Cloud"
icon: ":cloud:"
order: 97
permalink: /ilaria-rvc/noregretsrvc/cloud/
---

# NoRegretsRVC · Cloud

O NoRegretsRVC Beta 0.1.0 prepara fluxos Applio numa interface web e gera notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](version-history.md) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exporta o `.ipynb` e importa-o para um notebook privado do Kaggle. Revê as células. Ativa GPU e internet quando houver transferências, executa primeiro a configuração e confirma o caminho dos dados.

Protege os dados de acesso e o endereço do túnel. Descarrega o modelo e os checkpoints antes de terminares a sessão.

[Kaggle](https://www.kaggle.com/code)

## Recursos e recuperação no Kaggle

A WebUI deteta conjuntos de dados em `/kaggle/input`. O Turbo é opcional. A validação inicial verifica WAV, `.npy` e `filelist.txt`. A estimativa usa o relógio do browser. Confirma o `.pth` exportado e guarda os checkpoints para retoma.

## Dual T4 e lote efetivo

A beta 0.1.0 remove a paridade com Applio numa GPU. Com duas GPUs, lotes de 2 ou 4 por GPU equivalem a 4 ou 8 no total.

Sem um dataset detetado, o caminho fica vazio. A ETA filtra o aquecimento e as pausas de gravação. O monitor corrige o total de épocas e as marcas duplicadas. Os ficheiros `.nr_*` saem de `logs/`.

[Instalação](installation.md) · [Utilização](usage.md)
