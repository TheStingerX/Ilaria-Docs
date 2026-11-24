---
label: "Optimización Avanzada de Rendimiento"
icon: ":zap:"
order: 97
permalink: /ilaria-rvc/vonovox/advanced-performance-optimization/
description: "Guía opcional de bloqueo de relojes de GPU NVIDIA (GPU Clock Locking) para comprobar si fijar frecuencias gráficas compatibles mejora la estabilidad de latencia de Vonovox en Windows."
---
# Optimización Avanzada de Rendimiento: NVIDIA GPU Clock Locking

> **Optimización opcional:** Esta guía es **100% opcional** y **nunca es obligatoria** para instalar o usar Vonovox. Completa siempre [Instalar Vonovox](installation.md) y [Enrutar y ajustar Vonovox](live-audio.md) antes de probar ajustes avanzados de GPU.

**Principio básico:** El bloqueo de relojes de GPU (GPU Clock Locking) es una optimización avanzada opcional que puede mejorar la estabilidad de procesamiento en tiempo real de Vonovox en GPUs NVIDIA compatibles. Usa siempre frecuencias de reloj compatibles, prueba los resultados en tu propio hardware y restablece los relojes predeterminados si no observas un beneficio medible.

> **Restablecimiento rápido (ejecútalo en cualquier momento para restaurar valores predeterminados):** Abre el Símbolo del sistema como Administrador y ejecuta `nvidia-smi -i 0 -rgc` (cambia `0` por el índice de tu GPU si tienes varias GPUs). También puedes reiniciar Windows para volver a la gestión dinámica de relojes.

## Índice de Contenidos

