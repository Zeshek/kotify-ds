import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, forwardRef, input, model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;

/**
 * Kotify DS Text Field — multi-line text entry with a persistent title
 * (reviews, notes for the kitchen).
 *
 * ```html
 * <kds-text-field label="Valoración" placeholder="Escribe aquí tu opinión" [(value)]="review" />
 * ```
 *
 * Contract (Figma, text field): status default | filled | focus; title optional;
 * minimum text height 48 px (text field/min-height) and a resize handle, which is
 * the native vertical resize of the `<textarea>`.
 */
@Component({
  selector: 'kds-text-field',
  standalone: true,
  styleUrl: './text-field.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => KdsTextField), multi: true }],
  host: { class: 'kds-text-field' },
  template: `
    <label class="kds-field__title" [class.kds-field__title--hidden]="hideLabel()" [for]="id">{{ label() }}</label>
    <textarea
      class="kds-field__control"
      [id]="id"
      [name]="name() ?? null"
      [rows]="rows()"
      [placeholder]="placeholder() ?? ''"
      [attr.maxlength]="maxlength() ?? null"
      [attr.aria-describedby]="describedBy() ?? null"
      [value]="value()"
      (input)="update($event)"
      (blur)="onTouched()"
    ></textarea>
  `,
})
export class KdsTextField implements ControlValueAccessor {
  readonly label = input.required<string>();
  readonly hideLabel = input(false, { transform: booleanAttribute });
  readonly placeholder = input<string>();
  readonly name = input<string>();
  readonly rows = input(2);
  readonly maxlength = input<number>();
  readonly describedBy = input<string>();
  readonly value = model('');

  protected readonly id = `kds-text-field-${nextId++}`;
  private onChange: (v: string) => void = () => {};
  protected onTouched: () => void = () => {};

  protected update(e: Event): void {
    const v = (e.target as HTMLTextAreaElement).value;
    this.value.set(v);
    this.onChange(v);
  }

  writeValue(v: string | null): void { this.value.set(v ?? ''); }
  registerOnChange(fn: (v: string) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
