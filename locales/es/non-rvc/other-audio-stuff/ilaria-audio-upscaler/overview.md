---
label: "Descripción general"
icon: ":speaker:"
order: 99
permalink: /non-rvc/ilaria-audio-upscaler/overview/
---

# Ilaria Audio Upscaler

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [v1](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v1)

## Elige el motor

Ilaria Audio Upscaler procesa grabaciones localmente en Windows. Usa **Sidon** para voz con ruido, reverberación o compresión. Usa **AP-BWE** para voz limpia pero de banda limitada, por ejemplo una grabación telefónica. Ambos motores están pensados para voz hablada. Compara el resultado con el original antes de usarlo en un conjunto de datos.

## Primera prueba

Conserva el archivo original. Procesa un fragmento breve con un motor y expórtalo en WAV. Compara a un volumen similar y escucha consonantes, pausas y timbre. Las frecuencias altas se sintetizan a partir de la señal disponible. Un archivo a 48 kHz no recupera la forma de onda original exacta.

[Instalación y modelos](installation.md) · [Restaurar voz con Sidon](sidon.md) · [Ampliar la banda de voz con AP-BWE](ap-bwe.md) · [Preescucha, exportación y resolución de problemas](export.md)

## Fuentes

[GitHub](https://github.com/TheStingerX/Ilaria-Audio-Upscaler) · [Sidon](https://github.com/sarulab-speech/Sidon) · [AP-BWE](https://github.com/yxlu-0102/AP-BWE)
