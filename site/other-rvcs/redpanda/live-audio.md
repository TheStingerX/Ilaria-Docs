# Test live audio in Redpanda-vc

## Choose desktop or browser

The Windows desktop realtime launcher uses the devices exposed to that local process. The WebUI realtime tab captures microphone input through the browser and passes audio to the selected inference device. Use one path for your first test and leave the other closed to make feedback and competing jobs easier to diagnose.

1. Load a compatible RVC model, select the expected embedder where exposed, and start at neutral pitch with the default buffer.
2. Select the physical microphone. In browser mode, grant mic permission to the local page and check the actual source in browser permissions.
3. Connect headphones and play the monitor. Say one short sentence containing both quiet and loud words, followed by a pause. Check voice identity, volume, and dropouts.
4. Stop the stream before switching engines or choosing a different inference device. Run another test after reconnecting.

## Select the compute device

In WebUI builds with **Inference Device**, **Automatic** assigns a new stream to an available device. Choose a specific GPU when comparing repeatable results or leaving a GPU free for another workload. A stream stays on its assigned device. Multiple GPUs can handle separate streams; changing the selector is not a way to combine their capacity into one stream. Beatrice uses a separate CPU path in the documented implementation.

## Route the signal after a clean test

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

If your playback path can target a virtual cable, choose the cable's playback endpoint there. In the receiving app, select the companion recording endpoint as the microphone. Keep the physical mic as the converter input and output from the call on headphones. In browser mode the playback destination can depend on browser and OS output settings. Verify the receiver with a local recording before judging the live stream in a call.

| What you hear | What to test |
| --- | --- |
| The monitor works but the call has raw audio | Select the cable endpoint in the call and disable extra mic sources. |
| Delay grows or audio stutters | Stop other streams, use the default buffer, and test locally with one tab. |
| Browser mic meter never moves | Confirm site permission, the selected physical device and whether another app has exclusive access. |
| Only a game causes broken audio | Test while the game is running, give the conversion GPU some headroom, or choose another available GPU. |

The browser stream attempts WebSocket transport and can fall back to HTTP streaming when needed. Establish a clean local result before investigating remote connection quality. For how Redpanda-vc's realtime and training features compare to RVC Mainline, Applio, and Ilaria RVC, see [Redpanda-vc vs other RVC versions](differences.md).
