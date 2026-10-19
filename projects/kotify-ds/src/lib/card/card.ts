import { ChangeDetectionStrategy, Component, ViewEncapsulation, input, output } from '@angular/core';
import { KdsBadge, KdsBadgeVariant } from '../badge/badge';
import { KdsButton } from '../button/button';
import { KdsIconButton } from '../icon-button/icon-button';
import { KdsIcon } from '../icons/icons';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * card/product — a menu product with its price and an "Añadir" action.
 * The card itself is not a control: the button is the action.
 *
 * ```html
 * <kds-product-card title="Croquetas de jamón ibérico" description="Seis unidades de croqueta artesana"
 *   price="11,50 €" imageSrc="croquetas.jpg" imageAlt="" (add)="addToOrder()" />
 * ```
 */
@Component({
  selector: 'kds-product-card',
  standalone: true,
  imports: [KdsButton],
  styleUrl: './card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-card kds-card--elevated kds-product-card' },
  template: `
    <div class="kds-product-card__body">
      <div class="kds-product-card__text">
        <span class="kds-product-card__title" role="heading" [attr.aria-level]="headingLevel()">{{ title() }}</span>
        @if (description()) {
          <p class="kds-product-card__description" [attr.title]="description()">{{ description() }}</p>
        }
      </div>
      <div class="kds-product-card__footer">
        <span class="kds-product-card__price">{{ price() }}</span>
        <button kdsButton type="button" variant="secondary" size="small" [attr.aria-label]="actionLabel() + ' ' + title()" (click)="add.emit()">{{ actionLabel() }}</button>
      </div>
    </div>
    @if (imageSrc()) {
      <div class="kds-product-card__media">
        <img class="kds-product-card__image" [src]="imageSrc()" [alt]="imageAlt()" loading="lazy" />
      </div>
    }
  `,
})
export class KdsProductCard {
  readonly title = input.required<string>();
  readonly description = input<string>();
  /** Price, already formatted by the product. */
  readonly price = input.required<string>();
  readonly imageSrc = input<string>();
  /** Alt text; empty when the image is decorative (the title already names the dish). */
  readonly imageAlt = input('');
  readonly actionLabel = input('Añadir');
  readonly headingLevel = input<HeadingLevel>(3);
  readonly add = output<void>();
}

/**
 * card/order — one line of the order (`type="item"`) or its total (`type="total"`).
 * Project a `<kds-counter>` to show the quantity control (Figma counter?).
 *
 * ```html
 * <kds-order-card title="Entrecot de ternera" total="8,50 €" unitPrice="8,50 € / ud."
 *   [details]="['Al punto']" highlight="Listo al llegar">
 *   <kds-counter label="Entrecot de ternera" [(value)]="qty" />
 * </kds-order-card>
 * ```
 */
@Component({
  selector: 'kds-order-card',
  standalone: true,
  styleUrl: './card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-card kds-card--elevated kds-card--padded kds-order-card' },
  template: `
    <div class="kds-order-card__header">
      <span class="kds-order-card__title" role="heading" [attr.aria-level]="headingLevel()">{{ title() }}</span>
      <span class="kds-order-card__total">{{ total() }}</span>
    </div>
    @if (type() === 'item' && (details().length || highlight())) {
      <div class="kds-card__details">
        @for (d of details(); track $index) {
          <span>{{ d }}</span>
        }
        @if (highlight()) {
          <span class="kds-card__accent">{{ highlight() }}</span>
        }
      </div>
    }
    <div class="kds-card__divider-row">
      <span class="kds-order-card__unit">{{ unitPrice() }}</span>
      <ng-content select="kds-counter" />
    </div>
  `,
})
export class KdsOrderCard {
  readonly type = input<'item' | 'total'>('item');
  readonly title = input.required<string>();
  /** Line total or order total, formatted. */
  readonly total = input.required<string>();
  /** Unit price ("8,50 € / ud.") or per-person price ("12,25 € / comensal"). */
  readonly unitPrice = input<string>();
  /** Supporting lines, e.g. the cooking point (Figma details?). */
  readonly details = input<string[]>([]);
  /** Highlighted line in the accent colour, e.g. the service moment. */
  readonly highlight = input<string>();
  readonly headingLevel = input<HeadingLevel>(3);
}

/**
 * card/time-slot — shows the 15-minute slot the customer chose and its
 * availability. Display only: not interactive and without a selected state
 * (the exact minute is chosen in the Time Picker).
 *
 * ```html
 * <kds-time-slot-card start="13:00" end="13:15" status="Disponible" statusVariant="positive" />
 * ```
 */
@Component({
  selector: 'kds-time-slot-card',
  standalone: true,
  imports: [KdsBadge],
  styleUrl: './card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-card kds-time-slot-card' },
  template: `
    <span class="kds-time-slot-card__time">
      <span class="kds-time-slot-card__start">{{ start() }}</span>
      <span class="kds-time-slot-card__end"><span aria-hidden="true">––</span><span class="kds-sr-only"> a </span> {{ end() }}</span>
    </span>
    @if (status()) {
      <kds-badge [variant]="statusVariant()" subtle>{{ status() }}</kds-badge>
    }
  `,
})
export class KdsTimeSlotCard {
  readonly start = input.required<string>();
  readonly end = input.required<string>();
  /** Availability text, e.g. "Disponible". */
  readonly status = input<string>();
  readonly statusVariant = input<KdsBadgeVariant>('positive');
}

