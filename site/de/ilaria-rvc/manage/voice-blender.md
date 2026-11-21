# Voice Blender (Modelle mischen)

[Ilaria RVC 2.4.7 für Windows herunterladen (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

In **Ilaria RVC** findest du die Voice-Blender-Funktion im Tab **Other** unter **Merge models**. Damit kannst du die Gewichte zweier kompatibler `.pth`-Stimmenmodelle zu einer neuen Hybrid-Stimme kombinieren, ohne ein Modell komplett neu trainieren zu müssen.

## Vor dem Mischen: Kompatibilitätsregeln

Dass zwei Stimmen ähnlich klingen, bedeutet **nicht**, dass sie mischbar sind. Beide Quellmodelle müssen technisch übereinstimmen:

- **Nur Inferenz-`.pth`-Dateien:** Nutze exportierte Modelle aus `weights/`. Verwende niemals rohe Trainings-Checkpoints (`G_*.pth` / `D_*.pth`) oder `.onnx`-Dateien.
- **Gleiche RVC-Version:** Beide müssen dieselbe Architektur teilen (`v1` 256-d oder `v2` 768-d).
- **Gleiche Abtastrate (Sample Rate):** Beide müssen mit derselben Abtastrate trainiert worden sein (z. B. beide `40k` oder beide `48k`).
- **Gleicher Embedder / interne Dimensionen:** Beide brauchen kompatible Tensor-Formen.

!!!tip
Klicke in Ilaria RVC vor dem Mischen immer auf **Check model compatibility**. Schlägt die Prüfung fehl, können die beiden `.pth`-Dateien nicht kombiniert werden.
!!!

## Zwei Stimmen in Ilaria RVC mischen

1. Öffne den Tab **Other** und scrolle zu **Merge models**.
2. Wähle **Model A** und **Model B** in den Dropdowns (klicke zuerst auf **Refresh**, falls du gerade eine `.pth` hinzugefügt hast).
3. Klicke auf **Check model compatibility** und prüfe im Log, ob beide Modelle kompatibel sind.
4. Stelle **Model A contribution (%)** ein:
   - `50` ergibt eine gleiche **50% / 50%**-Mischung aus Modell A und Modell B.
   - `70` ergibt **70% Modell A** und **30% Modell B**.
   - `100` liefert nur Modell A; `0` liefert nur Modell B.
5. Wähle **Sample rate** (`Auto`, falls verfügbar, oder exakt die Rate beider Modelle).
6. Wähle **Output precision**:
   - `fp16` erzeugt eine kleinere Datei und läuft schneller auf modernen NVIDIA-CUDA-GPUs.
   - `fp32` ist größer, läuft aber überall, inklusive älterer GPUs, DirectML und CPU.
7. Vergib einen klaren **Output model name** (z. B. `Alice70_Bob30`) und optionale Notizen.
8. Klicke auf **Merge and save model** und prüfe im **Merge Log**, ob die `.pth` gespeichert wurde.

## Testen, Feintuning und `.index`-Verhalten

- **Es wird keine `.index`-Datei erstellt:** Beim Mischen werden nur `.pth`-Gewichte kombiniert; es entsteht **keine** neue `.index`-Datei.
- **Zuerst ohne Index testen:** Wechsle zu **Inference**, klicke **Refresh**, wähle deine neue gemischte `.pth` und teste sie an einem sauberen 10-20-Sekunden-`.wav`-Clip mit **Index Rate = 0**.
- **Direkt vergleichen:** Höre denselben Clip mit Modell A, Modell B und dem gemischten Modell bei gleicher Lautstärke an. Ändere **Model A contribution (%)** in kleinen Schritten (`40%`, `50%`, `60%`), bis die Mischung passt.
- **Optionaler Index-Test:** Wenn die `.pth`-Mischung gut klingt, kannst du testen, ob die `.index` von Modell A oder B bei niedriger **Index Rate** (`0.2` bis `0.4`) mehr Klarheit bringt, ohne zu stark zu einer Quelle zurückzuziehen.
- **Originale behalten:** Eine gemischte `.pth` dient ausschließlich der **Inferenz**. Sie enthält keinen Trainingszustand und kann kein Training fortsetzen.
