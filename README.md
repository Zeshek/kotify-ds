# Kotify DS

Design system de **Kotify** ("donde la comida te espera a ti") para Angular: tokens generados desde Figma, componentes y Storybook.

- **Fuente de verdad:** la librería de Figma [Kotify DS](https://www.figma.com/design/a2v6x5b3ALVaR5Us1fdNGB/Kotify-DS). Si este repo y Figma no coinciden, gana Figma.
- **Reglas para personas y agentes de IA:** [`AGENTS.md`](./AGENTS.md).

## Estado

| Pieza | Estado |
|---|---|
| Tokens (590 variables: Primitives 155, Semantics 101, Component 334) | ✅ Generados desde Figma, con aliases |
| Storybook: fundamentos (color, tipografía, espaciado, radios) | ✅ |
| Button | ✅ Piloto |
| Resto de componentes (Badge, Bubble, IconButton, Card, Checkbox, Counter, Input, Order bar, Page Header, Pills, Radio Button, Text Field, Time Picker) | Pendiente |

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
