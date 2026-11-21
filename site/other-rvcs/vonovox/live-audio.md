# Route and tune Vonovox

## Set up the route

Use three endpoints: your physical microphone for input, a virtual cable for the converted signal, and headphones for monitoring. A virtual cable has a playback side for the app that sends audio and a recording side for the app that receives it. Some drivers show the same line name on both sides.

1. In Vonovox, set **Input Device** to the physical mic. Set **Output Device** to the virtual line listed under Windows playback devices.
2. In the receiving app, select the matching line under its microphone settings. Avoid leaving the app on **Default** if it selects the physical mic. Keep the receiving app's speaker output set to your headphones.
3. To listen locally, open **Settings → System → Sound → More sound settings → Recording**. Open the properties of the cable's recording endpoint, select **Listen to this device**, and send playback to headphones. Turn listening off if you already monitor through another app.
4. Test in the receiving app with a private recording or its mic test. Say a normal sentence, wait quietly, then say a louder sentence. Verify the recording has the converted voice, clean pauses, and no second copy of your raw mic.

The developer uses a 48 kHz audio route. If your mic and virtual driver expose that rate, set their device formats to 48 kHz. This device format is separate from the model's training rate.

## Tune in a repeatable order

| Symptom | Change to test first |
| --- | --- |
| Crackling or missing syllables | Increase **Block Size** one step and repeat the same sentence. |
| Clean audio with too much delay | Reduce **Block Size** one step. Restore the last clean value if it drops audio. |
| Whispering or singing disappears | Disable **RNNoise** and **VAD Noise Reduction** if enabled and check any downstream voice gates. |
| Local sound is clear but sent audio is silent | Check the receiving app is listening to the cable's recording endpoint. |
| The voice repeats or echoes | Disable duplicate monitoring and make sure the call output is routed directly to headphones. |
| Audio breaks up only while gaming | Test under the usual game load. Give the converter GPU headroom or raise the block size. |

Keep lookahead at its preset for the first test. Change it only after finding a stable block size. Tune pitch and formant independently, pausing between changes so resulting artifacts are easier to isolate. When testing realtime file playback, check the active source in the UI before resuming microphone use. A playing file can temporarily replace the physical mic.

## Windows virtual cable guide

### Choose VAC Lite or VB-CABLE

**VAC Lite is the recommended first choice for Vonovox.** This is also the preference in the Vonovox project's Windows setup. Use [VAC Lite](https://software.muzychenko.net/freeware/vac470lite.zip) if you are starting from scratch. [VB-CABLE](https://vb-audio.com/Cable/) is a usable alternative if it is already installed or works better with your particular audio setup. Install one driver first so the device list is easy to follow.

After installing the driver, reopen the converter and call or recording app so they can see the new audio endpoints. Restart Windows if asked by the installer. The example names below can include a driver name or a numbering suffix.

| Driver | Converter output (playback endpoint) | Discord, OBS, games, or other apps (recording endpoint) |
| --- | --- | --- |
| VAC Lite | **Line 1** under Playback | **Line 1** under Recording |
| VB-CABLE | **CABLE Input** | **CABLE Output** |

### Wire the four devices correctly

1. In the voice changer, set **input** to your physical microphone. Speak to confirm the input meter moves.
2. In the voice changer, set **output** to the chosen cable's playback endpoint. Keep the converter running.
3. In Discord, select the matching recording endpoint in **Voice & Video → Input Device**. In OBS, add an **Audio Input Capture** source for that recording endpoint. Mute any duplicate mic source during the test.
4. Set Discord or Windows playback to your headphones. Keep system sounds and the other person's voice out of the cable. Record or use the destination app's microphone test to confirm what actually reaches it.

### Monitor briefly and check the audio format

Open **Settings → System → Sound → More sound settings → Recording**. Choose the cable's recording endpoint, open **Properties → Listen**, enable **Listen to this device**, and select headphones for its playback. Test at low volume. If the converter or OBS already provides monitoring, use one monitor at a time to avoid an echo. You can turn Windows listening off after the test and keep sending the cable to the destination.

For Vonovox, start with WASAPI shared mode where available. Use 48 kHz on the microphone and cable endpoints if they support it. The Windows device format is separate from the model's training rate. If the device can only use a different supported format, test the actual route before changing other settings.

### Find which link in the chain failed

| What happens | First check |
| --- | --- |
| Nothing moves in Vonovox | Verify Windows mic permission and the physical mic input. |
| Vonovox receives your mic but the cable has no signal | Check that conversion is running and the converter output is the cable playback endpoint. |
| The cable has signal but Discord sends the raw mic | Select the cable recording endpoint explicitly in the call app. |
| You hear your voice twice | Disable duplicate monitoring and check that the physical mic is not captured separately. |
| Other people's voices come back as an echo | Route call output to headphones and remove desktop or call audio from the cable. |
| Audio sounds good until the PC is under load | Restore the default buffer or increase it, and test with the game or streaming app running. |
| Syllables disappear when you whisper or sing | Test with voice activity detection and noise suppression disabled one at a time. |

Tune **Block Size** after the complete route works. Lower it one step and repeat the same phrase. If you get clicks or missing words, restore the last clean value. Leave lookahead and other effects at their defaults until you have a stable baseline.

> **Optional:** Experiencing GPU Delay spikes on a supported NVIDIA card? See [Advanced Performance Optimization: NVIDIA GPU Clock Locking](advanced-performance-optimization.md).
