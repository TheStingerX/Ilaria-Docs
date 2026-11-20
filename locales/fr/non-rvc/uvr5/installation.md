---
label: "Téléchargement et installation"
icon: ":cd:"
order: 98
permalink: /non-rvc/uvr5/installation/
---
# Télécharger et installer UVR5

Les paquets officiels Windows et macOS incluent un environnement Python et PyTorch isolé : vous n'avez **pas** besoin d'installer Python séparément.

## 1. Télécharger la bonne version

1. **Version standard (v5.6.0)** : téléchargez l'installateur depuis [GitHub Releases](https://github.com/Anjok07/ultimatevocalremovergui/releases).
2. **Patchs Beta Roformer (Recommandé)** : pour utiliser **BS-Roformer**, **Mel-Roformer**, **SCNet**, **Bandit** et **Demudder**, téléchargez une version autonome ou un patch sur [uvr_update_patches](https://github.com/TRvlvr/model_repo/releases/tag/uvr_update_patches) :
   - **La plupart des GPU modernes (NVIDIA / DirectML / macOS)** : utilisez le **Patch #13** autonome (`UVR_Patch_1_15_25_22_30_BETA`) et appliquez éventuellement le **Patch #14** (`UVR_Patch_1_21_25_2_28_BETA`) par-dessus pour **Demudder**.
   - **Série NVIDIA RTX 5000** : utilisez la version autonome dédiée **CUDA 12.8** (`UVR_Patch_4_24_25_20_11_BETA_full_cuda_12.8`), qui inclut déjà Demudder. *(Incompatible avec AMD/Intel ou les anciens GPU NVIDIA.)*
   - *Astuce* : si le téléchargement GitHub est lent, utilisez un gestionnaire multi-connexions comme Free Download Manager.

## 2. Installer sous Windows

1. Lancez l'installateur et installez UVR5 sur le **lecteur `C:\`** (évitez les autres disques).
2. Si vous avez téléchargé un petit patch (comme Patch #14), installez-le par-dessus votre dossier Roformer bêta existant.
3. Ouvrez UVR5 et cochez **GPU Conversion** dans la fenêtre principale.

> **Astuce Linux (Bottles)** : la branche Linux native (`v5.6.0_roformer_add+directml`) est ancienne et n'a pas les derniers patchs. Beaucoup d'utilisateurs Linux lancent l'`.exe` Windows dans **Bottles** avec un profil **Gaming** (en plaçant l'installateur dans `drive_c`) pour garder l'accélération GPU.

## 3. Télécharger les modèles

### Download Center intégré

1. Cliquez sur l'icône **Settings** (clé à molette) en bas à gauche → **Download Center** (ou choisissez **Download More Models** en bas de n'importe quelle liste de modèles).
2. Choisissez la catégorie (**VR Arch**, **MDX-Net**, **Demucs**, **BS/Mel-Roformer**, etc.) et téléchargez les modèles voulus.

### Installer des modèles Roformer / externes personnalisés (`.ckpt` + `.yaml`)

Certains modèles récents de la communauté (comme `dereverb_bs_roformer_anvuew_sdr_22.5050.ckpt`) ne sont pas dans le Download Center et nécessitent un fichier `.ckpt` et sa configuration `.yaml` :

- **Méthode A - Bouton Install Model (Patch #10+)** :
  1. Faites un clic droit dans la liste **Choose MDX-Net Model** et cliquez sur **Install Model**.
  2. Sélectionnez le fichier `.ckpt` puis le `.yaml` correspondant lorsqu'il est demandé.
- **Méthode B - Installation manuelle** :
  1. Copiez le `.ckpt` (ou `.onnx`) dans `Ultimate Vocal Remover\models\MDX_Net_Models\`.
  2. Copiez le `.yaml` dans `Ultimate Vocal Remover\models\MDX_Net_Models\model_data\mdx_c_configs\`.
  3. Sélectionnez le modèle dans UVR5, confirmez **Yes**, choisissez **Roformer** (presque toujours **non-v2** ; `BS` ou `Mel` selon le nom) et indiquez le `.yaml`.

> **Conseils importants pour les `.yaml`** :
> - Lors du téléchargement depuis un navigateur ou Hugging Face, vérifiez que le fichier porte bien l'extension **`.yaml`** et non **`.yaml.txt`** (utilisez **Raw** → Enregistrer sous → Tous les fichiers).
> - Avec le patch **RTX 5000 CUDA 12.8**, si un modèle récent affiche l'erreur `torch._dynamo.polyfills.fx`, ouvrez son `.yaml` et remplacez `use_torch_checkpoint: True` par `False` (ou supprimez cette ligne).
