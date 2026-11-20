# Model library and merging

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

[Other panels](other-buttons.md)

## Import and inspect

Open **Other** and import a supported local model or use the download control. Keep a checkpoint and its own index together. Refresh the inference list and confirm the intended voice before testing. Use **Model information** to inspect the sample rate, architecture and precision stored in the file.

## Merge compatible voices

Choose two inference checkpoints and run the compatibility check first. Use the blending ratio to set how much weight each contributes. Save under a fresh name and test the result with retrieval disabled. An existing index belongs to the model and features it was built for.
