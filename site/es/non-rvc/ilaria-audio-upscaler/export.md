# Preescucha, exportación y resolución de problemas

## Escuchar y guardar

Añade uno o más archivos, elige el formato y pulsa **Enhance audio**. Compara el original y el resultado a **1×**. **Speed** solo cambia la reproducción. Selecciona el resultado y pulsa **Save result** para conservarlo. Las preescuchas sin guardar son temporales. Usa WAV o FLAC para editar después. Ambos motores generan un WAV PCM intermedio de 16 bits, por lo que otro formato no añade precisión.

## Problemas comunes

**Faltan pesos:** descarga los del motor y perfil elegidos. **Falla CUDA:** prueba **CPU** con un WAV corto para distinguir un problema del dispositivo de uno del archivo. **No abre o no exporta:** prueba un WAV válido y revisa FFmpeg, el espacio libre y los permisos. **Proceso lento:** prueba un fragmento en Auto o con una GPU CUDA compatible. **Resultado peor:** compáralo con el original y ajusta el motor o el perfil al problema.

**WAV (PCM)** · **FLAC** · **MP3** · **M4A (AAC)** · **M4A (ALAC)** · **AAC (ADTS)** · **OGG (Vorbis)** · **Opus** · **AIFF (PCM)** · **WavPack** · **WMA**

[Descripción general](overview.md) · [Instalación y modelos](installation.md) · [Restaurar voz con Sidon](sidon.md) · [Ampliar la banda de voz con AP-BWE](ap-bwe.md)

## Fuentes

[studio.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio.py) · [studio_formats.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_formats.py)
