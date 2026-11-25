# Convertidor Safetensors ↔ PTH

[Descarga Ilaria RVC 2.4.7 para Windows (ZIP)](https://huggingface.co/TheStinger/Ilaria_RVC/resolve/main/releases/2.4.7/ILARIA_RVC-2.4.7.zip?download=true)

Desde **Ilaria RVC 2.4.5**, la pestaña **Other** incluye **Convert model weights**, una herramienta integrada para convertir modelos de voz `.pth` a `.safetensors` y viceversa.

---

## Exportación y restauración ONNX (2.5.1)

En **Other → Convert model weights**, selecciona un modelo instalado o proporciona un archivo. Exporta un modelo RVC HiFi-GAN con guía de tono a ONNX para un cliente externo compatible. La restauración exacta a `.pth` está disponible para los ONNX exportados por Ilaria RVC. Conserva el `.pth` original si usas otro exportador. [Ilaria RVC 2.5.1](https://huggingface.co/TheStinger/Ilaria_RVC/blob/main/releases/2.5.1/RELEASE-NOTES.md)

## 1. ¿Qué son `.pth` y `.safetensors`? (En palabras simples)

Al descargar modelos de voz IA, normalmente ves archivos `.pth` y a veces `.safetensors`:

- **`.pth` (formato PyTorch):** El formato clásico de RVC. Guarda los pesos de la red neuronal **más** la configuración de la voz (sample rate, pitch guidance, versión RVC, embedder). Sin embargo usa el formato `pickle` de Python, por lo que PyTorch moderno (`2.6+`) restringe su carga por seguridad.
- **`.safetensors` (formato SafeTensors):** Un formato moderno creado por Hugging Face que guarda los pesos **sin código ejecutable**. Es mucho más seguro para compartir o descargar y carga de forma limpia.

**¿Por qué convertir entre ambos?**
- Convierte **`.pth` → `.safetensors`** para archivar o compartir tu modelo en un formato más seguro conservando sus ajustes RVC.
- Convierte **`.safetensors` → `.pth`** cuando descargaste un modelo `.safetensors` y necesitas un `.pth` para cargarlo en **Inferencia** en Ilaria RVC u otra app RVC.

---

## 2. Cómo funciona el convertidor de Ilaria RVC

En **Other → Convert model weights**, Ilaria RVC realiza la conversión de forma segura en la **CPU** (sin usar GPU ni VRAM):

- **Instalación automática inicial:** Si aún no tienes `safetensors`, Ilaria RVC descarga e instala `safetensors==0.8.0` en `assets/weight_converter/dependencies` en el primer uso (requiere internet solo la primera vez).
- **Conservación de metadatos RVC:** Al pasar un `.pth` exportado de RVC a `.safetensors`, guarda la configuración de voz en la etiqueta `ilaria_rvc_checkpoint`. Al convertir ese `.safetensors` de vuelta a `.pth`, restaura toda la configuración para usarlo al instante en Inferencia.
- **Archivos solo de tensores:** Si conviertes un `.safetensors` sin metadatos RVC, se convierte a un `.pth` de solo pesos, pero sin los datos necesarios para Inferencia automática ni **Move .pth to models**.
- **Checkpoints de entrenamiento bloqueados:** Los checkpoints crudos (`G_*.pth` o `D_*.pth` en `logs/`) no se pueden convertir aquí. Exporta primero tu modelo final.

---

## 3. Paso a paso: convertir `.pth` ↔ `.safetensors`

1. Abre la pestaña **Other** y despliega **Convert model weights**.
2. Arrastra o selecciona tu archivo `.pth` o `.safetensors` en **Choose or drop a .pth or .safetensors file**.
3. Pulsa **Convert weights**.
4. Sigue el progreso en **Conversion Log** (`5% | Preparing Safetensors...` → `10% | Reading weights on CPU...` → completado).
5. Descarga el archivo resultante en **Download converted weights**.

### Usar **Move .pth to models** (de `.safetensors` → `.pth`)
Si acabas de convertir una voz `.safetensors` (con metadatos RVC) a `.pth`:
1. En lugar de moverlo a mano, pulsa **Move .pth to models**.
2. Ilaria RVC comprueba que el `.pth` sea una voz RVC completa (`config`, `weight` y `emb_g.weight`) y lo mueve directamente a `models/`.
3. Ve a **Inferencia**, pulsa **Refresh** y tu voz estará lista.

!!!tip
**¿Sobrescribe un modelo existente?**
No. Si ya existe un `.pth` con el mismo nombre en `models/`, **Move .pth to models** se detiene por seguridad y te avisa.
!!!

---

## 4. Mensajes comunes y soluciones

| Mensaje en Conversion Log | Qué significa | Cómo solucionarlo |
| --- | --- | --- |
| `Could not download Safetensors. Check your internet connection and retry.` | Falló la instalación inicial de `safetensors` por falta de conexión o bloqueo de VPN/firewall. | Conéctate a internet (o desactiva temporalmente VPN/firewall estricto) y pulsa **Convert weights** una vez. Después funcionará sin conexión. |
| `This checkpoint contains training state or unsupported metadata. Export a voice model first.` | Cargaste un checkpoint crudo `G_*.pth` o `D_*.pth` en vez de un modelo exportado. | Usa primero la herramienta **Export** en tu experimento y luego convierte el `.pth` exportado. |
| `This .pth contains only weights or is missing required RVC data.` | Pulsaste **Move .pth to models** en un `.pth` solo de pesos (sin metadatos RVC). | Solo los `.pth` RVC completos con configuración vocal pueden moverse directamente a `models/`. |
| `A model named ... already exists.` | Ya hay un `.pth` con ese nombre dentro de `models/`. | Renombra el archivo o mueve/respalda el anterior en `models/`. |
