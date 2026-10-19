import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, computed, forwardRef, inject, input, model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

/**
 * Kotify DS radio buttons module — a group of mutually exclusive options.
 *
 * ```html
 * <kds-radio-group title="¿Cuándo quieres que te lo sirvamos?" [(value)]="moment">
 *   <kds-radio value="arrival" label="Listo al llegar" details="Preparado para cuando llegues." />
 *   <kds-radio value="second" label="Segundo plato" details="Después de los platos iniciales." />
 * </kds-radio-group>
 * ```
 *
 * Contract (Figma, radio buttons module + .radio button): status default | selected,
 * optional details. Rendered as `<fieldset>` + `<legend>` with native radios that
 * share a `name`, so arrow keys move the selection. Works with `[(value)]`,
 * `ngModel` and reactive forms. The title is the group's accessible name; when
 * it is omitted, pass `ariaLabel`.
 */
@Component({
  selector: 'kds-radio-group',
  standalone: true,
  styleUrl: './radio.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => KdsRadioGroup), multi: true }],
  template: `
    <fieldset class="kds-radio-group" role="radiogroup" [attr.aria-label]="title() ? null : ariaLabel() ?? null">
      @if (title()) {
        <legend>{{ title() }}</legend>
      }
      <div class="kds-choice-group__options"><ng-content /></div>
    </fieldset>
  `,
})
export class KdsRadioGroup implements ControlValueAccessor {
  /** Group question or label (shown uppercase). */
  readonly title = input<string>();
  /** Accessible name when there is no visible title. */
  readonly ariaLabel = input<string>();
  /** Native `name` shared by the radios; generated when omitted. */
  readonly name = input<string>(`kds-radio-group-${nextId++}`);
  /** Selected value; supports `[(value)]`. */
  readonly value = model<unknown>(null);

  private onChange: (v: unknown) => void = () => {};
  onTouched: () => void = () => {};

  select(v: unknown): void {
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(v: unknown): void { this.value.set(v); }
  registerOnChange(fn: (v: unknown) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}

/** One option of a `kds-radio-group` (Figma `.radio button`). */
@Component({
  selector: 'kds-radio',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-radio-host' },
  template: `
    <label class="kds-radio" [class.kds-radio--selected]="selected()">
      <input type="radio" [name]="group.name()" [value]="value()" [checked]="selected()" (change)="group.select(value())" (blur)="group.onTouched()" />
      <span class="kds-radio__ring" aria-hidden="true"></span>
      <span class="kds-choice__text">
        <span class="kds-choice__label">{{ label() }}</span>
        @if (details()) {
          <span class="kds-choice__details">{{ details() }}</span>
        }
      </span>
    </label>
  `,
})
export class KdsRadio {
  protected readonly group = inject(KdsRadioGroup);
  /** Value selected when this option is chosen. */
  readonly value = input.required<unknown>();
  /** Visible label (Figma "description"). */
  readonly label = input.required<string>();
  /** Optional supporting text (Figma "details"). */
  readonly details = input<string>();
  protected readonly selected = computed(() => this.group.value() === this.value());
}
