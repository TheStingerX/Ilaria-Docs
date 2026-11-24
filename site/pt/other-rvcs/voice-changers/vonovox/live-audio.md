# Rotear e sintonizar Vonovox

## Configurar a rota

Use três pontos de extremidade: seu microfone físico para entrada, um cabo virtual para o sinal convertido e fones de ouvido para monitoramento. Um cabo virtual possui um lado de reprodução para o aplicativo que envia o áudio e um lado de gravação para o aplicativo que o recebe. Alguns drivers mostram o mesmo nome de linha em ambos os lados.

1. No Vonovox, defina **Dispositivo de entrada** para o microfone físico. Defina **Dispositivo de saída** para a linha virtual listada em dispositivos de reprodução do Windows.
2. No aplicativo de recepção, selecione a linha correspondente nas configurações do microfone. Evite deixar o aplicativo em **Padrão** se ele selecionar o microfone físico. Mantenha a saída do alto-falante do aplicativo receptor definida para seus fones de ouvido.
3. Para ouvir localmente, abra **Configurações → Sistema → Som → Mais configurações de som → Gravação**. Abra as propriedades do ponto final de gravação do cabo, selecione **Ouvir este dispositivo** e envie a reprodução para fones de ouvido. Desligue a escuta se você já monitora por meio de outro aplicativo.
4. Teste no aplicativo receptor com gravação privada ou teste de microfone. Diga uma frase normal, espere calmamente e depois diga uma frase mais alta. Verifique se a gravação contém a voz convertida, pausas limpas e nenhuma segunda cópia do seu microfone bruto.

O desenvolvedor usa uma rota de áudio de 48 kHz. Se o seu microfone e driver virtual expõem essa taxa, defina os formatos dos dispositivos para 48 kHz. Este formato de dispositivo é separado da taxa de treinamento do modelo.

## Sintonize em uma ordem repetível

| Sintoma | Mude para o teste primeiro |
| --- | --- |
| Estalos ou sílabas faltando | Aumente o **Tamanho do bloco** um passo e repita a mesma frase. |
| Áudio limpo com muito atraso | Reduza o **Tamanho do bloco** em um passo. Restaure o último valor limpo se houver perda de áudio. |
| Sussurrar ou cantar desaparece | Desative **RNNoise** e **VAD Noise Reduction** se ativados e verifique quaisquer portas de voz a jusante. |
| O som local está claro, mas o áudio enviado está silencioso. | Verifique se o aplicativo receptor está ouvindo o ponto final de gravação do cabo. |
| A voz se repete ou ecoa. | Desative o monitoramento duplicado e certifique-se de que a saída da chamada seja roteada diretamente para os fones de ouvido. |
| O áudio é interrompido apenas durante o jogo. | Teste sob a carga normal do jogo. Dê espaço à GPU do conversor ou aumente o tamanho do bloco. |

Mantenha-se atento à sua predefinição para o primeiro teste. Altere-o somente depois de encontrar um tamanho de bloco estável. Ajuste o tom e o formante de forma independente, pausando entre as alterações para que os artefatos resultantes sejam mais fáceis de isolar. Ao testar a reprodução de arquivos em tempo real, verifique a fonte ativa na IU antes de retomar o uso do microfone. Um arquivo reproduzido pode substituir temporariamente o microfone físico.

## Guia de cabo virtual do Windows

> **Correct Audio Routing**
>
> **1. Dentro do Voice Changer**
> - **Input Device:** Seu microfone físico.
> - **Output Device:** `Line 1` (VAC, recomendado) ou `CABLE Input` (VB-CABLE).
>
> **2. No Discord, Jogos, OBS ou outros aplicativos**
> - **Input Device:** `Line 1` (VAC, recomendado) ou `CABLE Output` (VB-CABLE).
> - **Output Device:** Seus fones de ouvido (fortemente recomendados em vez de caixas de som).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> O áudio recebido do Discord, do jogo ou de outros apps deve ir diretamente para os **fones de ouvido** (nunca de volta para o cabo virtual).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) é sempre recomendado. Se você também (ou só) usa **VB-CABLE**, lembre-se de que o voice changer envia para **`CABLE Input`** e o Discord / jogos recebem de **`CABLE Output`**.
> - **Caixas de som e vazamento do fone:** Evite usar caixas de som; o som pode vazar para o microfone e causar áudio duplo, eco ou até converter a voz de outras pessoas. Isso também pode acontecer com headsets se estiverem altos demais ou não forem fechados e isolados o suficiente.
> - **Monitoramento:** Ouvir sua própria voz convertida nos fones é um recurso opcional separado, para ativar apenas quando necessário. Evite caminhos de áudio duplicados, eco e loopback.

