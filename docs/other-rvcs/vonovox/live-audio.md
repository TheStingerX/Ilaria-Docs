---
label: "🎙️ Route and tune Vonovox"
order: 98
permalink: /ilaria-rvc/vonovox/live-audio/
---
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
