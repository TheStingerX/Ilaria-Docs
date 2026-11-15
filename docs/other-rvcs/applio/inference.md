---
label: "🎙️ Convert a recording"
order: 95
permalink: /ilaria-rvc/applio/inference/
---
# Convert a recording in Applio

Start with one short recording you can recognize instantly. Spoken test material could be “Could you put the blue book by the window?” followed by a quiet pause. For a song, use a few seconds of an isolated lead vocal. The engine receives the sound present in that file, including room noise, accompaniment or other speakers.

## Make a reference conversion

1. Open **Convert Audio**. In older Gradio versions, look for **Inference**. Select the single-file mode.
2. Select the inference voice you [installed](models.md), and confirm the embedder and speaker ID. If settings restored when you changed voices in Desktop, inspect them before using the new voice.
3. Add your audio recording. Use **Pitch** at 0 and disable extra processing and effects. Start with retrieval influence at 0. Select WAV or FLAC so you can compare lossless results.
4. Start the conversion once. In Desktop, look at the job status if the result is queued. In Gradio, leave the launch console open to see errors that do not fit in the browser.
5. Play both files. Check that words land in the same places and that the output contains the target voice. Save the output to a folder you control and record the settings you used.

## Change one control at a time

| Control | A useful first experiment |
| --- | --- |
| Pitch shift | Try a small semitone shift if the source lies outside the target voice’s comfortable range. +12 doubles frequency and −12 halves it. Replay a high and a low phrase before applying the change to a song. |
| Pitch extractor | Compare available estimators when a note jumps or a soft phrase loses voicing. Keep the model, transposition and input fixed. |
| Search Feature Ratio | With the correct index loaded, increase influence in small steps. Listen for stronger target character, muffled consonants or unwanted source leakage. |
| Volume Envelope | A value near 0 follows the source dynamics more closely. A value near 1 retains more of the generated dynamics. Compare quiet and loud syllables at a matched playback volume. |
| Protect Voiceless Consonants | On the current pitch-guided engine, settings below 0.5 activate protection. Lower values increase it. Try a phrase with breaths and consonants such as S, F or T. |

**Split Audio** can help process a long file in pieces. Listen across the joins. **Clean Audio** can reduce unwanted noise, so compare it against a clean baseline for changes to detail. **Proposed Pitch** derives a target-directed shift and can interact with manual transposition. Test each by itself. Effects activated through **Post-Process** apply to the generated audio and can mask a conversion issue.

## Run a small batch

1. Put two working files and one quieter or longer example in a test input folder.
2. Choose batch mode. Select the input, and use a different destination where the engine can write. For Gradio running on another machine, paths must exist on that machine.
3. Copy the tested model, embedder, index and pitch settings. Start the test and inspect the results before processing an entire collection.
4. If an input fails, convert that file alone using the same settings. If it fails only in the batch, check the path and output naming. Store the files you want to keep outside temporary working storage.

## Diagnose the result

- **The job produced no audio.** Read the error first. Verify the input plays, the engine verifies, and the selected model is an inference export.
- **Pitch sounds jumpy or electronic.** Test the correct embedder, one pitch estimator and a clean input without effects. Replay the original to see whether the noise or jump was already present.
- **Speech is present but the target voice sounds weak.** Check speaker ID, then compare retrieval only if you have the right index.
- **The file clips or pulses.** Test at a lower source level and turn off processing that changes gain. For singing, compare the isolated vocal before mixing it back into the backing track.
