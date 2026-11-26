---
label: "Piper"
icon: ":speaker:"
order: 96
permalink: /non-rvc/tts/piper/
---

# Piper

Piper effectue la synthèse en local, hors ligne après téléchargement de la voix.

## Installer et générer

Exécutez les commandes dans le même dossier et conservez le `.onnx` avec son `.onnx.json`.

~~~bash
python -m pip install piper-tts
python -m piper.download_voices
python -m piper.download_voices en_US-lessac-medium
python -m piper -m en_US-lessac-medium -f test.wav -- "This is a test."
~~~

## Dépannage

Vérifiez le dossier si le modèle manque et consultez la licence de la voix avant diffusion.

[GitHub · Piper](https://github.com/OHF-Voice/piper1-gpl) · [Voice model cards](https://huggingface.co/rhasspy/piper-voices)
