# So-VITS-SVC · Uso y entrenamiento

[Instalación](installation.md) · [GitHub · 4.1 Stable](https://github.com/svc-develop-team/so-vits-svc/tree/4.1-Stable)

## Convertir la primera grabación

Coloca un WAV vocal en `raw/` y cambia los ejemplos de rutas y el nombre del hablante por los tuyos. Busca el nombre en `spk`. La salida va a `results/`.

~~~bash
python inference_main.py -m "logs/44k/G_30400.pth" -c "configs/config.json" -n "voice.wav" -t 0 -s "singer"
~~~

## Ajustar la conversión

Empieza con `-t 0`. Deja desactivada la predicción automática del tono para canto. Compara extractores F0 por separado.

## Entrenar un modelo

Organiza las grabaciones por hablante en `dataset_raw/`. Prepara los pesos de base, ejecuta los pasos del ejemplo y conserva la configuración con el checkpoint.

~~~bash
python resample.py --skip_loudnorm
python preprocess_flist_config.py --speech_encoder vec768l12
python preprocess_hubert_f0.py --f0_predictor dio
python train.py -c configs/config.json -m 44k
~~~

## Solución de problemas

Revisa la pareja de modelo y JSON si falla la carga. Si falta memoria, reduce el lote o la longitud de las grabaciones.
