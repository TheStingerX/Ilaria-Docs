---
label: "Text to speech"
icon: ":speech_balloon:"
order: 96
permalink: /ilaria-rvc/tts/
---
# Text to speech

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Use **Inference → TTS** to turn written text into a recording. You can listen to the generated speech directly or convert it with an RVC model. The two stages do different jobs: the speech engine decides how the script is pronounced and paced, while RVC changes the voice character of the recording. If a name is mispronounced in the first result, fix the script or source voice before tuning RVC.

> **What’s new in 2.3.0** · ElevenLabs joins the TTS engines. Enter your ElevenLabs API key and select a voice. Start with a short line before converting the generated speech.

> **What’s new in 2.4.1** · Kokoro v1.0. In **Inference → TTS → Kokoro (local)**, install Kokoro when you need it. The separate download takes about 528 MB of disk space once installed. Select a voice and test a short sentence first. Microsoft Edge needs internet access, Windows uses installed desktop voices, and ElevenLabs needs an API key.

## Choose a source voice

| Engine | When to choose it | What to check |
| --- | --- | --- |
| Microsoft Edge | You want to browse online voices by language. | The service needs an internet connection and sends the text to Microsoft for synthesis. Choose a voice that speaks the language of the script. |
| Windows | You want offline synthesis on the local Windows installation. | The list depends on supported desktop voices installed on that PC. If the voice is missing, check the Windows speech settings and refresh the list. |
| ElevenLabs | You want to use a voice from your ElevenLabs account. | Requires internet access and an ElevenLabs API key. The text is sent to ElevenLabs for synthesis. |
| Kokoro (local) | You want local synthesis with Kokoro v1.0. | Install Kokoro from the TTS tab first. It occupies about 528 MB once installed and includes 54 voices, among them Sara and Nicola in Italian. |

The source voice speaks the words. **Voice Model** is the RVC model that changes the timbre later. For example, start with an Italian source voice for an Italian script, then select the target RVC model separately. A strong voice model does not add phonetic distinctions missing from the source.

## Make a first recording

1. Open **Inference → TTS**. Type a short sentence or import a UTF-8 `.txt` file. The text field supports up to **10,000 characters**. Start with one paragraph before importing a long script.
2. Pick the speech engine. Filter the list by language, choose a source voice, and use **Refresh voices** if the list is stale.
3. Leave rate and volume near their defaults and leave RVC conversion off for the first test. Generate the speech and listen to the original result.
4. Check names, punctuation and pauses. If a line sounds rushed, split the sentence or adjust rate. If an abbreviation is read incorrectly, try writing it out. Generate the same short excerpt again and compare.
5. Keep this first good version as a reference before changing the RVC controls.

## Convert the generated speech

1. Choose the target **Voice Model** above the TTS panel. Use an inference `.pth` compatible with your app. Its matching `.index` is optional.
2. Enable **RVC conversion**. Start with conversion pitch at **0 semitones**, the default pitch extractor, **Index Ratio 0**, and optional effects disabled. Use the content encoder expected by the target model.
3. Run the conversion, then listen to the original and converted players separately. Compare the same sentence at a similar playback level. Use the converted player's download control to save the WAV.
4. If you have the matching index, try a small increase in **Index Ratio** and compare again. Keep it at zero if you do not use an index. Changing retrieval cannot correct a word the TTS engine read incorrectly.

## What each setting changes

| Control | What it changes | First adjustment to try |
| --- | --- | --- |
| Speech rate | The speed of the source voice before conversion. | Slow down a little if syllables run together. Check timing before tuning pitch. |
| Source volume | The level of the generated speech before conversion. | Keep the source clean and at a useful level. Compare files at similar loudness. |
| Source pitch in Hz | Changes pitch during Edge synthesis where supported. | Leave it at its default first. Change it separately from RVC pitch. |
| RVC pitch in semitones | Transposes the generated voice during conversion. | Start at zero and test small shifts. Check the lowest and highest words in the sample. |
| Pitch extraction | Estimates the pitch contour from the generated audio. | Compare extractors only if the converted pitch jumps or wobbles. |
| Index Ratio | Controls how strongly the conversion uses the selected index. | Start at zero. Use a modest value only with the exact matching index. |
| Player volume | Controls listening volume. | Use it to compare playback levels. Use the conversion or export settings if you need to change the resulting file. |

## Prepare a longer script

Split a long script at paragraph or scene boundaries. Keep the same source voice, rate, target model and conversion settings across sections. Save outputs with ordered names such as `01-intro.wav` and `02-main.wav`. Join them in an audio editor and listen across each boundary. Match pauses and loudness before exporting the final file.

For scripts with more than one language, test a short phrase in each language before rendering. Use separate source voices or sections if necessary. Some phonetic contrasts may remain difficult after conversion because of the target model or its content encoder.

## Troubleshooting

| What you hear or see | What to check |
| --- | --- |
| Edge produces no speech | Check internet access, refresh the voice list and try a short plain-text sentence with another compatible voice. |
| Windows list is empty | Check which desktop speech voices are installed and available to the app. Offline synthesis depends on the local Windows environment. |
| The source and converted clips mispronounce the same word | Change the source voice or rewrite the word in the script, then regenerate the source. |
| The original is clear but the conversion distorts consonants or jumps pitch | Test the same source with retrieval and effects off. Check the encoder and pitch extraction. If the same model distorts several clean inputs, inspect the training data and consider retraining. |
| The converted voice still sounds like the source | Check the selected model and encoder. Compare another clean clip before increasing retrieval. |
| No converted result appears | Check that **RVC conversion** is enabled and that the selected voice is an inference model. Read the first error in the log. |

For other conversion settings, see [Inference controls](inference-buttons.md). For diagnostics, see [Troubleshooting](../../reference/troubleshooting.md).
