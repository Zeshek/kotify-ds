import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{r as t,t as n}from"./dist-BbAR0bsP.js";import{n as r,t as i}from"./badge-BOtXIRQz.js";var a,o,s,c;function init_badge_stories(){return(init_badge_stories=e((()=>{n(),r(),a={title:`Components/Badge`,tags:[`autodocs`],decorators:[t({imports:[i]})],parameters:{docs:{description:{component:["Compact status or category label. Mirrors the Figma `badge`: **variant** (primary, positive, negative, warning) and **subtle** (no, yes).",``,`- Not interactive. The text carries the meaning; never rely on colour alone.`,`- Do not use it instead of explanatory text when the meaning is not obvious.`].join(`
`)}}},argTypes:{variant:{control:`inline-radio`,options:[`primary`,`positive`,`negative`,`warning`]},subtle:{control:`boolean`}},args:{text:`Disponible`,variant:`positive`,subtle:!0},render:e=>({props:e,template:`<kds-badge [variant]="variant" [subtle]="subtle">{{ text }}</kds-badge>`})},o={},s={parameters:{controls:{disable:!0}},render:()=>({props:{variants:[`primary`,`positive`,`negative`,`warning`],text:{primary:`Nuevo`,positive:`Disponible`,negative:`Completo`,warning:`Esperando confirmación`}},template:`
      <div style="display:grid; grid-template-columns: max-content max-content max-content; gap: var(--space-md) var(--space-xl); align-items:center; font: var(--font-caption-font-size)/1.4 var(--font-caption-font-family); color: var(--color-on-canvas-subtle)">
        <span></span><span>default</span><span>subtle</span>
        @for (v of variants; track v) {
          <span>{{ v }}</span>
          <span><kds-badge [variant]="v">{{ text[v] }}</kds-badge></span>
          <span><kds-badge [variant]="v" subtle>{{ text[v] }}</kds-badge></span>
        }
      </div>`})},c=[`Playground`,`AllVariants`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  parameters: {
    controls: {
      disable: true
    }
  },
  render: () => ({
    props: {
      variants: ['primary', 'positive', 'negative', 'warning'],
      text: {
        primary: 'Nuevo',
        positive: 'Disponible',
        negative: 'Completo',
        warning: 'Esperando confirmación'
      }
    },
    template: \`
      <div style="display:grid; grid-template-columns: max-content max-content max-content; gap: var(--space-md) var(--space-xl); align-items:center; font: var(--font-caption-font-size)/1.4 var(--font-caption-font-family); color: var(--color-on-canvas-subtle)">
        <span></span><span>default</span><span>subtle</span>
        @for (v of variants; track v) {
          <span>{{ v }}</span>
          <span><kds-badge [variant]="v">{{ text[v] }}</kds-badge></span>
          <span><kds-badge [variant]="v" subtle>{{ text[v] }}</kds-badge></span>
        }
      </div>\`
  })
}`,...s.parameters?.docs?.source}}}})))()}init_badge_stories();export{s as AllVariants,o as Playground,c as __namedExportsOrder,a as default};