---
label: "Changelog"
icon: ":memo:"
order: 93
permalink: /non-rvc/yunevoix/changelog/
description: "Complete YuneVoix release history and changelog from v0.6.0 through v0.7.1, including DirectML, AMD GPU, WavLM+, and FlowEdit 3+1 updates."
---
# YuneVoix Changelog

## v0.7.1 (2026-11-20)

*Changes since v0.7.0.*

### Fixed

- **AMD**: fixed an issue where YuneVoix closed when pressing **START** on computers whose processor also has AMD integrated graphics, and with the integrated graphics disabled it stopped with `ShapeInferenceNotRegistered`. The AMD package now uses **DirectML** on the dedicated card by default (no Windows Update download, no initial model compiling). **MIGraphX** can still be chosen in `Settings → General → "AMD graphics engine"` (experimental, applies after a restart). Licences, voices, and settings from `v0.7.0` keep working.

### New

- **AMD**: Windows 10 and Windows 11 versions before 24H2 are supported again (`24H2` is needed only for the experimental **MIGraphX** engine).
- **AMD**: the **`WavLM+`** content engine and the **`FlowEdit 3+1`** model method now work on AMD cards too (**DirectML**) - in **LIVE**, **covers**, and **karaoke**. When **AMD MIGraphX** is selected, they are not available.

---

## v0.7.0 (2026-11-19)

*Changes since v0.6.0.*

### New

- **Model method** (`Settings → Voice & Timbre`, and separately in `Settings → Song Cover` for covers and karaoke; applies at next **START**):
  - **Classic**: same as before (steps, solver, and guidance options).
  - **Learned 4 steps**: tuned to sound like 10 steps while using about **40%** of the GPU time and less VRAM - great for gaming and slower cards.
  - **FlowEdit 3+1 (NVIDIA)** *(AMD: since v0.7.1)*: starts from your own voice instead of noise and changes only the voice identity, so breaths, whispers, laughs, and articulation come through much better (about **60%** of the model's GPU time). In **LIVE**, it uses your voice sample (`Voice & Timbre → "Sample of your voice…"`; if set in an earlier version, re-select it once). In covers and karaoke, it uses the vocal itself. Works with both **Whisper** and **WavLM+**. Without a voice sample or on AMD MIGraphX, FlowEdit falls back to **Learned 4 steps** (shown in the LIVE status line).
- **Karaoke (PREMIUM)**: sing a song yourself with on-screen lyrics - YUNE converts your singing into the chosen voice and mixes it with the music. Lyrics are matched automatically (pasted text or `.lrc`; Japanese also in romaji).
  - Sing along to the backing track (separated at **PREPARE**) or to the original song (starts in seconds; separated at first render).
  - Smooth scrolling with current line centered; `Space` = pause, `Esc` = stop (ends 5 s after), `F11` = full screen, plus a microphone meter in the lyrics window.
  - `Settings → Karaoke`: headphones, microphone, original vocal and music volume, lyrics size, recording cleaning (`DF3`), content engine, octave, pull to original melody, vocal level, reverb, backing vocals, follow original vocal's level, make room for the vocal, and smooth out vocal fry.
  - **Key matching**: singing a few semitones higher or lower no longer makes the cover out of tune; **"Pull to the original melody"** corrects the notes.
  - **"Follow the original vocal's level"**: matches the original's dynamics and routes peaks through a limiter instead of lowering the whole cover.
  - **"Make room for the vocal"** (on by default): ducks music mostly in the `1–4 kHz` bands while you sing, leaving instrumental sections untouched.
  - **Karaoke octave `Auto`**: follows the original singer's register while staying within the target voice's range.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre`, and `Settings → Karaoke`): keeps very low or creaky speech/singing voiced and smooths pitch jumps without losing breathiness.
- **Monitoring in LIVE** (`Settings → General`): input and output levels in dB with a limiter lamp, **"Listen to input"** (what the engine hears after cleaning), and **"Listen to output"** (converted voice) on a separate monitor device.

### Improved

- **Games and LIVE**: while LIVE runs, YuneVoix raises its own priority (process, GPU, audio threads) and opts out of Windows background slow-down (also on Windows 10) so full-screen games interfere less with the voice.
- **Lower, steadier input delay**: the microphone is read as soon as Windows has new audio (about every **10 ms** instead of 50 ms).
- **Karaoke takes**: compensates clock drift between microphone and headphones, saves takes in the background, and warns if no voice was recorded or the mic distorted.
- Lyrics files in legacy encodings (such as Japanese **Shift-JIS**) open correctly.
- Lyrics matching runs on CPU on non-NVIDIA cards (AMD package).
- Starting to sing in Karaoke frees the LIVE engine from the GPU.
- Voice Bank **"Play sample"** now plays on the Windows default output (your headphones), not the LIVE output.
- **Microphone level** in `Settings → General` is shown in dB.
- New built-in tips (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, plus model method and vocal fry tips) and an expanded `FAQ.txt` included in the package.

### Fixed

- Unplugging or changing an audio device during LIVE or Karaoke now stops cleanly and explains why instead of staying "running" silently.
- A disconnected device at startup is no longer silently replaced by another device in your settings.
- Clear human-readable messages for common audio errors (exclusive mode, Windows mic privacy block, unsupported format, unplugged device, stopped Windows Audio service).
- Packed 24-bit microphones are read properly in LIVE.
- Safe settings saving (prevents resets on crash/power loss) with a backup copy.
- Single-instance enforcement (only one YuneVoix window at a time).
- Preserves previous log (`live-diag.prev.log`) and `crash.log` after a crash for support.
- Diagnostic recordings auto-stop after 10 minutes and default to off at every start.
- **Cancel** now terminates unresponsive jobs.
- Clear error message if the NVIDIA package is launched without an NVIDIA GPU; AMD package also runs on other DirectML-capable cards.

### Compatibility

- **PREMIUM** licences from `v0.6.0` continue working: copy `license.yvl` next to the new `YuneVoix.exe`, along with `models\yune\voices`, `yune.json`, and `settings.json`. New options start at their defaults (`Model method: Classic`).

---

## v0.6.0 (2026-11-05)

*Changes since v0.4.0 (`v0.5.0` was an internal build and was never released).*

### New

- **Two editions**: **BASIC** (live voice conversion, Voice Bank, all effects) and **PREMIUM** (everything in BASIC + Song Cover).
- **Per-PC PREMIUM licence**: `Song Cover → "Copy request code"` → `"Load license…"` (non-expiring, offline, valid if 1 of motherboard / system disk / Windows install changes).
- **Content engine `WavLM+`** (`Settings → Voice & Timbre → Content engine`; `Settings → Song Cover` for covers - **NVIDIA only**; *AMD: since v0.7.1*): clearer live speech, preserves your own laughter, whispers, and breaths, and reduces buzzing on laughter/sighs. `Whisper` remains the default for closer timbre accuracy.
- **"Silence stays silent"** toggle (`Settings → EQ & Filters → YUNE output` and `Settings → Song Cover`; on by default).
- **Ko-fi link** (`ko-fi.com/yunevoix`) and edition badge shown under the version number.

### Changed & Removed

- Shorter, more accurate descriptions and tips across all six languages, matching button names.
- `YuneVoix.exe --check` also reports the edition, PREMIUM licence state, and `WavLM+` model files.
- **Removed** `BigVGAN` vocoder option - **PC-NSF** is now the sole vocoder (previously default, better for singing and breath).
- Removed outdated references to the frame artifact filter (removed in `v0.4.0`).
