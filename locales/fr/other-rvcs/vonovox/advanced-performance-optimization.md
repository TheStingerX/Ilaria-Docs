---
label: "Optimisation avancée des performances"
icon: ":zap:"
order: 97
permalink: /ilaria-rvc/vonovox/advanced-performance-optimization/
description: "Guide facultatif de verrouillage d'horloge GPU NVIDIA pour tester si le blocage des fréquences graphiques améliore la stabilité de latence dans Vonovox."
---
# Optimisation avancée des performances : NVIDIA GPU Clock Locking

> **Optimisation facultative :** Ce guide est **100 % facultatif** et n'est **jamais requis** pour installer ou utiliser Vonovox. Terminez d'abord [Installer Vonovox](installation.md) et [Configurer et régler Vonovox](live-audio.md).

**Principe clé :** Le GPU Clock Locking est une optimisation avancée facultative pouvant améliorer la stabilité du traitement temps réel de Vonovox sur les GPU NVIDIA compatibles. Utilisez toujours des fréquences prises en charge, testez les résultats sur votre matériel et rétablissez les réglages par défaut si aucun gain mesurable n'apparaît.

> **Réinitialisation rapide (à tout moment) :** Ouvrez l'Invite de commandes en tant qu'administrateur et exécutez `nvidia-smi -i 0 -rgc` (remplacez `0` par l'index de votre GPU si nécessaire), ou redémarrez Windows.

## Table des matières

- [Parcours rapide pour utilisateurs avancés](#parcours-rapide-pour-utilisateurs-avancés)
- [1. Qu'est-ce que le GPU Clock Locking](#1-quest-ce-que-le-gpu-clock-locking)
- [2. Impact sur Vonovox](#2-impact-sur-vonovox)
- [3. Compatibilité NVIDIA et messages d'erreur](#3-compatibilité-nvidia-et-messages-derreur)
- [4. Préparation débutant : Windows 10 et Windows 11](#4-préparation-débutant--windows-10-et-windows-11)
- [5. Trouver les fréquences prises en charge](#5-trouver-les-fréquences-prises-en-charge)
- [6. Choisir une fréquence adaptée](#6-choisir-une-fréquence-adaptée)
- [7. Appliquer le verrouillage d'horloge](#7-appliquer-le-verrouillage-dhorloge)
- [8. Rétablir les réglages d'origine](#8-rétablir-les-réglages-dorigine)
- [9. Gestion en un clic (scripts BAT)](#9-gestion-en-un-clic-scripts-bat)
- [10. Tester si cela aide vraiment (Test A/B)](#10-tester-si-cela-aide-vraiment-test-ab)
- [11. Risques, limites et précautions](#11-risques-limites-et-précautions)
- [12. Note avancée : verrouillage mémoire GPU (-lmc)](#12-note-avancée--verrouillage-mémoire-gpu--lmc)
- [13. Alternatives](#13-alternatives)
- [14. Dépannage](#14-dépannage)
- [15. FAQ](#15-faq)
- [16. Références officielles](#16-références-officielles)

---

## Parcours rapide pour utilisateurs avancés

1. Lister les GPU : `nvidia-smi -L`
2. Lire les fréquences supportées : `nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS`
3. Verrouiller une fréquence **Graphics** vérifiée (`1800` est uniquement un exemple illustratif) : `nvidia-smi -i 0 -lgc 1800,1800`
4. Vérifier en direct : `nvidia-smi -i 0 -q -d CLOCK`
5. Rétablir dès que terminé ou sans amélioration : `nvidia-smi -i 0 -rgc`

---

## 1. Qu'est-ce que le GPU Clock Locking

- La **fréquence GPU** (en **MHz**, millions de cycles par seconde) indique la vitesse de calcul du cœur graphique.
- **NVIDIA GPU Boost** ajuste dynamiquement cette fréquence entre le repos (`210-300 MHz`) et la charge maximale selon température, énergie et charge.
- Pendant Vonovox, l'audio arrive par petits blocs CUDA espacés de quelques millisecondes : la GPU peut redescendre brièvement puis remonter, provoquant parfois des variations de temps de traitement.
- Le **GPU Clock Locking** (`-lgc`) agit comme un **régulateur de vitesse** en maintenant le cœur dans une plage officielle NVIDIA. Ce n'est **pas** de l'overclocking : aucune tension ni limite n'est forcée au-delà des spécifications. Choisir la fréquence maximale n'est pas toujours optimal à cause de la chaleur et du thermal throttling.

---

## 2. Impact sur Vonovox

- Peut stabiliser le **GPU Delay** et réduire certains pics de latence lors de charges audio intermittentes, mais **ne garantit pas** une conversion plus rapide, la suppression de tous les craquements ou une meilleure qualité vocale.
- En jeu simultané (GPU à 95-100 %), limiter les FPS du jeu ou augmenter **Block Size** reste plus efficace. Les problèmes **WASAPI** ou de fréquence d'échantillonnage (`48 kHz`) ne viennent pas des horloges GPU.

---

## 3. Compatibilité NVIDIA et messages d'erreur

La présence de `nvidia-smi` ne garantit pas le support de `--lgc` (souvent restreint sur certains PC portables, anciens pilotes ou architectures).

| Message | Signification | Solution |
| --- | --- | --- |
| `Not Supported` | GPU, BIOS portable ou pilote incompatible avec `--lgc`. | Laissez par défaut et utilisez les [Alternatives](#13-alternatives). |
| `Insufficient Permissions` | Invite non ouverte en administrateur. | Clic droit → **Exécuter en tant qu'administrateur**. |
| `Invalid Argument` | Syntaxe ou valeur hors `SUPPORTED_CLOCKS`. | Copiez une valeur exacte sous `Graphics :` au format `min,max`. |
| `NVIDIA-SMI has failed` | Pilote inactif ou GPU en veille. | Activez la GPU et branchez le secteur sur PC portable. |
| `nvidia-smi` non reconnu | Absent du `PATH`. | Utilisez le chemin complet dans `System32` ou `NVSMI`. |

---

## 4. Préparation débutant : Windows 10 et Windows 11

1. Vérifiez votre GPU NVIDIA dans **Gestionnaire des tâches → Performances**.
2. Menu Démarrer → tapez `cmd` → clic droit sur **Invite de commandes** → **Exécuter en tant qu'administrateur**.
3. Collez avec clic droit (ou `Ctrl + V`) et appuyez sur **Entrée**.
4. Testez `nvidia-smi` puis `nvidia-smi -L` pour repérer l'index (`0`, `1`...).
5. Si `nvidia-smi` est introuvable, essayez `"C:\Windows\System32\nvidia-smi.exe"` ou `"C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"` sans réinstaller les pilotes.

---

## 5. Trouver les fréquences prises en charge

```bat
nvidia-smi -i 0 -q -d SUPPORTED_CLOCKS
```

Utilisez uniquement les valeurs sous **`Graphics :`** (pas **`Memory`**). N'entrez **jamais** de valeurs arbitraires comme `50000` MHz : elles peuvent échouer sans limitation automatique garantie.

---

## 6. Choisir une fréquence adaptée

Observez d'abord les fréquences réelles sous Vonovox (`nvidia-smi -i 0 -q -d CLOCK`), choisissez une valeur `Graphics` modérée (pas forcément le maximum), surveillez température et throttling (`-q -d PERFORMANCE`), et ne conservez le réglage que s'il apporte un bénéfice réel.

---

## 7. Appliquer le verrouillage d'horloge

*(Exemple illustratif uniquement, remplacez `1800` par une valeur de votre `SUPPORTED_CLOCKS` :)*

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

Exemple avec plage min/max : `nvidia-smi -i 0 -lgc 1500,1800`. Vérifiez les fréquences réelles avec `nvidia-smi -i 0 -q -d CLOCK` (ou `-l 1`). Les limites thermiques ou électriques peuvent empêcher d'atteindre exactement la cible.

---

## 8. Rétablir les réglages d'origine

```bat
nvidia-smi -i 0 -rgc
```

Exécutez toujours cette commande après vos tests ou en cas d'absence de gain. Le verrouillage est temporaire et disparaît au redémarrage de Windows.

---

## 9. Gestion en un clic (scripts BAT)

### Lock-GPU-Clocks.bat

```bat
@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Vonovox Helper - Lock NVIDIA GPU Clocks

echo ============================================================
echo   Vonovox Optional Helper: Lock NVIDIA GPU Core Clocks
echo   No overclocking, no voltage changes, temporary until reboot
echo ============================================================
echo.

net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Administrator privileges are required.
    echo Right-click this .bat file and choose "Run as administrator".
    pause
    exit /b 1
)

set "NVSMI=nvidia-smi"
where nvidia-smi >nul 2>&1
if errorlevel 1 (
    if exist "C:\Windows\System32\nvidia-smi.exe" (
        set "NVSMI=C:\Windows\System32\nvidia-smi.exe"
    ) else if exist "C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe" (
        set "NVSMI=C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
    ) else (
        echo [ERROR] nvidia-smi.exe was not found on this system.
        pause
        exit /b 1
    )
)

"%NVSMI%" -L
if errorlevel 1 (
    echo [ERROR] Could not query NVIDIA GPUs.
    pause
    exit /b 1
)

set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to configure [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

"%NVSMI%" -i %GPU_ID% -q -d SUPPORTED_CLOCKS
if errorlevel 1 (
    echo [STOPPED] Could not retrieve SUPPORTED_CLOCKS for GPU %GPU_ID%.
    pause
    exit /b 1
)

set "TARGET_MHZ="
set /p "TARGET_MHZ=Enter a supported Graphics clock in MHz (or press Enter to cancel): "
if "%TARGET_MHZ%"=="" exit /b 0

echo %TARGET_MHZ%| findstr /r "^[0-9][0-9]*$" >nul
if errorlevel 1 (
    echo [ERROR] "%TARGET_MHZ%" is not a valid whole number in MHz.
    pause
    exit /b 1
)

"%NVSMI%" -i %GPU_ID% -lgc %TARGET_MHZ%,%TARGET_MHZ%
if errorlevel 1 (
    echo [ERROR] Failed to apply clock lock.
    "%NVSMI%" -i %GPU_ID% -rgc >nul 2>&1
    pause
    exit /b 1
)

echo [SUCCESS] Clock lock applied to GPU %GPU_ID% (%TARGET_MHZ% MHz).
pause
exit /b 0
```

### Reset-GPU-Clocks.bat

```bat
@echo off
setlocal EnableExtensions
title Vonovox Helper - Reset NVIDIA GPU Clocks

echo ============================================================
echo   Vonovox Optional Helper: Reset NVIDIA GPU Clocks to Default
echo ============================================================
echo.

net session >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Administrator privileges are required.
    pause
    exit /b 1
)

set "NVSMI=nvidia-smi"
where nvidia-smi >nul 2>&1
if errorlevel 1 (
    if exist "C:\Windows\System32\nvidia-smi.exe" (
        set "NVSMI=C:\Windows\System32\nvidia-smi.exe"
    ) else if exist "C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe" (
        set "NVSMI=C:\Program Files\NVIDIA Corporation\NVSMI\nvidia-smi.exe"
    ) else (
        echo [ERROR] nvidia-smi.exe was not found on this system.
        pause
        exit /b 1
    )
)

"%NVSMI%" -L
set "GPU_ID=0"
set /p "GPU_ID=Enter GPU index to reset [default: 0]: "
if "%GPU_ID%"=="" set "GPU_ID=0"

"%NVSMI%" -i %GPU_ID% -rgc
if errorlevel 1 (
    echo [ERROR] Failed to reset clocks. Reboot Windows to restore defaults.
    pause
    exit /b 1
)

echo [SUCCESS] GPU %GPU_ID% has returned to default dynamic clock management.
pause
exit /b 0
```

Dans le Bloc-notes : **Fichier → Enregistrer sous...**, choisissez **Type : Tous les fichiers (`*.*`)** pour éviter `.bat.txt`, puis clic droit → **Exécuter en tant qu'administrateur**.

---

## 10. Tester si cela aide vraiment (Test A/B)

Comparez **Test A (Default GPU Clocks avec `-rgc`)** et **Test B (Locked GPU Clocks)** avec exactement les mêmes modèle, F0, Block Size, périphériques audio, backend et charge GPU :

| Mesure | Test A : Par défaut | Test B : Verrouillé |
| --- | --- | --- |
| **GPU Delay** moyen (ms) | `____ ms` | `____ ms` |
| Pics de **GPU Delay** | `____ ms` | `____ ms` |
| Craquements / coupures | `Oui / Non` | `Oui / Non` |
| Température GPU après 5 min (°C) | `____ °C` | `____ °C` |
| Fréquence réelle (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Consommation (W) | `____ W` | `____ W` |
| Stabilité après 5+ min | `Stable / Throttling` | `Stable / Throttling` |

Si les résultats sont identiques ou pires, rétablissez immédiatement avec `nvidia-smi -i 0 -rgc`.

---

## 11. Risques, limites et précautions

Plus de chaleur, de bruit de ventilateur, de consommation et moins d'autonomie sur portable ; risques de throttling et conflits possibles avec MSI Afterburner/logiciels OEM. Ne modifiez jamais VBIOS, tensions ou protections thermiques.

---

## 12. Note avancée : verrouillage mémoire GPU (`-lmc`)

`nvidia-smi -i 0 -lmc` / `-rmc` verrouille la VRAM. Non recommandé pour Vonovox faute de preuves de gain.

---

## 13. Alternatives

Utilisez le **Panneau de configuration NVIDIA → Mode de gestion de l'alimentation → Privilégier les performances maximales** (non équivalent à `--lgc`), augmentez **Block Size**, vérifiez le `48 kHz` dans [Configurer et régler Vonovox](live-audio.md), limitez les FPS en jeu et contrôlez le refroidissement.

---

## 14. Dépannage

| Symptôme | Cause possible | Solution |
| --- | --- | --- |
| `nvidia-smi` non reconnu | Absent du `PATH`. | Utilisez le chemin complet `System32`/`NVSMI` ou les `.bat`. |
| Aucune GPU / `NVIDIA-SMI has failed` | GPU inactive ou en veille. | Vérifiez le Gestionnaire de périphériques et branchez le secteur. |
| `Insufficient Permissions` | Droits admin manquants. | Exécutez en tant qu'administrateur. |
| `Not Supported` | GPU/pilote/BIOS incompatible. | Passez aux [Alternatives](#13-alternatives). |
| `Invalid Argument` | Syntaxe ou MHz invalide. | Copiez un MHz exact de `SUPPORTED_CLOCKS` (`min,max`). |
| Fréquence différente / chute | Limite thermique ou électrique. | Baissez le MHz cible ou réinitialisez avec `-rgc`. |
| Température élevée | Refroidissement insuffisant. | Exécutez `nvidia-smi -i 0 -rgc` immédiatement. |
| Aucun gain ou dégradation | Goulet ailleurs (Block Size, CPU, WASAPI). | Exécutez `-rgc` et ajustez [Configurer et régler Vonovox](live-audio.md). |
| Comportement différent en jeu | GPU saturé par le jeu. | Limitez les FPS ou montez **Block Size**. |
| `-rgc` échoue | Droits/index ou pilote. | Vérifiez admin + `-L` ou redémarrez Windows. |

---

## 15. FAQ

1. **Est-ce sûr ?** Oui avec `SUPPORTED_CLOCKS` et suivi thermique.
2. **Est-ce de l'overclocking ?** Non.
3. **Cela augmente-t-il les FPS ?** Non.
4. **Cela améliore-t-il la qualité vocale ?** Non.
5. **Cela réduit-il la latence ?** Cela peut réduire certains pics, pas le minimum matériel.
6. **Sur PC portable ?** Parfois, souvent limité par le BIOS ou la chauffe.
7. **Sur toutes les GPU NVIDIA ?** Non.
8. **Toujours choisir le maximum ?** Non.
9. **Puis-je mettre `50000` MHz ?** Non.
10. **Sur les RTX ?** Souvent sur desktop, variable sur portable.
11. **Faut-il le refaire à chaque fois ?** Oui après redémarrage.
12. **Cela survit-il au redémarrage ?** Non.
13. **Jouer + Vonovox ?** Oui si la GPU n'est pas saturée.
14. **En cas de surchauffe ?** Protection thermique automatique + exécutez `-rgc`.
15. **Comment tout remettre à zéro ?** `nvidia-smi -i 0 -rgc`, `Reset-GPU-Clocks.bat` ou redémarrer.
16. **Verrouiller la VRAM (`-lmc`) ?** Non.
17. **Si `Not Supported` ?** Utilisez les alternatives (Section 13).

---

## 16. Références officielles

- [NVIDIA System Management Interface (nvidia-smi)](https://docs.nvidia.com/deploy/nvidia-smi/index.html)
- [NVIDIA NVML API Reference](https://docs.nvidia.com/deploy/nvml-api/latest/api/group__nvmlDeviceCommands.html)
- [NVIDIA TensorRT Benchmarking & Clock Locking](https://docs.nvidia.com/deeplearning/tensorrt/latest/performance/benchmarking.html)
- [Dépôt Vonovox](https://github.com/dr87/Vonovox)
