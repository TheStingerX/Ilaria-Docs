---
label: "AICoverMaker · First cover"
icon: ":musical_note:"
order: 98
permalink: /ilaria-rvc/aicovermaker/usage/
---

# AICoverMaker · First cover

## Prepare the source and the voice

A cover on this workflow starts from recorded audio. The separator extracts a vocal stem, RVC changes the voice, and the result is mixed with the backing track. Use a song you can work with legally. For a quick test, choose an excerpt with one clear lead voice.

Use the file upload where available, or **Download Music** for supported URLs you have permission to use. Add an inference model through the file drop area or **Download Model**. Select the `.pth` voice checkpoint and its matching `.index` if available. For the first comparison, leave retrieval off.

## Separate, convert and listen

1. Select the audio and the target voice in the conversion interface. Keep pitch shift at **0** for your first test, then adjust in semitones if the target voice needs a different range.
2. Use a vocal separation model if your input includes instruments. Check the isolated lead by itself. If backing vocals leak through, assess or prepare the stem separately before trying different RVC settings.
3. Convert and listen to the voice alone first. Play the loudest note and the quiet ends of phrases, then check the full mix.
4. Save the result and write down the model, separator, pitch and retrieval settings. Repeat with one change at a time.

## Fix common issues

If the model is missing, check how it was imported and refresh the list where available. If the audio contains stray instruments or other singers, review the isolated stem. If notes jump in an otherwise clean stem, compare pitch extraction separately. **TTA** is an optional separation setting and can take longer. Compare on the same short recording before using it on a whole song.

[Installation](installation.md) · [Project repository](https://github.com/Eddycrack864/RVC-AI-Cover-Maker-UI)
