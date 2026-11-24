# Desempenho, limpeza de som e ferramentas

## 1. Desempenho e latência (página `Performance`)

### Buffering

- **Chunk** (até `10 ms` / `20 ms`): quanto áudio é convertido de cada vez. O atraso total é o lookahead fixo de **50 ms** na base 100 Hz v4 (`60 ms` em vozes antigas de 50 Hz) + **1 chunk** + buffers da placa de som/cabo virtual.
  - Chunks menores = menor latência, mas exigem GPU mais rápida.
  - Se o áudio estalar ou falhar (ou se estiveres na CPU numa AMD antiga), sobe **Chunk** para `40 ms` ou `60 ms+`.
- **Extra inference buffer**: quanto da fala recente o modelo observa para trás em cada bloco. Mais contexto dá tom e afinação mais estáveis com pequeno custo de GPU, **sem adicionar atraso**.

### Inferência e GPU

- **Pitch detector**:
  - **RMVPE (recomendado)**: mais preciso.
  - **FCPE**: mais leve para a GPU.
  - **PM (fastest)**: mais rápido, mas menos suave.
- **Pitch smoothing** *(apenas RMVPE)*: acompanha o tom como uma linha contínua sem saltos de oitava em notas longas (sem atraso extra).
- **Volume envelope**: `0` segue exatamente o volume do teu microfone; `1` mantém o volume próprio do modelo.
- **Fast GPU replay** *(ativo por predefinição)*: grava o trabalho da GPU uma vez e repete-o em cada bloco - cerca de **2× mais rápido** e muito mais estável (ex. uma RTX 5050 converte um chunk de `20 ms` em `4,4 ms` em vez de `9,7 ms`). Desliga apenas se a tua GPU falhar com ele.
- **Auxiliares de qualidade e costuras**:
  - **Soften sudden treble**: suaviza cliques breves nos agudos a meio da palavra (adiciona `5 ms` de atraso).
  - **Match level across seams**: mantém o nível dos agudos estável entre blocos (sem atraso extra).
  - **Hold context during silence**: recorda as últimas palavras nas pausas para a primeira palavra após o silêncio não sair arrastada.
  - **Silence detection**: **Loudness** (`-50 dBFS`) para divisões silenciosas; **Voice detection (experimental)** usa RNNoise para que ventoinhas/zumbidos não contem como fala.

## 2. Limpeza de som (`Noise Reduction`)

- **Input noise reduction**: remove teclado, ventoinhas e ruído ambiente antes da conversão:
  - **Hushwire (Amazon Voice Focus)** *(predefinição)*: limpeza mais forte e voz mais natural; adiciona cerca de **55 ms** de atraso. O modelo é transferido uma vez dos servidores da Amazon só após aceitares o aviso.
  - **RNNoise**: limpeza mais leve com menor atraso (**20 ms**).
- **Output noise reduction**: limpa chiado na saída com spectral gating. Deixa **desligado** a menos que ouças chiado.

## 3. Gravação (página `Recording`)

Grava sessões diretamente no CausalVC Realtime (inicia primeiro a conversão):
- **Separate files**: guarda entrada bruta e saída convertida em dois ficheiros separados.
- **Mix**: guarda entrada + saída misturadas.
- **Split L/R**: entrada bruta no canal esquerdo, saída convertida no direito.

## 4. Biblioteca, conversão offline e Registos

- **Página Library**: pesquisa e ordena vozes, usa **Rename**, **Move to Trash**, **Open folder**, **Add/Replace `.index`**, ou **Export** para exportar uma voz como `.cvc` com as suas definições.
- **Conversão offline de ficheiros completos**: pela linha de comandos com `causalvc.infer`:
  ```bash
  uv run python -m causalvc.infer --help
  ```
- **Página Log**: se algo falhar, abre **Log** e clica em **Save log** para exportar os registos de diagnóstico.
