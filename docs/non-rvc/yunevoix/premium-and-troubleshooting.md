---
label: "Premium, Licensing & Help"
icon: ":wrench:"
order: 94
permalink: /non-rvc/yunevoix/premium-and-troubleshooting/
description: "YuneVoix PREMIUM licensing (Song Cover & Karaoke), offline activation, hardware rules, expanded NVIDIA & AMD troubleshooting, and diagnostics."
---
# Premium, Licensing, and Troubleshooting

## YuneVoix PREMIUM: Song Cover & Karaoke

Supporters on [Ko-fi](https://ko-fi.com/yunevoix) gain access to **YuneVoix PREMIUM**, which unlocks offline music features on top of everything in BASIC:

- **Song Cover:** Pick any song and target voice. YuneVoix separates vocals from the instrumental, converts the lead (and optionally backing vocals), and mixes everything back together.
- **Karaoke:** Sing along with on-screen lyrics; your take is converted into the chosen voice and mixed with the music, matched to the key and level of the original.

For complete step-by-step tutorials and every Song Cover / Karaoke setting, see **[Song Cover & Karaoke - Complete Beginner Guide](song-cover-karaoke.md)**.

---

## PREMIUM Licence & Activation

1. Open the **Song Cover** tab and click **"Copy request code"**.
2. Send the request code along with your Ko-fi purchase.
3. You will receive a `license.yvl` file. Click **"Load license…"** and select it (it is copied next to `YuneVoix.exe`).

### How the licence works

- **Never expires** and works **100% offline**.
- **Updates:** Copy `license.yvl` next to the new `YuneVoix.exe` (or load it again).
- **One PC per licence:** A copied PREMIUM folder or licence will not unlock Song Cover on another computer.
- **Hardware changes:** The licence is tied to your **motherboard**, **system disk**, and **Windows installation**.
  - Changing **one** of them is fine (and upgrading your GPU, RAM, or monitor does not count at all).
  - Changing **two at once** (e.g., a new system disk with a fresh Windows install) requires a new licence - copy the new request code and contact support with your order.

---

## Troubleshooting

| Symptom | What to try first |
| --- | --- |
| **Robotic, quiet, or "underwater" voice** | Raise your mic gain in Windows so loud speech peaks near **−6 dBFS** (`Settings → General → Microphone level`) and keep Input cleaning on **`DF3`**. |
| **Typing or clicks turn into tones** | Set Input cleaning (`Settings → General`) to **`DF3`**. |
| **Hiss or "grain" on top** | Keep **Smooth top** at `100%` and **Brightness** at `0 dB` (`Settings → EQ & Filters`). |
| **Wrong octave / sounds like a chipmunk** | In `Settings → Pitch & Autotune`, adjust **Pitch shift** or test **Automatic pitch** (`Octave from the target voice` for singing; `Match the target voice's pitch` for talking). |
| **Laughs, breaths, or whispers get lost** | Disable **Speech gate**, switch Input cleaning to **`Gentle`** (in a quiet room), try **WavLM+** (NVIDIA and AMD DirectML), or set **Model method** to **`FlowEdit 3+1`** (needs a 5–20 s sample of your own voice). |
| **FlowEdit keeps background noise or room echo** | Enable **`DF3`** input cleaning, record in a quieter room, or switch **Model method** to **`Classic`**. |
| **Crackles or short dropouts** | Set **Model method** to **`Learned 4 steps`**, shorten **Prompt length**, raise **Output buffer** (`Settings → General`), and close other GPU-heavy apps. |
| **Stuttering while gaming** | Cap the game's **FPS** and lower game graphics, set **Model method** to **`Learned 4 steps`**, shorten **Prompt length**, and turn off **Harmony**. |
| **LIVE stopped: "the audio device stopped working"** | Your mic or output was unplugged or changed. Reconnect it, click **Refresh devices**, and press **START**. |
| **AMD: closes on START / `ShapeInferenceNotRegistered`** | Update to **v0.7.1** (uses **DirectML** on the dedicated GPU by default, fixing both crashes when integrated AMD graphics are present and `ShapeInferenceNotRegistered` when integrated graphics are disabled). Check `check.txt` for active card/engine and keep Adrenalin drivers current. |
| **AMD: FlowEdit falls back or WavLM+ unavailable** | Check `Settings → General → "AMD graphics engine"`. If you enabled experimental **MIGraphX**, switch back to **DirectML** and restart (`WavLM+` and `FlowEdit 3+1` are not available under MIGraphX). Also ensure `Sample of your voice…` is set for LIVE FlowEdit. |
| **Windows Explorer says ZIP is invalid** | Use **7-Zip** or **WinRAR** (AES-256 encrypted ZIP) with password `yunevoix`. |

---

## Diagnostics & Support

If something still does not work:

1. Open Command Prompt in the YuneVoix folder (type `cmd` in Windows Explorer's address bar and press Enter).
2. Run:
   ```bat
   YuneVoix.exe --check
   ```
3. **Files created next to `YuneVoix.exe`:**
   - **`check.txt`**: hardware, edition, licence, GPU/engine detection report.
   - **`live-diag.log`**: current session diagnostic log.
   - **`live-diag.prev.log`** and **`crash.log`**: preserved previous log and crash details after a crash.
4. Send **`check.txt`** and **`live-diag.log`**; after a crash also send **`live-diag.prev.log`** and **`crash.log`** (all are kept next to `YuneVoix.exe`).
5. **AMD speed test (optional):** You can run `YuneVoix.exe --bench` to generate `bench.txt`, `bench_ort.log`, and `bench_output.wav` showing diagnostic speed on your specific AMD card (results vary by card and system).
6. *(Privacy reminder)* Before sharing logs or optional **Save diagnostic recordings** WAV files in **`yune-support`**, via DM to **Kuroyuki** (`sxxyneko` on Discord), or on [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix), check them for personal usernames, file paths, or private speech.
