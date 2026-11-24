---
label: "Instalar y convertir con RVC GUI"
icon: ":control_knobs:"
order: 99
permalink: /ilaria-rvc/rvc-gui/file-conversion/
description: "Esta guía cubre la aplicación de escritorio archivada de Tiger14n para convertir archivos de audio."
---
# Instalar y convertir con RVC GUI

[GitHub](https://github.com/Tiger14n/RVC-GUI)

Esta guía cubre la aplicación de escritorio archivada de Tiger14n para convertir archivos de audio. Prepare un punto de control de voz y una grabación WAV breve y seca antes de comenzar.

## 1. Abra la aplicación de Windows

1. Abra el [paquete de Windows](https://github.com/Tiger14n/RVC-GUI/releases/tag/Windows-pkg)] del proyecto. Descargue el activo empaquetado de la versión y extraiga el contenido en una carpeta grabable. Mantenga el tiempo de ejecución y los activos del modelo en el diseño extraído.
2. Abre el lanzador incluido. Se puede iniciar un pago de origen con `RVC-GUI.bat` en Windows o `python rvcgui.py` una vez configurado el tiempo de ejecución. La fuente archivada espera un entorno Python y PyTorch compatible más `hubert_base.pt` en la raíz de su proyecto. Utilice un entorno independiente si está probando el origen para que otras instalaciones de RVC conserven sus dependencias.
3. Si la aplicación empaquetada se cierra inmediatamente, ejecute su iniciador desde una terminal abierta y lea el primer error. Un archivo que contenga únicamente archivos fuente no tendrá el tiempo de ejecución empaquetado. Si el error nombra HuBERT en una instalación de origen, coloque los [pesos HuBERT](https://huggingface.co/lj1995/VoiceConversionWebUI/resolve/main/hubert_base.pt) del proyecto en la raíz del proyecto.

> Los checkpoints HuBERT genéricos no se recomiendan como codificador predeterminado para conversión de voz. Se entrenan para representar el habla y pueden conservar el timbre de origen en el audio convertido. Usa el codificador previsto por el modelo RVC, como ContentVec si se entrenó con él.

## 2. Agregue una voz

Haga clic en **Importar modelo desde .zip** y seleccione un ZIP que contenga una inferencia `.pth` y su coincidencia `.index`, si se proporciona. Para la colocación manual, coloque los archivos en una subcarpeta por voz en el directorio `models` de la aplicación. Por ejemplo:

```text
models/
  MyVoice/
    MyVoice.pth
    MyVoice.index
```

Seleccione la voz importada en la GUI. Si no está, vuelva a abrir la lista de modelos o reinicie la aplicación después de verificar la carpeta. Utilice un modelo de inferencia compatible con la compilación archivada. Un modelo creado con un codificador o una arquitectura que la compilación no puede cargar debe probarse en una aplicación compatible.

## 3. Convierta un clip de referencia

1. En **Ingresar archivo de audio**, haga clic en **Examinar** y seleccione una grabación vocal breve y seca con una vocal y una consonante claramente expresadas. Utilice un archivo WAV completo como base; separe primero una raíz vocal si la fuente es una canción completa.
2. Selecciona la voz de los controles del modelo. Si su modelo tiene varias ranuras para altavoces compatibles, elija la ranura documentada; de lo contrario, utilice el valor predeterminado.
3. Deje **Pitch** en cero y establezca **Tasa de recuperación de funciones** en cero para la línea base. Deje el **método F0** como predeterminado para esta prueba.
4. Haga clic en **Convertir** una vez y espere a que **Ruta de salida** muestre el archivo generado. Haga clic en **Abrir** para reproducirlo y compararlo con el original a un volumen similar. Copie el archivo generado con un nombre distinto si desea conservarlo para compararlo. Compara la misma oración antes de hacer otro ajuste.
5. Si desea un personaje objetivo más fuerte y tiene el índice coincidente, pruebe con una pequeña combinación de recuperación. Si las palabras se vuelven menos claras, regrese a la línea de base.

## Problemas comunes

| Qué sucede | Qué verificar |
| --- | --- |
| Importar informes con pesos faltantes | Abra el archivo y confirme que contiene una inferencia `.pth` en lugar de solo audio, documentación o un punto de control de capacitación. |
| No aparece ningún modelo | Verifique el diseño de la carpeta extraída y asegúrese de haber abierto la aplicación desde la misma instalación. |
| Voz incorrecta o salida metálica | Verifique el punto de control seleccionado, el codificador compatible, el índice opcional y la grabación de origen. Utilice un clip sin procesar con la recuperación desactivada. |
| La conversión de archivos parece detenerse | Pruebe un WAV local corto e inspeccione la consola. Verifique el primer error antes de volver a intentar un renderizado largo. |
| El rendimiento es pobre | Compruebe qué dispositivo utiliza la compilación de PyTorch instalada. Para plataformas más antiguas o características de modelos más nuevos, consulte la [Comparación de herramientas RVC](../../../reference/tools.md). |
