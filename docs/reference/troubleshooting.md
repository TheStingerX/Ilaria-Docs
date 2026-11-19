---
label: "🩺 Troubleshooting"
order: 95
permalink: /troubleshooting/
---
# Troubleshooting RVC

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

!!!tip
New to RVC? **Start with a 10-second WAV and one model.** If the app fails, open the log and copy the first error. If it runs but sounds wrong, replay the same clip before changing one setting. The log is the app’s record of what happened. A checkpoint is a saved model or training state.
!!!

A useful diagnosis starts at the first stage that fails. Keep the app version, the first error, and one reproducible test. Make one change at a time and compare against the same file or spoken phrase.

## Find your symptom

| Symptom | First test |
| --- | --- |
| Launcher exits or browser shows a connection error | Keep the console open and verify the local address printed by that instance. |
| Model is missing, refuses to load, or reports a missing key | Confirm that the file is an inference export and check its architecture and embedder. |
| Converter cannot read the file | Try a short PCM WAV from a simple local path. |
| Conversion works without an index | Verify the index belongs to the selected model and its feature representation. |
| Voice sounds metallic, indistinct, or too much like the input | Compare several clean clips and a known-good checkpoint with effects and retrieval off. |
| Training stops, stalls, or produces no usable export | Identify the failing stage and inspect the log and artifacts for that experiment. |
| CUDA fails or the machine runs out of memory | Distinguish unsupported hardware or runtime, GPU memory exhaustion, and system RAM pressure. |
| Microphone has delay, gaps, silence, or echo | Test the physical input, converted monitor, virtual cable, and destination separately. |

## Establish a baseline

1. Record 10–20 seconds of one speaker with clear vowels, an `s` or `f`, and a natural pause. Use a local WAV, at moderate level, without music or effects.
2. Select one trusted inference model compatible with the app. Record its name, embedder, and speaker slot. Start at zero transposition with the default pitch extractor, optional processing off, and retrieval at zero.
3. Convert and save to a writable local folder. Play the file in a second player if the browser preview is silent. Compare the same phrase at similar volume.
4. Repeat with a known-good model using its own compatible encoder. If both models fail on the same input, look at the shared decode, runtime, or settings. If only one consistently fails, inspect that model, its configuration, and the training data if available.
5. Re-enable one option per test. Save each result with the settings in its filename or notes so you can revert to a known working combination.

## The app does not start

### The window exits or setup never completes

- **Ilaria RVC:** Extract the complete package, open its folder, and run `RUN_ILARIA_RVC_LOGS.bat`. Look above the last shutdown message for the first useful exception. Check that Windows detects the supported NVIDIA GPU and that the bundled environment and assets are still present.
- **Applio Desktop:** Open Setup and inspect the engine status. Repair the installation through the Desktop setup controls when a runtime or package check fails. For Gradio, run the launcher from the intended checkout and verify which interpreter is active.
- **RVC WebUI (Mainline - Original RVC):** Match the launcher and runtime to the specific archive or source checkout. An older archive can contain a CUDA build that cannot execute kernels for a newer GPU. Installing an unrelated Python package globally will not repair a bundled interpreter.
- **Windows DLL error:** For `llvmlite.dll` or a missing Visual C++ dependency, check that the runtime architecture matches the app and install or repair the official Microsoft Visual C++ Redistributable for that architecture. If the DLL itself is absent, restore it through the original package or installer.
- **Resource errors after an update:** Check that the installation is writable, required asset files are present, and the desktop shortcut points to the updated folder. Keep your models, datasets and logs backed up before replacing an installation.

### The local page is blank, disconnected, or shows a JSON error

Keep the process running and open the exact loopback address printed in the console. Ilaria RVC normally uses `127.0.0.1:6969`. If the port is already in use, check whether that app is already running and use its address. Save active work before stopping an instance.

A browser error such as `Expecting value: line 1 column 1` can occur when an API request receives an empty response or an HTML error page. Check the server console at the same timestamp. If a configured proxy is intercepting local traffic, verify loopback bypass or test a browser profile without the interfering extension. Keep the service local while diagnosing.

For command-line use, start from the entry point and argument help for your exact version. A successful short WebUI run gives you matching settings and, in builds that log them, the preprocessing and training commands. Older scripts can expect a different argument order or directory layout.

## Input and output files

### FFmpeg, Unicode, and file list errors

1. Confirm the file opens in a normal player. Export a fresh short PCM WAV if the container or codec is uncertain.
2. Copy it to a simple local path such as `C:\RVC\input\test.wav`. This isolates quoting, Unicode, remote sync, and permissions problems common in older builds. Preserve the original recordings.
3. Verify the app can see its bundled FFmpeg. Source installations may require a separate executable available to the same process that launches the app. If the known-good WAV works, compare the original path and codec before reinstalling the environment.
4. For training, confirm the selected folder contains actual audio. If you change paths after preprocessing, rebuild the file list and dependent features in a fresh experiment or through the app's preparation workflow.

### A result appears but cannot be played or saved

Check the output folder and free disk space. Export WAV and inspect file duration and size. Play the result outside the browser to separate playback and conversion issues. In batch mode, check the first failing item and output path, then run that item alone. Keep originals and generated results in different folders.

