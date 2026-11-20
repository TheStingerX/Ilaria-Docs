---
label: "💬 Text to speech"
order: 93
permalink: /text-to-speech/
description: "Text to speech (TTS) generates a source recording from words you type. RVC then applies a separate voice model to that recording."
---
# Text to speech and RVC

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Text to speech (TTS) generates a source recording from words you type. RVC then applies a separate voice model to that recording. The TTS voice supplies pronunciation, accent, timing and most of the expression. The target model changes how that performance sounds.

## Make a short test

1. Open the TTS workspace. Type a few sentences or supply a UTF-8 text file.
2. Choose a language and source voice. Ilaria RVC offers Microsoft Edge voices online and installed Windows voices for offline use. Each voice engine may expose a different set of rate, volume and source-pitch controls.
3. Generate and listen to the source before converting it. If a name or acronym is mispronounced, adjust the wording or select a more suitable source voice.
4. Select a model and convert. Start with neutral transposition and judge the original and converted recordings side by side.
5. Generate long scripts in paragraphs where practical. Keep edits and exports named consistently so a single sentence can be regenerated later.

## Diagnose the right stage

| What you hear | What to try |
| --- | --- |
| The source stresses the wrong word | Add punctuation, rewrite the sentence or try a different TTS voice. |
| The source sounds rushed | Slow down the source or break the text into shorter sentences. |
| Speech is clear before conversion and dull after | Try a different pitch extractor or less retrieval influence. |
| The online voice list is unavailable | Check connectivity or choose an installed Windows voice. |
| The voice changes tone between paragraphs | Use the same source voice, settings and target model for each paragraph. |

Voice conversion preserves much of the source delivery. Pick the source based on the performance you want to keep. For more comparisons, use the [audio quality guide](audio-quality.md).

[Ilaria RVC project and supported TTS engines](https://github.com/TheStingerX/Ilaria-RVC)
