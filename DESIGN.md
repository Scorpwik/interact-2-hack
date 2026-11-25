# DESIGN.md — Señal de Turno

**Sistema de diseño de la herramienta de organización de staff del Interact2Hack** · v1.0 · 24 de noviembre de 2026
**Equipo:** Joshua Lozada y Raymond Portilla · **Producto:** `docs/prd/PRD.md` · **Identidad:** Interact2Hack · Brandboard extendido · Señal Neón v1.0

> Este documento decide cómo se ve y cómo se comporta la interfaz. Si el brand board (`docs/diseno/brand-board.html`) o cualquier pantalla no coincide con lo que dice aquí, **manda este DESIGN.md**. Las marcas **[SUPUESTO]** son decisiones de diseño que el equipo todavía debe confirmar (sección 11). SD-01 y SD-02 quedaron confirmados el 25 de noviembre de 2026.

## 1. Nombre y propósito

**Señal de Turno** es el sistema visual de la herramienta con la que los administradores reparten tareas en forma de checklist y los estudiantes del staff las ejecutan durante el hackathon. Tiene un solo propósito: que **cualquiera sepa en un vistazo qué tarea toca, dónde, cuánto falta y en qué estado está**, desde el celular o desde el escritorio, aunque la conexión del evento falle.

Sigue la identidad oficial del evento, Señal Neón v1.0 (negro, morado neón, lima escaso, Big Shoulders Display y Sora, esquinas rectas). El cliente no respondió P-16 («¿Hay logo o colores oficiales…?»). Usar Señal Neón es una **decisión del equipo (D-P16)**: «Sí, ese es el panel de colores, tipografía y muestras de animaciones que debemos seguir».

## 2. Brief

| | |
| --- | --- |
| **Personalidad (palabras del equipo)** | **Fácil de usar** · **Carga rápida** · **Útil sin excesos** |
| **Referente** | **Confirmado por el equipo el 25 de noviembre de 2026.** (1) La **pantalla de salidas de un aeropuerto**: muchas cosas con hora límite, un estado por fila, un lugar y lectura de un vistazo sobre fondo oscuro. (2) Como secundario, la **app móvil del brandboard Señal Neón** (sec. 13): agenda con hora, sala y la regla «Lima = ahora». El Notion «IA» del equipo no nombra un referente; da el método («referentes directos del nicho»), que es el que se siguió (`docs/diseno/brief.md`). |
| **Quién la usa** | **Administradores en un escritorio** (tablero de cumplimiento, crear y asignar tareas, panel de estudiantes) y **estudiantes en el celular** (sus tareas, el checklist, completar), **en medio de un hackathon**: con prisa, en movimiento, con horas límite encima y conectividad que puede fallar. Los dos perfiles pueden usar los dos dispositivos (PRD, D-S-01). |
| **Dirección** | **B · Tablero de salidas**, con la tarjeta señal de A y la barra de progreso de C (`docs/diseno/direcciones/direcciones.md`). Confirmada por el equipo el 25 de noviembre de 2026. |

## 3. Decisiones de diseño y su porqué

| # | Decisión | Porqué |
| --- | --- | --- |
| DD-01 | **Siempre oscuro, sin modo claro.** Fondo #050307. | Señal Neón: «El negro manda» y «Modo claro: no se ofrece». El texto principal da 20,54:1, legible incluso con brillo bajo. |
| DD-02 | **Datos primero:** en cada tarjeta, el estado y el tiempo que falta van antes que la descripción. | Referente de la pantalla de salidas; PRD R15 (temporizador) y R30 (tarjetas con estado y temporizador). «Útil sin excesos». |
| DD-03 | **Una sola tarjeta señal morada por vista**, para la tarea que vence primero. | Regla 2 de Señal Neón («Cada vista tiene como máximo un bloque sólido morado»); crítica C-01. |
| DD-04 | **El lima marca solo «lo que pasa ahora»:** el punto de «En ejecución», los pasos marcados, el foco y una sola cifra clave en el tablero. | Regla 3 de Señal Neón («El lima es escaso»); crítica C-11. |
| DD-05 | **Cinco estados, con color + ícono + texto**, idénticos a los del PRD (R11), y **cuatro marcas** aparte (R12). | Coherencia con el PRD; accesibilidad: ningún estado depende solo del color (audit A-07). |
| DD-06 | **Rojo y ámbar funcionales** para Vencida/Fuera de hora y Por vencer. **[SUPUESTO]** | Señal Neón no define colores de alerta. Sin ellos, «vencida» y «por vencer» solo se distinguirían por el texto (audit A-08). |
| DD-07 | **Cuadrícula de tarjetas en el escritorio y una sola columna en el celular**, con la misma tarjeta. | El cliente pidió «una cuadricula con tarjeta» (N-05); crítica C-02. Una sola tarjeta = menos que construir y mantener. |
| DD-08 | **Big Shoulders solo en cifras y títulos de 24 px o más; Sora en todo lo demás.** | Regla del brandboard («Nunca por debajo de 24 px»); los nombres de tarea son frases largas (crítica C-06). |
| DD-09 | **Plano y liviano:** sin fotos, sin brillo radial, sin sombras en las superficies, sin animaciones de entrada en las listas. Fuentes servidas con la herramienta. | «Carga rápida» y conectividad del evento (PRD R19, D-S-02); audit A-09, A-10, A-16. |
| DD-10 | **Completar exige deslizar** y el control dice qué falta. | PRD R16 y N-22 («slider deslizable de izquierda a derecha»); evita completar por error; crítica C-07. |
| DD-11 | **Sin conexión, todo lo que no se puede hacer se ve bloqueado** (candado + texto) y una banda fija lo explica. | PRD R19 y N-23 («ver si no tiene internet que le asome un aviso»); audit A-14. |
| DD-12 | **Cada acción responde con un aviso** de confirmación o de error. | PRD R37 y D-S-11 («mensajes de retroalimentación de confirmación o de error estilo pop up»). |
| DD-13 | **Áreas táctiles de 48 px o más** y filas de checklist de 56 px. | Estudiantes en movimiento, con una mano; brandboard sec. 13 (48 dp en Android); audit A-06. |
| DD-14 | **Esquinas rectas en todo.** Excepciones: el punto de estado y el indicador circular de cumplimiento. | Regla 6 de Señal Neón («Esquinas rectas… Las únicas formas curvas son los círculos de cifras… y los indicadores»). |

