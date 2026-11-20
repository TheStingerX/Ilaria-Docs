---
label: "Route & tune Deiteris"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/deiteris/live-audio/
---
# Route and tune Deiteris w-okada Fork

Always wear **headphones** during live conversion. Using speakers feeds the converted voice back into your microphone and creates echo and feedback loops.

## 1. Configure audio devices

1. Set **Audio Input** to your physical microphone.
2. Set **Audio Output** to your headphones for a local test first, or to **`CABLE Input`** (your virtual audio cable's playback endpoint) when routing to other apps.
3. In **Discord, OBS, VRChat, or your game**, select **`CABLE Output`** as your microphone.
   - In Discord, disable **Krisp Noise Suppression** and **automatic input sensitivity** so breaths and quiet endings are not cut off.

## 2. Load a model and tune settings

1. Upload or select an inference **RVC `.pth`** model and its optional matching **`.index`** file.
2. **Chunk / Block size**: start around `0.3s` to `0.5s` (or `192` / `256`+ samples/frames depending on the UI slider) to balance delay and audio smoothness. Lowering Chunk too far causes robotic stutter or dropouts.
3. **Extra Data / Context**: keep moderate (`0.5s` to `1.0s`) for stable tone without overloading the GPU.
4. **F0 / Pitch detector**: use **RMVPE** (most accurate) or **FCPE** (lighter/faster for real-time); avoid heavy Crepe Full in live mode if inference time exceeds chunk time.
5. **Tune (Pitch)**: `+12` for male to female, `-12` for female to male, `0` for same range.
6. **Index ratio**: start at `0.0` to test clean conversion, then raise gently (`0.3` to `0.6`) if needed.

## 3. Common fixes

- **High latency or robotic stutter**: disable **Hardware-accelerated GPU Scheduling (HAGS)** in Windows Graphics Settings and restart, close GPU-heavy games/browser tabs, and raise Chunk one step.
- **PortAudio / device error**: match all audio devices to the same sample rate (`48000 Hz`) in Windows Sound settings and close apps holding exclusive device control.
