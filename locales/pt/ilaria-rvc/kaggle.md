---
label: "☁️ Execute Ilaria RVC no Kaggle"
order: 97
permalink: /ilaria-rvc/kaggle/
---
# Execute Ilaria RVC 2.1 no Kaggle

Kaggle executa o notebook em uma máquina Linux remota. Quando você liga o acelerador de GPU NVIDIA, a GPU remota faz o trabalho. Seu próprio computador só precisa de um navegador e acesso à Internet. Esta é uma alternativa para pessoas com gráficos AMD ou Intel, gráficos integrados ou uma GPU local muito lenta para o trabalho.

[Abra o bloco de notas oficial do Kaggle](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Obtenha o arquivo do bloco de anotações no GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/Ilaria-RVC-2.1-Kaggle.ipynb)

!!!warning Mantenha o link do aplicativo privado
A etapa 4 cria uma URL Gradio pública. Qualquer pessoa com esse URL pode usar o aplicativo enquanto ele está em execução. A visibilidade do seu notebook Kaggle é separada do acesso a esse URL. Use uma sessão sem material privado e mantenha o URL fora de capturas de tela, postagens públicas e resultados compartilhados.
!!!

## 1. Prepare um pequeno teste

- Faça login no Kaggle e mantenha o editor de notebook aberto enquanto trabalha.
- Para conversão, tenha um arquivo de inferência `.pth` compatível e, se disponível, seu `.index` correspondente. O primeiro teste funciona sem índice. Salve um WAV de 10 segundos de uma voz clara, sem música.
- Para treinamento, mantenha uma cópia local do conjunto de dados de origem. Prepare um ZIP de gravações utilizáveis ​​que você tem permissão para usar. Mantenha um pequeno clipe separado fora do conjunto de dados de treinamento para que você possa testar seu modelo em algo que ele não ouviu.
- Comece com um teste de arquivo antes de tentar um treinamento longo. Kaggle controla a disponibilidade e os limites da GPU, portanto verifique o tempo e os recursos exibidos em sua própria sessão.

## 2. Faça uma cópia editável e ligue a GPU

