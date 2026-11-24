# rvc-cli · Instalação

[GitHub](https://github.com/blaisewf/rvc-cli) · [Versão consultada](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

## Versão e âmbito

Este guia cobre **blaisewf/rvc-cli 1.2.4**. O repositório indica que deixou de ser mantido e remete para o Applio para a CLI mantida. Usa uma pasta e um ambiente Python separados. A ferramenta oferece inferência por ficheiro, conversão em lote e treino.

## Windows com install.bat

Extrai o código da tag, abre um terminal na raiz e executa `install.bat`. O Miniconda cria um ambiente Python 3.9 em `env/` e instala PyTorch para CUDA 12.1. Aguarda pelo fim e usa o interpretador desse ambiente. O ficheiro chama-se `rvc_cli.py`.

~~~powershell
.\install.bat
.\env\python.exe rvc_cli.py -h
.\env\python.exe rvc_cli.py prerequisites -h
~~~

## Linux com um ambiente virtual

O script `install.sh` da tag cria `venv/` com o `python3` disponível. Usa Python 3.9 como indica o README e ativa o ambiente no terminal atual. Consulta `prerequisites -h` e prepara os recursos necessários. Se faltar um módulo, verifica o interpretador e a instalação.

~~~bash
bash install.sh
source venv/bin/activate
python rvc_cli.py -h
python rvc_cli.py prerequisites -h
~~~

[Utilização e resolução de problemas](usage.md)
