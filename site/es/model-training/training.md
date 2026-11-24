# Entrenar un modelo de voz RVC

[Descargar Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

El entrenamiento aprende una voz de destino a partir de una colección preparada de audio. Usa esta guía cuando quieras construir un modelo a partir de grabaciones propias o autorizadas. Si ya tienes un modelo de inferencia, consulta [Modelos y archivos RVC](../start/models.md) para empezar a usarlo.

## Planifica tu primera ejecución

Prepara el audio con la [guía del dataset](dataset-preparation.md) y luego selecciónalo en **Training**. Dale al experimento un nombre único y elige una grabación corta fuera del conjunto de entrenamiento para pruebas de escucha. Empieza con una ejecución modesta que pueda completar todas las etapas y producir una exportación utilizable. Esto te da una base para cambios en datos o ajustes.

Anota la versión de la aplicación, revisión del dataset, formato y frecuencia de muestreo del modelo, embedder, método de tono, par preentrenado, batch size e intervalo de guardado previsto. Añade el nombre del clip de prueba apartado. Si una ejecución posterior suena distinta, estas notas ayudan a identificar qué cambió.

## Elige configuraciones compatibles

| Ajuste | Qué comprobar |
| --- | --- |
| Formato de modelo, vocoder y sample rate | Elige una combinación compatible con la app y el cliente de reproducción previsto. Una arquitectura específica de un fork puede limitar dónde carga tu modelo. |
| Guía y extracción de tono | La guía de tono es útil para modelar material dependiente de la afinación, especialmente canto. Elige un extractor disponible para entrenar en tu compilación. |
| Embedder | Define la representación extraída del audio. Anota la elección para poder usar la representación correspondiente en clientes de inferencia compatibles. |
| Generador y discriminador preentrenados | Usa un par emparejado compatible con la arquitectura, frecuencia y configuración de tono elegidas. Los archivos generator y discriminator cumplen roles distintos en el entrenamiento. |
| Batch size | Controla cuántos datos se procesan por actualización. Empieza con un valor que quepa en tu GPU y bájalo si el entrenamiento se queda sin memoria. |
| Objetivo e intervalo de checkpoints | Una época es aproximadamente una pasada completa por el dataset preparado. Los pasos son actualizaciones individuales de entrenamiento. Guarda periódicamente para comparar exportaciones y recuperarte tras una interrupción. |

RefineGAN admite entrenamiento e inferencia a 32, 40 y 44,1 kHz con RVC v2 y Pitch Guidance.

### Consejos prácticos de entrenamiento

- **Épocas:** Prueba una primera ejecución comparativa con un objetivo de unas 200 épocas y escucha varios guardados anteriores. Es un punto de partida para audicionar, ya que el mejor checkpoint puede llegar antes o después. Una ejecución de 1,000 épocas no garantiza calidad.
- **Batch y precisión:** Empieza con un batch moderado, por ejemplo 8, y considera 16 un límite inicial prudente. Redúcelo si falta memoria. La precisión mixta FP16 puede reducir el uso de VRAM y acelerar el entrenamiento en hardware compatible. Comprueba si tu compilación ya la activa y prueba FP32 si la precisión mixta produce pérdidas no finitas.
- **TensorBoard:** Usa métricas para seguir el progreso y detectar ejecuciones estancadas o inestables. Las curvas de pérdida por sí solas no indican qué checkpoint suena mejor. Compara conversiones de los mismos clips de prueba apartados.
- **Normalización:** En compilaciones de Applio con estos controles, Pre ajusta niveles antes del corte y Post los ajusta después. Usa None si los niveles originales ya son adecuados. En Ilaria RVC, Process Data aplica ajuste de nivel automáticamente a cada segmento. La implementación pública no tiene un selector Post separado.
- **Filtro de ruido:** Empieza con la reducción de ruido opcional desactivada en grabaciones limpias. Si el frontend también expone un filtro paso alto, úsalo para retumbos audibles de baja frecuencia y compara el resultado de oído. El filtro paso alto y la reducción de ruido son operaciones distintas.
- **Caché de dataset en GPU:** Déjala desactivada para la referencia base. Consume VRAM extra. Mide el tiempo por época antes de activarla para una ejecución más larga.
- **Pesos preentrenados:** Empareja el par G/D con arquitectura, vocoder, frecuencia de muestreo y configuración de tono, y usa el embedder indicado por el autor del preentrenado. Para preentrenados RVC estándar construidos con ContentVec, selecciona ContentVec para extracción de características e inferencia.

### Elige una frecuencia según el ancho de banda de origen

Comprueba el sample rate en los metadatos del archivo e inspecciona varios clips representativos en un visor de espectrograma como [Spek](https://www.spek.cc/p/download). Busca detalle vocal útil en lugar de ruido aislado o un corte brusco dejado por la compresión. La mitad del sample rate de entrenamiento es la frecuencia más alta que esa tasa puede representar. Un modelo a 32 kHz puede representar frecuencias hasta 16 kHz, un modelo a 40 kHz hasta 20 kHz y un modelo a 48 kHz hasta 24 kHz. Para detalle útil por encima de 20 kHz, elige 48 kHz si la arquitectura y el preentrenado lo soportan. Usa la frecuencia compatible menor cuando ya cubra el ancho de banda de origen. El preprocesamiento puede remuestrear grabaciones, pero no puede restaurar detalle faltante.

## Ejecuta las etapas en orden

| Etapa | Qué produce | Qué comprobar |
| --- | --- | --- |
| Preprocesamiento de dataset | Audio preparado para la configuración de modelo del experimento. | El registro nombra la carpeta prevista e informa procesamiento correcto para archivos válidos. Revisa los archivos omitidos antes de seguir. |
| Extracción de características | Características de contenido, más datos de tono cuando la configuración elegida lo requiera. | La extracción finaliza para el experimento actual usando el embedder y método de tono seleccionados. |
| Entrenamiento del modelo | Checkpoints y exportaciones de inferencia según las opciones de guardado configuradas. | Los pasos de entrenamiento avanzan y se guardan los archivos esperados. Lee el primer error si el progreso se detiene. |
| Índice de recuperación | Colección buscable de características del dataset para uso opcional durante conversión. | El índice pertenece a este experimento y coincide con la voz exportada. Si lo omitiste, prueba el modelo por separado. |

Usa el flujo automático cuando esté disponible, o completa y verifica cada etapa antes de iniciar la siguiente. Cambiar el dataset o el sample rate puede invalidar el audio preparado y las características extraídas. Cambiar el embedder requiere nueva extracción de características. Al probar una configuración incompatible, inicia un experimento aparte para conservar cachés y checkpoints existentes.

## Sigue el progreso en Ilaria RVC

- Usa **Training Dashboard** para revisar recuento de pasos, tiempo por época y curvas de pérdida. Una curva ayuda a explicar una ejecución estancada, mientras las pruebas de escucha te dicen cómo suena la salida.
- Configura **vistas previas de entrenamiento** con un clip de prueba constante para que la app genere conversiones comparables al guardar checkpoints.
- Si usas **Training Queue**, asigna un nombre de experimento y dataset distinto a cada trabajo. Antes de reanudar o reintentar, confirma qué etapas completó el trabajo y dónde guardará la salida.
- Cuando tu versión incluya **Stop and save**, úsalo si necesitas interrumpir y continuar después. Espera a que termine de escribir el checkpoint antes de cerrar la app.

Ilaria RVC 2.1.0 admite objetivos por épocas y por pasos totales, incluida la reanudación a mitad de época para objetivos por pasos. Otros frontends pueden ofrecer controles y comportamientos de reanudación distintos.

### Comparar presupuestos de entrenamiento en pasos

Una época es una pasada por el dataset preparado. Un paso de entrenamiento es una actualización de lote (batch). Divide el número de clips tras el preprocesamiento entre el batch size efectivo para estimar los pasos por época. Por ejemplo, 10,000 clips con batch size 8 dan 1,250 batches por época en una ejecución con un solo trabajador. Batches parciales descartados, varias GPUs o gradient accumulation pueden cambiar cómo cuenta las actualizaciones el entrenador. Usa el recuento informado por tu ejecución al comparar experimentos.

Elige un intervalo de guardado que te dé varios checkpoints para audicionar. Guardar cada unas 40 épocas es un posible punto de partida para una ejecución medida en cientos de épocas. Usa los mismos clips apartados y los mismos ajustes de inferencia en cada comparación. Escucha inteligibilidad, estabilidad de tono, pausas naturales y consonantes claras. Si exportaciones posteriores suenan más ásperas o solo funcionan bien en pocas frases, compara con un checkpoint anterior y revisa el dataset por tomas repetidas o artefactos. Elige el checkpoint que mejor funcione en tus entradas previstas.

## Comparar exportaciones escuchando

Abre inferencia con un `.pth` exportado. Usa las mismas grabaciones cortas apartadas y los mismos ajustes de conversión para comparar modelos de distintos checkpoints. Si comparas el índice, mantén fijo el checkpoint y compara el mismo clip con recuperación desactivada y activada.

Compara estas cuatro cualidades entre exportaciones.

1. **Timbre.** ¿La grabación convertida se parece al carácter vocal previsto en toda la frase?
2. **Inteligibilidad.** ¿Las consonantes y terminaciones de palabras siguen entendiéndose con facilidad?
3. **Estabilidad de tono.** ¿Las notas o sílabas saltan, tiemblan o pierden la inflexión prevista?
4. **Artefactos.** ¿La salida añade zumbido, ruido ambiental incrustado, colas ásperas o transiciones extrañas?

Conserva la exportación que mejor suene y sus salidas de prueba. Puede valer la pena probar más épocas cuando los resultados mejoran en varios ejemplos. Si exportaciones posteriores solo mejoran un clip o empiezan a reproducir defectos del dataset, vuelve a la mejor base y revisa las grabaciones.

## Exportar, reanudar o compartir

- **Usar en inferencia.** Selecciona el modelo `.pth` exportado. Mantén su `.index` correspondiente junto a él cuando quieras recuperación. Anota cualquier dato requerido de embedder, cliente compatible y sample rate.
- **Reanudar entrenamiento.** Haz copia de seguridad del experimento y conserva los checkpoints de entrenamiento coincidentes de generador y discriminador, llamados normalmente `G_*.pth` y `D_*.pth`. Reanuda con el mismo experimento y configuración compatible, y luego revisa el registro para verificar el checkpoint y paso o época esperados. Una exportación de inferencia por sí sola carece del estado completo de entrenamiento.
- **Compartir un modelo.** Comparte solo archivos que tengas permiso para distribuir. Incluye ejemplos de escucha, notas de compatibilidad, el índice correspondiente si es útil y cualquier término de uso necesario para quien lo reciba.

En Ilaria RVC, las versiones recientes usan la biblioteca de modelos para exportaciones de inferencia e índices asociados. Las rutas de exportación y nombres pueden diferir entre frontends. Guarda los registros del experimento aparte si quieres recrear el modelo después.

## Diagnosticar una ejecución fallida

| Síntoma | Qué comprobar primero |
| --- | --- |
| El preprocesamiento no encontró audio | Verifica la carpeta de dataset seleccionada y reproduce un clip de entrada. Comprueba si tu compilación lee carpetas anidadas. |
| La extracción falla o indica falta de modelo | Revisa los recursos de embedder y modelo de tono seleccionados, y lee el primer mensaje en el registro de extracción. |
| Se agota la memoria de GPU | Reduce batch size, detén otros trabajos GPU y desactiva el caché de dataset en GPU si tu compilación ofrece ese control. Reintenta la etapa fallida. |
| El entrenamiento reinicia desde el principio | Comprueba que el experimento apunte a checkpoints de entrenamiento compatibles y que cualquier opción de inicio limpio esté desactivada. |
| Un `.pth` no carga para convertir | Comprueba si seleccionaste un checkpoint de entrenamiento en vez de una exportación de inferencia, y verifica compatibilidad de arquitectura y embedder con el cliente. |
| Un modelo usable no tiene índice | Comprueba si la generación del índice se omitió o falló. Exporta y prueba el checkpoint por separado, y luego genera su índice desde el experimento coincidente si hace falta. |

Guarda el primer mensaje de fallo y la configuración asociada a la ejecución. Para más comprobaciones, consulta [Solución de problemas](../reference/troubleshooting.md).

## Perfiles indicativos de entrenamiento (adaptar a datos y hardware)

Estos tres preajustes son **puntos de partida indicativos**, no reglas universales. Ajusta siempre **Batch Size** a tu VRAM y evalúa los checkpoints escuchando los mismos clips de prueba apartados.

### Entrenamiento Principiantes (Base Segura)

- **Ideal para:** Primer modelo de voz, 5-15 minutos de audio limpio de un solo hablante, GPUs de 6-8 GB VRAM.
- **Ajustes:** RVC **v2** · **40 kHz** · Pitch Guidance **ON** (`rmvpe`) · Embedder `contentvec` · Preentrenado HiFi-GAN estándar/verificado · **Batch Size `4-8`** · **Epochs `200`** (guardar cada `25-50` épocas) · Precisión **FP32** (o **BF16** en RTX 30/40/50) · GPU Caching **OFF** · Workers `2` · Fused AdamW **OFF**.
- **Por qué:** Prioriza la estabilidad y evita errores de falta de memoria o sobreajuste temprano, generando varios checkpoints para comparar.

### Entrenamiento Intermedio (Equilibrio Calidad y Velocidad)

- **Ideal para:** 15-30 minutos de habla/canto limpios, GPUs de 8-12 GB VRAM.
- **Ajustes:** RVC **v2** · **40 kHz** o **48 kHz** (si el ancho de banda de origen supera 20 kHz) · `rmvpe` · `contentvec` o `klm-vocal-contentvec` / `spin-v2` (emparejado con preentrenado) · **Batch Size `8-12`** · **Epochs `250-350`** (o **Total Steps** equivalentes) · Guardar cada `25-50` épocas · Precisión **BF16** (RTX 30/40/50) o **FP16** (T4/RTX 20) · Workers `4`, Prefetch `4-8` · Crear **índice FAISS `Auto`** tras elegir el mejor checkpoint.
- **Por qué:** Usa precisión mixta más rápida y batches mayores manteniendo checkpoints regulares y vistas previas de escucha.

### Entrenamiento Avanzado y Optimización

- **Ideal para:** Datasets grandes o curados multi-emoción/canto, 12-24 GB+ VRAM, preentrenados personalizados.
- **Ajustes:** RVC **v2** · Sample rate emparejado (`32/40/44.1/48 kHz`) y vocoder (`HiFi-GAN`, `MRF HiFi-GAN` o `RefineGAN` a `32/40/44.1 kHz` en Ilaria RVC) · Preentrenado G/D y embedder personalizados/emparejados · **Batch Size `12-16+`** · Objetivo **Total Steps** (para actualizaciones de gradiente consistentes sin importar el tamaño del dataset) · **GPU Caching ON** (solo si el dataset cabe holgadamente en VRAM; mide antes el tiempo por época) · **Fused AdamW ON** (probar en una ejecución nueva) · **Training Queue** para pruebas A/B nocturnas · Monitorización **TensorBoard** + comparación con **Audio Analyzer**.
- **Learning rate:** La mayoría de WebUIs RVC (incluida Ilaria RVC) usan la programación estándar del optimizador RVC v2 (`1e-4` base); cambia la tasa de aprendizaje en frontends que la expongan solo si entiendes cómo escala con el batch size.

## Detectar Underfitting vs. Overfitting de oído

1. **Underfitting (demasiado pronto):** La salida aún suena casi como el hablante de entrada, pierde el timbre objetivo en vocales sostenidas o pierde carácter en notas altas/bajas. *Solución:* Continúa entrenando desde el último checkpoint `G_*.pth`/`D_*.pth`.
2. **Overfitting (demasiado tarde):** La voz suena robótica/metálica en palabras nuevas, reproduce ruido ambiental o artefactos de respiración del dataset, o suena bien *solo* en frases similares al conjunto de entrenamiento. *Solución:* Vuelve a un checkpoint anterior (`50-100` épocas antes) e inspecciona el dataset en [Audio Analyzer](../ilaria-rvc/manage/audio-analyzer.md).

> Si estás entrenando con **Redpanda-vc** (que añade Generator EMA y guardado de checkpoints basado en pasos), consulta [Entrenar modelos RVC en Redpanda-vc](../other-rvcs/redpanda/training.md).
