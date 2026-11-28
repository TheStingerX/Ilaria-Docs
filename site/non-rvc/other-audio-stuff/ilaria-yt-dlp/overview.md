# Ilaria YT-DLP · Start here

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Start here](overview.md) · [Formats and audio](formats.md) · [Playlists and troubleshooting](playlists.md)

## Install and launch on Windows

Ilaria YT-DLP is an English-language GUI for yt-dlp on **Windows 10 and 11 x64**. Use it with media you have permission to download. Its portable package contains Python, Qt, yt-dlp, FFmpeg, FFprobe and Deno.

1. Download the portable ZIP from Hugging Face.
2. Extract the entire archive to a writable folder. Keep `App` next to the launcher.
3. Open `Ilaria YT-DLP.exe`. If it does not start, try `App\Start Ilaria YT-DLP.cmd` to see console output.
4. Check the tool indicators. yt-dlp analyzes URLs. FFmpeg merges streams, extracts audio and runs post-processing. Deno is one of the JavaScript runtime choices.

For a source setup, install Python 3.10 or later and FFmpeg. Install Deno if needed. Run `App\Setup.cmd` to create `App\.venv` and build the launcher. Reopen your terminal after installing tools if they are missing from PATH.

## Download a first video

1. Paste one URL. The app queues it and attempts a quick title and thumbnail preview.
2. Wait for full analysis before selecting a stream or subtitle. A thumbnail does not indicate that stream extraction completed.
3. Open **General & Formats**, choose **Output Folder**, and start with **Video + Audio (Best)**. The initial profile targets MP4.
4. For broader playback compatibility, try **Compatible MP4 1080p**, which prefers H.264 and AAC where available.
5. Use **Simulate** to check the operation without downloading media. Turn simulation off if still enabled, then use **Start Download**.
6. After post-processing completes, open the result in **Log & History** or choose **Show in Explorer** to inspect the folder.

## Extract audio only

Choose **Audio Only** in **General & Formats**. The app removes video controls and synchronizes extraction settings with **Audio & PP**. Choose MP3 for playback or WAV/FLAC for editing without another lossy encoding step. For MP3, choose a VBR preset or explicit CBR bitrate. WAV and FLAC preserve the decoded signal, whose quality still depends on the source. Test a single file and verify metadata and artwork in your player if you enable them.

## Select streams, subtitles and chapters

Open **Formats / subs / chapters…** after the full probe. A video-only stream may have no audio. Select separate video and audio to merge or choose an available combined stream. Check resolution, FPS, codec and language. Manual subtitles and auto-captions are separate choices. Save a sidecar or embed a track if your container supports it. Use the fourth tab or the chapter picker for cuts, then listen at both boundaries. Start with SponsorBlock marking if you want to keep original timing. When removing segments, verify the resulting timing and subtitles.

## Use a queue and presets

Paste one URL per line or import a `.txt` list. Test one item before a full playlist. Use selection filters to restrict which entries are processed. Save a preset after verifying the output. When reopening a preset, check the destination, format and subtitle options. Keep credentials, private links and local paths out of shared presets or logs.

## Troubleshooting

| Symptom | First check |
| --- | --- |
| Thumbnail appears with no streams | Wait for full analysis and inspect the first error in **Log & History**. |
| Download finishes but no final file appears | Check FFmpeg merging or extraction and look for the final path in history. |
| Another player refuses the output | Inspect codec and container and try the H.264/AAC preset on one file. |
| Wrong audio or subtitle language | Reopen the picker after analysis and select the available tracks explicitly. |
| An extractor stops working | Check the detected yt-dlp version. Try **Advanced & CLI → Update yt-dlp** on stable and run the probe again. |
| An entire playlist starts by mistake | Select **Cancel**, check the queue and restrict selection before retrying. |

The command preview in **Advanced & CLI** makes it easier to compare one setting at a time while keeping the URL and preset fixed.
