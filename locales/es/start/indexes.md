---
label: "🗂️ Archivos Index (.index)"
order: 88
permalink: /indexes/
description: "Guía completa de archivos .index en RVC (Feature Retrieval): diferencia entre added_*.index y trained_*.index, cómo ajustar Index Rate y cómo regenerar un índice."
---
# Archivos Index de RVC y Feature Retrieval (`.index`)

Cuando descargas o entrenas un modelo de voz RVC, normalmente ves dos archivos: un `.pth` y un `.index`. Mientras que el `.pth` es obligatorio, el archivo `.index` suele generar muchas dudas.

Esta guía explica qué hace realmente un `.index`, la diferencia clave entre `added_*.index` y `trained_*.index`, cómo ajustar **Index Rate**, cuándo conviene bajarlo o apagarlo y qué hacer si falta.

---

## 1. ¿Qué es un archivo `.index` (Feature Retrieval)?

La conversión de voz en RVC funciona en dos partes:
1. **El archivo `.pth` (el Generador):** La red neuronal que aprendió a convertir rasgos del habla en el timbre de la voz objetivo.
2. **El archivo `.index` (la Base de Datos de Rasgos):** Un **índice vectorial FAISS** que guarda los vectores acústicos reales extraídos por el [embedder](embedders.md) (como `contentvec`) de cada clip del dataset de entrenamiento.

Durante la conversión, **Feature Retrieval** compara cada pequeño fragmento de tu audio de entrada con la base `.index`, busca los fragmentos más parecidos de las grabaciones originales del hablante y los mezcla antes de pasarlos al generador `.pth`.

**En palabras simples:**
- El `.pth` es el **motor** (obligatorio).
- El `.index` es una **biblioteca de referencia con los matices reales de la voz** (opcional): respiraciones, color de vocales, textura y detalles de pronunciación que un `.pth` solo podría suavizar.

!!!tip
**Compatibilidad:**
Un modelo `.pth` funciona perfectamente **sin** archivo `.index` (`Index Rate = 0`). Si un modelo descargado no incluye `.index`, puedes usarlo igualmente sin problema.
!!!

---

## 2. `added_*.index` vs `trained_*.index`

Cuando RVC construye el índice dentro de `logs/<nombre_experimento>/`, suele guardar dos archivos `.index`:

| Nombre del archivo | Qué contiene | ¿Debes usarlo? |
| --- | --- | --- |
| **`added_*.index`** | El índice FAISS completo **con todos los vectores del dataset añadidos dentro** (ej. `added_IVF256_Flat_nprobe_1_MiVoz_v2.index`). | **SÍ. Usa siempre este** para inferencia y para compartir modelos. |
| **`trained_*.index`** | Solo la estructura intermedia de clústeres creada antes de añadir los vectores del dataset. | **NO.** No lo selecciones ni lo compartas; da resultados pobres o nulos. |

Cuando exportes o compartas un modelo (por ejemplo con **Export model ZIP** en Ilaria RVC), empareja siempre el `.pth` con **`added_*.index`**, nunca con `trained_*.index`.

---

## 3. Cómo ajustar `Index Rate` (de `0` a `1.0`)

El control **Index Rate** (a veces llamado *Search Feature Ratio* o *Retrieval Ratio*) regula cuánta fuerza tiene la base `.index` para acercar el audio convertido a los fragmentos reales del dataset:

| Index Rate | Efecto en la voz | Mejor uso |
| --- | --- | --- |
| **`0.0` (Apagado)** | 100% pesos `.pth`, 0% `.index`. | Pronunciación más limpia, menor uso de CPU, mejor punto base para pruebas, cambiadores de voz en vivo y modelos fusionados. |
| **`0.25 - 0.50`** | Añade textura natural de la voz manteniendo intactos tu pronunciación y ritmo. | **Habla**, **conversión entre idiomas distintos** (ej. español sobre un modelo en inglés/japonés) o datasets algo ruidosos. |
| **`0.60 - 0.75`** | Gran parecido y realismo sin dominar en exceso tu audio de entrada. | **Valor recomendado por defecto** para canto limpio y locuciones en el mismo idioma. |
| **`0.85 - 1.00`** | Máxima recuperación; fuerza los rasgos al máximo hacia el dataset. | Solo para datasets de estudio impecables en el mismo idioma. Alto riesgo de palabras trabadas o ruido del dataset. |

