---
label: "🩺 Solução de problemas"
order: 95
permalink: /troubleshooting/
---
# Solução de problemas de RVC

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
É a tua primeira vez com RVC? **Começa com um WAV de 10 segundos e um único modelo.** Se a aplicação falhar, procura o primeiro erro no registo. Se funcionar mas a voz soar mal, ouve o mesmo excerto e altera uma definição de cada vez. Um checkpoint guarda o modelo ou o estado do treino.
!!!

Um diagnóstico útil começa no primeiro estágio que falha. Mantenha a versão do aplicativo, o primeiro erro e um teste reproduzível. Faça uma alteração de cada vez e compare com o mesmo arquivo ou frase falada.

## Encontre seu sintoma

| Sintoma | Primeiro teste |
| --- | --- |
| O launcher sai ou o navegador mostra um erro de conexão | Mantenha o console aberto e verifique o endereço local impresso por essa instância. |
| O modelo está ausente, recusa-se a carregar ou relata uma chave ausente. | Confirme se o arquivo é uma exportação de inferência e verifique sua arquitetura e incorporador. |
| O conversor não consegue ler o arquivo | Tente um WAV PCM curto a partir de um caminho local simples. |
| A conversão funciona sem índice | Verifique se o índice pertence ao modelo selecionado e sua representação de recursos. |
| A voz soa metálica, indistinta ou muito parecida com a entrada. | Compare vários clipes limpos e um ponto de verificação em bom estado com efeitos e recuperação desativados. |
| O treinamento para, para ou não produz nenhuma exportação utilizável | Identifique o estágio com falha e inspecione o log e os artefatos desse experimento. |
| O CUDA falha ou a máquina fica sem memória. | Distinguir hardware ou tempo de execução não suportado, esgotamento da memória da GPU e pressão da RAM do sistema. |
| O microfone apresenta atraso, lacunas, silêncio ou eco. | Teste a entrada física, o monitor convertido, o cabo virtual e o destino separadamente. |

## Estabeleça uma linha de base

1. Grave de 10 a 20 segundos de um locutor com vogais claras, um `s` ou `f` e uma pausa natural. Use um WAV local, em nível moderado, sem música ou efeitos.
2. Selecione um modelo de inferência confiável compatível com o aplicativo. Grave seu nome, incorporador e slot de alto-falante. Comece na transposição zero com o extrator de afinação padrão, processamento opcional desativado e recuperação em zero.
3. Converta e salve em uma pasta local gravável. Reproduza o arquivo em um segundo player se a visualização do navegador estiver silenciosa. Compare a mesma frase em volume semelhante.
4. Repita com um modelo em boas condições usando seu próprio codificador compatível. Se ambos os modelos falharem na mesma entrada, observe a decodificação compartilhada, o tempo de execução ou as configurações. Se apenas um falhar consistentemente, inspecione esse modelo, sua configuração e os dados de treinamento, se disponíveis.
5. Reative uma opção por teste. Salve cada resultado com as configurações em seu nome de arquivo ou notas para que você possa reverter para uma combinação de trabalho conhecida.

## O aplicativo não inicia

### A janela sai ou a configuração nunca é concluída

- **Ilaria RVC:** Extraia o pacote completo, abra sua pasta e execute `RUN_ILARIA_RVC_LOGS.bat`. Procure acima da última mensagem de desligamento a primeira exceção útil. Verifique se o Windows detecta a GPU NVIDIA compatível e se o ambiente e os ativos incluídos ainda estão presentes.
- **Applio Desktop:** abra Configuração e inspecione o status do mecanismo. Repare a instalação por meio dos controles de configuração do Desktop quando uma verificação de tempo de execução ou pacote falhar. Para Gradio, execute o launcher a partir do checkout pretendido e verifique qual intérprete está ativo.
- **Linha principal:** Combine o inicializador e o tempo de execução com o arquivo específico ou check-out de origem. Um arquivo mais antigo pode conter uma compilação CUDA que não pode executar kernels para uma GPU mais recente. Instalar globalmente um pacote Python não relacionado não reparará um interpretador incluído.
- **Erro de DLL do Windows:** Para `llvmlite.dll` ou uma dependência ausente do Visual C++, verifique se a arquitetura do tempo de execução corresponde ao aplicativo e instale ou repare o Microsoft Visual C++ Redistributable oficial para essa arquitetura. Se a própria DLL estiver ausente, restaure-a por meio do pacote ou instalador original.
- **Erros de recursos após uma atualização:** Verifique se a instalação é gravável, se os arquivos de recursos necessários estão presentes e se o atalho na área de trabalho aponta para a pasta atualizada. Mantenha backup de seus modelos, conjuntos de dados e logs antes de substituir uma instalação.

