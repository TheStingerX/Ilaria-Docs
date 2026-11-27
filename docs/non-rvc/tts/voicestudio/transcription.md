---
label: "Transcription and dictation"
icon: ":memo:"
order: 94
permalink: /non-rvc/tts/voicestudio/transcription/
---

# VoiceStudio · Transcription and dictation

[VoiceStudio v0.5.8 · Transcription and dictation](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/electron-transcriptions.md)

## Transcribe a file

1. Open **Transcriptions** and upload a short file.
2. Check the ASR engine and language. For speaker labels, verify identification is available in the chosen mode.
3. Review names, dates and technical words. Correct or copy the text from history using the available controls. Speaker labels are estimates.

## Dictate from a microphone

Grant microphone access and select a dictation model. Some models stream text while you speak, while others process after you stop. Test in a blank document. If the text does not paste into the target window, check history or the clipboard and the permissions required by your OS.

## First controlled transcription

1. Prepare a short clip containing a technical term and a known name.
2. Select an ASR model for the language. If automatic detection is wrong, set the language explicitly where available.
3. Transcribe and compare text with audio. Review names, numbers and negatives.
4. If speaker labels matter, test an excerpt with two people. Check each speaker change against the audio.

## Set up the microphone and test dictation

In **Transcriptions**, install a model suited to accuracy or low latency. Open a blank document, start **Start dictation**, speak and stop recording. Check the target window. If insertion fails, try the clipboard and history before changing engines. If there is no text, check microphone permissions and system input levels.

[First synthesis](first-run.md) · [Troubleshooting](troubleshooting.md)
