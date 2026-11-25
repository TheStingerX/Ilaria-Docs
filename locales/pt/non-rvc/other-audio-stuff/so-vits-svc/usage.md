---
label: "Utilização e treino"
icon: ":microphone:"
order: 98
permalink: /non-rvc/so-vits-svc/usage/
---

# So-VITS-SVC · Utilização e treino

[Instalação](installation.md) · [GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Converter a primeira gravação

Coloca um WAV vocal em `raw/`. Substitui os caminhos e o nome da voz no exemplo. O nome consta de `spk`. O resultado fica em `results/`.

~~~bash
python inference_main.py -m "logs/44k/G_30400.pth" -c "configs/config.json" -n "voice.wav" -t 0 -s "singer"
~~~

## Ajustar a conversão

Começa com `-t 0`. Para canto, deixa a previsão automática de tom desativada. Compara um extrator F0 de cada vez.

## Treinar um modelo

Organiza as gravações por pessoa em `dataset_raw/`. Prepara os pesos base, executa os passos do exemplo e guarda a configuração com o checkpoint.

~~~bash
python resample.py --skip_loudnorm
python preprocess_flist_config.py --speech_encoder vec768l12
python preprocess_hubert_f0.py --f0_predictor dio
python train.py -c configs/config.json -m 44k
~~~

## Resolução de problemas

Se o carregamento falhar, confirma o modelo e o JSON. Se faltar memória, reduz o lote ou a duração dos excertos.
