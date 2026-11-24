---
label: "Deiteris routen & abstimmen"
icon: ":studio_microphone:"
order: 99
permalink: /ilaria-rvc/deiteris/live-audio/
description: "Trage bei der Live-Konvertierung immer Kopfhörer. Über Lautsprecher gelangt die konvertierte Stimme zurück ins Mikrofon und erzeugt Echo und Rückkopplung."
---
# Deiteris w-okada Fork routen und abstimmen

Trage bei der Live-Konvertierung immer **Kopfhörer**. Über Lautsprecher gelangt die konvertierte Stimme zurück ins Mikrofon und erzeugt Echo und Rückkopplung.

## 1. Audiogeräte einrichten

> **Correct Audio Routing**
>
> **1. Im Voice Changer**
> - **Input Device:** Dein physisches Mikrofon.
> - **Output Device:** `Line 1` (VAC, empfohlen) oder `CABLE Input` (VB-CABLE).
>
> **2. In Discord, Spielen, OBS oder anderen Anwendungen**
> - **Input Device:** `Line 1` (VAC, empfohlen) oder `CABLE Output` (VB-CABLE).
> - **Output Device:** Deine Kopfhörer (dringend statt Lautsprechern empfohlen).
>
> ```text
> Your Microphone → Voice Changer → Line 1 (VAC) or CABLE Input/Output (VB-CABLE) → Discord / Game / OBS
> ```
>
> Audio aus Discord, dem Spiel oder anderen Apps muss direkt auf deine **Kopfhörer** gehen (niemals zurück in das virtuelle Kabel).
>
> - **VAC vs. VB-CABLE:** **VAC** (`Line 1`) wird immer empfohlen. Falls du auch (oder nur) **VB-CABLE** nutzt, sendet der Voice Changer an **`CABLE Input`**, während Discord / Spiele **`CABLE Output`** empfangen.
> - **Lautsprecher & Übersprechen bei Headsets:** Vermeide Lautsprecher: Der Ton kann ins Mikrofon gelangen und Doppelton, Echo oder sogar die Konvertierung fremder Stimmen verursachen. Das kann auch bei Headsets passieren, wenn sie zu laut oder nicht geschlossen und gut genug isoliert sind.
> - **Monitoring:** Das Mithören der eigenen konvertierten Stimme im Kopfhörer ist eine separate optionale Funktion, die nur bei Bedarf aktiviert werden sollte. Vermeide doppelte Audiowege, Echo und Loopback.

1. Stelle **Audio Input** auf dein physisches Mikrofon.
2. Stelle **Audio Output** für einen ersten lokalen Test auf deine Kopfhörer oder für andere Apps auf **`CABLE Input`** (Wiedergabeseite des virtuellen Kabels).
3. Wähle in **Discord, OBS, VRChat oder deinem Spiel** **`CABLE Output`** als Mikrofon.
   - Deaktiviere in Discord **Rauschunterdrückung (Krisp)** und **automatische Eingangsempfindlichkeit**, damit Atemzüge und leise Wortenden nicht abgeschnitten werden.

## 2. Modell laden und Einstellungen anpassen

1. Lade oder wähle ein Inferenz-**RVC-`.pth`**-Modell und optional seine passende **`.index`**-Datei.
2. **Chunk / Block size**: starte bei etwa `0.3s` - `0.5s` (bzw. `192` / `256`+ je nach Regler), um Latenz und Stabilität auszubalancieren. Zu kleine Chunks verursachen robotisches Stottern.
3. **Extra Data / Context**: moderat halten (`0.5s` - `1.0s`) für stabilen Klang ohne GPU-Überlastung.
4. **F0 / Pitch-Detektor**: nutze **RMVPE** (am genauesten) oder **FCPE** (leichter/schneller für Live); vermeide schweres Crepe Full, falls die Inferenzzeit über der Chunk-Zeit liegt.
5. **Tune (Pitch)**: `+12` für Mann -> Frau, `-12` für Frau -> Mann, `0` für dieselbe Stimmlage.
6. **Index ratio**: starte bei `0.0` für einen sauberen Test und erhöhe vorsichtig (`0.3` - `0.6`), falls nötig.

## 3. Häufige Korrekturen

- **Hohe Latenz oder robotisches Stottern**: schließe GPU-lastige Spiele/Tabs, erhöhe Chunk um eine Stufe und teste bei Bedarf das Deaktivieren von **HAGS** (neu starten, vorher/nachher vergleichen und ohne Vorteil wieder aktivieren).
- **PortAudio- / Gerätefehler**: stelle alle Audiogeräte in den Windows-Soundeinstellungen auf dieselbe Abtastrate (`48000 Hz`) und schließe Apps mit exklusivem Gerätezugriff.
