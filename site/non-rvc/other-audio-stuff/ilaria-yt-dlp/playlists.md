# Ilaria YT-DLP · Playlists and troubleshooting

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Start here](overview.md) · [Formats and audio](formats.md) · [Playlists and troubleshooting](playlists.md)

## Understand Smart Auto in V2

Smart Auto treats a video link with a playlist or Mix parameter as one video. A dedicated playlist, album, set or channel link can still enqueue its collection. For deliberate batch work, check item ranges and consider a download archive. Run a small test before starting the whole list.

## Find where a job failed

Use **Simulate** to review selection, then look in **Log & History** for the first error. If a thumbnail appears but no streams are listed, wait for the full probe or check yt-dlp and its JavaScript runtime. If the download completes but output is missing, check FFmpeg, free space and the destination folder. Update yt-dlp from **Advanced & CLI** when an extractor stops working.
