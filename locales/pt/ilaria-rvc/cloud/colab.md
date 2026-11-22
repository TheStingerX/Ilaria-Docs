---
label: "Google Colab"
icon: ":tangerine:"
order: 97
permalink: /ilaria-rvc/colab/
description: "Execute o Ilaria RVC no navegador com uma GPU fornecida pela plataforma na nuvem. Escolha um notebook abaixo. Ative um acelerador NVIDIA antes de executar a primeira célula."
---
# Google Colab

[Abrir o notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

Execute o Ilaria RVC no navegador com uma GPU fornecida pela plataforma na nuvem. Escolha um notebook abaixo. Ative um acelerador NVIDIA antes de executar a primeira célula.

## Antes de começar

Prepare um WAV curto e limpo e um modelo de inferência compatível. Para treinamento, mantenha o dataset original e alguns clipes de teste separados no seu próprio computador. O notebook roda em uma máquina Linux remota.

### Limites, unidades de computação e políticas do Google Colab

Antes de iniciar uma execução longa, entenda como o [Google Colab](https://research.google.com/colaboratory/faq.html) gerencia recursos:

- **Plano gratuito vs. planos pagos (Compute Units):** O plano gratuito do Colab oferece GPUs quando disponíveis, mas a duração da execução, os tempos de espera por inatividade e o tipo de GPU (como T4) são dinâmicos e nunca garantidos. Os planos pagos (**Colab Pro**, **Pro+** e **Pay As You Go**) usam **compute units** consumidas dinamicamente conforme a GPU/TPU selecionada; quando seu saldo acaba, a conta volta aos limites do plano gratuito.
- **Atividades proibidas e restrições de WebUI:** A política de [Atividades Proibidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) do Google proíbe hospedar arquivos, servir aplicações web públicas sem relação com computação interativa, rodar proxies remotos, burlar limites de segurança/acesso, usar várias contas para driblar cotas ou criar deepfakes. Embora notebooks Gradio interativos não sejam proibidos de forma absoluta em todos os cenários, manter túneis WebUI públicos persistentes no plano gratuito costuma acionar desconexões do runtime ou avisos de política.
- **Desconexões, salvamento e privacidade:** O Colab pode desconectar sessões ociosas ou longas e apagar o armazenamento local da VM. Exporte seus resultados (`EXPORT = True`) ou sincronize checkpoints importantes no Google Drive regularmente, e nunca envie áudios confidenciais nem credenciais para notebooks públicos ou compartilhados.
- **Alternativas:** Se o Colab desconectar ou não tiver GPUs disponíveis, use o [Kaggle](kaggle.md) (cota semanal gratuita de GPU após verificação por telefone) ou o [Lightning AI Studio](lightning-ai.md).

## Executar no Google Colab

1. Abra no Colab e selecione um runtime com GPU.
2. Execute as células 1-4 em ordem. Elas verificam a GPU, instalam dependências, baixam pesos base e iniciam a Web UI. Defina `TRAINING_SAMPLE_RATES` como `[]` apenas para inferência ou selecione as taxas de amostragem em que pretende treinar.
3. Abra a visualização incorporada gerada pela célula de inicialização. Mantenha o runtime conectado.

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