## 4. Tokens

Todos los valores de color, tipografía, espacio, forma y movimiento salen de Señal Neón v1.0 (sec. 03, 04, 05, 10 y 15), **salvo** los dos colores funcionales (DD-06) y los roles semánticos, que son del equipo. El bloque siguiente es la **fuente única de verdad**: el brand board copia este bloque tal cual.

<!-- tokens:inicio -->
```css
:root {
  /* Paleta Señal Neón v1.0 (sin cambios) */
  --i2h-negro: #050307;          /* fondo de todo */
  --i2h-tinta: #0B0612;          /* superficie y texto sobre morado o lima */
  --i2h-morado: #A46CFB;         /* marca, acción, señal */
  --i2h-morado-profundo: #5B2BB5;/* solo fondo de la marca Urgente */
  --i2h-lima: #5CF000;           /* «ahora»: en ejecución, paso marcado, foco */
  --i2h-blanco: #FFFFFF;

  /* Funcionales del equipo [SUPUESTO DD-06] */
  --sdt-ambar: #FFB020;          /* por vencer */
  --sdt-rojo: #FF5C5C;           /* vencida, fuera de hora, error */

  /* Roles semánticos */
  --color-fondo: var(--i2h-negro);
  --color-superficie: var(--i2h-tinta);
  --color-texto: var(--i2h-blanco);
  --color-texto-suave: rgba(255,255,255,0.64);
  --color-texto-deshabilitado: rgba(255,255,255,0.45);
  --color-borde: rgba(255,255,255,0.14);          /* tarjetas y separadores (decorativo) */
  --color-borde-control: rgba(255,255,255,0.45);  /* campos, casillas, botón neutro */
  --color-accion: var(--i2h-morado);
  --color-texto-sobre-accion: var(--i2h-tinta);
  --color-accion-hover: var(--i2h-lima);
  --color-foco: var(--i2h-lima);
  --color-activo: var(--i2h-lima);
  --color-exito: var(--i2h-lima);
  --color-error: var(--sdt-rojo);
  --color-aviso: var(--sdt-ambar);

  /* Estados de una tarea (PRD R11): texto e ícono */
  --estado-sin-asignar: rgba(255,255,255,0.64);
  --estado-pendiente: var(--i2h-blanco);
  --estado-en-ejecucion: var(--i2h-blanco);       /* + punto lima */
  --estado-en-ejecucion-punto: var(--i2h-lima);
  --estado-vencida: var(--sdt-rojo);
  --estado-completada: var(--i2h-morado);

  /* Marcas (PRD R12) */
  --marca-por-vencer: var(--sdt-ambar);
  --marca-urgente-fondo: var(--i2h-morado-profundo);
  --marca-urgente-texto: var(--i2h-blanco);
  --marca-en-edicion: rgba(255,255,255,0.64);
  --marca-fuera-de-hora: var(--sdt-rojo);

  /* Progreso (único degradado permitido) */
  --progreso: linear-gradient(90deg, #A46CFB, #5CF000);
  --progreso-pista: rgba(255,255,255,0.14);

  /* Tipografía */
  --fuente-display: 'Big Shoulders Display', 'Arial Narrow', sans-serif; /* 900 y 700 */
  --fuente-texto: 'Sora', 'Segoe UI', sans-serif;                        /* 400 y 600 */
  --fs-cifra: 64px;       /* tarjeta señal; 72px en escritorio */
  --fs-h1: 40px;          /* título de pantalla; 48px en escritorio */
  --fs-h2: 28px;          /* título de sección y grupo */
  --fs-temporizador: 28px;
  --fs-titulo-tarea: 17px;
  --fs-cuerpo: 16px;
  --fs-boton: 15px;
  --fs-insignia: 13px;
  --fs-meta: 13px;
  --fs-kicker: 12px;

  /* Espacio (base 4, escala del brandboard) */
  --esp-1: 4px;  --esp-2: 8px;  --esp-3: 12px; --esp-4: 16px; --esp-5: 24px;
  --esp-6: 32px; --esp-7: 48px; --esp-8: 64px; --esp-9: 96px; --esp-10: 120px;

  /* Forma */
  --radio: 0;
  --radio-circulo: 50%;   /* solo punto de estado e indicador circular */
  --borde-componente: 2px;
  --borde-foco: 2px;
  --separacion-foco: 2px;
  --tactil-min: 48px;
  --alto-paso: 56px;
  --sombra-flotante: 0 18px 60px rgba(0,0,0,0.6); /* solo menús y diálogos */

  /* Movimiento */
  --mov-ui: 200ms;
  --mov-barrido: 900ms;   /* solo entrada de la tarjeta señal, una vez */
  --curva: cubic-bezier(0.16, 1, 0.3, 1);
  --curva-barrido: cubic-bezier(0.7, 0, 0.2, 1);
}
```
<!-- tokens:fin -->

### 4.1 Color: roles y contraste

| Rol | Valor | Dónde se usa | Contraste principal |
| --- | --- | --- | --- |
| Fondo | #050307 | Fondo de toda pantalla | — |
| Superficie | #0B0612 | Tarjetas, campos, avisos, menús | — |
| Texto | #FFFFFF | Texto principal | 20,54:1 / 20,02:1 |
| Texto suave | blanco 64 % | Lugar, autor y hora, ayudas, placeholder | 8,27:1 / 8,20:1 |
| Borde | blanco 14 % | Tarjeta y separador (decorativo) | 1,41:1 (no es control) |
| Borde de control | blanco 45 % | Campo, casilla, botón neutro | 4,48:1 / 4,43:1 |
| Acción | #A46CFB + texto tinta | Botón primario, deslizador, enlaces | 5,83:1 (tinta sobre morado) |
| Foco | #5CF000 | Anillo de foco | 13,61:1 / 13,27:1 |
| Error | #FF5C5C | Errores, vencida | 6,61:1 |
| Aviso | #FFB020 | Por vencer, sin conexión | 10,95:1 |

