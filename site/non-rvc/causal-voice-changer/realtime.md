# Using CausalVC Realtime

Once you have run `run-training` at least once and have a `.cvc` voice ready, launch the live voice changer with:
- **Windows**: `run-realtime.bat`
- **Linux**: `run-realtime.sh` *(you can also add it to your app launcher with `realtime/scripts/install-desktop-entry.sh`)*

> **Always wear headphones** when using a live voice changer. Using speakers lets the converted voice loop back into your microphone, causing echo and feedback.

## 1. Set up Audio (`Audio` page)

1. **Input → Source**:
   - Choose **Microphone / audio device** for live speech.
   - *(Or choose **Audio file** to test a voice by playing a pre-recorded file through the model.)*
2. **Input device**: select your physical microphone.
3. **Output device**: select where the converted voice should go.
   - To use CVC in **Discord, OBS, VRChat, or games**, install a virtual audio cable (such as **VB-CABLE** on Windows) and choose **`CABLE Input`** here, then pick **`CABLE Output`** as your microphone in Discord/OBS.
4. **Monitor device** *(optional)*: select your **headphones** if you want to hear your own converted voice. Leave **Disabled** if you don't want to hear yourself.
5. *(Linux tip)*: `[JACK]` devices give the lowest latency. You can set the PipeWire period with `PIPEWIRE_QUANTUM`, e.g. `128/48000`.

## 2. Select & tune your voice (`Model` page)

1. Pick your **Model** (and **Checkpoint** if the voice has multiple saved steps).
2. **Pitch (semitones)**: shift your voice up or down to match the target voice (`+12` = one octave up, `-12` = one octave down).
   - **Pitch match**: don't guess! Drop clips of the model's voice into Pitch match to measure its median Hz, then talk while converting so CVC measures your voice and suggests the exact shift (**Apply**).
3. **Advanced pitch** *(collapsed by default - most voices don't need it)*:
   - **Pitch offset (Hz)**: adds a fixed Hz offset after the semitone shift. Positive values raise low notes more than high notes (narrowing range); negative values widen it.
   - **Pitch ceiling (Hz)** & **Above the ceiling (%)**: pulls down squeaky high peaks above the ceiling while keeping notes below it in tune (great for singing; `0%` stops strictly at the ceiling).
4. **Formant**: shifts vocal resonance (how "big" or "small" the speaker sounds) without changing pitch (`0` = model's natural formant).
5. **Index (%)** *(off by default)*: blends each 20 ms of speech toward the closest moments in the voice's training audio. Higher sounds closer to the target speaker, but too high can blur words.
   - **Consonant protection** *(only applies when Index > 0)*: keeps breaths and consonants (`s`, `t`, `k`) closer to your own so words stay crisp.

## 3. Set volume & loudness (`Levels`)

- **Input gain**: boosts or cuts your microphone before conversion.
- **Output gain**: controls the volume sent to Discord/OBS/games.
- **Monitor gain**: controls only what you hear in your headphones.
- **Noise gate**: mutes your mic when you're quieter than the threshold (`-60 dB` = off).
- **Output level (LUFS)**: talk while converting to see your loudness and click **Apply** to auto-adjust Output gain toward **Voice chat (`-21 LUFS`)** or **Streaming (`-16 LUFS`)**.

## 4. Start converting (Bottom Control Bar)

- Click **Start** to begin live conversion, or **Passthrough** to send your raw mic straight through for quick volume checks.
- Watch **In / Out / Mon** meters and the two timing readouts:
  - **Latency**: total delay from mic to output.
  - **Inference**: time your GPU takes to convert one chunk. **Inference must stay well below your Chunk size** (e.g., `< 10 ms` for a `20 ms` chunk), otherwise the audio will stutter.
