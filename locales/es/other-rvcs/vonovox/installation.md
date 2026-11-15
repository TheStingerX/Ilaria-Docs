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
2. En la distribución documentada por el desarrollador, instale [Microsoft Visual C++ x64 runtime](https://aka.ms/vs/16/release/vc_redist.x64.exe), ejecute `setup.bat` y luego ejecute `start.bat`. Utilice el iniciador suministrado para el archivo exacto que extrajo. El primer lanzamiento puede tardar más mientras se inicializan las dependencias.
3. Espere la interfaz. Si la ventana se cierra inmediatamente, ejecute el mismo iniciador desde un símbolo del sistema abierto para que el último error permanezca visible. Verifique que extrajo el archivo completo y que seleccionó una compilación de GPU compatible.
4. Seleccione el modelo RVC V2 en el área de modelo. Elija el incrustador esperado cuando la interfaz de usuario lo exponga. Comience con controles de tono y formantes neutros, tamaño de bloque predeterminado y efectos opcionales desactivados.

## 3. Comprueba la primera señal

Elija su micrófono físico como **Dispositivo de entrada** y un monitor de auriculares adecuado o el extremo de reproducción de su cable virtual como **Dispositivo de salida**. Si la interfaz de usuario expone el backend de audio, comience con WASAPI y el modo compartido. Presiona **Inicio**, espera un momento y di una oración seguida de una pausa. Deberías escuchar la voz convertida, seguida de silencio. Presione **Detener** antes de cambiar los dispositivos de audio o comenzar la siguiente prueba.

Si el modelo no se carga, verifique RVC V2 y el integrador antes de cambiar la configuración de audio. Si no se escucha ninguna voz, confirme el micrófono y los dispositivos de salida por separado. Continúe con [enrutamiento y sintonización del micrófono](live-audio.md) una vez que comience el modelo.