**Proporción por pantalla** (brandboard sec. 03): negro ≈ 70 %, blanco/texto ≈ 16 %, morado ≈ 9 %, el resto ≤ 5 %. El lima nunca es un fondo grande.

### 4.2 Estados de una tarea (PRD R11)

Son **los mismos cinco** del PRD, con los mismos nombres. El texto va siempre visible; el ícono es de línea, 2,4 px de trazo y retícula de 24 px (brandboard sec. 09).

| Estado (texto exacto) | Cuándo (PRD) | Color del texto | Ícono | Forma de la insignia | Contraste sobre superficie |
| --- | --- | --- | --- | --- | --- |
| **Sin asignar** | No tiene responsables (R11) | blanco 64 % | persona con «?» | borde **discontinuo** blanco 64 % | 8,20:1 |
| **Pendiente** | Con responsables, ningún paso marcado | blanco | círculo vacío «○» | borde blanco 45 % | 20,02:1 |
| **En ejecución** | Al menos un paso marcado (D-S-22) | blanco + **punto lima** | punto lima relleno «●» | borde blanco 45 % | 20,02:1 (texto) · 13,27:1 (punto) |
| **Vencida** | Llegó la hora sin completarse | rojo #FF5C5C | círculo con «!» | borde rojo | 6,61:1 |
| **Completada** | Todos los pasos, observación y deslizar | morado #A46CFB | visto «✓» | borde morado | 5,83:1 |

### 4.3 Marcas (PRD R12) — se suman al estado, no lo reemplazan

| Marca (texto exacto) | Cuándo (PRD) | Estilo | Ícono | Contraste |
| --- | --- | --- | --- | --- |
| **Por vencer · faltan 42 min** | Faltan 60 min o menos (R12, P-12) | texto ámbar + temporizador ámbar | reloj de arena «⧗» | 10,95:1 |
| **Urgente** | La marcó un administrador (R27) | etiqueta con fondo morado profundo y texto blanco | rayo «ϟ» | 8,54:1 |
| **En edición · Nombre** | Un administrador la está editando (R13) | texto blanco 64 %; la tarjeta no se puede abrir | candado | 8,20:1 |
| **Fuera de hora** | Se completó después de vencer (R24) | texto rojo junto a «Completada» | reloj con «!» | 6,61:1 |

### 4.4 Tipografía

| Nivel | Fuente | Peso | Tamaño / interlínea | Uso |
| --- | --- | --- | --- | --- |
| Cifra | Big Shoulders Display | 900 | 64/0,9 (72 en escritorio) | Tiempo de la tarjeta señal, totales del tablero |
| H1 | Big Shoulders Display | 900 | 40/0,92 (48 en escritorio), mayúsculas | Título de pantalla: «MIS TAREAS», «TABLERO» |
| H2 | Big Shoulders Display | 900 | 28/0,95, mayúsculas | Grupos del tablero y secciones |
| Temporizador | Big Shoulders Display | 900 | 28/1 | «42 MIN» |
| Título de tarea | Sora | 600 | 17/1,3 | Nombre de la tarea |
| Cuerpo | Sora | 400 | 16/1,5 | Pasos, descripción, campos (16 px mínimo para no hacer zoom) |
| Botón | Sora | 600 | 15/1 | Botones y deslizador |
| Insignia | Sora | 600 | 13/1, tipo oración | Estados y marcas |
| Meta | Sora | 400 | 13/1,4, blanco 64 % | Lugar, autor y hora de un paso |
| Kicker | Sora | 600 | 12/1,2, +0,2 em, mayúsculas, morado | Solo encabezados de sección y tarjeta señal |

Big Shoulders **nunca** baja de 24 px ni va en párrafos. Sora respeta el tamaño de texto del sistema del celular.

### 4.5 Espacio, retícula y forma

- **Escala:** 4, 8, 12, 16, 24, 32, 48, 64, 96, 120 px (base 4, brandboard sec. 05). No hay otros valores.
- **Celular (360–767 px):** 4 columnas, margen 16 px, medianil 16 px, una tarjeta por fila.
- **Tablet (768–1023 px):** 8 columnas, margen 32 px, dos tarjetas por fila.
- **Escritorio (1024 px o más):** 12 columnas, contenido máximo 1200 px, medianil 24 px, tablero de 3 tarjetas por fila (mínimo 320 px de ancho).
- **Radios:** 0 en todo. Círculo solo en el punto de estado y en el indicador circular de cumplimiento.
- **Bordes:** 2 px (componentes); 1 px blanco 14 % (separadores). Sin sombras, salvo menús y diálogos flotantes.

### 4.6 Movimiento

| Token | Valor | Uso |
| --- | --- | --- |
| `--mov-ui` | 200 ms, `--curva` | Hover, foco, marcar un paso, abrir un menú, mostrar un aviso |
| `--mov-barrido` | 900 ms, `--curva-barrido` | Solo la entrada de la tarjeta señal, una vez por carga |
| Lineal | — | Barra de progreso y temporizador (brandboard: «Lineal: solo progreso y cuentas regresivas») |
| Reducir movimiento | — | Con «reducir movimiento» activado, todo aparece sin animación |

No hay animaciones de entrada en listas ni en el tablero (audit A-16), ni rebotes (brandboard sec. 10).

## 5. Componentes

Cada componente cubre lo que necesita un perfil del PRD:

| Perfil | Necesita (PRD) | Componentes |
| --- | --- | --- |
| **Estudiante** (celular) | Ver sus tareas y las urgentes, ejecutar, completar, ver compañeros, sin conexión | Tarjeta de tarea, tarjeta señal, ítem de checklist, campo de observaciones, deslizar para completar, aviso, insignias |
| **Administrador** (escritorio) | Tablero, crear/editar/asignar, reasignar, reabrir, urgentes, panel de estudiantes, ejecutar tareas | Indicador del tablero, tarjeta de tarea, formulario de tarea, selector de responsables, botones, fila de estudiante, panel de filtros |
| **Super administrador** | Lo mismo que el administrador; nadie lo borra | Fila de usuario con insignia «Super admin» y sin acción de eliminar |

