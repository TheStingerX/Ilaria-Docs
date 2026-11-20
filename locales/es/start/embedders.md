---
label: "🧩 Embedders"
order: 91
permalink: /embedders/
description: "Un embedder (también llamado content encoder) es la red neuronal que lee tu audio de entrada y transforma lo que se dice o canta en características numéricas de contenido antes de que el modelo vocal RVC lo reconstruya con el timbre del hablante objetivo."
---
# Embedders de RVC

Un **embedder** (también llamado **content encoder**) es la red neuronal que lee tu audio de entrada y transforma lo que se dice o canta en características numéricas de contenido antes de que el modelo vocal RVC lo reconstruya con el timbre del hablante objetivo.

## Qué hace un embedder y cómo funciona

En el flujo de RVC, el audio se divide en flujos de información separados:

1. **Contenido (qué dices)**: extraído fotograma a fotograma por el **embedder** (fonemas, pronunciación, articulación y ritmo).
2. **Tono / F0 (la melodía)**: extraído por separado por un rastreador de tono (como RMVPE o FCPE).
3. **Timbre del hablante (quién habla)**: aportado por el modelo de voz `.pth` entrenado (y opcionalmente reforzado por un archivo `.index`).

Como el generador RVC se entrena para esperar características de **un embedder específico**, siempre se cumplen dos reglas:

- **Entrenamiento e inferencia deben coincidir**: si un modelo se entrenó con `contentvec`, debes convertir el audio con `contentvec`. Usar otro embedder en inferencia (o en tiempo real) provoca pronunciación distorsionada, artefactos metálicos o una voz rota.
- **Fuga de identidad del hablante**: los encoders genéricos de reconocimiento de voz (como HuBERT estándar) no eliminan la identidad del hablante original, lo que puede filtrar tu propio timbre en la salida convertida.

---

## Embedders RVC conocidos

> [!WARNING]
> **Solo con fines informativos - uso totalmente desaconsejado**
>
> Todo lo listado a continuación sobre embedders alternativos es **únicamente con fines informativos**. **Recomendamos encarecidamente NO usar embedders alternativos**: la **configuración stock de RVC** (**`contentvec`**) es la mejor y más segura opción. Los embedders alternativos aumentan el riesgo de obtener un mal modelo vocal o una mala conversión tanto offline como online (en vivo), además de romper la compatibilidad con configuraciones e índices estándar.

| Embedder | Arquitectura / Notas | Soporte RVC | Recomendación |
| --- | --- | --- | --- |
| **`contentvec`** (`hubert_base.pt`) | Content encoder por defecto de RVC, entrenado para conservar contenido lingüístico eliminando la identidad del hablante. | RVC v1 (256-d) y RVC v2 (768-d) | **Recomendado (Stock RVC)** |
| **`spin`** | Encoder alternativo basado en Fairseq/HuBERT invariante al hablante. | RVC v2 | No recomendado para uso general |
| **`spin-v2`** (`spin-v2.pt`) | Encoder Spin v2 actualizado (~361 MiB) usado por ciertos pretrains experimentales. | RVC v2 | No recomendado para uso general |
| **`chinese-hubert-base`** | HuBERT Base preentrenado en habla china. Puede filtrar timbre original. | RVC v2 | Solo informativo / especializado |
| **`japanese-hubert-base`** | HuBERT Base preentrenado en habla japonesa. Puede filtrar timbre original. | RVC v2 | Solo informativo / especializado |
| **`korean-hubert-base`** | HuBERT Base preentrenado en habla coreana. Puede filtrar timbre original. | RVC v2 | Solo informativo / especializado |
| **`portuguese-hubert-base`** | Fairseq HuBERT portugués (`shiromiya/fairseq-hubert-portuguese`, ~1,13 GB). | RVC v2 | Solo informativo / especializado |
| **`klm-vocal-contentvec`** | KLM Vocal ContentVec (`SeoulStreamingStation/KLM-Vocal-Embedder_ContantVEC_For_RVC`, ~251 MiB). | RVC v2 | Solo informativo / opcional |
| **`custom` HuBERT Base** | Par HuBERT Base proporcionado por el usuario (`pytorch_model.bin` + `config.json`, 768 dimensiones). | RVC v2 (v1 solo si tiene proyección 256-d) | Solo informativo / avanzado |

## Cuándo necesitas tocar este ajuste

- **Déjalo en `Auto` o `contentvec`** para casi cualquier modelo y entrenamiento.
- **Cámbialo solo** si descargaste una voz cuyo autor indica explícitamente otro embedder (por ejemplo `spin-v2` o `japanese-hubert-base`), y úsalo únicamente al convertir con ese modelo concreto.
- **No cambies de embedder a mitad de entrenamiento**: cambiarlo exige re-extraer características (`3_feature768`) en un experimento aparte.
