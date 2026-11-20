---
label: "🩺 Resolução de problemas"
order: 95
permalink: /troubleshooting/
---
# Resolução de problemas do RVC

[Transferir Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
Novo no RVC? **Começa sempre com um WAV de 10 segundos e um único modelo.** Se a app falhar, abre o registo e copia o **primeiro** erro. Se correr mas soar mal, volta a testar o mesmo clipe mudando apenas uma definição de cada vez.
!!!

Um bom diagnóstico começa na primeira etapa que falha. Guarda a versão da app, o primeiro erro exato e um teste reproduzível.

## Encontra o teu sintoma

| Sintoma | Primeiro teste |
| --- | --- |
| O iniciador fecha ou o navegador mostra erro de ligação | Mantém a consola aberta e confirma o endereço local impresso. |
| Modelo em falta, recusa carregar ou faltam chaves | Confirma que é um ficheiro de inferência exportado e verifica versão RVC e embedder. |
| O conversor não lê o ficheiro | Testa um WAV PCM curto num caminho local simples. |
| A conversão funciona só sem index | Confirma que o index pertence exatamente a esse modelo e embedder. |
| Voz metálica, confusa ou demasiado parecida com a tua | Compara vários clipes limpos e um modelo fiável com efeitos e retrieval a 0. |
| O treino para ou não gera um export válido | Identifica a etapa que falhou e verifica o registo e a pasta da experiência. |
| Erro CUDA ou falta de memória | Distingue entre GPU não suportada, VRAM cheia e RAM / ficheiro de paginação esgotados. |
| Microfone com atraso, falhas, silêncio ou eco | Testa separadamente microfone físico, monitorização nos auscultadores, cabo virtual e app final. |

## Define uma base de referência

1. Grava 10-20 segundos de um único locutor com vogais claras, consoantes como `s` ou `f` e uma pausa natural num WAV local limpo.
2. Escolhe um modelo de inferência fiável compatível com a app. Começa com pitch a `0`, detetor de tom padrão, efeitos desligados e retrieval (`index`) a `0`.
3. Converte e guarda numa pasta local com permissão de escrita. Ouve o ficheiro fora do navegador.
4. Repete com um segundo modelo que saibas estar bom para separar problemas do ambiente de problemas do modelo.
5. Reativa uma opção de cada vez e regista as definições usadas.

---

## Erros conhecidos e soluções exatas

### 1. Erros de Windows, caminhos, Python e iniciadores

| Erro / Mensagem | Causa | Como resolver |
| --- | --- | --- |
| `[WinError 3] The system cannot find the path specified` / `[WinError 206] The filename or extension is too long` | Limite de 260 caracteres do Windows, ou espaços e símbolos especiais em pastas ou ficheiros. | Move a app e os datasets para um caminho curto na raiz (ex. `C:\RVC` ou `D:\IlariaRVC`). Remove espaços, `()`, `[]` e caracteres não-ASCII/Unicode. |
| `[WinError 2] The system cannot find the file specified` (ao abrir/exportar áudio) | Falta `ffmpeg.exe` / `ffprobe.exe`, ou FFmpeg não está no `PATH`. | Confirma que o `ffmpeg` está na pasta da app. Em instalações pelo código-fonte, instala o FFmpeg, adiciona-o ao `PATH` e reinicia o terminal. |
| `PermissionError: [Errno 13] Permission denied` / `[WinError 5]` | Escrita em `Program Files`, `OneDrive`, pasta só de leitura ou ficheiro bloqueado por outra app/antivírus. | Extrai a app para uma pasta tua com escrita (não `Program Files` nem `OneDrive`), fecha leitores de áudio e adiciona exceção no antivírus. |
| `ModuleNotFoundError: No module named 'fairseq'` | `fairseq` falha a compilar em Python 3.11+ ou sem ferramentas C++. | Usa o pacote portátil incluído, ou recria o ambiente com **Python 3.9 ou 3.10** e instala **Microsoft Visual Studio Build Tools** (*Desenvolvimento para ambiente de trabalho com C++*). |
| `llvmlite.dll` / `OSError: [WinError 126]` / DLL em falta | Microsoft Visual C++ Redistributable em falta/incompatível ou DLL corrompida. | Instala ou repara o **Microsoft Visual C++ 2015-2022 Redistributable (x64)**. Se faltar a DLL, volta a extrair o pacote original. |
| `Expecting value: line 1 column 1` / página Gradio em branco | O servidor falhou antes de responder, ou um proxy/VPN está a intercetar `127.0.0.1`. | Mantém a consola aberta e lê o primeiro traceback Python. Confirma a porta exata (`127.0.0.1:6969` no Ilaria RVC, `7865` no Gradio/Deiteris) e exclui `localhost` / `127.0.0.1` do proxy. |
| `urllib.error` / `ConnectionResetError` / `SSLError` | Bloqueio de rede, VPN ou timeout do Hugging Face/GitHub ao transferir `hubert_base.pt` ou `rmvpe.pt`. | Desativa temporariamente VPN/firewall restritiva, ou transfere manualmente `hubert_base.pt` e `rmvpe.pt` para `assets/hubert/` e `assets/rmvpe/`. |

### 2. Erros de GPU, CUDA, DirectML e Memória

| Erro / Mensagem | Causa | Como resolver |
| --- | --- | --- |
| **VRAM transborda para a RAM / treino lento / voz ao vivo robótica (Windows 10/11)** | O **Agendamento de GPU acelerado por hardware (HAGS)** interfere com a alocação de VRAM do PyTorch e tira recursos ao alterador de voz. | Vai a **Definições do Windows → Sistema → Ecrã → Gráficos → Definições gráficas avançadas**, desliga **Agendamento de GPU acelerado por hardware** e **reinicia o PC**. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Inferência) | Ficheiro demasiado longo ou outras apps (jogos, navegador com aceleração de hardware) a consumir VRAM. | Ativa **Split Audio** para faixas longas, fecha jogos/navegadores pesados, descarrega modelos não usados e desativa pós-processamento opcional. |
| `CUDA out of memory` / `torch.cuda.OutOfMemoryError` (Treino) | Batch size demasiado alto para a tua VRAM ou cache do dataset em VRAM ativa. | Baixa **Batch Size** (ex. de `8` para `4`, `2` ou `1`), desativa cache do dataset em VRAM e fecha qualquer alterador ao vivo antes de treinar. |
| `RuntimeError: CUDA error: an illegal memory access was encountered` | Incompatibilidade driver/PyTorch, overclock/undervolt instável da GPU ou memória partilhada esgotada. | Atualiza os drivers NVIDIA, remove qualquer overclock/undervolt e confirma que a compilação CUDA do PyTorch corresponde ao driver. |
| `Torch not compiled with CUDA enabled` / `no kernel image is available for execution on the device` | Pacote errado para a geração da tua GPU (ex. CUDA antigo na RTX 50, ou PyTorch só CPU). | Usa o runtime adequado: o Ilaria RVC traz **CUDA 12.8** (GTX 16 / RTX 20-50) e transfere **CUDA 12.6** (`runtime-cu126`) para Maxwell/Pascal/Volta. AMD/Intel requerem DirectML/ROCm ou nuvem. |
| `RuntimeError: expected scalar type Half but found Float` (ou erro `HalfTensor`) | Precisão `FP16` forçada numa GPU ou backend incompatível (série GTX 10, DirectML, CPU). | Desativa **FP16** nas definições e muda para **FP32** (precisão total). |
| `OSError: [WinError 1455] The paging file is too small for this operation to complete` | Memória virtual do Windows (ficheiro de paginação) esgotada ao carregar modelos, criar index ou treinar. | Abre **Propriedades do Sistema → Avançadas → Desempenho (Definições) → Avançadas → Memória virtual**, aumenta o ficheiro de paginação (ex. `16384–32768 MB`) e reinicia. |

