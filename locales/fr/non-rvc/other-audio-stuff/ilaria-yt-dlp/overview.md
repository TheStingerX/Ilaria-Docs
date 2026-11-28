---
label: "Présentation"
icon: ":cd:"
order: 99
permalink: /non-rvc/ilaria-yt-dlp/
---

# Ilaria YT-DLP · Présentation

[GitHub](https://github.com/TheStingerX/Ilaria-YT-DLP) · [v2](https://github.com/TheStingerX/Ilaria-YT-DLP/releases/tag/v2) · [Windows ZIP](https://huggingface.co/TheStinger/Ilaria-YT-DLP/resolve/main/Ilaria-YT-DLP%20v2.zip?download=true)

[Présentation](overview.md) · [Formats et audio](formats.md) · [Listes et dépannage](playlists.md)

## Installer sur Windows

Téléchargez le ZIP et extrayez-le dans un dossier accessible en écriture. Gardez `App` à côté de `Ilaria YT-DLP.exe`. Lancez l’exécutable sous Windows 10 ou 11 64 bits. En cas de problème, utilisez `App\Start Ilaria YT-DLP.cmd` pour lire le message d’erreur. Le paquet contient Python, yt-dlp, FFmpeg, FFprobe et Deno.

## Télécharger une vidéo

Collez le lien d’une vidéo que vous êtes autorisé à télécharger dans **General & Formats**. Choisissez le dossier de destination, puis **Video + Audio (Best)**. Pour faciliter la lecture sur différents appareils, essayez le préréglage H.264/AAC 1080p. Utilisez **Simulate** pour vérifier la sélection avant de télécharger.

## Extraire la piste audio

Choisissez **Audio Only**, puis le format dans **Audio & PP**. Utilisez MP3 pour la compatibilité, Opus pour réduire la taille ou WAV pour le montage. La conversion en WAV ne restaure pas les détails perdus lors de la compression initiale.

## Sous-titres, chapitres et découpage

Dans **Subtitles, Thumbnails & Files**, choisissez les langues et décidez si les sous-titres seront séparés ou intégrés. Dans **Playlist, Filters & Cuts**, sélectionnez des chapitres ou une plage horaire et testez sur un extrait court. **SponsorBlock** peut marquer des segments sous forme de chapitres ou les retirer du fichier final.

## File d’attente, préréglages et dépannage

Collez une URL par ligne ou importez une liste `.txt`. Testez une URL avant de lancer toute la file. Exportez un préréglage JSON pour reprendre les mêmes réglages. En cas d’échec, consultez **Log & History**. Si FFmpeg est introuvable, vérifiez `App\bin` ou indiquez le chemin dans **Advanced & CLI**. Si l’enregistrement échoue, vérifiez aussi les droits d’écriture et l’espace disque.
