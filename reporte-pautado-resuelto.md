# Reporte de pautado de resolución del desafío

**EQUIPO:** Lambda

**SEDE:** UTN FRRE INTECNOR

**DESAFÍO SELECCIONADO:** 03 - PROTECCIÓN Y FOMENTO DE POLINIZADORES

---

## 1. DESCRIPCIÓN DE LA PROBLEMÁTICA (1250 caracteres)

Describa brevemente la problemática elegida. ¿Cuáles pueden ser las principales causas? ¿Cuál es el verdadero problema a resolver?

> En la región chaqueña, la producción agrícola (especialmente en cultivos dependientes de polinización cruzada como algodón agroecológico, girasol y cucurbitáceas) enfrenta un cuello de botella crítico: la pérdida de polinizadores y la degradación del suelo. Las causas principales son el desmonte, el uso acumulado de agroquímicos y los monocultivos, que diezmaron las poblaciones de vectores nativos (abejas meliponas, abejorros Bombus, moscas sírfidas y avispas benéficas).
> 
> El verdadero problema radica en el 'bache forrajero y de hábitat': al cosechar o en periodos de no floración, los insectos se quedan sin alimento ni refugio y desaparecen del lote. Además, existe una limitación espacial crítica: los polinizadores nativos tienen un radio de vuelo corto (150 a 300 metros desde el monte). Esto genera amplias 'zonas muertas' en el centro de los campos, donde la polinización es insuficiente, provocando caídas de rinde de hasta un 40% y forzando una mayor dependencia de fertilizantes sintéticos.

---

## 2. DESCRIPCIÓN DE LA SOLUCIÓN (1250 caracteres)

Describa brevemente el producto/servicio y por qué lo considera una solución a la problemática elegida. ¿Por qué esta propuesta es una buena solución al problema? ¿Por qué se diferencia de otras propuestas existentes? Describa brevemente la tecnología seleccionada, el funcionamiento, las necesidades para su implementación, entre otras.

> Proponemos un sistema integral de 'Islas Biodinámicas Rotativas' monitoreadas mediante nodos inteligentes 'PolliNode'. Las islas son microambientes modulares dentro del cultivo con flora nativa y leguminosas fijadoras de nitrógeno (Vicia, Melilotus) diseñadas según síndromes florales. Operan en tres etapas: captación previa a la floración comercial, desborde (spillover) de polinizadores hacia el cultivo durante la floración, y refugio/fijación de nitrógeno post-cosecha. Al ciclo siguiente, la isla se traslada al surco contiguo, aprovechando la fertilidad natural generada.
> 
> Se diferencia de opciones estáticas porque utiliza agricultura de precisión: los nodos PolliNode (poste con panel solar de 5W, microcontrolador ESP32-S3 y enlace LoRaWAN) combinan bioacústica y visión artificial con TinyML. Clasifican polinizadores en tiempo real por frecuencia de aleteo y morfología, midiendo también variables microclimáticas. Mediante analítica espacial, el sistema detecta 'zonas muertas' y sugiere al agricultor las coordenadas GPS óptimas para sembrar la próxima isla como puente biológico.

---

## 3. IMPACTO (1000 caracteres)

Describa brevemente el impacto social y/o ambiental que genera la propuesta de solución.

> **Impacto Ambiental:** Regenera corredores biológicos y refugios permanentes para insectos nativos en peligro. El 60% de leguminosas en las islas fija nitrógeno atmosférico en el suelo mediante rizobios (hasta 80 kg N/ha), reduciendo el uso de fertilizantes químicos y la emisión de gases de efecto invernadero. Asimismo, las avispas y moscas sírfidas atraídas actúan como control biológico activo, devorando pulgones y orugas plaga, suprimiendo la necesidad de insecticidas tóxicos y protegiendo las fuentes de agua.
> 
> **Impacto Social y Económico:** Eleva la rentabilidad de pequeños y medianos productores del Chaco al aumentar entre un 20% y 40% el cuajado y peso de los frutos en algodón, girasol y zapallo. Facilita la certificación agroecológica y orgánica requerida para acceder a mercados de exportación con precios premium. Democratiza el acceso a la tecnología mediante hardware de bajo costo y software libre adaptado a la ruralidad.

---

## 4. INNOVACIÓN (1000 caracteres)

Fundamente brevemente por qué considera que esta propuesta representa una solución innovadora a la problemática seleccionada.

> La innovación reside en la sinergia entre antecología aplicada (síndromes florales), manejo rotativo del suelo y computación en el borde (Edge AI / TinyML). Supera las soluciones convencionales y pasivas (como 'hoteles de abejas' o bordes florales perimetrales estáticos que no cubren el interior de grandes lotes) al concebir el hábitat biológico como una infraestructura móvil y productiva.
> 
> El factor disruptivo es el nodo PolliNode: en lugar de costosos sensores comerciales o relevamientos manuales inviables en campo, emplea inteligencia artificial embebida en microcontroladores de muy bajo costo. Discrimina polinizadores en tiempo real por bioacústica (frecuencias de aleteo: abejas 200-250 Hz, Bombus 120-160 Hz, sírfidos >300 Hz) y visión liviana. Transforma estos datos en decisiones agronómicas automáticas: algoritmos de grafos y densidad espacial que calculan con precisión GPS dónde ubicar la próxima isla para garantizar polinización homogénea.

---

## 5. PRE FACTIBILIDAD ECONÓMICA, SOCIAL Y SUSTENTABILIDAD AMBIENTAL (1500 caracteres)

