---
label: "Kaggle"
icon: ":notebook:"
order: 98
permalink: /ilaria-rvc/kaggle/
description: "Haga clic en Ejecutar todo en el editor. También puedes ejecutar las cuatro celdas de código una a la vez, de arriba a abajo. Espere a que termine cada..."
---
# Kaggle

[Abra el cuaderno oficial de Kaggle](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Obtenga el archivo del cuaderno de GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Kaggle.ipynb)

> **2.4.0** · Windows mueve la aplicación y el entorno a app/, y los modelos a models/ en la raíz. Añade Colab, Lightning AI Studio, ayuda para descargar embedders y Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Se repara pip y se incluye pywin32.

[Kaggle](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Kaggle.ipynb) · [Google Colab](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Colab.ipynb) · [Lightning AI Studio](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-LightningAI.ipynb)

## 1. Prepara una prueba corta

- Inicie sesión en Kaggle y mantenga abierto el editor del cuaderno mientras trabaja.
- Para convertir audio, usa un modelo de inferencia compatible (`.pth`). El archivo `.index` correspondiente es opcional. Prepara un WAV de 10 segundos con una voz clara y sin música.
- Para la capacitación, conserve una copia local del conjunto de datos de origen. Prepare un ZIP de grabaciones utilizables para las que tenga permiso. Mantenga un clip corto separado fuera del conjunto de datos de entrenamiento para que pueda probar su modelo en algo que no haya escuchado.
- Comienza con una prueba de archivo antes de intentar una carrera de entrenamiento larga. Kaggle controla la disponibilidad y los límites de la GPU, así que verifique el tiempo y los recursos que se muestran en su propia sesión.

## 2. Haga una copia editable y encienda la GPU

