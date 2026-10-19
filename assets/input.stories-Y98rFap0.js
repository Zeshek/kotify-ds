import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{A as t,H as n,I as r,M as i,T as a,_ as o,it as s,m as c,rt as l,v as u,w as d,y as f}from"./angular-platform-Bup4TBJQ.js";import{r as p,t as m}from"./dist-Db0PSVxJ.js";import{n as h,t as g}from"./forms-B8lo1Twa.js";var _;function init_input(){return(init_input=e((()=>{_=`.kds-input{gap:var(--input-title-gap);flex-direction:column;min-width:0;display:flex}.kds-input .kds-field__title{color:var(--input-title-foreground);font-family:var(--input-title-font-family), system-ui, sans-serif;font-size:var(--input-title-font-size);font-weight:var(--input-title-font-weight);line-height:var(--input-title-line-height);letter-spacing:var(--input-title-letter-spacing);text-transform:uppercase}.kds-input .kds-field__title--hidden{clip:rect(0 0 0 0);white-space:nowrap;width:1px;height:1px;margin:-1px;position:absolute;overflow:hidden}.kds-input .kds-field__control{box-sizing:border-box;width:100%;padding:var(--input-p);border:var(--input-border-width) solid var(--input-default-border-color);border-radius:var(--input-radius);background-color:var(--input-background);color:var(--input-filled-foreground);font-family:var(--input-font-family), system-ui, sans-serif;font-size:var(--input-font-size);font-weight:var(--input-font-weight);line-height:var(--input-line-height);caret-color:var(--input-focus-border-color);outline:none;margin:0}.kds-input .kds-field__control::placeholder{color:var(--input-default-foreground);opacity:1}.kds-input .kds-field__control:not(:placeholder-shown){border-color:var(--input-filled-border-color)}.kds-input .kds-field__control:focus{border-color:var(--input-focus-border-color);color:var(--input-focus-foreground)}`})))()}var v,y;function init_input$1(){return(init_input$1=e((()=>{s(),init_input(),o(),h(),v=0,y=class KdsInput{label=u.required();hideLabel=u(!1,{transform:c});placeholder=u();type=u(`text`);name=u();autocomplete=u();inputmode=u();describedBy=u();value=f(``);id=`kds-input-${v++}`;onChange=()=>{};onTouched=()=>{};update(e){let t=e.target.value;this.value.set(t),this.onChange(t)}writeValue(e){this.value.set(e??``)}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}static propDecorators={label:[{type:t,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],hideLabel:[{type:t,args:[{isSignal:!0,alias:`hideLabel`,required:!1,transform:void 0}]}],placeholder:[{type:t,args:[{isSignal:!0,alias:`placeholder`,required:!1,transform:void 0}]}],type:[{type:t,args:[{isSignal:!0,alias:`type`,required:!1,transform:void 0}]}],name:[{type:t,args:[{isSignal:!0,alias:`name`,required:!1,transform:void 0}]}],autocomplete:[{type:t,args:[{isSignal:!0,alias:`autocomplete`,required:!1,transform:void 0}]}],inputmode:[{type:t,args:[{isSignal:!0,alias:`inputmode`,required:!1,transform:void 0}]}],describedBy:[{type:t,args:[{isSignal:!0,alias:`describedBy`,required:!1,transform:void 0}]}],value:[{type:t,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:i,args:[`valueChange`]}]}},y=l([a({selector:`kds-input`,standalone:!0,encapsulation:r.None,changeDetection:d.OnPush,providers:[{provide:g,useExisting:n(()=>y),multi:!0}],host:{class:`kds-input`},template:`
    <label class="kds-field__title" [class.kds-field__title--hidden]="hideLabel()" [for]="id">{{ label() }}</label>
    <input
      class="kds-field__control"
      [id]="id"
      [type]="type()"
      [name]="name() ?? null"
      [placeholder]="placeholder() ?? ''"
      [attr.autocomplete]="autocomplete() ?? null"
      [attr.inputmode]="inputmode() ?? null"
      [attr.aria-describedby]="describedBy() ?? null"
      [value]="value()"
      (input)="update($event)"
      (blur)="onTouched()"
    />
  `,styles:[_]})],y)})))()}var b,x,S,C,w,T;function init_input_stories(){return(init_input_stories=e((()=>{m(),init_input$1(),b={title:`Components/Input`,tags:[`autodocs`],decorators:[p({imports:[y]}),e=>{let t=e();return{...t,template:`<div style="max-width: 342px">${t.template}</div>`}}],parameters:{docs:{description:{component:["Single-line text entry with a persistent title. Mirrors the Figma `input`: status default | filled | focus; title optional.",``,`- The states map to the native field: empty (placeholder), with a value, and focused (primary border, the Figma focus variant).`,"- `label` is always required. `hideLabel` hides it visually (Figma title?=false) but keeps it for assistive technology.","- Associate helper or validation text with `describedBy`."].join(`
`)}}}},x={render:()=>({template:`<kds-input label="Nombre y apellidos" placeholder="Víctor F. González" autocomplete="name" />`})},S={render:()=>({props:{v:`Víctor F. González`},template:`<kds-input label="Nombre y apellidos" [(value)]="v" autocomplete="name" />`})},C={render:()=>({template:`<kds-input label="Email" type="email" placeholder="nombre@correo.com" autocomplete="email" />`})},w={render:()=>({template:`<kds-input label="Buscar en la carta" hideLabel type="search" placeholder="Buscar plato" />`})},T=[`Default`,`Filled`,`Email`,`HiddenTitle`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<kds-input label="Nombre y apellidos" placeholder="Víctor F. González" autocomplete="name" />\`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => ({
    props: {
      v: 'Víctor F. González'
    },
    template: \`<kds-input label="Nombre y apellidos" [(value)]="v" autocomplete="name" />\`
  })
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<kds-input label="Email" type="email" placeholder="nombre@correo.com" autocomplete="email" />\`
  })
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<kds-input label="Buscar en la carta" hideLabel type="search" placeholder="Buscar plato" />\`
  })
}`,...w.parameters?.docs?.source}}}})))()}init_input_stories();export{x as Default,C as Email,S as Filled,w as HiddenTitle,T as __namedExportsOrder,b as default};