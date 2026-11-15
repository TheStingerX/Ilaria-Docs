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
