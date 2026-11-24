#!/usr/bin/env python3
"""Genera docs/diseno/bocetos.html (maquetas de pantallas) a partir de DESIGN.md.
Reutiliza: el bloque de tokens de DESIGN.md (tal cual), los estilos de componentes y los íconos
del brand board (brand-board.plantilla.html) y las fuentes de docs/diseno/fuentes/.
Si algo no coincide, manda DESIGN.md.  Uso: python3 docs/diseno/generar-bocetos.py
"""
import base64, pathlib, re

RAIZ = pathlib.Path(__file__).resolve().parents[2]
D = RAIZ / 'docs/diseno'
design = (RAIZ / 'DESIGN.md').read_text(encoding='utf-8')
tokens = re.search(r'<!-- tokens:inicio -->\s*```css\n(.*?)```\s*<!-- tokens:fin -->', design, re.S).group(1)
version = re.search(r'\*\* · (v[\d.]+) · ', design).group(1)
bb = (D / 'brand-board.plantilla.html').read_text(encoding='utf-8')
componentes = re.search(r'/\* ===== Estilos del brand board \(solo usan tokens\) ===== \*/\n(.*?)</style>', bb, re.S).group(1)
iconos = re.search(r'(<svg width="0" height="0".*?</svg>)\n', bb, re.S).group(1)

fuentes = ''
for archivo, familia, peso in [('BigShouldersDisplay-900.woff2', 'Big Shoulders Display', 900),
                               ('BigShouldersDisplay-700.woff2', 'Big Shoulders Display', 700),
                               ('Sora-400.woff2', 'Sora', 400), ('Sora-600.woff2', 'Sora', 600)]:
    b64 = base64.b64encode((D / 'fuentes' / archivo).read_bytes()).decode()
    fuentes += f"@font-face{{font-family:'{familia}';font-weight:{peso};font-display:swap;src:url(data:font/woff2;base64,{b64}) format('woff2')}}\n"

out = ((D / 'bocetos.plantilla.html').read_text(encoding='utf-8')
       .replace('/*FUENTES*/', fuentes).replace('/*TOKENS*/', tokens)
       .replace('/*COMPONENTES*/', componentes).replace('<!--ICONOS-->', iconos)
       .replace('<!--VERSION-->', version))
(D / 'bocetos.html').write_text(out, encoding='utf-8')
print('bocetos.html generado:', len(out), 'bytes')
