---
label: "Piper"
icon: ":speaker:"
order: 96
permalink: /non-rvc/tts/piper/
---

# Piper

Piper is a neural TTS engine that runs locally. The installation and first voice download need internet. Once both voice files are present, synthesis works offline. Use a separate Python environment so Piper’s dependencies stay isolated.

## Install and generate

Run the commands in a writable folder. The downloaded `.onnx` contains the voice model and the `.onnx.json` carries its settings. Keep them together. The example uses an English voice. Run the voice-list command without an ID to choose another language or voice.

~~~bash
python -m pip install piper-tts
python -m piper.download_voices
python -m piper.download_voices en_US-lessac-medium
python -m piper -m en_US-lessac-medium -f test.wav -- "This is a test."
~~~

## Troubleshooting

For long narration, split the script into short sections and verify pronunciation before generating all of it. Use `python -m piper --help` to check file input, speed and speaker options for your version. If the model is missing, check the working directory. Review the voice’s MODEL_CARD for its license before distributing output.

[GitHub · Piper](https://github.com/OHF-Voice/piper1-gpl) · [Voice model cards](https://huggingface.co/rhasspy/piper-voices)
