---
label: "Instale e verifique uma voz"
icon: ":package:"
order: 96
permalink: /ilaria-rvc/applio/models/
---
# Instale uma voz no Applio

Coloque os downloads do modelo em uma pasta conhecida e extraia qualquer ZIP lá. Mantenha as notas do editor ao lado dos arquivos. Use modelos de fontes em que você confia.

| Você tem | O que fazer com isso |
| --- | --- |
| Uma exportação de voz como `ExampleVoice.pth` | Importe-a como modelo de inferência. |
| Um `.index` fornecido para essa voz | Mantenha-o ao lado do seu modelo. Use-o se quiser testar a recuperação. |
| Arquivos como `G_100.pth` e `D_100.pth` | Guarde-os para treinamento ou retomada. Solicite a exportação de inferência se desejar apenas converter áudio. |
| Informações sobre o incorporador, vocoder ou ID do alto-falante | Anote. Você pode precisar dele ao escolher os controles de conversão. |

Um incorporador descreve o conteúdo de áudio do modelo de voz. Combine o incorporador do treinamento antes de alterar qualquer configuração de pitch ou recuperação. Se uma exportação usar um incorporador personalizado, obtenha os arquivos correspondentes do editor.

## Importação de área de trabalho

1. Abra **Modelos → Baixar modelos**. Para obter um link público compatível, insira-o em **Baixar do link** e use **Download**. Aguarde um status de trabalho bem-sucedido antes de atualizar a biblioteca.
2. Para arquivos já extraídos, escolha **Carregar arquivos de modelo** no mesmo espaço de trabalho. Selecione `.pth` e use **Salvar arquivo**. Repita para o índice se algum veio com a voz.
3. Atualizar **Biblioteca de Modelos**. Use **Inspecionar** para verificar metadados como taxa, incorporador, codificador de voz ou slots de alto-falante disponíveis, onde esses campos existirem. Em seguida, escolha **Usar** para levar o modelo para o espaço de trabalho de conversão.
4. Verifique se o modelo selecionado é sua nova voz antes de executar a conversão.

## Importação de Gradio

1. Abra **Models**, chamado **Download** em algumas versões. Insira o link do modelo no painel de download ou carregue a voz e o índice extraídos por meio de **Drop Files**.
2. Após a instalação, abra **Convert Audio** ou **Inference** e atualize a lista de modelos. Escolha a nova voz pelo nome.
3. Se estiver copiando arquivos manualmente, procure o diretório ativo logs/models da instalação que você realmente iniciou. Uma instalação do Gradio normalmente usa um layout como `logs/ExampleVoice/ExampleVoice.pth`, com o índice correspondente no mesmo diretório. O caminho mostrado por uma instalação do Desktop pode ser diferente.

## Confirme se o mecanismo pode usá-lo.

1. Use um clipe isolado de fala que dure cerca de dez segundos. Comece com pitch em 0, efeitos desligados e taxa de recuperação de 0. Se o modelo tiver vários alto-falantes, selecione o ID do alto-falante pretendido.
2. Escolha o incorporador documentado e execute uma única conversão. Confirme se o resultado pode ser reproduzido e se você consegue reconhecer as palavras fornecidas.
3. Se você tiver um índice correspondente, salve primeiro a linha de base. Selecione o índice, aumente um pouco a taxa de recuperação e execute o mesmo clipe novamente. Mantenha o resultado que funcionar melhor para aquela voz.

Se um modelo desaparecer após a atualização, verifique sua extensão de arquivo e verifique onde a instalação selecionada mantém os modelos. Se a voz estiver listada, mas produzir um erro no momento do carregamento, leia o primeiro erro de carregamento do modelo. Verifique se você forneceu uma exportação de inferência e se seu build dá suporte à arquitetura. Se um arquivo veio de um download do navegador, verifique se o navegador salvou o arquivo do modelo real e não salvou uma página de login HTML.
