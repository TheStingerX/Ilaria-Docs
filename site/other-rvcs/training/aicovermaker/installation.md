# AICoverMaker · Installation

AICoverMaker is Eddycrack864’s Applio fork for producing voice-converted covers. This guide follows the v1.0.5 release. Start with a recording and a voice model you have permission to use.

## Choose an installation

1. Open the release's Assets section. On Windows, use its precompiled package if listed. GitHub's **Source code (zip)** is the source checkout and needs the launcher to set up its dependencies.
2. Extract the whole package to a writable folder. Keep the archive’s internal directories together. For the source release, use the folder name `rvc-ai-cover-maker-ui` if the version-suffixed name causes dependency errors.
3. On Windows, launch `run.bat`. On Linux, use the source route and run `bash run.sh` from the project directory. Let the first setup complete before opening another instance.
4. Open the local address printed in the console. Keep the console running while you work, and stop the app when finished.

## Verify the first launch

Wait for the interface to finish loading before importing a large file. If it never opens, read the first console error. Check that the package was fully extracted, the directory is writable and downloads can complete. If the browser cannot connect, check the address and port printed by the current launch. A browser tab alone cannot start a stopped backend.

## Prepare a small test

Choose a short WAV clip, an inference-ready RVC checkpoint, and its matching index if you have one. Avoid changing the model, source file and settings simultaneously until you have a known-good baseline.

[Official release](https://github.com/Eddycrack864/RVC-AI-Cover-Maker-UI/releases/tag/v1.0.5) · [Make your first cover](usage.md)