### 3. Carregamento de modelos, Checkpoints, Embedders e Index

| Erro / Mensagem | Causa | Como resolver |
| --- | --- | --- |
| `UnpicklingError` / `Weights only load failed` (`fairseq.data.dictionary.Dictionary`) | O PyTorch 2.6+ usa `weights_only=True` por predefinição em `torch.load`, bloqueando objetos fairseq antigos. | Atualiza para a versão mais recente da app (ex. Ilaria RVC 2.4.0+ ou último Applio), que trata automaticamente `safe_globals` para `Dictionary`. |
| `EOFError` / `RuntimeError: invalid load key` / `File is not a zip archive` | Transferência do `.pth` interrompida/corrompida, ou o navegador guardou uma página HTML em vez do binário. | Confirma o tamanho do ficheiro (um `.pth` válido tem 40-100+ MB, não poucos KB). Apaga o ficheiro partido e transfere novamente. |
| `Missing key(s) in state_dict` / `RuntimeError: Sizes of tensors must match` | Carregaste um checkpoint de treino (`G_*.pth` ou `D_*.pth` de `logs/`) em vez de um export de inferência, ou misturaste `v1` (256-d) e `v2` (768-d). | Usa a ferramenta **Export** para gerar um `.pth` de inferência (não copies `G_*.pth` brutos para `models/`) e verifica versão RVC e sample rate. |
| Pronúncia distorcida ou a tua voz original passa muito | **Embedder diferente** entre treino e inferência, ou uso de HuBERT genérico em vez de `contentvec`. | Usa exatamente o mesmo embedder do treino (quase sempre **`contentvec`**). Testa primeiro com retrieval a `0`. |
| Erro de index / dimensões incompatíveis / falha de RAM ao criar index | Uso de `trained_*.index` em vez de `added_*.index`, index de outro modelo, ou demasiadas features para a RAM. | Escolhe sempre `added_*.index` (ou põe retrieval em `0` para testar sem index). Nunca mistures índices entre modelos diferentes. |

