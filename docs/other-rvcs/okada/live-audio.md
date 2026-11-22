---
label: "Live audio and routing"
icon: ":studio_microphone:"
order: 90
permalink: /ilaria-rvc/okada/live-audio/
description: "Start with headphones and a single local audio path. When you hear a clean converted voice in the headphones, connect it to a call or recorder."
---
# Convert your microphone in w-okada VCClient

Start with headphones and a single local audio path. When you hear a clean converted voice in the headphones, connect it to a call or recorder. This order lets you locate issues before adding the virtual cable.

## Add a model and hear the first result

1. Plug in your microphone and headphones before opening VCClient. In the operating system, speak into the microphone and check that the input meter moves. Pause Discord, OBS and other capture apps during this test.
2. In **Model Selection**, choose a compatible sample model if one is available. For your own model, use **Edit**, pick a spare slot and choose **Upload**. Select **RVC** when the dialog requests a model type. Supply the inference file accepted by your release and an optional matching index. Wait for the upload and then select the filled slot in the main view.
3. In the audio controls choose **Client** for a first browser-side test. Select the exact name of the physical microphone and the exact name of the headphones. If the browser asks for permission, allow microphone access for the local page.
4. Turn off passthrough, leave pitch and index at zero, and keep the default chunk, context, crossfade and pitch estimator. If you imported an index, you can evaluate it after hearing the baseline.
5. Press **Start**, wait for model warmup and speak for at least 30 seconds. Include a quiet sentence, a normal sentence, a louder phrase and a brief pause. With conversion enabled you should hear the selected voice. Press **Stop** when making changes that require restarting the stream.
6. If you hear silence, test the same devices in a plain recorder. If you hear your original voice twice or hear it alongside conversion, disable direct microphone monitoring on your interface or remove the duplicate software path.

## Understand client and server device mode

**Client** uses devices available to the client/browser. Microphone permissions and the browser's output selection can affect the device list. **Server** opens devices on the computer running the conversion engine. This matters on two computers: a USB microphone plugged into the client does not automatically appear on the server.

On one PC, test the simpler client path first. Switch to Server if your build exposes a separate monitor or the browser cannot select the desired output endpoint. In Server mode, choose the host API and device names offered by the server. If several entries share a name, try using the same audio API for input and output. Once the signal is stable, you can test alternatives for latency.

## Send conversion to Discord, OBS or another app

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

1. Install a virtual cable for your OS and reopen both applications so their device lists refresh. It should expose a playback endpoint and a corresponding recording endpoint.
2. Set VCClient input to the physical microphone. Set the converter's output to the cable's **playback** endpoint. With VB-CABLE, this is commonly **CABLE Input**.
3. If the app exposes a separate **Monitor** device, set it to the headphones. Leave the target application's speakers on the headphones.
4. Select the cable's **recording** endpoint as the target microphone. With VB-CABLE, that is commonly **CABLE Output**. In OBS, select that device for the audio input capture and mute any second capture of the physical mic.
5. Use a test call or make a short local recording in the target app. Test quiet and loud speech. Confirm that stopping VCClient or muting the converted source makes its meter stop. If it continues, the target has another input active or is receiving an unintended route.
6. Compare destination noise suppression or automatic gain on and off only if the converter sounds good locally and the target chops syllables or changes the level. Keep the options that work for your room and microphone.

```text
Physical microphone → VCClient → cable playback → cable recording → call or recorder
                           └── optional monitor → headphones
```

## Tune a setup that already works

Start from the default chunk and test under your actual workload. When the UI shows chunk duration and conversion time, compare them in matching units. Each block needs enough time to finish. Leave margin for spikes while running a game or streaming. Reduce the chunk one step at a time and listen for dropouts before keeping the change. If words cut out, increase it again or reduce extra context. Crossfade helps soften boundaries but also consumes part of the available processing budget.

Choose a pitch estimator that handles your normal speaking range. Compare the same phrase at each setting. Pitch changes the register, while index blending changes how much the inference uses features retrieved from the matching training index. Increase either one gradually and record the result. Hold the model and microphone gain steady during the comparison.

| Symptom | Specific test |
| --- | --- |
| Original voice reaches the call | Turn off passthrough and choose the cable as the only microphone in the receiving app. |
| Distortion is already present in the plain mic recording | Lower the physical input gain before tuning the model. |
| First syllable disappears after a pause | Compare the input threshold and destination voice activation. Try a recording with voice activation disabled to isolate the stage. |
| Local monitor is fine, but cable audio crackles | Match supported sample rates in the OS sound panel and reopen both streams. Check for a second application holding the endpoint in exclusive mode. |
| GPU conversion fails and CPU works | Check the selected package, model format and compute provider separately. Test with the same known-working model on each device. |
| Conversion falls behind when a game opens | Increase chunk size or reduce the competing GPU workload. Repeat a longer recording before going live. |

Keep the working package name, model, audio mode, device names, pitch method and buffer controls in a note. That gives you a reliable baseline after a device or software update.
