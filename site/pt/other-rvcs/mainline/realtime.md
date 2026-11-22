# Use o trocador de voz em tempo real do RVC WebUI (Mainline - Original RVC)

Este guia se aplica à GUI separada em tempo real incluída nas compilações suportadas do RVC WebUI (Mainline - Original RVC). Ele pode passar um microfone através de um modelo continuamente enquanto a WebUI é usada para gravações e treinamento. Comece ouvindo diretamente pelos fones de ouvido e depois envie o áudio processado para outro aplicativo.

## Abra a interface e selecione seus arquivos

1. Conclua a [instalação](installation.md) e verifique o modelo com uma [conversão de arquivo curta](inference.md). Isso fornece um teste independente se surgir um problema no microfone.
2. Em um pacote Windows com `go-realtime_gui.bat`, inicie-o a partir da pasta do programa descompactado. Na ramificação de origem atual, ative o ambiente na configuração e execute `python realtime_gui.py` no diretório do repositório. Os nomes dos iniciadores de pacotes variam.
3. Na janela em tempo real, selecione a pequena inferência `.pth`. Se você tiver sua correspondência preenchida `.index`, escolha-a aqui. Deixe **Index Rate** em `0` para o primeiro teste de audição. Se sua construção exigir um índice em seu seletor de arquivos, forneça aquele para o modelo selecionado.
4. Escolha uma interface de host de som e selecione seu microfone físico como entrada e fones de ouvido como saída. Escolha os valores normais de pitch e taxa de amostragem oferecidos pela sua construção. Comece com as configurações de desempenho padrão.

## Verifique o microfone antes de conectar um aplicativo.

1. Abaixe o volume do fone de ouvido antes de começar. Se a GUI oferecer **Monitor de voz de entrada**, use-a para confirmar o microfone selecionado. Fale uma frase curta e faça uma pausa. Verifique se você ouve uma voz direta e silêncio durante a pausa.
2. Mude para **Saída de voz convertida** e inicie a conversão. Aguarde a inicialização. Repita a mesma frase em um nível de fala normal e ouça consoantes e terminações de palavras. Verifique o feedback antes de aumentar o volume.
3. Se o stream começar, mas cortar palavras, verifique a seleção do dispositivo e o nível de entrada. Se houver lacunas repetidas, retorne ao comprimento padrão do bloco de processamento. Uma voz limpa e ligeiramente atrasada é uma base melhor do que um sinal de baixa latência que continua quebrando.
4. Interrompa a transmissão antes de mudar de dispositivo de áudio ou carregar um ponto de verificação diferente. Reinicie e repita o mesmo teste de audição.

## Direcione o RVC WebUI (Mainline - Original RVC) para uma chamada ou gravador.

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

Configure um cabo virtual ou outro par de dispositivos de reprodução e gravação conectados. O final da reprodução recebe som do RVC WebUI (Mainline - Original RVC). A extremidade da gravação fornece esse som para sua chamada ou gravador.

```text
Physical microphone → RVC WebUI (Mainline - Original RVC) GUI → Virtual cable playback input
                                           ↓
                       Call or recording app ← Virtual cable recording output
```

1. Pare a conversão e configure o dispositivo de saída RVC WebUI (Mainline - Original RVC) para a extremidade de reprodução do cabo. Deixe o microfone físico selecionado como entrada do RVC WebUI (Mainline - Original RVC).
2. No aplicativo de destino, escolha a extremidade de gravação do cabo como microfone. Selecione seus fones de ouvido para a reprodução desse aplicativo para que o som da chamada não volte pelo cabo.
3. Inicie a conversão e faça uma gravação privada ou use o teste de microfone do app. Confirme se ele captura a voz convertida uma vez. Se você também precisar de monitoramento local, use o monitoramento do aplicativo de destino quando disponível e mantenha-o separado da entrada do cabo.
4. Se o aplicativo de destino cortar sílabas baixas, compare uma amostra curta com o processamento automático de ruído desativado para diagnóstico. Restaure qualquer processamento que melhore o resultado sem perder palavras.

## Reduza o atraso sem criar interrupções

Diminua o **Comprimento da amostra** ou o controle de bloco equivalente, um incremento de cada vez. Um bloco mais curto reduz a espera, mas dá ao motor menos tempo para terminar. Repita uma frase baixa e uma frase mais alta após cada mudança. Se houver cliques, desistências ou sílabas repetidas, volte para o último valor estável. Quando o tamanho do bloco estiver estável, ajuste uma outra configuração por vez se sua construção o expor:

- **Comprimento do fade** combina pedaços sobrepostos. Uma mudança pode ajudar com cliques nos limites dos blocos.
- **Tempo de inferência extra** dá ao modelo mais contexto em torno do bloco atual. Reduza-o com cautela e preste atenção à instabilidade.
- **A extração do tom** afeta a qualidade do tom e a carga de trabalho. Compare uma alternativa suportada quando notas difíceis oscilam ou o processamento demora muito.
- **Taxa de índice** e reduções de ruído adicionam processamento. Experimente uma linha de base estável com os recursos opcionais desativados antes de ajustar cada um deles.

Use o mesmo teste com sua carga de trabalho de chamada, jogo ou gravação em execução. O atraso de ida e volta que você ouve também inclui os drivers, o cabo virtual e o aplicativo de destino. Um valor de tempo mostrado pelo conversor representa apenas parte desse caminho.

| Sintoma | Verifique primeiro |
| --- | --- |
| Dispositivo ausente | Pare o fluxo, recarregue a lista de dispositivos e tente outra interface host que exponha o microfone e a saída. Verifique a permissão do microfone do sistema. |
| O aplicativo downstream recebe a voz bruta. | Coloque o microfone downstream na extremidade de gravação do cabo. Desative uma segunda fonte de captura se o aplicativo combinar ambas. |
| Uivo ou voz dupla | Use fones de ouvido, verifique se nenhuma entrada aponta para o próprio retorno do cabo e desligue o monitoramento duplicado. |
| Bom som de monitor, destino silencioso | Confirme que você escolheu as duas extremidades do mesmo cabo. Teste ambos os endpoints com um aplicativo de gravação local. |
| O modelo não inicia | Teste a mesma exportação de inferência na WebUI e confirme os ativos correspondentes. Verifique o primeiro erro da GUI antes de alterar as configurações do dispositivo e do modelo juntos. |

Consulte [noções básicas de conversão em tempo real](../../conversion/real-time.md) para outros aplicativos suportados e terminologia geral de roteamento.
