# Entrenar una voz en CVC

Crear una voz en Causal Voice Changer ajusta (fine-tune) el decodificador base con tu audio objetivo. A diferencia de herramientas más antiguas, **no necesitas cortar los audios ni eliminar silencios manualmente**, y las grabaciones pueden estar a **cualquier sample rate**.

> **Recordatorio de licencia**: las voces entrenadas con el modelo base preentrenado incluido no pueden usarse con fines comerciales.

## 1. Prepara tu audio

- Reúne grabaciones limpias de **un solo hablante** (sin música de fondo, reverberación fuerte ni voces superpuestas).
- Puedes indicar a CVC un **único archivo de audio** o una **carpeta** con varios archivos.
- No hace falta trocear ni remuestrear manualmente: CVC lo gestiona solo.

## 2. Entrena desde la ventana gráfica (Método para principiantes)

1. Abre **`run-training.bat`** (Windows) o **`run-training.sh`** (Linux).
2. Rellena el formulario:
   - **Dataset path**: selecciona tu archivo o carpeta de audio.
   - **Model name**: elige un nombre corto sin caracteres especiales (ej. `mivoz`).
   - **Batch size**: por defecto **`8`** (bájalo si te quedas sin memoria de GPU).
   - **Steps**: por defecto **`10,000` pasos** (tarda unos **35 minutos** en una RTX 4080).
   - **Save every**: cada cuántos pasos guardar un checkpoint `.cvc` (por defecto `10,000`).
   - **Custom base** *(opcional)*: actívalo si quieres entrenar desde una base personalizada en `custom-base/` en lugar de la base EARS por defecto.
3. Haz clic en **Start**.
4. Puedes pulsar **Stop** (o cerrar la ventana) en cualquier momento: CVC guarda un checkpoint para **reanudar** más tarde si el nombre coincide.

## 3. Entrena desde la línea de comandos (Opcional)

Si prefieres usar la terminal:

```bash
uv run python -m causalvc.build --name NOMBRE --audio /ruta/carpeta-o-archivo
```

Opciones útiles:
- `--save-every N`: guarda un checkpoint cada `N` pasos.
- `--app-models DIR`: copia automáticamente cada voz guardada en la carpeta `models/` de la app en vivo.
- `--base VALOR`: acepta `default`, el nombre de una carpeta dentro de `custom-base/`, o una ruta a un modelo base.

## 4. Entender y compartir archivos `.cvc`

Cada checkpoint guardado es un único archivo **`.cvc`** autónomo en:
```text
runs/models/voice-NOMBRE/voices/NOMBRE-PASOSs.cvc
```

Un archivo `.cvc` contiene todo lo necesario para esa voz (y las voces nuevas incluyen su propio **index** dentro del `.cvc`, unos 12 MB extra). Nada depende del PC que lo entrenó.

### Cómo cargar una voz `.cvc` en Realtime

- **Arrastra y suelta** el archivo `.cvc` sobre la ventana de **CausalVC Realtime**, **o**
- Cópialo en `realtime/models/` y pulsa **Reload** en la app.

### Exportar, convertir voces antiguas y añadir un Index

- **Exportar una voz**: en la página **Library**, haz clic en **Export** para guardar una voz instalada (con sus ajustes de tono y ganancia) en un archivo `.cvc` compartible.
- **Convertir voces antiguas en carpeta**: si tienes voces de versiones anteriores guardadas como carpetas, conviértelas con:
  ```bash
  python -m causalvc.voice cvc CARPETA
  ```
  o usando el script independiente `scripts/convert_to_cvc.py`.
- **Añadir un index a un `.cvc` antiguo**:
  ```bash
  python -m causalvc.index VOZ.cvc --audio /ruta/audio-entrenamiento
  ```
