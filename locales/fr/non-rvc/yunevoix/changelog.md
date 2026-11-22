---
label: "Journal des Modifications"
icon: ":memo:"
order: 93
permalink: /fr/non-rvc/yunevoix/changelog/
description: "Historique complet des versions et journal des modifications de YuneVoix de la v0.6.0 à la v0.7.1, incluant les mises à jour DirectML, GPU AMD, WavLM+ et FlowEdit 3+1."
---
# Journal des Modifications de YuneVoix

## v0.7.1 (2026-11-20)

*Changements depuis la v0.7.0.*

### Corrigé

- **AMD** : correction d'un problème où YuneVoix se fermait en appuyant sur **START** sur les ordinateurs dont le processeur possède aussi un GPU intégré AMD, et s'arrêtait avec `ShapeInferenceNotRegistered` lorsque le GPU intégré était désactivé. Le pack AMD utilise désormais **DirectML** sur la carte dédiée par défaut (aucun téléchargement Windows Update, aucune compilation initiale des modèles). **MIGraphX** peut toujours être choisi dans `Settings → General → "AMD graphics engine"` (expérimental, s'applique après redémarrage). Les licences, voix et paramètres de la `v0.7.0` continuent de fonctionner.

### Nouveautés

- **AMD** : Windows 10 et les versions de Windows 11 antérieures à 24H2 sont de nouveau pris en charge (`24H2` n'est requis que pour le moteur expérimental **MIGraphX**).
- **AMD** : le moteur de contenu **`WavLM+`** et la méthode de modèle **`FlowEdit 3+1`** fonctionnent désormais aussi sur les cartes AMD (**DirectML**) - en **LIVE**, **covers** et **karaoke**. Lorsque **AMD MIGraphX** est sélectionné, ils ne sont pas disponibles (avec MIGraphX, toutes les méthodes de modèle s'exécutent en Classic, 10 × Euler).

---

## v0.7.0 (2026-11-19)

*Changements depuis la v0.6.0.*

### Nouveautés

- **Model method** (`Settings → Voice & Timbre`, et séparément dans `Settings → Song Cover` pour les covers et le karaoke ; s'applique au prochain **START**) :
  - **Classic** : comme auparavant (options d'étapes, solveur et guidance).
  - **Learned 4 steps** : calibré pour sonner comme 10 étapes tout en utilisant environ **40%** du temps GPU et moins de VRAM - idéal pour le jeu et les cartes plus lentes.
  - **FlowEdit 3+1 (NVIDIA)** *(AMD : depuis v0.7.1)* : part de votre propre voix au lieu du bruit et ne modifie que l'identité vocale, afin que respirations, chuchotements, rires et articulation passent bien mieux (environ **60%** du temps GPU du modèle). En **LIVE**, utilise votre échantillon vocal (`Voice & Timbre → "Sample of your voice…"` ; s'il a été défini dans une version précédente, resélectionnez-le une fois). Dans les covers et le karaoke, utilise la voix du morceau lui-même. Fonctionne avec **Whisper** comme avec **WavLM+**. Sans échantillon vocal, FlowEdit repasse sur **Learned 4 steps** (indiqué dans la ligne d'état LIVE) ; sous AMD MIGraphX toutes les méthodes de modèle s'exécutent en **Classic**.
- **Karaoke (PREMIUM)** : chantez vous-même un morceau avec paroles à l'écran - YUNE convertit votre chant dans la voix choisie et le mixe avec la musique. Les paroles sont alignées automatiquement (texte collé ou `.lrc` ; japonais aussi en rōmaji).
  - Chantez sur l'instrumental (séparé à **PREPARE**) ou sur la chanson originale (démarre en quelques secondes ; séparée au premier rendu).
  - Défilement fluide avec ligne courante centrée ; `Space` = pause, `Esc` = arrêt (se termine 5 s après), `F11` = plein écran, plus un vumètre micro dans la fenêtre des paroles.
  - `Settings → Karaoke` : casque, micro, volume voix originale et musique, taille des paroles, nettoyage d'enregistrement (`DF3`), moteur de contenu, octave, attraction vers la mélodie originale, niveau vocal, réverbération, chœurs, suivre le niveau de la voix originale, faire de la place pour la voix et atténuer le vocal fry.
  - **Adaptation de tonalité** : chanter quelques demi-tons plus haut ou plus bas ne rend plus la cover fausse ; **"Pull to the original melody"** corrige les notes.
  - **"Follow the original vocal's level"** : suit la dynamique de l'original et passe les crêtes dans un limiteur au lieu de baisser toute la cover.
  - **"Make room for the vocal"** (activé par défaut) : atténue la musique surtout dans les bandes `1-4 kHz` pendant que vous chantez, laissant les passages instrumentaux intacts.
  - **Karaoke octave `Auto`** : suit le registre du chanteur original tout en restant dans la tessiture de la voix cible.
- **"Smooth out vocal fry"** (`Settings → Voice & Timbre`, et `Settings → Karaoke`) : garde sonores les voix parlées ou chantées très graves ou craquantes et lisse les sauts de hauteur sans perdre le souffle.
- **Monitoring en LIVE** (`Settings → General`) : niveaux d'entrée et de sortie en dB avec témoin de limiteur, **"Listen to input"** (ce que le moteur entend après nettoyage) et **"Listen to output"** (voix convertie) sur un périphérique de monitoring séparé.

### Améliorations

- **Jeux et LIVE** : pendant que LIVE tourne, YuneVoix augmente sa propre priorité (processus, GPU, threads audio) et se soustrait au ralentissement en arrière-plan de Windows (aussi sous Windows 10) pour que les jeux en plein écran gênent moins la voix.
- **Latence d'entrée plus basse et plus stable** : le microphone est lu dès que Windows dispose d'un nouvel audio (environ toutes les **10 ms** au lieu de 50 ms).
- **Prises Karaoke** : compense la dérive d'horloge entre micro et casque, sauvegarde les prises en arrière-plan et avertit si aucune voix n'a été enregistrée ou si le micro a saturé.
- Les fichiers de paroles aux encodages anciens (comme **Shift-JIS** japonais) s'ouvrent correctement.
- L'alignement des paroles tourne sur CPU sur les cartes non NVIDIA (pack AMD).
- Commencer à chanter en Karaoke libère le moteur LIVE du GPU.
- **"Play sample"** dans Voice Bank lit désormais sur la sortie Windows par défaut (votre casque), et non sur la sortie LIVE.
- **Microphone level** dans `Settings → General` s'affiche en dB.
- Nouveaux conseils intégrés (*"Playing games with YUNE"*, *"Monitoring and audio devices"*, *"Karaoke"*, plus des conseils sur la méthode de modèle et le vocal fry) et un `FAQ.txt` enrichi inclus dans le pack.

### Corrigé

- Débrancher ou changer un périphérique audio pendant LIVE ou Karaoke s'arrête désormais proprement et explique pourquoi au lieu de rester silencieusement "en cours".
- Un périphérique débranché au démarrage n'est plus remplacé silencieusement par un autre dans vos paramètres.
- Messages clairs et lisibles pour les erreurs audio courantes (mode exclusif, blocage de confidentialité micro Windows, format non pris en charge, périphérique débranché, service Audio Windows arrêté).
- Les microphones 24 bits compactés sont lus correctement en LIVE.
- Sauvegarde sécurisée des paramètres (évite les réinitialisations en cas de plantage/coupure) avec copie de secours.
- Contrôle d'instance unique (une seule fenêtre YuneVoix à la fois).
- Conserve le journal précédent (`live-diag.prev.log`) et `crash.log` après un plantage pour le support.
- Les enregistrements de diagnostic s'arrêtent automatiquement après 10 minutes et reviennent à Off à chaque démarrage.
- **Cancel** termine désormais les tâches qui ne répondent plus.
- Message d'erreur clair si le pack NVIDIA est lancé sans GPU NVIDIA ; le pack AMD fonctionne aussi sur d'autres cartes compatibles DirectML.

### Compatibilité

- Les licences **PREMIUM** de la `v0.6.0` continuent de fonctionner : copiez `license.yvl` à côté du nouveau `YuneVoix.exe`, avec `models\yune\voices`, `yune.json` et `settings.json`. Les nouvelles options démarrent à leurs valeurs par défaut (`Model method: Classic`).

---

## v0.6.0 (2026-11-05)

*Changements depuis la v0.4.0 (`v0.5.0` était une version interne jamais publiée).*

### Nouveautés

- **Deux éditions** : **BASIC** (conversion vocale en direct, Voice Bank, tous les effets) et **PREMIUM** (tout BASIC + Song Cover).
- **Licence PREMIUM par PC** : `Song Cover → "Copy request code"` → `"Load license…"` (sans expiration, hors ligne, valable si 1 élément change parmi carte mère / disque système / installation Windows).
- **Moteur de contenu `WavLM+`** (`Settings → Voice & Timbre → Content engine` ; `Settings → Song Cover` pour les covers - **NVIDIA uniquement** ; *AMD : depuis v0.7.1*) : parole en direct plus claire, préserve vos rires, chuchotements et respirations et réduit le bourdonnement sur rires/soupirs. `Whisper` reste le réglage par défaut pour une fidélité de timbre plus proche.
- **Option "Silence stays silent"** (`Settings → EQ & Filters → YUNE output` et `Settings → Song Cover` ; activée par défaut).
- **Lien Ko-fi** (`ko-fi.com/yunevoix`) et badge d'édition affichés sous le numéro de version.

### Modifications et Suppressions

- Descriptions et conseils plus courts et plus précis dans les six langues, alignés sur les noms de boutons.
- `YuneVoix.exe --check` signale également l'édition, l'état de la licence PREMIUM et les fichiers du modèle `WavLM+`.
- **Suppression** du vocodeur `BigVGAN` : **PC-NSF** est désormais l'unique vocodeur (déjà par défaut, meilleur pour le chant et le souffle).
- Suppression des mentions obsolètes au filtre d'artefacts d'image (supprimé dans la `v0.4.0`).
