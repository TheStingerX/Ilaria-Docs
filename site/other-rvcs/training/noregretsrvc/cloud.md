# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.0 is an independent web studio for configuring Applio workflows. This checkout provides the interface and notebook generator. The local setup runs the studio in your browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Kaggle notebook](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/NoRegretsRVC_Kaggle.ipynb)

## Kaggle

Export the generated `.ipynb` and import it into a new private Kaggle notebook. Review the cells and the Applio version they install before running them. Enable a GPU accelerator and internet access when dependency or model downloads require it. Run setup first, then the workflow cells in order. Check that the runtime can see the GPU and your dataset before starting training.

If the notebook creates a tunnel, keep the URL and token private and stop the tunnel when finished. Store credentials using the provider’s secret feature where supported. Save your model and any resume checkpoints before the session ends, then download a copy. If a cell fails, inspect its first error, check file paths and quotas, and retry that stage. The generator is documented for Kaggle.

[Kaggle](https://www.kaggle.com/code)

## Dataset, Dual T4 and resource budget

The Kaggle WebUI scans `/kaggle/input` when it starts or refreshes. If several datasets are mounted, choose the right one and check its path. The default Dual-T4 batch parity option is designed to split batches of 4 or more while preserving the baseline single-GPU Applio optimizer steps for runs below 300 epochs. The resource advisor compares estimates against 16 GB VRAM, 20 GB disk and 12 hours as configured planning targets. Actual Kaggle resources, quotas and session duration can vary. Check the live runtime as well.

## Turbo, preflight and checkpoint recovery

Optional **Lossless Turbo Training** is enabled by default. The project describes changes to AdamW batching, cuDNN, data loading, DDP, caching, logging and checkpoint writes. Treat unchanged quality and speed gains as project goals rather than benchmarks for your run. Preflight checks look for sliced WAVs, extracted `.npy` files and `filelist.txt`. If the final inference weights are missing, the runtime attempts a rescue export through `extract_model`. Verify the file opens and keep resume checkpoints separately.

## Progress and updates

The ETA uses smoothed epoch timings and the browser’s local clock. The accuracy indicator is an estimate. Check version and export your files before applying a WebUI update and restart. The Kaggle implementation uses `NR_BUILD_REV` to guard against downgrades.

[Installation](installation.md) · [Usage](usage.md)
