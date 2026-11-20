---
label: "Treinar vozes (.cvc)"
icon: ":mortar_board:"
order: 97
permalink: /non-rvc/causal-voice-changer/training/
---
# Treinar uma voz no CVC

Criar uma voz no Causal Voice Changer faz o ajuste fino (fine-tuning) do descodificador base no teu áudio alvo. Ao contrário de ferramentas antigas, **não precisas de cortar os ficheiros nem remover silêncios manualmente**, e as gravações podem estar em **qualquer sample rate**.

> **Lembrete de licença**: vozes treinadas no modelo base pré-treinado incluído não podem ser usadas para fins comerciais.

## 1. Prepara o teu áudio

- Reúne gravações limpas de **apenas um locutor** (sem música de fundo, reverberação forte nem vozes sobrepostas).
- Podes apontar para um **único ficheiro de áudio** ou uma **pasta** com vários ficheiros.
- Não é necessário cortar nem reamostrar à mão - o CVC trata disso automaticamente.

## 2. Treinar pela janela gráfica (Método para iniciantes)

1. Inicia **`run-training.bat`** (Windows) ou **`run-training.sh`** (Linux).
2. Preenche o formulário:
   - **Dataset path**: seleciona o ficheiro ou pasta de áudio.
   - **Model name**: escolhe um nome curto sem caracteres especiais (ex. `minhavoz`).
   - **Batch size**: predefinição **`8`** (baixa se ficares sem memória de GPU).
   - **Steps**: predefinição **`10,000` passos** (demora cerca de **35 minutos** numa RTX 4080).
   - **Save every**: frequência para guardar um checkpoint `.cvc` (predefinição `10,000`).
   - **Custom base** *(opcional)*: ativa se quiseres treinar a partir de uma base personalizada em `custom-base/` em vez da base EARS predefinida.
3. Clica em **Start**.
4. Podes clicar em **Stop** (ou fechar a janela) a qualquer momento - o CVC guarda um checkpoint para poderes **retomar** mais tarde com o mesmo nome.

## 3. Treinar pela linha de comandos (Opcional)

```bash
uv run python -m causalvc.build --name NOME --audio /caminho/pasta-ou-ficheiro
```

Opções úteis:
- `--save-every N`: guarda um checkpoint a cada `N` passos.
- `--app-models DIR`: copia automaticamente cada voz guardada para a pasta `models/` da app em tempo real.
- `--base VALOR`: aceita `default`, o nome de uma pasta em `custom-base/` ou o caminho para um modelo base.

## 4. Entender e partilhar ficheiros `.cvc`

Cada checkpoint é guardado como um único ficheiro **`.cvc`** autónomo em:
```text
runs/models/voice-NOME/voices/NOME-PASSOSs.cvc
```

Um ficheiro `.cvc` contém tudo o que essa voz precisa (e as vozes novas já incluem o seu **index** dentro do `.cvc`, cerca de 12 MB extra). Nada depende do PC que a treinou.

### Carregar uma voz `.cvc` no Realtime

- **Arrasta e larga** o ficheiro `.cvc` diretamente na janela do **CausalVC Realtime**, **ou**
- Copia-o para `realtime/models/` e clica em **Reload** na app.

### Exportar, converter vozes antigas e adicionar um Index

- **Exportar uma voz**: na página **Library**, clica em **Export** para guardar uma voz instalada (com as definições de pitch e ganho) num ficheiro `.cvc` partilhável.
- **Converter vozes antigas em pasta**:
  ```bash
  python -m causalvc.voice cvc PASTA
  ```
  ou usando o script autónomo `scripts/convert_to_cvc.py`.
- **Adicionar um index a um `.cvc` antigo**:
  ```bash
  python -m causalvc.index VOZ.cvc --audio /caminho/audio-treino
  ```
