---
label: "Instalar TG Developed Fork"
icon: ":package:"
order: 100
permalink: /ilaria-rvc/tgr/installation/
description: "TG Developed Fork (TGR) proviene de la rama Deiteris de la familia w-okada. El editor documenta esta fork como solo RVC."
---
# Instalar Okada TG Developed Fork

[GitHub](https://github.com/tg-develop/voice-changer)

TG Developed Fork (TGR) proviene de la rama Deiteris de la familia w-okada. El editor documenta esta fork como solo RVC. Tiene sus propios archivos de versión, lanzadores y restricciones de dispositivo. Guárdelo en su propia carpeta para que una instalación funcional de VCClient o Deiteris permanezca disponible para comparar.

## Descargue la versión que coincida con su computadora

Marque **Administrador de tareas → Rendimiento** en Windows o **Acerca de esta Mac** en macOS. Lea el nombre real de la GPU o del chip. En el nombre del archivo de lanzamiento, `amd64` se refiere a la arquitectura del procesador utilizada por las PC estándar Intel y AMD de 64 bits.

| Configuración | Archivo para buscar en [versiones de TGR](https://github.com/tg-develop/voice-changer/releases) |
| --- | --- |
| Windows con NVIDIA CUDA compatible | Las `voice-changer-windows-amd64-cuda.zip` dividen partes de la misma versión. |
| Windows con AMD, gráficos Intel compatibles o funcionamiento solo con CPU | `voice-changer-windows-amd64-dml.zip`. Seleccione CPU en la aplicación cuando realice pruebas sin una GPU utilizable. |
| Apple Silicon Mac | `voice-changer-macos-arm64-cpu.tar.gz` si está incluido. El editor marca la compatibilidad con macOS como experimental. |
| Intel Mac | `voice-changer-macos-amd64-cpu.tar.gz` si está incluido. La aceleración depende de los gráficos instalados y de la compilación. |
| Linux | Utilice los recursos de la versión explícitamente etiquetados para Linux cuando estén disponibles, o la configuración fuente de el fork. |

## Windows paso a paso

1. En la página de lanzamientos, expanda **Activos** para un lanzamiento. Descargue DirectML ZIP o cada parte de CUDA. Un ejemplo dividido incluye `.001` y `.002`. Las piezas deben permanecer una al lado de la otra con sus nombres descargados.
2. Para CUDA, utilice una herramienta de archivo que admita archivos divididos y extraídos de `.001`. Lee las últimas partes durante la extracción. Para DirectML, extraiga el archivo ZIP único. Elija una carpeta en la que pueda escribir y mantenga intactas las carpetas extraídas.
3. Abra el paquete extraído, luego `MMVCServerSIO`, luego inicie `MMVCServerSIO.exe`.
4. Deje abierta la ventana de inicio mientras se descargan los pesos necesarios. Cuando se abra el navegador, mantenga esa consola disponible para realizar diagnósticos. Si la página no se abre automáticamente, utilice la dirección local impresa por el servidor.
5. La primera conversión CUDA puede tardar unos segundos en comenzar. Espere a que se caliente antes de presionar repetidamente Inicio o cambiar de dispositivo.

## macOS o Linux

En macOS, descomprima el archivo para su arquitectura de chip exacta y abra el ejecutable `MMVCServerSIO` incluido. Si macOS bloquea el inicio, confirme que el archivo proviene de la versión oficial y examine el bloque antes de realizar cambios en el sistema. Otorgue acceso al micrófono al navegador para la captura del navegador o a la aplicación local cuando abre el micrófono directamente.

Para una instalación fuente de Linux, utilice el propio archivo fuente de el fork y el entorno documentado Python 3.10. Abra una terminal en la carpeta `server` del repositorio. El instalador es `vc_install.sh`; elija el backend que coincida con su sistema cuando se le solicite. Utilice el script de inicio incluido en esa versión y abra la dirección local impresa en la terminal. Los nombres de los scripts difieren según las instantáneas. Para identificar los puntos de entrada proporcionados, enumere los archivos en la carpeta `server` antes de ejecutar uno. Para un binario de lanzamiento, descomprima el paquete para su arquitectura e inicie el ejecutable incluido. El archivo Windows DirectML es un tiempo de ejecución independiente.

## Aislar errores de inicio

| Síntoma | Primera verificación |
| --- | --- |
| La extracción se detiene cuando falta un archivo | Confirma que todas las partes CUDA están presentes y son de la misma versión. Inicie la extracción nuevamente desde `.001`. |
| Un peso no supera la verificación | Lea el nombre del archivo en el registro de inicio. Cierre el proceso, cambie el nombre solo de la dependencia descargada citada como copia de seguridad y luego reinicie para volver a intentar descargarla. Mantenga intactos su biblioteca de modelos de voz y sus archivos de índice. |
| El navegador muestra un error de conexión | Compruebe si la consola del servidor informa una dirección lista. Inicie una instancia y manténgala abierta mientras usa la página. |
| DirectML se inicia pero la GPU es lenta o falta | Confirme el nombre de la GPU seleccionada y pruebe la CPU u otro dispositivo compatible con el mismo modelo. El proyecto informa un rendimiento deficiente en algunas configuraciones integradas de Intel. |
| Error al abrir el micrófono | Verifique los permisos de entrada en el sistema operativo y el navegador, luego repita en un navegador basado en Chromium si Firefox ESR no muestra la lista de dispositivos. |

Cuando se cargue la página, continúa con [Primer modelo, micrófono y cable virtual](live-audio.md).
