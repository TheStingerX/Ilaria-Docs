---
label: "☁️ Ejecute Ilaria RVC en Kaggle"
order: 97
permalink: /ilaria-rvc/kaggle/
---
# Ejecute Ilaria RVC 2.1 en Kaggle

Kaggle ejecuta la computadora portátil en una máquina Linux remota. Cuando enciendes su acelerador de GPU NVIDIA, la GPU remota hace el trabajo. Su propia computadora sólo necesita un navegador y acceso a Internet. Esta es una alternativa para personas con gráficos AMD o Intel, gráficos integrados o una GPU local demasiado lenta para el trabajo.

[Abra el cuaderno oficial de Kaggle](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Obtenga el archivo del cuaderno de GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/Ilaria-RVC-2.1-Kaggle.ipynb)

!!!warning Mantenga privado el enlace de la aplicación
El paso 4 crea una URL pública de Gradio. Cualquier persona con esa URL puede usar la aplicación mientras se ejecuta. La visibilidad de su cuaderno Kaggle es independiente del acceso a esa URL. Utilice una sesión sin material privado y mantenga la URL fuera de capturas de pantalla, publicaciones públicas y resultados compartidos.
!!!

## 1. Prepara una prueba corta

- Inicie sesión en Kaggle y mantenga abierto el editor del cuaderno mientras trabaja.
- Para la conversión, tenga un archivo de inferencia `.pth` compatible y, si está disponible, su `.index` coincidente. La primera prueba funciona sin índice. Guarde un WAV de 10 segundos con una voz clara y sin música.
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
| **1. Comprobar GPU** | Muestra el nombre de la GPU, la memoria y el controlador. Consulta la versión fijada de Ilaria RVC en `/kaggle/working/ilaria-rvc`. | Si faltan las herramientas de NVIDIA, seleccione una GPU disponible y reinicie la sesión antes de volver a ejecutarla. Si Git no puede acceder al repositorio, verifique Internet. |
| **2. Instalar dependencias** | Prepara el entorno del portátil y comprueba que PyTorch vea la GPU. Busque `GPU ready:` seguido de su nombre. | Leer la primera dependencia o error del compilador. La falta de un dispositivo CUDA significa que la aplicación aún no puede usar la GPU. |
| **3. Descargar pesos de modelo** | Descarga y verifica los activos requeridos por el cuaderno. | Deje que finalice el reintento integrado. Si sigue fallando, verifique el acceso a la red y libere espacio. |
| **4. Abrir Ilaria RVC** | Inicia la interfaz e imprime **Abrir Ilaria RVC** en la salida de la celda. | Si la pestaña no se abrió automáticamente, haga clic en ese botón. Si la computadora portátil informa que el enlace de Gradio no está disponible, verifique Internet y vuelva a ejecutar el paso 4 después de que los pasos 1 a 3 se realicen correctamente. |

Abra el enlace actual del paso 4 en otra pestaña. Deje la sesión de Kaggle ejecutándose. Después de restablecer la sesión o reiniciar el inicio, utilice el enlace recién generado.

## 4. Convierta una grabación

1. En la pestaña del navegador Ilaria RVC, abra **Otro → Importar modelos locales**. Agregue el punto de control de inferencia o un ZIP compatible y agregue el índice emparejado si lo tiene. Espere a que finalice la importación.
2. Abra **Inferencia**, actualice la lista de voces si es necesario, seleccione la voz deseada y vaya a **Inferencia única**.
3. Sube el WAV corto. Comience en **Paso 0** y **Relación de índice 0**. Deje los efectos opcionales desactivados y utilice el incrustador esperado por el modelo.
4. Haga clic en el control de conversión una vez y espere el resultado. Reproduzca el resultado y luego descárguelo del reproductor si está disponible. Mantenga su entrada WAV para poder comparar la misma frase más tarde.
5. Si desea probar la recuperación, seleccione el índice coincidente e intente un pequeño aumento desde cero. Si la salida falla o la voz se vuelve más difícil de entender, regrese a la línea base y verifique el emparejamiento modelo-índice.

Si la voz nunca aparece, primero verifique el registro de importación. Un punto de control de entrenamiento guardado como un archivo G o D pertenece a un experimento y necesita una exportación de inferencia antes de poder seleccionarlo aquí.

## 5. Entrena una voz y guarda tu trabajo

1. En **Capacitación**, elija un nuevo **Nombre de modelo**. Importe su audio o ZIP a través de los controles de carga del conjunto de datos. Espere a que se complete la importación y confirme que **Ruta al conjunto de datos** apunta a las grabaciones importadas.
2. Ejecute el **Comprobador de conjunto de datos** y escuche cualquier grabación sospechosa. Confirme que su arquitectura RVC V2, frecuencia de muestreo, incrustación y configuración de tono coincidan con sus preentrenamientos G/D seleccionados si los usa. Comience con un tamaño de lote que se ajuste a la GPU asignada.
3. Ejecute **Datos de proceso** y luego **Extracción de funciones**. Lea el estado de cada uno antes de continuar. Si cambia el conjunto de datos o el codificador, prepare archivos nuevos para ese experimento antes del entrenamiento.
4. Ejecute **Train Pth** con un primer objetivo modesto y guarde los puntos de control periódicos. Mantenga un breve clip de prueba fuera de los datos de entrenamiento. Compare los puntos de control exportados en ese mismo clip antes de comenzar una ejecución más larga.
5. Cree el índice de características si necesita recuperarlo, luego intente exportar la inferencia en **Relación de índice 0** primero. Para obtener una explicación detallada de cada configuración, consulte [Controles de entrenamiento y flujo de trabajo](training-controls.md).
6. Si desea detener la ejecución, use **Detener y guardar** dentro de Ilaria RVC y espere hasta que el registro confirme el guardado. Descargue los resultados mientras la sesión de Kaggle aún está activa.

## 6. Descargue una copia de seguridad antes de salir

La celda opcional **Exportar resultados** del cuaderno crea un archivo en `/kaggle/working/Ilaria-RVC-results.zip`. Una sesión en vivo es temporal. Verifique que tenga la copia de seguridad en su propia computadora antes de detener o restablecer la sesión.

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

Si el problema se repite, anote la sección que falla, el nombre de la GPU del paso 1 y el primer error de la salida de la celda. El cuaderno también escribe el registro de inicio de la aplicación en `/kaggle/working/.ilaria-notebook/startup.log`. Elimina la URL de Gradio de cualquier registro que compartas. Consulte [Solución de problemas RVC](../reference/troubleshooting.md) para obtener diagnósticos de modelo y audio.
