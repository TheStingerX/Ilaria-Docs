---
label: "☁️ Run Ilaria RVC on Kaggle"
order: 97
permalink: /ilaria-rvc/kaggle/
---
# Run Ilaria RVC 2.1 on Kaggle

Kaggle runs the notebook on a remote Linux machine. When you turn on its NVIDIA GPU accelerator, the remote GPU does the work. Your own computer only needs a browser and internet access. This is an alternative for people with AMD or Intel graphics, integrated graphics, or a local GPU too slow for the job.

[Open the official Kaggle notebook](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Get the notebook file from GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/Ilaria-RVC-2.1-Kaggle.ipynb)

!!!warning Keep the app link private
Step 4 creates a public Gradio URL. Anyone with that URL can use the app while it is running. The visibility of your Kaggle notebook is separate from access to that URL. Use a session without private material and keep the URL out of screenshots, public posts, and shared output.
!!!

## 1. Prepare a short test

- Sign in to Kaggle and keep the notebook editor open while you work.
- For conversion, have one compatible inference `.pth` file and, if available, its matching `.index`. The first test works without an index. Save a 10-second WAV of one clear voice without music.
- For training, keep a local copy of the source dataset. Prepare a ZIP of usable recordings you have permission to use. Keep a separate short clip outside the training dataset so you can test your model on something it has not heard.
- Start with a file test before attempting a long training run. Kaggle controls GPU availability and limits, so check the time and resources displayed in your own session.

## 2. Make an editable copy and turn on the GPU

