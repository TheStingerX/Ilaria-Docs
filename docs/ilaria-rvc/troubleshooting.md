---
label: "🛠️ Logs and recovery"
order: 92
permalink: /ilaria-rvc/troubleshooting/
---
# Logs and recovery

## Find the first failing stage

For startup issues, use `ILARIA_RVC_LOGS.bat` and note the first error. For an inference failure, test a short local WAV with retrieval off and confirm the model and embedder. For training failures, identify whether preprocessing, feature extraction or the training stage failed before retrying.

## Handle memory pressure

Close competing GPU tasks, unload the inference voice and retry with a smaller training batch or dataset caching disabled if applicable. Save before restarting. Record the app version, GPU, exact failing action and first error before requesting help.