### 4. Pré-processamento, Extração de features e Treino

| Erro / Mensagem | Causa | Como resolver |
| --- | --- | --- |
| `ValueError: zero-size array to reduction operation` / tensor de tamanho zero | Pasta de dataset vazia, clipe totalmente silencioso, clipe com menos de 1 segundo, ou espaços/Unicode no caminho. | Usa um caminho simples sem espaços, remove clipes mudos ou corrompidos, garante WAVs válidos e repete o pré-processamento numa nova experiência. |
| `BrokenProcessPool` / workers de pré-processamento morrem | Demasiados workers CPU em paralelo esgotam a RAM do sistema. | Reduz o número de threads/workers CPU nas definições e confirma espaço livre em disco. |
| `NaN loss` ou modelo exportado silencioso | Áudio corrompido ou com clipping no dataset, par pretrain `G`/`D` incompatível, ou overflow em `FP16`. | Verifica se não há clipes distorcidos/mudos, confirma se o pretrain `G/D` corresponde a sample rate e vocoder (ou usa stock RVC) e testa em `FP32`. |
| Retomar treino falha ou recomeça na época 0 | `Fresh Training` deixado ativo, ou `G_*.pth` / `D_*.pth` / `config.json` movidos ou renomeados. | Mantém a pasta `logs/<experiência>/` intacta, usa exatamente o mesmo nome, sample rate e embedder, define um total de épocas superior e deixa `Fresh Training` **desligado**. |

### 5. Alterador de voz ao vivo, PortAudio e Encaminhamento

| Erro / Mensagem | Causa | Como resolver |
| --- | --- | --- |
| `PortAudioError` / `Invalid sample rate` / dispositivo indisponível | Os dispositivos de áudio do Windows têm taxas de amostragem diferentes ou outra app usa modo exclusivo. | No **Painel de Som do Windows**, define microfone físico, auscultadores e `VB-CABLE` todos para **48000 Hz**, desliga o **modo exclusivo** e reinicia após instalar cabos virtuais. |
| Engasgos robóticos, estalidos ou latência alta | Tempo de inferência GPU excede a duração do Chunk, HAGS está ativo, ou jogos saturam a GPU. | Aumenta **Chunk Size**, usa **RMVPE** ou **FCPE** em vez de Crepe pesado, desliga **HAGS** no Windows e fecha apps GPU concorrentes. |
| Eco ou voz dupla nos auscultadores | Colunas ligadas em vez de auscultadores, ou monitorização dupla ("Ouvir este dispositivo" no Windows + monitor da app). | Usa sempre **auscultadores** e ativa a monitorização em **apenas um sítio**. |
| Respirações ou finais suaves cortados no Discord | A **supressão de ruído (Krisp)** ou **sensibilidade automática** do Discord filtra-os, ou o limiar VAD/Noise Gate está alto. | Desliga o Krisp e a sensibilidade automática no Discord para o microfone virtual e baixa os limiares VAD / Noise Gate na app. |

---

## Verificações por aplicação

- **Ilaria RVC:** Extrai o pacote completo, abre a pasta e executa `RUN_ILARIA_RVC_LOGS.bat`. Lê a primeira exceção acima da última mensagem de fecho. Confirma que o Windows deteta a GPU NVIDIA e que `127.0.0.1:6969` está livre.
- **Applio Desktop:** Abre **Setup** para verificar o estado do motor; usa **Install / Repair** se algum controlo falhar. No **Gradio**, mantém a consola aberta e abre exatamente o endereço `localhost` impresso.
- **RVC WebUI (Mainline) / w-okada / Deiteris / TGR:** Escolhe a compilação CUDA ou DirectML certa para a tua GPU. Para arquivos divididos `.zip.001`, coloca todas as partes na mesma pasta antes de extrair.

## Reportar um problema

Ao pedir ajuda (por exemplo na [página de contacto](https://ilariarvc.shop/en/contact/) para o Ilaria RVC), inclui:
1. Nome da app, edição e versão (ex. `Ilaria RVC 2.4.0`).
2. Sistema operativo, modelo exato da GPU e backend (`CUDA` / `DirectML` / `CPU`).
3. A **primeira linha de erro** e linhas próximas do registo (sem caminhos privados nem dados sensíveis).
4. Para treino: etapa que falhou, sample rate, vocoder, embedder e se era execução nova ou retomada. Para ao vivo: cadeia completa de dispositivos (`Mic → App → Cabo virtual → App destino`).
