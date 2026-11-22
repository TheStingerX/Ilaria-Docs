---
label: "Übersicht & Anforderungen"
icon: ":book:"
order: 99
permalink: /de/non-rvc/yunevoix/overview/
description: "YuneVoix ist eine Echtzeit-KI-Stimmenkonvertierungs-App für Windows, angetrieben von der YUNE-Engine."
---
# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Support & Premium)](https://ko-fi.com/yunevoix)

YuneVoix ist eine Echtzeit-KI-Stimmenkonvertierungs-App für Windows, angetrieben von der **YUNE**-Engine. Genau wie RVC verwandelt es deine Stimme in die einer anderen Person - sowohl beim Sprechen als auch beim Singen, live oder offline - aber **ohne ein einzelnes Stimmmodell zu trainieren**. Alles läuft lokal auf deiner eigenen Grafikkarte: keine Cloud, kein Konto, und dein Audio verlässt niemals deinen PC.

> **Leitfaden-Übersicht:** [1. Übersicht & Anforderungen](overview.md) · [2. Installieren & Aktualisieren](installation.md) · [3. Voice Bank & Live-Nutzung](usage.md) · [4. Einstellungen & Audioqualität](settings.md) · [5. Song Cover & Karaoke](song-cover-karaoke.md) · [6. Premium, Lizenz & Hilfe](premium-and-troubleshooting.md) · [7. Changelog](changelog.md)

## So funktioniert es

Anstatt Stunden damit zu verbringen, ein Modell auf einem Datensatz zu trainieren, erstellt YUNE ein **Voice Bank**-Profil aus einer kurzen Referenzaufnahme der Zielstimme (**10-25 Sekunden**). *(Unabhängig davon nutzt die LIVE-Methode **FlowEdit 3+1** zusätzlich eine **5-20 Sekunden** lange Aufnahme deiner eigenen natürlichen Stimme als Ausgangspunkt - zum Beispiel 15 Sekunden der Zielstimme in der Voice Bank vs. 10 Sekunden deiner eigenen normalen Sprache unter `Settings → Voice & Timbre → Sample of your voice…`.)*

Laut Entwicklerdokumentation teilt die YUNE-Pipeline deine Stimme in *was du sagst* und *wie du es sagst* auf:

1. **Voice Bank & Sprecheridentität:** Speichert ein Stimmprofil (`.yvoice`) aus einer 10-25-sekündigen Zielaufnahme, ohne ein separates neuronales Netz von Grund auf zu trainieren.
2. **Content-Engine (`Whisper` oder `WavLM+`):** Erfasst deine Wörter, dein Timing und deine Artikulation.
3. **Pitch-Tracking:** Folgt deiner Melodie und Intonation.
4. **Diffusionsbasierte Konvertierung:** Baut das Audio mit der Voice-Bank-Referenz in der Klangfarbe der Zielstimme neu auf.
5. **Neuronaler Vocoder (`PC-NSF`):** Gibt Vollband-Audio mit **44.1 kHz** aus.
6. **Audioverarbeitung:** Wendet Eingangsreinigung, Pitch-/Autotune-Werkzeuge, EQ/Filter und Effekte an.

Im **LIVE**-Modus wird das Audio in kleinen Blöcken von etwa **160 ms** verarbeitet, mit rund **0.7 Sekunden** gesamter Ende-zu-Ende-Verzögerung bei Standardeinstellungen (laut Entwicklerangaben).

## BASIC vs. PREMIUM

| Funktion | BASIC (Kostenlos) | PREMIUM |
| --- | --- | --- |
| **LIVE-Stimmenverzerrer** (Sprechen & Singen) | Enthalten | Enthalten |
| **Voice Bank** (`.yvoice`-Stimmen erstellen & teilen) | Enthalten | Enthalten |
| **Pitch-Werkzeuge** (Shift, Autotune, Stabilizer, Harmonie) | Enthalten | Enthalten |
| **Stimmcharakter & Stimm-Effekte** | Enthalten | Enthalten |
| **Eingangsreinigung** (Rausch-/Klickentfernung, Speech Gate) | Enthalten | Enthalten |
| **Song Cover** (Gesang trennen, konvertieren, mischen) | - | Enthalten |
| **Karaoke** (mitsingen mit Liedtext auf dem Bildschirm) | - | Enthalten |
| **Offline-Lizenz** | Nicht erforderlich | `license.yvl` pro PC |

