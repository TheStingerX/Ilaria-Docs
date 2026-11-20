# Instalar o Causal Voice Changer

Este guia explica passo a passo como instalar o Causal Voice Changer no **Windows** ou **Linux**, mesmo que nunca tenhas usado Python ou Git.

> **Regra essencial na primeira utilização**: executa sempre **primeiro** o iniciador de treino (`run-training.bat` no Windows ou `run-training.sh` no Linux), mesmo que só queiras usar o alterador de voz ao vivo. Ele instala o Python, o PyTorch para a tua GPU e os ~900 MB de pesos pré-treinados necessários a ambas as aplicações.

## 1. Transferir o CVC

Escolhe uma das duas opções:

### Opção A: Release pré-compilada (Recomendada para iniciantes)

1. Vai à [página de Releases do Causal Voice Changer](https://github.com/mojowozo/Causal-Voice-Changer/releases).
2. Transfere o arquivo para o teu sistema operativo:
   - **Windows**: `Causal-Voice-Changer-<version>-windows-x64.zip`
   - **Linux**: `Causal-Voice-Changer-<version>-linux-x86_64.tar.gz` *(requer glibc 2.35+, como Ubuntu 22.04, Debian 12 ou mais recente)*
3. Extrai o arquivo para uma pasta com permissão de escrita (por exemplo `D:\CausalVC` no Windows).
   - *Nota*: a release já inclui as janelas compiladas, pelo que **não** precisas de instalar o .NET SDK nem o Rust manualmente.

### Opção B: A partir do código-fonte (`git clone`)

Se clonares o repositório com `git clone https://github.com/mojowozo/Causal-Voice-Changer.git`, as janelas são compiladas automaticamente no primeiro arranque (e recompiladas sempre que o código-fonte muda):
- **Windows**: instala automaticamente o **.NET 10 SDK** em `.dotnet` se faltar, para compilar a app WinUI 3.
- **Linux**: compila a interface COSMIC em Rust com `cargo`.
- Se uma interface nativa não puder ser compilada, abre-se automaticamente uma janela **Tk** mais simples com as funções principais.

## 2. Executar a configuração inicial (`run-training`)

1. Abre a pasta extraída do CVC.
2. Executa:
   - **Windows**: duplo clique em **`run-training.bat`**
     - Como a app não está assinada digitalmente, o Windows SmartScreen pode mostrar *"O Windows protegeu o seu PC"*. Clica em **Mais informações → Executar mesmo assim**.
   - **Linux**: abre um terminal na pasta e executa **`./run-training.sh`**
3. **Aguarda pelo instalador automático**:
   - Cria um ambiente Python local (`.venv-win` no Windows, `.venv` no Linux) com o **`uv`**.
   - Instala a compilação de **PyTorch** adequada à tua placa gráfica.
   - Transfere o **modelo base e os pesos RMVPE** (cerca de **900 MB**) para a pasta `weights/`.
4. Quando terminar, abre-se a **janela de Treino**. Podes fechá-la ou começar logo a criar uma voz!

## 3. Escolher a GPU no Windows (se necessário)

No Windows, `scripts/gpu-extra.ps1` deteta a tua GPU automaticamente:
- **NVIDIA**: instala PyTorch **CUDA**.
- **AMD RX 7000 / 9000, PRO W7000, Ryzen AI**: instala PyTorch **ROCm** (`rocm`, requer AMD Software `26.2.2` ou mais recente).
- **AMD RX 6000 / PRO W6000**: instala a compilação nightly da AMD (`rocm-rdna2`).
- **AMD Radeon mais antigas**: correm na **CPU** (em tempo real, define **Chunk** para `60 ms` ou mais).

Se a deteção automática escolher o backend errado, define `CAUSALVC_GPU` antes de iniciar:
- `CAUSALVC_GPU=cuda`
- `CAUSALVC_GPU=rocm`
- `CAUSALVC_GPU=rocm-rdna2`

*(Ao executar comandos `uv` manualmente no Windows, adiciona `--extra cuda`, `--extra rocm` ou `--extra rocm-rdna2`.)*

## 4. Atualizar o CVC

A partir da versão **v0.3.1**, o CVC inclui um **atualizador integrado** diretamente no app. A verificação automática fica ativa por padrão e pode ser desativada na página **About**. Instalações existentes também atualizam `weights/causalvc-base/` automaticamente na próxima inicialização ou treino.

Ao atualizar manualmente ou a partir do código-fonte:
- No Windows, a partir do código-fonte, executa `run-realtime.bat` / `run-training.bat` com `CAUSALVC_REBUILD=1` se a interface mudou.
- No Linux, a interface Rust recompila-se automaticamente no arranque seguinte após uma atualização.
