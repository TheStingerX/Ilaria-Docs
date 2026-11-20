---
label: "Configure um microfone ao vivo"
icon: ":headphones:"
order: 93
permalink: /ilaria-rvc/applio/realtime/
description: "Prove que seu modelo funciona com um clipe gravado antes de configurar o áudio ao vivo."
---
# Use o Applio com um microfone

> Usa o microfone físico no conversor, envia a saída para o dispositivo de reprodução do cabo e escolhe a entrada de gravação correspondente no Discord ou OBS. Para Vonovox, começa com **VAC Lite** ou usa **VB-CABLE**. Lê o guia completo antes de testar numa chamada. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Prove que seu modelo funciona com [um clipe gravado](inference.md) antes de configurar o áudio ao vivo. Use fones de ouvido para monitoramento para que o microfone não consiga capturar novamente os alto-falantes. Interrompa os trabalhos de treinamento ou conversão de arquivos que usam a mesma GPU.

## Ouça a voz convertida localmente

1. Abra **Tempo Real**. No Desktop, conceda permissão ao microfone quando solicitado e selecione **Dispositivo de entrada** e **Dispositivo de saída**. Atualize a lista se você conectou um dispositivo após abrir o Applio.
2. Use seu microfone físico como entrada e seus fones de ouvido como saída ou monitor para este primeiro teste. No Gradio, escolha os dispositivos em **Dispositivos de Áudio**. Os nomes dos dispositivos PortAudio podem ser diferentes dos nomes do Windows ou dos rótulos mostrados no Desktop.
3. Selecione o modelo testado, seu incorporador correspondente e o índice opcional, se você usá-lo. Inicie o stream e aguarde o estado pronto. No Desktop, ative **Ouça-me** para monitorar e definir um volume confortável.
4. Diga “um, dois, três”, faça uma pausa e repita no seu nível normal de fala. Ouça a voz convertida, faltando sílabas ou cliques. Se você ouvir sua voz inalterada, verifique **Passthrough** e verifique se o microfone está monitorado em outro lugar.

## Direcione-o para seu aplicativo de bate-papo ou streaming.

Assim que o teste do fone de ouvido funcionar, interrompa a transmissão e escolha um cabo de áudio virtual instalado ou dispositivo de sistema operacional equivalente. O cabo virtual possui um terminal que recebe a reprodução e outro que expõe esse sinal como entrada de gravação.

```text
Physical microphone
  → Applio Realtime input
  → virtual cable playback endpoint
  → virtual cable recording endpoint
  → Discord, OBS or your recording application
```

1. Mantenha a entrada do Applio no microfone físico e selecione o terminal de reprodução do cabo como saída.
2. No aplicativo de recepção, selecione o ponto final de gravação do cabo como microfone. Se precisar de monitoramento, use fones de ouvido. Desative os caminhos de monitoramento que enviam o cabo de volta para si mesmo.
3. Inicie o Applio e use o teste de microfone do aplicativo receptor ou faça uma gravação de teste privada. Verifique se ele ouve o sinal convertido. Desative entradas duplicadas de microfone físico se ouvir duas vozes.
4. Se os fones de ouvido soaram corretamente, mas o aplicativo receptor está silencioso, solucione os nomes dos dispositivos, o nível de destino e a seleção de entrada antes de alterar a voz ou o índice.

## Atraso de equilíbrio e estabilidade de áudio

Use o dimensionamento automático de blocos primeiro, quando disponível. Se o áudio for interrompido, aumente **Tamanho do pedaço** e repita exatamente a mesma frase. Pedaços menores podem reduzir o atraso e deixar o motor com menos tempo para terminar cada bloco. **Crossfade Overlap** suaviza junções e **Tamanho de conversão extra** fornece mais contexto com custo computacional. Altere um controle por teste. Mantenha uma configuração estável à qual você possa retornar.

Se inícios silenciosos ou finais de palavras desaparecerem, verifique **VAD** ou **Limite de Silêncio**. Se vogais altas estalarem, verifique o microfone bruto e diminua o ganho de entrada. Se o stream falhar apenas com um determinado jogo ou trabalho de GPU em execução, tente novamente com esse trabalho fechado. Pare o modo ao vivo antes de retornar ao treinamento ou ao trabalho na fila da GPU.
