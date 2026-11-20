# Deiteris w-okada Fork routen und abstimmen

Trage bei der Live-Konvertierung immer **Kopfhörer**. Über Lautsprecher gelangt die konvertierte Stimme zurück ins Mikrofon und erzeugt Echo und Rückkopplung.

## 1. Audiogeräte einrichten

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

- **Hohe Latenz oder robotisches Stottern**: deaktiviere **Hardwarebeschleunigte GPU-Planung (HAGS)** in den Windows-Grafikeinstellungen und starte neu, schließe GPU-lastige Spiele/Tabs und erhöhe Chunk um eine Stufe.
- **PortAudio- / Gerätefehler**: stelle alle Audiogeräte in den Windows-Soundeinstellungen auf dieselbe Abtastrate (`48000 Hz`) und schließe Apps mit exklusivem Gerätezugriff.
