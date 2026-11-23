# File inference

[Windows x64 ZIP](https://huggingface.co/lyery/redpanda-vc/resolve/main/Redpanda-VC-Windows-x64.zip?download=true) · [GitHub](https://github.com/redpanda343/Redpanda-vc)

Use Inference to convert a recording or an entire folder. An RVC voice uses a compact .pth model; a Causal Voice Changer voice uses .cvc.

## Convert one recording

Open **Inference**. Under **Voice model**, browse to an RVC inference `.pth` or a `.cvc` voice. For RVC, add the matching `.index` if available. Keep **Index rate** at zero for the first test without retrieval. A training checkpoint such as `G_*.pth` or `D_*.pth` belongs in Training.

## Test and convert a folder

Start with a short clean WAV, zero semitones and WAV export. Use **Save as** to choose a separate output, then listen before changing pitch or model settings. After a clean test, enable **Folder mode**, select a small input folder and a separate output destination, and check two or three conversions before processing the full collection.

[Set up Redpanda VC](first-run.md) · [Realtime voice conversion](live-audio.md) · [Causal Voice Changer training](causal-training.md) · [RVC Training](training.md)

## Source and release

[Inference UI](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/desktop/ui/index.html) · [Conversion](https://github.com/redpanda343/Redpanda-vc/blob/bb83e60a7/shared/desktop/convert.py)