### 5.1 Insignia de estado y marcas
- **Anatomía:** ícono (16 px) + texto (13 px, Sora 600) dentro de un borde de 2 px, sin relleno (brandboard: «Chips. Borde 2 px… Sin relleno ni esquinas redondeadas»). Alto 28 px. No es interactiva.
- **Variantes:** los 5 estados (4.2) y las 4 marcas (4.3). La marca «Urgente» es la única con relleno (morado profundo).
- **Regla:** una tarjeta muestra **siempre una insignia de estado** y cero o más marcas, en este orden: estado → Urgente → Por vencer → En edición → Fuera de hora.

### 5.2 Tarjeta de tarea
- **Anatomía (de arriba abajo):**
  1. Insignia de estado y marcas.
  2. Temporizador a la derecha: «Faltan 42 min», «Venció hace 12 min» o «Completada 09:12».
  3. Nombre de la tarea (Sora 600, 17 px).
  4. Lugar (meta).
  5. Barra de progreso de 6 px con el texto «3 de 5 pasos · 60 %».
  6. Iniciales de los responsables (máximo 3 + «+2»).
- **Fondo y borde:** superficie #0B0612, borde 2 px blanco 14 %.
- **Estados de interacción:**
  - **reposo**
  - **hover** (escritorio): el borde pasa a blanco 45 %.
  - **foco**: anillo lima de 2 px, separado 2 px.
  - **presionada**: el fondo se aclara a blanco 4 % sobre la superficie.
  - **bloqueada «En edición»**: contenido en blanco 64 %, candado y «En edición · Mateo Cruz»; no se abre para nadie más que quien edita (R13).
- **Variantes por estado:** las 5 de 4.2. **Completada:** el título pasa a blanco 64 % y se muestran quién completó y la hora. **Vencida:** el temporizador va en rojo.
- **Tamaño:** ancho completo en el celular; mínimo 320 px en la cuadrícula de escritorio. Toda la tarjeta es el área táctil (mínimo 48 px de alto).

### 5.3 Tarjeta señal («Vence primero»)
- **Una por vista.** Fondo morado, texto tinta (5,83:1).
- **Contenido:** kicker «VENCE PRIMERO», cifra en Big Shoulders («42 MIN»), nombre de la tarea en Sora 600 a 17 px (`--fs-titulo-tarea`), lugar, avance.
- Entra con un barrido de 900 ms una sola vez (sin animación si se pidió reducir movimiento).
- Muestra la tarea Por vencer o En ejecución más cercana del usuario. **Si no hay ninguna, no aparece.**
- **Es un botón** y abre el detalle de esa tarea. En la lista de debajo no se repite. El resto de la lista va por cercanía al vencimiento (R35): una urgente a 1 h 12 min queda antes que una pendiente a 2 h 42 min.

### 5.4 Ítem de checklist
- **Anatomía:** casilla de 24 px (borde 2 px blanco 45 %) + texto del paso (16 px) + debajo, si está marcado, «Ana Torres · 09:31» (meta). Toda la fila es el área táctil, de **56 px de alto**.
- **Estados:**

| Estado | Cómo se ve |
| --- | --- |
| Sin marcar | Casilla vacía, borde blanco 45 % |
| Marcado | Casilla con relleno lima y «✓» en tinta (13,27:1), autor y hora debajo (D-S-28) |
| Foco | Anillo lima alrededor de la fila |
| Presionado | Fondo blanco 4 % |
| Sin conexión | Casilla con candado, texto en blanco 64 % y la etiqueta «Sin conexión»; no responde (R19) |
| Solo lectura | La tarea está completada o la ve un administrador que no ejecuta: sin casilla interactiva, solo «✓» o «○» |
| Error al guardar | El paso vuelve a su estado anterior y aparece un aviso de error |

### 5.5 Formulario
- **Campos de la tarea (PRD R7):**
  - Nombre (obligatorio)
  - Descripción (opcional)
  - Fecha y hora de vencimiento (obligatorias)
  - Lugar o aula (obligatorio)
  - Pasos del checklist (al menos uno; se agregan y se quitan)
  - Responsables (selector con disponibilidad)
  - Marcar como urgente
- **Campo de observaciones (R16, R20):** área de texto de 3 líneas o más, **obligatoria para completar**. Se muestra como «Observaciones (obligatorio para completar)».
- **Selector de responsables:** lista con nombre y disponibilidad del día. Los no disponibles aparecen **deshabilitados** con el texto «No disponible sáb 20», salvo en tareas urgentes (R28).
- **Anatomía de un campo:** etiqueta visible arriba (Sora 600, 13 px) + campo (alto 48 px, texto 16 px, borde 2 px blanco 45 %, fondo superficie) + ayuda o error debajo.
- **Estados:**
  - vacío (placeholder blanco 64 %)
  - foco (anillo lima)
  - lleno
  - **error** (borde rojo, ícono «!» y mensaje rojo debajo, como «Pon la hora de vencimiento»)
  - deshabilitado (texto 45 % + candado)
  - solo lectura (sin borde de control)
- Los obligatorios se marcan con la palabra «(obligatorio)», no solo con un asterisco.

### 5.6 Botón
| Variante | Reposo | Hover | Foco | Presionado | Deshabilitado | Cargando |
| --- | --- | --- | --- | --- | --- | --- |
| **Primario** (una acción principal por vista) | Fondo morado, texto tinta | Fondo lima, texto tinta (13,27:1) | Anillo lima + separación de 2 px | Fondo morado, desplazado 1 px | Fondo blanco 14 %, texto 45 % y motivo visible | Texto «Guardando…», sin girar |
| **Secundario** | Borde 2 px morado, texto morado | Relleno morado, texto tinta | Igual | Igual | Borde y texto 45 % | Igual |
| **Peligro** (eliminar) | Borde 2 px rojo, texto rojo | Relleno rojo, texto tinta | Igual | Igual | Borde y texto 45 % | Igual |

