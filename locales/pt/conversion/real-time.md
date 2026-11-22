---
label: "⚡ Conversão em tempo real"
order: 92
permalink: /real-time/
description: "Para uma gravação ou cover, a conversão de arquivo permite renderizar e comparar várias tomadas."
---
# Conversão de voz em tempo real

Para uma gravação ou cover, a conversão de arquivo permite renderizar e comparar várias tomadas. Em uma configuração ao vivo, o conversor precisa terminar cada bloco de áudio com rapidez suficiente para manter o fluxo do microfone em movimento. Configure primeiro um sinal local confiável e depois conecte-o a um aplicativo de chamada, gravação ou streaming.

## Escolha uma ferramenta para o trabalho

Consulte o [diretório de ferramentas RVC](../reference/tools.md) para downloads e notas de hardware, incluindo Vonovox para GPUs NVIDIA.

 | Ferramenta | Por onde começar |
| --- | --- |
 | Vonovox | Um conversor em tempo real para modelos RVC V2 no Windows com GPU NVIDIA. Baixe uma versão para sua GPU, carregue o modelo e teste seu microfone com fones de ouvido antes de direcionar o sinal convertido para outro aplicativo. [Downloads Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentação do projeto](https://github.com/dr87/Vonovox) |
 | RVC WebUI (Mainline - Original RVC) | O projeto upstream fornece uma WebUI de treinamento e inferência junto com uma GUI dedicada em tempo real. Consulte as instruções de lançamento e inicializador para a plataforma que você usa. |
 | Applio | Suas interfaces Desktop e Gradio possuem fluxos de trabalho próprios em tempo real. Use as instruções de configuração para a interface e versão que você instalou. |
 | w-okada VCClient | Um trocador de voz para uso ao vivo. A disponibilidade do RVC depende da edição de lançamento e da plataforma. Verifique os modelos suportados antes de instalar uma compilação. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
 | Deiteris e Tg-Develop | Forks w-okada independentes com suas próprias construções e configurações. Verifique as notas de lançamento do fork antes de aplicar as instruções para outra edição. [Repositório Deiteris](https://github.com/deiteris/voice-changer) · [Repositório Tg-Develop](https://github.com/tg-develop/voice-changer) |


## Ouça um sinal limpo primeiro

1. Conecte um microfone e fones de ouvido. No conversor, selecione seu microfone físico como entrada e seus fones de ouvido como saída.
2. Carregue um modelo de inferência compatível conhecido e seu índice correspondente se você usar a recuperação. Uma curta [conversão de arquivo](../start/getting-started.md) bem-sucedida é uma referência útil antes de testar o caminho ao vivo.
3. Inicie a transmissão e fale em nível normal. Verifique o medidor de entrada ou faça uma gravação seca. Reduza o ganho de entrada se os picos forem cortados antes da conversão.
4. Verifique se o sinal do fone de ouvido muda quando a conversão é alternada. Se você ouvir o original ao mesmo tempo, verifique o monitoramento direto do hardware ou uma segunda rota através do sistema operacional.
5. Teste mais de uma palavra. Inclua um discurso baixo, uma frase alta e uma pequena pausa. Ouça cortes, desvios ou falhas na mesma carga de trabalho que você planeja usar ao vivo.

Evite ouvir através de alto-falantes próximos a um microfone ativo. Os fones de ouvido ajudam a identificar um problema de roteamento sem realimentar a saída na entrada.

## Enviar áudio convertido para outro aplicativo

> **Correct Audio Routing**
>
> **1. Dentro do Voice Changer**
> - **Input Device:** Seu microfone físico.
> - **Output Device:** `Line 1` (VAC, recomendado) ou `CABLE Input` (VB-CABLE).
>
> **2. No Discord, Jogos, OBS ou outros aplicativos**
> - **Input Device:** `Line 1` (VAC, recomendado) ou `CABLE Output` (VB-CABLE).
> - **Output Device:** Seus fones de ouvido ou alto-falantes.
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> O áudio recebido do Discord, do jogo ou de outros apps deve ir diretamente para os **fones de ouvido** (nunca de volta para o cabo virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) é sempre recomendado. Se você também (ou só) usa **VB-CABLE**, lembre-se de que o voice changer envia para **`CABLE Input`** e o Discord / jogos recebem de **`CABLE Output`**.
> - **Monitoramento:** Ouvir sua própria voz convertida nos fones é um recurso opcional separado, para ativar apenas quando necessário. Evite caminhos de áudio duplicados, eco e loopback.

Um dispositivo de áudio virtual fornece um ponto final de reprodução para o conversor e um ponto final de gravação correspondente para o aplicativo receptor. Os nomes dos terminais dependem do driver. Por exemplo, um cabo virtual pode chamar seu terminal de reprodução de “Entrada” e seu terminal de gravação de “Saída” porque as instruções usam a perspectiva do cabo.

```text
Physical microphone → RVC converter → virtual playback endpoint
                                           ↓
                              matching recording endpoint → call or stream
```

Selecione o ponto final de gravação correspondente como o microfone no aplicativo receptor e faça um breve teste de gravação lá. Se o seu monitor local parecer correto, mas a gravação não, verifique a entrada de destino e remova qualquer fonte de microfone duplicada. Se você monitorar o áudio convertido, use uma saída de fone de ouvido separada. Evite direcionar todo o mix da área de trabalho ou o áudio do aplicativo receptor de volta para o conversor.

## Ajuste a latência sem perder estabilidade

O atraso de ponta a ponta inclui buffers de dispositivos, conversão, roteamento virtual e qualquer processamento no destino. Um valor de tempo de processamento no conversor mede apenas parte desse caminho. Capture um teste local do microfone seco e da rota convertida se precisar medir o atraso entre eles.

 | Controle | Ajuste prático |
| --- | --- |
 | Tamanho do bloco ou tamanho do pedaço | Aumente se a fala for interrompida sob carga. Uma vez estável, tente uma configuração menor e mantenha-a apenas se a fala normal permanecer limpa. Blocos menores deixam menos tempo para terminar o processamento. |
 | Crossfade | Aumente com cautela se ouvir junções ásperas entre os blocos. Isso muda a forma como os blocos vizinhos se sobrepõem. |
 | Contexto extra | Tente menos contexto se o conversor ficar para trás. Pode ajudar o modelo a acompanhar as transições, ao custo de mais processamento. |
 | Preditor de pitch | Se uma configuração produzir tempo instável, compare os preditores disponíveis usando as mesmas frases. Selecione aquele que lida com sua faixa de afinação com margem de processamento suficiente. |
 | Detecção de silêncio ou limite de entrada | Reduza um limite que corte as sílabas suaves. Avalie isso durante pausas e fala baixa, não apenas durante uma entrada alta e sustentada. |
 | Taxa do dispositivo | Verifique as taxas de amostragem do dispositivo e do cabo virtual se você ouvir uma velocidade incomum ou estalos. Comece com configurações compatíveis em toda a cadeia. |

Comece com os padrões do aplicativo e altere uma configuração de cada vez. Se um jogo ou outro programa com uso intenso de GPU compartilhar a máquina, repita o teste enquanto ela estiver em execução. Mantenha uma predefinição funcional para que você possa restaurá-la antes de ir ao ar. [GUI principal em tempo real](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Solucione o problema de acordo com onde a falha aparece

 | Sintoma | Verifique primeiro |
| --- | --- |
 | Nem o medidor do conversor nem uma gravação de microfone seco respondem | Verifique o dispositivo de entrada do sistema operacional e a permissão do microfone. |
 | O microfone seco funciona, mas a saída convertida fica silenciosa. | Confirme se o stream foi iniciado, se o modelo foi carregado e se o conversor selecionou a saída correta. Verifique o limite de entrada. |
 | O monitor local funciona, mas a chamada recebe a voz original. | Selecione o ponto final da gravação virtual como o microfone da chamada e desative qualquer fonte de microfone físico separada nesse aplicativo. |
 | Você ouve duas versões da voz. | Silencie as rotas de entrada duplicadas e verifique se o monitor do fone de ouvido está separado da rota virtual. |
 | O áudio estala apenas sob carga. | Retorne ao último tamanho de bloco estável, reduza as cargas de trabalho concorrentes e teste novamente. |
 | Um modelo funciona na conversão de arquivos, mas falha ao vivo | Verifique a edição, arquitetura e suporte do incorporador do cliente ativo. Teste um modelo listado como compatível nesse cliente antes de alterar os dispositivos de áudio. |

[Fundamentos RVC](../start/rvc-fundamentals.md) · [Solução de problemas](../reference/troubleshooting.md)

## RVC Blue

Conversão de voz em tempo real no Windows. [Instalação e configuração](../other-rvcs/rvc-blue/installation.md).
## Funções dos dispositivos e backends de áudio

| Termo | O que é |
| --- | --- |
| **Input Device** | O teu microfone físico que entra no conversor. |
| **Output Device** | Destino da voz convertida (reprodução do cabo virtual para Discord/OBS/jogos, ou auscultadores). |
| **Monitor Device** | Saída opcional para te ouvires nos auscultadores enquanto **Output Device** alimenta o cabo virtual. |
| **Virtual Cable Input** *(Reprodução)* | Aparece em Reprodução (Line 1 / CABLE Input). Define como **Output Device**. |
| **Virtual Cable Output** *(Gravação)* | Aparece em Gravação (Line 1 / CABLE Output). Escolhe como **Microfone** no Discord, OBS ou jogos. |

- **Microfones USB / Interfaces XLR / WASAPI / ASIO:** Alinha tudo a 48000 Hz; usa **WASAPI Shared** por compatibilidade, **WASAPI Exclusive** ou **ASIO** quando suportado.
- **Discord, OBS e Jogos:** Desativa Krisp/cancelamento de eco no Discord se cortar palavras; limita os FPS nos jogos para deixar margem na GPU.
- **Latência de processamento vs. latência total:** O **GPU Delay** mede apenas o tempo GPU por bloco; a **latência ponta a ponta** soma microfone, **Block Size**, cabo virtual e buffers de destino.
