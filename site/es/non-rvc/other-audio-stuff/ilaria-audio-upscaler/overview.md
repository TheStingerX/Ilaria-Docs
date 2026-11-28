# Ilaria Audio Upscaler

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Elige el motor

Ilaria Audio Upscaler procesa grabaciones localmente en Windows. Usa **Sidon** para voz con ruido, reverberación o compresión. Usa **AP-BWE** para voz limpia pero de banda limitada, por ejemplo una grabación telefónica. Ambos motores están pensados para voz hablada. Compara el resultado con el original antes de usarlo en un conjunto de datos.

## Apollo

**Apollo** restaura música degradada por compresión con pérdida a **44,1 kHz**, en CPU o NVIDIA CUDA. Elige un fragmento breve, selecciona **Apollo**, descarga el modelo si hace falta y pulsa **Enhance audio**. Compara el original y el resultado a **1×** antes de pulsar **Save result**.

[Apollo](apollo.md)

## Primera prueba

Conserva el archivo original. Procesa un fragmento breve con un motor y expórtalo en WAV. Compara a un volumen similar y escucha consonantes, pausas y timbre. Las frecuencias altas se sintetizan a partir de la señal disponible. Un archivo a 48 kHz no recupera la forma de onda original exacta.

[Instalación y modelos](installation.md) · [Restaurar voz con Sidon](sidon.md) · [Ampliar la banda de voz con AP-BWE](ap-bwe.md) · [Preescucha, exportación y resolución de problemas](export.md)

## Fuentes

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [Sidon](https://github.com/sarulab-speech/Sidon) · [AP-BWE](https://github.com/yxlu-0102/AP-BWE)
