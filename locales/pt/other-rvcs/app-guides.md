---
label: "Guias por aplicativo"
icon: ":books:"
order: 80
permalink: /ilaria-rvc/app-guides/
description: "Usa Ilaria RVC para treinar modelos e converter gravações."
---
# Guias passo a passo por aplicativo

<div role="group" aria-label="O que queres fazer?" style="margin:1.4rem 0 2rem;padding:1rem;border:1px solid #db78a888;border-radius:1rem;background:#db78a810">
  <p style="margin:0 0 .85rem;text-align:center;font-weight:700">O que queres fazer?</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.65rem">
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Treino ou conversão de ficheiros</strong><br><span aria-hidden="true">↓</span> <a href="../installation/">Ilaria RVC</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Microfone em tempo real</strong><br>NVIDIA <span aria-hidden="true">→</span> <a href="../vonovox/installation/">Vonovox</a><br>AMD / Intel <span aria-hidden="true">→</span> <a href="../tgr/installation/">Okada TG Developed Fork</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Outras tarefas</strong><br><span aria-hidden="true">↓</span> <a href="../applio/installation/">Applio</a> · <a href="../redpanda/first-run/">Redpanda-vc</a></div>
  </div>
</div>

## Escolher consoante a tarefa e a placa gráfica

Usa **Ilaria RVC** para treinar modelos e converter gravações. Para o microfone em tempo real no Windows, escolhe **Vonovox** com NVIDIA ou **Okada TG Developed Fork** com AMD ou Intel compatível. Para outras tarefas, começa pelo **Applio** ou **Redpanda-vc**.

[Instalar Ilaria RVC](../ilaria-rvc/install/installation.md) · [GPU compatíveis](../ilaria-rvc/install/gpu-compatibility.md) · [Usar o Kaggle](../ilaria-rvc/cloud/kaggle.md)

## Treinar um modelo com o Ilaria RVC

Prepara gravações limpas de uma só pessoa. Pré-processa os ficheiros, extrai as características e inicia o treino. Compara vários checkpoints com os mesmos excertos de teste. Se criares um índice, guarda-o com o modelo correspondente.

[Preparar os dados](../ilaria-rvc/train/datasets.md) · [Procedimento de treino](../ilaria-rvc/train/training-workflow.md) · [Opções de treino](../ilaria-rvc/train/training-controls.md)

## Converter ficheiros com o Ilaria RVC

Importa o `.pth` de inferência e junta o `.index` correspondente, se o tiveres. Converte um WAV curto sem efeitos. Guarda o resultado de referência e muda uma opção de cada vez. Testa vários excertos antes da conversão em lote. Usa o Kaggle se não tiveres uma GPU local adequada.

[Inferência individual e em lote](../ilaria-rvc/convert/inference.md) · [Opções de inferência](../ilaria-rvc/convert/inference-buttons.md)

## Converter o microfone em tempo real

Com NVIDIA, escolhe o pacote Vonovox adequado à tua GPU. Com AMD ou Intel compatível, experimenta a versão DirectML do TGR. Testa primeiro com auscultadores e envia o resultado para um cabo virtual. Seleciona o lado de gravação desse cabo como microfone no Discord, OBS ou num jogo. Se houver cortes, aumenta o tamanho do buffer.

[Instalar Vonovox](voice-changers/vonovox/installation.md) · [Configurar Vonovox](voice-changers/vonovox/live-audio.md) · [Instalar Okada TG Developed Fork](voice-changers/tgr/installation.md) · [Configurar TGR](voice-changers/tgr/live-audio.md)

## Outras tarefas com o Applio ou Redpanda-vc

Escolhe o Applio para síntese de fala e gestão de modelos. O Redpanda VC oferece treino, inferência por ficheiros e conversão em tempo real para RVC e Causal Voice Changer, na aplicação de desktop e na WebUI. Usa `.pth` com RVC e `.cvc` com CVC.

[Instalar Applio](training/applio/installation.md) · [Síntese de fala no Applio](training/applio/tts.md) · [Modelos no Applio](training/applio/models.md) · [Configurar Redpanda-vc](training/redpanda/first-run.md) · [Tempo real no Redpanda-vc](training/redpanda/live-audio.md)

## Guardar uma referência para os testes

Compara ficheiros com a mesma fonte e o mesmo volume. No modo em tempo real, grava um teste na aplicação de destino. Se a falha só ocorrer nessa aplicação, verifica o cabo virtual, o microfone selecionado e a monitorização.

## Treino e inferência

