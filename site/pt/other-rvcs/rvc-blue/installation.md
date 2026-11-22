# RVC Blue (RVC-Realtime-GUI)

[GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI)

O **RVC Blue (RVC-Realtime-GUI)** é um cliente desktop para Windows focado em conversão de voz RVC em tempo real com baixa latência. Baseado na interface em tempo real do RVC WebUI, integra otimizações recentes de inferência ao vivo, **CUDA Graph warm-up** (reduzindo a sobrecarga contínua da GPU) e correções na redução de ruído de entrada e saída.

- **Apenas inferência**: o RVC Blue não treina modelos. Treina a tua voz no **Ilaria RVC** (ou noutro treinador) e importa aqui os ficheiros `.pth` e `.index` exportados para inferência.
- **Três fontes de entrada**: **Microfone** ao vivo, **Ficheiro de áudio** (via FFmpeg incluído) e **Áudio de aplicação Windows** (captura por processo).
- **Voz incluída**: traz o modelo **Sakura**, uma voz natural do dia a dia (uso comercial permitido) para testares logo de início.

## 1. Escolher uma versão e instalar

Cada pacote no Hugging Face é autónomo e inclui runtime Python, PyTorch/CUDA, FFmpeg, ficheiros HuBERT/RMVPE/FCPE e o conjunto base de modelos. Não precisas de instalar Python, CUDA Toolkit nem FFmpeg à parte.

| Versão | Lançador | Hardware NVIDIA recomendado |
| --- | --- | --- |
| **CUDA 12.8** *(Padrão)* | `RVC-Realtime-GUI-CUDA128.bat` | GPUs NVIDIA atuais, incluindo série RTX 50 (Blackwell) |
| **CUDA 11.8** *(Compatibilidade)* | Lançador CUDA 11.8 incluído | GPUs NVIDIA mais antigas ou sistemas com driver/ambiente CUDA 11.8 |

1. Verifica o modelo da tua GPU NVIDIA em **Gestor de Tarefas → Desempenho → GPU**.
2. Abre [RVC Blue no Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) e descarrega o pacote adequado.
3. Extrai todo o arquivo para uma **pasta local curta e gravável**, como `C:\RVC-Realtime-GUI`. Não executes a partir de dentro do ZIP e evita `Programas` ou pastas sincronizadas pelo OneDrive.
4. Executa `RVC-Realtime-GUI-CUDA128.bat` (ou o lançador CUDA 11.8).
5. **Aguarda o primeiro arranque**: a primeira abertura demora mais enquanto inicializa os recursos de inferência, o runtime CUDA e o CUDA Graph warm-up. Espera que a janela abra antes de assumir que bloqueou.

## 2. Adicionar os teus modelos de voz

Cria uma subpasta por voz dentro de `models/` na pasta extraída:

```text
models/
  MyVoice/
    MyVoice.pth
    added_MyVoice.index
    preview.png
```

- **Nome da pasta**: aparece como nome do modelo na galeria.
- **Ficheiro obrigatório**: usa um **`.pth` de inferência**, não um checkpoint de treino (`G_*.pth` / `D_*.pth`).
- **Índice e pré-visualização opcionais**: coloca o ficheiro `added_*.index` correspondente e uma imagem `.png`, `.jpg` ou `.jpeg` na mesma pasta para mostrar automaticamente a miniatura.
- **Recarregar**: clica em **Reload** na aplicação (ou reinicia o RVC Blue) depois de adicionares ou substituíres um modelo. As definições gerais por modelo são guardadas automaticamente.

## 3. Configurar áudio e fazer um teste local

O RVC Blue permite escolher **Input** (entrada), **Output** (saída) e **Monitor** de forma independente:

- **Input**: o teu microfone físico (ou um ficheiro de áudio / aplicação Windows).
- **Output**: para onde vai a voz convertida (auscultadores para teste local, ou cabo virtual para chamadas e jogos).
- **Monitor**: segunda saída opcional para te ouvires enquanto o **Output** envia o som para o Discord ou OBS.

### WASAPI vs ASIO

- **Sem interface ASIO**: começa por **WASAPI**.
- **Com ASIO nativo**: o RVC Blue inicia com o tamanho de buffer preferido do driver. Também podes combinar entrada/monitor ASIO com saída WASAPI, ou usar pares de canais distintos no mesmo driver ASIO.

### Primeiro teste local

