---
label: "Premium, Licence et Aide"
icon: ":wrench:"
order: 94
permalink: /fr/non-rvc/yunevoix/premium-and-troubleshooting/
description: "Licence YuneVoix PREMIUM (Song Cover et Karaoke), activation hors ligne, règles matérielles, dépannage étendu NVIDIA et AMD et diagnostics."
---
# Premium, Licence et Dépannage

## YuneVoix PREMIUM : Song Cover et Karaoke

Les soutiens sur [Ko-fi](https://ko-fi.com/yunevoix) accèdent à **YuneVoix PREMIUM**, qui débloque des fonctions musicales hors ligne en plus de tout ce qui est dans BASIC :

- **Song Cover :** Choisissez n'importe quel morceau et voix cible. YuneVoix sépare les voix de l'instrumental, convertit la voix principale (et éventuellement les chœurs) et mixe le tout ensemble.
- **Karaoke :** Chantez avec les paroles à l'écran ; votre prise est convertie vers la voix choisie et mixée avec la musique, adaptée à la tonalité et au niveau de l'original.

Pour des tutoriels complets étape par étape et chaque réglage de Song Cover / Karaoke, consultez **[Song Cover et Karaoke - Guide Complet pour Débutants](song-cover-karaoke.md)**.

---

## Licence PREMIUM et Activation

1. Ouvrez l'onglet **Song Cover** et cliquez sur **"Copy request code"**.
2. Envoyez le code de demande avec votre achat Ko-fi.
3. Vous recevrez un fichier `license.yvl`. Cliquez sur **"Load license…"** et sélectionnez-le (il est copié à côté de `YuneVoix.exe`).

### Comment fonctionne la licence

- **N'expire jamais** et fonctionne **100% hors ligne**.
- **Mises à jour :** Copiez `license.yvl` à côté du nouveau `YuneVoix.exe` (ou chargez-le de nouveau).
- **Un PC par licence :** Un dossier PREMIUM ou une licence copiée ne débloquera pas Song Cover sur un autre ordinateur.
- **Changements matériels :** La licence est liée à votre **carte mère**, **disque système** et **installation Windows**.
  - Changer **un** de ces éléments ne pose aucun problème (et changer de GPU, RAM ou écran ne compte pas du tout).
  - Changer **deux éléments à la fois** (par ex., un nouveau disque système avec une nouvelle installation de Windows) nécessite une nouvelle licence : copiez le nouveau code de demande et contactez le support avec votre commande.

---

## Dépannage

| Symptôme | Quoi essayer en premier |
| --- | --- |
| **Voix robotique, faible ou "sous l'eau"** | Montez le gain micro dans Windows pour que les pics de parole forte approchent **−6 dBFS** (`Settings → General → Microphone level`) et laissez Input cleaning sur **`DF3`**. |
| **La frappe clavier ou les clics deviennent des sons** | Réglez Input cleaning (`Settings → General`) sur **`DF3`**. |
| **Souffle ou "grain" dans les aigus** | Gardez **Smooth top** à `100%` et **Brightness** à `0 dB` (`Settings → EQ & Filters`). |
| **Mauvaise octave / voix d'écureuil** | Dans `Settings → Pitch & Autotune`, ajustez **Pitch shift** ou testez **Automatic pitch** (`Octave from the target voice` pour chanter ; `Match the target voice's pitch` pour parler). |
| **Rires, respirations ou chuchotements disparaissent** | Désactivez **Speech gate**, passez Input cleaning sur **`Gentle`** (dans une pièce calme), essayez **WavLM+** (NVIDIA et AMD DirectML) ou réglez **Model method** sur **`FlowEdit 3+1`** (nécessite un échantillon de 5-20 s de votre propre voix). |
| **FlowEdit garde le bruit de fond ou l'écho de pièce** | Activez le nettoyage d'entrée **`DF3`**, enregistrez dans une pièce plus calme ou repassez **Model method** sur **`Classic`**. |
| **Craquements ou brèves coupures** | Réglez **Model method** sur **`Learned 4 steps`**, raccourcissez **Prompt length**, augmentez **Output buffer** (`Settings → General`) et fermez les autres applis gourmandes en GPU. |
| **Saccades en jeu** | Limitez les **FPS** du jeu et baissez les graphismes du jeu, réglez **Model method** sur **`Learned 4 steps`**, raccourcissez **Prompt length** et désactivez **Harmony**. |
| **LIVE arrêté : "the audio device stopped working"** | Votre micro ou sortie a été débranché ou modifié. Rebranchez-le, cliquez sur **Refresh devices** et appuyez sur **START**. |
| **AMD : se ferme au clic sur START / `ShapeInferenceNotRegistered`** | Passez à la **v0.7.1** (utilise **DirectML** sur le GPU dédié par défaut, corrigeant à la fois les plantages en présence d'un GPU intégré AMD et `ShapeInferenceNotRegistered` quand le GPU intégré est désactivé). Vérifiez `check.txt` pour la carte/moteur actif et gardez les pilotes Adrenalin à jour. |
| **AMD : FlowEdit repasse en repli ou WavLM+ indisponible** | Vérifiez `Settings → General → "AMD graphics engine"`. Si vous avez activé le mode expérimental **MIGraphX**, revenez à **DirectML** et redémarrez (sous MIGraphX, `WavLM+`, `FlowEdit 3+1` et `Learned 4 steps` ne sont pas disponibles - tout s'exécute en Classic, 10 × Euler). Vérifiez aussi que `Sample of your voice…` est défini pour FlowEdit en LIVE. |
| **L'Explorateur Windows dit que le ZIP est invalide** | Utilisez **7-Zip** ou **WinRAR** (ZIP chiffré AES-256) avec le mot de passe `yunevoix`. |

---

## Diagnostics et Support

Si quelque chose ne fonctionne toujours pas :

1. Ouvrez l'Invite de commandes dans le dossier de YuneVoix (tapez `cmd` dans la barre d'adresse de l'Explorateur Windows et appuyez sur Entrée).
2. Exécutez :
   ```bat
   YuneVoix.exe --check
   ```
3. **Fichiers créés à côté de `YuneVoix.exe` :**
   - **`check.txt`** : rapport matériel, édition, licence, détection GPU/moteur.
   - **`live-diag.log`** : journal de diagnostic de la session actuelle.
   - **`live-diag.prev.log`** et **`crash.log`** : journal précédent et détails du plantage conservés après un crash.
4. Envoyez **`check.txt`** et **`live-diag.log`** ; après un crash, envoyez aussi **`live-diag.prev.log`** et **`crash.log`** (tous sont conservés à côté de `YuneVoix.exe`).
5. **Test de vitesse AMD (optionnel) :** Vous pouvez exécuter `YuneVoix.exe --bench` pour générer `bench.txt`, `bench_ort.log` et `bench_output.wav` indiquant la vitesse de diagnostic sur votre carte AMD spécifique (les résultats varient selon la carte et le système).
6. *(Rappel confidentialité)* Avant de partager des journaux ou des fichiers WAV optionnels de **Save diagnostic recordings** dans **`yune-support`**, par MP à **Kuroyuki** (`sxxyneko` sur Discord) ou sur [ko-fi.com/yunevoix](https://ko-fi.com/yunevoix), vérifiez qu'ils ne contiennent pas de noms d'utilisateur personnels, chemins de fichiers ou propos privés.