1. Abra o [caderno publicado](https://www.kaggle.com/code/ilarialopez/ilaria-rvc). Faça login se solicitado. Use **Copiar e editar** ou a ação de cópia equivalente para abrir sua própria versão editável.
2. Se você estiver iniciando no GitHub, baixe o arquivo `Ilaria-RVC-2.1-Kaggle.ipynb` bruto, crie um notebook no Kaggle e importe o arquivo por meio do editor de notebook. Abra o notebook resultante no Kaggle em vez de executá-lo em sua própria máquina.
3. Abra as configurações da sessão no editor. Para **Acelerador**, selecione uma opção de **GPU** disponível. Se o Kaggle solicitar o reinício da sessão após a alteração, aceite antes de adicionar arquivos ou iniciar uma execução.
4. Habilite **Internet** nas mesmas configurações de sessão. O notebook precisa de conectividade para baixar o código, dependências e pesos e depois abrir seu link Gradio.
5. Se alguma das configurações não estiver disponível, leia a explicação mostrada pelo Kaggle. Verifique a elegibilidade da sua conta e a disponibilidade atual do acelerador. Tente novamente quando puder ativar ambas as configurações.

## 3. Execute as quatro seções principais

Clique em **Executar tudo** no editor. Você também pode executar as quatro células de código, uma de cada vez, de cima para baixo. Aguarde a conclusão de cada célula antes de executar a próxima. As células opcionais de exportação e parada não fazem nada com suas configurações padrão.

| Seção Notebook | O que uma execução bem-sucedida faz | O que verificar se ela para |
| --- | --- | --- |
| **1. Verificar GPU** | Mostra o nome da GPU, memória e driver. Confira o lançamento Ilaria RVC fixado em `/kaggle/working/ilaria-rvc`. | Se as ferramentas NVIDIA estiverem faltando, selecione uma GPU disponível e reinicie a sessão antes de executar novamente. Se o Git não conseguir acessar o repositório, verifique a Internet. |
| **2. Instalar dependências** | Prepara o ambiente do notebook e verifica se o PyTorch vê a GPU. Procure `GPU ready:` seguido de seu nome. | Leia a primeira dependência ou erro do compilador. Um dispositivo CUDA ausente significa que o aplicativo ainda não consegue usar a GPU. |
| **3. Baixar pesos do modelo** | Baixa e verifica os ativos exigidos pelo notebook. | Deixe a nova tentativa integrada terminar. Se continuar falhando, verifique o acesso à rede e o espaço livre. |
| **4. Open Ilaria RVC** | Inicia a interface e imprime **Open Ilaria RVC** na saída da célula. | Se a aba não abrir automaticamente, clique nesse botão. Se o notebook informar que o link Gradio não está disponível, verifique a Internet e execute novamente a etapa 4 após as etapas 1 a 3 terem sido bem-sucedidas. |

Abra o link atual do passo 4 em outra aba. Deixe a sessão Kaggle em execução. Após uma redefinição de sessão ou reinicialização de inicialização, use o link recém-gerado.

## 4. Converta uma gravação

1. Na aba do navegador Ilaria RVC, abra **Outros → Importar modelos locais**. Adicione o ponto de verificação de inferência ou um ZIP compatível e adicione o índice emparelhado, se tiver. Aguarde a conclusão da importação.
2. Abra **Inferência**, atualize a lista de vozes se necessário, selecione a voz pretendida e vá para **Inferência Única**.
3. Carregue o WAV curto. Comece em **Pitch 0** e **Index Ratio 0**. Deixe os efeitos opcionais desativados e use o incorporador esperado pelo modelo.
4. Clique uma vez no controle de conversão e aguarde a saída. Reproduza o resultado e baixe-o do player, se disponível. Mantenha seu WAV de entrada para poder comparar a mesma frase mais tarde.
5. Se desejar testar a recuperação, selecione o índice correspondente e tente um pequeno aumento a partir de zero. Se a saída falhar ou a voz ficar mais difícil de entender, retorne à linha de base e verifique o emparelhamento modelo-índice.

Se a voz nunca aparecer, primeiro verifique o log de importação. Um ponto de verificação de treinamento salvo como um arquivo G ou D pertence a um experimento e precisa de uma exportação de inferência antes de poder ser selecionado aqui.

## Prepare seu conjunto de dados e planeje uma execução de treinamento

### Limpe o áudio com MVSEP somente quando necessário

Mantenha uma cópia intacta de suas gravações. Se já contiverem uma única voz limpa e seca, pule a separação. Use material que você tem permissão para enviar para [MVSEP](https://mvsep.com/en/home) e para treinar. Para gravações confidenciais, limpe-as localmente.

1. **Isole a voz.** Carregue um pequeno exemplo e escolha uma opção de separação vocal. Baixe a haste vocal em WAV quando disponível. Reproduza-o com o original e ouça através de fones de ouvido músicas, outras vozes, sílabas cortadas e artefatos aquosos ou metálicos.
2. **Remova os backing vocals somente se estiverem presentes.** Para músicas com harmonias ou um refrão abaixo do alvo, use uma opção de separação lead-versus-backing na haste vocal. Mantenha a saída principal. Se os cantores ainda se sobrepuserem ou o solo tiver buracos, use uma seção limpa ou uma tomada diferente.
3. **Reduza a reverberação apenas onde for audível.** Se a voz tiver uma cauda de reverberação estéreo ampla, primeiro teste uma opção de desreverberação estéreo em uma cópia. Para reflexões restantes da sala, compare uma passagem de reverberação da sala. Você pode pular qualquer uma das etapas. Ouça consoantes truncadas e respirações em cada passagem.
4. **Remova o eco somente se ele repetir a voz.** Uma repetição audível atrasada solicita um breve teste separado. Mantenha o original ou substitua-o se a remoção remover palavras. Evite empilhar passes em áudio limpo.
5. **Prepare os clipes finais.** Corte ruídos inutilizáveis ​​e longas seções vazias em um editor como o Audacity, mantendo respirações úteis e frases naturais. Exporte WAVs limpos. Junte os arquivos aprovados em um ZIP e mantenha alguns clipes limpos fora dele para avaliação.

Teste toda a cadeia de limpeza alguns segundos antes de tratar todo o conjunto de dados. Um modelo pode aprender artefatos deixados em seu áudio de treinamento. Verifique vários clipes de sessões diferentes antes de enviar.

### Limpe um conjunto de dados localmente com Ultimate Vocal Remover (UVR)

UVR separa um arquivo de áudio em faixas chamadas stems. Use-o quando a voz alvo for misturada com música, efeitos sonoros ou outros vocais. Se você já possui uma gravação de voz limpa, mantenha a original. O UVR processa o áudio no seu computador após o download dos modelos necessários. Kaggle executa o trabalho de treinamento RVC posterior separadamente.

#### Instale o UVR e prepare um clipe de teste

1. Baixe o instalador ou pacote para o seu sistema operacional em [Versões UVR](https://github.com/Anjok07/ultimatevocalremovergui/releases). Inicie o aplicativo de desktop após instalá-lo.
2. Faça uma cópia de 15 a 30 segundos de um exemplo que contenha uma linha clara e uma seção onde a música se sobrepõe. Mantenha o original seguro.
3. Clique em **Selecionar entrada** e escolha o clipe de teste. Use **Select Output** para escolher uma nova pasta gravável, como `uvr-test`. Escolha **WAV** para o formato de saída.
4. Selecione um **Método de processo** e um modelo que separe **vocais** de **instrumental**, por exemplo, um modelo de vocais em **MDX-Net**. Se a lista estiver vazia, abra as configurações **Centro de download**, selecione a família de modelos correspondente e baixe um modelo adequado. Volte para a janela principal e selecione-a.
5. Habilite **Conversão de GPU** somente se a versão instalada reconhecer um dispositivo compatível. Se essa opção causar erro, desligue-a e teste na CPU. O processamento da CPU pode ser mais lento, então comece com um clipe curto.

#### Separe os vocais e ouça

Clique em **Iniciar processamento**. Quando terminar, encontre a haste vocal na pasta de saída. Alguns modelos também escrevem uma haste instrumental. Toque o original e os vocais em volume semelhante. Verifique consoantes, respirações, notas retidas e seções onde o acompanhamento é alto. Se você ainda ouvir instrumentos ou a voz parecer aquosa ou metálica, compare outro modelo no mesmo clipe de teste antes de processar o conjunto de dados completo.

Se você selecionou o radical errado, verifique os nomes dos arquivos ou ouça cada saída. Mantenha aquele que contém sua voz principal alvo.

#### Limpe os problemas restantes, um de cada vez.

| O que resta | O que tentar em UVR |
| --- | --- |
| Backing vocals ou harmonias | Alimente a haste vocal isolada em um modelo destinado à separação de solo e apoio, se sua instalação oferecer uma. Mantenha a saída principal e verifique se o vocal alvo está completo. |
| Reverberação entre frases | Experimente um modelo destinado à reverberação, se disponível. Compare o antes e o depois na mesma passagem. Mantenha a haste original se a reverberação danificar consoantes ou notas retidas. |
| Repetições audíveis atrasadas | Teste um modelo de remoção de eco, se disponível. Se remover palavras ou distorcer a respiração, use outra tomada ou exclua a seção afetada. |
| Zumbido ambiente, picos cortados ou outras vozes | Verifique o original. Se o tratamento continuar prejudicando a voz, substitua ou exclua o clipe. A separação não pode reconstruir picos perdidos no corte. |

Processe o conjunto completo somente depois que uma breve comparação parecer correta. Use o Audacity ou outro editor para cortar material inutilizável. Mantenha pausas e respirações naturais, exporte os clipes aprovados como WAV e coloque apenas esses clipes no ZIP do conjunto de dados. Mantenha as hastes instrumentais e rejeitadas fora do ZIP. Em seguida, carregue-o em **Training** no Ilaria RVC e confirme **Path to Dataset** aponta para as gravações importadas.

### Traduzir o fluxo de trabalho original do Applio para Ilaria RVC

| Etapa no fluxo de trabalho original | O que fazer neste notebook Ilaria RVC |
| --- | --- |
| Configure uma conta Kaggle e verifique-a | Faça login e verifique se você pode ativar GPU e Internet. Conclua a verificação se Kaggle solicitar. |
| Escolha um túnel ou modo de persistência | Execute o notebook oficial em ordem e abra a URL do Gradio da etapa 4. Ele cuida do túnel. Faça backup do experimento fora da sessão temporária usando a célula de exportação. |
| Carregue o conjunto de dados e cole seu caminho | Use o seletor de upload no Ilaria RVC, espere que ele termine e confirme **Path to Dataset** aponta para seus arquivos preparados. Combine o nome do modelo com o que você inserirá ao exportar pontos de verificação. |
| Escolha uma segmentação de dados e pós-normalização | **Dados do processo** controla o fatiamento e ajusta cada fatia automaticamente. O fluxo de trabalho Ilaria RVC não possui alternância separada do Applio Post. Combine a taxa de amostragem de treinamento com a arquitetura e os pré-treinos. A reamostragem não pode restaurar detalhes ausentes. |
| Defina os arquivos de treinamento silenciosos como zero | Deixe **Arquivos de treinamento silenciosos** como padrão para sua primeira corrida. Se seus clipes já possuem pausas naturais e não há longas seções vazias, compare uma execução separada com zero. Verifique ambas as saídas nas mesmas pausas prolongadas. |
| Escolha o tamanho do lote pelo comprimento do conjunto de dados | Comece com 2 ou 4 se não tiver certeza e use 8 somente se a GPU tiver espaço livre e a configuração funcionar. Verifique o log e VRAM. Reduza o lote após um erro de falta de memória. Kaggle não implica um multiplicador de lote fixo e o comprimento do conjunto de dados por si só não determina o tamanho do lote. |
| Treine até que o modelo pareça correto | Salve a cada 5 ou 10 épocas se o tempo disponível e o espaço em disco permitirem. Compare as exportações de inferência salvas nos mesmos clipes de teste. Não existe uma meta de época universal, e estender uma execução até 500 épocas não pode reparar um conjunto de dados de baixa qualidade. |

#### Ouça antes de decidir qual ponto de verificação manter.

Use um pequeno conjunto de clipes retidos. Inclua uma frase simples, com consoantes agudas e uma pausa. Para cantar, teste também uma nota sustentada e uma transição entre registros. Comece com a afinação zero, a recuperação desativada e os efeitos opcionais desativados. Mantenha o modelo cujos resultados sejam mais claros em todo o conjunto. Se todas as versões tiverem as mesmas respirações metálicas ou palavras abafadas, revisite o conjunto de dados em vez de estender a execução às cegas.

Mantenha a exportação de inferência e seu índice correspondente, se você usou um. Para continuar uma execução mais tarde, salve o experimento completo com a célula de exportação do notebook e mantenha o conjunto de dados original separadamente. Abra o ZIP baixado e verifique seu conteúdo antes de encerrar a sessão Kaggle.

## 5. Treine uma voz e salve seu trabalho

1. Em **Treinamento**, escolha um novo **Nome do modelo**. Importe seu áudio ou ZIP por meio dos controles de upload do conjunto de dados. Aguarde a conclusão da importação e confirme que **Path to Dataset** aponta para as gravações importadas.
2. Execute o **Dataset Checker** e ouça quaisquer gravações suspeitas. Confirme se a arquitetura RVC V2, a taxa de amostragem, as configurações do incorporador e do pitch correspondem aos pré-treinamentos G/D selecionados, caso você os use. Comece com um tamanho de lote adequado à GPU alocada.
3. Execute **Dados do Processo** e, em seguida, **Extração de Recursos**. Leia o status de cada um antes de continuar. Se alterar o conjunto de dados ou o codificador, prepare novos ficheiros para essa experiência antes do treino.
4. Execute **Train Pth** com um primeiro alvo modesto e salve checkpoints periódicos. Mantenha um pequeno clipe de teste fora dos dados de treinamento. Compare os pontos de verificação exportados no mesmo clipe antes de iniciar uma execução mais longa.
5. Crie o índice de recursos se precisar de recuperação e, em seguida, tente primeiro a exportação de inferência em **Index Ratio 0**. Para obter uma explicação detalhada de cada configuração, consulte [Controles de treinamento e fluxo de trabalho](training-controls.md).
6. Se você quiser parar no meio da execução, use **Parar e salvar** dentro do Ilaria RVC e espere até que o log confirme o salvamento. Baixe os resultados enquanto a sessão Kaggle ainda está ativa.

## 6. Baixe um backup antes de sair

A célula opcional **Exportar resultados** do notebook faz um arquivo em `/kaggle/working/Ilaria-RVC-results.zip`. Uma sessão ao vivo é temporária. Verifique se você tem o backup em seu próprio computador antes de interromper ou redefinir a sessão.

- **Apenas para arquivos de inferência:** defina `EXPORT = True` e deixe `TRAINING_MODEL = ""`. O arquivo inclui arquivos `.pth` e `.index` em `models`, além de arquivos gravados em `InferOutput`. Use o botão de download do player para qualquer conversão que não tenha gravado um arquivo ali.
- **Para manter um experimento de treinamento retomável:** aguarde **Parar e salvar** ou até que o treinamento termine de ser salvo. Defina `EXPORT = True` e insira o nome exato do experimento em `TRAINING_MODEL`. Digite apenas o nome, sem o caminho da pasta. A exportação inclui sua árvore `logs/<name>` juntamente com as saídas regulares.
- Execute essa célula de código. Abra o link exibido ou baixe **Ilaria-RVC-results.zip** por meio do Kaggle **Output**. Abra o ZIP localmente e confirme que contém o que você precisa. Mantenha seu conjunto de dados original separadamente. A célula de exportação não empacota `datasets`.

Para parar apenas o aplicativo, defina `STOP = True` em **Parar ou reiniciar** e execute essa célula opcional após salvar. Execute a etapa 4 novamente para reabri-la na mesma sessão. Interromper ou redefinir toda a sessão Kaggle é uma ação separada.

## Solução de problemas

| O que você vê | O que fazer primeiro |
| --- | --- |
| A etapa 1 diz para ativar uma GPU | Selecione uma GPU em **Acelerador**, reinicie se solicitado e execute novamente a partir da etapa 1. |
| O notebook relata um checkout ou commit diferente | Inicie uma sessão limpa com o oficial caderno. Faça backup de quaisquer resultados existentes antes de alterar ou redefinir a sessão. |
| A aba Gradio está em branco ou expirou. | Confirme se a sessão ainda está em execução. Use o link mais recente da etapa 4. Se o link não puder ser criado, verifique a Internet e leia a saída da célula. |
| Conversão ou treinamento ficam sem memória | Feche os trabalhos concorrentes na sessão e experimente um clipe curto. Para treinamento, reduza o tamanho do lote e desative o cache opcional do conjunto de dados da GPU, se disponível. Salve antes de interromper uma corrida. |
| Exportar diz que não há resultados | Converta ou exporte uma voz primeiro. Verifique o diretório de saída e confirme se o nome do experimento opcional do arquivo corresponde exatamente ao **Nome do modelo**. |
| Alguns arquivos desaparecem após uma redefinição | Inicie a configuração novamente e reimporte seus backups locais. A pasta de trabalho pertence à sessão ativa. |

Se o problema se repetir, observe a seção com falha, o nome da GPU da etapa 1 e o primeiro erro da saída da célula. O notebook também grava o log de inicialização do aplicativo em `/kaggle/working/.ilaria-notebook/startup.log`. Remova o URL do Gradio de qualquer registro que você compartilhar. Consulte [Solução de problemas RVC](../reference/troubleshooting.md) para diagnóstico de modelo e áudio.
