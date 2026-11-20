# Todos os controles de inferência explicados

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

A inferência usa uma voz treinada para converter uma gravação. Para um primeiro teste, carregue um WAV curto e limpo, selecione uma voz, deixe o Pitch em zero e mantenha os recursos opcionais desativados. Compare a entrada e a saída antes de alterar um valor.

> **Novidades da versão 2.3.0** · [RMVPE High Register](advanced-inference.md#rmvpe-high-register)

## Voz, áudio e saída

| Controle | O que faz |
| --- | --- |
| `Voice Model` | Carrega a exportação de inferência selecionada. Escolha a voz pretendida após a importação. Um ponto de verificação de treinamento G ou D é para treinamento contínuo. |
| `Refresh` | Verifica a biblioteca de modelos novamente. Verifique a voz selecionada posteriormente. |
| `Unload Voice from VRAM` | Libera a voz carregada da memória da GPU. Use-o para liberar memória para outra tarefa. |
| `Audio to convert` | Escolhe a fonte de gravação. Use um vocal seco em vez de uma mixagem com instrumentos para um teste limpo. |
| `Pitch` | Altera a afinação em semitons, de −24 a +24. Zero preserva o registro de origem. Doze semitons é uma oitava. |
| `Convert` | Inicia o trabalho. Leia o registro de saída e ouça o áudio de saída. Salve a saída do player quando disponível. |
| `Audio folder` e `Output` na inferência em lote | Escolha a pasta de entrada e o destino para vários arquivos. Teste primeiro um arquivo representativo e use uma pasta de saída separada. |

## Configurações de inferência

| Controle | O que faz e como testá-lo |
| --- | --- |
| `Speaker ID` | Escolhe um slot de voz suportado pelo modelo. Use o padrão para um modelo normal de voz única. |
| `Pitch Extraction` | Estima a afinação da fonte. Comece com RMVPE e compare outro método disponível somente se as notas saltarem ou o contorno parecer instável. |
| `Path of index` e `Auto-detect index path` | Selecione um índice opcional correspondente por caminho ou na lista detectada. Verifique se pertence a este modelo e codificador. |
| `Index Ratio` | Mistura recursos recuperados em conversão. Zero desativa a recuperação. Aumente gradualmente com um índice correspondente e compare a mesma frase. |
| `Resampling, 0=none` | Altera a taxa de áudio de saída. Zero mantém a taxa de saída do modelo. A reamostragem não pode restaurar detalhes ausentes. |
| `Input source volume / Normalized Output` | Combina a fonte e os envelopes de volume convertidos. Perto de zero segue a dinâmica da fonte mais de perto. Uma configuração de um deixa o envelope convertido no lugar. |
| `Protect clear consonants and breathing sounds` | Reduz o impacto da recuperação em sons surdos na conversão guiada por pitch. Valores mais baixos fortalecem a proteção; 0,5 desliga. Seu efeito pode ser limitado com a recuperação desativada. |
| `Median filter` | Suaviza a estimativa da inclinação da colheita quando o limite exibido está ativado. Comece com o padrão e teste-o apenas ao solucionar problemas do Harvest. |
| `Export Format` | WAV e FLAC não têm perdas. MP3, OGG e M4A podem economizar espaço para entrega. Use WAV para sua primeira comparação. |
| `F0 curve file` | Entrada avançada para uma curva de pitch personalizada em construções que a expõem. Deixe em branco para conversão diária. |

## Processamento de áudio e configurações de incorporação

- **Áudio dividido** processa seções separadas por passagens silenciosas. Experimente para entradas longas e ouça as junções.
- **Autotune** move as notas sonoras em direção às notas cromáticas próximas. **Autotune Strength** controla a intensidade com que isso ocorre. Comece com isso.
- **Tom proposto** usa o tom sonoro mediano e o **Tom alvo (Hz)** para estimar uma mudança. Experimente em um clipe curto representativo.
- **Áudio Limpo** aplica redução de ruído após a conversão. **Clean Strength** controla sua intensidade. Compare com a saída não processada para respirações danificadas ou sibilantes.
- **Formant Shifting** altera a ressonância antes da conversão. Uma **Proporção de Formantes** de 1 mantém a linha de base. Ouça as mesmas vogais durante o teste.
- **Pós-processamento** executa os **Efeitos** selecionados no áudio convertido. **Post Pitch Shift** ajusta o tom de saída, **Gain** altera o nível e **Limiter Threshold** controla onde o limitador começa a atuar. Use um efeito de cada vez ao diagnosticar um problema.
- **Modelo Incorporador** seleciona o codificador de conteúdo. Auto usa as informações do modelo quando disponíveis. **Custom Embedder** aceita os pesos .bin correspondentes e a configuração .json. Dê um nome de pasta, clique em **Instalar incorporador personalizado**, verifique o status de importação do incorporador e use **Atualizar incorporadores** se necessário. Selecione o codificador com o qual a voz foi treinada antes de testar seu índice.

Se o seu comunicado expõe **TTS**, tente primeiro uma frase curta. Escolha Edge para uma voz online ou uma voz disponível do Windows para síntese offline, selecione o idioma e a voz e visualize o resultado. Ajuste a taxa, o volume ou o tom da fonte somente onde houver suporte. Se a pronúncia estiver errada antes da conversão, corrija primeiro a fala de origem. Consulte [Texto para fala](speech.md).

> **2.2.1** · O leitor com forma de onda tem um controlo de volume para entradas, resultados e pré-visualizações. Usa-o para ouvir mais baixo ou comparar excertos a níveis semelhantes. Só altera a reprodução. Para mudar o nível do ficheiro convertido, ajusta Gain em Post-Process e volta a converter.
