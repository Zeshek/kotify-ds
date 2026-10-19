import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsCounter } from '../counter/counter';
import {
  KdsCheckoutCard, KdsCheckoutLine, KdsOrderCard, KdsProductCard, KdsReservationCard, KdsTimeSlotCard, KdsUpsellCard,
} from './card';

// Neutral image placeholders (inline SVG), so the stories do not depend on external photos.
const PHOTO = (hue: number) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120"><rect width="120" height="120" fill="hsl(${hue} 45% 82%)"/><circle cx="60" cy="64" r="30" fill="hsl(${hue} 50% 68%)"/></svg>`);

// Placeholder QR pattern for the story only (not a real code).
const QR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 21" shape-rendering="crispEdges"><rect width="21" height="21" fill="#fff"/>${Array.from({ length: 21 * 21 }, (_, i) => {
      const x = i % 21, y = Math.floor(i / 21);
      const finder = (a: number, b: number) => x >= a && x < a + 7 && y >= b && y < b + 7 && (x === a || x === a + 6 || y === b || y === b + 6 || (x > a + 1 && x < a + 5 && y > b + 1 && y < b + 5));
      const inFinderZone = (x < 8 && y < 8) || (x > 12 && y < 8) || (x < 8 && y > 12);
      const on = inFinderZone ? finder(0, 0) || finder(14, 0) || finder(0, 14) : (x * 7 + y * 13 + x * y) % 5 < 2;
      return on ? `<rect x="${x}" y="${y}" width="1" height="1" fill="#131313"/>` : '';
    }).join('')}</svg>`,
  );

const meta: Meta = {
  title: 'Components/Card',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsProductCard, KdsOrderCard, KdsTimeSlotCard, KdsUpsellCard, KdsCheckoutCard, KdsReservationCard, KdsCounter] })],
  parameters: {
    docs: {
      description: {
        component: [
          'The Card family of the ordering flow: product, order, time-slot, upsell, checkout (with its line items) and reservation. All share `card/*` tokens and the `elevation/raised` shadow.',
          '',
          '- No card is a single control: product, upsell and order (with counter) act only through their own buttons.',
          '- **Time-slot** only shows the chosen slot; it is not interactive. The exact minute is chosen in the Time Picker.',
          '- Separators use the card divider stroke; there is no Divider component.',
          '- Prices, totals, availability and the QR come from the product. The cards never compute or invent them.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

const wrap = (w: number, t: string) => `<div style="max-width:${w}px; display:grid; gap: var(--space-md)">${t}</div>`;

export const Product: Story = {
  render: () => ({
    props: { img: PHOTO(28) },
    template: wrap(352, `<kds-product-card title="Croquetas de jamón ibérico" description="Seis unidades de croqueta artesana" price="11,50 €" [imageSrc]="img" />`),
  }),
};

export const Order: Story = {
  render: () => ({
    props: { qty: 1 },
    template: wrap(344, `
      <kds-order-card title="Entrecot de ternera" total="8,50 €" unitPrice="8,50 € / ud." [details]="['Al punto']" highlight="Listo al llegar">
        <kds-counter label="Entrecot de ternera" [(value)]="qty" [min]="1" />
      </kds-order-card>
      <kds-order-card type="total" title="Total" total="24,50 €" unitPrice="12,25 € / comensal" />`),
  }),
};

export const TimeSlot: Story = {
  render: () => ({
    template: wrap(344, `
      <kds-time-slot-card start="13:00" end="13:15" status="Disponible" statusVariant="positive" />
      <kds-time-slot-card start="13:15" end="13:30" status="Últimas mesas" statusVariant="warning" />`),
  }),
};

export const Upsell: Story = {
  render: () => ({
    props: { a: PHOTO(45), b: PHOTO(15) },
    template: `<div style="display:flex; gap: var(--space-base)">
      <kds-upsell-card title="Tarta de queso" price="7,50 €" [imageSrc]="a" />
      <kds-upsell-card title="Café solo" price="1,80 €" [imageSrc]="b" />
    </div>`,
  }),
};

const reservationLines: KdsCheckoutLine[] = [
  { name: 'Restaurante', value: 'Casa Levante' },
  { name: 'Fecha', value: 'Lunes 7 de septiembre' },
  { name: 'Hora de llegada', value: '13:45' },
  { name: 'Personas', value: '2' },
  { name: 'Email', value: 'nombre@correo.com' },
];
const orderLines: KdsCheckoutLine[] = [
  { name: 'Croquetas de jamón ibérico', value: '8,50 €' },
  { name: 'Gambas al ajillo', value: '12,90 €' },
  { name: 'Jamón ibérico de bellota', value: '18,00 €' },
  { name: 'Entrecot de ternera', value: '24,50 €', details: ['Al punto'], highlight: 'Listo al llegar' },
];

export const Checkout: Story = {
  render: () => ({
    props: { reservationLines, orderLines },
    template: wrap(344, `
      <kds-checkout-card title="Reserva" [lines]="reservationLines" />
      <kds-checkout-card type="total order" title="Pedido" [lines]="orderLines" total="63,90 €" />`),
  }),
};

export const Reservation: Story = {
  render: () => ({
    props: { qr: QR },
    template: wrap(344, `
      <kds-reservation-card title="Casa Levante" [details]="['Lunes 7 sep · 13:45', '2 personas']"
        status="Esperando confirmación" statusVariant="warning" code="#CLV-2024-001 · Muéstralo al llegar">
        <img kdsQr [src]="qr" alt="Código QR de la reserva (ejemplo)" />
      </kds-reservation-card>`),
  }),
};
