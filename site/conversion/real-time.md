# Real-time voice conversion

> Connect your physical mic to the voice changer, send its output to the cable’s playback endpoint, and select the matching recording endpoint in Discord or OBS. Start with **VAC Lite** for Vonovox, or use **VB-CABLE** as an alternative. Read the full routing guide before testing in a call. [VAC Lite / VB-CABLE](../other-rvcs/vonovox/live-audio.md)

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

## Send converted audio to another app

A virtual audio device provides a playback endpoint for the converter and a corresponding recording endpoint for the receiving app. Endpoint names depend on the driver. For example, a virtual cable may call its playback endpoint “Input” and its recording endpoint “Output” because the instructions use the cable's perspective.

```text
Physical microphone → RVC converter → virtual playback endpoint
                                           ↓
                              matching recording endpoint → call or stream
```

Select the matching recording endpoint as the microphone in the receiving app and make a short test recording there. If your local monitor sounds correct but the recording does not, verify the destination input and remove any duplicate microphone source. If you monitor the converted audio, use a separate headphone output. Avoid routing your entire desktop mix or the receiving app's audio back into the converter.

## Tune latency without losing stability

End-to-end delay includes device buffers, conversion, virtual routing and any processing in the destination. A processing-time figure in the converter measures only part of that path. Capture a local test of both the dry mic and the converted route if you need to measure the delay between them.

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
| Neither the converter meter nor a dry mic recording responds | Check the operating system input device and microphone permission. |
| Dry mic works, but converted output is silent | Confirm the stream started, the model loaded and the converter selected the correct output. Check the input threshold. |
| The local monitor works, but the call receives the original voice | Select the virtual recording endpoint as the call microphone and disable any separate physical-mic source in that app. |
| You hear two versions of the voice | Mute duplicate input routes and verify the headphone monitor is separate from the virtual route. |
| Audio crackles only under load | Return to the last stable chunk size, reduce competing workloads and retest. |
| A model works in file conversion but fails live | Check the live client's edition, architecture and embedder support. Test a model listed as compatible in that client before changing audio devices. |

[RVC fundamentals](../start/rvc-fundamentals.md) · [Troubleshooting](../reference/troubleshooting.md)

## RVC Blue

Windows desktop voice conversion. [Installation and setup](../other-rvcs/rvc-blue/installation.md).
