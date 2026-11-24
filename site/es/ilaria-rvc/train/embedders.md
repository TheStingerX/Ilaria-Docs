# Incrustadores y preentrenamientos

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **Novedades de la 2.3.0** · Portuguese HuBERT Base es opcional en inferencia. En el entrenamiento RVC v2 puedes cargar y guardar un HuBERT personalizado. Su configuración se conserva en el modelo exportado.

> **2.4.0** · Windows mueve la aplicación y el entorno a app/, y los modelos a models/ en la raíz. Añade Colab, Lightning AI Studio, ayuda para descargar embedders y Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). Se repara pip y se incluye pywin32.

> **2.4.6** · Añade **KLM Vocal ContentVec** (`klm-vocal-contentvec`) como descarga opcional para Inferencia y Entrenamiento RVC v2, y añade **43 pares G/D KLM verificados** en **Recommended pretraineds** (la compatibilidad varía por par). Nota: las descargas Legacy Core de Lyery se retiraron en la 2.4.4 tras eliminarse los archivos originales.

> **2.4.7** · Restauradas las descargas autorizadas de los pretrained **Legacy Core 1.5 V2** y **Legacy Core 1.6** a 32 kHz y mejorada la recuperación ante actualizaciones interrumpidas.

## Incrustadores de inferencia

Abra **Configuración de incrustador** debajo de **Procesamiento de audio**. Lee automáticamente los metadatos del modelo almacenado y utiliza ContentVec cuando no se registra ningún incrustador. Si el editor especifica un codificador, utilícelo. Un índice de recuperación necesita características compatibles del mismo experimento. Deje la recuperación desactivada cuando el emparejamiento sea incierto.

Los codificadores de inferencia disponibles incluyen ContentVec, Spin, Spin-v2 y HuBERT Base en chino, japonés y coreano. Abra **Otro → Descargar integradores** para instalar modelos opcionales uno a la vez. Para activos HuBERT personalizados, seleccione **personalizado**, asigne un nombre a la carpeta, proporcione los pesos y archivos de configuración correspondientes (.bin y .json) e instálelos juntos.

> Los checkpoints HuBERT genéricos no se recomiendan como codificador predeterminado para conversión de voz. Se entrenan para representar el habla y pueden conservar el timbre de origen en el audio convertido. Usa el codificador previsto por el modelo RVC, como ContentVec si se entrenó con él.

## Compatibilidad de entrenamiento

La capacitación expone ContentVec y Spin-v2. Cambiar el codificador requiere funciones nuevas y un nombre de experimento independiente. Haga coincidir su par de generador y discriminador con el vocoder, la frecuencia de muestreo de entrenamiento, la generación de RVC y la configuración de tono, y siga los requisitos del codificador del par. RefineGAN admite entrenamiento e inferencia a 32, 40 y 44,1 kHz con RVC v2 y Pitch Guidance.

## Consigue un par G/D

En **Otro → Descargar modelos previamente entrenados**, use un repositorio o archivo previamente entrenado, o ingrese un enlace al punto de control G y su punto de control D coincidente si el descubrimiento necesita ayuda. El selector **Preentrenamiento recomendado** muestra las variantes de catálogo disponibles y sus tasas de muestra. Verifique la variante elegida antes de instalar ambos archivos. Regrese a Entrenamiento, actualice la lista y seleccione el par instalado. Si utiliza la inicialización aleatoria intencionalmente, elija Ninguno. Mantenga separados los modelos de inferencia y los preentrenamientos de entrenamiento.

Si el entrenamiento finaliza inmediatamente después de seleccionar un par, verifique ambos archivos y la configuración del experimento guardado antes de cambiar el tamaño del lote o comenzar una nueva ejecución.
