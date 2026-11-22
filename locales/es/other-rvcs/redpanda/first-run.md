---
label: "Configurar Redpanda-vc"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/redpanda/first-run/
description: "Redpanda-vc amplía Applio y ofrece múltiples familias de modelos de voz. Este tutorial utiliza la familia RVC en todo momento."
---
# Configurar Redpanda-vc

[GitHub](https://github.com/redpanda343/Redpanda-vc)

Redpanda-vc amplía Applio y ofrece múltiples familias de modelos de voz. Este tutorial utiliza la familia **RVC** en todo momento. Elija una instalación y mantenga sus dependencias separadas de otros programas RVC.

## 1. Elija una ruta de inicio

1. Descargue el código fuente o un paquete compatible desde el [proyecto Redpanda-vc](https://github.com/redpanda343/Redpanda-vc). Para una configuración de origen, extráigalo a una carpeta de escritura local y verifique que el archivo de dependencia y el iniciador del proyecto estén presentes. Instale las dependencias requeridas por su pago en un entorno Python dedicado. Las instalaciones de CUDA necesitan una compilación de PyTorch que admita la GPU NVIDIA y el controlador en uso.
2. En Windows, comience con `run-install.bat` y deje que termine de preparar el entorno del proyecto incluido. Luego use `run-applio.bat` para la WebUI del navegador o `run-realtime-gui.bat` para la ventana independiente en tiempo real. Ambos lanzadores esperan el entorno creado en la carpeta del proyecto. Abra una terminal en la carpeta del proyecto cuando necesite leer los registros de inicio. Mantenlo funcionando durante el uso.
3. Espere la interfaz de usuario o abra la dirección de bucle invertido impresa por el proceso. Si el iniciador finaliza sin abrir una página, verifique la salida del terminal para detectar un error de importación, una falla de inicialización de CUDA o un conflicto de puerto. Repare el problema mencionado en esta instalación antes de volver a abrirla.
4. Confirmar el dispositivo de ejecución correcto. Pruebe un trabajo a la vez con la interfaz local antes de agregar transmisiones del navegador u otros trabajos con mucha GPU.

## 2. Elige el motor y modelo

En la vista de conversión correspondiente, seleccione el flujo de trabajo **RVC**, elija un punto de control de inferencia compatible y vincúlelo con el índice coincidente solo cuando lo tenga. La aplicación también expone a Beatrice y Rectified Flow en vistas compatibles. Cada uno utiliza su propio formato de modelo. Un modelo que pertenece a otra familia necesita su propio motor.

Si su compilación expone la conversión fuera de línea, comience con un WAV seco y breve hablado y sin transposición. Guarde una salida nueva y verifique las mismas palabras en ambos archivos. Si necesita principalmente una conversión de micrófono, pase directamente a la [prueba en tiempo real](live-audio.md) con un modelo compatible conocido.

## 3. Diagnostique el inicio antes de cambiar la configuración de audio

- **Error de importación**: confirme que el intérprete que ejecuta el iniciador es el que está en el entorno de su proyecto y tiene las dependencias de la compilación.
- **Falta el modelo**: vuelva a verificar la carpeta esperada por su compilación, el motor actual y si el archivo es una exportación de inferencia.
- **Error CUDA**: confirme el dispositivo RVC elegido y pruebe con otros trabajos de GPU cerrados. Registre el primer error en lugar de interpretar el mensaje de apagado final.
- **Compatibilidad poco clara**: tenga en cuenta la versión de pago o del paquete, la GPU y la familia de modelos prevista. Pruebe una línea de base antes de probar funciones o codificadores de voz personalizados.
