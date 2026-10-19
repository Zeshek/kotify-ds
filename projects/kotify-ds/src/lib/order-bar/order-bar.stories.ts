import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsOrderBar } from './order-bar';

const meta: Meta = {
  title: 'Components/Order Bar',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsOrderBar] }), (story) => { const s = story(); return { ...s, template: `<div style="max-width: 392px">${s.template}</div>` }; }],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: [
          'Floating bar that summarises the order and opens it. Mirrors the Figma `order bar module` (outer spacing) and `.order bar`.',
          '',
          '- One action. Pass `countLabel` (e.g. "3 platos") so the bubble number is meaningful to screen readers.',
          '- Totals come from the product, already formatted. Positioning (fixed to the bottom) belongs to the page.',
          '- Same motion as the buttons (hover lift, pressed scale).',
        ].join('\n'),
      },
    },
  },
};
export default meta;

export const Default: StoryObj = { render: () => ({ template: `<kds-order-bar [count]="3" countLabel="3 platos" total="24,50 €" />` }) };
