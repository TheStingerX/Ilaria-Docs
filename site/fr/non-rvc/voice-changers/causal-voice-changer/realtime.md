# Utiliser CausalVC Realtime

Après avoir exécuté `run-training` au moins une fois et préparé une voix `.cvc`, lancez le changeur de voix en direct avec :
- **Windows** : `run-realtime.bat`
- **Linux** : `run-realtime.sh` *(ajoutez-le au lanceur d'applications avec `realtime/scripts/install-desktop-entry.sh`)*

> **Portez toujours un casque** en utilisation live. Avec des haut-parleurs, la voix convertie revient dans le micro et provoque écho et Larsen.

## 1. Configurer l'audio (page `Audio`)

1. **Input → Source** :
   - Choisissez **Microphone / audio device** pour parler en direct.
   - *(Ou **Audio file** pour tester une voix en passant un fichier enregistré dans le modèle.)*
2. **Input device** : sélectionnez votre microphone physique.
3. **Output device** : choisissez où envoyer la voix convertie.
   - Pour **Discord, OBS, VRChat ou les jeux**, installez un câble audio virtuel (comme **VB-CABLE** sous Windows), choisissez **`CABLE Input`** ici, puis sélectionnez **`CABLE Output`** comme micro dans Discord/OBS.
4. **Monitor device** *(optionnel)* : choisissez votre **casque** pour vous entendre. Laissez **Disabled** sinon.
5. *(Astuce Linux)* : les périphériques `[JACK]` offrent la plus faible latence. Réglez la période PipeWire avec `PIPEWIRE_QUANTUM`, ex. `128/48000`.

> **Correct Audio Routing**
>
> **1. Dans le Voice Changer**
> - **Input Device :** Votre microphone physique.
> - **Output Device :** `Line 1` (VAC, recommandé) ou `CABLE Input` (VB-CABLE).
>
> **2. Dans Discord, les jeux, OBS ou d'autres applications**
> - **Input Device :** `Line 1` (VAC, recommandé) ou `CABLE Output` (VB-CABLE).
> - **Output Device :** Votre casque (fortement recommandé plutôt que des haut-parleurs).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> L'audio reçu depuis Discord, le jeu ou une autre app doit être envoyé directement vers votre **casque** (jamais renvoyé dans le câble virtuel).
>
> - **VAC vs. VB-CABLE :** **VAC** (`Line 1`) est toujours recommandé. Si vous avez aussi (ou uniquement) **VB-CABLE**, le voice changer envoie vers **`CABLE Input`** et Discord / les jeux écoutent **`CABLE Output`**.
> - **Haut-parleurs et fuite du casque :** Évitez les haut-parleurs : le son peut repasser dans votre micro et créer un son doublé, de l'écho ou convertir aussi la voix d'autres personnes. Cela peut également arriver avec un casque s'il est trop fort ou insuffisamment fermé et isolé.
> - **Monitoring :** Entendre votre propre voix convertie dans votre casque est une fonction optionnelle séparée à n'activer qu'en cas de besoin. Évitez les chemins audio dupliqués, l'écho et le loopback.

## 2. Choisir et régler votre voix (page `Model`)

1. Choisissez **Model** (et **Checkpoint** si plusieurs étapes sont sauvegardées).
2. **Pitch (semitones)** : décalez votre hauteur en demi-tons (`+12` = une octave au-dessus, `-12` = une octave en dessous).
   - **Pitch match** : ne devinez pas ! Déposez des extraits de la voix cible dans Pitch match pour mesurer sa médiane en Hz, puis parlez pendant la conversion afin que CVC mesure votre voix et propose le décalage exact (**Apply**).
3. **Advanced pitch** *(replié par défaut - inutile pour la plupart des voix)* :
   - **Pitch offset (Hz)** : ajoute un décalage fixe en Hz après le décalage en demi-tons. Positif = resserre l'étendue ; négatif = l'élargit.
   - **Pitch ceiling (Hz)** et **Above the ceiling (%)** : limite les pics trop aigus au-dessus du plafond tout en gardant les notes en dessous justes (idéal pour chanter ; `0%` bloque au plafond).
4. **Formant** : modifie la résonance vocale sans changer la hauteur (`0` = formant naturel du modèle).
5. **Index (%)** *(désactivé par défaut)* : tire chaque bloc de 20 ms vers les moments les plus proches de l'audio d'entraînement. Trop haut peut brouiller les mots.
   - **Consonant protection** *(actif si Index > 0)* : préserve souffles et consonnes (`s`, `t`, `k`).

## 3. Régler les niveaux (`Levels`)

- **Input gain** : ajuste votre micro avant conversion.
- **Output gain** : volume envoyé vers Discord/OBS/jeux.
- **Monitor gain** : volume entendu uniquement dans votre casque.
- **Noise gate** : coupe le micro sous ce seuil (`-60 dB` = désactivé).
- **Output level (LUFS)** : parlez pendant la conversion puis cliquez sur **Apply** pour viser **Voice chat (`-21 LUFS`)** ou **Streaming (`-16 LUFS`)**.

## 4. Démarrer la conversion (barre du bas)

- Cliquez sur **Start** pour convertir en direct, ou sur **Passthrough** pour tester votre micro brut.
- Surveillez les vumètres **In / Out / Mon** et les indicateurs :
  - **Latency** : délai total du micro à la sortie.
  - **Inference** : temps mis par votre GPU pour convertir un bloc. **Inference doit rester bien inférieur à Chunk** (ex. `< 10 ms` pour un chunk de `20 ms`), sinon le son saccade.
