---
label: "🧩 Embedders"
order: 91
permalink: /embedders/
description: "Ein Embedder (auch Content Encoder genannt) ist das neuronale Netz, das dein Eingabe-Audio liest und das Gesprochene oder Gesungene in numerische Inhaltsmerkmale umwandelt, bevor das RVC-Stimmmodell es im Timbre der Zielstimme rekonstruiert."
---
# RVC-Embedder

Ein **Embedder** (auch **Content Encoder** genannt) ist das neuronale Netz, das dein Eingabe-Audio liest und das Gesprochene oder Gesungene in numerische Inhaltsmerkmale umwandelt, bevor das RVC-Stimmmodell es im Timbre der Zielstimme rekonstruiert.

## Was ein Embedder macht und wie er funktioniert

In einer RVC-Pipeline wird Audio in getrennte Informationsströme zerlegt:

1. **Inhalt (was du sagst)**: Bild für Bild vom **Embedder** extrahiert (Phoneme, Aussprache, Artikulation und Timing).
2. **Pitch / F0 (die Melodie)**: separat von einem Pitch-Tracker (wie RMVPE oder FCPE) erfasst.
3. **Stimmtimbre (wer spricht)**: geliefert vom trainierten RVC-`.pth`-Modell (und optional durch eine passende `.index`-Datei verstärkt).

Da der RVC-Generator darauf trainiert ist, Features von **genau einem Embedder** zu erwarten, gelten immer zwei Regeln:

- **Training und Inferenz müssen übereinstimmen**: Wurde ein Modell mit `contentvec` trainiert, musst du auch mit `contentvec` konvertieren. Ein anderer Embedder bei der Inferenz (oder im Live-Betrieb) führt zu verzerrter Aussprache, metallischen Artefakten oder einer unbrauchbaren Stimme.
- **Durchsickern der Sprecheridentität**: Allgemeine Spracherkennungs-Encoder (wie Standard-HuBERT) entfernen die ursprüngliche Sprecheridentität nicht explizit, wodurch dein eigenes Timbre in die Ausgabe durchsickern kann.

---

## Bekannte RVC-Embedder

> [!WARNING]
> **Nur zu Informationszwecken - Nutzung dringend abgeraten**
>
> Alle nachfolgenden Angaben zu alternativen Embeddern dienen **ausschließlich zu Informationszwecken**. **Wir raten dringend davon ab, alternative Embedder zu verwenden**: die **Standard-RVC-Einstellungen** (**`contentvec`**) sind die beste und sicherste Wahl. Alternative Embedder erhöhen das Risiko eines schlechten Stimmmodells oder schlechter Offline- und Online-(Live-)Konvertierungen und brechen die Kompatibilität mit Standard-Setups und Indexes.

| Embedder | Architektur / Hinweise | RVC-Support | Empfehlung |
| --- | --- | --- | --- |
| **`contentvec`** (`hubert_base.pt`) | Standard-Content-Encoder von RVC; erhält sprachlichen Inhalt und entfernt die Sprecheridentität. | RVC v1 (256-d) & RVC v2 (768-d) | **Empfohlen (Stock RVC)** |
| **`spin`** | Alternativer Fairseq/HuBERT-basierter sprecherinvarianter Encoder. | RVC v2 | Nicht für allgemeine Nutzung empfohlen |
| **`spin-v2`** (`spin-v2.pt`) | Aktualisierter Spin-v2-Encoder (~361 MiB) für bestimmte experimentelle Pretrains. | RVC v2 | Nicht für allgemeine Nutzung empfohlen |
| **`chinese-hubert-base`** | HuBERT Base, vortrainiert auf chinesischer Sprache. Kann Quelltimbre durchlassen. | RVC v2 | Nur informativ / spezialisiert |
| **`japanese-hubert-base`** | HuBERT Base, vortrainiert auf japanischer Sprache. Kann Quelltimbre durchlassen. | RVC v2 | Nur informativ / spezialisiert |
| **`korean-hubert-base`** | HuBERT Base, vortrainiert auf koreanischer Sprache. Kann Quelltimbre durchlassen. | RVC v2 | Nur informativ / spezialisiert |
| **`portuguese-hubert-base`** | Fairseq HuBERT Portugiesisch (`shiromiya/fairseq-hubert-portuguese`, ~1,13 GB). | RVC v2 | Nur informativ / spezialisiert |
| **`klm-vocal-contentvec`** | KLM Vocal ContentVec (`SeoulStreamingStation/KLM-Vocal-Embedder_ContantVEC_For_RVC`, ~251 MiB). | RVC v2 | Nur informativ / optional |
| **`custom` HuBERT Base** | Benutzerdefinierte HuBERT-Base-Dateien (`pytorch_model.bin` + `config.json`, 768 Dimensionen). | RVC v2 (v1 nur mit 256-d-Projektion) | Nur informativ / fortgeschritten |

## Wann man den Embedder tatsächlich ändern muss

- **Belasse ihn auf `Auto` oder `contentvec`** für nahezu alle Modelle und Trainings.
- **Ändere ihn nur**, wenn du eine Stimme heruntergeladen hast, deren Autor ausdrücklich einen anderen Embedder angibt (z. B. `spin-v2` oder `japanese-hubert-base`), und auch dann nur für dieses eine Modell.
- **Wechsle den Embedder niemals mitten im Training**: Ein Wechsel erfordert ein erneutes Extrahieren der Features (`3_feature768`) in einem separaten Experiment.

[Interaktive RVC-Kompatibilitätsmatrix](../reference/compatibility-matrix.md)
