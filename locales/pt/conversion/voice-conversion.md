---
label: "🎙️ Conversão de voz"
order: 95
permalink: /voice-conversion/
description: "A conversão de voz começa com uma performance. A saída geralmente segue as palavras originais, o tempo, a articulação e o contorno do tom enquanto altera o som da voz."
---
# Converta uma gravação com Ilaria RVC

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

A conversão de voz começa com uma performance. A saída geralmente segue as palavras originais, o tempo, a articulação e o contorno do tom enquanto altera o som da voz. As decisões sobre a entrega ainda começam com a gravação original. Para um cover cantado, planeje converter um vocal principal isolado e depois mixar o vocal convertido com o instrumental.

## Faça uma conversão de linha de base

1. Abra o Ilaria RVC e importe o modelo de inferência que deseja usar. Um índice opcional pertence ao ponto de verificação para o qual foi construído. Se uma voz importada estiver ausente do seletor, consulte [Modelos e arquivos RVC](../start/models.md).
2. Abra **Single Inference**, escolha a voz e arraste uma gravação curta que você possa reconhecer de ouvido. Uma frase com pausa, várias consoantes e uma vogal mais longa é uma referência útil.
3. Defina **Pitch** como zero e **Index Ratio** como zero. Combine o incorporador de conteúdo com aquele usado no treinamento quando o autor do modelo o fornecer. Comece com o extrator de pitch padrão do aplicativo e deixe o processamento de áudio opcional desativado.
4. Converta o arquivo e verifique a saída. Use o reprodutor de forma de onda para revisitar a mesma frase e salve uma cópia WAV ou FLAC como linha de base.
5. Compare o clipe original e o clipe convertido em níveis de reprodução semelhantes. Observe o primeiro problema audível e use [Tom e qualidade de áudio](audio-quality.md) para decidir o que alterar.

As versões atuais do Ilaria RVC procuram automaticamente um índice correspondente quando você seleciona uma voz. Selecionar um índice e dar-lhe influência são ações separadas. Um índice carregado contribui apenas quando **Index Ratio** está acima de zero. Compilações mais antigas podem mostrar um layout diferente ou solicitar que você selecione o índice manualmente.

## Escolha uma fonte adequada ao trabalho

 | Fluxo de trabalho | Prepare a fonte | Ouça |
| --- | --- | --- |
 | Diálogo ou narração | Use um alto-falante por faixa de entrada e mantenha uma pequena pausa natural entre as linhas. | Palavras claras, terminações de palavras intactas e tom consistente entre as frases. |
 | Um vocal principal sobre a música. | Isole o líder. Deixe o instrumental, as vozes de apoio e as harmonias em suas próprias faixas. | Notas sustentadas e consoantes estáveis ​​que ainda se alinham com a batida. |
 | Múltiplas tomadas | Rotule cada tomada por cena ou seção e mantenha os nomes dos arquivos originais em suas anotações. | Uma voz consistente em tomadas gravadas em diferentes níveis ou tons. |
 | Texto falado através de TTS | Visualize a fala gerada antes de aplicar o modelo. Ajuste primeiro a pontuação ou fraseado no texto. | Pronúncia correta e ritmo intencional antes da etapa RVC. |

Se um vocal separado ainda contém pratos altos ou outro cantor, compare-o com uma tomada mais limpa ou separação. Esses sons chegam ao mecanismo de conversão junto com a voz pretendida. Mantenha as respirações e os finais das palavras onde forem importantes para a performance.

## Converter um lote

Abra **Batch Inference** depois que um único arquivo produzir um resultado utilizável. Agrupe arquivos que precisam do mesmo modelo, pitch e perfil de processamento. Execute um arquivo representativo de cada grupo e salve em um local de saída separado para poder comparar os resultados com segurança.

Para uma música longa, ouça uma seção com notas altas ou baixas expostas antes de converter o arquivo inteiro. **Split Audio** pode ajudar com gravações longas ou limitações de memória. Ouça as junções de segmentos e as pausas após a execução. Se uma versão do aplicativo expor um console ou log de conversão, use-o para identificar quaisquer itens com falha e tente novamente esses arquivos separadamente.

## Converter fala gerada

Em uma versão com o espaço de trabalho **TTS**, forneça texto ou um arquivo de texto UTF-8. As versões atuais do Ilaria RVC oferecem vozes online do Microsoft Edge e vozes instaladas do Windows para TTS offline. Escolha uma voz de origem no idioma do script, ouça a pronúncia e as pausas e, em seguida, aplique o modelo RVC à gravação gerada. Se o primeiro estágio ler um nome incorretamente, corrija o texto ou altere a voz do TTS primeiro. O RVC geralmente carrega essas escolhas de pronúncia de origem.

