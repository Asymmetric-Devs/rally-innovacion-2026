# La idea: PolliNode + Islas Biodinámicas Rotativas

**Desafío 03: Protección y fomento de polinizadores.** Entorno: campos de producción orgánica del Chaco. Actores: productores de algodón, girasol, zapallo y hortícolas, y sus cooperativas.

## Una frase
Un sistema que **mide dónde falta polinización y le dice al productor exactamente dónde sembrar la próxima isla de flora nativa**, para producir más sin agroquímicos.

## El problema real
Los productores orgánicos del Chaco venden a precio premium, pero tienen dos muros: **suelos agotados** y **polinización irregular** (los insectos no llegan al centro del lote). Además, las plagas no se pueden tratar con agroquímicos. Hoy nadie sabe dónde falla la polinización: se ve recién en el rinde.

> Causa de fondo: el cultivo deja a los polinizadores sin comida ni refugio cuando no está en floración o se cosecha, y el productor no tiene forma barata de medir qué pasa en el lote.

## La solución en 3 capas

| Capa | Qué es | Qué resuelve |
|---|---|---|
| **1. Biológica** | **Islas biodinámicas rotativas**: franjas de flora nativa y leguminosas, con floración desfasada respecto del cultivo. Rotan cada año. | Refugio y alimento para polinizadores, control de plagas por enemigos naturales, nitrógeno gratis para el ciclo siguiente. |
| **2. Sensado** | **PolliNode**: nodo solar de bajo costo con cámara (UV/macro), micrófono (zumbido de alas) y microclima, conectado por LoRaWAN. | Mide qué polinizadores hay, cuántos y por dónde entran. |
| **3. Decisión** | IA/ML que genera un **mapa de calor** y detecta **zonas muertas de polinización**. | Indica las coordenadas GPS de la próxima isla. El productor no necesita interpretar nada. |

**Idea de los audios, a validar:** luces inteligentes en red que se ajustan solas según la etapa del cultivo. Se puede presentar como una **fase futura** (automatización) si no se logra justificar bien el efecto.

## Por qué es diferente
- No es la típica "casita para abejas". Es **ingeniería agroecológica basada en datos**.
- Cierra el ciclo: **medir → decidir → intervenir → volver a medir**.
- El ahorro en insumos y el precio premium orgánico lo hacen **rentable**, no solo ambiental.

## Impacto
- **Ambiental:** más biodiversidad nativa, menos fertilizante nitrogenado, cero pesticidas.
- **Económico:** más rinde y mejor calidad (algodón, girasol, zapallo), menos costos de insumos.
- **Social:** pensado para pequeños y medianos productores; hardware barato y mapa simple.

## Antes de grabar: validar estas cifras
`propuesta-solucion.md` trae datos que parecen salidos de un chat de IA y no tienen fuente. El jurado puede preguntar. Antes de decirlos en el video hay que **encontrar la fuente o suavizar la frase**:
1. "El rinde cae un 40%" si los insectos no llegan al centro del lote.
2. "60% de leguminosas" en las islas.
3. Alcance de vuelo de 150 a 300 m de las abejas nativas pequeñas.
4. Frecuencias de aleteo (abeja ~200-250 Hz, abejorro ~120-160 Hz, sírfido >300 Hz).
5. "Zapallo y girasol dependen casi 90% de insectos".
6. Cualquier número de ahorro en fertilizantes. Hoy no hay ninguno concreto.

Recomendación: **un solo número fuerte con fuente** (por ejemplo, el porcentaje de dependencia de polinizadores de un cultivo, de FAO o INTA) vale más que cuatro sin respaldo.

## Riesgos a tener preparados
- ¿Funciona la bioacústica con viento y ruido de campo? Respuesta: combinamos audio con cámara, y los umbrales se calibran por nodo.
- ¿Cuánto cuesta un nodo? Hay que **armar un presupuesto** (ESP32-S3, panel de 5W, cámara, micrófono, LoRa). Hoy no está.
- ¿Por qué el Chaco? Hay que decir una frase concreta (cultivos orgánicos, monte nativo cercano, productores reales).
