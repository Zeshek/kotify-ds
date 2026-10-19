import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Kotify DS Bubble — small circular counter (for example, the number of items
 * in the Order bar).
 *
 * ```html
 * <kds-bubble>3</kds-bubble>
 * ```
 *
 * Contract (Figma, bubble): single component, no variants. Keep content to a
 * short number. It is not interactive; the surrounding control must give the
 * number its meaning for assistive technology (for example "3 platos").
 */
@Component({
  selector: 'kds-bubble',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './bubble.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-bubble' },
})
export class KdsBubble {}
