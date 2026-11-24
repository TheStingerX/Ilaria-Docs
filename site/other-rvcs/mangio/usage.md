# Mangio RVC Fork · Usage and troubleshooting

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Reviewed version](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Legacy software · Not recommended
These projects are outdated and show no active maintenance. rvc-cli is archived, and the main branches of RVC Studio and Mangio RVC Fork have been inactive for years. The guides are kept for existing projects. For a new setup, choose a maintained app. [Guides by app](../app-guides.md)
!!!

## First conversion

Put the exported inference checkpoint in the `weights` folder, then refresh the model list in the WebUI. Select it in Model Inference and enter the path of a short voice-only recording. Start at a transpose of 0. If you have a matching index, compare it at a low retrieval rate after establishing a baseline with the rate at 0. Keep the input and checkpoint identical while comparing output.

## Pitch extraction and hybrid mode

Start with RMVPE when it is available. Compare `mangio-crepe` and `mangio-crepe-tiny` on the same clip. The hop-length control applies to those Mangio CREPE inference variants. Smaller hops increase analysis frequency and can increase processing time. In the tagged CLI pipeline, hybrid syntax uses a plus sign, for example `hybrid[pm+crepe]`. It combines pitch estimates using a median. Compare it against an individual extractor before adopting it. The tagged documentation marks CREPE or hybrid training features as experimental.

[Installation](installation.md)
