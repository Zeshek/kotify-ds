import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/** Variants defined by the Figma component `Button` (variant property). */
export type KdsButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';
/** Sizes defined by the Figma component `Button` (size property). */
export type KdsButtonSize = 'large' | 'small';

/**
 * Kotify DS Button.
 *
 * Applied as an attribute on a native `<button>` so it keeps native semantics,
 * keyboard operation, `type` and `disabled` behaviour:
 *
 * ```html
 * <button kdsButton variant="primary" size="large" type="button">Pedir</button>
 * ```
 *
 * Contract (Figma, Button component set):
 * - variant: primary | secondary | ghost | destructive
 * - size: large | small
 * - states: default, hover, pressed, disabled → mapped to :hover, :active and the
 *   native `disabled` attribute. There is no focus variant in Figma; keyboard focus
 *   is a code-only treatment via :focus-visible.
 * - text: projected content. Use a concise, action-oriented label.
 */
@Component({
  selector: 'button[kdsButton]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kds-button',
    '[class.kds-button--primary]': "variant() === 'primary'",
    '[class.kds-button--secondary]': "variant() === 'secondary'",
    '[class.kds-button--ghost]': "variant() === 'ghost'",
    '[class.kds-button--destructive]': "variant() === 'destructive'",
    '[class.kds-button--large]': "size() === 'large'",
    '[class.kds-button--small]': "size() === 'small'",
  },
})
export class KdsButton {
  /** Visual emphasis. Defaults to `primary`, as in Figma. */
  readonly variant = input<KdsButtonVariant>('primary');
  /** Size. Defaults to `large`, as in Figma. */
  readonly size = input<KdsButtonSize>('large');
}
