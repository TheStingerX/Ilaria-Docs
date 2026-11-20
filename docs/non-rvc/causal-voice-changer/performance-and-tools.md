---
label: "Performance, Cleanup & Tools"
icon: ":wrench:"
order: 95
permalink: /non-rvc/causal-voice-changer/performance-and-tools/
---
# Performance, Sound Cleanup & Extra Tools

## 1. Performance & Latency (`Performance` page)

### Buffering

- **Chunk** (steps of `20 ms`): how much audio is converted at a time. Total delay is CVC's fixed **60 ms** lookahead + **1 chunk** + your sound card/virtual cable buffers.
  - Lower chunks = lower latency, but require a faster GPU.
  - If audio crackles or stutters (or if you are running on CPU on an older AMD card), raise **Chunk** to `40 ms` or `60 ms+`.
- **Extra inference buffer**: how much recent speech the model looks back at for each chunk. More context gives steadier tone and pitch at a small GPU cost, **with zero added delay**.

### Inference & GPU

- **Pitch detector**:
  - **RMVPE (recommended)**: most accurate.
  - **FCPE**: lighter on the GPU.
  - **PM (fastest)**: fastest, but roughest.
- **Pitch smoothing** *(RMVPE only)*: tracks pitch as one continuous line so held notes don't wobble or flip octaves (no added delay).
- **Volume envelope**: `0` matches your microphone's loudness moment-to-moment; `1` keeps the model's own loudness.
- **Fast GPU replay** *(on by default)*: records the GPU's work once and replays it for every chunk - roughly **2× faster** and much steadier (for example, an RTX 5050 converts a `20 ms` chunk in `4.4 ms` instead of `9.7 ms`). Turn it **off** only if your GPU converts wrongly or fails to start with it.
- **Audio seam & quality helpers**:
  - **Soften sudden treble**: smooths brief clicks when treble switches on mid-word (adds `5 ms` delay).
  - **Match level across seams**: keeps high-frequency levels steady between chunks (no added delay).
  - **Hold context during silence**: remembers your last words during pauses so the first word after silence isn't slurred.
  - **Silence detection**: **Loudness** (`-50 dBFS`) is best for quiet rooms; **Voice detection (experimental)** uses RNNoise so fans/hum don't count as speech.

## 2. Sound Cleanup (`Noise Reduction`)

- **Input noise reduction**: removes keyboard, fan, or room noise before conversion:
  - **Hushwire (Amazon Voice Focus)** *(default)*: strongest cleanup and most natural voice; adds about **55 ms** delay. Its model is downloaded once from Amazon's servers only after you accept the prompt.
  - **RNNoise**: lighter cleanup with lower delay (**20 ms**).
- **Output noise reduction**: cleans hiss from the converted voice using spectral gating. Leave **off** unless you hear hiss, as it can make the voice slightly duller.

## 3. Recording (`Recording` page)

You can record your sessions directly inside CausalVC Realtime (start conversion first):
- **Separate files**: saves raw input and converted output as two separate files.
- **Mix**: saves input + output mixed together.
- **Split L/R**: raw input on the Left channel, converted output on the Right channel.

## 4. Library, Offline File Conversion & Logs

- **Library page**: search and sort your voices, **Rename**, **Move to Trash**, **Open folder**, **Add/Replace `.index`**, or **Export** any voice as a `.cvc` file with its settings.
- **Offline whole-file conversion**: to convert full audio files from the command line without using the live window, use the `causalvc.infer` module:
  ```bash
  uv run python -m causalvc.infer --help
  ```
- **Log page**: if something goes wrong, open the **Log** page and click **Save log** to export diagnostic logs for troubleshooting.
