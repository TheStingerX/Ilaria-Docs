---
label: "Optimisation Avancée des Performances"
icon: ":zap:"
order: 97
permalink: /fr/ilaria-rvc/vonovox/advanced-performance-optimization/
description: "Guide optionnel de verrouillage d'horloge GPU NVIDIA (GPU Clock Locking) pour tester si le maintien de fréquences graphiques prises en charge améliore la stabilité de latence de Vonovox sous Windows."
---
# Optimisation Avancée des Performances : NVIDIA GPU Clock Locking

> **Optimisation optionnelle :** Ce guide est **100% optionnel** et n'est **jamais obligatoire** pour installer ou utiliser Vonovox. Terminez toujours [Installer Vonovox](installation.md) et [Router et régler Vonovox](live-audio.md) avant de tester des réglages GPU avancés.

**Principe clé :** Le verrouillage d'horloge GPU (GPU Clock Locking) est une optimisation avancée optionnelle pouvant améliorer la stabilité du traitement en temps réel de Vonovox sur les GPU NVIDIA compatibles. Utilisez toujours des fréquences d'horloge prises en charge, testez les résultats sur votre propre matériel et restaurez les horloges par défaut si aucun gain mesurable n'est constaté.

> **Réinitialisation rapide (à exécuter à tout moment pour restaurer les valeurs par défaut) :** Ouvrez l'Invite de commandes en tant qu'Administrateur et exécutez `nvidia-smi -i 0 -rgc` (remplacez `0` par l'index de votre GPU si vous avez plusieurs GPU). Vous pouvez aussi redémarrer Windows pour revenir à la gestion dynamique des horloges.

## Table des Matières

- [Parcours Rapide pour Utilisateurs Expérimentés](#parcours-rapide-pour-utilisateurs-expérimentés)
- [1. Qu'est-ce que le GPU Clock Locking (Introduction pour Débutants)](#1-quest-ce-que-le-gpu-clock-locking-introduction-pour-débutants)
- [2. Comment les Horloges GPU Affectent Vonovox](#2-comment-les-horloges-gpu-affectent-vonovox)
- [3. Compatibilité NVIDIA et Messages d'Erreur](#3-compatibilité-nvidia-et-messages-derreur)
- [4. Configuration Débutant : Windows 10 et Windows 11](#4-configuration-débutant--windows-10-et-windows-11)
- [5. Trouver les Horloges Prises en Charge de Votre GPU](#5-trouver-les-horloges-prises-en-charge-de-votre-gpu)
- [6. Choisir une Fréquence Appropriée](#6-choisir-une-fréquence-appropriée)
- [7. Appliquer le Verrouillage d'Horloge GPU](#7-appliquer-le-verrouillage-dhorloge-gpu)
- [8. Restaurer les Paramètres par Défaut](#8-restaurer-les-paramètres-par-défaut)
- [9. Gestion d'Horloge GPU en un Clic (Scripts BAT)](#9-gestion-dhorloge-gpu-en-un-clic-scripts-bat)
- [10. Comment Tester si Cela Aide Vraiment](#10-comment-tester-si-cela-aide-vraiment)
- [11. Risques, Limitations et Précautions](#11-risques-limitations-et-précautions)
- [12. Note Avancée : Verrouillage d'Horloge Mémoire GPU (-lmc)](#12-note-avancée--verrouillage-dhorloge-mémoire-gpu--lmc)
- [13. Alternatives Quand le Verrouillage d'Horloge n'Aide Pas](#13-alternatives-quand-le-verrouillage-dhorloge-naide-pas)
- [14. Dépannage](#14-dépannage)
- [15. Foire Aux Questions (FAQ)](#15-foire-aux-questions-faq)
- [16. Références Officielles](#16-références-officielles)

---

## Parcours Rapide pour Utilisateurs Expérimentés

Si vous savez déjà utiliser une Invite de commandes élevée et `nvidia-smi` :

1. Listez les GPU et confirmez votre index cible (`0` sur les systèmes mono-GPU) :
   ```bat
   nvidia-smi -L
   ```
2. Interrogez les horloges graphiques prises en charge sur ce GPU :
   ```bat
   nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
   ```
3. Verrouillez sur une horloge graphique **vérifiée et prise en charge** issue de la sortie (`1800` ci-dessous est uniquement un exemple illustratif) :
   ```bat
   nvidia-smi -i 0 -lgc 1800,1800
   ```
4. Vérifiez les horloges en direct pendant que Vonovox tourne :
   ```bat
   nvidia-smi -i 0 -q -d CLOCK
   ```
5. Effectuez un [test A/B dans Vonovox](#10-comment-tester-si-cela-aide-vraiment). Une fois terminé, ou s'il n'y a aucune amélioration, restaurez immédiatement les horloges dynamiques :
   ```bat
   nvidia-smi -i 0 -rgc
   ```

---

## 1. Qu'est-ce que le GPU Clock Locking (Introduction pour Débutants)

1. **Qu'est-ce qu'une fréquence GPU (vitesse d'horloge) :** À l'intérieur de votre carte graphique NVIDIA, le processeur principal (le cœur GPU) effectue des millions de petits calculs mathématiques chaque seconde. Sa **fréquence d'horloge** correspond au nombre de cycles de calcul effectués par seconde.
2. **Que signifie MHz :** **MHz** signifie **mégahertz** (1 million de cycles par seconde). Par exemple, `1500 MHz` représente 1,5 milliard de cycles par seconde, et `1800 MHz` représente 1,8 milliard de cycles par seconde.
3. **Comment fonctionnent les horloges dynamiques NVIDIA :** Les GPU NVIDIA modernes ne tournent pas à une vitesse fixe unique. Lorsque votre PC est inactif sur le bureau, le GPU descend à une faible vitesse (par exemple `210 MHz` ou `300 MHz`) pour économiser l'électricité, rester silencieux et rester frais. Lorsqu'une charge lourde commence, il augmente la vitesse.
4. **Qu'est-ce que NVIDIA GPU Boost :** **NVIDIA GPU Boost** est le système automatique intégré qui ajuste en permanence la fréquence de votre GPU à la hausse et à la baisse selon la charge de travail, la température, les limites de puissance et la marge de tension.
5. **Pourquoi les horloges fluctuent pendant Vonovox :** La conversion vocale en temps réel traite l'audio par fragments discrets (la durée exacte dépend de votre **Block Size** et de vos réglages audio) plutôt qu'en rendu 3D lourd et continu. Entre deux fragments, le GPU peut brièvement voir une faible charge et baisser son horloge, puis remonter au fragment suivant.
6. **Ce que signifie verrouiller une horloge :** **GPU Clock Locking** (`nvidia-smi -lgc`) indique au pilote NVIDIA de maintenir le cœur GPU dans une plage de fréquences prises en charge spécifique (ou à une seule fréquence prise en charge lorsque min et max sont égaux) au lieu de le laisser descendre et remonter sans cesse. Pensez au **régulateur de vitesse sur autoroute** : la voiture garde une allure régulière au lieu de ralentir puis réaccélérer sans arrêt.
7. **GPU Clock Locking vs Overclocking :**
   - **L'overclocking** pousse un GPU *au-delà* de ses limites d'usine ou modifie les tensions/courbes de puissance pour viser une vitesse de pointe plus élevée.
   - **Le GPU Clock Locking** choisit uniquement une fréquence que NVIDIA a déjà intégrée dans la table officielle des horloges prises en charge de votre carte. Il **n'augmente pas** la tension, ne débloque pas les limites de puissance et ne force pas de vitesses non prises en charge.
8. **Pourquoi une horloge stable peut aider l'audio temps réel :** Si votre GPU met `8 ms` pour traiter un bloc audio à haute fréquence et `18 ms` lorsqu'il baisse temporairement d'horloge, ce saut soudain peut provoquer des temps de traitement irréguliers. Maintenir une horloge prise en charge stable peut rendre les temps de traitement par bloc plus constants.
9. **Pourquoi l'horloge maximale n'est pas toujours la meilleure :** Tourner au MHz maximal pris en charge augmente la chaleur, le bruit des ventilateurs et la consommation. Si votre GPU atteint sa limite thermique ou de puissance, il appliquera automatiquement un **throttling** (réduira sa propre vitesse), créant pires saccades qu'une horloge modérée et régulière.

---

## 2. Comment les Horloges GPU Affectent Vonovox

Vonovox traite l'audio micro en direct via **CUDA** sur votre GPU NVIDIA. Chaque fragment audio (déterminé par **Block Size**) doit finir d'être traité avant l'arrivée du suivant.

- **GPU Delay et variance du temps de traitement :** Dans Vonovox, **GPU Delay** indique combien de temps le GPU met à convertir chaque fragment. Si les horloges GPU oscillent entre repos et boost, le GPU Delay peut grimper brusquement.
- **Craquements, clics et saccades audio :** Si ne serait-ce qu'un fragment audio arrive en retard parce que le GPU remontait encore son horloge, le tampon audio se vide et vous entendez un clic, un craquement ou un hachage robotique.
- **Buffer Size et Block Size :** Des valeurs plus élevées de **Block Size** donnent plus de marge au GPU au prix d'une latence globale supérieure. Des valeurs plus petites de **Block Size** paraissent plus réactives mais sont bien plus sensibles aux pics soudains de GPU Delay.
- **WASAPI et WASAPI Exclusive Mode :** **WASAPI** (Windows Audio Session API) gère le routage audio entre votre micro, Vonovox et votre câble virtuel. **WASAPI Exclusive Mode** (lorsqu'il est pris en charge par votre périphérique et appli) peut réduire la surcharge du mixeur Windows, tandis que le mode partagé offre une meilleure compatibilité. Aucun des deux ne corrige un GPU en retard, et le verrouillage d'horloge GPU ne corrige pas les désalignements de pilote audio Windows ou de fréquence d'échantillonnage.
- **Vonovox + jeu en simultané :** Lorsque vous jouez à un jeu 3D tout en utilisant Vonovox, les deux se partagent le même GPU. Si le jeu sature **95-100% du calcul GPU**, Vonovox attend son tour quel que soit le verrouillage d'horloge. Dans ce cas, baisser les graphismes/FPS du jeu ou augmenter le **Block Size** de Vonovox aide bien plus que verrouiller les horloges.
- **Problèmes GPU vs CPU ou pilote audio :** Les coupures audio peuvent aussi venir d'une surcharge CPU, de fréquences d'échantillonnage `48 kHz` désalignées, d'économie d'énergie USB sur le micro ou d'un câble virtuel mal configuré. Le GPU Clock Locking ne cible que les transitions de fréquence GPU.

| Bénéfices possibles (non garantis) | Ce que le GPU Clock Locking NE garantit PAS |
| --- | --- |
| Comportement d'horloge GPU plus prévisible lors de charges audio intermittentes | Vitesse globale de conversion vocale plus rapide |
| Moins de pics soudains de GPU Delay sur certaines configurations bureau/portable | Suppression de tous les craquements, clics ou coupures |
| Dépannage A/B plus simple pour isoler le jitter de latence | Meilleure qualité vocale, timbre ou justesse de hauteur |

---

## 3. Compatibilité NVIDIA et Messages d'Erreur

Avoir `nvidia-smi` installé **ne garantit pas** que `-lgc` (Lock Graphics Clocks) soit pris en charge sur votre combinaison matériel/pilote.

- **GPU GeForce de bureau :** De nombreuses cartes GeForce de bureau modernes prennent en charge `-lgc` avec des pilotes récents, bien que la granularité exacte et le comportement dépendent de l'architecture et de la version du pilote.
- **GPU NVIDIA de portable :** Beaucoup de portables restreignent le verrouillage d'horloge dans le firmware/BIOS, la gestion d'alimentation ou les chemins graphiques hybrides/Optimus. Même lorsque `-lgc` est accepté, les limites thermiques et de puissance du portable outrepassent souvent l'horloge demandée.
- **GPU Workstation / Datacenter (Quadro, RTX série A, Tesla, L4/T4) :** Prennent largement en charge les contrôles d'horloge `nvidia-smi` sur les pilotes entreprise/Studio standard.
- **Générations matérielles et pilotes anciens :** D'anciennes architectures (telles que Maxwell/Pascal ou anciens pilotes) peuvent renvoyer `Not Supported` pour `-lgc` ou `SUPPORTED_CLOCKS`. Ne supposez pas que toute carte GTX ou RTX prend en charge le verrouillage d'horloge.

### Messages courants et leur signification

| Message | Signification | Solution sûre |
| --- | --- | --- |
| `Not Supported` | Votre modèle de GPU, firmware de portable ou pilote actuel n'autorise pas `-lgc` ou les requêtes `SUPPORTED_CLOCKS`. | Ne forcez pas. Ignorez le verrouillage d'horloge et utilisez les [alternatives](#13-alternatives-quand-le-verrouillage-dhorloge-naide-pas). |
| `Insufficient Permissions` | L'Invite de commandes a été ouverte normalement au lieu d'**Exécuter en tant qu'administrateur**. | Fermez CMD, cherchez `cmd` dans Démarrer, clic droit sur **Invite de commandes** puis **Exécuter en tant qu'administrateur**. |
| `Invalid Argument` | Les valeurs MHz saisies sont invalides, mal formatées (`min,max`) ou hors des horloges prises en charge. | Exécutez `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` et choisissez une valeur exacte listée sous **Graphics**. |
| `NVIDIA-SMI has failed` | Le pilote NVIDIA ne répond pas, aucun GPU NVIDIA n'est actif ou la carte est en veille en mode hybride portable. | Vérifiez que le GPU NVIDIA est activé dans le Gestionnaire de périphériques et non désactivé par un mode éco/batterie. |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` n'est pas dans la variable `PATH` de Windows (fréquent sur certaines configurations). | Exécutez-le via son chemin complet (voir [Section 4](#4-configuration-débutant--windows-10-et-windows-11)) sans réinstaller les pilotes. |

---

## 4. Configuration Débutant : Windows 10 et Windows 11

Suivez ces étapes exactes si vous n'avez jamais utilisé l'Invite de commandes (`cmd`) :

1. **Vérifiez que vous avez un GPU NVIDIA :** Appuyez sur `Ctrl + Maj + Échap` pour ouvrir le **Gestionnaire des tâches**, cliquez sur **Performances** et cherchez un GPU **NVIDIA** dans la liste de gauche. (Si vous ne voyez qu'AMD ou Intel, ce guide ne s'applique pas à votre PC.)
2. **Ouvrez le menu Démarrer :** Appuyez sur la **touche Windows** du clavier (ou cliquez sur l'icône Démarrer dans la barre des tâches).
3. **Cherchez `cmd` :** Tapez `cmd` (n'appuyez pas encore sur Entrée).
4. **Exécutez en tant qu'administrateur :** Faites un clic droit sur **Invite de commandes** dans les résultats et cliquez sur **Exécuter en tant qu'administrateur**. Cliquez sur **Oui** si Windows demande l'autorisation.
5. **Comprenez ce que signifie exécuter une commande :** Une fenêtre noire s'ouvre avec un curseur clignotant. Taper une ligne de texte et appuyer sur **Entrée** demande à Windows d'exécuter cet outil et d'afficher le résultat dessous.
6. **Copiez et collez une commande :** Copiez une commande de ce guide, cliquez dans la fenêtre noire de l'Invite de commandes et faites un **clic droit** (ou `Ctrl + V`) pour la coller.
7. **Appuyez sur Entrée :** Attendez un instant que la sortie apparaisse.
8. **Vérifiez l'état de base du GPU :** Exécutez :
   ```bat
   nvidia-smi
   ```
   Vous devriez voir un tableau indiquant la version du pilote, le nom du GPU, la température, l'utilisation mémoire et la consommation.
9. **Identifiez le bon GPU sur les systèmes multi-GPU :** Si vous avez plus d'un GPU NVIDIA, exécutez :
   ```bat
   nvidia-smi -L
   ```
   Cela affiche une liste numérotée telle que `GPU 0: NVIDIA GeForce ...` et `GPU 1: ...`. Remplacez `0` dans `-i 0` par le numéro du GPU utilisé par Vonovox.

### Si `'nvidia-smi' is not recognized`

Vous **n'avez pas** besoin de réinstaller votre pilote NVIDIA. Windows ne sait simplement pas quel dossier contient `nvidia-smi.exe`. Essayez de l'exécuter depuis les dossiers Windows standard :

```bat
"C:\Windows\System32\nvidia-smi.exe"
```

Si cela indique introuvable, essayez l'ancien dossier NVIDIA :

```bat
"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
```

Quel que soit le chemin qui fonctionne, utilisez ce chemin à la place de `nvidia-smi` (ou laissez les [scripts BAT de la Section 9](#9-gestion-dhorloge-gpu-en-un-clic-scripts-bat) le trouver automatiquement).

---

## 5. Trouver les Horloges Prises en Charge de Votre GPU

Ne devinez jamais une fréquence. Demandez toujours d'abord à votre GPU sa liste officielle :

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

- **`-i 0`** : Sélectionne l'index GPU `0` (modifiez `0` si `nvidia-smi -L` a montré un autre index pour votre GPU cible).
- **`-q -d SUPPORTED_CLOCKS`** : Interroge la table officielle des fréquences **Memory** et **Graphics** prises en charge par votre GPU et votre pilote.

### Comment lire la sortie

La sortie regroupe les fréquences **Graphics** (cœur GPU) prises en charge sous les fréquences **Memory**, selon une présentation similaire à celle-ci :

```text
Supported Clocks
    Memory                        : XXXX MHz
        Graphics                  : YYYY MHz
        Graphics                  : ZZZZ MHz
```

- Les horloges **Memory** concernent la VRAM (mémoire vidéo). **Ne verrouillez pas les horloges mémoire** dans la procédure standard Vonovox.
- Les horloges **Graphics** sont les fréquences du **cœur GPU**. Ce sont ces valeurs que vous utilisez avec `-lgc`.
- **Confirmez que votre valeur est listée :** Ne choisissez qu'un nombre apparaissant mot pour mot à côté de `Graphics :` dans votre sortie.
- **S'il affiche `N/A` ou `Not Supported` :** Votre combinaison GPU/pilote n'expose pas les horloges prises en charge via NVML. N'essayez pas de forcer des nombres aléatoires ; passez aux [Alternatives](#13-alternatives-quand-le-verrouillage-dhorloge-naide-pas).

> **N'entrez PAS de valeurs élevées arbitraires (telles que `50000` MHz) :** Selon la documentation NVIDIA, certains appareils et pilotes peuvent caler ou arrondir une horloge demandée à la fréquence prise en charge la plus proche, tandis que des requêtes hors plage peuvent échouer avec `Invalid Argument` ou être purement rejetées. N'entrez jamais de nombres arbitraires en comptant sur l'arrondi du pilote. Utilisez toujours une valeur `Graphics` exacte affichée par `SUPPORTED_CLOCKS`.

---

## 6. Choisir une Fréquence Appropriée

Il **n'existe pas un seul "meilleur MHz"** pour tous les modèles de GPU, boîtiers PC ou températures ambiantes. Suivez cette démarche sûre :

1. **Observez d'abord les horloges normales de votre GPU :** Ouvrez Vonovox, lancez la conversion en direct et exécutez `nvidia-smi -i 0 -q -d CLOCK` dans CMD pour voir quels MHz Graphics votre carte utilise naturellement.
2. **Consultez `SUPPORTED_CLOCKS` :** Choisissez une valeur dans votre liste `Graphics` qui se situe confortablement autour ou légèrement sous votre plage boost habituelle.
3. **Ne choisissez pas automatiquement le maximum :** La fréquence la plus élevée consomme le plus d'énergie et génère le plus de chaleur. Une horloge prise en charge légèrement inférieure reste souvent plus fraîche et évite le throttling.
4. **Surveillez températures et consommation :** Gardez un œil sur `nvidia-smi` pendant les tests. Si les températures montent vite ou si les ventilateurs tournent à fond, choisissez une horloge prise en charge plus basse.
5. **Vérifiez le throttling thermique ou de puissance :** Exécutez `nvidia-smi -i 0 -q -d PERFORMANCE` sous charge pour voir si `SW Thermal Slowdown` ou `HW Thermal Slowdown` passe à `Active`.
6. **Testez 2-3 valeurs prises en charge si besoin :** Comparez-les avec le [test A/B](#10-comment-tester-si-cela-aide-vraiment).
7. **Ne le gardez que si cela aide :** Si vous ne constatez pas un **GPU Delay** mesurablement plus stable ou un audio plus propre, réinitialisez par défaut.

---

## 7. Appliquer le Verrouillage d'Horloge GPU

Pour verrouiller l'horloge du cœur GPU, utilisez `-lgc min,max`.

> **Exemple illustratif uniquement :** Dans les commandes ci-dessous, `1800` MHz est **purement une valeur de démonstration**. Remplacez `1800` par une fréquence `Graphics` exacte issue de **votre propre** sortie `SUPPORTED_CLOCKS`.

**Verrouiller sur une seule horloge prise en charge (min et max égaux) :**

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

- **`-i 0`** : Index GPU cible `0`.
- **`-lgc`** : Lock Graphics Clocks.
- **`1800,1800`** : Horloge graphique minimale et maximale en MHz (séparées par une virgule, sans espace).

**Exemple avec une plage (min et max différents) :**

```bat
nvidia-smi -i 0 -lgc 1500,1800
```

Cela permet à NVIDIA GPU Boost de se déplacer entre deux fréquences prises en charge (`1500` et `1800` MHz dans cet exemple illustratif) tout en empêchant la carte de tomber en horloges de repos profond entre les fragments audio.

### Vérifier que le verrouillage a été accepté vs réellement observé

Il est important de distinguer :
- **Fréquence demandée :** La valeur en MHz passée à `-lgc`.
- **Plage configurée (`min,max`) :** Les bornes acceptées par le pilote (notez que certains pilotes/appareils peuvent caler sur l'horloge prise en charge la plus proche).
- **Fréquence réellement observée :** L'horloge réelle à laquelle votre GPU tourne sous charge.

Après avoir exécuté `-lgc`, CMD confirme seulement que le pilote a accepté la requête. L'acceptation **ne garantit pas** que le GPU restera bloqué à ce MHz exact. Pour vérifier **l'horloge en direct réellement observée** pendant que Vonovox convertit l'audio, exécutez :

```bat
nvidia-smi -i 0 -q -d CLOCK
```

Ou observez la mise à jour chaque seconde (appuyez sur `Ctrl + C` pour arrêter) :

```bat
nvidia-smi -i 0 -q -d CLOCK -l 1
```

Regardez **Clocks → Graphics** dans la sortie. **Les limites thermiques, limites de puissance et restrictions du pilote ou du firmware de portable** peuvent toujours empêcher le GPU de tenir le MHz exact demandé, et `-lgc` ne maintient pas toujours une fréquence parfaitement fixe dans toutes les conditions.

---

## 8. Restaurer les Paramètres par Défaut

Restaurez toujours la gestion dynamique des horloges lorsque vous avez fini de tester, quand vous fermez Vonovox ou si vous ne voyez aucun avantage (remplacez `0` par l'index GPU configuré si vous avez plusieurs GPU) :

```bat
nvidia-smi -i 0 -rgc
```

- **Ce que cela fait :** `-rgc` (**Reset Graphics Clocks**) supprime le verrouillage d'horloge et rend le contrôle à NVIDIA GPU Boost.
- **Pourquoi restaurer les valeurs par défaut :** Les horloges dynamiques gardent votre GPU plus frais, plus silencieux et plus économe lors de l'usage normal du bureau, de la lecture vidéo et des jeux.
- **Comment vérifier la restauration :** Exécutez `nvidia-smi -i 0 -q -d CLOCK` au repos sur le bureau ; après quelques secondes, l'horloge **Graphics** doit redescendre vers les basses vitesses d'inactivité.
- **Redémarrages et réinitialisations du pilote :** `nvidia-smi -lgc` **n'est pas permanent**. Redémarrer Windows ou redémarrer le pilote graphique réinitialise normalement les horloges par défaut automatiquement.
- **Si `-rgc` renvoie une erreur :** `-rgc` n'est pas garanti de réussir si le pilote NVIDIA lui-même est en état d'erreur. Assurez-vous que CMD tourne **en tant qu'administrateur**, vérifiez que l'index `-i` correspond à `nvidia-smi -L`, ou **redémarrez Windows** pour restaurer les horloges dynamiques.

---

## 9. Gestion d'Horloge GPU en un Clic (Scripts BAT)

Ces deux scripts Windows `.bat` utilisent PowerShell intégré à Windows (aucun logiciel externe requis) pour automatiser le processus sûr ci-dessus :

- **Ce que font les scripts :** `Lock-GPU-Clocks.bat` verrouille temporairement **uniquement** l'horloge **Graphics** du cœur de votre GPU NVIDIA jusqu'à réinitialisation ou redémarrage. `Reset-GPU-Clocks.bat` retire ce verrouillage et rend le contrôle à NVIDIA GPU Boost.
- **Aucun changement risqué :** Aucun des deux scripts n'overclocke, ne touche aux tensions, ne modifie les limites de puissance, ne désactive les protections Windows ni ne fait de modifications système permanentes.
- **Validation stricte des entrées et fréquences :** `Lock-GPU-Clocks.bat` vérifie les privilèges administrateur indépendamment du service Windows `Server`, vérifie que l'index GPU choisi existe dans `nvidia-smi -L`, analyse **uniquement** les horloges `Graphics` de `SUPPORTED_CLOCKS` (en ignorant les horloges `Memory`), rejette les nombres arbitraires ou non vérifiés (comme `50000`) et ne sélectionne **jamais** automatiquement l'horloge maximale.
- **Gestion sûre des erreurs :** Si `-lgc` échoue, le script **n'exécute pas** `-rgc` automatiquement, affiche le code de sortie NVIDIA et vous indique comment inspecter vos horloges actuelles avant de poursuivre. Il utilise également la télémétrie structurée `nvidia-smi --query-gpu=clocks.gr` pour distinguer l'acceptation du pilote de l'horloge réellement observée.

### Lock-GPU-Clocks.bat

<details>
<summary><strong>Cliquez pour déplier et afficher le code complet de Lock-GPU-Clocks.bat</strong></summary>

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Lock NVIDIA GPU Clocks
set "BAT_PATH=%~f0"
powershell.exe -NoProfile -Command "$code = (Get-Content -LiteralPath $env:BAT_PATH | Where-Object { $_ -match '^::PS ' } | ForEach-Object { $_.Substring(5) }) -join [Environment]::NewLine; & ([ScriptBlock]::Create($code)); exit $LASTEXITCODE"
set "EXIT_CODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXIT_CODE%

::PS Write-Host '============================================================'
::PS Write-Host '  Vonovox Optional Helper: Lock NVIDIA GPU Core Clocks'
::PS Write-Host '  No overclocking, no voltage changes, temporary until reboot'
::PS Write-Host '============================================================'
::PS Write-Host ''
::PS
::PS $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
::PS if (-not $isAdmin) {
::PS     Write-Host '[ERROR] Administrator privileges are required.'
::PS     Write-Host 'How to fix: Right-click Lock-GPU-Clocks.bat and choose "Run as administrator".'
::PS     exit 1
::PS }
::PS
::PS $nvsmi = $null
::PS $cmd = Get-Command nvidia-smi -ErrorAction SilentlyContinue
::PS if ($cmd) { $nvsmi = $cmd.Source }
::PS elseif (Test-Path -LiteralPath 'C:\Windows\System32\nvidia-smi.exe') { $nvsmi = 'C:\Windows\System32\nvidia-smi.exe' }
::PS elseif (Test-Path -LiteralPath 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe') { $nvsmi = 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe' }
::PS if (-not $nvsmi) {
::PS     Write-Host '[ERROR] nvidia-smi.exe was not found on this system.'
::PS     Write-Host 'Make sure you have an NVIDIA GPU with official drivers installed.'
::PS     exit 1
::PS }
::PS
::PS $gpuList = & $nvsmi -L 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host '[ERROR] Could not query NVIDIA GPUs:'
::PS     $gpuList | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $validGpus = [System.Collections.Generic.HashSet[string]]::new()
::PS Write-Host 'Detected NVIDIA GPUs:'
::PS foreach ($line in $gpuList) {
::PS     Write-Host "  $line"
::PS     if ($line -match '^GPU\s+(\d+)\s*:') { [void]$validGpus.Add($Matches[1]) }
::PS }
::PS if ($validGpus.Count -eq 0) {
::PS     Write-Host '[ERROR] No valid NVIDIA GPU indices were detected. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS $defaultGpu = if ($validGpus.Contains('0') -and $validGpus.Count -eq 1) { '0' } else { $null }
::PS $gpuPrompt = if ($defaultGpu) { 'Enter GPU index to configure [default: 0]' } else { 'Enter GPU index to configure (e.g. 0)' }
::PS $gpuId = (Read-Host $gpuPrompt).Trim()
::PS if ([string]::IsNullOrWhiteSpace($gpuId) -and $defaultGpu) { $gpuId = $defaultGpu }
::PS if (($gpuId -notmatch '^\d+$') -or (-not $validGpus.Contains($gpuId))) {
::PS     Write-Host '[ERROR] Invalid or non-existent GPU index. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Querying official supported Graphics clocks for GPU $gpuId..."
::PS $supOut = & $nvsmi -i $gpuId -q -d SUPPORTED_CLOCKS 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[STOPPED] Supported Graphics clocks could not be verified on this GPU (exit code $LASTEXITCODE). This does not necessarily mean GPU Clock Locking is unsupported. No changes were made."
::PS     $supOut | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $graphicsClocks = New-Object 'System.Collections.Generic.SortedSet[int]'
::PS foreach ($line in $supOut) {
::PS     if ($line -match '^\s*Graphics\s*:\s*(\d+)\s*MHz\s*$') {
::PS         [void]$graphicsClocks.Add([int]$Matches[1])
::PS     }
::PS }
::PS if ($graphicsClocks.Count -eq 0) {
::PS     Write-Host '[STOPPED] Supported Graphics clocks could not be verified on this GPU. This does not necessarily mean GPU Clock Locking is unsupported. No changes were made.'
::PS     Write-Host 'Possible reasons: driver does not expose the clock table, unrecognized output format, query unsupported, or GPU-specific limitations.'
::PS     exit 1
::PS }
::PS
::PS Write-Host '------------------------------------------------------------'
::PS Write-Host "Verified supported Graphics clocks (MHz) for GPU ${gpuId}:"
::PS Write-Host ('  ' + ($graphicsClocks -join ', '))
::PS Write-Host '------------------------------------------------------------'
::PS Write-Host 'IMPORTANT:'
::PS Write-Host ' - Enter ONLY one exact number from the Graphics list above.'
::PS Write-Host ' - Do NOT pick the highest value blindly; test moderate clocks first.'
::PS Write-Host ' - Arbitrary values (like 50000) will be rejected.'
::PS Write-Host ''
::PS
::PS $targetRaw = (Read-Host 'Enter a supported Graphics clock in MHz (or press Enter to cancel)').Trim()
::PS if ([string]::IsNullOrWhiteSpace($targetRaw)) {
::PS     Write-Host 'Cancelled. No changes were made.'
::PS     exit 0
::PS }
::PS
::PS [int]$targetMhz = 0
::PS if (($targetRaw -notmatch '^\d+$') -or (-not [int]::TryParse($targetRaw, [ref]$targetMhz)) -or ($targetMhz -le 0) -or (-not $graphicsClocks.Contains($targetMhz))) {
::PS     Write-Host '[ERROR] Invalid or unsupported Graphics clock value. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Applying temporary Graphics clock lock ($targetMhz,$targetMhz MHz) to GPU $gpuId..."
::PS $lgcOut = & $nvsmi -i $gpuId -lgc "$targetMhz,$targetMhz" 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[ERROR] nvidia-smi -lgc failed for GPU $gpuId (exit code $LASTEXITCODE):"
::PS     $lgcOut | ForEach-Object { Write-Host $_ }
::PS     Write-Host 'No automatic reset was performed. Check your current GPU clock configuration before proceeding.'
::PS     Write-Host "Check current clock: nvidia-smi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits"
::PS     Write-Host "Manual reset command: nvidia-smi -i $gpuId -rgc"
::PS     exit 1
::PS }
::PS
::PS Write-Host "[ACCEPTED] Driver accepted -lgc $targetMhz,$targetMhz on GPU $gpuId."
::PS $obsOut = (& $nvsmi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits 2>&1 | Out-String).Trim()
::PS [int]$obsMhz = 0
::PS if (($LASTEXITCODE -eq 0) -and ($obsOut -match '^\d+$') -and ([int]::TryParse($obsOut, [ref]$obsMhz)) -and ($obsMhz -gt 0)) {
::PS     Write-Host "Actually observed Graphics clock right now: $obsMhz MHz"
::PS } else {
::PS     Write-Host "[INFO] Command was accepted, but live clock telemetry could not be verified (returned: '$obsOut')."
::PS }
::PS Write-Host 'Note: Thermal, power, or firmware limits can still affect live clocks under load.'
::PS Write-Host "When finished, run Reset-GPU-Clocks.bat or: nvidia-smi -i $gpuId -rgc"
::PS exit 0
```

</details>

### Reset-GPU-Clocks.bat

<details>
<summary><strong>Cliquez pour déplier et afficher le code complet de Reset-GPU-Clocks.bat</strong></summary>

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Reset NVIDIA GPU Clocks
set "BAT_PATH=%~f0"
powershell.exe -NoProfile -Command "$code = (Get-Content -LiteralPath $env:BAT_PATH | Where-Object { $_ -match '^::PS ' } | ForEach-Object { $_.Substring(5) }) -join [Environment]::NewLine; & ([ScriptBlock]::Create($code)); exit $LASTEXITCODE"
set "EXIT_CODE=%ERRORLEVEL%"
echo.
pause
exit /b %EXIT_CODE%

::PS Write-Host '============================================================'
::PS Write-Host '  Vonovox Optional Helper: Reset NVIDIA GPU Clocks to Default'
::PS Write-Host '============================================================'
::PS Write-Host ''
::PS
::PS $isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
::PS if (-not $isAdmin) {
::PS     Write-Host '[ERROR] Administrator privileges are required.'
::PS     Write-Host 'How to fix: Right-click Reset-GPU-Clocks.bat and choose "Run as administrator".'
::PS     exit 1
::PS }
::PS
::PS $nvsmi = $null
::PS $cmd = Get-Command nvidia-smi -ErrorAction SilentlyContinue
::PS if ($cmd) { $nvsmi = $cmd.Source }
::PS elseif (Test-Path -LiteralPath 'C:\Windows\System32\nvidia-smi.exe') { $nvsmi = 'C:\Windows\System32\nvidia-smi.exe' }
::PS elseif (Test-Path -LiteralPath 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe') { $nvsmi = 'C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe' }
::PS if (-not $nvsmi) {
::PS     Write-Host '[ERROR] nvidia-smi.exe was not found on this system.'
::PS     exit 1
::PS }
::PS
::PS $gpuList = & $nvsmi -L 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host '[ERROR] Could not query NVIDIA GPUs:'
::PS     $gpuList | ForEach-Object { Write-Host $_ }
::PS     exit 1
::PS }
::PS
::PS $validGpus = [System.Collections.Generic.HashSet[string]]::new()
::PS Write-Host 'Detected NVIDIA GPUs:'
::PS foreach ($line in $gpuList) {
::PS     Write-Host "  $line"
::PS     if ($line -match '^GPU\s+(\d+)\s*:') { [void]$validGpus.Add($Matches[1]) }
::PS }
::PS if ($validGpus.Count -eq 0) {
::PS     Write-Host '[ERROR] No valid NVIDIA GPU indices were detected.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS $defaultGpu = if ($validGpus.Contains('0') -and $validGpus.Count -eq 1) { '0' } else { $null }
::PS $gpuPrompt = if ($defaultGpu) { 'Enter GPU index to reset [default: 0]' } else { 'Enter GPU index to reset (e.g. 0)' }
::PS $gpuId = (Read-Host $gpuPrompt).Trim()
::PS if ([string]::IsNullOrWhiteSpace($gpuId) -and $defaultGpu) { $gpuId = $defaultGpu }
::PS if (($gpuId -notmatch '^\d+$') -or (-not $validGpus.Contains($gpuId))) {
::PS     Write-Host '[ERROR] Invalid or non-existent GPU index. No changes were made.'
::PS     exit 1
::PS }
::PS
::PS Write-Host ''
::PS Write-Host "Restoring dynamic GPU clocks on GPU $gpuId..."
::PS $rgcOut = & $nvsmi -i $gpuId -rgc 2>&1
::PS if ($LASTEXITCODE -ne 0) {
::PS     Write-Host "[ERROR] nvidia-smi -rgc failed for GPU $gpuId (exit code $LASTEXITCODE):"
::PS     $rgcOut | ForEach-Object { Write-Host $_ }
::PS     Write-Host 'If the driver is unresponsive, reboot Windows to restore default dynamic clocks.'
::PS     exit 1
::PS }
::PS
::PS Write-Host "[DONE] Reset command accepted for GPU $gpuId."
::PS $obsOut = (& $nvsmi -i $gpuId --query-gpu=clocks.gr --format=csv,noheader,nounits 2>&1 | Out-String).Trim()
::PS [int]$obsMhz = 0
::PS if (($LASTEXITCODE -eq 0) -and ($obsOut -match '^\d+$') -and ([int]::TryParse($obsOut, [ref]$obsMhz)) -and ($obsMhz -gt 0)) {
::PS     Write-Host "Actually observed Graphics clock right now: $obsMhz MHz"
::PS } else {
::PS     Write-Host "[INFO] Reset was accepted, but live clock telemetry could not be verified (returned: '$obsOut')."
::PS }
::PS Write-Host 'Dynamic clock management is active; clocks should drop to idle when unloaded.'
::PS exit 0
```

</details>

### Comment créer et exécuter les fichiers `.bat` en toute sécurité

1. Ouvrez le **Bloc-notes** (cherchez `notepad` dans le menu Démarrer).
2. Copiez l'un des scripts complets ci-dessus et collez-le dans le Bloc-notes.
3. Cliquez sur **Fichier → Enregistrer sous...**.
4. En bas, changez **Type** de `Documents texte (*.txt)` à **Tous les fichiers (`*.*`)**.
5. Nommez le fichier `Lock-GPU-Clocks.bat` (ou `Reset-GPU-Clocks.bat`) et enregistrez-le dans un dossier facile à retrouver comme votre Bureau. *(Passer **Type** sur **Tous les fichiers** évite que Windows ne le nomme par erreur `Lock-GPU-Clocks.bat.txt`.)*
6. Faites un clic droit sur le fichier `.bat` enregistré et sélectionnez **Exécuter en tant qu'administrateur**.
7. Lisez attentivement la sortie :
   - `[ACCEPTED]` / `[DONE]` signifie que `nvidia-smi` a accepté la commande et affiche l'horloge Graphics **observée** juste après.
   - `[ERROR]` ou `[STOPPED]` explique ce qui a échoué et confirme qu'aucune horloge non vérifiée n'a été appliquée. Si votre GPU affiche `Not Supported` ou ne peut pas être analysé, ignorez cette optimisation.

---

## 10. Comment Tester si Cela Aide Vraiment

Ne supposez pas que le verrouillage d'horloge a aidé simplement parce que vous voyez un chiffre MHz plus élevé. Une fréquence plus élevée ne signifie **pas** automatiquement de meilleures performances audio. Effectuez une **comparaison A/B** structurée sur votre propre PC :

- **Vérification préliminaire (optionnelle, 3-5 minutes) :** Contrôle rapide pour vérifier que l'horloge verrouillée reste fraîche et ne déclenche pas de coupures audio.
- **Benchmark A/B complet (recommandé, au moins 10-15 minutes par passe) :**
  1. **Restaurez les horloges par défaut** (`nvidia-smi -i 0 -rgc`, en remplaçant `0` par votre index GPU).
  2. **Lancez Vonovox** et laissez votre système et la charge en arrière-plan se stabiliser une minute.
  3. **Exécutez le Test A (Horloges GPU par Défaut)** pendant au moins **10-15 minutes** et notez toutes les mesures ci-dessous.
  4. **Appliquez une horloge Graphics vérifiée et prise en charge** (`Lock-GPU-Clocks.bat` ou `-lgc`).
  5. **Exécutez le Test B (Horloges GPU Verrouillées)** pendant au moins **10-15 minutes** exactement dans les mêmes conditions.
  6. **Comparez Test A vs Test B** à l'aide du tableau ci-dessous.
  7. **Répétez le test** si les résultats sont proches ou peu concluants.
  8. **Restaurez les horloges par défaut** (`-rgc`) une fois terminé ou dès qu'aucun gain clair n'apparaît.

**Gardez tous ces éléments identiques entre Test A et Test B :**

- Modèle vocal RVC
- F0 Method
- Block Size
- Périphériques audio d'entrée, de sortie et de monitoring
- Backend audio (par ex. WASAPI partagé / exclusif)
- Charges GPU concurrentes (même jeu ouvert ou même bureau au repos) et conditions de fonctionnement

### Tableau comparatif à remplir

| Mesure à noter | Test A : Horloges par Défaut (10-15 min) | Test B : Horloges Verrouillées (10-15 min) |
| --- | --- | --- |
| **GPU Delay** moyen (ms) | `____ ms` | `____ ms` |
| Pics de **GPU Delay** (maximum observé) | `____ ms` | `____ ms` |
| Variabilité du temps de traitement (stable vs saccadé) | `____________` | `____________` |
| Craquements / coupures audio | `Oui / Non (nombre)` | `Oui / Non (nombre)` |
| Température GPU (°C) | `____ °C` | `____ °C` |
| Consommation GPU (W) | `____ W` | `____ W` |
| Horloge Graphics réellement observée (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| État de throttling (`-q -d PERFORMANCE`) | `Aucun / Thermique / Puissance` | `Aucun / Thermique / Puissance` |

### Interpréter vos résultats

- **Gardez-le** uniquement si le Test B montre un **GPU Delay** mesurablement plus stable et moins de coupures audio *sans* surchauffe ni throttling.
- **Restaurez les réglages par défaut (`nvidia-smi -i 0 -rgc`)** si le Test B semble identique, chauffe plus sans réel gain audio ou donne de moins bons résultats.

---

## 11. Risques, Limitations et Précautions

Verrouiller dans les horloges prises en charge par NVIDIA **n'est pas** de l'overclocking, mais comporte tout de même des compromis :

- **Températures et bruit de ventilateur plus élevés :** Maintenir des horloges plus hautes au repos ou sous faible charge génère davantage de chaleur et fait tourner les ventilateurs plus vite.
- **Consommation accrue et autonomie réduite sur portable :** Une horloge graphique verrouillée peut limiter ou réduire la fréquence à laquelle votre GPU passe en états d'inactivité basse consommation, augmentant la consommation au repos et vidant plus vite la batterie.
- **Throttling thermique ou de puissance :** Si une horloge verrouillée sollicite trop votre refroidissement ou budget d'alimentation, le GPU se bridera de toute façon, causant parfois de pires saccades.
- **Compatibilité limitée et conflits avec des outils tiers :** Des outils comme MSI Afterburner, Armoury Crate ou les centres de contrôle OEM peuvent écraser ou entrer en conflit avec les réglages `nvidia-smi`.
- **Ne modifiez pas le BIOS, les tensions ou les protections thermiques :** Ne flashez jamais de VBIOS personnalisé, ne désactivez jamais les limites thermiques et ne forcez pas de surtension pour la conversion vocale.

---

## 12. Note Avancée : Verrouillage d'Horloge Mémoire GPU (`-lmc`)

`nvidia-smi` propose également des commandes d'horloge mémoire :

```bat
nvidia-smi -i 0 -lmc <min,max>
nvidia-smi -i 0 -rmc
```

`-lmc` verrouille la **fréquence VRAM (mémoire)**, alors que `-lgc` verrouille la **fréquence du cœur GPU (graphique)**. Le verrouillage d'horloge mémoire **ne fait pas** partie du workflow standard Vonovox car les preuves sont insuffisantes pour montrer que verrouiller la VRAM améliore l'audio RVC en direct, et maintenir la VRAM en haute fréquence augmente en permanence la chaleur et la consommation au repos.

---

## 13. Alternatives Quand le Verrouillage d'Horloge n'Aide Pas

Si `-lgc` renvoie `Not Supported` ou n'améliore pas votre audio, essayez ces étapes plus sûres et souvent plus efficaces :

1. **Panneau de configuration NVIDIA → Mode de gestion de l'alimentation :** Réglez **Mode de gestion de l'alimentation** sur **Privilégier les performances maximales** pour l'exécutable Vonovox (`Gérer les paramètres 3D → Paramètres de programme`). Note : ce n'est **pas** la même chose que `-lgc` et cela ne garantit pas des horloges fixes sur toutes les charges CUDA, mais peut réduire la baisse agressive d'horloge sur certains systèmes.
2. **Vérifiez que Vonovox utilise votre GPU NVIDIA :** Sur les portables à carte hybride, assurez-vous que Vonovox tourne sur le GPU NVIDIA plutôt que sur la puce intégrée.
3. **Ajustez Block Size dans Vonovox :** Augmenter **Block Size** d'un cran est le moyen le plus fiable d'éliminer les craquements lorsque le GPU est occupé.
4. **Alignez les formats audio `48 kHz` et WASAPI :** Suivez [Router et régler Vonovox](live-audio.md) pour aligner les fréquences d'échantillonnage et éviter le double monitoring.
5. **Réduisez les charges GPU concurrentes :** Limitez les FPS en jeu ou baissez les réglages GPU lourds lorsque Vonovox tourne en même temps qu'un jeu.
6. **Vérifiez pilotes et refroidissement :** Mettez à jour vers un pilote Studio/Game Ready propre et dépoussiérez les aérations du PC/portable en cas de throttling thermique.

---

## 14. Dépannage

| Symptôme | Cause possible | Solution recommandée |
| --- | --- | --- |
| `'nvidia-smi' is not recognized` | `nvidia-smi.exe` n'est pas dans `PATH`. | Exécutez `"C:\Windows\System32\nvidia-smi.exe"` ou `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"`, ou utilisez les scripts `.bat` ci-dessus. |
| NVIDIA ne détecte aucun GPU / `NVIDIA-SMI has failed` | Aucun GPU NVIDIA présent, GPU désactivé ou GPU hybride de portable en veille. | Vérifiez **Gestionnaire des tâches → Performances**, activez l'adaptateur NVIDIA dans Gestionnaire de périphériques et branchez le secteur du portable. |
| `Insufficient Permissions` | CMD n'a pas été ouvert en tant qu'Administrateur. | Clic droit sur **Invite de commandes** (ou le fichier `.bat`) puis **Exécuter en tant qu'administrateur**. |
| `Not Supported` lors de `-lgc` | L'architecture GPU, le firmware du portable ou le pilote n'autorise pas le verrouillage d'horloge. | Laissez les horloges par défaut et utilisez les [Alternatives](#13-alternatives-quand-le-verrouillage-dhorloge-naide-pas). |
| `Invalid Argument` | Erreur de syntaxe ou fréquence hors des horloges prises en charge. | Exécutez `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS` et saisissez une valeur `Graphics` exacte au format `min,max`. |
| L'horloge affichée ne correspond pas au MHz demandé | Limite de puissance, limite thermique ou contrainte pilote plafonne le GPU. | Testez une horloge prise en charge légèrement plus basse ou vérifiez `nvidia-smi -i 0 -q -d PERFORMANCE`. |
| L'horloge chute sous charge | Throttling thermique ou limite de puissance du portable atteinte. | Baissez l'horloge verrouillée, améliorez le refroidissement ou restaurez par défaut avec `-rgc`. |
| Les températures montent trop | Horloge élevée verrouillée en continu sans refroidissement suffisant. | Exécutez `nvidia-smi -i 0 -rgc` immédiatement et utilisez une horloge plus basse ou le mode dynamique par défaut. |
| Vonovox ne montre aucune amélioration | Le goulot est Block Size, CPU, WASAPI ou saturation globale du GPU, pas la variation d'horloge. | Exécutez `nvidia-smi -i 0 -rgc` et réglez **Block Size** et le routage audio dans [Router et régler Vonovox](live-audio.md). |
| Vonovox empire après verrouillage | Horloge verrouillée trop basse pour la charge ou trop haute (causant du throttling thermique). | Exécutez `nvidia-smi -i 0 -rgc` pour restaurer les horloges dynamiques, puis testez une autre valeur compatible ou restez par défaut. |
| Le GPU réagit différemment avec un jeu ouvert | Le jeu consomme l'essentiel du budget calcul/puissance du GPU. | Limitez les FPS du jeu, baissez les options GPU lourdes ou augmentez **Block Size** dans Vonovox. |
| La commande de réinitialisation (`-rgc`) échoue | Droits administrateur manquants, mauvais index `-i` ou bug du pilote. | Exécutez CMD en administrateur avec le bon index `-i`, ou redémarrez Windows. |
| Incertain sur la valeur MHz à choisir | Vous n'avez pas encore vérifié les horloges de base sous charge. | Exécutez `nvidia-smi -i 0 -q -d CLOCK` en utilisant Vonovox normalement, puis choisissez une valeur compatible proche de cette plage. |
| Le portable limite automatiquement les horloges | Profil d'alimentation OEM / batterie / plafond firmware du portable. | Branchez le chargeur, passez en mode OEM Équilibré/Performance ou ajustez **Block Size** plutôt que `-lgc`. |

---

## 15. Foire Aux Questions (FAQ)

1. **Le GPU Clock Locking est-il sûr ?**
   Oui, lorsque vous n'utilisez que des fréquences officielles de `SUPPORTED_CLOCKS` et surveillez les températures. Cela ne modifie pas les tensions et ne contourne pas les protections thermiques matérielles.
2. **Est-ce de l'overclocking ?**
   Non. L'overclocking pousse le matériel au-delà des limites d'usine. Le verrouillage d'horloge sélectionne uniquement des fréquences déjà définies par NVIDIA dans la table prise en charge de votre carte.
3. **Cela augmentera-t-il mes FPS en jeu ?**
   En général non, et ce n'est pas fait pour cela. Si une horloge verrouillée est inférieure à votre horloge boost normale, les FPS en jeu peuvent même baisser légèrement.
4. **Cela améliorera-t-il la qualité vocale de Vonovox ?**
   Non. La qualité vocale dépend de votre modèle, micro, extracteur de hauteur/F0 et routage audio, pas du verrouillage d'horloge GPU.
5. **Cela réduira-t-il la latence ?**
   Cela ne réduit pas la latence minimale sous ce que votre GPU peut déjà calculer, bien que cela puisse réduire des **pics soudains de latence** dus aux variations d'horloge sur certaines configurations.
6. **Cela fonctionne-t-il sur ordinateur portable ?**
   Parfois, mais beaucoup de portables restreignent `-lgc` dans le firmware ou atteignent vite les limites thermiques/de puissance. Gardez toujours le portable branché sur secteur lors des tests.
7. **Cela fonctionne-t-il sur tous les GPU NVIDIA ?**
   Non. La prise en charge dépend de la génération du GPU, du firmware carte/portable et de la version du pilote.
8. **Dois-je toujours choisir l'horloge maximale ?**
   Non. Les horloges maximales créent un maximum de chaleur et de bruit et peuvent déclencher du thermal throttling. Des horloges prises en charge modérées sont souvent plus stables.
9. **Puis-je utiliser `50000` MHz ?**
   Non. N'entrez jamais de nombres arbitraires. Des valeurs hors plage peuvent échouer avec `Invalid Argument` et ne sont pas garanties d'être bornées de manière sûre.
10. **Cela fonctionne-t-il avec les GPU RTX ?**
    De nombreuses cartes RTX de bureau prennent en charge `-lgc` sur les pilotes modernes, tandis que certains portables ou configurations spécifiques peuvent renvoyer `Not Supported`. Testez d'abord avec `SUPPORTED_CLOCKS`.
11. **Dois-je l'appliquer à chaque fois ?**
    Oui, si vous décidez de continuer à l'utiliser, car les verrouillages d'horloge `nvidia-smi` sont réinitialisés au redémarrage du PC ou du pilote.
12. **Les réglages survivent-ils à un redémarrage ?**
    Non. Redémarrer Windows efface automatiquement `-lgc` et remet votre GPU en horloges dynamiques normales.
13. **Puis-je utiliser Vonovox en jouant ?**
    Oui, à condition que votre GPU ait assez de marge pour les deux. Si le jeu atteint 95-100% de charge GPU, limitez les FPS ou augmentez **Block Size** dans Vonovox.
14. **Que se passe-t-il si mon GPU surchauffe ?**
    La protection thermique matérielle de NVIDIA bridera automatiquement la carte (ou l'éteindra dans les cas extrêmes). Si les températures montent trop haut, exécutez immédiatement `nvidia-smi -i 0 -rgc`.
15. **Comment tout remettre à la normale ?**
    Exécutez `nvidia-smi -i 0 -rgc` en tant qu'Administrateur, lancez `Reset-GPU-Clocks.bat` ou redémarrez Windows.
16. **Dois-je aussi verrouiller l'horloge VRAM (`-lmc`) ?**
    Non. Il n'existe aucune preuve solide que verrouiller les horloges mémoire aide Vonovox, et cela augmente la chaleur et la consommation au repos.
17. **Que faire si je vois `Not Supported` ?**
    Ignorez complètement le GPU Clock Locking et utilisez les [Alternatives](#13-alternatives-quand-le-verrouillage-dhorloge-naide-pas) plus sûres telles que le réglage de **Block Size** et les paramètres d'alimentation du Panneau de configuration NVIDIA.

---

## 16. Références Officielles

- [Documentation NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [Référence API NVIDIA NVML : Commandes de Périphérique](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [Bonnes Pratiques de Benchmarking et Verrouillage d'Horloges NVIDIA TensorRT](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Dépôt du Projet Vonovox](https://github.com/dr87/Vonovox)
