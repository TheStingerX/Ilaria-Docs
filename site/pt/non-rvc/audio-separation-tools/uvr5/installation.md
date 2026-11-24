# Transferir e instalar o UVR5

Os pacotes oficiais de Windows e macOS incluem um ambiente isolado de Python e PyTorch, pelo que **não** precisas de instalar Python em separado.

## 1. Transfere a compilação certa

1. **Release padrão (v5.6.0)**: transfere o instalador a partir de [GitHub Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases).
2. **Patches Beta Roformer (Recomendado)**: para usar **BS-Roformer**, **Mel-Roformer**, **SCNet**, **Bandit** e **Demudder**, transfere um instalador standalone ou patch em [uvr_update_patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches):
   - **Maioria das GPUs modernas (NVIDIA / DirectML / macOS)**: usa o **Patch #13** standalone (`UVR_Patch_1_15_25_22_30_BETA`) e aplica opcionalmente o **Patch #14** (`UVR_Patch_1_21_25_2_28_BETA`) por cima para **Demudder**.
   - **Série NVIDIA RTX 5000**: usa a compilação standalone dedicada **CUDA 12.8** (`UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8`), que já inclui Demudder. *(Incompatível com AMD/Intel ou GPUs NVIDIA antigas.)*
   - *Dica*: se o download do GitHub estiver lento, usa um gestor multi-ligação como o Free Download Manager.

## 2. Instalar no Windows

1. Executa o instalador e instala o UVR5 na **unidade `C:\`** (evita discos secundários).
2. Se transferiste um patch pequeno (como Patch #14), instala-o sobre a tua pasta existente da beta Roformer.
3. Abre o UVR5 e marca **GPU Conversion** na janela principal.

> **Dica para Linux (Bottles)**: o branch nativo de Linux (`v5.6.0_roformer_add+directml`) é antigo e não tem os patches recentes. Muitos utilizadores Linux correm o `.exe` do Windows no **Bottles** com perfil **Gaming** (colocando o instalador em `drive_c`) para usar a GPU.

## 3. Transferir modelos

### Download Center integrado

1. Clica no ícone **Settings** (chave) no canto inferior esquerdo → **Download Center** (ou escolhe **Download More Models** no fundo de qualquer lista de modelos).
2. Escolhe a categoria (**VR Arch**, **MDX-Net**, **Demucs**, **BS/Mel-Roformer**, etc.) e transfere cada modelo pretendido.

### Instalar modelos Roformer / externos personalizados (`.ckpt` + `.yaml`)

Alguns modelos recentes da comunidade (como `dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`) não estão no Download Center e precisam do ficheiro `.ckpt` e da respetiva configuração `.yaml`:

- **Método A - Botão Install Model (Patch #10+)**:
  1. Clica com o botão direito dentro da lista **Choose MDX-Net Model** e escolhe **Install Model**.
  2. Seleciona o ficheiro `.ckpt` do modelo e o `.yaml` correspondente quando pedido.
- **Método B - Instalação manual**:
  1. Copia o `.ckpt` (ou `.onnx`) para `Ultimate Vocal Remover\models\MDX_Net_Models\`.
  2. Copia o `.yaml` para `Ultimate Vocal Remover\models\MDX_Net_Models\model_data\mdx_c_configs\`.
  3. Seleciona o modelo no UVR5, confirma **Yes**, escolhe **Roformer** (quase sempre **non-v2**; `BS` ou `Mel` conforme o nome) e indica o `.yaml`.

> **Dicas importantes sobre `.yaml`**:
> - Ao guardar um `.yaml` pelo navegador ou Hugging Face, confirma que fica com extensão **`.yaml`** e não **`.yaml.txt`** (usa **Raw** → Guardar como → Todos os ficheiros).
> - No patch **RTX 5000 CUDA 12.8**, se um modelo recente der erro `torch._dynamo.polyfills.fx`, abre o `.yaml` e muda `use_torch_checkpoint: True` para `False` (ou apaga essa linha).
