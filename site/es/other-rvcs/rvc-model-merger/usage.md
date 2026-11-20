# RVC Model Merger

[GitHub](https://github.com/mojowozo/RVC-model-merger)

> **Notas importantes antes de empezar**
> - **Esta herramienta es únicamente un model merger**: no convierte audio, no hace conversión de micrófono en vivo ni entrena modelos nuevos. Solo combina dos o más modelos RVC `.pth` existentes en un nuevo archivo `.pth`.
> - **Se admite la combinación entre distintos sample rates**: a pesar de lo que indica el README del repositorio, **sí puedes** combinar modelos con **diferentes sample rates** (ej. `32k`, `40k`, `48k`) usando **Encoder-only**, siempre que compartan la **misma versión de RVC** (`v1` o `v2`) y la **misma arquitectura de vocoder** (`HiFi-GAN` o `RefineGAN`).

## Reglas de compatibilidad

| Requisito | Merge estándar | Merge Encoder-only |
| --- | --- | --- |
| **Versión de RVC** (`v1` vs `v2`) | Debe coincidir | Debe coincidir |
| **Arquitectura de vocoder** (`HiFi-GAN` vs `RefineGAN`) | Debe coincidir | Debe coincidir |
| **Sample rate** (`32k`, `40k`, `48k`) | Debe coincidir | **Puede variar** (el decodificador se toma de un solo modelo base) |

## Instalación

### Versión compilada (Windows)

1. Descarga el archivo de la release desde [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Extráelo en una carpeta con permisos de escritura y ejecuta el `.exe`.

### Desde el código fuente (Python)

1. Clona o descarga el repositorio desde [GitHub](https://github.com/mojowozo/RVC-model-merger).
2. Instala las dependencias:
   ```bat
   pip install -r requirements.txt
   ```
   *(Usa `torch==2.10.0` y `numpy==1.26.4`; `tkinterdnd2==0.6.2` es opcional para arrastrar y soltar.)*
3. Inicia la aplicación con `run.bat` o:
   ```bat
   python main.py
   ```

## Cómo combinar modelos

1. **Carga los modelos**: usa **Browse** (o arrastra archivos `.pth` a las ranuras). Haz clic en **+ Add Slot** para combinar más de dos modelos. Cada ranura detecta automáticamente vocoder (`HiFi-GAN` / `RefineGAN`), sample rate, versión de RVC y `f0`.
2. **Ajusta los pesos**: usa el control **Strength** (`0–100`) de cada ranura para definir cuánto aporta cada modelo. Las ranuras en `0` se omiten.
3. **Elige el modo de combinación**:
   - Deja **Encoder-only** desmarcado para una combinación completa cuando todos los modelos tienen el mismo sample rate.
   - Activa **Encoder-only** para combinar modelos con **distinto sample rate** (o cuando solo quieras mezclar el encoder conservando el decodificador de un único modelo).
4. **Nombre y presets (opcional)**: mantén el nombre automático (**Auto**) o escribe uno personalizado. También puedes guardar/cargar configuraciones con **Preset → Save / Delete**.
5. **Combina**: haz clic en **Merge Models**. El archivo `.pth` resultante se guardará en la carpeta `merges/` (usa **Open Folder** o **Open merges folder** para abrirla).
