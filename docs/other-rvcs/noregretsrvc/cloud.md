---
label: "Cloud"
icon: ":cloud:"
order: 97
permalink: /ilaria-rvc/noregretsrvc/cloud/
---

# NoRegretsRVC · Cloud

NoRegretsRVC Beta 0.0 is an independent web studio for configuring Applio workflows. This checkout provides the interface and notebook generator. The local setup runs the studio in your browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/CHANGELOG.md)

## Kaggle

Export the generated `.ipynb` and import it into a new private Kaggle notebook. Review the cells and the Applio version they install before running them. Enable a GPU accelerator and internet access when dependency or model downloads require it. Run setup first, then the workflow cells in order. Check that the runtime can see the GPU and your dataset before starting training.

If the notebook creates a tunnel, keep the URL and token private and stop the tunnel when finished. Store credentials using the provider’s secret feature where supported. Save your model and any resume checkpoints before the session ends, then download a copy. If a cell fails, inspect its first error, check file paths and quotas, and retry that stage. The generator is documented for Kaggle.

[Kaggle](https://www.kaggle.com/code)

[Installation](installation.md) · [Usage](usage.md)
