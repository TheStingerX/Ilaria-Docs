# Lightning AI Studio

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb) · [Lightning AI Studio](https://lightning.ai/)

## Antes de começar

Prepara um WAV curto e limpo, um modelo compatível para inferência e uma cópia do conjunto de dados se fores treinar.

1. Cria um Studio com GPU e abre o notebook carregado no JupyterLab.
2. Executa as células 1 a 4 para verificar a GPU, instalar dependências, descarregar pesos e iniciar a interface.
3. Abre no **Port viewer** a porta indicada (7865 por predefinição) e mantém-na privada.

## Verificar as células

Confirma que a primeira célula deteta uma GPU NVIDIA. Espera que as dependências acabem de instalar. Para inferência, podes usar `TRAINING_SAMPLE_RATES = []`. Mantém `DOWNLOAD_FCPE` se usares FCPE.

## 4. Converta uma gravação

1. Na aba do navegador Ilaria RVC, abra **Outros → Importar modelos locais**. Carrega o ficheiro do modelo de inferência (`.pth`) e, se o tiveres, o índice opcional correspondente (`.index`). Também podes carregar um ZIP compatível com estes ficheiros. Aguarde a conclusão da importação. Em alternativa, abre **Other → Download models from Hugging Face, Google Drive or MEGA**, cola uma ligação pública para um ZIP compatível, `.pth` ou `.index` e clica em **Download and install model**. Se o modelo e o índice opcional tiverem ligações diferentes, descarrega-os um de cada vez.
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

UVR separa um arquivo de áudio em faixas chamadas stems. Use-o quando a voz alvo for misturada com música, efeitos sonoros ou outros vocais. Se você já possui uma gravação de voz limpa, mantenha a original. O UVR processa o áudio no seu computador após o download dos modelos necessários. Cloud executa o trabalho de treinamento RVC posterior separadamente.

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

## 5. Treine uma voz e salve seu trabalho

1. Em **Treinamento**, escolha um novo **Nome do modelo**. Importe seu áudio ou ZIP por meio dos controles de upload do conjunto de dados. Aguarde a conclusão da importação e confirme que **Path to Dataset** aponta para as gravações importadas.
2. Execute o **Dataset Checker** e ouça quaisquer gravações suspeitas. Confirme se a arquitetura RVC V2, a taxa de amostragem, as configurações do incorporador e do pitch correspondem aos pré-treinamentos G/D selecionados, caso você os use. Comece com um tamanho de lote adequado à GPU alocada.
3. Execute **Dados do Processo** e, em seguida, **Extração de Recursos**. Leia o status de cada um antes de continuar. Se alterar o conjunto de dados ou o codificador, prepare novos ficheiros para essa experiência antes do treino.
4. Execute **Train Pth** com um primeiro alvo modesto e salve checkpoints periódicos. Mantenha um pequeno clipe de teste fora dos dados de treinamento. Compare os pontos de verificação exportados no mesmo clipe antes de iniciar uma execução mais longa.
5. Crie o índice de recursos se precisar de recuperação e, em seguida, tente primeiro a exportação de inferência em **Index Ratio 0**. Para obter uma explicação detalhada de cada configuração, consulte [Controles de treinamento e fluxo de trabalho](../train/training-controls.md).
6. Se você quiser parar no meio da execução, use **Parar e salvar** dentro do Ilaria RVC e espere até que o log confirme o salvamento. Baixe os resultados enquanto a sessão Cloud ainda está ativa.

## Exportar e parar

Ativa `EXPORT = True` e usa `INCLUDE_CHECKPOINTS` para retomar o treino. Guarda o ZIP antes de executar `STOP = True`.

### Verificar o ZIP

Confirma o WAV e o modelo exportados. Ativa `INCLUDE_CHECKPOINTS` para retomar o treino e guarda os dados originais em separado.

## Resolver problemas

Lê o primeiro erro e repete a célula depois de o corrigir. Se o modelo não aparecer, verifica o registo de importação. Se faltar memória na GPU, reduz o lote.

[Ilaria RVC na cloud](cloud.md)
