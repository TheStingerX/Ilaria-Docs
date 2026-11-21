# Resolução de problemas do RVC

[Baixar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

!!!tip
**Novo no RVC? Siga estas 4 regras antes de qualquer coisa:**
1. **Use uma pasta curta e simples** como `C:\RVC` ou `D:\IlariaRVC`. Nunca coloque o aplicativo dentro do `OneDrive`, `Program Files` ou pastas com espaços, acentos ou emojis.
2. **Extraia sempre o ZIP completo** antes de abrir qualquer arquivo. Nunca execute arquivos `.bat` de dentro do WinRAR, 7-Zip ou da pré-visualização de ZIP do Windows.
3. **Nunca feche a janela preta do terminal.** Essa janela faz o programa rodar e mostra o erro real se algo falhar.
4. **Teste primeiro com um clipe `.wav` limpo de 10 segundos.** Se o app fechar, copie o **primeiro** erro do console. Se funcionar mas soar ruim, mude **uma configuração por vez** no mesmo clipe de teste.
!!!

## Encontre seu problema rapidamente

| O que está acontecendo? | Causa mais provável | Onde olhar |
| --- | --- | --- |
| A janela preta abre e fecha em 1 segundo | Executado dentro do ZIP, bloqueado pelo antivírus ou falta um runtime | [1. Inicialização, Windows, Antivírus e Downloads](#1-inicialização-windows-antivírus-e-downloads) |
| Navegador mostra erro de conexão ou página em branco | O app travou ao iniciar, porta errada ou VPN/proxy em `127.0.0.1` | [1. Inicialização, Windows, Antivírus e Downloads](#1-inicialização-windows-antivírus-e-downloads) |
| O app está muito lento ou diz `CUDA out of memory` | Usando CPU em vez de GPU, HAGS do Windows ligado ou batch/áudio muito grande | [2. GPU, CUDA, AMD/Intel e Memória](#2-gpu-cuda-amdintel-e-memória) |
| O modelo não aparece ou falha ao carregar (`.pth` / `.index`) | Esqueceu de clicar em Refresh, ZIP não extraído, download corrompido ou arquivo errado | [3. Modelos, Checkpoints e Índices](#3-modelos-checkpoints-e-índices) |
| A voz parece esquilo, monstro, robô ou sua voz original | Pitch (Transpose) errado, áudio sujo ou Pitch Extractor incorreto | [4. Qualidade de voz, Pitch e Arquivos de áudio](#4-qualidade-de-voz-pitch-e-arquivos-de-áudio) |
| O treino para, trava ou exporta uma voz muda | Clipe vazio ou silencioso no dataset, workers de CPU demais ou `Fresh Training` ligado | [5. Pré-processamento de Dataset e Treino](#5-pré-processamento-de-dataset-e-treino) |
| Microfone com atraso, cortes, eco ou Discord não te ouve | Taxas diferentes (`44100` vs `48000 Hz`), cabo virtual errado ou Krisp | [6. Voice Changer ao vivo, Microfone e Discord](#6-voice-changer-ao-vivo-microfone-e-discord) |
| Google Colab ou Kaggle falha ou desconecta | Acelerador GPU desligado, cota esgotada ou tempo limite atingido | [7. Notebooks na nuvem (Colab e Kaggle)](#7-notebooks-na-nuvem-colab-e-kaggle) |

## Teste base simples em 5 passos

Se tudo soar estranho ou você não souber qual opção estragou o áudio, volte a um teste limpo:

1. **Prepare um clipe limpo:** Grave de 10 a 20 segundos de uma única voz falando claro em um quarto silencioso (sem música, sem eco). Salve como `.wav` padrão em uma pasta simples como `C:\RVC\test.wav`.
2. **Escolha um modelo confiável:** Selecione um modelo `.pth` que você sabe que funciona. Deixe o `.index` desligado (`Index Rate = 0`) no primeiro teste.
3. **Use configurações seguras:**
   - **Pitch / Transpose:** `0` (mesmo gênero), `+12` (homem para mulher), `-12` (mulher para homem).
   - **Pitch Extractor:** `rmvpe` (melhor equilíbrio entre velocidade e qualidade).
   - **Efeitos / limpeza opcionais:** Todos **DESLIGADOS**.
4. **Converta e ouça:** Salve em uma pasta local normal (não `OneDrive`). Se o player do navegador ficar mudo, baixe o arquivo e abra no VLC ou Windows Media Player.
5. **Mude uma coisa por vez:** Quando o teste limpo funcionar, ative o `.index` (comece em `0.5` a `0.75`) ou ajuste o Pitch em `1` ou `2` semitons.

---

## Erros conhecidos e soluções passo a passo

### 1. Inicialização, Windows, Antivírus e Downloads

| Problema ou Erro | O que significa (em palavras simples) | Como resolver |
| --- | --- | --- |
| **A janela preta abre e fecha na hora** | Você executou dentro da prévia do ZIP ou o Python deu erro logo no início. | 1. Clique com o botão direito no `.zip` e extraia a pasta toda primeiro.<br>2. No Ilaria RVC, execute `RUN_ILARIA_RVC_LOGS.bat` para a janela ficar aberta e mostrar o erro. |
| **Antivírus / Windows Defender apaga `.bat`, `.exe` ou `.dll`** | O antivírus bloqueia scripts portáteis de IA por engano. | Abra **Segurança do Windows → Proteção contra vírus e ameaças → Histórico de proteção**, restaure o arquivo e adicione sua pasta RVC (ex. `C:\RVC`) às **Exclusões**. |
| `WinError 10048` / `Address already in use` / porta ocupada | Outra cópia do RVC ou outro programa já está usando essa porta (`6969` ou `7865`). | Feche todas as janelas pretas abertas (ou finalize `python.exe` no **Gerenciador de Tarefas**) e abra o app apenas uma vez. |
| `[WinError 3]` / `[WinError 206]` (caminho não encontrado / muito longo) | O Windows falha quando o caminho passa de 260 caracteres ou tem espaços, acentos ou símbolos (`()`, `[]`). | Mova o app e os áudios para um caminho curto como `C:\RVC\`. Renomeie pastas e `.wav` usando apenas letras, números e `_`. |
| `[WinError 2]` (ao carregar/salvar áudio) | Falta o `ffmpeg.exe` ou `ffprobe.exe` (a ferramenta que lê arquivos de áudio). | Confira se `ffmpeg.exe` está na pasta do app (reextraia o ZIP se o Defender removeu). Em instalações manuais, instale o FFmpeg, adicione ao `PATH` do Windows e reinicie o terminal. |
| `PermissionError: [Errno 13]` / `[WinError 5] Acesso negado` | O Windows bloqueia escrita em `Program Files`, `OneDrive` ou em um arquivo aberto em outro programa. | Tire o app de `Program Files` e `OneDrive` para `C:\RVC\`. Feche qualquer player ou editor que esteja usando o arquivo de áudio. |
| `Expecting value: line 1 column 1` ou página em branco | O app travou antes de carregar, porta errada ou VPN/proxy bloqueando conexões locais. | Leia o **primeiro** erro na janela preta. Confira o endereço exato impresso lá (`127.0.0.1:6969` no Ilaria RVC, `127.0.0.1:7865` no Gradio/Deiteris). Desative VPN/proxy para `localhost` e `127.0.0.1`. |
| Arquivo dividido falha ao extrair (`.zip.001`, `.zip.002`) | O extrator do Windows não abre arquivos em várias partes ou falta uma parte. | Coloque todas as partes (`.001`, `.002`, etc.) na mesma pasta, instale o **7-Zip**, clique com o botão direito **apenas** no `.001` e escolha **7-Zip → Extrair aqui**. |
| `ModuleNotFoundError: No module named 'fairseq'` | Instalação manual no Python 3.11+ ou sem ferramentas de compilação C++. | Iniciantes devem usar o pacote ZIP portátil pronto. Para instalação manual, use **Python 3.9 ou 3.10** e instale **Microsoft Visual Studio Build Tools** (*Desenvolvimento para desktop com C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / falta `.dll` | Faltam no Windows as bibliotecas Visual C++ exigidas pelos pacotes de IA em Python. | Baixe e instale o **Microsoft Visual C++ 2015-2022 Redistributable (x64)** oficial da Microsoft e reinicie o PC. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Sua rede, firewall ou VPN bloqueou o download automático de `hubert_base.pt` ou `rmvpe.pt`. | Desative temporariamente a VPN/regras rígidas do firewall ou baixe manualmente `hubert_base.pt` e `rmvpe.pt` e coloque-os em `assets/hubert/` e `assets/rmvpe/`. |

### 2. GPU, CUDA, AMD/Intel e Memória

| Problema ou Erro | O que significa (em palavras simples) | Como resolver |
| --- | --- | --- |
| **Tudo roda muito lento (usando CPU em vez de GPU)** | O app não detecta sua placa de vídeo ou você baixou uma versão só NVIDIA para uma GPU AMD/Intel. | 1. Usuários NVIDIA: confira se os drivers estão instalados e se não está usando vídeo integrado.<br>2. Usuários AMD/Intel: builds CUDA não usam sua GPU. Use uma build **DirectML** (YuneVoix, Deiteris DirectML, Mainline DirectML) ou um notebook na nuvem. |
| **PC travando, VRAM vazando para a RAM ou voz ao vivo robótica** | Uma configuração do Windows chamada **HAGS** (Agendamento de GPU acelerado por hardware) prejudica a estabilidade da VRAM em apps de IA. | Vá em **Configurações do Windows → Sistema → Tela → Gráficos → Configurações avançadas de gráficos**, deixe **Agendamento de GPU acelerado por hardware** em **DESATIVADO** e **reinicie o PC**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (conversão) | A memória da placa de vídeo acabou porque a música é longa ou um jogo/navegador está usando VRAM. | Ative **Split Audio** para faixas longas, feche jogos e abas pesadas (ou desligue a aceleração por hardware do navegador) e desative efeitos extras. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (treino) | O **Batch Size** está grande demais para a memória da sua GPU. | Diminua o **Batch Size** aos poucos (de `8` para `4`, `2` ou `1`). Desative "Cache dataset in GPU/VRAM" e feche qualquer voice changer ao vivo antes de treinar. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available` | A versão CUDA do app não bate com a geração da sua placa NVIDIA (ex. RTX 50 nova vs GTX 10 antiga). | Use a build certa: o **Ilaria RVC** inclui **CUDA 12.8** para GTX 16 / RTX 20-50 e baixa automaticamente **CUDA 12.6** (`runtime-cu126`) para Maxwell/Pascal/Volta. |
| `CUDA driver version is insufficient for CUDA runtime version` | Seu driver NVIDIA é antigo demais para o motor de IA. | Atualize o driver gráfico pelo **NVIDIA App / GeForce Experience** ou site oficial da NVIDIA e reinicie. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | A GPU travou por overclock/undervolt instável, superaquecimento ou conflito de driver. | Zere qualquer overclock/undervolt no MSI Afterburner, atualize o driver NVIDIA e tente novamente. |
| `RuntimeError: expected scalar type Half but found Float` / `HalfTensor` | O modo rápido `FP16` está ligado, mas sua GPU (série GTX 10, DirectML ou CPU) não suporta. | Vá nas Configurações e desative **FP16** (mude para **FP32**). |
| `OSError: [WinError 1455]` (arquivo de paginação pequeno demais) | O Windows ficou sem Memória Virtual no disco ao carregar modelos ou criar o índice. | Pesquise **Exibir configurações avançadas do sistema → Configurações de desempenho → Avançado → Memória virtual → Alterar**, desmarque o gerenciamento automático, defina um tamanho personalizado (ex. Inicial `16384` MB, Máximo `32768` MB), clique em **Definir** e **reinicie o PC**. |

### 3. Modelos, Checkpoints e Índices

| Problema ou Erro | O que significa (em palavras simples) | Como resolver |
| --- | --- | --- |
| **Coloquei o modelo na pasta, por que não aparece?** | Esqueceu de atualizar a lista, deixou dentro de um `.zip` ou colocou na pasta errada. | 1. Extraia o `.zip` para ver `.pth` e `.index` diretamente.<br>2. Coloque `.pth` em `assets/weights/` (ou `weights/`) e `.index` em `logs/`.<br>3. Clique no botão **Refresh** ao lado do seletor de modelo. |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | Versões novas do PyTorch (2.6+) bloqueiam formatos antigos de RVC por padrão. | Atualize para a versão mais recente do app (ex. **Ilaria RVC 2.4.0+** ou último **Applio**), que já inclui o carregador seguro. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | O download foi interrompido, corrompido ou salvou uma página web no lugar do arquivo. | Veja o tamanho do arquivo: um `.pth` real tem **40 a 100+ MB**. Se tiver só alguns KB ou 0 KB, apague e baixe novamente. |
| `Missing key(s) in state_dict` / `Sizes of tensors must match` | Você carregou um checkpoint bruto (`G_*.pth` ou `D_*.pth`) em vez do modelo exportado, ou misturou `v1` e `v2`. | Nunca copie `G_*.pth` bruto de `logs/` para `weights/`. Use o botão **Export** do app para gerar o `.pth` final e confira se `v1` / `v2` e sample rate batem. |
| **Erro de índice / dimensões / queda de RAM ao criar índice** | Você escolheu `trained_*.index` em vez de `added_*.index`, usou índice de outra voz ou o dataset é enorme. | Escolha sempre **`added_*.index`** (nunca `trained_*.index`). Se continuar errando, deixe **Index Rate** em `0` para testar sem índice. Nunca misture `.index` de modelos diferentes. |

### 4. Qualidade de voz, Pitch e Arquivos de áudio

| Problema ou Erro | O que significa (em palavras simples) | Como resolver |
| --- | --- | --- |
| **A voz parece esquilo ou monstro grave** | O ajuste **Pitch (Transpose)** não combina com a distância entre sua voz e a voz alvo. | Use `0` para o mesmo gênero, `+12` de voz masculina para feminina e `-12` de feminina para masculina. Ajuste de `1` em `1` depois. |
| **A voz está metálica, aguada, robótica ou embolada** | O áudio de entrada tem música/eco, Pitch Extractor errado ou Embedder incompatível. | 1. Limpe o áudio antes com **UVR5** ou **MVSep** (sem música nem eco).<br>2. Use **`rmvpe`** como Pitch Extractor.<br>3. Use o mesmo Embedder do treino (quase sempre **`contentvec`**).<br>4. Baixe **Index Rate** de `1.0` para `0.5` ou `0.3`. |
| **O resultado ainda parece muito com a minha própria voz** | **Index Rate** está baixo ou o **Pitch** continuou na sua região natural em vez da região do modelo. | Aproxime o Pitch da voz alvo (`+12` / `-12`), suba um pouco o **Index Rate** (`0.6` a `0.75`) ou teste um modelo mais limpo. |
| **O conversor não abre meu arquivo de áudio** | Formato não suportado (`.m4a`, `.opus`, `.mp3` corrompido) ou caracteres especiais no nome. | Converta para **`.wav` PCM padrão** (44100 Hz ou 48000 Hz) e renomeie de forma simples, como `input.wav`. |

### 5. Pré-processamento de Dataset e Treino

| Problema ou Erro | O que significa (em palavras simples) | Como resolver |
| --- | --- | --- |
| `ValueError: zero-size array` / tensor vazio | Pasta do dataset vazia, clipes totalmente mudos, menores que 1 segundo ou espaços/acentos no caminho. | Garanta arquivos `.wav` não vazios (de 2 a 10 segundos cada), remova clipes mudos ou corrompidos, use um caminho simples sem espaços e comece um novo experimento. |
| `BrokenProcessPool` / PC congela no Pré-processamento | Muitos threads de CPU rodando ao mesmo tempo esgotam a memória RAM. | Reduza os **threads / workers de CPU** (ex. de `8` para `2` ou `4`) e confira o espaço livre em disco. |
| `NaN loss` ou modelo exportado sai mudo | Um clipe estourado/corrompido no dataset quebrou o cálculo, `FP16` deu overflow ou o pretrain `G/D` não bate. | Verifique se não há distorção extrema nem silêncio total nos clipes. Use o **pretrain padrão do RVC** para seu sample rate, desligue `FP16` (use `FP32`) e comece um novo treino. |
| **O treino não retoma / recomeça da Epoch 0** | `Fresh Training` ficou marcado ou arquivos dentro de `logs/` foram movidos/renomeados. | Mantenha toda a pasta `logs/<experimento>/` intacta, digite exatamente o mesmo **Nome do Experimento**, **Sample Rate** e **Embedder**, aumente o total de épocas e desmarque `Fresh Training`. |
| **O modelo soa abafado, chiado ou com "overfitting"** | Treinou épocas demais em um dataset pequeno ou sujo e decorou o chiado em vez da voz. | Pare antes (teste checkpoints a cada 50-100 épocas, ex. 200-400 épocas em datasets pequenos) e sempre limpe o dataset com **UVR5** ou **MVSep**. |

### 6. Voice Changer ao vivo, Microfone e Discord

| Problema ou Erro | O que significa (em palavras simples) | Como resolver |
| --- | --- | --- |
| **Ninguém no Discord ou jogo ouve minha voz mudada** | O app de destino ainda está ouvindo seu microfone real em vez do cabo virtual, ou o voice changer não foi iniciado. | 1. Instale o **VB-CABLE** e reinicie o PC.<br>2. No voice changer: **Input** = seu microfone físico, **Output** = `CABLE Input (VB-Audio Virtual Cable)`.<br>3. No **Discord / Jogo**: **Dispositivo de entrada** = `CABLE Output (VB-Audio Virtual Cable)`. |
| `PortAudioError` / `Invalid sample rate` / dispositivo falha | Microfone, fones e VB-CABLE estão em taxas diferentes (`44100 Hz` vs `48000 Hz`) ou em Modo Exclusivo. | Abra o **Painel de Som do Windows (`mmsys.cpl`)**, vá em **Propriedades → Avançado** do Microfone, Fones, `CABLE Input` e `CABLE Output`, coloque **todos em 48000 Hz**, desmarque **Permitir que os aplicativos assumam controle exclusivo** e reinicie o app. |
| **Cortes, estalos ou atraso enorme na voz** | Sua GPU demora mais para processar um bloco de áudio do que a duração do próprio bloco. | 1. Aumente um pouco o **Chunk Size**.<br>2. Use **RMVPE** ou **FCPE** para pitch.<br>3. Desative o **HAGS** no Windows.<br>4. Limite o FPS dos jogos ou feche apps pesados na GPU. |
| **Eco ou você se ouve duas vezes** | Você está usando caixas de som ou dois programas estão reproduzindo seu microfone juntos. | Use sempre **fones de ouvido**. Desative **"Escutar o dispositivo"** em Gravação no Windows e ative o Monitor apenas no voice changer se precisar se ouvir. |
| **Discord corta respirações ou o final das palavras** | O filtro de ruído do Discord confunde o fim da voz convertida com barulho de fundo. | Em **Voz e Vídeo** do Discord, desative **Supressão de ruído Krisp**, **Cancelamento de eco** e **Determinar sensibilidade de entrada automaticamente** (ajuste a barra manualmente). Abaixe também o VAD / Noise Gate no voice changer. |

### 7. Notebooks na nuvem (Colab e Kaggle)

| Problema ou Erro | O que significa (em palavras simples) | Como resolver |
| --- | --- | --- |
| `CUDA not available` / `No GPU found` no Colab ou Kaggle | Você esqueceu de ativar a GPU nas configurações ou atingiu a cota gratuita. | **Colab:** **Ambiente de execução → Alterar tipo de ambiente → GPU T4**.<br>**Kaggle:** barra direita **Settings → Accelerator → GPU T4 x2** (exige verificação por telefone). |
| **Download falha no notebook (`403` / cota do Drive ou Mega)** | Um link público atingiu o limite diário ou ficou privado. | Suba primeiro seu dataset ou modelo para o **Hugging Face** ou para seu próprio Google Drive e baixe de lá. |
| **Notebook desconecta no meio do treino** | Notebooks na nuvem desligam após inatividade ou sessões longas e apagam arquivos temporários. | Sempre salve ou sincronize `logs/` e `weights/` no **Google Drive** (ou Kaggle Output) e retome do último `G_*.pth` / `D_*.pth` salvo em vez de recomeçar do zero. |

---

## Verificações rápidas por aplicativo

- **Ilaria RVC:** Extraia todo o ZIP em um caminho curto como `C:\IlariaRVC`. Use `RUN_ILARIA_RVC_LOGS.bat` se fechar ao abrir, veja se `127.0.0.1:6969` está livre e leia o **primeiro** erro acima da mensagem de encerramento.
- **Applio Desktop:** Abra a aba **Setup** e confira o status do motor. Clique em **Install / Repair** se algum item estiver vermelho. No **Gradio**, mantenha o console aberto e copie o endereço `localhost` exato impresso ali.
- **RVC Mainline / w-okada / Deiteris / TGR:** Escolha **CUDA** (NVIDIA) ou **DirectML** (AMD/Intel) conforme sua GPU antes de baixar. Extraia arquivos divididos `.zip.001` com o 7-Zip apenas depois que todas as partes estiverem na mesma pasta.

## Como pedir ajuda

Ao pedir suporte (por exemplo na [página de contato do Ilaria RVC](https://ilariarvc.shop/en/contact/)), inclua estas 4 informações:
1. **Nome e versão do app** (ex. `Ilaria RVC 2.4.0`, `Applio Desktop`, `Deiteris`).
2. **Configuração do PC:** versão do Windows, modelo exato da GPU (ex. `RTX 3060` ou `RX 6700 XT`) e backend (`CUDA` / `DirectML` / `CPU`).
3. **A PRIMEIRA linha de erro** do console (oculte seu nome de usuário do Windows se quiser).
4. **O que você estava fazendo:** Treino (sample rate, vocoder, embedder e novo vs retomar) ou Voice Changer ao vivo (cadeia exata: `Mic -> App -> VB-CABLE -> Discord`).
