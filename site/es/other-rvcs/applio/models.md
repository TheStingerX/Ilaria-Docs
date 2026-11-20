# Instalar una voz en Applio

Coloque las descargas de modelos en una carpeta conocida y extraiga cualquier ZIP allí. Guarde las notas del editor junto con los archivos. Utilice modelos de fuentes en las que confíe.

| Tienes | Qué hacer con él |
| --- | --- |
| Una exportación de voz como `ExampleVoice.pth` | Importarlo como modelo de inferencia. |
| Un `.index` suministrado para esa voz | Guárdelo al lado de su modelo. Úselo si desea probar la recuperación. |
| Archivos como `G_100.pth` y `D_100.pth` | Guárdelos para entrenar o reanudar. Solicite la exportación de inferencia si solo desea convertir audio. |
| Información sobre el embebedor, vocoder o ID del altavoz | Escríbelo. Es posible que lo necesite al elegir los controles de conversión. |

Un incrustador describe el contenido de audio para el modelo de voz. Haga coincidir el incrustador del entrenamiento antes de cambiar cualquier configuración de tono o recuperación. Si una exportación utiliza un incrustador personalizado, obtenga los archivos coincidentes del editor.

## Importación de escritorio

1. Abra **Modelos → Descargar modelos**. Para obtener un enlace público compatible, ingréselo en **Descargar desde enlace** y utilice **Descargar**. Espere a que el estado del trabajo sea exitoso antes de actualizar la biblioteca.
2. Para los archivos que ya extrajo, elija **Cargar archivos de modelo** en el mismo espacio de trabajo. Seleccione `.pth` y use **Guardar archivo**. Repita para su índice si alguno vino con la voz.
3. Actualizar **Biblioteca de modelos**. Utilice **Inspeccionar** para verificar metadatos como velocidad, incrustación, codificador de voz o ranuras de altavoz disponibles, donde existan esos campos. Luego elija **Usar** para llevar el modelo al espacio de trabajo de conversión.
4. Verifique que el modelo seleccionado sea su nueva voz antes de ejecutar la conversión.

## Importación de Gradio

1. Abra **Modelos**, llamado **Descargar** en algunas versiones. Ingrese el enlace del modelo en el panel de descargas o cargue la voz extraída y el índice a través de **Soltar archivos**.
2. Después de la instalación, abra **Convertir audio** o **Inferencia** y actualice la lista de modelos. Elija la nueva voz por nombre.
3. Si copia archivos manualmente, busque el directorio de registros/modelos activos de la instalación que realmente inició. Una instalación de Gradio comúnmente usa un diseño como `logs/ExampleVoice/ExampleVoice.pth`, con el índice correspondiente en el mismo directorio. La ruta que muestra una instalación de escritorio puede diferir.

## Confirme que el motor puede usarlo

1. Utilice un fragmento de voz aislado que dure unos diez segundos. Comience con el tono en 0, los efectos desactivados y una relación de recuperación de 0. Si el modelo tiene varios altavoces, seleccione el ID del altavoz deseado.
2. Elija el incrustador documentado y ejecute una única conversión. Confirme que el resultado sea reproducible y que pueda reconocer las palabras que proporcionó.
3. Si tiene un índice coincidente, guarde primero la línea base. Seleccione el índice, aumente un poco la tasa de recuperación y ejecute el mismo clip nuevamente. Mantenga el resultado que funcione mejor para esa voz.

Si un modelo desaparece después de la actualización, verifique su extensión de archivo y verifique dónde guarda los modelos la instalación seleccionada. Si la voz aparece en la lista pero produce un error en el momento de la carga, lea el primer error de carga del modelo. Verifique que proporcionó una exportación de inferencia y que su compilación sea compatible con la arquitectura. Si un archivo proviene de una descarga del navegador, verifique que el navegador haya guardado el archivo del modelo real y no haya guardado una página de inicio de sesión HTML.
