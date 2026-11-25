# AICoverGen · Instalación

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Software antiguo · No recomendado
**AICoverGen** es un flujo antiguo para covers con RVC v2 que ya no tiene mantenimiento activo y depende de paquetes de la época de Python 3.9+. Para una instalación nueva, elige una aplicación con mantenimiento activo. [Guías por aplicación](../../app-guides.md)
!!!

## Qué hace AICoverGen

AICoverGen es una pipeline automatizada con WebUI y CLI para generar covers musicales con IA usando modelos de voz **RVC v2** existentes. A partir de un enlace de YouTube o un archivo de audio local, separa la voz principal del instrumental con MDX-Net, convierte la voz con tu modelo `.pth` (y `.index` opcional), aplica mezcla y reverberación y vuelve a unir la pista. No entrena modelos nuevos: trabaja con archivos de inferencia RVC v2 ya exportados.

## Requisitos previos

- **Python 3.9+** (se recomienda Python 3.10)
- **GPU NVIDIA con CUDA** recomendada para obtener una velocidad de conversión razonable
- **FFmpeg** y **SoX (`sox`)** instalados y accesibles en el `PATH` del sistema

## Instalación local

Clona el repositorio, instala las dependencias de Python, descarga los modelos base necesarios (MDX-Net para separación vocal y HuBERT base) y lanza la interfaz web de Gradio (por defecto en `http://127.0.0.1:7860`):

~~~bash
git clone https://github.com/SociallyIneptWeeb/AICoverGen.git
cd AICoverGen
pip install -r requirements.txt
python src/download_models.py
python src/webui.py
~~~

Ejecutar `python src/download_models.py` descarga automáticamente los modelos MDX-Net y el modelo HuBERT base requeridos antes de generar la primera cover.

## Google Colab

Si tu ordenador no cuenta con una GPU NVIDIA adecuada, el repositorio incluye el cuaderno oficial (`AICoverGen_colab.ipynb`) para instalar las dependencias del sistema (incluido `sox`), descargar los pesos base y abrir la interfaz Gradio en una GPU en la nube.

[Uso y resolución de problemas](usage.md)
