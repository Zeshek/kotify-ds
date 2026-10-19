import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/** Variants defined by the Figma component `IconButton` (variant property). */
export type KdsIconButtonVariant = 'default' | 'navigation';
/** Sizes defined by the Figma component `IconButton` (size property). */
export type KdsIconButtonSize = 'large' | 'medium' | 'small';

/**
 * Kotify DS IconButton.
 *
 * Applied to a native `<button>`. The icon is projected content (an inline SVG
 * that uses `currentColor`). `label` is required and becomes the accessible
 * name, because the control has no visible text.
 *
 * ```html
 * <button kdsIconButton label="Añadir" variant="default" size="medium" type="button">
 *   <svg ...>...</svg>
 * </button>
 * ```
 *
 * Contract (Figma, IconButton component set):
 * - variant: default | navigation
 * - size: large | medium | small
 * - states: default, hover, pressed, disabled → :hover, :active, native `disabled`.
 *   Keyboard focus is a code-only :focus-visible treatment.
 */
@Component({
  selector: 'button[kdsIconButton]',
  standalone: true,
  template: '<ng-content />',
  styleUrl: './icon-button.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kds-icon-button',
    '[attr.aria-label]': 'label()',
    '[class.kds-icon-button--default]': "variant() === 'default'",
    '[class.kds-icon-button--navigation]': "variant() === 'navigation'",
    '[class.kds-icon-button--large]': "size() === 'large'",
    '[class.kds-icon-button--medium]': "size() === 'medium'",
    '[class.kds-icon-button--small]': "size() === 'small'",
  },
})
export class KdsIconButton {
  /** Accessible name (required): describes the action, e.g. "Añadir plato". */
  readonly label = input.required<string>();
  /** Visual variant. Defaults to `default`, as in Figma. */
  readonly variant = input<KdsIconButtonVariant>('default');
  /** Size. Defaults to `large`, as in Figma. */
  readonly size = input<KdsIconButtonSize>('large');
}
