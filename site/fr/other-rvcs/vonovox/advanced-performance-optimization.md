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
- Pendant Vonovox, l'audio arrive par blocs discrets (dont la durée dépend de **Block Size** et des réglages audio) : la GPU peut redescendre brièvement entre deux blocs puis remonter, provoquant parfois des variations de temps de traitement.
- Le **GPU Clock Locking** (`-lgc`) agit comme un **régulateur de vitesse** en maintenant le cœur dans une plage officielle NVIDIA. Ce n'est **pas** de l'overclocking : aucune tension ni limite n'est forcée au-delà des spécifications. Choisir la fréquence maximale n'est pas toujours optimal à cause de la chaleur et du thermal throttling.

---

## 2. Impact sur Vonovox

- Peut stabiliser le **GPU Delay** et réduire certains pics de latence lors de charges audio intermittentes, mais **ne garantit pas** une conversion plus rapide, la suppression de tous les craquements ou une meilleure qualité vocale.
- En jeu simultané (GPU à 95-100 %), limiter les FPS du jeu ou augmenter **Block Size** reste plus efficace. Les problèmes **WASAPI** ou de fréquence d'échantillonnage (`48 kHz`) ne viennent pas des horloges GPU.

---

## 3. Compatibilité NVIDIA et messages d'erreur

La présence de `nvidia-smi` ne garantit pas le support de `-lgc` (souvent restreint sur certains PC portables, anciens pilotes ou architectures).

| Message | Signification | Solution |
| --- | --- | --- |
| `Not Supported` | GPU, BIOS portable ou pilote incompatible avec `-lgc`. | Laissez par défaut et utilisez les [Alternatives](#13-alternatives). |
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

Utilisez uniquement les valeurs sous **`Graphics :`** (pas **`Memory`**). Selon la documentation NVIDIA, certains pilotes peuvent arrondir une fréquence demandée au palier supporté le plus proche, mais les valeurs hors plage peuvent échouer (`Invalid Argument`). N'entrez **jamais** de valeurs arbitraires comme `50000` MHz.

---

## 6. Choisir une fréquence adaptée

Observez d'abord les fréquences réelles sous Vonovox (`nvidia-smi -i 0 -q -d CLOCK`), choisissez une valeur `Graphics` modérée (pas forcément le maximum), surveillez température et throttling (`-q -d PERFORMANCE`), et ne conservez le réglage que s'il apporte un bénéfice réel.

---

## 7. Appliquer le verrouillage d'horloge

*(Exemple illustratif uniquement, remplacez `1800` par une valeur de votre `SUPPORTED_CLOCKS` :)*

```bat
nvidia-smi -i 0 -lgc 1800,1800
```

Exemple avec plage min/max : `nvidia-smi -i 0 -lgc 1500,1800`. Distinguez la fréquence demandée de la fréquence **réellement observée** avec `nvidia-smi -i 0 -q -d CLOCK` (ou `-l 1`). L'acceptation de `-lgc` ne garantit pas une fréquence fixe : les limites thermiques, électriques ou du firmware peuvent la réduire.

---

## 8. Rétablir les réglages d'origine

```bat
nvidia-smi -i 0 -rgc
```

Exécutez toujours cette commande après vos tests ou en cas d'absence de gain. Le verrouillage est temporaire et disparaît au redémarrage de Windows.

---

## 9. Gestion en un clic (scripts BAT)

### Lock-GPU-Clocks.bat

<details>
<summary><strong>Cliquez pour développer et révéler le code complet de Lock-GPU-Clocks.bat</strong></summary>

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
<summary><strong>Cliquez pour développer et révéler le code complet de Reset-GPU-Clocks.bat</strong></summary>

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

Dans le Bloc-notes : **Fichier → Enregistrer sous...**, choisissez **Type : Tous les fichiers (`*.*`)** pour éviter `.bat.txt`, puis clic droit → **Exécuter en tant qu'administrateur**.

---

## 10. Tester si cela aide vraiment (Test A/B)

Un test rapide de 3-5 minutes peut servir de contrôle préliminaire, mais pour évaluer un vrai gain, faites un comparatif **A/B d'au moins 10-15 minutes** par phase (1. Rétablissez `-rgc`, 2. Stabilisez Vonovox, 3. Test A 10-15 min, 4. Appliquez un palier `Graphics` vérifié, 5. Test B 10-15 min à modèle, F0, Block Size, audio et charge GPU identiques, 6. Répétez si incertain ou rétablissez `-rgc`) :

| Mesure | Test A : Par défaut (10-15 min) | Test B : Verrouillé (10-15 min) |
| --- | --- | --- |
| **GPU Delay** moyen (ms) | `____ ms` | `____ ms` |
| Pics de **GPU Delay** | `____ ms` | `____ ms` |
| Variabilité des temps | `____________` | `____________` |
| Craquements / coupures | `Oui / Non` | `Oui / Non` |
| Température GPU (°C) | `____ °C` | `____ °C` |
| Consommation (W) | `____ W` | `____ W` |
| Fréquence réelle observée (`-q -d CLOCK`) | `____ MHz` | `____ MHz` |
| Throttling (`-q -d PERFORMANCE`) | `Aucun / Thermique / Puissance` | `Aucun / Thermique / Puissance` |

Si les résultats sont identiques ou pires, rétablissez immédiatement avec `nvidia-smi -i 0 -rgc`.

---

## 11. Risques, limites et précautions

Plus de chaleur, de bruit de ventilateur, de consommation et moins d'autonomie sur portable ; risques de throttling et conflits possibles avec MSI Afterburner/logiciels OEM. Ne modifiez jamais VBIOS, tensions ou protections thermiques.

---

## 12. Note avancée : verrouillage mémoire GPU (`-lmc`)

`nvidia-smi -i 0 -lmc` / `-rmc` verrouille la VRAM. Non recommandé pour Vonovox faute de preuves de gain.

---

## 13. Alternatives

Utilisez le **Panneau de configuration NVIDIA → Mode de gestion de l'alimentation → Privilégier les performances maximales** (non équivalent à `-lgc`), augmentez **Block Size**, vérifiez le `48 kHz` dans [Configurer et régler Vonovox](live-audio.md), limitez les FPS en jeu et contrôlez le refroidissement.

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
