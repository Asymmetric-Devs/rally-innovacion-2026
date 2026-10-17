# Video PolliNode: notas de producción

Rama de trabajo: `video-spiderverse`. Estilo: cómic tipo Spider-Verse (contornos de tinta que "hierven", semitono, colores desfasados como impresión corrida, animación "a doses").

## Cómo verlo
```bash
cd video
npx hyperframes preview --background   # abre el Studio en http://localhost:3002
npx hyperframes check                  # lint + layout + contraste (debe dar "Check passed")
npx hyperframes render                 # genera el MP4 (solo con el visto bueno del equipo)
```

## Línea de tiempo (115 s, provisoria hasta tener la voz)
| Escena | Archivo | Desde | Dur. | Qué es |
|---|---|---|---|---|
| 1 Gancho | `compositions/s1-hook.html` | 0:00 | 10 s | Animación |
| 2 Problema | `compositions/s2-problema.html` | 0:10 | 20 s | Animación |
| 3 Solución | `compositions/s3-islas.html` | 0:30 | 20 s | Animación |
| 4 Pizarrón | `compositions/s4-pizarron.html` | 0:50 | 20 s | **Toma real** (12 s) + repaso animado (8 s) |
| 5 Tecnología | `compositions/s5-tecnologia.html` | 1:10 | 25 s | Animación |
| 6 Impacto | `compositions/s6-impacto.html` | 1:35 | 12 s | Animación |
| 7 Cierre | `compositions/s7-cierre.html` | 1:47 | 8 s | Hueco para el cierre en cámara + placa con logo |

Los tiempos están en `index.html` (`data-start` / `data-duration` de cada escena y la lista de transiciones al final del script). Si cambia la duración de una escena hay que mover las siguientes y la lista `[10, 30, 50, 70, 95, 107]`.

## Paleta y tipografías
- Tinta `#17132b`, papel `#fff1d6`, magenta `#ff3d8b`, cian `#19c3e6`, amarillo `#ffd23f`, naranja `#ff7a2f`, violeta `#6c3df4` / `#2b1d5e`, verde azulado `#0e8f8a` (solo para follaje).
- Títulos: **Bangers**. Notas y subtítulos: **Permanent Marker**. Archivos en `assets/fonts/`.

## Logo
`assets/logo.svg` (fuente) y `assets/logo.png` (2x, fondo transparente). El SVG usa las tipografías de `assets/fonts/`, por eso hay que abrirlo como documento y no como `<img>` para que se vean bien. En el video está incrustado en la escena 7.

## La toma del pizarrón
- Original: `WhatsApp Video 2026-10-17 at 11.34.27.mp4` (18,5 s). Se usan los segundos 6,5 a 18,5 (antes hay charla del grupo).
- `assets/pizarron.mp4`: recortado, subido a 1080p y con el audio limpiado (filtro de ruido, ecualización, compresión y volumen a -15 LUFS; el original estaba a -30 dB).
- `assets/pizarron-last.jpg`: último cuadro, que se congela para el repaso en tinta.
- La cámara de la toma se mueve, por eso no hay marcas pegadas al dibujo mientras habla: solo subtítulos y una etiqueta. El repaso animado se ajusta al último cuadro, que sí está quieto.

Para cambiar la toma: reemplazar `assets/pizarron.mp4`, volver a sacar el último cuadro (`ffmpeg -sseof -0.04 -i assets/pizarron.mp4 -frames:v 1 -q:v 2 assets/pizarron-last.jpg`), ajustar `data-duration` del `<video>` y los tiempos de subtítulos y del repaso en `s4-pizarron.html`. Si la cámara en la nueva toma queda quieta, las posiciones del repaso (en píxeles de pantalla) hay que reajustarlas sobre el nuevo último cuadro.

## Pendiente
- Cierre en cámara: grabar y reemplazar `#s7-slot` (instrucciones en el comentario del archivo).
- Voz en off: grabar y colocar como `<audio>`; después ajustar la duración de cada escena a la voz.
- Música de fondo (con licencia libre) y mezcla con la voz.
- Aviso de lint: `s5-tecnologia.html` supera las 300 líneas. Es solo un aviso.
