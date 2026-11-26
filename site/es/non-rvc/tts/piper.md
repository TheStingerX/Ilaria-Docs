# Piper

Piper sintetiza voz localmente y funciona sin conexión tras descargar la voz.

## Instalar y generar

Ejecuta los comandos en la misma carpeta y conserva juntos el `.onnx` y su `.onnx.json`.

~~~bash
python -m pip install piper-tts
python -m piper.download_voices
python -m piper.download_voices en_US-lessac-medium
python -m piper -m en_US-lessac-medium -f test.wav -- "This is a test."
~~~

## Solución de problemas

Si falla, revisa la carpeta y la licencia de la voz antes de distribuir el resultado.

[GitHub · Piper](https://github.com/OHF-Voice/piper1-gpl) · [Voice model cards](https://huggingface.co/rhasspy/piper-voices)
