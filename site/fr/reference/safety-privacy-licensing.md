# Sécurité, Confidentialité et Licences en IA Vocale

> **Conseils pratiques, pas un avis juridique :** Cette page résume les bonnes pratiques techniques de sécurité et les règles courantes de licence pour les modèles RVC, jeux de données et notebooks cloud. Lisez toujours la licence propre à chaque ressource.

## 1. Sécurité des modèles téléchargés (`.pth` vs `.safetensors`)

- **Pourquoi les fichiers `.pth` demandent de la vigilance :** Les fichiers PyTorch `.pth` utilisent la sérialisation `pickle`. Des applications modernes comme **Ilaria RVC 2.4.0+** et **Applio** intègrent des protections (`weights_only`), mais ne téléchargez des `.pth` que depuis des **auteurs fiables et dépôts officiels** (Hugging Face ou GitHub Releases).
- **Pourquoi `.safetensors` est plus sûr :** `.safetensors` ne stocke que des poids bruts et métadonnées sans exécuter de code au chargement. Convertissez avec le [Convertisseur Safetensors](../ilaria-rvc/manage/safetensors-converter.md).
- **Vérifier avant de charger :** Contrôlez la taille du fichier (~40–110 Mo pour un `.pth` d'inférence réel), vérifiez les empreintes SHA-256 ou signatures numériques et ne chargez jamais de checkpoints `G_*.pth` / `D_*.pth` d'origine inconnue.

## 2. Consentement vocal, confidentialité et licences

- **Consentement :** Entraînez uniquement sur votre voix, des voix autorisées ou des jeux de données sous licence explicite.
- **Usage commercial vs non commercial :** Même si l'outil est open-source (MIT), **chaque modèle vocal et pretrained possède sa propre licence** (certains autorisent l'usage commercial, d'autres sont **non commerciaux / CC-BY-NC**). Vérifiez la fiche modèle et [Modèles pré-entraînés](../start/pretrained.md).
- **Partage responsable :** Indiquez version RVC (`v2`), fréquence (`32k`/`40k`/`48k`), embedder, `added_*.index` associé et conditions d'usage.

## 3. Sécurité des notebooks cloud et identifiants

- **Gardez Kaggle, Colab et Lightning AI privés :** Les cellules de lancement (comme `Ilaria-RVC-Kaggle.ipynb`) affichent des URL actives et **mots de passe WebUI / FileBrowser**. Ne partagez jamais de captures ou journaux contenant des mots de passe actifs.
- **Protégez vos jetons :** Ne collez jamais de jetons **Ngrok**, **Horizon ID** ou Hugging Face en écriture dans un notebook public, et arrêtez les tunnels (`STOP = True`) après usage.
- **Confidentialité des données :** Pour des enregistrements sensibles, nettoyez et convertissez l'audio **en local**.
