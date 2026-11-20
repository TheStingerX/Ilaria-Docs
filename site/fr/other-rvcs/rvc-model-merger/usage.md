# RVC Model Merger

[GitHub](https://github.com/mojowozo/RVC-model-merger)

> **Notes importantes avant de commencer**
> - **Cet outil est uniquement un model merger** : il ne convertit pas d'audio, ne fait pas de conversion micro en direct et n'entraîne pas de nouveaux modèles. Il fusionne uniquement deux ou plusieurs modèles RVC `.pth` existants en un nouveau fichier `.pth`.
> - **La fusion entre différents sample rates est prise en charge** : contrairement à ce qu'indique le README du dépôt, vous **pouvez** fusionner des modèles ayant des **taux d'échantillonnage différents** (ex. `32k`, `40k`, `48k`) via l'option **Encoder-only**, à condition qu'ils partagent la **même version RVC** (`v1` ou `v2`) et la **même architecture de vocodeur** (`HiFi-GAN` ou `RefineGAN`).

## Règles de compatibilité

| Critère | Fusion standard | Fusion Encoder-only |
| --- | --- | --- |
| **Version RVC** (`v1` vs `v2`) | Doit correspondre | Doit correspondre |
| **Architecture vocodeur** (`HiFi-GAN` vs `RefineGAN`) | Doit correspondre | Doit correspondre |
| **Sample rate** (`32k`, `40k`, `48k`) | Doit correspondre | **Peut différer** (le décodeur provient d'un seul modèle de base) |

## Installation

### Version compilée (Windows)

1. Téléchargez l'archive depuis [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Extrayez-la dans un dossier accessible en écriture et lancez l'`.exe`.

### Depuis les sources (Python)

1. Clonez ou téléchargez le dépôt depuis [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Installez les dépendances :
   ```bat
   pip install -r requirements.txt
   ```
   *(Utilise `torch==2.10.0` et `numpy==1.26.4` ; `tkinterdnd2==0.6.2` est optionnel pour le glisser-déposer.)*
3. Lancez l'application avec `run.bat` ou :
   ```bat
   python main.py
   ```

## Comment fusionner des modèles

1. **Chargez les modèles** : utilisez **Browse** (ou glissez-déposez des fichiers `.pth`). Cliquez sur **+ Add Slot** pour fusionner plus de deux modèles. Chaque emplacement détecte automatiquement le vocodeur (`HiFi-GAN` / `RefineGAN`), le sample rate, la version RVC et `f0`.
2. **Réglez les poids** : utilisez le curseur **Strength** (`0–100`) pour définir la contribution de chaque modèle. Les emplacements à `0` sont ignorés.
3. **Choisissez le mode de fusion** :
   - Laissez **Encoder-only** décoché pour une fusion complète lorsque tous les modèles ont le même sample rate.
   - Cochez **Encoder-only** pour fusionner des modèles avec des **sample rates différents** (ou pour ne mélanger que l'encodeur en gardant le décodeur d'un seul modèle).
4. **Nom et préréglages (optionnel)** : gardez le nom automatique (**Auto**) ou saisissez un nom personnalisé. Vous pouvez aussi sauvegarder/charger des configurations via **Preset → Save / Delete**.
5. **Fusionnez** : cliquez sur **Merge Models**. Le fichier `.pth` obtenu est enregistré dans le dossier `merges/` (cliquez sur **Open Folder** ou **Open merges folder** pour y accéder).
