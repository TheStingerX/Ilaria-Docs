---
label: "Installation"
icon: ":cd:"
order: 99
permalink: /ilaria-rvc/mangio/installation/
---

# Mangio RVC Fork · Installation

[GitHub](https://github.com/Mangio621/Mangio-RVC-Fork) · [Version consultée](https://github.com/Mangio621/Mangio-RVC-Fork/tree/v23.7.0)

!!!warning Logiciels anciens · Déconseillés
La branche principale de **Mangio RVC Fork** est inactive depuis des années. Ce logiciel est ancien et déconseillé pour une nouvelle installation. [Guides par application](../app-guides.md)
!!!

## Version historique et environnement

Mangio RVC Fork est un fork expérimental de la WebUI originale. Le guide vise le tag historique **v23.7.0**. Gardez son environnement et ses ressources à part. Sous Windows, le lanceur intégré exige un paquet officiel contenant `runtime/python.exe`. Le code seul nécessite les dépendances et modèles de base. Le README du tag recommande Python 3.9.8 pour l’installation manuelle.

## Lancer la WebUI ou l’interface texte

Dans le paquet Windows, exécutez `go-web.bat`. Il lance `infer-web.py` avec l’interpréteur embarqué et le port 7897. Ouvrez l’URL locale affichée. En cas d’échec, vérifiez l’interpréteur avant de changer les dépendances. Pour la CLI interactive dans un environnement préparé, lancez `infer-web.py --is_cli`.

~~~bash
python infer-web.py --is_cli
~~~

[Utilisation et dépannage](usage.md)
