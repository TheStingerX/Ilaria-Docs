# rvc-cli · Instalación

[GitHub](https://github.com/blaisewf/rvc-cli) · [Versión consultada](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Software antiguo · No recomendado
**rvc-cli** está archivado en GitHub y ya no se mantiene. La aplicación está desactualizada y se desaconseja para nuevas instalaciones. [Guías por aplicación](../../app-guides.md)
!!!

## Versión y alcance

Esta guía cubre **blaisewf/rvc-cli 1.2.4**. El repositorio indica que ya no se mantiene y remite a Applio para la CLI mantenida. Separa la carpeta y el entorno Python de los proyectos antiguos. Permite inferencia con archivos, procesamiento por lotes y entrenamiento.

## Windows con install.bat

Extrae el código de la etiqueta, abre la terminal en su raíz y ejecuta `install.bat`. Usa Miniconda para crear un entorno Python 3.9 en `env/` e instala las ruedas PyTorch para CUDA 12.1. Espera a que termine y usa el intérprete del entorno. El archivo es `rvc_cli.py`.

~~~powershell
.\install.bat
.\env\python.exe rvc_cli.py -h
.\env\python.exe rvc_cli.py prerequisites -h
~~~

## Linux con un entorno virtual

El script `install.sh` de la etiqueta crea `venv/` con el `python3` disponible. Usa Python 3.9 como recomienda el README y activa el entorno en la terminal actual. Consulta `prerequisites -h` e instala los recursos de tu flujo antes de convertir. Si falta un módulo, revisa el intérprete y la instalación.

~~~bash
bash install.sh
source venv/bin/activate
python rvc_cli.py -h
python rvc_cli.py prerequisites -h
~~~

[Uso y resolución de problemas](usage.md)
