import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{r as t,t as n}from"./dist-Db0PSVxJ.js";import{n as r,t as i}from"./icon-button-BeGyJd2L.js";var a,button,o,s,c,l,u,d;function init_icon_button_stories(){return(init_icon_button_stories=e((()=>{n(),r(),a={more:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18Z" fill="currentColor"/></svg>`,less:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H18Z" fill="currentColor"/></svg>`,arrow:`<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M11.2498 5.31059C11.6639 4.89644 12.3361 4.89651 12.7503 5.31059C13.1645 5.72478 13.1645 6.39693 12.7503 6.81111L8.62217 10.9392H17.9392C18.5249 10.9392 18.9999 11.4143 19 12C19 12.5857 18.525 13.0607 17.9392 13.0607H8.62217L12.7503 17.1899C13.1642 17.6041 13.1643 18.2752 12.7503 18.6894C12.3361 19.1035 11.664 19.1035 11.2498 18.6894L5.31059 12.7502C4.89651 12.336 4.89643 11.6639 5.31059 11.2497L11.2498 5.31059Z" fill="currentColor"/></svg>`},button=(e,t)=>`<button kdsIconButton type="button" ${e}>${a[t]}</button>`,o={title:`Components/IconButton`,tags:[`autodocs`],decorators:[t({imports:[i]})],parameters:{docs:{description:{component:["Action represented by an icon. Mirrors the Figma `IconButton` component set: **variant** (default, navigation),",`**size** (large 56 px, medium 36 px, small 28 px) and **states** (default, hover, pressed, disabled).`,``,"- `label` is **required**: it becomes the accessible name (`aria-label`). Add a visible label or tooltip when the action is not obvious.",'- The icon is projected content: an inline SVG with `fill="currentColor"`, sized by the `iconbutton/size/*/icon-size` tokens. Kotify icons live in `src/icons/`.',"- **Navigation** keeps `surface/base` on hover and pressed by design and carries a subtle shadow, as in Figma.","- **Motion:** like Button, it lifts 2 px on hover and scales to 0.98 when pressed (off with `prefers-reduced-motion`; disabled does not move).","- Keyboard focus uses `:focus-visible` with the semantic focus tokens."].join(`
`)}}},argTypes:{variant:{control:`inline-radio`,options:[`default`,`navigation`]},size:{control:`inline-radio`,options:[`large`,`medium`,`small`]},icon:{control:`inline-radio`,options:Object.keys(a)},disabled:{control:`boolean`},label:{control:`text`}},args:{label:`Añadir`,variant:`default`,size:`large`,disabled:!1,icon:`more`},render:e=>({props:e,template:button(`[label]="label" [variant]="variant" [size]="size" [disabled]="disabled"`,e.icon)})},s={},c={args:{variant:`default`,icon:`more`,label:`Añadir plato`}},l={args:{variant:`navigation`,icon:`arrow`,label:`Volver`}},u={parameters:{controls:{disable:!0}},render:()=>({template:`
      <div style="display:grid; grid-template-columns: max-content repeat(6, max-content); gap: var(--space-md) var(--space-xl); align-items:center; font-family: var(--font-caption-font-family); font-size: var(--font-caption-font-size); color: var(--color-on-canvas-subtle);">
        <span></span>
        <span>large</span><span>large · disabled</span><span>medium</span><span>medium · disabled</span><span>small</span><span>small · disabled</span>
        <span>default</span>
        ${[`large`,`medium`,`small`].map(e=>`<span>${button(`label="Añadir" variant="default" size="${e}"`,`more`)}</span><span>${button(`label="Añadir" variant="default" size="${e}" disabled`,`more`)}</span>`).join(``)}
        <span>navigation</span>
        ${[`large`,`medium`,`small`].map(e=>`<span>${button(`label="Volver" variant="navigation" size="${e}"`,`arrow`)}</span><span>${button(`label="Volver" variant="navigation" size="${e}" disabled`,`arrow`)}</span>`).join(``)}
      </div>`})},d=[`Playground`,`Default`,`Navigation`,`AllVariants`],s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{}`,...s.parameters?.docs?.source}}},c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'default',
    icon: 'more',
    label: 'Añadir plato'
  }
}`,...c.parameters?.docs?.source}}},l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    variant: 'navigation',
    icon: 'arrow',
    label: 'Volver'
  }
}`,...l.parameters?.docs?.source}}},u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    template: \`
      <div style="display:grid; grid-template-columns: max-content repeat(6, max-content); gap: var(--space-md) var(--space-xl); align-items:center; font-family: var(--font-caption-font-family); font-size: var(--font-caption-font-size); color: var(--color-on-canvas-subtle);">
        <span></span>
        <span>large</span><span>large · disabled</span><span>medium</span><span>medium · disabled</span><span>small</span><span>small · disabled</span>
        <span>default</span>
        \${['large', 'medium', 'small'].map(s => \`<span>\${button(\`label="Añadir" variant="default" size="\${s}"\`, 'more')}</span><span>\${button(\`label="Añadir" variant="default" size="\${s}" disabled\`, 'more')}</span>\`).join('')}
        <span>navigation</span>
        \${['large', 'medium', 'small'].map(s => \`<span>\${button(\`label="Volver" variant="navigation" size="\${s}"\`, 'arrow')}</span><span>\${button(\`label="Volver" variant="navigation" size="\${s}" disabled\`, 'arrow')}</span>\`).join('')}
      </div>\`
  })
}`,...u.parameters?.docs?.source},description:{story:`Every Figma variant × size, in the default and disabled states. Hover and pressed are interactive.`,...u.parameters?.docs?.description}}}})))()}init_icon_button_stories();export{u as AllVariants,c as Default,l as Navigation,s as Playground,d as __namedExportsOrder,o as default};