import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, effect, forwardRef,
  input, model, viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;
const ROW = 48; // time picker/container/number/fixed-height

/**
 * Kotify DS Time Picker — fine-tunes the arrival time inside a slot.
 *
 * ```html
 * <kds-time-picker [hour]="13" [minutes]="[15, 16, 17, …, 29]" [(value)]="minute" ariaLabel="Hora de llegada" />
 * ```
 *
 * Contract (Figma, time picker): fixed hour column and a minutes drum with three
 * visible rows; the centred row is the selection (highlight + weight 600, the
 * others 400). Fixed widths come from Figma. The product supplies the hour and
 * the list of minutes (for example the minutes of the chosen 15-minute slot); the
 * component never creates intervals or availability.
 *
 * Interaction: scroll or swipe the drum (it snaps to a row), click a minute, or
 * focus the list and use ↑ ↓ Home End. Exposed as a listbox.
 */
@Component({
  selector: 'kds-time-picker',
  standalone: true,
  styleUrl: './time-picker.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => KdsTimePicker), multi: true }],
  host: { class: 'kds-time-picker', role: 'group', '[attr.aria-label]': 'ariaLabel() ?? null' },
  template: `
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
  `,
})
export class KdsTimePicker implements ControlValueAccessor, AfterViewInit {
  /** Hour shown in the fixed column (from the chosen slot). */
  readonly hour = input.required<number>();
  /** Minutes offered by the product, in order. */
  readonly minutes = input.required<number[]>();
  readonly hourLabel = input('Hora');
  readonly minutesLabel = input('Minutos');
  /** Accessible name of the whole control, e.g. "Hora de llegada". */
  readonly ariaLabel = input<string>();
  /** Selected minute; supports `[(value)]`. Defaults to the first minute. */
  readonly value = model<number | null>(null);

  protected readonly id = `kds-tp-${nextId++}`;
  protected readonly selectedIndex = computed(() => {
    const i = this.minutes().indexOf(this.value() as number);
    return i >= 0 ? i : 0;
  });
  private readonly drum = viewChild.required<ElementRef<HTMLElement>>('drum');
  private scrollTimer: ReturnType<typeof setTimeout> | undefined;
  private onChange: (v: number) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    // Keep the drum aligned with the value when it changes from outside.
    effect(() => {
      const i = this.selectedIndex();
      queueMicrotask(() => this.scrollTo(i, false));
    });
  }

  ngAfterViewInit(): void {
    this.scrollTo(this.selectedIndex(), false);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  protected choose(i: number, scroll: boolean): void {
    const m = this.minutes()[i];
    if (m === undefined) return;
    if (m !== this.value()) {
      this.value.set(m);
      this.onChange(m);
    }
    if (scroll) this.scrollTo(i, true);
  }

  protected onScroll(): void {
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      const i = Math.round(this.drum().nativeElement.scrollTop / ROW);
      this.choose(Math.min(Math.max(i, 0), this.minutes().length - 1), false);
    }, 120);
  }

  protected onKey(e: KeyboardEvent): void {
    const last = this.minutes().length - 1;
    const i = this.selectedIndex();
    const next = { ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    this.choose(Math.min(Math.max(next, 0), last), true);
  }

  private scrollTo(i: number, smooth: boolean): void {
    const el = this.drum().nativeElement;
    const reduce = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (Math.abs(el.scrollTop - i * ROW) < 1) return;
    el.scrollTo({ top: i * ROW, behavior: smooth && !reduce ? 'smooth' : 'auto' });
  }

  writeValue(v: number | null): void { this.value.set(v); }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
