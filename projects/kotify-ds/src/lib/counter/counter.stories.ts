import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsCounter } from './counter';

const meta: Meta = {
  title: 'Components/Counter',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsCounter] })],
  parameters: {
    docs: {
      description: {
        component: [
          'Adjusts a quantity with less and more buttons. Mirrors the Figma `counter`: variant on card (small IconButtons) | on canvas (large IconButtons, display number and caption).',
          '',
          '- Limits come from the product (`min`, `max`). The only built-in rule is that a quantity is never negative (`min` defaults to 0).',
          '- The buttons are disabled at the limits; the number is announced politely. `label` names the group and both buttons.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const OnCard: Story = { render: () => ({ props: { qty: 1 }, template: `<kds-counter label="Entrecot de ternera" [(value)]="qty" [max]="9" />` }) };
export const OnCanvas: Story = {
  render: () => ({ props: { people: 2 }, template: `<kds-counter variant="on canvas" label="Personas" description="Personas" [min]="1" [max]="8" [(value)]="people" />` }),
};
