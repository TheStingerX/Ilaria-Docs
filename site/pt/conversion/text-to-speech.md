# Texto para fala e RVC

[Descarregar o Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Texto para fala (TTS) gera uma gravação de origem a partir das palavras que você digita. O RVC então aplica um modelo de voz separado a essa gravação. A voz TTS fornece pronúncia, sotaque, timing e a maior parte da expressão. O modelo alvo muda a forma como esse desempenho soa.

## Faça um pequeno teste

1. Abra a área de trabalho do TTS. Digite algumas frases ou forneça um arquivo de texto UTF-8.
2. Escolha um idioma e voz de origem. Ilaria RVC oferece vozes do Microsoft Edge online e vozes do Windows instaladas para uso offline. Cada mecanismo de voz pode expor um conjunto diferente de controles de taxa, volume e tom de origem.
3. Gere e ouça a fonte antes de convertê-la. Se um nome ou sigla for pronunciado incorretamente, ajuste o texto ou selecione uma voz de origem mais adequada.
4. Selecione um modelo e converta. Comece com uma transposição neutra e julgue as gravações originais e convertidas lado a lado.
5. Gere scripts longos em parágrafos quando for prático. Mantenha as edições e exportações nomeadas de forma consistente para que uma única frase possa ser regenerada posteriormente.

## Diagnosticar o estágio certo

 | O que você ouve | O que tentar |
| --- | --- |
 | A fonte enfatiza a palavra errada | Adicione pontuação, reescreva a frase ou tente uma voz TTS diferente. |
 | A fonte parece apressada. | Diminua a velocidade da fonte ou divida o texto em frases mais curtas. |
 | A fala é clara antes da conversão e monótona depois. | Experimente um extrator de altura diferente ou menos influência de recuperação. |
 | A lista de voz online não está disponível. | Verifique a conectividade ou escolha uma voz do Windows instalada. |
 | A voz muda de tom entre os parágrafos | Use a mesma voz de origem, configurações e modelo de destino para cada parágrafo. |

A conversão de voz preserva grande parte da entrega da fonte. Escolha a fonte com base no desempenho que você deseja manter. Para mais comparações, use o [guia de qualidade de áudio](audio-quality.md).

[Projeto Ilaria RVC e motores TTS suportados](https://github.com/TheStingerX/Ilaria-RVC)
