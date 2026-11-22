# Prepare a voice dataset

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Every clip teaches the model something about its target voice. Before training, decide which parts of that voice you want the model to handle, then keep recordings that demonstrate those parts clearly. Start with material you have permission to use for training, and keep a separate copy of the original files.

## Choose recordings for your goal

| Goal | What to collect |
| --- | --- |
| Conversational speech | Questions, statements, longer sentences, and short responses with varied consonants and vowels. |
| Expressive speech | The intended delivery styles at both quiet and emphatic levels. Record variations across several phrases. |
| Singing | Sustained vowels, note changes, and examples near the comfortable high and low ends of the intended range. |
| More than one language | Clear examples of the sounds and phrasing that differ across languages, recorded by the same speaker. |

> ContentVec can be a bottleneck in multilingual models. A dataset containing the target language cannot guarantee that the encoder preserves its phonetic distinctions. Set aside recordings for each language, including difficult sound contrasts, and compare pronunciation after a short training run. If the same errors recur on clean test clips, document the limitation for that language. Changing the encoder or training configuration does not reliably resolve it.

A clean, varied set of recordings is a better starting point than a larger collection of repeated phrases or damaged audio. There is no duration that guarantees a good result. Audit what the recordings cover before deciding whether you need more material.

## Plan an expressive recording session

A recording can be free of noise and still cover very little of a voice. Build the session around the performance you expect to convert. For narration, record clear reading with intentional phrasing. For conversation, include spontaneous replies and changes in pace. For singing, collect dry a cappella takes across the intended register, with sustained vowels and transitions between notes. Spoken lines alone give the model little exposure to those singing sounds.

Record yourself, or agree on the intended model and its use with the performer before recording. For a remote conversation, have the speaker capture their own microphone locally and use only that track.

| Session block | Example allocation | What to capture |
| --- | --- | --- |
| Expressive narration | 10 minutes | Read a passage with shifts in emphasis, emotion, and pace. |
| Conversation | 10 minutes | Collect unscripted speech with questions, short reactions, and longer answers. |
| Phonetic coverage | 10 minutes | Use material such as Harvard Sentences, the Rainbow Passage, or Comma Gets a Cure to exercise vowels, diphthongs, stops like P/B/T/K, and sibilants like S/Z/SH. |
| Performance range | 20 minutes | Record the delivery the model needs, from soft speech to projection. Try varied tempos, emotions, and clear chuckles or sighs where relevant. For a multilingual model, include intentional coverage of the target languages. |

That 50-minute plan is an example for expressive speech. A focused ten-minute set can be more useful than a larger set of repetitive or damaged recordings. Add material to fill an audible gap in coverage. Dataset duration alone does not determine overfitting.

### Set up the microphone

Capture a single microphone on a mono track. Use a pop filter or windscreen, keep the mic distance consistent, and set gain while testing the loudest planned line. A quiet room with soft furnishings reduces reflections at the source. Prefer a dry original over a heavily cleaned recording with audible reverb or separation artifacts. If converting existing stereo recordings to mono, listen to both channels and the fold-down. Use a clean channel if the combined signal sounds hollow or loses detail.

### Check the prepared audio

- **Sample rate:** Keep the originals at their recorded rate. Choose a training rate supported by the architecture and pretrained weights. The preprocessing stage can resample when needed. Upsampling adds no detail to the original recording.
- **Levels:** Compare session levels and fix large gain differences caused by mic placement or recording settings. Preserve intentional changes in delivery. Check what the training frontend already normalizes before applying a separate loudness pass.
- **Breaths and reactions:** Keep natural breaths and clean expressive cues where they serve the intended use. Trim clipped laughs, harsh gasps, and plosive bursts. Audition uncertain edits in headphones.
- **Pauses:** Keep natural pauses and remove long empty spans. If you want to test a standalone silence clip, run a comparison with the same settings and listen to held-out pauses. Some preprocessing pipelines already handle silence.

