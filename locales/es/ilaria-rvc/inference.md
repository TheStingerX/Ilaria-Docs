---
label: "🎙️ Inferencia única y por lotes"
order: 98
permalink: /ilaria-rvc/inference/
---
# Inferencia única y por lotes

## Establecer una referencia

Abra **Inferencia única**, elija una voz y cargue un clip corto y seco. Establezca **Pitch** y **Index Ratio** en cero. Utilice el incrustador esperado por el modelo, comience con RMVPE y deje desactivados los efectos opcionales. Guarde un WAV y compárelo con su entrada con el mismo volumen.

## Sintonice pases separados

Si hay un índice coincidente disponible, aumente la recuperación en pequeños incrementos. Escuche un carácter de voz más claro y una posible atenuación. Baje **Proteger** para dar más protección a las consonantes y respiraciones en la conversión guiada por tono. El efecto depende de la recuperación, que contribuye sólo por encima de cero. Compare los ajustes de tono por separado.

## Procesar múltiples archivos

En **Inferencia por lotes**, agrupe las grabaciones por modelo y configuración de tono. Utilice una carpeta de destino separada. Primero ejecute un clip representativo, luego verifique el registro por lotes y escuche el resultado de cada grupo.
