# Primeros pasos

[Descarga Ilaria RVC 2.4.0 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

También puedes usar Ilaria RVC en Kaggle con su GPU remota, incluso si tu ordenador no tiene una GPU NVIDIA. [Ilaria RVC on Kaggle](../ilaria-rvc/cloud/kaggle.md)

Para ver los pasos de instalación, configuración y solución de problemas, consulta las [guías de cada aplicación](../other-rvcs/app-guides.md).

## Ilaria RVC

1. Obtenga el paquete de Windows del [repositorio de Ilaria's Hugging Face](https://huggingface.co/TheStinger/Ilaria_RVC). Consulte las instrucciones de su versión antes de actualizar su controlador NVIDIA o cambiar las dependencias.
2. Extraiga el paquete completo a una carpeta grabable. Ejecute el iniciador desde esa carpeta, para que pueda encontrar las herramientas de audio y tiempo de ejecución incluidas.
3. Abrir `RUN_ILARIA_RVC.bat`. Si el inicio falla, cierre ese intento y use `RUN_ILARIA_RVC_LOGS.bat` para ver la consola.
4. Si la interfaz no se abre automáticamente, use [http://127.0.0.1:6969](http://127.0.0.1:6969) en la misma PC. Mantén el lanzador funcionando mientras trabajas.

### Convertir un primer clip

1. Importar un modelo compatible desde **Otro**. Mantenga su índice coincidente opcional con el punto de control.
2. Abra **Inferencia única**, seleccione su modelo y agregue una grabación de voz breve y seca.
3. Comience con el extractor de tono predeterminado. Establezca el cambio de tono y la **Relación de índice** en cero para una línea de base.
4. Convierte el clip y escucha el inicio, la frase más fuerte y las consonantes que suenen más suaves que en el original.
5. Exportar una referencia WAV. Siga [Conversión de voz](../conversion/voice-conversion.md) para comparar configuraciones alternativas en la misma fuente.

### Actualización y copia de seguridad

Para una instalación existente, use **Otro → Actualizar Ilaria RVC** y lea las notas de la versión antes de aplicar la actualización. Guarde una copia de sus conjuntos de datos, modelos exportados, puntos de control de entrenamiento y audio convertido antes de cambiar de versión. Mantenga los puntos de control de entrenamiento separados de los modelos de inferencia que utiliza o comparte.

Utilice grabaciones y modelos de voz para los que tenga permiso. Para demostraciones de modelos y disponibilidad, consulte el [catálogo](https://ilariarvc.shop/en/demos/).

[Notas de instalación y fuente de Ilaria RVC](https://github.com/TheStingerX/Ilaria-RVC) · [Notas de la versión](https://github.com/TheStingerX/Ilaria-RVC/blob/main/docs/CHANGELOG.md)

## Vonovox

> **Versión más reciente (beta)** · [Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

1. En Windows con NVIDIA, descargue el archivo para su generación de GPU desde [Vonovox en Hugging Face](https://huggingface.co/dr87/vonovox/tree/main). Extraiga el paquete completo e inicie la aplicación incluida.
2. Cargue un modelo RVC V2 y seleccione su micrófono y auriculares en la configuración del dispositivo de audio.
3. Inicie la conversión con el búfer predeterminado y diga una oración corta. Confirme que el monitor suene claro antes de [enrutarlo a otra aplicación](../conversion/real-time.md).

## w-okada VCClient

1. Obtenga un paquete para su plataforma y backend de [VCClient en Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Compruebe que sea compatible con RVC y el formato de su modelo. El hardware compatible puede diferir entre los modelos PyTorch y ONNX.
2. Extraiga la versión e inicie el servidor o iniciador incluido. Abra el cliente desde la dirección local que se muestra al inicio si no se abre automáticamente.
3. Importe la voz a una ranura de modelo, seleccione esa ranura y configure los dispositivos de entrada y monitorización. Inicie la conversión y escuche a través de auriculares antes de conectar la salida a una llamada.

## Horquilla desarrollada por Okada TG

1. Elija un paquete de [lanzamientos de TGR](https://github.com/tg-develop/voice-changer/releases). En Windows, use CUDA para una tarjeta NVIDIA compatible o la compilación DirectML para una GPU AMD o Intel compatible.
2. Inicie la compilación extraída, seleccione el dispositivo informático correspondiente e importe la voz en una ranura RVC.
3. Configure su micrófono y monitor de auriculares, luego pruebe en el búfer predeterminado. Elija un extractor de tono disponible en su compilación al recrear un ajuste preestablecido desde otro backend.

## RVC GUI

1. Descargue el paquete de escritorio de [Versiones de RVC GUI](https://github.com/Tiger14n/RVC-GUI/releases). Esta aplicación archivada está destinada a configuraciones heredadas compatibles.
2. Extraiga e inicie la aplicación. Importe un ZIP que contenga el punto de control de inferencia y su índice coincidente, si se proporciona, luego seleccione la voz importada.
3. Elija una grabación vocal corta, comience con cero semitonos y convierta. Escuche el resultado y guarde una copia de referencia.

## Applio

1. Obtenga el instalador o paquete para su plataforma desde [Descargas de Applio](https://applio.org/). En Escritorio, finalice la configuración del motor y confirme su dispositivo informático. Para una compilación de Gradio empaquetada, extraiga el archivo completo, inicie el iniciador y abra su dirección local.
2. Agregue una voz a la biblioteca de modelos y abra **Convertir audio**. En versiones anteriores de Gradio, la pestaña puede llamarse **Inferencia**.
3. Seleccione el modelo, el incrustador correspondiente y el índice opcional, luego convierta un WAV corto y limpio con paso a cero. Continúe con el [flujo de trabajo de conversión de Applio](../conversion/voice-conversion.md#convert-a-recording-in-applio) para ver ejemplos de configuraciones y lotes.

## RVC WebUI (Mainline - Original RVC)

1. Elija un paquete compatible entre [lanzamientos de RVC WebUI (Mainline - Original RVC)](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/releases). Para un paquete de Windows que lo incluya, extraiga el archivo y ejecute `go-web.bat`. Mantenga la consola abierta mientras usa la WebUI.
2. Coloque el punto de control de inferencia en `assets/weights` y su índice de recuperación correspondiente en `logs`. Actualiza las listas y selecciona tu voz.
3. Ingrese la ruta completa a un archivo de audio corto, mantenga el tono en cero y haga clic en **Convertir**. Utilice el control de descarga del reproductor de salida para guardarlo. Consulte el [Flujo de trabajo de conversión principal](../conversion/voice-conversion.md#convert-a-recording-in-mainline-rvc) para verificaciones adicionales.

## Redpanda-vc

1. Descargue [Redpanda-vc](https://github.com/redpanda343/Redpanda-vc) e inicie WebUI con una compilación adecuada a su sistema. El proyecto proporciona una opción de contenedor CUDA para NVIDIA.
2. Seleccione el motor RVC y cargue una voz RVC compatible con su índice opcional. Redpanda-vc también ofrece otras familias de modelos, cada una con su propio formato de modelo.
3. Para una prueba de micrófono del navegador, permita el acceso al micrófono, elija la GPU deseada si la configuración de transmisión expone la selección del dispositivo e inicie la transmisión. Verifique el monitor de auriculares en el búfer predeterminado antes de reducir la latencia.

Para una comparación lado a lado, consulte [Herramientas RVC](../reference/tools.md). Para conocer el enrutamiento, la latencia y las interrupciones del micrófono, consulte [Conversión de voz en tiempo real](../conversion/real-time.md).

## RVC Blue

Conversión de voz en tiempo real en Windows. [Instalación y configuración](../other-rvcs/rvc-blue/installation.md).
