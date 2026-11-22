# Use the RVC WebUI (Mainline - Original RVC) real-time voice changer

This guide applies to the separate real-time GUI included in supported RVC WebUI (Mainline - Original RVC) builds. It can run a microphone through a model continuously while the WebUI is used for recordings and training. Start by listening directly through headphones, then send the processed audio to your other app.

## Open the interface and select your files

1. Finish [installation](installation.md) and check the model with a [short file conversion](inference.md). This gives you an independent test if a microphone problem comes up.
2. In a Windows package with `go-realtime_gui.bat`, launch it from the unpacked program folder. In the current source branch, activate the environment from setup and run `python realtime_gui.py` from the repository directory. Package launcher names vary.
3. In the real-time window, select the small inference `.pth`. If you have its matching populated `.index`, choose it here. Leave **Index Rate** at `0` for the first listening test. If your build requires an index in its file picker, supply the one for the selected model.
4. Choose a sound host interface, then select your physical microphone as input and headphones as output. Choose the normal values for pitch and sample rate offered by your build. Start with default performance settings.

## Verify the microphone before connecting an app

1. Lower the headphone volume before starting. If the GUI offers **Input voice monitor**, use it to confirm the selected microphone. Speak a short sentence and pause. Check that you hear one direct voice and silence during the pause.
2. Switch to **Output converted voice** and start conversion. Wait for initialization. Repeat the same sentence at an ordinary speaking level and listen to consonants and word endings. Check for feedback before raising the volume.
3. If the stream starts but clips words, check the device selection and input level. If there are repeated gaps, return to the default processing block length. A clean, slightly delayed voice is a better baseline than a low-latency signal that keeps breaking up.
4. Stop the stream before changing audio devices or loading a different checkpoint. Restart and repeat the same listening test.

## Route RVC WebUI (Mainline - Original RVC) into a call or recorder

> **Correct Audio Routing**
>
> **1. Inside the Voice Changer**
> - **Input Device:** Your physical microphone.
> - **Output Device:** `Line 1` (VAC, recommended) or `CABLE Input` (VB-CABLE).
>
> **2. Inside Discord, Games, OBS, or Other Applications**
> - **Input Device:** `Line 1` (VAC, recommended) or `CABLE Output` (VB-CABLE).
> - **Output Device:** Your headphones (strongly recommended over speakers).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> Audio coming from Discord, your game, or other apps must play directly to your **headphones** (never back into the virtual cable).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) is always recommended. If you have **VB-CABLE** installed as well (or instead), remember that the voice changer outputs to **`CABLE Input`** while Discord / games listen to **`CABLE Output`**.
> - **Speakers & Headset Bleed:** Avoid using speakers; sound from speakers can leak into your microphone and cause double audio, echo, or other people's voices being converted too. This can also happen with headsets if the volume is too loud or the earcups are not closed and isolated enough.
> - **Monitoring:** Hearing your own converted voice in your headphones is a separate optional feature to enable only when needed. Avoid duplicate audio paths, echo, and loopback.

Set up a virtual cable or other pair of connected playback and recording devices. The playback end receives sound from RVC WebUI (Mainline - Original RVC). The recording end supplies that sound to your call or recorder.

```text
Physical microphone → RVC WebUI (Mainline - Original RVC) GUI → Virtual cable playback input
                                           ↓
                       Call or recording app ← Virtual cable recording output
```

1. Stop conversion and set the RVC WebUI (Mainline - Original RVC) output device to the cable's playback end. Leave the physical microphone selected as RVC WebUI (Mainline - Original RVC)'s input.
2. In the destination app, choose the cable's recording end as its microphone. Select your headphones for that app's playback so sound from the call does not travel back through the cable.
3. Start conversion and make a private recording or use the app's microphone test. Confirm that it captures the converted voice once. If you also need local monitoring, use the destination app's monitoring where available and keep it separate from the cable input.
4. If the destination app cuts quiet syllables, compare a short sample with automatic noise processing off for diagnosis. Restore any processing that improves the result without losing words.

## Reduce delay without creating dropouts

Decrease **Sample length** or the equivalent block control one increment at a time. A shorter block reduces waiting but gives the engine less time to finish. Repeat a quiet phrase and a louder phrase after each change. If there are clicks, dropouts or repeated syllables, go back to the last stable value. Once the block size is stable, adjust one other setting at a time if your build exposes it:

- **Fade length** blends overlapping chunks. A change can help with clicks at chunk boundaries.
- **Extra inference time** gives the model more context around the current block. Reduce it cautiously and listen for instability.
- **Pitch extraction** affects both pitch quality and workload. Compare a supported alternative when difficult notes wobble or processing takes too long.
- **Index rate** and noise reductions add processing. Try a stable baseline with the optional features off before tuning each one.

Use the same test with your call, game or recording workload running. The round-trip delay you hear also includes drivers, the virtual cable and the destination app. A timing figure shown by the converter accounts for only part of that path.

| Symptom | Check first |
| --- | --- |
| Device is missing | Stop the stream, reload the device list, and try another host interface that exposes the microphone and output. Check system microphone permission. |
| The downstream app receives the raw voice | Set the downstream microphone to the cable's recording end. Disable a second capture source if the app mixes both. |
| Howl or doubled voice | Use headphones, check that no input points to the cable's own return, and switch off duplicate monitoring. |
| Good monitor sound, silent destination | Confirm you chose the two ends of the same cable. Test both endpoints with a local recording app. |
| Model will not start | Test the same inference export in the WebUI and confirm the matching assets. Check the first GUI error before changing device and model settings together. |

See [real-time conversion basics](../../conversion/real-time.md) for other supported apps and general routing terminology.
