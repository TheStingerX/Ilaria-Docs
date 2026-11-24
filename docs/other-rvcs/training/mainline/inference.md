---
label: "Convert recordings"
icon: ":studio_microphone:"
order: 30
permalink: /ilaria-rvc/mainline/inference/
description: "Start with a short recording that you can hear clearly in a normal media player, plus an exported RVC model you have permission to use."
---

# Convert recordings in RVC WebUI (Mainline - Original RVC)

Start with a short recording that you can hear clearly in a normal media player, plus an exported RVC model you have permission to use. The model changes the voice in the recording. The source provides the words, rhythm and delivery. For a song, use a separately recorded or isolated vocal track for the first pass.

## Put each file in the right place

| What you received | Where it goes |
| --- | --- |
| A ZIP or 7z with a model inside | Extract the files before adding them to RVC WebUI (Mainline - Original RVC). |
| An inference `.pth` file | Copy it to `assets/weights/` inside the RVC WebUI (Mainline - Original RVC) folder. If you trained it yourself, use the exported small model. |
| A populated `.index` for that exact model | In current builds, copy it to `assets/indices/`. Older builds commonly discover indexes under `logs/`. If auto-detection fails, select it or enter its full path manually. |
| A `G_*.pth` or `D_*.pth` training checkpoint | Keep it with the experiment in `logs/`. Use the [training guide](training.md) to identify or export a model for inference. |

Use `added_*.index` when training produced both `trained_` and `added_` files. The latter contains the searchable feature vectors. Your model can work with no index. Set **Index Rate** to zero when you skip the index or cannot identify its matching file.

## Convert your first clip

1. Open the WebUI and find the **Model Inference** tab. Refresh the model and index lists after copying files, then select the inference `.pth` in the voice dropdown. Give the interface time to read the checkpoint.
2. Choose a short WAV with one voice speaking or singing on its own. Newer builds expose an upload control. If your build shows a path box, give it a full path such as `C:\RVC\test\voice.wav`. Try a short local path when diagnosing file access in an older package.
3. Set pitch shift to `0` for the first pass. Set **Index Rate** or **Search feature ratio** to `0`, and leave extra settings as they are. Select `rmvpe` if available and its weights are installed. With a single-speaker checkpoint, start with speaker ID `0`.
4. Click **Convert** once and wait for the status and playback panel. Play the result from the beginning. If it sounds usable, use the audio player's menu to download it. If conversion fails, read the status or terminal before changing settings.
5. Replay the same source and output back to back. Check the first word, the highest and lowest notes, and several pauses. Change one control and rerender the same input to tell which change helped.

## Understand the controls you are likely to touch

| Control | How to use it |
| --- | --- |
| Pitch shift | Transposes the source in semitones. `+12` raises it an octave, `-12` lowers it an octave. Make small moves first when words or notes sound strained. |
| Pitch extraction | Estimates the pitch contour used in pitch-guided conversion. Try another method when voice breaks appear on certain notes. Compare the same clip and keep everything else constant. |
| Index Rate | Mixes in nearby features from the target voice when a matching index exists. Increase it gradually if the result keeps too much of the source timbre. Back it down if diction gets muddy. |
| Protect | Controls how much the conversion preserves unvoiced detail, such as breaths and consonants. Lower values strengthen protection in the usual RVC WebUI (Mainline - Original RVC) `0–0.5` control. Try a small adjustment after index retrieval works. |
| Volume envelope | Changes how closely the result follows loud and quiet moments in the input. Closer to zero follows the source more. |
| Speaker ID | Selects a voice within a multi-speaker checkpoint. Choose an ID actually present in that model. |
| Resample output | Sets the exported audio sample rate where the build exposes it. Leave it at the model default during your first test. |

### A repeatable tuning test

Save an unprocessed 10-second source as `test.wav`. Convert it with zero pitch shift and no index to get `baseline.wav`. Load the matching index and raise its rate for `retrieval.wav`. Compare those two files at similar volume. Once you choose a retrieval setting, try a pitch adjustment and save a third file. Keep whichever setting improves the same troublesome line without degrading the rest.

## Convert a folder

1. Finish a successful single-file test using the same voice and settings.
2. Create separate `input` and `output` folders. Put only the audio you want converted in `input`.
3. Under **Batch Inference**, choose your files or enter the full input-folder path. Set the output-folder path explicitly and choose WAV if you plan to edit the audio later.
4. Start with two short files. Confirm that each result appears in the output folder and plays to the end. Then run the full set. Check status for individual failures so you can retry just the affected files.

## Diagnose common file conversion failures

| Symptom | Next test |
| --- | --- |
| Model list is empty | Confirm the `.pth` is extracted, under the active installation's `assets/weights/`, and visible after refresh. |
| Model shows up but cannot be loaded | Check that the file is a compatible inference export. A training checkpoint or a model from a different voice engine can show up in the list without being usable. |
| Index fails or there is no audible result | Set retrieval to zero, run a conversion and confirm the checkpoint works. Then select the matching populated index and try again. |
| Output is gritty or syllables wobble | Listen to the input first. Retest a clean vocal with index off. Then compare pitch methods and a modest change in transposition. |
| Output is missing in batch mode | Verify that the input files open, the destination folder is writable, and the terminal reports success for the relevant filename. |

For more background, see [RVC models and files](../../../start/models.md) and [audio quality](../../../conversion/audio-quality.md).
