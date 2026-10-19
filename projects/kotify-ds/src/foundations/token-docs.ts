import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { KOTIFY_TOKENS, KotifyTokenMeta } from './tokens.generated';

export type TokenDocsSection = 'semantic-colors' | 'primitive-colors' | 'typography' | 'spacing' | 'radius';

const TYPE_ROLES = ['display-1', 'display-2', 'display-3', 'h1', 'h2', 'h3', 'body-1', 'body-2', 'label-1', 'label-2', 'caption'];

/** Storybook-only documentation view. Renders tokens straight from the generated Figma export. */
@Component({
  selector: 'kds-token-docs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: `
    :host { display: block; font-family: var(--font-body-2-font-family), system-ui, sans-serif; color: var(--color-on-canvas-default); }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: var(--space-md); }
    .group + .group { margin-top: var(--space-2xl); }
    h3 { margin: 0 0 var(--space-base); font: var(--font-h3-font-weight) var(--font-h3-font-size) / var(--font-h3-line-height) var(--font-h3-font-family); }
    .swatch { border-radius: var(--radius-lg); overflow: hidden; background: var(--color-surface-base); border: 1px solid var(--color-border-base); }
    .chip { height: 56px; }
    .chip--checker { background-image: conic-gradient(var(--color-border-base) 25%, transparent 0 50%, var(--color-border-base) 0 75%, transparent 0); background-size: 12px 12px; }
    .meta { padding: var(--space-sm) var(--space-base); display: grid; gap: 2px; }
    .name { font-weight: var(--font-label-2-font-weight); font-size: var(--font-label-2-font-size); line-height: var(--font-label-2-line-height); }
    .small { font-size: var(--font-caption-font-size); line-height: var(--font-caption-line-height); color: var(--color-on-surface-subtle); overflow-wrap: anywhere; }
    code { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; font-size: 11px; }
    table { width: 100%; border-collapse: collapse; }
    td, th { text-align: left; padding: var(--space-sm) var(--space-base); border-bottom: 1px solid var(--color-border-base); vertical-align: middle; }
    th { font-size: var(--font-caption-font-size); color: var(--color-on-canvas-subtle); font-weight: var(--font-caption-font-weight-emphasis); }
    .bar { height: 12px; background: var(--color-primary-base); border-radius: 2px; }
    .box { width: 64px; height: 64px; background: var(--color-primary-container); border: 1px solid var(--color-on-primary-container); }
  `,
  template: `
    @switch (section()) {
      @case ('semantic-colors') {
        @for (g of semanticColorGroups(); track g.name) {
          <div class="group">
            <h3>{{ g.name }}</h3>
            <div class="grid">
              @for (t of g.tokens; track t.name) {
                <div class="swatch">
                  <div class="chip chip--checker"><div class="chip" [style.background]="'var(' + t.css + ')'"></div></div>
                  <div class="meta">
                    <span class="name">{{ t.name }}</span>
                    <code class="small">{{ t.css }}</code>
                    <span class="small">→ {{ t.aliasOf }}</span>
                    <span class="small">{{ t.resolved }}{{ t.opacity !== null ? " · " + t.opacity + "%" : "" }}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      }
      @case ('primitive-colors') {
        @for (g of primitiveColorGroups(); track g.name) {
          <div class="group">
            <h3>{{ g.name }}</h3>
            <div class="grid">
              @for (t of g.tokens; track t.name) {
                <div class="swatch">
                  <div class="chip" [style.background]="'var(' + t.css + ')'"></div>
                  <div class="meta">
                    <span class="name">{{ t.name }}</span>
                    <span class="small">{{ t.resolved }}</span>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      }
      @case ('typography') {
        <table>
          <tr><th>Role</th><th>Specimen</th><th>Family / size / line-height / weight</th></tr>
          @for (r of typeRoles(); track r.role) {
            <tr>
              <td style="white-space:nowrap"><span class="name">{{ r.role }}</span></td>
              <td [style.font-family]="'var(--font-' + r.role + '-font-family)'"
                  [style.font-size]="'var(--font-' + r.role + '-font-size)'"
                  [style.line-height]="'var(--font-' + r.role + '-line-height)'"
                  [style.font-weight]="'var(--font-' + r.role + '-font-weight, var(--font-' + r.role + '-font-weight-emphasis))'">
                Donde la comida te espera
              </td>
              <td class="small">{{ r.summary }}</td>
            </tr>
          }
        </table>
      }
      @case ('spacing') {
        <table>
          <tr><th>Token</th><th>Value</th><th></th></tr>
          @for (t of spacing(); track t.name) {
            <tr>
              <td><span class="name">{{ t.name }}</span><br /><code class="small">{{ t.css }}</code></td>
              <td class="small">{{ t.resolved }}</td>
              <td style="width:60%"><div class="bar" [style.width]="'var(' + t.css + ')'"></div></td>
            </tr>
          }
        </table>
      }
      @case ('radius') {
        <div class="grid">
          @for (t of radius(); track t.name) {
            <div class="swatch" style="padding: var(--space-md); display:flex; gap: var(--space-md); align-items:center;">
              <div class="box" [style.border-radius]="'var(' + t.css + ')'"></div>
              <div><span class="name">{{ t.name }}</span><br /><span class="small">{{ t.resolved }}</span></div>
            </div>
          }
        </div>
      }
    }
  `,
})
export class KdsTokenDocs {
  readonly section = input.required<TokenDocsSection>();

  private readonly sem = KOTIFY_TOKENS.filter((t) => t.collection === 'Semantics');

  readonly semanticColorGroups = computed(() =>
    group(this.sem.filter((t) => t.type === 'color'), (t) => t.name.split('/')[1]),
  );
  readonly primitiveColorGroups = computed(() =>
    group(KOTIFY_TOKENS.filter((t) => t.collection === 'Primitives' && t.type === 'color'), (t) => t.name.split('/')[1]),
  );
  readonly spacing = computed(() => sortByPx(this.sem.filter((t) => t.name.startsWith('space/'))));
  readonly radius = computed(() => sortByPx(this.sem.filter((t) => t.name.startsWith('radius/'))));
  readonly typeRoles = computed(() =>
    TYPE_ROLES.map((role) => {
      const get = (p: string) => this.sem.find((t) => t.name === `font/${role}/${p}`)?.resolved ?? '—';
      const weight = get('font-weight') !== '—' ? get('font-weight') : `${get('font-weight-emphasis')} (emphasis)`;
      return { role, summary: `${get('font-family')} · ${get('font-size')} / ${get('line-height')} · ${weight}` };
    }),
  );
}

function group(tokens: readonly KotifyTokenMeta[], key: (t: KotifyTokenMeta) => string) {
  const map = new Map<string, KotifyTokenMeta[]>();
  for (const t of tokens) map.set(key(t), [...(map.get(key(t)) ?? []), t]);
  return [...map].map(([name, list]) => ({ name, tokens: list }));
}

function sortByPx(tokens: readonly KotifyTokenMeta[]) {
  return [...tokens].sort((a, b) => parseFloat(a.resolved) - parseFloat(b.resolved));
}
