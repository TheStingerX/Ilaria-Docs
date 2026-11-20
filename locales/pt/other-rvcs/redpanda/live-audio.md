---
label: "Teste o áudio ao vivo no Redpanda-vc"
icon: ":studio_microphone:"
order: 98
permalink: /ilaria-rvc/redpanda/live-audio/
description: "O iniciador em tempo real da área de trabalho do Windows usa os dispositivos expostos a esse processo local."
---
# Teste o áudio ao vivo no Redpanda-vc

> Usa o microfone físico no conversor, envia a saída para o dispositivo de reprodução do cabo e escolhe a entrada de gravação correspondente no Discord ou OBS. Para Vonovox, começa com **VAC Lite** ou usa **VB-CABLE**. Lê o guia completo antes de testar numa chamada. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

## Escolha a área de trabalho ou navegador

O iniciador em tempo real da área de trabalho do Windows usa os dispositivos expostos a esse processo local. A guia WebUI em tempo real captura a entrada do microfone por meio do navegador e passa o áudio para o dispositivo de inferência selecionado. Use um caminho para seu primeiro teste e deixe o outro fechado para facilitar o diagnóstico de feedback e trabalhos concorrentes.

1. Carregue um modelo RVC compatível, selecione o incorporador esperado onde exposto e comece em passo neutro com o buffer padrão.
2. Selecione o microfone físico. No modo navegador, conceda permissão de microfone à página local e verifique a fonte real nas permissões do navegador.
3. Conecte fones de ouvido e reproduza o monitor. Diga uma frase curta contendo palavras baixas e altas, seguida de uma pausa. Verifique a identidade da voz, o volume e as interrupções.
4. Pare o fluxo antes de trocar de mecanismo ou escolher um dispositivo de inferência diferente. Execute outro teste após reconectar.

## Selecione o dispositivo de computação

Em compilações WebUI com **Dispositivo de inferência**, **Automático** atribui um novo fluxo a um dispositivo disponível. Escolha uma GPU específica ao comparar resultados repetíveis ou deixe uma GPU livre para outra carga de trabalho. Um stream permanece no dispositivo atribuído. Várias GPUs podem lidar com fluxos separados; alterar o seletor não é uma maneira de combinar sua capacidade em um fluxo. Beatrice usa um caminho de CPU separado na implementação documentada.

## Roteie o sinal após um teste limpo

Se o seu caminho de reprodução puder ter como alvo um cabo virtual, escolha o ponto final de reprodução do cabo nesse local. No aplicativo receptor, selecione o ponto final de gravação complementar como microfone. Mantenha o microfone físico como entrada e saída do conversor da chamada nos fones de ouvido. No modo navegador, o destino da reprodução pode depender das configurações de saída do navegador e do sistema operacional. Verifique o receptor com uma gravação local antes de julgar a transmissão ao vivo de uma chamada.

| O que você ouve | O que testar |
| --- | --- |
| O monitor funciona, mas a chamada tem áudio bruto | Selecione o terminal do cabo na chamada e desative fontes extras de microfone. |
| O atraso aumenta ou o áudio falha. | Interrompa outros streams, use o buffer padrão e teste localmente com uma guia. |
| O medidor do microfone do navegador nunca se move. | Confirme a permissão do site, o dispositivo físico selecionado e se outro aplicativo tem acesso exclusivo. |
| Apenas um jogo causa áudio quebrado | Teste enquanto o jogo está em execução, dê algum espaço à GPU de conversão ou escolha outra GPU disponível. |

O fluxo do navegador tenta o transporte WebSocket e pode retornar ao streaming HTTP quando necessário. Estabeleça um resultado local limpo antes de investigar a qualidade da conexão remota.
