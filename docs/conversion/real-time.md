---
label: "⚡ Real-time conversion"
order: 92
permalink: /real-time/
description: "For a recording or a cover, file conversion lets you render and compare several takes."
---
# Real-time voice conversion

For a recording or a cover, file conversion lets you render and compare several takes. In a live setup, the converter has to finish each audio block quickly enough to keep the microphone stream moving. Configure a reliable local signal first, then connect it to a call, recording or streaming application.

## Choose a tool for the job

See the [RVC tools directory](../reference/tools.md) for downloads and hardware notes, including Vonovox for NVIDIA GPUs.

| Tool | Where to start |
| --- | --- |
| Vonovox | A real-time converter for RVC V2 models on Windows with an NVIDIA GPU. Download a build for your GPU, load the model, and test your microphone through headphones before routing the converted signal to another app. [Vonovox downloads](https://huggingface.co/dr87/vonovox/tree/main) · [Project documentation](https://github.com/dr87/Vonovox) |
| RVC WebUI (Mainline - Original RVC) | The upstream project provides a training and inference WebUI alongside a dedicated real-time GUI. Refer to its release and launcher instructions for the platform you use.  |
| Applio | Its Desktop and Gradio interfaces have their own real-time workflows. Use the setup instructions for the interface and version you have installed.  |
| w-okada VCClient | A voice changer for live use. RVC availability depends on the release edition and platform. Check the supported models before installing a build. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
| Deiteris and Tg-Develop | Independent w-okada forks with their own builds and settings. Check the fork's release notes before applying instructions for another edition. [Deiteris repository](https://github.com/deiteris/voice-changer) · [Tg-Develop repository](https://github.com/tg-develop/voice-changer) |


## Hear one clean signal first

1. Connect a microphone and headphones. In the converter, select your physical microphone as the input and your headphones as the output.
2. Load a known compatible inference model and its matching index if you use retrieval. A successful short [file conversion](../start/getting-started.md) is a useful reference before you test the live path.
3. Start the stream and speak at a normal level. Check the input meter or make a dry recording. Reduce input gain if peaks clip before conversion.
4. Verify that the headphone signal changes when conversion is toggled. If you hear the original at the same time, check for direct hardware monitoring or a second route through the operating system.
5. Test for longer than a single word. Include quiet speech, a loud phrase and a short pause. Listen for cutoffs, drift or glitches under the same workload you plan to use live.

Avoid listening through speakers near an active microphone. Headphones help you identify a routing issue without feeding the output back into the input.

## Understand device roles and audio backends

> **Correct Audio Routing**
>
> **1. Inside the Voice Changer**
> - **Input Device:** Your physical microphone.
> - **Output Device:** `Line 1` (VAC, recommended) or `CABLE Input` (VB-CABLE).
>
> **2. Inside Discord, Games, OBS, or Other Applications**
> - **Input Device:** `Line 1` (VAC, recommended) or `CABLE Output` (VB-CABLE).
> - **Output Device:** Your headphones or speakers.
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> Audio coming from Discord, your game, or other apps must play directly to your **headphones** (never back into the virtual cable).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) is always recommended. If you have **VB-CABLE** installed as well (or instead), remember that the voice changer outputs to **`CABLE Input`** while Discord / games listen to **`CABLE Output`**.
> - **Monitoring:** Hearing your own converted voice in your headphones is a separate optional feature to enable only when needed. Avoid duplicate audio paths, echo, and loopback.

Before wiring any app, know what each endpoint does:

| Term | What it is |
| --- | --- |
| **Input Device** | Your physical microphone (or audio interface channel) feeding raw voice into the voice changer. |
| **Output Device** | Where the converted voice goes (your **virtual cable playback endpoint** for Discord/OBS/games, or headphones for a local test). |
| **Monitor Device** | Optional second output so you can hear your own converted voice in headphones while **Output Device** feeds a virtual cable. |
| **Virtual Cable Input** *(Playback side)* | Appears under Windows Playback (e.g. `Line 1` in VAC Lite or `CABLE Input` in VB-CABLE). Set this as the voice changer's **Output Device**. |
| **Virtual Cable Output** *(Recording side)* | Appears under Windows Recording (e.g. `Line 1` in VAC Lite or `CABLE Output` in VB-CABLE). Select this as the **Microphone** in Discord, OBS, or games. |

### USB microphones, audio interfaces, and backends

- **USB microphones:** Plug directly into a rear motherboard USB port (avoid unpowered hubs), set Windows format to **48000 Hz**, and disable USB selective suspend if the mic drops out.
- **Audio interfaces (XLR):** Use **ASIO** when supported by your voice changer (such as RVC Blue or w-okada) for lower driver buffer latency, or **WASAPI** when routing to standard Windows virtual cables.
- **WASAPI Shared vs. WASAPI Exclusive:** **WASAPI Shared** is the safest starting point because Windows and virtual cables can share `48000 Hz` streams cleanly. **WASAPI Exclusive** bypasses the Windows mixer for lower driver latency when supported, but locks the device so other apps cannot share it.