1. Seleciona o teu microfone físico em **Input**.
2. Seleciona os teus auscultadores em **Output** (deixa **Monitor** desligado por agora para não ouvires voz dupla).
3. Escolhe **Sakura** (ou o teu modelo) e mantém o buffer e o pitch predefinidos.
4. Clica em **Start**, diz uma frase curta e faz uma pausa para verificar latência, clareza e ruído.

## 4. Encaminhar áudio para Discord, OBS ou jogo

> **Correct Audio Routing**
>
> **1. Dentro do Voice Changer**
> - **Input Device:** Seu microfone físico.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. No Discord, Jogos, OBS ou outros aplicativos**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Seus fones de ouvido ou alto-falantes.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> O áudio recebido do Discord, do jogo ou de outros apps deve ir diretamente para os **fones de ouvido** (nunca de volta para o cabo virtual).
>
> - **VAC vs. VB-CABLE:** `Line 1` é o nome usado pelo **VAC (Virtual Audio Cable)**, não um nome universal para todos os cabos virtuais. Com **VB-CABLE**, defina a saída do Voice Changer como **`CABLE Input`** e a entrada do Discord / jogo como **`CABLE Output`**.
> - **Monitoramento:** Ouvir sua própria voz convertida nos fones é um recurso opcional separado, para ativar apenas quando necessário. Evite caminhos de áudio duplicados, eco e loopback.

Para usar a voz convertida noutra aplicação, liga o RVC Blue através de um cabo de áudio virtual (**VAC Lite** ou **VB-CABLE**):

1. Define **Output** no RVC Blue para o dispositivo de reprodução do cabo virtual (por exemplo `CABLE Input` ou `Line 1`).
2. Opcionalmente, define **Monitor** para os teus auscultadores se quiseres ouvir-te.
3. No Discord, OBS ou jogo, escolhe o dispositivo de gravação do cabo virtual (por exemplo `CABLE Output` ou `Line 1`) como **Microfone**.
4. Mantém o áudio do jogo ou chamada nos teus auscultadores.
5. Faz uma gravação curta de teste na aplicação de destino antes de entrares numa chamada.

Para detalhes de instalação e nomes de dispositivos do cabo virtual, consulta o [guia do cabo virtual](../vonovox/live-audio.md).

## 5. Entrada por ficheiro, captura de aplicações e gravação WAV

- **Entrada por ficheiro de áudio**: muda a fonte para **File**, escolhe um clipe WAV ou áudio curto (descodificado via FFmpeg incluído) e confirma **Output** e **Monitor** antes de clicar em **Start**. As definições de saída e monitor são mantidas entre testes.
- **Captura de aplicações Windows**: muda a fonte para **Application**, clica em **Refresh** e escolhe uma aplicação em execução. Usa captura de áudio por processo do Windows. As aplicações detetadas são memorizadas e tentam reconectar ao reiniciar. Áudio enviado diretamente por ASIO fora do caminho normal do Windows pode não ser capturado, e o som original da aplicação **não é silenciado automaticamente** (baixa ou silencia à parte se necessário).
- **Gravação WAV**: os controlos integrados permitem gravar WAV com **entrada/saída em separado**, **misturados** ou em **canais L/R separados**.

## 6. Resolver problemas comuns

| Sintoma | O que verificar |
| --- | --- |
| A app parece congelada no primeiro arranque | Aguarda 1-2 minutos pela inicialização inicial do CUDA e do CUDA Graph warm-up. |
| O programa fecha logo ao abrir | Executa o `.bat` a partir da pasta extraída (ex. `C:\RVC-Realtime-GUI`) e lê o erro na consola. Confirma que o driver NVIDIA corresponde a CUDA 12.8 ou 11.8. |
| Uma voz nova não aparece | Confirma que o modelo está em `models/<NomeVoz>/` e é um `.pth` de inferência (não um checkpoint de treino), depois clica em **Reload**. |
| Funciona nos auscultadores, mas Discord/jogo fica mudo | Confirma que **Output** está no dispositivo de reprodução do cabo virtual e que o Discord/jogo usa o dispositivo de gravação correspondente como microfone. |
| Ouvem-se duas vozes | Desativa **Monitor** se **Output** já estiver nos auscultadores, ou silencia a aplicação de origem ao usar captura de aplicações. |
| O áudio falha ou estala sob carga | Repõe o buffer predefinido ou aumenta-o ligeiramente e volta a testar com o jogo ou chamada abertos. |

[Código-fonte e notas de lançamento](https://github.com/niel-blue/RVC-Realtime-GUI/tree/main)
