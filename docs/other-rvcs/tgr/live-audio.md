---
label: "Model, microphone and cable"
icon: ":headphones:"
order: 90
permalink: /ilaria-rvc/tgr/live-audio/
---
# Set up live audio in Okada TG Developed Fork

> Connect your physical mic to the voice changer, send its output to the cable’s playback endpoint, and select the matching recording endpoint in Discord or OBS. Start with **VAC Lite** for Vonovox, or use **VB-CABLE** as an alternative. Read the full routing guide before testing in a call. [VAC Lite / VB-CABLE](../vonovox/live-audio.md)

Use a compatible RVC inference checkpoint and a working microphone. First prove that the converted signal reaches your headphones. Then send that signal to another application and make a recording from the receiving end.

## Load an RVC voice

1. Stop conversion if it is already running. Open **Edit** in the model selection area and pick an empty slot.
2. Choose **Upload** and select the RVC inference model file. When the dialog exposes a separate field for the index, add the matching `.index` if supplied. Use only compatible inference files. An index by itself cannot produce a voice.
3. Wait for the upload and click the newly loaded slot in the main view. Check the model name before pressing Start.
4. Set pitch and retrieval to zero. Make sure **Passthrough** is off. Its enabled state sends the dry microphone, so the microphone can reach a call even if conversion is bypassed.

## Test the microphone and the compute device

1. In **Audio**, choose the mode for the devices you intend to use. In a local browser test, use **Client** and grant the site access to your microphone. In **Server**, choose the input and output devices visible to the process that runs TGR.
2. Name the endpoints before starting. **Input** is the physical microphone, **Output** is the headphones for the first test, and **Monitor** is optional if your build offers it.
3. Pick your intended GPU or CPU in the device selector. For a DirectML baseline, try `rmvpe_onnx` if listed. Supported DirectML pitch detectors documented by the fork also include `fcpe_onnx`, `crepe_tiny_onnx` and `crepe_full_onnx`. The CUDA build can expose a different list.
4. Press **Start** at the default chunk size. Give the model time to initialize, then say a quiet sentence and a longer louder one. Pause between both. Check that the output changes when selecting the model and that the audio remains stable across a minute.
5. If you hear a dry copy as well, turn off hardware sidetone or remove the other mic loop in the OS. Keep headphone levels moderate during tests.

## Connect a cable

TGR's publisher uses Virtual Audio Cable by Muzychenko for its Windows troubleshooting examples. This typically exposes matched playback and recording endpoints named **Line 1**. Other cable drivers use different labels. The signal must enter the playback endpoint and leave through the matching recording endpoint.

| Setting | First routed test |
| --- | --- |
| TGR Input | Your physical microphone, the same one that worked in the headphone test. |
| TGR Output | Cable playback endpoint. |
| TGR Monitor | Headphones, if shown as a separate output. |
| Discord or OBS input | The cable's recording endpoint. |
| Discord output or OS playback | Headphones. |

1. Install the cable and restart the applications to refresh audio devices.
2. Set the devices as shown, then check the mic and cable default formats in the OS sound settings. Choose a common supported sample rate. In Server mode, check for duplicate device names listed under different host APIs and use a compatible pair.
3. Start conversion, then start the receiving application's mic test. Record a short phrase. Listen to what the recipient receives, not just the monitor in TGR.
4. In OBS, disable the separate physical microphone if it duplicates the cable source. In a call, check that the selected input is explicit rather than automatically switching when you plug in a new headset.
5. Stop the converter. If the receiving meter continues to respond, check the selected recording endpoint and any desktop audio routed into the cable.

## Tune DirectML and CUDA without losing your baseline

**Chunk** controls the block of incoming audio. **Extra** supplies context around the current block. **Crossfade** controls overlap where blocks join. Change one control at a time and make a test recording. If processing time is getting close to the chunk duration, start by increasing the chunk or reducing extra context. If a changed chunk behaves oddly, stop and start conversion again.

On the documented DirectML build, changes to Chunk, Extra and Crossfade can require selecting CPU and then reselecting the intended GPU. Do that after stopping, restart the stream, and repeat the same test before evaluating latency. On CUDA, allow first-start warmup before measuring. Some Server audio and protocol combinations show **perf** without other timings. Judge the full call path with a recording in the receiving app.

| Fault | Next action |
| --- | --- |
| The mic passes through unchanged | Turn off **Passthrough**, check the selected slot, and select the cable as the receiving app's only microphone. |
| A quiet syllable disappears | Test the input threshold and the destination app's voice detection separately. Check a plain recording for actual silence. |
| Clicks start after the cable is connected | Compare the mic and cable sample rates and host API selections. Retest without the cable to confirm which stage introduces the click. |
| Words stutter when a game opens | Restore the last stable chunk, reduce context or competing load, and retest. Keep the setting that works with both apps open. |
| Only one pitch method crashes or stalls | Return to a method listed by your backend. On DirectML, compare the ONNX pitch options with the same short phrase. |
| A second app has a meter but records room noise | Stop TGR and check the meter again. A meter that still follows your mic points to an extra route or the wrong recording endpoint. |

If you need help diagnosing further, keep the release identifier, backend, microphone and cable device names, chosen detector and first console error. Confirm whether the problem also occurs in a local headphone test.
