# YuneVoix Song Cover et Karaoke - Guide Complet pour Débutants

[Aperçu et Configuration Requise](overview.md) · [Paramètres et Qualité Audio](settings.md) · [Premium, Licence et Aide](premium-and-troubleshooting.md)

**Song Cover** et **Karaoke** sont des fonctions musicales hors ligne débloquées dans **YuneVoix PREMIUM** (`license.yvl`). Contrairement au mode **LIVE**, Song Cover et Karaoke disposent de leurs propres onglets de paramètres dédiés afin que vos réglages LIVE ne modifient pas accidentellement vos rendus de cover.

---

## 1. Song Cover (Étape par Étape)

Song Cover sépare une chanson en voix et instrumental, convertit la voix vers la voix choisie dans votre Voice Bank et mixe la piste finale (prenant environ **1.3×** la durée du morceau sur le GPU, par exemple un morceau de 5 minutes prend environ 6-7 minutes selon les notes du développeur).

1. Ouvrez l'onglet **Song Cover** (nécessite une `license.yvl` active).
2. **Choisissez votre morceau :** Chargez un fichier audio (WAV, MP3, FLAC, M4A, AAC, OGG, WMA ou AIFF, jusqu'à **15 minutes**).
3. **Sélectionnez la voix cible :** Choisissez une voix `.yvoice` dans votre Voice Bank.
4. **Configurez la séparation vocale :**
   - **Vocal separator :** **`YUNE`** (par défaut, recommandé, ~2× plus rapide).
   - **Vocals to convert :** **`Lead vocal only`** (par défaut, résultat le plus propre).
5. **Ouvrez `Settings → Song Cover`** *(ou cliquez deux fois sur **Copy settings from LIVE** pour reprendre modèle, timbre, filtres et effets depuis LIVE)*.
6. **Réglez Octave :** Laissez **`Auto`** (par défaut) ; si le rendu paraît trop aigu ou trop grave, réglez sur `−12`, `0` ou `+12`.
7. **Choisissez Content engine :** **`Whisper`** (par défaut, timbre plus fidèle) ou **`WavLM+`** (moins de bourdonnement sur les notes soufflées, mots légèrement moins précis ; pris en charge sur NVIDIA et AMD DirectML).
8. **Choisissez Model et Model method :**
   - **Model :** **`base`** (par défaut, recommandé) ou **`fine-tuned`**.
   - **Model method :** **`Classic`** (`10 × Euler` recommandé pour les covers), **`Learned 4 steps`** ou **`FlowEdit 3+1`**.
   - **Prompt length** (`20 s`), **Timbre change** (`50%`), **Roughness** (`off`), **CFG** (`0.7`) et **Fix pitch detector errors** (`on`) correspondent à leurs équivalents LIVE.
9. **Configurez niveau, réverbération et format d'export :**
   - **Vocal level :** `+2 dB` (par défaut).
   - **Vocal reverb :** niveau propre `−17 dB` (par défaut), identique à l'original ou aucun.
   - **Keep the separated tracks :** `Off` (par défaut) ; passez sur **On** pour éviter de refaire la séparation si vous relancez un rendu du même morceau.
   - **File format :** **`WAV 24-bit`** (par défaut) ou **`MP3 320 kbps`** (nécessite l'encodeur MP3 de Windows).
10. **Générez et exportez** la cover.

### FlowEdit 3+1 dans Song Cover

Contrairement au mode LIVE, **FlowEdit 3+1 dans Song Cover utilise la propre voix originale séparée du morceau comme source**, et non votre échantillon `my_voice.yvoice`. Ainsi, FlowEdit dans Song Cover vise à conserver les respirations et l'articulation du chanteur d'origine sans nécessiter d'enregistrement de votre propre voix.

---

## 2. Karaoke (Étape par Étape : PREPARE → SING → RENDER COVER)

Karaoke vous permet de chanter vous-même un morceau avec paroles synchronisées à l'écran, puis convertit votre voix enregistrée vers la voix cible et la mixe dans la piste.

### Étape 1 : PREPARE

1. Ouvrez l'onglet **Karaoke** et chargez votre **morceau** et vos **paroles** (texte brut collé ou fichier `.lrc` ; le japonais fonctionne aussi en rōmaji, et les encodages anciens comme Shift-JIS sont pris en charge).
2. Dans **`Settings → Karaoke`**, choisissez **Sing along to** :
   - **`Backing track`** (par défaut) : sépare le morceau pendant **PREPARE** (2-3 minutes la première fois) et offre l'alignement le plus précis des paroles.
   - **`Original song`** : démarre en quelques secondes et effectue la séparation lors du premier rendu.
3. Cliquez sur **PREPARE**. Si les paroles dérivent légèrement, votre correction de synchronisation est mémorisée.

### Étape 2 : SING

1. Vérifiez **Headphones** (sortie Windows par défaut) et **Microphone** (identique à LIVE) dans `Settings → Karaoke`.
2. Cliquez sur **SING** pour ouvrir la fenêtre des paroles (lancer Karaoke libère le moteur LIVE du GPU).
3. **Contrôles de la fenêtre des paroles :**
   - **`Space` :** Pause / reprendre.
   - **`Esc` :** Arrêter de chanter (la cover se termine 5 secondes après l'arrêt).
   - **`F11` :** Basculer en plein écran.
4. Surveillez le vumètre micro intégré et chantez le morceau (YuneVoix compense la dérive d'horloge et avertit si aucune voix n'a été enregistrée ou si le micro a saturé).

### Étape 3 : RENDER COVER

1. Ajustez les options de mixage dans **`Settings → Karaoke`** si nécessaire.
2. Cliquez sur **RENDER COVER**. Modèle, méthode de modèle, timbre, filtres, effets et format d'export proviennent de **`Settings → Song Cover`**.

### Paramètres Karaoke : Monitoring vs. Rendu Final

| Paramètre (`Settings → Karaoke`) | Défaut | Affecte ce que vous entendez en chantant | Affecte la cover rendue finale |
| --- | --- | --- | --- |
| **Original vocal in headphones** | `20%` | Oui | Non |
| **Backing vocals** | `On` | Oui | Conservées dans le mix |
| **Music volume** | `0 dB` | Oui | Référence de mix |
| **Lyrics size** | `Normal` | Oui (affichage) | Non |
| **Clean the recording** (`Off` / `DF3`) | `Off` | Non | Oui |
| **Content engine** (`Whisper` / `WavLM+`) | `Whisper` | Non | Oui |
| **Octave** | `Auto` (registre du chanteur dans la tessiture cible) | Non | Oui |
| **Pull to the original melody** | `Off` (`50-70%` naturel) | Non | Oui |
| **Follow the original vocal's level** | `70%` (dynamique + limiteur) | Non | Oui |
| **Make room for the vocal** | `Up to 60%` (atténue `1-4 kHz` quand vous chantez) | Non | Oui |
| **Smooth out vocal fry** | `Off` | Non | Oui |

---

## 3. Dépannage Song Cover et Karaoke

| Symptôme | Quoi vérifier et essayer |
| --- | --- |
| **Paroles désynchronisées** | Utilisez **`Sing along to → Backing track`** à **PREPARE**, chargez un fichier `.lrc` minuté si disponible, ou appliquez une correction de synchronisation dans Karaoke (enregistrée par morceau). |
| **Microphone non détecté / rien enregistré** | Vérifiez **Microphone** dans `Settings → Karaoke`, les autorisations de confidentialité micro de Windows, et observez le vumètre dans la fenêtre des paroles. |
| **Voix enregistrée trop faible** | Montez le gain micro Windows vers `−6 dBFS`, activez **Follow the original vocal's level** (`70%` par défaut) et gardez **Make room for the vocal** activé. |
| **Mauvaise hauteur / faux** | Vérifiez **Octave** (`Auto`, `−12`, `0` ou `+12`) et essayez **Pull to the original melody** (`50-70%`) dans `Settings → Karaoke`. |
| **Saccades pendant le Karaoke** | Fermez les autres applis gourmandes en GPU, utilisez **`Backing track`** (déjà séparé à PREPARE) ou vérifiez les réglages de tampon audio. |
| **Musique trop forte / voix couverte** | Montez **Vocal level** (`+2 dB` par défaut), gardez **Make room for the vocal** activé ou baissez **Music volume** pendant le chant. |
| **Respirations ou chuchotements perdus dans la cover** | Comparez **`WavLM+`** et **`Whisper`**, ou passez **Model method** sur **`FlowEdit 3+1`** dans `Settings → Song Cover`. |
| **Trop de réverbération sur la voix de cover** | Baissez **Reverb on the vocal** (`−17 dB` par défaut) ou réglez-le sur aucun dans `Settings → Song Cover`. |
| **Artefacts de séparation vocale / duos** | Gardez **Vocal separator** sur **`YUNE`** et **Vocals to convert** sur **`Lead vocal only`** (les duos avec deux chanteurs principaux ne peuvent pas isoler automatiquement un seul chanteur). |

Étape suivante : [Premium, Licence et Aide](premium-and-troubleshooting.md).
