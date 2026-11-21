---
label: "Optimización avanzada de rendimiento"
icon: ":zap:"
order: 97
permalink: /ilaria-rvc/vonovox/advanced-performance-optimization/
description: "Guía opcional de NVIDIA GPU Clock Locking para probar si fijar las frecuencias gráficas soportadas mejora la estabilidad de latencia en Vonovox."
---
# Optimización avanzada de rendimiento: NVIDIA GPU Clock Locking

> **Optimización opcional:** Esta guía es **100% opcional** y **nunca es obligatoria** para instalar o usar Vonovox. Completa primero [Instalar Vonovox](installation.md) y [Configurar y ajustar Vonovox](live-audio.md) antes de probar ajustes avanzados de GPU.

**Principio central:** El GPU Clock Locking es una optimización avanzada opcional que puede mejorar la estabilidad del procesamiento en tiempo real de Vonovox en GPUs NVIDIA compatibles. Usa siempre frecuencias soportadas, prueba los resultados en tu propio hardware y restablece las frecuencias predeterminadas si no observas una mejora medible.

> **Restablecimiento rápido (ejecútalo en cualquier momento):** Abre el Símbolo del sistema como administrador y ejecuta `nvidia-smi -i 0 -rgc` (cambia `0` por el índice de tu GPU si tienes más de una). También puedes reiniciar Windows para volver a la gestión dinámica.

## Índice de contenidos

