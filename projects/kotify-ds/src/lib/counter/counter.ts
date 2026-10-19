import {
  ChangeDetectionStrategy, Component, ViewEncapsulation, computed, forwardRef, input, model,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { KdsIconButton } from '../icon-button/icon-button';
import { KdsIcon } from '../icons/icons';

/** Variants defined by the Figma component `counter`. */
export type KdsCounterVariant = 'on card' | 'on canvas';

/**
 * Kotify DS Counter — adjusts a quantity with less / more buttons.
 *
 * ```html
 * <kds-counter label="Croquetas" [(value)]="qty" [max]="stock" />
 * <kds-counter variant="on canvas" label="Personas" description="Personas" [min]="1" [max]="8" [(value)]="people" />
 * ```
 *
 * Contract (Figma, counter): variant on card (small IconButtons, body-1 number)
 * | on canvas (large IconButtons, display-1 number and an uppercase description).
 * Limits come from the product: pass `min` and `max`. The only built-in rule is
 * that a quantity is never negative (`min` defaults to 0). The buttons are
 * disabled at the limits and the value is announced politely.
 */
@Component({
  selector: 'kds-counter',
  standalone: true,
  imports: [KdsIconButton, KdsIcon],
  styleUrl: './counter.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => KdsCounter), multi: true }],
  host: {
    class: 'kds-counter',
    role: 'group',
    '[class.kds-counter--canvas]': "variant() === 'on canvas'",
    '[attr.aria-label]': 'label()',
  },
  template: `
    <button kdsIconButton type="button" [size]="buttonSize()" [label]="decrementLabel() + ' ' + label()" [disabled]="!canDecrement()" (click)="step(-1)">
      <svg kdsIcon="less"></svg>
    </button>
    <span class="kds-counter__text">
      <output class="kds-counter__number" aria-live="polite">{{ value() }}</output>
      @if (variant() === 'on canvas' && description()) {
        <span class="kds-counter__description" aria-hidden="true">{{ description() }}</span>
      }
    </span>
    <button kdsIconButton type="button" [size]="buttonSize()" [label]="incrementLabel() + ' ' + label()" [disabled]="!canIncrement()" (click)="step(1)">
      <svg kdsIcon="more"></svg>
    </button>
  `,
})
export class KdsCounter implements ControlValueAccessor {
  /** What is being counted; names the group and its buttons ("Añadir Croquetas"). */
  readonly label = input.required<string>();
  readonly variant = input<KdsCounterVariant>('on card');
  /** Uppercase caption under the number (on canvas only), e.g. "Personas". */
  readonly description = input<string>();
  readonly min = input(0);
  readonly max = input<number>();
  readonly decrementLabel = input('Quitar');
  readonly incrementLabel = input('Añadir');
  /** Quantity; supports `[(value)]`. */
  readonly value = model(0);

  protected readonly buttonSize = computed(() => (this.variant() === 'on canvas' ? 'large' : 'small'));
  protected readonly canDecrement = computed(() => this.value() > this.min());
  protected readonly canIncrement = computed(() => this.max() === undefined || this.value() < this.max()!);

  private onChange: (v: number) => void = () => {};
  private onTouched: () => void = () => {};

  protected step(delta: number): void {
    const next = this.value() + delta;
    if (next < this.min() || (this.max() !== undefined && next > this.max()!)) return;
    this.value.set(next);
    this.onChange(next);
    this.onTouched();
  }

  writeValue(v: number | null): void { this.value.set(v ?? this.min()); }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
