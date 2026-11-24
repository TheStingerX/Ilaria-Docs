---
label: "Instalação"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/rvc-studio/installation/
---

# RVC Studio · Instalação

[GitHub](https://github.com/SayanoAI/RVC-Studio) · [Hugging Face](https://huggingface.co/datasets/SayanoAI/RVC-Studio/tree/main) · [`91c4011`](https://github.com/SayanoAI/RVC-Studio/tree/91c40119b9ff209eba23debdb0871931b9fd8127)

!!!warning Software antigo · Desaconselhado
Estes projetos estão desatualizados e já não parecem ter manutenção ativa. O rvc-cli está arquivado e os ramos principais do RVC Studio e do Mangio RVC Fork estão inativos há vários anos. Os guias continuam disponíveis para projetos existentes. Para uma nova instalação, escolhe uma aplicação com manutenção ativa. [Guias por aplicação](../app-guides.md)
!!!

O RVC Studio da SayanoAI é uma interface Streamlit para treinar vozes e criar versões a partir de gravações. Os passos referem-se à revisão indicada. O projeto descreve o ramo principal como experimental.

## Configuração

No Windows, extrai o código e abre `conda-installer.bat`. Se já tiveres Miniconda, usa `conda-start.bat`. O launcher cria um ambiente Python 3.10 quando necessário, instala as dependências e executa o Streamlit. Abre o endereço local. Para instalar manualmente, ativa um ambiente isolado e executa os comandos na pasta de `Home.py`.

~~~bash
python -m pip install -r requirements.txt
streamlit run Home.py
~~~

## Recursos base

Descarrega os recursos base da aplicação ou do Hugging Face. Adiciona o checkpoint da voz à parte. Em caso de erros de FFmpeg ou eSpeak, consulta as instruções oficiais. O repositório inclui um notebook Colab e um ficheiro Docker Compose que pede a GPU NVIDIA 0. Para usar os dispositivos de áudio do computador, começa pela instalação local.

[Colab](https://colab.research.google.com/github/SayanoAI/RVC-Studio/blob/main/RVC_Studio.ipynb) · [FFmpeg / eSpeak](https://github.com/SayanoAI/RVC-Studio/blob/main/dist/README.md)

[→ Primeira versão](usage.md)