### A página local está em branco, desconectada ou mostra um erro JSON

Mantenha o processo em execução e abra o endereço de loopback exato impresso no console. Ilaria RVC normalmente usa `127.0.0.1:6969`. Se a porta já estiver em uso, verifique se o aplicativo já está em execução e use seu endereço. Salve o trabalho ativo antes de interromper uma instância.

Um erro do navegador como `Expecting value: line 1 column 1` pode ocorrer quando uma solicitação de API recebe uma resposta vazia ou uma página de erro HTML. Verifique o console do servidor no mesmo carimbo de data/hora. Se um proxy configurado estiver interceptando o tráfego local, verifique o bypass de loopback ou teste um perfil de navegador sem a extensão interferente. Mantenha o serviço local durante o diagnóstico.

Para uso de linha de comando, comece a partir do ponto de entrada e do argumento de ajuda para sua versão exata. Uma curta execução bem-sucedida do WebUI fornece configurações correspondentes e, em compilações que as registram, os comandos de pré-processamento e treinamento. Scripts mais antigos podem esperar uma ordem de argumentos ou layout de diretório diferente.

## Arquivos de entrada e saída

### Erros de FFmpeg, Unicode e lista de arquivos

1. Confirme se o arquivo abre em um player normal. Exporte um novo PCM WAV curto se o contêiner ou codec for incerto.
2. Copie-o para um caminho local simples como `C:\RVC\input\test.wav`. Isso isola problemas de cotação, Unicode, sincronização remota e permissões comuns em compilações mais antigas. Preservar as gravações originais.
3. Verifique se o aplicativo pode ver o FFmpeg incluído. As instalações de origem podem exigir um executável separado disponível para o mesmo processo que inicia o aplicativo. Se o WAV em boas condições funcionar, compare o caminho e o codec originais antes de reinstalar o ambiente.
4. Para treinamento, confirme se a pasta selecionada contém áudio real. Se alterar os caminhos após o pré-processamento, reconstrua a lista de ficheiros e as funcionalidades dependentes numa nova experiência ou através do fluxo de trabalho de preparação da aplicação.

### Um resultado aparece, mas não pode ser reproduzido ou salvo

Verifique a pasta de saída e libere espaço em disco. Exporte WAV e inspecione a duração e o tamanho do arquivo. Reproduza o resultado fora do navegador para separar problemas de reprodução e conversão. No modo em lote, verifique o primeiro item com falha e o caminho de saída e execute esse item sozinho. Mantenha os originais e os resultados gerados em pastas diferentes.

## Modelos, pontos de verificação e índices

### Um modelo não aparece

Certifique-se de que haja uma inferência real `.pth` dentro do arquivo. Coloque-o na biblioteca usada pelo aplicativo atual ou use seu controle de importação e aguarde a conclusão da instalação. Atualize a lista de vozes e verifique a seleção novamente. Na Ilaria RVC, a biblioteca modelo está em `models/`. Os arquivos principais e a fonte atual podem usar diferentes layouts de diretório. Consulte [Modelos e arquivos RVC](../start/models.md) para funções de arquivo.

### O carregamento falha com chaves ausentes ou formas incompatíveis

Um `G_*.pth` ou `D_*.pth` de um experimento geralmente serve para currículo de treinamento. Use a função de exportação ou extração de ponto de verificação do aplicativo para produzir um modelo de inferência. A falta de metadados F0 ou de taxa de amostragem também pode indicar um formato errado ou um arquivo incompleto. Verifique a versão RVC, vocoder, taxa de amostragem, orientação de pitch e incorporador. Mantenha os originais e exporte com um nome diferente. Uma extensão de nome de arquivo correspondente por si só não pode estabelecer compatibilidade.

### O índice está faltando ou causa um erro

