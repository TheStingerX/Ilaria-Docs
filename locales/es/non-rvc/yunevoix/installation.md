---
label: "Instalación y actualizaciones"
icon: ":cd:"
order: 98
permalink: /non-rvc/yunevoix/installation/
---
# Instalar y actualizar YuneVoix

[Descargar en Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) · [Ko-fi (Premium)](https://ko-fi.com/yunevoix)

YuneVoix es una aplicación portátil para Windows: no instala nada en el sistema y toda la configuración, voces, registros y licencias permanecen junto a `YuneVoix.exe`.

## 1. Descarga el paquete correcto

1. Abre el [repositorio de YUNE en Hugging Face](https://huggingface.co/JohnBlvck/YUNE/tree/main) (para **PREMIUM**, el acceso se entrega en privado por Ko-fi o DM).
2. Descarga la compilación correspondiente a tu tarjeta gráfica:
   - Paquete **NVIDIA** para GPUs GeForce RTX / CUDA.
   - Paquete **AMD** para GPUs Radeon RX 7000+.
   > **Importante**: las compilaciones de NVIDIA y AMD son independientes y no intercambiables.
3. Anota la contraseña del archivo: **`yunevoix`** (o la recibida con tu descarga).

## 2. Extrae el archivo

El ZIP está cifrado con **AES-256**, por lo que el Explorador de Windows no puede abrirlo (indicará que no es válido).

1. Instala o abre **7-Zip** (`7-zip.org`) o **WinRAR**.
2. Extrae el archivo con la contraseña `yunevoix` en una carpeta local con permisos de escritura, como `D:\YuneVoix`.
   - **No** lo extraigas en `Program Files` ni en `OneDrive`.

## 3. Primer inicio y SmartScreen

1. Abre la carpeta extraída y ejecuta `YuneVoix.exe`.
2. Como el programa aún no está firmado digitalmente, Windows SmartScreen puede mostrar *"Windows protegió su PC"*. Haz clic en **Más información → Ejecutar de todas formas**.
   - Si tu antivirus pone algún archivo en cuarentena, añade la carpeta `YuneVoix` como exclusión.
3. **Espera la preparación inicial del motor**:
   - **NVIDIA**: unos minutos en el primer arranque.
   - **AMD (MIGraphX)**: hasta **10–30 minutos** en el primer arranque (Windows también puede descargar AMD MIGraphX por Windows Update).
   - Después del primer inicio, el modo **LIVE** arranca en unos **10 segundos**.
4. Puedes cambiar el idioma de la interfaz en la parte superior de la ventana (**English, Deutsch, Italiano, Español, Polski, Português**).

## 4. Actualizar o pasar de BASIC → PREMIUM

Para actualizar a una nueva versión o pasar de BASIC a PREMIUM sin perder voces ni ajustes:

1. Extrae la nueva versión en una **nueva** carpeta (no sobrescribas la anterior todavía).
2. Copia estos archivos/carpetas de la carpeta antigua a la nueva:
   - `models\yune\voices` (tus voces guardadas)
   - `settings.json` y `yune.json` (tu configuración)
   - `license.yvl` (para PREMIUM)
3. Ejecuta el nuevo `YuneVoix.exe` y comprueba que todo funciona antes de borrar la carpeta antigua.

Para desinstalar YuneVoix por completo, simplemente elimina su carpeta.
