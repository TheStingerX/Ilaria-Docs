---
label: "Sicherheit, Datenschutz & Lizenzen"
icon: ":shield:"
order: 92
permalink: /safety-and-licensing/
description: "Praxisleitfaden zu Modellsicherheit (.pth vs .safetensors), Stimm-Einwilligung, Lizenzen, Cloud-Notebook-Sicherheit und Schutz von Zugangsdaten."
---
# Sicherheit, Datenschutz & Modell-Lizenzen

> **Praxishilfe, keine Rechtsberatung:** Diese Seite fasst technische Sicherheitsregeln und typische Lizenzhinweise für RVC-Modelle, Datensätze und Cloud-Notebooks zusammen. Prüfe immer die konkrete Lizenz jedes Modells oder Datensatzes.

## 1. Sicherheit heruntergeladener Modelle (`.pth` vs. `.safetensors`)

- **Warum `.pth`-Dateien Vertrauen erfordern:** PyTorch-`.pth`-Dateien nutzen Pythons `pickle`-Serialisierung. Moderne Apps wie **Ilaria RVC 2.4.0+** und **Applio** verwenden Schutzmechanismen (`weights_only`), dennoch solltest du `.pth`-Dateien nur aus **vertrauenswürdigen offiziellen Quellen** (Hugging Face oder GitHub Releases) laden.
- **Warum `.safetensors` sicherer ist:** `.safetensors` speichert nur Gewichte und Metadaten ohne ausführbaren Code. Mit dem [Safetensors-Konverter](../ilaria-rvc/manage/safetensors-converter.md) lassen sich Modelle sicher umwandeln.
- **Vor dem Laden prüfen:** Achte auf die Dateigröße (echte RVC-Inferenz-`.pth` sind meist ~40–110 MB), prüfe SHA-256-Hashes oder Signaturen und lade keine rohen `G_*.pth` / `D_*.pth`-Checkpoints aus unbekannten Quellen.

## 2. Einwilligung, Datenschutz & Lizenzen

- **Einwilligung:** Trainiere nur mit deiner eigenen Stimme, autorisierten Sprechern oder explizit lizenzierten Datensätzen.
- **Kommerzielle vs. nicht-kommerzielle Nutzung:** Auch bei Open-Source-Software (MIT) hat **jedes Stimmmodell und Pretrain eine eigene Lizenz** (teils kommerziell erlaubt, teils strikt **non-commercial / CC-BY-NC**). Siehe [Pretrained-Modelle](../start/pretrained.md).
- **Verantwortungsvoll teilen:** Gib RVC-Version (`v2`), Sample-Rate (`32k`/`40k`/`48k`), Embedder, passende `added_*.index` und Nutzungsbedingungen an.

## 3. Cloud-Notebooks & Zugangsdaten schützen

- **Kaggle, Colab & Lightning AI privat halten:** Startzellen (z. B. `Ilaria-RVC-Kaggle.ipynb`) geben aktive URLs und **WebUI-/FileBrowser-Passwörter** aus. Teile niemals Screenshots oder Logs mit aktiven Zugangsdaten.
- **Tokens schützen:** Füge keine **Ngrok-Tokens**, **Horizon-IDs** oder Hugging-Face-Write-Tokens in öffentliche Notebooks ein und stoppe Tunnel (`STOP = True`) nach der Nutzung.
- **Datenschutz:** Vertrauliche Aufnahmen sollten **lokal** bereinigt und konvertiert werden.
