import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, booleanAttribute, inject, input } from '@angular/core';

/**
 * Kotify DS Pills — lightweight secondary navigation or filtering.
 *
 * ```html
 * <kds-pills ariaLabel="Secciones de la carta">
 *   <button kdsPill selected>Entrantes</button>
 *   <button kdsPill>Principales</button>
 * </kds-pills>
 * ```
 *
 * Contract (Figma, pills + pills/item): item status default | selected; editable
 * text. Not a replacement for tabs or multi-step navigation. On a `<button>` the
 * selected item exposes `aria-pressed`; on a link, `aria-current="page"`. The
 * selected item is also distinguishable without colour (filled vs outlined).
 */
@Component({
  selector: 'kds-pills',
  standalone: true,
  styleUrl: './pills.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-pills', role: 'group', '[attr.aria-label]': 'ariaLabel() ?? null' },
  template: '<ng-content />',
})
export class KdsPills {
  /** Accessible name for the group. */
  readonly ariaLabel = input<string>();
}

@Component({
  selector: 'button[kdsPill], a[kdsPill]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kds-pill',
    '[class.kds-pill--selected]': 'selected()',
    '[attr.aria-pressed]': "isButton ? (selected() ? 'true' : 'false') : null",
    '[attr.aria-current]': "!isButton && selected() ? 'page' : null",
    '[attr.type]': "isButton ? 'button' : null",
  },
  template: '<ng-content />',
})
export class KdsPill {
  /** Selected item (Figma status=selected). */
  readonly selected = input(false, { transform: booleanAttribute });
  protected readonly isButton = (inject(ElementRef).nativeElement as HTMLElement).tagName === 'BUTTON';
}