### Escolha VAC Lite ou VB-CABLE

**VAC Lite é a primeira escolha recomendada para Vonovox.** Esta também é a preferência na configuração do Windows do projeto Vonovox. Use [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) se você estiver começando do zero. [VB-CABLE](https://vb-audio.com/Cable/) é uma alternativa utilizável se já estiver instalado ou funcionar melhor com sua configuração de áudio específica. Instale um driver primeiro para que a lista de dispositivos seja fácil de seguir.

Após instalar o driver, reabra o conversor e o aplicativo de chamada ou gravação para que possam ver os novos terminais de áudio. Reinicie o Windows se solicitado pelo instalador. Os exemplos de nomes abaixo podem incluir um nome de driver ou um sufixo de numeração.

| Driver | Saída do conversor (ponto final de reprodução) | Discord, OBS, jogos ou outras aplicações (dispositivo de gravação) |
| --- | --- | --- |
| VAC Lite | **Linha 1** em Reprodução | **Linha 1** em Gravação |
| VB-CABLE | **CABLE Input** | **CABLE Output** |

### Conecte os quatro dispositivos corretamente

1. No trocador de voz, defina **entrada** para seu microfone físico. Fale para confirmar os movimentos do medidor de entrada.
2. No trocador de voz, defina **saída** para o ponto final de reprodução do cabo escolhido. Mantenha o conversor funcionando.
3. No Discord, selecione o ponto final de gravação correspondente em **Voz e Vídeo → Dispositivo de entrada**. No OBS, adicione uma fonte **Captura de entrada de áudio** para esse endpoint de gravação. Silencie qualquer fonte de microfone duplicada durante o teste.
4. Defina a reprodução do Discord ou do Windows para seus fones de ouvido. Mantenha os sons do sistema e a voz da outra pessoa fora do cabo. Grave ou use o teste de microfone do aplicativo de destino para confirmar o que realmente chega até ele.

### Monitore brevemente e verifique o formato do áudio

Abra **Configurações → Sistema → Som → Mais configurações de som → Gravação**. Escolha o ponto final de gravação do cabo, abra **Propriedades → Ouvir**, ative **Ouvir este dispositivo** e selecione fones de ouvido para reprodução. Teste em volume baixo. Se o conversor ou OBS já fornece monitoramento, use um monitor por vez para evitar eco. Você pode desligar a escuta do Windows após o teste e continuar enviando o cabo para o destino.

Para Vonovox, comece com o modo compartilhado WASAPI, quando disponível. Use 48 kHz nos terminais do microfone e do cabo, se eles suportarem. O formato do dispositivo Windows é separado da taxa de treinamento do modelo. Se o dispositivo só puder usar um formato compatível diferente, teste a rota real antes de alterar outras configurações.

### Descubra qual link da cadeia falhou

| O que acontece | Primeira verificação |
| --- | --- |
| Nada se move no Vonovox | Verifique a permissão do microfone do Windows e a entrada física do microfone. |
| Vonovox recebe seu microfone, mas o cabo não tem sinal | Verifique se a conversão está em execução e se a saída do conversor é o ponto final de reprodução do cabo. |
| O cabo tem sinal, mas o Discord envia o microfone bruto. | Selecione o ponto final de gravação do cabo explicitamente no aplicativo de chamada. |
| Você ouve sua voz duas vezes | Desative o monitoramento duplicado e verifique se o microfone físico não foi capturado separadamente. |
| As vozes de outras pessoas retornam como um eco. | Direcione a saída da chamada para fones de ouvido e remova a área de trabalho ou o áudio da chamada do cabo. |
| O áudio soa bem até o PC estar sob carga. | Restaure o buffer padrão ou aumente-o e teste com o jogo ou aplicativo de streaming em execução. |
| As sílabas desaparecem quando você sussurra ou canta. | Teste com detecção de atividade de voz e supressão de ruído desativadas, uma de cada vez. |

Ajuste **Tamanho do bloco** depois que a rota completa funcionar. Abaixe um passo e repita a mesma frase. Se você receber cliques ou palavras faltantes, restaure o último valor limpo. Deixe o lookahead e outros efeitos em seus padrões até que você tenha uma linha de base estável.

> **Opcional:** Notas picos de GPU Delay numa placa NVIDIA compatível? Consulta [Otimização avançada de desempenho: NVIDIA GPU Clock Locking](advanced-performance-optimization.md).