Describa brevemente las razones que hacen de esta propuesta una propuesta sostenible en el tiempo. Fundamente por qué considera que esta propuesta es presupuestariamente abordable, por qué es viable o aceptable socialmente

> **Viabilidad Económica:** Es presupuestariamente abordable gracias al uso de hardware libre de bajo costo. Cada nodo PolliNode se compone de partes comerciales accesibles (ESP32-S3, panel solar 5W, micrófonos y módulo LoRaWAN), con un costo inferior a 45 USD por nodo y cobertura de varios kilómetros hacia un concentrador central. Las semillas de flora nativa y leguminosas (Vicia, Melilotus) son económicas y autofértiles. La inversión se recupera en la primera campaña por el ahorro directo en fertilizantes nitrogenados sintéticos y fitosanitarios, sumado al incremento del 20% al 40% en el volumen cosechado.
> 
> **Aceptabilidad Social:** Se adopta de forma natural al integrarse en las labores habituales de rotación de cultivos de los productores chaqueños, sin demandar maquinaria especializada. La entrega de información es simple y comprensible (alertas y mapas vía WhatsApp o web liviana), articulada con cooperativas locales, escuelas agrotécnicas y agencias de extensión del INTA.
> 
> **Sustentabilidad Ambiental:** Las especies botánicas seleccionadas son rústicas y autóctonas, tolerantes al estrés térmico e hídrico del Gran Chaco. El sistema funciona con energía solar 100% renovable, no genera pasivos ambientales, previene la erosión del suelo, regenera nutrientes orgánicos y protege la biodiversidad autóctona a largo plazo.

---

## 6. PROPUESTAS QUE DESCARTARON

Enumere, en caso de haber descartado ideas, las diferentes propuestas que han analizado hasta elegir la actual y mencione brevemente el porque.

> 1. **Hoteles de insectos / cajas nido convencionales estáticas:** Se descartaron porque constituyen una solución pasiva que no resuelve el bache forrajero post-cosecha; además, sin mantenimiento intensivo acumulan patógenos y parásitos, y no aportan nutrición ni fijación de nitrógeno al suelo agrícola.
> 
> 2. **Franjas florales perimetrales fijas (bordes de lote permanentes):** Aunque promueven biodiversidad en los márgenes, inmovilizan superficie cultivable y resultan ineficaces hacia el interior del lote, ya que los polinizadores nativos poseen un radio de forrajeo limitado (150 a 300 metros), dejando sin cobertura el centro del campo.
> 
> 3. **Polinización mecánica o mediante microdrones:** Se desestimó debido a sus costos prohibitivos para pequeños productores, vulnerabilidad técnica ante vientos y clima extremo, y nulo aporte a la regeneración de la salud biológica del suelo.
> 
> 4. **Aprovechamiento de sensores en celulares en desuso (Desafío 02):** Se evaluó su uso para monitoreo agronómico, pero las baterías de ion de litio degradadas presentan un alto riesgo térmico e ignición bajo la radiación solar extrema del Chaco (>40 °C), sumado a un elevado consumo que requeriría paneles solares costosos.
> 
> 5. **Segunda vida de motores eléctricos domésticos (Desafío 01):** Implicaba una cadena logística compleja de acopio de chatarra y talleres de mecanizado no disponibles homogéneamente, ofreciendo un impacto económico y ambiental más disperso e indirecto frente a la urgencia agroecológica local.

---

## 7. REFERENCIAS

Escriba aquí todas las fuentes de información que consultaron y de las que obtuvieron información para construir su propuesta incluyendo las relacionadas a la inteligencia artificial.

> 1. **IPBES (2016):** *The Assessment Report on Pollinators, Pollination and Food Production*. Intergovernmental Science-Policy Platform on Biodiversity and Ecosystem Services.
> 2. **Garibaldi, L. A., et al. (2016):** *Mutually beneficial pollinator diversity and crop yield in small and large farms*. Science, 351(6271), 388-391.
> 3. **Faegri, K., & van der Pijl, L. (1979):** *The Principles of Pollination Ecology*. Pergamon Press (Fundamentos de Antecología y Síndromes Florales).
> 4. **INTA - Estación Experimental Agropecuaria Chaco (2020-2023):** Ensayos agronómicos sobre cultivos de cobertura (*Vicia villosa*, *Melilotus albus*), fijación biológica de nitrógeno y manejo agroecológico de plagas en algodón y cucurbitáceas.
> 5. **Warden, P., & Situnayake, D. (2019):** *TinyML: Machine Learning with TensorFlow Lite on Arduino and Ultra-Low-Power Microcontrollers*. O'Reilly Media.
> 6. **Kulyukin, V., et al. (2021):** *Bioacoustic monitoring of pollinators using edge convolutional neural networks and acoustic spectrograms*. Computers and Electronics in Agriculture.
> 7. **LoRa Alliance (2024):** *LoRaWAN Specifications for Low-Power Wide Area Networks in Smart Agriculture*.
> 8. **Inteligencia Artificial aplicada en el proyecto:**
>    - Modelos LLM (Gemini): Empleados como herramienta de asistencia metodológica para la síntesis conceptual, estructuración del reporte pautado, búsqueda bibliográfica cruzada sobre flora melífera chaqueña y dimensionamiento preliminar de requerimientos energéticos/IoT.
>    - Modelos de Visión y Audio (TinyML / YOLO liviano y CNNs de audio): Modelos de inferencia en el borde proyectados para la clasificación bioacústica y visual de vectores en el nodo PolliNode.
