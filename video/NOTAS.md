# Video PolliNode: notas de producción

Rama de trabajo: `video-minimal`. Estilo: editorial minimalista (papel hueso, tinta, arcilla y azafrán; tipografía serif; trazos limpios; movimiento suave). El estilo de cómic quedó descartado y vive solo en la rama `video-spiderverse`.

## Cómo verlo
```bash
cd video
npx hyperframes preview --background   # abre el Studio en http://localhost:3002
npx hyperframes check                  # lint + layout + contraste (debe dar "Check passed")
npx hyperframes render --quality draft -o renders/pollinode-borrador.mp4   # borrador para revisar
npx hyperframes render                 # versión final (solo con el visto bueno del equipo)
```

## Línea de tiempo (103 s)
Cada escena dura lo que su voz más un respiro. Las voces empiezan 0,5 s después del inicio de su escena.

| Escena | Archivo | Desde | Dur. | Voz |
|---|---|---|---|---|
| 1 Gancho | `compositions/s1-hook.html` | 0:00 | 8 s | `vo1-gancho` |
| 2 Problema | `compositions/s2-problema.html` | 0:08 | 18 s | `vo2-problema` |
| 3 Solución | `compositions/s3-islas.html` | 0:26 | 18,5 s | `vo3-solucion` |
| 4 Pizarrón | `compositions/s4-pizarron.html` | 0:44,5 | 18 s | audio propio de la toma |
| 5 Tecnología | `compositions/s5-tecnologia.html` | 1:02,5 | 19 s | `vo5-tecnologia` |
| 6 Impacto | `compositions/s6-impacto.html` | 1:21,5 | 12,5 s | `vo6-impacto` |
| 7 Cierre | `compositions/s7-cierre.html` | 1:34 | 9 s | `vo7-cierre` |

Los tiempos están en `index.html` (`data-start` y `data-duration` de cada escena y de cada `<audio>`, más la lista de cortinas `[8, 26, 44.5, 62.5, 81.5, 94]` y el arreglo `S` de la cabecera). Si cambia la duración de una escena hay que mover las siguientes en esos tres lugares. Dentro de cada escena, las animaciones están sincronizadas con las palabras de su voz (tiempo de escena = tiempo de la voz + 0,5).

## Audio
- `assets/vo/*.m4a`: las seis voces en off, a partir de los audios originales de WhatsApp. Procesadas con filtro de graves, reducción de ruido de voz (RNNoise), compresión suave y volumen a -16 LUFS.
- `assets/pizarron.mp4`: la toma del pizarrón. Se usan los segundos 6,5 a 18,5 del original (antes hay charla del grupo). Audio rehecho con RNNoise completo, ecualización suave y -16 LUFS (el piso de ruido bajó de -30 a -43 dB).
- Falta música de fondo (con licencia libre) y mezclarla por debajo de las voces.

## Paleta y tipografías
- Hueso `#f4efe6`, papel `#ebe4d6`, tinta `#1d1b19`, arcilla `#c4502f`, azafrán `#e5a02d`, pizarra (escena oscura) `#1f2d36` y `#2c3f4b`, follaje `#33504a`.
- Títulos: **Instrument Serif** (cursiva en arcilla para el énfasis). Etiquetas y texto chico: **Instrument Sans**. Archivos en `assets/fonts/`.

## Logo
`assets/logo.svg` (fuente) y `assets/logo.png` (2x, fondo transparente; copia en la raíz del repo como `logo-pollinode.png`). El SVG usa las tipografías de `assets/fonts/`, por eso hay que abrirlo como documento y no como `<img>`. En el video está incrustado en la escena 7.

## La toma del pizarrón
Como la cámara se mueve durante la toma, no hay marcas pegadas al dibujo mientras él habla: solo subtítulos y una etiqueta. Al terminar se congela el último cuadro (`assets/pizarron-last.jpg`, que sí está quieto) y se lo repasa en líneas limpias.

Para cambiar la toma: reemplazar `assets/pizarron.mp4`, volver a sacar el último cuadro (`ffmpeg -sseof -0.04 -i assets/pizarron.mp4 -frames:v 1 -q:v 2 assets/pizarron-last.jpg`), ajustar `data-duration` del `<video>` y los tiempos de subtítulos y repaso en `s4-pizarron.html`. Las posiciones del repaso están en píxeles sobre el último cuadro actual: si la nueva toma encuadra distinto, hay que reajustarlas.

## Pendiente
- Música de fondo y mezcla.
- Revisión del equipo del borrador y ajustes de texto.
- Cifras sin fuente (40% de rinde, 45 USD por nodo, 80 kg N/ha): no están en el video y no deben entrar sin respaldo.
