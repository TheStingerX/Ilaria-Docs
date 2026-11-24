# Guia do MVSep: modelos e presets recomendados

Abaixo estão os melhores presets do MVSep para preparar faixas vocais ultra-limpas (para treino RVC, covers ou conversão de voz), com **links diretos** que pré-selecionam exatamente o algoritmo e as opções corretas.

## 1. Remoção de música e efeitos (Vocals & SFX Removal)

Começa com [MelBand Roformer · becruily deux](https://mvsep.com/home?sep_type=48&add_opt1=11) para separar as vozes do instrumental. Compara com **BS Polarformer**. Para diálogos com efeitos sonoros, experimenta **MVSep DnR v3**.

[BS Polarformer](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0) · [MVSep DnR v3](https://mvsep.com/home?sep_type=123&add_opt1=163)

## 2. Separar voz principal e coros (Lead & Back Vocals)

Experimenta [BS Roformer · anvuew](https://mvsep.com/home?sep_type=49&add_opt1=7&add_opt2=0) para a **voz principal** e [BS Roformer · anvuew](https://mvsep.com/home?sep_type=49&add_opt1=7&add_opt2=0). For **backing vocals (BGV)**, start with [BS Roformer · frazer & becruily](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0) para as **vozes de apoio (BGV)**. Compara os resultados no mesmo refrão.

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

1. **Extrair voz / fala**: Compara Deux e BS Polarformer nas canções. Usa DnR v3 para diálogos com efeitos sonoros.
2. **Isolar voz principal** *(apenas músicas com coros)*: Usa anvuew para a voz principal e frazer & becruily para as vozes de apoio.
3. **Remover reverberação**: executa **DeReverb Stereo** e **DeReverb Room** (mais **DeEffect** apenas se persistirem efeitos vocais ou reverb forte).
4. **Limpeza final**: termina com **DeNoise by aufr33 and gabox** e transfere o resultado em **WAV**.
