---
label: "Requisitos do sistema"
icon: ":clipboard:"
order: 83
permalink: /ilaria-rvc/requirements/
description: "O Ilaria RVC corre localmente no teu PC usando PyTorch 2.10.0 e NVIDIA CUDA."
---
# Requisitos do sistema para o Ilaria RVC

> **[Ilaria RVC 2.5.0](https://github.com/TheStingerX/Ilaria-RVC/releases/tag/v2.5.0)** · O pacote completo para Windows é a versão 2.4.7. O ZIP de atualização 2.5.0 exclui o ambiente de execução e os pesos dos modelos. Da versão 2.4.2 à 2.4.8, usa **Other → Update Ilaria RVC → Check for updates → Download and restart**.

[Transferir Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [GPUs compatíveis](../install/gpu-compatibility.md) · [Opções na nuvem](../cloud/cloud.md)

O Ilaria RVC corre localmente no teu PC usando **PyTorch 2.10.0** e **NVIDIA CUDA**. Como a conversão de voz (inferência) e o treino de modelos têm exigências de hardware muito diferentes, consulta ambas as tabelas abaixo antes de instalar.

> **Sem GPU NVIDIA compatível?** Podes correr o Ilaria RVC remotamente em GPUs na nuvem usando os guias de [Kaggle](../cloud/kaggle.md), [Google Colab](../cloud/colab.md) ou [Lightning AI Studio](../cloud/lightning-ai.md).

## 1. Resumo rápido: Mínimos vs. Recomendados

| Componente | Mínimos (Inferência / Uso básico) | Recomendados (Inferência fluida e Treino) |
| --- | --- | --- |
| **Sistema operativo** | Windows 10 64-bit | Windows 10 ou Windows 11 (64-bit, atualizado) |
| **GPU** | GPU **NVIDIA** dedicada com **4 GB VRAM** (Maxwell, Pascal, Volta, GTX 16 ou RTX) | GPU **NVIDIA RTX** dedicada com **8–12 GB+ VRAM** (ex. RTX 3060 12 GB, RTX 4060 Ti / 4070 ou superior) |
| **Runtime CUDA** | CUDA **12.8** (incluído) ou CUDA **12.6** (transferência auto para Maxwell/Pascal/Volta) | CUDA **12.8** (incluído no ZIP para GTX 16 / RTX 20–50) |
| **RAM do sistema** | **8 GB** | **16 GB** ou **32 GB** (especialmente para treino e criação de index) |
| **Armazenamento** | **25 GB** livres (ZIP + app extraída + modelos) | **50 GB+ livres em SSD** (datasets, checkpoints, pretraineds) |
| **CPU** | Processador x64 moderno de 4 núcleos | Processador x64 de 6–8+ núcleos (acelera pré-processamento e pesquisa de index) |
| **Navegador** | Qualquer navegador moderno (para `http://127.0.0.1:6969`) | Chrome, Edge ou Firefox (atualizado) |

## 2. Requisitos detalhados de GPU e VRAM

O pacote Windows do Ilaria RVC foi feito para **GPUs NVIDIA**. Gráficos integrados Intel, Intel Arc e GPUs AMD não são suportados pelo pacote Windows.

### Por geração de GPU (runtime CUDA)

- **GeForce GTX 16 e RTX 20, 30, 40, 50**: usa diretamente o runtime **PyTorch 2.10.0 + CUDA 12.8** incluído após a extração. Mantém o driver NVIDIA atualizado (especialmente na série RTX 50).
- **Maxwell, Pascal e Volta** (ex. séries GTX 750/900/1000, TITAN X/V, Tesla P4/P40/P100/V100): no primeiro arranque, `RUN_ILARIA_RVC.bat` transfere e verifica automaticamente **PyTorch 2.10.0 + CUDA 12.6** para `runtime-cu126` e reutiliza-o depois.
- **Nota de validação**: computação, backpropagation e carregamento do ContentVec foram verificados diretamente numa **RTX 4070**. As restantes placas na [lista de GPUs compatíveis](../install/gpu-compatibility.md) devem funcionar com base na arquitetura e suporte CUDA.

### Por capacidade de VRAM (o que podes correr)

| VRAM | Inferência (Conversão de áudio) | Treino (Criar modelos de voz) |
| --- | --- | --- |
| **4 GB** | Funciona em clips curtos; fecha apps que usem a GPU (jogos, navegadores com aceleração de hardware). | Muito apertado; apenas batch sizes pequenos (`1–2`) com FP16/sample rate baixo, ou pode faltar memória. |
| **6 GB** | Fluido para inferência individual e em lote. | Possível com batch size reduzido (`2–4`) e precisão FP16. |
| **8 GB** | Sem esforço para inferência e conversão em lote. | Bom para treino a `32k` / `40k` / `48k` com batch sizes médios (`4–8`). |
| **12 GB+** | Fluido mesmo com outras apps abertas. | **Ideal**: batch sizes confortáveis (`8–16+`), épocas mais rápidas e treino a `48k` sem erros de memória. |

## 3. Armazenamento, RAM e Rede

### Detalhe do espaço em disco

- **Arquivo de transferência**: ~**5,00 GB** (`ILARIA_RVC-2.4.7.zip`). Deixa espaço para o ZIP e para a pasta extraída durante a instalação.
- **App extraída**: ~**10–15 GB** (inclui runtime PyTorch/CUDA, **ContentVec** e **RMVPE**).
- **Espaço extra eventual**:
  - `runtime-cu126` (apenas Maxwell/Pascal/Volta): vários GB adicionais transferidos no primeiro arranque.
  - Embedders opcionais (**Other → Download embedders**) e pares pretrained G/D.
  - **Checkpoints de treino** (`app/logs/`) e **datasets** (`app/datasets/`): cada treino pode ocupar **2–10+ GB** conforme a frequência de gravação.
- **SSD recomendado**: extrair, carregar modelos e ler datasets durante o treino é muito mais rápido num SSD NVMe/SATA do que num HDD mecânico.

### RAM do sistema

- **8 GB de RAM** chegam para converter clips curtos se fechares programas pesados em segundo plano.
- **16 GB+ de RAM** são fortemente recomendados para **treino**, **pré-processamento de áudio**, **construção de índices FAISS** e uso do **Audio Analyzer** com vários ficheiros.

### Ligação à internet

- **Necessária** para: transferir o ZIP da release, transferir o CUDA 12.6 no primeiro arranque em Maxwell/Pascal/Volta, obter embedders/pretraineds opcionais, importar modelos do Hugging Face/Google Drive/MEGA ou verificar atualizações (**2.4.0 → 2.4.1**).
- **Não necessária** para: correr inferência ou treino depois de teres os runtimes e modelos no PC.

## 4. Verifica o teu PC automaticamente

O Ilaria RVC inclui um assistente integrado em **Other → PC training advisor**:

1. Escolhe **Sample rate to plan for**, **Precision to evaluate** e **GPU to evaluate**.
2. Clica em **Scan PC and suggest settings**.
3. Consulta o **PC Advisor Log** para obter definições iniciais recomendadas (precisão, batch size) e confirma o uso real de VRAM num teste curto.
