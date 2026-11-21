# RVC fundamentals

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Retrieval-based voice conversion (RVC) takes a vocal recording and synthesizes a version with the character of a trained voice. The recording supplies the performance, including the words, rhythm and much of the pitch contour. The model determines how that performance is rendered. For a spoken line, record the pronunciation and delivery you want to hear in the result. A pitch adjustment changes the register without translating or rewriting the line.

## Follow the signal

| Stage | What it does | What to listen for |
| --- | --- | --- |
| Decode the source | Reads the audio and prepares it for analysis. | Clipped peaks, room echo and other voices can contaminate later stages. |
| Extract content features | An embedder represents the sound of each short section of the input. Common RVC workflows use ContentVec or a HuBERT-based feature extractor. | Unclear words can follow the input into the output, even with a good model. |
| Estimate pitch | A pitch predictor estimates the fundamental frequency, or F0, in voiced sections. Pitch-guided models can use this contour during synthesis. | Unexpected note jumps or unstable sustained notes can point to pitch tracking. |
| Retrieve similar training features | When a compatible index is available, the converter can blend nearby features from the model's training data with the source features. | Compare retrieval on and off if the result sounds muffled or the source timbre is too prominent. |
| Synthesize the output | The model turns the conditioned features into a waveform at its supported synthesis rate. | Listen for metallic textures, missing consonants and changes in level. |

> Generic HuBERT checkpoints are not recommended as the default encoder for voice conversion. Their speech prediction training does not explicitly remove speaker identity, so the features can carry source timbre into the output. For RVC, use the encoder expected by the model, such as ContentVec when the voice was trained with it.

### Keep the controls separate

- **Pitch shift** offsets the detected contour by semitones. Start at zero and change it if the performance is outside the target voice's comfortable register.
- **Pitch predictor** changes how the contour is measured. Compare predictors on a passage that contains the problem, such as a sustained note or the transition from talking to a breath.
- **Index rate** changes the balance between source and retrieved features. Zero disables the retrieval contribution in standard RVC workflows. A high setting can emphasize characteristics of the training data, including unwanted artifacts.
- **Sample rate** describes how many audio samples represent a second. The source file rate, the model's synthesis rate and the exported file rate can differ. Resampling a file changes its representation without making an incompatible checkpoint loadable.

For app-specific conversion controls, see [Voice conversion](../conversion/voice-conversion.md).

## Check model compatibility before importing

1. **Confirm the model family and architecture.** Use a runtime that explicitly supports the model. Classic RVC v1 and v2 use different feature dimensions, commonly 256 and 768 respectively in RVC WebUI (Mainline - Original RVC). Some forks also support architectures that require their own runtime.
2. **Check the embedder.** The runtime should supply the feature representation the model was trained to expect. A model trained with a custom embedder can need that embedder at inference time. A similar file extension or a matching sample rate alone provides little evidence of support.
3. **Use the inference export.** A ready-to-use `.pth` and a training checkpoint can have the same extension. Select the file identified by the publisher as the inference model. A ZIP is a container for the files and is only directly importable where the app supports ZIP import.
4. **Pair retrieval data with its checkpoint.** An `.index` built for another voice or embedder can fail or degrade the result. Keep the model and its index together and check that the app selected the expected pair. If you only have a compatible model, use the no-retrieval workflow supported by your client.
5. **Test a short file.** Try a clean clip with default settings. A model that loads can still sound wrong if the runtime uses the wrong feature extractor or the input is far outside the voice's range.

!!!warning Trusted model files
Obtain model files from the original publisher or another source you trust. Loading a PyTorch checkpoint can involve deserializing Python objects. Keep the protections in your loader enabled and request a supported export if it refuses a file. [PyTorch loading reference](https://docs.pytorch.org/docs/stable/generated/torch.load.html)
!!!

## Judge the result with a repeatable test

Keep a dry reference clip and use that same clip for every comparison. Include a quiet phrase, a sentence with sharp consonants and a sustained vowel. Keep playback levels similar so that loudness alone does not make one output seem better.

1. Render a baseline using the app's defaults.
2. Check word clarity first. If both the dry and converted clips are hard to understand, re-record the source.
3. For pitch wobble, compare two supported pitch predictors before changing retrieval.
4. For a timbre or texture problem, compare with retrieval disabled, then adjust the index rate if the matching index helps.
5. Save the working settings with the model name, release and input. When a later update changes the sound, those notes give you a starting point.

[Get started with Ilaria RVC](getting-started.md) · [RVC models and files](models.md) · [Real-time voice conversion](../conversion/real-time.md)