Quando a privacidade ou uma conexão não confiável for importante, selecione uma voz do Windows instalada e verifique se ela funciona com o seu texto antes de iniciar um trabalho longo. A opção Edge requer uma conexão de rede.

## Salve a conversão e suas configurações

- Mantenha um master WAV ou FLAC não processado antes de adicionar compactação, reverberação ou limitação.
- Para música, alinhe o vocal convertido com o original, verifique seu tempo nas consoantes e ouça tanto solo quanto na mixagem antes de exportar.
- Salve suas configurações junto com o resultado. Inclua o arquivo de origem, modelo e versões de índice, ID do alto-falante, se aplicável, incorporador, extrator de pitch, mudança de pitch, proporção de índice, processamento e formato de saída.
- Quando um modelo estiver faltando ou a inferência falhar antes de produzir o áudio, comece com [Solução de problemas](../reference/troubleshooting.md). Para conversão de microfone, consulte [Conversão de voz em tempo real](real-time.md).

## Converter uma gravação no RVC WebUI (Mainline - Original RVC) {#convert-a-recording-in-mainline-rvc}

### Configurar a WebUI

No Windows, use um pacote RVC WebUI (Mainline - Original RVC) compatível com o seu hardware. Extraia todo o arquivo para um diretório local antes de executar seu inicializador. Pacotes do Windows que incluem `go-web.bat` usam-no para iniciar o WebUI local. Deixe o console aberto durante a conversão. Se o navegador não abrir automaticamente, use o endereço local impresso no console.

### Carregue o modelo e converta

Coloque o ponto de verificação de inferência em `assets/weights` e seu índice de recuperação correspondente, se fornecido, em `logs`. Abra **Model Inference** e atualize as listas de voz e índice. Escolha o ponto de verificação e o índice correspondente. Defina a taxa de recuperação como zero para modelos sem índice.

Forneça ao WebUI o caminho completo para um arquivo WAV local curto. Se o caminho falhar, copie o arquivo de teste para um local simples como `C:\RVC\input\test.wav`. Mantenha a transposição em zero para a primeira passagem e selecione RMVPE se sua construção oferecer isso. Clique em **Converter**, ouça no reprodutor de saída e salve o resultado usando seu controle de download. Se a geração falhar, leia a mensagem do console antes de alterar as configurações. Um modelo que não aparece na lista geralmente precisa ser movido para o diretório de pesos ou redescoberto usando atualização.

## Converta uma gravação no Applio

### Configure um teste de arquivo único

No Desktop, espere até que o mecanismo esteja pronto, adicione o modelo de inferência à biblioteca e abra **Convert Audio** no modo de arquivo único. No Gradio, abra a interface do navegador e selecione **Convert Audio** ou **Inference**, dependendo da versão. Atualize a lista de modelos após adicionar um ponto de verificação, caso ele esteja ausente.

Selecione a voz e seu índice emparelhado e confirme o incorporador de conteúdo esperado por esse modelo. Carregue uma gravação curta e escolha WAV ou FLAC para o teste. Verifique as configurações transferidas de uma execução anterior, especialmente pitch, recuperação e efeitos. Uma linha de base útil começa em zero semitons com efeitos desativados. Inicie o trabalho uma vez, aguarde a saída e compare a mesma frase nas duas gravações.

### Ajuste o teste antes de executar um lote

 | O que você ouve | O que tentar |
| --- | --- |
 | As notas saltam ou oscilam | Compare os extratores de altura usando a mesma frase e teste a transposição separadamente. |
| A voz convertida mantém o timbre original | Os encoders HuBERT genéricos podem preservar características do locutor. Confirma que o encoder é compatível e testa gravações limpas sem recuperação. Se o encoder de treino preservar o timbre original, volta a treinar com um encoder compatível, como o ContentVec, e recria o índice. |
| Sibilantes ou respirações distorcidas | Testa separadamente menos recuperação e mais proteção de sons surdos. Se o problema persistir em várias gravações limpas, corrige ou acrescenta exemplos no conjunto de treino e volta a treinar o modelo. |
 | A fala tem um nível irregular. | Ajuste o envelope de volume ou nivele a faixa finalizada. Verifique se a própria fonte está limpa. |

Quando a linha de base funcionar, mude para **Batch** e escolha vários arquivos ou um diretório de entrada, dependendo da edição. Mantenha a saída em um local separado. Use uma execução diferente para arquivos que precisam de configurações de pitch diferentes e ouça pelo menos um resultado de cada grupo antes de usar o lote inteiro.

Para problemas de importação de modelo e explicações detalhadas de configuração, use [Modelos e arquivos RVC](../start/models.md), [Pitch e qualidade de áudio](audio-quality.md) e [Solução de problemas](../reference/troubleshooting.md).
