#!/usr/bin/env python3
"""Genera docs/diseno/brand-board.html a partir de DESIGN.md (manda DESIGN.md).
- Copia tal cual el bloque de tokens (entre <!-- tokens:inicio --> y <!-- tokens:fin -->).
- Toma la tabla de contraste de la sección 6.1 y la de estados de la sección 4.2.
- Incrusta las fuentes de docs/diseno/fuentes/ para que el archivo sea autocontenido.
Uso: python3 docs/diseno/generar-brand-board.py   (desde la raíz del repositorio)
"""
import base64, html, pathlib, re

RAIZ = pathlib.Path(__file__).resolve().parents[2]
design = (RAIZ / 'DESIGN.md').read_text(encoding='utf-8')

tokens = re.search(r'<!-- tokens:inicio -->\s*```css\n(.*?)```\s*<!-- tokens:fin -->', design, re.S).group(1)
version = re.search(r'\*\* · (v[\d.]+) · ', design).group(1)

def tabla(titulo):
    sec = design.split(titulo, 1)[1]
    filas = [l for l in sec.splitlines() if l.startswith('|')]
    out = []
    for l in filas:
        celdas = [c.strip() for c in l.strip('|').split('|')]
        if set(''.join(celdas)) <= set('- '):
            continue
        out.append(celdas)
        if len(out) > 1 and not sec.split(l, 1)[1].lstrip().startswith('|'):
            break
    return out[0], out[1:]

_, contraste = tabla('### 6.1 Contraste calculado')
_, estados = tabla('### 4.2 Estados de una tarea')
_, marcas = tabla('### 4.3 Marcas')

def md(t):
    t = html.escape(t)
    return re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)

fuentes = ''
for archivo, familia, peso in [('BigShouldersDisplay-900.woff2', 'Big Shoulders Display', 900),
                               ('BigShouldersDisplay-700.woff2', 'Big Shoulders Display', 700),
                               ('Sora-400.woff2', 'Sora', 400), ('Sora-600.woff2', 'Sora', 600)]:
    b64 = base64.b64encode((RAIZ / 'docs/diseno/fuentes' / archivo).read_bytes()).decode()
    fuentes += f"@font-face{{font-family:'{familia}';font-weight:{peso};font-display:swap;src:url(data:font/woff2;base64,{b64}) format('woff2')}}\n"

filas_contraste = '\n'.join(
    f'<tr><td>{md(c[0])}</td><td>{md(c[1])}</td><td>{md(c[2])}</td><td>{md(c[3])}</td><td class="num">{md(c[4])}</td><td>{md(c[6])}</td></tr>'
    for c in contraste)

plantilla = (RAIZ / 'docs/diseno/brand-board.plantilla.html').read_text(encoding='utf-8')
salida = (plantilla.replace('/*FUENTES*/', fuentes)
                   .replace('/*TOKENS*/', tokens)
                   .replace('<!--VERSION-->', version)
                   .replace('<!--CONTRASTE-->', filas_contraste)
                   .replace('<!--N_ESTADOS-->', str(len(estados)))
                   .replace('<!--N_MARCAS-->', str(len(marcas))))
(RAIZ / 'docs/diseno/brand-board.html').write_text(salida, encoding='utf-8')
print('brand-board.html generado:', len(salida), 'bytes;', len(contraste), 'pares de contraste;', len(estados), 'estados;', len(marcas), 'marcas')
