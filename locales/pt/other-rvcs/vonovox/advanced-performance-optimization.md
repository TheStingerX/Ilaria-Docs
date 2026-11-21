---
label: "Otimização avançada de desempenho"
icon: ":zap:"
order: 97
permalink: /ilaria-rvc/vonovox/advanced-performance-optimization/
description: "Guia opcional de NVIDIA GPU Clock Locking para testar se fixar as frequências gráficas suportadas melhora a estabilidade da latência no Vonovox."
---
# Otimização avançada de desempenho: NVIDIA GPU Clock Locking

> **Otimização opcional:** Este guia é **100% opcional** e **nunca é obrigatório** para instalar ou usar o Vonovox. Conclui primeiro [Instalar Vonovox](installation.md) e [Configurar e ajustar Vonovox](live-audio.md).

**Princípio central:** O GPU Clock Locking é uma otimização avançada opcional que pode melhorar a estabilidade do processamento em tempo real do Vonovox em GPUs NVIDIA compatíveis. Usa sempre frequências suportadas, testa os resultados no teu próprio hardware e repõe os valores predefinidos se não houver benefício mensurável.

> **Reposição rápida (a qualquer momento):** Abre a Linha de Comandos como administrador e executa `nvidia-smi -i 0 -rgc` (substitui `0` pelo índice da tua GPU se tiveres várias), ou reinicia o Windows.

## Índice

