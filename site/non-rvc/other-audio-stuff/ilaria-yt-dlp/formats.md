# Ilaria YT-DLP · Formats and audio

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Start here](overview.md) · [Formats and audio](formats.md) · [Playlists and troubleshooting](playlists.md)

## Read the stream details

Wait for the full probe. The V2 `Max:` badge reports the highest original video resolution found. The chosen stream can be smaller because of format, resolution or codec preferences. Open **Formats / subs / chapters…** and check resolution, FPS, codec and language. Pick a combined stream or a video stream plus a separate audio stream for FFmpeg to merge.

## Choose containers and audio quality

Use **Compatible MP4 1080p** as a starting point for H.264/AAC playback. Remuxing changes the container while keeping the streams. Re-encoding changes the codec and takes longer. In **Audio Only**, VBR lets the bitrate vary with the content and CBR selects a fixed target. Try a single file and check what plays on your target device.
