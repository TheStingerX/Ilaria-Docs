---
label: "Changelog"
icon: ":memo:"
order: 95
permalink: /non-rvc/yunevoix/changelog/
---
# Journal des modifications de YuneVoix

## v0.7.1 (20/11/2026)

*Changements depuis la v0.7.0.*

### Corrections

- **AMD** : correction de la fermeture de YuneVoix en appuyant sur **START** sur les ordinateurs dont le processeur intègre aussi une puce graphique AMD. Le paquet AMD utilise désormais **DirectML** sur la carte dédiée par défaut. **MIGraphX** peut toujours être choisi dans `Settings → General → "AMD graphics engine"` (expérimental, après redémarrage). Les licences, voix et paramètres de la `v0.7.0` restent compatibles.

### Nouveautés

- **AMD** : le moteur de contenu **`WavLM+`** et la méthode de modèle **`FlowEdit 3+1`** fonctionnent désormais aussi sur les cartes AMD (**DirectML**) - en **LIVE**, **covers** et **karaoké**. Lorsque **AMD MIGraphX** est sélectionné, ils ne sont pas disponibles.

---

## v0.7.0 (19/11/2026)

*Changements depuis la v0.6.0.*

### Nouveautés

- **Méthode de modèle** (`Settings → Voice & Timbre`, et séparément dans `Settings → Song Cover` pour les covers et le karaoké ; s'applique au prochain **START**) :
  - **Classic** : comme avant (options de pas, solveur et guidance).
  - **Learned 4 steps** : réglé pour sonner comme 10 pas en utilisant environ **40 %** du temps GPU et moins de VRAM - idéal pour les jeux et les cartes plus modestes.
  - **FlowEdit 3+1 (NVIDIA)** : part de votre propre voix plutôt que du bruit et ne change que l'identité vocale, laissant bien mieux passer respirations, chuchotements, rires et articulation (environ **60 %** du temps GPU du modèle). En **LIVE**, utilise l'échantillon de votre voix (`Voice & Timbre → "Sample of your voice…"` ; si défini dans une version précédente, resélectionnez-le une fois) ; en covers et karaoké, utilise la piste vocale elle-même. Fonctionne avec **Whisper** et **WavLM+**. Sans échantillon vocal ou sur AMD, FlowEdit bascule sur **Learned 4 steps** (indiqué dans la barre d'état LIVE).
- **Karaoké (PREMIUM)** : chantez vous-même avec les paroles à l'écran - YUNE transforme votre chant dans la voix choisie et le mixe avec la musique. Les paroles sont synchronisées automatiquement (texte collé ou `.lrc` ; japonais aussi en romaji).
  - Chantez sur l'instrumental (séparé avec **PREPARE**) ou sur le morceau original (démarrage en quelques secondes ; séparation au premier rendu).
  - Défilement fluide avec la ligne en cours centrée ; `Espace` = pause, `Échap` = arrêt (la cover se termine 5 s après), `F11` = plein écran et vumètre micro dans la fenêtre des paroles.
  - `Settings → Karaoke` : casque, microphone, volume voix originale et musique, taille des paroles, nettoyage d'enregistrement (`DF3`), moteur de contenu, octave, alignement sur la mélodie originale, niveau vocal, réverbération, chœurs, suivre le niveau de la voix originale, faire de la place pour la voix et lisser le vocal fry.
  - **Accordage sur la tonalité** : chanter quelques demi-tons plus haut ou plus bas que l'original ne désaccorde plus la cover ; **« Pull to the original melody »** corrige les notes.
  - **« Follow the original vocal's level »** : donne à votre voix convertie une dynamique proche de l'originale et passe les crêtes dans un limiteur au lieu de baisser toute la cover.
  - **« Make room for the vocal »** (activé par défaut) : atténue la musique principalement dans les bandes `1–4 kHz` pendant que vous chantez, sans toucher aux passages instrumentaux.
  - **Octave Karaoké `Auto`** : suit le registre du chanteur original tout en restant dans la tessiture de la voix cible.
- **« Smooth out vocal fry »** (`Settings → Voice & Timbre` et `Settings → Karaoke`) : parler ou chanter très grave ou avec une voix éraillée ne rend plus la voix cible rauque, tout en conservant le souffle.
- **Monitoring en LIVE** (`Settings → General`) : niveaux d'entrée et de sortie en dB avec témoin de limiteur, **« Listen to input »** (ce qu'entend le moteur après nettoyage) et **« Listen to output »** (la voix convertie) sur un périphérique d'écoute séparé.

### Améliorations

- **Jeux et LIVE** : pendant que LIVE tourne, YuneVoix augmente sa priorité (processus, GPU, threads audio) et désactive le ralentissement en arrière-plan de Windows (aussi sous Windows 10) afin que les jeux en plein écran perturbent moins la voix.
- **Latence d'entrée plus faible et plus stable** : le micro est lu dès que Windows reçoit du son (environ toutes les **10 ms** au lieu de 50 ms).
- **Prises Karaoké** : compense la dérive d'horloge entre micro et casque, enregistre la prise en arrière-plan et avertit si aucune voix n'a été captée ou si le micro a saturé.
- Les fichiers de paroles dans d'anciens encodages (ex. **Shift-JIS** japonais) s'ouvrent correctement.
- La synchronisation des paroles tourne sur le processeur sur les cartes non-NVIDIA (paquet AMD).
- Commencer à chanter en Karaoké libère le moteur LIVE du GPU.
- **« Play sample »** dans Voice Bank joue désormais sur la sortie Windows par défaut (votre casque), et non sur la sortie LIVE.
- **Microphone level** dans `Settings → General` est affiché en dB.
- Nouveaux conseils intégrés (*« Playing games with YUNE »*, *« Monitoring and audio devices »*, *« Karaoke »*, plus conseils sur méthode de modèle et vocal fry) et `FAQ.txt` enrichi inclus dans le paquet.

### Corrections

- Débrancher ou changer un périphérique audio pendant LIVE ou Karaoké arrête désormais proprement avec une explication au lieu de rester « en cours » sans son.
- Un périphérique débranché au démarrage n'est plus remplacé automatiquement dans vos paramètres.
- Messages clairs pour les erreurs audio courantes (mode exclusif, blocage confidentialité micro Windows, format non pris en charge, périphérique débranché, service Audio Windows arrêté).
- Lecture correcte des micros délivrant de l'audio 24 bits compacté en LIVE.
- Sauvegarde sécurisée des paramètres (évite les réinitialisations en cas de crash ou coupure de courant) avec copie de secours.
- Une seule fenêtre YuneVoix peut être exécutée à la fois.
- Conservation du journal précédent (`live-diag.prev.log`) et de `crash.log` après un crash pour le support.
- Les enregistrements de diagnostic s'arrêtent après 10 minutes et sont désactivés à chaque démarrage.
- **Cancel** met désormais fin aux tâches bloquées.
- Message clair si le paquet NVIDIA est lancé sans GPU NVIDIA ; le paquet AMD fonctionne aussi sur d'autres cartes compatibles DirectML.

### Compatibilité

- Les licences **PREMIUM** émises pour la `v0.6.0` continuent de fonctionner : copiez `license.yvl` à côté du nouvel `YuneVoix.exe`, ainsi que `models\yune\voices`, `yune.json` et `settings.json`. Les nouvelles options démarrent avec leurs valeurs par défaut (`Model method: Classic`).

---

## v0.6.0 (05/11/2026)

*Changements depuis la v0.4.0 (`v0.5.0` était une version interne jamais publiée).*

### Nouveautés

- **Deux éditions** : **BASIC** (conversion en direct, Voice Bank, tous les effets) et **PREMIUM** (tout BASIC + Song Cover).
- **Licence PREMIUM par PC** : `Song Cover → "Copy request code"` → `"Load license…"` (sans expiration, hors ligne, reste valide si 1 élément change parmi carte mère, disque système ou installation Windows).
- **Moteur de contenu `WavLM+`** (`Settings → Voice & Timbre → Content engine` ; `Settings → Song Cover` pour les covers - **NVIDIA uniquement**) : parole en direct plus nette, conserve rires, chuchotements et respirations propres et réduit le bourdonnement sur les rires et soupirs. `Whisper` reste le réglage par défaut pour un timbre plus fidèle.
- **Option « Silence stays silent »** (`Settings → EQ & Filters → YUNE output` et `Settings → Song Cover` ; activée par défaut).
- **Lien Ko-fi** (`ko-fi.com/yunevoix`) et mention de l'édition sous le numéro de version.

### Changements et suppressions

- Descriptions et conseils plus courts et plus précis dans les six langues, alignés sur les noms des boutons.
- `YuneVoix.exe --check` indique aussi l'édition, l'état de la licence PREMIUM et les fichiers du modèle `WavLM+`.
- **Suppression** de l'option vocodeur `BigVGAN` - **PC-NSF** est désormais l'unique vocodeur (auparavant par défaut, meilleur pour le chant et le souffle).
- Suppression des références obsolètes au filtre d'artefacts de trame (retiré dans la `v0.4.0`).
