# Instalar y actualizar YuneVoix

[Descargar en Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix es una aplicación portátil para Windows: no instala nada en el sistema y toda la configuración, voces, registros y licencias permanecen junto a `YuneVoix.exe`.

## 1. Descarga el paquete correcto (v0.7.1)

1. Descarga la compilación **v0.7.1** que corresponda a tu tarjeta gráfica y edición desde [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (para **PREMIUM**, la activación requiere un archivo `license.yvl` entregado en privado por [Ko-fi](https://ko-fi.com/yunevoix) o DM):
   - **BASIC (Gratis)**:
     - [Descargar YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) (~8,42 GB) - para GPUs GeForce RTX / CUDA.
     - [Descargar YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) (~6,74 GB) - para GPUs Radeon RX 7000+.
   - **PREMIUM** *(requiere `license.yvl`)*:
     - [Descargar YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) (~9,88 GB)
     - [Descargar YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) (~8,20 GB)
   > **Importante**: las compilaciones de NVIDIA y AMD son independientes y no intercambiables.
2. Anota la contraseña del archivo: **`yunevoix`** (o la recibida con tu descarga).

## 2. Extrae el archivo

El ZIP está cifrado con **AES-256**, por lo que el Explorador de Windows no puede abrirlo (indicará que no es válido).

1. Instala o abre **7-Zip** (`7-zip.org`) o **WinRAR**.
2. Extrae el archivo con la contraseña `yunevoix` en una carpeta local con permisos de escritura, como `D:\YuneVoix`.
   - **No** lo extraigas en `Program Files` ni en `OneDrive`.

## 3. Primer inicio y SmartScreen

1. Abre la carpeta extraída y ejecuta `YuneVoix.exe`.
2. Como el programa aún no está firmado digitalmente, Windows SmartScreen puede mostrar *"Windows protegió su PC"*. Haz clic en **Más información → Ejecutar de todas formas**.
   - Si tu antivirus marca algún archivo, verifica que el archivo provenga de la release oficial de YuneVoix, revisa **Seguridad de Windows → Historial de protección** y evita desactivar el antivirus o excluir carpetas completas.
3. **Espera la preparación inicial del motor**:
   - **NVIDIA**: unos minutos en el primer arranque.
   - **AMD**: desde la v0.7.1 usa **DirectML** en la tarjeta dedicada por defecto. Solo si cambias `Settings → General → "AMD graphics engine"` a **MIGraphX (experimental)** la primera preparación puede tardar **10–30 minutos** (Windows también puede descargar AMD MIGraphX por Windows Update).
   - Después del primer inicio, el modo **LIVE** arranca en unos **10 segundos**.
4. Puedes cambiar el idioma de la interfaz en la parte superior de la ventana (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Actualizar o pasar de BASIC → PREMIUM

Las licencias, voces y ajustes de la **v0.6.0 / v0.7.0** siguen funcionando en la **v0.7.1**. Para actualizar a una nueva versión o pasar de BASIC a PREMIUM sin perder voces ni ajustes:

1. Extrae la nueva versión en una **nueva** carpeta (no sobrescribas la anterior todavía).
2. Copia estos archivos/carpetas de la carpeta antigua a la nueva:
   - `models\yune\voices` (tus voces guardadas)
   - `settings.json` y `yune.json` (tu configuración)
   - `license.yvl` (para PREMIUM)
3. Ejecuta el nuevo `YuneVoix.exe` y comprueba que todo funciona antes de borrar la carpeta antigua.

Para desinstalar YuneVoix por completo, simplemente elimina su carpeta.
