---
label: "Kaggle"
icon: ":notebook:"
order: 98
permalink: /ilaria-rvc/kaggle/
---
# Kaggle

[Open the official Kaggle notebook](https://www.kaggle.com/code/ilarialopez/ilaria-rvc) · [Get the notebook file from GitHub](https://github.com/TheStingerX/Ilaria-RVC/blob/main/notebooks/Ilaria-RVC-Kaggle.ipynb)

[Ilaria RVC in the cloud](cloud.md)

## 1. Prepare a short test

- Sign in to Kaggle and keep the notebook editor open while you work.
- For conversion, use a compatible inference model (`.pth`). The matching `.index` is optional. You can convert audio without it. Save a 10-second WAV of a clear voice without music.
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
| **1. Check GPU** | Shows GPU information, fetches the current code from `main` → `/kaggle/working/ilaria-rvc`. | If NVIDIA tooling is missing, select an available GPU and restart the session before running again. If Git cannot reach the repo, verify Internet. |
| **2. Install dependencies** | Prepares the notebook environment and checks that PyTorch sees the GPU. Look for `GPU ready:` followed by its name. | Read the first dependency or compiler error. A missing CUDA device means the app is still unable to use the GPU. |
| **3. Download model weights** | Downloads and checks the assets required by the notebook. | Let the built-in retry finish. If it keeps failing, check network access and free space. |
| **4. Open Ilaria RVC** | Starts the interface and prints **Open Ilaria RVC** in the cell output. | If the tab did not open automatically, click that button. If the notebook reports the Gradio link is unavailable, check Internet and rerun step 4 after steps 1–3 succeed. |

Open the current link from step 4 in another tab. Leave the Kaggle session running. After a session reset or launch restart, use the newly generated link.

> To update an open session, save your work, run the optional stop cell with `STOP = True`, then run steps 1–4. Read the version printed in step 1.

## Start here with the updated notebook

### Before running anything

1. Open your editable copy on Kaggle and keep it **private**. The launch cell prints passwords. Keep its output out of screenshots, shared logs and published versions.
2. Open **Settings**. The notebook requests **GPU T4 x2** and **Internet**. If Kaggle did not apply them on import, select them yourself. If T4 x2 is unavailable, check the GPU offered to your account and read the GPU list printed after startup.
3. Click **Run All**, or run the four numbered sections in order. Sections 1–3 prepare the app. Section 4 opens it. The export and stop cells are optional and default to off.
4. In the output of section 1, check the GPU names and the **Ilaria RVC** version. Section 2 checks that PyTorch sees the available GPUs. Section 3 checks the downloaded weights. Continue after each finishes successfully.

### Open the app and the file manager

The **Start → Access Setup** section has two options. Leave **Gradio + Cloudflare** selected for a first test. Gradio opens Ilaria RVC, and Cloudflare opens FileBrowser. If you choose **Horizon**, enter the Horizon ID from your Horizon dashboard and approve the CLI token request when prompted. Horizon produces separate links for the same two services.

1. Wait for **Open Ilaria RVC** in the output and click it if the new tab did not open automatically.
2. Sign in with username `ilaria` and the value next to **WebUI password** in the current launch output.
3. For exported files, click **Open FileBrowser**. Use the **FileBrowser username** and **FileBrowser password** shown in the same output. These credentials are separate from the WebUI login. FileBrowser shows the dedicated export folder only.
4. Keep Kaggle running while you use either tab. After restarting the app, use the links and credentials from the new output. If one page rejects the password, check that you used the correct credential pair for that page.

### Select only the weights you need

Section 3 defaults to `TRAINING_SAMPLE_RATES = ["32k"]`. Leave it unchanged for a first 32 kHz training test. If your planned experiment needs the bundled pretrains at another supported rate, include `"40k"` or `"48k"` in that list before running the cell. Use an empty list for inference only. This list controls pretrain downloads. Your experiment's sample rate still needs to match the architecture and selected weights in the WebUI.

The same cell has `DOWNLOAD_FCPE`. Leave defaults if you are unsure. If FCPE is unavailable, the notebook reports it and you can select RMVPE.

### Tune training only after a short test

| Setting | What to do for the first run |
| --- | --- |
| Training Precision | The notebook starts with FP16 when all visible GPUs are T4. Try FP32 for a comparison if needed. When resuming, match the existing checkpoint's configuration. |
| Batch Size | The UI value is per GPU for a fresh run with this notebook. One T4 at batch 8 and two T4s at batch 4 both give a global batch of 8 when those are the devices used by the run. Check the effective values in **Training Log**. Start smaller if memory is tight. |
| Workers and prefetch | Leave them at 2 each for the first run. The notebook suggests 4 workers and prefetch 8 when comparing with the older loader configuration. Change one factor at a time and compare the timing in `train.log`. |
| Fused AdamW | Leave it off at first. Test it in a new run if you want to compare performance. Keep the original batch configuration when resuming. |

Two GPUs do not pool their VRAM into a single larger device. If a run runs out of memory, reduce the per-GPU batch and verify the effective settings in the log before retrying.

### Export, download and stop

After conversion or after **Stop and save** confirms the checkpoint, set `EXPORT = True` and run **Export results**. Leave `TRAINING_MODEL` blank for regular model and audio exports, or enter the exact model name to include its resumable experiment files. Open **FileBrowser** or use the link displayed by the export cell and download **Ilaria-RVC-results.zip**. The archive is written in `/kaggle/working/ilaria-shared`. Confirm you can open it locally before closing the session.

When finished, set `STOP = True` and run **Stop or restart**. This shuts down the WebUI, FileBrowser and their tunnels. To reopen them in the same session, rerun section 4. To refresh the app code, save your work, stop the services, and rerun steps 1–4.

///region cloud-inference-dataset
## 4. Convert one recording

1. In the Ilaria RVC browser tab, open **Other → Import local models**. Upload the inference model file (`.pth`) and, optionally, its matching index file (`.index`). You can also upload a supported ZIP containing those files. Wait for the import to finish. Or open **Other → Download models from Hugging Face, Google Drive or MEGA**, paste a publicly downloadable link to a supported ZIP, `.pth`, or `.index`, and click **Download and install model**. If the model and its optional index are hosted separately, download them one at a time using the same panel.
2. Open **Inference**, refresh the voice list if needed, select the intended voice, and go to **Single Inference**.
3. Upload the short WAV. Start at **Pitch 0** and **Index Ratio 0**. Leave the optional effects off and use the embedder expected by the model.
4. Click the conversion control once and wait for the output. Play the result, then download it from the player if available. Keep your input WAV so you can compare the same phrase later.
5. If you want to test retrieval, select the matching index and try a small increase from zero. If the output fails or the voice becomes harder to understand, return to the baseline and verify the model–index pairing.

If the voice never appears, first check the import log. A training checkpoint saved as a G or D file belongs to an experiment and needs an inference export before it can be selected here.

## Prepare your dataset and plan a training run

### Clean the audio with MVSEP only where needed

Keep an untouched copy of your recordings. If they already contain a single clean, dry voice, skip separation. Use material you have permission to upload to [MVSEP](https://mvsep.com/en/home) and to train on. For confidential recordings, clean them locally.

1. **Isolate the voice.** Upload a short example and choose a vocal separation option. Download the vocal stem in WAV when available. Replay it against the original and listen through headphones for music, other voices, clipped syllables, and watery or metallic artifacts.
2. **Remove backing vocals only if present.** For songs with harmonies or a chorus underneath the target, use a lead-versus-backing separation option on the vocal stem. Keep the lead output. If the singers still overlap or the lead has holes, use a clean section or a different take.
3. **Reduce reverb only where audible.** If the voice has a wide stereo reverb tail, first test a stereo de-reverb option on a copy. For remaining room reflections, compare a room de-reverb pass. You can skip either stage. Listen for truncated consonants and breaths at each pass.
4. **Remove echo only if it repeats the voice.** An audible delayed repeat calls for a separate short test. Keep the original or replace that take if removal strips out words. Avoid stacking passes on otherwise clean audio.
5. **Prepare the final clips.** Trim unusable noise and long empty sections in an editor such as Audacity, while keeping useful breaths and natural phrasing. Export clean WAVs. Put the approved files together in a ZIP and keep a few clean clips outside it for evaluation.

Test the full cleanup chain on a few seconds before treating the entire dataset. A model can learn artifacts that are left in its training audio. Check several clips from different sessions before uploading.

### Clean a dataset locally with Ultimate Vocal Remover (UVR)

UVR separates an audio file into tracks called stems. Use it when the target voice is mixed with music, sound effects or other vocals. If you already have a clean voice recording, keep the original. UVR processes audio on your computer after the required models are downloaded. Cloud runs the later RVC training job separately.

#### Install UVR and prepare a test clip

1. Download the installer or package for your operating system from [UVR releases](https://github.com/Anjok07/ultimatevocalremovergui/releases). Launch the desktop app after installing it.
2. Make a 15–30 second copy of an example that contains a clear line and a section where the music overlaps it. Keep the original safe.
3. Click **Select Input** and choose that test clip. Use **Select Output** to choose a new writable folder, such as `uvr-test`. Choose **WAV** for the output format.
4. Select a **Process Method** and a model that separates **vocals** from **instrumental**, for example a vocals model under **MDX-Net**. If the list is empty, open the settings **Download Center**, select the corresponding model family and download a suitable model. Return to the main window and select it.
5. Enable **GPU Conversion** only if your installed build recognizes a supported device. If that option causes an error, turn it off and test on the CPU. CPU processing can be slower, so start with a short clip.

#### Separate the vocals and listen

Click **Start Processing**. When it finishes, find the vocals stem in the output folder. Some models also write an instrumental stem. Play the original and the vocals stem at similar volume. Check consonants, breaths, held notes, and sections where the accompaniment is loud. If you still hear instruments or the voice sounds watery or metallic, compare another model on the same test clip before processing the full dataset.

If you've selected the wrong stem, check the filenames or listen to each output. Keep the one that contains your target lead voice.

#### Clean the remaining problems one at a time

| What remains | What to try in UVR |
| --- | --- |
| Backing vocals or harmonies | Feed the isolated vocal stem into a model intended for lead and backing separation, if your installation offers one. Keep the lead output and verify that the target vocal is complete. |
| Reverb tails between phrases | Try a model intended for de-reverb if available. Compare before and after on the same passage. Keep the original stem if de-reverb damages consonants or held notes. |
| Audible delayed repeats | Test an echo-removal model if available. If it removes words or distorts breaths, use another take or exclude the affected section. |
| Room hum, clipped peaks or other voices | Check the original. If treatment keeps damaging the voice, replace or exclude the clip. Separation cannot reconstruct peaks lost to clipping. |

Process the full set only after a short comparison sounds right. Use Audacity or another editor to trim unusable material. Keep natural pauses and breaths, export the approved clips as WAV, and pack only those clips into the dataset ZIP. Keep the instrumental and rejected stems out of the ZIP. Next, upload it in **Training** on Ilaria RVC and confirm **Path to Dataset** points to the imported recordings.
///endregion

### Translate the original Applio workflow to Ilaria RVC

| Step in the original workflow | What to do in this Ilaria RVC notebook |
| --- | --- |
| Set up a Kaggle account and verify it | Sign in and check that you can enable GPU and Internet. Complete verification if Kaggle asks for it. |
| Pick a tunnel or persistence mode | Run the official notebook in order and open the Gradio URL from step 4. It handles the tunnel. Back up the experiment outside the temporary session using the export cell. |
| Upload the dataset and paste its path | Use the upload picker in Ilaria RVC, wait for it to finish, and confirm **Path to Dataset** points to your prepared files. Match the model name with what you will enter when exporting checkpoints. |
| Choose a slicer and Post normalization | **Process Data** handles slicing and adjusts each slice automatically. The Ilaria RVC workflow has no separate Applio Post toggle. Match the training sample rate to the architecture and pretrains. Resampling cannot restore missing detail. |
| Set silent training files to zero | Leave **Silent training files** at its default for your first run. If your clips already have natural pauses and no long empty sections, compare a separate run with zero. Check both outputs on the same held-out pauses. |
| Choose batch size by dataset length | Start at 2 or 4 if you are unsure, and use 8 only if the GPU has headroom and the configuration works. Check the log and VRAM. Reduce the batch after an out-of-memory error. Kaggle does not imply a fixed batch multiplier, and dataset length alone does not determine the batch size. |
| Train until the model sounds right | Save every 5 or 10 epochs if your available time and disk space allow. Compare saved inference exports on the same test clips. There is no universal epoch target, and extending a run toward 500 epochs cannot repair a poor dataset. |

#### Listen before deciding which checkpoint to keep

Use a short set of held-out clips. Include a plain sentence, one with sharp consonants, and a pause. For singing, also test a held note and a transition between registers. Start with pitch at zero, retrieval disabled, and optional effects off. Keep the model whose results are clearest across the set. If all versions have the same metallic breaths or muffled words, revisit the dataset instead of extending the run blindly.

Keep the inference export and its matching index if you used one. To continue a run later, save the complete experiment with the notebook export cell and keep your original dataset separately. Open the downloaded ZIP and check its contents before ending the Kaggle session.

///region cloud-training
## 5. Train a voice and save your work

1. In **Training**, choose a new **Model Name**. Import your audio or ZIP through the dataset upload controls. Wait for import completion and confirm **Path to Dataset** points to the imported recordings.
2. Run the **Dataset Checker** and listen to any suspect recordings. Confirm your RVC V2 architecture, sample rate, embedder and pitch settings match your selected G/D pretrains if you use them. Start with a batch size that fits the allocated GPU.
3. Run **Process Data**, then **Feature Extraction**. Read the status of each before continuing. If you change the dataset or encoder, prepare fresh files for that experiment before training.
4. Run **Train Pth** with a modest first target and save periodic checkpoints. Keep a short test clip out of the training data. Compare exported checkpoints on that same clip before starting a longer run.
5. Build the feature index if you need retrieval, then try the inference export at **Index Ratio 0** first. For a detailed explanation of each setting, see [Training controls and workflow](../train/training-controls.md).
6. If you want to stop mid-run, use **Stop and save** inside Ilaria RVC and wait until the log confirms the save. Download the results while the Cloud session is still active.
///endregion

## 6. Download a backup before leaving

The notebook's optional **Export results** cell makes one archive in `/kaggle/working/ilaria-shared/Ilaria-RVC-results.zip`. A live session is temporary. Verify that you have the backup on your own computer before stopping or resetting the session.

- **For inference files only:** set `EXPORT = True` and leave `TRAINING_MODEL = ""`. The archive includes `.pth` and `.index` files in `models`, plus files written to `InferOutput`. Use the player's download button for any conversion that did not write a file there.
- **To keep a resumable training experiment:** wait for **Stop and save** or for training to finish saving. Set `EXPORT = True` and enter the exact experiment name in `TRAINING_MODEL`. Enter the name only, without a folder path. The export includes its `logs/<name>` tree alongside the regular outputs.
- Run that code cell. Open the displayed link or download **Ilaria-RVC-results.zip** through Kaggle **Output**. Open the ZIP locally and confirm it contains what you need. Keep your original dataset separately. The export cell does not package `datasets`.

To stop only the app, set `STOP = True` in **Stop or restart** and run that optional cell after saving. Run step 4 again to reopen it in the same session. Stopping or resetting the whole Kaggle session is a separate action.

## Troubleshooting

| What you see | What to do first |
| --- | --- |
| Step 1 says to enable a GPU | Select a GPU under **Accelerator**, restart if prompted, then rerun from step 1. |
| The Gradio tab is blank or expired | Confirm the session is still running. Use the latest link from step 4. If the link cannot be created, verify Internet and read the cell output. |
| Conversion or training runs out of memory | Close competing jobs in the session and try a short clip. For training, reduce batch size and turn off optional GPU dataset caching if available. Save before interrupting a run. |
| Export says there are no results | Convert or export a voice first. Check the output directory and confirm the archive's optional experiment name matches **Model Name** exactly. |
| Some files disappear after a reset | Start the setup again and reimport your local backups. The working folder belongs to the active session. |

If a problem repeats, note the failing section, the GPU name from step 1, and the first error from the cell output. The notebook also writes the app startup log under `/kaggle/working/.ilaria-notebook/startup.log`. Remove the Gradio URL from any log you share. See [Troubleshooting RVC](../../reference/troubleshooting.md) for model and audio diagnostics.
