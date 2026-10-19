import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { KdsCheckbox, KdsCheckboxGroup } from './checkbox';

const meta: Meta = {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  decorators: [moduleMetadata({ imports: [KdsCheckbox, KdsCheckboxGroup] }), (story) => { const s = story(); return { ...s, template: `<div style="max-width: 344px">${s.template}</div>` }; }],
  parameters: {
    docs: {
      description: {
        component: [
          'Independent or multiple selection, shown as a card. Mirrors the Figma `checkbox` (status default | selected, optional details) and `checkbox module` (optional title).',
          '',
          '- Native checkbox inside a `<label>`: the whole card toggles it and Space works. Works with `[(checked)]`, `ngModel` and reactive forms.',
          '- The group is a `<fieldset>` with a `<legend>`.',
          '- Use Radio Button for mutually exclusive options.',
          '- Figma defines no disabled or hover state, so none is exposed.',
        ].join('\n'),
      },
    },
  },
};
export default meta;
type Story = StoryObj;

export const Single: Story = {
  render: () => ({
    props: { checked: true },
    template: `<kds-checkbox label="Confirmación por SMS" details="Te avisamos también cuando el restaurante confirme tu reserva." [(checked)]="checked" />`,
  }),
};

export const WithoutDetails: Story = {
  render: () => ({ template: `<kds-checkbox label="Acepto las condiciones de cancelación" />` }),
};

export const Module: Story = {
  render: () => ({
    template: `
      <kds-checkbox-group title="Avisos">
        <kds-checkbox label="Confirmación por SMS" details="Te avisamos cuando el restaurante confirme tu reserva." [checked]="true" />
        <kds-checkbox label="Recordatorio 15 minutos antes" />
      </kds-checkbox-group>`,
  }),
};
