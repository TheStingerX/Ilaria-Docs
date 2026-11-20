---
label: "Instale Applio"
icon: ":cd:"
order: 97
permalink: /ilaria-rvc/applio/installation/
---
# Instale Applio y verifique el motor

[GitHub](https://github.com/IAHispano/Applio) · [Hugging Face](https://huggingface.co/IAHispano/Applio)

Applio tiene **dos opciones de descarga** que ejecutan **exactamente el mismo motor** - solo cambian la **interfaz y el método de instalación**:
1. **Desktop App**: abre una ventana de aplicación instalada y gestiona su entorno Python en el primer arranque.
2. **Gradio Web Interface**: ejecuta la aplicación Python y abre una interfaz web local en tu navegador (disponible como paquete compilado de Windows o instalación Python desde código fuente).

## 1. Desktop App

1. Abra las [descargas oficiales de escritorio](https://github.com/IAHispano/Applio-App/releases/latest). Busque **Activos** y expanda la lista si el instalador que necesita está oculto. Elija el activo para su sistema operativo. Los archivos de código fuente son para desarrolladores.
2. En Windows, ejecute el ejecutable de instalación y elija una carpeta en la que su cuenta pueda escribir. La aplicación empaquetada utiliza un directorio `data` al lado de su ejecutable. En macOS, use la imagen de disco de su procesador, ARM64 para Apple Silicon o x64 para Intel. En Linux, instale el paquete Debian disponible o haga ejecutable AppImage y ábralo.
3. Inicie la aplicación y revise los términos de primera ejecución. Mantenga la aplicación abierta mientras configura Python, instala los requisitos del motor, recupera recursos y verifica la instalación. Utilice **Instalar/Reparar** si su compilación lo ofrece cuando falla una verificación.
4. Cuando se complete la verificación, verifique el dispositivo informático detectado en la configuración. Registre el backend y el hardware que informa la aplicación. Una máquina con más de una GPU puede informar un dispositivo diferente al que esperaba.
5. Abra **Modelos**. Si se abre y el motor está listo, continúe con [instalar una voz](models.md). Ejecute la [conversión corta](inference.md) antes de probar el modo en vivo o el entrenamiento.

Puedes instalar un paquete de escritorio oficial sin Node.js o pnpm. Esas herramientas son para crear la aplicación desde el código fuente.

## 2. Gradio Web Interface

1. **Paquete compilado para Windows**: descargue un ZIP de Windows desde [descargas compiladas de Gradio](https://huggingface.co/IAHispano/Applio/tree/main/Compiled/Windows), o clone el [repositorio de GitHub](https://github.com/IAHispano/Applio) para una instalación Python manual desde el código fuente.
2. Extraiga el ZIP completo a una ruta simple de su propiedad, por ejemplo `C:\Applio-Gradio`. Abra esa carpeta en el Explorador. Si ve una segunda carpeta que contiene el iniciador, ábrala.
3. Ejecute `run-applio.bat` (o `python app.py` en una instalación Python manual; `python app.py --help` muestra las opciones del servidor). Deje la consola abierta, espere a que imprima una dirección local y ábrala exactamente en su navegador.
4. Busque **Modelos** o **Descargar**, según la versión. Luego abra **Convertir audio** o **Inferencia**. Si el navegador pierde la conexión, verifique si el iniciador aún se está ejecutando antes de volver a abrir la página.

## Si la instalación se detiene

| Lo que ves | Lo primero que debes verificar |
| --- | --- |
| No se abre nada desde el ZIP | Extrae todos los archivos antes de ejecutar el iniciador. |
| El paso de descarga o verificación falla | Lea el primer error en el registro de configuración. Verifique la conectividad, el espacio disponible en el disco y el acceso de escritura antes de volver a intentar el paso fallido. |
| Gradio se detiene antes de mostrar una dirección | Lea la consola sobre la última línea para ver el primer error relevante. El navegador no puede conectarse hasta que se inicie el servicio. |
| Los archivos de audio no se abren ni exportan | Verifique la verificación del motor y el estado de FFmpeg. Prueba con un WAV local que puedes reproducir en otra aplicación. |
| La conversión de archivos comienza pero se queda sin memoria | Cierra los trabajos de la competencia y prueba unos segundos de audio con los efectos desactivados. Pruebe un dispositivo compatible con su compilación. |

Antes de instalar una nueva versión o mover carpetas, guarde el audio de trabajo y haga una copia de seguridad de modelos, índices, conjuntos de datos y experimentos de entrenamiento completos personalizados. Después de la actualización, utilice la misma grabación breve y la misma voz para confirmar que el nuevo motor produce un resultado utilizable.
