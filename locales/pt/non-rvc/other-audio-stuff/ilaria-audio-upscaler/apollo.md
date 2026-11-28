---
label: "Apollo"
icon: ":musical_note:"
order: 95
permalink: /non-rvc/ilaria-audio-upscaler/apollo/
---

# Restaurar música com Apollo

[GitHub · Apollo](https://github.com/JusperLee/Apollo) · [Ilaria Audio Upscaler V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Quando usar

O Apollo está disponível no Ilaria Audio Upscaler V2. Processa música localmente a **44,1 kHz**, na CPU ou com NVIDIA CUDA. Experimenta com um MP3 de baixo débito e compara o detalhe estimado com o original.

## Primeiro teste

Seleciona **Apollo** e descarrega o modelo se necessário. Ocupa cerca de **63,5 MiB** e fica em `App/checkpoints/Apollo`. Mantém o dispositivo em **Auto**, adiciona um excerto curto e carrega em **Enhance audio**.

## Comparar e guardar

Ouve o mesmo excerto a **1×** e com volume semelhante. Presta atenção aos pratos e aos ataques da bateria. Carrega em **Save result**. O WAV usa **PCM de 24 bits** por predefinição e também oferece **WAV (PCM 16-bit)**.

## Resolução de problemas

Se faltar o modelo, seleciona Apollo antes de o descarregar. Se o CUDA falhar, escolhe **CPU** e testa com um WAV curto. Se surgirem artefactos, guarda o original.
