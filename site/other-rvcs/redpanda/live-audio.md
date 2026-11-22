# Test live audio in Redpanda-vc

> **Correct Audio Routing**
>
> **1. Inside the Voice Changer (Redpanda-vc)**
> - **Input Device:** Your physical microphone.
> - **Output Device:** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. Inside Discord, Games, OBS, or Other Applications**
> - **Input Device:** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device:** Your headphones or speakers.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> Audio coming from Discord, your game, or other apps must play directly to your **headphones** (never back into the virtual cable).
>
> - **VAC vs. VB-CABLE:** `Line 1` is the name used by **VAC (Virtual Audio Cable)**, not a universal name for every virtual cable. With **VB-CABLE**, set Voice Changer Output to **`CABLE Input`** and Discord / Game Input to **`CABLE Output`**.
> - **Monitoring:** Hearing your own converted voice in your headphones is a separate optional feature to enable only when needed. Avoid duplicate audio paths, echo, and loopback. See also [VAC Lite / VB-CABLE](../vonovox/live-audio.md).

## Choose desktop or browser

The Windows desktop realtime launcher uses the devices exposed to that local process. The WebUI realtime tab captures microphone input through the browser and passes audio to the selected inference device. Use one path for your first test and leave the other closed to make feedback and competing jobs easier to diagnose.

1. Load a compatible RVC model, select the expected embedder where exposed, and start at neutral pitch with the default buffer.
2. Select the physical microphone. In browser mode, grant mic permission to the local page and check the actual source in browser permissions.
3. Connect headphones and play the monitor. Say one short sentence containing both quiet and loud words, followed by a pause. Check voice identity, volume, and dropouts.
4. Stop the stream before switching engines or choosing a different inference device. Run another test after reconnecting.

## Select the compute device

In WebUI builds with **Inference Device**, **Automatic** assigns a new stream to an available device. Choose a specific GPU when comparing repeatable results or leaving a GPU free for another workload. A stream stays on its assigned device. Multiple GPUs can handle separate streams; changing the selector is not a way to combine their capacity into one stream. Beatrice uses a separate CPU path in the documented implementation.

## Route the signal after a clean test

If your playback path can target a virtual cable, choose the cable's playback endpoint there. In the receiving app, select the companion recording endpoint as the microphone. Keep the physical mic as the converter input and output from the call on headphones. In browser mode the playback destination can depend on browser and OS output settings. Verify the receiver with a local recording before judging the live stream in a call.

| What you hear | What to test |
| --- | --- |
| The monitor works but the call has raw audio | Select the cable endpoint in the call and disable extra mic sources. |
| Delay grows or audio stutters | Stop other streams, use the default buffer, and test locally with one tab. |
| Browser mic meter never moves | Confirm site permission, the selected physical device and whether another app has exclusive access. |
| Only a game causes broken audio | Test while the game is running, give the conversion GPU some headroom, or choose another available GPU. |

The browser stream attempts WebSocket transport and can fall back to HTTP streaming when needed. Establish a clean local result before investigating remote connection quality.
