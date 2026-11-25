---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/aicovergen/installation/
---

# AICoverGen · Installation

[GitHub](https://github.com/SociallyIneptWeeb/AICoverGen)

!!!warning Logiciels anciens · Déconseillés
**AICoverGen** est un ancien pipeline de reprises RVC v2 qui n’est plus maintenu activement et repose sur des dépendances de l’époque Python 3.9+. Pour une nouvelle installation, choisissez une application maintenue. [Guides par application](../../app-guides.md)
!!!

## Ce que fait AICoverGen

AICoverGen est un pipeline automatisé avec WebUI et CLI pour créer des reprises musicales par IA à l’aide de modèles vocaux **RVC v2** existants. À partir d’un lien YouTube ou d’un fichier audio local, il sépare la voix principale de l’instrumental via MDX-Net, convertit la voix avec votre modèle `.pth` (et `.index` optionnel), applique le mixage et la réverbération, puis réassemble le morceau. Il n’entraîne pas de nouveaux modèles RVC : vous fournissez des fichiers d’inférence RVC v2 existants.

## Prérequis

- **Python 3.9+** (Python 3.10 recommandé)
- **GPU NVIDIA avec CUDA** recommandé pour une vitesse de conversion correcte
- **FFmpeg** et **SoX (`sox`)** installés et accessibles dans le `PATH` du système

## Installation locale

Clonez le dépôt, installez les dépendances Python, téléchargez les modèles de base requis (MDX-Net pour la séparation vocale et HuBERT de base), puis lancez la WebUI Gradio (par défaut sur `http://127.0.0.1:7860`) :

~~~bash
git clone https://github.com/SociallyIneptWeeb/AICoverGen.git
cd AICoverGen
pip install -r requirements.txt
python src/download_models.py
python src/webui.py
~~~

L’exécution de `python src/download_models.py` télécharge automatiquement les poids MDX-Net et le modèle HuBERT nécessaires avant la première génération.

## Google Colab

Si votre ordinateur ne dispose pas d’un GPU NVIDIA adapté, le dépôt fournit un notebook officiel (`AICoverGen_colab.ipynb`) pour installer les dépendances système (dont `sox`), récupérer les poids de base et lancer l’interface Gradio sur un GPU cloud.

[Utilisation et dépannage](usage.md)
