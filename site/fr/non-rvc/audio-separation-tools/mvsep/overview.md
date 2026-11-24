# MVSep

[Site officiel (mvsep.com)](https://mvsep.com/) · [Classement qualité](https://mvsep.com/quality_checker/multisong_leaderboard)

**MVSep** (Music & Voice Separation) est une plateforme web gratuite dans le cloud dédiée à la séparation et à la restauration audio par IA. Tous les modèles tournant sur les serveurs distants de MVSep, **vous n'avez besoin ni d'un gros GPU ni d'aucune installation locale** - idéal si votre PC ne supporte pas les lourds modèles Roformer en local ou pour accéder à des algorithmes exclusifs comme **BS Polarformer**, **MVSep DnR v3** et les ensembles multi-modèles.

## Ce que MVSep sait faire

- **Séparation Voix et Instrumental** : architectures de pointe telles que **BS Polarformer**, BS-Roformer et Mel-Roformer.
- **Séparation Parole, Musique et SFX** : modèles cinématiques multipistes comme **MVSep DnR v3** (séparant dialogues, musique et effets sonores).
- **Voix principale vs Chœurs** : **MVSep Karaoke** et variantes Roformer Karaoke.
- **Restauration audio** : **DeReverb Stereo**, **DeReverb Room**, **DeNoise** (par aufr33 & gabox) et **DeEffect**.
- **Modèles multi-stems et spécialisés** : DrumSep 4/6/10 stems, basse, guitares, piano, cordes, percussions synthétiques et upscaling audio.

## Gratuit vs. Enregistré vs. Premium

MVSep **n'a pas d'abonnement mensuel** : les algorithmes principaux restent gratuits et les crédits prépayés optionnels n'expirent jamais.

| Fonctionnalité | Non inscrit | Compte gratuit inscrit | Premium (Solde de crédits actif) |
| --- | --- | --- | --- |
| **Durée max audio** | 10 min | 10 min | **100 min** |
| **Taille max fichier** | 100 Mo | 100 Mo | **1 000 Mo (1 Go)** |
| **Séparations par jour** | Jusqu'à 50 | Jusqu'à 50 *(BS 124-band : 5/jour par modèle)* | **Illimitées** |
| **Tâches simultanées** | 1 | 1 | **Illimitées** |
| **Priorité file d'attente** | Basse | Moyenne | **Haute** |
| **CAPTCHA** | Requis | **Aucun** | **Aucun** |
| **Format de sortie** | MP3 | **WAV 16-bit / FLAC 16-bit** | **WAV 32-bit float / FLAC 24-bit** |
| **Traitement par lots & API** | Non | Limité | **Accès complet** |

> **Astuce** : créer un simple **compte gratuit** sur [mvsep.com](https://mvsep.com/) supprime les CAPTCHA, améliore la file d'attente et débloque le téléchargement sans perte en **WAV / FLAC** - indispensable pour préparer des datasets RVC.
