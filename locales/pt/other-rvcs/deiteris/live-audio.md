---
label: "Encaminhar e afinar Deiteris"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/deiteris/live-audio/
description: "Usa sempre auscultadores durante a conversão ao vivo. Com colunas, a voz convertida volta a entrar no microfone e gera eco e microfonia."
---
# Encaminhar e afinar Deiteris w-okada Fork

Usa sempre **auscultadores** durante a conversão ao vivo. Com colunas, a voz convertida volta a entrar no microfone e gera eco e microfonia.

## 1. Configura os dispositivos de áudio

1. Define **Audio Input** para o teu microfone físico.
2. Define **Audio Output** para os teus auscultadores num primeiro teste local, ou para **`CABLE Input`** (saída de reprodução do cabo virtual) ao encaminhar para outras apps.
3. No **Discord, OBS, VRChat ou no jogo**, seleciona **`CABLE Output`** como microfone.
   - No Discord, desativa a **Supressão de ruído (Krisp)** e a **sensibilidade de entrada automática** para não cortar respirações e finais suaves.

## 2. Carrega um modelo e ajusta definições

1. Carrega ou seleciona um modelo **RVC `.pth`** de inferência e o respetivo ficheiro **`.index`** opcional.
2. **Chunk / Block size**: começa por volta de `0.3s` - `0.5s` (ou `192` / `256`+ conforme o controlo) para equilibrar atraso e fluidez. Baixar demais o Chunk causa engasgos robóticos.
3. **Extra Data / Context**: mantém moderado (`0.5s` - `1.0s`) para um tom estável sem sobrecarregar a GPU.
4. **Detetor F0 / Pitch**: usa **RMVPE** (mais preciso) ou **FCPE** (mais leve/rápido ao vivo); evita Crepe Full em tempo real se a inferência exceder o tempo do chunk.
5. **Tune (Pitch)**: `+12` para homem -> mulher, `-12` para mulher -> homem, `0` para o mesmo registo.
6. **Index ratio**: começa em `0.0` para testar a conversão limpa e sobe aos poucos (`0.3` - `0.6`) se necessário.

## 3. Correções comuns

- **Latência alta ou engasgos robóticos**: desativa o **Agendamento de GPU acelerado por hardware (HAGS)** nas Definições gráficas do Windows e reinicia, fecha jogos/separadores pesados e sobe o Chunk um nível.
- **Erro de PortAudio / dispositivo**: alinha todos os dispositivos de áudio para a mesma taxa de amostragem (`48000 Hz`) nas Definições de Som do Windows e fecha apps com controlo exclusivo do dispositivo.
