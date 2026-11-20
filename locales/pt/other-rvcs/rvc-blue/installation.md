---
label: "Instale e use RVC Blue"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/rvc-blue/installation/
description: "RVC Blue é um trocador de voz para desktop do Windows baseado na GUI em tempo real da RVC WebUI (Mainline - Original RVC). Ele converte microfone, arquivo..."
---
# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

RVC Blue é um trocador de voz para desktop do Windows baseado na GUI em tempo real da RVC WebUI (Mainline - Original RVC). Ele converte microfone, arquivo de áudio e áudio de aplicativos Windows suportados em tempo real. Os modelos são treinados em um aplicativo separado. A entrada do arquivo passa pelo mecanismo ao vivo e pode ser gravada em WAV.

## Instale o pacote do Windows

1. Verifique o modelo da sua GPU NVIDIA em **Gerenciador de Tarefas → Desempenho**. Abra [downloads RVC Blue](https://huggingface.co/niel-blue/RVC-Realtime-GUI) e escolha o pacote para o seu hardware. O projeto fornece um pacote padrão **CUDA 12.8**, incluindo suporte Blackwell e um pacote de compatibilidade **CUDA 11.8**. Use um driver compatível com a compilação selecionada.
2. Extraia todo o arquivo em uma pasta local gravável. Python, PyTorch, FFmpeg e os recursos de inferência necessários vêm com o pacote.
3. Para CUDA 12.8, execute `RVC-Realtime-GUI-CUDA128.bat` dessa pasta. Para CUDA 11.8, use o inicializador incluído. Aguarde a primeira inicialização terminar de carregar o tempo de execução da GPU.
4. Comece com a voz incluída ou coloque sua própria inferência `.pth` e seu índice correspondente em uma pasta por modelo em `models/`. Por exemplo, coloque `MyVoice.pth` e `added_MyVoice.index` dentro de `models/MyVoice/`. O nome da pasta aparece na lista de modelos. Atualize ou reabra o aplicativo após adicionar um modelo.

## Teste a voz localmente

Escolha seu microfone físico como entrada. Selecione fones de ouvido para monitoramento, escolha uma voz e clique em **Iniciar**. Fale uma frase curta e faça uma pausa. Mantenha as configurações padrão de buffer e pitch para o primeiro teste. O aplicativo permite dispositivos independentes de entrada, saída e monitoramento. Comece com WASAPI se você não usa hardware ASIO. Se você usa ASIO nativo, comece com o buffer recomendado do driver.

## Direcione o áudio para um jogo ou chamada

Escolha o terminal de reprodução do cabo virtual como saída do conversor. No aplicativo de destino, selecione o ponto final da gravação como microfone. Mantenha a reprodução de jogos ou chamadas em seus fones de ouvido. **VAC Lite** e **VB-CABLE** são opções. Verifique os nomes dos dispositivos no [passo a passo do cabo virtual](../vonovox/live-audio.md). Faça uma breve gravação local no destino antes de entrar em uma chamada.

## Use um arquivo ou outro aplicativo como entrada

Para um arquivo de áudio, selecione o modo de entrada do arquivo e teste um WAV curto. Escolha uma saída e monitore o dispositivo antes de começar. Use os controles de gravação para salvar a saída WAV. O aplicativo também expõe opções para registrar a entrada e a saída de forma independente ou em um layout combinado.

Em compilações que incluem captura de aplicativo, alterne a fonte de entrada para um aplicativo, atualize a lista e selecione o aplicativo que está reproduzindo áudio. Isso usa a captura de áudio por processo do Windows. A saída ASIO direta pode ignorar o caminho de captura. O áudio original do aplicativo permanece audível, a menos que você ajuste sua reprodução separadamente.

## Solucionar problemas do primeiro teste

| Sintoma | O que verificar |
| --- | --- |
| O programa fecha durante a inicialização | Execute o inicializador incluído na pasta extraída e leia o primeiro erro. Verifique a compilação CUDA selecionada e o driver NVIDIA. |
| Uma nova voz não aparece | Verifique a pasta por modelo e atualize a lista de modelos. Use uma exportação de inferência em vez de um ponto de verificação de treinamento. |
| Os fones de ouvido funcionam, mas o Discord ou o jogo está silencioso. | Selecione o ponto final de gravação do cabo virtual no destino. Verifique a saída do conversor separadamente. |
| Você ouve duas vozes | Verifique se o aplicativo original ainda é audível ou se duas rotas de monitoramento estão ativas. |
| O áudio é cortado sob carga. | Restaure o buffer padrão ou aumente-o ligeiramente. Repita o teste enquanto o outro aplicativo estiver em execução. |

[Fonte do projeto e notas de lançamento](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
