# Instalar y actualizar YuneVoix

[Descargar en Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix es una aplicación portable de Windows: no se instala nada en Windows y todos los ajustes, voces, registros y licencias viven junto a `YuneVoix.exe`.

## 1. Identifica tu GPU y descarga el paquete correcto (v0.7.1)

1. Comprueba tu tarjeta gráfica dedicada en **Administrador de tareas de Windows → Rendimiento → GPU** (NVIDIA GeForce RTX frente a AMD Radeon RX 7000+).
2. Descarga la compilación **v0.7.1** correspondiente desde [Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (para **PREMIUM**, la activación requiere un `license.yvl` obtenido de forma privada por [Ko-fi](https://ko-fi.com/yunevoix) o mensajes directos):
   - **BASIC (Gratis)**:
     - [Descargar YuneVoix BASIC NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_NVIDIA_v0.7.1.zip?download=true) - para GPUs NVIDIA (8 GB+ VRAM, 12 GB recomendados).
     - [Descargar YuneVoix BASIC AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_BASIC_AMD_v0.7.1.zip?download=true) - para GPUs AMD Radeon RX 7000+ (12 GB+ VRAM, 16 GB recomendados).
   - **PREMIUM** *(requiere `license.yvl`)*:
     - [Descargar YuneVoix PREMIUM NVIDIA v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_NVIDIA_v0.7.1.zip?download=true) - para GPUs NVIDIA.
     - [Descargar YuneVoix PREMIUM AMD v0.7.1 (ZIP)](https://huggingface.co/JohnBlvck/YUNE/resolve/main/YuneVoix_PREMIUM_AMD_v0.7.1.zip?download=true) - para GPUs AMD Radeon RX 7000+.
   > **Importante:** Los paquetes NVIDIA y AMD son independientes y no son intercambiables. **No** muevas ni elimines las carpetas incluidas junto a `YuneVoix.exe`:
   > - **Paquete NVIDIA:** mantén **`models`** y **`cuda`** junto a `YuneVoix.exe`.
   > - **Paquete AMD:** mantén **`models`** y **`cache`** junto a `YuneVoix.exe`.
3. Ten en cuenta la contraseña del archivo publicada con el lanzamiento: **`yunevoix`** (incluida aquí tal como la documenta el mantenedor del proyecto).

## 2. Extraer el archivo

El archivo ZIP está cifrado con **AES-256**, por lo que el Explorador de Windows no puede abrirlo (indicará que el ZIP no es válido).

1. Instala o abre **7-Zip** (`7-zip.org`) o **WinRAR**.
2. Extrae todo el archivo usando la contraseña `yunevoix` en una carpeta local con permisos de escritura como `D:\YuneVoix`.
   - **No** lo extraigas en `Program Files` ni en `OneDrive`.

## 3. Primer inicio, SmartScreen y comprobación de motor

1. Abre la carpeta extraída y ejecuta `YuneVoix.exe`.
2. Verifica que el archivo provenga del [repositorio oficial de YUNE en Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main). Como el ejecutable aún no tiene firma digital, Windows SmartScreen puede mostrar *"Windows protegió su PC"*. Haz clic en **Más información → Ejecutar de todas formas** tras confirmar el origen.
   - Si tu antivirus marca un archivo, revisa **Seguridad de Windows → Historial de protección** y verifica el origen del archivo antes de permitirlo; **no** desactives Windows Defender ni la protección antivirus de forma global.
3. **Espera la preparación inicial**:
   - El primer inicio descomprime bibliotecas una sola vez y tarda más.
   - **AMD:** usa **DirectML** en la GPU dedicada por defecto en la v0.7.1 (sin descarga de Windows Update ni compilación de modelos). Solo si cambias `Settings → General → "AMD graphics engine"` al modo experimental **MIGraphX** (tras reiniciar), la primera compilación de modelos puede tardar **10-30 minutos**.
   - Revisa la línea de estado LIVE o ejecuta `YuneVoix.exe --check` (`check.txt`) para confirmar qué motor gráfico y GPU están activos.
4. Puedes cambiar el idioma de la interfaz en la parte superior de la ventana (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Actualizar o pasar de BASIC a PREMIUM

Las licencias, voces y ajustes de **v0.6.0 / v0.7.0** siguen funcionando en la **v0.7.1**. Para actualizar a una nueva versión o pasar de BASIC a PREMIUM sin perder tus voces ni ajustes:

1. Extrae la nueva versión en una carpeta **nueva** (no sobrescribas todavía la anterior).
2. Copia estos archivos y carpetas desde la carpeta antigua de YuneVoix a la nueva:
   - `models\yune\voices` (tus voces guardadas)
   - `settings.json` y `yune.json` (tu configuración)
   - `my_voice.yvoice`, si existe (la muestra de tu propia voz usada por **FlowEdit 3+1** en LIVE)
   - `license.yvl` (para PREMIUM)
3. Inicia el nuevo `YuneVoix.exe` y comprueba que todo funciona antes de borrar la carpeta antigua.

> **Actualización desde v0.6.0:** Si habías configurado una muestra de tu propia voz antes de la v0.7.0, vuelve a seleccionarla una vez en `Settings → Voice & Timbre → "Sample of your voice…"`; de lo contrario, **FlowEdit 3+1** volverá automáticamente a **Learned 4 steps** en LIVE. Esto es necesario porque la v0.7.0+ necesita la referencia vuelta a seleccionar para vincular `my_voice.yvoice` a FlowEdit y a la fuerza de timbre.

Para desinstalar YuneVoix por completo, simplemente elimina su carpeta.

Siguiente paso: [Voice Bank y Uso en Directo](usage.md).