1. Abra el [cuaderno publicado](https://www.kaggle.com/code/ilarialopez/ilaria-rvc). Inicie sesión si se le solicita. Utilice **Copiar y editar** o la acción de copia equivalente para abrir su propia versión editable.
2. Si, en cambio, está comenzando desde GitHub, descargue el archivo `Ilaria-RVC-2.1-Kaggle.ipynb` sin formato, cree un cuaderno en Kaggle e importe el archivo a través del editor del cuaderno. Abra el cuaderno resultante en Kaggle en lugar de ejecutarlo en su propia máquina.
3. Abra la configuración de la sesión en el editor. Para **Acelerador**, seleccione una opción de **GPU** disponible. Si Kaggle solicita reiniciar la sesión después del cambio, acepte antes de agregar archivos o iniciar una ejecución.
4. Habilite **Internet** en la misma configuración de sesión. El notebook necesita conectividad para descargar el código, dependencias y pesos, y luego abrir su enlace Gradio.
5. Si alguna de las configuraciones no está disponible, lea la explicación que muestra Kaggle. Verifique la elegibilidad de su cuenta y la disponibilidad actual de la aceleradora. Vuelva a intentarlo cuando pueda habilitar ambas configuraciones.

## 3. Ejecute las cuatro secciones principales

Haga clic en **Ejecutar todo** en el editor. También puedes ejecutar las cuatro celdas de código una a la vez, de arriba a abajo. Espere a que termine cada celda antes de ejecutar la siguiente. Las celdas opcionales de exportación y detención no hacen nada con su configuración predeterminada.

| Sección del cuaderno | Qué hace una ejecución exitosa | Qué verificar si se detiene |
| --- | --- | --- |
| **1. Comprobar GPU** | Muestra los datos de la GPU y descarga el código actualizado de `main` → `/kaggle/working/ilaria-rvc`. | Si faltan las herramientas de NVIDIA, seleccione una GPU disponible y reinicie la sesión antes de volver a ejecutarla. Si Git no puede acceder al repositorio, verifique Internet. |
| **2. Instalar dependencias** | Prepara el entorno del portátil y comprueba que PyTorch vea la GPU. Busque `GPU ready:` seguido de su nombre. | Leer la primera dependencia o error del compilador. La falta de un dispositivo CUDA significa que la aplicación aún no puede usar la GPU. |
| **3. Descargar pesos de modelo** | Descarga y verifica los activos requeridos por el cuaderno. | Deje que finalice el reintento integrado. Si sigue fallando, verifique el acceso a la red y libere espacio. |
| **4. Abrir Ilaria RVC** | Inicia la interfaz e imprime **Abrir Ilaria RVC** en la salida de la celda. | Si la pestaña no se abrió automáticamente, haga clic en ese botón. Si la computadora portátil informa que el enlace de Gradio no está disponible, verifique Internet y vuelva a ejecutar el paso 4 después de que los pasos 1 a 3 se realicen correctamente. |

Abra el enlace actual del paso 4 en otra pestaña. Deje la sesión de Kaggle ejecutándose. Después de restablecer la sesión o reiniciar el inicio, utilice el enlace recién generado.

> Para actualizar una sesión abierta, guarda tu trabajo, ejecuta la celda de parada con `STOP = True` y repite los pasos del 1 al 4. La primera celda muestra la versión cargada.

## Comience aquí con el cuaderno actualizado

### Antes de ejecutar cualquier cosa

1. Abra su copia editable en Kaggle y manténgala **privada**. La celda de lanzamiento imprime contraseñas. Mantenga su salida fuera de capturas de pantalla, registros compartidos y versiones publicadas.
2. Abra **Configuración**. El portátil solicita **GPU T4 x2** e **Internet**. Si Kaggle no los aplicó al importar, selecciónelos usted mismo. Si T4 x2 no está disponible, verifique la GPU ofrecida a su cuenta y lea la lista de GPU impresa después del inicio.
3. Haga clic en **Ejecutar todo** o ejecute las cuatro secciones numeradas en orden. Las secciones 1 a 3 preparan la aplicación. La sección 4 lo abre. Las celdas de exportación y detención son opcionales y están desactivadas de forma predeterminada.
4. En el resultado de la sección 1, verifique los nombres de la GPU y la versión de **Ilaria RVC**. La sección 2 verifica que PyTorch vea las GPU disponibles. La sección 3 comprueba los pesos descargados. Continúe después de que cada uno termine exitosamente.

### Abre la aplicación y el administrador de archivos

La sección **Inicio → Configuración de acceso** tiene dos opciones. Deje **Gradio + Cloudflare** seleccionado para una primera prueba. Gradio abre Ilaria RVC y Cloudflare abre FileBrowser. Si elige **Horizon**, ingrese el ID de Horizon desde su panel de Horizon y apruebe la solicitud del token CLI cuando se le solicite. Horizon produce enlaces separados para los mismos dos servicios.

1. Espere a **Abrir Ilaria RVC** en el resultado y haga clic en él si la nueva pestaña no se abrió automáticamente.
2. Inicie sesión con el nombre de usuario `ilaria` y el valor junto a **Contraseña de WebUI** en el resultado de inicio actual.
3. Para archivos exportados, haga clic en **Abrir FileBrowser**. Utilice el **nombre de usuario de FileBrowser** y la **contraseña de FileBrowser** que se muestran en el mismo resultado. Estas credenciales son independientes del inicio de sesión de WebUI. FileBrowser muestra únicamente la carpeta de exportación dedicada.
4. Mantenga Kaggle ejecutándose mientras usa cualquiera de las pestañas. Después de reiniciar la aplicación, use los enlaces y las credenciales del nuevo resultado. Si una página rechaza la contraseña, verifique que haya utilizado el par de credenciales correcto para esa página.

### Seleccione solo los pesos que necesita

La sección 3 tiene como valor predeterminado `TRAINING_SAMPLE_RATES = ["32k"]`. Déjelo sin cambios para una primera prueba de entrenamiento de 32 kHz. Si su experimento planificado necesita los preentrenamientos incluidos a otra velocidad admitida, incluya `"40k"` o `"48k"` en esa lista antes de ejecutar la celda. Utilice una lista vacía sólo para inferencias. Esta lista controla las descargas previas al entrenamiento. La frecuencia de muestreo de su experimento aún debe coincidir con la arquitectura y los pesos seleccionados en la WebUI.

La misma celda tiene `DOWNLOAD_FCPE`. Deje los valores predeterminados si no está seguro. Si FCPE no está disponible, el portátil lo informa y usted puede seleccionar RMVPE.

### Ajusta el entrenamiento solo después de una breve prueba

| Configuración | Qué hacer para la primera ejecución |
| --- | --- |
| Precisión de entrenamiento | El portátil comienza con FP16 cuando todas las GPU visibles son T4. Pruebe FP32 para realizar una comparación si es necesario. Al reanudar, haga coincidir la configuración del punto de control existente. |
| Tamaño del lote | El valor de la interfaz de usuario es por GPU para una nueva ejecución con esta computadora portátil. Un T4 en el lote 8 y dos T4 en el lote 4 dan un lote global de 8 cuando esos son los dispositivos utilizados por la ejecución. Consulta los valores efectivos en **Registro de entrenamiento**. Empiece con algo más pequeño si tiene poca memoria. |
| Trabajadores y captación previa | Déjelos en 2 cada uno para la primera ejecución. El portátil sugiere 4 trabajadores y precarga 8 en comparación con la configuración anterior del cargador. Cambie un factor a la vez y compare el tiempo en `train.log`. |
| Fused AdamW | Déjalo apagado al principio. Pruébelo en una nueva ejecución si desea comparar el rendimiento. Mantenga la configuración del lote original al reanudar. |

Dos GPU no agrupan su VRAM en un único dispositivo más grande. Si una ejecución se queda sin memoria, reduzca el lote por GPU y verifique la configuración efectiva en el registro antes de volver a intentarlo.

### Exportar, descargar y detener

Después de la conversión o después de que **Detener y guardar** confirme el punto de control, establezca `EXPORT = True` y ejecute **Exportar resultados**. Deje `TRAINING_MODEL` en blanco para exportaciones regulares de modelo y audio, o ingrese el nombre exacto del modelo para incluir sus archivos de experimentos reanudables. Abra **FileBrowser** o use el enlace que se muestra en la celda de exportación y descargue **Ilaria-RVC-results.zip**. El archivo está escrito en `/kaggle/working/ilaria-shared`. Confirme que puede abrirlo localmente antes de cerrar la sesión.

Cuando termine, establezca `STOP = True` y ejecute **Detener o reiniciar**. Esto cierra WebUI, FileBrowser y sus túneles. Para volver a abrirlos en la misma sesión, vuelva a ejecutar la sección 4. Para actualizar el código de la aplicación, guarde su trabajo, detenga los servicios y vuelva a ejecutar los pasos 1 a 4.

///region cloud-inference-dataset
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
///endregion

### Traducir el flujo de trabajo original de Applio a Ilaria RVC

| Ingresar al flujo de trabajo original | Qué hacer en este cuaderno de Ilaria RVC |
| --- | --- |
| Configure una cuenta de Kaggle y verifíquela | Inicie sesión y verifique que puede habilitar GPU e Internet. Complete la verificación si Kaggle lo solicita. |
| Elija un túnel o modo de persistencia | Ejecute el cuaderno oficial en orden y abra la URL de Gradio desde el paso 4. Maneja el túnel. Haga una copia de seguridad del experimento fuera de la sesión temporal utilizando la celda de exportación. |
| Cargue el conjunto de datos y pegue su ruta | Utilice el selector de carga en Ilaria RVC, espere a que finalice y confirme que **Ruta al conjunto de datos** apunta a sus archivos preparados. Haga coincidir el nombre del modelo con lo que ingresará al exportar puntos de control. |
| Elija una segmentación y Post normalización | **Datos de proceso** maneja la segmentación y ajusta cada división automáticamente. El flujo de trabajo de Ilaria RVC no tiene un conmutador Applio Post independiente. Haga coincidir la frecuencia de muestreo de entrenamiento con la arquitectura y los preentrenamientos. El remuestreo no puede restaurar los detalles faltantes. |
| Establezca los archivos de entrenamiento silenciosos en cero | Deje **Archivos de entrenamiento silenciosos** en su configuración predeterminada para su primera ejecución. Si sus clips ya tienen pausas naturales y no tienen secciones largas y vacías, compare una ejecución separada con cero. Verifique ambas salidas en las mismas pausas retenidas. |
| Elija el tamaño del lote según la longitud del conjunto de datos | Comience en 2 o 4 si no está seguro y use 8 solo si la GPU tiene espacio libre y la configuración funciona. Verifique el registro y la VRAM. Reduzca el lote después de un error de falta de memoria. Kaggle no implica un multiplicador de lotes fijo y la longitud del conjunto de datos por sí sola no determina el tamaño del lote. |
| Entrena hasta que el modelo suene bien | Guarde cada 5 o 10 épocas si su tiempo disponible y espacio en disco lo permiten. Compare las exportaciones de inferencias guardadas en los mismos clips de prueba. No existe un objetivo de época universal, y extender un análisis a 500 épocas no puede reparar un conjunto de datos deficiente. |

#### Escuche antes de decidir qué punto de control conservar

Utilice un conjunto corto de clips que se muestran. Incluya una oración sencilla, una con consonantes agudas y una pausa. Para cantar, pruebe también una nota mantenida y una transición entre registros. Comience con el tono en cero, la recuperación desactivada y los efectos opcionales desactivados. Mantenga el modelo cuyos resultados sean más claros en todo el conjunto. Si todas las versiones tienen los mismos alientos metálicos o palabras apagadas, revise el conjunto de datos en lugar de extender la ejecución a ciegas.

Conserve la exportación de inferencia y su índice coincidente si utilizó uno. Para continuar una ejecución más tarde, guarde el experimento completo con la celda de exportación del cuaderno y mantenga su conjunto de datos original por separado. Abra el ZIP descargado y verifique su contenido antes de finalizar la sesión de Kaggle.

///region cloud-training
## 5. Entrena una voz y guarda tu trabajo

1. En **Capacitación**, elija un nuevo **Nombre de modelo**. Importe su audio o ZIP a través de los controles de carga del conjunto de datos. Espere a que se complete la importación y confirme que **Ruta al conjunto de datos** apunta a las grabaciones importadas.
2. Ejecute el **Comprobador de conjunto de datos** y escuche cualquier grabación sospechosa. Confirme que su arquitectura RVC V2, frecuencia de muestreo, incrustación y configuración de tono coincidan con sus preentrenamientos G/D seleccionados si los usa. Comience con un tamaño de lote que se ajuste a la GPU asignada.
3. Ejecute **Datos de proceso** y luego **Extracción de funciones**. Lea el estado de cada uno antes de continuar. Si cambia el conjunto de datos o el codificador, prepare archivos nuevos para ese experimento antes del entrenamiento.
4. Ejecute **Train Pth** con un primer objetivo modesto y guarde los puntos de control periódicos. Mantenga un breve clip de prueba fuera de los datos de entrenamiento. Compare los puntos de control exportados en ese mismo clip antes de comenzar una ejecución más larga.
5. Cree el índice de características si necesita recuperarlo, luego intente exportar la inferencia en **Relación de índice 0** primero. Para obtener una explicación detallada de cada configuración, consulte [Controles de entrenamiento y flujo de trabajo](../train/training-controls.md).
6. Si desea detener la ejecución, use **Detener y guardar** dentro de Ilaria RVC y espere hasta que el registro confirme el guardado. Descargue los resultados mientras la sesión de Cloud aún está activa.
///endregion

## 6. Descargue una copia de seguridad antes de salir

La celda opcional **Exportar resultados** del cuaderno crea un archivo en `/kaggle/working/ilaria-shared/Ilaria-RVC-results.zip`. Una sesión en vivo es temporal. Verifique que tenga la copia de seguridad en su propia computadora antes de detener o restablecer la sesión.

- **Solo para archivos de inferencia:** establezca `EXPORT = True` y deje `TRAINING_MODEL = ""`. El archivo incluye archivos `.pth` y `.index` en `models`, además de archivos escritos en `InferOutput`. Utilice el botón de descarga del reproductor para cualquier conversión que no haya escrito un archivo allí.
- **Para conservar un experimento de entrenamiento reanudable:** espere hasta **Detener y guardar** o hasta que el entrenamiento termine de guardarse. Configure `EXPORT = True` e ingrese el nombre exacto del experimento en `TRAINING_MODEL`. Ingrese solo el nombre, sin una ruta de carpeta. La exportación incluye su árbol `logs/<name>` junto con las salidas regulares.
- Ejecute esa celda de código. Abra el enlace que se muestra o descargue **Ilaria-RVC-results.zip** a través de Kaggle **Salida**. Abra el ZIP localmente y confirme que contiene lo que necesita. Mantenga su conjunto de datos original por separado. La celda de exportación no empaqueta `datasets`.

Para detener solo la aplicación, configure `STOP = True` en **Detener o reiniciar** y ejecute esa celda opcional después de guardar. Ejecute el paso 4 nuevamente para volver a abrirlo en la misma sesión. Detener o restablecer toda la sesión de Kaggle es una acción separada.

## Solución de problemas

| Lo que ves | Qué hacer primero |
| --- | --- |
| El paso 1 dice habilitar una GPU | Seleccione una GPU en **Acelerador**, reinicie si se le solicita y luego vuelva a ejecutar desde el paso 1. |
| La computadora portátil informa un pago o compromiso diferente | Comience en una sesión limpia con el oficial cuaderno. Haga una copia de seguridad de los resultados existentes antes de cambiar o restablecer la sesión. |
| La pestaña Gradio está en blanco o caducada | Confirme que la sesión aún se está ejecutando. Utilice el enlace más reciente del paso 4. Si no se puede crear el enlace, verifique Internet y lea el resultado de la celda. |
| La conversión o el entrenamiento se quedan sin memoria | Cierra los trabajos que compiten en la sesión y prueba un clip corto. Para el entrenamiento, reduzca el tamaño del lote y desactive el almacenamiento en caché del conjunto de datos de GPU opcional, si está disponible. Guarde antes de interrumpir una carrera. |
| Exportar dice que no hay resultados | Primero convierta o exporte una voz. Verifique el directorio de salida y confirme que el nombre del experimento opcional del archivo coincida exactamente con **Nombre del modelo**. |
| Algunos archivos desaparecen después de un reinicio | Inicie la configuración nuevamente y vuelva a importar sus copias de seguridad locales. La carpeta de trabajo pertenece a la sesión activa. |

Si el problema se repite, anote la sección que falla, el nombre de la GPU del paso 1 y el primer error de la salida de la celda. El cuaderno también escribe el registro de inicio de la aplicación en `/kaggle/working/.ilaria-notebook/startup.log`. Elimina la URL de Gradio de cualquier registro que compartas. Consulte [Solución de problemas RVC](../../reference/troubleshooting.md) para obtener diagnósticos de modelo y audio.
