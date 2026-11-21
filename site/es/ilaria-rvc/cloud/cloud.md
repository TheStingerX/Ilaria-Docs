# Ilaria RVC en la nube

Ejecuta Ilaria RVC en un navegador con una GPU proporcionada por la plataforma en la nube. Elige un notebook abajo y activa un acelerador NVIDIA antes de ejecutar la primera celda.

[Kaggle](kaggle.md) · [Google Colab](colab.md) · [Lightning AI Studio](lightning-ai.md)

## Comparativa de plataformas

| Característica | Kaggle | Google Colab | Lightning AI Studio |
| --- | --- | --- | --- |
| **Disponibilidad GPU** | Cuota semanal gratuita (p. ej. **T4 x2**, sujeta a límites de Kaggle) | Plan gratuito (dinámico, sin garantía) o de pago (**Pro / Pro+ / Pay-As-You-Go** con compute units) | Studio 4-CPU gratuito; GPUs facturadas por segundo con créditos iniciales o de pago |
| **Costes y créditos** | Gratis dentro de la cuota semanal (requiere verificación telefónica) | Gratis o compute units de pago (ver [Colab FAQ](https://research.google.com/colaboratory/faq.html)) | `1 crédito = $1 USD` por segundo; ver [Precios Lightning AI](https://lightning.ai/pricing) |
| **Restricciones** | Requiere activar **Internet** y mantener notebooks privados | Las [actividades no permitidas](https://research.google.com/colaboratory/faq.html#disallowed-activities) prohíben hosting público y proxies | Verificación telefónica puede tardar 2–3 días laborables; disponibilidad según cuenta |
| **Persistencia** | Por sesión; autoexporta modelos a `ilaria-shared/models` | Almacenamiento temporal; guarda en **Google Drive** | **Teamspace Drive** persistente (**10 GB gratis**) |
| **Duración** | Límites de inactividad; los commits consumen cuota | Límites de inactividad y duración máxima | Studio CPU gratuito hasta 4h continuas antes de reiniciar |
| **Training e Inferencia** | Ambos soportados (T4 usa FP16) | Ambos soportados (según GPU) | Ambos soportados |
| **Exportación** | ZIP `EXPORT = True` + **FileBrowser** | ZIP `EXPORT = True` + Google Drive | Descarga desde Teamspace Drive o ZIP `EXPORT = True` |
| **Privacidad** | Mantén el notebook **privado** (imprime contraseñas WebUI y FileBrowser) | Mantén privados los notebooks | Mantén privados Studio y Port Viewer |
| **Facilidad** | Media | Fácil | Media |

## ¿Qué servicio elegir?

- **Quieres GPU gratis para entrenar o probar:** Empieza con **[Kaggle](kaggle.md)**.
- **Ya pagas Colab o usas Google Drive:** Usa **[Google Colab](colab.md)**.
- **Quieres almacenamiento persistente entre sesiones:** Usa **[Lightning AI Studio](lightning-ai.md)**.
