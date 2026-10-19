import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{A as t,H as n,I as r,M as i,T as a,_ as o,it as s,rt as c,v as l,w as u,y as d}from"./angular-platform-Bup4TBJQ.js";import{r as f,t as p}from"./dist-Db0PSVxJ.js";import{n as m,t as h}from"./forms-B8lo1Twa.js";var g;function init_checkbox(){return(init_checkbox=e((()=>{g=`.kds-checkbox-host{display:block}.kds-checkbox{--_bg:var(--checkbox-background);--_border:var(--checkbox-border-color);align-items:center;gap:var(--checkbox-gap);box-sizing:border-box;width:100%;padding:var(--checkbox-p);border:var(--checkbox-border-width) solid var(--_border);border-radius:var(--checkbox-radius);background-color:var(--_bg);cursor:pointer;-webkit-tap-highlight-color:transparent;display:flex;position:relative}.kds-checkbox>input{clip:rect(0 0 0 0);white-space:nowrap;border:0;width:1px;height:1px;margin:-1px;padding:0;position:absolute;overflow:hidden}.kds-checkbox:has(>input:focus-visible){outline:var(--focus-ring-width) solid var(--color-focus-ring);outline-offset:var(--focus-ring-offset)}.kds-checkbox__box{width:20px;height:20px;color:var(--checkbox-box-border-color);flex:none;display:block}.kds-checkbox__box>svg{fill:currentColor;width:100%;height:100%;display:block}.kds-checkbox--selected .kds-checkbox__box{color:var(--checkbox-selected)}.kds-checkbox .kds-choice__text,.kds-checkbox-group .kds-choice__text{gap:var(--space-2xs);flex-direction:column;flex:1;min-width:0;display:flex}.kds-checkbox .kds-choice__label,.kds-checkbox-group .kds-choice__label{color:var(--checkbox-foreground);font-family:var(--checkbox-font-family), system-ui, sans-serif;font-size:var(--checkbox-font-size);font-weight:var(--checkbox-font-weight);line-height:var(--checkbox-line-height)}.kds-checkbox .kds-choice__details,.kds-checkbox-group .kds-choice__details{color:var(--checkbox-foreground-subtle);font-family:var(--checkbox-details-font-family), system-ui, sans-serif;font-size:var(--checkbox-details-font-size);font-weight:var(--checkbox-details-font-weight);line-height:var(--checkbox-details-line-height)}.kds-checkbox-group{border:0;flex-direction:column;min-width:0;margin:0;padding:0;display:flex}.kds-checkbox-group>legend{margin-bottom:var(--checkbox-module-margin);color:var(--checkbox-module-title-foreground);font-family:var(--checkbox-module-title-font-family), system-ui, sans-serif;font-size:var(--checkbox-module-title-font-size);font-weight:var(--checkbox-module-title-font-weight);line-height:var(--checkbox-module-title-line-height);letter-spacing:var(--checkbox-module-title-letter-spacing);text-transform:uppercase;padding:0}.kds-checkbox-group>.kds-choice-group__options{gap:var(--checkbox-module-gap);flex-direction:column;display:flex}`})))()}var _,v,y;function init_checkbox$1(){return(init_checkbox$1=e((()=>{s(),init_checkbox(),o(),m(),_=0,v=class KdsCheckbox{label=l.required();details=l();name=l();checked=d(!1);id=`kds-checkbox-${_++}`;onChange=()=>{};onTouched=()=>{};toggle(e){let t=e.target.checked;this.checked.set(t),this.onChange(t)}writeValue(e){this.checked.set(!!e)}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}static propDecorators={label:[{type:t,args:[{isSignal:!0,alias:`label`,required:!0,transform:void 0}]}],details:[{type:t,args:[{isSignal:!0,alias:`details`,required:!1,transform:void 0}]}],name:[{type:t,args:[{isSignal:!0,alias:`name`,required:!1,transform:void 0}]}],checked:[{type:t,args:[{isSignal:!0,alias:`checked`,required:!1}]},{type:i,args:[`checkedChange`]}]}},v=c([a({selector:`kds-checkbox`,standalone:!0,encapsulation:r.None,changeDetection:u.OnPush,providers:[{provide:h,useExisting:n(()=>v),multi:!0}],host:{class:`kds-checkbox-host`},template:`
    <label class="kds-checkbox" [class.kds-checkbox--selected]="checked()">
      <input type="checkbox" [id]="id" [name]="name() ?? null" [checked]="checked()" (change)="toggle($event)" (blur)="onTouched()" />
      <span class="kds-checkbox__box" aria-hidden="true">
        <!-- Exact Figma vectors: ring (default) and filled box with knocked-out tick (selected). -->
        @if (checked()) {
          <svg viewBox="0 0 20 20" focusable="false"><path d="M16 0C18.2091 0 20 1.79086 20 4V16C20 18.2091 18.2091 20 16 20H4C1.79086 20 0 18.2091 0 16V4C0 1.79086 1.79086 0 4 0H16ZM15.1562 5.69043C14.6571 5.26476 13.9012 5.34505 13.5039 5.86621L8.95508 11.8379C8.8453 11.9816 8.6332 11.9958 8.50488 11.8682L6.25195 9.62598C5.83838 9.21462 5.16825 9.21535 4.75488 9.62695C4.34139 10.0387 4.34137 10.7064 4.75488 11.1182L7.79688 14.1465C8.43366 14.7805 9.4842 14.7156 10.0371 14.0078L15.3154 7.25195C15.6896 6.77278 15.6192 6.08535 15.1562 5.69043Z" /></svg>
        } @else {
          <svg viewBox="0 0 20 20" focusable="false"><path d="M16 18V20H4V18H16ZM18 16V4C18 2.89543 17.1046 2 16 2H4C2.89543 2 2 2.89543 2 4V16C2 17.1046 2.89543 18 4 18V20L3.79395 19.9951C1.7488 19.8913 0.108652 18.2512 0.00488281 16.2061L0 16V4C0 1.79086 1.79086 0 4 0H16C18.2091 0 20 1.79086 20 4V16C20 18.14 18.3194 19.8879 16.2061 19.9951L16 20V18C17.1046 18 18 17.1046 18 16Z" /></svg>
        }
      </span>
      <span class="kds-choice__text">
        <span class="kds-choice__label">{{ label() }}</span>
        @if (details()) {
          <span class="kds-choice__details">{{ details() }}</span>
        }
      </span>
    </label>
  `,styles:[g]})],v),y=class KdsCheckboxGroup{title=l();static propDecorators={title:[{type:t,args:[{isSignal:!0,alias:`title`,required:!1,transform:void 0}]}]}},y=c([a({selector:`kds-checkbox-group`,standalone:!0,encapsulation:r.None,changeDetection:u.OnPush,template:`
    <fieldset class="kds-checkbox-group">
      @if (title()) {
        <legend>{{ title() }}</legend>
      }
      <div class="kds-choice-group__options"><ng-content /></div>
    </fieldset>
  `,styles:[g]})],y)})))()}var b,x,S,C,w;function init_checkbox_stories(){return(init_checkbox_stories=e((()=>{p(),init_checkbox$1(),b={title:`Components/Checkbox`,tags:[`autodocs`],decorators:[f({imports:[v,y]}),e=>{let t=e();return{...t,template:`<div style="max-width: 344px">${t.template}</div>`}}],parameters:{docs:{description:{component:["Independent or multiple selection, shown as a card. Mirrors the Figma `checkbox` (status default | selected, optional details) and `checkbox module` (optional title).",``,"- Native checkbox inside a `<label>`: the whole card toggles it and Space works. Works with `[(checked)]`, `ngModel` and reactive forms.","- The group is a `<fieldset>` with a `<legend>`.",`- Use Radio Button for mutually exclusive options.`,`- Figma defines no disabled or hover state, so none is exposed.`].join(`
`)}}}},x={render:()=>({props:{checked:!0},template:`<kds-checkbox label="Confirmación por SMS" details="Te avisamos también cuando el restaurante confirme tu reserva." [(checked)]="checked" />`})},S={render:()=>({template:`<kds-checkbox label="Acepto las condiciones de cancelación" />`})},C={render:()=>({template:`
      <kds-checkbox-group title="Avisos">
        <kds-checkbox label="Confirmación por SMS" details="Te avisamos cuando el restaurante confirme tu reserva." [checked]="true" />
        <kds-checkbox label="Recordatorio 15 minutos antes" />
      </kds-checkbox-group>`})},w=[`Single`,`WithoutDetails`,`Module`],x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => ({
    props: {
      checked: true
    },
    template: \`<kds-checkbox label="Confirmación por SMS" details="Te avisamos también cuando el restaurante confirme tu reserva." [(checked)]="checked" />\`
  })
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<kds-checkbox label="Acepto las condiciones de cancelación" />\`
  })
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <kds-checkbox-group title="Avisos">
        <kds-checkbox label="Confirmación por SMS" details="Te avisamos cuando el restaurante confirme tu reserva." [checked]="true" />
        <kds-checkbox label="Recordatorio 15 minutos antes" />
      </kds-checkbox-group>\`
  })
}`,...C.parameters?.docs?.source}}}})))()}init_checkbox_stories();export{C as Module,x as Single,S as WithoutDetails,w as __namedExportsOrder,b as default};