## Models, checkpoints, and indexes

### A model does not appear

Make sure there is an actual inference `.pth` inside the archive. Put it in the library used by the current app, or use its import control and wait for installation to finish. Refresh the voice list and check the selection again. In Ilaria RVC, the model library is under `models/`. RVC WebUI (Mainline - Original RVC) archives and current source can use different directory layouts. See [RVC models and files](../start/models.md) for file roles.

### Loading fails with missing keys or incompatible shapes

A `G_*.pth` or `D_*.pth` from an experiment usually serves training resume. Use the app's export or checkpoint extraction function to produce an inference model. Missing F0 or sample-rate metadata can also indicate a wrong format or incomplete file. Check the RVC version, vocoder, sample rate, pitch guidance, and embedder. Keep originals and export under a different name. A matching filename extension alone cannot establish compatibility.

### The index is missing or causes an error

1. Convert with retrieval at zero, selecting no index if the app allows it. Confirm the model can produce intelligible output on its own.
2. Select the index from the same experiment and feature setup as the model. Retry with a modest retrieval value and compare the same phrase. An incompatible dimension or unreadable index is a reason to recheck the pair before tuning.
3. If training completed but there is no index, inspect the index stage separately. Confirm feature extraction succeeded. Rerun only index generation when the original compatible features are intact. A very large feature set can consume system RAM during index assembly.
4. Preserve the inference export even if index construction fails. For sharing or backup, keep the working checkpoint and its optional matching index together.

## Sound quality and model limitations

| What you hear | Diagnostic test and interpretation |
| --- | --- |
| Metallic breaths or distorted sibilants | Compare a few clean sources with effects and retrieval off. Compare protection separately. If the same model consistently distorts those sounds across clean clips, inspect the training examples for clipping, noise reduction, or poor coverage, correct the dataset and retrain. |
| Converted voice keeps the source timbre | Verify the model and training embedder agree. Generic HuBERT features can retain speaker cues. Compare without retrieval, then with the correct index. A persistent limitation of the trained model may require retraining. |
| Words break only in one language | Test held-out phrases containing the affected sounds with several clean recordings. Multilingual recordings alone cannot guarantee that ContentVec preserves the distinctions. Record the observed language limitation rather than promising that a different training setting will fix it. |
| Pitch jumps or changes octave | Listen to the original phrase, test zero transposition, and compare supported F0 extractors separately. For singing, check the exposed high and low notes. |
| Metallic sounds around music or background voices | Compare an isolated dry vocal. Listen for separation artifacts before using an isolated stem as training data. |
| Audio is flat, too quiet, or clips | Compare source and output at similar playback levels. Disable gain and limiter effects for the test and verify that the source and final export have headroom. |

Use the [audio quality guide](../conversion/audio-quality.md) for controlled listening tests and [dataset preparation](../model-training/dataset-preparation.md) when the defect follows the model across inputs.

## GPU and system memory

- **CUDA unavailable or unsupported kernel:** Confirm the exact GPU, driver, and runtime that the app selected. Desktop, bundled and source installations can see different devices. Verify that the intended backend supports the operation, including training if required.
- **CUDA out of memory during inference:** Start with one short clip. Close competing GPU jobs, unload unused models, and disable optional processing. For long inputs, try the app's audio splitting control or divide the audio into segments and check the joins afterward.
- **CUDA out of memory during training:** Reduce batch size, turn off dataset caching in VRAM, and try compatible mixed precision only if supported by your build. Keep a resumable checkpoint. A smaller batch changes the number of updates per epoch.
- **System RAM runs out or preprocessing workers die:** Use fewer CPU workers, check that the disk has space for intermediate files, and inspect unusually long or broken recordings. Split only at natural boundaries and regenerate the affected prepared data. During index generation, watch system RAM independently of VRAM.
- **Multiple GPUs:** Confirm the device index with the app's device list. An index can refer to a different GPU when device visibility changes. Verify the chosen device in the log before comparing performance.

## Training, resume, and exports

### Diagnose the stage before rerunning it

| Stage | Check before continuing |
| --- | --- |
| Dataset import | Confirm the destination folder and wait for extraction. Check free space and sample a few imported files. |
| Preprocessing | Confirm usable, nonempty clips and a writable experiment folder. A zero-size tensor can originate in an empty, extremely short, or failed slice. Listen and replace or trim the bad source, then regenerate the prepared data. |
| Feature extraction | Confirm preprocessing produced audio and the chosen embedder and pitch assets are present. Changing encoders requires a compatible configuration and fresh features. |
| Training | Verify matched G/D pretrains and agreement between sample rate, pitch guidance, vocoder, architecture and stored features. A tensor-size mismatch after changing rates is a reason to start a separate experiment with compatible settings. |
| Export and index | Export an inference checkpoint, refresh the voice list, test without retrieval, and build the index from that experiment's features. |

### Resume safely or continue with more recordings

