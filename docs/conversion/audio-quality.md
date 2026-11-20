---
label: "🎚️ Pitch and audio quality"
order: 94
permalink: /audio-quality/
description: "Pick a short excerpt that contains the problem. Make a reference conversion and compare it with one changed setting at a time. Listen at similar levels so..."
---
# Tune pitch and audio quality

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

Pick a short excerpt that contains the problem. Make a reference conversion and compare it with one changed setting at a time. Listen at similar levels so a louder result does not win the comparison by volume alone. For music, compare the converted vocal alone first and then in the mix.

## Pitch, range, and resonance

Pitch measures how high or low a voiced sound is. **F0**, or fundamental frequency, is the periodic part of the signal from which a pitch extractor estimates the contour. A pitch-guided model uses that contour when it synthesizes the output.

**Pitch** shifts that contour by semitones. Positive values raise it and negative values lower it. Each octave has 12 semitones. For example, applying `+12` to a voiced note at 220 Hz gives 440 Hz. A setting of zero keeps the pitch reference from the recording.

For speech, start at zero. If the clip sits far outside the target model's comfortable range or sounds strained, compare with a small shift up or down. For singing over an existing instrumental, compare zero first. A shift that changes the key of the vocal can clash with the backing track. Octave shifts keep the note names, though the model still needs to handle the resulting range. Compare the lowest and highest exposed notes before committing to a whole song.

**Formants** describe resonances that help distinguish vowels and voice character. Use formant processing only after the pitch contour is working. Pitch and resonance can need different adjustments. In builds with both inference pitch and a pitch-shift effect, the former changes the extracted pitch before synthesis and the latter acts on the resulting audio.

## Compare pitch extractors

Start with **RMVPE**, the default for current Ilaria RVC inference. If the pitch is unstable, test another extractor available in your build, such as **FCPE** or **Swift**. Keep the same input, pitch shift, index ratio and output format for each run.

- For a held note, listen for sudden doubling or halving of the pitch. If several extractors fail at the same timestamp, check for another singer, an instrument in the vocal stem, or severe clipping.
- For quiet speech, make sure the input contains a clear voiced vowel. Increasing the level of a clip that contains mostly noise can make it harder to diagnose.
- For a large batch, compare an excerpt from the lowest and highest source voices first. Benchmark processing time with the same file and settings on the intended machine.

Pitch extraction and content extraction are separate stages. Changing the F0 extractor estimates a different pitch contour from the same audio. The content embedder still needs to match the model.

## Make targeted adjustments

| If you hear | Try first | What to listen for |
| --- | --- | --- |
| A note jumps, warbles, or disappears | Compare a second supported F0 extractor on the same excerpt. | Sustained notes that follow the source without sudden octave jumps. |
| The target timbre is weak | Verify the model, embedder, and matching index. Compare index disabled against a small **Index Ratio** increase. | A more recognizable tone with words still intelligible. |
| Words get blurry after increasing retrieval | Lower **Index Ratio** and replay the same consonants. | Syllables become clearer without losing the character you want. |
| Breath or consonants sound metallic | Test the same model on several clean recordings. If the artifacts persist, check the training dataset for clipping, heavy noise reduction, or too few clean breaths and consonants. Correct the dataset and retrain. Cleaning the inference input cannot repair artifacts learned by the model. | Clear `s`, `f`, and other unvoiced sounds without harsh buzzing. |
| Volume drops within a phrase | Compare a different **Volume Envelope** setting. Check the source for a gate, then test **Split Audio** if the issue appears only on long clips. | Consistent word endings without swallowing natural pauses. |
| A processed vocal sounds brittle | Turn off cleaning, automatic pitch correction, and output effects. Add them back individually after a clean conversion. | Fewer artifacts on sibilants and sustained vowels. |
| Output peaks distort | Check for clipping on the original or the converted waveform. Reduce unnecessary gain and compare before limiting. | Clean peaks and no crackle on loud syllables. |

Avoid changing the embedder to chase a sound. It must match the feature representation the model was trained on. **Index Ratio** blends features retrieved from a matching training index into the conversion. It does not provide a generic quality boost. A high blend can make pronunciation less distinct, especially on an unfamiliar source.

In Applio's file engine, a **Volume Envelope** setting nearer zero follows the source dynamics more closely. For **Protect Voiceless Consonants**, values below 0.5 strengthen protection and 0.5 disables it in that engine. Check your app's tooltip and release notes before carrying those numbers to another fork.

## Diagnose by ear and with the analyzer

1. Mark the timestamp of the issue. Check whether it appears in the source, the separated vocal, or only the converted result.
2. If it is in the source, fix the input first. Compare an alternate take before using heavy denoising. Lowering the volume of a clipped recording cannot restore the missing peaks.
3. If it appears in the conversion, compare effects off, index off, and a compatible pitch extractor in separate passes. Verify the embedder and model package before assuming the checkpoint is poor.
4. Use Ilaria RVC's **Audio Analyzer**, where available, to compare waveforms, pitch estimates, spectra, and levels. A pitch plot can point you to a suspicious jump, and the source audio tells you whether it was part of the performance.
5. Confirm the improvement on a second excerpt. Keep the setting only if it works across the material you plan to export.

For singing, test breaths, consonants, vibrato, and held notes. For speech, test quiet and loud phrases and at least one sentence with sharp consonants. If the output still fails, send a short permitted sample and your settings with a [troubleshooting report](../reference/troubleshooting.md).
