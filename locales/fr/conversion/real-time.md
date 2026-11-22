---
label: "⚡ Conversion en temps réel"
order: 92
permalink: /real-time/
description: "Pour un enregistrement ou une reprise, la conversion de fichier vous permet de générer et comparer plusieurs prises."
---
# Conversion vocale en temps réel

Pour un enregistrement ou une reprise, la conversion de fichier vous permet de générer et comparer plusieurs prises. En configuration directe, le convertisseur doit terminer chaque bloc audio assez vite pour maintenir le flux du microphone fluide. Configurez d'abord un signal local fiable, puis reliez-le à une application d'appel, d'enregistrement ou de streaming.

## Choisissez un outil adapté

Consultez le [répertoire des outils RVC](../reference/tools.md) pour les téléchargements et notes matérielles, dont Vonovox pour GPU NVIDIA.

| Outil | Par où commencer |
| --- | --- |
| Vonovox | Un convertisseur temps réel pour modèles RVC V2 sous Windows avec GPU NVIDIA. Téléchargez une version pour votre GPU, chargez le modèle et testez votre micro au casque avant de router le signal converti vers une autre appli. [Téléchargements Vonovox](https://huggingface.co/dr87/vonovox/tree/main) · [Documentation projet](https://github.com/dr87/Vonovox) |
| RVC WebUI (Mainline - Original RVC) | Le projet principal fournit une WebUI d'entraînement et d'inférence ainsi qu'une GUI dédiée temps réel. Référez-vous à ses instructions de version et de lancement pour votre plateforme. |
| Applio | Ses interfaces Desktop et Gradio disposent de leurs propres workflows temps réel. Suivez les instructions d'installation correspondant à l'interface et la version installées. |
| w-okada VCClient | Un modificateur de voix pour le direct. La disponibilité RVC dépend de l'édition et de la plateforme. Vérifiez les modèles pris en charge avant d'installer une version. [w-okada VCClient](https://github.com/w-okada/voice-changer) |
| Deiteris et Tg-Develop | Forks indépendants de w-okada avec leurs propres builds et réglages. Consultez les notes de version du fork avant d'appliquer des instructions d'une autre édition. [Dépôt Deiteris](https://github.com/deiteris/voice-changer) · [Dépôt Tg-Develop](https://github.com/tg-develop/voice-changer) |

## Écoutez d'abord un signal propre

1. Branchez un microphone et un casque. Dans le convertisseur, sélectionnez votre microphone physique en entrée et votre casque en sortie.
2. Chargez un modèle d'inférence compatible connu et son index correspondant si vous utilisez le retrieval. Une courte [conversion de fichier](../start/getting-started.md) réussie est une bonne référence avant de tester le chemin en direct.
3. Lancez le flux et parlez à volume normal. Vérifiez le vumètre d'entrée ou faites un enregistrement brut. Réduisez le gain d'entrée si les crêtes saturent avant conversion.
4. Vérifiez que le signal au casque change lorsque vous activez/désactivez la conversion. Si vous entendez l'original en même temps, vérifiez le monitoring matériel direct ou une seconde route dans le système.
5. Testez plus longtemps qu'un seul mot. Incluez parole calme, phrase forte et courte pause. Écoutez s'il y a des coupures, dérives ou parasites sous la même charge que celle prévue en direct.

Évitez d'écouter sur des haut-parleurs près d'un micro actif. Le casque aide à repérer un problème de routage sans renvoyer la sortie dans l'entrée.

## Comprendre les rôles des périphériques et backends audio

> **Routage Audio Correct (Correct Audio Routing)**
>
> **1. Dans le Voice Changer**
> - **Périphérique d'Entrée :** Votre microphone physique.
> - **Périphérique de Sortie :** `Line 1` (VAC, recommandé) ou `CABLE Input` (VB-CABLE).
>
> **2. Dans Discord, Jeux, OBS ou Autres Applications**
> - **Périphérique d'Entrée :** `Line 1` (VAC, recommandé) ou `CABLE Output` (VB-CABLE).
> - **Périphérique de Sortie :** Votre casque (fortement recommandé par rapport aux haut-parleurs).
>
> ```text
> Votre Microphone → Voice Changer → Line 1 (VAC) ou CABLE Input/Output (VB-CABLE) → Discord / Jeu / OBS
> ```
>
> L'audio venant de Discord, du jeu ou d'autres applis doit aller directement dans votre **casque** (jamais en retour dans le câble virtuel).
>
> - **VAC vs. VB-CABLE :** **VAC** (`Line 1`) est toujours recommandé. Si vous avez aussi (ou uniquement) **VB-CABLE** installé, rappelez-vous que le voice changer envoie vers **`CABLE Input`** tandis que Discord / les jeux écoutent **`CABLE Output`**.
> - **Haut-parleurs et fuite du casque :** Évitez les haut-parleurs ; le son peut repasser dans votre microphone et provoquer un son double, de l'écho ou convertir aussi la voix d'autres personnes. Cela peut également arriver avec un casque si le volume est trop fort ou si les oreillettes ne sont pas assez fermées et isolées.
> - **Monitoring :** Entendre votre propre voix convertie au casque est une fonction optionnelle séparée à n'activer qu'au besoin. Évitez les trajets audio en double, l'écho et le loopback.

Avant de câbler une application, sachez ce que fait chaque extrémité :

| Terme | Ce que c'est |
| --- | --- |
| **Input Device** | Votre microphone physique (ou canal d'interface audio) envoyant la voix brute vers le voice changer. |
| **Output Device** | Où va la voix convertie (votre **point de lecture du câble virtuel** pour Discord/OBS/jeux, ou votre casque pour un test local). |
| **Monitor Device** | Seconde sortie optionnelle pour entendre votre voix convertie au casque pendant que **Output Device** alimente un câble virtuel. |
| **Virtual Cable Input** *(côté Lecture)* | Apparaît sous Lecture Windows (ex. `Line 1` dans VAC Lite ou `CABLE Input` dans VB-CABLE). Définissez-le comme **Output Device** du voice changer. |
| **Virtual Cable Output** *(côté Enregistrement)* | Apparaît sous Enregistrement Windows (ex. `Line 1` dans VAC Lite ou `CABLE Output` dans VB-CABLE). Sélectionnez-le comme **Microphone** dans Discord, OBS ou les jeux. |

### Microphones USB, interfaces audio et backends

- **Microphones USB :** Branchez-les directement sur un port USB arrière de la carte mère (évitez les hubs non alimentés), réglez le format Windows sur **48000 Hz** et désactivez la suspension sélective USB si le micro décroche.
- **Interfaces audio (XLR) :** Utilisez **ASIO** lorsqu'il est pris en charge par votre voice changer (comme RVC Blue ou w-okada) pour une latence tampon moindre, ou **WASAPI** pour router vers des câbles virtuels Windows standard.
- **WASAPI Shared vs. WASAPI Exclusive :** **WASAPI Shared** est le point de départ le plus sûr car Windows et les câbles virtuels peuvent partager proprement des flux `48000 Hz`. **WASAPI Exclusive** contourne le mixeur Windows pour réduire la latence pilote quand c'est pris en charge, mais verrouille le périphérique pour les autres applis.

## Configuration spécifique par application (Discord, OBS, jeux, appels, enregistrement)

- **Discord / applis d'appel :** Réglez **Input Device** sur le point d'enregistrement du câble virtuel (`Line 1` / `CABLE Output`), réglez **Output Device** sur votre casque et désactivez (**OFF**) Krisp, suppression d'écho et sensibilité d'entrée automatique si Discord coupe respirations ou fins de mots.
- **OBS Studio et enregistrement local :** Ajoutez une source **Capture d'entrée audio** pointant vers le point d'enregistrement du câble virtuel, coupez toute source micro brute séparée et enregistrez un court extrait de test pour vérifier synchro et niveaux.
- **Jeux :** Sélectionnez le point d'enregistrement du câble virtuel comme micro en jeu (ou définissez-le comme périphérique de communication par défaut dans Windows). Limitez toujours les FPS en jeu ou laissez de la marge GPU pour que le jeu n'affame pas le voice changer.

## Envoyer l'audio converti à une autre application

Un périphérique audio virtuel fournit un point de lecture pour le convertisseur et un point d'enregistrement correspondant pour l'application réceptrice. Les noms dépendent du pilote. Par exemple, un câble virtuel peut nommer son point de lecture "Input" et son point d'enregistrement "Output" car les instructions adoptent la perspective du câble.

```text
Microphone physique → Convertisseur RVC → point de lecture virtuel
                                               ↓
                                point d'enregistrement correspondant → appel ou stream
```

Sélectionnez le point d'enregistrement correspondant comme micro dans l'application réceptrice et faites-y un court enregistrement test. Si votre retour local est correct mais pas l'enregistrement, vérifiez l'entrée de destination et retirez toute source micro en double. Si vous écoutez l'audio converti, utilisez une sortie casque distincte. Évitez de renvoyer tout le mix bureau ou l'audio de l'appli réceptrice dans le convertisseur.

## Ajuster la latence sans perdre en stabilité

**Latence de traitement vs latence totale de bout en bout :** Le **GPU Delay** / temps d'inférence affiché dans votre voice changer correspond **uniquement** au temps pris par le GPU pour convertir un bloc. La **latence totale de bout en bout** ajoute tampon d'entrée micro, **Block Size / Chunk Size**, surcoût crossfade/contexte, tampon du câble virtuel et tampons audio Discord/OBS/jeu. Ne confondez pas un faible GPU Delay (ex. `15 ms`) avec la latence aller-retour totale.

| Contrôle | Réglage pratique |
| --- | --- |
| Taille de bloc ou chunk | Augmentez-la si la parole se coupe sous charge. Une fois stable, testez plus petit et ne gardez que si la parole reste propre. Des blocs plus courts laissent moins de temps de calcul. |
| Crossfade | Augmentez prudemment si vous entendez des raccords durs entre blocs. Modifie le chevauchement des blocs voisins. |
| Contexte supplémentaire | Réduisez le contexte si le convertisseur prend du retard. Aide le modèle sur les transitions au prix de plus de calcul. |
| Prédicteur de hauteur | Si un réglage donne un timing instable, comparez les prédicteurs sur les mêmes phrases. Choisissez celui qui gère votre tessiture avec assez de marge. |
| Détection de silence ou seuil d'entrée | Baissez un seuil qui coupe les syllabes douces. Évaluez sur les pauses et la parole faible, pas seulement sur une voix forte continue. |
| Fréquence périphérique | Vérifiez les fréquences d'échantillonnage du périphérique et du câble virtuel en cas de vitesse anormale ou craquements. Partez de réglages compatibles sur toute la chaîne. |

Partez des réglages par défaut de l'application et ne modifiez qu'un paramètre à la fois. Si un jeu ou programme lourd tourne sur la machine, répétez le test pendant qu'il est lancé. Conservez un profil fonctionnel pour le restaurer avant de passer en direct. [GUI temps réel RVC WebUI (Mainline - Original RVC)](https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI/blob/main/realtime_gui.py)

## Dépanner selon l'endroit où apparaît le défaut

| Symptôme | À vérifier d'abord |
| --- | --- |
| Ni le vumètre du convertisseur ni un enregistrement micro brut ne réagissent | Vérifiez les autorisations micro Windows, le bouton mute physique et le choix de Input Device. |
| Le micro brut fonctionne, mais la sortie convertie est muette | Confirmez que le flux est démarré, le modèle chargé et Output Device bien défini. Baissez le seuil VAD/silence. |
| Le retour local fonctionne, mais l'appel reçoit la voix d'origine | Sélectionnez le point d'enregistrement virtuel (`CABLE Output` / `Line 1`) comme micro d'appel et désactivez toute source micro brute séparée. |
| Double retour / écho / boucle de rétroaction | N'utilisez jamais de haut-parleurs près d'un micro actif. Désactivez **"Écouter ce périphérique"** dans Windows si l'appli écoute déjà, et ne routez jamais l'audio bureau/appel dans le câble virtuel. |
| Craquements, saccades ou sous-dépassement de tampon | Alignez **tous** les périphériques (Micro, Casque, Cable Input/Output) à **48000 Hz** (`mmsys.cpl`), montez **Block/Chunk Size** d'un cran et vérifiez la charge CPU. |
| Voix robotique ou syllabes coupées | L'extracteur de hauteur est trop lourd (`crepe` full) -> passez à **RMVPE** ou **FCPE**, ou baissez **Index Ratio**. |
| **GPU Delay** élevé ou craquements uniquement en jeu | **Saturation GPU** : limitez les FPS du jeu, baissez les options GPU lourdes ou augmentez **Block Size**. |
| Un modèle fonctionne sur fichier mais échoue en direct | Vérifiez l'édition du client live, l'architecture et le support d'embedder. Testez un modèle listé compatible avant de changer vos périphériques audio. |

[Fondamentaux RVC](../start/rvc-fundamentals.md) · [Dépannage](../reference/troubleshooting.md)

## RVC Blue

Conversion vocale de bureau sous Windows. [Installation et configuration](../other-rvcs/rvc-blue/installation.md).
