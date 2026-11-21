# Voice Blender (Merge Models)

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

In **Ilaria RVC**, the Voice Blender feature is located in the **Other** tab under **Merge models**. It lets you combine the weights of two compatible `.pth` voice models into a brand-new hybrid voice without having to train a new model from scratch.

## Before you blend: Compatibility rules

Two voices sounding similar does **not** guarantee they can be merged. Both source models must match technically:

- **Inference `.pth` files only:** Use exported inference models from `weights/`. Never use raw training checkpoints (`G_*.pth` / `D_*.pth`) or `.onnx` files.
- **Same RVC version:** Both models must share the same architecture (`v1` 256-d vs `v2` 768-d).
- **Same sample rate:** Both models must be trained at the same sample rate (for example both `40k` or both `48k`).
- **Same embedder / hidden dimensions:** Both must use compatible tensor shapes.

!!!tip
Always click **Check model compatibility** in Ilaria RVC before merging. If the check fails, the two `.pth` files cannot be blended together.
!!!

## How to blend two voices in Ilaria RVC

1. Open the **Other** tab and scroll to **Merge models**.
2. Select **Model A** and **Model B** from your model dropdowns (click **Refresh** first if you recently added a `.pth` file).
3. Click **Check model compatibility** and confirm the log says the two models are compatible.
4. Set **Model A contribution (%)**:
   - `50` gives an equal **50% / 50%** blend of Model A and Model B.
   - `70` gives **70% Model A** and **30% Model B**.
   - `100` outputs purely Model A; `0` outputs purely Model B.
5. Choose **Sample rate** (`Auto` if available, or match the exact sample rate of both models).
6. Choose **Output precision**:
   - `fp16` creates a smaller file and runs faster on modern NVIDIA CUDA GPUs.
   - `fp32` is larger but works on all setups, including older GPUs, DirectML, and CPU.
7. Enter a descriptive **Output model name** (for example `Alice70_Bob30`) and optional notes.
8. Click **Merge and save model** and check **Merge Log** to confirm the `.pth` was saved.

## Testing, tuning, and `.index` behavior

- **No `.index` file is created:** Merging combines the `.pth` weights only and does **not** generate a new `.index` file.
- **Test with Index disabled first:** Switch to **Inference**, click **Refresh**, select your new merged `.pth`, and test it on a clean 10-20 second `.wav` clip with **Index Rate = 0**.
- **Compare side by side:** Listen to the same test clip through Model A, Model B, and the merged model at equal volume. Adjust **Model A contribution (%)** in small steps (for example `40%`, `50%`, `60%`) until you find the balance you want.
- **Optional index testing:** Once the `.pth` blend sounds good, you can test pairing Model A's or Model B's `.index` at a low **Index Rate** (`0.2` to `0.4`) to see if it improves clarity without pulling the voice too far back toward one source.
- **Keep your original models:** A merged `.pth` is strictly for **inference** (converting audio). It does not contain training state and cannot be used to resume training.
