# Audio Analyzer

[Descarregar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Abre **Other → Audio Analyzer** e adiciona até oito ficheiros de áudio (original, conversão base e variantes com uma única definição alterada).

## O que cada vista mede

| Vista | O que mostra diretamente | Pergunta a responder |
| --- | --- | --- |
| **Waveform** | Amplitude no tempo | Onde estão picos, clipping plano, silêncios ou cortes? |
| **Spectrogram** | Energia por frequência no tempo | Que frequências surgem quando um artefacto começa? |
| **Average spectrum** | Equilíbrio médio de frequências | Uma versão tem ressonâncias ou desequilíbrio persistente? |
| **Pitch estimation** | Contorno F0 estimado | O tom segue a melodia sem saltos de oitava? |
| **Level & silence tables** | Níveis medidos e silêncios | Estás a comparar no mesmo volume e limiar de silêncio? |

> **O que mede vs. o que sugere:** O Audio Analyzer mede níveis, silêncios, espectro e F0 estimado, mas **não** avalia sozinho a naturalidade vocal. **Ouve sempre o excerto** no leitor antes de tirar conclusões.

## Exemplos práticos

- **Clipping:** Picos achatados no topo da **Waveform**; reduz o ganho antes de treinar ou converter.
- **Ruído de fundo:** Faixa horizontal constante no **Spectrogram** durante pausas; limpa com UVR5 ou MVSep.
- **Silêncios longos / volume:** Confirma nas **Level & silence tables**.
- **Reverberação e distorção:** Caudas esbatidas após as palavras no **Spectrogram**.
- **Consoantes surdas (`s`, `f`, `t`):** Saltos de F0 em respirações são normais.

Exporta **CSV**, **JSON** ou um **ZIP com gráficos** mantendo a mesma **FFT window**.
