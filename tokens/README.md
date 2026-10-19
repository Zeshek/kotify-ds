# Tokens

Los tokens se generan a partir de las variables del archivo de Figma **Kotify DS**. No se editan a mano.

## Flujo

1. Exportar las variables de Figma a `figma-export/` (un archivo por colección) y los effect styles de Kotify a `figma-export/effects.txt` (`nombre|CAPA;CAPA`, con `CAPA = DROP_SHADOW x y blur spread #rrggbb alfa%`).
2. `npm run tokens` valida el export y genera:
   - `projects/kotify-ds/src/styles/tokens.css`: CSS custom properties.
   - `tokens/kotify.tokens.json`: tokens estructurados, con aliases.
   - `projects/kotify-ds/src/foundations/tokens.generated.ts`: metadatos para Storybook.

El script falla si cambia el número de variables esperado (155 / 104 / 337), si hay nombres duplicados, aliases rotos o referencias que se saltan la jerarquía **Primitives → Semantics → Component**. Si el recuento cambia a propósito, actualiza `expected` en `scripts/build-tokens.mjs`.

## Formato del export

Una línea por variable: `nombre|tipo|valor|scopes`

- **tipo:** `C` color, `F` número, `S` texto.
- **valor:** literal (`#c3420d`, `16`, `Inter`) o alias: `@P:` (Primitives), `@S:` (Semantics). Un alias con opacidad lleva `~N` (por ejemplo `@S:color/primary/base~50` = 50 %).
- **scopes:** scopes de Figma. Abreviaturas: `FILL` = `FRAME_FILL,SHAPE_FILL`; `TSE` = `TEXT_FILL,STROKE_COLOR,EFFECT_COLOR`.

## Traducción a CSS

- **Nombre:** el code syntax `WEB` de Figma. Es la ruta en minúsculas, con `/`, espacios y comas sustituidos por `-`, por ejemplo `color/on primary/default` → `--color-on-primary-default`. Comprobado contra Figma: 0 diferencias.
- **Alias:** `var(--destino)`. Se mantiene la cadena Component → Semantics → Primitives; los valores nunca se aplanan.
- **Alias con opacidad:** `color-mix(in srgb, var(--destino) N%, transparent)`.
- **Unidades:**

  | Tipo de token | Unidad |
  |---|---|
  | Dimensiones (espaciado, radios, tamaños, line-height en px, bordes) | `px` |
  | Pesos (`font-weight`, `font/weight/*`) | sin unidad |
  | `font/leading/*` | `%` |
  | `font/tracking/*` | Porcentaje del tamaño de fuente expresado en `em` (−5 → −0.05em) |

  Estos dos últimos grupos no los usa ningún token semántico. La conversión de `tracking` es una interpretación que hay que validar si algún día se usan.
