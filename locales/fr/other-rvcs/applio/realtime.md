---
label: "Configurer un microphone en direct"
icon: ":headphones:"
order: 93
permalink: /ilaria-rvc/applio/realtime/
description: "Prouvez que votre modèle fonctionne avec un clip enregistré avant de configurer l'audio en direct."
---
# Utilisez Applio avec un microphone

> **Correct Audio Routing**
>
> **1. Dans le Voice Changer**
> - **Input Device :** Votre microphone physique.
> - **Output Device :** `Line 1` (Virtual Audio Cable / VAC).
>
> **2. Dans Discord, les jeux, OBS ou d'autres applications**
> - **Input Device :** `Line 1` (Virtual Audio Cable / VAC).
> - **Output Device :** Vos écouteurs ou haut-parleurs.
>
> ```text
> Your Microphone → Voice Changer → Virtual Audio Cable (Line 1) → Discord / Game / OBS
> ```
>
> L'audio reçu depuis Discord, le jeu ou une autre app doit être envoyé directement vers votre **casque** (jamais renvoyé dans le câble virtuel).
>
> - **VAC vs. VB-CABLE :** `Line 1` est le nom utilisé par **VAC (Virtual Audio Cable)**, pas un nom universel pour tous les câbles virtuels. Avec **VB-CABLE**, réglez la sortie du Voice Changer sur **`CABLE Input`** et l'entrée de Discord / jeu sur **`CABLE Output`**.
> - **Monitoring :** Entendre votre propre voix convertie dans votre casque est une fonction optionnelle séparée à n'activer qu'en cas de besoin. Évitez les chemins audio dupliqués, l'écho et le loopback.

Prouvez que votre modèle fonctionne avec [un clip enregistré](inference.md) avant de configurer l'audio en direct. Utilisez des écouteurs pour la surveillance afin que le microphone ne puisse pas recapturer les haut-parleurs. Arrêtez les tâches de formation ou de conversion de fichiers qui utilisent le même GPU.

## Écoutez localement la voix convertie

1. Ouvrez **Realtime**. Dans Desktop, autorisez le microphone lorsque vous y êtes invité, puis sélectionnez **Périphérique d'entrée** et **Périphérique de sortie**. Actualisez la liste si vous avez connecté un appareil après avoir ouvert Applio.
2. Utilisez votre microphone physique comme entrée et votre casque comme sortie ou moniteur pour ce premier test. Dans Gradio, choisissez les appareils dans **Périphériques audio**. Les noms de périphériques PortAudio peuvent différer des noms Windows ou des étiquettes affichées sur le bureau.
3. Sélectionnez le modèle testé, son intégrateur correspondant et l'index facultatif si vous l'utilisez. Démarrez le flux et attendez l'état prêt. Dans Desktop, activez **M'entendre** pour surveiller et régler un volume confortable.
4. Dites « un, deux, trois », faites une pause, puis répétez à votre niveau de parole normal. Écoutez la voix convertie, les syllabes manquantes ou les clics. Si vous entendez votre voix inchangée, cochez **Passthrough** et vérifiez si le microphone est surveillé ailleurs.

## Acheminez-le vers votre application de chat ou de streaming

Une fois le test du casque fonctionnel, arrêtez le flux et choisissez un câble audio virtuel installé ou un périphérique de système d'exploitation équivalent. Le câble virtuel a un point d'extrémité qui reçoit la lecture et un autre qui expose ce signal comme entrée d'enregistrement.

```text
Physical microphone
  → Applio Realtime input
  → virtual cable playback endpoint
  → virtual cable recording endpoint
  → Discord, OBS or your recording application
```

1. Conservez l'entrée d'Applio sur le microphone physique et sélectionnez le point de terminaison de lecture du câble comme sortie.
2. Dans l’application de réception, sélectionnez le point final d’enregistrement du câble comme microphone. Si vous avez besoin de surveillance, utilisez des écouteurs. Désactivez les chemins de surveillance qui renvoient le câble vers lui-même.
3. Démarrez Applio, puis utilisez le test du microphone de l'application réceptrice ou effectuez un enregistrement de test privé. Vérifiez qu'il entend le signal converti. Désactivez les entrées micro physiques en double si vous entendez deux voix.
4. Si le son des écouteurs est correct mais que l'application de réception est silencieuse, dépannez les noms des appareils, le niveau de destination et la sélection d'entrée avant de modifier la voix ou l'index.

## Retard d'équilibre et stabilité audio

Utilisez d’abord le dimensionnement automatique des morceaux lorsque cela est disponible. Si l'audio est interrompu, augmentez **Chunk Size**, puis répétez exactement la même phrase. Des morceaux plus petits peuvent réduire le retard tout en laissant au moteur moins de temps pour terminer chaque bloc. **Crossfade Overlap** lisse les jointures et **Extra Conversion Size** offre plus de contexte à un coût de calcul. Changez un contrôle par test. Conservez un paramètre stable auquel vous pouvez revenir.

Si les démarrages silencieux ou les fins de mots disparaissent, cochez **VAD** ou **Silence Threshold**. Si des voyelles fortes crépitent, vérifiez le microphone brut et réduisez son gain d'entrée. Si le flux échoue uniquement avec un jeu ou une tâche GPU particulière en cours d'exécution, réessayez avec cette tâche fermée. Arrêtez le mode direct avant de revenir à l'entraînement ou au travail GPU en file d'attente.