- [Ruta rápida para usuarios avanzados](#ruta-rápida-para-usuarios-avanzados)
- [1. Qué es el GPU Clock Locking (introducción para principiantes)](#1-qué-es-el-gpu-clock-locking-introducción-para-principiantes)
- [2. Cómo afectan las frecuencias GPU a Vonovox](#2-cómo-afectan-las-frecuencias-gpu-a-vonovox)
- [3. Compatibilidad NVIDIA y mensajes de error](#3-compatibilidad-nvidia-y-mensajes-de-error)
- [4. Preparación para principiantes: Windows 10 y Windows 11](#4-preparación-para-principiantes-windows-10-y-windows-11)
- [5. Cómo encontrar las frecuencias soportadas](#5-cómo-encontrar-las-frecuencias-soportadas)
- [6. Cómo elegir una frecuencia adecuada](#6-cómo-elegir-una-frecuencia-adecuada)
- [7. Aplicación del GPU Clock Lock](#7-aplicación-del-gpu-clock-lock)
- [8. Restablecimiento de los ajustes originales](#8-restablecimiento-de-los-ajustes-originales)
- [9. Gestión en un clic (archivos BAT)](#9-gestión-en-un-clic-archivos-bat)
- [10. Cómo comprobar si realmente ayuda (Prueba A/B)](#10-cómo-comprobar-si-realmente-ayuda-prueba-ab)
- [11. Riesgos, limitaciones y precauciones](#11-riesgos-limitaciones-y-precauciones)
- [12. Nota avanzada: bloqueo de memoria GPU (-lmc)](#12-nota-avanzada-bloqueo-de-memoria-gpu--lmc)
- [13. Alternativas cuando el Clock Locking no ayuda](#13-alternativas-cuando-el-clock-locking-no-ayuda)
- [14. Solución de problemas](#14-solución-de-problemas)
- [15. Preguntas frecuentes (FAQ)](#15-preguntas-frecuentes-faq)
- [16. Referencias oficiales](#16-referencias-oficiales)

---

## Ruta rápida para usuarios avanzados

Si ya manejas CMD como administrador y `nvidia-smi`:

1. Lista las GPUs y confirma el índice (`0` en equipos con una GPU):
   ```bat
   nvidia-smi -L
   ```
2. Consulta las frecuencias gráficas soportadas:
   ```bat
   nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
   ```
3. Fija una frecuencia gráfica **verificada y soportada** de la lista (`1800` aquí es solo un ejemplo ilustrativo):
   ```bat
   nvidia-smi -i 0 -lgc 1800,1800
   ```
4. Comprueba los relojes reales mientras usas Vonovox:
   ```bat
   nvidia-smi -i 0 -q -d CLOCK
   ```
5. Haz una [comparativa A/B en Vonovox](#10-cómo-comprobar-si-realmente-ayuda-prueba-ab). Al terminar o si no hay mejora, restablece de inmediato:
   ```bat
   nvidia-smi -i 0 -rgc
   ```

---

## 1. Qué es el GPU Clock Locking (introducción para principiantes)

1. **Qué es la frecuencia de una GPU:** Dentro de tu tarjeta gráfica NVIDIA, el procesador principal realiza millones de cálculos por segundo. La **frecuencia de reloj** indica cuántos ciclos completa cada segundo.
2. **Qué significa MHz:** **MHz** equivale a **megahercios** (1 millón de ciclos por segundo). Por ejemplo, `1500 MHz` son 1.500 millones de ciclos por segundo.
3. **Cómo funcionan las frecuencias dinámicas:** Las GPUs modernas bajan a velocidades mínimas en reposo (por ejemplo `210 MHz` o `300 MHz`) para ahorrar energía y mantenerse frías y silenciosas, y suben al recibir carga.
4. **Qué es NVIDIA GPU Boost:** Es el sistema automático de NVIDIA que ajusta la frecuencia constantemente según carga, temperatura, límite de potencia y voltaje.
5. **Por qué cambian las frecuencias con Vonovox:** La conversión de voz en directo procesa el audio en bloques discretos (cuya duración depende de **Block Size** y la configuración de audio) en lugar de una carga 3D continua. Entre bloques, la GPU puede bajar su frecuencia y tener que subirla de golpe en el bloque siguiente.
6. **Qué significa bloquear una frecuencia:** **GPU Clock Locking** (`nvidia-smi -lgc`) indica al controlador que mantenga el núcleo GPU dentro de un rango soportado (o en un valor fijo si mínimo y máximo son iguales), como el **control de crucero en autopista**.
7. **Diferencia frente al overclocking:** El **overclocking** empuja la GPU *más allá* de sus límites de fábrica; el **GPU Clock Locking** solo selecciona frecuencias oficiales incluidas en la tabla del fabricante, sin subir voltajes ni límites de potencia.
8. **Por qué una frecuencia estable puede ayudar al audio en tiempo real:** Evitar bajadas y subidas bruscas entre bloques puede reducir picos repentinos de latencia.
9. **Por qué el máximo MHz no siempre es lo mejor:** El máximo genera más calor, ruido y consumo, y puede provocar **thermal throttling** (reducción automática por temperatura), causando más cortes que una frecuencia moderada estable.

---

## 2. Cómo afectan las frecuencias GPU a Vonovox

Vonovox procesa el micrófono mediante **CUDA**. Cada bloque de audio (**Block Size**) debe completarse antes de que llegue el siguiente.

- **GPU Delay y variación de tiempos:** Los saltos entre reposo y boost pueden generar picos de **GPU Delay**.
- **Audio crackling, popping y stuttering:** Si un bloque llega tarde por un cambio de frecuencia, el búfer se vacía y se oyen clics o cortes.
- **Buffer Size y Block Size:** Un **Block Size** mayor da más margen pero añade latencia; uno menor exige mayor estabilidad.
- **WASAPI y WASAPI Exclusive Mode:** WASAPI gestiona el audio en Windows, pero no corrige una GPU lenta ni sustituye al ajuste de `48 kHz`.
- **Vonovox + videojuegos:** Si un juego satura el **95-100% de la GPU**, Vonovox esperará su turno aunque fijes los relojes; limita los FPS del juego o sube **Block Size**.
- **Problemas de GPU frente a CPU o drivers:** Los cortes también pueden deberse a CPU saturada, tasas distintas de `48 kHz` o cable virtual mal configurado.

| Beneficios posibles (no garantizados) | Beneficios NO garantizados |
| --- | --- |
| Comportamiento de reloj más predecible | Mayor velocidad máxima de conversión |
| Menos picos repentinos de GPU Delay en algunos equipos | Eliminación total de chasquidos o cortes |
| Pruebas A/B más consistentes | Mejor calidad de voz o afinación |

---

## 3. Compatibilidad NVIDIA y mensajes de error

Que `nvidia-smi` funcione **no garantiza** que `--lgc` sea compatible con tu GPU o driver.

- **GeForce de escritorio:** Muchas tarjetas actuales soportan `--lgc` con drivers recientes.
- **GPUs de portátil:** Muchos portátiles bloquean `--lgc` por firmware/BIOS o Optimus, o lo limitan por temperatura y energía.
- **GPUs profesionales/datacenter (Quadro, RTX A-series, Tesla, L4/T4):** Suelen admitir control de reloj completo.
- **Generaciones/drivers antiguos:** Pueden devolver `Not Supported`. No asumas compatibilidad universal en todas las GTX o RTX.

| Mensaje | Significado | Solución segura |
| --- | --- | --- |
| `Not Supported` | Tu GPU, portátil o driver no permite `--lgc` o `SUPPORTED_CLOCKS`. | No lo fuerces; usa las [alternativas](#13-alternativas-cuando-el-clock-locking-no-ayuda). |
| `Insufficient Permissions` | CMD no se abrió como administrador. | Clic derecho en **Símbolo del sistema** → **Ejecutar como administrador**. |
| `Invalid Argument` | Valores MHz inválidos o fuera de la lista soportada. | Consulta `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` y usa un valor `Graphics` exacto en formato `min,max`. |
| `NVIDIA-SMI has failed` | Driver sin respuesta o GPU dormida en portátil. | Activa la GPU en Administrador de dispositivos y conecta el cargador. |
| `nvidia-smi` no se reconoce | Falta en el `PATH` de Windows. | Usa la ruta completa (ver [Sección 4](#4-preparación-para-principiantes-windows-10-y-windows-11)) sin reinstalar drivers. |

---

## 4. Preparación para principiantes: Windows 10 y Windows 11

1. Pulsa `Ctrl + Shift + Esc` → **Rendimiento** y confirma que tienes una GPU **NVIDIA**.
2. Abre **Inicio**, escribe `cmd` (sin pulsar Enter aún).
3. Clic derecho en **Símbolo del sistema** → **Ejecutar como administrador** → **Sí**.
4. Pega los comandos con **clic derecho** (o `Ctrl + V`) y pulsa **Enter**.
5. Ejecuta `nvidia-smi` para ver el estado general y `nvidia-smi -L` para ver el índice (`0`, `1`...) si tienes varias GPUs.

Si `nvidia-smi` no se reconoce, prueba estas rutas sin reinstalar nada:

```bat
"C:\Windows\System32\nvidia-smi.exe"
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
```

---

## 5. Cómo encontrar las frecuencias soportadas

Ejecuta siempre primero:

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

- **`-i 0`**: Índice de GPU.
- **`Memory`** son relojes de VRAM (no los bloquees). **`Graphics`** son los relojes del **núcleo GPU** para usar con `--lgc`.
- Si muestra `N/A` o `Not Supported`, pasa a las [alternativas](#13-alternativas-cuando-el-clock-locking-no-ayuda).

> **No introduzcas nunca valores arbitrarios altos (como `50000` MHz):** Según la documentación de NVIDIA, algunos dispositivos y controladores pueden redondear una frecuencia solicitada al valor soportado más cercano, mientras que los valores fuera de rango pueden fallar con `Invalid Argument`. Nunca uses números arbitrarios esperando redondeo: elige siempre un valor `Graphics` exacto de `SUPPORTED_CLOCKS`.

---

## 6. Cómo elegir una frecuencia adecuada

1. Observa tus relojes normales usando Vonovox con `nvidia-smi -i 0 -q -d CLOCK`.
2. Elige un valor `Graphics` de `SUPPORTED_CLOCKS` cercano o algo inferior a tu rango habitual.
3. No elijas automáticamente el máximo: genera más calor y puede provocar throttling.
4. Vigila temperaturas y consumo, y comprueba con `nvidia-smi -i 0 -q -d PERFORMANCE` si hay `Thermal Slowdown`.
5. Prueba 2-3 valores soportados si hace falta y quédate con el ajuste solo si aporta mejoras reales.

---

## 7. Aplicación del GPU Clock Lock

> **Ejemplo meramente ilustrativo:** `1800` MHz aquí es solo un ejemplo. Sustitúyelo por un valor real de tu lista `SUPPORTED_CLOCKS`.

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

Ejemplo con rango mínimo/máximo diferente:

```bat
nvidia-smi -i 0 -lgc 1500,1800
```

Comprueba los relojes **realmente observados** (distintos de la frecuencia solicitada o el rango configurado) mientras usas Vonovox con:

```bat
nvidia-smi -i 0 -q -d CLOCK
```

*(O `nvidia-smi -i 0 -q -d CLOCK -l 1` para refrescar cada segundo; `Ctrl + C` para parar).* Que el controlador acepte `-lgc` no garantiza que la frecuencia se mantenga fija: los límites térmicos, eléctricos o de firmware pueden limitarla.

---

## 8. Restablecimiento de los ajustes originales

```bat
nvidia-smi -i 0 -rgc
```

`-rgc` devuelve el control a NVIDIA GPU Boost. Es recomendable volver a la gestión dinámica al terminar o si no hay mejora. El bloqueo **no sobrevive a un reinicio de Windows**. Si `-rgc` da error, verifica privilegios de administrador, el índice `-i` o reinicia Windows.

---

## 9. Gestión en un clic (archivos BAT)

Ambos scripts usan PowerShell integrado en Windows (sin software externo), interfaz CMD en inglés, comprobación de administrador independiente de `net session`, validación del índice GPU con `nvidia-smi -L`, análisis estricto de `Graphics` en `SUPPORTED_CLOCKS` (rechazando valores arbitrarios como `50000` y sin seleccionar nunca el máximo), y **sin** ejecutar `-rgc` automáticamente si `-lgc` falla para preservar la configuración previa.

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

**Cómo guardarlos en el Bloc de notas:** Abre el Bloc de notas, pega el código, pulsa **Archivo → Guardar como...**, cambia **Tipo** a **Todos los archivos (`*.*`)** para evitar que acabe en `.bat.txt`, guarda como `Lock-GPU-Clocks.bat` o `Reset-GPU-Clocks.bat` y ejecútalos con clic derecho → **Ejecutar como administrador**.

---

## 10. Cómo comprobar si realmente ayuda (Prueba A/B)

Una prueba preliminar de 3-5 minutos sirve como chequeo rápido, pero para evaluar el beneficio real haz una comparativa **A/B de al menos 10-15 minutos** por fase (1. Restablece con `-rgc`, 2. Inicia Vonovox y estabiliza la carga, 3. Test A 10-15 min, 4. Aplica un reloj `Graphics` soportado, 5. Test B 10-15 min con modelo RVC, F0, Block Size, dispositivos, backend y carga GPU idénticos, 6. Repite si es dudoso o restablece con `-rgc` si no mejora):

| Métrica | Test A: Relojes por defecto (10-15 min) | Test B: Relojes bloqueados (10-15 min) |
| --- | --- | --- |
| **GPU Delay** medio (ms) | `____ ms` | `____ ms` |
| Picos de **GPU Delay** | `____ ms` | `____ ms` |
| Variabilidad de tiempos | `____________` | `____________` |
| Chasquidos / cortes | `Sí / No` | `Sí / No` |
| Temperatura GPU (°C) | `____ °C` | `____ °C` |
| Consumo GPU (W) | `____ W` | `____ W` |
| Reloj real observado (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Estado de throttling (`-q -d PERFORMANCE`) | `Ninguno / Térmico / Energía` | `Ninguno / Térmico / Energía` |

Un MHz más alto no equivale por sí solo a una mejora. Si el resultado es igual o peor, vuelve a los valores originales con `nvidia-smi -i 0 -rgc`.

---

## 11. Riesgos, limitaciones y precauciones

Aunque no es overclocking, fijar relojes aumenta temperatura, consumo, ruido de ventiladores y reduce la batería en portátiles; también puede chocar con software OEM o MSI Afterburner. Nunca modifiques VBIOS, voltajes ni protecciones térmicas.

---

## 12. Nota avanzada: bloqueo de memoria GPU (`-lmc`)

`nvidia-smi -i 0 -lmc <min,max>` y `-rmc` bloquean la frecuencia de **VRAM**. No se recomiendan en la guía estándar porque no hay evidencia suficiente de beneficio en Vonovox y elevan el calor en reposo.

---

## 13. Alternativas cuando el Clock Locking no ayuda

- En el **Panel de control de NVIDIA**, ajusta **Modo de control de energía → Preferir rendimiento máximo** para Vonovox (no equivale exactamente a `--lgc`, pero puede ayudar).
- Asegúrate de que Vonovox use la GPU NVIDIA, sube un paso **Block Size**, alinea todo a `48 kHz` en [Configurar y ajustar Vonovox](live-audio.md), limita FPS en juegos y vigila la refrigeración.

---

## 14. Solución de problemas

| Síntoma | Posible causa | Solución recomendada |
| --- | --- | --- |
| `nvidia-smi` no se reconoce | Falta en `PATH`. | Usa la ruta completa en `System32` o `NVSMI`, o los archivos `.bat`. |
| Sin GPU / `NVIDIA-SMI has failed` | GPU deshabilitada o dormida. | Revisa Administrador de dispositivos y conecta el cargador. |
| `Insufficient Permissions` | Sin permisos de administrador. | Ejecuta CMD o `.bat` como administrador. |
| `Not Supported` | Hardware o driver no compatible. | Usa las [alternativas](#13-alternativas-cuando-el-clock-locking-no-ayuda). |
| `Invalid Argument` | Formato o MHz no soportado. | Usa un valor exacto de `SUPPORTED_CLOCKS` como `min,max`. |
| El reloj real difiere del pedido | Límite térmico o de potencia. | Prueba un MHz menor o revisa `-q -d PERFORMANCE`. |
| El reloj cae bajo carga | Thermal/power throttling. | Baja la frecuencia o restablece con `-rgc`. |
| Temperaturas muy altas | Refrigeración insuficiente. | Ejecuta `nvidia-smi -i 0 -rgc` de inmediato. |
| Vonovox no mejora / empeora | Cuello de botella en Block Size, CPU, WASAPI o GPU saturada. | Ejecuta `-rgc` y ajusta [Configurar y ajustar Vonovox](live-audio.md). |
| Con juego abierto cambia el rendimiento | El juego consume casi toda la GPU. | Limita FPS del juego o sube **Block Size**. |
| `-rgc` falla | Falta admin o índice erróneo. | Comprueba `-L` como admin o reinicia Windows. |
| No sabes qué MHz elegir | Falta referencia base. | Mira `nvidia-smi -i 0 -q -d CLOCK` usando Vonovox normalmente. |
| El portátil limita relojes | Límite OEM o batería. | Conecta el cargador y prioriza **Block Size**. |

---

## 15. Preguntas frecuentes (FAQ)

1. **¿Es seguro el GPU Clock Locking?** Sí, usando solo valores oficiales de `SUPPORTED_CLOCKS` y vigilando temperaturas.
2. **¿Es overclocking?** No, no supera límites de fábrica ni toca voltajes.
3. **¿Aumentará mis FPS?** Normalmente no.
4. **¿Mejora la calidad de voz?** No.
5. **¿Reduce la latencia?** Puede reducir picos de latencia por cambios de reloj, no el mínimo físico.
6. **¿Funciona en portátiles?** A veces, pero muchos lo restringen por firmware o temperatura.
7. **¿Funciona en todas las GPU NVIDIA?** No.
8. **¿Debo elegir siempre el máximo?** No, suele calentar más y causar throttling.
9. **¿Puedo usar `50000` MHz?** No.
10. **¿Funciona en GPUs RTX?** En muchas RTX de escritorio sí; en algunos portátiles da `Not Supported`.
11. **¿Hay que aplicarlo cada vez?** Sí, se reinicia al apagar el PC.
12. **¿Sobrevive a un reinicio?** No.
13. **¿Puedo jugar y usar Vonovox a la vez?** Sí, si la GPU no está al 100%.
14. **¿Qué pasa si se calienta demasiado?** La GPU reduce velocidad automáticamente; ejecuta `-rgc`.
15. **¿Cómo vuelvo a la normalidad?** `nvidia-smi -i 0 -rgc`, `Reset-GPU-Clocks.bat` o reiniciar Windows.
16. **¿Debo bloquear la VRAM (`-lmc`)?** No.
17. **¿Qué hago si sale `Not Supported`?** Usa las alternativas de la Sección 13.

---

## 16. Referencias oficiales

- [NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [NVIDIA NVML API Reference](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [NVIDIA TensorRT Benchmarking & Clock Locking](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Repositorio de Vonovox](https://github.com/dr87/Vonovox)
