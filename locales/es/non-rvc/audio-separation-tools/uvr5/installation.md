---
label: "Descarga e instalación"
icon: ":cd:"
order: 98
permalink: /non-rvc/uvr5/installation/
description: "Los paquetes oficiales de Windows y macOS incluyen un entorno aislado de Python y PyTorch, por lo que no necesitas instalar Python por separado."
---
# Descargar e instalar UVR5

Los paquetes oficiales de Windows y macOS incluyen un entorno aislado de Python y PyTorch, por lo que **no** necesitas instalar Python por separado.

## 1. Descarga la compilación adecuada

1. **Versión estándar (v5.6.0)**: descarga el instalador desde [GitHub Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases).
2. **Parches Beta Roformer (Recomendado)**: para usar **BS-Roformer**, **Mel-Roformer**, **SCNet**, **Bandit** y **Demudder**, descarga un instalador standalone o parche desde [uvr_update_patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches):
   - **Mayoría de GPUs modernas (NVIDIA / DirectML / macOS)**: usa el **Patch #13** standalone (`UVR_Patch_1_15_25_22_30_BETA`) y aplica opcionalmente el **Patch #14** (`UVR_Patch_1_21_25_2_28_BETA`) encima para **Demudder**.
   - **Serie NVIDIA RTX 5000**: usa la compilación standalone dedicada **CUDA 12.8** (`UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8`), que ya incluye Demudder. *(No compatible con AMD/Intel ni GPUs NVIDIA antiguas.)*
   - *Consejo*: si la descarga en GitHub va lenta, usa un gestor multiconexión como Free Download Manager.

## 2. Instalar en Windows

1. Ejecuta el instalador e instala UVR5 en tu **unidad `C:\`** (evita discos secundarios).
2. Si descargaste un parche pequeño (como Patch #14), instálalo sobre tu carpeta existente de la beta Roformer.
3. Abre UVR5 y marca **GPU Conversion** en la ventana principal.

> **Consejo para Linux (Bottles)**: la rama nativa de Linux (`v5.6.0_roformer_add+directml`) es antigua y carece de los parches recientes. Muchos usuarios ejecutan el `.exe` de Windows dentro de **Bottles** con perfil **Gaming** (colocando el instalador en `drive_c`) para acelerar por GPU.

## 3. Descargar modelos

### Download Center integrado

1. Haz clic en el icono **Settings** (llave inglesa) abajo a la izquierda → **Download Center** (o elige **Download More Models** al final de cualquier desplegable de modelos).
2. Elige la categoría (**VR Arch**, **MDX-Net**, **Demucs**, **BS/Mel-Roformer**, etc.) y pulsa el icono de descarga junto a cada modelo.

### Instalar modelos Roformer / externos personalizados (`.ckpt` + `.yaml`)

Algunos modelos recientes de la comunidad (como `dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`) no están en el Download Center y requieren tanto el archivo `.ckpt` como su configuración `.yaml`:

- **Método A - Opción Install Model (Patch #10+)**:
  1. Haz clic derecho en la lista desplegable **Choose MDX-Net Model** y elige **Install Model**.
  2. Selecciona el `.ckpt` del modelo y su `.yaml` correspondiente cuando se solicite.
- **Método B - Instalación manual**:
  1. Copia el `.ckpt` (o `.onnx`) en `Ultimate Vocal Remover\models\MDX_Net_Models\`.
  2. Copia el `.yaml` en `Ultimate Vocal Remover\models\MDX_Net_Models\model_data\mdx_c_configs\`.
  3. Elige el modelo en UVR5, confirma **Yes** para reconocerlo, selecciona **Roformer** (casi siempre **non-v2**; `BS` o `Mel` según el nombre) y elige el `.yaml`.

> **Consejos importantes sobre `.yaml`**:
> - Al guardar un `.yaml` desde el navegador o Hugging Face, asegúrate de guardarlo como **`.yaml`** y no como **`.yaml.txt`** (usa **Raw** → Guardar como → Todos los archivos).
> - En el parche **RTX 5000 CUDA 12.8**, si un modelo nuevo da error `torch._dynamo.polyfills.fx`, abre su `.yaml` y cambia `use_torch_checkpoint: True` a `False` (o elimina esa línea).
