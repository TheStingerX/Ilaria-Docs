---
label: "Utilisation et dépannage"
icon: ":musical_note:"
order: 98
permalink: /ilaria-rvc/aicovergen/usage/
---

# AICoverGen · Utilisation et dépannage

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Logiciels anciens · Déconseillés
**AICoverGen** est un ancien pipeline de reprises RVC v2 qui n’est plus maintenu activement et repose sur des dépendances de l’époque Python 3.9+. Pour une nouvelle installation, choisissez une application maintenue. [Guides par application](../../app-guides.md)
!!!

## Ajouter des modèles vocaux RVC v2

AICoverGen charge uniquement des modèles d’inférence **RVC v2** exportés (`rvc_models/`) :

- **Download model :** collez une URL directe vers une archive contenant le `.pth` du modèle vocal (et son `.index` optionnel) pour le télécharger et l’extraire automatiquement.
- **Upload model :** importez vos fichiers locaux `.pth` et `.index` optionnel directement depuis la WebUI, ou placez chaque dossier vocal dans `rvc_models/`.

## Générer des reprises dans la WebUI

Ouvrez l’onglet **Generate**, collez une URL YouTube ou importez un fichier audio local, sélectionnez le modèle vocal et ajustez les réglages principaux :

- **Pitch Change :** transposez la hauteur vocale pour correspondre à la tessiture de la voix cible (par exemple `+1` octave / `+12` demi-tons d’homme vers femme, ou `-1` / `-12` de femme vers homme).
- **Extraction du pitch :** utilisez **`rmvpe`** par défaut pour un suivi vocal plus propre, ou **`mangio-crepe`** avec un hop length réglable pour des transitions plus douces.
- **Index Rate :** contrôle l’influence du fichier `.index` sur le timbre et l’articulation. Diminuez-le s’il ajoute du grain ou des artefacts.
- **Mixage audio et effets :** ajustez les volumes pour **Main Vocals**, **Backup Vocals** et **Instrumentals**, réglez la **réverbération** intégrée (taille de pièce, wet, dry, damping) et choisissez le format de sortie (**`mp3`** ou **`wav`**).

## Mode CLI (`src/main.py`)

Vous pouvez exécuter tout le pipeline sans ouvrir la WebUI via `src/main.py` :

~~~bash
python src/main.py -i "https://www.youtube.com/watch?v=VIDEO_ID" -dir "VoiceFolderName" -p 0 -palgo rmvpe -ir 0.5 -mv 0 -bv 0 -iv 0 -rsize 0.15 -rwet 0.2 -rdry 0.8 -rdamp 0.7 -oformat mp3
~~~

Options principales :

- `-i` : chemin du fichier local ou URL YouTube en entrée
- `-dir` : nom du dossier du modèle vocal dans `rvc_models/`
- `-p` : décalage de pitch
- `-palgo` : algorithme d’extraction du pitch (`rmvpe` ou `mangio-crepe`)
- `-ir` : index rate (`0`–`1`)
- `-mv` / `-bv` / `-iv` : réglages de volume pour voix principale, chœurs et instrumental
- `-rsize` / `-rwet` / `-rdry` / `-rdamp` : room size, wetness, dryness et damping de la réverbération
- `-oformat` : format audio de sortie (`mp3` ou `wav`)

## Dépannage

- **Erreurs audio ou de conversion à l’exécution :** vérifiez que `ffmpeg` et `sox` sont tous deux installés et disponibles dans le `PATH` avant de lancer `src/webui.py` ou `src/main.py`.
- **Échec de téléchargement YouTube :** les anciens extracteurs YouTube finissent souvent par ne plus fonctionner. Téléchargez la piste audio séparément en WAV/MP3 et fournissez le fichier local plutôt qu’une URL.
- **Échec au chargement du modèle :** vérifiez que le fichier est bien un `.pth` d’inférence RVC v2 exporté (et non un modèle RVC v1 ou un checkpoint G/D d’entraînement).

[Installation](installation.md)
