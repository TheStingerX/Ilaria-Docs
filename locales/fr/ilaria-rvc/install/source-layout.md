---
label: "Fichiers, configuration et maintenance des sources"
icon: ":card_file_box:"
order: 84
permalink: /ilaria-rvc/source-layout/
description: "Une exportation d'inférence peut être utilisée pour la conversion."
---
# Fichiers, configuration et maintenance des sources

[Télécharger Ilaria RVC 2.4.7 pour Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

> **2.4.0** · Le paquet Windows déplace l’application et le runtime dans app/. Les modèles restent à la racine dans models/. Ajout de Colab, Lightning AI Studio, des indications de téléchargement des embedders, et de Lyery’s Legacy Core V1.5v2 (32 kHz, HiFi-GAN, ContentVec). pip est réparé et pywin32 est inclus.

## Savoir quoi sauvegarder

 | Emplacement | Rôle |
| --- | --- |
 | modèles/ | Voix prêtes pour l'inférence et leurs index correspondants, généralement regroupés dans des dossiers par voix. |
 | Ensembles de données/ | Enregistrements de formation importés. Conservez une copie séparée de vos originaux. |
 | journaux/ | Configuration des expériences, audio préparé, fonctionnalités, index, points de contrôle pouvant être repris et aperçus. Sauvegardez l’intégralité de l’expérience pour la reprendre plus tard. |
 | app/runtime/ | Environnement Windows Python fourni. |
 | actifs/ | Encodeur de base et poids de pas, encodeurs en option, pré-entraînements de formation, illustrations et autres actifs d'application. |

Une exportation d'inférence peut être utilisée pour la conversion. Pour une expérience pouvant être reprise, conservez la paire G/D enregistrée, l'optimiseur et l'état d'entraînement ainsi que la configuration, la liste des fichiers et les fonctionnalités extraites.

## Travailler à partir des sources sous Windows

Démarrez à partir d'une installation propre et correspondante. Copiez le runtime fourni, ffmpeg et ffprobe dans la caisse source dans la même mise en page. Apportez les poids ContentVec et RMVPE installés, ainsi que les actifs FCPE si nécessaire. Pour l'entraînement avec les pré-entraînements V2 par défaut, copiez les ressources pretrained_v2 installées. Copiez .env.example dans .env et utilisez le lanceur de journaux. Lors du diagnostic du démarrage, vérifiez les chemins groupés avant de modifier globalement les dépendances Python.

Le projet retient comme référence les points d’entrée en amont. Son application principale est app/ILARIA_RVC.py, avec des modules spécifiques aux fonctionnalités dans app/ilaria/ et le code d'inférence et de formation en amont sous app/infer/. Ilaria RVC s'appuie sur RVC WebUI (Mainline - Original RVC), inclut des travaux adaptés d'Applio et Redpanda-vc, utilise TorchFCPE pour FCPE et étend Ilaria Audio Analyzer. Consultez la licence et les avis du référentiel lors de la redistribution de la source ou des actifs.

## Mettez à jour sans perdre de travail

Terminez les tâches, copiez les données essentielles et utilisez le panneau de mise à jour pour consulter les notes de version. Le programme de mise à jour vérifie les téléchargements et prend en charge la sauvegarde et la récupération. Si la même installation a déjà un processus en cours d'exécution, utilisez son adresse de navigateur ou ses journaux et attendez la fin du travail actif. Utilisez **Redémarrer Ilaria RVC** pour un redémarrage normal de l'interface utilisateur.
