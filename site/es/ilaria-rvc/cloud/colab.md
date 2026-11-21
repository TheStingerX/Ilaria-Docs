# Google Colab

[Notebook · GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Google Colab](https://colab.research.google.com/github/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb)

## Antes de empezar

Prepara un WAV corto y limpio, un modelo compatible y una copia del conjunto de datos si vas a entrenar.

1. Abre el cuaderno en Colab con un entorno GPU.
2. Ejecuta las celdas 1 a 4 en orden para comprobar la GPU, instalar dependencias, descargar pesos e iniciar la interfaz.
### Límites, compute units y políticas de Google Colab

Antes de iniciar sesiones largas, revisa cómo [Google Colab](https://research.google.com/colaboratory/faq.html) gestiona los recursos:

- **Plan gratuito vs. planes de pago (Compute Units):** El plan gratuito ofrece GPU según disponibilidad, pero duración, desconexiones y tipo de GPU son dinámicos y nunca garantizados. Los planes **Pro / Pro+ / Pay As You Go** consumen **compute units** según la GPU elegida.
- **Actividades no permitidas y WebUI:** La [política de Colab](https://research.google.com/colaboratory/faq.html#disallowed-activities) prohíbe alojar servicios web públicos, proxies remotos, eludir límites o crear deepfakes. Gradio interactivo no está prohibido de forma absoluta, pero los túneles persistentes en el plan gratuito suelen provocar desconexiones.
- **Desconexiones, guardado y privacidad:** Exporta (EXPORT = True) o guarda en Google Drive con regularidad y no subas audios confidenciales a notebooks compartidos.
- **Alternativas:** [Kaggle](kaggle.md) o [Lightning AI Studio](lightning-ai.md).

3. Abre la vista integrada y mantén la sesión conectada.

## Comprueba cada celda

Comprueba que la primera celda detecte una GPU NVIDIA. Espera a que se instalen las dependencias. Para inferencia, puedes usar `TRAINING_SAMPLE_RATES = []`. Mantén `DOWNLOAD_FCPE` si vas a usar FCPE.

## 4. Convierta una grabación

1. En la pestaña del navegador Ilaria RVC, abra **Otro → Importar modelos locales**. Sube el archivo del modelo de inferencia (`.pth`) y, si lo tienes, su índice opcional (`.index`). También puedes subir un ZIP compatible que contenga esos archivos. Espere a que finalice la importación. También puedes abrir **Other → Download models from Hugging Face, Google Drive or MEGA**, pegar un enlace de descarga público a un ZIP compatible, `.pth` o `.index` y pulsar **Download and install model**. Si el modelo y el índice opcional tienen enlaces separados, descárgalos uno por uno.
2. Abra **Inferencia**, actualice la lista de voces si es necesario, seleccione la voz deseada y vaya a **Inferencia única**.
3. Sube el WAV corto. Comience en **Paso 0** y **Relación de índice 0**. Deje los efectos opcionales desactivados y utilice el incrustador esperado por el modelo.
4. Haga clic en el control de conversión una vez y espere el resultado. Reproduzca el resultado y luego descárguelo del reproductor si está disponible. Mantenga su entrada WAV para poder comparar la misma frase más tarde.
5. Si desea probar la recuperación, seleccione el índice coincidente e intente un pequeño aumento desde cero. Si la salida falla o la voz se vuelve más difícil de entender, regrese a la línea base y verifique el emparejamiento modelo-índice.

Si la voz nunca aparece, primero verifique el registro de importación. Un punto de control de entrenamiento guardado como un archivo G o D pertenece a un experimento y necesita una exportación de inferencia antes de poder seleccionarlo aquí.

## Prepare su conjunto de datos y planifique una ejecución de entrenamiento

### Limpie el audio con MVSEP solo cuando sea necesario

Guarde una copia intacta de sus grabaciones. Si ya contienen una única voz limpia y seca, omita la separación. Utilice material que tenga permiso para subir a [MVSEP](https://mvsep.com/en/home) y entrenar. Para grabaciones confidenciales, límpielas localmente.

1. **Aislar la voz.** Sube un breve ejemplo y elige una opción de separación vocal. Descargue la raíz vocal en WAV cuando esté disponible. Vuelva a reproducirlo con el original y escuche a través de auriculares música, otras voces, sílabas recortadas y artefactos acuosos o metálicos.
2. **Elimine los coros solo si están presentes.** Para canciones con armonías o un coro debajo del objetivo, use una opción de separación entre solista y acompañamiento en la raíz vocal. Mantenga la salida principal. Si los cantantes aún se superponen o el solista tiene agujeros, use una sección limpia o una toma diferente.
3. **Reduzca la reverberación solo cuando sea audible.** Si la voz tiene una cola de reverberación estéreo amplia, primero pruebe una opción de desreverberación estéreo en una copia. Para los reflejos restantes de la sala, compare un pase de desreverberación de la sala. Puedes saltarte cualquiera de las etapas. Escuche las consonantes y respiraciones truncadas en cada pase.
4. **Elimina el eco solo si repite la voz.** Una repetición retardada audible solicita una prueba corta separada. Conserve el original o reemplácelo si al eliminarlo se eliminan las palabras. Evite apilar pases en audio que de otro modo estaría limpio.
5. **Prepara los clips finales.** Recorta el ruido inutilizable y las secciones largas y vacías en un editor como Audacity, manteniendo respiraciones útiles y frases naturales. Exporta WAV limpios. Junte los archivos aprobados en un ZIP y guarde algunos clips limpios fuera de él para su evaluación.

Pruebe la cadena de limpieza completa durante unos segundos antes de tratar todo el conjunto de datos. Un modelo puede aprender artefactos que quedan en su audio de entrenamiento. Verifique varios clips de diferentes sesiones antes de cargarlos.

### Limpie un conjunto de datos localmente con Ultimate Vocal Remover (UVR)

UVR separa un archivo de audio en pistas llamadas raíces. Úselo cuando la voz de destino se mezcle con música, efectos de sonido u otras voces. Si ya tienes una grabación de voz limpia, conserva la original. UVR procesa el audio en su computadora después de descargar los modelos requeridos. Cloud ejecuta el trabajo de entrenamiento RVC posterior por separado.

#### Instale UVR y prepare un clip de prueba

1. Descargue el instalador o paquete para su sistema operativo desde [Versiones UVR](https://github.com/Anjok07/ultimatevocalremovergui/releases). Inicie la aplicación de escritorio después de instalarla.
2. Haz una copia de 15 a 30 segundos de un ejemplo que contenga una línea clara y una sección donde la música se superponga. Guarde el original en un lugar seguro.
3. Haga clic en **Seleccionar entrada** y elija ese clip de prueba. Utilice **Seleccionar salida** para elegir una nueva carpeta grabable, como `uvr-test`. Elija **WAV** para el formato de salida.
4. Seleccione un **Método de proceso** y un modelo que separe las **voces** de las **instrumentales**, por ejemplo, un modelo de voces en **MDX-Net**. Si la lista está vacía, abra la configuración **Centro de descargas**, seleccione la familia de modelos correspondiente y descargue un modelo adecuado. Regrese a la ventana principal y selecciónela.
5. Habilite **Conversión de GPU** solo si su versión instalada reconoce un dispositivo compatible. Si esa opción causa un error, apáguela y pruebe en la CPU. El procesamiento de la CPU puede ser más lento, así que comience con un clip corto.

#### Separa las voces y escucha.

Haga clic en **Iniciar procesamiento**. Cuando termine, busque la raíz de la voz en la carpeta de salida. Algunos modelos también escriben una raíz instrumental. Toca el original y las voces a un volumen similar. Verifique consonantes, respiraciones, notas sostenidas y secciones donde el acompañamiento es fuerte. Si todavía escucha los instrumentos o la voz suena acuosa o metálica, compare otro modelo en el mismo clip de prueba antes de procesar el conjunto de datos completo.

Si ha seleccionado la raíz incorrecta, verifique los nombres de los archivos o escuche cada salida. Conserve el que contenga la voz principal de su objetivo.

#### Limpie los problemas restantes uno a la vez

| Lo que queda | Qué probar en UVR |
| --- | --- |
| Coros o armonías | Introduzca la raíz vocal aislada en un modelo destinado a la separación principal y de acompañamiento, si su instalación lo ofrece. Mantenga la salida principal y verifique que la voz objetivo esté completa. |
| Colas de reverberación entre frases | Pruebe un modelo diseñado para desreverberación, si está disponible. Compara el antes y el después del mismo pasaje. Conserve la raíz original si la desreverberación daña consonantes o notas sostenidas. |
| Repeticiones retardadas audibles | Pruebe un modelo de eliminación de eco si está disponible. Si elimina palabras o distorsiona las respiraciones, utilice otra toma o excluya la sección afectada. |
| Zumbidos de la habitación, picos recortados u otras voces | Consulta el original. Si el tratamiento sigue dañando la voz, reemplace o excluya el clip. La separación no puede reconstruir los picos perdidos por el recorte. |

Procese el conjunto completo sólo después de que una breve comparación suene bien. Utilice Audacity u otro editor para recortar material inutilizable. Mantenga pausas y respiraciones naturales, exporte los clips aprobados como WAV y empaquete solo esos clips en el archivo ZIP del conjunto de datos. Mantenga los tallos instrumentales y rechazados fuera del ZIP. A continuación, cárguelo en **Entrenamiento** en Ilaria RVC y confirme que **Ruta al conjunto de datos** apunta a las grabaciones importadas.

## 5. Entrena una voz y guarda tu trabajo

1. En **Capacitación**, elija un nuevo **Nombre de modelo**. Importe su audio o ZIP a través de los controles de carga del conjunto de datos. Espere a que se complete la importación y confirme que **Ruta al conjunto de datos** apunta a las grabaciones importadas.
2. Ejecute el **Comprobador de conjunto de datos** y escuche cualquier grabación sospechosa. Confirme que su arquitectura RVC V2, frecuencia de muestreo, incrustación y configuración de tono coincidan con sus preentrenamientos G/D seleccionados si los usa. Comience con un tamaño de lote que se ajuste a la GPU asignada.
3. Ejecute **Datos de proceso** y luego **Extracción de funciones**. Lea el estado de cada uno antes de continuar. Si cambia el conjunto de datos o el codificador, prepare archivos nuevos para ese experimento antes del entrenamiento.
4. Ejecute **Train Pth** con un primer objetivo modesto y guarde los puntos de control periódicos. Mantenga un breve clip de prueba fuera de los datos de entrenamiento. Compare los puntos de control exportados en ese mismo clip antes de comenzar una ejecución más larga.
5. Cree el índice de características si necesita recuperarlo, luego intente exportar la inferencia en **Relación de índice 0** primero. Para obtener una explicación detallada de cada configuración, consulte [Controles de entrenamiento y flujo de trabajo](../train/training-controls.md).
6. Si desea detener la ejecución, use **Detener y guardar** dentro de Ilaria RVC y espere hasta que el registro confirme el guardado. Descargue los resultados mientras la sesión de Cloud aún está activa.

## Exportar y detener

Activa `EXPORT = True` y, para reanudar el entrenamiento, `INCLUDE_CHECKPOINTS`. Descarga el ZIP antes de ejecutar `STOP = True`.

### Comprueba el ZIP

Revisa el WAV y el modelo exportados. Marca `INCLUDE_CHECKPOINTS` si quieres reanudar el entrenamiento y guarda los datos originales por separado.

## Resuelve los problemas

Lee el primer error y repite la celda tras corregirlo. Si no aparece el modelo, revisa el registro de importación. Si falta memoria de GPU, reduce el lote.

[Ilaria RVC en la nube](cloud.md)
