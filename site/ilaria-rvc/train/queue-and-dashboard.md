# Queue, dashboard and alerts

[Download Ilaria RVC 2.4.0 for Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.0/ILARIA_RVC-2.4.0.zip?download=true)

## Queue several experiments

Configure the experiment in Training, confirm its dataset and model name, and add it to the **Training Queue**. Use distinct names for distinct configurations. Review the saved entries before starting, then check the current job and its stage. The queue persists across sessions. Pause or resume from its controls and inspect failed jobs before retrying. Correct missing dataset paths and incompatible settings before resubmitting.

## Follow a running job

The **Training Dashboard** shows epoch duration, cumulative updates, steps per second, charts, and a status message. While a model is training, the dashboard follows live metrics. When idle, pick an existing Model Name to review its saved metrics. Use the job log to identify the first failure. The counters are helpful for timing and progress. Judge sound from [training previews](training-workflow.md) of the same held-out clip.

## TensorBoard and diagnostics

Use the TensorBoard panel's Start and Stop controls. The 2.1.0 dashboard waits for usable scalar events before showing them. Check the selected experiment and dashboard status if the charts are empty. Loss curves can help spot a stalled run. They cannot rank how natural the voices sound.

Open **PC training advisor** under Other, select the rate, precision and intended GPU, and run the scan. Try the suggested settings on a small job before a long experiment. The **Diagnostic Report** includes OS, GPU, CUDA, disk and recent training errors. Review reports for personal file paths before sharing them.

## Notifications and safe stops

Use optional desktop and sound notifications to notice completion or errors, then confirm the final state in the logs. Save before restarting or closing the last tab. With **Stop and save**, wait for confirmation and preserve the G/D pair and experiment state before moving or restarting the run.
