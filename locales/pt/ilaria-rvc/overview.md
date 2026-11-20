---
label: "Visão geral do Ilaria RVC"
icon: ":sparkling_heart:"
order: 100
permalink: /ilaria-rvc/overview/
---
# Visão geral do Ilaria RVC

[Descarregar o Ilaria RVC 2.4.2 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Também podes usar o Ilaria RVC no Kaggle com a GPU remota, mesmo que o teu computador não tenha uma GPU NVIDIA. [Ilaria RVC on Kaggle](cloud/kaggle.md)

Ilaria RVC 2.4.2 é um aplicativo do Windows baseado no RVC WebUI (Mainline - Original RVC). Sua interface abre em um navegador, enquanto o mecanismo integrado é executado no PC. O pacote atual do Windows é direcionado à NVIDIA. O lançamento inclui inferência, TTS, treinamento de modelo, biblioteca de modelos e análise de áudio.

 | Onde | O que você pode fazer |
| --- | --- |
 | Treinamento | Importar e verificar conjuntos de dados, pré-processar, extrair recursos, executar ou enfileirar experimentos, visualizar pontos de verificação e criar índices de recuperação. |
 | Inferência | Converta um clipe ou pasta, gere fala, selecione codificadores e extratores de pitch e aplique processamento opcional. |
 | Outros | Importe, baixe, inspecione, mescle e exporte modelos. Instale incorporadores e pré-treinos opcionais, analise áudio, verifique hardware e atualize o aplicativo. |
 | Painel de treinamento | Siga execuções ativas, inspecione logs existentes, abra o TensorBoard e gere um relatório de diagnóstico. |
 | Glossário | Revise as configurações e fluxos de trabalho dentro do aplicativo. |

Comece com [instalação](install/installation.md), depois siga [inferência única e em lote](convert/inference.md), [um experimento de treinamento](train/training-workflow.md) ou [gerenciamento de modelo](manage/model-library.md). Para terminologia comum, abra o [glossário](../reference/glossary.md).

## O que é executado localmente

O inicializador inicia um serviço local na porta 6969 por padrão. A conversão e o treinamento de arquivos usam arquivos de modelo local. Baixar modelos, atualizar o aplicativo e usar o Edge TTS requerem conectividade. Para geração de fala offline, escolha uma voz do Windows instalada. O navegador também está vinculado ao ciclo de vida do serviço nesta versão. Conclua ou salve com segurança o trabalho ativo antes de fechar a última guia.

[Controlos de treino](train/training-buttons.md) · [Controlos de inferência](convert/inference-buttons.md) · [Painéis de Other](manage/other-buttons.md)
