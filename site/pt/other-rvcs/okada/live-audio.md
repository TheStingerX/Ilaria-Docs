# Converta seu microfone em w-okada VCClient

> **Correct Audio Routing**
>
> **1. Dentro do Voice Changer**
> - **Input Device:** Seu microfone físico.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. No Discord, Jogos, OBS ou outros aplicativos**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Seus fones de ouvido ou alto-falantes.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> O áudio recebido do Discord, do jogo ou de outros apps deve ir diretamente para os **fones de ouvido** (nunca de volta para o cabo virtual).
>
> - **VAC vs. VB-CABLE:** `Line 1` é o nome usado pelo **VAC (Virtual Audio Cable)**, não um nome universal para todos os cabos virtuais. Com **VB-CABLE**, defina a saída do Voice Changer como **`CABLE Input`** e a entrada do Discord / jogo como **`CABLE Output`**.
> - **Monitoramento:** Ouvir sua própria voz convertida nos fones é um recurso opcional separado, para ativar apenas quando necessário. Evite caminhos de áudio duplicados, eco e loopback.

Comece com fones de ouvido e um único caminho de áudio local. Ao ouvir uma voz limpa e convertida nos fones de ouvido, conecte-a a uma chamada ou gravador. Esta ordem permite localizar problemas antes de adicionar o cabo virtual.

## Adicione um modelo e ouça o primeiro resultado

1. Conecte seu microfone e fones de ouvido antes de abrir o VCClient. No sistema operacional, fale no microfone e verifique se o medidor de entrada se move. Pause Discord, OBS e outros aplicativos de captura durante este teste.
2. Em **Seleção de modelo**, escolha um modelo de amostra compatível, se houver disponível. Para seu próprio modelo, use **Editar**, escolha um espaço livre e escolha **Fazer upload**. Selecione **RVC** quando a caixa de diálogo solicitar um tipo de modelo. Forneça o arquivo de inferência aceito pela sua versão e um índice correspondente opcional. Aguarde o upload e selecione o slot preenchido na visualização principal.
3. Nos controles de áudio, escolha **Cliente** para um primeiro teste no navegador. Selecione o nome exato do microfone físico e o nome exato dos fones de ouvido. Se o navegador solicitar permissão, permita o acesso ao microfone da página local.
4. Desative o passthrough, deixe o pitch e o índice em zero e mantenha o chunk, contexto, crossfade e estimador de pitch padrão. Se você importou um índice, poderá avaliá-lo depois de ouvir a linha de base.
5. Pressione **Iniciar**, aguarde o aquecimento do modelo e fale por pelo menos 30 segundos. Inclua uma frase calma, uma frase normal, uma frase mais alta e uma breve pausa. Com a conversão habilitada você deverá ouvir a voz selecionada. Pressione **Parar** ao fazer alterações que exijam a reinicialização do stream.
6. Se você ouvir silêncio, teste os mesmos dispositivos em um gravador simples. Se você ouvir sua voz original duas vezes ou durante a conversão, desative o monitoramento direto do microfone em sua interface ou remova o caminho de software duplicado.

## Compreender o modo de dispositivo cliente e servidor

**Cliente** usa dispositivos disponíveis para o cliente/navegador. As permissões do microfone e a seleção de saída do navegador podem afetar a lista de dispositivos. **Servidor** abre dispositivos no computador que executa o mecanismo de conversão. Isso é importante em dois computadores: um microfone USB conectado ao cliente não aparece automaticamente no servidor.

Em um PC, teste primeiro o caminho do cliente mais simples. Mude para Servidor se sua compilação expor um monitor separado ou se o navegador não puder selecionar o endpoint de saída desejado. No modo Servidor, escolha a API do host e os nomes dos dispositivos oferecidos pelo servidor. Se várias entradas compartilharem o mesmo nome, tente usar a mesma API de áudio para entrada e saída. Quando o sinal estiver estável, você poderá testar alternativas de latência.

