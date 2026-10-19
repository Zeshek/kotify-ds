import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/** Kotify icon names (exported from the Figma Icons page; see src/icons/*.svg). */
export type KdsIconName = 'more' | 'less' | 'arrow';

const PATHS: Record<KdsIconName, string> = {
  more: 'M11 18V13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H11V6C11 5.44772 11.4477 5 12 5C12.5523 5 13 5.44772 13 6V11H18C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H13V18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18Z',
  less: 'M18 11C18.5523 11 19 11.4477 19 12C19 12.5523 18.5523 13 18 13H6C5.44772 13 5 12.5523 5 12C5 11.4477 5.44772 11 6 11H18Z',
  arrow: 'M11.2498 5.31059C11.6639 4.89644 12.3361 4.89651 12.7503 5.31059C13.1645 5.72478 13.1645 6.39693 12.7503 6.81111L8.62217 10.9392H17.9392C18.5249 10.9392 18.9999 11.4143 19 12C19 12.5857 18.525 13.0607 17.9392 13.0607H8.62217L12.7503 17.1899C13.1642 17.6041 13.1643 18.2752 12.7503 18.6894C12.3361 19.1035 11.664 19.1035 11.2498 18.6894L5.31059 12.7502C4.89651 12.336 4.89643 11.6639 5.31059 11.2497L11.2498 5.31059Z',
};

/**
 * Kotify DS icon (decorative). Renders an inline 24×24 SVG that takes
 * `currentColor`; the parent sets its size. Always pair it with an accessible
 * name on the control that contains it.
 *
 * ```html
 * <button kdsIconButton label="Añadir"><svg kdsIcon="more"></svg></button>
 * ```
 */
@Component({
  selector: 'svg[kdsIcon]',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    'aria-hidden': 'true',
    focusable: 'false',
    class: 'kds-icon',
  },
  template: '<svg:path [attr.d]="path()" />',
})
export class KdsIcon {
  readonly kdsIcon = input.required<KdsIconName>();
  protected path = () => PATHS[this.kdsIcon()];
}
