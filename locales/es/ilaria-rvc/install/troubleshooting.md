---
label: "Registros y recuperación"
icon: ":hammer_and_wrench:"
order: 92
permalink: /ilaria-rvc/troubleshooting/
---
# Registros y recuperación

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

> **RMVPE · 2.4.2** · Corrige la inferencia de RMVPE cuando cuDNN rechaza una operación GRU. RMVPE usa una entrada contigua y reintenta esa GRU en la CPU si cuDNN devuelve `CUDNN_STATUS_NOT_SUPPORTED`. Requiere la versión 2.4.0 o posterior. Instala la 2.4.2 desde **Other → Update Ilaria RVC**.

## La aplicación se cierra o el navegador permanece en blanco

1. Ejecute `RUN_ILARIA_RVC_LOGS.bat` desde la carpeta completamente extraída. Deje la consola abierta y lea el primer error, incluido el archivo o dispositivo al que nombra.
2. Si la consola muestra que el servidor local se está ejecutando, abra la dirección impresa allí. El valor predeterminado es `http://127.0.0.1:6969`. Si el puerto está ocupado, verifique si hay una instancia existente antes de lanzar una segunda. Guarde cualquier trabajo activo antes de cerrarlo.
3. Verifique el modelo de GPU exacto en **Administrador de tareas → Rendimiento** y compárelo con [GPU compatibles](gpu-compatibility.md). El paquete de Windows incluye CUDA 12.8. En una PC que solo tenga GPU Maxwell, Pascal o Volta NVIDIA, verifique el progreso en `cu126-runtime-install.log` mientras el iniciador prepara el tiempo de ejecución de CUDA 12.6. Una descarga fallida requiere verificar el acceso a Internet y el espacio libre en el disco.
4. Si falta un archivo después de la extracción, verifique que se haya extraído todo el archivo y que el acceso directo apunte a esa instalación. Haga una copia de seguridad de sus modelos, conjuntos de datos y carpetas de experimentos antes de reemplazar los archivos de instalación.

## Falta el modelo o el audio suena mal

| Síntoma | Primera verificación |
| --- | --- |
| Falta una voz en **Modelo de voz** | Verifique el registro de importación, luego haga clic en **Actualizar**. Seleccione una inferencia `.pth` exportar. Al experimento pertenece un punto de control de entrenamiento G o D. |
| Un archivo no se puede decodificar | Reproducirlo fuera de la aplicación. Exporte un WAV PCM corto a una carpeta local grabable y pruebe esa copia. |
| La conversión falla solo con el índice | Establezca **Proporción de índice** en cero e intente sin índice. Si eso funciona, verifique que el `.index` opcional coincida con el modelo y su incrustador. |
| La voz todavía suena como la fuente. | Confirme el modelo seleccionado y su incrustador esperado. Los codificadores HuBERT genéricos pueden conservar el timbre fuente. Pruebe la misma frase con la recuperación desactivada antes de comparar configuraciones. |
| Las respiraciones o consonantes son metálicas | Pruebe varios clips limpios con efectos desactivados. Si el mismo modelo sigue distorsionando esos sonidos, inspeccione los ejemplos de respiración y consonantes en los datos de entrenamiento, corríjalos y vuelva a entrenar. |
| Un archivo largo falla pero uno corto funciona | Verifique la VRAM y pruebe con **Split Audio** o segmentos más cortos. Escuche cada unión antes de exportar. |

Comience con **Pitch 0**, un WAV corto y seco y un modelo en buen estado. Cambie una configuración por prueba. Consulte [Controles de inferencia](../convert/inference-buttons.md) para conocer los efectos y las opciones de exportación.

## El entrenamiento se detiene o no se puede reanudar

1. Compruebe qué etapa falló. En **Datos de proceso**, confirme que la ruta del conjunto de datos apunta a grabaciones legibles y que la unidad de salida tiene espacio. En **Extracción de características**, verifique que el preprocesamiento se haya completado y que los recursos de tono e incrustación elegidos estén disponibles.
2. Si **Train Pth** se queda sin VRAM, descargue el modelo de inferencia, cierre los trabajos de GPU competidores, reduzca el **Tamaño de lote** y deshabilite el almacenamiento en caché del conjunto de datos de GPU si está habilitado. Consulte el **Registro de entrenamiento** para conocer las configuraciones efectivas antes de volver a intentarlo.
3. Si **Train Index** falla, verifique que las funciones extraídas pertenezcan al experimento seleccionado. Un índice es opcional para la conversión. Puede probar una exportación de inferencia funcional en **Relación de índice 0** mientras diagnostica el índice.
4. Para interrumpir el entrenamiento, haga clic en **Detener y guardar** y espere la confirmación. Para reanudar, utilice el mismo nombre del experimento y la configuración compatible. Mantenga juntos los puntos de control G/D y el estado del experimento. Una exportación de inferencia por sí sola no puede reanudar el entrenamiento.
5. Si cambió la frecuencia de muestreo, el vocoder o el incrustador, cree un experimento separado y prepare funciones para esa configuración. Mantenga la ejecución original disponible para comparar.

## Recuperar una sesión de Kaggle

Si el enlace del navegador deja de funcionar, verifique si la sesión de Kaggle todavía se está ejecutando. Después de reabrir los servicios, utilice los nuevos enlaces y las credenciales actuales que se muestran para cada servicio. WebUI y FileBrowser tienen inicios de sesión separados. Exporta y descarga tus resultados antes de restablecer la sesión. Siga la [guía de Kaggle](../cloud/kaggle.md) para conocer los pasos de respaldo.

## Recopilar detalles para un informe

Copie la versión de la aplicación, la GPU exacta y el primer error. Incluye el botón que presionaste y una breve secuencia que reproduce el problema. Para el entrenamiento, incluya la etapa fallida, la frecuencia de muestreo, el incrustador y si reanudó una ejecución. Para la conversión, mencione si el mismo clip funcionó con otro modelo o con la recuperación desactivada. Si está disponible, utilice **Panel de formación → Informe de diagnóstico**. Revise el informe antes de compartirlo y elimine rutas privadas, contraseñas y enlaces de sesión.
