---
label: "Piper"
icon: ":speaker:"
order: 96
permalink: /non-rvc/tts/piper/
---

# Piper

Piper erzeugt Sprache lokal und läuft nach dem Stimmen-Download offline.

## Installieren und erzeugen

Führe die Befehle im selben Ordner aus. Bewahre `.onnx` und `.onnx.json` zusammen auf.

~~~bash
python -m pip install piper-tts
python -m piper.download_voices
python -m piper.download_voices en_US-lessac-medium
python -m piper -m en_US-lessac-medium -f test.wav -- "This is a test."
~~~

## Fehlerbehebung

Prüfe bei fehlendem Modell den Ordner. Beachte beim Teilen die Lizenz der Stimme.

[GitHub · Piper](https://github.com/OHF-Voice/piper1-gpl) · [Voice model cards](https://huggingface.co/rhasspy/piper-voices)
