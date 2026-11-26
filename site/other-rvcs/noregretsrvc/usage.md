# NoRegretsRVC · Usage

NoRegretsRVC Beta 0.0 is an independent web studio for configuring Applio workflows. This checkout provides the interface and notebook generator. The local setup runs the studio in your browser.

[GitHub](https://github.com/HunterThatsMe/NoRegretsRVC) · [Changelog](https://github.com/HunterThatsMe/NoRegretsRVC/blob/main/CHANGELOG.md)

## Usage

Choose or create a project in **Training** and enter the intended sample rate, vocoder, pitch extractor and embedder. Match these to any pretrained pair. Start with a conservative batch, then adjust epochs and precision for the target runtime. The VRAM estimate is advisory and does not measure memory on the remote GPU. Review notebook, tunnel and backup settings before exporting. Project settings saved in browser storage are tied to that browser and address.

**Samples** prepares conversion settings. **Models** and workbench views prepare options for downloading models, voice blending or TTS. **TensorBoard** displays parsed training information. Run the actual conversion or training in a compatible Applio runtime and verify the output there.

[Installation](installation.md) · [Cloud](cloud.md)
