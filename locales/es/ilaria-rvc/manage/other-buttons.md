---
label: "Otros controles explicados"
icon: ":toolbox:"
order: 80
permalink: /ilaria-rvc/other-buttons/
description: "Utilice Otro para administrar archivos, inspeccionar o combinar modelos, revisar audio y mantener la aplicación."
---

# Todos los demás paneles explicados

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Utilice **Otro** para administrar archivos, inspeccionar o combinar modelos, revisar audio y mantener la aplicación. Comience por decidir si necesita un modelo de inferencia, un codificador de contenido o un par de entrenamiento G/D. Pertenecen a diferentes partes de RVC.

## Obtenga modelos y recursos de capacitación

| Panel y controles | Qué ingresar y qué esperar |
| --- | --- |
| `Import local models` | Suelte un .pth de inferencia, su índice .index coincidente opcional o un ZIP compatible. Algunas compilaciones exponen un botón Importar archivos de modelo. Verifique Importar registro antes de cambiar a Inferencia y actualizar la lista de modelos. |
| `Download models from Hugging Face, Google Drive or MEGA` | Pegue el enlace de un modelo público, haga clic en Descargar e instalar el modelo y espere a Descargar registro. Se pueden importar enlaces de índice y modelo separados en operaciones separadas. |
| `Download embedders` | Elija el codificador exacto requerido por un modelo, luego haga clic en Descargar el incrustador seleccionado. Lea el estado de descarga de Embedder antes de intentar seleccionarlo en Inferencia. |
| `Download pretrained models` | Proporcione un repositorio, ZIP compatible o enlace generador. Ingrese el enlace discriminador coincidente cuando el descubrimiento automático no pueda encontrarlo. Haga clic en Descargar par previamente entrenado e inspeccione el registro. |
| `Recommended pretraineds` | Elija una variante con nombre y una frecuencia de muestreo, luego haga clic en Descargar la selección previamente entrenada (G + D). Verifique los requisitos de arquitectura, vocoder, tono y codificador antes de seleccionarlo en Capacitación. |

## Inspeccionar, fusionar y compartir voces

**Información del modelo** le permite seleccionar una voz, **Actualizar lista de modelos** y **Leer información del modelo**. Lea el Registro de inspección para confirmar qué archivo se inspeccionó. Expanda **Arquitectura y metadatos guardados** para ver las propiedades registradas y **Tensores almacenados** para obtener detalles sobre el peso. Los metadatos faltantes deben tratarse como desconocidos.

**Fusionar modelos** combina pesos de inferencia compatibles. Elija **Modelo A** y **Modelo B**, luego haga clic en **Verificar compatibilidad del modelo** antes de guardar. **La contribución del modelo A (%)** controla el equilibrio de peso, por lo que 70 le da a A una contribución del 70 % en la mezcla, y el resto proviene de B. **La tasa de muestreo** debe coincidir con los modelos; use Auto si está disponible. **Precisión de salida** establece cómo se almacenan los pesos generados. Ingrese un nuevo nombre y notas opcionales, haga clic en **Combinar y guardar modelo** y lea Registro de combinación. Pruebe la voz fusionada antes de decidir si conservarla. Comience con la recuperación deshabilitada.

**El modelo de exportación ZIP** incluye la voz de inferencia elegida y un índice de coincidencia opcional. Utilice **Actualizar lista de modelos** si falta la voz, seleccione **Modelo de voz** y, opcionalmente, **Índice**, y haga clic en **Crear ZIP de modelo**. Lea el Registro de exportación y descargue el archivo que se muestra en **Descargar modelo ZIP**. Abra el ZIP localmente y verifique ambos nombres de archivo. Mantenga todo el experimento de entrenamiento por separado si necesita puntos de control reanudables.

## Herramientas de audio y hardware

- **Audio Analyzer** compara grabaciones utilizando pantallas de forma de onda, espectrograma, tono y nivel. Seleccione la misma región en entrada y salida y escúchela. Haga coincidir la ventana FFT, el canal y el umbral de silencio en todas las comparaciones. Utilice los controles de exportación disponibles para guardar datos de análisis o gráficos. Consulte [Analizador de audio](audio-analyzer.md).
- **Asesor de capacitación de PC** utiliza **Frecuencia de muestreo para planificar**, **Precisión para evaluar** y **GPU para evaluar**. Haga clic en **Escanear PC y sugerir configuraciones** y revise el Registro de PC Advisor. Trate las sugerencias como un punto de partida y verifique el uso de la memoria durante una ejecución corta.

## Actualizaciones y reinicio

En **Actualizar Ilaria RVC**, compare la **Versión instalada** con la versión que se muestra después de **Buscar actualizaciones**. Lea **Registro de cambios de versión** y expanda **Todos los cambios hasta ahora** para ver notas más antiguas. Cuando se ofrezca **Descargar y reiniciar**, finalice o guarde el trabajo activo antes de usarlo. Siga **Actualizar registro** hasta que se vuelva a abrir la aplicación. **Reiniciar Ilaria RVC** reinicia la instalación actual y **Recargar estado** informa esa operación. En Kaggle, use el flujo de trabajo [guardar, detener y reiniciar](../cloud/kaggle.md)] del cuaderno.
