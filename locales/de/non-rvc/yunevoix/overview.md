---
label: "Überblick & Anforderungen"
icon: ":book:"
order: 99
permalink: /non-rvc/yunevoix/overview/
---
# YuneVoix (YUNE)

[Hugging Face (Download)](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Support & Premium)](https://ko-fi.com/yunevoix)

YuneVoix ist eine Echtzeit-KI-Stimmkonvertierungs-App für Windows, angetrieben von der **YUNE**-Engine. Genau wie RVC verwandelt sie deine Stimme in eine andere - für Sprache und Gesang, live oder offline - jedoch **ohne ein Stimmmodell trainieren zu müssen**. Alles läuft lokal auf deiner Grafikkarte: keine Cloud, kein Konto und dein Audio verlässt niemals deinen PC.

## So funktioniert es

Statt stundenlang ein Modell auf einem Datensatz zu trainieren, benötigt YUNE nur eine kurze Referenzaufnahme der Zielstimme (etwa **5–20 Sekunden**). Es trennt deine Stimme in *was du sagst* und *wie du es sagst*:

1. **Speech Encoder**: erfasst Wörter, Artikulation und Timing.
2. **Pitch Tracker**: verfolgt Melodie und Intonation.
3. **Diffusion-Transformer-Modell**: rekonstruiert das Audio im Timbre der Zielstimme anhand der kurzen Referenzaufnahme.
4. **Neuronaler Vocoder**: gibt Full-Band-Audio mit **44,1 kHz** aus.

Im **LIVE**-Modus wird das Audio in kleinen Blöcken von etwa **160 ms** verarbeitet, mit einer Gesamtverzögerung von rund **0,7 Sekunden** bei Standardeinstellungen.

## BASIC vs. PREMIUM

| Funktion | BASIC (Kostenlos) | PREMIUM |
| --- | --- | --- |
| **LIVE-Stimmenverzerrer** (Sprache & Gesang) | Enthalten | Enthalten |
| **Voice Bank** (`.yvoice`-Stimmen erstellen & teilen) | Enthalten | Enthalten |
| **Pitch-Werkzeuge** (Shift, Autotune, Stabilizer, Harmonie) | Enthalten | Enthalten |
| **Stimmcharakter & Effekte** | Enthalten | Enthalten |
| **Eingangsreinigung** (Rausch-/Klick-Entfernung, Speech Gate) | Enthalten | Enthalten |
| **Song Cover** (Gesang trennen, konvertieren & mischen) | - | Enthalten |
| **Karaoke** (mit Liedtexten auf dem Bildschirm singen) | - | Enthalten |
| **Offline-Lizenz** | Nicht erforderlich | `license.yvl` pro PC |

> **YuneVoix PREMIUM** ist für Unterstützer über [Ko-fi](https://ko-fi.com/yunevoix) erhältlich. Der Zugang wird privat über Ko-fi oder DMs vergeben, und die Lizenz funktioniert vollständig offline.

## Hauptfunktionen

- **LIVE-Stimmenverzerrer**: Mikrofon rein, konvertierte Stimme raus an jedes Audiogerät (Discord, OBS, Spiele, VRChat). Funktioniert für Sprache und Gesang inklusive Atmen, Flüstern und Lachen.
- **Voice Bank**: erstelle eine neue Stimme aus 10–25 Sekunden klaren Aufnahmen. YuneVoix kann automatisch Stimme von Musik/Hintergrundgeräuschen trennen und Hall entfernen.
- **Pitch-Werkzeuge**: manuelle oder automatische Oktavverschiebung, Autotune mit Tonarterkennung, sanfter Pitch-Stabilisator, Vibrato-Tiefe und Live-Harmonien (Terzen, Quinten, Oktaven).
- **Stimmcharakter**: Regler für Timbre-Stärke, Formant, Wärme und Präsenz mit Presets.
- **Eingangsreinigung**: Rausch- und Klick-Entfernung (`DF3` / `Gentle`), Speech Gate und Eingangs-/Ausgangs-Monitoring.
- **Gesangseffekte**: De-Esser, Kompressor, Reverb und Peak-Limiter.
- **Qualität vs. Geschwindigkeit**: zwei Content-Engines (darunter **WavLM+** auf NVIDIA und AMD DirectML, um eigenes Lachen, Flüstern und Atmen zu erhalten) sowie mehrere Modellmethoden. Schnellere Modi benötigen etwa 40 % der GPU-Zeit, und der **FlowEdit 3+1**-Modus bewahrt mehr von deiner natürlichen Atmung und Artikulation.
- **Song Cover & Karaoke (PREMIUM)**: ganze Songs mit automatischer Gesangstrennung neu einsingen oder zu Texten auf dem Bildschirm singen.
- **Oberfläche in 6 Sprachen**: Englisch, Deutsch, Italienisch, Spanisch, Polnisch und Portugiesisch.

## Systemanforderungen

YuneVoix erfordert eine **dedizierte GPU** und läuft nicht nur auf der CPU. Intel-Grafik, macOS und Linux werden nicht unterstützt.

| Komponente | NVIDIA (Empfohlen) | AMD (DirectML) |
| --- | --- | --- |
| **Betriebssystem** | Windows 10 / 11 64-Bit | Windows 11 **24H2** oder neuer (64-Bit) |
| **GPU** | 8 GB+ VRAM (**12 GB empfohlen**), GeForce RTX empfohlen | Radeon **RX 7000-Serie** oder neuer, 12 GB+ VRAM (**16 GB empfohlen**) |
| **Treiber** | Aktueller NVIDIA-Treiber | AMD Adrenalin **25.10.13.09** oder neuer |
| **Audio** | Mikrofon + **Kopfhörer** (für Live-Nutzung Pflicht) | Mikrofon + **Kopfhörer** (für Live-Nutzung Pflicht) |

> **Hinweis zu NVIDIA vs. AMD**: Seit **v0.7.1** nutzt das AMD-Paket standardmäßig **DirectML** auf der dedizierten Grafikkarte, und sowohl **`WavLM+`** als auch **`FlowEdit 3+1`** funktionieren jetzt ebenfalls auf AMD DirectML (in LIVE, Covers und Karaoke). Optional kannst du `Settings → General → "AMD graphics engine"` auf experimentelles **MIGraphX** umstellen (nach Neustart; unter MIGraphX stehen `WavLM+` und `FlowEdit 3+1` nicht zur Verfügung, und Windows lädt MIGraphX ggf. über Windows Update).
