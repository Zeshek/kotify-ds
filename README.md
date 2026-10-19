# Kotify DS

Design system de **Kotify** ("donde la comida te espera a ti") para Angular: tokens generados desde Figma, componentes y Storybook.

- **Fuente de verdad:** la librería de Figma [Kotify DS](https://www.figma.com/design/a2v6x5b3ALVaR5Us1fdNGB/Kotify-DS). Si este repo y Figma no coinciden, gana Figma.
- **Reglas para personas y agentes de IA:** [`AGENTS.md`](./AGENTS.md).

## Estado

Todos los componentes de la librería de Figma están implementados (pendientes de QA):

| Componente | Selector | Notas |
|---|---|---|
| Button | `button[kdsButton]` | 4 variantes, 2 tamaños, motion y foco |
| IconButton | `button[kdsIconButton]` | `label` obligatorio |
| Badge | `kds-badge` | |
| Bubble | `kds-bubble` | |
| Checkbox | `kds-checkbox`, `kds-checkbox-group` | Formularios Angular |
| Radio Button | `kds-radio-group`, `kds-radio` | Formularios Angular |
| Input | `kds-input` | Formularios Angular |
| Text Field | `kds-text-field` | Formularios Angular |
| Pills | `kds-pills`, `button[kdsPill]`, `a[kdsPill]` | |
| Counter | `kds-counter` | Límites del producto |
| Page Header | `kds-page-header` | |
| Order bar | `kds-order-bar` | |
| Time Picker | `kds-time-picker` | Rueda tipo iOS; minutos del producto |
| Cards | `kds-product-card`, `kds-order-card`, `kds-time-slot-card`, `kds-upsell-card`, `kds-checkout-card`, `kds-reservation-card` | |
| Iconos | `svg[kdsIcon]` (`more`, `less`, `arrow`) | |

Tokens: 596 variables (Primitives 155, Semantics 104, Component 337) y 2 effect styles (`elevation/raised`, `elevation/floating`), generados desde Figma.

Storybook público: https://zeshek.github.io/kotify-ds/

## Requisitos

- Node.js 22.12+ (o 24+).
- npm 11 recomendado. Con npm 10.9 la instalación puede fallar con `Cannot read properties of null (reading 'edgesOut')`; en ese caso usa `npx npm@11 install`.

## Comandos

```bash
npm install
npm run storybook        # Storybook en http://localhost:6006
npm run build            # Librería en dist/kotify-ds
npm run build-storybook  # Storybook estático en storybook-static/
npm run tokens           # Regenera los tokens desde tokens/figma-export/
```

`storybook`, `build` y `build-storybook` regeneran los tokens antes de arrancar.

## Estructura

```
AGENTS.md                         Reglas del sistema (fuente para IA y personas)
tokens/
  figma-export/*.txt              Export crudo de las variables de Figma
  kotify.tokens.json              Tokens estructurados (generado)
  README.md                       Formato del export y cómo actualizarlo
scripts/build-tokens.mjs          Valida el export y genera CSS, JSON y metadatos
projects/kotify-ds/
  src/styles/tokens.css           CSS custom properties (generado)
  src/lib/button/                 Button (componente, estilos, stories)
  src/foundations/                Páginas de fundamentos para Storybook
  .storybook/                     Configuración de Storybook
```

## Uso en una app Angular

```scss
// styles.scss (global)
@import 'kotify-ds/styles/tokens.css';
```

```ts
import { KdsButton } from 'kotify-ds';

@Component({
  imports: [KdsButton],
  template: `<button kdsButton variant="primary" size="large" type="button">Confirmar pedido</button>`,
})
export class Example {}
```

Las fuentes (Inter y Lora) no se incluyen en el paquete; cárgalas en la app.
