---
label: "Modelo, microfone e cabo"
icon: ":headphones:"
order: 90
permalink: /ilaria-rvc/tgr/live-audio/
---
# Configure o áudio ao vivo no Okada TG Developed Fork

> Usa o microfone físico no conversor, envia a saída para o dispositivo de reprodução do cabo e escolhe a entrada de gravação correspondente no Discord ou OBS. Para Vonovox, começa com **VAC Lite** ou usa **VB-CABLE**. Lê o guia completo antes de testar numa chamada. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Use um ponto de verificação de inferência RVC compatível e um microfone funcional. Primeiro prove que o sinal convertido chega aos seus fones de ouvido. Em seguida, envie esse sinal para outro aplicativo e faça uma gravação do lado receptor.

## Carregar uma voz RVC

1. Interromper a conversão se já estiver em execução. Abra **Editar** na área de seleção de modelo e escolha um slot vazio.
2. Escolha **Upload** e selecione o arquivo do modelo de inferência RVC. Quando a caixa de diálogo expor um campo separado para o índice, adicione o `.index` correspondente, se fornecido. Use apenas arquivos de inferência compatíveis. Um índice por si só não pode produzir uma voz.
3. Aguarde o upload e clique no slot recém-carregado na visualização principal. Verifique o nome do modelo antes de pressionar Iniciar.
4. Defina o tom e a recuperação como zero. Certifique-se de que **Passthrough** esteja desativado. Seu estado ativado envia o microfone seco, para que o microfone possa atender uma chamada mesmo se a conversão for ignorada.

## Teste o microfone e o dispositivo de computação

1. Em **Áudio**, escolha o modo para os dispositivos que você pretende usar. Em um teste de navegador local, use **Cliente** e conceda ao site acesso ao seu microfone. Em **Servidor**, escolha os dispositivos de entrada e saída visíveis para o processo que executa o TGR.
2. Nomeie os endpoints antes de começar. **Entrada** é o microfone físico, **Saída** são os fones de ouvido para o primeiro teste e **Monitor** é opcional se sua construção oferecer isso.
3. Escolha a GPU ou CPU pretendida no seletor de dispositivos. Para uma linha de base DirectML, tente `rmvpe_onnx` se estiver listado. Os detectores de pitch DirectML suportados documentados pelo fork também incluem `fcpe_onnx`, `crepe_tiny_onnx` e `crepe_full_onnx`. A construção CUDA pode expor uma lista diferente.
4. Pressione **Iniciar** no tamanho padrão do bloco. Dê tempo ao modelo para inicializar e, em seguida, diga uma frase baixa e outra mais longa e mais alta. Faça uma pausa entre ambos. Verifique se a saída muda ao selecionar o modelo e se o áudio permanece estável durante um minuto.
5. Se você também ouvir uma cópia seca, desligue o tom lateral do hardware ou remova o outro loop de microfone no sistema operacional. Mantenha os níveis dos fones de ouvido moderados durante os testes.

## Conecte um cabo

O editor da TGR usa o Virtual Audio Cable da Muzychenko para exemplos de solução de problemas do Windows. Isso normalmente expõe pontos de extremidade de reprodução e gravação correspondentes denominados **Linha 1**. Outros drivers de cabo usam rótulos diferentes. O sinal deve entrar no ponto final de reprodução e sair pelo ponto final de gravação correspondente.

| Configuração | Primeiro teste roteado |
| --- | --- |
| Entrada TGR | Seu microfone físico, o mesmo que funcionou no teste dos fones de ouvido. |
| Saída TGR | Ponto final de reprodução do cabo. |
| Monitor TGR | Fones de ouvido, se mostrados como uma saída separada. |
| Entrada Discord ou OBS | O ponto final de gravação do cabo. |
| Saída de discórdia ou reprodução do sistema operacional | Fones de ouvido. |

1. Instale o cabo e reinicie os aplicativos para atualizar os dispositivos de áudio.
2. Defina os dispositivos conforme mostrado e verifique os formatos padrão do microfone e do cabo nas configurações de som do sistema operacional. Escolha uma taxa de amostragem comum suportada. No modo Servidor, verifique se há nomes de dispositivos duplicados listados em diferentes APIs de host e use um par compatível.
3. Inicie a conversão e, em seguida, inicie o teste de microfone do aplicativo receptor. Grave uma frase curta. Ouça o que o destinatário recebe, não apenas o monitor no TGR.
4. No OBS, desative o microfone físico separado se ele duplicar a fonte do cabo. Em uma chamada, verifique se a entrada selecionada está explícita, em vez de alternar automaticamente quando você conecta um novo fone de ouvido.
5. Pare o conversor. Se o medidor de recepção continuar a responder, verifique o ponto final de gravação selecionado e qualquer áudio de desktop roteado para o cabo.

## Ajuste DirectML e CUDA sem perder sua linha de base

**Chunk** controla o bloco de áudio recebido. **Extra** fornece contexto em torno do bloco atual. **Crossfade** controla a sobreposição onde os blocos se juntam. Mude um controle de cada vez e faça uma gravação de teste. Se o tempo de processamento estiver próximo da duração do bloco, comece aumentando o bloco ou reduzindo o contexto extra. Se um pedaço alterado se comportar de maneira estranha, pare e inicie a conversão novamente.

Na compilação DirectML documentada, alterações em Chunk, Extra e Crossfade podem exigir a seleção da CPU e, em seguida, a seleção novamente da GPU pretendida. Faça isso após parar, reinicie o stream e repita o mesmo teste antes de avaliar a latência. No CUDA, permita o primeiro aquecimento antes da medição. Algumas combinações de áudio e protocolo do servidor mostram **perf** sem outras temporizações. Julgue o caminho completo da chamada com uma gravação no aplicativo receptor.

| Falha | Próxima ação |
| --- | --- |
| O microfone passa inalterado | Desative **Passthrough**, verifique o slot selecionado e selecione o cabo como o único microfone do aplicativo receptor. |
| Uma sílaba baixa desaparece. | Teste o limite de entrada e a detecção de voz do aplicativo de destino separadamente. Verifique uma gravação simples para ver se há silêncio real. |
| Os cliques começam após o cabo ser conectado. | Compare as taxas de amostragem do microfone e do cabo e as seleções da API do host. Teste novamente sem o cabo para confirmar qual estágio apresenta o clique. |
| As palavras gaguejam quando um jogo é aberto. | Restaure o último pedaço estável, reduza o contexto ou a carga concorrente e teste novamente. Mantenha aberta a configuração que funciona com os dois aplicativos. |
| Apenas um método de pitch trava ou trava. | Retorne para um método listado pelo seu back-end. No DirectML, compare as opções de pitch do ONNX com a mesma frase curta. |
| Um segundo aplicativo possui um medidor, mas registra o ruído da sala | Pare o TGR e verifique o medidor novamente. Um medidor que ainda segue seu microfone aponta para uma rota extra ou para o ponto final de gravação errado. |

Se precisar de ajuda para diagnosticar mais, mantenha o identificador de lançamento, back-end, nomes de dispositivos de microfone e cabo, detector escolhido e primeiro erro do console. Confirme se o problema também ocorre em um teste local de fone de ouvido.