| Aplicação | Funcionalidades | Hardware / notas | Guias |
| --- | --- | --- | --- |
| **Ilaria RVC** | Treino, inferência simples/em lote, TTS, analisador de áudio | NVIDIA CUDA (Windows) / Kaggle | [Instalação](../ilaria-rvc/install/installation.md) · [Inferência](../ilaria-rvc/convert/inference.md) · [Treino](../ilaria-rvc/train/training-workflow.md) |
| **Applio** | Treino, inferência de ficheiros, TTS, biblioteca de modelos, tempo real | NVIDIA CUDA, AMD ROCm, Apple MPS | [Instalação](training/applio/installation.md) · [Inferência](training/applio/inference.md) · [Treino](training/applio/training.md) |
| **RVC WebUI (Mainline - Original RVC)** | Treino e inferência de ficheiros originais (+ módulo ao vivo separado) | NVIDIA CUDA, CPU / DirectML | [Instalação](training/mainline/installation.md) · [Inferência](training/mainline/inference.md) · [Treino](training/mainline/training.md) |
| **Redpanda-vc** | Treino, inferência de ficheiros e tempo real para RVC + Causal Voice Changer | NVIDIA CUDA / CPU (Desktop e WebUI) | [Primeiro arranque](training/redpanda/first-run.md) · [Inferência](training/redpanda/inference.md) · [Treino](training/redpanda/training.md) |
| **RVC Model Merger** | Utilitário para combinar modelos RVC `.pth` | Utilitário offline | [Utilização](rvc-model-merger/usage.md) |

### Legado / Desaconselhadas

!!!warning Software antigo · Desaconselhado
Estes projetos estão desatualizados, arquivados ou sem manutenção ativa. Os guias mantêm-se disponíveis para projetos existentes. Para uma nova instalação, escolhe uma aplicação com manutenção acima.
!!!

| Aplicação | Funcionalidades | Estado / notas | Guias |
| --- | --- | --- | --- |
| **rvc-cli** | Inferência de ficheiros/lotes e treino (CLI) | Arquivado | [Instalação](training/rvc-cli/installation.md) · [Utilização](training/rvc-cli/usage.md) |
| **RVC Studio** | Treino e inferência de ficheiros (WebUI) | Inativo | [Instalação](training/rvc-studio/installation.md) · [Utilização](training/rvc-studio/usage.md) |
| **Mangio RVC Fork** | Treino e inferência de ficheiros | Inativo | [Instalação](training/mangio/installation.md) · [Utilização](training/mangio/usage.md) |
| **Replay** | Treino e conversão de ficheiros | Descontinuado (Weights.gg encerrado) | [Instalação](training/replay/installation.md) · [Utilização](training/replay/usage.md) |
| **AICoverGen** | Pipeline RVC v2 para covers musicais (apenas inferência, WebUI / CLI / Colab) | Sem manutenção | [Instalação](training/aicovergen/installation.md) · [Utilização](training/aicovergen/usage.md) |
| **RVC GUI** | Apenas conversão de ficheiros em ambiente de trabalho | Arquivado | [Conversão de ficheiros](voice-changers/rvc-gui/file-conversion.md) |

## Alteradores de voz (tempo real)

| Aplicação | Motor / foco | Hardware / notas | Guias |
| --- | --- | --- | --- |
| **Vonovox** | RVC v2 em tempo real (recomendado em Windows NVIDIA) | NVIDIA CUDA | [Instalação](voice-changers/vonovox/installation.md) · [Áudio ao vivo](voice-changers/vonovox/live-audio.md) · [Desempenho](voice-changers/vonovox/advanced-performance-optimization.md) |
| **w-okada VCClient** | RVC em tempo real multiplataforma (cliente/servidor) | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Instalação](voice-changers/okada/installation.md) · [Áudio ao vivo](voice-changers/okada/live-audio.md) |
| **Okada TG Developed Fork (TGR)** | Fork comunitário ativo para RVC em tempo real | NVIDIA CUDA, DirectML (AMD/Intel), CPU, Linux, macOS exp. | [Instalação](voice-changers/tgr/installation.md) · [Áudio ao vivo](voice-changers/tgr/live-audio.md) · [Cloud](voice-changers/tgr/cloud.md) |
| **Deiteris w-okada Fork** | Fork w-okada em tempo real | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Instalação](voice-changers/deiteris/installation.md) · [Áudio ao vivo](voice-changers/deiteris/live-audio.md) · [Cloud](voice-changers/deiteris/cloud.md) |
| **RVC Blue** | Aplicação Windows em tempo real e entrada de ficheiros em tempo real | NVIDIA CUDA 12.8 / 11.8 | [Instalação](voice-changers/rvc-blue/installation.md) |

Aplicações RVC multimodo com suporte em tempo real integrado: **Applio** ([Tempo real](training/applio/realtime.md)), **Redpanda-vc** ([Modos ao vivo](training/redpanda/live-audio.md)) e **RVC WebUI (Mainline)** ([Tempo real](training/mainline/realtime.md)).

### Alteradores de voz Non-RVC em tempo real

| Aplicação | Funcionalidades | Guias |
| --- | --- | --- |
| **Causal Voice Changer** | Alterador de voz Non-RVC de baixa latência em tempo real (modelos `.cvc`) | [Visão geral](../non-rvc/voice-changers/causal-voice-changer/overview.md) · [Instalação](../non-rvc/voice-changers/causal-voice-changer/installation.md) · [Tempo real](../non-rvc/voice-changers/causal-voice-changer/realtime.md) |
| **YuneVoix** | Alterador de voz Non-RVC em tempo real, covers e karaoke | [Visão geral](../non-rvc/voice-changers/yunevoix/overview.md) · [Instalação](../non-rvc/voice-changers/yunevoix/installation.md) · [Utilização](../non-rvc/voice-changers/yunevoix/usage.md) |

[Comparar todas as aplicações](../reference/tools.md)
