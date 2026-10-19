import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{J as t,T as n,Y as r,_ as i,b as a,g as o,j as s,x as c}from"./angular-platform-Cdxq2SJf.js";import{r as l,t as u}from"./dist-BD0OEHKK.js";var d;function init_button(){return(init_button=e((()=>{d=`.kds-button{--_bg:var(--button-variant-primary-default-background);--_bg-hover:var(--button-variant-primary-hover-background);--_bg-pressed:var(--button-variant-primary-pressed-background);--_bg-disabled:var(--button-variant-primary-disabled-background);--_fg:var(--button-variant-primary-foreground);--_fg-disabled:var(--button-variant-primary-disabled-foreground);box-sizing:border-box;cursor:pointer;text-align:center;-webkit-tap-highlight-color:transparent;background-color:var(--_bg);color:var(--_fg);padding:var(--button-size-large-py) var(--button-size-large-px);border-radius:var(--button-size-large-radius);font-family:var(--button-size-large-font-family), system-ui, sans-serif;font-size:var(--button-size-large-font-size);font-weight:var(--button-size-large-font-weight);line-height:var(--button-size-large-line-height);border:0;justify-content:center;align-items:center;margin:0;text-decoration:none;transition:transform .12s ease-out;display:inline-flex}.kds-button:hover:not(:disabled){transform:translateY(-2px)}.kds-button:active:not(:disabled){transform:scale(.98)}@media (prefers-reduced-motion:reduce){.kds-button{transition:none}.kds-button:hover:not(:disabled),.kds-button:active:not(:disabled){transform:none}}.kds-button:focus-visible{outline:var(--focus-ring-width) solid var(--color-focus-ring);outline-offset:var(--focus-ring-offset)}.kds-button:hover:not(:disabled){background-color:var(--_bg-hover)}.kds-button:active:not(:disabled){background-color:var(--_bg-pressed)}.kds-button:disabled{cursor:not-allowed;background-color:var(--_bg-disabled);color:var(--_fg-disabled)}.kds-button.kds-button--small{padding:var(--button-size-small-py) var(--button-size-small-px);border-radius:var(--button-size-small-radius);font-family:var(--button-size-small-font-family), system-ui, sans-serif;font-size:var(--button-size-small-font-size);font-weight:var(--button-size-small-font-weight);line-height:var(--button-size-small-line-height)}.kds-button.kds-button--secondary{--_bg:var(--button-variant-secondary-default-background);--_bg-hover:var(--button-variant-secondary-hover-background);--_bg-pressed:var(--button-variant-secondary-pressed-background);--_bg-disabled:var(--button-variant-secondary-disabled-background);--_fg:var(--button-variant-secondary-foreground);--_fg-disabled:var(--button-variant-secondary-disabled-foreground)}.kds-button.kds-button--ghost{--_bg:var(--button-variant-ghost-default-background);--_bg-hover:var(--button-variant-ghost-hover-background);--_bg-pressed:var(--button-variant-ghost-pressed-background);--_bg-disabled:var(--button-variant-ghost-disabled-background);--_fg:var(--button-variant-ghost-foreground);--_fg-disabled:var(--button-variant-ghost-disabled-foreground)}.kds-button.kds-button--destructive{--_bg:var(--button-variant-destructive-default-background);--_bg-hover:var(--button-variant-destructive-hover-background);--_bg-pressed:var(--button-variant-destructive-pressed-background);--_bg-disabled:var(--button-variant-destructive-disabled-background);--_fg:var(--button-variant-destructive-foreground);--_fg-disabled:var(--button-variant-destructive-disabled-foreground)}`})))()}var f;function init_button$1(){return(init_button$1=e((()=>{r(),init_button(),o(),f=class KdsButton{variant=i(`primary`);size=i(`large`);static propDecorators={variant:[{type:n,args:[{isSignal:!0,alias:`variant`,required:!1,transform:void 0}]}],size:[{type:n,args:[{isSignal:!0,alias:`size`,required:!1,transform:void 0}]}]}},f=t([c({selector:`button[kdsButton]`,standalone:!0,template:`<ng-content />`,encapsulation:s.None,changeDetection:a.OnPush,host:{class:`kds-button`,"[class.kds-button--primary]":`variant() === 'primary'`,"[class.kds-button--secondary]":`variant() === 'secondary'`,"[class.kds-button--ghost]":`variant() === 'ghost'`,"[class.kds-button--destructive]":`variant() === 'destructive'`,"[class.kds-button--large]":`size() === 'large'`,"[class.kds-button--small]":`size() === 'small'`},styles:[d]})],f)})))()}var p,m,h,g,_,v,y,b,x;function init_button_stories(){return(init_button_stories=e((()=>{u(),init_button$1(),p={title:`Components/Button`,tags:[`autodocs`],decorators:[l({imports:[f]})],parameters:{docs:{description:{component:["Action button. Mirrors the Figma `Button` component set: **variant** (primary, secondary, ghost, destructive),",`**size** (large, small) and **states** (default, hover, pressed, disabled).`,``,`- Use **primary** for the dominant action of a context, **secondary** for important alternatives,`,`  **ghost** for lower-emphasis actions and **destructive** for actions with negative consequences.`,"- Apply it to a native `<button>` (`<button kdsButton>`) to keep keyboard and disabled semantics.",`- Labels are concise and action-oriented. Width follows the content; sizing comes from padding, not a fixed height.`,"- **Motion (all variants):** hover lifts the button 2 px and pressed scales it to 0.98 (120 ms ease-out, off with `prefers-reduced-motion`). Secondary and destructive keep their background on hover and pressed by design, so motion is their state feedback.",`- **Primary disabled** keeps its label at 90 % opacity (other variants use 50 %) for legibility.`,"- Keyboard focus uses `:focus-visible` with the semantic focus tokens (`color/focus/ring`, `focus/ring-width`, `focus/ring-offset`). Tab to a button to see it."].join(`
`)}}},argTypes:{variant:{control:`inline-radio`,options:[`primary`,`secondary`,`ghost`,`destructive`]},size:{control:`inline-radio`,options:[`large`,`small`]},disabled:{control:`boolean`},label:{control:`text`}},args:{label:`Label`,variant:`primary`,size:`large`,disabled:!1},render:e=>({props:e,template:`<button kdsButton type="button" [variant]="variant" [size]="size" [disabled]="disabled">{{ label }}</button>`})},m={},h={args:{variant:`primary`,label:`Confirmar pedido`}},g={args:{variant:`secondary`,label:`Añadir nota`}},_={args:{variant:`ghost`,label:`Ahora no`}},v={args:{variant:`destructive`,label:`Cancelar reserva`}},y={parameters:{controls:{disable:!0}},render:()=>({props:{variants:[`primary`,`secondary`,`ghost`,`destructive`],sizes:[`large`,`small`]},template:`
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
      </div>`})},b={args:{label:`Confirmar y pagar con Apple Pay`}},x=[`Playground`,`Primary`,`Secondary`,`Ghost`,`Destructive`,`AllVariants`,`LongLabel`],m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    label: 'Confirmar pedido'
  }
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'secondary',
    label: 'Añadir nota'
  }
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'ghost',
    label: 'Ahora no'
  }
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'destructive',
    label: 'Cancelar reserva'
  }
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source},description:{story:`Every Figma variant × size, in the default and disabled states. Hover and pressed are interactive (pointer).`,...y.parameters?.docs?.description}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Confirmar y pagar con Apple Pay'
  }
}`,...b.parameters?.docs?.source},description:{story:`Longer (translated) labels grow the button horizontally instead of clipping.`,...b.parameters?.docs?.description}}}})))()}init_button_stories();export{y as AllVariants,v as Destructive,_ as Ghost,b as LongLabel,m as Playground,h as Primary,g as Secondary,x as __namedExportsOrder,p as default};