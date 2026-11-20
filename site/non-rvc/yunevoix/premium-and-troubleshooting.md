# Premium, Licensing, and Troubleshooting

## YuneVoix PREMIUM: Song Cover & Karaoke

Supporters on [Ko-fi](https://ko-fi.com/yunevoix) gain access to **YuneVoix PREMIUM**, which unlocks offline music features on top of everything in BASIC:

- **Song Cover**: pick any song and target voice. YuneVoix separates the vocals from the instrumental, converts the lead (and optionally backing vocals), and mixes everything back together.
  - **Supported formats**: WAV, MP3, FLAC, M4A, AAC, OGG, WMA, AIFF (up to **15 minutes**).
  - **Processing time**: roughly **1.3×** the song length (a 5-minute song takes about 6–7 minutes).
  - **Output formats**: **WAV 24-bit** or **MP3 320 kbps**.
- **Karaoke**: sing along with on-screen lyrics; your take is converted into the chosen voice and mixed with the music, matched to the key and level of the original.

### Song Cover tips

- **Wrong pitch**: set **Settings → Song Cover → Octave** manually to **`−12`**, **`0`**, or **`+12`** instead of `Auto`.
- **Duets & backing vocals**: **"Lead vocal only"** gives the cleanest result. If a song has two lead singers, both are converted to the chosen voice (a single singer cannot be isolated).
- **Copyright**: the song still belongs to its authors - check copyright and platform rules before publishing covers.

## PREMIUM Licence & Activation

1. Open the **Song Cover** tab and click **"Copy request code"**.
2. Send the request code along with your Ko-fi purchase.
3. You will receive a `license.yvl` file. Click **"Load license…"** and select it.

### How the licence works

- **Never expires** and works **100% offline**.
- **Updates**: copy `license.yvl` next to the new `YuneVoix.exe` (or load it again).
- **One PC per licence**: a copied PREMIUM folder or licence will not unlock Song Cover on another computer.
- **Hardware changes**: the licence is tied to your **motherboard**, **system disk**, and **Windows installation**.
  - Changing **one** of them is fine (and upgrading your GPU, RAM, or monitor does not count at all).
  - Changing **two at once** (e.g., a new system disk with a fresh Windows install) requires a new licence - copy the new request code and contact support with your order.

## Troubleshooting

| Symptom | What to try first |
| --- | --- |
| **Robotic, quiet, or "underwater" voice** | Raise your mic gain in Windows so loud speech peaks near **−6 dBFS** (`Settings → General → Microphone level`) and keep Input cleaning on **`DF3`**. |
| **Wrong octave / sounds like a chipmunk** | In `Settings → Pitch & Autotune`, set **Pitch shift** (`+12` male→female, `0` same range, `−12` female→male) or enable automatic pitch. |
| **Laughs, breaths, or whispers get lost** | Disable **Speech gate**, switch Input cleaning to **`Gentle`** (in a quiet room), and try the **WavLM+** content engine (supported on NVIDIA and AMD DirectML). |
| **AMD: closes on START / WavLM+ or FlowEdit unavailable** | Update to **v0.7.1** (fixes crashes on CPUs with integrated AMD graphics by defaulting to DirectML on the dedicated GPU). If you enabled experimental MIGraphX in `Settings → General → "AMD graphics engine"`, switch back to **DirectML** and restart so `WavLM+` and `FlowEdit 3+1` work. |
| **Crackles or short dropouts** | Raise **Output buffer** (`Settings → General`), close other GPU-heavy apps, reduce **Model steps** or prompt length, and turn off **Harmony**. |
| **Stuttering while gaming** | Lower the game's graphics or FPS cap, or lower **Model steps** and prompt length in `Settings → Voice & Timbre`. |
| **Windows Explorer says ZIP is invalid** | Use **7-Zip** or **WinRAR** (the archive uses AES-256 encryption) with password `yunevoix`. |

## Diagnostics & Support

If something still does not work:

1. Open Command Prompt in the YuneVoix folder (type `cmd` in Windows Explorer's address bar and press Enter).
2. Run:
   ```bat
   YuneVoix.exe --check
   ```
3. Send the generated **`check.txt`** together with **`live-diag.log`** when asking for help in **`yune-support`**, via DM to **Kuroyuki** (`sxxyneko` on Discord), or on [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix).
