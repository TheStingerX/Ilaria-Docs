---
label: "Instalación"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/mangio/installation/
---

# Mangio RVC Fork · Instalación

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Versión consultada](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Software antiguo · No recomendado
La rama principal de **Mangio RVC Fork** lleva años inactiva. La aplicación está desactualizada y se desaconseja para nuevas instalaciones. [Guías por aplicación](../app-guides.md)
!!!

## Versión histórica y entorno

Mangio RVC Fork es un fork experimental de la WebUI original. La guía se refiere a la etiqueta histórica **v23.7.0**. Separa su entorno y recursos de las instalaciones modernas. En Windows, el lanzador incluido requiere un paquete oficial con `runtime/python.exe`. El código fuente requiere dependencias y modelos base. El README de la etiqueta recomienda Python 3.9.8 para instalar dependencias manualmente.

## Abrir la WebUI o la interfaz de texto

En el paquete Windows ejecuta `go-web.bat`. Abre `infer-web.py` con el intérprete incluido y el puerto 7897. Usa la URL local de la terminal. Si falla, comprueba el intérprete antes de cambiar dependencias. Para la CLI interactiva en un entorno preparado, ejecuta `infer-web.py --is_cli`.

~~~bash
python infer-web.py --is_cli
~~~

[Uso y resolución de problemas](usage.md)
