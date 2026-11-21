# Every Training control explained

[Download Ilaria RVC 2.4.7 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Training creates a new voice model from recordings. For a first experiment, use a unique name, a small clean dataset and a compatible pretrained pair. Keep one recording out of the dataset so you can listen to the model on a clip it has never seen. Start with the [training workflow](training-workflow.md) if you want the steps in order.

## Name, audio and model design

| Control | What it does and when to use it |
| --- | --- |
| `Model Name` | Identifies your experiment and its saved files. Use a new name for a new dataset or incompatible configuration. To resume, use the original name with its original settings. A placeholder in the empty box is an example. |
| `Path to Dataset` | Folder the app reads for training. After uploading, check the updated path before pressing Process Data. |
| `Drop dataset audio files or a ZIP` | Imports recordings into the app's datasets library. Wait for Dataset Import Log to finish before processing. |
| `Manage datasets` | Refresh datasets reloads the list. Dataset to remove selects an imported item. Delete selected dataset removes that imported item. Check the name first and keep a separate copy of your originals. Dataset Removal Log reports what happened. |
| `Sample Rate` | Chooses the model's training rate, 32, 40 or 48 kHz where compatible. Match the architecture and G/D pair. Raising the rate cannot restore detail absent from your recordings. |
| `Pitch Guidance` | Gives the generator an estimated pitch track during training. Use the default for a typical model and match the pretrained pair. Turning it off changes what the model expects. |
| `CPU Threads` | Controls how much CPU parallelism the preparation or extraction stage uses. Reduce it if preprocessing exhausts system RAM or makes the PC unusable. |
| `Vocoder` | Selects the waveform generator. Start with HiFi-GAN unless you have a compatible reason to choose RefineGAN. In this build RefineGAN training needs RVC V2 at 32 kHz with pitch guidance. |
| `Embedder Model` | Chooses the content features used by the trainer. Training exposes ContentVec and Spin-v2. Changing it requires fresh extracted features and a compatible experiment. Use the matching encoder at inference. |
| `Silent training files` | Sets how many silent examples the experiment includes. Compare the same natural pauses if changing it. |
| `Index Algorithm` | Chooses whether to keep all feature vectors or cluster them before building the retrieval index. See [Auto, Faiss and KMeans](training-controls.md). |
| `Speaker ID` | Chooses the speaker number attached to the data. Leave the default for a first single-speaker model. |
| `Pitch extraction algorithm` | Estimates the pitch of voiced parts. Start with RMVPE. Compare alternatives on the same material when pitch tracking is the actual problem. |

## How long to train and what to save

| Control | What it changes |
| --- | --- |
| `Training Precision` | FP32 uses full precision. FP16 can save VRAM on compatible hardware. Keep the original precision when comparing or resuming a run. |
| `GPU IDs` and `GPU Information` | Read the listed devices before entering IDs. A list such as 0-2 means GPUs 0 and 2. Separate preparation controls can use a different device list from training. |
| `Batch Size` | Number of examples grouped for an update. Reduce it if you run out of GPU memory. Check the Training Log for the effective batch, especially on [Kaggle](../cloud/kaggle.md). |
| `Training Target`, `Total Epochs`, `Total Steps` | Epochs count passes through the prepared dataset. Steps count updates. The target is the total you want to reach, including any already completed part. |
| `Save frequency` | Controls the interval between saves in epochs. Choose an interval that lets you compare several snapshots without filling the drive. |
| `Save last ckpt as final Model` | Selects the latest-checkpoint retention behavior. Keep earlier snapshots if you want to compare or return to them and have space. |
| `Create model at save frequency` | Produces inference exports at the selected save cadence so you can audition intermediate models. Keep the G/D pair and experiment state separately if you want to resume. |
| `Cache data to GPU` | Stores prepared data in VRAM. Leave it off for a first test if memory is tight and for a step-target run where required. |
| `Pretrained model (G + D)` | Chooses a compatible generator and discriminator pair. Refresh pretrained list after downloading a pair. Pretrained Log explains the selection. Choosing None starts without pretrained weights. |

## The four numbered buttons

1. **Process Data** reads the dataset, prepares slices and resamples to the selected training configuration. Read Pre-Process Log before continuing.
2. **Feature Extraction** extracts the representation and, when enabled, pitch. Check Feature Extraction Log for failures and asset names.
3. **Train Index** builds the optional retrieval index from compatible extracted features. The model can be converted without it. Preserve the index with its matching voice.
4. **Train Pth** starts weight training. Watch Training Log. To interrupt safely, click **Stop and save**, wait for **Stop / Resume** to confirm the write, then download or back up the experiment.

## Dataset Checker, previews, alerts and queue

- **Dataset Checker** reads the selected recordings. Silence threshold defines what counts as quiet, Flag silences longer than sets the duration to report, and Volume difference warning sets the level difference to flag. **Check dataset** runs the scan. Choose a recording, set Start time or enable Start just before the longest silence, then use **Load 12-second preview** to hear the affected spot. Review the log, status and audio before editing the source.
- **Training previews** are optional. Enable **Generate training previews**, choose a source of up to 30 seconds, set Preview every N epochs, and use Preview Pitch and Preview Pitch Extraction to fix the comparison settings. Select a Saved preview epoch and use **Refresh previews** to update the list. Preview Log and Training Preview Audio show the result.
- **Training notifications** lets you choose desktop alerts and sound alerts for completion or error. **Test alerts** checks the selected options. Read Notification Test Log if nothing appears or plays.
- **Training queue** saves the current settings as a job. Automatic preparation runs Process Data, Feature Extraction and Train Index for that job. Use **Start queue** to begin and **Pause after current model** to stop after the active job. **Refresh queue** updates the display. Pick a job before **Retry selected** or **Remove selected job**. Read Queue Action Log and Queue Log before retrying.
