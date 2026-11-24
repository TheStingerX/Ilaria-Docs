---
label: "Usage and troubleshooting"
icon: ":microphone:"
order: 98
permalink: /ilaria-rvc/mangio/usage/
---

# Mangio RVC Fork · Usage and troubleshooting

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Reviewed version](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Legacy software · Not recommended
The main branch of **Mangio RVC Fork** has been inactive for years. This outdated app is not recommended for new installations. [Guides by app](../app-guides.md)
!!!

## First conversion

Put the exported inference checkpoint in the `weights` folder, then refresh the model list in the WebUI. Select it in Model Inference and enter the path of a short voice-only recording. Start at a transpose of 0. If you have a matching index, compare it at a low retrieval rate after establishing a baseline with the rate at 0. Keep the input and checkpoint identical while comparing output.

## Pitch extraction and hybrid mode

Start with RMVPE when it is available. Compare `mangio-crepe` and `mangio-crepe-tiny` on the same clip. The hop-length control applies to those Mangio CREPE inference variants. Smaller hops increase analysis frequency and can increase processing time. In the tagged CLI pipeline, hybrid syntax uses a plus sign, for example `hybrid[pm+crepe]`. It combines pitch estimates using a median. Compare it against an individual extractor before adopting it. The tagged documentation marks CREPE or hybrid training features as experimental.

[Installation](installation.md)
