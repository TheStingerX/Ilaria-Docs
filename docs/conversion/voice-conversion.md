---
label: "🎙️ Voice conversion"
order: 95
permalink: /voice-conversion/
---
# Convert a recording with Ilaria RVC

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Voice conversion starts with a performance. The output usually follows the source words, timing, articulation, and pitch contour while changing the sound of the voice. Decisions about delivery still start with the original recording. For a sung cover, plan to convert an isolated lead vocal and mix the converted vocal with the instrumental afterward.

## Make a baseline conversion

1. Open Ilaria RVC and import the inference model you want to use. An optional index belongs with the checkpoint it was built for. If an imported voice is absent from the selector, see [RVC models and files](../start/models.md).
2. Open **Single Inference**, choose the voice, and drag in a short recording you can recognize by ear. A phrase with a pause, several consonants, and a longer vowel makes a useful reference.
3. Set **Pitch** to zero and **Index Ratio** to zero. Match the content embedder to the one used in training when the model author provides it. Start with the app's default pitch extractor and leave optional audio processing off.
4. Convert the file and check the output. Use the waveform player to revisit the same phrase, then save a WAV or FLAC copy as your baseline.
5. Compare the original and the converted clip at similar playback levels. Note the first audible problem and use [Pitch and audio quality](audio-quality.md) to decide what to change.

Current Ilaria RVC releases automatically look for a matching index when you select a voice. Selecting an index and giving it influence are separate actions. A loaded index contributes only when **Index Ratio** is above zero. Older builds may show a different layout or ask you to select the index manually.

## Choose a source that fits the job

| Workflow | Prepare the source | Listen for |
| --- | --- | --- |
| Dialogue or narration | Use one speaker per input track and keep a short natural pause between lines. | Clear words, intact word endings, and consistent tone between phrases. |
| A lead vocal over music | Isolate the lead. Leave the instrumental, backing voices, and harmonies on their own tracks. | Stable sustained notes and consonants that still line up with the beat. |
| Multiple takes | Label each take by scene or section and keep the original file names in your notes. | A consistent voice across takes recorded at different levels or pitches. |
| Spoken text through TTS | Preview the generated speech before applying the model. Adjust punctuation or phrasing in the text first. | Correct pronunciation and intentional pacing before the RVC stage. |

If a separated vocal still contains loud cymbals or another singer, compare it with a cleaner take or separation. Those sounds reach the conversion engine along with the intended voice. Keep breaths and word endings where they matter to the performance.

## Convert a batch

Open **Batch Inference** after a single file produces a usable result. Group files that need the same model, pitch, and processing profile. Run one representative file from each group and save to a separate output location so you can compare results safely.

For a long song, audition a section with exposed high or low notes before converting the whole file. **Split Audio** can help with long recordings or memory limitations. Listen across segment joins and pauses after the run. If a version of the app exposes a console or conversion log, use it to identify any failed items and retry those files separately.

## Convert generated speech

In a release with the **TTS** workspace, supply text or a UTF-8 text file. Current Ilaria RVC releases offer Microsoft Edge online voices and installed Windows voices for offline TTS. Pick a source voice in the language of the script, listen for pronunciation and pauses, and then apply the RVC model to that generated recording. If the first stage reads a name incorrectly, fix the text or change the TTS voice first. RVC will generally carry those source pronunciation choices through.

When privacy or an unreliable connection matters, select an installed Windows voice and check that it works with your text before starting a long job. The Edge option requires a network connection.

## Save the conversion and your settings

- Keep an unprocessed WAV or FLAC master before adding compression, reverb, or limiting.
- For music, align the converted vocal against the original, check its timing at consonants, and listen to both solo and in the mix before exporting.
- Save your settings alongside the result. Include the source file, model and index versions, speaker ID if applicable, embedder, pitch extractor, pitch shift, index ratio, processing, and output format.
- When a model is missing or inference fails before producing audio, start with [Troubleshooting](../reference/troubleshooting.md). For microphone conversion, see [Real-time voice conversion](real-time.md).

## Convert a recording in RVC WebUI (Mainline - Original RVC) {#convert-a-recording-in-mainline-rvc}

### Set up the WebUI

On Windows, use a RVC WebUI (Mainline - Original RVC) package compatible with your hardware. Extract the entire archive to a local directory before running its launcher. Windows packages that include `go-web.bat` use it to start the local WebUI. Leave the console open while converting. If the browser does not open automatically, use the local address printed in the console.

### Load the model and convert

Place the inference checkpoint in `assets/weights` and its matching retrieval index, if supplied, under `logs`. Open **Model Inference** and refresh the voice and index lists. Choose the checkpoint and matching index. Set the retrieval ratio to zero for models without an index.

Give the WebUI the full path to a short local WAV file. If the path fails, copy the test file to a simple location such as `C:\RVC\input\test.wav`. Keep transposition at zero for the first pass and select RMVPE if your build offers it. Click **Convert**, then listen in the output player and save the result using its download control. If generation fails, read the console message before changing settings. A model that does not appear in the list usually needs to be moved to the weights directory or rediscovered using refresh.

## Convert a recording in Applio

### Set up a single-file test

In Desktop, wait until the engine is ready, add the inference model to the library, and open **Convert Audio** in single-file mode. In Gradio, open the browser interface and select **Convert Audio** or **Inference**, depending on the release. Refresh the model list after adding a checkpoint if it is missing.

Select the voice and its paired index, then confirm the content embedder expected by that model. Load a short recording and choose WAV or FLAC for the test. Check for settings carried over from a previous run, especially pitch, retrieval and effects. A useful baseline starts at zero semitones with effects off. Start the job once, wait for the output, and compare the same phrase in both recordings.

### Tune the test before running a batch

| What you hear | What to try |
| --- | --- |
| Notes jump or wobble | Compare pitch extractors using the same phrase, then test transposition separately. |
| The converted voice retains the source timbre | Generic HuBERT embedders can retain speaker information. Verify the encoder matches the model and test several clean clips with retrieval off. If the voice was trained with an encoder that leaks source timbre, retrain with a compatible voice-conversion encoder such as ContentVec and rebuild the index. |
| S sounds or breaths become distorted | Test lower retrieval and stronger voiceless protection separately. If the distortion persists across clean recordings, check the training dataset for damaged or missing examples of sibilants and breaths, correct it, and retrain. |
| Speech has an uneven level | Adjust the volume envelope or level the finished track. Check that the source itself is clean. |

When the baseline works, switch to **Batch** and choose several files or an input directory, depending on the edition. Keep the output in a separate location. Use a different run for files that need different pitch settings, and listen to at least one result from each group before using the whole batch.

For model import issues and detailed setting explanations, use [RVC models and files](../start/models.md), [Pitch and audio quality](audio-quality.md), and [Troubleshooting](../reference/troubleshooting.md).
