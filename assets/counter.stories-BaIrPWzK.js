import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{r as t,t as n}from"./dist-Db0PSVxJ.js";import{n as r,t as i}from"./counter-CxNGSf2H.js";var a,o,s,c;function init_counter_stories(){return(init_counter_stories=e((()=>{n(),r(),a={title:`Components/Counter`,tags:[`autodocs`],decorators:[t({imports:[i]})],parameters:{docs:{description:{component:["Adjusts a quantity with less and more buttons. Mirrors the Figma `counter`: variant on card (small IconButtons) | on canvas (large IconButtons, display number and caption).",``,"- Limits come from the product (`min`, `max`). The only built-in rule is that a quantity is never negative (`min` defaults to 0).","- The buttons are disabled at the limits; the number is announced politely. `label` names the group and both buttons."].join(`
`)}}}},o={render:()=>({props:{qty:1},template:`<kds-counter label="Entrecot de ternera" [(value)]="qty" [max]="9" />`})},s={render:()=>({props:{people:2},template:`<kds-counter variant="on canvas" label="Personas" description="Personas" [min]="1" [max]="8" [(value)]="people" />`})},c=[`OnCard`,`OnCanvas`],o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => ({
    props: {
      qty: 1
    },
    template: \`<kds-counter label="Entrecot de ternera" [(value)]="qty" [max]="9" />\`
  })
}`,...o.parameters?.docs?.source}}},s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: () => ({
    props: {
      people: 2
    },
    template: \`<kds-counter variant="on canvas" label="Personas" description="Personas" [min]="1" [max]="8" [(value)]="people" />\`
  })
}`,...s.parameters?.docs?.source}}}})))()}init_counter_stories();export{s as OnCanvas,o as OnCard,c as __namedExportsOrder,a as default};