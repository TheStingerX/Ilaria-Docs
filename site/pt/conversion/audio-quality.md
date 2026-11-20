# Ajuste o tom e a qualidade do áudio

[Descarregar o Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Escolha um pequeno trecho que contenha o problema. Faça uma conversão de referência e compare-a com uma configuração alterada de cada vez. Ouça em níveis semelhantes para que um resultado mais alto não vença a comparação apenas pelo volume. Para música, compare primeiro o vocal convertido sozinho e depois na mixagem.

## Tom, alcance e ressonância

O tom mede quão alto ou baixo é um som sonoro. **F0**, ou frequência fundamental, é a parte periódica do sinal a partir da qual um extrator de pitch estima o contorno. Um modelo guiado por pitch usa esse contorno ao sintetizar a saída.

**Pitch** muda esse contorno em semitons. Valores positivos aumentam e valores negativos diminuem. Cada oitava possui 12 semitons. Por exemplo, aplicar `+12` a uma nota sonora de 220 Hz resulta em 440 Hz. Uma configuração de zero mantém a referência de afinação da gravação.

Para fala, comece do zero. Se o clipe estiver muito fora da faixa confortável do modelo alvo ou soar tenso, compare com uma pequena mudança para cima ou para baixo. Para cantar sobre um instrumental existente, compare primeiro o zero. Uma mudança que altera o tom do vocal pode colidir com a faixa de apoio. As mudanças de oitava mantêm os nomes das notas, embora o modelo ainda precise lidar com o intervalo resultante. Compare as notas expostas mais baixas e mais altas antes de começar uma música inteira.

**Formantes** descrevem ressonâncias que ajudam a distinguir vogais e caracteres vocais. Use o processamento de formantes somente depois que o contorno de afinação estiver funcionando. O tom e a ressonância podem precisar de ajustes diferentes. Em construções com afinação de inferência e efeito de mudança de afinação, o primeiro altera a afinação extraída antes da síntese e o último atua no áudio resultante.

## Compare extratores de pitch

Comece com **RMVPE**, o padrão para a inferência atual do Ilaria RVC. Se o tom estiver instável, teste outro extrator disponível em sua compilação, como **FCPE** ou **Swift**. Mantenha a mesma entrada, mudança de tom, proporção de índice e formato de saída para cada execução.

- Para uma nota mantida, ouça se há uma duplicação ou redução repentina do tom pela metade. Se vários extratores falharem ao mesmo tempo, verifique se há outro cantor, um instrumento na haste vocal ou cortes graves.
- Para fala baixa, certifique-se de que a entrada contenha uma vogal clara. Aumentar o nível de um clipe que contém principalmente ruído pode dificultar o diagnóstico.
- Para um lote grande, compare primeiro um trecho das vozes de origem mais graves e mais agudas. Compare o tempo de processamento com o mesmo arquivo e configurações na máquina pretendida.

A extração de pitch e a extração de conteúdo são etapas separadas. Alterar o extrator F0 estima um contorno de afinação diferente do mesmo áudio. O incorporador de conteúdo ainda precisa corresponder ao modelo.

## Faça ajustes direcionados

 | Se você ouvir | Tente primeiro | O que ouvir |
| --- | --- | --- |
 | Uma nota salta, gorjeia ou desaparece | Compare um segundo extrator F0 compatível no mesmo trecho. | Notas sustentadas que seguem a fonte sem saltos repentinos de oitava. |
 | O timbre alvo é fraco. | Verifique o modelo, o incorporador e o índice correspondente. Compare o índice desativado com um pequeno aumento de **Índice**. | Um tom mais reconhecível com palavras ainda inteligíveis. |
 | As palavras ficam borradas após aumentar a recuperação. | Diminua a **Proporção do índice** e reproduza as mesmas consoantes. | As sílabas ficam mais claras sem perder o caráter desejado. |
| Respirações ou consoantes com som metálico | Testa o mesmo modelo com várias gravações limpas. Se o problema persistir, verifica se os dados de treino têm saturação, redução excessiva de ruído ou poucos exemplos limpos de respirações e consoantes. Corrige os dados e volta a treinar o modelo. Limpar o áudio de entrada na inferência não elimina os artefactos aprendidos. | Respirações e consoantes como `s` e `f` nítidas, sem zumbido metálico. |
 | O volume cai dentro de uma frase | Compare uma configuração diferente de **Envelope de volume**. Verifique se há uma porta na fonte e teste **Split Audio** se o problema aparecer apenas em clipes longos. | Terminações de palavras consistentes sem engolir pausas naturais. |
 | Um vocal processado soa frágil. | Desative a limpeza, a correção automática de tom e os efeitos de saída. Adicione-os novamente individualmente após uma conversão limpa. | Menos artefatos em sibilantes e vogais sustentadas. |
 | Distorção dos picos de saída. | Verifique se há cortes na forma de onda original ou convertida. Reduza o ganho desnecessário e compare antes de limitar. | Picos limpos e sem estalidos em sílabas altas. |

Evite alterar o incorporador para perseguir um som. Deve corresponder à representação do recurso na qual o modelo foi treinado. **Index Ratio** combina recursos recuperados de um índice de treinamento correspondente na conversão. Não fornece um aumento genérico de qualidade. Uma mistura alta pode tornar a pronúncia menos distinta, especialmente em uma fonte desconhecida.

No mecanismo de arquivo do Applio, uma configuração de **Volume Envelope** mais próxima de zero segue a dinâmica da fonte mais de perto. Para **Proteger consoantes surdas**, valores abaixo de 0,5 fortalecem a proteção e 0,5 a desativa nesse mecanismo. Verifique a dica de ferramenta e as notas de lançamento do seu aplicativo antes de levar esses números para outra bifurcação.

## Diagnosticar de ouvido e com o analisador

1. Marque o carimbo de data/hora do problema. Verifique se aparece na fonte, no vocal separado ou apenas no resultado convertido.
2. Se estiver na fonte, corrija a entrada primeiro. Compare uma tomada alternativa antes de usar remoção de ruído pesada. Diminuir o volume de uma gravação cortada não pode restaurar os picos ausentes.
3. Se aparecer na conversão, compare os efeitos desativados, o índice desativado e um extrator de afinação compatível em passagens separadas. Verifique o incorporador e o pacote do modelo antes de assumir que o ponto de verificação é ruim.
4. Use o **Analisador de Áudio** da Ilaria RVC, quando disponível, para comparar formas de onda, estimativas de pitch, espectros e níveis. Um gráfico de pitch pode apontar para um salto suspeito, e a fonte de áudio informa se isso fez parte da performance.
5. Confirme a melhoria em um segundo trecho. Mantenha a configuração somente se ela funcionar no material que você planeja exportar.

Para cantar, teste respirações, consoantes, vibrato e notas retidas. Para a fala, teste frases baixas e altas e pelo menos uma frase com consoantes agudas. Se a saída ainda falhar, envie uma pequena amostra permitida e suas configurações com um [relatório de solução de problemas](../reference/troubleshooting.md).
