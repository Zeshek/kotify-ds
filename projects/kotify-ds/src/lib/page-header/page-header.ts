import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output } from '@angular/core';
import { KdsIconButton } from '../icon-button/icon-button';
import { KdsIcon } from '../icons/icons';

/**
 * Kotify DS Page Header — top of a screen: back navigation, title and metadata.
 *
 * ```html
 * <kds-page-header title="Carta" metadata="2 pers." (back)="goBack()" />
 * ```
 *
 * Contract (Figma, page header): navigation IconButton (medium, arrow), title
 * (title?) and metadata (metadata?), spread across the width. The title is
 * exposed as a heading (level 1 by default; set `headingLevel` when the screen
 * already has its own h1). The back button only emits `back`: navigation is the
 * product's decision.
 */
@Component({
  selector: 'kds-page-header',
  standalone: true,
  imports: [KdsIconButton, KdsIcon],
  styleUrl: './page-header.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-page-header' },
  template: `
    <button kdsIconButton type="button" variant="navigation" size="medium" [label]="backLabel()" (click)="back.emit()">
      <svg kdsIcon="arrow"></svg>
    </button>
    @if (title()) {
      <span class="kds-page-header__title" role="heading" [attr.aria-level]="headingLevel()">{{ title() }}</span>
    } @else {
      <span></span>
    }
    @if (metadata()) {
      <span class="kds-page-header__metadata">{{ metadata() }}</span>
    } @else {
      <span class="kds-page-header__spacer" aria-hidden="true"></span>
    }
  `,
})
export class KdsPageHeader {
  /** Screen title (shown uppercase). */
  readonly title = input<string>();
  /** Supporting text on the right, e.g. "2 pers.". */
  readonly metadata = input<string>();
  /** Accessible name of the back button. */
  readonly backLabel = input('Volver');
  readonly headingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(1);
  /** Emitted when the back button is activated. */
  readonly back = output<void>();
}
