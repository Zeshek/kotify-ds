import { ChangeDetectionStrategy, Component, ViewEncapsulation, booleanAttribute, input } from '@angular/core';

/** Variants defined by the Figma component `badge` (variant property). */
export type KdsBadgeVariant = 'primary' | 'positive' | 'negative' | 'warning';

/**
 * Kotify DS Badge — compact status or category label.
 *
 * ```html
 * <kds-badge variant="positive">Pagado</kds-badge>
 * <kds-badge variant="warning" subtle>Pendiente</kds-badge>
 * ```
 *
 * Contract (Figma, badge): variant primary | negative | positive | warning; subtle no | yes.
 * Not interactive. Do not use it instead of explanatory text when the meaning is not obvious,
 * and do not rely on its colour alone: the label must carry the meaning.
 */
@Component({
  selector: 'kds-badge',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './badge.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': "'kds-badge kds-badge--' + variant() + (subtle() ? ' kds-badge--subtle' : '')",
  },
})
export class KdsBadge {
  /** Semantic colour. Defaults to `primary`, as in Figma. */
  readonly variant = input<KdsBadgeVariant>('primary');
  /** Subtle (tinted) treatment. Defaults to `false` (subtle=no). */
  readonly subtle = input(false, { transform: booleanAttribute });
}
