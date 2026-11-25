---
label: "🏠 Inicio"
order: 100
---
# Documentación de Ilaria RVC

<div class="docs-welcome" data-author-note="ilaria">

**Una nota de Ilaria antes de empezar**

Hola, soy Ilaria. Escribí estas guías para compartir lo que he aprendido al desarrollar Ilaria RVC, entrenar modelos de voz y probar otras herramientas. Las explicaciones se basan en mi experiencia y en lo que sé en el momento de escribirlas. Puedo interpretar mal un ajuste, pasar por alto una excepción o describir un paso que cambie en una versión posterior.

Los mismos pasos pueden dar resultados distintos en otro ordenador. Una actualización puede mover un botón, una función puede depender de la GPU o del controlador y un ajuste que funciona con una voz puede empeorar otra. Usa los valores sugeridos como punto de partida. Prueba con un fragmento corto y cambia un ajuste cada vez. Guarda una copia antes de sustituir archivos o actualizar una instalación que funciona.

Si algo no coincide con lo que ves, comprueba el nombre y la versión del programa y el mensaje exacto de error. Consulta las notas de esa versión. Si encuentras un error en la guía, indícame la página, el paso, la versión y qué ocurrió para que pueda repetir la prueba y corregirlo.

<div style="border-left:4px solid #FFC0CB;padding:.75rem 1rem;margin:1rem 0;background:#ffc0cb12;border-radius:.3rem">

Si tienes algún problema, sugerencia o actualización, escríbeme por Discord.