## Enviar conversão para Discord, OBS ou outro aplicativo

1. Instale um cabo virtual para seu sistema operacional e reabra ambos os aplicativos para que suas listas de dispositivos sejam atualizadas. Deve expor um ponto final de reprodução e um ponto final de gravação correspondente.
2. Defina a entrada VCClient para o microfone físico. Defina a saída do conversor para o ponto final de **reprodução** do cabo. Com VB-CABLE, geralmente é **CABLE Input**.
3. Se o aplicativo expor um dispositivo **Monitor** separado, configure-o para os fones de ouvido. Deixe os alto-falantes do aplicativo de destino nos fones de ouvido.
4. Selecione o ponto final de **gravação** do cabo como o microfone de destino. Com VB-CABLE, isso normalmente é **Saída CABLE**. No OBS, selecione esse dispositivo para a captura de entrada de áudio e silencie qualquer segunda captura do microfone físico.
5. Use uma chamada de teste ou faça uma breve gravação local no aplicativo de destino. Teste a fala baixa e alta. Confirme se parar o VCClient ou silenciar a fonte convertida faz com que o medidor pare. Se continuar, o destino tem outra entrada ativa ou está recebendo uma rota não intencional.
6. Compare a supressão de ruído de destino ou o ganho automático ativado e desativado somente se o conversor soar bem localmente e o alvo cortar sílabas ou alterar o nível. Mantenha as opções que funcionam para sua sala e microfone.

```text
Physical microphone → VCClient → cable playback → cable recording → call or recorder
                           └── optional monitor → headphones
```

## Ajuste uma configuração que já funciona

Comece com o bloco padrão e teste sob sua carga de trabalho real. Quando a IU mostrar a duração do bloco e o tempo de conversão, compare-os em unidades correspondentes. Cada bloco precisa de tempo suficiente para terminar. Deixe margem para picos durante a execução de um jogo ou streaming. Reduza o pedaço um passo de cada vez e ouça as desistências antes de manter a alteração. Se as palavras forem cortadas, aumente novamente ou reduza o contexto extra. Crossfade ajuda a suavizar limites, mas também consome parte do orçamento de processamento disponível.

Escolha um estimador de tom que lide com sua extensão normal de fala. Compare a mesma frase em cada configuração. O pitch altera o registro, enquanto a combinação de índices altera o quanto a inferência usa recursos recuperados do índice de treinamento correspondente. Aumente qualquer um deles gradualmente e registre o resultado. Mantenha o ganho do modelo e do microfone estável durante a comparação.

| Sintoma | Teste específico |
| --- | --- |
| A voz original chega à chamada | Desligue o passthrough e escolha o cabo como o único microfone no aplicativo receptor. |
| A distorção já está presente na gravação do microfone simples. | Reduza o ganho de entrada física antes de ajustar o modelo. |
| A primeira sílaba desaparece após uma pausa | Compare o limite de entrada e a ativação por voz de destino. Experimente uma gravação com a ativação por voz desativada para isolar o palco. |
| O monitor local está bom, mas o áudio do cabo estala. | Combine as taxas de amostragem suportadas no painel de som do sistema operacional e reabra ambos os fluxos. Verifique se há um segundo aplicativo mantendo o endpoint em modo exclusivo. |
| A conversão da GPU falha e a CPU funciona. | Verifique o pacote selecionado, o formato do modelo e o provedor de computação separadamente. Teste com o mesmo modelo de funcionamento conhecido em cada dispositivo. |
| A conversão fica atrasada quando um jogo é aberto. | Aumente o tamanho do bloco ou reduza a carga de trabalho da GPU concorrente. Repita uma gravação mais longa antes de ir ao vivo. |

Mantenha o nome do pacote de trabalho, modelo, modo de áudio, nomes de dispositivos, método de pitch e controles de buffer em uma nota. Isso fornece uma linha de base confiável após uma atualização de dispositivo ou software.
