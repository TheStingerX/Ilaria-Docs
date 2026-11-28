# Guías paso a paso por aplicación

<div role="group" aria-label="¿Qué quieres hacer?" style="margin:1.4rem 0 2rem;padding:1rem;border:1px solid #db78a888;border-radius:1rem;background:#db78a810">
  <p style="margin:0 0 .85rem;text-align:center;font-weight:700">¿Qué quieres hacer?</p>
  <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,13rem),1fr));gap:.65rem">
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Entrenamiento o conversión de archivos</strong><br><span aria-hidden="true">↓</span> <a href="../installation/">Ilaria RVC</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Micrófono en directo</strong><br>NVIDIA <span aria-hidden="true">→</span> <a href="../vonovox/installation/">Vonovox</a><br>AMD / Intel <span aria-hidden="true">→</span> <a href="../tgr/installation/">Okada TG Developed Fork</a></div>
    <div style="padding:.8rem;border:1px solid #db78a866;border-radius:.65rem"><strong>Otras tareas</strong><br><span aria-hidden="true">↓</span> <a href="../applio/installation/">Applio</a> · <a href="../redpanda/first-run/">Redpanda-vc</a></div>
  </div>
</div>

## Elige según la tarea y la GPU

Usa **Ilaria RVC** para entrenar modelos y convertir grabaciones. Para el micrófono en directo en Windows, elige **Vonovox** con NVIDIA u **Okada TG Developed Fork** con AMD o Intel compatible. Para otras tareas, empieza por **Applio** o **Redpanda-vc**.

[Instala Ilaria RVC](../ilaria-rvc/install/installation.md) · [GPU compatibles](../ilaria-rvc/install/gpu-compatibility.md) · [Usa Kaggle](../ilaria-rvc/cloud/kaggle.md)

## Entrena un modelo con Ilaria RVC

Prepara grabaciones limpias de una sola persona. Preprocesa los archivos, extrae características e inicia el entrenamiento. Compara varios checkpoints con audios reservados para las pruebas. Si generas un índice, guárdalo con su modelo.

[Prepara el conjunto de datos](../ilaria-rvc/train/datasets.md) · [Proceso de entrenamiento](../ilaria-rvc/train/training-workflow.md) · [Controles de entrenamiento](../ilaria-rvc/train/training-controls.md)

## Convierte archivos con Ilaria RVC

Importa un `.pth` de inferencia y añade su `.index` si lo tienes. Convierte un WAV corto sin efectos. Guarda el resultado de referencia, cambia un ajuste cada vez y prueba varios clips antes de convertir por lotes. Usa Kaggle para entrenar o convertir si no tienes una GPU local adecuada.

[Inferencia individual y por lotes](../ilaria-rvc/convert/inference.md) · [Controles de inferencia](../ilaria-rvc/convert/inference-buttons.md)

## Convierte el micrófono en directo

Con NVIDIA, elige el paquete de Vonovox para tu GPU. Con AMD o Intel, prueba la versión DirectML de TGR si tu tarjeta es compatible. Escucha el resultado con auriculares antes de enviarlo a un cable virtual. Selecciona el extremo de grabación de ese cable como micrófono en Discord, OBS o tu juego. Si hay cortes, aumenta el búfer.

[Instala Vonovox](voice-changers/vonovox/installation.md) · [Configura Vonovox](voice-changers/vonovox/live-audio.md) · [Instala Okada TG Developed Fork](voice-changers/tgr/installation.md) · [Configura TGR](voice-changers/tgr/live-audio.md)

## Otras tareas con Applio o Redpanda-vc

Elige Applio para la síntesis de voz y la gestión de modelos. Redpanda VC ofrece entrenamiento, inferencia con archivos y conversión en tiempo real para RVC y Causal Voice Changer, en el escritorio y en la WebUI. Usa `.pth` con RVC y `.cvc` con CVC.

[Instala Applio](training/applio/installation.md) · [Síntesis de voz en Applio](training/applio/tts.md) · [Modelos en Applio](training/applio/models.md) · [Configura Redpanda-vc](training/redpanda/first-run.md) · [Directo en Redpanda-vc](training/redpanda/live-audio.md)

## Guarda una prueba de referencia

Compara archivos con la misma fuente y el mismo volumen. Para el directo, graba una prueba en la aplicación de destino. Si el problema solo aparece allí, revisa el cable virtual, el micrófono seleccionado y la monitorización.

## Entrenamiento e inferencia