1. Open the [published notebook](https://www.kaggle.com/code/ilarialopez/ilaria-rvc). Sign in if prompted. Use **Copy & Edit** or the equivalent copy action to open your own editable version.
2. If you are starting from GitHub instead, download the raw `Ilaria-RVC-2.1-Kaggle.ipynb` file, create a notebook in Kaggle and import the file through the notebook editor. Open the resulting notebook on Kaggle rather than running it on your own machine.
3. Open the session settings in the editor. For **Accelerator**, select an available **GPU** option. If Kaggle asks to restart the session after the change, accept before adding files or starting a run.
4. Enable **Internet** in the same session settings. The notebook needs connectivity to download the code, dependencies and weights, and then open its Gradio link.
5. If either setting is unavailable, read the explanation shown by Kaggle. Check your account eligibility and current accelerator availability. Retry when you can enable both settings.

## 3. Run the four main sections

Click **Run All** in the editor. You can also run the four code cells one at a time, from top to bottom. Wait for each cell to finish before running the next. The optional export and stop cells do nothing at their default settings.

| Notebook section | What a successful run does | What to check if it stops |
| --- | --- | --- |
| **1. Check GPU** | Shows the GPU name, memory and driver. Checks out the pinned Ilaria RVC release under `/kaggle/working/ilaria-rvc`. | If NVIDIA tooling is missing, select an available GPU and restart the session before running again. If Git cannot reach the repo, verify Internet. |
| **2. Install dependencies** | Prepares the notebook environment and checks that PyTorch sees the GPU. Look for `GPU ready:` followed by its name. | Read the first dependency or compiler error. A missing CUDA device means the app is still unable to use the GPU. |
| **3. Download model weights** | Downloads and checks the assets required by the notebook. | Let the built-in retry finish. If it keeps failing, check network access and free space. |
| **4. Open Ilaria RVC** | Starts the interface and prints **Open Ilaria RVC** in the cell output. | If the tab did not open automatically, click that button. If the notebook reports the Gradio link is unavailable, check Internet and rerun step 4 after steps 1–3 succeed. |

Open the current link from step 4 in another tab. Leave the Kaggle session running. After a session reset or launch restart, use the newly generated link.

## 4. Convert one recording

1. In the Ilaria RVC browser tab, open **Other → Import local models**. Add the inference checkpoint or a supported ZIP, and add the paired index if you have it. Wait for the import to finish.
2. Open **Inference**, refresh the voice list if needed, select the intended voice, and go to **Single Inference**.
3. Upload the short WAV. Start at **Pitch 0** and **Index Ratio 0**. Leave the optional effects off and use the embedder expected by the model.
4. Click the conversion control once and wait for the output. Play the result, then download it from the player if available. Keep your input WAV so you can compare the same phrase later.
5. If you want to test retrieval, select the matching index and try a small increase from zero. If the output fails or the voice becomes harder to understand, return to the baseline and verify the model–index pairing.

If the voice never appears, first check the import log. A training checkpoint saved as a G or D file belongs to an experiment and needs an inference export before it can be selected here.

## 5. Train a voice and save your work

1. In **Training**, choose a new **Model Name**. Import your audio or ZIP through the dataset upload controls. Wait for import completion and confirm **Path to Dataset** points to the imported recordings.
2. Run the **Dataset Checker** and listen to any suspect recordings. Confirm your RVC V2 architecture, sample rate, embedder and pitch settings match your selected G/D pretrains if you use them. Start with a batch size that fits the allocated GPU.
3. Run **Process Data**, then **Feature Extraction**. Read the status of each before continuing. If you change the dataset or encoder, prepare fresh files for that experiment before training.
4. Run **Train Pth** with a modest first target and save periodic checkpoints. Keep a short test clip out of the training data. Compare exported checkpoints on that same clip before starting a longer run.
5. Build the feature index if you need retrieval, then try the inference export at **Index Ratio 0** first. For a detailed explanation of each setting, see [Training controls and workflow](training-controls.md).
6. If you want to stop mid-run, use **Stop and save** inside Ilaria RVC and wait until the log confirms the save. Download the results while the Kaggle session is still active.

## 6. Download a backup before leaving

The notebook's optional **Export results** cell makes one archive in `/kaggle/working/Ilaria-RVC-results.zip`. A live session is temporary. Verify that you have the backup on your own computer before stopping or resetting the session.

- **For inference files only:** set `EXPORT = True` and leave `TRAINING_MODEL = ""`. The archive includes `.pth` and `.index` files in `models`, plus files written to `InferOutput`. Use the player's download button for any conversion that did not write a file there.
- **To keep a resumable training experiment:** wait for **Stop and save** or for training to finish saving. Set `EXPORT = True` and enter the exact experiment name in `TRAINING_MODEL`. Enter the name only, without a folder path. The export includes its `logs/<name>` tree alongside the regular outputs.
- Run that code cell. Open the displayed link or download **Ilaria-RVC-results.zip** through Kaggle **Output**. Open the ZIP locally and confirm it contains what you need. Keep your original dataset separately. The export cell does not package `datasets`.

To stop only the app, set `STOP = True` in **Stop or restart** and run that optional cell after saving. Run step 4 again to reopen it in the same session. Stopping or resetting the whole Kaggle session is a separate action.

## Troubleshooting

| What you see | What to do first |
| --- | --- |
| Step 1 says to enable a GPU | Select a GPU under **Accelerator**, restart if prompted, then rerun from step 1. |
| The notebook reports a different checkout or commit | Start in a clean session with the official notebook. Back up any existing results before changing or resetting the session. |
| The Gradio tab is blank or expired | Confirm the session is still running. Use the latest link from step 4. If the link cannot be created, verify Internet and read the cell output. |
| Conversion or training runs out of memory | Close competing jobs in the session and try a short clip. For training, reduce batch size and turn off optional GPU dataset caching if available. Save before interrupting a run. |
| Export says there are no results | Convert or export a voice first. Check the output directory and confirm the archive's optional experiment name matches **Model Name** exactly. |
| Some files disappear after a reset | Start the setup again and reimport your local backups. The working folder belongs to the active session. |

If a problem repeats, note the failing section, the GPU name from step 1, and the first error from the cell output. The notebook also writes the app startup log under `/kaggle/working/.ilaria-notebook/startup.log`. Remove the Gradio URL from any log you share. See [Troubleshooting RVC](../reference/troubleshooting.md) for model and audio diagnostics.
