---
label: "Instalação"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/aicovergen/installation/
---

# AICoverGen · Instalação

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Software antigo · Desaconselhado
**AICoverGen** é uma pipeline antiga para covers com RVC v2 que já não é mantida ativamente e depende de pacotes da era do Python 3.9+. Para uma nova instalação, escolhe uma aplicação com manutenção ativa. [Guias por aplicação](../../app-guides.md)
!!!

## O que faz o AICoverGen

O AICoverGen é uma pipeline automatizada com WebUI e CLI para criar covers musicais com IA usando modelos de voz **RVC v2** existentes. A partir de uma ligação do YouTube ou de um ficheiro de áudio local, separa a voz principal do instrumental com MDX-Net, converte a voz com o teu modelo `.pth` (e `.index` opcional), aplica mistura e reverberação e volta a juntar a faixa. Não treina novos modelos RVC: utiliza ficheiros de inferência RVC v2 já existentes.

## Pré-requisitos

- **Python 3.9+** (Python 3.10 recomendado)
- **GPU NVIDIA com CUDA** recomendada para uma velocidade de conversão razoável
- **FFmpeg** e **SoX (`sox`)** instalados e disponíveis no `PATH` do sistema

## Instalação local

Clona o repositório, instala as dependências Python, transfere os modelos base necessários (MDX-Net para separação vocal e HuBERT base) e inicia a WebUI Gradio (por predefinição em `http://127.0.0.1:7860`):

~~~bash
git clone https://github.com/SociallyIneptWeeb/AICoverGen.git
cd AICoverGen
pip install -r requirements.txt
python src/download_models.py
python src/webui.py
~~~

Executar `python src/download_models.py` transfere automaticamente os pesos MDX-Net e o modelo HuBERT necessários antes da primeira geração.

## Google Colab

Se o teu computador não tiver uma GPU NVIDIA adequada, o repositório inclui o notebook oficial (`AICoverGen_colab.ipynb`) para instalar dependências do sistema (incluindo `sox`), descarregar os pesos base e abrir a interface Gradio numa GPU na nuvem.

[Utilização e resolução de problemas](usage.md)