- [Caminho rápido para utilizadores avançados](#caminho-rápido-para-utilizadores-avançados)
- [1. O que é o GPU Clock Locking](#1-o-que-é-o-gpu-clock-locking)
- [2. Como os clocks da GPU afetam o Vonovox](#2-como-os-clocks-da-gpu-afetam-o-vonovox)
- [3. Compatibilidade NVIDIA e mensagens de erro](#3-compatibilidade-nvidia-e-mensagens-de-erro)
- [4. Preparação para iniciantes: Windows 10 e Windows 11](#4-preparação-para-iniciantes-windows-10-e-windows-11)
- [5. Encontrar as frequências suportadas](#5-encontrar-as-frequências-suportadas)
- [6. Escolher uma frequência adequada](#6-escolher-uma-frequência-adequada)
- [7. Aplicar o GPU Clock Lock](#7-aplicar-o-gpu-clock-lock)
- [8. Repor as definições originais](#8-repor-as-definições-originais)
- [9. Gestão com um clique (ficheiros BAT)](#9-gestão-com-um-clique-ficheiros-bat)
- [10. Como testar se realmente ajuda (Teste A/B)](#10-como-testar-se-realmente-ajuda-teste-ab)
- [11. Riscos, limitações e precauções](#11-riscos-limitações-e-precauções)
- [12. Nota avançada: bloqueio de memória GPU (-lmc)](#12-nota-avançada-bloqueio-de-memória-gpu--lmc)
- [13. Alternativas](#13-alternativas)
- [14. Resolução de problemas](#14-resolução-de-problemas)
- [15. Perguntas frequentes (FAQ)](#15-perguntas-frequentes-faq)
- [16. Referências oficiais](#16-referências-oficiais)

---

## Caminho rápido para utilizadores avançados

1. Listar GPUs: `nvidia-smi -L`
2. Consultar frequências suportadas: `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS`
3. Fixar uma frequência **Graphics** verificada (`1800` é apenas um exemplo): `nvidia-smi -i 0 -lgc 1800,1800`
4. Verificar em tempo real: `nvidia-smi -i 0 -q -d CLOCK`
5. Repor ao terminar: `nvidia-smi -i 0 -rgc`

---

## 1. O que é o GPU Clock Locking

- A **frequência da GPU** (em **MHz**, milhões de ciclos por segundo) indica quantos ciclos de cálculo o núcleo gráfico executa por segundo.
- O **NVIDIA GPU Boost** ajusta os clocks dinamicamente entre repouso (`210-300 MHz`) e carga máxima consoante temperatura, energia e carga.
- No Vonovox, o áudio é processado em blocos discretos (cuja duração depende do **Block Size** e das definições de áudio); entre blocos, a GPU pode baixar o clock e ter de subir novamente, gerando picos de latência.
- O **GPU Clock Locking** (`-lgc`) funciona como um **cruise control**, mantendo o núcleo numa faixa suportada pela NVIDIA. **Não é overclocking**: não altera voltagens nem ultrapassa limites de fábrica. O valor máximo nem sempre é o melhor devido ao calor e thermal throttling.

---

## 2. Como os clocks da GPU afetam o Vonovox

- Pode tornar o **GPU Delay** mais previsível em alguns sistemas, mas **não garante** conversão mais rápida, eliminação total de estalidos ou melhor qualidade de voz.
- Ao jogar em simultâneo (GPU a 95-100%), limitar os FPS do jogo ou aumentar o **Block Size** ajuda muito mais. Problemas de **WASAPI** ou taxa `48 kHz` não se resolvem bloqueando clocks.

---

## 3. Compatibilidade NVIDIA e mensagens de erro

Ter `nvidia-smi` instalado não garante suporte a `--lgc` (muitos portáteis, drivers antigos ou certas arquiteturas bloqueiam-no).

| Mensagem | Significado | Solução |
| --- | --- | --- |
| `Not Supported` | GPU, BIOS do portátil ou driver não permite `--lgc`. | Deixa dinâmico e usa as [Alternativas](#13-alternativas). |
| `Insufficient Permissions` | CMD não aberto como administrador. | Botão direito → **Executar como administrador**. |
| `Invalid Argument` | Sintaxe ou MHz fora de `SUPPORTED_CLOCKS`. | Copia um valor exato de `Graphics :` no formato `min,max`. |
| `NVIDIA-SMI has failed` | Driver sem resposta ou GPU adormecida. | Verifica Gestor de Dispositivos e liga o carregador. |
| `nvidia-smi` não reconhecido | Ausente do `PATH`. | Usa o caminho completo em `System32` ou `NVSMI`. |

---

## 4. Preparação para iniciantes: Windows 10 e Windows 11

1. Confirma a GPU NVIDIA em **Gestor de Tarefas → Desempenho**.
2. Menu Iniciar → escreve `cmd` → botão direito em **Linha de Comandos** → **Executar como administrador**.
3. Cola com botão direito (ou `Ctrl + V`) e prime **Enter**.
4. Executa `nvidia-smi` e `nvidia-smi -L`. Se não for encontrado, usa `"C:\Windows\System32\nvidia-smi.exe"` ou `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"` sem reinstalar drivers.

---

## 5. Encontrar as frequências suportadas

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

Usa apenas valores listados em **`Graphics :`** (não **`Memory`**). Segundo a documentação da NVIDIA, alguns dispositivos/drivers podem arredondar a frequência pedida para a mais próxima suportada, enquanto valores fora do intervalo podem falhar (`Invalid Argument`). **Nunca** introduzas valores arbitrários como `50000` MHz.

---

## 6. Escolher uma frequência adequada

Observa primeiro os clocks normais com `nvidia-smi -i 0 -q -d CLOCK`, escolhe um valor `Graphics` moderado, vigia temperatura e throttling (`-q -d PERFORMANCE`) e mantém o bloqueio apenas se houver benefício real.

---

## 7. Aplicar o GPU Clock Lock

*(Valor meramente ilustrativo, substitui `1800` por um valor do teu `SUPPORTED_CLOCKS`:)*

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

Exemplo com intervalo: `nvidia-smi -i 0 -lgc 1500,1800`. Distingue a frequência pedida da frequência **realmente observada** com `nvidia-smi -i 0 -q -d CLOCK` (ou `-l 1`). A aceitação de `--lgc` não garante um clock perfeitamente fixo: limites térmicos, energéticos ou de firmware podem limitá-lo.

---

## 8. Repor as definições originais

```bat
nvidia-smi -i 0 -rgc
```

Executa sempre ao terminar os testes; reiniciar o Windows também repõe os clocks dinâmicos.

---

## 9. Gestão com um clique (ficheiros BAT)

### Lock-GPU-Clocks.bat

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
::PS     Write-Host "[STOPPED] nvidia-smi could not query SUPPORTED_CLOCKS for GPU $gpuId."
::PS     $supOut | ForEach-Object { Write-Host $_ }
::PS     Write-Host 'Your GPU or driver may not support clock locking. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS $graphicsClocks = [System.Collections.Generic.SortedSet[int]]::new()
::PS foreach ($line in $supOut) {
::PS     if ($line -match '^\s*Graphics\s*:\s*(\d+)\s*MHz\s*$') {
::PS         [void]$graphicsClocks.Add([int]$Matches[1])
::PS     }
::PS }
::PS if ($graphicsClocks.Count -eq 0) {
::PS     Write-Host "[STOPPED] No verified Graphics clocks could be parsed for GPU $gpuId."
::PS     Write-Host 'Your GPU/driver returned N/A, Not Supported, or an unrecognized format. No changes were made.'
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
::PS     Write-Host 'No automatic reset was run so any pre-existing configuration is preserved.'
::PS     Write-Host "If you want to reset manually, run: nvidia-smi -i $gpuId -rgc"
::PS     exit 1
::PS }
::PS
::PS Write-Host "[ACCEPTED] Driver accepted -lgc $targetMhz,$targetMhz on GPU $gpuId."
::PS $clkOut = & $nvsmi -i $gpuId -q -d CLOCK 2>&1
::PS $observed = ($clkOut | Where-Object { $_ -match '^\s*Graphics\s*:\s*\d+\s*MHz' } | Select-Object -First 1)
::PS if ($observed) {
::PS     Write-Host ('Actually observed right now: ' + $observed.Trim())
::PS } else {
::PS     Write-Host 'Could not read current observed Graphics clock via -q -d CLOCK.'
::PS }
::PS Write-Host 'Note: Thermal, power, or firmware limits can still affect live clocks under load.'
::PS Write-Host "When finished, run Reset-GPU-Clocks.bat or: nvidia-smi -i $gpuId -rgc"
::PS exit 0
```

### Reset-GPU-Clocks.bat

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
::PS $clkOut = & $nvsmi -i $gpuId -q -d CLOCK 2>&1
::PS $observed = ($clkOut | Where-Object { $_ -match '^\s*Graphics\s*:\s*\d+\s*MHz' } | Select-Object -First 1)
::PS if ($observed) {
::PS     Write-Host ('Actually observed right now: ' + $observed.Trim())
::PS }
::PS Write-Host 'Dynamic clock management is active; clocks should drop to idle when unloaded.'
::PS exit 0
```

No Bloco de Notas: **Ficheiro → Guardar como...**, altera **Tipo** para **Todos os ficheiros (`*.*`)** para evitar `.bat.txt` e executa com botão direito → **Executar como administrador**.

---

## 10. Como testar se realmente ajuda (Teste A/B)

Um teste de 3-5 minutos serve como verificação preliminar, mas para avaliar o benefício real faz uma comparação **A/B de pelo menos 10-15 minutos** por fase (1. Repõe com `-rgc`, 2. Estabiliza o Vonovox, 3. Teste A 10-15 min, 4. Aplica um clock `Graphics` verificado, 5. Teste B 10-15 min com modelo, F0, Block Size, áudio e carga GPU idênticos, 6. Repete se for incerto ou repõe com `-rgc`):

| Métrica | Teste A: Predefinido (10-15 min) | Teste B: Bloqueado (10-15 min) |
| --- | --- | --- |
| **GPU Delay** médio (ms) | `____ ms` | `____ ms` |
| Picos de **GPU Delay** | `____ ms` | `____ ms` |
| Variabilidade dos tempos | `____________` | `____________` |
| Estalidos / falhas | `Sim / Não` | `Sim / Não` |
| Temperatura GPU (°C) | `____ °C` | `____ °C` |
| Consumo (W) | `____ W` | `____ W` |
| Clock real observado (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Throttling (`-q -d PERFORMANCE`) | `Nenhum / Térmico / Energia` | `Nenhum / Térmico / Energia` |

Se for igual ou pior, repõe imediatamente com `nvidia-smi -i 0 -rgc`.

---

## 11. Riscos, limitações e precauções

Mais calor, ruído, consumo, menor bateria em portáteis, throttling e possíveis conflitos com MSI Afterburner/software OEM. Nunca alteres VBIOS, voltagens ou proteções térmicas.

---

## 12. Nota avançada: bloqueio de memória GPU (`-lmc`)

`-lmc` / `-rmc` bloqueia a VRAM e não é recomendado para o Vonovox por falta de provas de benefício.

---

## 13. Alternativas

Usa o **Painel de Controlo NVIDIA → Modo de gestão de energia → Preferir desempenho máximo** (não equivale a `--lgc`), aumenta o **Block Size**, confirma `48 kHz` e WASAPI em [Configurar e ajustar Vonovox](live-audio.md), limita FPS em jogos e verifica a refrigeração.

---

## 14. Resolução de problemas

| Sintoma | Causa possível | Solução recomendada |
| --- | --- | --- |
| `nvidia-smi` não reconhecido | Ausente do `PATH`. | Usa o caminho completo em `System32`/`NVSMI` ou os `.bat`. |
| Sem GPU / `NVIDIA-SMI has failed` | GPU desativada ou em repouso. | Verifica Gestor de Dispositivos e liga o carregador. |
| `Insufficient Permissions` | Sem privilégios admin. | Executa como administrador. |
| `Not Supported` | Hardware/driver incompatível. | Usa as [Alternativas](#13-alternativas). |
| `Invalid Argument` | Sintaxe ou MHz inválido. | Copia um MHz exato de `SUPPORTED_CLOCKS` (`min,max`). |
| Clock difere ou desce | Limite térmico/energético. | Testa MHz menor ou usa `-rgc`. |
| Temperaturas altas | Refrigeração insuficiente. | Executa `nvidia-smi -i 0 -rgc` de imediato. |
| Sem melhoria / pior | Gargalo em Block Size, CPU ou WASAPI. | Executa `-rgc` e ajusta [Configurar e ajustar Vonovox](live-audio.md). |
| Diferente com jogo aberto | Jogo satura a GPU. | Limita FPS do jogo ou sobe **Block Size**. |
| `-rgc` falha | Admin/índice ou driver. | Confirma admin + `-L` ou reinicia o Windows. |

---

## 15. Perguntas frequentes (FAQ)

1. **É seguro?** Sim, usando apenas `SUPPORTED_CLOCKS` e vigiando temperaturas.
2. **É overclocking?** Não.
3. **Aumenta os FPS?** Normalmente não.
4. **Melhora a qualidade da voz?** Não.
5. **Reduz a latência?** Pode reduzir picos, não o mínimo físico.
6. **Funciona em portáteis?** Às vezes, mas muitos bloqueiam por firmware/calor.
7. **Em todas as GPUs NVIDIA?** Não.
8. **Escolher sempre o máximo?** Não.
9. **Posso usar `50000` MHz?** Não.
10. **Funciona em GPUs RTX?** Em muitas RTX desktop sim; em portáteis pode dar `Not Supported`.
11. **Preciso de aplicar sempre?** Sim, após reiniciar.
12. **Sobrevive ao reinício?** Não.
13. **Vonovox + jogo?** Sim, se a GPU tiver margem.
14. **Se aquecer demasiado?** Proteção térmica automática; executa `-rgc`.
15. **Como repor tudo?** `nvidia-smi -i 0 -rgc`, `Reset-GPU-Clocks.bat` ou reiniciar.
16. **Bloquear VRAM (`-lmc`)?** Não.
17. **Se aparecer `Not Supported`?** Usa as alternativas da Secção 13.

---

## 16. Referências oficiais

- [NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [NVIDIA NVML API Reference](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [NVIDIA TensorRT Benchmarking & Clock Locking](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Repositório do Vonovox](https://github.com/dr87/Vonovox)
