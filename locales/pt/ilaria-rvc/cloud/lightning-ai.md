---
label: "Lightning AI Studio"
icon: ":zap:"
order: 96
permalink: /pt/ilaria-rvc/lightning-ai/
description: "Execute o Ilaria RVC no navegador com uma GPU fornecida pela plataforma na nuvem. Escolha um notebook abaixo. Ative um acelerador NVIDIA antes de executar a primeira célula."
---
# Lightning AI Studio

[Abrir o notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

Execute o Ilaria RVC no navegador com uma GPU fornecida pela plataforma na nuvem. Escolha um notebook abaixo. Ative um acelerador NVIDIA antes de executar a primeira célula.

## Antes de começar

Prepare um WAV curto e limpo e um modelo de inferência compatível. Para treinamento, mantenha o dataset original e alguns clipes de teste separados no seu próprio computador. O notebook roda em uma máquina Linux remota.

### Créditos, plano gratuito e disponibilidade de GPU

O Lightning AI usa um **modelo de cobrança baseado em créditos** (`1 crédito = $1 USD`, cobrado por segundo de computação GPU; veja [Preços do Lightning AI](https://lightning.ai/pricing)):

- **Plano gratuito:** Inclui **um Studio gratuito de 4 CPUs** (até 4 horas contínuas antes de reiniciar) e **10 GB de armazenamento gratuito** (armazenamento acima de 10 GB é cobrado mensalmente).
- **Créditos iniciais vs. planos pagos:** Novas contas costumam receber créditos iniciais após cadastro/verificação (não são horas gratuitas de GPU renovadas mensalmente). Assinaturas pagas **Pro** fornecem uma cota mensal de créditos.
- **Verifique seu saldo e GPUs:** Abra o painel do Studio / cobrança para conferir seu saldo restante de créditos antes de iniciar uma instância GPU, e lembre-se de que tipos específicos de GPU (como T4, L4 ou L40) estão sujeitos à disponibilidade regional e da conta. Faça primeiro a instalação de dependências no Studio CPU gratuito e mude para GPU apenas quando estiver pronto para rodar inferência ou treinamento.

## Executar no Lightning AI Studio

1. Crie um GPU Studio, envie o notebook e abra-o no JupyterLab.
2. Execute as células 1-4 em ordem. Elas verificam a GPU, instalam dependências, baixam pesos base e iniciam a Web UI. Defina `TRAINING_SAMPLE_RATES` como `[]` apenas para inferência ou selecione as taxas de amostragem em que pretende treinar.
3. Abra o **Port viewer** no seu Studio e selecione a porta exibida pela célula de inicialização (`7865` por padrão). Mantenha a porta privada.

## Verifique cada célula antes de continuar

A verificação de GPU deve identificar um dispositivo NVIDIA. Se não identificar, troque o acelerador primeiro. Aguarde a instalação das dependências terminar antes de baixar os pesos. Defina `TRAINING_SAMPLE_RATES = []` apenas para inferência. Para treinamento, escolha a taxa compatível com seu modelo e par de pré-treinados. Deixe `DOWNLOAD_FCPE` ativado se pretende usar FCPE.

{{ include "kaggle.md#cloud-inference-dataset" }}

{{ include "kaggle.md#cloud-training" }}

## Exportar e parar

Defina `EXPORT = True` e execute a célula de exportação. Ative `INCLUDE_CHECKPOINTS` se precisar retomar o treinamento. Salve o ZIP localmente antes de encerrar a sessão e depois execute a célula de parada com `STOP = True`.

## Se a inicialização falhar

Se a primeira célula não detectar a GPU, verifique seu acelerador e execute-a novamente. Se a interface não abrir, leia a saída da célula de inicialização, confirme que o servidor está pronto e reabra a visualização.

### Verifique o ZIP de saída

Para inferência, confira seu WAV exportado e os arquivos do modelo. Para treinamento, ative `INCLUDE_CHECKPOINTS` para incluir os logs do experimento e verifique o arquivo antes de fechar a sessão. Mantenha o dataset original separadamente.

## Recuperar de problemas comuns

Se a instalação falhar, leia o primeiro erro e execute novamente a célula com falha após corrigi-la. Se o aplicativo abrir mas seu modelo estiver ausente, verifique o log de importação e atualize a lista. Para erros de falta de memória (OOM), comece com um clipe mais curto ou reduza o batch size de treinamento. Se a Web UI fechar, reabra-a pela mesma célula de inicialização ou porta enquanto a sessão ainda estiver ativa.

[Ilaria RVC na nuvem](cloud.md)
