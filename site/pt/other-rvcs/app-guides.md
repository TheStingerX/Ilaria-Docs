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

| Aplicação | Training | Inferência (ficheiros) | Realtime | Ligações do projeto |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Sim | Sim | Não | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/training/mainline/installation.md) | Sim | Sim | Sim · Lançador separado | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/training/applio/installation.md) | Sim | Sim | Sim | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/training/redpanda/first-run.md) | Sim | Sim | Sim | [GitHub](https://github.com/redpanda343/Redpanda-vc) · [Versão pré-compilada para Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/voice-changers/rvc-gui/file-conversion.md) | Não | Sim | Não | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/voice-changers/vonovox/installation.md) | Não | Não | Sim | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/voice-changers/okada/installation.md) | Não | Não | Sim | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/voice-changers/tgr/installation.md) | Não | Não | Sim | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/voice-changers/rvc-blue/installation.md) | Não | Ficheiros em tempo real | Sim | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../other-rvcs/training/replay/installation.md) | Sim | Sim · versão antiga | Não | [Site oficial](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

 | Aplicativo | Quando usá-lo | Notas de hardware e construção |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Conversão de arquivos, TTS, treinamento e análise de áudio | A distribuição atual do Windows é apenas NVIDIA. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/training/mainline/installation.md) | Treinamento e inferência upstream, com um iniciador em tempo real separado | NVIDIA CUDA no Windows e Ubuntu. A configuração upstream da CPU cobre sistemas AMD e Intel, com possível uso de DirectML no Windows. |
| [Applio](../other-rvcs/training/applio/installation.md) | Conversão de arquivos, treinamento e tempo real em um aplicativo | A documentação do desktop lista NVIDIA CUDA, configurações AMD compatíveis e Apple MPS. A disponibilidade depende da edição e do motor. |
| [Redpanda-vc](../other-rvcs/training/redpanda/first-run.md) | RVC + Causal Voice Changer · Tauri / WebUI | NVIDIA CUDA / CPU · [Versão pré-compilada para Windows x64](https://github.com/redpanda343/Redpanda-vc/releases/tag/release) |
| [RVC GUI](../other-rvcs/voice-changers/rvc-gui/file-conversion.md) | Conversão simples de arquivos locais na interface de desktop herdada | Arquivado. O projeto documenta o Windows NVIDIA CUDA e uma solução alternativa histórica do Apple Silicon. |
| [Vonovox](../other-rvcs/voice-changers/vonovox/installation.md) | Recomendado para RVC v2 ao vivo no Windows com NVIDIA | Apenas NVIDIA CUDA. Combine o pacote Hugging Face com a geração da sua GPU. |
| [w-okada VCClient](../other-rvcs/voice-changers/okada/installation.md) | Conversão ao vivo em vários sistemas operacionais | Windows CUDA e pacotes padrão, incluindo DirectML ou CPU quando houver suporte. Caminhos de configuração separados do Apple Silicon e do Linux. |
| [Okada TG Developed Fork](../other-rvcs/voice-changers/tgr/installation.md) | Live RVC com opções documentadas para usuários de AMD, Intel e CPU | Windows CUDA ou DirectML. As compilações experimentais do Linux e do macOS têm instruções separadas. |
| [RVC Blue](../other-rvcs/voice-changers/rvc-blue/installation.md) | Conversão de voz em tempo real no Windows | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../other-rvcs/training/replay/installation.md) | Treino de modelos e conversão de ficheiros · desaconselhado | [Instaladores arquivados](https://archive.org/details/replay-8.7.0-installers) |

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
