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

## Outras aplicações e compatibilidade

{{ include "../reference/tools.md#app-comparison" }}

- [RVC WebUI (Mainline - Original RVC)](training/mainline/installation.md) · [w-okada VCClient](voice-changers/okada/installation.md) · [RVC GUI](voice-changers/rvc-gui/file-conversion.md) · [RVC Blue](voice-changers/rvc-blue/installation.md)
- [Comparar todas as aplicações](../reference/tools.md)

## Outras ferramentas RVC

!!!warning Software antigo · Desaconselhado
Estes projetos estão desatualizados e já não parecem ter manutenção ativa. O rvc-cli está arquivado e os ramos principais do RVC Studio e do Mangio RVC Fork estão inativos há vários anos. Os guias continuam disponíveis para projetos existentes. Para uma nova instalação, escolhe uma aplicação com manutenção ativa.
!!!

- [rvc-cli](training/rvc-cli/installation.md)
- [RVC Studio](training/rvc-studio/installation.md)
- [Mangio RVC Fork](training/mangio/installation.md)
- [Replay](training/replay/installation.md)
- [AICoverGen](training/aicovergen/installation.md)
