# Single and batch inference

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

[Inference controls](inference-buttons.md)

## Establish a reference

Open **Single Inference**, choose a voice and load a short, dry clip. Set **Pitch** and **Index Ratio** to zero. Use the embedder expected by the model, start with RMVPE, and leave optional effects off. Save a WAV and compare it with your input at matching loudness.

## Tune in separate passes

If a matching index is available, raise retrieval in small increments. Listen for clearer voice character and possible muffling. Lower **Protect** to give consonants and breaths more protection in pitch-guided conversion. The effect depends on retrieval, which contributes only above zero. Compare pitch settings separately.

## Process multiple files

In **Batch Inference**, group recordings by model and pitch setting. Use a separate destination folder. Run one representative clip first, then check the batch log and listen to a result from each group.
