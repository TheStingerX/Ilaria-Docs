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

[Instalar Vonovox](vonovox/installation.md) · [Configurar Vonovox](vonovox/live-audio.md) · [Instalar Okada TG Developed Fork](tgr/installation.md) · [Configurar TGR](tgr/live-audio.md)

## Outras tarefas com o Applio ou Redpanda-vc

O Applio permite sintetizar fala e gerir modelos. Usa o Redpanda-vc para comparar RVC, Beatrice e Rectified Flow ou testar o modo em tempo real no navegador ou na aplicação de ambiente de trabalho. Para um modelo RVC, seleciona o motor RVC.

[Instalar Applio](applio/installation.md) · [Síntese de fala no Applio](applio/tts.md) · [Modelos no Applio](applio/models.md) · [Configurar Redpanda-vc](redpanda/first-run.md) · [Tempo real no Redpanda-vc](redpanda/live-audio.md)

## Guardar uma referência para os testes

Compara ficheiros com a mesma fonte e o mesmo volume. No modo em tempo real, grava um teste na aplicação de destino. Se a falha só ocorrer nessa aplicação, verifica o cabo virtual, o microfone selecionado e a monitorização.

## Outras aplicações e compatibilidade

| Aplicação | Training | Inferência (ficheiros) | Realtime | Ligações do projeto |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Sim | Sim | Sim · Herdado do RVC WebUI (Mainline - Original RVC), sem atualizações futuras | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Sim | Sim | Sim · Lançador separado | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/applio/installation.md) | Sim | Sim | Sim | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Sim | Sim | Sim | [GitHub](https://github.com/redpanda343/Redpanda-vc) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Não | Sim | Não | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Não | Não | Sim | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Não | Não | Sim | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Não | Não | Sim | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Não | Ficheiros em tempo real | Sim | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../reference/tools.md#replay) | Sim | Sim · versão antiga | Não | [Site oficial](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

 | Aplicativo | Quando usá-lo | Notas de hardware e construção |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Conversão de arquivos, TTS, treinamento e análise de áudio | A distribuição atual do Windows é apenas NVIDIA. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Treinamento e inferência upstream, com um iniciador em tempo real separado | NVIDIA CUDA no Windows e Ubuntu. A configuração upstream da CPU cobre sistemas AMD e Intel, com possível uso de DirectML no Windows. |
| [Applio](../other-rvcs/applio/installation.md) | Conversão de arquivos, treinamento e tempo real em um aplicativo | A documentação do desktop lista NVIDIA CUDA, configurações AMD compatíveis e Apple MPS. A disponibilidade depende da edição e do motor. |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Um fork do Applio para experimentar vários mecanismos de conversão de voz | O repositório inclui um contêiner CUDA e documenta a seleção de GPU para fluxos WebUI. Verifique o mecanismo selecionado e construa para outros back-ends. |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Conversão simples de arquivos locais na interface de desktop herdada | Arquivado. O projeto documenta o Windows NVIDIA CUDA e uma solução alternativa histórica do Apple Silicon. |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Recomendado para RVC v2 ao vivo no Windows com NVIDIA | Apenas NVIDIA CUDA. Combine o pacote Hugging Face com a geração da sua GPU. |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Conversão ao vivo em vários sistemas operacionais | Windows CUDA e pacotes padrão, incluindo DirectML ou CPU quando houver suporte. Caminhos de configuração separados do Apple Silicon e do Linux. |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Live RVC com opções documentadas para usuários de AMD, Intel e CPU | Windows CUDA ou DirectML. As compilações experimentais do Linux e do macOS têm instruções separadas. |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Conversão de voz em tempo real no Windows | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../reference/tools.md#replay) | Treino de modelos e conversão de ficheiros · desaconselhado | [Instaladores arquivados](https://archive.org/details/replay-8.7.0-installers) |

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Comparar todas as aplicações](../reference/tools.md)
