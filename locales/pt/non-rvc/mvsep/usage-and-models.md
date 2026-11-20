---
label: "Modelos e presets recomendados"
icon: ":control_knobs:"
order: 97
permalink: /non-rvc/mvsep/usage-and-models/
---
# Guia do MVSep: modelos e presets recomendados

Abaixo estão os melhores presets do MVSep para preparar faixas vocais ultra-limpas (para treino RVC, covers ou conversão de voz), com **links diretos** que pré-selecionam exatamente o algoritmo e as opções corretas.

## 1. Remoção de música e efeitos (Vocals & SFX Removal)

Usa estes primeiro para remover música de fundo, efeitos sonoros e ruído ambiente do áudio original.

- **BS Polarformer** - [Abrir preset no MVSep](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0)
  - Variante de alta precisão de Band-Split Roformer com **Polar Positional Embeddings (PoPE)** para contexto longo e limpo.
  - **Quando usar**: escolha principal inicial para vozes limpas com o mínimo de fugas instrumentais.
- **MVSep DnR v3** - [Abrir preset no MVSep](https://mvsep.com/home?sep_type=123&add_opt1=163)
  - Modelo cinematográfico multi-stem (*Divide and Remaster*) pensado para dividir áudio em **fala, música e efeitos sonoros (SFX)**.
  - **Quando usar**: diálogos de jogos, filmes, vídeos ou clipes com muitos efeitos sonoros.

> **Recomendação**: o **BS Polarformer** é geralmente melhor por si só, mas usar **ambos** elimina praticamente qualquer hipótese de sobrar ruído de fundo ou SFX.

## 2. Separar voz principal e coros (Lead & Back Vocals)

- **MVSep Karaoke** - [Abrir preset no MVSep](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0)
  - Isola a **voz principal (lead)** dos **coros / segundas vozes (backing vocals)**.
  - **Nota**: pode ser um pouco imprevisível e confundir coros e voz principal consoante a mistura da faixa; ouve ambas as faixas antes de apagar algo, mas continua a ser muito útil.

## 3. Remoção de reverberação (Reverb Removal)

Aplica estes na tua faixa vocal já isolada para transformar gravações com eco/reverberação em áudio seco.

- **DeReverb Stereo** - [Abrir preset no MVSep](https://mvsep.com/home?sep_type=22&add_opt1=7&add_opt2=1)
  - Atua sobre reverberação vocal estéreo e reflexões.
- **DeReverb Room** - [Abrir preset no MVSep](https://mvsep.com/home?sep_type=22&add_opt1=6&add_opt2=1)
  - Atua sobre a acústica da sala e o eco natural de ambiente.

> **Recomendação**: é melhor usar **ambos** para eliminar qualquer possibilidade de reverberação; qual usar primeiro depende exclusivamente do teu áudio específico.

## 4. Remoção de ruído de fundo (Background Noise Removal)

- **DeNoise by aufr33 and gabox** - [Abrir preset no MVSep](https://mvsep.com/home?sep_type=47&add_opt1=1)
  - Modelo comunitário Mel-Roformer especializado em limpar chiado, estática e artefactos sem abafar os agudos.
  - **Recomendação**: usa como **passo final** para finalizar o áudio e garantir que está limpo. *(Ainda pode deixar passar algum ruído ocasional, pelo que deves conferir o WAV final de ouvido.)*

## 5. Experimental e diversos (Experimental & Miscellaneous)

- **DeEffect** - [Abrir preset no MVSep](https://mvsep.com/en/home?sep_type=47&add_opt1=1)
  - É ótimo a remover reverberação e efeitos vocais pesados (podendo até ser usado em vez de um modelo lead nalguns casos ou remover algum ruído de fundo).
  - **Aviso**: **NÃO confies no DeEffect para nada além de remover efeitos de voz e reverberação** - usa os modelos dedicados acima para separar voz/SFX e para a limpeza final de ruído.

## Fluxo passo a passo sugerido

1. **Extrair voz / fala**: passa por **BS Polarformer** (e opcionalmente **MVSep DnR v3** se restarem SFX).
2. **Isolar voz principal** *(apenas músicas com coros)*: usa **MVSep Karaoke**.
3. **Remover reverberação**: executa **DeReverb Stereo** e **DeReverb Room** (mais **DeEffect** apenas se persistirem efeitos vocais ou reverb forte).
4. **Limpeza final**: termina com **DeNoise by aufr33 and gabox** e transfere o resultado em **WAV**.
