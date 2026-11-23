---
label: "Guías por aplicación"
icon: ":books:"
order: 80
permalink: /ilaria-rvc/app-guides/
description: "Usa Ilaria RVC para entrenar modelos y convertir grabaciones."
---
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

Elige Applio para la síntesis de voz y la gestión de modelos. Redpanda VC ofrece entrenamiento, inferencia con archivos y conversión en tiempo real para RVC y Causal Voice Changer, en el escritorio y en la WebUI. Usa `.pth` con RVC y `.cvc` con CVC.

[Instala Applio](applio/installation.md) · [Síntesis de voz en Applio](applio/tts.md) · [Modelos en Applio](applio/models.md) · [Configura Redpanda-vc](redpanda/first-run.md) · [Directo en Redpanda-vc](redpanda/live-audio.md)

## Guarda una prueba de referencia

Compara archivos con la misma fuente y el mismo volumen. Para el directo, graba una prueba en la aplicación de destino. Si el problema solo aparece allí, revisa el cable virtual, el micrófono seleccionado y la monitorización.

## Otras aplicaciones y compatibilidad

{{ include "../reference/tools.md#app-comparison" }}

- [RVC WebUI (Mainline - Original RVC)](mainline/installation.md) · [w-okada VCClient](okada/installation.md) · [RVC GUI](rvc-gui/file-conversion.md) · [RVC Blue](rvc-blue/installation.md)
- [Compara todas las aplicaciones](../reference/tools.md)
