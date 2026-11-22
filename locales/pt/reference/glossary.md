---
label: "Glossário"
icon: ":book:"
order: 94
permalink: /glossary/
description: "Consulte Fundamentos RVC, Modelos e arquivos e Treinamento para esses termos no contexto."
---
# Glossário

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

 | Termo | Significado |
| --- | --- |
 | Inferência | Usando um modelo treinado para converter uma gravação. |
 | Checkpoint | Arquivo contendo pesos do modelo aprendido. Os pontos de verificação de currículo e as exportações de inferência têm funções diferentes. |
 | Embedder | Componente que extrai uma representação do áudio fonte para o mecanismo de conversão. |
 | Índice | Coleta opcional de vetores de recursos aprendidos usados ​​durante a recuperação. |
 | Taxa de índice | Quão fortemente uma implementação usa recursos recuperados durante a conversão. |
 | F0 | Frequência fundamental, usada para representar o tom ao longo do tempo. |
 | Extrator de pitch | Algoritmo que estima F0 a partir de uma gravação. |
 | Semitom | Um duodécimo de oitava. Uma mudança de 12 semitons equivale a uma oitava. |
 | Vocoder | A parte do pipeline que gera a forma de onda a partir de suas entradas condicionantes. |
 | Taxa de amostragem | O número de amostras de áudio por segundo. É distinto da versão do modelo e da transposição de pitch. |
 | Pré-treino | Pesos iniciais usados ​​ao treinar um novo modelo. |
 | Época | Uma passagem pelo conjunto de dados de treinamento na configuração de treinamento normal. |
 | Etapa | Uma atualização de treinamento. O tamanho do lote e o tamanho do conjunto de dados afetam a relação entre etapas e épocas. |
 | Haste | Uma parte isolada de uma mixagem, normalmente vocal ou instrumental. |
 | Latência | O tempo entre um evento de entrada e sua saída audível. |

Consulte [Fundamentos RVC](../start/rvc-fundamentals.md), [Modelos e arquivos](../start/models.md) e [Treinamento](../model-training/training.md) para esses termos no contexto.

## Controles Ilaria RVC

Estas entradas são adaptadas do glossário incorporado no Ilaria RVC. Os controles disponíveis podem variar de acordo com a versão.

 | Controle | Significado |
| --- | --- |
 | Modelo de voz | Seleciona um ponto de verificação de inferência e procura seu índice correspondente. |
 | Atualizar | Verifica novamente a biblioteca de modelos. Verifique sua seleção novamente depois. |
 | Descarregar voz da VRAM | Libera recursos de inferência para liberar memória da GPU para outras tarefas. |
 | ID do alto-falante | Seleciona um slot de voz dentro do modelo carregado. Use 0 para um modelo típico de alto-falante único. |
 | RMVPE e FCPE | Extratores de pitch que estimam F0 ao longo do tempo. |
 | ContentVec / HuBERT | ContentVec é um codificador de conteúdo estilo HuBERT usado em fluxos de trabalho RVC padrão. Combine o codificador usado no treinamento. |
 | Mixagem de envelope de volume | Define o quão próximo a dinâmica de saída segue a fonte. |
 | Proteger | Reduz a influência da recuperação em consoantes surdas e respirações. Um valor mais baixo proporciona uma proteção mais forte. Um valor de 0,5 o desativa. |
 | Reamostragem | Ajusta a taxa de saída. Um valor 0 mantém a taxa de saída do modelo. |
 | Processar dados | Preparar, reamostrar e fatiar gravações. Ilaria RVC ajusta o nível de cada fatia durante esta fase. |
 | Extração de recursos | Calcula recursos de conteúdo e informações de pitch para modelos guiados por pitch. |
 | Verificador de conjunto de dados | Sinaliza possíveis cortes, pausas longas, arquivos ilegíveis e diferenças de nível sem editar a fonte. |
 | Pré-visualizações de treinamento | Converta a mesma gravação de referência curta em várias épocas para comparação de ouvido. |
 | Gerador e discriminador | O gerador aprende a sintetizar áudio e o discriminador fornece feedback. Seu par de pontos de verificação G/D é usado para retomar o treinamento. |
 | Parar e salvar | Solicita um ponto de verificação retomável. Aguarde a confirmação antes de fechar. |
 | Épocas totais | Meta de época final, incluindo épocas concluídas antes da retomada. |
 | Informações do modelo | Exibe propriedades de pontos de verificação armazenados, como taxa, orientação de inclinação e precisão, quando disponíveis. |
 | Mesclar modelos | Combina pesos de inferência compatíveis. Comece a testar a voz mesclada com a recuperação desabilitada. |
 | FP16 e FP32 | Formatos de precisão numérica. A precisão do peso em uma exportação descreve o arquivo armazenado. |

> Os checkpoints HuBERT genéricos são desaconselhados como codificador predefinido para conversão de voz. Foram treinados para representar a fala e podem preservar informação sobre o timbre da voz original no áudio convertido. Usa o codificador esperado pelo modelo RVC, como o ContentVec se o modelo tiver sido treinado com ele.

Consulte [Conversão de voz](../conversion/voice-conversion.md) e [Treinamento](../model-training/training.md) para fluxos de trabalho usando esses controles.
