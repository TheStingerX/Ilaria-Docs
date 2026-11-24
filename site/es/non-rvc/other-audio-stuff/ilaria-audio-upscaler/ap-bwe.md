# Ampliar la banda de voz con AP-BWE

## Elige un perfil de banda

Elige **AP-BWE** y ajusta el primer número del perfil al ancho de banda útil de la voz. Una señal a 8 kHz contiene frecuencias de hasta unos 4 kHz. Una llamada guardada en WAV a 48 kHz puede seguir teniendo esa banda estrecha. Si dudas, consulta un espectrograma o compara perfiles cercanos con el mismo fragmento. La aplicación remuestrea a la frecuencia de entrada del perfil antes de la inferencia, por lo que un perfil demasiado bajo puede descartar detalles.

| Entrada (kHz) | Salida (kHz) |
| ---: | ---: |
| 2 | 16 |
| 4 | 16 |
| 8 | 16 |
| 8 | 48 |
| 12 | 48 |
| 16 | 48 |
| 24 | 48 |

## Compara los resultados

Descarga los pesos del perfil elegido, añade el audio, elige el formato y pulsa **Enhance audio**. AP-BWE predice en paralelo los espectros de amplitud y fase y reconstruye la onda a la frecuencia de salida. La aplicación procesa cada canal por separado. Si aumenta el siseo o aparecen artefactos metálicos, prueba un perfil más cercano a la banda original.

[Descripción general](overview.md) · [Instalación y modelos](installation.md) · [Restaurar voz con Sidon](sidon.md) · [Preescucha, exportación y resolución de problemas](export.md)

## Fuentes

[AP-BWE](https://github.com/yxlu-0102/AP-BWE) · [AP-BWE audio demos](https://yxlu-0102.github.io/AP-BWE/) · [studio_engine.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_engine.py) · [AP-BWE weight license](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/LICENSE-AP-BWE-WEIGHTS.txt)
