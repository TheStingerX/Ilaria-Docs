# NoRegretsRVC · Cloud

O NoRegretsRVC Beta 0.0 prepara fluxos Applio numa interface web e gera notebooks.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Exporta o `.ipynb` e importa-o para um notebook privado do Kaggle. Revê as células. Ativa GPU e internet quando houver transferências, executa primeiro a configuração e confirma o caminho dos dados.

Protege os dados de acesso e o endereço do túnel. Descarrega o modelo e os checkpoints antes de terminares a sessão.

[Kaggle](https://www.kaggle.com/code)

## Recursos e recuperação no Kaggle

A WebUI deteta conjuntos de dados em `/kaggle/input`. A paridade Dual T4 procura manter os passos do Applio para lotes de pelo menos 4 e menos de 300 épocas. O Turbo é opcional. A validação inicial verifica WAV, `.npy` e `filelist.txt`. A estimativa usa o relógio do browser. Confirma o `.pth` exportado e guarda os checkpoints para retoma.

[Instalação](installation.md) · [Utilização](usage.md)
