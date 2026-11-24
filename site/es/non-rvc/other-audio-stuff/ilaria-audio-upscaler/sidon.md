# Restaurar voz con Sidon

## Restaurar una grabación

Elige **Sidon**, descarga **Sidon INT8**, añade un fragmento con ruido o reverberación, selecciona **WAV (PCM)** y pulsa **Enhance audio**. Escucha si las pausas quedan más limpias y las palabras más claras. Comprueba respiraciones, consonantes suaves y timbre. Conserva el original si el proceso elimina detalles que necesitas.

## Cómo funciona Sidon en la aplicación

La aplicación remuestrea a 16 kHz para extraer características. El predictor Sidon ONNX estima las características de la voz limpia y el decodificador DAC sintetiza audio a 48 kHz. La aplicación procesa cada canal por separado en segmentos de unos seis segundos con contexto y aplica un filtro fijo de reducción de ruido con FFmpeg. INT8 describe los pesos cuantizados del modelo. La profundidad de bits depende del formato de salida.

[Descripción general](overview.md) · [Instalación y modelos](installation.md) · [Ampliar la banda de voz con AP-BWE](ap-bwe.md) · [Preescucha, exportación y resolución de problemas](export.md)

## Fuentes

[Sidon](https://github.com/sarulab-speech/Sidon) · [Sidon-ONNX](https://huggingface.co/soniqo/Sidon-ONNX) · [Speech Core](https://github.com/soniqo/speech-core) · [studio_sidon.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_sidon.py)