1. Converta com recuperação em zero, selecionando nenhum índice se o aplicativo permitir. Confirme se o modelo pode produzir resultados inteligíveis por si só.
2. Selecione o índice do mesmo experimento e configuração de recursos do modelo. Tente novamente com um valor de recuperação modesto e compare a mesma frase. Uma dimensão incompatível ou um índice ilegível é um motivo para verificar novamente o par antes do ajuste.
3. Se o treinamento for concluído, mas não houver índice, inspecione o estágio do índice separadamente. Confirme o sucesso da extração de recursos. Execute novamente apenas a geração de índice quando os recursos compatíveis originais estiverem intactos. Um conjunto de recursos muito grande pode consumir RAM do sistema durante a montagem do índice.
4. Preserva a exportação de inferência mesmo se a construção do índice falhar. Para compartilhamento ou backup, mantenha o ponto de verificação de trabalho e seu índice correspondente opcional juntos.

## Qualidade do som e limitações do modelo

| O que você ouve | Teste de diagnóstico e interpretação |
| --- | --- |
| Respirações metálicas ou sibilantes distorcidas | Compare algumas fontes limpas com efeitos e recuperação desligada. Compare a proteção separadamente. Se o mesmo modelo distorce consistentemente esses sons em clipes limpos, inspecione os exemplos de treinamento para recorte, redução de ruído ou cobertura deficiente, corrija o conjunto de dados e treine novamente. |
| A voz convertida mantém o timbre original | Verifique se o modelo e o incorporador de treinamento concordam. Os recursos genéricos do HuBERT podem reter dicas do orador. Compare sem recuperação e depois com o índice correto. Uma limitação persistente do modelo treinado pode exigir um novo treinamento. |
| As palavras quebram apenas em um idioma. | Teste frases retidas contendo os sons afetados com várias gravações limpas. As gravações multilíngues por si só não podem garantir que o ContentVec preserve as distinções. Registre a limitação linguística observada em vez de prometer que um ambiente de treinamento diferente irá corrigi-la. |
| O tom salta ou muda de oitava. | Ouça a frase original, teste a transposição de zero e compare os extratores F0 suportados separadamente. Para cantar, verifique as notas altas e baixas expostas. |
| Sons metálicos ao redor da música ou vozes de fundo. | Compare um vocal seco e isolado. Ouça os artefatos de separação antes de usar uma haste isolada como dados de treinamento. |
| O áudio está plano, muito baixo ou há clipes | Compare a fonte e a saída em níveis de reprodução semelhantes. Desative os efeitos de ganho e limitador para o teste e verifique se a origem e a exportação final têm espaço livre. |

Use o [guia de qualidade de áudio](../conversion/audio-quality.md) para testes de escuta controlada e [preparação do conjunto de dados](../model-training/dataset-preparation.md) quando o defeito segue o modelo nas entradas.

## GPU e memória do sistema

- **CUDA indisponível ou kernel sem suporte:** Confirme a GPU, o driver e o tempo de execução exatos que o aplicativo selecionou. Instalações de desktop, empacotadas e de origem podem ver diferentes dispositivos. Verifique se o back-end pretendido dá suporte à operação, incluindo treinamento, se necessário.
- **CUDA sem memória durante a inferência:** Comece com um clipe curto. Feche trabalhos de GPU concorrentes, descarregue modelos não utilizados e desative o processamento opcional. Para entradas longas, experimente o controle de divisão de áudio do aplicativo ou divida o áudio em segmentos e verifique as junções depois.
- **CUDA sem memória durante o treinamento:** Reduza o tamanho do lote, desative o cache do conjunto de dados na VRAM e tente a precisão mista compatível somente se for compatível com sua compilação. Mantenha um ponto de verificação recuperável. Um lote menor altera o número de atualizações por época.
- **A RAM do sistema acaba ou os trabalhadores de pré-processamento morrem:** Use menos trabalhadores da CPU, verifique se o disco tem espaço para arquivos intermediários e inspecione gravações excepcionalmente longas ou quebradas. Divida apenas nos limites naturais e regenere os dados preparados afetados. Durante a geração do índice, observe a RAM do sistema independentemente da VRAM.
- **Múltiplas GPUs:** Confirme o índice de dispositivos com a lista de dispositivos do aplicativo. Um índice pode referir-se a uma GPU diferente quando a visibilidade do dispositivo muda. Verifique o dispositivo escolhido no log antes de comparar o desempenho.

## Treinamento, retomada e exportações

### Diagnosticar o estágio antes de executá-lo novamente

