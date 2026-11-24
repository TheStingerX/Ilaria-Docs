# rvc-cli · Uso y resolución de problemas

[GitHub](https://github.com/blaisewf/rvc-cli) · [Versión consultada](https://github.com/blaisewf/rvc-cli/releases/tag/1.2.4)

!!!warning Software antiguo · No recomendado
Estos proyectos están desactualizados y no muestran mantenimiento activo. rvc-cli está archivado y las ramas principales de RVC Studio y Mangio RVC Fork llevan años inactivas. Las guías se conservan para proyectos existentes. Para una instalación nueva, elige una aplicación con mantenimiento activo. [Guías por aplicación](../app-guides.md)
!!!

## Archivo individual y carpetas

Empieza con un WAV corto, un `.pth` exportado para inferencia y su índice. En 1.2.4 el parser exige `--index_path`; usa `--index_rate 0` para desactivar la recuperación. Para carpetas usa `batch_infer` con `--input_folder` y `--output_folder`. Prueba primero unos archivos en un destino separado. Activa el entorno correcto. En Windows puedes usar `.\env\python.exe` en lugar de `python`.

~~~bash
python rvc_cli.py infer --input_path "input.wav" --output_path "output.wav" --pth_path "voice.pth" --index_path "voice.index" --f0_method rmvpe --pitch 0 --index_rate 0
python rvc_cli.py batch_infer -h
~~~

## Etapas de entrenamiento

Usa `preprocess` para preparar los datos, `extract` para tono y características, `train` para los pesos e `index` para el índice opcional. Mantén el nombre y ajustes compatibles de frecuencia, versión RVC, embedder y tono. Lee la ayuda de cada comando. Si se reanuda un entrenamiento inesperado, revisa el nombre. Si falla la inferencia, distingue los pesos exportados de los checkpoints de entrenamiento.

~~~bash
python rvc_cli.py preprocess -h
python rvc_cli.py extract -h
python rvc_cli.py train -h
python rvc_cli.py index -h
~~~

[Instalación](installation.md)
