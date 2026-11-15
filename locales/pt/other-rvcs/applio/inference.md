---
label: "🎙️ Converta uma gravação"
order: 95
permalink: /ilaria-rvc/applio/inference/
---
# Converta uma gravação no Applio

Comece com uma gravação curta que você possa reconhecer instantaneamente. O material do teste falado poderia ser “Você poderia colocar o livro azul perto da janela?” seguido por uma pausa silenciosa. Para uma música, use alguns segundos de um vocal principal isolado. O mecanismo recebe o som presente naquele arquivo, incluindo ruído da sala, acompanhamento ou outros alto-falantes.

## Faça uma conversão de referência

1. Abra **Converter Áudio**. Em versões mais antigas do Gradio, procure **Inferência**. Selecione o modo de arquivo único.
2. Selecione a voz de inferência que você [instalou](models.md) e confirme o incorporador e o ID do alto-falante. Se as configurações foram restauradas quando você alterou as vozes no Desktop, inspecione-as antes de usar a nova voz.
3. Adicione sua gravação de áudio. Use **Pitch** em 0 e desative processamento e efeitos extras. Comece com influência de recuperação em 0. Selecione WAV ou FLAC para poder comparar resultados sem perdas.
4. Inicie a conversão uma vez. No Desktop, observe o status do trabalho se o resultado estiver na fila. No Gradio, deixe o console de lançamento aberto para ver erros que não cabem no navegador.
5. Reproduza ambos os arquivos. Verifique se as palavras caem nos mesmos lugares e se a saída contém a voz alvo. Salve a saída em uma pasta que você controla e registre as configurações usadas.

## Altere um controle de cada vez

| Controle | Um primeiro experimento útil |
| --- | --- |
| Mudança de tom | Tente uma pequena mudança de semitom se a fonte estiver fora da faixa confortável da voz alvo. +12 dobra a frequência e -12 a reduz pela metade. Repita uma frase aguda e grave antes de aplicar a alteração a uma música. |
| Extrator de afinação | Compare os estimadores disponíveis quando uma nota salta ou uma frase suave perde a sonoridade. Mantenha o modelo, a transposição e a entrada fixos. |
| Proporção de recursos de pesquisa | Com o índice correto carregado, aumente a influência em pequenos passos. Ouça caracteres alvo mais fortes, consoantes abafadas ou vazamentos indesejados na fonte. |
| Volume Envelope | Um valor próximo de 0 segue mais de perto a dinâmica da fonte. Um valor próximo de 1 retém mais da dinâmica gerada. Compare sílabas baixas e altas em um volume de reprodução correspondente. |
| Proteger consoantes surdas | No mecanismo guiado por afinação atual, configurações abaixo de 0,5 ativam a proteção. Valores mais baixos aumentam. Experimente uma frase com respirações e consoantes como S, F ou T. |

**Split Audio** pode ajudar a processar um arquivo longo em partes. Ouça através das junções. **Áudio limpo** pode reduzir ruídos indesejados. Portanto, compare-o com uma linha de base limpa para obter alterações nos detalhes. **O tom proposto** deriva de uma mudança direcionada ao alvo e pode interagir com a transposição manual. Teste cada um por si. Os efeitos ativados por meio do **Pós-processamento** aplicam-se ao áudio gerado e podem mascarar um problema de conversão.

## Execute um pequeno lote

1. Coloque dois arquivos de trabalho e um exemplo mais silencioso ou mais longo em uma pasta de entrada de teste.
2. Escolha o modo em lote. Selecione a entrada e use um destino diferente onde o mecanismo possa gravar. Para o Gradio rodando em outra máquina, os caminhos devem existir nessa máquina.
3. Copie o modelo testado, incorporador, índice e configurações de pitch. Inicie o teste e inspecione os resultados antes de processar uma coleção inteira.
4. Se uma entrada falhar, converta apenas esse arquivo usando as mesmas configurações. Se falhar apenas no lote, verifique o caminho e a nomenclatura da saída. Armazene os arquivos que deseja manter fora do armazenamento temporário de trabalho.

## Diagnosticar o resultado

- **O trabalho não produziu áudio.** Leia o erro primeiro. Verifique as reproduções de entrada, o mecanismo verifica e o modelo selecionado é uma exportação de inferência.
- **O tom soa instável ou eletrônico.** Teste o incorporador correto, um estimador de tom e uma entrada limpa sem efeitos. Repita o original para ver se o ruído ou salto já estava presente.
- **A fala está presente, mas a voz alvo parece fraca.** Verifique a identificação do locutor e compare a recuperação somente se você tiver o índice correto.
- **O arquivo é cortado ou pulsado.** Teste em um nível de fonte inferior e desative o processamento que altera o ganho. Para cantar, compare o vocal isolado antes de mixá-lo novamente na faixa de apoio.