| Estágio | Verificar antes de continuar |
| --- | --- |
| Importação do conjunto de dados | Confirmar a pasta de destino e aguardar a extração. Verifique o espaço livre e experimente alguns arquivos importados. |
| Pré-processamento | Confirme clipes utilizáveis ​​e não vazios e uma pasta de experimentos gravável. Um tensor de tamanho zero pode originar-se de uma fatia vazia, extremamente curta ou com falha. Ouça e substitua ou corte a fonte incorreta e, em seguida, gere novamente os dados preparados. |
| Extração de recursos | Confirme se o áudio produzido no pré-processamento e se os recursos de incorporação e pitch escolhidos estão presentes. A alteração dos codificadores requer uma configuração compatível e novos recursos. |
| Treinamento | Verifique os pré-treinos G/D correspondentes e a concordância entre taxa de amostragem, orientação de pitch, vocoder, arquitetura e recursos armazenados. Uma incompatibilidade de tamanho de tensor após a alteração das taxas é um motivo para iniciar um experimento separado com configurações compatíveis. |
| Exportar e indexar | Exportar um ponto de verificação de inferência, atualizar a lista de vozes, testar sem recuperação e construir o índice a partir dos recursos desse experimento. |

### Retome com segurança ou continue com mais gravações

Aguarde o aplicativo terminar de salvar antes de fechá-lo. Preservar os pontos de verificação G e D, a configuração do experimento e seu estado de treinamento. Para retomar o treinamento inalterado, selecione o mesmo experimento e verifique a etapa ou época restaurada no log. Trate um conjunto de dados alterado como um experimento separado: pré-processe o conjunto de dados combinado, regenere recursos e use o método de continuação compatível com seu aplicativo com pesos compatíveis. Mantenha o experimento original intacto para permitir uma comparação ou reversão.

A duração do conjunto de dados e a contagem de épocas dependem da cobertura de voz e da limpeza. Salve vários pontos de verificação e ouça os mesmos clipes retidos. Uma melhor curva de perda não estabelece uma melhor pronúncia. Se um modelo se degradar em exemplos limpos e não vistos, compare uma exportação anterior antes de estender a execução.

## Microfone ao vivo, cabo virtual e chamadas

1. Verifique o microfone físico bruto no sistema operacional. Confirme a permissão e o nível de entrada. Desconecte fontes extras de microfone durante o teste.
2. Teste o conversor localmente através de fones de ouvido. Mantenha o back-end e o buffer de áudio padrão suportados pelo aplicativo. Se o conversor tiver um medidor de entrada, mas não tiver saída, verifique a voz carregada e o estado da conversão antes de alterar o aplicativo de destino.
3. Direcione a saída do conversor para a extremidade de reprodução do cabo virtual. No Discord, OBS ou no aplicativo de gravação, escolha o ponto final de gravação correspondente. Mantenha a reprodução da chamada em fones de ouvido. Faça uma gravação de teste privada para verificar o sinal real que chega a outras pessoas.
4. Se houver lacunas, teste novamente com um tamanho de bloco maior e com outras cargas de trabalho de GPU interrompidas. Se aparecerem lacunas apenas durante um jogo, repita o teste sob essa carga. Verifique se as configurações do formato de áudio entram em conflito entre os dispositivos.
5. Se a fala for cortada no início ou no final, teste sem detecção automática, supressão de ruído ou portas, uma de cada vez. Se você ouvir um eco, verifique se há monitoramento duplicado ou um loop no microfone físico. Mantenha a última predefinição estável antes de diminuir o atraso.

Para nomes de dispositivos e controles específicos de aplicativos, use os [guias passo a passo do aplicativo](../other-rvcs/app-guides.md) e o [guia de roteamento ao vivo](../conversion/real-time.md).

## Mais problemas que você pode resolver

### Leia a mensagem antes de alterar qualquer coisa

Procure o primeiro erro no console ou no log de tarefas. A última mensagem pode apenas dizer que o trabalho foi interrompido. Copie a linha que nomeia um arquivo, dispositivo ou configuração. Execute um pequeno teste após sua primeira alteração. Se funcionar, anote o que você mudou.

| Mensagem ou sintoma | Primeira coisa a fazer | Se ainda falhar |
| --- | --- | --- |
| Permissão negada | Salve um pequeno teste em uma pasta sua. | Verifique se o arquivo selecionado está aberto em outro lugar ou se a pasta de saída é gerenciada por outro aplicativo. |
| Arquivo não encontrado | Abra o caminho mostrado no erro e confirme se o arquivo existe. | Selecione novamente o arquivo dentro do RVC. Se você moveu o conjunto de dados, reconstrua os arquivos e recursos preparados. |
| Disco cheio | Verifique a unidade usada pelo aplicativo, incluindo arquivos temporários. | Mova os backups concluídos para outra unidade e escolha um destino gravável com espaço para arquivos intermediários. |
| Módulo não encontrado | Verifique qual iniciador e ambiente você abriu. | Repare o ambiente desse aplicativo. Mantenha um ambiente separado para cada instalação de origem. |
| Perda de NaN ou saídas silenciosas. | Interrompa a execução e mantenha o último ponto de verificação em funcionamento. | Verifique se há áudio corrompido, pesos incompatíveis e problemas de precisão. Se suportado, compare uma curta execução do FP32 em um experimento separado. |