- [Ruta Rápida para Usuarios Experimentados](#ruta-rápida-para-usuarios-experimentados)
- [1. Qué es GPU Clock Locking (Introducción para Principiantes)](#1-qué-es-gpu-clock-locking-introducción-para-principiantes)
- [2. Cómo Afectan los Relojes de GPU a Vonovox](#2-cómo-afectan-los-relojes-de-gpu-a-vonovox)
- [3. Compatibilidad NVIDIA y Mensajes de Error](#3-compatibilidad-nvidia-y-mensajes-de-error)
- [4. Configuración para Principiantes: Windows 10 y Windows 11](#4-configuración-para-principiantes-windows-10-y-windows-11)
- [5. Encontrar los Relojes Compatibles de tu GPU](#5-encontrar-los-relojes-compatibles-de-tu-gpu)
- [6. Elegir una Frecuencia Adecuada](#6-elegir-una-frecuencia-adecuada)
- [7. Aplicar el Bloqueo de Reloj de GPU](#7-aplicar-el-bloqueo-de-reloj-de-gpu)
- [8. Restaurar la Configuración Predeterminada](#8-restaurar-la-configuración-predeterminada)
- [9. Gestión de Reloj de GPU en un Clic (Scripts BAT)](#9-gestión-de-reloj-de-gpu-en-un-clic-scripts-bat)
- [10. Cómo Probar si Realmente Ayuda](#10-cómo-probar-si-realmente-ayuda)
- [11. Riesgos, Limitaciones y Precauciones](#11-riesgos-limitaciones-y-precauciones)
- [12. Nota Avanzada: Bloqueo de Reloj de Memoria GPU (-lmc)](#12-nota-avanzada-bloqueo-de-reloj-de-memoria-gpu--lmc)
- [13. Alternativas Cuando el Bloqueo de Reloj No Ayuda](#13-alternativas-cuando-el-bloqueo-de-reloj-no-ayuda)
- [14. Solución de Problemas](#14-solución-de-problemas)
- [15. Preguntas Frecuentes (FAQ)](#15-preguntas-frecuentes-faq)
- [16. Referencias Oficiales](#16-referencias-oficiales)

---

## Ruta Rápida para Usuarios Experimentados

Si ya sabes cómo usar un Símbolo del sistema con privilegios elevados y `nvidia-smi`:

1. Lista las GPUs y confirma tu índice de destino (`0` en sistemas con una sola GPU):
   ```bat
   nvidia-smi -L
   ```
2. Consulta los relojes gráficos compatibles en esa GPU:
   ```bat
   nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
   ```
3. Bloquea a un reloj gráfico **verificado y compatible** de la salida (`1800` abajo es solo un valor de ejemplo ilustrativo):
   ```bat
   nvidia-smi -i 0 -lgc 1800,1800
   ```
4. Verifica los relojes en vivo mientras Vonovox está ejecutándose:
   ```bat
   nvidia-smi -i 0 -q -d CLOCK
   ```
5. Ejecuta una [prueba A/B en Vonovox](#10-cómo-probar-si-realmente-ayuda). Al terminar, o si no hay mejora, restaura los relojes dinámicos de inmediato:
   ```bat
   nvidia-smi -i 0 -rgc
   ```

---

## 1. Qué es GPU Clock Locking (Introducción para Principiantes)

1. **Qué es una frecuencia de GPU (velocidad de reloj):** Dentro de tu tarjeta gráfica NVIDIA, el procesador principal (el núcleo de la GPU) realiza millones de pequeños cálculos matemáticos cada segundo. Su **frecuencia de reloj** es cuántos ciclos de cálculo completa por segundo.
2. **Qué significa MHz:** **MHz** significa **megahercio** (1 millón de ciclos por segundo). Por ejemplo, `1500 MHz` son 1500 millones de ciclos por segundo y `1800 MHz` son 1800 millones de ciclos por segundo.
3. **Cómo funcionan los relojes dinámicos de NVIDIA:** Las GPUs NVIDIA modernas no funcionan a una sola velocidad fija. Cuando tu PC está en reposo en el escritorio, la GPU baja a una velocidad reducida (por ejemplo `210 MHz` o `300 MHz`) para ahorrar electricidad, mantenerse silenciosa y mantenerse fresca. Cuando empieza una carga pesada, sube la velocidad.
4. **Qué es NVIDIA GPU Boost:** **NVIDIA GPU Boost** es el sistema automático integrado que ajusta constantemente la frecuencia de tu GPU hacia arriba y hacia abajo según la carga de trabajo, la temperatura, los límites de potencia y el margen de voltaje.
5. **Por qué fluctúan los relojes durante Vonovox:** La conversión de voz en tiempo real procesa audio en fragmentos discretos (la duración exacta depende de tu **Block Size** y ajustes de audio) en lugar de un renderizado 3D pesado y continuo. Entre fragmentos, la GPU puede ver brevemente poca carga y bajar su reloj, y luego volver a subir en el siguiente fragmento.
6. **Qué significa bloquear un reloj:** **GPU Clock Locking** (`nvidia-smi -lgc`) le indica al controlador NVIDIA que mantenga el núcleo de la GPU dentro de un rango de frecuencias compatibles específico (o en una sola frecuencia compatible cuando min y max son iguales) en lugar de dejarlo bajar y subir constantemente. Piénsalo como el **control de crucero en una autopista**: el coche mantiene una velocidad constante en lugar de frenar y acelerar una y otra vez.
7. **GPU Clock Locking vs. Overclocking:**
   - **Overclocking** empuja una GPU *más allá* de sus límites nominales de fábrica o altera voltajes/curvas de potencia para buscar mayor velocidad pico.
   - **GPU Clock Locking** solo elige una frecuencia que NVIDIA ya incluyó en la tabla oficial de relojes compatibles de tu tarjeta. **No** sube el voltaje, no desbloquea límites de potencia ni fuerza velocidades no soportadas.
8. **Por qué un reloj estable puede ayudar al audio en tiempo real:** Si tu GPU tarda `8 ms` en procesar un bloque de audio a un reloj alto y `18 ms` cuando reduce temporalmente su reloj, ese salto repentino puede provocar tiempos de procesamiento irregulares. Mantener un reloj compatible constante puede hacer que los tiempos por bloque sean más uniformes.
9. **Por qué el reloj máximo no siempre es el mejor:** Funcionar al MHz compatible más alto posible aumenta el calor, el ruido del ventilador y el consumo energético. Si tu GPU alcanza su límite de temperatura o potencia, aplicará **throttling** automáticamente (bajará su propia velocidad), creando peores tirones que un reloj moderado y estable.

---

## 2. Cómo Afectan los Relojes de GPU a Vonovox

Vonovox procesa el audio en vivo del micrófono mediante **CUDA** en tu GPU NVIDIA. Cada fragmento de audio (determinado por **Block Size**) debe terminar de procesarse antes de que llegue el siguiente.

- **GPU Delay y variación del tiempo de procesamiento:** En Vonovox, **GPU Delay** muestra cuánto tarda la GPU en convertir cada fragmento. Si los relojes de GPU saltan entre estados de reposo y boost, GPU Delay puede dispararse inesperadamente.
- **Chasquidos, crujidos y tartamudeos de audio:** Si aunque sea un fragmento de audio termina tarde porque la GPU aún estaba subiendo su reloj, el búfer de audio se queda vacío y oyes un clic, chasquido o corte robótico.
- **Buffer Size y Block Size:** Valores más altos de **Block Size** dan más margen a la GPU a costa de mayor latencia general. Valores más pequeños de **Block Size** se sienten más ágiles, pero son mucho más sensibles a picos repentinos de GPU Delay.
- **WASAPI y WASAPI Exclusive Mode:** **WASAPI** (Windows Audio Session API) gestiona el enrutamiento de audio entre tu micrófono, Vonovox y tu cable virtual. **WASAPI Exclusive Mode** (cuando tu dispositivo y app lo admiten) puede reducir la sobrecarga del mezclador de Windows, mientras que el modo compartido ofrece mayor compatibilidad. Ninguno arregla una GPU que entrega tarde el audio convertido, y GPU Clock Locking no corrige desajustes de controlador de audio o frecuencia de muestreo en Windows.
- **Vonovox + juegos al mismo tiempo:** Cuando juegas un juego 3D y ejecutas Vonovox a la vez, ambos compiten por la misma GPU. Si el juego satura el **95-100% del cómputo de GPU**, Vonovox espera turno sin importar el bloqueo de reloj. En ese caso, bajar gráficos o limitar FPS en el juego o subir **Block Size** en Vonovox ayuda mucho más que bloquear relojes.
- **Problemas de GPU vs. CPU o controlador de audio:** Los fallos de audio también pueden venir de sobrecarga de CPU, frecuencias de muestreo de `48 kHz` desalineadas, ahorro de energía USB del micrófono o mala configuración del cable virtual. GPU Clock Locking solo actúa sobre las transiciones de frecuencia de la GPU.

| Posibles beneficios (no garantizados) | Qué NO garantiza GPU Clock Locking |
| --- | --- |
| Comportamiento más predecible del reloj de GPU durante cargas de audio intermitentes | Mayor velocidad general de conversión de voz |
| Menos picos repentinos de GPU Delay en algunas configuraciones de escritorio/portátil | Eliminación de todos los chasquidos, crujidos o cortes |
| Pruebas A/B más sencillas al aislar fluctuaciones de latencia | Mejor calidad de voz, timbre o precisión de tono |

---

## 3. Compatibilidad NVIDIA y Mensajes de Error

Tener `nvidia-smi` instalado **no** garantiza que `-lgc` (Lock Graphics Clocks) sea compatible con tu combinación de hardware y controlador.

- **GPUs GeForce de escritorio:** Muchas tarjetas GeForce de escritorio modernas admiten `-lgc` con controladores recientes, aunque la granularidad exacta y el comportamiento dependen de la arquitectura y versión del controlador.
- **GPUs NVIDIA de portátil:** Muchos portátiles restringen el bloqueo de reloj en firmware/BIOS, gestión de energía o rutas híbridas/Optimus. Incluso cuando se acepta `-lgc`, los límites térmicos y de potencia del portátil suelen anular el reloj solicitado.
- **GPUs de estación de trabajo / centro de datos (Quadro, RTX serie A, Tesla, L4/T4):** Admiten ampliamente controles de reloj de `nvidia-smi` en controladores estándar empresariales/Studio.
- **Generaciones de hardware y controladores antiguos:** Arquitecturas antiguas (como Maxwell/Pascal o controladores heredados) pueden devolver `Not Supported` para `-lgc` o `SUPPORTED_CLOCKS`. No asumas que toda tarjeta GTX o RTX admite bloqueo de reloj.

### Mensajes comunes y qué significan

| Mensaje | Significado | Solución segura |
| --- | --- | --- |
| `Not Supported` | Tu modelo de GPU, firmware de portátil o controlador actual no permite consultas `-lgc` o `SUPPORTED_CLOCKS`. | No lo fuerces. Omite el bloqueo de reloj y usa las [alternativas](#13-alternativas-cuando-el-bloqueo-de-reloj-no-ayuda). |
| `Insufficient Permissions` | El Símbolo del sistema se abrió de forma normal en lugar de **Ejecutar como administrador**. | Cierra CMD, busca `cmd` en Inicio, haz clic derecho en **Símbolo del sistema** y elige **Ejecutar como administrador**. |
| `Invalid Argument` | Los valores MHz introducidos no son válidos, no tienen formato `min,max` o están fuera de los relojes compatibles. | Ejecuta `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` y elige un valor exacto listado bajo **Graphics**. |
| `NVIDIA-SMI has failed` | El controlador NVIDIA no responde, no hay GPU NVIDIA activa o la tarjeta está suspendida en modo híbrido de portátil. | Asegúrate de que la GPU NVIDIA esté habilitada en el Administrador de dispositivos y no desactivada por un modo eco/batería. |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` no está en la variable `PATH` de Windows (común en algunas instalaciones). | Ejecútalo usando su ruta completa (ver [Sección 4](#4-configuración-para-principiantes-windows-10-y-windows-11)) sin reinstalar controladores. |

---

## 4. Configuración para Principiantes: Windows 10 y Windows 11

Sigue estos pasos exactos si nunca has usado el Símbolo del sistema (`cmd`):

1. **Verifica que tienes una GPU NVIDIA:** Pulsa `Ctrl + Shift + Esc` para abrir el **Administrador de tareas**, haz clic en **Rendimiento** y busca una GPU **NVIDIA** en la lista izquierda. (Si solo ves AMD o Intel, esta guía no aplica a tu PC.)
2. **Abre el menú Inicio:** Pulsa la **tecla Windows** en tu teclado (o haz clic en el icono de Inicio en la barra de tareas).
3. **Busca `cmd`:** Escribe `cmd` (todavía no pulses Enter).
4. **Ejecuta como administrador:** Haz clic derecho en **Símbolo del sistema** en los resultados y pulsa **Ejecutar como administrador**. Haz clic en **Sí** si Windows pide permiso.
5. **Entiende qué significa ejecutar un comando:** Se abre una ventana negra con un cursor parpadeante. Escribir una línea de texto y pulsar **Enter** pide a Windows ejecutar esa herramienta e imprimir el resultado debajo.
6. **Copia y pega un comando:** Copia un comando de esta guía, haz clic dentro de la ventana negra del Símbolo del sistema y haz **clic derecho** (o pulsa `Ctrl + V`) para pegarlo.
7. **Pulsa Enter:** Espera un momento a que aparezca la salida.
8. **Comprueba el estado básico de la GPU:** Ejecuta:
   ```bat
   nvidia-smi
   ```
   Deberías ver una tabla con tu versión de controlador, nombre de GPU, temperatura, uso de memoria y consumo de energía.
9. **Identifica la GPU correcta en sistemas multi-GPU:** Si tienes más de una GPU NVIDIA, ejecuta:
   ```bat
   nvidia-smi -L
   ```
   Esto imprime una lista numerada como `GPU 0: NVIDIA GeForce ...` y `GPU 1: ...`. Cambia `0` en `-i 0` por el número de la GPU que usa Vonovox.

### Si `'nvidia-smi' is not recognized`

**No** necesitas reinstalar tu controlador NVIDIA. Simplemente Windows no sabe qué carpeta contiene `nvidia-smi.exe`. Prueba a ejecutarlo desde las carpetas estándar de Windows:

```bat
"C:\Windows\System32\nvidia-smi.exe"
```

Si dice que no se encuentra, prueba la carpeta heredada de NVIDIA:

```bat
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
```

Sea cual sea la ruta que funcione, úsala en lugar de `nvidia-smi` (o deja que los [scripts BAT de la Sección 9](#9-gestión-de-reloj-de-gpu-en-un-clic-scripts-bat) la encuentren automáticamente).

---

## 5. Encontrar los Relojes Compatibles de tu GPU

Nunca adivines una frecuencia. Pide siempre primero a tu GPU su lista oficial:

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

- **`-i 0`**: Selecciona el índice de GPU `0` (cambia `0` si `nvidia-smi -L` mostró otro índice para tu GPU de destino).
- **`-q -d SUPPORTED_CLOCKS`**: Consulta la tabla oficial de velocidades de reloj de **Memory** y **Graphics** compatibles con tu GPU y controlador.

### Cómo leer la salida

La salida agrupa las frecuencias **Graphics** (núcleo de GPU) compatibles bajo las frecuencias **Memory**, de forma similar a este esquema:

```text
Supported Clocks
    Memory                        : XXXX MHz
        Graphics                  : YYYY MHz
        Graphics                  : ZZZZ MHz
```

- Los relojes **Memory** son para la VRAM (memoria de vídeo). **No bloquees los relojes de memoria** en el procedimiento estándar de Vonovox.
- Los relojes **Graphics** son las frecuencias del **núcleo de tu GPU**. Estos son los valores que usas con `-lgc`.
- **Confirma que tu valor está listado:** Elige únicamente un número que aparezca textualmente junto a `Graphics :` en tu salida.
- **Si imprime `N/A` o `Not Supported`:** Tu combinación de GPU/controlador no expone relojes compatibles vía NVML. No intentes forzar números aleatorios; ve a [Alternativas](#13-alternativas-cuando-el-bloqueo-de-reloj-no-ayuda).

> **NO introduzcas valores altos arbitrarios (como `50000` MHz):** Según la documentación de NVIDIA, algunos dispositivos y controladores pueden ajustar o redondear un reloj solicitado a la frecuencia compatible más cercana, mientras que solicitudes fuera de rango pueden fallar con `Invalid Argument` o ser rechazadas por completo. Nunca introduzcas números arbitrarios esperando que el controlador redondee. Usa siempre un valor `Graphics` exacto impreso por `SUPPORTED_CLOCKS`.

---

## 6. Elegir una Frecuencia Adecuada

**No existe un único "mejor MHz"** para cada modelo de GPU, caja de PC o temperatura ambiente. Sigue este proceso de selección seguro:

1. **Observa primero los relojes normales de tu GPU:** Abre Vonovox, inicia la conversión en vivo y ejecuta `nvidia-smi -i 0 -q -d CLOCK` en CMD para ver qué MHz de Graphics usa tu tarjeta de forma natural.
2. **Comprueba `SUPPORTED_CLOCKS`:** Elige un valor de tu lista `Graphics` que se sitúe cómodamente alrededor o ligeramente por debajo de tu rango típico de boost.
3. **No elijas automáticamente el máximo:** El reloj más alto listado consume más potencia y genera más calor. Un reloj compatible algo más bajo suele mantenerse más fresco y evita throttling.
4. **Vigila temperaturas y consumo:** Mantén un ojo en `nvidia-smi` mientras pruebas. Si las temperaturas suben rápido o los ventiladores van al máximo, elige un reloj compatible más bajo.
5. **Comprueba si hay throttling térmico o de potencia:** Ejecuta `nvidia-smi -i 0 -q -d PERFORMANCE` bajo carga para ver si `SW Thermal Slowdown` o `HW Thermal Slowdown` pasan a `Active`.
6. **Prueba 2-3 valores compatibles si hace falta:** Compáralos usando la [prueba A/B](#10-cómo-probar-si-realmente-ayuda).
7. **Mantenlo solo si ayuda:** Si no ves un **GPU Delay** mediblemente más estable o audio más limpio, restablece los valores predeterminados.

---

## 7. Aplicar el Bloqueo de Reloj de GPU

Para bloquear el reloj del núcleo de la GPU, usa `-lgc min,max`.

> **Solo ejemplo ilustrativo:** En los comandos de abajo, `1800` MHz es **puramente un valor de demostración**. Sustituye `1800` por una frecuencia `Graphics` exacta de **tu propia** salida de `SUPPORTED_CLOCKS`.

**Bloquear a un único reloj compatible (min y max iguales):**

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

- **`-i 0`**: Índice de GPU destino `0`.
- **`-lgc`**: Lock Graphics Clocks.
- **`1800,1800`**: Reloj gráfico mínimo y máximo en MHz (deben separarse con coma, sin espacios).

**Ejemplo con un rango (min y max distintos):**

```bat
nvidia-smi -i 0 -lgc 1500,1800
```

Esto permite a NVIDIA GPU Boost moverse entre dos frecuencias compatibles (`1500` y `1800` MHz en este ejemplo ilustrativo) evitando que la tarjeta caiga a relojes de reposo profundo entre fragmentos de audio.

### Verificar si el bloqueo fue aceptado vs. observado realmente

Es importante distinguir entre:
- **Frecuencia solicitada:** El valor en MHz que pasaste a `-lgc`.
- **Rango configurado (`min,max`):** Los límites aceptados por el controlador (ten en cuenta que algunos controladores/dispositivos pueden ajustar al reloj compatible más cercano).
- **Frecuencia observada realmente:** El reloj real al que funciona tu GPU bajo carga.

Tras ejecutar `-lgc`, CMD solo confirma que el controlador aceptó la solicitud. La aceptación **no** garantiza que la GPU permanezca bloqueada en ese MHz exacto. Para comprobar el **reloj en vivo observado realmente** mientras Vonovox convierte audio, ejecuta:

```bat
nvidia-smi -i 0 -q -d CLOCK
```

O obsérvalo actualizarse cada segundo (pulsa `Ctrl + C` para detener):

```bat
nvidia-smi -i 0 -q -d CLOCK -l 1
```

Mira **Clocks → Graphics** en la salida. **Límites térmicos, límites de potencia y restricciones de controlador o firmware de portátil** pueden seguir impidiendo que la GPU mantenga el MHz exacto solicitado, y `-lgc` no siempre mantiene una frecuencia perfectamente fija bajo todas las condiciones.

---

## 8. Restaurar la Configuración Predeterminada

Restaura siempre la gestión dinámica de relojes cuando termines de probar, al cerrar Vonovox o si no ves beneficio (cambia `0` por el índice de GPU configurado si tienes varias GPUs):

```bat
nvidia-smi -i 0 -rgc
```

- **Qué hace:** `-rgc` (**Reset Graphics Clocks**) elimina el bloqueo de reloj y devuelve el control a NVIDIA GPU Boost.
- **Por qué restaurar valores predeterminados:** Los relojes dinámicos mantienen tu GPU más fresca, silenciosa y eficiente durante el uso normal de escritorio, reproducción de vídeo y juegos.
- **Cómo verificar la restauración:** Ejecuta `nvidia-smi -i 0 -q -d CLOCK` en reposo en el escritorio; tras unos segundos, el reloj **Graphics** debería bajar a velocidades bajas de reposo.
- **Reinicios de Windows y de controlador:** `nvidia-smi -lgc` **no es permanente**. Reiniciar Windows o reiniciar el controlador gráfico suele restablecer los relojes por defecto automáticamente.
- **Si `-rgc` devuelve un error:** No está garantizado que `-rgc` tenga éxito si el propio controlador NVIDIA está en estado de error. Asegúrate de ejecutar CMD **como administrador**, confirma que el índice `-i` coincide con `nvidia-smi -L` o **reinicia Windows** para restaurar relojes dinámicos.

---

## 9. Gestión de Reloj de GPU en un Clic (Scripts BAT)

Estos dos scripts `.bat` de Windows usan PowerShell integrado en Windows (no requiere software externo) para automatizar el flujo seguro anterior:

- **Qué hacen los scripts:** `Lock-GPU-Clocks.bat` bloquea temporalmente **solo** el reloj **Graphics** del núcleo de tu GPU NVIDIA hasta que lo restablezcas o reinicies. `Reset-GPU-Clocks.bat` quita ese bloqueo y devuelve el control a NVIDIA GPU Boost.
- **Sin cambios arriesgados:** Ningún script hace overclocking, toca voltajes, modifica límites de potencia, desactiva funciones de seguridad de Windows ni realiza cambios permanentes en el sistema.
- **Validación estricta de entrada y frecuencia:** `Lock-GPU-Clocks.bat` comprueba privilegios de administrador independientemente del servicio `Server` de Windows, verifica que tu índice de GPU elegido exista en `nvidia-smi -L`, analiza **solo** relojes `Graphics` de `SUPPORTED_CLOCKS` (ignorando relojes `Memory`), rechaza números arbitrarios o no verificados (como `50000`) y **nunca** autoselecciona el reloj máximo.
- **Manejo seguro de errores:** Si `-lgc` falla, el script **no** ejecuta `-rgc` automáticamente, muestra el código de salida de NVIDIA y te indica cómo inspeccionar tus relojes actuales antes de continuar. También usa telemetría estructurada `nvidia-smi --query-gpu=clocks.gr` para distinguir entre aceptación del controlador y reloj observado realmente.

### Lock-GPU-Clocks.bat

<details>
<summary><strong>Haz clic para expandir y ver el código completo de Lock-GPU-Clocks.bat</strong></summary>

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
<summary><strong>Haz clic para expandir y ver el código completo de Reset-GPU-Clocks.bat</strong></summary>

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

### Cómo crear y ejecutar los archivos `.bat` de forma segura

1. Abre el **Bloc de notas** (busca `notepad` en el menú Inicio).
2. Copia uno de los scripts completos de arriba y pégalo en el Bloc de notas.
3. Haz clic en **Archivo → Guardar como...**.
4. Abajo, cambia **Tipo** de `Documentos de texto (*.txt)` a **Todos los archivos (`*.*`)**.
5. Nombra el archivo `Lock-GPU-Clocks.bat` (o `Reset-GPU-Clocks.bat`) y guárdalo en una carpeta fácil de encontrar como tu Escritorio. *(Cambiar **Tipo** a **Todos los archivos** evita que Windows lo nombre por error `Lock-GPU-Clocks.bat.txt`.)*
6. Haz clic derecho sobre el archivo `.bat` guardado y selecciona **Ejecutar como administrador**.
7. Lee atentamente la salida:
   - `[ACCEPTED]` / `[DONE]` significa que `nvidia-smi` aceptó el comando y muestra el reloj Graphics **observado** justo después.
   - `[ERROR]` o `[STOPPED]` explica qué falló y confirma que no se aplicó ningún reloj sin verificar. Si tu GPU muestra `Not Supported` o no se puede analizar, omite esta optimización.

---

## 10. Cómo Probar si Realmente Ayuda

No des por hecho que bloquear el reloj ayudó solo porque ves un número en MHz más alto. Una frecuencia más alta **no** significa automáticamente mejor rendimiento de audio. Ejecuta una **comparación A/B** estructurada en tu propio PC:

- **Comprobación preliminar (opcional, 3-5 minutos):** Comprobación rápida para ver si el reloj bloqueado se mantiene fresco y no provoca fallos de audio.
- **Benchmark A/B completo (recomendado, al menos 10-15 minutos por pasada):**
  1. **Restaura los relojes predeterminados** (`nvidia-smi -i 0 -rgc`, cambiando `0` por tu índice de GPU).
  2. **Inicia Vonovox** y deja que tu sistema y carga en segundo plano se estabilicen durante un minuto.
  3. **Ejecuta la Prueba A (Relojes de GPU Predeterminados)** durante al menos **10-15 minutos** y anota todas las métricas de abajo.
  4. **Aplica un reloj Graphics verificado y compatible** (`Lock-GPU-Clocks.bat` o `-lgc`).
  5. **Ejecuta la Prueba B (Relojes de GPU Bloqueados)** durante al menos **10-15 minutos** bajo exactamente las mismas condiciones.
  6. **Compara Prueba A vs. Prueba B** usando la tabla de abajo.
  7. **Repite la prueba** si los resultados son muy cercanos o no concluyentes.
  8. **Restaura los relojes predeterminados** (`-rgc`) al terminar o siempre que no haya un beneficio claro.

**Mantén todo esto idéntico entre Prueba A y Prueba B:**

- Modelo de voz RVC
- F0 Method
- Block Size
- Dispositivos de audio de entrada, salida y monitorización
- Backend de audio (p. ej., WASAPI compartido / exclusivo)
- Cargas de GPU concurrentes (mismo juego abierto o mismo escritorio en reposo) y condiciones de funcionamiento

### Tabla comparativa rellenable

| Métrica a registrar | Prueba A: Relojes Predeterminados (10-15 min) | Prueba B: Relojes Bloqueados (10-15 min) |
| --- | --- | --- |
| **GPU Delay** promedio (ms) | `____ ms` | `____ ms` |
| Picos de **GPU Delay** (máximo visto) | `____ ms` | `____ ms` |
| Variabilidad del tiempo de procesamiento (estable vs. irregular) | `____________` | `____________` |
| Chasquidos / cortes de audio | `Sí / No (conteo)` | `Sí / No (conteo)` |
| Temperatura de GPU (°C) | `____ °C` | `____ °C` |
| Consumo de GPU (W) | `____ W` | `____ W` |
| Reloj Graphics observado realmente (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Estado de throttling (`-q -d PERFORMANCE`) | `Ninguno / Térmico / Potencia` | `Ninguno / Térmico / Potencia` |

### Cómo interpretar tus resultados

- **Mantenlo** solo si la Prueba B muestra un **GPU Delay** mediblemente más estable y menos fallos de audio *sin* sobrecalentamiento ni throttling.
- **Restaura los valores predeterminados (`nvidia-smi -i 0 -rgc`)** si la Prueba B se siente igual, se calienta más sin mejora real de audio o rinde peor.

---

## 11. Riesgos, Limitaciones y Precauciones

Bloquear dentro de los relojes compatibles de NVIDIA **no** es overclocking, pero sigue teniendo contrapartidas:

- **Temperaturas más altas y ruido de ventiladores:** Mantener relojes más altos en reposo o carga ligera genera calor extra y hace girar los ventiladores más rápido.
- **Mayor consumo eléctrico y menor batería en portátiles:** Un reloj gráfico bloqueado puede limitar o reducir la frecuencia con la que tu GPU entra en estados de reposo de bajo consumo, aumentando el consumo en reposo y agotando antes la batería.
- **Throttling térmico o de potencia:** Si un reloj bloqueado exige demasiado a tu refrigeración o presupuesto energético, la GPU se limitará igualmente, provocando a veces peores tirones.
- **Compatibilidad limitada y conflictos con herramientas de terceros:** Programas como MSI Afterburner, Armoury Crate o centros de control OEM de portátiles pueden sobrescribir o entrar en conflicto con ajustes de `nvidia-smi`.
- **No modifiques BIOS, voltajes ni protecciones térmicas:** Nunca flashees VBIOS personalizadas, desactives límites térmicos ni fuerces sobrevoltaje para conversión de voz.

---

## 12. Nota Avanzada: Bloqueo de Reloj de Memoria GPU (`-lmc`)

`nvidia-smi` también ofrece comandos de reloj de memoria:

```bat
nvidia-smi -i 0 -lmc <min,max>
nvidia-smi -i 0 -rmc
```

`-lmc` bloquea la **frecuencia de VRAM (memoria)**, mientras que `-lgc` bloquea la **frecuencia del núcleo GPU (gráficos)**. El bloqueo de reloj de memoria **no** forma parte del flujo estándar de Vonovox porque no hay pruebas suficientes de que bloquear relojes de VRAM mejore el rendimiento de audio RVC en vivo, y mantener la VRAM en relojes altos de forma continua aumenta el calor y el consumo en reposo.

---

## 13. Alternativas Cuando el Bloqueo de Reloj No Ayuda

Si `-lgc` devuelve `Not Supported` o no mejora tu audio, prueba estos pasos más seguros y a menudo más efectivos:

1. **Panel de control de NVIDIA → Modo de control de energía:** Configura **Modo de control de energía** en **Preferir rendimiento máximo** para el ejecutable de Vonovox (`Controlar la configuración 3D → Configuración de programa`). Nota: esto **no** es lo mismo que `-lgc` y no garantiza relojes fijos en todas las cargas CUDA, pero puede reducir caídas agresivas de reloj en algunos sistemas.
2. **Verifica que Vonovox usa tu GPU NVIDIA:** En portátiles con gráficos híbridos, asegúrate de que Vonovox se ejecute en la GPU NVIDIA y no en los gráficos integrados.
3. **Ajusta Block Size en Vonovox:** Subir **Block Size** un paso es la forma más fiable de eliminar chasquidos cuando la GPU está ocupada.
4. **Alinea formatos de audio a `48 kHz` y WASAPI:** Sigue [Enrutar y ajustar Vonovox](live-audio.md) para alinear frecuencias de muestreo y evitar monitorización duplicada.
5. **Reduce cargas de GPU competidoras:** Limita los FPS dentro de los juegos o baja ajustes pesados de GPU al usar Vonovox junto con juegos.
6. **Revisa controladores y refrigeración:** Actualiza a un controlador Studio/Game Ready limpio y limpia el polvo de las rejillas del portátil o PC si hay throttling térmico.

---

## 14. Solución de Problemas

| Síntoma | Causa posible | Solución recomendada |
| --- | --- | --- |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` no está en `PATH`. | Ejecuta `"C:\Windows\System32\nvidia-smi.exe"` o `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"`, o usa los scripts `.bat` de arriba. |
| NVIDIA no detecta GPU / `NVIDIA-SMI has failed` | No hay GPU NVIDIA, está deshabilitada o la GPU híbrida de portátil está dormida. | Revisa **Administrador de tareas → Rendimiento**, habilita el adaptador NVIDIA en Administrador de dispositivos y conecta el cargador del portátil. |
| `Insufficient Permissions` | CMD no se abrió como Administrador. | Haz clic derecho en **Símbolo del sistema** (o el archivo `.bat`) y elige **Ejecutar como administrador**. |
| `Not Supported` al ejecutar `-lgc` | La arquitectura de GPU, firmware de portátil o controlador no permite bloqueo de reloj. | Deja los relojes por defecto y usa las [Alternativas](#13-alternativas-cuando-el-bloqueo-de-reloj-no-ayuda). |
| `Invalid Argument` | Error de sintaxis o frecuencia fuera de relojes compatibles. | Ejecuta `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` e introduce un valor `Graphics` exacto con formato `min,max`. |
| El reloj mostrado no coincide con el MHz pedido | Límite de potencia, límite térmico o restricción del controlador limita la GPU. | Prueba un reloj compatible algo menor o revisa `nvidia-smi -i 0 -q -d PERFORMANCE`. |
| El reloj cae bajo carga | Throttling térmico o límite de potencia del portátil alcanzado. | Baja el reloj bloqueado, mejora la refrigeración o restaura valores predeterminados con `-rgc`. |
| Las temperaturas suben demasiado | Reloj alto bloqueado de forma continua sin refrigeración adecuada. | Ejecuta `nvidia-smi -i 0 -rgc` de inmediato y usa un reloj menor o valores dinámicos predeterminados. |
| Vonovox no muestra mejora | El cuello de botella es Block Size, CPU, WASAPI o saturación general de GPU, no el escalado de reloj. | Ejecuta `nvidia-smi -i 0 -rgc` y ajusta **Block Size** y el enrutamiento de audio en [Enrutar y ajustar Vonovox](live-audio.md). |
| Vonovox empeora tras bloquear | El reloj bloqueado es demasiado bajo para la carga o demasiado alto (provocando throttling térmico). | Ejecuta `nvidia-smi -i 0 -rgc` para restaurar relojes dinámicos, luego prueba otro valor compatible o quédate en valores predeterminados. |
| La GPU se comporta distinto con un juego abierto | El juego consume la mayor parte del presupuesto de cómputo/potencia de la GPU. | Limita los FPS del juego, baja ajustes pesados de GPU o sube **Block Size** en Vonovox. |
| El comando de reinicio (`-rgc`) falla | Faltan permisos de administrador, índice `-i` incorrecto o fallo del controlador. | Ejecuta CMD como administrador con el índice `-i` correcto, o reinicia Windows. |
| No estás seguro de qué MHz elegir | Aún no has comprobado los relojes base bajo carga. | Ejecuta `nvidia-smi -i 0 -q -d CLOCK` usando Vonovox normalmente, y elige un valor compatible cercano a ese rango. |
| El portátil limita los relojes automáticamente | Perfil de energía OEM / batería / límite de firmware del portátil. | Conecta el cargador, usa el modo OEM Equilibrado/Rendimiento o ajusta **Block Size** en lugar de usar `-lgc`. |

---

## 15. Preguntas Frecuentes (FAQ)

1. **¿Es seguro GPU Clock Locking?**
   Sí, siempre que uses únicamente frecuencias oficiales de `SUPPORTED_CLOCKS` y vigiles las temperaturas. No cambia voltajes ni omite protecciones térmicas de hardware.
2. **¿Esto es overclocking?**
   No. El overclocking fuerza el hardware más allá de los límites de fábrica. El bloqueo de reloj solo selecciona frecuencias ya definidas por NVIDIA en la tabla compatible de tu tarjeta.
3. **¿Aumentará mis FPS en juegos?**
   Normalmente no, y no está pensado para eso. Si un reloj bloqueado es menor que tu reloj boost normal, los FPS en juegos pueden incluso bajar ligeramente.
4. **¿Mejorará la calidad de voz de Vonovox?**
   No. La calidad de voz depende de tu modelo, micrófono, extractor de tono/F0 y enrutamiento de audio, no del bloqueo de reloj de la GPU.
5. **¿Reducirá la latencia?**
   No reduce la latencia mínima por debajo de lo que tu GPU ya puede calcular, aunque puede reducir **picos repentinos de latencia** causados por cambios de reloj en algunas configuraciones.
6. **¿Funciona en portátiles?**
   A veces, pero muchos portátiles restringen `-lgc` en firmware o alcanzan rápido límites térmicos o de potencia. Mantén siempre el portátil conectado a la corriente al probar.
7. **¿Funciona en todas las GPUs NVIDIA?**
   No. La compatibilidad depende de la generación de GPU, firmware de placa/portátil y versión del controlador.
8. **¿Debo elegir siempre el reloj máximo?**
   No. Los relojes máximos generan máximo calor y ruido y pueden activar thermal throttling. Relojes compatibles moderados suelen ser más estables.
9. **¿Puedo usar `50000` MHz?**
   No. Nunca introduzcas números arbitrarios. Valores fuera de rango pueden fallar con `Invalid Argument` y no garantizan un ajuste seguro.
10. **¿Funciona con GPUs RTX?**
    Muchas tarjetas RTX de escritorio admiten `-lgc` en controladores modernos, mientras que algunos portátiles o configuraciones específicas pueden devolver `Not Supported`. Prueba primero con `SUPPORTED_CLOCKS`.
11. **¿Tengo que aplicarlo cada vez?**
    Sí, si decides seguir usándolo, porque los bloqueos de reloj de `nvidia-smi` se restablecen al reiniciar el PC o el controlador.
12. **¿Sobreviven los ajustes a un reinicio?**
    No. Reiniciar Windows limpia automáticamente `-lgc` y devuelve tu GPU a sus relojes dinámicos normales.
13. **¿Puedo usar Vonovox mientras juego?**
    Sí, siempre que tu GPU tenga margen suficiente para ambos. Si el juego alcanza 95-100% de carga de GPU, limita los FPS o sube **Block Size** en Vonovox.
14. **¿Qué pasa si mi GPU se sobrecalienta?**
    La protección térmica por hardware de NVIDIA reducirá automáticamente la velocidad de la tarjeta (o la apagará en casos extremos). Si las temperaturas suben demasiado, ejecuta `nvidia-smi -i 0 -rgc` de inmediato.
15. **¿Cómo restauro todo a la normalidad?**
    Ejecuta `nvidia-smi -i 0 -rgc` como Administrador, ejecuta `Reset-GPU-Clocks.bat` o reinicia Windows.
16. **¿Debo bloquear también el reloj de VRAM (`-lmc`)?**
    No. No hay pruebas sólidas de que bloquear relojes de memoria ayude a Vonovox, y aumenta el calor y el consumo en reposo.
17. **¿Qué debo hacer si veo `Not Supported`?**
    Omite GPU Clock Locking por completo y usa las [Alternativas](#13-alternativas-cuando-el-bloqueo-de-reloj-no-ayuda) más seguras, como ajustar **Block Size** y los ajustes de energía del Panel de control de NVIDIA.

---

## 16. Referencias Oficiales

- [Documentación de NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [Referencia de API NVIDIA NVML: Comandos de Dispositivo](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [Buenas Prácticas de Benchmarking y Bloqueo de Relojes de NVIDIA TensorRT](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Repositorio del Proyecto Vonovox](https://github.com/dr87/Vonovox)