Wait for the app to finish saving before closing it. Preserve the G and D checkpoints, the experiment configuration and its training state. To resume unchanged training, select the same experiment and verify the restored step or epoch in the log. Treat a changed dataset as a separate experiment: preprocess the combined dataset, regenerate features, and use your app's supported continuation method with compatible weights. Keep the original experiment intact to allow a comparison or rollback.

Dataset duration and epoch count depend on voice coverage and cleanliness. Save several checkpoints and audition the same held-out clips. A better loss curve does not establish better pronunciation. If a model degrades on clean unseen examples, compare an earlier export before extending the run.

## Live microphone, virtual cable, and calls

1. Check the raw physical microphone in the OS. Confirm permission and input level. Disconnect extra mic sources during the test.
2. Test the converter locally through headphones. Keep the app's supported default audio backend and buffer. If the converter has an input meter but no output, check the loaded voice and the conversion state before changing the destination app.
3. Route the converter output to the playback end of the virtual cable. In Discord, OBS, or the recording app, choose the corresponding recording endpoint. Keep call playback on headphones. Make a private test recording to verify the actual signal reaching others.
4. If there are gaps, retest with a larger block size and with other GPU workloads stopped. If gaps appear only during a game, repeat the test under that load. Check whether the audio format settings conflict across devices.
5. If speech is clipped at the beginning or end, test without automatic detection, noise suppression, or gates one at a time. If you hear an echo, check for duplicate monitoring or a loop into the physical mic. Keep the last stable preset before lowering delay.

For device names and app-specific controls, use the [step-by-step app guides](../other-rvcs/app-guides.md) and the [live routing guide](../conversion/real-time.md).

## More problems you can solve

### Read the message before changing anything

Look for the first error in the console or job log. The last message may only say the job stopped. Copy the line that names a file, device, or setting. Run a short test after your first change. If it works, write down what you changed.

| Message or symptom | First thing to do | If it still fails |
| --- | --- | --- |
| Permission denied | Save a short test to a folder you own. | Check whether the selected file is open elsewhere or the output folder is managed by another app. |
| File not found | Open the path shown in the error and confirm the file exists. | Re-select the file inside RVC. If you moved the dataset, rebuild its prepared files and features. |
| Disk full | Check the drive used by the app, including temporary files. | Move completed backups to another drive and choose a writable destination with room for intermediate files. |
| Module not found | Check which launcher and environment you opened. | Repair that app's environment. Keep a separate environment for each source installation. |
| NaN loss or outputs are silent | Stop the run and keep the last working checkpoint. | Check for corrupt audio, incompatible weights, and precision problems. If supported, compare a short FP32 run in a separate experiment. |

### The voice sounds wrong even though the job succeeded

#### Only one voice model misbehaves

Test a known-good voice using its own matching encoder and index settings. Then test the failing model with retrieval and effects off. If the first voice works and the other repeatedly makes the same error, inspect the failing model's encoder, speaker slot and training data. Keep the clean input as evidence for a comparison after retraining.

#### Part of a long file is missing

Play the input and output side by side near the missing section. Test that section alone. If the short clip succeeds, check memory pressure, silence splitting, automatic gates, and the output folder. Join completed segments in an editor and listen across each boundary before exporting.

#### Only one file in a batch fails

Convert that file by itself. If it cannot be opened, make a fresh WAV from the original. If it converts, check whether the batch was interrupted or two files share an output name. Rerun the failed files in a fresh destination folder to protect earlier results.

### Training looks stuck

1. Look for the latest timestamp and the current stage. Preparing a dataset, extracting features and building an index can have very different speeds.
2. Check whether the CPU, GPU or disk is still active and whether files are being written. Refresh the log or dashboard if its progress display is stale.
3. If activity stops and the log has an error, diagnose that error. If you need to stop a running training job, use its save-and-stop control and wait for confirmation where available.
4. Before retrying, write down the experiment name and last confirmed stage. Reuse completed files only when the dataset and settings still match.

### Live audio works in the monitor but fails in a call

- **Other people hear your normal voice:** select the virtual cable's recording side in the call app and turn off any second microphone source.
- **You hear the converted voice twice:** use a single monitor. Disable either Windows listening or the app's monitor while you compare.
- **The call cuts out only when you speak softly:** compare the app's input sensitivity and noise suppression one at a time. Record the call input to hear what actually reaches it.
- **The device disappeared after plugging in headphones:** stop conversion, reselect the physical mic and headphones, then restart the audio stream.

When one step fixes the issue, repeat the original test once with your usual apps open. Keep that working setup as a reference.

## Text to speech and reporting a problem

Preview the generated speech before converting it. If the original TTS sounds wrong, verify its language, voice, and script. For Edge TTS, check whether that online voice is reachable. With an installed Windows voice, verify it appears in the app's supported list. If only the converted version sounds wrong, use the file conversion baseline above.

When asking for help, include the app and edition, version, OS, GPU and backend, exact action, first error with nearby log lines, and the shortest safe reproduction. For training, include the failed stage, sample rate, architecture, embedder, and whether it was a new run or a resume. For live issues, list the devices in signal order. Remove account identifiers, private paths and sensitive recordings before sharing logs. Use the [contact page](https://ilariarvc.shop/en/contact/) for Ilaria RVC assistance.
