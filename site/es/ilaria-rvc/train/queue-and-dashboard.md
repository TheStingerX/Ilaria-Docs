# Cola, panel y alertas

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

## Poner en cola varios experimentos

Configure el experimento en Entrenamiento, confirme su conjunto de datos y nombre de modelo, y agréguelo a la **Cola de entrenamiento**. Utilice nombres distintos para configuraciones distintas. Revise las entradas guardadas antes de comenzar, luego verifique el trabajo actual y su etapa. La cola persiste entre sesiones. Pausa o reanuda desde sus controles e inspecciona los trabajos fallidos antes de volver a intentarlo. Corrija las rutas de los conjuntos de datos que faltan y las configuraciones incompatibles antes de volver a enviarlos.

## Seguir un trabajo en ejecución

El **Panel de entrenamiento** muestra la duración de la época, actualizaciones acumulativas, pasos por segundo, gráficos y un mensaje de estado. Mientras un modelo se entrena, el panel sigue métricas en vivo. Cuando esté inactivo, elija un nombre de modelo existente para revisar sus métricas guardadas. Utilice el registro de trabajo para identificar el primer error. Los contadores son útiles para medir el tiempo y el progreso. Juzgue el sonido de [vistas previas de entrenamiento](training-workflow.md) del mismo clip retenido.

## TensorBoard y diagnóstico

Utilice los controles de inicio y parada del panel TensorBoard. El panel 2.1.0 espera eventos escalares utilizables antes de mostrarlos. Verifique el experimento seleccionado y el estado del panel si los gráficos están vacíos. Las curvas de pérdidas pueden ayudar a detectar una carrera estancada. No pueden valorar cuán naturales suenan las voces.

Abra **PC Training Advisor** en Otro, seleccione la velocidad, la precisión y la GPU deseada, y ejecute el análisis. Pruebe las configuraciones sugeridas en un trabajo pequeño antes de un experimento largo. El **Informe de diagnóstico** incluye errores de SO, GPU, CUDA, disco y entrenamiento reciente. Revise los informes para buscar rutas de archivos personales antes de compartirlos.

## Notificaciones y paradas seguras

Utilice notificaciones sonoras y de escritorio opcionales para notar la finalización o los errores, luego confirme el estado final en los registros. Guarde antes de reiniciar o cerrar la última pestaña. Con **Detener y guardar**, espere la confirmación y conserve el par G/D y el estado del experimento antes de mover o reiniciar la ejecución.
