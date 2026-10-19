import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsInput } from './input';

const meta: Meta = {
  title: 'Components/Input',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsInput] }), (story) => { const s = story(); return { ...s, template: `<div style="max-width: 342px">${s.template}</div>` }; }],
  parameters: {
    docs: {
      description: {
        component: [
          'Single-line text entry with a persistent title. Mirrors the Figma `input`: status default | filled | focus; title optional.',
          '',
          '- The states map to the native field: empty (placeholder), with a value, and focused (primary border, the Figma focus variant).',
          '- `label` is always required. `hideLabel` hides it visually (Figma title?=false) but keeps it for assistive technology.',
          '- Associate helper or validation text with `describedBy`.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Default: Story = { render: () => ({ template: `<kds-input label="Nombre y apellidos" placeholder="Víctor F. González" autocomplete="name" />` }) };
export const Filled: Story = { render: () => ({ props: { v: 'Víctor F. González' }, template: `<kds-input label="Nombre y apellidos" [(value)]="v" autocomplete="name" />` }) };
export const Email: Story = { render: () => ({ template: `<kds-input label="Email" type="email" placeholder="nombre@correo.com" autocomplete="email" />` }) };
export const HiddenTitle: Story = { render: () => ({ template: `<kds-input label="Buscar en la carta" hideLabel type="search" placeholder="Buscar plato" />` }) };
