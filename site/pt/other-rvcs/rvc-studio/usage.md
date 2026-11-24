# RVC Studio · Utilização e resolução de problemas

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Software antigo · Desaconselhado
Estes projetos estão desatualizados e já não parecem ter manutenção ativa. O rvc-cli está arquivado e os ramos principais do RVC Studio e do Mangio RVC Fork estão inativos há vários anos. Os guias continuam disponíveis para projetos existentes. Para uma nova instalação, escolhe uma aplicação com manutenção ativa. [Guias por aplicação](../app-guides.md)
!!!

## Primeira versão

Inicia o backend em **RVC Server**. Em **Inference**, carrega em **Refresh Data** depois de adicionares os ficheiros. Escolhe um WAV, FLAC, OGG ou MP3 curto em `songs/`. Coloca o checkpoint RVC v2 em `models/RVC/` e o índice correspondente, se houver, em `models/RVC/.index/`. Escolhe uma voz e um modelo de extração vocal. O pré-processamento adicional é opcional. Carrega em **Save Options** e **1-Click VC**. Se a voz não aparecer, confirma a pasta e atualiza a lista.

## Treinar uma voz

Em **Train**, escolhe a pasta do dataset e o nome da experiência. Pré-processa, extrai as características e treina o modelo. Confirma que os pretrains do gerador e discriminador são compatíveis. Cria o índice separadamente se precisares dele. Se um passo estiver desativado, verifica o resultado do anterior. Compara checkpoints com o mesmo áudio de teste.

## TTS e conversão em direto

Em **Text to Speech**, escolhe o motor e a voz RVC. Ouve uma frase curta, carrega em **Convert Speech** e guarda o resultado. O código inclui **Realtime Conversion**. Escolhe a entrada e a saída no computador onde a aplicação corre. Testa com auscultadores antes de usar a conversão em direto.

[← Configuração](installation.md)
