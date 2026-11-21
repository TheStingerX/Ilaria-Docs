# Escolha um aplicativo RVC

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Também podes usar o Ilaria RVC no Kaggle com a GPU remota, mesmo que o teu computador não tenha uma GPU NVIDIA. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Para os procedimentos completos de instalação, configuração e resolução de problemas, consulta os [guias passo a passo de cada aplicação](../other-rvcs/app-guides.md).

Comece com o que você deseja fazer. Um **trocador de voz ao vivo** processa um fluxo de microfone enquanto você fala. Um **conversor de arquivo** processa uma gravação e salva a saída para edição ou exportação. Um **treinador** transforma um conjunto de dados das gravações de um palestrante em um modelo. Alguns aplicativos oferecem todos os três fluxos de trabalho. A compilação que você instala determina quais hardware gráfico e formatos de modelo você pode usar.

///region app-comparison
| Aplicação | Training | Inferência (ficheiros) | Realtime | Ligações do projeto |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Sim | Sim | Não | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
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
///endregion

## Vonovox (recomendado para uso NVIDIA ao vivo)

> **Versão mais recente (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

Vonovox é um trocador de voz em tempo real do Windows que carrega modelos RVC v2 e usa NVIDIA CUDA. Escolha-o se o seu objetivo principal for a conversão do microfone e você tiver uma placa NVIDIA compatível. A lista de pacotes inclui compilações e patches para gerações específicas de GPU, portanto, verifique os nomes dos arquivos e as instruções de lançamento antes de escolher um arquivo. Use o repositório Hugging Face do editor para downloads. [Downloads oficiais do Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Hardware Vonovox e notas de configuração](https://github.com/dr87/Vonovox/blob/main/README.md)

Para uma primeira execução, carregue sua voz RVC v2 e ouça um breve teste de microfone antes de direcionar o áudio para outro aplicativo. Em seguida, diminua o tamanho do bloco gradualmente enquanto fala normalmente. Restaure a configuração anterior se você ouvir interrupções ou sílabas cortadas. Teste novamente junto com o jogo ou aplicativo de streaming que você planeja usar, pois ambos compartilham a mesma GPU. [Configuração de áudio Vonovox](https://github.com/dr87/Vonovox/blob/main/README.md)

## w-okada VCClient

VCClient lida com a conversão de voz ao vivo com um cliente e um servidor. Você pode executá-los juntos em uma máquina ou colocar o servidor em uma segunda máquina para afastar a carga de trabalho de conversão do computador principal. Selecione uma versão que suporte o modelo RVC que você deseja carregar. Os downloads mantidos estão disponíveis no Hugging Face, e o README em inglês do projeto explica o padrão do Windows, Windows CUDA, Apple Silicon e opções do Linux. [README do VCClient em inglês](https://github.com/w-okada/voice-changer/blob/master/README_en.md) · [Downloads oficiais do VCClient](https://huggingface.co/wok000/vcclient000/tree/main)

Verifique o formato do modelo e também o acelerador. Por exemplo, as instruções mais antigas do Windows v1 do projeto limitam a aceleração de GPU AMD e Intel aos modelos ONNX. Um arquivo PyTorch `.pth` e um arquivo `.onnx` exportado podem ter caminhos de hardware diferentes no mesmo aplicativo. O padrão v2 do Windows documenta opções de DirectML e CPU. [Notas de construção e formato de modelo do VCClient](https://github.com/w-okada/voice-changer/blob/master/README_en.md)

## Okada TG Developed Fork (TGR)

O projeto `tg-develop/voice-changer` é uma bifurcação comunitária na família w-okada através da bifurcação deiteris. Ele se concentra em RVC ao vivo e documenta compilações separadas do Windows para NVIDIA CUDA e para DirectML em hardware AMD ou Intel compatível. Sua documentação também cobre o uso de CPU, Linux e compilações experimentais de macOS para Apple Silicon e Intel. [Configuração do TGR e requisitos do sistema](https://github.com/tg-develop/voice-changer) · [Versões do TGR](https://github.com/tg-develop/voice-changer/releases)

No Windows, use as instruções da compilação que você baixou. A compilação DirectML expõe uma lista diferente de extratores de pitch da compilação NVIDIA, portanto, as predefinições da edição CUDA podem precisar de ajustes. Compare a estabilidade do áudio com seus aplicativos normais em execução antes de confiar na configuração para uma gravação ou transmissão.

## Ilaria RVC

O pacote atual do Windows é apenas NVIDIA. Use-o quando quiser alternar entre conversão de gravações, geração de fala, treinamento, verificação de metadados de um modelo e inspeção de formas de onda ou espectrogramas no Analisador de Áudio. As instalações existentes podem verificar atualizações em **Outros → Atualizar Ilaria RVC**. [Downloads de Ilaria RVC](https://huggingface.co/TheStinger/Ilaria_RVC) · [README do projeto e notas de lançamento](https://github.com/TheStingerX/Ilaria-RVC)

## GUI RVC

A GUI RVC do Tiger14n é uma interface de desktop independente para conversão de arquivos de áudio. Ele pode importar um ZIP contendo a inferência `.pth` e sua correspondência `.index` quando disponível. Seu repositório está arquivado, portanto, use suas instruções para um fluxo de trabalho que exija especificamente este aplicativo. A **GUI em tempo real** do projeto RVC upstream é um iniciador separado. [Repositório e configuração da GUI RVC](https://github.com/Tiger14n/RVC-GUI)

## Applio

Applio suporta gerenciamento de modelo de voz RVC, conversão de arquivos, treinamento e tempo real. Suas edições Desktop e Python/Gradio possuem diferentes fluxos de configuração. Os documentos da área de trabalho identificam NVIDIA CUDA, configurações AMD compatíveis e Apple MPS e explicam como verificar o status do mecanismo após a instalação. Use as [etapas de conversão do Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) para sua edição.

## Interface Web RVC

WebUI de conversão de voz baseada em recuperação é o projeto RVC upstream. Sua WebUI lida com treinamento e inferência de arquivos. A GUI em tempo real do projeto possui seu próprio inicializador. A ramificação principal documenta dependências CUDA separadas para placas NVIDIA mais novas e mais antigas, além de um conjunto de dependências de CPU para sistemas AMD e Intel. No Windows, o DirectML pode estar disponível para operações suportadas. Siga as [etapas de conversão da linha principal](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) para o pacote Windows.

## Redpanda-vc

Redpanda-vc é um fork do Applio cuja interface em tempo real suporta RVC, Beatrice e Rectified Flow. Ele oferece diversas famílias de modelos, portanto selecione o fluxo de trabalho RVC para uma voz RVC. No modo de navegador em tempo real, o projeto documenta a atribuição de fluxos a GPUs específicas e observa que Beatrice é executado na CPU. Essas opções de recursos se aplicam ao Redpanda-vc e ao mecanismo selecionado. [Repositório Redpanda-vc e mecanismos suportados](https://github.com/redpanda343/Redpanda-vc)

## Compare aplicativos com a mesma voz

1. Escolha o pacote para seu sistema operacional, GPU e formato de modelo. Verifique se o aplicativo oferece suporte à geração RVC e ao codificador de recursos do seu modelo.
2. Comece com a mesma gravação curta ou repita as mesmas frases no microfone. Carregue o mesmo modelo de inferência e seu índice correspondente em ambos os aplicativos, se houver suporte.
3. Use a mesma mudança de tom e desative os efeitos de voz opcionais para a primeira comparação. Julgue palavras claras, tom estável e pausas naturais antes de ajustar o som.
4. Para uso ao vivo, execute o aplicativo de jogo, chamada ou streaming que você normalmente usa e grave a saída roteada por pelo menos um minuto. Ouça lacunas, cortes bruscos e áudio atrasado antes de reduzir o buffer.

## Replay

[Site oficial](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers)

Após o encerramento do Weights.gg, o Replay deixou de receber suporte e atualizações. A [página oficial do Replay](https://www.weights.com/replay) pode deixar de estar disponível a qualquer momento. O Internet Archive conserva os instaladores do Replay 8.7.0. O Replay é desaconselhado para novas instalações. Com o encerramento da Weights, é provável que o instalador arquivado já não consiga descarregar os ficheiros necessários e que a instalação não seja concluída.

[Instaladores arquivados · Replay 8.7.0](https://archive.org/details/replay-8.7.0-installers)
