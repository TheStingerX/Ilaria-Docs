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

[Instala Vonovox](vonovox/installation.md) · [Configura Vonovox](vonovox/live-audio.md) · [Instala Okada TG Developed Fork](tgr/installation.md) · [Configura TGR](tgr/live-audio.md)

## Otras tareas con Applio o Redpanda-vc

Applio reúne la síntesis de voz y la gestión de modelos. Redpanda-vc permite comparar RVC, Beatrice y Rectified Flow y probar el directo en el navegador o en el escritorio. Elige el motor RVC para un modelo RVC.

[Instala Applio](applio/installation.md) · [Síntesis de voz en Applio](applio/tts.md) · [Modelos en Applio](applio/models.md) · [Configura Redpanda-vc](redpanda/first-run.md) · [Directo en Redpanda-vc](redpanda/live-audio.md)

## Guarda una prueba de referencia

Compara archivos con la misma fuente y el mismo volumen. Para el directo, graba una prueba en la aplicación de destino. Si el problema solo aparece allí, revisa el cable virtual, el micrófono seleccionado y la monitorización.

## Otras aplicaciones y compatibilidad

| Aplicación | Training | Inferencia (archivos) | Realtime | Enlaces del proyecto |
| --- | --- | --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Sí | Sí | Sí · Heredado de RVC WebUI (Mainline - Original RVC), sin futuras actualizaciones | [GitHub](https://github.com/TheStingerX/Ilaria-RVC) · [Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC) |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Sí | Sí | Sí · Iniciador independiente | [GitHub](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI) · [Hugging Face](https://huggingface.co/lj1995/VoiceConversionWebUI) |
| [Applio](../other-rvcs/applio/installation.md) | Sí | Sí | Sí | [GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio) |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Sí | Sí | Sí | [GitHub](https://github.com/redpanda343/Redpanda-vc) |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | No | Sí | No | [GitHub](https://github.com/Tiger14n/RVC-GUI) |
| [Vonovox](../other-rvcs/vonovox/installation.md) | No | No | Sí | [GitHub](https://github.com/dr87/Vonovox) · [Hugging Face](https://huggingface.co/dr87/vonovox) |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | No | No | Sí | [GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000) |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | No | No | Sí | [GitHub](https://github.com/tg-develop/voice-changer) |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | No | Archivos en tiempo real | Sí | [GitHub](https://github.com/niel-blue/RVC-Realtime-GUI) · [Hugging Face](https://huggingface.co/niel-blue/RVC-Realtime-GUI) |
| [Replay](../reference/tools.md#replay) | Sí | Sí · versión antigua | No | [Sitio oficial](https://www.weights.com/replay) · [Internet Archive](https://archive.org/details/replay-8.7.0-installers) |

 | Aplicación | Cuándo usarla | Hardware y notas de compilación |
| --- | --- | --- |
| [Ilaria RVC](../ilaria-rvc/install/installation.md) | Conversión de archivos, TTS, entrenamiento y análisis de audio | La distribución actual de Windows es solo NVIDIA. |
| [RVC WebUI (Mainline - Original RVC)](../other-rvcs/mainline/installation.md) | Entrenamiento e inferencia ascendentes, con un iniciador en tiempo real independiente | NVIDIA CUDA en Windows y Ubuntu. La configuración de CPU ascendente cubre sistemas AMD e Intel, con posible uso de DirectML en Windows. |
| [Applio](../other-rvcs/applio/installation.md) | Conversión de archivos, capacitación y tiempo real en una sola aplicación | La documentación de escritorio enumera NVIDIA CUDA, configuraciones AMD compatibles y Apple MPS. La disponibilidad depende de la edición y el motor. |
| [Redpanda-vc](../other-rvcs/redpanda/first-run.md) | Una fork de Applio para experimentar con múltiples motores de conversión de voz | El repositorio incluye un contenedor CUDA y documenta la selección de GPU para transmisiones WebUI. Verifique el motor seleccionado y constrúyalo para otros backends. |
| [RVC GUI](../other-rvcs/rvc-gui/file-conversion.md) | Conversión simple de archivos locales en la interfaz de escritorio heredada | Archivado. El proyecto documenta Windows NVIDIA CUDA y una solución histórica de Apple Silicon. |
| [Vonovox](../other-rvcs/vonovox/installation.md) | Recomendado para RVC v2 en vivo en Windows con NVIDIA | Solo NVIDIA CUDA. Haga coincidir el paquete Hugging Face con su generación de GPU. |
| [w-okada VCClient](../other-rvcs/okada/installation.md) | Conversión en vivo en varios sistemas operativos | Windows CUDA y paquetes estándar, incluidos DirectML o CPU, cuando sean compatibles. Separe las rutas de configuración de Apple Silicon y Linux. |
| [Okada TG Developed Fork](../other-rvcs/tgr/installation.md) | Live RVC con opciones documentadas para usuarios de AMD, Intel y CPU | Windows CUDA o DirectML. Las compilaciones de Linux y macOS experimentales tienen instrucciones separadas. |
| [RVC Blue](../other-rvcs/rvc-blue/installation.md) | Conversión de voz en tiempo real en Windows | NVIDIA CUDA 12.8 / 11.8 (Windows) |
| [Replay](../reference/tools.md#replay) | Entrenamiento de modelos y conversión de archivos · no recomendado | [Instaladores archivados](https://archive.org/details/replay-8.7.0-installers) |

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Compara todas las aplicaciones](../reference/tools.md)
