---
label: "Modelos y presets recomendados"
icon: ":control_knobs:"
order: 97
permalink: /non-rvc/mvsep/usage-and-models/
---
# Guía de MVSep: modelos y presets recomendados

Estos son los mejores presets de MVSep para conseguir pistas vocales ultra limpias (para entrenamiento RVC, covers o conversión de voz), con **enlaces directos** que ya seleccionan el algoritmo y las opciones exactas.

## 1. Eliminación de música y efectos (Vocals & SFX Removal)

Úsalos primero para quitar música de fondo, efectos de sonido y ruido ambiental de tu audio original.

- **BS Polarformer** — [Abrir preset en MVSep](https://mvsep.com/home?sep_type=56&add_opt1=2&add_opt2=1&add_opt3=0)
  - Variante de Band-Split Roformer de alta precisión con **Polar Positional Embeddings (PoPE)** para un contexto largo y limpio.
  - **Cuándo usarlo**: primera opción principal para voces limpias con mínima filtración instrumental.
- **MVSep DnR v3** — [Abrir preset en MVSep](https://mvsep.com/home?sep_type=123&add_opt1=163)
  - Modelo cinematográfico multi-stem (*Divide and Remaster*) que separa el audio en **voz hablada, música y efectos de sonido (SFX)**.
  - **Cuándo usarlo**: diálogos de juegos, películas, vídeos o clips con muchos efectos sonoros.

> **Recomendación**: **BS Polarformer** suele ser mejor por sí solo, pero usar **ambos** elimina prácticamente cualquier posibilidad de ruido de fondo o SFX residuales.

## 2. Separar voz principal y coros (Lead & Back Vocals)

- **MVSep Karaoke** — [Abrir preset en MVSep](https://mvsep.com/home?sep_type=49&add_opt1=5&add_opt2=0)
  - Separa la **voz principal (lead)** de los **coros / segundas voces (backing vocals)**.
  - **Nota**: puede ser algo caprichoso y confundir coros y voz principal según la mezcla del audio; escucha ambas pistas antes de descartar nada, aunque sigue siendo muy útil.

## 3. Eliminación de reverberación (Reverb Removal)

Pásalos sobre tu pista vocal ya aislada para volver secas las grabaciones con eco o reverberación.

- **DeReverb Stereo** — [Abrir preset en MVSep](https://mvsep.com/home?sep_type=22&add_opt1=7&add_opt2=1)
  - Elimina reverberación vocal estéreo y reflexiones.
- **DeReverb Room** — [Abrir preset en MVSep](https://mvsep.com/home?sep_type=22&add_opt1=6&add_opt2=1)
  - Elimina acústica de sala y eco natural de habitación.

> **Recomendación**: lo mejor es usar **ambos** para eliminar cualquier resto de reverberación; cuál usar primero depende únicamente de tu audio concreto (prueba el orden en un clip corto si hay mucha reverb).

## 4. Eliminación de ruido de fondo (Background Noise Removal)

- **DeNoise by aufr33 and gabox** — [Abrir preset en MVSep](https://mvsep.com/home?sep_type=47&add_opt1=1)
  - Modelo comunitario Mel-Roformer especializado en quitar siseo, estática y artefactos sin apagar las frecuencias agudas.
  - **Recomendación**: úsalo como **paso final** para rematar el audio y asegurar que quede limpio. *(Aun así puede dejar pasar algún ruido puntual, así que verifica el WAV final de oído.)*

## 5. Experimental y varios (Experimental & Miscellaneous)

- **DeEffect** — [Abrir preset en MVSep](https://mvsep.com/en/home?sep_type=47&add_opt1=1)
  - Destaca quitando reverberación y efectos vocales intensos (e incluso puede usarse como alternativa en lugar de un modelo lead o eliminar algo de ruido de fondo).
  - **Advertencia**: **NO confíes en DeEffect para nada que no sea quitar efectos vocales y reverberación** — usa los modelos dedicados de arriba para separar voz/SFX y para la limpieza final de ruido.

## Flujo paso a paso recomendado

1. **Extraer voz / diálogo**: pasa el audio por **BS Polarformer** (y opcionalmente **MVSep DnR v3** si quedan SFX).
2. **Aislar voz principal** *(solo canciones con coros)*: usa **MVSep Karaoke**.
3. **Eliminar reverberación**: ejecuta **DeReverb Stereo** y **DeReverb Room** (más **DeEffect** solo si persisten efectos vocales o reverb fuerte).
4. **Limpieza final**: termina con **DeNoise by aufr33 and gabox** y descarga el resultado en **WAV**.
