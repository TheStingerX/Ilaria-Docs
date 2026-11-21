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
5. **Por qué cambian las frecuencias con Vonovox:** La conversión de voz en directo procesa pequeños bloques de audio cada pocos milisegundos (carga CUDA en ráfagas). Entre bloques, la GPU puede bajar su frecuencia y tener que subirla de golpe en el bloque siguiente.
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

> **No introduzcas nunca valores arbitrarios altos (como `50000` MHz):** Pueden fallar con `Invalid Argument` y no está garantizado que el driver los limite automáticamente al máximo seguro.

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

Comprueba los relojes activos mientras usas Vonovox con:

```bat
nvidia-smi -i 0 -q -d CLOCK
```

*(O `nvidia-smi -i 0 -q -d CLOCK -l 1` para refrescar cada segundo; `Ctrl + C` para parar).* Los límites térmicos, eléctricos o de hardware pueden impedir mantener exactamente la cifra pedida.

---

## 8. Restablecimiento de los ajustes originales

```bat
nvidia-smi -i 0 -rgc
```

`-rgc` devuelve el control a NVIDIA GPU Boost. Es recomendable volver a la gestión dinámica al terminar o si no hay mejora. El bloqueo **no sobrevive a un reinicio de Windows**. Si `-rgc` da error, verifica privilegios de administrador, el índice `-i` o reinicia Windows.

---

## 9. Gestión en un clic (archivos BAT)

Ambos scripts usan interfaz CMD en inglés, comprueban privilegios de administrador y rutas de `nvidia-smi`, no modifican voltajes ni límites de potencia y nunca seleccionan automáticamente el reloj máximo.

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
    echo Right-click this .bat file and choose "Run as administrator".
    echo.
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

echo Detected NVIDIA GPUs:
"%NVSMI%" -L
if errorlevel 1 (
    echo [ERROR] Could not query NVIDIA GPUs.
    pause
    exit /b 1
)

echo.
set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to configure [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

echo.
"%NVSMI%" -i %GPU_ID% -q -d SUPPORTED_CLOCKS
if errorlevel 1 (
    echo [STOPPED] Could not retrieve SUPPORTED_CLOCKS for GPU %GPU_ID%.
    pause
    exit /b 1
)

echo.
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
    echo Right-click this .bat file and choose "Run as administrator".
    echo.
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
echo.
set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to reset [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

"%NVSMI%" -i %GPU_ID% -rgc
if errorlevel 1 (
    echo [ERROR] Failed to reset clocks via nvidia-smi. Reboot Windows to restore defaults.
    pause
    exit /b 1
)

echo [SUCCESS] GPU %GPU_ID% has returned to default dynamic clock management.
pause
exit /b 0
```

**Cómo guardarlos en el Bloc de notas:** Abre el Bloc de notas, pega el código, pulsa **Archivo → Guardar como...**, cambia **Tipo** a **Todos los archivos (`*.*`)** para evitar que acabe en `.bat.txt`, guarda como `Lock-GPU-Clocks.bat` o `Reset-GPU-Clocks.bat` y ejecútalos con clic derecho → **Ejecutar como administrador**.

---

## 10. Cómo comprobar si realmente ayuda (Prueba A/B)

Compara **Test A (Default GPU Clocks con `-rgc`)** frente a **Test B (Locked GPU Clocks)** manteniendo idénticos el modelo vocal, F0 Method, Block Size, dispositivos de audio, backend y carga GPU:

| Métrica | Test A: Relojes por defecto | Test B: Relojes bloqueados |
| --- | --- | --- |
| **GPU Delay** medio (ms) | `____ ms` | `____ ms` |
| Picos de **GPU Delay** | `____ ms` | `____ ms` |
| Chasquidos / cortes | `Sí / No` | `Sí / No` |
| Temperatura GPU tras 5 min (°C) | `____ °C` | `____ °C` |
| Reloj real (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Consumo GPU (W) | `____ W` | `____ W` |
| Estabilidad tras 5+ minutos | `Estable / Throttling` | `Estable / Throttling` |

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
