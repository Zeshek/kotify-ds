import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, forwardRef, input, model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

/**
 * Kotify DS Input — single-line text entry with a persistent title.
 *
 * ```html
 * <kds-input label="Nombre y apellidos" placeholder="Víctor F. González" autocomplete="name" [(value)]="name" />
 * ```
 *
 * Contract (Figma, input): status default | filled | focus; title optional.
 * The states map to the native field: empty (placeholder shown), with a value,
 * and :focus. `label` is always required: with `hideLabel` (Figma title?=false)
 * it stays available to assistive technology. Pass `describedBy` to associate a
 * helper or validation message rendered by the product.
 */
@Component({
  selector: 'kds-input',
  standalone: true,
  styleUrl: './input.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => KdsInput), multi: true }],
  host: { class: 'kds-input' },
  template: `
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
  `,
})
export class KdsInput implements ControlValueAccessor {
  /** Title / label (always required; shown uppercase). */
  readonly label = input.required<string>();
  /** Hides the title visually (Figma title?=false); it stays accessible. */
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly placeholder = input<string>();
  readonly type = input<'text' | 'email' | 'tel' | 'search' | 'url' | 'password' | 'number'>('text');
  readonly name = input<string>();
  readonly autocomplete = input<string>();
  readonly inputmode = input<string>();
  /** id(s) of helper or error text to associate with the field. */
  readonly describedBy = input<string>();
  /** Current value; supports `[(value)]`. */
  readonly value = model('');

  protected readonly id = `kds-input-${nextId++}`;
  private onChange: (v: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected update(e: Event): void {
    const v = (e.target as HTMLInputElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(v: string | null): void { this.value.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
