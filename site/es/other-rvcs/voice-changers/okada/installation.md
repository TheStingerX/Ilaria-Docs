# Instalar w-okada VCClient

[GitHub](https://github.com/w-okada/voice-changer) · [Hugging Face](https://huggingface.co/wok000/vcclient000)

VCClient convierte audio de micrófono en vivo. La interfaz es el **cliente** y el proceso de conversión es el **servidor**. Para su primera prueba, ejecute ambos en la misma computadora. La versión del cliente (v1 o v2) y la versión del modelo (RVC V1 o V2) identifican cosas diferentes. Verifique el soporte del modelo del paquete antes de elegir un archivo.

## Antes de descargar

1. Verifique su sistema operativo y arquitectura de procesador. En Windows, abra **Administrador de tareas → Rendimiento** y lea el modelo de GPU. En Mac, abra **Acerca de esta Mac** y busque un chip Apple o un procesador Intel.
2. Conecta tu micrófono y auriculares. Realiza una breve grabación en el sistema operativo para comprobar el micrófono independientemente de VCClient.
3. Mantenga disponible un modelo de inferencia RVC que funcione correctamente. Un `.pth` es un modelo de PyTorch, mientras que un `.onnx` usa un tiempo de ejecución ONNX. Utilice la combinación opcional `.index` solo con el modelo al que pertenece. Consulte [Modelos y archivos](../../../start/models.md) si recibió un ZIP o un conjunto de puntos de control de capacitación.

## Elija un paquete

Abra [Descargas de VCClient en Hugging Face](https://huggingface.co/wok000/vcclient000/tree/main). Elija un archivo de las versiones de w-okada que coincida con esta tabla. El número de versión reemplaza la parte variable del nombre del archivo.

| Su computadora | Paquete a buscar | Qué verificar |
| --- | --- | --- |
| Windows con GPU NVIDIA compatible | v2 Windows CUDA, `vcclient_win_cuda_….zip` | Seleccione la tarjeta NVIDIA real en la aplicación. Utilice una CPU o una compilación estándar si el tiempo de ejecución instalado no puede utilizar su GPU. |
| Windows con AMD o una configuración de solo CPU | v2 estándar de Windows, `vcclient_win_std_….zip` | Pruebe el dispositivo DirectML si es compatible. La conversión de CPU es una opción, con la velocidad determinada por el modelo y el procesador. Verifique los proveedores disponibles antes de importar un modelo. |
| Windows con gráficos Intel | Una versión heredada o estándar compatible | En la configuración documentada de Windows v1, la aceleración de GPU AMD e Intel es para los modelos ONNX. Seleccione CPU si su paquete estándar no detecta un proveedor de GPU utilizable para su modelo. |
| Apple Silicon Mac | v2 Mac, `vcclient_mac_….zip` | Compruebe que el activo esté dirigido a Apple Silicon. Pruebe con el proveedor y los formatos de modelo RVC enumerados en esa versión. |
| Linux | Distribución de código fuente y tiempo de ejecución compatible | La configuración de código fuente o contenedor dedicado está separada de los archivos binarios de Windows y Mac. Haga coincidir CUDA, el tiempo de ejecución AMD compatible o la CPU con su hardware. |

Para Windows v2, el proyecto incluye compatibilidad con Torch y ONNX. Un archivo determinado aún puede usar un proveedor diferente de otro archivo en la misma compilación. Conserve el modelo original al probar un formato diferente. Cambiar el nombre de la extensión del nombre del archivo no lo convierte.

## Inicie en Windows

1. Extraiga el ZIP completo a una carpeta de escritura normal. Utilice una carpeta separada para cada compilación que pruebe. Ejecutar un iniciador desde dentro del archivo puede impedir que encuentre su tiempo de ejecución.
2. Abra la carpeta extraída y ejecute `start_http.bat` para configurar la misma computadora. Mantenga su consola abierta. Si el paquete ofrece varios lanzadores, elija uno para el tiempo de ejecución descargado y la conexión local.
3. Espere el inicio y las descargas de activos de primera ejecución. Abra la dirección local que se muestra en la consola si la interfaz no se abre por sí sola.
4. Comprueba que ves las ranuras de modelo y los controles para iniciar la conversión. Deje la página web y la consola abiertas para la [primera prueba de micrófono](live-audio.md).

## Iniciar en Mac

1. Expanda el archivo de Apple Silicon y mantenga juntos los archivos agrupados.
2. Abra el iniciador local del paquete (`startHttp.command` donde se proporcione). Deje que finalice la configuración y abra la dirección informada por la consola si es necesario.
3. Cuando el sistema le pregunte si el navegador o la aplicación pueden usar el micrófono, conceda acceso para la prueba. Si el permiso fue denegado anteriormente, cámbielo en **Configuración del sistema → Privacidad y seguridad → Micrófono** y vuelva a abrir la aplicación.
4. Confirme que el servidor se esté ejecutando antes de abrir una segunda copia. Cerrar el servidor detiene la conversión incluso cuando el navegador todavía está abierto.

## Si falla antes de abrir

| Lo que ves | Qué comprobar |
| --- | --- |
| El lanzador se cierra inmediatamente | Ejecútelo desde su carpeta completamente extraída y lea el primer error de la consola. Vuelva a verificar la arquitectura y la compatibilidad del tiempo de ejecución. |
| La descarga de primera ejecución permanece incompleta | Mantenga el proceso abierto y verifique su progreso y error de red. Vuelva a intentarlo con el mismo paquete oficial después de que vuelva la conectividad. |
| La página local da un error de conexión | Verifique que el servidor aún esté funcionando y use la dirección que imprimió. La página del navegador no puede iniciar un servidor local detenido. |
| El hardware NVIDIA está instalado, pero la CPU está activa | Verifique el nombre del archivo del backend, el controlador instalado y la GPU seleccionada en VCClient. Pruebe la ruta de la CPU por separado para distinguir un problema de modelo de un problema de GPU. |
| Se abre el panel del modelo pero la lista de micrófonos está vacía. | Verifique el medidor de entrada del sistema operativo y el permiso del sitio del navegador. Para el modo cliente, vuelva a cargar después de otorgar permiso. Para el modo de servidor, actualice la lista de dispositivos del servidor. |

Continúe con [Audio en vivo, enrutamiento y solución de problemas](live-audio.md).
