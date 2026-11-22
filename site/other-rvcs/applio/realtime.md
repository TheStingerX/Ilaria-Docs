# Use Applio with a microphone

> **Correct Audio Routing**
>
> **1. Inside the Voice Changer (Applio)**
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
> - **Monitoring:** Hearing your own converted voice in your headphones (such as **Hear myself** in Applio Desktop) is a separate optional feature to enable only when needed. Avoid duplicate audio paths, echo, and loopback. See also [VAC Lite / VB-CABLE](../vonovox/live-audio.md).

Prove that your model works with [one recorded clip](inference.md) before setting up live audio. Use headphones for monitoring so the microphone cannot re-capture the speakers. Stop training or file conversion jobs that use the same GPU.

## Hear the converted voice locally

1. Open **Realtime**. In Desktop, give microphone permission when asked, then select **Input Device** and **Output Device**. Refresh the list if you connected a device after opening Applio.
2. Use your physical microphone as input and your headphones as output or monitor for this first test. In Gradio, choose the devices in **Audio Devices**. PortAudio device names may differ from Windows names or the labels shown in Desktop.
3. Select the tested model, its matching embedder, and the optional index if you use it. Start the stream and wait for the ready state. In Desktop, enable **Hear myself** to monitor and set a comfortable volume.
4. Say “one, two, three,” pause, then repeat at your normal speaking level. Listen for the converted voice, missing syllables or clicks. If you hear your unchanged voice, check **Passthrough** and check whether the microphone is monitored elsewhere.

## Route it to your chat or streaming app

Once the headphone test works, stop the stream and choose an installed virtual audio cable or equivalent operating system device. The virtual cable has one endpoint that receives playback and another that exposes that signal as a recording input.

```text
Physical microphone
  → Applio Realtime input
  → virtual cable playback endpoint
  → virtual cable recording endpoint
  → Discord, OBS or your recording application
```

1. Keep Applio’s input on the physical microphone and select the cable’s playback endpoint as its output.
2. In the receiving app, select the cable’s recording endpoint as the microphone. If you need monitoring, use headphones. Disable monitoring paths that send the cable back into itself.
3. Start Applio, then use the receiving application’s microphone test or make a private test recording. Check that it hears the converted signal. Turn off duplicate physical-mic inputs if you hear two voices.
4. If headphones sounded correct but the receiving app is silent, troubleshoot the device names, destination level and input selection before changing the voice or index.

## Balance delay and audio stability

Use automatic chunk sizing first where available. If audio breaks up, increase **Chunk Size**, then repeat exactly the same phrase. Smaller chunks can reduce delay while leaving the engine less time to finish each block. **Crossfade Overlap** smooths joins, and **Extra Conversion Size** gives more context at a compute cost. Change one control per test. Keep a stable setting you can return to.

If quiet starts or word endings disappear, check **VAD** or **Silence Threshold**. If loud vowels crackle, check the raw microphone and lower its input gain. If the stream only fails with a particular game or GPU job running, retry with that job closed. Stop live mode before returning to training or queued GPU work.
