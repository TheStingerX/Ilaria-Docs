---
label: "Download & Installation"
icon: ":cd:"
order: 98
permalink: /non-rvc/uvr5/installation/
---
# UVR5 herunterladen und installieren

Die offiziellen Windows- und macOS-Pakete bringen eine isolierte Python- und PyTorch-Umgebung mit, sodass du Python **nicht** separat installieren musst.

## 1. Den richtigen Build herunterladen

1. **Standard-Release (v5.6.0)**: Installer über [GitHub Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases) laden.
2. **Beta Roformer-Patches (Empfohlen)**: für **BS-Roformer**, **Mel-Roformer**, **SCNet**, **Bandit** und **Demudder** einen Standalone- oder Patch-Installer von [uvr_update_patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches) laden:
   - **Die meisten modernen GPUs (NVIDIA / DirectML / macOS)**: Standalone-Beta **Patch #13** (`UVR_Patch_1_15_25_22_30_BETA`) nutzen und optional **Patch #14** (`UVR_Patch_1_21_25_2_28_BETA`) für **Demudder** darüber installieren.
   - **NVIDIA RTX 5000-Serie**: dedizierten Standalone-Build **CUDA 12.8** (`UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8`) nutzen, der Demudder bereits enthält. *(Nicht kompatibel mit AMD/Intel oder älteren NVIDIA-Karten.)*
   - *Tipp*: Bei langsamen GitHub-Downloads hilft ein Multi-Connection-Downloader wie Free Download Manager.

## 2. Unter Windows installieren

1. Installer starten und UVR5 auf **Laufwerk `C:\`** installieren (keine sekundären Laufwerke).
2. Falls du einen kleinen Patch geladen hast (z. B. Patch #14), installiere ihn über deinen bestehenden Roformer-Beta-Ordner.
3. UVR5 starten und **GPU Conversion** im Hauptfenster aktivieren.

> **Linux-Tipp (Bottles)**: der native Linux-Branch (`v5.6.0_roformer_add+directml`) ist veraltet und hat keine aktuellen Patches. Viele Linux-Nutzer starten die Windows-`.exe` in **Bottles** mit einem **Gaming**-Profil (Installer in `drive_c` kopieren) für volle GPU-Beschleunigung.

## 3. Modelle herunterladen

### Integriertes Download Center

1. Unten links auf das **Settings**-Symbol (Schraubenschlüssel) → **Download Center** klicken (oder in einem Modell-Dropdown ganz unten **Download More Models** wählen).
2. Kategorie wählen (**VR Arch**, **MDX-Net**, **Demucs**, **BS/Mel-Roformer** usw.) und die gewünschten Modelle herunterladen.

### Eigene Roformer- / externe Modelle installieren (`.ckpt` + `.yaml`)

Neuere Community-Modelle (wie `dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`) stehen nicht im Download Center und benötigen sowohl eine `.ckpt`- als auch eine `.yaml`-Datei:

- **Methode A - Schaltfläche „Install Model“ (Patch #10+)**:
  1. Rechtsklick in die Liste **Choose MDX-Net Model** → **Install Model**.
  2. Wenn abgefragt, die `.ckpt`-Modelldatei und die passende `.yaml`-Konfiguration wählen.
- **Methode B - Manuelle Installation**:
  1. `.ckpt` (oder `.onnx`) nach `Ultimate Vocal Remover\models\MDX_Net_Models\` kopieren.
  2. `.yaml` nach `Ultimate Vocal Remover\models\MDX_Net_Models\model_data\mdx_c_configs\` kopieren.
  3. Modell in UVR5 wählen, mit **Yes** bestätigen, **Roformer** wählen (fast immer **non-v2**; `BS` oder `Mel` je nach Modellname) und die `.yaml` zuweisen.

> **Wichtige `.yaml`-Hinweise**:
> - Achte beim Speichern aus dem Browser oder von Hugging Face darauf, dass die Datei als **`.yaml`** und nicht als **`.yaml.txt`** gespeichert wird (**Raw** → Speichern unter → Alle Dateien).
> - Falls ein neues Modell auf dem **RTX 5000 CUDA 12.8**-Patch den Fehler `torch._dynamo.polyfills.fx` meldet, ändere in der `.yaml` `use_torch_checkpoint: True` auf `False` (oder lösche die Zeile).
