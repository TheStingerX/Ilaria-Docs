# Piper

O Piper gera fala em modo local e funciona offline após descarregar a voz.

## Instalar e gerar

Executa os comandos na mesma pasta. Mantém o `.onnx` junto do `.onnx.json`.

~~~bash
python -m pip install piper-tts
python -m piper.download_voices
python -m piper.download_voices en_US-lessac-medium
python -m piper -m en_US-lessac-medium -f test.wav -- "This is a test."
~~~

## Resolução de problemas

Se o modelo faltar, confirma a pasta. Consulta a licença da voz antes de distribuir áudio.

[GitHub · Piper](https://github.com/OHF-Voice/piper1-gpl) · [Voice model cards](https://huggingface.co/rhasspy/piper-voices)
