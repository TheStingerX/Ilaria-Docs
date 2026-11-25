---
label: "Microsoft Edge TTS"
icon: ":speaker:"
order: 99
permalink: /non-rvc/tts/edge/
---

# Microsoft Edge TTS

## Read a page aloud

Open a page in Microsoft Edge and choose **Read aloud** from the browser menu where available. Use **Voice options** to select a language, voice and reading speed. Immersive Reader can make supported pages easier to read and listen to. This route is for listening in the browser.

## Save your own text as audio

The community-maintained `edge-tts` command uses Microsoft Edge’s online speech service. It is separate from Edge's browser controls and from Azure Speech. Your script is sent to the online service, so choose text you can share.

With Python available, install the tool and list voices. The example uses a voice ID you can verify in the list before generating.

~~~bash
python -m pip install edge-tts
edge-tts --list-voices
edge-tts --voice it-IT-ElsaNeural --text "Ciao, questa è una prova." --write-media prova.mp3
~~~

## Longer narration

Save the script as UTF-8 and use `--file script.txt` instead of `--text`. Choose the voice locale that matches the script. Use punctuation to guide pauses and write ambiguous abbreviations in full when needed. Start with a paragraph and adjust speed with `--rate=-10%` if it reads too fast. Use `--write-subtitles` with a filename if you also need captions.

## Troubleshooting

If the shell cannot find `edge-tts`, check whether Python installed it in your current environment. If a voice is missing, list voices again and copy its exact ID. If requests fail, check the internet connection and try a short sentence first. For an offline workflow, see [Kokoro TTS](kokoro.md).

[Microsoft Edge documentation](https://support.microsoft.com/en-us/topic/use-immersive-reader-in-microsoft-edge-78a7a17d-52e1-47ee-b0ac-eff8539015e1) · [edge-tts repository](https://github.com/rany2/edge-tts)
