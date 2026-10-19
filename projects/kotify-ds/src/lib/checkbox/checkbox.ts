import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, forwardRef, input, model, signal,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

/**
 * Kotify DS Checkbox — independent or multiple selection, shown as a card.
 *
 * ```html
 * <kds-checkbox label="Confirmación por SMS" details="Te avisamos cuando el pedido esté listo." [(checked)]="sms" />
 * ```
 *
 * Contract (Figma, checkbox): status default | selected; optional details.
 * Built on a native `<input type="checkbox">` inside a `<label>`, so the whole
 * card toggles it and keyboard (Space) works. Works with `[(checked)]`,
 * `ngModel` and reactive forms. Figma has no disabled state; none is exposed.
 */
@Component({
  selector: 'kds-checkbox',
  standalone: true,
  styleUrl: './checkbox.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => KdsCheckbox), multi: true }],
  host: { class: 'kds-checkbox-host' },
  template: `
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
  `,
})
export class KdsCheckbox implements ControlValueAccessor {
  /** Visible label (Figma "description"). Required: it is the accessible name. */
  readonly label = input.required<string>();
  /** Optional supporting text (Figma "details"). */
  readonly details = input<string>();
  /** Native `name` for form submission. */
  readonly name = input<string>();
  /** Checked state; supports `[(checked)]`. */
  readonly checked = model(false);

  protected readonly id = `kds-checkbox-${nextId++}`;
  private onChange: (v: boolean) => void = () => {};
  protected onTouched: () => void = () => {};

  protected toggle(e: Event): void {
    const value = (e.target as HTMLInputElement).checked;
    this.checked.set(value);
    this.onChange(value);
  }

  writeValue(v: boolean): void { this.checked.set(!!v); }
  registerOnChange(fn: (v: boolean) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

/**
 * Kotify DS checkbox module — a group of checkboxes with an optional title.
 *
 * ```html
 * <kds-checkbox-group title="Avisos">
 *   <kds-checkbox label="Confirmación por SMS" />
 *   <kds-checkbox label="Correo electrónico" />
 * </kds-checkbox-group>
 * ```
 * Rendered as `<fieldset>` + `<legend>` so the options share a group name.
 */
@Component({
  selector: 'kds-checkbox-group',
  standalone: true,
  styleUrl: './checkbox.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <fieldset class="kds-checkbox-group">
      @if (title()) {
        <legend>{{ title() }}</legend>
      }
      <div class="kds-choice-group__options"><ng-content /></div>
    </fieldset>
  `,
})
export class KdsCheckboxGroup {
  /** Group title (Figma "title?"). Shown uppercase. */
  readonly title = input<string>();
}
