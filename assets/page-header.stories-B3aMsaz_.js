import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{A as t,I as n,M as r,T as i,_ as a,b as o,nt as s,rt as c,v as l,w as u}from"./angular-platform-B5gdVsrC.js";import{r as d,t as f}from"./dist-BbAR0bsP.js";import{n as p,t as m}from"./icon-button-BaeKCpor.js";import{n as h,t as g}from"./icons-B0unzzHP.js";var _;function init_page_header(){return(init_page_header=e((()=>{_=`.kds-page-header{align-items:center;gap:var(--space-sm);padding:var(--page-header-py) var(--page-header-px);background-color:var(--page-header-background);color:var(--page-header-foreground);grid-template-columns:1fr auto 1fr;display:grid}.kds-page-header>.kds-icon-button{justify-self:start}.kds-page-header__title{font-family:var(--page-header-title-font-family), system-ui, sans-serif;font-size:var(--page-header-title-font-size);font-weight:var(--page-header-title-font-weight);line-height:var(--page-header-title-line-height);letter-spacing:var(--page-header-title-letter-spacing);text-transform:uppercase;text-align:center}.kds-page-header__metadata{font-family:var(--page-header-metadata-font-family), system-ui, sans-serif;font-size:var(--page-header-metadata-font-size);font-weight:var(--page-header-metadata-font-weight);line-height:var(--page-header-metadata-line-height);text-align:right;justify-self:end}`})))()}var v;function init_page_header$1(){return(init_page_header$1=e((()=>{c(),init_page_header(),a(),p(),h(),v=class KdsPageHeader{title=l();metadata=l();backLabel=l(`Volver`);headingLevel=l(1);back=o();static propDecorators={title:[{type:t,args:[{isSignal:!0,alias:`title`,required:!1,transform:void 0}]}],metadata:[{type:t,args:[{isSignal:!0,alias:`metadata`,required:!1,transform:void 0}]}],backLabel:[{type:t,args:[{isSignal:!0,alias:`backLabel`,required:!1,transform:void 0}]}],headingLevel:[{type:t,args:[{isSignal:!0,alias:`headingLevel`,required:!1,transform:void 0}]}],back:[{type:r,args:[`back`]}]}},v=s([i({selector:`kds-page-header`,standalone:!0,imports:[m,g],encapsulation:n.None,changeDetection:u.OnPush,host:{class:`kds-page-header`},template:`
    <button kdsIconButton type="button" variant="navigation" size="medium" [label]="backLabel()" (click)="back.emit()">
      <svg kdsIcon="arrow"></svg>
    </button>
    @if (title()) {
      <span class="kds-page-header__title" role="heading" [attr.aria-level]="headingLevel()">{{ title() }}</span>
    } @else {
      <span></span>
    }
    @if (metadata()) {
      <span class="kds-page-header__metadata">{{ metadata() }}</span>
    } @else {
      <span class="kds-page-header__spacer" aria-hidden="true"></span>
    }
  `,styles:[_]})],v)})))()}var y,b,x,S;function init_page_header_stories(){return(init_page_header_stories=e((()=>{f(),init_page_header$1(),y={title:`Components/Page Header`,tags:[`autodocs`],decorators:[d({imports:[v]}),e=>{let t=e();return{...t,template:`<div style="max-width: 384px">${t.template}</div>`}}],parameters:{layout:`fullscreen`,docs:{description:{component:["Top of a screen: back navigation (navigation IconButton, medium), title and metadata. Mirrors the Figma `page header` (title?, metadata?).",``,"- The title is a heading (level 1 by default; set `headingLevel` if the screen has its own h1).","- The back button only emits `back`; the product decides where it goes."].join(`
`)}}}},b={render:()=>({template:`<kds-page-header title="Carta" metadata="2 pers." />`})},x={render:()=>({template:`<kds-page-header title="Tu pedido" />`})},S=[`Default`,`TitleOnly`],b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<kds-page-header title="Carta" metadata="2 pers." />\`
  })
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  render: () => ({
    template: \`<kds-page-header title="Tu pedido" />\`
  })
}`,...x.parameters?.docs?.source}}}})))()}init_page_header_stories();export{b as Default,x as TitleOnly,S as __namedExportsOrder,y as default};