---
label: "Video dubbing"
icon: ":movie_camera:"
order: 95
permalink: /non-rvc/tts/voicestudio/dubbing/
---

# VoiceStudio · Video dubbing

[VoiceStudio v0.5.8 · Video dubbing](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/dubbing/multi-speaker-guide.md)

## Prepare an excerpt

1. Import a short video and prepare the source.
2. Choose languages. Correct the transcript, then the translation, before generating the dub.
3. For a multi-speaker video, check segment assignments and assign each speaker a voice.
4. Generate a few lines and audition them on the timeline before processing the whole video.

## Check timing and export

If a line runs long, shorten the translation while preserving meaning and regenerate the segment. Check overlapping speakers and subtitles. Importing an `.srt` after source preparation replaces the current text and timings. Check background volume, voices and subtitle options before export. Open the exported file in a separate player.

## From source to segments

1. Use an excerpt with two lines and keep a copy of the original video.
2. Set the spoken and target languages. Fix transcript errors before translating.
3. Reassign lines attributed to the wrong speaker. Check the speaker voice and any per-line overrides.
4. Render a short part. On the timeline, check silent gaps and whether voices cover important audio.

## Verify the export step by step

1. If a line exceeds its slot, try a more concise translation. Regenerate and listen with adjacent lines.
2. Set background volume so speech remains intelligible. Replay overlapping speakers.
3. Choose subtitles where needed. Burned-in captions become part of the picture, so review before export.
4. Open the rendered file separately. Check the beginning, end and a speaker change in the middle.

[First synthesis](first-run.md) · [Troubleshooting](troubleshooting.md)
