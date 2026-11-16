---
label: "💿 Instale Vonovox"
order: 99
permalink: /ilaria-rvc/vonovox/installation/
---
# Instale Vonovox

Vonovox es un conversor de voz en vivo de Windows para GPU NVIDIA compatibles. Utilice esta guía para realizar una prueba de micrófono local limpia antes de abrir Discord, OBS o un juego.

> **Última beta disponible en el repositorio de descargas** · [Descargar Vonovox 2.0.0 Beta 3 (ZIP)](https://huggingface.co/dr87/vonovox/resolve/main/vonovox-200beta3.zip)

## 1. Reúna los archivos y dispositivos

- Abra Windows **Administrador de tareas → Rendimiento** e identifique la tarjeta gráfica por su nombre. Utilice la [lista de paquetes oficiales](https://huggingface.co/dr87/vonovox/tree/main) para resolver una compilación o un parche específico de hardware si es necesario. Mantenga las compilaciones antiguas en funcionamiento en sus propias carpetas.
- Prepare un punto de control RVC V2 listo para inferencias y verifique qué incrustador espera el modelo. Un punto de control de entrenamiento como `G_*.pth` sirve para reanudar el entrenamiento. Para la primera ejecución, elija un modelo con procedencia conocida y ejecútelo sin índice si la compilación lo ofrece.
- Conecte un micrófono físico y unos auriculares con cable. Cierre otros programas que puedan tomar el control exclusivo de los dispositivos de audio y confirme que Windows pueda grabar su micrófono sin formato.

## 2. Inicie la aplicación

1. Descargue el ZIP, luego use **Extraer todo** y coloque el paquete completo en una carpeta local grabable como `C:\VoiceTools\Vonovox`. Ejecute lanzadores desde la carpeta extraída, con sus archivos de soporte al lado.
2. El paquete ya está precompilado. Abre la carpeta extraída y ejecuta `start.bat`. Puedes omitir `setup.bat`.
3. Espere la interfaz. Si la ventana se cierra inmediatamente, ejecute el mismo iniciador desde un símbolo del sistema abierto para que el último error permanezca visible. Verifique que extrajo el archivo completo y que seleccionó una compilación de GPU compatible.
4. Seleccione el modelo RVC V2 en el área de modelo. Elija el incrustador esperado cuando la interfaz de usuario lo exponga. Comience con controles de tono y formantes neutros, tamaño de bloque predeterminado y efectos opcionales desactivados.

## 3. Comprueba la primera señal

Elija su micrófono físico como **Dispositivo de entrada** y un monitor de auriculares adecuado o el extremo de reproducción de su cable virtual como **Dispositivo de salida**. Si la interfaz de usuario expone el backend de audio, comience con WASAPI y el modo compartido. Presiona **Inicio**, espera un momento y di una oración seguida de una pausa. Deberías escuchar la voz convertida, seguida de silencio. Presione **Detener** antes de cambiar los dispositivos de audio o comenzar la siguiente prueba.

Si el modelo no se carga, verifique RVC V2 y el integrador antes de cambiar la configuración de audio. Si no se escucha ninguna voz, confirme el micrófono y los dispositivos de salida por separado. Continúe con [enrutamiento y sintonización del micrófono](live-audio.md) una vez que comience el modelo.

## Lista de verificación de primera ejecución

### Verifique la GPU antes de descargar

1. En Windows, presione **Ctrl + Shift + Esc** y abra **Rendimiento**. Seleccione cada entrada de GPU y lea su nombre. En una computadora portátil, es posible que veas gráficos integrados y una GPU NVIDIA dedicada.
2. Haga coincidir la GPU dedicada con el paquete disponible del desarrollador. Utilice el enlace Beta 3 anterior para esa versión. Si la lista de paquetes incluye una compilación o un parche específico del hardware, verifique que se aplique a su archivo antes de instalarlo.
3. Mantenga espacio tanto para el ZIP como para la carpeta extraída. Utilice una carpeta local en la que pueda escribir. Evite iniciar directamente desde el ZIP o copiar un iniciador fuera de su carpeta.
4. Conecta tu micrófono y auriculares. Abra **Configuración → Sistema → Sonido → Entrada** y hable. Si Windows no detecta una señal aquí, corrija el permiso de entrada o del micrófono antes de abrir Vonovox.

### Verifique que la configuración realmente haya finalizado

1. El paquete ya está precompilado. Abre la carpeta extraída y ejecuta `start.bat`. Puedes omitir `setup.bat`.
2. Si la ventana se cierra enseguida, abre el símbolo del sistema en esa carpeta, ejecuta `start.bat` y lee el primer error.
3. Si el programa de instalación informa que falta un tiempo de ejecución de Microsoft, instale o repare el tiempo de ejecución de Visual C++ vinculado y vuelva a intentarlo. Si informa que CUDA no se puede inicializar, verifique el controlador NVIDIA y la compatibilidad de compilación. Mantenga el paquete completo junto.
4. Si está actualizando una instalación que funciona, extráigala a una nueva carpeta y mantenga disponible la versión anterior. Pruebe la nueva versión antes de reemplazar una configuración que funcione.

### Cargue una voz y verifíquela antes de abrir una llamada

1. Desempaquete el archivo de voz si es necesario. Encuentra la inferencia `.pth`. Los archivos con nombres como `G_*.pth` o `D_*.pth` suelen ser puntos de control de entrenamiento.
2. Elija la voz RVC V2 y utilice el incrustador especificado por su editor. Mantenga el tono neutral, los efectos desactivados y el búfer en el valor predeterminado para la primera prueba.
3. Selecciona el micrófono físico. Envíe la salida a los auriculares para una prueba directa si es compatible, o utilice el cable virtual y el monitoreo de Windows descrito en [Enrutar y sintonizar Vonovox](live-audio.md).
4. Inicie el convertidor y diga una frase corta, luego haga una pausa. La salida debe tener tu tiempo y palabras con el timbre de la voz seleccionada. Si escucha su micrófono normal o el silencio, siga las comprobaciones de enrutamiento antes de cambiar el tono o los efectos.

| Síntoma | Verifique primero |
| --- | --- |
| No hay error de GPU o CUDA | Verifique que el paquete sea compatible con su GPU NVIDIA dedicada y que Windows lo vea. |
| No se carga una voz | Verifique la versión RVC y el codificador. Pruebe una exportación de inferencia compatible antes de cambiar la configuración de audio. |
| No hay señal de micrófono | Pruebe el micrófono físico en Windows, luego vuelva a seleccionar el mismo dispositivo en Vonovox. |
| Buen sonido local pero silencio en una llamada | Analice los puntos finales del cable y la selección del micrófono de destino en la guía de enrutamiento. |
| El audio se interrumpe solo durante un juego | Pruebe con el juego abierto y aumente el tamaño del bloque un paso si es necesario. |
