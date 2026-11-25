---
label: "Kokoro TTS"
icon: ":musical_note:"
order: 98
permalink: /non-rvc/tts/kokoro/
---

# Kokoro TTS

## Install the command-line tool

This guide uses the standalone CLI by nazdridoy. It generates speech from text with preset voices. Install it in an isolated Python environment or with `uv tool install kokoro-tts`.

~~~bash
python -m pip install kokoro-tts
kokoro-tts --help
~~~

Download both [kokoro-v1.0.onnx](https://github.com/nazdridoy/kokoro-tts/releases/download/v1.0.0/kokoro-v1.0.onnx) and [voices-v1.0.bin](https://github.com/nazdridoy/kokoro-tts/releases/download/v1.0.0/voices-v1.0.bin) from the CLI repository. Place them alongside a UTF-8 `input.txt` in a working folder and open the terminal there. The model runs locally after setup. A default model-file error usually means you are in the wrong working directory or a download has a different name.

## Generate a first WAV

~~~bash
kokoro-tts --help-languages
kokoro-tts --help-voices
kokoro-tts input.txt output.wav --lang en-us --voice af_sarah --speed 1.0
~~~

Choose a locale listed by your installed version. Match it to the text and use an appropriate voice. Listen for names and abbreviations. Correct the text before changing speed. For Italian, verify the Italian language code and available voice in the built-in listings.

## Read long documents and blend voices

For a first audiobook test, try a short chapter. The CLI can read EPUB and PDF files, but PDF extraction may place headers or columns in the wrong order or produce no text for scanned pages. Review extracted text or convert it to clean TXT first. Use `--split-output ./chunks/` to generate separate files. For a blend, an example from upstream is `--voice "af_sarah:60,am_adam:40"`. Compare blended and single voices on the same sentence.

## Diagnose failures

A missing command points to the installation or environment. Missing voices or model files point to the working folder or asset filenames. For pronunciation problems, verify language and punctuation first. If local playback fails, generate a WAV and open it in a normal player to separate sound-device problems from synthesis failures.

[CLI repository](https://github.com/nazdridoy/kokoro-tts)