[**Discord · thestingerx**](https://discord.com/users/740255187234717838)

</div>

&#45; Ilaria

</div>

<div class="docs-welcome">

**Ilaria RVC** es una aplicación de Windows para convertir grabaciones y entrenar modelos de voz. Su interfaz se abre en un navegador y el motor de conversión se ejecuta en su computadora. El paquete de Windows está diseñado para GPU NVIDIA.

Si tu ordenador no tiene una GPU NVIDIA adecuada, puedes usar Ilaria RVC en Kaggle. En la configuración del cuaderno, activa el acceso a Internet y selecciona un acelerador de GPU. Elige GPU T4 ×2 si está disponible. La GPU NVIDIA de Kaggle se encarga de la conversión de voz y del entrenamiento de modelos. La [guía de Ilaria RVC en Kaggle](ilaria-rvc/cloud/kaggle.md) explica cómo configurar el cuaderno y guardar los resultados antes de que termine la sesión.

> **Versión actual** · **[Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)** · El paquete completo para Windows es la versión 2.4.7. Para actualizar desde 2.4.2–2.5.0, usa **Other → Update Ilaria RVC → Check for updates → Download and restart**. El ZIP de actualización excluye el entorno de ejecución y los pesos. [ZIP de actualización para Windows](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.5.1/ILARIA_RVC-update-2.5.1.zip?download=true)

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true) · [Explorar demostraciones de voz](https://ilariarvc.shop/en/demos/) · [Leer el registro de cambios](ilaria-rvc/install/version-history.md)

</div>

## Comience con su configuración

### Windows con una GPU NVIDIA

Verifique su modelo exacto en [Compatibilidad de GPU](ilaria-rvc/install/gpu-compatibility.md), luego siga [Instalación y actualizaciones](ilaria-rvc/install/installation.md). Cuando se abra la aplicación, utilice un WAV breve y limpio y un modelo de inferencia en [Inferencia única](ilaria-rvc/convert/inference.md). El índice coincidente es opcional. Guarde la primera salida para tener una referencia antes de cambiar los efectos o el tono.

### Una computadora sin una GPU adecuada

Utilice el [tutorial de Kaggle](ilaria-rvc/cloud/kaggle.md) para ejecutar Ilaria RVC en una GPU remota. Cubre el inicio del portátil, el acceso a la interfaz, la ejecución de una prueba y la descarga de resultados antes de que finalice la sesión.

## Elija el flujo de trabajo correcto

- **Tengo una grabación y quiero una voz diferente.** Utilice [Controles de inferencia](ilaria-rvc/convert/inference-buttons.md) para elegir un modelo, convertir el archivo y buscar el audio exportado.
- **Tengo texto y quiero audio hablado.** Comience con [Texto a voz](ilaria-rvc/convert/speech.md). Escuche la voz de origen antes de aplicar un modelo RVC para poder corregir la pronunciación con antelación.
- **Quiero crear mi propio modelo de voz.** Prepare las grabaciones que tenga permiso para usar, guarde un clip corto a un lado para probarlo y luego siga el [Capacitación paso a paso](ilaria-rvc/train/training-workflow.md). Utilice la [Referencia de controles de entrenamiento](ilaria-rvc/train/training-buttons.md) cuando necesite comprender una configuración.
- **Quiero usar un micrófono convertido en una llamada o juego.** Elija una aplicación en [Otros RVC](other-rvcs/app-guides.md), luego siga [enrutamiento de audio en vivo](conversion/real-time.md) para probar el micrófono, el convertidor y el destino en ese orden.

## Cuando algo sale mal

Si la aplicación no se inicia, mantenga el registro abierto y busque el primer error. Si la aplicación se inicia pero el audio suena mal, compare el mismo clip corto con el procesamiento opcional desactivado. La [guía de solución de problemas](reference/troubleshooting.md) agrupa las soluciones por síntoma. El [glosario](reference/glossary.md) explica términos como punto de control, incrustador e índice, y [Otros controles](ilaria-rvc/manage/other-buttons.md) muestra cómo inspeccionar, importar y exportar modelos.

 | Quiero… | Comenzar aquí |
| --- | --- |
 | Explorar la aplicación Ilaria RVC en detalle | [Descripción general de la aplicación](ilaria-rvc/overview.md), [instalación](ilaria-rvc/install/installation.md), [inferencia](ilaria-rvc/convert/inference.md) y [flujo de trabajo de entrenamiento](ilaria-rvc/train/training-workflow.md) |
 | Instalar la aplicación y convertir mi primer clip | [Cómo comenzar](start/getting-started.md) |
 | Comprender cómo funciona RVC | [Fundamentos de RVC](start/rvc-fundamentals.md) y [modelos y archivos](start/models.md) |
 | Convertir audio, comparar configuraciones o procesar una carpeta | [Conversión de voz](conversion/voice-conversion.md) y [calidad de audio](conversion/audio-quality.md) |
 | Generar una fuente hablada a partir de texto | [Texto a voz](conversion/text-to-speech.md) |
 | Convertir una señal de micrófono en vivo | [Conversión de voz en tiempo real](conversion/real-time.md) |
 | Grabar un conjunto de datos y entrenar mi propio modelo | [Preparación del conjunto de datos](model-training/dataset-preparation.md) y [entrenamiento](model-training/training.md) |
 | Separar una voz o terminar un proyecto musical | [Tablas y mezclando](conversion/stems-and-mixing.md) |
 | Compara Ilaria RVC, Vonovox, Applio y más | [Herramientas RVC](reference/tools.md) |
 | Corregir un error o recuperar una instalación | [Solución de problemas](reference/troubleshooting.md) |

Utilice la navegación para encontrar guías de configuración, conversión, capacitación y solución de problemas para Ilaria RVC y otras aplicaciones RVC.


---

## La documentación en cifras

- **Páginas totales:** **118** páginas (`117` guías + Inicio)
- **Total de páginas en los 6 idiomas (`en`, `it`, `es`, `fr`, `de`, `pt`):** **708** páginas (`118 x 6`)

## Algunas curiosidades sobre el sitio e Ilaria

- **Nacido de la experiencia real:** Ilaria (`TheStingerX` / `thestingerx` en Discord) escribió y amplió estas guías directamente mientras desarrollaba **Ilaria RVC**, entrenaba modelos de voz (como *Itaila*) y probaba entornos reales en Windows, Kaggle, Google Colab y Lightning AI.
- **De la `1.1 Beta` a la `2.4.7`:** Ilaria RVC empezó como una interfaz personalizada para Windows y evolucionó hasta soportar **NVIDIA RTX serie 50 (Blackwell)** con CUDA 12.8, **entrenamiento nativo en BF16**, **Kokoro v1.0 TTS**, conversión **Safetensors ↔ PTH** y catálogos integrados.
- **Mucho más que una app:** Con el tiempo, **Ilaria Docs** creció hasta cubrir **11 aplicaciones y forks de RVC** (Ilaria RVC, Applio, Mainline, Okada, TGR, Deiteris, Vonovox, RedPanda, RVC Blue, RVC-GUI y RVC Model Merger) además de herramientas **Non-RVC** como **YuneVoix**, **Causal Voice Changer**, **UVR5** y **MVSep**.
- **Sincronizado en 6 idiomas:** Cada página del sitio se mantiene 1:1 en inglés, italiano, español, francés, alemán y portugués.
