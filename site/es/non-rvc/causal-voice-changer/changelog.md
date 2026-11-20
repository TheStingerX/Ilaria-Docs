# Changelog de Causal Voice Changer

[Lanzamientos en GitHub](https://github.com/mojowozo/Causal-Voice-Changer/releases)

## v0.3.2 (20/11/2026)

- Lanzamiento menor que mejora la calidad de sonido general tanto en entrenamiento como en inferencia en tiempo real.

---

## v0.3.1 (20/11/2026)

### Novedades
- Añadido un **actualizador integrado** dentro de la aplicación. La comprobación automática está activa por defecto y puede desactivarse en la página **About**.

### Correcciones y mejoras
- Corregido un fallo en Windows que podía impedir la detección de las GPUs.
- Mejorado el manejo en tiempo real para voces graves con el fin de mejorar la salida.

---

## v0.3.0 (19/11/2026)

Actualiza el modelo base predeterminado de 100 Hz a **v4 (`causalvc-base-v4-100hz`)** manteniendo 50 ms de latencia de modelo y soporte completo de CUDA Graphs.

- **Risas, suspiros y susurros mejorados:** Sustituido el cambio binario con/sin voz por confianza continua de periodicidad (`0..1`), mezclando armónicos y aire de forma fluida.
- **Acondicionamiento espectral CUDA-Graph y anclaje L2-SP:** Las voces entrenadas con habla tranquila conservan risas y susurros naturales.
- **Rango de pitch ampliado (`32 Hz - 1400 Hz`):** Seguimiento desde vocal fry profundo hasta notas de soprano, aligerando de forma natural los saltos hacia arriba.
- **Silencio limpio y rechazo de clics:** Añadida pérdida dedicada de suelo de silencio que reduce clics de micrófono unos ~33-40 dB incluso con *Ignore background sounds* desactivado.
- **Compatibilidad sin cambios:** Las instalaciones actuales actualizan `weights/causalvc-base/` automáticamente y todas las voces `.cvc` anteriores (50 Hz y 100 Hz) siguen funcionando igual.

---

## v0.2.0 (19/11/2026)

Cambia el modelo base predeterminado y el front-end de streaming de **50 Hz (20 ms)** a **100 Hz (10 ms)**.

- **Menor latencia (`50 ms`):** Basado en `causalvc-base-v3-100hz`, reduce el retardo del modelo de `60 ms` a `50 ms` duplicando la resolución en consonantes rápidas y respiraciones.
- **Sin aliasing armónico ni zumbido:** Corte suave raised-cosine (`exc="bandlimit"`) e interpolación fraccional continua del tono (`smooth_in="p"`).
- **Seguimiento en notas agudas (`350-1000+ Hz`):** Pitch tracker re-destilado (`-3` a `+14` semitonos) y codificador ampliado (EARS + VCTK + LibriTTS-R) para evitar cortes o saltos de octava.
- **Arreglos de entrenamiento y `.cvc`:** Corregido fallo con `--perturb` en un solo archivo, detección automática de ancho de banda (`detect_fmax`) para audios de 16/24 kHz, opción **Random microphone colour** y empaquetado automático de codificadores personalizados en `.cvc` (~46 MB).
- **Streaming CUDA Graph:** Soporte completo de CUDA Graph a 100 Hz hasta bloques de `10 ms` / `20 ms`.

---

## v0.1.1 (17/11/2026)

- **Ventanas precompiladas en los lanzamientos:** Los archivos de Windows (`.zip`) y Linux (`.tar.gz`) ya traen las ventanas listas sin exigir `.NET 10 SDK` ni `Rust` al inicio.
- **Corrección AMD Radeon RX 6000 en Windows:** Corregido el orden de carga de librerías antes de PyTorch para iniciar ROCm (`"The engine is not available"` / error Windows `1114`).
- **Mejoras del lanzador:** Usa siempre el entorno Python instalado por los lanzadores, muestra detalles de Python/PyTorch en errores y respeta `CAUSALVC_GPU`.

---

## v0.1.0 (17/11/2026)

Primer lanzamiento público de **Causal Voice Changer**:
- Cambiador de voz en streaming a 48 kHz con look-ahead de 60 ms.
- **App de entrenamiento** (`run-training.bat` / `run-training.sh`) en `bfloat16`, con cola de trabajos y sin necesidad de cortar silencios manualmente.
- **App en tiempo real** (`run-realtime.bat` / `run-realtime.sh` - WinUI 3 en Windows, COSMIC en Linux) con pitch/Index por voz, Hushwire/RNNoise, **Soften sudden treble**, CUDA Graphs, grabación, entrada de archivo y ASIO en Windows.
- Formato único `.cvc` y soporte para NVIDIA CUDA y AMD ROCm.
- **Nota de licencia:** Modelo base entrenado con EARS, VCTK y LibriTTS-R (uso no comercial por EARS).