- **Alto:** 48 px mínimo; 56 px en el celular para la acción principal. Texto Sora 600 de 15 px.
- **Ícono solo:** con nombre accesible.
- **«Eliminar» y «Reabrir»** piden confirmación en un diálogo.

### 5.7 Deslizar para completar (N-22)
- **Pista** de 56 px de alto con borde blanco 45 % y el texto «Desliza para completar →». **Pulgar** cuadrado morado de 48 px. Al arrastrar, el relleno morado sigue al dedo.
- **Estados:**
  - **bloqueado:** pulgar blanco 14 % y el motivo dentro de la pista, como «Faltan 2 pasos y la observación» (R16).
  - **listo**
  - **arrastrando**
  - **completado:** la pista se llena, aparece «✓ Completada» y el aviso de confirmación.
  - **sin conexión:** bloqueado, con «Sin conexión».
  - **vencida con la tarea abierta (R24):** sigue activo y el texto dice «Se venció. Si la completas ahora, quedará Fuera de hora.»
- **Alternativa accesible:** con teclado o lector de pantalla, el control se activa como un botón «Completar tarea», que pide confirmación.

### 5.8 Aviso
| Variante | Cuándo (PRD) | Cómo se ve | Duración |
| --- | --- | --- | --- |
| **Confirmación** | Cada acción correcta (R37) | Superficie, borde izquierdo lima de 4 px, «✓» y texto blanco: «Paso guardado» | 4 s, se puede cerrar |
| **Error** | Cada acción que falla (R37) | Superficie, borde izquierdo rojo de 4 px, «!» y texto blanco, con «Reintentar» | Hasta que se cierre |
| **Sin conexión** | No hay internet (R19) | **Banda fija** arriba, superficie y borde inferior ámbar de 4 px: «Sin conexión. No puedes marcar pasos hasta que vuelva internet.» | Mientras dure |
| **Por vencer** | Faltan 60 min o menos (R14) | Dentro de la herramienta: aviso ámbar «⧗ "Preparar Sala 3" vence en 60 min» con «Ver tarea» | Hasta que se abra o cierre |
| **Tarea abierta** | Intenta empezar otra (R17) | En línea, ámbar: «Termina "Preparar Sala 3" antes de empezar otra tarea.» + «Ir a esa tarea» | Mientras aplique |
| **Bloqueo** | Intenta editar o borrar donde no se puede (R21, R22) | En línea, texto suave + candado: «No se puede editar: la tarea está en ejecución.» | Mientras aplique |

La acción del aviso («Ver tarea», «Reintentar», «Ir a esa tarea») es un control de 48 px de alto (D-06), no un enlace de texto.

Los avisos se anuncian a los lectores de pantalla: los de error y sin conexión con prioridad; los de confirmación, sin interrumpir.

### 5.9 Indicador del tablero de cumplimiento
- **Anatomía:**
  - **Fila de totales por estado** (R33): una cifra en Big Shoulders 900 de 40 px más la insignia de su estado. Son los cinco estados, y suman el total del día. «Por vencer» no entra en esa fila: es una marca (R12), y su cantidad va en la nota del cumplimiento («3 por vencer, contadas aparte»).
  - **Cumplimiento:** completadas / total, con un **indicador circular** (la única forma curva) y la cifra en lima («62 %», la única cifra lima de la vista, 13,61:1).
  - **Barra de progreso** morado → lima con el texto «18 de 29 tareas completadas».
- **Grupos (R31):** Pendientes, Vencidas, Por vencer, En ejecución, Sin asignar y Terminadas, cada uno con su título H2 y su total.
- **Panel de filtros y orden (R32):** filtro «Por vencer», orden por cercanía al vencimiento, de más reciente a más antigua, por estado o por lugar. El filtro activo se ve con borde morado, texto morado y un «✓».
- **Estados:**
  - **cargando:** bloques grises de la forma de las tarjetas, sin animación de brillo.
  - **vacío:** «Todavía no hay tareas. Crear la primera» con el botón primario.
  - **con datos**
  - **filtro sin resultados:** «No hay tareas por vencer.»
  - **sin conexión:** banda fija y los datos con la hora de la última actualización.

### 5.10 Fila de estudiante y de usuario
- **Panel de estudiantes (R36):** nombre, número de tareas («3 tareas» o «Sin tareas»), disponibilidad del día («Sáb 20 · 08:00–14:00») y horas que le quedan («Le quedan 2 h 30 min», R29). «Sin tareas» es una etiqueta propia, en texto suave, y no usa el ámbar ni el reloj de «Por vencer». Al tocarla se abre su historial de completadas.
- **Usuarios:** nombre, correo, teléfono e insignia de perfil («Super admin», «Admin» o «Estudiante»). La fila del **super administrador no tiene acción de eliminar** ni de cambiar su contraseña (R3).

### 5.11 Navegación [SUPUESTO]
- **Celular:** barra inferior con un máximo de 4 destinos, cada uno un enlace con ícono y texto (Sora 600, 12 px) y foco lima. El activo va en blanco con un punto lima; los inactivos, en blanco 64 %.
  - Estudiante: «Mis tareas», «Completadas», «Perfil».
  - Administrador: «Tablero», «Tareas», «Estudiantes», «Usuarios».
- **Escritorio:** los mismos destinos en una barra superior.

## 6. Accesibilidad

### 6.1 Contraste calculado (WCAG 2.x)

Fórmula: contraste = (L1 + 0,05) / (L2 + 0,05), con la luminancia relativa L de cada color en sRGB. Los colores con transparencia se **mezclan primero con su fondo real**. Mínimos: **4,5:1 para texto** y **3:1 para bordes de controles e indicadores gráficos**. Todos los valores se calcularon con el script de 6.2.

