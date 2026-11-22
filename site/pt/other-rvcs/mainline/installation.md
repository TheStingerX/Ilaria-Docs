# Instalar RVC WebUI (Mainline - Original RVC)

[GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI)

RVC WebUI (Mainline - Original RVC) é a WebUI de conversão de voz baseada em recuperação upstream. Use a interface do navegador para conversão de arquivos e treinamento. Para conversão de microfone, use a interface de desktop separada descrita no [guia em tempo real](realtime.md).

## Escolha uma rota de instalação

| Sua configuração | O que usar |
| --- | --- |
| Windows e uma GPU suportada | Comece com um arquivo pré-construído correspondente do Windows. Este é o caminho mais curto. |
| Windows e uma GPU NVIDIA RTX série 50 | Use um pacote explicitamente marcado para a série 50 ou a configuração de origem com a compilação CUDA 12.8 Torch. Arquivos NVIDIA mais antigos podem iniciar, mas falhar quando tentam executar operações de GPU. |
| Windows e uma GPU AMD ou Intel | Escolha o arquivo AMD/Intel correspondente. O suporte DirectML depende do lançamento e da operação. Teste a conversão do arquivo primeiro. |
| Ubuntu ou uma configuração personalizada do Windows | Instale o branch fonte atual em um ambiente Python separado. |

### Arquivo do Windows

1. Abra o [pacote principal do Windows e downloads de ativos](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) e escolha o arquivo correspondente à sua GPU. Para a família de pacotes atual, procure a variante `20260718` NVIDIA, NVIDIA série 50 ou AMD/Intel. Se você já possui uma versão mais antiga que funciona, deixe-a em seu próprio diretório.
2. Extraia todo o arquivo para uma pasta local gravável, como `C:\RVC\Mainline`. Deixe espaço para download e arquivos extraídos. No File Explorer, abra a pasta resultante e procure o inicializador, `assets`, e o tempo de execução do Python. Se você vir mais um diretório anexo, abra-o.
3. Execute `go-webui.bat` se presente. Arquivos mais antigos podem chamá-lo de `go-web.bat`. Mantenha a janela de comando aberta e aguarde o endereço local. Se o navegador não iniciar, abra o endereço mostrado no terminal. Um padrão comum é `http://127.0.0.1:7865`.
4. Confirme se a página abre e se o terminal continua funcionando. Mantenha o arquivo intacto até que a [primeira conversão](inference.md) seja bem-sucedida.

### Branch fonte atual

> **Recomendado no Windows:** descarrega o [pacote Windows pronto a usar](https://huggingface.co/lj1995/VoiceConversionWebUI/tree/main) adequado à tua GPU. A instalação a partir do código-fonte é desaconselhada para a maioria dos utilizadores, pois exige a configuração manual do Python e das suas dependências.

Baixe e extraia o [ZIP fonte principal](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/archive/refs/heads/main.zip). Abra um terminal no diretório que contém `webui.py` e os arquivos de requisitos. A configuração de origem abaixo se aplica ao branch Python 3.12. Execute cada trecho desse diretório usando um interpretador Python 3.12 de 64 bits.

**Windows PowerShell**

```powershell
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip setuptools wheel
```

Se o PowerShell bloquear o script de ativação, abra o Prompt de Comando no mesmo diretório e execute `.venv\Scripts\activate.bat`. No Windows, coloque [ffmpeg.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffmpeg.exe?download=true) e [ffprobe.exe](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/ffprobe.exe?download=true) ao lado de `webui.py`.

**Ubuntu 24.04**

```bash
sudo apt update
sudo apt install python3.12-venv python3.12-dev ffmpeg unzip libsndfile1 libportaudio2
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip setuptools wheel
```

Escolha **um** conjunto de dependências. Os nomes dos arquivos contêm `requirments` conforme escrito no repositório. Execute o bloco correspondente de cima para baixo.

**CPU, AMD ou Intel**

```text
python -m pip install -r requirments_cpu_py312.txt
```

**NVIDIA RTX série 50**

```text
python -m pip install torch==2.7.1+cu128 torchaudio==2.7.1+cu128 --index-url https://download.pytorch.org/whl/cu128 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu128_py312.txt
```

**Placas NVIDIA mais antigas suportadas**

```text
python -m pip install torch==2.7.1+cu118 torchaudio==2.7.1+cu118 --index-url https://download.pytorch.org/whl/cu118 --extra-index-url https://pypi.org/simple
python -m pip install -r requirments_cu118_py312.txt
```

Verifique qual interpretador e build Torch o terminal está usando:

```text
python -c "import sys, torch; print(sys.executable); print(torch.__version__); print(torch.cuda.is_available())"
```

Espere que o caminho do interpretador contenha `.venv`. A disponibilidade do CUDA deve ser `True` para trabalhar a inferência NVIDIA CUDA. As instalações de CPU e DirectML podem mostrar `False` nesta verificação CUDA.

Instale o recurso compartilhado e os modelos de pitch antes da primeira conversão:

```text
python -m pip install huggingface_hub
hf download lj1995/VoiceConversionWebUI --include "hubert_base/*" --local-dir assets
hf download lj1995/VoiceConversionWebUI rmvpe.pt --local-dir assets/rmvpe
```

> Os checkpoints HuBERT genéricos são desaconselhados como codificador predefinido para conversão de voz. Foram treinados para representar a fala e podem preservar informação sobre o timbre da voz original no áudio convertido. Usa o codificador esperado pelo modelo RVC, como o ContentVec se o modelo tiver sido treinado com ele.

As configurações do Windows DirectML que usam o modelo de pitch ONNX também precisam de `hf download lj1995/VoiceConversionWebUI rmvpe.onnx --local-dir assets/rmvpe`. O [guia de treinamento](training.md) lista os recursos de treinamento adicionais.

Execute `python webui.py` no mesmo diretório. O codificador de recursos deve ser uma pasta chamada `assets/hubert_base` contendo a configuração, a configuração de pré-processamento e o arquivo de peso. Se você instalou um arquivo herdado, mantenha os arquivos agrupados e as convenções de nomenclatura juntos.

## Se a WebUI não abrir

| O que você vê | O que verificar primeiro |
| --- | --- |
| Nenhuma aba do navegador | Leia as últimas linhas no terminal e copie o URL local real. Se a porta padrão estiver ocupada, uma compilação poderá escolher outra. |
| O iniciador abre e fecha imediatamente | Execute-o a partir de um prompt de comando existente dentro da pasta extraída para que você possa ler o primeiro erro. Verifique se a extração foi concluída antes de alterar as dependências. |
| `ModuleNotFoundError` em uma instalação de origem | Confirme se você iniciou a partir do ambiente virtual usado para instalação. Conclua a instalação dos requisitos correspondentes. |
| CUDA não está disponível em uma configuração NVIDIA | Verifique o modelo da GPU, o driver e a roda da tocha juntos. Um sistema da série RTX 50 precisa da construção correspondente. |
| HuBERT, RMVPE ou FFmpeg ausentes | Verifique as pastas de ativos e os caminhos executáveis ​​acima. Tente novamente com um WAV local simples após corrigir o arquivo ausente. |

Quando a interface abrir, continue com [sua primeira conversão de arquivo](inference.md).

[Matriz interativa de compatibilidade RVC](../../reference/compatibility-matrix.md)
