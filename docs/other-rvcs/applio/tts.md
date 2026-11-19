---
label: "Generate speech from text"
icon: ":speech_balloon:"
order: 92
permalink: /ilaria-rvc/applio/tts/
---
# Turn a short script into converted speech

Applio uses an online Edge TTS voice to read your text and an RVC model to change the generated voice. The source voice determines pronunciation, pacing and the language it reads. Use text you are comfortable sending to the online synthesis service.

1. Open the text-to-speech workspace after the engine is ready and the [voice model works](inference.md).
2. Enter one short sentence with punctuation. Choose a source TTS voice for the language of that sentence. Start with its ordinary speaking rate.
3. Select your RVC inference voice, the matching embedder and its index if you use one. Start with pitch shift at 0 and effects off.
4. Generate speech and listen to the output. If your interface makes the synthesized source available, play it too. If the source misreads an acronym or pauses oddly, change punctuation, spell out the acronym or select another source voice first.
5. When the phrase sounds right, save the audio and write down the source voice, speaking rate, RVC model, embedder and pitch. For longer scripts, use small sections with natural breakpoints and keep their settings consistent.

If the speech generation step fails, test a different source voice and check the engine’s connection to the speech service. If speech generation succeeds and only conversion fails, run a short recorded file through the same RVC model. That test exposes model or embedder problems without changing the script.
