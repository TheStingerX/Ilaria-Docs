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
- No Vonovox, o áudio chega em pequenos blocos CUDA a cada poucos milissegundos; entre blocos, a GPU pode baixar o clock e ter de subir novamente, gerando picos de latência.
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

Usa apenas valores listados em **`Graphics :`** (não **`Memory`**). **Nunca** introduzas valores arbitrários como `50000` MHz.

---

## 6. Escolher uma frequência adequada

Observa primeiro os clocks normais com `nvidia-smi -i 0 -q -d CLOCK`, escolhe um valor `Graphics` moderado, vigia temperatura e throttling (`-q -d PERFORMANCE`) e mantém o bloqueio apenas se houver benefício real.

---

## 7. Aplicar o GPU Clock Lock

*(Valor meramente ilustrativo, substitui `1800` por um valor do teu `SUPPORTED_CLOCKS`:)*

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

Exemplo com intervalo: `nvidia-smi -i 0 -lgc 1500,1800`. Verifica em execução com `nvidia-smi -i 0 -q -d CLOCK` (ou `-l 1`). Limites térmicos ou energéticos podem impedir atingir exatamente o valor pedido.

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
setlocal EnableExtensions EnableDelayedExpansion
title Vonovox Helper - Lock NVIDIA GPU Clocks

echo ============================================================
echo   Vonovox Optional Helper: Lock NVIDIA GPU Core Clocks
echo   No overclocking, no voltage changes, temporary until reboot
echo ============================================================
echo.

net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Administrator privileges are required.
    pause
    exit /b 1
)

set "NVSMI=nvidia-smi"
where nvidia-smi >nul 2>&1
if errorlevel 1 (
    if exist "C:\Windows\System32\nvidia-smi.exe" (
        set "NVSMI=C:\Windows\System32\nvidia-smi.exe"
    ) else if exist "C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe" (
        set "NVSMI=C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
    ) else (
        echo [ERROR] nvidia-smi.exe was not found on this system.
        pause
        exit /b 1
    )
)

"%NVSMI%" -L
if errorlevel 1 (
    echo [ERROR] Could not query NVIDIA GPUs.
    pause
    exit /b 1
)

set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to configure [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

"%NVSMI%" -i %GPU_ID% -q -d SUPPORTED_CLOCKS
if errorlevel 1 (
    echo [STOPPED] Could not retrieve SUPPORTED_CLOCKS for GPU %GPU_ID%.
    pause
    exit /b 1
)

set "TARGET_MHZ="
set /p "TARGET_MHZ=Enter a supported Graphics clock in MHz (or press Enter to cancel): "
if "%TARGET_MHZ%"=="" exit /b 0

echo %TARGET_MHZ%| findstr /r "^[0-9][0-9]*$" >nul
if errorlevel 1 (
    echo [ERROR] "%TARGET_MHZ%" is not a valid whole number in MHz.
    pause
    exit /b 1
)

"%NVSMI%" -i %GPU_ID% -lgc %TARGET_MHZ%,%TARGET_MHZ%
if errorlevel 1 (
    echo [ERROR] Failed to apply clock lock.
    "%NVSMI%" -i %GPU_ID% -rgc >nul 2>&1
    pause
    exit /b 1
)

echo [SUCCESS] Clock lock applied to GPU %GPU_ID% (%TARGET_MHZ% MHz).
pause
exit /b 0
```

### Reset-GPU-Clocks.bat

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Reset NVIDIA GPU Clocks

echo ============================================================
echo   Vonovox Optional Helper: Reset NVIDIA GPU Clocks to Default
echo ============================================================
echo.

net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Administrator privileges are required.
    pause
    exit /b 1
)

set "NVSMI=nvidia-smi"
where nvidia-smi >nul 2>&1
if errorlevel 1 (
    if exist "C:\Windows\System32\nvidia-smi.exe" (
        set "NVSMI=C:\Windows\System32\nvidia-smi.exe"
    ) else if exist "C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe" (
        set "NVSMI=C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
    ) else (
        echo [ERROR] nvidia-smi.exe was not found on this system.
        pause
        exit /b 1
    )
)

"%NVSMI%" -L
set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to reset [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

"%NVSMI%" -i %GPU_ID% -rgc
if errorlevel 1 (
    echo [ERROR] Failed to reset clocks. Reboot Windows to restore defaults.
    pause
    exit /b 1
)

echo [SUCCESS] GPU %GPU_ID% has returned to default dynamic clock management.
pause
exit /b 0
```

No Bloco de Notas: **Ficheiro → Guardar como...**, altera **Tipo** para **Todos os ficheiros (`*.*`)** para evitar `.bat.txt` e executa com botão direito → **Executar como administrador**.

---

## 10. Como testar se realmente ajuda (Teste A/B)

Compara **Teste A (Predefinido com `-rgc`)** e **Teste B (Clock bloqueado)** com modelo, F0, Block Size, dispositivos de áudio e carga GPU idênticos:

| Métrica | Teste A: Predefinido | Teste B: Bloqueado |
| --- | --- | --- |
| **GPU Delay** médio (ms) | `____ ms` | `____ ms` |
| Picos de **GPU Delay** | `____ ms` | `____ ms` |
| Estalidos / falhas | `Sim / Não` | `Sim / Não` |
| Temperatura GPU após 5 min (°C) | `____ °C` | `____ °C` |
| Clock real (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Consumo (W) | `____ W` | `____ W` |
| Estabilidade após 5+ min | `Estável / Throttling` | `Estável / Throttling` |

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