| Id | Uso | Primer plano | Fondo | Contraste | Mínimo | Resultado |
| --- | --- | --- | --- | --- | --- | --- |
| C-01 | Texto principal | blanco #FFFFFF | fondo #050307 | **20,54:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-02 | Texto principal en tarjetas | blanco #FFFFFF | superficie #0B0612 | **20,02:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-03 | Texto secundario (lugar, autor y hora de un paso, placeholder) | blanco 64 % | fondo #050307 | **8,27:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-04 | Texto secundario en tarjetas | blanco 64 % | superficie #0B0612 | **8,20:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-05 | Botón primario y tarjeta señal | tinta #0B0612 | morado #A46CFB | **5,83:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-06 | Kicker, enlace, botón secundario | morado #A46CFB | fondo #050307 | **5,98:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-07 | Insignia «Completada» | morado #A46CFB | superficie #0B0612 | **5,83:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-08 | Insignia y temporizador «Por vencer» | ámbar #FFB020 | superficie #0B0612 | **10,95:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-09 | Insignia y temporizador «Vencida», marca «Fuera de hora», error | rojo #FF5C5C | superficie #0B0612 | **6,61:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-10 | Insignias «Pendiente» y «En ejecución» (texto) | blanco #FFFFFF | superficie #0B0612 | **20,02:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-11 | Insignia «Sin asignar» | blanco 64 % | superficie #0B0612 | **8,20:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-12 | Marca «Urgente» | blanco #FFFFFF | morado profundo #5B2BB5 | **8,54:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-13 | Marca «En edición» | blanco 64 % | superficie #0B0612 | **8,20:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-14 | Botón primario en hover | tinta #0B0612 | lima #5CF000 | **13,27:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-15 | Estados sobre el fondo (encabezados de grupo del tablero): ámbar | ámbar #FFB020 | fondo #050307 | **11,23:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-16 | Estados sobre el fondo: rojo | rojo #FF5C5C | fondo #050307 | **6,78:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-17 | Cifra clave del indicador de cumplimiento (una por vista) | lima #5CF000 | fondo #050307 | **13,61:1** | 4,5:1 | Pasa (≥ 4,5) |
| C-18 | Texto deshabilitado (exento de WCAG, solo con ícono de candado) | blanco 45 % | superficie #0B0612 | **4,48:1** | — (exento) | Exento (deshabilitado) |
| B-01 | Borde de campo, casilla y botón secundario neutro | blanco 45 % | superficie #0B0612 | **4,48:1** | 3:1 | Pasa (≥ 3) |
| B-02 | Borde de campo sobre el fondo | blanco 45 % | fondo #050307 | **4,43:1** | 3:1 | Pasa (≥ 3) |
| B-03 | Borde del botón secundario | morado #A46CFB | fondo #050307 | **5,98:1** | 3:1 | Pasa (≥ 3) |
| B-04 | Anillo de foco | lima #5CF000 | fondo #050307 | **13,61:1** | 3:1 | Pasa (≥ 3) |
| B-05 | Anillo de foco en tarjetas | lima #5CF000 | superficie #0B0612 | **13,27:1** | 3:1 | Pasa (≥ 3) |
| B-06 | Casilla marcada (relleno) | lima #5CF000 | superficie #0B0612 | **13,27:1** | 3:1 | Pasa (≥ 3) |
| B-07 | Barra de progreso (relleno) y control deslizante | morado #A46CFB | superficie #0B0612 | **5,83:1** | 3:1 | Pasa (≥ 3) |
| B-08 | Borde de campo con error | rojo #FF5C5C | superficie #0B0612 | **6,61:1** | 3:1 | Pasa (≥ 3) |
| B-09 | Punto de «En ejecución» y paso marcado | lima #5CF000 | superficie #0B0612 | **13,27:1** | 3:1 | Pasa (≥ 3) |
| B-10 | Borde discontinuo «Sin asignar» | blanco 64 % | superficie #0B0612 | **8,20:1** | 3:1 | Pasa (≥ 3) |
| X-01 | Borde de tarjeta y separador (decorativo, no es control) | blanco 14 % | superficie #0B0612 | **1,41:1** | — | No aplica (decorativo) |
| X-02 | Borde de componente del brandboard usado en un control (rechazado) | blanco 14 % | fondo #050307 | **1,37:1** | — | No pasa → no se usa |
| X-03 | Blanco sobre morado (rechazado) | blanco #FFFFFF | morado #A46CFB | **3,43:1** | — | No pasa → no se usa |
| X-04 | Morado profundo como texto (rechazado) | morado profundo #5B2BB5 | fondo #050307 | **2,40:1** | — | No pasa → no se usa |
| X-05 | Etiqueta de la tarjeta señal en tinta al 72 %, como dice el brandboard (rechazado; se usa tinta 100 %, C-05) | tinta 72 % | morado #A46CFB | **4,02:1** | — | No pasa → no se usa |
| X-06 | Blanco 45 % como texto normal (rechazado) | blanco 45 % | fondo #050307 | **4,43:1** | — | No pasa → no se usa |
**Pares que no pasaron y cómo se resolvieron:**
- **X-02** · blanco 14 % en un control: **1,37:1**. Es el borde de componente del brandboard. Los controles usan blanco 45 % (B-01/B-02: 4,48:1 y 4,43:1). El 14 % queda solo para tarjetas y separadores (X-01, decorativo).
- **X-03** · blanco sobre morado: **3,43:1**. El texto sobre morado es siempre tinta (C-05: 5,83:1), como recomienda el brandboard.
- **X-04** · morado profundo como texto: **2,40:1**. Solo es fondo de la marca «Urgente», con texto blanco (C-12: 8,54:1).
- **X-05** · tinta 72 % sobre morado: **4,02:1**. El brandboard usa esa etiqueta al 72 % en la tarjeta señal; aquí va en tinta al 100 % (5,83:1).
- **X-06** · blanco 45 % como texto: **4,43:1**. Solo se usa en texto deshabilitado (exento), siempre con candado.

### 6.2 Script de verificación

