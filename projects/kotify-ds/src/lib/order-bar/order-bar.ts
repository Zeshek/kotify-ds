import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output } from '@angular/core';
import { KdsBubble } from '../bubble/bubble';

/**
 * Kotify DS Order bar — floating bar that summarises the current order and
 * opens it.
 *
 * ```html
 * <kds-order-bar [count]="3" countLabel="3 platos" total="24,50 €" (open)="showOrder()" />
 * ```
 *
 * Contract (Figma, order bar module + .order bar): the module adds the outer
 * spacing (20 px sides, 32 px bottom); the bar is one action with the item count
 * (Bubble), the action label and the total. Positioning on screen (for example
 * fixed to the bottom) belongs to the page. Data comes from the product; the bar
 * does not compute totals.
 */
@Component({
  selector: 'kds-order-bar',
  standalone: true,
  imports: [KdsBubble],
  styleUrl: './order-bar.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-order-bar-module' },
  template: `
    <button type="button" class="kds-order-bar" (click)="open.emit()">
      <kds-bubble aria-hidden="true">{{ count() }}</kds-bubble>
      @if (countLabel()) {
        <span class="kds-order-bar__sr">{{ countLabel() }},</span>
      }
      <span class="kds-order-bar__action">{{ action() }}</span>
      <span class="kds-order-bar__total">{{ total() }}</span>
    </button>
  `,
})
export class KdsOrderBar {
  /** Number of items shown in the bubble. */
  readonly count = input.required<number>();
  /** Spoken version of the count, e.g. "3 platos" (the bubble alone is ambiguous). */
  readonly countLabel = input<string>();
  /** Action label. */
  readonly action = input('Ver pedido');
  /** Order total, already formatted by the product (e.g. "24,50 €"). */
  readonly total = input.required<string>();
  /** Emitted when the bar is activated. */
  readonly open = output<void>();
}
