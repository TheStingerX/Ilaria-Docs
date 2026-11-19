---
label: "Fundir modelos RVC"
icon: ":jigsaw:"
order: 99
permalink: /ilaria-rvc/rvc-model-merger/
---
# RVC Model Merger

[GitHub](https://github.com/mojowozo/RVC-model-merger)

> **Notas importantes antes de começar**
> - **Esta ferramenta é apenas um model merger**: não converte áudio, não faz conversão de microfone ao vivo e não treina modelos novos. Serve exclusivamente para fundir dois ou mais modelos RVC `.pth` existentes num novo ficheiro `.pth`.
> - **A fusão entre diferentes sample rates é suportada**: apesar do que diz o README do repositório, **podes** fundir modelos com **sample rates diferentes** (ex. `32k`, `40k`, `48k`) usando **Encoder-only**, desde que partilhem a **mesma versão RVC** (`v1` ou `v2`) e a **mesma arquitetura de vocoder** (`HiFi-GAN` ou `RefineGAN`).

## Regras de compatibilidade

| Requisito | Fusão padrão | Fusão Encoder-only |
| --- | --- | --- |
| **Versão RVC** (`v1` vs `v2`) | Tem de coincidir | Tem de coincidir |
| **Arquitetura de vocoder** (`HiFi-GAN` vs `RefineGAN`) | Tem de coincidir | Tem de coincidir |
| **Sample rate** (`32k`, `40k`, `48k`) | Tem de coincidir | **Pode diferir** (o descodificador vem de um único modelo base) |

## Instalação

### Versão compilada (Windows)

1. Transfere o arquivo da release no [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Extrai para uma pasta com permissão de escrita e executa o `.exe`.

### A partir do código-fonte (Python)

1. Clona ou transfere o repositório do [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Instala as dependências:
   ```bat
   pip install -r requirements.txt
   ```
   *(Usa `torch==2.10.0` e `numpy==1.26.4`; `tkinterdnd2==0.6.2` é opcional para arrastar e largar.)*
3. Inicia a aplicação com `run.bat` ou:
   ```bat
   python main.py
   ```

## Como fundir modelos

1. **Carrega os modelos**: usa **Browse** (ou arrasta ficheiros `.pth` para os slots). Clica em **+ Add Slot** para fundir mais de dois modelos. Cada slot deteta automaticamente o vocoder (`HiFi-GAN` / `RefineGAN`), sample rate, versão RVC e `f0`.
2. **Define os pesos**: usa o controlo **Strength** (`0–100`) de cada slot para definir o peso de cada modelo. Slots em `0` são ignorados.
3. **Escolhe o modo de fusão**:
   - Deixa **Encoder-only** desmarcado para uma fusão completa quando todos os modelos têm o mesmo sample rate.
   - Ativa **Encoder-only** para fundir modelos com **sample rates diferentes** (ou quando quiseres misturar apenas o encoder mantendo o descodificador de um único modelo).
4. **Nome e predefinições (opcional)**: mantém o nome automático (**Auto**) ou escreve um personalizado. Podes também guardar/carregar configurações via **Preset → Save / Delete**.
5. **Funde**: clica em **Merge Models**. O ficheiro `.pth` resultante é guardado na pasta `merges/` (clica em **Open Folder** ou **Open merges folder** para a abrir).
