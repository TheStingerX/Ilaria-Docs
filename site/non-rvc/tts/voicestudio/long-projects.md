# VoiceStudio · Narration and long projects

[VoiceStudio v0.5.8 · Narration and long projects](https://github.com/debpalash/VoiceStudio/blob/v0.5.8/docs/electron-batch.md)

## Plan scripts and segments

Divide the script into chapters and then paragraphs or scenes. Test a passage with the chosen voice and note difficult pronunciations. Generate in groups and listen in order. Use names that preserve the sequence, such as `01-03` for the third clip of the first chapter.

## Batch and quality checks

For multiple videos, use batch dubbing where available in your build. Start with two inputs and verify language, settings and destination. Check the first files open and are complete before running a long queue. Retain the script and intermediate outputs so you can rerender individual segments.

## Prepare a pilot

1. Select a paragraph with dialog, a pause and a difficult name.
2. Fix the voice, engine and language. Record pronunciation changes separately from the original book text.
3. Generate two neighboring segments and listen to their transition. Check volume and pause length.
4. Once the pilot works, repeat per chapter and track only the sections that need regeneration.

## Organize and check delivery files

Keep the script, drafts and final files separate. Name outputs so chapters and scenes sort correctly. Compare the expected number of sections with the rendered files. Listen to each chapter’s beginning and end and every regenerated boundary. A completed batch confirms processing finished, so check the content too.

[First synthesis](first-run.md) · [Troubleshooting](troubleshooting.md)
