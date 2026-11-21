# Entrenamiento y puntos de control

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Prepare un experimento

Seleccione un conjunto de datos y elija arquitectura RVC compatible, frecuencia de muestreo, guía de tono, preentrenamientos de incrustador y generador/discriminador. Utilice un nombre de experimento único y un tamaño de lote que se ajuste a la VRAM. Ejecute **Process Data** y luego extraiga las características de presentación y contenido antes del entrenamiento.

## Compara vistas previas y exportaciones

Muestra un breve clip de prueba antes del entrenamiento. Habilite **Vistas previas de entrenamiento** si su lanzamiento lo ofrece y use el mismo clip en todos los puntos de control. Compara dicción, tono y artefactos no deseados. Utilice el panel para medir el tiempo y los recuentos, y utilice pruebas de escucha para seleccionar una exportación.

## Reanudar y exportar

Utilice **Detener y guardar**, espere la confirmación y luego mantenga juntos la carpeta del experimento y los puntos de control G/D coincidentes. A modo de inferencia, exporte el punto de control de voz compacto y mantenga su índice coincidente. Consulte [Entrenar un modelo de voz RVC](../../model-training/training.md) para sintonización y recuperación.
