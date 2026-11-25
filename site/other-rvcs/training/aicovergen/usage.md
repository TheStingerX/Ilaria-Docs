# AICoverGen · Usage and troubleshooting

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Legacy software · Not recommended
**AICoverGen** is an older RVC v2 song-cover pipeline that is no longer actively maintained and relies on Python 3.9+ era dependencies. For a new setup, choose a maintained app. [Guides by app](../../app-guides.md)
!!!

## Adding RVC v2 voice models

AICoverGen only loads exported **RVC v2** inference models (`rvc_models/`):

- **Download model:** Paste a direct archive URL containing the voice model `.pth` (and optional `.index`) to fetch and extract it automatically.
- **Upload model:** Upload your local `.pth` and optional `.index` files directly from the WebUI, or place each voice folder inside `rvc_models/`.

## Generating covers in the WebUI

Open the **Generate** tab, paste a YouTube URL or upload a local audio track, pick a voice model, and adjust the main controls:

- **Pitch Change:** Shift vocal pitch to match the target voice range (for example `+1` octave / `+12` semitones from male to female, or `-1` / `-12` from female to male).
- **Pitch extraction:** Use **`rmvpe`** as the recommended default for cleaner vocal tracking, or **`mangio-crepe`** with an adjustable hop length for smoother transitions.
- **Index Rate:** Controls how strongly the `.index` feature file influences pronunciation and tone. Lower it if it introduces grain or artifacts.
- **Audio mixing & effects:** Adjust output levels for **Main Vocals**, **Backup Vocals**, and **Instrumentals**, tune built-in **Reverb** parameters (room size, wetness, dryness, damping), and pick the export format (**`mp3`** or **`wav`**).

## CLI mode (`src/main.py`)

You can run the full cover pipeline without opening the WebUI using `src/main.py`:

~~~bash
python src/main.py -i "https://www.youtube.com/watch?v=VIDEO_ID" -dir "VoiceFolderName" -p 0 -palgo rmvpe -ir 0.5 -mv 0 -bv 0 -iv 0 -rsize 0.15 -rwet 0.2 -rdry 0.8 -rdamp 0.7 -oformat mp3
~~~

Key flags:

- `-i`: Input song path or YouTube URL
- `-dir`: Voice model folder name inside `rvc_models/`
- `-p`: Pitch shift
- `-palgo`: Pitch extraction algorithm (`rmvpe` or `mangio-crepe`)
- `-ir`: Index rate (`0`–`1`)
- `-mv` / `-bv` / `-iv`: Volume adjustments for main vocals, backup vocals, and instrumentals
- `-rsize` / `-rwet` / `-rdry` / `-rdamp`: Reverb room size, wetness, dryness, and damping
- `-oformat`: Output audio format (`mp3` or `wav`)

## Troubleshooting

- **Audio/conversion errors at runtime:** Verify both `ffmpeg` and `sox` are installed and accessible on your `PATH` before launching `src/webui.py` or `src/main.py`.
- **YouTube download failures:** Older YouTube extractors often break over time. Download the audio track separately as WAV/MP3 and pass the local file path instead of a URL.
- **Model load failure:** Confirm the file is an exported RVC v2 inference `.pth` (not an RVC v1 model or a resumable G/D training checkpoint).

[Installation](installation.md)