## Record or select clean material

- Use one speaker for a first model. Exclude overlapping voices, crowd responses, and dialogue where the speaker changes mid-clip.
- Listen for fan noise, echoes, music, and digital distortion. A clip that sounds acceptable in a loud mix can still contain problems that are obvious when the voice is isolated.
- If you are recording a new session, use a consistent mic position and leave peak headroom. Test the loudest phrase before recording the full session.
- When combining sessions, listen to them side by side. Keep useful variation in the voice and discard abrupt differences caused by heavy effects, room sound, or an unreliable microphone.
- Remove duplicate takes if they add little variety. Put different sessions or passages aside for evaluation before editing adjacent cuts into the training folder.

## Clean a working copy

1. **Isolate the target voice.** If the source includes an accompaniment, try separation and audition the resulting vocal stem. Reject sections with instrument bleed, backing vocals, or obvious separation artifacts.
2. **Make cuts at natural boundaries.** Trim long dead air and remove unusable sections. Listen across each cut for lost consonants, abrupt changes, or a second speaker entering.
3. **Apply only the cleanup the recording needs.** Compare any denoising pass against the original. If the cleaned version swallows consonants, blurs syllables, or introduces a pulsing sound, reduce the processing or replace the take.
4. **Check levels across files.** Keep enough headroom for loud passages and balance major recording-level differences. Lowering the volume of an already clipped file leaves the damaged peaks in the recording.
5. **Export in a lossless format your build can read.** WAV is a practical working format. Re-encoding a compressed file as WAV preserves the result of that decode and cannot restore lost detail.

The training engine may divide files into its own segments and resample them to the selected model configuration. Keep usable words and phrases intact during manual editing and let the training preprocessing stage handle its own segmentation.

## Organize the dataset and listening tests

Keep comparison inputs, discarded recordings, and converted output outside the training folder. This example uses separate folders for originals, training, and evaluation.

```text
my-voice-project/
  originals/
  training-audio/
    session-a-01.wav
    session-a-02.wav
    session-b-01.wav
  evaluation/
    speech-test.wav
    expressive-test.wav
  notes.md
```

Point preprocessing at `training-audio/`. Keep `evaluation/` separate. A useful comparison set might include an unfamiliar spoken phrase with sharp consonants, a quiet passage, and a short expressive phrase. For a singing model, include a held note and a phrase crossing registers. Hold back whole passages or sessions when you can, so the test audio does not duplicate nearby training clips.

If you train with an interface that supports more than one speaker, follow its speaker-folder and ID rules. A single-speaker folder with audio files directly inside it is easier to audit for a first run.

## Review the dataset in Ilaria RVC

Recent Ilaria RVC builds let you drag audio or a dataset ZIP into the training interface and manage imported datasets there. Select the intended dataset and run the **Dataset Checker**. Use its short previews to inspect files flagged for silence, clipping, inconsistent levels, or decoding problems. The **Audio Analyzer** can help compare suspect files using waveforms, pitch, and level measurements. Confirm the diagnosis by listening before removing otherwise useful material. Availability and control labels follow your installed release.

| What you notice | What to do before training |
| --- | --- |
| File will not decode | Check that it plays in an editor. Re-export from the original if possible and verify the copy opens. |
| Sections of near-silence | Audition the flagged range and trim empty spans. Keep natural pauses that help preserve phrase boundaries. |
| Distorted or flattened peaks | Compare with the original recording. Replace an audibly clipped take when you have a clean alternative. |
| Background sounds follow the vocal | Listen to the isolated stem in headphones and exclude the affected parts when separation sounds unstable. |
| One session is much quieter | Check whether the speaker's performance is intentionally quiet. Adjust recording gain differences while retaining useful natural dynamics. |

Before continuing, play a few clips from each session, confirm you selected the prepared folder, and record the folder version in your notes. Then [run a training experiment](training.md).
