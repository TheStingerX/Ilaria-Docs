# Otimização Avançada de Desempenho: NVIDIA GPU Clock Locking

> **Otimização opcional:** Este guia é **100% opcional** e **nunca é obrigatório** para instalar ou usar o Vonovox. Conclua sempre [Instalar Vonovox](installation.md) e [Rotear e ajustar Vonovox](live-audio.md) antes de testar ajustes avançados de GPU.

**Princípio central:** O bloqueio de clock de GPU (GPU Clock Locking) é uma otimização avançada opcional que pode melhorar a estabilidade do processamento em tempo real do Vonovox em GPUs NVIDIA compatíveis. Use sempre frequências suportadas, teste os resultados no seu próprio hardware e restaure os clocks padrão se não observar benefício mensurável.

> **Restauração rápida (execute a qualquer momento para restaurar o padrão):** Abra o Prompt de Comando como Administrador e execute `nvidia-smi -i 0 -rgc` (substitua `0` pelo índice da sua GPU se tiver mais de uma GPU). Você também pode reiniciar o Windows para voltar ao gerenciamento dinâmico de clocks.

## Índice

- [Caminho Rápido para Usuários Experientes](#caminho-rápido-para-usuários-experientes)
- [1. O que é GPU Clock Locking (Introdução para Iniciantes)](#1-o-que-é-gpu-clock-locking-introdução-para-iniciantes)
- [2. Como os Clocks de GPU Afetam o Vonovox](#2-como-os-clocks-de-gpu-afetam-o-vonovox)
- [3. Compatibilidade NVIDIA e Mensagens de Erro](#3-compatibilidade-nvidia-e-mensagens-de-erro)
- [4. Configuração para Iniciantes: Windows 10 e Windows 11](#4-configuração-para-iniciantes-windows-10-e-windows-11)
- [5. Encontrando os Clocks Suportados da sua GPU](#5-encontrando-os-clocks-suportados-da-sua-gpu)
- [6. Escolhendo uma Frequência Adequada](#6-escolhendo-uma-frequência-adequada)
- [7. Aplicando o Bloqueio de Clock de GPU](#7-aplicando-o-bloqueio-de-clock-de-gpu)
- [8. Restaurando as Configurações Padrão](#8-restaurando-as-configurações-padrão)
- [9. Gerenciamento de Clock de GPU em Um Clique (Scripts BAT)](#9-gerenciamento-de-clock-de-gpu-em-um-clique-scripts-bat)
- [10. Como Testar se Realmente Ajuda](#10-como-testar-se-realmente-ajuda)
- [11. Riscos, Limitações e Precauções](#11-riscos-limitações-e-precauções)
- [12. Nota Avançada: Bloqueio de Clock de Memória GPU (-lmc)](#12-nota-avançada-bloqueio-de-clock-de-memória-gpu--lmc)
- [13. Alternativas Quando o Clock Locking Não Ajuda](#13-alternativas-quando-o-clock-locking-não-ajuda)
- [14. Solução de Problemas](#14-solução-de-problemas)
- [15. Perguntas Frequentes (FAQ)](#15-perguntas-frequentes-faq)
- [16. Referências Oficiais](#16-referências-oficiais)

---

## Caminho Rápido para Usuários Experientes

Se você já sabe usar um Prompt de Comando elevado e o `nvidia-smi`:

1. Liste as GPUs e confirme seu índice alvo (`0` em sistemas com uma GPU):
   ```bat
   nvidia-smi -L
   ```
2. Consulte os clocks gráficos suportados nessa GPU:
   ```bat
   nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
   ```
3. Bloqueie para um clock gráfico **verificado e suportado** da saída (`1800` abaixo é apenas um exemplo ilustrativo):
   ```bat
   nvidia-smi -i 0 -lgc 1800,1800
   ```
4. Verifique os clocks ao vivo enquanto o Vonovox está rodando:
   ```bat
   nvidia-smi -i 0 -q -d CLOCK
   ```
5. Faça um [teste A/B no Vonovox](#10-como-testar-se-realmente-ajuda). Ao terminar, ou se não houver melhora, restaure os clocks dinâmicos imediatamente:
   ```bat
   nvidia-smi -i 0 -rgc
   ```

---

## 1. O que é GPU Clock Locking (Introdução para Iniciantes)

1. **O que é frequência de GPU (velocidade de clock):** Dentro da sua placa de vídeo NVIDIA, o processador principal (o núcleo da GPU) realiza milhões de pequenos cálculos matemáticos por segundo. Sua **frequência de clock** é quantos ciclos de cálculo ela completa por segundo.
2. **O que significa MHz:** **MHz** significa **megahertz** (1 milhão de ciclos por segundo). Por exemplo, `1500 MHz` são 1,5 bilhão de ciclos por segundo e `1800 MHz` são 1,8 bilhão de ciclos por segundo.
3. **Como funcionam os clocks dinâmicos da NVIDIA:** GPUs NVIDIA modernas não rodam a uma velocidade fixa única. Quando o PC está ocioso na área de trabalho, a GPU cai para uma velocidade baixa (por exemplo `210 MHz` ou `300 MHz`) para economizar energia, ficar silenciosa e fria. Quando trabalho pesado começa, ela sobe a velocidade.
4. **O que é NVIDIA GPU Boost:** **NVIDIA GPU Boost** é o sistema automático integrado que ajusta constantemente a frequência da sua GPU para cima e para baixo conforme carga de trabalho, temperatura, limites de energia e margem de tensão.
5. **Por que os clocks oscilam durante o Vonovox:** A conversão de voz em tempo real processa áudio em blocos discretos (a duração exata depende do seu **Block Size** e ajustes de áudio), e não como uma renderização 3D contínua e pesada. Entre blocos, a GPU pode perceber carga baixa por instantes e baixar o clock, voltando a subir no próximo bloco.
6. **O que significa bloquear um clock:** **GPU Clock Locking** (`nvidia-smi -lgc`) instrui o driver NVIDIA a manter o núcleo da GPU dentro de uma faixa específica de frequências suportadas (ou em uma única frequência suportada quando min e max são iguais) em vez de deixá-lo cair e subir sem parar. Pense nisso como o **piloto automático em uma rodovia**: o carro mantém velocidade constante em vez de frear e acelerar repetidamente.
7. **GPU Clock Locking vs. Overclocking:**
   - **Overclocking** empurra a GPU *além* dos limites de fábrica ou altera tensões/curvas de energia para buscar velocidade máxima maior.
   - **GPU Clock Locking** apenas escolhe uma frequência que a própria NVIDIA já incluiu na tabela oficial de clocks suportados da placa. Ele **não** aumenta tensão, não desbloqueia limites de energia nem força velocidades não suportadas.
8. **Por que um clock estável pode ajudar o áudio em tempo real:** Se sua GPU leva `8 ms` para processar um bloco de áudio em clock alto e `18 ms` quando reduz temporariamente o clock, esse salto repentino pode causar tempos de processamento irregulares. Manter um clock suportado constante pode deixar os tempos por bloco mais uniformes.
9. **Por que o clock máximo nem sempre é o melhor:** Rodar no MHz suportado mais alto possível aumenta calor, ruído das ventoinhas e consumo de energia. Se a GPU atingir seu limite térmico ou de energia, ela aplicará **throttling** automaticamente (reduzirá a própria velocidade), causando engasgos piores do que um clock moderado e estável.

---

## 2. Como os Clocks de GPU Afetam o Vonovox

O Vonovox processa áudio ao vivo do microfone via **CUDA** na sua GPU NVIDIA. Cada bloco de áudio (determinado por **Block Size**) precisa terminar de ser processado antes que o próximo bloco chegue.

- **GPU Delay e variação do tempo de processamento:** No Vonovox, **GPU Delay** mostra quanto tempo a GPU leva para converter cada bloco. Se os clocks da GPU oscilarem entre ociosidade e boost, o GPU Delay pode dar picos inesperados.
- **Estalos, cliques e engasgos no áudio:** Se apenas um bloco de áudio atrasar porque a GPU ainda estava subindo o clock, o buffer de áudio esvazia e você ouve um clique, estalo ou corte robótico.
- **Buffer Size e Block Size:** Valores maiores de **Block Size** dão mais folga à GPU ao custo de maior latência geral. Valores menores de **Block Size** parecem mais responsivos, mas são bem mais sensíveis a picos repentinos de GPU Delay.
- **WASAPI e WASAPI Exclusive Mode:** **WASAPI** (Windows Audio Session API) gerencia o roteamento de áudio entre seu microfone, o Vonovox e o cabo virtual. **WASAPI Exclusive Mode** (quando suportado pelo dispositivo e app) pode reduzir a sobrecarga do mixer do Windows, enquanto o modo compartilhado oferece compatibilidade mais ampla. Nenhum deles corrige uma GPU atrasada, e o GPU Clock Locking não corrige incompatibilidades de driver de áudio ou taxa de amostragem do Windows.
- **Vonovox + jogos ao mesmo tempo:** Quando você joga um jogo 3D e usa o Vonovox simultaneamente, ambos disputam a mesma GPU. Se o jogo saturar **95-100% da computação da GPU**, o Vonovox entra na fila independentemente do bloqueio de clock. Nesse caso, reduzir gráficos/FPS do jogo ou aumentar o **Block Size** do Vonovox ajuda muito mais do que bloquear clocks.
- **Problemas de GPU vs. CPU ou driver de áudio:** Falhas de áudio também podem vir de sobrecarga de CPU, taxas de amostragem de `48 kHz` desalinhadas, economia de energia USB do microfone ou configuração incorreta do cabo virtual. O GPU Clock Locking atua apenas sobre transições de frequência da GPU.

| Possíveis benefícios (não garantidos) | O que o GPU Clock Locking NÃO garante |
| --- | --- |
| Comportamento mais previsível do clock da GPU durante cargas intermitentes de áudio | Velocidade geral de conversão de voz mais rápida |
| Menos picos repentinos de GPU Delay em alguns desktops/notebooks | Eliminação de todos os estalos, cliques ou falhas |
| Diagnóstico A/B mais fácil ao isolar jitter de latência | Melhor qualidade de voz, timbre ou precisão de tom |

---

## 3. Compatibilidade NVIDIA e Mensagens de Erro

Ter `nvidia-smi` instalado **não** garante que `-lgc` (Lock Graphics Clocks) seja suportado na sua combinação de hardware e driver.

- **GPUs GeForce de desktop:** Muitas placas GeForce de desktop modernas suportam `-lgc` em drivers recentes, embora a granularidade exata e o comportamento dependam da arquitetura e da versão do driver.
- **GPUs NVIDIA de notebook:** Muitos notebooks restringem o bloqueio de clock em firmware/BIOS, gerenciamento de energia ou caminhos híbridos/Optimus. Mesmo quando `-lgc` é aceito, limites térmicos e de energia do notebook frequentemente sobrescrevem o clock solicitado.
- **GPUs Workstation / Datacenter (Quadro, RTX série A, Tesla, L4/T4):** Suportam amplamente controles de clock `nvidia-smi` em drivers padrão corporativos/Studio.
- **Gerações de hardware e drivers antigos:** Arquiteturas antigas (como Maxwell/Pascal ou drivers legados) podem retornar `Not Supported` para `-lgc` ou `SUPPORTED_CLOCKS`. Não presuma que toda placa GTX ou RTX suporta bloqueio de clock.

### Mensagens comuns e o que significam

| Mensagem | Significado | Solução segura |
| --- | --- | --- |
| `Not Supported` | Seu modelo de GPU, firmware do notebook ou driver atual não permite `-lgc` ou consultas `SUPPORTED_CLOCKS`. | Não force. Pule o bloqueio de clock e use as [alternativas](#13-alternativas-quando-o-clock-locking-não-ajuda). |
| `Insufficient Permissions` | O Prompt de Comando foi aberto normalmente em vez de **Executar como administrador**. | Feche o CMD, busque `cmd` no Iniciar, clique com o botão direito em **Prompt de Comando** e escolha **Executar como administrador**. |
| `Invalid Argument` | Os valores em MHz digitados são inválidos, não estão no formato `min,max` ou estão fora dos clocks suportados. | Execute `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` e escolha um valor exato listado em **Graphics**. |
| `NVIDIA-SMI has failed` | O driver NVIDIA não responde, não há GPU NVIDIA ativa ou a placa está dormindo no modo híbrido do notebook. | Verifique se a GPU NVIDIA está ativada no Gerenciador de Dispositivos e não desativada por um modo eco/bateria. |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` não está na variável `PATH` do Windows (comum em algumas instalações). | Execute pelo caminho completo (veja [Seção 4](#4-configuração-para-iniciantes-windows-10-e-windows-11)) sem reinstalar drivers. |

---

## 4. Configuração para Iniciantes: Windows 10 e Windows 11

Siga exatamente estes passos se você nunca usou o Prompt de Comando (`cmd`):

1. **Verifique se você tem uma GPU NVIDIA:** Pressione `Ctrl + Shift + Esc` para abrir o **Gerenciador de Tarefas**, clique em **Desempenho** e procure uma GPU **NVIDIA** na lista à esquerda. (Se aparecer apenas AMD ou Intel, este guia não se aplica ao seu PC.)
2. **Abra o menu Iniciar:** Pressione a **tecla Windows** no teclado (ou clique no ícone Iniciar na barra de tarefas).
3. **Pesquise por `cmd`:** Digite `cmd` (ainda não pressione Enter).
4. **Execute como administrador:** Clique com o botão direito em **Prompt de Comando** nos resultados e clique em **Executar como administrador**. Clique em **Sim** se o Windows pedir permissão.
5. **Entenda o que significa executar um comando:** Abre-se uma janela preta com um cursor piscando. Digitar uma linha de texto e pressionar **Enter** pede ao Windows para executar essa ferramenta e exibir o resultado abaixo.
6. **Copie e cole um comando:** Copie um comando deste guia, clique dentro da janela preta do Prompt de Comando e clique com o **botão direito** (ou `Ctrl + V`) para colar.
7. **Pressione Enter:** Aguarde um instante até a saída aparecer.
8. **Verifique o status básico da GPU:** Execute:
   ```bat
   nvidia-smi
   ```
   Você deverá ver uma tabela mostrando versão do driver, nome da GPU, temperatura, uso de memória e consumo de energia.
9. **Identifique a GPU correta em sistemas multi-GPU:** Se tiver mais de uma GPU NVIDIA, execute:
   ```bat
   nvidia-smi -L
   ```
   Isso exibe uma lista numerada como `GPU 0: NVIDIA GeForce ...` e `GPU 1: ...`. Substitua `0` em `-i 0` pelo número da GPU que o Vonovox usa.

### Se `'nvidia-smi' is not recognized` aparecer

Você **não** precisa reinstalar o driver NVIDIA. O Windows apenas não sabe em qual pasta está o `nvidia-smi.exe`. Tente executá-lo pelas pastas padrão do Windows:

```bat
"C:\Windows\System32\nvidia-smi.exe"
```

Se disser que não foi encontrado, tente a pasta legada da NVIDIA:

```bat
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
```

Qualquer caminho que funcionar, use-o no lugar de `nvidia-smi` (ou deixe os [scripts BAT da Seção 9](#9-gerenciamento-de-clock-de-gpu-em-um-clique-scripts-bat) encontrá-lo automaticamente).

---

## 5. Encontrando os Clocks Suportados da sua GPU

Nunca chute uma frequência. Peça sempre primeiro à sua GPU a lista oficial dela:

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

- **`-i 0`**: Seleciona o índice de GPU `0` (altere `0` se `nvidia-smi -L` mostrou outro índice para a GPU alvo).
- **`-q -d SUPPORTED_CLOCKS`**: Consulta a tabela oficial de velocidades de clock de **Memory** e **Graphics** suportadas pela GPU e driver.

### Como ler a saída

A saída agrupa frequências **Graphics** (núcleo da GPU) suportadas sob frequências **Memory**, semelhante a este formato:

```text
Supported Clocks
    Memory                        : XXXX MHz
        Graphics                  : YYYY MHz
        Graphics                  : ZZZZ MHz
```

- Clocks **Memory** são para VRAM (memória de vídeo). **Não bloqueie clocks de memória** no procedimento padrão do Vonovox.
- Clocks **Graphics** são as frequências do **núcleo da GPU**. São esses os valores usados com `-lgc`.
- **Confirme que seu valor está listado:** Escolha apenas um número que apareça exatamente ao lado de `Graphics :` na sua saída.
- **Se exibir `N/A` ou `Not Supported`:** Sua combinação de GPU/driver não expõe clocks suportados via NVML. Não tente forçar números aleatórios; siga para [Alternativas](#13-alternativas-quando-o-clock-locking-não-ajuda).

> **NÃO insira valores altos arbitrários (como `50000` MHz):** Segundo a documentação da NVIDIA, alguns dispositivos e drivers podem ajustar ou arredondar um clock solicitado para a frequência suportada mais próxima, enquanto solicitações fora da faixa podem falhar com `Invalid Argument` ou ser rejeitadas por completo. Nunca insira números arbitrários confiando em arredondamento do driver. Use sempre um valor `Graphics` exato impresso por `SUPPORTED_CLOCKS`.

---

## 6. Escolhendo uma Frequência Adequada

**Não existe um único "melhor MHz"** para todo modelo de GPU, gabinete ou temperatura ambiente. Siga este processo seguro de escolha:

1. **Observe primeiro os clocks normais da sua GPU:** Abra o Vonovox, inicie a conversão ao vivo e execute `nvidia-smi -i 0 -q -d CLOCK` no CMD para ver quais MHz de Graphics a placa usa naturalmente.
2. **Consulte `SUPPORTED_CLOCKS`:** Escolha um valor na sua lista `Graphics` que fique confortavelmente próximo ou ligeiramente abaixo da sua faixa típica de boost.
3. **Não escolha automaticamente o máximo:** O clock mais alto consome mais energia e gera mais calor. Um clock suportado um pouco menor costuma ficar mais frio e evita throttling.
4. **Monitore temperaturas e consumo:** Fique de olho no `nvidia-smi` durante os testes. Se as temperaturas subirem rápido ou as ventoinhas acelerarem ao máximo, escolha um clock suportado menor.
5. **Verifique throttling térmico ou de energia:** Execute `nvidia-smi -i 0 -q -d PERFORMANCE` sob carga para ver se `SW Thermal Slowdown` ou `HW Thermal Slowdown` ficam `Active`.
6. **Teste 2-3 valores suportados se precisar:** Compare-os usando o [teste A/B](#10-como-testar-se-realmente-ajuda).
7. **Mantenha apenas se ajudar:** Se não houver **GPU Delay** mensuravelmente mais estável nem áudio mais limpo, restaure o padrão.

---

## 7. Aplicando o Bloqueio de Clock de GPU

Para bloquear o clock do núcleo da GPU, use `-lgc min,max`.

> **Apenas exemplo ilustrativo:** Nos comandos abaixo, `1800` MHz é **puramente um valor de demonstração**. Substitua `1800` por uma frequência `Graphics` exata da **sua própria** saída de `SUPPORTED_CLOCKS`.

**Bloquear para um único clock suportado (min e max iguais):**

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

- **`-i 0`**: Índice da GPU alvo `0`.
- **`-lgc`**: Lock Graphics Clocks.
- **`1800,1800`**: Clock gráfico mínimo e máximo em MHz (devem ser separados por vírgula, sem espaços).

**Exemplo com uma faixa (min e max diferentes):**

```bat
nvidia-smi -i 0 -lgc 1500,1800
```

Isso permite que o NVIDIA GPU Boost varie entre duas frequências suportadas (`1500` e `1800` MHz neste exemplo ilustrativo) enquanto impede que a placa caia para clocks profundos de ociosidade entre blocos de áudio.

### Verificar se o bloqueio foi aceito vs. realmente observado

É importante distinguir entre:
- **Frequência solicitada:** O valor em MHz passado para `-lgc`.
- **Faixa configurada (`min,max`):** Os limites aceitos pelo driver (note que alguns drivers/dispositivos podem ajustar para o clock suportado mais próximo).
- **Frequência realmente observada:** O clock real em que sua GPU opera sob carga.

Após executar `-lgc`, o CMD confirma apenas que o driver aceitou a solicitação. A aceitação **não** garante que a GPU permanecerá travada exatamente naquele MHz. Para verificar o **clock ao vivo realmente observado** enquanto o Vonovox converte áudio, execute:

```bat
nvidia-smi -i 0 -q -d CLOCK
```

Ou acompanhe a atualização a cada segundo (`Ctrl + C` para parar):

```bat
nvidia-smi -i 0 -q -d CLOCK -l 1
```

Observe **Clocks → Graphics** na saída. **Limites térmicos, limites de energia e restrições de driver ou firmware do notebook** ainda podem impedir a GPU de manter o MHz exato solicitado, e `-lgc` nem sempre mantém frequência perfeitamente fixa em todas as condições.

---

## 8. Restaurando as Configurações Padrão

Restaure sempre o gerenciamento dinâmico de clocks quando terminar de testar, ao fechar o Vonovox ou se não notar benefício (substitua `0` pelo índice de GPU configurado se tiver várias GPUs):

```bat
nvidia-smi -i 0 -rgc
```

- **O que faz:** `-rgc` (**Reset Graphics Clocks**) remove o bloqueio de clock e devolve o controle ao NVIDIA GPU Boost.
- **Por que restaurar o padrão:** Clocks dinâmicos mantêm sua GPU mais fria, silenciosa e eficiente no uso normal da área de trabalho, reprodução de vídeo e jogos.
- **Como verificar a restauração:** Execute `nvidia-smi -i 0 -q -d CLOCK` ocioso na área de trabalho; após alguns segundos, o clock **Graphics** deve cair de volta para velocidades baixas de ociosidade.
- **Reinicializações e resets de driver:** `nvidia-smi -lgc` **não é permanente**. Reiniciar o Windows ou reiniciar o driver de vídeo normalmente restaura os clocks padrão automaticamente.
- **Se `-rgc` retornar erro:** Não é garantido que `-rgc` funcione se o próprio driver NVIDIA estiver em estado de erro. Certifique-se de que o CMD está rodando **como administrador**, confirme se o índice `-i` corresponde a `nvidia-smi -L` ou **reinicie o Windows** para restaurar clocks dinâmicos.

---

## 9. Gerenciamento de Clock de GPU em Um Clique (Scripts BAT)

Estes dois scripts `.bat` do Windows usam o Windows PowerShell integrado (nenhum software externo é necessário) para automatizar o fluxo seguro acima:

- **O que os scripts fazem:** `Lock-GPU-Clocks.bat` bloqueia temporariamente **apenas** o clock **Graphics** do núcleo da sua GPU NVIDIA até que você o restaure ou reinicie. `Reset-GPU-Clocks.bat` remove esse bloqueio e devolve o controle ao NVIDIA GPU Boost.
- **Sem alterações arriscadas:** Nenhum script faz overclock, altera tensões, modifica limites de energia, desativa proteções do Windows ou faz alterações permanentes no sistema.
- **Validação estrita de entrada e frequência:** `Lock-GPU-Clocks.bat` verifica privilégios de administrador independentemente do serviço `Server` do Windows, confirma que o índice de GPU escolhido existe em `nvidia-smi -L`, lê **apenas** clocks `Graphics` de `SUPPORTED_CLOCKS` (ignorando clocks `Memory`), rejeita números arbitrários ou não verificados (como `50000`) e **nunca** seleciona automaticamente o clock máximo.
- **Tratamento seguro de erros:** Se `-lgc` falhar, o script **não** executa `-rgc` automaticamente, exibe o código de saída da NVIDIA e orienta como inspecionar seus clocks atuais antes de prosseguir. Também usa telemetria estruturada `nvidia-smi --query-gpu=clocks.gr` para distinguir aceitação do driver do clock realmente observado.

### Lock-GPU-Clocks.bat

<details>
<summary><strong>Clique para expandir e revelar o código completo de Lock-GPU-Clocks.bat</strong></summary>

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Lock NVIDIA GPU Clocks
set "BAT_PATH=%~f0"
powershell.exe -NoProfile -Command "$code = (Get-Content -LiteralPath $env:BAT_PATH | Where-Object { $_ -match '^::PS ' } | ForEach-Object { $_.Substring(5) }) -join [Environment]::NewLine; & ([ScriptBlock]::Create($code)); exit $LASTEXITCODE"
set "EXIT_CODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXIT_CODE%

::PS Write-Host '============================================================'
::PS Write-Host '  Vonovox Optional Helper: Lock NVIDIA GPU Core Clocks'
::PS Write-Host '  No overclocking, no voltage changes, temporary until reboot'
::PS Write-Host '============================================================'
::PS Write-Host ''
::PS
::PS $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
::PS if (-not $isAdmin) {
::PS     Write-Host '[ERROR] Administrator privileges are required.'
::PS     Write-Host 'How to fix: Right-click Lock-GPU-Clocks.bat and choose "Run as administrator".'
::PS     exit 1
::PS }
::PS
::PS $nvsmi = $null
::PS $cmd = Get-Command nvidia-smi -ErrorAction SilentlyContinue
::PS if ($cmd) { $nvsmi = $cmd.Source }
::PS elseif (Test-Path -LiteralPath 'C:\Windows\System32\nvidia-smi.exe') { $nvsmi = 'C:\Windows\System32\nvidia-smi.exe' }
::PS elseif (Test-Path -LiteralPath 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe') { $nvsmi = 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe' }
::PS if (-not $nvsmi) {
::PS     Write-Host '[ERROR] nvidia-smi.exe was not found on this system.'
::PS     Write-Host 'Make sure you have an NVIDIA GPU with official drivers installed.'
::PS     exit 1
::PS }
::PS
::PS $gpuList = & $nvsmi -L 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host '[ERROR] Could not query NVIDIA GPUs:'
::PS     $gpuList | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $validGpus = [System.Collections.Generic.HashSet[string]]::new()
::PS Write-Host 'Detected NVIDIA GPUs:'
::PS foreach ($line in $gpuList) {
::PS     Write-Host "  $line"
::PS     if ($line -match '^GPU\s+(\d+)\s*:') { [void]$validGpus.Add($Matches[1]) }
::PS }
::PS if ($validGpus.Count -eq 0) {
::PS     Write-Host '[ERROR] No valid NVIDIA GPU indices were detected. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS $defaultGpu = if ($validGpus.Contains('0') -and $validGpus.Count -eq 1) { '0' } else { $null }
::PS $gpuPrompt = if ($defaultGpu) { 'Enter GPU index to configure [default: 0]' } else { 'Enter GPU index to configure (e.g. 0)' }
::PS $gpuId = (Read-Host $gpuPrompt).Trim()
::PS if ([string]::IsNullOrWhiteSpace($gpuId) -and $defaultGpu) { $gpuId = $defaultGpu }
::PS if (($gpuId -notmatch '^\d+$') -or (-not $validGpus.Contains($gpuId))) {
::PS     Write-Host '[ERROR] Invalid or non-existent GPU index. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Querying official supported Graphics clocks for GPU $gpuId..."
::PS $supOut = & $nvsmi -i $gpuId -q -d SUPPORTED_CLOCKS 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[STOPPED] Supported Graphics clocks could not be verified on this GPU (exit code $LASTEXITCODE). This does not necessarily mean GPU Clock Locking is unsupported. No changes were made."
::PS     $supOut | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $graphicsClocks = New-Object 'System.Collections.Generic.SortedSet[int]'
::PS foreach ($line in $supOut) {
::PS     if ($line -match '^\s*Graphics\s*:\s*(\d+)\s*MHz\s*$') {
::PS         [void]$graphicsClocks.Add([int]$Matches[1])
::PS     }
::PS }
::PS if ($graphicsClocks.Count -eq 0) {
::PS     Write-Host '[STOPPED] Supported Graphics clocks could not be verified on this GPU. This does not necessarily mean GPU Clock Locking is unsupported. No changes were made.'
::PS     Write-Host 'Possible reasons: driver does not expose the clock table, unrecognized output format, query unsupported, or GPU-specific limitations.'
::PS     exit 1
::PS }
::PS
::PS Write-Host '------------------------------------------------------------'
::PS Write-Host "Verified supported Graphics clocks (MHz) for GPU ${gpuId}:"
::PS Write-Host ('  ' + ($graphicsClocks -join ', '))
::PS Write-Host '------------------------------------------------------------'
::PS Write-Host 'IMPORTANT:'
::PS Write-Host ' - Enter ONLY one exact number from the Graphics list above.'
::PS Write-Host ' - Do NOT pick the highest value blindly; test moderate clocks first.'
::PS Write-Host ' - Arbitrary values (like 50000) will be rejected.'
::PS Write-Host ''
::PS
::PS $targetRaw = (Read-Host 'Enter a supported Graphics clock in MHz (or press Enter to cancel)').Trim()
::PS if ([string]::IsNullOrWhiteSpace($targetRaw)) {
::PS     Write-Host 'Cancelled. No changes were made.'
::PS     exit 0
::PS }
::PS
::PS [int]$targetMhz = 0
::PS if (($targetRaw -notmatch '^\d+$') -or (-not [int]::TryParse($targetRaw, [ref]$targetMhz)) -or ($targetMhz -le 0) -or (-not $graphicsClocks.Contains($targetMhz))) {
::PS     Write-Host '[ERROR] Invalid or unsupported Graphics clock value. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Applying temporary Graphics clock lock ($targetMhz,$targetMhz MHz) to GPU $gpuId..."
::PS $lgcOut = & $nvsmi -i $gpuId -lgc "$targetMhz,$targetMhz" 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[ERROR] nvidia-smi -lgc failed for GPU $gpuId (exit code $LASTEXITCODE):"
::PS     $lgcOut | ForEach-Object { Write-Host $_ }
::PS     Write-Host 'No automatic reset was performed. Check your current GPU clock configuration before proceeding.'
::PS     Write-Host "Check current clock: nvidia-smi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits"
::PS     Write-Host "Manual reset command: nvidia-smi -i $gpuId -rgc"
::PS     exit 1
::PS }
::PS
::PS Write-Host "[ACCEPTED] Driver accepted -lgc $targetMhz,$targetMhz on GPU $gpuId."
::PS $obsOut = (& $nvsmi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits 2>&1 | Out-String).Trim()
::PS [int]$obsMhz = 0
::PS if (($LASTEXITCODE -eq 0) -and ($obsOut -match '^\d+$') -and ([int]::TryParse($obsOut, [ref]$obsMhz)) -and ($obsMhz -gt 0)) {
::PS     Write-Host "Actually observed Graphics clock right now: $obsMhz MHz"
::PS } else {
::PS     Write-Host "[INFO] Command was accepted, but live clock telemetry could not be verified (returned: '$obsOut')."
::PS }
::PS Write-Host 'Note: Thermal, power, or firmware limits can still affect live clocks under load.'
::PS Write-Host "When finished, run Reset-GPU-Clocks.bat or: nvidia-smi -i $gpuId -rgc"
::PS exit 0
```

</details>

### Reset-GPU-Clocks.bat

<details>
<summary><strong>Clique para expandir e revelar o código completo de Reset-GPU-Clocks.bat</strong></summary>

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Reset NVIDIA GPU Clocks
set "BAT_PATH=%~f0"
powershell.exe -NoProfile -Command "$code = (Get-Content -LiteralPath $env:BAT_PATH | Where-Object { $_ -match '^::PS ' } | ForEach-Object { $_.Substring(5) }) -join [Environment]::NewLine; & ([ScriptBlock]::Create($code)); exit $LASTEXITCODE"
set "EXIT_CODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXIT_CODE%

::PS Write-Host '============================================================'
::PS Write-Host '  Vonovox Optional Helper: Reset NVIDIA GPU Clocks to Default'
::PS Write-Host '============================================================'
::PS Write-Host ''
::PS
::PS $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
::PS if (-not $isAdmin) {
::PS     Write-Host '[ERROR] Administrator privileges are required.'
::PS     Write-Host 'How to fix: Right-click Reset-GPU-Clocks.bat and choose "Run as administrator".'
::PS     exit 1
::PS }
::PS
::PS $nvsmi = $null
::PS $cmd = Get-Command nvidia-smi -ErrorAction SilentlyContinue
::PS if ($cmd) { $nvsmi = $cmd.Source }
::PS elseif (Test-Path -LiteralPath 'C:\Windows\System32\nvidia-smi.exe') { $nvsmi = 'C:\Windows\System32\nvidia-smi.exe' }
::PS elseif (Test-Path -LiteralPath 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe') { $nvsmi = 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe' }
::PS if (-not $nvsmi) {
::PS     Write-Host '[ERROR] nvidia-smi.exe was not found on this system.'
::PS     exit 1
::PS }
::PS
::PS $gpuList = & $nvsmi -L 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host '[ERROR] Could not query NVIDIA GPUs:'
::PS     $gpuList | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $validGpus = [System.Collections.Generic.HashSet[string]]::new()
::PS Write-Host 'Detected NVIDIA GPUs:'
::PS foreach ($line in $gpuList) {
::PS     Write-Host "  $line"
::PS     if ($line -match '^GPU\s+(\d+)\s*:') { [void]$validGpus.Add($Matches[1]) }
::PS }
::PS if ($validGpus.Count -eq 0) {
::PS     Write-Host '[ERROR] No valid NVIDIA GPU indices were detected.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS $defaultGpu = if ($validGpus.Contains('0') -and $validGpus.Count -eq 1) { '0' } else { $null }
::PS $gpuPrompt = if ($defaultGpu) { 'Enter GPU index to reset [default: 0]' } else { 'Enter GPU index to reset (e.g. 0)' }
::PS $gpuId = (Read-Host $gpuPrompt).Trim()
::PS if ([string]::IsNullOrWhiteSpace($gpuId) -and $defaultGpu) { $gpuId = $defaultGpu }
::PS if (($gpuId -notmatch '^\d+$') -or (-not $validGpus.Contains($gpuId))) {
::PS     Write-Host '[ERROR] Invalid or non-existent GPU index. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Restoring dynamic GPU clocks on GPU $gpuId..."
::PS $rgcOut = & $nvsmi -i $gpuId -rgc 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[ERROR] nvidia-smi -rgc failed for GPU $gpuId (exit code $LASTEXITCODE):"
::PS     $rgcOut | ForEach-Object { Write-Host $_ }
::PS     Write-Host 'If the driver is unresponsive, reboot Windows to restore default dynamic clocks.'
::PS     exit 1
::PS }
::PS
::PS Write-Host "[DONE] Reset command accepted for GPU $gpuId."
::PS $obsOut = (& $nvsmi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits 2>&1 | Out-String).Trim()
::PS [int]$obsMhz = 0
::PS if (($LASTEXITCODE -eq 0) -and ($obsOut -match '^\d+$') -and ([int]::TryParse($obsOut, [ref]$obsMhz)) -and ($obsMhz -gt 0)) {
::PS     Write-Host "Actually observed Graphics clock right now: $obsMhz MHz"
::PS } else {
::PS     Write-Host "[INFO] Reset was accepted, but live clock telemetry could not be verified (returned: '$obsOut')."
::PS }
::PS Write-Host 'Dynamic clock management is active; clocks should drop to idle when unloaded.'
::PS exit 0
```

</details>

### Como criar e executar os arquivos `.bat` com segurança

1. Abra o **Bloco de Notas** (procure `notepad` no menu Iniciar).
2. Copie um dos scripts completos acima e cole no Bloco de Notas.
3. Clique em **Arquivo → Salvar como...**.
4. Embaixo, mude **Tipo** de `Documentos de texto (*.txt)` para **Todos os arquivos (`*.*`)**.
5. Nomeie o arquivo como `Lock-GPU-Clocks.bat` (ou `Reset-GPU-Clocks.bat`) e salve em uma pasta fácil de achar, como a Área de Trabalho. *(Alterar **Tipo** para **Todos os arquivos** evita que o Windows salve acidentalmente como `Lock-GPU-Clocks.bat.txt`.)*
6. Clique com o botão direito no arquivo `.bat` salvo e selecione **Executar como administrador**.
7. Leia a saída com atenção:
   - `[ACCEPTED]` / `[DONE]` significa que o `nvidia-smi` aceitou o comando e mostra o clock Graphics **observado** logo em seguida.
   - `[ERROR]` ou `[STOPPED]` explica o que falhou e confirma que nenhum clock não verificado foi aplicado. Se sua GPU mostrar `Not Supported` ou não puder ser analisada, pule esta otimização.

---

## 10. Como Testar se Realmente Ajuda

Não presuma que bloquear o clock ajudou apenas por ver um número em MHz mais alto. Frequência maior **não** significa automaticamente melhor desempenho de áudio. Faça uma **comparação A/B** estruturada no seu próprio PC:

- **Verificação preliminar (opcional, 3-5 minutos):** Checagem rápida para ver se o clock travado roda frio e não provoca falhas de áudio.
- **Benchmark A/B completo (recomendado, pelo menos 10-15 minutos por etapa):**
  1. **Restaure os clocks padrão** (`nvidia-smi -i 0 -rgc`, substituindo `0` pelo índice da sua GPU).
  2. **Inicie o Vonovox** e deixe o sistema e a carga em segundo plano estabilizarem por um minuto.
  3. **Execute o Teste A (Clocks Padrão da GPU)** por pelo menos **10-15 minutos** e registre todas as métricas abaixo.
  4. **Aplique um clock Graphics verificado e suportado** (`Lock-GPU-Clocks.bat` ou `-lgc`).
  5. **Execute o Teste B (Clocks Bloqueados da GPU)** por pelo menos **10-15 minutos** exatamente nas mesmas condições.
  6. **Compare Teste A vs. Teste B** usando a tabela abaixo.
  7. **Repita o teste** se os resultados forem próximos ou inconclusivos.
  8. **Restaure os clocks padrão** (`-rgc`) ao terminar ou sempre que não houver benefício claro.

**Mantenha tudo isto idêntico entre Teste A e Teste B:**

- Modelo de voz RVC
- F0 Method
- Block Size
- Dispositivos de áudio de entrada, saída e monitoramento
- Backend de áudio (ex.: WASAPI compartilhado / exclusivo)
- Cargas concorrentes de GPU (mesmo jogo aberto ou mesma área de trabalho ociosa) e condições de operação

### Tabela comparativa preenchível

| Métrica para registrar | Teste A: Clocks Padrão (10-15 min) | Teste B: Clocks Bloqueados (10-15 min) |
| --- | --- | --- |
| **GPU Delay** médio (ms) | `____ ms` | `____ ms` |
| Picos de **GPU Delay** (maior visto) | `____ ms` | `____ ms` |
| Variabilidade do tempo de processamento (estável vs. instável) | `____________` | `____________` |
| Estalos / cortes de áudio | `Sim / Não (contagem)` | `Sim / Não (contagem)` |
| Temperatura da GPU (°C) | `____ °C` | `____ °C` |
| Consumo de energia da GPU (W) | `____ W` | `____ W` |
| Clock Graphics realmente observado (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Status de throttling (`-q -d PERFORMANCE`) | `Nenhum / Térmico / Energia` | `Nenhum / Térmico / Energia` |

### Interpretando seus resultados

- **Mantenha** apenas se o Teste B mostrar **GPU Delay** mensuravelmente mais estável e menos falhas de áudio *sem* superaquecimento ou throttling.
- **Restaure o padrão (`nvidia-smi -i 0 -rgc`)** se o Teste B parecer idêntico, esquentar mais sem ganho real de áudio ou tiver desempenho pior.

---

## 11. Riscos, Limitações e Precauções

Bloquear dentro dos clocks suportados pela NVIDIA **não** é overclocking, mas ainda envolve compromissos:

- **Temperaturas e ruído de ventoinhas maiores:** Manter clocks mais altos em ociosidade ou carga leve gera calor extra e faz as ventoinhas girarem mais rápido.
- **Maior consumo de energia e menor bateria em notebooks:** Um clock gráfico travado pode limitar ou reduzir a frequência com que a GPU entra em estados ociosos de baixo consumo, elevando o gasto em ociosidade e descarregando a bateria mais rápido.
- **Throttling térmico ou de energia:** Se um clock travado exigir demais do resfriamento ou orçamento de energia, a GPU reduzirá o clock por conta própria, às vezes causando engasgos piores.
- **Compatibilidade limitada e conflitos com ferramentas de terceiros:** Programas como MSI Afterburner, Armoury Crate ou centrais de controle OEM de notebooks podem sobrescrever ou conflitar com configurações do `nvidia-smi`.
- **Não modifique BIOS, tensões nem proteções térmicas:** Nunca faça flash de VBIOS customizada, não desative limites térmicos nem force overvolting para conversão de voz.

---

## 12. Nota Avançada: Bloqueio de Clock de Memória GPU (`-lmc`)

O `nvidia-smi` também fornece comandos de clock de memória:

```bat
nvidia-smi -i 0 -lmc <min,max>
nvidia-smi -i 0 -rmc
```

`-lmc` trava a **frequência da VRAM (memória)**, enquanto `-lgc` trava a **frequência do núcleo GPU (gráficos)**. O bloqueio de clock de memória **não** faz parte do fluxo padrão do Vonovox porque não há evidências suficientes de que travar clocks de VRAM melhore o desempenho de áudio RVC ao vivo, e manter a VRAM em clocks altos continuamente aumenta calor e consumo em ociosidade.

---

## 13. Alternativas Quando o Clock Locking Não Ajuda

Se `-lgc` retornar `Not Supported` ou não melhorar seu áudio, tente estes passos mais seguros e muitas vezes mais eficazes:

1. **Painel de Controle da NVIDIA → Modo de gerenciamento de energia:** Defina **Modo de gerenciamento de energia** como **Preferência por desempenho máximo** para o executável do Vonovox (`Gerenciar as configurações em 3D → Configurações do programa`). Nota: isso **não** é o mesmo que `-lgc` e não garante clocks fixos em todas as cargas CUDA, mas pode reduzir quedas agressivas de clock em alguns sistemas.
2. **Verifique se o Vonovox usa sua GPU NVIDIA:** Em notebooks com gráficos híbridos, garanta que o Vonovox rode na GPU NVIDIA em vez da placa integrada.
3. **Ajuste o Block Size no Vonovox:** Aumentar o **Block Size** em um passo é a forma mais confiável de eliminar estalos quando a GPU está ocupada.
4. **Alinhe formatos de áudio `48 kHz` e WASAPI:** Siga [Rotear e ajustar Vonovox](live-audio.md) para alinhar taxas de amostragem e evitar monitoramento duplicado.
5. **Reduza cargas concorrentes de GPU:** Limite FPS dentro dos jogos ou reduza ajustes pesados de GPU ao rodar o Vonovox junto com jogos.
6. **Verifique drivers e refrigeração:** Atualize para um driver Studio/Game Ready limpo e limpe poeira das saídas de ar do notebook/PC se ocorrer throttling térmico.

---

## 14. Solução de Problemas

| Sintoma | Causa possível | Solução recomendada |
| --- | --- | --- |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` não está no `PATH`. | Execute `"C:\Windows\System32\nvidia-smi.exe"` ou `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"`, ou use os scripts `.bat` acima. |
| NVIDIA não detecta GPU / `NVIDIA-SMI has failed` | Nenhuma GPU NVIDIA presente, GPU desativada ou GPU híbrida de notebook dormindo. | Verifique **Gerenciador de Tarefas → Desempenho**, ative o adaptador NVIDIA no Gerenciador de Dispositivos e conecte o carregador do notebook. |
| `Insufficient Permissions` | CMD não foi aberto como Administrador. | Clique com o botão direito em **Prompt de Comando** (ou no arquivo `.bat`) e selecione **Executar como administrador**. |
| `Not Supported` ao executar `-lgc` | Arquitetura da GPU, firmware do notebook ou driver não permite bloqueio de clock. | Deixe os clocks no padrão e use as [Alternativas](#13-alternativas-quando-o-clock-locking-não-ajuda). |
| `Invalid Argument` | Erro de sintaxe ou frequência fora dos clocks suportados. | Execute `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` e insira um valor `Graphics` exato no formato `min,max`. |
| Clock exibido não corresponde ao MHz pedido | Limite de energia, limite térmico ou restrição do driver limita a GPU. | Teste um clock suportado ligeiramente menor ou verifique `nvidia-smi -i 0 -q -d PERFORMANCE`. |
| Clock cai sob carga | Throttling térmico ou limite de energia do notebook atingido. | Abaixe o clock travado, melhore a refrigeração ou restaure o padrão com `-rgc`. |
| Temperaturas sobem demais | Clock alto travado continuamente sem refrigeração adequada. | Execute `nvidia-smi -i 0 -rgc` imediatamente e use um clock menor ou padrão dinâmico. |
| Vonovox não mostra melhora | Gargalo está em Block Size, CPU, WASAPI ou saturação geral da GPU, não na variação de clock. | Execute `nvidia-smi -i 0 -rgc` e ajuste **Block Size** e roteamento de áudio em [Rotear e ajustar Vonovox](live-audio.md). |
| Vonovox piora após bloquear | Clock travado é baixo demais para a carga ou alto demais (causando throttling térmico). | Execute `nvidia-smi -i 0 -rgc` para restaurar clocks dinâmicos, depois teste outro valor suportado ou fique no padrão. |
| GPU se comporta diferente com jogo aberto | O jogo consome maior parte do orçamento de computação/energia da GPU. | Limite FPS do jogo, reduza opções pesadas de GPU ou aumente **Block Size** no Vonovox. |
| Comando de restauração (`-rgc`) falha | Faltam permissões de administrador, índice `-i` errado ou falha no driver. | Execute CMD como administrador com o índice `-i` correto ou reinicie o Windows. |
| Dúvida sobre qual MHz escolher | Ainda não verificou os clocks base sob carga. | Execute `nvidia-smi -i 0 -q -d CLOCK` usando o Vonovox normalmente, depois escolha um valor suportado próximo dessa faixa. |
| Notebook limita clocks automaticamente | Perfil de energia OEM / bateria / limite de firmware do notebook. | Conecte o carregador, use modo OEM Equilibrado/Desempenho ou ajuste **Block Size** em vez de `-lgc`. |

---

## 15. Perguntas Frequentes (FAQ)

1. **O GPU Clock Locking é seguro?**
   Sim, quando você usa apenas frequências oficiais de `SUPPORTED_CLOCKS` e monitora temperaturas. Ele não altera tensões nem contorna proteções térmicas de hardware.
2. **Isso é overclocking?**
   Não. Overclocking força o hardware além dos limites de fábrica. O bloqueio de clock apenas seleciona frequências já definidas pela NVIDIA na tabela suportada da sua placa.
3. **Isso aumentará meus FPS em jogos?**
   Geralmente não, e não serve para isso. Se um clock travado for menor que seu clock boost normal, os FPS nos jogos podem até cair um pouco.
4. **Isso melhorará a qualidade de voz do Vonovox?**
   Não. A qualidade da voz depende do modelo, microfone, extrator de pitch/F0 e roteamento de áudio, não do bloqueio de clock da GPU.
5. **Isso reduzirá a latência?**
   Não reduz a latência mínima abaixo do que sua GPU já consegue calcular, embora possa diminuir **picos repentinos de latência** causados por variação de clock em alguns setups.
6. **Funciona em notebooks?**
   Às vezes, mas muitos notebooks restringem `-lgc` no firmware ou atingem limites térmicos/de energia rápido. Mantenha sempre o notebook ligado na tomada ao testar.
7. **Funciona em toda GPU NVIDIA?**
   Não. O suporte depende da geração da GPU, firmware da placa/notebook e versão do driver.
8. **Devo sempre escolher o clock máximo?**
   Não. Clocks máximos geram máximo calor e ruído e podem causar thermal throttling. Clocks suportados moderados costumam ser mais estáveis.
9. **Posso usar `50000` MHz?**
   Não. Nunca digite números arbitrários. Valores fora da faixa podem falhar com `Invalid Argument` e não têm garantia de ajuste seguro.
10. **Funciona com GPUs RTX?**
    Muitas placas RTX de desktop suportam `-lgc` em drivers modernos, enquanto alguns notebooks ou configurações específicas podem retornar `Not Supported`. Teste primeiro com `SUPPORTED_CLOCKS`.
11. **Preciso aplicar toda vez?**
    Sim, se decidir continuar usando, porque bloqueios de clock do `nvidia-smi` reiniciam ao reiniciar o PC ou o driver.
12. **As configurações sobrevivem a uma reinicialização?**
    Não. Reiniciar o Windows limpa automaticamente `-lgc` e devolve sua GPU aos clocks dinâmicos normais.
13. **Posso usar o Vonovox enquanto jogo?**
    Sim, desde que sua GPU tenha folga suficiente para ambos. Se o jogo atingir 95-100% de carga de GPU, limite os FPS ou aumente o **Block Size** no Vonovox.
14. **O que acontece se minha GPU superaquecer?**
    A proteção térmica por hardware da NVIDIA reduzirá automaticamente a velocidade da placa (ou desligará em casos extremos). Se as temperaturas subirem demais, execute `nvidia-smi -i 0 -rgc` imediatamente.
15. **Como restauro tudo ao normal?**
    Execute `nvidia-smi -i 0 -rgc` como Administrador, execute `Reset-GPU-Clocks.bat` ou reinicie o Windows.
16. **Devo travar também o clock da VRAM (`-lmc`)?**
    Não. Não há evidências sólidas de que travar clocks de memória ajude o Vonovox, e isso aumenta calor e consumo em ociosidade.
17. **O que devo fazer se vir `Not Supported`?**
    Pule o GPU Clock Locking por completo e use as [Alternativas](#13-alternativas-quando-o-clock-locking-não-ajuda) mais seguras, como ajuste de **Block Size** e configurações de energia do Painel de Controle da NVIDIA.

---

## 16. Referências Oficiais

- [Documentação NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [Referência da API NVIDIA NVML: Comandos de Dispositivo](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [Boas Práticas de Benchmarking e Clock Locking da NVIDIA TensorRT](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Repositório do Projeto Vonovox](https://github.com/dr87/Vonovox)
