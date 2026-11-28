# Restaurar música con Apollo

[GitHub · Apollo](https://github.com/JusperLee/Apollo) · [Ilaria Audio Upscaler V2](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/releases/tag/v2)

## Cuándo usarlo

Apollo está disponible en Ilaria Audio Upscaler V2. Procesa música localmente a **44,1 kHz** con CPU o NVIDIA CUDA. Pruébalo con un MP3 de baja tasa de bits y compara el detalle que estima con el original.

## Primera prueba

Selecciona **Apollo** y descarga el modelo si hace falta. Ocupa unos **63,5 MiB** y se guarda en `App/checkpoints/Apollo`. Deja el dispositivo en **Auto**, añade un fragmento corto y pulsa **Enhance audio**.

## Comparar y guardar

Escucha el mismo fragmento a **1×** y a un volumen similar. Revisa los platillos y los ataques de la batería. Pulsa **Save result** para conservar el resultado. WAV usa **PCM de 24 bits** por defecto y ofrece **WAV (PCM 16-bit)**.

## Solución de problemas

Si falta el modelo, selecciona Apollo antes de descargarlo. Si falla CUDA, elige **CPU** y prueba con un WAV corto. Si aparecen artefactos, conserva el original.