### A voz soa errada mesmo que o trabalho tenha sido bem sucedido

#### Apenas um modelo de voz se comporta mal

Teste uma voz em boas condições usando seu próprio codificador correspondente e configurações de índice. Em seguida, teste o modelo com falha com recuperação e efeitos desativados. Se a primeira voz funcionar e a outra cometer o mesmo erro repetidamente, inspecione o codificador, o slot do alto-falante e os dados de treinamento do modelo com falha. Mantenha a entrada limpa como evidência para comparação após o retreinamento.

#### Parte de um arquivo longo está faltando

Reproduza a entrada e a saída lado a lado perto da seção que falta. Teste essa seção sozinha. Se o clipe curto for bem-sucedido, verifique a pressão da memória, a divisão de silêncio, as portas automáticas e a pasta de saída. Junte segmentos concluídos em um editor e ouça cada limite antes de exportar.

#### Apenas um arquivo em um lote falha.

Converta esse arquivo sozinho. Se não puder ser aberto, faça um novo WAV a partir do original. Se for convertido, verifique se o lote foi interrompido ou se dois arquivos compartilham um nome de saída. Execute novamente os arquivos com falha em uma nova pasta de destino para proteger os resultados anteriores.

### O treinamento parece travado.

1. Procure o carimbo de data/hora mais recente e o estágio atual. Preparar um conjunto de dados, extrair recursos e construir um índice pode ter velocidades muito diferentes.
2. Verifique se a CPU, GPU ou disco ainda está ativo e se os arquivos estão sendo gravados. Atualize o log ou painel se a exibição do progresso estiver obsoleta.
3. Se a atividade for interrompida e o log apresentar um erro, diagnostique esse erro. Se você precisar interromper um trabalho de treinamento de corrida, use o controle salvar e parar e aguarde a confirmação, quando disponível.
4. Antes de tentar novamente, anote o nome do experimento e a última etapa confirmada. Reutilize arquivos concluídos somente quando o conjunto de dados e as configurações ainda corresponderem.

### O áudio ao vivo funciona no monitor, mas falha em uma chamada

- **Outras pessoas ouvem sua voz normal:** selecione o lado de gravação do cabo virtual no aplicativo de chamada e desligue qualquer segunda fonte de microfone.
- **Você ouve a voz convertida duas vezes:** use um único monitor. Desative a escuta do Windows ou o monitor do aplicativo enquanto você compara.
- **A chamada é interrompida apenas quando você fala baixo:** compare a sensibilidade de entrada e a supressão de ruído do aplicativo, uma de cada vez. Grave a entrada da chamada para ouvir o que realmente chega até ela.
- **O dispositivo desapareceu após conectar os fones de ouvido:** interrompa a conversão, selecione novamente o microfone físico e os fones de ouvido e reinicie o fluxo de áudio.

Quando uma etapa resolver o problema, repita o teste original uma vez com seus aplicativos habituais abertos. Mantenha essa configuração de trabalho como referência.

## Texto para fala e relato de um problema

Visualize a fala gerada antes de convertê-la. Se o TTS original parecer errado, verifique seu idioma, voz e script. Para Edge TTS, verifique se a voz online está acessível. Com uma voz do Windows instalada, verifique se ela aparece na lista de suporte do aplicativo. Se apenas a versão convertida parecer errada, use a linha de base de conversão de arquivo acima.

Ao pedir ajuda, inclua o aplicativo e a edição, a versão, o sistema operacional, a GPU e o back-end, a ação exata, o primeiro erro com linhas de registro próximas e a reprodução segura mais curta. Para treinamento, inclua o estágio com falha, taxa de amostragem, arquitetura, incorporador e se foi uma nova execução ou um currículo. Para problemas ao vivo, liste os dispositivos na ordem do sinal. Remova identificadores de conta, caminhos privados e gravações confidenciais antes de compartilhar logs. Use a [página de contato](https://ilariarvc.shop/en/contact/) para assistência Ilaria RVC.
