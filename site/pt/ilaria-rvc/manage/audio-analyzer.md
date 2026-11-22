# Analisador de Áudio

[Baixar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Abra **Other → Audio Analyzer**. Adicione até oito arquivos de áudio para comparar. Um conjunto útil contém a entrada original, uma conversão de base e uma ou duas variantes feitas com apenas uma configuração alterada.

## O que cada visualização mede

| Visualização | O que mostra diretamente | Pergunta a responder |
| --- | --- | --- |
| **Waveform** | Amplitude ao longo do tempo | Onde estão os picos altos, clipping achatado no topo, trechos silenciosos ou emendas bruscas? |
| **Spectrogram** | Energia de frequência ao longo do tempo | Quais frequências estão presentes no momento exato em que um chiado, zumbido ou artefato começa? |
| **Average spectrum** | Equilíbrio geral de frequências | Uma versão soa visivelmente mais brilhante, mais abafada ou tem uma ressonância persistente? |
| **Pitch estimation** | Contorno F0 estimado em segmentos sonoros | O tom convertido segue a melodia/inflexão pretendida sem saltos de oitava? |
| **Level & silence tables** | Níveis medidos de volume/pico e segmentos de silêncio | Você está comparando arquivos em volumes semelhantes e usando o mesmo limiar de silêncio? |

> **O que o Audio Analyzer mede vs. o que sugere:** O Audio Analyzer plota e mede diretamente níveis de sinal, intervalos de silêncio, energia espectral e contornos F0 estimados. Ele **não** diagnostica automaticamente um timbre vocal "bom" ou "ruim" sozinho. **Ouça sempre a região selecionada** no reprodutor integrado antes de tratar uma diferença visual como problema.

## Exemplos práticos: o que observar

- **Clipping:** Picos achatados no topo atingindo a amplitude máxima na **Waveform** (muitas vezes ouvido como estalo áspero). Abaixe o ganho de entrada ou normalize a fonte antes de treinar ou converter.
- **Ruído de fundo / chiado:** Uma faixa horizontal constante ou piso claro nas frequências médias/altas no **Spectrogram** durante pausas. Limpe a fonte com UVR5 ou MVSep antes do treinamento.
- **Silêncio excessivo ou lacunas mortas:** Trechos longos e planos na **Waveform** e altas taxas de silêncio nas **Level and silence tables**. Corte pausas longas em datasets para que o treino não desperdice passos com silêncio.
- **Volume baixo demais / alto demais:** Amplitude de forma de onda muito fina (risco de amplificação ruidosa) ou picos próximos ao máximo. Confira as **Level and silence tables** para julgar comparações A/B em volume equiparado.
- **Distorção e reverberação:** Caudas horizontais borradas se estendendo após o fim das palavras no **Spectrogram** indicam reverberação da sala; picos verticais duros ou harmônicos borrados sugerem distorção ou processamento excessivo.
- **Verificação de qualidade do dataset:** Inspecione clipes brutos de origem *antes* de treinar, depois compare a mesma frase entre checkpoints. Quando a estimativa de tom parecer errática durante respirações ou consoantes surdas (`s`, `f`, `t`), ouça primeiro: sons surdos naturalmente não têm tom estável.

## Dicas de comparação e exportações

Escolha um intervalo de tempo e visualização de canal correspondentes, e mantenha a mesma **janela FFT**, escala de frequências e limiar de silêncio entre comparações. Uma janela FFT maior melhora o detalhe de frequência enquanto suaviza eventos rápidos no tempo. Exporte **CSV** ou **JSON** para medições numéricas, ou um **ZIP com gráficos** para revisão posterior.