| Aplicación | Capacidades | Hardware / notas | Guías |
| --- | --- | --- | --- |
| **Ilaria RVC** | Entrenamiento, inferencia individual/por lotes, TTS, analizador de audio | NVIDIA CUDA (Windows) · [AMD Preview](../ilaria-rvc/install/amd-preview.md) · Kaggle | [Instalación](../ilaria-rvc/install/installation.md) · [Inferencia](../ilaria-rvc/convert/inference.md) · [Entrenamiento](../ilaria-rvc/train/training-workflow.md) |
| **Applio** | Entrenamiento, inferencia de archivos, TTS, biblioteca de modelos, tiempo real | NVIDIA CUDA, AMD ROCm, Apple MPS | [Instalación](training/applio/installation.md) · [Inferencia](training/applio/inference.md) · [Entrenamiento](training/applio/training.md) · [Android / Termux](training/applio/android.md) |
| **RVC WebUI (Mainline - Original RVC)** | Entrenamiento e inferencia de archivos oficial (+ lanzador en vivo separado) | NVIDIA CUDA, CPU / DirectML | [Instalación](training/mainline/installation.md) · [Inferencia](training/mainline/inference.md) · [Entrenamiento](training/mainline/training.md) |
| **Redpanda-vc** | Entrenamiento, inferencia de archivos y tiempo real para RVC + Causal Voice Changer | NVIDIA CUDA / CPU (Desktop y WebUI) | [Primer inicio](training/redpanda/first-run.md) · [Inferencia](training/redpanda/inference.md) · [Entrenamiento](training/redpanda/training.md) |
| **AICoverMaker** | Fork de Applio para versiones musicales, separación y conversión | — | [Instalación (EN)](https://docs.ilariarvc.shop/ilaria-rvc/aicovermaker/installation/) · [Primera conversión (EN)](https://docs.ilariarvc.shop/ilaria-rvc/aicovermaker/usage/) |
| **NoRegretsRVC** | Configuración de flujos Applio para entrenamiento e inferencia | Beta 0.1.0 · Interfaz local y entorno Applio en Kaggle | [Instalación](training/noregretsrvc/installation.md) · [Uso](training/noregretsrvc/usage.md) · [Cloud](training/noregretsrvc/cloud.md) · [Historial de versiones](training/noregretsrvc/version-history.md) |
| **RVC Model Merger** | Herramienta de fusión para modelos RVC `.pth` | Utilidad sin conexión | [Uso](rvc-model-merger/usage.md) |

### Obsoletas / No recomendadas

!!!warning Software antiguo · No recomendado
Estos proyectos están desactualizados, archivados o sin mantenimiento activo. Las guías se conservan para proyectos existentes. Para una nueva instalación, elige una aplicación mantenida de arriba.
!!!

| Aplicación | Capacidades | Estado / notas | Guías |
| --- | --- | --- | --- |
| **rvc-cli** | Inferencia de archivos/lotes y entrenamiento (CLI) | Archivado | [Instalación](training/rvc-cli/installation.md) · [Uso](training/rvc-cli/usage.md) |
| **RVC Studio** | Entrenamiento e inferencia de archivos (WebUI) | Inactivo | [Instalación](training/rvc-studio/installation.md) · [Uso](training/rvc-studio/usage.md) |
| **Mangio RVC Fork** | Entrenamiento e inferencia de archivos | Inactivo | [Instalación](training/mangio/installation.md) · [Uso](training/mangio/usage.md) |
| **Replay** | Entrenamiento y conversión de archivos | Descontinuado (Weights.gg cerrado) | [Instalación](training/replay/installation.md) · [Uso](training/replay/usage.md) |
| **AICoverGen** | Pipeline RVC v2 para covers musicales (solo inferencia, WebUI / CLI / Colab) | Sin mantenimiento | [Instalación](training/aicovergen/installation.md) · [Uso](training/aicovergen/usage.md) |
| **RVC GUI** | Solo conversión de archivos en escritorio | Archivado | [Conversión de archivos](voice-changers/rvc-gui/file-conversion.md) |

## Cambiadores de voz (tiempo real)

| Aplicación | Motor / enfoque | Hardware / notas | Guías |
| --- | --- | --- | --- |
| **Vonovox** | RVC v2 en tiempo real (recomendado en Windows NVIDIA) | NVIDIA CUDA | [Instalación](voice-changers/vonovox/installation.md) · [Audio en directo](voice-changers/vonovox/live-audio.md) · [Rendimiento](voice-changers/vonovox/advanced-performance-optimization.md) |
| **w-okada VCClient** | RVC en tiempo real multiplataforma (cliente/servidor) | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Instalación](voice-changers/okada/installation.md) · [Audio en directo](voice-changers/okada/live-audio.md) |
| **Okada TG Developed Fork (TGR)** | Fork activo de la comunidad para RVC en tiempo real | NVIDIA CUDA, DirectML (AMD/Intel), CPU, Linux, macOS exp. | [Instalación](voice-changers/tgr/installation.md) · [Audio en directo](voice-changers/tgr/live-audio.md) · [Cloud](voice-changers/tgr/cloud.md) |
| **Deiteris w-okada Fork** | Fork w-okada en tiempo real | NVIDIA CUDA, DirectML, Apple MPS, CPU | [Instalación](voice-changers/deiteris/installation.md) · [Audio en directo](voice-changers/deiteris/live-audio.md) · [Cloud](voice-changers/deiteris/cloud.md) |
| **RVC Blue** | App de escritorio Windows en tiempo real y conversión de archivos en tiempo real | NVIDIA CUDA 12.8 / 11.8 | [Instalación](voice-changers/rvc-blue/installation.md) |

Aplicaciones RVC multimodo con soporte en vivo integrado: **Applio** ([Tiempo real](training/applio/realtime.md)), **Redpanda-vc** ([Modos en directo](training/redpanda/live-audio.md)) y **RVC WebUI (Mainline)** ([Tiempo real](training/mainline/realtime.md)).

### Cambiadores de voz Non-RVC en tiempo real

| Aplicación | Capacidades | Guías |
| --- | --- | --- |
| **Causal Voice Changer** | Cambiador de voz Non-RVC en tiempo real y baja latencia (modelos `.cvc`) | [Resumen](../non-rvc/voice-changers/causal-voice-changer/overview.md) · [Instalación](../non-rvc/voice-changers/causal-voice-changer/installation.md) · [Tiempo real](../non-rvc/voice-changers/causal-voice-changer/realtime.md) |
| **YuneVoix** | Cambiador de voz Non-RVC en tiempo real, song cover y karaoke | [Resumen](../non-rvc/voice-changers/yunevoix/overview.md) · [Instalación](../non-rvc/voice-changers/yunevoix/installation.md) · [Uso](../non-rvc/voice-changers/yunevoix/usage.md) |

[Compara todas las aplicaciones](../reference/tools.md)
