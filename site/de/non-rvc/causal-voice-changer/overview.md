# Causal Voice Changer (CVC)

[GitHub](https://github.com/mojowozo/Causal-Voice-Changer) · [Releases](https://github.com/mojowozo/Causal-Voice-Changer/releases) · [Redpanda VC · Training mit Casual Voice Changer](../../other-rvcs/redpanda/causal-training.md)

**Causal Voice Changer (CVC)** ist ein **48-kHz**-Echtzeit-KI-Stimmenverzerrer, der die Lücke zwischen extrem latenzarmen Systemen (wie Beatrice) und langsameren, klanglich sehr hochwertigen Systemen (wie RVC) schließt. Statt Qualität gegen Geschwindigkeit einzutauschen, nutzt CVC eine destillierte Version von **ContentVec** und **RMVPE** in einer kausalen Architektur für sauberen Klang bei geringer Verzögerung.

## Unterschiede zu RVC (einfach erklärt)

Klassisches **RVC** wurde ursprünglich für ganze Audiodateien entwickelt, nicht für Live-Streams:

1. RVC nimmt einen Audioblock auf, konvertiert ihn und fügt ihn per **Crossfade** an den vorherigen Block an.
2. Verringert man die Blockgröße für weniger Latenz, fehlt RVC Kontext - Qualität und Tonhöhengenauigkeit sinken. Bei gehaltenen Tönen oder langgezogenen Wörtern hört man oft die Übergänge zwischen den Blöcken als Flattern.

**Causal Voice Changer (CVC)** arbeitet anders:

- Es ist **kausal**: Audio wird fortlaufend während des Eintreffens konvertiert, mit Blick nach hinten und nur **50 ms Lookahead-Puffer** auf der 100-Hz-v4-Basis (`60 ms` bei älteren 50-Hz-Stimmen).
- Da kontinuierlich gestreamt wird statt getrennte Blöcke zusammenzukleben, **bleiben gehaltene Töne und lange Laute sauber und stabil**.
- Du behältst nahezu die volle RVC-Qualität bei deutlich geringerer Latenz (unter Linux mit JACK-Audio oft rund **130 ms Ende-zu-Ende**).

## Wichtiger Hinweis zu Lizenz & kommerzieller Nutzung

Der Quellcode von CVC steht zwar unter der **MIT-Lizenz**, das enthaltene vortrainierte Basismodell wurde jedoch auf **EARS (CC BY-NC)**, **VCTK** und **LibriTTS-R** trainiert.

> **Nur für nicht-kommerzielle Nutzung**: Wegen des EARS-Datensatzes darfst du weder das enthaltene Basismodell noch **irgendeine darauf trainierte Stimme** kommerziell verwenden.

## Unterstützte Plattformen & Hardware

| Plattform | Oberfläche | GPU- / Backend-Unterstützung |
| --- | --- | --- |
| **Windows 10/11 (x64)** | WinUI 3 (Acrylic) oder Tk-Fallback | **NVIDIA** (CUDA), **AMD Radeon RX 7000/9000 / PRO W7000 / Ryzen AI** (ROCm 7.2.1), **AMD RX 6000 / PRO W6000** (`rocm-rdna2` Nightly); ältere Radeons laufen auf der CPU (Chunk ≥ `60 ms` wählen) |
| **Linux (x86_64)** | COSMIC (Rust) oder Tk-Fallback | glibc 2.35+ (Ubuntu 22.04, Debian 12 oder neuer); NVIDIA / AMD; **JACK / PipeWire** für geringste Latenz empfohlen |

## Was du mit CVC machen kannst

- **Eigene Stimmen trainieren** aus Roh-Audio ohne manuelles Schneiden oder Stille-Entfernen, bei beliebiger Sample-Rate.
- **Stimmen einfach teilen** als einzelne eigenständige `.cvc`-Dateien (Drag-and-Drop ins Live-Fenster).
- **Mikrofon live konvertieren** mit nativen Windows-/Linux-Oberflächen, integrierter Rauschunterdrückung (**Hushwire** oder **RNNoise**), Pitch Match, LUFS-Messung und Aufnahme.
- **Ganze Audiodateien offline konvertieren** über `causalvc.infer` oder die Dateiquelle in der Live-App.