---

## 4. Cuándo conviene bajar o apagar `Index Rate`

Subir **Index Rate** hacia `1.0` **no** mejora automáticamente la voz. Bájalo a `0.2 - 0.4` (o `0`) siempre que notes:

1. **Vuelve el ruido de fondo, siseo o eco:** Como el `.index` toma fragmentos directos de las grabaciones de entrenamiento, cualquier ruido o eco del dataset reaparecerá en tu conversión.
2. **Pronunciación rara o acento forzado:** Si hablas un idioma distinto al del dataset, un Index Rate alto intenta imponer vocales y consonantes del otro idioma.
3. **Voces mezcladas en Voice Blender:** Fusionar dos `.pth` en [Voice Blender](../ilaria-rvc/manage/voice-blender.md) **no** crea un nuevo `.index`. Prueba siempre modelos fusionados en `Index Rate = 0` primero.
4. **Cortes en Voice Changer en vivo:** Buscar en un índice FAISS grande en cada fragmento consume CPU. Bajar o apagar `Index Rate` reduce latencia y cortes.

---

## 5. Reglas de compatibilidad (por qué no se mezclan `.index`)

Un archivo `.index` está ligado estrictamente al **modelo exacto** y al **embedder** con el que se creó:

- **Misma dimensión / versión RVC:** Un modelo `v1` usa rasgos de **256 dimensiones** (`3_feature256`), mientras un `v2` usa **768 dimensiones** (`3_feature768`). Mezclar `v1` y `v2` produce error de dimensiones.
- **Mismo embedder:** Un índice creado con `contentvec` no encaja con un modelo que espera otro codificador.
- **Mismo hablante:** Poner el `.index` de la Voz A en el `.pth` de la Voz B **no** mezcla bien dos voces; envía rasgos erróneos al decodificador y suele sonar apagado o roto.

---

## 6. Cómo regenerar un archivo `.index` faltante

### Caso A: Solo tienes un archivo `.pth` descargado
**No** puedes recrear un `.index` real solo desde un `.pth`. El `.index` se construye a partir de los vectores extraídos (`.npy`) del audio original del dataset, que no están dentro de un `.pth` exportado. Pon **Index Rate = 0** y usa el `.pth` por sí solo.

### Caso B: Entrenaste el modelo y conservas `logs/<nombre_experimento>/`
Si tu carpeta aún tiene la carpeta de rasgos extraídos (`3_feature256` o `3_feature768`), puedes reconstruir el índice en segundos sin reentrenar:
1. Abre la pestaña **Train** en Ilaria RVC (o Applio / RVC Mainline).
2. Introduce exactamente el mismo **Nombre de Experimento**, **Versión RVC (`v1`/`v2`)**, **Sample Rate** y **Embedder** del entrenamiento.
3. Pulsa solo **Train Feature Index** (sin repetir preprocesamiento ni entrenamiento del modelo).
4. Al terminar, busca el nuevo **`added_*.index`** en `logs/<nombre_experimento>/`.

### Caso C: Crear el índice falla por RAM / archivo de paginación
Los datasets enormes (miles de clips) consumen mucha RAM al agrupar con FAISS. Si falla con `WinError 1455` o congela Windows, cierra otras apps, amplía la **Memoria Virtual (Pagefile)** de Windows (ver [Solución de problemas](../reference/troubleshooting.md)) o elimina clips repetitivos.