## App-specific setup (Discord, OBS, games, calls, recording)

- **Discord / calling apps:** Set **Input Device** to your virtual cable recording endpoint (`Line 1` / `CABLE Output`), set **Output Device** to your headphones, and turn **OFF** Krisp, Echo Cancellation, and automatic input sensitivity if Discord clips breaths or word endings.
- **OBS Studio & local recording:** Add an **Audio Input Capture** source pointing to the virtual cable recording endpoint, mute any separate raw microphone source, and record a local test clip to check sync and levels.
- **Games:** Select the virtual cable recording endpoint as your in-game mic (or set it as Windows Default Communication Recording Device). Always cap in-game FPS or leave GPU headroom so the game does not starve the voice changer.

## Send converted audio to another app

A virtual audio device provides a playback endpoint for the converter and a corresponding recording endpoint for the receiving app. Endpoint names depend on the driver. For example, a virtual cable may call its playback endpoint “Input” and its recording endpoint “Output” because the instructions use the cable's perspective.

```text
Physical microphone → RVC converter → virtual playback endpoint
                                           ↓
                              matching recording endpoint → call or stream
```

Select the matching recording endpoint as the microphone in the receiving app and make a short test recording there. If your local monitor sounds correct but the recording does not, verify the destination input and remove any duplicate microphone source. If you monitor the converted audio, use a separate headphone output. Avoid routing your entire desktop mix or the receiving app's audio back into the converter.

## Tune latency without losing stability

**Processing latency vs. total end-to-end latency:** The **GPU Delay** / inference time shown inside your voice changer is **only** how long the GPU takes to convert one chunk. **Total end-to-end latency** adds microphone input buffering, **Block Size / Chunk Size**, crossfade/context overhead, virtual cable buffering, and Discord/OBS/game audio buffers. Do not confuse a low GPU Delay (e.g. `15 ms`) with total round-trip latency.

| Control | Practical adjustment |
| --- | --- |
| Block size or chunk size | Increase it if speech breaks up under load. Once stable, try a smaller setting and keep it only if normal speech stays clean. Smaller blocks leave less time to finish processing. |
| Crossfade | Increase cautiously if you hear rough joins between blocks. It changes how neighboring blocks overlap. |
| Extra context | Try less context if the converter falls behind. It can help the model follow transitions, at the cost of more processing. |
| Pitch predictor | If a setting produces unstable timing, compare available predictors using the same phrases. Select the one that handles your pitch range with enough processing margin. |
| Silence detection or input threshold | Lower a threshold that cuts off soft syllables. Evaluate this during pauses and quiet speech, not just a sustained loud input. |
| Device rate | Check the device and virtual-cable sample rates if you hear unusual speed or crackle. Start with compatible settings across the chain. |

Start with the app defaults and change one setting at a time. If a game or another GPU-heavy program shares the machine, repeat the test while it is running. Keep a working preset so you can restore it before going live. [RVC WebUI (Mainline - Original RVC) real-time GUI](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Troubleshoot by where the fault appears

| Symptom | Check first |
| --- | --- |
| Neither the converter meter nor a dry mic recording responds | Check Windows mic permission, physical mute switch, and Input Device selection. |
| Dry mic works, but converted output is silent | Confirm the stream started, the model loaded, and Output Device is set correctly. Lower VAD/silence threshold. |
| The local monitor works, but the call receives the original voice | Select the virtual recording endpoint (`CABLE Output` / `Line 1`) as the call mic and disable any separate raw-mic source. |
| Double monitoring / echo / feedback loop | Never use speakers near a live mic. Turn off Windows **"Listen to this device"** if the app already monitors, and never route desktop/call audio into the virtual cable. |
| Crackling, stuttering, or buffer underruns | Align **all** endpoints (Mic, Headphones, Cable Input/Output) to **48000 Hz** (`mmsys.cpl`), raise **Block/Chunk Size** one step, and check for CPU overload. |
| Robot voice or broken syllables | Pitch extractor is too heavy (`crepe` full) -> switch to **RMVPE** or **FCPE**, or lower **Index Ratio**. |
| High **GPU Delay** or crackling only while gaming | **GPU saturation**: cap in-game FPS, lower heavy GPU settings, or raise **Block Size**. |
| A model works in file conversion but fails live | Check the live client's edition, architecture and embedder support. Test a model listed as compatible in that client before changing audio devices. |

[RVC fundamentals](../start/rvc-fundamentals.md) · [Troubleshooting](../reference/troubleshooting.md)

## RVC Blue

Windows desktop voice conversion. [Installation and setup](../other-rvcs/rvc-blue/installation.md).
