---
label: "Sprachbandbreite mit AP-BWE erweitern"
icon: ":chart_with_upwards_trend:"
order: 96
permalink: /non-rvc/ilaria-audio-upscaler/ap-bwe/
---

# Sprachbandbreite mit AP-BWE erweitern

## Bandbreitenprofil auswählen

Wähle **AP-BWE** und passe die erste Profilzahl an die nutzbare Sprachbandbreite an. Ein 8-kHz-Signal enthält Frequenzen bis etwa 4 kHz. Ein Telefonat kann auch in einer 48-kHz-WAV so schmalbandig bleiben. Prüfe bei Unsicherheit ein Spektrogramm oder vergleiche benachbarte Profile mit demselben Ausschnitt. Die App resampelt vor der Inferenz auf die Eingaberate des Profils. Eine zu niedrige Rate kann Details entfernen.

| Eingang (kHz) | Ausgang (kHz) |
| ---: | ---: |
| 2 | 16 |
| 4 | 16 |
| 8 | 16 |
| 8 | 48 |
| 12 | 48 |
| 16 | 48 |
| 24 | 48 |

## Ergebnisse vergleichen

Lade den Checkpoint des gewählten Profils, füge Audio hinzu, wähle ein Ausgabeformat und starte **Enhance audio**. AP-BWE sagt Amplituden- und Phasenspektren parallel voraus und rekonstruiert die Wellenform mit der Zielrate. Die App verarbeitet die Kanäle getrennt. Teste bei stärkerem Rauschen oder metallischem Klang ein Profil näher an der Quellbandbreite.

[Übersicht](overview.md) · [Installation und Modelle](installation.md) · [Sprache mit Sidon restaurieren](sidon.md) · [Vorschau, Export und Fehlerbehebung](export.md)

## Quellen

[AP-BWE](https://github.com/yxlu-0102/AP-BWE) · [AP-BWE audio demos](https://yxlu-0102.github.io/AP-BWE/) · [studio_engine.py](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/App/studio_engine.py) · [AP-BWE weight license](https://github.com/TheStingerX/Ilaria-Audio-Upscaler/blob/main/LICENSE-AP-BWE-WEIGHTS.txt)
