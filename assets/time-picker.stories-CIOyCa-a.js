import{n as e}from"./rolldown-runtime-vtgMY1y5.js";import{A as t,H as n,I as r,M as i,S as a,T as o,V as s,_ as c,nt as l,p as u,rt as d,v as f,w as p,x as m,y as h}from"./angular-platform-B5gdVsrC.js";import{r as g,t as _}from"./dist-BbAR0bsP.js";import{n as v,t as y}from"./forms-B0qry6Ve.js";var b;function init_time_picker(){return(init_time_picker=e((()=>{b=`.kds-time-picker{align-items:flex-end;gap:var(--time-picker-gap);display:inline-flex}.kds-tp__column{align-items:center;gap:var(--time-picker-container-margin);flex-direction:column;display:flex}.kds-tp__title{color:var(--time-picker-foreground-subtle);font-family:var(--time-picker-title-font-family), system-ui, sans-serif;font-size:var(--time-picker-title-font-size);font-weight:var(--time-picker-title-font-weight);line-height:var(--time-picker-title-line-height);letter-spacing:var(--time-picker-title-letter-spacing);text-transform:uppercase}.kds-tp__box{box-sizing:border-box;height:calc(3 * var(--time-picker-container-number-fixed-height) + 2 * var(--time-picker-container-p));border-radius:var(--time-picker-container-radius);background-color:var(--time-picker-container-background);box-shadow:var(--elevation-raised);justify-content:center;align-items:center;display:flex}.kds-tp__box--hour{width:72px}.kds-tp__box--minutes{padding:var(--time-picker-container-p)}.kds-tp__number{width:var(--time-picker-container-number-fixed-width);height:var(--time-picker-container-number-fixed-height);color:var(--time-picker-foreground);font-family:var(--time-picker-container-number-font-family), system-ui, sans-serif;font-size:var(--time-picker-container-number-font-size);font-weight:400;line-height:var(--time-picker-container-number-line-height);font-variant-numeric:tabular-nums;justify-content:center;align-items:center;display:flex}.kds-tp__number--selected{font-weight:var(--time-picker-container-number-font-weight)}.kds-tp__window{width:var(--time-picker-container-number-fixed-width);height:calc(3 * var(--time-picker-container-number-fixed-height));position:relative}.kds-tp__highlight{inset:var(--time-picker-container-number-fixed-height) 0 auto;height:var(--time-picker-container-number-fixed-height);border-radius:var(--time-picker-container-selected-highlight-radius);background-color:var(--time-picker-container-selected-highlight);position:absolute}.kds-tp__drum{scroll-snap-type:y mandatory;scrollbar-width:none;padding-block:var(--time-picker-container-number-fixed-height);box-sizing:border-box;border-radius:var(--time-picker-container-selected-highlight-radius);outline:none;position:absolute;inset:0;overflow-y:auto}.kds-tp__drum::-webkit-scrollbar{display:none}.kds-tp__drum:focus-visible{outline:var(--focus-ring-width) solid var(--color-focus-ring);outline-offset:var(--focus-ring-offset)}.kds-tp__option{scroll-snap-align:center;cursor:pointer}.kds-tp__fade{height:var(--time-picker-container-number-fixed-height);pointer-events:none;position:absolute;left:0;right:0}.kds-tp__fade--top{background:linear-gradient(to bottom, var(--color-canvas), transparent);top:0}.kds-tp__fade--bottom{background:linear-gradient(to top, var(--color-canvas), transparent);bottom:0}.kds-tp__separator{box-sizing:border-box;height:calc(3 * var(--time-picker-container-number-fixed-height) + 2 * var(--time-picker-container-p));padding-inline:var(--time-picker-container-margin);justify-content:center;align-items:center;display:flex}.kds-tp__separator>svg{width:4px;height:19px;fill:var(--color-border-base)}`})))()}var x,S,C;function init_time_picker$1(){return(init_time_picker$1=e((()=>{d(),init_time_picker(),c(),v(),x=0,S=48,C=class KdsTimePicker{hour=f.required();minutes=f.required();hourLabel=f(`Hora`);minutesLabel=f(`Minutos`);ariaLabel=f();value=h(null);id=`kds-tp-${x++}`;selectedIndex=a(()=>{let e=this.minutes().indexOf(this.value());return e>=0?e:0});drum=m.required(`drum`);scrollTimer;onChange=()=>{};onTouched=()=>{};constructor(){s(()=>{let e=this.selectedIndex();queueMicrotask(()=>this.scrollTo(e,!1))})}ngAfterViewInit(){this.scrollTo(this.selectedIndex(),!1)}pad(e){return String(e).padStart(2,`0`)}choose(e,t){let n=this.minutes()[e];n!==void 0&&(n!==this.value()&&(this.value.set(n),this.onChange(n)),t&&this.scrollTo(e,!0))}onScroll(){clearTimeout(this.scrollTimer),this.scrollTimer=setTimeout(()=>{let e=Math.round(this.drum().nativeElement.scrollTop/S);this.choose(Math.min(Math.max(e,0),this.minutes().length-1),!1)},120)}onKey(e){let t=this.minutes().length-1,n=this.selectedIndex(),r={ArrowDown:n+1,ArrowUp:n-1,Home:0,End:t}[e.key];r!==void 0&&(e.preventDefault(),this.choose(Math.min(Math.max(r,0),t),!0))}scrollTo(e,t){let n=this.drum().nativeElement,r=globalThis.matchMedia?.(`(prefers-reduced-motion: reduce)`).matches;Math.abs(n.scrollTop-e*S)<1||n.scrollTo({top:e*S,behavior:t&&!r?`smooth`:`auto`})}writeValue(e){this.value.set(e)}registerOnChange(e){this.onChange=e}registerOnTouched(e){this.onTouched=e}static ctorParameters=()=>[];static propDecorators={hour:[{type:t,args:[{isSignal:!0,alias:`hour`,required:!0,transform:void 0}]}],minutes:[{type:t,args:[{isSignal:!0,alias:`minutes`,required:!0,transform:void 0}]}],hourLabel:[{type:t,args:[{isSignal:!0,alias:`hourLabel`,required:!1,transform:void 0}]}],minutesLabel:[{type:t,args:[{isSignal:!0,alias:`minutesLabel`,required:!1,transform:void 0}]}],ariaLabel:[{type:t,args:[{isSignal:!0,alias:`ariaLabel`,required:!1,transform:void 0}]}],value:[{type:t,args:[{isSignal:!0,alias:`value`,required:!1}]},{type:i,args:[`valueChange`]}],drum:[{type:u,args:[`drum`,{isSignal:!0}]}]}},C=l([o({selector:`kds-time-picker`,standalone:!0,encapsulation:r.None,changeDetection:p.OnPush,providers:[{provide:y,useExisting:n(()=>C),multi:!0}],host:{class:`kds-time-picker`,role:`group`,"[attr.aria-label]":`ariaLabel() ?? null`},template:`
    <div class="kds-tp__column kds-tp__column--hour">
      <span class="kds-tp__title" [id]="id + '-h'">{{ hourLabel() }}</span>
      <div class="kds-tp__box kds-tp__box--hour" [attr.aria-labelledby]="id + '-h'" role="group">
        <span class="kds-tp__number kds-tp__number--selected">{{ pad(hour()) }}</span>
      </div>
    </div>
    <span class="kds-tp__separator" aria-hidden="true">
      <svg viewBox="0 0 4 19" focusable="false"><circle cx="2" cy="1.96" r="1.96" /><circle cx="2" cy="17.04" r="1.96" /></svg>
    </span>
    <div class="kds-tp__column">
      <span class="kds-tp__title" [id]="id + '-m'">{{ minutesLabel() }}</span>
      <div class="kds-tp__box kds-tp__box--minutes">
        <div class="kds-tp__window">
          <span class="kds-tp__highlight" aria-hidden="true"></span>
          <div
            #drum
            class="kds-tp__drum"
            role="listbox"
            tabindex="0"
            [attr.aria-labelledby]="id + '-m'"
            [attr.aria-activedescendant]="selectedIndex() >= 0 ? id + '-o' + selectedIndex() : null"
            (scroll)="onScroll()"
            (keydown)="onKey($event)"
            (blur)="onTouched()"
          >
            @for (m of minutes(); track m; let i = $index) {
              <div
                class="kds-tp__number kds-tp__option"
                role="option"
                [id]="id + '-o' + i"
                [class.kds-tp__number--selected]="i === selectedIndex()"
                [attr.aria-selected]="i === selectedIndex()"
                (click)="choose(i, true)"
              >{{ pad(m) }}</div>
            }
          </div>
          <span class="kds-tp__fade kds-tp__fade--top" aria-hidden="true"></span>
          <span class="kds-tp__fade kds-tp__fade--bottom" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  `,styles:[b]})],C)})))()}var w,T,E;function init_time_picker_stories(){return(init_time_picker_stories=e((()=>{_(),init_time_picker$1(),w={title:`Components/Time Picker`,tags:[`autodocs`],decorators:[g({imports:[C]})],parameters:{docs:{description:{component:["Fine-tunes the arrival time inside a slot. Mirrors the Figma `time picker`: fixed hour column and a minutes drum with three visible rows.",``,`- The product supplies the hour and the minutes (in this example, the minutes of the 13:15–13:30 slot). The component never creates intervals or availability.`,`- Scroll or swipe the drum (it snaps), click a minute, or focus the list and use ↑ ↓ Home End. Exposed as a listbox.`,`- Selected number: weight 600 (token). Others: 400, intentionally unbound (see AGENTS.md).`].join(`
`)}}}},T={render:()=>({props:{minutes:Array.from({length:15},(e,t)=>15+t),minute:15},template:`
      <kds-time-picker [hour]="13" [minutes]="minutes" [(value)]="minute" ariaLabel="Hora de llegada" />
      <p style="margin-top: var(--space-md); font: 14px/1.4 var(--font-body-2-font-family); color: var(--color-on-canvas-default)">Llegaré a las 13:{{ minute < 10 ? '0' + minute : minute }}</p>`})},E=[`Slot`],T.parameters={...T.parameters,docs:{...T.parameters?.docs,source:{originalSource:`{
  render: () => ({
    props: {
      minutes: Array.from({
        length: 15
      }, (_, i) => 15 + i),
      minute: 15
    },
    template: \`
      <kds-time-picker [hour]="13" [minutes]="minutes" [(value)]="minute" ariaLabel="Hora de llegada" />
      <p style="margin-top: var(--space-md); font: 14px/1.4 var(--font-body-2-font-family); color: var(--color-on-canvas-default)">Llegaré a las 13:{{ minute < 10 ? '0' + minute : minute }}</p>\`
  })
}`,...T.parameters?.docs?.source}}}})))()}init_time_picker_stories();export{T as Slot,E as __namedExportsOrder,w as default};