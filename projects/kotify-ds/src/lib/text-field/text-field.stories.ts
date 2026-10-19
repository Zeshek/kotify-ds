import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsTextField } from './text-field';

const meta: Meta = {
  title: 'Components/Text Field',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsTextField] }), (story) => { const s = story(); return { ...s, template: `<div style="max-width: 342px">${s.template}</div>` }; }],
  parameters: {
    docs: {
      description: {
        component: [
          'Multi-line text entry with a persistent title, for reviews or notes. Mirrors the Figma `text field`: status default | filled | focus; title optional.',
          '',
          '- Minimum height from `text field/min-height`; the native handle resizes it vertically.',
          '- Same label and description rules as Input.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => ({ template: `<kds-text-field label="Valoración" placeholder="Escribe aquí tu opinión" />` }) };
export const Filled: Story = { render: () => ({ props: { v: 'Muy buen restaurante, definitivamente volvería.' }, template: `<kds-text-field label="Valoración" [(value)]="v" />` }) };
