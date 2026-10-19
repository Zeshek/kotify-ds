import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{r as t,t as n}from"./dist-BbAR0bsP.js";import{n as r,t as i}from"./button-GM80Ufnq.js";var a,o,s,c,l,u,d,f,p;function init_button_stories(){return(init_button_stories=e((()=>{n(),r(),a={title:`Components/Button`,tags:[`autodocs`],decorators:[t({imports:[i]})],parameters:{docs:{description:{component:["Action button. Mirrors the Figma `Button` component set: **variant** (primary, secondary, ghost, destructive),",`**size** (large, small) and **states** (default, hover, pressed, disabled).`,``,`- Use **primary** for the dominant action of a context, **secondary** for important alternatives,`,`  **ghost** for lower-emphasis actions and **destructive** for actions with negative consequences.`,"- Apply it to a native `<button>` (`<button kdsButton>`) to keep keyboard and disabled semantics.",`- Labels are concise and action-oriented. Width follows the content; sizing comes from padding, not a fixed height.`,"- **Motion (all variants):** hover lifts the button 2 px and pressed scales it to 0.98 (120 ms ease-out, off with `prefers-reduced-motion`). Secondary and destructive keep their background on hover and pressed by design, so motion is their state feedback.",`- **Primary disabled** keeps its label at 90 % opacity (other variants use 50 %) for legibility.`,"- Keyboard focus uses `:focus-visible` with the semantic focus tokens (`color/focus/ring`, `focus/ring-width`, `focus/ring-offset`). Tab to a button to see it."].join(`
`)}}},argTypes:{variant:{control:`inline-radio`,options:[`primary`,`secondary`,`ghost`,`destructive`]},size:{control:`inline-radio`,options:[`large`,`small`]},disabled:{control:`boolean`},label:{control:`text`}},args:{label:`Label`,variant:`primary`,size:`large`,disabled:!1},render:e=>({props:e,template:`<button kdsButton type="button" [variant]="variant" [size]="size" [disabled]="disabled">{{ label }}</button>`})},o={},s={args:{variant:`primary`,label:`Confirmar pedido`}},c={args:{variant:`secondary`,label:`Añadir nota`}},l={args:{variant:`ghost`,label:`Ahora no`}},u={args:{variant:`destructive`,label:`Cancelar reserva`}},d={parameters:{controls:{disable:!0}},render:()=>({props:{variants:[`primary`,`secondary`,`ghost`,`destructive`],sizes:[`large`,`small`]},template:`
      <div style="display:grid; grid-template-columns: max-content repeat(4, max-content); gap: var(--space-md) var(--space-xl); align-items:center; font-family: var(--font-caption-font-family); font-size: var(--font-caption-font-size); color: var(--color-on-canvas-subtle);">
        <span></span>
        <span>large</span><span>large · disabled</span><span>small</span><span>small · disabled</span>
        @for (v of variants; track v) {
          <span>{{ v }}</span>
          @for (s of sizes; track s) {
            <span><button kdsButton type="button" [variant]="v" [size]="s">Label</button></span>
            <span><button kdsButton type="button" [variant]="v" [size]="s" disabled>Label</button></span>
          }
        }
      </div>`})},f={args:{label:`Confirmar y pagar con Apple Pay`}},p=[`Playground`,`Primary`,`Secondary`,`Ghost`,`Destructive`,`AllVariants`,`LongLabel`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Confirmar pedido'
  }
}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    label: 'Añadir nota'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    label: 'Ahora no'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    label: 'Cancelar reserva'
  }
}`,...u.parameters?.docs?.source}}},d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    props: {
      variants: ['primary', 'secondary', 'ghost', 'destructive'],
      sizes: ['large', 'small']
    },
    template: \`
      <div style="display:grid; grid-template-columns: max-content repeat(4, max-content); gap: var(--space-md) var(--space-xl); align-items:center; font-family: var(--font-caption-font-family); font-size: var(--font-caption-font-size); color: var(--color-on-canvas-subtle);">
        <span></span>
        <span>large</span><span>large · disabled</span><span>small</span><span>small · disabled</span>
        @for (v of variants; track v) {
          <span>{{ v }}</span>
          @for (s of sizes; track s) {
            <span><button kdsButton type="button" [variant]="v" [size]="s">Label</button></span>
            <span><button kdsButton type="button" [variant]="v" [size]="s" disabled>Label</button></span>
          }
        }
      </div>\`
  })
}`,...d.parameters?.docs?.source},description:{story:`Every Figma variant × size, in the default and disabled states. Hover and pressed are interactive (pointer).`,...d.parameters?.docs?.description}}},f.parameters={...f.parameters,docs:{...f.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Confirmar y pagar con Apple Pay'
  }
}`,...f.parameters?.docs?.source},description:{story:`Longer (translated) labels grow the button horizontally instead of clipping.`,...f.parameters?.docs?.description}}}})))()}init_button_stories();export{d as AllVariants,u as Destructive,l as Ghost,f as LongLabel,o as Playground,s as Primary,c as Secondary,p as __namedExportsOrder,a as default};