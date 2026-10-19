import {
  AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, ViewEncapsulation, computed, effect,
  forwardRef, input, model, signal, viewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let nextId = 0;
const ROW = 48; // time picker/container/number/fixed-height
const TILT = 32; // degrees per row away from the centre (wheel curvature)
const FADE = 0.4; // opacity lost per row away from the centre

/**
 * Kotify DS Time Picker — fine-tunes the arrival time inside the chosen slot.
 *
 * ```html
 * <kds-time-picker [hour]="13" [minutes]="[15, 16, 17, …, 29]" [(value)]="minute" ariaLabel="Hora de llegada" />
 * ```
 *
 * Contract (Figma, time picker): the hour is fixed by the slot; the minutes are
 * a wheel that behaves like the iOS alarm picker. It scrolls with momentum,
 * snaps to a row, and the rows curve away and fade towards the edges. The
 * centred minute is the selection (highlight + weight 600; the others 400).
 * Fixed widths come from Figma. The product supplies the hour and the minutes;
 * the component never creates intervals or availability.
 *
 * Interaction: swipe or scroll the wheel, drag it with the mouse, click a
 * minute, or focus it and use ↑ ↓ Home End. Exposed as a listbox. With
 * `prefers-reduced-motion` the wheel stays flat and moves without animation.
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
            [attr.aria-activedescendant]="id + '-o' + selectedIndex()"
            (scroll)="onScroll()"
            (keydown)="onKey($event)"
            (blur)="onTouched()"
            (pointerdown)="onPointerDown($event)"
            (pointermove)="onPointerMove($event)"
            (pointerup)="onPointerUp($event)"
            (pointercancel)="onPointerUp($event)"
          >
            @for (m of minutes(); track m; let i = $index) {
              <div
                class="kds-tp__number kds-tp__option"
                role="option"
                [id]="id + '-o' + i"
                [class.kds-tp__number--selected]="i === liveIndex()"
                [attr.aria-selected]="i === selectedIndex()"
                (click)="onOptionClick(i)"
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
export class KdsTimePicker implements ControlValueAccessor, AfterViewInit, OnDestroy {
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
  /** Committed selection (value). */
  protected readonly selectedIndex = computed(() => {
    const i = this.minutes().indexOf(this.value() as number);
    return i >= 0 ? i : 0;
  });
  /** Row under the highlight right now, updated while the wheel moves. */
  protected readonly liveIndex = signal(0);

  private readonly drum = viewChild.required<ElementRef<HTMLElement>>('drum');
  private settleTimer: ReturnType<typeof setTimeout> | undefined;
  private paintFrame = 0;
  private inertiaFrame = 0;
  private drag: { id: number; startY: number; startTop: number; moved: boolean; samples: { t: number; y: number }[] } | null = null;
  private suppressClick = false;
  private onChange: (v: number) => void = () => {};
  protected onTouched: () => void = () => {};

  constructor() {
    // Keep the wheel aligned with the value when it changes from outside.
    effect(() => {
      const i = this.selectedIndex();
      queueMicrotask(() => {
        if (!this.drag && !this.inertiaFrame) this.scrollTo(i, false);
      });
    });
  }

  ngAfterViewInit(): void {
    this.scrollTo(this.selectedIndex(), false);
    this.paint();
  }

  ngOnDestroy(): void {
    clearTimeout(this.settleTimer);
    cancelAnimationFrame(this.paintFrame);
    cancelAnimationFrame(this.inertiaFrame);
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }

  // ── Wheel rendering ─────────────────────────────────────────────────────
  protected onScroll(): void {
    cancelAnimationFrame(this.paintFrame);
    this.paintFrame = requestAnimationFrame(() => this.paint());
    clearTimeout(this.settleTimer);
    if (!this.drag && !this.inertiaFrame) this.settleTimer = setTimeout(() => this.settle(), 110);
  }

  /** Curves and fades each row by its distance to the centre, like a drum. */
  private paint(): void {
    const el = this.drum().nativeElement;
    const pos = el.scrollTop / ROW;
    const flat = this.reducedMotion();
    el.querySelectorAll<HTMLElement>('.kds-tp__option').forEach((o, i) => {
      const d = i - pos;
      const a = Math.min(Math.abs(d), 1.75);
      o.style.transform = flat ? '' : `perspective(240px) rotateX(${(-d * TILT).toFixed(2)}deg)`;
      o.style.opacity = flat ? '' : String(Math.max(0, 1 - a * FADE));
    });
    const live = this.clamp(Math.round(pos));
    if (live !== this.liveIndex()) this.liveIndex.set(live);
  }

  /** Commits the centred row once the wheel has stopped. */
  private settle(): void {
    this.choose(this.clamp(Math.round(this.drum().nativeElement.scrollTop / ROW)), false);
  }

  // ── Selection ───────────────────────────────────────────────────────────
  protected onOptionClick(i: number): void {
    if (this.suppressClick) return;
    this.choose(i, true);
  }

  private choose(i: number, scroll: boolean): void {
    const m = this.minutes()[i];
    if (m === undefined) return;
    if (m !== this.value()) {
      this.value.set(m);
      this.onChange(m);
    }
    if (scroll) this.scrollTo(i, true);
  }

  protected onKey(e: KeyboardEvent): void {
    const last = this.minutes().length - 1;
    const i = this.selectedIndex();
    const next = ({ ArrowDown: i + 1, ArrowUp: i - 1, Home: 0, End: last } as Record<string, number>)[e.key];
    if (next === undefined) return;
    e.preventDefault();
    this.choose(this.clamp(next), true);
  }

  // ── Mouse drag with momentum (touch uses native scrolling) ──────────────
  protected onPointerDown(e: PointerEvent): void {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = this.drum().nativeElement;
    cancelAnimationFrame(this.inertiaFrame);
    this.inertiaFrame = 0;
    clearTimeout(this.settleTimer);
    this.drag = { id: e.pointerId, startY: e.clientY, startTop: el.scrollTop, moved: false, samples: [{ t: performance.now(), y: e.clientY }] };
    el.setPointerCapture(e.pointerId);
    el.classList.add('kds-tp__drum--dragging');
  }

  protected onPointerMove(e: PointerEvent): void {
    if (!this.drag || e.pointerId !== this.drag.id) return;
    const dy = e.clientY - this.drag.startY;
    if (Math.abs(dy) > 3) this.drag.moved = true;
    this.drum().nativeElement.scrollTop = this.drag.startTop - dy;
    this.drag.samples.push({ t: performance.now(), y: e.clientY });
    if (this.drag.samples.length > 6) this.drag.samples.shift();
  }

  protected onPointerUp(e: PointerEvent): void {
    if (!this.drag || e.pointerId !== this.drag.id) return;
    const { samples, moved } = this.drag;
    this.drag = null;
    this.suppressClick = moved;
    setTimeout(() => (this.suppressClick = false));
    const first = samples[0];
    const last = samples[samples.length - 1];
    const dt = Math.max(last.t - first.t, 1);
    let v = -(last.y - first.y) / dt; // px per ms, positive = scroll down
    if (this.reducedMotion() || Math.abs(v) < 0.05) return this.finishDrag();
    const el = this.drum().nativeElement;
    const max = el.scrollHeight - el.clientHeight;
    const step = () => {
      v *= 0.95;
      el.scrollTop = Math.min(Math.max(el.scrollTop + v * 16, 0), max);
      const atEdge = el.scrollTop <= 0 || el.scrollTop >= max;
      if (Math.abs(v) > 0.05 && !atEdge) this.inertiaFrame = requestAnimationFrame(step);
      else this.finishDrag();
    };
    this.inertiaFrame = requestAnimationFrame(step);
  }

  private finishDrag(): void {
    cancelAnimationFrame(this.inertiaFrame);
    this.inertiaFrame = 0;
    const el = this.drum().nativeElement;
    el.classList.remove('kds-tp__drum--dragging');
    const i = this.clamp(Math.round(el.scrollTop / ROW));
    this.scrollTo(i, true);
    this.choose(i, false);
  }

  // ── Helpers ─────────────────────────────────────────────────────────────
  private scrollTo(i: number, smooth: boolean): void {
    const el = this.drum().nativeElement;
    if (Math.abs(el.scrollTop - i * ROW) < 1) {
      this.paint();
      return;
    }
    el.scrollTo({ top: i * ROW, behavior: smooth && !this.reducedMotion() ? 'smooth' : 'auto' });
  }

  private clamp(i: number): number {
    return Math.min(Math.max(i, 0), Math.max(this.minutes().length - 1, 0));
  }

  private reducedMotion(): boolean {
    return !!globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  }

  writeValue(v: number | null): void { this.value.set(v); }
  registerOnChange(fn: (v: number) => void): void { this.onChange = fn; }
  registerOnTouched(fn: () => void): void { this.onTouched = fn; }
}
