---
label: "🎙️ Rotear e sintonizar Vonovox"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
---
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