> **YuneVoix PREMIUM** steht Unterstützern auf [Ko-fi](https://ko-fi.com/yunevoix) zur Verfügung. Der Zugang wird privat über Ko-fi oder DMs abgewickelt, und die Lizenz funktioniert vollständig offline. Siehe [Song Cover & Karaoke](song-cover-karaoke.md) und [Premium, Lizenz & Hilfe](premium-and-troubleshooting.md) für Details.

## Hauptfunktionen

- **LIVE-Stimmenverzerrer**: Mikrofon rein, konvertierte Stimme raus an jedes Audiogerät (Discord, OBS, Spiele, VRChat). Funktioniert zum Sprechen und Singen.
- **Voice Bank**: erstelle ein neues `.yvoice`-Profil aus **10-25 Sekunden** klaren Aufnahmen. YuneVoix kann automatisch Stimme von Musik/Rauschen trennen und Hall entfernen.
- **Drei Modellmethoden** (laut Entwicklerdokumentation):
  - **Classic:** Verhalten früherer Versionen mit konfigurierbaren `Model steps`, `Solver` und Guidance-Reglern.
  - **Learned 4 steps:** Darauf abgestimmt, wie Classic mit 10 Schritten zu klingen, bei etwa **40%** der GPU-Zeit des Modells und weniger GPU-Speicher.
  - **FlowEdit 3+1:** Startet von deiner eigenen Quellstimme (5-20 s Eigenstimm-Sample in LIVE; die Gesangsspur im Song Cover) statt von Rauschen und zielt darauf ab, Atemzüge, Flüstern, Lachen und Artikulation besser zu erhalten (laut Angaben bei etwa **60%** der GPU-Zeit des Modells).
- **Content-Engines**: **Whisper** (Standard) und **WavLM+** (auf NVIDIA und AMD DirectML, ausgelegt auf klarere Live-Sprache und besseren Erhalt von Lachen, Flüstern und Atemzügen).
- **Pitch-Werkzeuge**: manuelle oder automatische Tonhöhenverschiebung, Autotune mit Tonarterkennung, sanfter Pitch-Stabilizer, Vibrato-Tiefe und Live-Harmonie (Terzen, Quinten).
- **Stimmcharakter, EQ & Effekte**: Timbre-Stärke, Formanten, Wärme, Weichheit, Präsenz, De-Esser, dynamischer EQ, Kompressor, Sättigung, Bitcrush, Hall und Peak-Limiter. Siehe [Einstellungen & Audioqualität](settings.md).
- **Song Cover & Karaoke (PREMIUM)**: ganze Songs mit automatischer Stimmtrennung neu singen oder zu Liedtexten auf dem Bildschirm mitsingen.
- **UI-Sprachauswahl**: Englisch, Deutsch, Italienisch, Spanisch, Polnisch und Portugiesisch.

## Systemanforderungen

YuneVoix benötigt eine **dedizierte GPU** und läuft nicht allein auf der CPU. Integrierte Intel-/Arc-Grafik, macOS und Linux werden nicht unterstützt.

| Komponente | NVIDIA (Empfohlen) | AMD |
| --- | --- | --- |
| **OS** | Windows 10 / 11 64-bit | Windows 10 / 11 64-bit |
| **GPU** | 8 GB+ VRAM (**12 GB empfohlen**), GeForce RTX empfohlen | Radeon **RX 7000-Serie** oder neuer, 12 GB+ VRAM (**16 GB empfohlen**) |
| **Treiber** | Aktueller NVIDIA-Treiber | Aktueller AMD Software: Adrenalin Edition-Treiber |
| **Audio** | Mikrofon + **Kopfhörer** (für Live-Nutzung erforderlich) | Mikrofon + **Kopfhörer** (für Live-Nutzung erforderlich) |

> **Fußnote (AMD):** Windows 11 24H2+ und Adrenalin 25.10.13.09+ sind nur für die experimentelle **MIGraphX**-Engine erforderlich, die unter `Settings → General → "AMD graphics engine"` verfügbar ist.

### AMD DirectML vs. AMD MIGraphX

- **AMD DirectML (Standard in v0.7.1):** Integriert und standardmäßig auf der dedizierten AMD-GPU aktiv. Funktioniert sofort ohne Windows-Update-Download oder anfängliches Modell-Kompilieren und unterstützt laut Entwicklerdokumentation sowohl **`WavLM+`** als auch **`FlowEdit 3+1`**.
- **AMD MIGraphX (Experimentell):** Muss ausdrücklich unter `Settings → General → "AMD graphics engine"` aktiviert werden und erfordert einen Neustart. Windows Update lädt eventuell MIGraphX-Komponenten herunter, die erstmalige Modellvorbereitung kann **10-30 Minuten** dauern, und **`WavLM+`**, **`FlowEdit 3+1`** sowie **`Learned 4 steps`** sind unter MIGraphX **nicht** verfügbar (das Modell läuft immer als Classic, 10 × Euler).

Nächster Schritt: [YuneVoix installieren und aktualisieren](installation.md).