```python
# Uso: python3 contraste.py  → imprime el contraste de un par
def hx(h): h = h.lstrip('#'); return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))
def mezcla(fg, a, bg): return tuple(round(f*a + b*(1-a)) for f, b in zip(hx(fg), hx(bg)))
def lum(c):
    def ch(v):
        v /= 255; return v/12.92 if v <= 0.04045 else ((v + 0.055)/1.055) ** 2.4
    r, g, b = map(ch, c); return 0.2126*r + 0.7152*g + 0.0722*b
def contraste(a, b):
    l1, l2 = sorted([lum(a), lum(b)], reverse=True); return (l1 + 0.05)/(l2 + 0.05)
print(round(contraste(hx('#0B0612'), hx('#A46CFB')), 2))                       # 5.83
print(round(contraste(mezcla('#FFFFFF', 0.45, '#0B0612'), hx('#0B0612')), 2))  # 4.48
```

### 6.3 Foco, áreas táctiles, estados y movimiento
- **Foco visible:** todo elemento interactivo muestra un anillo **lima de 2 px con 2 px de separación** (13,61:1 sobre el fondo; 13,27:1 sobre la superficie) cuando se llega con teclado. El foco nunca se quita.
- **Orden de foco:** sigue el orden visual. En la tarea, el orden es: pasos → observaciones → completar.
- **Áreas táctiles:** **48 × 48 px como mínimo** en todo control. Las filas del checklist y el deslizador miden 56 px. Hay al menos 8 px entre dos controles vecinos.
- **Estados que no dependen solo del color:** cada estado y cada marca llevan **texto e ícono**. El progreso lleva siempre el texto «3 de 5 pasos». Los errores llevan ícono «!» y un mensaje.
- **Texto:** 16 px como mínimo en cuerpo y campos, y 13 px en meta e insignias. El texto debe seguir funcionando al 200 % de zoom, sin scroll horizontal en 360 px.
- **Lectores de pantalla:** estados e insignias como texto real; el temporizador se anuncia solo al entrar en «Por vencer» o al vencer; los avisos de error y sin conexión, con prioridad.
- **Movimiento:** se respeta «reducir movimiento». No hay parpadeos ni animaciones en bucle; el temporizador cambia una vez por minuto.
- **Idioma:** la interfaz va en español, con el idioma de la página declarado como español.

## 7. Contexto de uso reflejado en el diseño

| Contexto del PRD | Decisión de diseño |
| --- | --- |
| Estudiantes sobre todo en el celular, en movimiento (D-S-01) | Una columna, tarjeta señal arriba, áreas táctiles de 48–56 px, completar deslizando con el pulgar (DD-10, DD-13) |
| Administradores en el escritorio, mirando el tablero | Cuadrícula de 3 tarjetas, totales por estado, grupos y panel de filtros (DD-07, 5.9) |
| Conectividad del evento que puede fallar (R19, D-S-02, N-23) | Banda fija «Sin conexión», pasos bloqueados con candado, sin depender de servicios externos para las fuentes, páginas livianas (DD-09, DD-11) |
| Notificación de «por vencer» (R14, D-S-15) | Aviso ámbar dentro de la herramienta. La notificación con la herramienta cerrada usa el mismo texto: «⧗ "Nombre" vence en 60 min» |
| Una tarea abierta a la vez (R17, D-S-26) | Aviso «Tarea abierta» con acceso directo a esa tarea |
| Edición sin choques (R13, D-S-23) | Tarjeta bloqueada «En edición · Nombre» |

## 8. Reglas para el agente

**El agente DEBE:**
1. Usar solo los tokens de la sección 4. Ningún color, tamaño, espacio o duración puede ir escrito a mano en un componente.
2. Usar exactamente los nombres de estado del PRD: **Sin asignar, Pendiente, En ejecución, Vencida, Completada**. Y las marcas **Por vencer, Urgente, En edición, Fuera de hora**, siempre con texto + ícono.
3. Calcular el estado con las reglas del PRD (R11–R13) y mostrar una insignia de estado en cada tarjeta.
4. Mostrar el temporizador con su palabra («Faltan», «Venció hace», «Completada»).
5. Poner una sola tarjeta señal morada por vista, y solo si hay una tarea Por vencer o En ejecución del usuario.
6. Usar el lima solo para: el punto de «En ejecución», el paso marcado, el foco, la pestaña activa y una cifra clave por vista.
7. Dar a cada control un área táctil de 48 × 48 px o más, y un foco visible lima.
8. Mostrar la banda «Sin conexión» y bloquear los pasos cuando no haya internet.
9. Mostrar un aviso de confirmación o de error después de cada acción (R37).
10. Escribir los textos de la interfaz en español, en «tú» (brandboard sec. 11), con frases cortas y sin signos de exclamación.
11. Verificar cada pantalla en 360, 390, 768 y 1280 px, con teclado y con «reducir movimiento».
12. Servir las fuentes Big Shoulders Display (700, 900) y Sora (400, 600) con la propia herramienta, con respaldo Arial Narrow y Segoe UI.

**El agente NO DEBE:**
1. Redondear esquinas (salvo el punto de estado y el indicador circular).
2. Poner texto blanco sobre morado, ni usar morado profundo o blanco 45 % para texto normal.
3. Usar Big Shoulders por debajo de 24 px ni en párrafos.
4. Usar el lima como fondo de áreas grandes, ni más de una tarjeta morada sólida por vista.
5. Agregar degradados, brillos, sombras o fotos en listas y tarjetas. El único degradado permitido es la barra de progreso.
6. Agregar animaciones de entrada en listas, rebotes o parpadeos.
7. Distinguir estados solo por color.
8. Inventar estados, marcas o colores que no estén aquí. Si hace falta uno, se agrega primero a este DESIGN.md.
9. Ofrecer un modo claro.
10. Usar el borde blanco 14 % en un control.

## 9. Criterios verificables

