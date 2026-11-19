---
label: "📖 Glossary"
order: 94
permalink: /glossary/
---
# Glossary

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

| Term | Meaning |
| --- | --- |
| Inference | Using a trained model to convert a recording. |
| Checkpoint | File containing learned model weights. Resume checkpoints and inference exports have different roles. |
| Embedder | Component that extracts a representation of the source audio for the conversion engine. |
| Index | Optional collection of learned feature vectors used during retrieval. |
| Index ratio | How strongly an implementation uses retrieved features during conversion. |
| F0 | Fundamental frequency, used to represent pitch over time. |
| Pitch extractor | Algorithm that estimates F0 from a recording. |
| Semitone | One twelfth of an octave. A change of 12 semitones is one octave. |
| Vocoder | The part of the pipeline that generates the waveform from its conditioning inputs. |
| Sample rate | The number of audio samples per second. It is distinct from model version and pitch transposition. |
| Pretrain | Starting weights used when training a new model. |
| Epoch | One pass through the training dataset in the usual training setup. |
| Step | A training update. Batch size and dataset size affect the relationship between steps and epochs. |
| Stem | One isolated part of a mix, typically a vocal or instrumental. |
| Latency | The time between an input event and its audible output. |

See [RVC fundamentals](../start/rvc-fundamentals.md), [Models and files](../start/models.md) and [Training](../model-training/training.md) for these terms in context.

## Ilaria RVC controls

These entries are adapted from the glossary built into Ilaria RVC. Available controls can vary by release.

| Control | Meaning |
| --- | --- |
| Voice Model | Selects an inference checkpoint and looks for its matching index. |
| Refresh | Rescans the model library. Check your selection again afterward. |
| Unload Voice from VRAM | Releases inference resources to free GPU memory for other tasks. |
| Speaker ID | Selects a voice slot within the loaded model. Use 0 for a typical single-speaker model. |
| RMVPE and FCPE | Pitch extractors that estimate F0 over time. |
| ContentVec / HuBERT | ContentVec is a HuBERT-style content encoder used in standard RVC workflows. Match the encoder used in training. |
| Volume envelope mix | Sets how closely output dynamics follow the source. |
| Protect | Reduces retrieval's influence on unvoiced consonants and breaths. A lower value gives stronger protection. A value of 0.5 disables it. |
| Resampling | Adjusts the output rate. A value of 0 keeps the model's output rate. |
| Process Data | Prepares, resamples and slices recordings. Ilaria RVC adjusts the level of each slice during this stage. |
| Feature Extraction | Computes content features and pitch information for pitch-guided models. |
| Dataset Checker | Flags possible clipping, long pauses, unreadable files and level differences without editing the source. |
| Training previews | Convert the same short reference recording across several epochs for comparison by ear. |
| Generator and discriminator | The generator learns to synthesize audio and the discriminator provides feedback. Their G/D checkpoint pair is used to resume training. |
| Stop and save | Requests a resumable checkpoint. Wait for confirmation before closing. |
| Total Epochs | Final epoch target, including epochs completed before resuming. |
| Model information | Displays stored checkpoint properties such as rate, pitch guidance and precision where available. |
| Merge models | Blends compatible inference weights. Begin testing the merged voice with retrieval disabled. |
| FP16 and FP32 | Numeric precision formats. Weight precision in an export describes the stored file. |

> Generic HuBERT checkpoints are not recommended as the default encoder for voice conversion. Their speech prediction training does not explicitly remove speaker identity, so the features can carry source timbre into the output. For RVC, use the encoder expected by the model, such as ContentVec when the voice was trained with it.

See [Voice conversion](../conversion/voice-conversion.md) and [Training](../model-training/training.md) for workflows using these controls.