/**
 * card/upsell — optional complementary product offered before checkout.
 * Never preselected; the round button adds it.
 *
 * ```html
 * <kds-upsell-card title="Tarta de queso" price="7,50 €" imageSrc="tarta.jpg" (add)="addUpsell()" />
 * ```
 */
@Component({
  selector: 'kds-upsell-card',
  standalone: true,
  imports: [KdsIconButton, KdsIcon],
  styleUrl: './card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-card kds-card--elevated kds-upsell-card' },
  template: `
    <div class="kds-upsell-card__media">
      @if (imageSrc()) {
        <img [src]="imageSrc()" [alt]="imageAlt()" loading="lazy" />
      }
    </div>
    <div class="kds-upsell-card__body">
      <span class="kds-upsell-card__title" role="heading" [attr.aria-level]="headingLevel()">{{ title() }}</span>
      <div class="kds-upsell-card__footer">
        <span class="kds-upsell-card__price">{{ price() }}</span>
        <button kdsIconButton type="button" size="small" [label]="actionLabel() + ' ' + title()" (click)="add.emit()">
          <svg kdsIcon="more"></svg>
        </button>
      </div>
    </div>
  `,
})
export class KdsUpsellCard {
  readonly title = input.required<string>();
  readonly price = input.required<string>();
  readonly imageSrc = input<string>();
  readonly imageAlt = input('');
  readonly actionLabel = input('Añadir');
  readonly headingLevel = input<HeadingLevel>(3);
  readonly add = output<void>();
}

/** One line of card/checkout (Figma .card/checkout/item). */
export interface KdsCheckoutLine {
  name: string;
  value: string;
  /** Supporting lines (Figma details?). */
  details?: string[];
  /** Highlighted line in the accent colour. */
  highlight?: string;
}

/**
 * card/checkout — summary before payment: the reservation data
 * (`type="reservation"`) or the order with its total (`type="total order"`).
 * Lines are a description list; first/middle/last spacing is automatic.
 *
 * ```html
 * <kds-checkout-card type="total order" title="Pedido" [lines]="lines" total="63,90 €" />
 * ```
 */
@Component({
  selector: 'kds-checkout-card',
  standalone: true,
  styleUrl: './card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-card kds-card--elevated kds-card--padded kds-checkout-card' },
  template: `
    <span class="kds-checkout-card__title" role="heading" [attr.aria-level]="headingLevel()">{{ title() }}</span>
    <dl class="kds-checkout-card__lines">
      @for (l of lines(); track $index) {
        <div class="kds-checkout-line">
          <dt class="kds-checkout-line__name">{{ l.name }}</dt>
          <dd class="kds-checkout-line__value">{{ l.value }}</dd>
          @if (l.details?.length || l.highlight) {
            <dd class="kds-card__details">
              @for (d of l.details ?? []; track $index) {
                <span>{{ d }}</span>
              }
              @if (l.highlight) {
                <span class="kds-card__accent">{{ l.highlight }}</span>
              }
            </dd>
          }
        </div>
      }
    </dl>
    @if (type() === 'total order' && total()) {
      <div class="kds-card__divider-row kds-checkout-card__total">
        <span>{{ totalLabel() }}</span>
        <span>{{ total() }}</span>
      </div>
    }
  `,
})
export class KdsCheckoutCard {
  readonly type = input<'reservation' | 'total order'>('reservation');
  readonly title = input.required<string>();
  readonly lines = input.required<KdsCheckoutLine[]>();
  readonly totalLabel = input('Total');
  /** Order total, formatted (total order only). */
  readonly total = input<string>();
  readonly headingLevel = input<HeadingLevel>(3);
}

/**
 * card/reservation — the confirmation the customer shows at the restaurant.
 * Project the real QR code (an `<img>`, `<svg>` or `<canvas>` with the
 * `kdsQr` attribute); the card never generates or alters it.
 *
 * ```html
 * <kds-reservation-card title="Casa Levante" [details]="['Lunes 7 sep · 13:45', '2 personas']"
 *   status="Esperando confirmación" statusVariant="warning" code="#CLV-2024-001 · Muéstralo al llegar">
 *   <img kdsQr [src]="qrUrl" alt="Código QR de la reserva" />
 * </kds-reservation-card>
 * ```
 */
@Component({
  selector: 'kds-reservation-card',
  standalone: true,
  imports: [KdsBadge],
  styleUrl: './card.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'kds-card kds-card--elevated kds-reservation-card' },
  template: `
    <div class="kds-reservation-card__header">
      <span class="kds-reservation-card__title" role="heading" [attr.aria-level]="headingLevel()">{{ title() }}</span>
      @if (details().length) {
        <div class="kds-reservation-card__details">
          @for (d of details(); track $index) {
            <span>{{ d }}</span>
          }
        </div>
      }
    </div>
    @if (status()) {
      <div class="kds-reservation-card__status">
        <kds-badge [variant]="statusVariant()" subtle>{{ status() }}</kds-badge>
      </div>
    }
    <div class="kds-reservation-card__qr-row">
      <div class="kds-reservation-card__qr"><ng-content select="[kdsQr]" /></div>
    </div>
    @if (code()) {
      <p class="kds-reservation-card__code">{{ code() }}</p>
    }
  `,
})
export class KdsReservationCard {
  /** Restaurant name. */
  readonly title = input.required<string>();
  readonly details = input<string[]>([]);
  readonly status = input<string>();
  readonly statusVariant = input<KdsBadgeVariant>('warning');
  readonly code = input<string>();
  readonly headingLevel = input<HeadingLevel>(2);
}