| Id | Criterio | Cómo se comprueba |
| --- | --- | --- |
| D-01 | Los cinco estados y las cuatro marcas tienen los mismos nombres que el PRD (R11, R12). | Buscar cada nombre en el PRD y en la interfaz: deben coincidir letra por letra. |
| D-02 | Ningún estado se distingue solo por color. | Ver la pantalla en escala de grises: cada estado se reconoce por su ícono y su texto. |
| D-03 | Todo texto normal tiene 4,5:1 o más sobre su fondo real. | Revisar con la herramienta de contraste del navegador, o con el script 6.2, cada par de la tabla 6.1 usado en pantalla. |
| D-04 | Todo borde de control e indicador gráfico tiene 3:1 o más. | Igual que D-03, con los pares B-xx. Ningún control usa blanco 14 %. |
| D-05 | Todo elemento interactivo muestra un foco lima visible. | Recorrer la pantalla con Tab: cada elemento muestra el anillo y nunca se pierde el foco. |
| D-06 | Todo control mide 48 × 48 px o más; las filas del checklist y el deslizador, 56 px. | Medir con las herramientas del navegador en 390 px. |
| D-07 | No hay esquinas redondeadas, salvo las dos excepciones. | Inspeccionar los componentes: radio 0. |
| D-08 | Hay como máximo una superficie morada sólida por vista. | Revisar cada pantalla: contar los bloques morados sólidos (los botones primarios no cuentan como bloque). |
| D-09 | No hay valores escritos a mano fuera de los tokens. | Buscar colores en hexadecimal, px sueltos y duraciones en los componentes: todo debe referir a un token. |
| D-10 | Big Shoulders no aparece por debajo de 24 px. | Inspeccionar cada uso de la fuente display. |
| D-11 | Sin internet aparece la banda fija y no se puede marcar ningún paso. | Desconectar la red en el navegador: debe aparecer la banda y los pasos deben quedar bloqueados con candado. |
| D-12 | Deslizar para completar está bloqueado y dice qué falta mientras haya pasos sin marcar o no haya observación. | Abrir una tarea con 3 de 5 pasos marcados: el control dice «Faltan 2 pasos y la observación» y no responde. |
| D-13 | Cada acción muestra un aviso de confirmación o de error. | Marcar un paso, guardar, asignar y eliminar: cada una muestra su aviso. |
| D-14 | La tarjeta en edición no se abre para otro usuario. | Abrir la misma tarea en edición desde dos sesiones de administrador. |
| D-15 | En 360 px no hay scroll horizontal, ni con nombres largos. | Probar con un nombre de tarea de 80 caracteres sin espacios. |
| D-16 | Con «reducir movimiento» no hay animaciones. | Activar la preferencia en el sistema y recargar. |
| D-17 | El tablero de escritorio es una cuadrícula de tarjetas agrupadas en el orden de R31, con totales por estado. | Abrir el tablero en 1280 px con datos de ejemplo de los cinco estados. |
| D-18 | Las fuentes cargan sin depender de un servicio externo. | Bloquear las solicitudes a otros dominios en el navegador: las fuentes deben verse igual. |
| D-19 | El brand board coincide con este DESIGN.md. | Comparar el bloque de tokens de la sección 4 con el del brand board: deben ser idénticos. El script `docs/diseno/generar-brand-board.py` lo copia. |
| D-20 | El temporizador siempre lleva su palabra y cambia de color solo en Por vencer (ámbar) y Vencida (rojo). | Revisar tareas en los cinco estados. |

## 10. Coherencia con el PRD

| PRD | Dónde está en este DESIGN.md |
| --- | --- |
| R11, 5 estados | 4.2, 5.1, D-01 |
| R12, 4 marcas | 4.3, 5.1, D-01 |
| R13, En edición | 5.2 (bloqueada), D-14 |
| R14, aviso por vencer | 5.8 |
| R15, temporizador | 5.2, D-20 |
| R16 y N-22, completar | 5.7, D-12 |
| R17, una tarea abierta | 5.8 «Tarea abierta» |
| R19 y N-23, sin internet | 5.4, 5.8, D-11 |
| R23 y N-10, compañeros con nombre y teléfono | 5.2 (iniciales), detalle de la tarea |
| R28, disponibilidad | 5.5 (selector) |
| R29 y R36, panel de estudiantes | 5.10 |
| R30–R34, tablero | 5.9, D-17 |
| R3, super administrador | 5.10 |
| R37, mensajes de confirmación o de error | 5.8, D-13 |
| D-S-01, celular y computadora | 4.5, 7 |
| D-P16, Señal Neón | 1, 4 |

## 11. Supuestos y preguntas para el equipo

| Id | [SUPUESTO] | Pregunta para el equipo |
| --- | --- | --- |
| SD-01 | El referente es la pantalla de salidas de un aeropuerto, y como secundario, la app móvil de Señal Neón. | Confirmado por el equipo el 25 de noviembre de 2026. |
| SD-02 | Dirección elegida: B · Tablero de salidas, con la tarjeta señal de A y la barra de C. | Confirmada por el equipo el 25 de noviembre de 2026. |
| SD-03 | Rojo #FF5C5C y ámbar #FFB020 se agregan como colores funcionales, porque Señal Neón no define colores de alerta. | ¿Aceptan agregar estos dos colores a la identidad del cliente? ¿Conviene preguntar al cliente? |
| SD-04 | «Completada» usa el morado #A46CFB (con «✓»), el mismo color que la acción principal; se distinguen porque el botón va relleno y la insignia solo con borde. | ¿Les parece claro, o prefieren otro tratamiento? |
| SD-05 | No hay modo claro (el brandboard dice que no se ofrece). | ¿Hay espacios al aire libre donde se vaya a usar con sol directo? |
| SD-06 | Destinos de navegación (5.11). | ¿Son esos destinos los que esperan? |
| SD-07 | Nombre del sistema: «Señal de Turno». | ¿Les gusta el nombre? |
| SD-08 | En el brand board, los nombres de personas, horas y tareas son datos de ejemplo, no del cliente. Los lugares (Hall principal, Sala 3 · Edificio Galileo, Teatro Calderón de la Barca) salen de las muestras ilustrativas del brandboard. | ¿Conocen los lugares reales del evento? |
| SD-09 | El 25 de noviembre de 2026 se corrió `impeccable detect` y, aparte, la evaluación de diseño de `/impeccable critique` (C-20 a C-27). No se ejecutó `/impeccable init` ni `/impeccable document`. | Hecho. Los hallazgos están en `docs/diseno/criticas/`. |
| SD-10 | El texto de la notificación con la herramienta cerrada (R14) es el mismo que el del aviso por vencer. | ¿Está bien ese texto? |
